// src/utils/csv.ts
import * as fs from "fs";
import * as path from "path";

export type Row = Record<string, string | number | boolean | null | undefined>;

export function toCsv(rows: Row[]): string {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);

  const escape = (v: any) => {
    const s = v === null || v === undefined ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push(headers.map((h) => escape(r[h])).join(","));
  }
  return lines.join("\n");
}

export function saveCsv(rows: Row[], filePath: string) {
  const csv = toCsv(rows);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, csv, "utf8");
  return filePath;
}
