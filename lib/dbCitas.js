// lib/dbCitas.js
import fs from "fs/promises";
import path from "path";
import { put, get } from "@vercel/blob";

const DATA_PATH = path.join(process.cwd(), "data", "citas.json");
const BLOB_PATHNAME = "db/citas.json";

function usingBlob() {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

export async function readDB() {
  // ✅ En Vercel (o donde exista token): leer desde Blob (PRIVATE)
  if (usingBlob()) {
    try {
      const result = await get(BLOB_PATHNAME, { access: "private" }); // recomendado para private blobs [web:475]
      if (!result) return [];

      const text = await new Response(result.stream).text();
      return JSON.parse(text || "[]");
    } catch {
      // Si el blob aún no existe o hay error, devolvemos vacío
      return [];
    }
  }

  // ✅ En servidor normal: leer desde filesystem
  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

export async function writeDB(citas) {
  // ✅ En Vercel (o donde exista token): escribir a Blob (overwrite)
  if (usingBlob()) {
    const json = JSON.stringify(citas, null, 2);

    await put(BLOB_PATHNAME, json, {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });

    return;
  }

  // ✅ En servidor normal: escribir al filesystem
  await fs.writeFile(DATA_PATH, JSON.stringify(citas, null, 2));
}
