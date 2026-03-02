import { writeFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "citas.json");

    await writeFile(filePath, "[]");

    return new Response(JSON.stringify({ ok: true, mensaje: "Citas borradas" }), {
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "No se pudo limpiar" }), {
      status: 500,
    });
  }
}
