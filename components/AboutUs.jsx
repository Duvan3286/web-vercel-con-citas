"use client";

import Image from "next/image";
import { Button } from "../components/ui/button";
import { GraduationCap, Lightbulb, ShieldCheck, Target, TrendingUp } from "lucide-react"; 
import { useRouter } from "next/navigation";

export default function AboutUsPage() {
  const router = useRouter();

  return (
    <main className="bg-[#FDFBF5]">
      
      {/* SECCIÓN 1: INTRODUCCIÓN Y PERFIL DE LA DOCTORA */}
      <section className="bg-white py-16 md:py-24" id="intro-perfil">
        <div className="container mx-auto px-6 max-w-7xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#3B3A36] text-center mb-12">
            Conoce a la Dra. Denisse Barreto
          </h1>
          
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Imagen */}
            <div className="w-full lg:w-1/2 relative h-80 lg:h-[450px] rounded-2xl overflow-hidden shadow-xl flex-shrink-0">
              <Image
                src="/images/about/clinica.jpg"
                alt="Clínica de la Dra. Denisse Barreto"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>

            {/* Texto: Biografía y Propuesta de Valor */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold text-[#4A6D9C] mb-4">
                Medicina Estética y Bienestar Integrativo
              </h2>
              
              <p className="text-stone-700 text-lg mb-4">
                La <strong>Dra. Denisse Barreto</strong> es una profesional dedicada a la <strong>Medicina Integrativa</strong>, con especialización en <strong>Medicina Estética</strong> y <strong>Medicina Alternativa</strong>. Su filosofía se centra en la salud como un estado de equilibrio completo, tratando al paciente de forma holística.
              </p>

              <p className="text-stone-700 text-lg mb-6">
                Su trayectoria se basa en la <strong>evidencia científica</strong> combinada con la <strong>sabiduría natural</strong>, aplicando protocolos personalizados que buscan la <strong>raíz de la enfermedad</strong> o el desequilibrio, y no solo el alivio de los síntomas. Para la Dra. Barreto, la belleza es un reflejo directo de la salud interior.
              </p>

              <h3 className="text-xl font-semibold text-stone-700 mb-3">
                Formación y Compromiso:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-stone-600 ml-4">
                <li><GraduationCap className="inline w-5 h-5 mr-1 text-amber-500" /> Certificada en Medicina Ortomolecular y Biorregulación.</li>
                <li><Lightbulb className="inline w-5 h-5 mr-1 text-amber-500" /> Más de [X] años de experiencia transformando la salud de pacientes.</li>
                <li><ShieldCheck className="inline w-5 h-5 mr-1 text-amber-500" /> Enfoque en la Medicina Predictiva y Preventiva.</li>
              </ul>
              
              <Button 
                className="bg-[#6C8AA4] hover:bg-[#5B7790] text-white px-8 py-3 rounded-full shadow-lg mt-8"
                onClick={() => router.push("/agendar-cita")}
              >
                Inicia tu Cuidado con la Dra.
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <hr className="border-t border-gray-200" />
      
      {/* SECCIÓN 2: MISIÓN, VISIÓN Y VALORES */}
      <section id="mvv" className="py-16 md:py-24 bg-[#FDFBF5]">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-4xl font-bold text-[#3B3A36] text-center mb-12">
            Nuestra Misión y Visión
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Misión */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-amber-500 hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-[#4A6D9C] mb-3 flex items-center">
                <Target className="w-6 h-6 mr-2 text-amber-500" /> Misión
              </h3>
              <p className="text-stone-600 text-lg">
                Proveer atención médica integral y personalizada que combine lo mejor de la medicina estética de vanguardia con las terapias alternativas, empoderando a nuestros pacientes para que alcancen su máximo potencial de salud y bienestar duradero.
              </p>
            </div>
            
            {/* Visión */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#6C8AA4] hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-[#4A6D9C] mb-3 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-[#6C8AA4]" /> Visión
              </h3>
              <p className="text-stone-600 text-lg">
                Ser un referente de excelencia en la medicina integrativa, reconocida por transformar la calidad de vida de nuestros pacientes a través de un enfoque ético, humano y altamente profesional.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <hr className="border-t border-gray-200" />
      
      {/* SECCIÓN 3: CTA DE TESTIMONIOS Y CONEXIÓN */}
      <section id="cta-testimonios" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-[#3B3A36] mb-4">
            La Prueba de Nuestro Enfoque
          </h2>
          <p className="text-xl text-stone-600 mb-8">
            Cientos de pacientes han experimentado una transformación integral. Conoce sus historias y resultados.
          </p>
          <Button 
            className="bg-amber-500 hover:bg-amber-600 text-white px-10 py-4 text-lg rounded-full shadow-xl transition duration-300"
            onClick={() => router.push("/testimonials")}
          >
            Ver Todos los Testimonios
          </Button>
        </div>
      </section>

    </main>
  );
}
