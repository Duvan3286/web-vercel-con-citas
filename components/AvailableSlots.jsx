// components/AvailableSlots.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";

export default function AvailableSlots({ date }) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    servicio: "Consulta",
    notas: "",
  });

  const [booking, setBooking] = useState(false);
  const [open, setOpen] = useState(false);

  // ⭐ Nuevo modal de éxito ⭐
  const [successOpen, setSuccessOpen] = useState(false);
  const [successInfo, setSuccessInfo] = useState(null);

  // Refs para validación manual
  const nombreRef = useRef(null);
  const emailRef = useRef(null);
  const telefonoRef = useRef(null);
  const servicioRef = useRef(null);
  const notasRef = useRef(null);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Fecha local segura en YYYY-MM-DD (evita variaciones de toLocaleDateString)
  const getLocalYYYYMMDD = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  // Cargar horarios
  useEffect(() => {
    if (!date) return;

    const fetchSlots = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/citas/available?date=${encodeURIComponent(date)}`
        );
        const data = await res.json();
        setSlots(Array.isArray(data.available) ? data.available : []);
      } catch (err) {
        console.error(err);
        toast("Error al cargar horarios", {
          description: "No se pudieron obtener las horas disponibles.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [date]);

  // Filtrar horas pasadas si la fecha seleccionada es hoy
  const todayStr = getLocalYYYYMMDD(new Date());
  const visibleSlots = useMemo(() => {
    if (!Array.isArray(slots)) return [];

    if (date !== todayStr) return slots;

    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    return slots.filter((h) => {
      const [hh, mm] = String(h).split(":").map(Number);
      if (Number.isNaN(hh) || Number.isNaN(mm)) return false;
      const slotMinutes = hh * 60 + mm;
      return slotMinutes > nowMinutes; // solo futuras; usa >= si quieres permitir la hora exacta
    });
  }, [slots, date, todayStr]);

  const handleSelectHour = (h) => {
    setSelectedHour(h);
    setOpen(true);

    // Limpia posibles mensajes de validación al abrir
    nombreRef.current?.setCustomValidity("");
    emailRef.current?.setCustomValidity("");
    telefonoRef.current?.setCustomValidity("");
    servicioRef.current?.setCustomValidity("");
    notasRef.current?.setCustomValidity("");
  };

  const focusAndReport = (el) => {
    if (!el) return true;
    const ok = el.reportValidity();
    if (!ok) el.focus();
    return ok;
  };

  const handleBook = async () => {
    const { nombre, email, telefono, servicio, notas } = form;

    if (!selectedHour) {
      return toast("Selecciona una hora", {
        description: "Debes escoger un horario disponible.",
      });
    }

    // ------------------ VALIDACIÓN MANUAL (forzada) ------------------
    const nombreInput = nombreRef.current;
    const emailInput = emailRef.current;
    const telefonoInput = telefonoRef.current;
    const servicioInput = servicioRef.current;

    const nombreTrim = String(nombre || "").trim();
    const emailTrim = String(email || "").trim();
    const servicioTrim = String(servicio || "").trim();
    const telefonoDigits = String(telefono || "").replace(/\D/g, "");

    if (nombreInput) {
      nombreInput.setCustomValidity("");
      if (!nombreTrim) nombreInput.setCustomValidity("Ingresa tu nombre.");
      else if (nombreTrim.length < 3)
        nombreInput.setCustomValidity("El nombre debe tener mínimo 3 caracteres.");
      if (!focusAndReport(nombreInput)) return;
    }

if (emailInput) {
  emailInput.setCustomValidity("");

  const v = String(emailInput.value || "").trim();

  if (!v) {
    emailInput.setCustomValidity("Ingresa tu correo.");
  } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/i.test(v)) {
    emailInput.setCustomValidity("Correo inválido. Ej: usuario@dominio.com");
  } else {
    emailInput.setCustomValidity("");
  }

  if (!emailInput.reportValidity()) {
    emailInput.focus();
    return;
  }
}


    if (telefonoInput) {
      telefonoInput.setCustomValidity("");

      // Obligatorio + 10 dígitos
      if (telefonoDigits.length === 0) {
        telefonoInput.setCustomValidity("Ingresa tu número de celular.");
      } else if (telefonoDigits.length !== 10) {
        telefonoInput.setCustomValidity("El celular debe tener exactamente 10 dígitos.");
      }

      if (!focusAndReport(telefonoInput)) return;
    }

if (servicioInput) {
  servicioInput.setCustomValidity("");

  const v = String(servicioInput.value || "").trim();
  if (!v) servicioInput.setCustomValidity("Ingresa el servicio.");
  else if (v.length < 3)
    servicioInput.setCustomValidity("El servicio debe tener mínimo 3 caracteres.");

  if (!focusAndReport(servicioInput)) return; 
}

    // ----------------------------------------------------------------

    // Evitar reservar una hora que ya pasó si es hoy (doble check)
    if (date === todayStr) {
      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();

      const [hh, mm] = String(selectedHour).split(":").map(Number);
      const slotMinutes =
        (Number.isNaN(hh) ? 0 : hh) * 60 + (Number.isNaN(mm) ? 0 : mm);

      if (slotMinutes <= nowMinutes) {
        return toast("Hora no válida", {
          description: "Esa hora ya pasó. Selecciona una hora futura.",
        });
      }
    }

    setBooking(true);

    try {
      const fechaHora = `${date}T${selectedHour}:00`;

      const res = await fetch("/api/citas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombreTrim,
          email: emailTrim,
          telefono: telefonoDigits,
          servicio: servicioTrim,
          fechaHora,
          notas,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast("Error al reservar", {
          description: data.error || "Ocurrió un problema con la reserva.",
        });
      }

      // Guardar info para el modal de éxito ⭐
      setSuccessInfo({
        nombre: nombreTrim,
        servicio: servicioTrim,
        hora: selectedHour,
        fecha: date,
      });

      // Limpiar form
      setForm({
        nombre: "",
        email: "",
        telefono: "",
        servicio: "Consulta",
        notas: "",
      });

      setOpen(false);
      setSuccessOpen(true);

      // refrescar horarios
      const r2 = await fetch(
        `/api/citas/available?date=${encodeURIComponent(date)}`
      );
      const d2 = await r2.json();
      setSlots(Array.isArray(d2.available) ? d2.available : []);
    } catch (err) {
      console.error(err);
      toast("Error inesperado", {
        description: "No se pudo completar la reserva.",
      });
    } finally {
      setBooking(false);
    }
  };

  // Si cambias de fecha, cierra el modal y resetea la hora seleccionada (evita reservar hora vieja)
  useEffect(() => {
    setSelectedHour(null);
    setOpen(false);
  }, [date]);

  if (!date)
    return (
      <p className="text-center text-stone-500">
        Selecciona una fecha en el calendario
      </p>
    );

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-3 text-stone-700">
        Horas disponibles para {date}
      </h3>

      {loading ? (
        <p className="text-stone-600">Cargando horarios...</p>
      ) : visibleSlots.length === 0 ? (
        <p className="text-red-600">No hay horas disponibles ese día</p>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {visibleSlots.map((h) => (
            <button
              key={h}
              onClick={() => handleSelectHour(h)}
              className="px-3 py-2 rounded-lg border font-medium transition duration-200 bg-white border-gray-300 hover:bg-gray-100"
            >
              {h}
            </button>
          ))}
        </div>
      )}

      {/* Modal de reserva */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Reservar cita
            </DialogTitle>
          </DialogHeader>

          {/* RESUMEN DE LA CITA */}
          <div className="text-center mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-lg font-semibold text-blue-700">
              Resumen de la cita
            </p>
            <p className="text-3xl font-bold text-blue-900 mt-1">
              {selectedHour}
            </p>
            <p className="text-xl text-blue-800">{date}</p>
          </div>

          {/* FORMULARIO */}
          <input
            ref={nombreRef}
            value={form.nombre}
            onChange={(e) => {
              updateField("nombre", e.target.value);
              nombreRef.current?.setCustomValidity("");
            }}
            placeholder="Nombre"
            required
            minLength={3}
            maxLength={80}
            className="w-full mb-3 px-4 py-2 rounded-lg border border-gray-300"
          />

          <input
            ref={emailRef}
            type="email"
            value={form.email}
            onChange={(e) => {
              updateField("email", e.target.value);
              emailRef.current?.setCustomValidity("");
            }}
            placeholder="Correo"
            required
            maxLength={120}
            className="w-full mb-3 px-4 py-2 rounded-lg border border-gray-300"
          />

         <input
  ref={telefonoRef}
  type="tel"
  value={form.telefono}
  onChange={(e) => {
    const digits = String(e.target.value || "").replace(/\D/g, "").slice(0, 10);
    updateField("telefono", digits);
    telefonoRef.current?.setCustomValidity("");
  }}
  placeholder="Celular"
  required 
  inputMode="numeric"
  pattern="[0-9]{10}"
  title="El celular debe tener exactamente 10 dígitos"
  maxLength={10}
  className="w-full mb-3 px-4 py-2 rounded-lg border border-gray-300"
/>


    <input
  ref={servicioRef}
  value={form.servicio}
  onChange={(e) => {
    updateField("servicio", e.target.value);
    servicioRef.current?.setCustomValidity("");
  }}
  placeholder="Servicio"
  required
  minLength={3}
  maxLength={60}
  className="w-full mb-3 px-4 py-2 rounded-lg border border-gray-300"
/>
      

          <textarea
            ref={notasRef}
            value={form.notas}
            onChange={(e) => {
              updateField("notas", e.target.value);
              notasRef.current?.setCustomValidity("");
            }}
            placeholder="Notas (opcional)"
            maxLength={300}
            className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300"
          />

          <DialogFooter className="flex justify-between">
            <button
              onClick={handleBook}
              disabled={booking}
              className="bg-[#4A6D9C] hover:bg-[#3F5A86] text-white px-5 py-2 rounded-lg"
            >
              {booking ? "Reservando..." : "Confirmar"}
            </button>

            <button
              onClick={() => setOpen(false)}
              className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              Cancelar
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ⭐ MODAL DE ÉXITO ⭐ */}
      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="max-w-md text-center py-10">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-green-600">
              ¡Cita agendada con éxito! ✔️
            </DialogTitle>
            <DialogDescription className="text-xl mt-2">
              Tu cita fue reservada exitosamente
            </DialogDescription>
          </DialogHeader>

          {successInfo && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-3xl font-bold text-green-800">
                {successInfo.hora}
              </p>
              <p className="text-xl text-green-700 mt-1">
                {successInfo.fecha}
              </p>

              <p className="text-lg text-green-700 mt-3">
                <span className="font-semibold">Paciente:</span>{" "}
                {successInfo.nombre}
              </p>

              <p className="text-lg text-green-700">
                <span className="font-semibold">Servicio:</span>{" "}
                {successInfo.servicio}
              </p>
            </div>
          )}

          <div className="mt-8">
            <button
              onClick={() => setSuccessOpen(false)}
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg text-lg"
            >
              Aceptar
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
