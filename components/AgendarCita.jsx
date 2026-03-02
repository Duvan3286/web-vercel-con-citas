"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AgendarCita() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [horaSeleccionada, setHoraSeleccionada] = useState("");

  // ... (useEffect y handleGuardar permanecen iguales) ...

  return (
    // Reemplazamos los contenedores de Modal por una simple sección.
    // Usamos 'py-12' para padding vertical y 'container' para centrar.
    <section className="pt-24 pb-12 bg-gray-50 min-h-screen">
      
      {/* Contenedor principal para centrar y limitar el ancho, como una card */}
      <div className="container mx-auto px-6 max-w-lg bg-white p-6 rounded-xl shadow-2xl">
        
        {/* Aquí podemos eliminar el botón de cerrar si no es necesario en una página */}
        {/* <button className="absolute right-4 top-4 ..." onClick={onClose}> ✕ </button> */}

        <h2 className="text-3xl font-bold mb-6 text-[#4A6D9C] text-center">
          Agendar Cita
        </h2>

        {/* -------------------- DatePicker -------------------- */}
        {/* Usamos un div para centrar el DatePicker, que por defecto es ancho completo en 'inline' */}
        <div className="flex justify-center relative z-10">
            <DatePicker
              selected={fechaSeleccionada}
              onChange={(date) => setFechaSeleccionada(date)}
              inline
            />
        </div>
        
        {/* -------------------- Horas Disponibles -------------------- */}
        {fechaSeleccionada && (
          <div className="mt-6">
            <label className="font-medium text-stone-700 block mb-3">Selecciona la hora:</label>

            {horasDisponibles.length === 0 ? (
              <p className="text-red-500 mt-2">No hay horarios disponibles.</p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-2">
                {horasDisponibles.map((hora) => (
                  <button
                    key={hora}
                    onClick={() => setHoraSeleccionada(hora)}
                    className={`px-3 py-2 rounded-lg border font-medium text-sm sm:text-base ${
                      horaSeleccionada === hora
                        ? "bg-[#4A6D9C] text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-stone-700"
                    } transition duration-200`}
                  >
                    {hora}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* -------------------- Botones Finales -------------------- */}
        <div className="mt-8 text-right flex justify-end gap-3">
          {/* Si ya no es un modal, el botón "Cancelar" puede ser "Volver" */}
          <button
            onClick={() => window.history.back()} // O usa 'router.back()' si tienes acceso a Next Router
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg font-semibold transition duration-200"
          >
            Volver
          </button>

          <button
            onClick={handleGuardar}
            className="bg-[#4A6D9C] hover:bg-[#3F5A86] text-white px-4 py-2 rounded-lg font-semibold transition duration-200"
          >
            Guardar Cita
          </button>
        </div>
      </div>
    </section>
  );
}