import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, "..");
const outputPath = path.join(projectDir, "data", "news-data.js");

const sources = [
  {
    name: "CNSC",
    url: "https://www.cnsc.gov.co/cnsc-al-dia",
    host: "cnsc.gov.co"
  },
  {
    name: "MEN",
    url: "https://www.mineducacion.gov.co/portal/salaprensa/Comunicados/",
    host: "mineducacion.gov.co"
  }
];

const keywordWeights = new Map([
  ["concurso docente", 16],
  ["directivos docentes", 14],
  ["carrera docente", 12],
  ["vacantes docentes", 12],
  ["docente", 8],
  ["maestro", 7],
  ["convocatoria", 7],
  ["vacante", 7],
  ["merito", 6],
  ["opec", 6],
  ["simo", 6],
  ["cnsc", 5],
  ["educacion", 3],
  ["empleo", 3],
  ["encargo", 3],
  ["escalafon", 5]
]);

function decodeHtml(value = "") {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: "\""
  };

  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (entity, name) => named[name.toLowerCase()] ?? entity);
}

function cleanText(value = "") {
  return decodeHtml(
    value
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeForScore(value = "") {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function relevanceScore(text) {
  const normalized = normalizeForScore(text);
  let score = 0;
  for (const [keyword, weight] of keywordWeights) {
    if (normalized.includes(keyword)) score += weight;
  }
  return score;
}

function absoluteUrl(href, base) {
  try {
    const url = new URL(decodeHtml(href), base);
    url.hash = "";
    return url.href;
  } catch {
    return null;
  }
}

function titleFromUrl(url) {
  try {
    const lastPart = decodeURIComponent(new URL(url).pathname.split("/").filter(Boolean).at(-1) ?? "");
    const slug = lastPart.includes(":") ? lastPart.split(":").slice(1).join(":") : lastPart;
    const title = slug.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
    return title ? title.charAt(0).toUpperCase() + title.slice(1) : "";
  } catch {
    return "";
  }
}

function extractLinks(html, source) {
  const links = [];
  const anchorPattern = /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;

  while ((match = anchorPattern.exec(html))) {
    const url = absoluteUrl(match[1], source.url);
    if (!url) continue;
    const anchorTitle = cleanText(match[2]);
    const title = anchorTitle.length >= 32 ? anchorTitle : titleFromUrl(url);
    if (title.length < 32 || title.length > 220) continue;
    if (!new URL(url).hostname.endsWith(source.host)) continue;
    if (/\.(pdf|docx?|xlsx?|zip)(\?|$)/i.test(url)) continue;

    const score = relevanceScore(title);
    if (score < 5) continue;
    links.push({ source: source.name, title, url, score });
  }

  return [...new Map(links.map((item) => [item.url, item])).values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
}

function extractMeta(html, names) {
  for (const name of names) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const first = new RegExp(`<meta[^>]+(?:property|name)=["']${escaped}["'][^>]+content=["']([^"']+)["']`, "i").exec(html);
    if (first) return cleanText(first[1]);
    const reversed = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${escaped}["']`, "i").exec(html);
    if (reversed) return cleanText(reversed[1]);
  }
  return "";
}

function extractDate(html) {
  const candidates = [
    extractMeta(html, ["article:published_time", "date", "DC.date"]),
    /"datePublished"\s*:\s*"([^"]+)"/i.exec(html)?.[1] ?? "",
    /Actualizado:\s*(\d{1,2}\s+de\s+[a-z]+\s+de\s+\d{4})/i.exec(cleanText(html))?.[1] ?? ""
  ];

  const months = {
    enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
    julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
  };

  for (const candidate of candidates) {
    if (!candidate) continue;
    const spanish = candidate.toLowerCase().match(/(\d{1,2})\s+de\s+([a-z]+)\s+de\s+(\d{4})/);
    if (spanish && months[spanish[2]] !== undefined) {
      return new Date(Date.UTC(Number(spanish[3]), months[spanish[2]], Number(spanish[1]))).toISOString().slice(0, 10);
    }
    const parsed = new Date(candidate);
    if (!Number.isNaN(parsed.valueOf())) return parsed.toISOString().slice(0, 10);
  }
  return "";
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "Accept": "text/html,application/xhtml+xml",
      "User-Agent": "Aula2026-NewsBot/1.0 (+https://github.com/)"
    },
    signal: AbortSignal.timeout(20000)
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.text();
}

async function enrichCandidate(candidate) {
  try {
    const html = await fetchText(candidate.url);
    const pageTitle = extractMeta(html, ["og:title", "twitter:title"]) || candidate.title;
    const summary = extractMeta(html, ["description", "og:description"])
      || cleanText(/<p\b[^>]*>([\s\S]*?)<\/p>/i.exec(html)?.[1] ?? "");
    const title = pageTitle.slice(0, 180);
    const cleanedSummary = summary.slice(0, 260);
    return {
      ...candidate,
      title,
      summary: cleanedSummary || "Consulta la publicacion oficial para conocer todos los detalles.",
      date: extractDate(html),
      topic: relevanceScore(`${title} ${cleanedSummary}`) >= 15 ? "Concurso y carrera docente" : "Actualidad educativa",
      score: relevanceScore(`${title} ${cleanedSummary}`)
    };
  } catch (error) {
    console.warn(`No se pudo ampliar ${candidate.url}: ${error.message}`);
    return {
      ...candidate,
      summary: "Consulta la publicacion oficial para conocer todos los detalles.",
      date: "",
      topic: "Actualidad educativa"
    };
  }
}

function recencyScore(date) {
  if (!date) return 0;
  const ageDays = Math.max(0, (Date.now() - new Date(`${date}T00:00:00Z`).valueOf()) / 86400000);
  return Math.max(0, 18 - ageDays / 7);
}

async function loadExistingItems() {
  try {
    const current = await readFile(outputPath, "utf8");
    const json = current.match(/window\.AULA_NEWS\s*=\s*({[\s\S]*});?\s*$/)?.[1];
    return json ? JSON.parse(json).items ?? [] : [];
  } catch {
    return [];
  }
}

async function main() {
  const discovered = [];

  for (const source of sources) {
    try {
      const html = await fetchText(source.url);
      discovered.push(...extractLinks(html, source));
    } catch (error) {
      console.warn(`No se pudo consultar ${source.name}: ${error.message}`);
    }
  }

  const unique = [...new Map(discovered.map((item) => [item.url, item])).values()];
  const enriched = await Promise.all(unique.slice(0, 18).map(enrichCandidate));
  const existing = await loadExistingItems();
  const relevantDiscovered = enriched
    .filter((item) => relevanceScore(`${item.title} ${item.summary ?? ""}`) >= 6);
  const combined = [...relevantDiscovered, ...existing]
    .filter((item) => item.title && item.url);

  const ranked = [...new Map(combined.map((item) => [item.url, item])).values()]
    .map((item) => ({ ...item, rank: (item.score ?? relevanceScore(item.title)) + recencyScore(item.date) }))
    .sort((a, b) => b.rank - a.rank)
    .slice(0, 6)
    .map(({ rank, score, ...item }) => item);

  if (ranked.length < 3) {
    throw new Error("No se encontraron al menos tres noticias relevantes; se conserva el archivo anterior.");
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    items: ranked
  };
  await writeFile(outputPath, `window.AULA_NEWS = ${JSON.stringify(payload, null, 2)};\n`, "utf8");
  console.log(`Noticias actualizadas: ${ranked.length}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
