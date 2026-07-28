import fs from "node:fs";
import path from "node:path";

const [, , inputPath, outputPath = "data/simulacros.js"] = process.argv;

if (!inputPath) {
  throw new Error("Uso: node scripts/import-simulacro.mjs <archivo.txt> [salida.js]");
}

const answerKey = {
  1: "B", 2: "C", 3: "C", 4: "A",
  5: "A", 6: "C", 7: "B", 8: "C",
  9: "B", 10: "C", 11: "A", 12: "C",
  13: "C", 14: "A", 15: "B", 16: "C",
  17: "A", 18: "A", 19: "C", 20: "B"
};

const blockMetadata = {
  1: {
    category: "pedagogica",
    topic: "Seguimiento y evaluacion institucional"
  },
  5: {
    category: "pedagogica",
    topic: "Lineamientos pedagogicos y PEI"
  },
  9: {
    category: "pedagogica",
    topic: "Referentes de calidad y actualizacion institucional"
  },
  13: {
    category: "pedagogica",
    topic: "Planeacion y desarrollo integral"
  },
  17: {
    category: "especificos",
    topic: "Actualizacion y dominio disciplinar"
  }
};

function clean(value) {
  return value
    .replace(/\r/g, "")
    .replace(/^\s*\*\s*$/gm, "")
    .replace(/^\s*1 punto\s*$/gim, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function parseQuestions(content) {
  const matches = [...content.matchAll(/(?:^|\n)(\d+)\.\s+([\s\S]*?)(?=(?:\n\d+\.\s+)|$)/g)];
  return matches.map((match) => {
    const number = Number(match[1]);
    const body = clean(match[2]);
    const options = [...body.matchAll(/(?:^|\n)([A-C])\.\s+([^\n]+)/g)];

    if (options.length !== 3) {
      throw new Error(`La pregunta ${number} no contiene exactamente tres opciones.`);
    }

    const prompt = clean(body.slice(0, options[0].index));
    return {
      id: `p${number}`,
      number,
      prompt,
      options: options.map((option) => clean(option[2])),
      answer: answerKey[number].charCodeAt(0) - 65
    };
  });
}

const source = fs.readFileSync(path.resolve(inputPath), "utf8");
const blockPattern = /CONTESTE LAS PREGUNTAS (\d+) A (\d+) DE ACUERDO A LA SIGUIENTE SITUACIÓN\s*\n([\s\S]*?)(?=CONTESTE LAS PREGUNTAS|\s*$)/g;
const blocks = [...source.matchAll(blockPattern)].map((match) => {
  const start = Number(match[1]);
  const end = Number(match[2]);
  const blockContent = clean(match[3]);
  const firstQuestion = blockContent.search(new RegExp(`(?:^|\\n)${start}\\.\\s+`));

  if (firstQuestion < 0) {
    throw new Error(`No se encontro la pregunta inicial del bloque ${start}-${end}.`);
  }

  const metadata = blockMetadata[start];
  const questions = parseQuestions(blockContent.slice(firstQuestion));
  if (questions.length !== end - start + 1) {
    throw new Error(`El bloque ${start}-${end} contiene ${questions.length} preguntas.`);
  }

  return {
    id: `situacion-${start}-${end}`,
    range: `${start}-${end}`,
    category: metadata.category,
    topic: metadata.topic,
    situation: clean(blockContent.slice(0, firstQuestion)),
    questions
  };
});

const questionCount = blocks.reduce((total, block) => total + block.questions.length, 0);
if (blocks.length !== 5 || questionCount !== 20) {
  throw new Error(`Se esperaban 5 situaciones y 20 preguntas; se obtuvieron ${blocks.length} y ${questionCount}.`);
}

const data = {
  version: 1,
  generatedAt: new Date().toISOString(),
  provisionalAnswerKey: true,
  tests: [
    {
      id: "prueba-competencias-docentes-01",
      title: "Prueba de competencias docentes 01",
      source: "Prueba aportada por el usuario",
      blocks
    }
  ]
};

const destination = path.resolve(outputPath);
fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, `window.AULA_SIMULACROS = ${JSON.stringify(data, null, 2)};\n`, "utf8");
console.log(`Importadas ${questionCount} preguntas en ${blocks.length} situaciones.`);
