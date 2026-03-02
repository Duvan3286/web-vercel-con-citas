import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar.jsx";
import { Toaster } from "../components/ui/toaster"; // <-- IMPORTANTE

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata = {
  title: "Mi Clínica",
  description: "Clínica médica moderna con agendamiento de citas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="light">
      <body className="font-sans">
        <Navbar />
        <main className="pt-20">{children}</main>

        {/* Toaster global para que tus toasts funcionen */}
        <Toaster /> 
      </body>
    </html>
  );
}
