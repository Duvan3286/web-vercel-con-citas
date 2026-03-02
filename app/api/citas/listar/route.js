import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "citas.json");
    const data = await readFile(filePath, "utf8");

    return new Response(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error en GET /api/citas/listar:", error);
    return new Response(JSON.stringify({ error: "Error al leer citas" }), {
      status: 500,
    });
  }
}
