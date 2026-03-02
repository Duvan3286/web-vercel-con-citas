"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const whatsappNumber = "573156854375";
      const text = `Hola Dra. Barreto, soy ${name} (${email}). Estoy interesado(a) en una consulta. Mi mensaje es: ${message}`;
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank");

      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <section className="bg-[#FDFBF5] py-16 md:py-24" id="contact">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Encabezado */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#4A6D9C] mb-4">
            Estamos Listos para Atenderte
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Agenda tu cita o resuelve tus dudas de manera rápida y directa. Nuestro equipo te responderá en minutos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Información de contacto */}
          <div className="flex flex-col space-y-8 p-8 bg-white rounded-2xl shadow-xl border-t-4" style={{ borderColor: "#4A6D9C" }}>
            <h2 className="text-3xl font-bold text-[#4A6D9C] mb-4">Información de la Clínica</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-[#D9A05A] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-stone-800">Dirección</h3>
                  <p className="text-stone-600">Calle 123 #45-67, Edificio Médico, Consultorio 501, <strong>Bogotá, Colombia</strong></p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-[#D9A05A] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-stone-800">Llamadas y WhatsApp</h3>
                  <p className="text-stone-600"><strong>+57 315 685 4375</strong> (Recomendado para citas)</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-[#D9A05A] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-stone-800">Correo Electrónico</h3>
                  <p className="text-stone-600">contacto@miclinica.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-[#D9A05A] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-stone-800">Horario de Atención</h3>
                  <p className="text-stone-600">Lunes a Viernes: 8:00 am - 5:00 pm</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-stone-800 mb-3">Encuéntranos Fácilmente:</h3>
              <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden shadow-inner">
                <iframe
                  title="Ubicación de la clínica"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7954.663706912659!2d-75.7024314265944!3d4.534132251463292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38f5852da9fb2b%3A0x5508d8f05378c025!2sBrisas%20Del%20Bosque!5e0!3m2!1ses-419!2sco!4v1772486364575!5m2!1ses-419!2sco"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

            </div>
          </div>

          {/* Formulario */}
          <div className="p-8 bg-white rounded-2xl shadow-xl border-t-4" style={{ borderColor: "#D9A05A" }}>
            <h2 className="text-3xl font-bold text-[#4A6D9C] mb-6">Envía un Mensaje Directo</h2>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Tu Nombre Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D9A05A] transition duration-200"
                required
              />
              <input
                type="email"
                placeholder="Tu Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D9A05A] transition duration-200"
                required
              />
              <textarea
                placeholder="¿En qué servicio estás interesado? (ej. Sueroterapia, Rejuvenecimiento Facial, etc.)"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D9A05A] transition duration-200"
                required
              />
              <button
                type="submit"
                className="bg-[#4A6D9C] text-white px-6 py-3 rounded-xl hover:bg-[#3F5A86] transition duration-300 font-bold text-lg shadow-md flex items-center justify-center disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Enviando...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Mensaje WhatsApp
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
