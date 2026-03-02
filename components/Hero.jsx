"use client";

import Image from "next/image";
import { Button } from "../components/ui/button";
import { Brain, Heart, Zap } from "lucide-react"; 
import { useRouter } from "next/navigation"; 

const featuredServices = [
  {
    icon: <Heart className="w-8 h-8 text-white" />,
    title: "Medicina Estética Integrativa",
    description: "Tratamientos faciales y corporales que usan biomateriales y terapias de soporte para resultados naturales y saludables.",
    color: "bg-pink-500",
  },
  {
    icon: <Brain className="w-8 h-8 text-white" />,
    title: "Medicina Ortomolecular",
    description: "Corrección de deficiencias nutricionales y hormonales a nivel celular. Planes de suplementación y dietas específicas.",
    color: "bg-indigo-500",
  },
  {
    icon: <Zap className="w-8 h-8 text-white" />,
    title: "Terapias de Bienestar Alternativo",
    description: "Uso de técnicas como la Biorregulación y Sueroterapia para desintoxicar, modular el sistema inmune y mejorar la vitalidad.",
    color: "bg-green-500",
  },
];

export default function HomeContent() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">

      {/* 1. SECCIÓN HERO */}
      <section id="hero" className="relative bg-gray-50 pt-20 pb-10 md:py-24">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 px-6 max-w-7xl">
          
          {/* Texto */}
          <div className="flex-1 text-center lg:text-left animate-in fade-in slide-in-from-left duration-700">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#5A7D99] mb-4 leading-tight">
              Dra. Denisse Barreto:
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 mb-6">
              Medicina Estética y Bienestar Integrativo
            </h2>
            <p className="text-stone-700 text-lg lg:text-xl mb-8 max-w-xl mx-auto lg:mx-0">
              Transforma tu salud desde la raíz. Aplicamos la <strong>Medicina Integrativa</strong> para armonizar tu cuerpo y mente, combinando tratamientos de vanguardia con enfoques naturales y personalizados.
            </p>
            <div className="flex justify-center lg:justify-start gap-4 flex-wrap">
              
              {/* Botón Principal - Agenda */}
              <Button 
                className="bg-[#6B8EA7] hover:bg-[#5C7A91] text-white px-8 py-3 text-lg rounded-full shadow-lg transition duration-300 transform hover:scale-105"
                onClick={() => router.push("/agendar-cita")}
              >
                Agenda tu Evaluación Inicial
              </Button>

              {/* Botón Secundario - Servicios */}
              <Button 
                variant="outline"
                className=" bg-amber-500 hover:bg-amber-600 text-white border-2 border-amber-300 px-8 py-3 text-lg rounded-full shadow transition duration-300"
                onClick={() => router.push("/services")}
              >
                Ver Servicios Integrales
              </Button>
            </div>
          </div>

          {/* Imagen */}
          <div className="flex-1 flex justify-center lg:justify-end mt-10 lg:mt-0 animate-in fade-in slide-in-from-right duration-700">
            <div className="relative w-[300px] h-[300px] sm:w-[450px] sm:h-[450px]">
              <Image
                src="/images/hero-medical.png" 
                alt="Dra. Denisse Barreto en su práctica médica integrativa"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN DIFERENCIADOR */}
      <section id="filosofia" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-[#EAF0F4] border-l-4 border-[#7C97AB] p-8 md:p-12 rounded-xl shadow-lg">
            <h3 className="text-3xl sm:text-4xl font-bold text-[#5A7D99] mb-6">
              Más Allá de los Síntomas: Nuestra Filosofía
            </h3>
            <div className="grid md:grid-cols-2 gap-8 text-lg text-stone-700">
              <div>
                <p className="mb-4">
                  La Dra. Denisse Barreto adopta un enfoque holístico, tratando a la <strong>persona completa</strong>, no solo la enfermedad. Combinamos la ciencia médica tradicional con terapias naturales y alternativas validadas para restaurar el equilibrio.
                </p>
                <p>
                  Nuestro objetivo es la <strong>Medicina Estética Consciente</strong> y el bienestar duradero, enfocándonos en la prevención, la desintoxicación y la optimización de la calidad de vida a largo plazo.
                </p>
              </div>
              <ul className="space-y-3 list-none p-0">
                <li className="flex items-start">
                  <span className="text-[#6B8EA7] font-bold mr-3 text-xl">✓</span>
                  <strong>Tratamiento Personalizado:</strong> Planes de salud diseñados para tu bioquímica única.
                </li>
                <li className="flex items-start">
                  <span className="text-[#6B8EA7] font-bold mr-3 text-xl">✓</span>
                  <strong>Raíz del Problema:</strong> Búsqueda y corrección de la causa fundamental de tus dolencias.
                </li>
                <li className="flex items-start">
                  <span className="text-[#6B8EA7] font-bold mr-3 text-xl">✓</span>
                  <strong>Belleza Interior y Exterior:</strong> Promoción de una belleza que irradia desde el equilibrio orgánico.
                </li>
              </ul>
            </div>
            <Button 
              variant="link" 
              className="mt-6 text-[#6B8EA7] hover:text-[#5C7A91] font-semibold text-base md:text-lg p-0"
              onClick={() => router.push("/about")}
            >
              Conoce el Perfil de la Dra. Barreto →
            </Button>
          </div>
        </div>
      </section>

      {/* 3. SECCIÓN SERVICIOS DESTACADOS */}
      <section id="servicios" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Nuestros Pilares de Bienestar Integral
          </h3>
          <p className="text-xl text-stone-600 mb-12 max-w-3xl mx-auto">
            Descubre las áreas clave donde la Dra. Barreto te ayudará a alcanzar tu máximo potencial de salud y estética.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl shadow-xl transition duration-500 hover:shadow-2xl hover:scale-[1.02] border-t-4 border-[#7C97AB]"
              >
                <div className={`p-3 inline-flex items-center justify-center rounded-full mb-4 ${service.color}`}>
                  {service.icon}
                </div>
                <h4 className="text-xl font-semibold text-[#5A7D99] mb-3">
                  {service.title}
                </h4>
                <p className="text-stone-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <Button 
            className="mt-12 bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 text-lg rounded-full shadow-lg transition duration-300"
            onClick={() => router.push("/services")}
          >
            Explora Todos Nuestros Servicios
          </Button>
        </div>
      </section>

      {/* 4. SECCIÓN TESTIMONIO DESTACADO */}
      <section id="cta-testimonio" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="relative p-8 md:p-12 bg-[#6B8EA7] text-white rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Cita */}
            <blockquote className="relative z-10 text-center">
              <p className="text-3xl font-light italic mb-6">
                "Desde que empecé mi tratamiento integral, no solo veo mi piel radiante, sino que mis niveles de energía han vuelto. La Dra. Barreto realmente cambió mi vida con un enfoque que ningún otro médico me ofreció."
              </p>
              <footer className="text-xl font-semibold border-t border-[#7C97AB] pt-3">
                — Andrea M., paciente de 35 años.
              </footer>
            </blockquote>

            {/* CTA */}
            <div className="mt-10 text-center z-10 relative">
              <h4 className="text-3xl font-bold mb-4">
                ¿Listo(a) para Iniciar tu Transformación?
              </h4>
              <p className="text-lg mb-6">
                Agenda hoy tu consulta y da el primer paso hacia una salud y belleza integral.
              </p>
              <Button 
                className="bg-amber-400 hover:bg-amber-500 text-[#5A7D99] font-bold px-10 py-4 text-xl rounded-full shadow-2xl transition duration-300 transform hover:scale-105"
                onClick={() => router.push("/agendar-cita")}
              >
                Reservar Mi Cita Ahora
              </Button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
