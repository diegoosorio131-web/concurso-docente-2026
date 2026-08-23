import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, "..");
const outputPath = path.join(projectDir, "data", "news-data.js");
const newsAssetsDir = path.join(projectDir, "assets", "news");

function assetStamp(date = new Date()) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

const currentStamp = assetStamp();

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

const seedItems = [
  {
    source: "MEN",
    title: "Gobierno del Cambio abrirá más de 26 mil plazas docentes para fortalecer la educación pública",
    url: "https://www.mineducacion.gov.co/portal/salaprensa/Comunicados/429273:Gobierno-del-Cambio-abrira-mas-de-26-mil-plazas-docentes-para-fortalecer-la-educacion-publica",
    score: 36
  },
  {
    source: "MEN",
    title: "El Ministerio de Educación y la Comisión Nacional del Servicio Civil anuncian avances claves en el concurso docente y la protección de maestros",
    url: "https://www.mineducacion.gov.co/portal/salaprensa/Comunicados/428350:El-Ministerio-de-Educacion-y-la-Comision-Nacional-del-Servicio-Civil-anuncian-avances-claves-en-el-concurso-docente-y-la-proteccion-de-maestros",
    score: 34
  },
  {
    source: "CNSC",
    title: "CNSC y Ministerio de Educación fortalecen la transparencia y el mérito docente",
    url: "https://www.cnsc.gov.co/cnsc-y-ministerio-de-educacion-fortalecen-la-transparencia-y-el-merito-docente-en-santa-marta-y-el",
    score: 28
  }
];

const keywordWeights = new Map([
  ["concurso docente", 16],
  ["directivos docentes", 14],
  ["carrera docente", 12],
  ["vacantes docentes", 12],
  ["vacantes definitivas", 12],
  ["docente", 8],
  ["docentes", 8],
  ["directivo docente", 12],
  ["maestro", 7],
  ["maestros", 7],
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

const directSignals = [
  "concurso docente",
  "concurso de meritos",
  "directivos docentes",
  "carrera docente",
  "vacantes docentes",
  "vacantes definitivas",
  "convocatoria",
  "inscripcion",
  "prueba escrita",
  "opec",
  "simo",
  "merito",
  "escalafon",
  "encargo",
  "provision de cargos",
  "reporte de vacantes"
];

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
  const cleaned = decodeHtml(
    value
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();

  // Algunas fuentes oficiales entregan UTF-8 como si fuera Latin-1.
  if (/[\u00c3\u00c2\ufffd]/.test(cleaned)) {
    try {
      const repaired = Buffer.from(cleaned, "latin1").toString("utf8").trim();
      return /[\u00c3\u00c2\ufffd]/.test(repaired) ? cleaned : repaired;
    } catch {
      return cleaned;
    }
  }
  return cleaned;
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

function directRelevanceScore(text) {
  const normalized = normalizeForScore(text);
  return directSignals.reduce((score, signal) => (
    normalized.includes(signal) ? score + 1 : score
  ), 0);
}

function classifyNews(text) {
  const normalized = normalizeForScore(text);
  if (/(convocatoria|inscripcion|prueba|concurso de meritos)/.test(normalized)) {
    return {
      topic: "Concurso y pruebas",
      priority: "prioridad",
      impact: "Revisa si modifica fechas, requisitos, pruebas o documentos de tu inscripcion."
    };
  }
  if (/(vacante|opec|provision de cargos|encargo)/.test(normalized)) {
    return {
      topic: "Vacantes y OPEC",
      priority: "seguimiento",
      impact: "Puede afectar la oferta de cargos o la forma en que se proveen las vacantes."
    };
  }
  if (/(decreto|ley|resolucion|norma|escalafon)/.test(normalized)) {
    return {
      topic: "Normativa docente",
      priority: "prioridad",
      impact: "Contrasta esta novedad con la norma vigente antes de tomar decisiones de inscripcion."
    };
  }
  if (/(carrera docente|merito|docente|maestro)/.test(normalized)) {
    return {
      topic: "Carrera docente",
      priority: "seguimiento",
      impact: "Te ayuda a entender cambios y decisiones que pueden influir en tu proceso docente."
    };
  }
  return {
    topic: "Actualidad oficial",
    priority: "informativa",
    impact: "Consulta la fuente oficial para confirmar si tiene efectos directos en tu preparacion."
  };
}

function isRelevantForApplicant(item) {
  const text = `${item.title} ${item.summary ?? ""}`;
  const directSignalsFound = directRelevanceScore(text);
  const score = relevanceScore(text);
  return directSignalsFound >= 1 && score >= 6;
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

function cleanTitle(value = "") {
  const rawTitle = cleanText(value);
  const [firstPart, ...rest] = rawTitle.split(" - ");
  const deduped = rest.length && normalizeForScore(firstPart).startsWith(normalizeForScore(rest.join(" - ").slice(0, 48)))
    ? firstPart
    : rawTitle;
  const title = deduped
    .replace(/\s+/g, " ")
    .trim();
  return title.length > 170 ? `${title.slice(0, 167).trim()}...` : title;
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
    if (directRelevanceScore(title) < 1 || score < 7) continue;
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

function extractArticleImage(html, baseUrl) {
  const images = [];
  const pattern = /<img\b[^>]*(?:src|data-src)\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = pattern.exec(html))) {
    const rawSource = decodeHtml(match[1]);
    const url = /^articles-\d+_recurso/i.test(rawSource)
      ? new URL(`/1780/${rawSource}`, baseUrl).href
      : absoluteUrl(rawSource, baseUrl);
    if (!url || !/\.(png|jpe?g|webp)(\?|$)/i.test(url)) continue;
    const normalized = normalizeForScore(url);
    let score = 0;
    if (/articles-\d+_recurso/i.test(url)) score += 30;
    if (normalized.includes("comunicado") || normalized.includes("noticia")) score += 10;
    if (normalized.includes("logo") || normalized.includes("icon")) score -= 20;
    images.push({ url, score });
  }
  return images.sort((a, b) => b.score - a.score)[0]?.url ?? "";
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
    const menArticleId = /\/Comunicados\/(\d+):/i.exec(candidate.url)?.[1];
    const inferredMenImage = menArticleId
      ? `https://www.mineducacion.gov.co/1780/articles-${menArticleId}_recurso_1.png`
      : "";
    const image = extractMeta(html, ["og:image", "twitter:image"])
      || extractArticleImage(html, candidate.url)
      || inferredMenImage;
    const title = cleanTitle(pageTitle);
    const cleanedSummary = summary.slice(0, 260);
    const classification = classifyNews(`${title} ${cleanedSummary}`);
    return {
      ...candidate,
      title,
      summary: cleanedSummary || "Consulta la publicacion oficial para conocer todos los detalles.",
      date: extractDate(html),
      image: image ? absoluteUrl(image, candidate.url) : candidate.image,
      topic: classification.topic,
      priority: classification.priority,
      impact: classification.impact,
      score: relevanceScore(`${title} ${cleanedSummary}`)
    };
  } catch (error) {
    console.warn(`No se pudo ampliar ${candidate.url}: ${error.message}`);
    return {
      ...candidate,
      summary: "Consulta la publicacion oficial para conocer todos los detalles.",
      date: "",
      ...classifyNews(candidate.title)
    };
  }
}

function recencyScore(date) {
  if (!date) return 0;
  const ageDays = Math.max(0, (Date.now() - new Date(`${date}T00:00:00Z`).valueOf()) / 86400000);
  return Math.max(0, 18 - ageDays / 7);
}

function dateValue(item) {
  const value = Date.parse(`${item.date || ""}T00:00:00Z`);
  return Number.isNaN(value) ? 0 : value;
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

async function localizeFeatureImage(items) {
  const feature = items[0];
  if (!feature?.image?.startsWith("https://")) return;
  try {
    const response = await fetch(feature.image, {
      headers: {
        "Accept": "image/avif,image/webp,image/png,image/jpeg",
        "User-Agent": "Aula2026-NewsBot/1.0 (+https://github.com/)"
      },
      signal: AbortSignal.timeout(20000)
    });
    const contentType = response.headers.get("content-type") ?? "";
    if (!response.ok || !contentType.startsWith("image/")) {
      throw new Error(`${response.status} ${contentType || "sin tipo de contenido"}`);
    }
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.length > 8_000_000) throw new Error("la imagen supera 8 MB");
    await mkdir(newsAssetsDir, { recursive: true });
    const fileName = `feature-${currentStamp}.${imageExtension(contentType)}`;
    await writeFile(path.join(newsAssetsDir, fileName), bytes);
    feature.image = `assets/news/${fileName}`;
  } catch (error) {
    console.warn(`No se pudo guardar la imagen principal: ${error.message}`);
    delete feature.image;
  }
}

function imageExtension(contentType = "") {
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  return "jpg";
}

function defaultNewsImage(item) {
  return item.source === "CNSC" ? "assets/news/source-cnsc.svg" : "assets/news/source-men.svg";
}

async function localizeNewsImages(items) {
  await mkdir(newsAssetsDir, { recursive: true });
  for (const [index, item] of items.entries()) {
    if (!item.image?.startsWith("https://")) {
      item.image = item.image || defaultNewsImage(item);
      continue;
    }

    try {
      const response = await fetch(item.image, {
        headers: {
          "Accept": "image/avif,image/webp,image/png,image/jpeg",
          "User-Agent": "Aula2026-NewsBot/1.0 (+https://github.com/)"
        },
        signal: AbortSignal.timeout(20000)
      });
      const contentType = response.headers.get("content-type") ?? "";
      if (!response.ok || !contentType.startsWith("image/")) {
        throw new Error(`${response.status} ${contentType || "sin tipo de contenido"}`);
      }
      const bytes = new Uint8Array(await response.arrayBuffer());
      if (bytes.length > 8_000_000) throw new Error("la imagen supera 8 MB");
      const fileName = index === 0
        ? `feature-${currentStamp}.${imageExtension(contentType)}`
        : `item-${index + 1}-${currentStamp}.${imageExtension(contentType)}`;
      await writeFile(path.join(newsAssetsDir, fileName), bytes);
      item.image = `assets/news/${fileName}`;
    } catch (error) {
      console.warn(`No se pudo guardar imagen de ${item.url}: ${error.message}`);
      item.image = defaultNewsImage(item);
    }
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

  const existing = await loadExistingItems();
  const unique = [...new Map([
    ...existing.filter(isRelevantForApplicant),
    ...discovered.slice(0, 18),
    ...seedItems
  ].map((item) => [item.url, item])).values()];
  const enriched = await Promise.all(unique.map(enrichCandidate));
  const relevantDiscovered = enriched.filter(isRelevantForApplicant);
  const enrichedByUrl = new Map(enriched.map((item) => [item.url, item]));
  const refreshedExisting = existing.filter(isRelevantForApplicant).map((item) => {
    const fresh = enrichedByUrl.get(item.url);
    return fresh
      ? {
          ...item,
          title: fresh.title || item.title,
          summary: fresh.summary || item.summary,
          date: fresh.date || item.date,
          image: fresh.image || item.image,
          topic: fresh.topic || item.topic,
          priority: fresh.priority || item.priority,
          impact: fresh.impact || item.impact
        }
      : item;
  });
  const combined = [...relevantDiscovered, ...refreshedExisting]
    .filter((item) => item.title && item.url);

  let ranked = [...new Map(combined.map((item) => [item.url, item])).values()]
    .map((item) => ({ ...item, rank: (item.score ?? relevanceScore(item.title)) + recencyScore(item.date) }))
    .sort((a, b) => b.rank - a.rank)
    .slice(0, 6)
    .map(({ rank, score, ...item }) => item);

  if (ranked.length < 2) {
    ranked = existing
      .filter(isRelevantForApplicant)
      .sort((a, b) => dateValue(b) - dateValue(a))
      .slice(0, 6);
  }

  if (ranked.length < 2) {
    throw new Error("No se encontraron al menos dos noticias relevantes; se conserva el archivo anterior.");
  }

  await localizeFeatureImage(ranked);
  await localizeNewsImages(ranked);
  const payload = {
    generatedAt: new Date().toISOString(),
    updateMode: "automatic",
    sources: sources.map((source) => ({ name: source.name, url: source.url })),
    items: ranked
  };
  await writeFile(outputPath, `window.AULA_NEWS = ${JSON.stringify(payload, null, 2)};\n`, "utf8");
  console.log(`Noticias actualizadas: ${ranked.length}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
