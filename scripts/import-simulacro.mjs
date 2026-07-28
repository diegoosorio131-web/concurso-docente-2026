import fs from "node:fs";
import path from "node:path";

const [, , inputPath, outputPath = "data/simulacros.js"] = process.argv;

if (!inputPath) {
  throw new Error("Uso: node scripts/import-simulacro.mjs <archivo.txt> [salida.js]");
}

const answerKey = {
  1: {
    option: "B",
    explanation: "Antes de interpretar el aumento es necesario hacer comparables los dos periodos. Homologar la rubrica, recuperar la unidad de analisis docente y corregir la ponderacion evita atribuir al resultado cambios producidos por el metodo de medicion."
  },
  2: {
    option: "C",
    explanation: "El acompanamiento no fue asignado al azar y su intensidad vario entre sedes. Comparar grupos semejantes, emparejar sus condiciones iniciales y aplicar analisis de sensibilidad permite examinar mejor ese sesgo y otras explicaciones rivales."
  },
  3: {
    option: "C",
    explanation: "La evidencia muestra un avance, pero todavia no permite cerrar la accion ni adoptar definitivamente la estrategia. Mantenerla bajo validacion, redefinir el indicador y establecer umbrales equilibra continuidad, prudencia y trazabilidad."
  },
  4: {
    option: "A",
    explanation: "Un protocolo definido antes de medir fija unidades, fuentes, tratamiento de ausencias y umbrales de decision. Esto estabiliza la medicion y permite saber cuando y por que se activa cada ajuste."
  },
  5: {
    option: "A",
    explanation: "La revision debe comenzar por la coherencia institucional. Relacionar PEI, objetivos, POA, practicas y evidencia permite detectar rupturas antes de decidir ajustes sobre descriptores particulares."
  },
  6: {
    option: "C",
    explanation: "La permanencia de un descriptor no depende solo de que sea claro o facil de aplicar. Debe corresponder con los principios del PEI, responder a evidencia contextual y evitar consecuencias pedagogicas contrarias al enfoque institucional."
  },
  7: {
    option: "B",
    explanation: "Una validacion representativa debe incluir la diversidad de sedes y trayectorias. Estratificar la prueba y definir previamente criterios de pertinencia, equidad y comprension permite identificar efectos que una sede estable podria ocultar."
  },
  8: {
    option: "C",
    explanation: "La legitimidad exige una decision de la instancia academica competente sustentada en una version trazable. Incluir evidencia, disensos, reglas de aplicacion y umbrales permite justificar la adopcion y revisar posteriormente su vigencia."
  },
  9: {
    option: "B",
    explanation: "Antes de usar los materiales se debe distinguir su autoridad, vigencia, alcance, version y funcion. Esa clasificacion separa referentes aplicables de borradores, sintesis, herramientas privadas o documentos desactualizados."
  },
  10: {
    option: "C",
    explanation: "Ni la fecha ni el origen territorial bastan por si solos. La decision debe considerar fuerza juridica, competencia de la autoridad, ambito, vigencia y finalidad para articular correctamente normas y orientaciones tecnicas."
  },
  11: {
    option: "A",
    explanation: "Las orientaciones deben derivarse de referentes vigentes, conservar coherencia con el PEI y validarse con evidencias diversas. Esto evita mantener practicas desactualizadas o convertir una matriz externa en fuente obligatoria."
  },
  12: {
    option: "C",
    explanation: "La actualizacion profesional es verificable cuando funciona como un ciclo permanente: rastrear, validar, estudiar, aplicar y evaluar. Las evidencias de aplicacion permiten ajustar tanto las practicas como las necesidades formativas."
  },
  13: {
    option: "C",
    explanation: "La planeacion integral debe conectar el diagnostico con los propositos, las fases del modelo, las barreras y las evidencias. Esa articulacion permite ajustar la trayectoria sin separar artificialmente las dimensiones del desarrollo."
  },
  14: {
    option: "A",
    explanation: "Las misiones interdependientes integran movimiento, indagacion, regulacion emocional y participacion social dentro de cada fase. Los roles rotativos evitan que las dimensiones se conviertan en estaciones aisladas o accesorios."
  },
  15: {
    option: "B",
    explanation: "El problema observado es de acceso y participacion, no de falta de precision intelectual. Ajustar demandas motrices, apoyos y responsabilidades con rotacion amplia la participacion sin reducir el reto formativo."
  },
  16: {
    option: "C",
    explanation: "El desarrollo integral no se demuestra con un unico indice. Triangular indicadores observables en distintos momentos, voz estudiantil y desempenos situados produce evidencia util para ajustar apoyos y misiones posteriores."
  },
  17: {
    option: "A",
    explanation: "Para delimitar la actualizacion se deben jerarquizar las fuentes por actualidad, revision experta, alcance explicativo y pertinencia curricular. Esto diferencia hallazgos consolidados de propuestas preliminares o simplificaciones comerciales."
  },
  18: {
    option: "A",
    explanation: "Si los modelos explican fenomenos bajo condiciones distintas, el saber debe explicitar principios estables, limites de aplicacion y hallazgos emergentes. Así se evitan tanto la sustitucion total como una falsa equivalencia."
  },
  19: {
    option: "C",
    explanation: "Contrastar predicciones rivales, evidencia limite y condiciones de aplicacion exige comprender la estructura y el alcance de los modelos. Esa transferencia demuestra dominio conceptual mejor que repetir terminologia o seguir un protocolo esperado."
  },
  20: {
    option: "B",
    explanation: "Un portafolio trazable conecta fuentes revisadas, cambios conceptuales, decisiones didacticas y evidencias de aplicacion. Por eso demuestra simultaneamente actualizacion disciplinar y transformacion de la practica pedagogica."
  }
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
      answer: answerKey[number].option.charCodeAt(0) - 65,
      explanation: answerKey[number].explanation
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
