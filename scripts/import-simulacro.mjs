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

const wrongFeedback = {
  1: {
    A: "Depurar duplicados, entregas tardías y valores extremos mejora la calidad de los datos, pero no corrige el cambio de rúbrica, de unidad de análisis ni de ponderación. Por eso todavía no permite comparar válidamente los periodos.",
    C: "La triangulación ayuda a interpretar el resultado, pero se realizaría sobre mediciones que aún no son equivalentes. Primero debe corregirse la comparabilidad métrica para separar una mejora real de un efecto metodológico."
  },
  2: {
    A: "La integración de series, entrevistas y auditorías explica mecanismos y aporta contexto, pero no construye una comparación suficientemente fuerte frente a la asignación no aleatoria del acompañamiento.",
    B: "El modelo multinivel controla sede, tiempo y variables observadas, pero no aborda de manera explícita la selección no aleatoria de quienes recibieron más acompañamiento ni prueba la sensibilidad frente a ese sesgo."
  },
  3: {
    A: "Ampliar la implementación mientras solo se anexan reservas mantiene el indicador inestable y extiende una estrategia antes de definir criterios verificables para decidir si realmente funciona.",
    B: "Suspender completamente la estrategia es desproporcionado porque existe una señal favorable y no se reportan daños que exijan detenerla. Puede continuar de manera controlada mientras se valida la medición."
  },
  4: {
    B: "Las auditorías rotativas permiten detectar diferencias de ejecución, pero no fijan previamente las unidades, reglas de ausencia, fuentes y umbrales necesarios para que la medición sea estable.",
    C: "Los informes y reuniones mejoran la coordinación, pero una mayor frecuencia de reporte no corrige por sí misma las inconsistencias del indicador ni establece reglas trazables de decisión."
  },
  5: {
    B: "Priorizar innovación, factibilidad y transferencia concede ventaja al documento del asesor antes de comprobar su coherencia con el PEI, el POA y las prácticas institucionales.",
    C: "Las percepciones y resultados agregados aportan evidencia útil, pero no muestran por sí solos la correspondencia normativa y estratégica que debe orientar la revisión completa del lineamiento."
  },
  6: {
    A: "La aceptación docente y la facilidad de registro informan la viabilidad operativa, pero no demuestran que un descriptor sea pedagógicamente válido ni coherente con el enfoque institucional.",
    B: "La consistencia, progresión y observabilidad mejoran la calidad técnica del descriptor, pero son insuficientes si este contradice el PEI, excluye formas de evidencia o produce consecuencias pedagógicas no deseadas."
  },
  7: {
    A: "Probar únicamente en sedes estables repite el sesgo de representación identificado en la elaboración del marco y no permite saber cómo funciona en contextos con otras trayectorias y condiciones.",
    C: "Las mesas con expertos ayudan a depurar interpretaciones, pero no sustituyen una aplicación empírica que incluya sedes, estudiantes y trayectorias diversas con criterios definidos previamente."
  },
  8: {
    A: "Las actas, la matriz normativa y el cronograma formalizan el trámite, pero no garantizan que la decisión incorpore la evidencia de validación, los disensos ni reglas para revisar posteriormente el lineamiento.",
    B: "Los laboratorios y la asesoría entre pares favorecen la apropiación, pero no reemplazan la decisión trazable de la instancia académica competente ni las condiciones formales de aplicación y revisión."
  },
  9: {
    A: "Registrar fechas y autores produce un inventario, pero no distingue autoridad, vigencia, alcance ni función. Un material reciente o relacionado con el objetivo anual puede seguir sin ser aplicable.",
    C: "Los resultados prácticos de una matriz externa no determinan su autoridad ni corrigen las omisiones frente a la fuente oficial. La aplicabilidad documental debe resolverse antes de valorar su conveniencia."
  },
  10: {
    A: "Una circular territorial no se vuelve aplicable solo por ser auténtica, especialmente si se apoya en un borrador. Deben verificarse competencia, jerarquía, vigencia y compatibilidad con la norma nacional.",
    B: "La fecha más reciente no define por sí sola la fuerza jurídica ni el alcance. Un documento posterior puede ser técnico, orientativo o emitido por una autoridad sin competencia para modificar la regla aplicable."
  },
  11: {
    B: "Mantener las orientaciones actuales prolonga las inconsistencias ya identificadas entre PEI, planeación y evaluación, aun cuando el marco ministerial aplicable ya fue determinado.",
    C: "Cambiar la terminología de la matriz externa no corrige sus omisiones ni le otorga autoridad. Además, conserva el riesgo de reducir la diversidad de evidencias exigida por los referentes oficiales."
  },
  12: {
    A: "Analizar novedades y distribuir temas fortalece el estudio colectivo, pero no asegura validación de las fuentes, aplicación en el aula ni evaluación de los cambios realizados.",
    B: "El repositorio mejora acceso y trazabilidad documental, pero almacenar versiones no demuestra que el profesorado estudie, aplique y evalúe los referentes para transformar su práctica."
  },
  13: {
    A: "Priorizar razonamiento y autonomía deja en segundo plano las barreras, la regulación emocional, la participación física y la interacción social que forman parte del objetivo integral.",
    B: "Distribuir tiempos equivalentes por dimensiones las trata como componentes separados. El modelo exige que se articulen dentro de una misma trayectoria y a través de sus cinco fases."
  },
  14: {
    B: "Las estaciones especializadas garantizan cobertura, pero fragmentan las dimensiones y permiten que cada una funcione de manera aislada en lugar de integrarse durante toda la misión.",
    C: "La secuencia mantiene la dificultad intelectual como eje y agrega pausas y acuerdos como complementos. No integra de forma estructural movimiento, emoción, interacción y rotación de responsabilidades."
  },
  15: {
    A: "Mantener la secuencia posterga un ajuste necesario pese a que ya existen patrones claros de exclusión, evitación motriz y concentración de decisiones. Recoger más registros no elimina esas barreras.",
    C: "Un módulo separado aplaza la participación y fragmenta el modelo. Los apoyos y el liderazgo distribuido deben incorporarse dentro de la misión actual, no convertirse en un requisito previo."
  },
  16: {
    A: "Una ponderación equivalente produce un índice global, pero puede ocultar avances o dificultades específicas y no incorpora la voz estudiantil ni evidencia situada para orientar ajustes.",
    B: "Productos, asistencia, roles y satisfacción describen el funcionamiento operativo, pero no miden con suficiente precisión la calidad del desarrollo físico, cognitivo, emocional y social."
  },
  17: {
    B: "El contraste identifica diferencias conceptuales, pero no establece explícitamente qué fuentes tienen mayor solidez, alcance o pertinencia. Sin esa jerarquización es difícil delimitar la magnitud de la actualización.",
    C: "Probar el enfoque reciente antes de establecer la calidad y el alcance de la evidencia invierte el orden del análisis. Primero debe determinarse su validez disciplinar y luego decidir su aplicación."
  },
  18: {
    B: "Convertir la propuesta reciente en marco principal es prematuro porque procede de una muestra limitada y mantiene preguntas metodológicas. La novedad no justifica reemplazar un modelo aún válido bajo ciertas condiciones.",
    C: "Presentar ambos modelos como perspectivas equivalentes ignora que poseen niveles de evidencia y condiciones de validez diferentes. La relación debe explicarse mediante límites de aplicación, no mediante equivalencia general."
  },
  19: {
    A: "Una exposición comparativa permite reconocer términos y diferencias históricas, pero no demuestra que el estudiante pueda usar los modelos para explicar, predecir y decidir bajo condiciones nuevas.",
    B: "Un protocolo uniforme con resultado esperado evalúa reproducción procedimental y reduce la posibilidad de analizar controversias, predicciones rivales y límites conceptuales."
  },
  20: {
    A: "Certificados, lecturas y seminarios demuestran participación en actividades de formación, pero no evidencian cómo cambió el razonamiento disciplinar ni la práctica pedagógica.",
    C: "Los resultados antes y después pueden estar afectados por múltiples factores y no documentan las decisiones profesionales que produjeron el cambio. Por sí solos no permiten atribuirlo a la actualización disciplinar."
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
    const parsedOptions = options.map((option) => clean(option[2]));
    const correctLetter = answerKey[number].option;
    const optionFeedback = parsedOptions.map((_, index) => {
      const letter = String.fromCharCode(65 + index);
      if (letter === correctLetter) return answerKey[number].explanation;
      const feedback = wrongFeedback[number]?.[letter];
      if (!feedback) throw new Error(`Falta retroalimentacion para la pregunta ${number}, opcion ${letter}.`);
      return feedback;
    });
    return {
      id: `p${number}`,
      number,
      prompt,
      options: parsedOptions,
      answer: correctLetter.charCodeAt(0) - 65,
      explanation: answerKey[number].explanation,
      optionFeedback
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
