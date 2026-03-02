import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const MORNING = ["08:00", "09:00", "10:00", "11:00"];
const AFTERNOON = ["14:00", "15:00", "16:00"];

function getLocalDay(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).getDay();
}

// Ruta absoluta al archivo JSON
const citasPath = path.join(process.cwd(), "data", "citas.json");

function loadCitas() {
  try {
    if (!fs.existsSync(citasPath)) {
      fs.writeFileSync(citasPath, "[]");
      return [];
    }
    const data = fs.readFileSync(citasPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error leyendo citas.json:", err);
    return [];
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Missing date param" }, { status: 400 });
  }

  // Bloquear domingo
  const day = getLocalDay(date);
  if (day === 0) {
    return NextResponse.json({ available: [] });
  }

  // Obtener citas desde JSON
  const citas = loadCitas();

  // Filtrar las del día
  const citasDia = citas.filter((cita) => cita.fechaHora.startsWith(date));

  const occupied = citasDia.map((c) => c.fechaHora.substring(11, 16));

  const allSlots = [...MORNING, ...AFTERNOON];
  const available = allSlots.filter((slot) => !occupied.includes(slot));

  return NextResponse.json({ available });
}
