"use client";

import Image from "next/image";
import { Card } from "../components/ui/card";
import { Quote } from "lucide-react";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";

const testimonialsData = [
  {
    name: "Ana María F.",
    role: "Paciente de Medicina Integrativa, 31 años",
    text: "Mi vida cambió desde la primera consulta. No solo mejoró mi piel con la estética integrativa, sino que mis problemas digestivos se resolvieron gracias al enfoque holístico de la Dra. Barreto. Me siento más equilibrada y saludable que nunca.",
    image: "/images/testimonial1.jpg",
    color: "#D98C9D", // Rosa suave
  },
  {
    name: "Carlos M.",
    role: "Paciente de Optimización de Energía, 52 años",
    text: "Después del programa de Sueroterapia y Medicina Ortomolecular, mis niveles de energía se dispararon. Los tratamientos me ayudaron a recuperar mi bienestar y rendimiento. Excelente equipo, muy profesional y atento.",
    image: "/images/testimonial2.jpg",
    color: "#4A6D9C", // Azul suave
  },
  {
    name: "Laura R.",
    role: "Paciente de Rejuvenecimiento, 38 años",
    text: "Buscaba resultados naturales y los encontré aquí. El manejo con Bioestimuladores fue impecable y el soporte nutricional hizo una diferencia. ¡La Dra. Barreto es la mejor! Recomiendo totalmente la clínica.",
    image: "/images/testimonial3.jpg",
    color: "#D9A05A", // Ámbar suave
  },
];

export default function TestimonialsPage() {
  const router = useRouter();

  return (
    <section id="testimonials-page" className="bg-[#FDFBF5] py-16 md:py-24 overflow-x-hidden">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Encabezado */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-lg font-semibold" style={{ color: "#D9A05A" }}>PRUEBA SOCIAL DE CONFIANZA</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#4A6D9C] mb-4">
            Transformaciones Reales y Experiencias de Pacientes
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            La mejor prueba de la efectividad del enfoque integrativo de la Dra. Barreto son las voces de quienes han recuperado su bienestar y belleza.
          </p>
        </div>

        {/* Grid de Testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonialsData.map((t, index) => (
            <Card
              key={index}
              className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transition duration-500 hover:shadow-2xl"
              style={{ borderTop: `4px solid ${t.color}` }}
            >
              <Quote className="w-10 h-10 mb-4" style={{ color: t.color }} />
              <p className="text-stone-700 italic text-lg mb-6 leading-relaxed">
                "{t.text}"
              </p>

              <div className="w-20 h-20 relative mb-3">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  sizes="100px"
                  className="rounded-full object-cover border-4 border-gray-100 shadow-md"
                />
              </div>

              <h3 className="text-xl font-bold text-stone-800">
                {t.name}
              </h3>
              <p className="text-[#4A6D9C] text-sm mt-1">
                {t.role}
              </p>
            </Card>
          ))}
        </div>

        {/* CTA Final */}
        <div className="mt-16 md:mt-24 text-center p-8 rounded-xl shadow-2xl" style={{ backgroundColor: "#4A6D9C", color: "#FDFBF5" }}>
          <h2 className="text-3xl font-bold mb-4 ">
            Tu Historia de Éxito Comienza Aquí
          </h2>
          <p className="text-xl mb-6 font-light">
            Es hora de experimentar un cuidado médico que ve más allá de los síntomas.
          </p>
          <Button
            className="bg-[#D9A05A] hover:bg-[#C18B4D] text-[#4A6D9C] font-bold 
               px-6 py-4 text-lg 
               md:px-10 md:text-xl 
               rounded-full shadow-2xl transition duration-300 transform hover:scale-105"
            onClick={() => router.push("/agendar-cita")}
          >
            Agenda tu Primera Evaluación
          </Button>
        </div>

      </div>
    </section>
  );
}
