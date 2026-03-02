// lib/dbCitas.js
import fs from "fs/promises";
import path from "path";
import { put, list } from "@vercel/blob";

const DATA_PATH = path.join(process.cwd(), "data", "citas.json");
const BLOB_PATHNAME = "db/citas.json";

function usingBlob() {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

export async function readDB() {
  // ✅ En Vercel (o donde exista token): leer desde Blob
  if (usingBlob()) {
    const { blobs } = await list({ prefix: BLOB_PATHNAME }); // list() soporta prefix y retorna pathname/downloadUrl [web:351]
    const found = blobs.find((b) => b.pathname === BLOB_PATHNAME);

    if (!found) return [];

    const res = await fetch(found.downloadUrl);
    if (!res.ok) return [];

    const text = await res.text();
    return JSON.parse(text || "[]");
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

    await put(
      BLOB_PATHNAME,
      new Blob([json], { type: "application/json" }),
      {
        access: "private",
        addRandomSuffix: false,
        allowOverwrite: true, // permite sobrescribir el mismo pathname [web:338]
        contentType: "application/json",
      }
    );

    return;
  }

  // ✅ En servidor normal: escribir al filesystem
  await fs.writeFile(DATA_PATH, JSON.stringify(citas, null, 2));
}
