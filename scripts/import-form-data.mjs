#!/usr/bin/env node
/**
 * One-shot importer: parses the xlsx files in `archive/raw-data/` and
 * regenerates `data/universities.ts` and `data/specializations.ts`.
 *
 * Run with: `npm run import:form-data`
 *
 * The script is intentionally tolerant about column names — it tries the
 * known Arabic/English header conventions first and falls back to "first
 * column" / "second column" / "third column" if it can't match. Empty rows
 * and obvious header-junk rows are skipped.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

// xlsx ships CommonJS; force CJS resolution for ESM compatibility.
const require = createRequire(import.meta.url);
const XLSX = require("xlsx");

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const RAW_DIR = join(repoRoot, "archive", "raw-data");
const OUT_UNIVERSITIES = join(repoRoot, "data", "universities.ts");
const OUT_SPECIALIZATIONS = join(repoRoot, "data", "specializations.ts");

// Filename candidates the user might use.
const UNIVERSITY_FILE_CANDIDATES = ["universities.xlsx", "3.xlsx"];
const SPECIALIZATION_FILE_CANDIDATES = ["specializations.xlsx", "7.xlsx"];

const NAME_HEADERS = [
  "اسم الجامعة",
  "اسم الجهة",
  "اسم الكلية",
  "الجامعة",
  "الجهة",
  "name",
  "university",
  "institution",
];
const NAME_EN_HEADERS = [
  "name_en",
  "english",
  "english name",
  "university_en",
  "institution_en",
  "الاسم بالإنجليزية",
  "الاسم بالانجليزية",
  "الاسم بالانجليزي",
  "الإنجليزية",
];
const PROGRAM_EN_HEADERS = [
  "program_en",
  "specialization_en",
  "major_en",
  "english",
  "name_en",
  "english name",
  "البرنامج بالإنجليزية",
  "البرنامج بالانجليزية",
  "التخصص بالإنجليزية",
  "التخصص بالانجليزية",
];
const SECTOR_HEADERS = ["نوع القطاع", "القطاع", "النوع", "sector", "type"];
const PROGRAM_HEADERS = ["البرنامج الأكاديمي", "البرنامج", "التخصص", "program", "major", "specialization"];

function pickFirstExistingFile(candidates) {
  for (const c of candidates) {
    const full = join(RAW_DIR, c);
    if (existsSync(full)) return full;
  }
  return null;
}

function loadSheetRows(filePath) {
  const wb = XLSX.readFile(filePath);
  const firstSheet = wb.Sheets[wb.SheetNames[0]];
  // Use header:1 to get raw arrays, so we can inspect the header row ourselves.
  const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1, raw: false, defval: "" });
  return rows.map((row) => row.map((cell) => String(cell ?? "").trim()));
}

function findColIdx(headerRow, candidates) {
  if (!headerRow) return -1;
  const lower = headerRow.map((h) => (h || "").toLowerCase().trim());
  for (const cand of candidates) {
    const idx = lower.indexOf(cand.toLowerCase());
    if (idx !== -1) return idx;
  }
  // Fuzzy contains
  for (let i = 0; i < lower.length; i++) {
    for (const cand of candidates) {
      if (lower[i].includes(cand.toLowerCase())) return i;
    }
  }
  return -1;
}

function classifySector(raw) {
  const v = (raw || "").trim().toLowerCase();
  if (!v) return "unknown";
  if (v.includes("حكوم") || v.includes("government") || v === "gov") return "government";
  if (v.includes("أهل") || v.includes("اهل") || v.includes("priv") || v.includes("خاص")) return "private";
  return "unknown";
}

function dedupeBy(items, keyFn) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    const key = keyFn(item);
    if (!key) continue;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

function loadExistingUniversityEnLookup() {
  // Best-effort: parse the existing data/universities.ts to preserve any
  // hand-curated `nameEn` values when the xlsx source has no English column.
  if (!existsSync(OUT_UNIVERSITIES)) return new Map();
  const text = readFileSync(OUT_UNIVERSITIES, "utf8");
  const map = new Map();
  const re = /\{\s*name:\s*"((?:[^"\\]|\\.)*)"[^}]*?nameEn:\s*"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = re.exec(text))) {
    map.set(m[1], m[2]);
  }
  return map;
}

function loadExistingSpecializationEnLookup() {
  if (!existsSync(OUT_SPECIALIZATIONS)) return new Map();
  const text = readFileSync(OUT_SPECIALIZATIONS, "utf8");
  const map = new Map();
  const re = /\{\s*name:\s*"((?:[^"\\]|\\.)*)"[^}]*?nameEn:\s*"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = re.exec(text))) {
    map.set(m[1], m[2]);
  }
  return map;
}

function buildUniversities() {
  const file = pickFirstExistingFile(UNIVERSITY_FILE_CANDIDATES);
  if (!file) {
    console.warn("⚠️  No university source found. Looked for:", UNIVERSITY_FILE_CANDIDATES);
    console.warn("    Skipping universities — keeping the existing data/universities.ts.");
    return null;
  }
  console.log("→ universities source:", file);
  const rows = loadSheetRows(file).filter((r) => r.some((c) => c.length > 0));
  if (rows.length === 0) {
    console.warn("⚠️  Empty sheet. Skipping.");
    return null;
  }
  const header = rows[0];
  let nameIdx = findColIdx(header, NAME_HEADERS);
  let sectorIdx = findColIdx(header, SECTOR_HEADERS);
  let nameEnIdx = findColIdx(header, NAME_EN_HEADERS);
  // Fallback positional if headers couldn't be matched
  if (nameIdx === -1) nameIdx = 0;
  if (sectorIdx === -1) sectorIdx = 1;

  const enLookup = loadExistingUniversityEnLookup();
  const dataRows = rows.slice(1);
  const items = dataRows
    .map((r) => {
      const name = (r[nameIdx] || "").trim();
      const fromXlsx = nameEnIdx !== -1 ? (r[nameEnIdx] || "").trim() : "";
      const nameEn = fromXlsx || enLookup.get(name) || "";
      return {
        name,
        nameEn,
        sector: classifySector(r[sectorIdx] || ""),
      };
    })
    .filter((u) => u.name.length > 0);
  return dedupeBy(items, (u) => u.name);
}

function buildSpecializations() {
  const file = pickFirstExistingFile(SPECIALIZATION_FILE_CANDIDATES);
  if (!file) {
    console.warn("⚠️  No specialization source found. Looked for:", SPECIALIZATION_FILE_CANDIDATES);
    console.warn("    Skipping specializations — keeping the existing data/specializations.ts.");
    return null;
  }
  console.log("→ specializations source:", file);
  const rows = loadSheetRows(file).filter((r) => r.some((c) => c.length > 0));
  if (rows.length === 0) {
    console.warn("⚠️  Empty sheet. Skipping.");
    return null;
  }
  const header = rows[0];
  let progIdx = findColIdx(header, PROGRAM_HEADERS);
  let uniIdx = findColIdx(header, NAME_HEADERS);
  let progEnIdx = findColIdx(header, PROGRAM_EN_HEADERS);
  if (progIdx === -1 && uniIdx === -1) {
    // Whole-sheet positional fallback: prefer (university, program)
    uniIdx = 0;
    progIdx = 1;
  } else if (progIdx === -1) {
    // Pick the first non-uni column
    progIdx = uniIdx === 0 ? 1 : 0;
  }

  const enLookup = loadExistingSpecializationEnLookup();
  const dataRows = rows.slice(1);
  const items = dataRows
    .map((r) => {
      const name = (r[progIdx] || "").trim();
      const fromXlsx = progEnIdx !== -1 ? (r[progEnIdx] || "").trim() : "";
      const nameEn = fromXlsx || enLookup.get(name) || "";
      return {
        name,
        nameEn,
        university: uniIdx !== -1 ? (r[uniIdx] || "").trim() || undefined : undefined,
      };
    })
    .filter((s) => s.name.length > 0);
  return dedupeBy(items, (s) => s.name);
}

function tsLiteral(v) {
  if (v === undefined) return "undefined";
  return JSON.stringify(v);
}

function writeUniversities(items) {
  const lines = [
    "/**",
    " * AUTO-GENERATED from xlsx + preserved English names — do not edit `name`/`sector` by hand.",
    " *",
    " * Regenerate from the xlsx source in `archive/raw-data/` by running:",
    " *   npm run import:form-data",
    " *",
    " * `nameEn` values are preserved across re-imports: the script reads",
    " * existing `nameEn` strings from this file and re-applies them by Arabic",
    " * name. To override, add an `name_en` column to the xlsx OR edit this",
    " * file by hand (subsequent re-runs will keep the edit).",
    " *",
    ` * Generated: ${new Date().toISOString()}`,
    ` * Source rows: ${items.length}`,
    " */",
    'export type UniversitySector = "government" | "private" | "unknown";',
    "",
    "export type University = {",
    "  name: string;",
    "  /** Official English name. Empty string when not yet translated. */",
    "  nameEn: string;",
    "  sector: UniversitySector;",
    "};",
    "",
    "export const universities: University[] = [",
    ...items.map(
      (u) =>
        `  { name: ${tsLiteral(u.name)}, nameEn: ${tsLiteral(u.nameEn || "")}, sector: ${tsLiteral(u.sector)} },`
    ),
    "];",
    "",
  ];
  writeFileSync(OUT_UNIVERSITIES, lines.join("\n"), "utf8");
  console.log(`✓ Wrote ${items.length} universities → ${OUT_UNIVERSITIES}`);
}

function writeSpecializations(items) {
  const lines = [
    "/**",
    " * AUTO-GENERATED from xlsx + preserved English names — do not edit `name`/`university` by hand.",
    " *",
    " * Regenerate from the xlsx source in `archive/raw-data/` by running:",
    " *   npm run import:form-data",
    " *",
    " * `nameEn` values are preserved across re-imports.",
    " *",
    ` * Generated: ${new Date().toISOString()}`,
    ` * Source rows: ${items.length}`,
    " */",
    "export type Specialization = {",
    "  name: string;",
    "  /** Official English name. Empty string when not yet translated. */",
    "  nameEn: string;",
    "  university?: string;",
    "};",
    "",
    "export const specializations: Specialization[] = [",
    ...items.map((s) => {
      const parts = [
        `name: ${tsLiteral(s.name)}`,
        `nameEn: ${tsLiteral(s.nameEn || "")}`,
      ];
      if (s.university) parts.push(`university: ${tsLiteral(s.university)}`);
      return `  { ${parts.join(", ")} },`;
    }),
    "];",
    "",
  ];
  writeFileSync(OUT_SPECIALIZATIONS, lines.join("\n"), "utf8");
  console.log(`✓ Wrote ${items.length} specializations → ${OUT_SPECIALIZATIONS}`);
}

function main() {
  if (!existsSync(RAW_DIR)) {
    console.error(`✗ Missing folder: ${RAW_DIR}`);
    process.exit(1);
  }

  const universities = buildUniversities();
  if (universities) writeUniversities(universities);

  const specializations = buildSpecializations();
  if (specializations) writeSpecializations(specializations);

  if (!universities && !specializations) {
    console.warn(
      "Nothing to import. Drop your xlsx files in archive/raw-data/ and rerun."
    );
  } else {
    console.log("Done. Don't forget to commit the regenerated data/*.ts files.");
  }
}

main();
