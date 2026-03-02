import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { sendEmail } from "../../../lib/sendEmail";

// Path al archivo JSON
const DATA_PATH = path.join(process.cwd(), "data", "citas.json");

// Email del dueño (desde .env.local)
const OWNER_EMAIL = process.env.OWNER_EMAIL;

// Duración de la cita en minutos
const DURATION_MINUTES = 60;

// Leer archivo JSON
async function readDB() {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

// Guardar archivo JSON
async function writeDB(citas) {
  await fs.writeFile(DATA_PATH, JSON.stringify(citas, null, 2));
}

// Función correcta para formatear fechas del Calendar
function formatForCalendar(date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function escapeHtml(v) {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


export async function POST(req) {
  try {
    const body = await req.json();
    const { nombre, email, telefono, servicio, fechaHora, notas } = body;

    // 1️⃣ Guardar nueva cita
    const citas = await readDB();

    const nueva = {
      id: Date.now(),
      nombre,
      email,
      telefono,
      servicio,
      fechaHora,
      notas,
    };

    citas.push(nueva);
    await writeDB(citas);

    // 2️⃣ Datos para email
    const fecha = fechaHora.slice(0, 10);
    const hora = fechaHora.slice(11, 16);

    // 3️⃣ Google Calendar Link — 100% exacto y sin desfases
    const startDate = new Date(fechaHora);
    const endDate = new Date(startDate.getTime() + DURATION_MINUTES * 60000);

    const start = formatForCalendar(startDate);
    const end = formatForCalendar(endDate);

    const calendarDetails =
      `Cita con ${nombre}\n` +
      `Email: ${email}\n` +
      `Teléfono: ${telefono || "N/A"}\n` +
      `Notas: ${notas || "N/A"}`;

    const calendarLink =
      `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${encodeURIComponent(servicio)}` +
      `&details=${encodeURIComponent(calendarDetails)}` +
      `&dates=${start}/${end}`;

    // 4️⃣ Enviar correo al dueño con formato HTML avanzado
    await sendEmail({
      to: OWNER_EMAIL,
      subject: `Nueva cita agendada - ${nombre}`,
      text:
        `Nueva cita agendada\n` +
        `Paciente: ${nombre}\n` +
        `Servicio: ${servicio}\n` +
        `Fecha: ${fecha}\n` +
        `Hora: ${hora}\n` +
        `Email: ${email}\n` +
        `Teléfono: ${telefono || "N/A"}\n` +
        `Notas: ${notas || "N/A"}\n` +
        `Google Calendar: ${calendarLink}\n`,
      html: `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
    style="background:#f6f7fb;padding:24px;font-family:Arial,Helvetica,sans-serif;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0"
          style="background:#ffffff;border:1px solid #e6e8f0;border-radius:14px;overflow:hidden;">
          <tr>
            <td style="padding:18px 22px;background:#4A6D9C;color:#ffffff;">
              <div style="font-size:18px;font-weight:700;">Nueva cita agendada</div>
              <div style="font-size:13px;opacity:.9;margin-top:4px;">Agenda</div>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 22px;">
              <div style="font-size:14px;color:#334155;margin-bottom:12px;">
                Se registró una nueva reserva. Detalles:
              </div>

              <div style="margin-bottom:14px;">
                <span style="display:inline-block;padding:10px 12px;border:1px solid #dbeafe;background:#eff6ff;border-radius:12px;margin-right:8px;">
                  <div style="font-size:12px;color:#1e40af;">Fecha</div>
                  <div style="font-size:16px;font-weight:700;color:#1e3a8a;">${escapeHtml(fecha)}</div>
                </span>

                <span style="display:inline-block;padding:10px 12px;border:1px solid #dcfce7;background:#f0fdf4;border-radius:12px;">
                  <div style="font-size:12px;color:#166534;">Hora</div>
                  <div style="font-size:16px;font-weight:700;color:#14532d;">${escapeHtml(hora)}</div>
                </span>
              </div>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0;border-top:1px solid #eef2ff;">
                    <div style="font-size:12px;color:#64748b;">Paciente</div>
                    <div style="font-size:15px;font-weight:700;color:#0f172a;">${escapeHtml(nombre)}</div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;border-top:1px solid #eef2ff;">
                    <div style="font-size:12px;color:#64748b;">Servicio</div>
                    <div style="font-size:15px;font-weight:700;color:#0f172a;">${escapeHtml(servicio)}</div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;border-top:1px solid #eef2ff;">
                    <div style="font-size:12px;color:#64748b;">Email</div>
                    <div style="font-size:14px;color:#0f172a;">${escapeHtml(email)}</div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;border-top:1px solid #eef2ff;">
                    <div style="font-size:12px;color:#64748b;">Teléfono</div>
                    <div style="font-size:14px;color:#0f172a;">${escapeHtml(telefono || "N/A")}</div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 0;border-top:1px solid #eef2ff;">
                    <div style="font-size:12px;color:#64748b;">Notas</div>
                    <div style="font-size:14px;color:#0f172a;white-space:pre-line;">${escapeHtml(notas || "N/A")}</div>
                  </td>
                </tr>
              </table>

              <div style="margin-top:18px;">
                <a href="${calendarLink}"
                  style="display:inline-block;background:#4A6D9C;color:#ffffff;text-decoration:none;padding:12px 16px;border-radius:10px;font-weight:700;">
                  ➕ Agregar a Google Calendar
                </a>
              </div>

              <div style="font-size:12px;color:#94a3b8;margin-top:14px;">
                Correo generado automáticamente.
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `,
    });


    // 5️⃣ Respuesta al frontend
    return NextResponse.json({
      ok: true,
      cita: nueva,
      calendarLink,
    });
  } catch (err) {
    console.error("Error creando cita:", err);
    return NextResponse.json(
      { error: "Error al crear la cita" },
      { status: 500 }
    );
  }
}
