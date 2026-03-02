import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAppointmentsByDate(dateStr) {
  // Asegurar que siempre usamos solo YYYY-MM-DD
  const normalized = dateStr.split("T")[0];

  const start = new Date(`${normalized}T00:00:00`);
  const end = new Date(`${normalized}T23:59:59`);

  const citas = await prisma.cita.findMany({
    where: {
      fechaHora: {
        gte: start,
        lte: end,
      },
    },
    orderBy: { fechaHora: "asc" },
  });

  return citas;
}



export async function createAppointment(data) {
  return await prisma.cita.create({ data });
}

export async function getAllAppointments() {
  return await prisma.cita.findMany({ orderBy: { fechaHora: "asc" } });
}
