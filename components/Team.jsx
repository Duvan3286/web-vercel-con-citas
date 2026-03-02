"use client";

import Image from "next/image";
import { Button } from "../components/ui/button";
import { Award, Zap, Heart } from "lucide-react";

const doctors = [
  {
    name: "Dra. Denisse Barreto",
    specialty: "Médica en Medicina Estética Integrativa y Alternativa",
    image: "/images/team/denisse.jpg",
    bioParagraphs: [
      { type: 'strong', text: 'Trayectoria y Filosofía.' },
      { 
        type: 'text', 
        text: 'La Dra. Denisse Barreto es una especialista dedicada con más de 10 años de experiencia, cuyo enfoque se centra en la Medicina Integrativa. Su compromiso es ir más allá del síntoma para encontrar la raíz del desequilibrio físico y estético.'
      },
      { 
        type: 'text', 
        text: 'Su práctica profesional combina la <strong>ciencia médica tradicional</strong> con terapias de vanguardia como la <strong>Medicina Ortomolecular</strong> y la <strong>Biorregulación</strong>, asegurando un bienestar completo y duradero.' 
      },
      { type: 'strong', text: 'Formación y Credenciales.' },
      { 
        type: 'list', 
        items: [
          "Graduada en la Universidad Nacional de Colombia.",
          "Certificaciones internacionales en Terapias Naturales Avanzadas.",
          "Especialización en procedimientos de Estética Integrativa y Regenerativa.",
        ]
      }
    ],
  },
];

export default function TeamPage() {
  return (
    <section className="bg-[#FDFBF5] py-16 md:py-24" id="team">
      <div className="container mx-auto px-6 max-w-7xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#4A6D9C] text-center mb-4">
          Conoce a la Experta detrás de tu Bienestar
        </h1>
        <p className="text-xl text-stone-600 text-center mb-12 max-w-3xl mx-auto">
            La Dra. Denisse Barreto lidera un equipo comprometido con tu salud holística y tu belleza natural.
        </p>

        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 flex flex-col lg:flex-row items-start gap-10 border-t-4 border-amber-500"
          >
            
            {/* Columna de Imagen y Contacto */}
            <div className="w-full lg:w-1/3 flex flex-col items-center text-center flex-shrink-0">
              <div className="w-48 h-48 relative mb-6">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>

              <h2 className="text-3xl font-bold text-stone-800">
                {doctor.name}
              </h2>
              <p className="text-[#4A6D9C] mt-1 mb-4 italic text-lg font-semibold">
                {doctor.specialty}
              </p>

              <Button
                className="bg-[#6C8AA4] hover:bg-[#5B7790] text-white px-8 py-3 rounded-full shadow-lg transition duration-300"
                // onClick={() => router.push('/citas')}
              >
                Agendar Cita Directa
              </Button>
            </div>

            {/* Columna de Biografía Detallada */}
            <div className="w-full lg:w-2/3 mt-6 lg:mt-0">
              <h3 className="text-2xl font-semibold text-stone-700 mb-4 border-b pb-2">
                Biografía y Especialización
              </h3>

              {doctor.bioParagraphs.map((block, pIndex) => {
                if (block.type === 'strong') {
                  return (
                    <h4 key={pIndex} className="text-xl font-bold text-stone-800 mt-4 mb-2 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-amber-500" />
                      {block.text}
                    </h4>
                  );
                }
                if (block.type === 'text') {
                  return (
                    <p 
                        key={pIndex} 
                        className="text-stone-600 mb-4 text-lg leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: block.text }}
                    />
                  );
                }
                if (block.type === 'list') {
                  return (
                    <ul key={pIndex} className="list-disc list-inside space-y-2 text-stone-600 ml-4 mb-4">
                      {block.items.map((item, i) => (
                        <li key={i} className="flex items-start">
                           <Award className="w-5 h-5 mr-2 text-[#6C8AA4] flex-shrink-0" />
                          <span className="mt-[-2px]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })}
              
              {/* CTA para contactar o ver más sobre su enfoque */}
              <div className="mt-8 pt-4 border-t border-gray-200">
                  <p className="text-lg text-stone-700">
                      Si deseas explorar en detalle la filosofía de la Dra. Barreto, visita nuestra sección de <strong>Sobre Nosotros</strong>.
                  </p>
              </div>
            </div>
          </div>
        ))}

        {/* Sección de equipo de soporte */}
        <div className="mt-16 text-center">
            <h3 className="text-3xl font-semibold text-stone-800 mb-4">
                Equipo de Soporte de la Clínica
            </h3>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
                Nuestro equipo administrativo y de enfermería está capacitado para brindarte la mejor atención y acompañamiento durante todo tu proceso. La salud holística es un esfuerzo de equipo.
            </p>
        </div>

      </div>
    </section>
  );
}
