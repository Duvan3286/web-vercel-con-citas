"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, CalendarCheck } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/services" },
    { name: "Sobre Nosotros", href: "/about" },
    { name: "Equipo", href: "/team" },
    { name: "Testimonios", href: "/testimonials" },
    { name: "Contacto", href: "/contact" },
  ];

  return (
    <>
      {/* 1. Navbar Principal (Ahora z-40) */}
      <nav
        // Z-INDEX CORREGIDO: Bajamos a z-40 para que el menú móvil pueda superarla
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg backdrop-blur-sm bg-opacity-95"
            : "bg-transparent"
        }`}
      >
        {/* ... Contenido de la Navbar (Logo, Botones, etc.) ... */}
        <div className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold text-stone-500 flex items-center hover:text-gray-500 transition-transform duration-200 hover:scale-100"
          >
            Dra. Barreto
          </Link>

          {/* Menú de escritorio */}
          <ul className="hidden lg:flex gap-8 items-center">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-stone-500 font-medium hover:text-blue-600 transition text-base"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Botón principal de agenda (escritorio) */}
          <Link
            href="/agendar-cita"
            className="hidden lg:flex items-center bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full shadow-lg text-base font-semibold transition duration-300"
          >
            <CalendarCheck className="w-4 h-4 mr-2" />
            Agendar Cita
          </Link>

          {/* Botón menú móvil */}
          <button
            className="lg:hidden text-stone-500 p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* 2. Menú móvil off-canvas (Ahora z-50) */}
      <div
        // Z-INDEX CORREGIDO: Subimos a z-50 para que esté encima de la Navbar principal
        className={`fixed top-0 right-0 w-64 h-full bg-white z-50 shadow-2xl transform transition-transform duration-300 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 pt-20 flex flex-col space-y-4">
          {/* ... Links del menú móvil ... */}
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-stone-500 font-medium text-lg border-b border-gray-100 py-2 hover:text-blue-600 transition"
            >
              {link.name}
            </Link>
          ))}

          {/* Botón de agenda en menú móvil */}
          <Link
            href="/agendar-cita"
            onClick={() => setIsMenuOpen(false)}
            className="bg-amber-500 hover:bg-amber-600 text-white w-full py-3 mt-4 rounded-xl shadow-md flex items-center justify-center text-lg font-semibold transition duration-300"
          >
            <CalendarCheck className="w-5 h-5 mr-2" />
            Agendar Cita
          </Link>
        </div>
      </div>

      {/* 3. Overlay (z-30 - Sin cambios) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}