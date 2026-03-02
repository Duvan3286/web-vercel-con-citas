"use client";

import { Button } from "../components/ui/button"; 
import { Card } from "../components/ui/card"; 
import { Leaf, Heart, Zap, Shield } from "lucide-react"; 
import { useRouter } from "next/navigation";

const serviceCategories = [
  {
    categoryTitle: "Medicina Estética Integrativa",
    icon: <Heart className="w-10 h-10 text-pink-500" />,
    description: "Belleza que nace de la salud interior. Procedimientos estéticos avanzados que respetan y mejoran la función biológica de la piel y el cuerpo.",
    services: [
      { title: "Bioestimulación y Regeneración Cutánea", detail: "Uso de Plasma Rico en Plaquetas (PRP) y bioestimuladores para activar la producción natural de colágeno." },
      { title: "Armonización Facial Biocompatible", detail: "Rellenos y hilos tensores con enfoque en resultados naturales y soporte nutricional." },
      { title: "Rejuvenecimiento sin Cirugía", detail: "Tratamientos personalizados contra el envejecimiento celular y manchas." },
    ],
  },
  {
    categoryTitle: "Medicina Alternativa y Regenerativa",
    icon: <Leaf className="w-10 h-10 text-green-600" />,
    description: "Enfoque en encontrar la causa raíz de las enfermedades, utilizando terapias naturales validadas para restaurar la función óptima del organismo.",
    services: [
      { title: "Medicina Ortomolecular y Quelación", detail: "Detección y corrección de déficits vitamínicos, minerales y desintoxicación de metales pesados." },
      { title: "Sueroterapia (Intravenosa)", detail: "Administración de nutrientes, vitaminas y minerales de alta potencia para mejorar la energía y la inmunidad." },
      { title: "Terapia de Biorregulación", detail: "Tratamientos que modulan y estimulan los procesos de autocuración del cuerpo." },
    ],
  },
  {
    categoryTitle: "Bienestar y Optimización de la Salud",
    icon: <Zap className="w-10 h-10 text-yellow-600" />,
    description: "Programas de salud preventiva y gestión del estilo de vida para alcanzar un estado de vitalidad y equilibrio emocional duradero.",
    services: [
      { title: "Consulta de Medicina Integrativa", detail: "Evaluación completa de historial, hábitos y pruebas de laboratorio para un plan de salud integral." },
      { title: "Programas de Detoxificación", detail: "Planes guiados para limpiar el organismo y restablecer la función hepática y digestiva." },
      { title: "Gestión Hormonal Natural", detail: "Soporte nutricional y de estilo de vida para equilibrar el sistema endocrino." },
    ],
  },
];

export default function ServicesPage() {
  const router = useRouter();

  return (
    <section id="services-page" className="bg-[#FDFBF5] py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Encabezado y Propuesta de Valor */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-lg font-semibold text-[#4A6D9C] mb-2">PORTAFOLIO INTEGRAL</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#3B3A36] mb-4">
            Servicios de Medicina Estética y Alternativa
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            La Dra. Denisse Barreto ofrece un mapa de ruta hacia tu bienestar, combinando ciencia avanzada y sabiduría natural. Explora nuestras áreas de especialización.
          </p>
          <Button 
            className="mt-6 bg-[#6C8AA4] hover:bg-[#5B7790] text-white px-8 py-3 rounded-full shadow-lg"
            onClick={() => router.push("/agendar-cita")}
          >
            Agenda una Consulta Inicial Personalizada
          </Button>
        </div>

        {/* Listado de Categorías de Servicios */}
        <div className="space-y-16">
          {serviceCategories.map((category, catIndex) => (
            <div key={catIndex} className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border-t-4 border-[#6C8AA4]">
              
              <div className="flex items-center mb-6">
                {category.icon}
                <h2 className="text-3xl font-bold text-[#3B3A36] ml-4">
                  {category.categoryTitle}
                </h2>
              </div>
              
              <p className="text-lg text-stone-600 mb-8 max-w-4xl">
                {category.description}
              </p>

              {/* Grid de Servicios Específicos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service, svcIndex) => (
                  <Card 
                    key={svcIndex} 
                    className="p-5 border-l-4 border-amber-300 shadow-md transition hover:shadow-lg hover:bg-gray-50"
                  >
                    <h4 className="text-xl font-semibold text-[#4A6D9C] mb-2 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-amber-500" />
                      {service.title}
                    </h4>
                    <p className="text-stone-600 text-base">
                      {service.detail}
                    </p>
                  </Card>
                ))}
              </div>
              
            </div>
          ))}
        </div>

        {/* CTA de contacto o duda */}
        <div className="text-center mt-16 md:mt-24">
          <h3 className="text-3xl font-bold text-[#3B3A36] mb-4">
            ¿Tienes preguntas sobre el mejor tratamiento para ti?
          </h3>
          <p className="text-xl text-stone-600 mb-6">
            Contacta a nuestro equipo para una orientación sin compromiso.
          </p>
          <Button 
            className="bg-[#FAD07A] hover:bg-[#FCD884] text-[#3B3A36] px-10 py-4 text-lg rounded-full shadow-xl transition duration-300"
            onClick={() => router.push("/contact")}
          >
            Contáctanos por WhatsApp
          </Button>
        </div>

      </div>
    </section>
  );
}
