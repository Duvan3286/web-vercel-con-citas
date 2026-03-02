import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Horarios disponibles
const MORNING = ["08:00", "09:00", "10:00", "11:00"];
const AFTERNOON = ["14:00", "15:00", "16:00"];

// Ruta absoluta del archivo JSON
const filePath = path.join(process.cwd(), "data", "citas.json");

// Función para obtener día local sin UTC
function getLocalDay(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).getDay(); // 0 = domingo
}

// Leer JSON
function readCitas() {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const data = fs.readFileSync(filePath, "utf8");
  try {
    return JSON.parse(data);
  } catch {
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

  // Obtener todas las citas guardadas
  const citas = readCitas();

  // Filtrar citas del día
  const citasDelDia = citas.filter((c) => c.fechaHora.startsWith(date));

  // Obtener horas ocupadas
  const occupied = citasDelDia.map((c) => c.fechaHora.substring(11, 16));

  // Unir todos los horarios
  const allSlots = [...MORNING, ...AFTERNOON];

  // Filtrar disponibles
  const available = allSlots.filter((slot) => !occupied.includes(slot));

  return NextResponse.json({ available });
}
