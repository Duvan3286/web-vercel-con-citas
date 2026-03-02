"use client";

import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, MessageSquare } from "lucide-react"; // CAMBIO: Se importa MessageSquare

export default function Footer() {
    // Lista de enlaces de navegación (usando los mismos que el Navbar para consistencia)
    const links = [
        { name: "Inicio", href: "/" },
        { name: "Servicios", href: "/services" },
        { name: "Sobre Nosotros", href: "/about" },
        { name: "Testimonios", href: "/testimonials" },
        { name: "Contacto", href: "/contact" },
    ];

    // Lista de enlaces de redes sociales
    const socialLinks = [
        { icon: Facebook, href: "#", label: "Facebook" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        // CAMBIO: Se eliminó la propiedad 'color' para que el icono use el estilo por defecto (stone-700/blue-600)
        { 
            icon: MessageSquare, 
            href: "https://wa.me/573027568388", 
            label: "WhatsApp",
            // color: "bg-green-500 hover:bg-green-600" <-- Eliminado
        }, 
    ];

    return (
        <footer id="contact" className="bg-stone-900 text-stone-100 py-16 md:py-20">
            <div className="container mx-auto px-6 max-w-7xl">
                
                {/* GRID PRINCIPAL */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-stone-700 pb-12 mb-8">
                    
                    {/* Columna 1: Logo y Slogan */}
                    <div className="md:col-span-1">
                        <h3 className="text-2xl font-extrabold text-blue-400 mb-3">
                            Dra. Barreto
                        </h3>
                        <p className="text-stone-400 text-sm italic">
                            Salud Integrativa y Estética Consciente.
                        </p>
                    </div>

                    {/* Columna 2: Navegación */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-5 border-b border-blue-500 pb-2 inline-block">
                            Navegación
                        </h3>
                        <ul className="space-y-3">
                            {links.map((link) => (
                                <li key={link.href}>
                                    {/* Uso de <a> para consistencia con el Navbar */}
                                    <a 
                                        href={link.href} 
                                        className="text-stone-300 hover:text-blue-400 transition text-base block"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Columna 3: Información de Contacto */}
                    <div className="md:col-span-1">
                        <h3 className="text-xl font-bold text-white mb-5 border-b border-blue-500 pb-2 inline-block">
                            Contacto
                        </h3>
                        <div className="space-y-4">
                            <p className="flex items-start text-stone-300">
                                <MapPin className="w-5 h-5 text-amber-400 mr-3 mt-1 flex-shrink-0" />
                                <span>Calle Ficticia 123, Consultorio Suite 405,<br/> Ciudad, País.</span>
                            </p>
                            <p className="flex items-center text-stone-300">
                                <Phone className="w-5 h-5 text-amber-400 mr-3" />
                                <a href="tel:+571234567890" className="hover:text-blue-400 transition">
                                    +57 123 456 7890
                                </a>
                            </p>
                            <p className="flex items-center text-stone-300">
                                <Mail className="w-5 h-5 text-amber-400 mr-3" />
                                <a href="mailto:contacto@miclinica.com" className="hover:text-blue-400 transition">
                                    contacto@miclinica.com
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Columna 4: Redes Sociales */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-5 border-b border-blue-500 pb-2 inline-block">
                            Síguenos
                        </h3>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a 
                                    key={social.label} 
                                    href={social.href} 
                                    aria-label={`Síguenos en ${social.label}`}
                                    // La clase ahora aplicará el estilo por defecto (bg-stone-700 hover:bg-blue-600) a todos
                                    className={`p-3 rounded-full transition duration-300 transform hover:scale-110 shadow-lg ${social.color || 'bg-stone-700 hover:bg-blue-600'}`}
                                    target="_blank" // Abrir en una nueva pestaña (recomendado para enlaces externos)
                                    rel="noopener noreferrer"
                                >
                                    <social.icon size={20} className="text-white" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* DERECHOS DE AUTOR */}
                <div className="text-center text-stone-400 text-sm pt-4">
                    <p>
                        &copy; {new Date().getFullYear()} Mi Clínica Integrativa. Todos los derechos reservados.
                    </p>
                    <p className="mt-1 text-xs">
                        Aviso Legal | Política de Privacidad
                    </p>
                </div>
            </div>
        </footer>
    );
}