"use client";

import Image from "next/image";
import { Card } from "./ui/card";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Ana Maria",
      text: "La atención en Mi Clínica es excepcional. Me siento más equilibrada y saludable.",
      image: "/images/testimonial1.jpg",
    },
    {
      name: "Carlos M.",
      text: "Los tratamientos de medicina estética integrativa me ayudaron a recuperar mi bienestar.",
      image: "/images/testimonial2.jpg",
    },
    {
      name: "Ana R.",
      text: "Excelente equipo, muy profesional y atento. Recomiendo totalmente la clínica.",
      image: "/images/testimonial3.jpg",
    },
  ];

  return (
    <section  id="testimonials" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-stone-700 text-center mb-12">
          Testimonios
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <Card
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <Image
                src={t.image} // Debes tener estas imágenes en /public/images/
                alt={t.name}
                width={100}
                height={100}
                className="rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-stone-700 mb-2">
                {t.name}
              </h3>
              <p className="text-stone-600">{t.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
