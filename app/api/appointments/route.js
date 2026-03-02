import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "citas.json");
const OWNER_PHONE = "573156854375"; // WhatsApp del dueño
const DURATION_MINUTES = 60; // Duración de la cita

// Leer citas.json
async function readDB() {
  try {
    const data = await fs.readFile(DATA_PATH, "utf8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
}

// Escribir en citas.json
async function writeDB(citas) {
  await fs.writeFile(DATA_PATH, JSON.stringify(citas, null, 2));
}

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      nombre,
      email,
      telefono,
      servicio,
      fechaHora,
      notas
    } = body;

    // 1️⃣ Guardar cita localmente

    const citas = await readDB();

    const nueva = {
      id: Date.now(),
      nombre,
      email,
      telefono,
      servicio,
      fechaHora,
      notas
    };

    citas.push(nueva);
    await writeDB(citas);

    // ───────────────────────────────────────────────
    // 2️⃣ Construcción del mensaje para WhatsApp
    // ───────────────────────────────────────────────

    const fecha = fechaHora.substring(0, 10);
    const hora = fechaHora.substring(11, 16);

    const textMessage = 
      `Nueva cita agendada%0A` +
      `Cliente: ${encodeURIComponent(nombre)}%0A` +
      `Servicio: ${encodeURIComponent(servicio)}%0A` +
      `Fecha: ${encodeURIComponent(fecha)}%0A` +
      `Hora: ${encodeURIComponent(hora)}%0A` +
      `Notas: ${encodeURIComponent(notas || "Ninguna")}%0A%0A` +
      `Agendar en Google Calendar:%0A`;

    // ───────────────────────────────────────────────
    // 3️⃣ Link Google Calendar
    // ───────────────────────────────────────────────

    const start = fechaHora.replace(/[-:]/g, "").replace(".000Z", "");
    const endDate = new Date(fechaHora);
    endDate.setMinutes(endDate.getMinutes() + DURATION_MINUTES);

    const end = endDate.toISOString()
      .substring(0, 19)
      .replace(/[-:]/g, "")
      .replace(".000Z", "");

    const calendarLink =
      `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${encodeURIComponent(servicio)}` +
      `&details=${encodeURIComponent("Cita con " + nombre)}` +
      `&dates=${start}/${end}`;

    // ───────────────────────────────────────────────
    // 4️⃣ Link WhatsApp (Click-to-Chat)
    // ───────────────────────────────────────────────

    const whatsappLink =
      `https://wa.me/${OWNER_PHONE}?text=${textMessage}${encodeURIComponent(calendarLink)}`;

    // ───────────────────────────────────────────────
    // 5️⃣ Respuesta final al frontend
    // ───────────────────────────────────────────────

    return NextResponse.json({
      ok: true,
      cita: nueva,
      whatsappLink,
      calendarLink
    });

  } catch (error) {
    console.error("Error al guardar cita:", error);

    return NextResponse.json(
      { error: "Error al guardar cita", detalle: error.message },
      { status: 500 }
    );
  }
}
