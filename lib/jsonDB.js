import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "citas.json");

export function readCitas() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data || "[]");
}

export function saveCitas(citas) {
  fs.writeFileSync(filePath, JSON.stringify(citas, null, 2));
}
