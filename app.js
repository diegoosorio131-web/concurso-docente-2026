const questionBank = [
  {
    category: "pedagogia",
    question: "Una docente detecta que varios estudiantes resuelven problemas, pero no explican el procedimiento. Que estrategia evalua mejor la comprension?",
    options: [
      "Aumentar la cantidad de ejercicios mecanicos para lograr velocidad.",
      "Pedir que comparen dos soluciones y justifiquen cual es mas eficiente.",
      "Aplicar una prueba solo de respuesta numerica al final de la unidad.",
      "Repetir la explicacion inicial con los mismos ejemplos."
    ],
    answer: 1,
    explanation: "Comparar y justificar exige argumentacion, metacognicion y transferencia; permite ver si el estudiante comprende el proceso, no solo el resultado."
  },
  {
    category: "pedagogia",
    question: "En un grupo con ritmos de aprendizaje distintos, cual decision se ajusta mejor a una evaluacion formativa?",
    options: [
      "Calificar solo el producto final para evitar sesgos.",
      "Usar evidencias parciales, retroalimentacion y ajustes durante el proceso.",
      "Aplicar la misma recuperacion al finalizar el periodo.",
      "Separar permanentemente a los estudiantes por rendimiento."
    ],
    answer: 1,
    explanation: "La evaluacion formativa recoge evidencias durante el aprendizaje y orienta decisiones pedagogicas oportunas."
  },
  {
    category: "pedagogia",
    question: "Un proyecto transversal sobre agua en la comunidad fortalece principalmente:",
    options: [
      "La memorizacion aislada de conceptos por asignatura.",
      "La integracion de saberes para resolver una situacion contextualizada.",
      "La eliminacion de los criterios de evaluacion.",
      "La sustitucion completa de la planeacion curricular."
    ],
    answer: 1,
    explanation: "Los proyectos contextualizados articulan areas, competencias y problemas reales del entorno."
  },
  {
    category: "normativa",
    question: "En Colombia, el ingreso a cargos de carrera docente se fundamenta principalmente en el principio de:",
    options: [
      "Merito.",
      "Antiguedad automatica.",
      "Recomendacion personal.",
      "Orden de llegada."
    ],
    answer: 0,
    explanation: "La carrera administrativa y docente se orienta por el merito, la igualdad de oportunidades y la seleccion objetiva."
  },
  {
    category: "normativa",
    question: "Para una convocatoria docente, cual accion es indispensable antes de inscribirse?",
    options: [
      "Revisar el acuerdo, anexo, requisitos y OPEC del empleo de interes.",
      "Inscribirse primero y revisar requisitos despues de pagar.",
      "Elegir cualquier empleo porque todos tienen los mismos requisitos.",
      "Guiarse solo por publicaciones en redes sociales."
    ],
    answer: 0,
    explanation: "Cada empleo puede tener requisitos, perfil, ubicacion y reglas especificas; la fuente oficial evita errores de inscripcion."
  },
  {
    category: "normativa",
    question: "Si un aspirante no cumple el requisito minimo de formacion o experiencia de la OPEC, lo mas probable es que:",
    options: [
      "Sea admitido si obtiene buen puntaje en la prueba.",
      "Pueda homologar automaticamente cualquier curso corto.",
      "Sea excluido o no supere la verificacion de requisitos minimos.",
      "Quede nombrado en periodo de prueba."
    ],
    answer: 2,
    explanation: "La verificacion de requisitos minimos es una etapa habilitante; no se compensa con puntajes posteriores si la regla no lo permite."
  },
  {
    category: "competencias",
    question: "Un rector recibe quejas por conflictos entre dos equipos docentes. Cual respuesta evidencia liderazgo pedagogico?",
    options: [
      "Ignorar el conflicto mientras no afecte documentos oficiales.",
      "Imponer una decision sin escuchar a las partes.",
      "Facilitar acuerdos, revisar evidencias y alinear el trabajo con metas institucionales.",
      "Trasladar el problema al comite sin seguimiento."
    ],
    answer: 2,
    explanation: "El liderazgo pedagogico combina escucha, gestion de acuerdos, evidencia y foco en el aprendizaje institucional."
  },
  {
    category: "competencias",
    question: "Una familia solicita ajustes para un estudiante con barreras de aprendizaje. Que actuacion es mas adecuada?",
    options: [
      "Remitir siempre a educacion especial y suspender la evaluacion.",
      "Identificar barreras, acordar apoyos razonables y hacer seguimiento.",
      "Aplicar exactamente las mismas actividades sin adaptacion.",
      "Reducir expectativas academicas sin evidencias."
    ],
    answer: 1,
    explanation: "La inclusion exige reconocer barreras, implementar apoyos y mantener expectativas con seguimiento pedagogico."
  },
  {
    category: "competencias",
    question: "Al analizar resultados bajos en lectura, la accion mas pertinente es:",
    options: [
      "Atribuirlos solo a falta de interes de los estudiantes.",
      "Cruzar evidencias, identificar habilidades afectadas y planear intervenciones.",
      "Eliminar textos complejos durante todo el periodo.",
      "Cambiar las notas para evitar reprobacion."
    ],
    answer: 1,
    explanation: "La toma de decisiones basada en evidencias permite intervenir habilidades concretas y evaluar avances."
  },
  {
    category: "lectura",
    question: "Lee la afirmacion: 'El uso de tecnologia mejora el aprendizaje cuando responde a una intencion pedagogica clara'. La idea central es que la tecnologia:",
    options: [
      "Siempre mejora el aprendizaje por si misma.",
      "Debe reemplazar la interaccion docente.",
      "Es efectiva cuando esta articulada con propositos de aprendizaje.",
      "Solo sirve para evaluar."
    ],
    answer: 2,
    explanation: "La condicion clave es la intencion pedagogica; la herramienta no garantiza aprendizaje por si sola."
  },
  {
    category: "lectura",
    question: "En un texto argumentativo, una evidencia cumple mejor su funcion cuando:",
    options: [
      "Decora el texto con datos llamativos.",
      "Sustenta de manera pertinente la tesis o una razon.",
      "Repite la opinion del autor con otras palabras.",
      "Evita que el lector formule preguntas."
    ],
    answer: 1,
    explanation: "La evidencia debe respaldar la tesis con informacion pertinente, verificable o razonada."
  },
  {
    category: "lectura",
    question: "Si dos parrafos presentan causas y consecuencias de la desercion escolar, la relacion logica predominante es:",
    options: [
      "Contraste.",
      "Secuencia temporal.",
      "Causalidad.",
      "Enumeracion sin relacion."
    ],
    answer: 2,
    explanation: "Causas y consecuencias establecen una relacion causal entre factores y efectos."
  },
  {
    category: "pedagogia",
    question: "Una rubrica es especialmente util porque:",
    options: [
      "Oculta los criterios para evitar respuestas preparadas.",
      "Describe niveles de desempeno y criterios observables.",
      "Sirve solo para asignar una nota numerica.",
      "Elimina la necesidad de retroalimentar."
    ],
    answer: 1,
    explanation: "La rubrica explicita criterios y niveles, lo que mejora la transparencia y la retroalimentacion."
  },
  {
    category: "pedagogia",
    question: "Cuando una clase inicia con una pregunta problema cercana al contexto de los estudiantes, se busca principalmente:",
    options: [
      "Activar saberes previos y dar sentido al aprendizaje.",
      "Evitar la planeacion de actividades posteriores.",
      "Reducir la participacion para avanzar mas rapido.",
      "Sustituir todos los recursos didacticos."
    ],
    answer: 0,
    explanation: "Una pregunta contextualizada conecta conocimientos previos, curiosidad y proposito de aprendizaje."
  },
  {
    category: "pedagogia",
    question: "Si una actividad colaborativa produce baja participacion, el ajuste mas pertinente es:",
    options: [
      "Eliminar todo trabajo en equipo durante el ano.",
      "Asignar roles claros, criterios de producto y momentos de seguimiento.",
      "Calificar igual a todos sin revisar aportes.",
      "Dejar que los estudiantes definan el objetivo al final."
    ],
    answer: 1,
    explanation: "La colaboracion mejora cuando hay roles, metas visibles, evidencias y seguimiento del proceso."
  },
  {
    category: "competencias",
    question: "Ante una situacion de presunto acoso escolar, la prioridad institucional debe ser:",
    options: [
      "Publicar el caso para generar presion social.",
      "Activar la ruta correspondiente, proteger a los estudiantes y registrar actuaciones.",
      "Esperar a que el conflicto se resuelva solo.",
      "Sancionar sin escuchar versiones ni recopilar informacion."
    ],
    answer: 1,
    explanation: "Las situaciones de convivencia requieren ruta, proteccion, debido proceso y seguimiento documentado."
  },
  {
    category: "competencias",
    question: "Un docente identifica que su estrategia no esta funcionando. Que evidencia mejor una practica reflexiva?",
    options: [
      "Mantener la estrategia porque ya estaba planeada.",
      "Culpar al grupo y continuar con el cronograma.",
      "Analizar evidencias, pedir retroalimentacion y ajustar la secuencia.",
      "Cancelar la evaluacion para evitar resultados bajos."
    ],
    answer: 2,
    explanation: "La practica reflexiva usa evidencias y retroalimentacion para mejorar decisiones pedagogicas."
  },
  {
    category: "normativa",
    question: "El periodo de prueba en carrera docente busca principalmente:",
    options: [
      "Verificar el desempeno del docente nombrado antes de adquirir derechos de carrera.",
      "Evitar cualquier evaluacion del desempeno.",
      "Reemplazar el concurso de meritos.",
      "Permitir nombramientos sin requisitos."
    ],
    answer: 0,
    explanation: "El periodo de prueba permite valorar desempeno y cumplimiento en el cargo antes de consolidar la vinculacion de carrera."
  },
  {
    category: "normativa",
    question: "Cual documento debe orientar al aspirante sobre estructura de pruebas, citacion y recomendaciones operativas?",
    options: [
      "Una publicacion informal de terceros.",
      "La guia oficial de orientacion al aspirante.",
      "Un resumen sin fecha compartido por mensajeria.",
      "Una opinion personal sobre concursos anteriores."
    ],
    answer: 1,
    explanation: "La guia oficial define instrucciones del proceso; debe revisarse junto con el acuerdo, anexos y avisos de CNSC."
  },
  {
    category: "lectura",
    question: "Si un autor afirma una idea y luego presenta un caso concreto para ilustrarla, usa principalmente una estrategia de:",
    options: [
      "Ejemplificacion.",
      "Contradiccion.",
      "Circularidad.",
      "Ambiguedad deliberada."
    ],
    answer: 0,
    explanation: "El caso concreto funciona como ejemplo que ayuda a comprender o sostener la idea general."
  },
  {
    category: "lectura",
    question: "Una inferencia valida en lectura critica se caracteriza por:",
    options: [
      "Depender solo de conocimientos externos sin relacion con el texto.",
      "Derivarse de pistas textuales y ser coherente con la informacion dada.",
      "Contradecir la tesis para proponer una respuesta novedosa.",
      "Repetir literalmente una frase del parrafo."
    ],
    answer: 1,
    explanation: "Inferir implica concluir informacion no explicita, pero sustentada en pistas y relaciones del texto."
  }
];

const studyItems = [
  "Leer el acuerdo, anexo y guia de orientacion cuando la CNSC los publique.",
  "Verificar requisitos minimos de la OPEC antes de pagar derechos de participacion.",
  "Repasar evaluacion formativa, inclusion, diseno universal y convivencia escolar.",
  "Practicar lectura critica con tesis, inferencias, evidencias y relaciones logicas.",
  "Hacer simulacros cronometrados y revisar errores por categoria.",
  "Organizar certificados de formacion y experiencia en SIMO con soportes legibles."
];

const flashcards = [
  {
    front: "Merito",
    back: "Principio central de ingreso y ascenso en empleos de carrera: seleccion objetiva segun requisitos, pruebas y reglas de convocatoria."
  },
  {
    front: "Evaluacion formativa",
    back: "Proceso continuo para recoger evidencias, retroalimentar y ajustar la ensenanza antes del cierre de una unidad."
  },
  {
    front: "OPEC",
    back: "Oferta Publica de Empleos de Carrera. Detalla empleo, ubicacion, funciones y requisitos."
  },
  {
    front: "Inclusion",
    back: "Identificar barreras, aplicar apoyos razonables y garantizar participacion y aprendizaje."
  }
];

const state = {
  currentSet: [],
  answers: [],
  currentIndex: 0,
  reviewMode: false,
  timeLeft: 45 * 60,
  timerId: null
};

const storageKey = "concursoDocente2026";
const themeKey = "concursoDocente2026Theme";
const sidebarKey = "concursoDocente2026Sidebar";
const els = {
  tabs: document.querySelectorAll(".tab"),
  views: document.querySelectorAll(".view"),
  homeLink: document.getElementById("homeLink"),
  themeToggle: document.getElementById("themeToggle"),
  mobileThemeToggle: document.getElementById("mobileThemeToggle"),
  sidebarToggle: document.getElementById("sidebarToggle"),
  sidebarOpenBtn: document.getElementById("sidebarOpenBtn"),
  newsFeature: document.getElementById("newsFeature"),
  newsList: document.getElementById("newsList"),
  newsUpdated: document.getElementById("newsUpdated"),
  presets: document.querySelectorAll(".preset"),
  categorySelect: document.getElementById("categorySelect"),
  amountInput: document.getElementById("amountInput"),
  minutesInput: document.getElementById("minutesInput"),
  startBtn: document.getElementById("startBtn"),
  resetBtn: document.getElementById("resetBtn"),
  questionCard: document.getElementById("questionCard"),
  questionMeta: document.getElementById("questionMeta"),
  answeredCount: document.getElementById("answeredCount"),
  questionNavigator: document.getElementById("questionNavigator"),
  progressBar: document.getElementById("progressBar"),
  timer: document.getElementById("timer"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  finishBtn: document.getElementById("finishBtn"),
  questionCount: document.getElementById("questionCount"),
  bestScore: document.getElementById("bestScore"),
  studyStreak: document.getElementById("studyStreak"),
  studyPlan: document.getElementById("studyPlan"),
  flashcards: document.getElementById("flashcards"),
  attemptsList: document.getElementById("attemptsList"),
  recommendations: document.getElementById("recommendations")
};

function loadProgress() {
  const fallback = { attempts: [], completedItems: [], lastStudyDate: null, streak: 0 };
  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(storageKey)) };
  } catch {
    return fallback;
  }
}

function saveProgress(progress) {
  localStorage.setItem(storageKey, JSON.stringify(progress));
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function updateMetrics() {
  const progress = loadProgress();
  const best = progress.attempts.reduce((max, attempt) => Math.max(max, attempt.score), 0);
  els.questionCount.textContent = questionBank.length;
  els.bestScore.textContent = `${best}%`;
  els.studyStreak.textContent = `${progress.streak || 0} dias`;
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(themeKey, theme);
  if (els.themeToggle) {
    els.themeToggle.textContent = theme === "dark" ? "Claro" : "Oscuro";
  }
  if (els.mobileThemeToggle) {
    els.mobileThemeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Activar tema claro" : "Activar tema oscuro"
    );
  }
}

function setSidebarCollapsed(collapsed) {
  document.body.classList.toggle("sidebar-collapsed", collapsed);
  localStorage.setItem(sidebarKey, collapsed ? "collapsed" : "open");
  els.sidebarToggle?.setAttribute("aria-expanded", String(!collapsed));
  els.sidebarOpenBtn?.setAttribute("aria-expanded", String(!collapsed));
}

function newsArrow(className) {
  const wrapper = document.createElement("span");
  wrapper.className = className;
  wrapper.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>';
  return wrapper;
}

function newsMeta(item) {
  const meta = document.createElement("div");
  meta.className = "news-meta";
  const source = document.createElement("span");
  source.textContent = item.source;
  const time = document.createElement("time");
  if (item.date) {
    time.dateTime = item.date;
    time.textContent = new Intl.DateTimeFormat("es-CO", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC"
    }).format(new Date(`${item.date}T00:00:00Z`));
  } else {
    time.textContent = "Publicacion reciente";
  }
  meta.append(source, time);
  return meta;
}

function allowedNewsUrl(value) {
  try {
    const url = new URL(value);
    return ["cnsc.gov.co", "mineducacion.gov.co", "funcionpublica.gov.co"]
      .some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`));
  } catch {
    return false;
  }
}

function newsFallback() {
  const fallback = document.createElement("div");
  fallback.className = "news-media-fallback";
  const logo = document.createElement("img");
  logo.src = "assets/logo.svg";
  logo.alt = "";
  const label = document.createElement("span");
  label.textContent = "Informacion oficial";
  fallback.append(logo, label);
  return fallback;
}

function appendNewsImage(media, source, referrerPolicy = "") {
  const backdrop = document.createElement("img");
  backdrop.className = "news-feature-backdrop";
  backdrop.src = source;
  backdrop.alt = "";
  backdrop.setAttribute("aria-hidden", "true");

  const image = document.createElement("img");
  image.className = "news-feature-image";
  image.src = source;
  image.alt = "";
  image.loading = "eager";

  if (referrerPolicy) {
    backdrop.referrerPolicy = referrerPolicy;
    image.referrerPolicy = referrerPolicy;
  }

  image.addEventListener("error", () => media.replaceChildren(newsFallback()), { once: true });
  media.append(backdrop, image);
}

function newsMedia(item) {
  const media = document.createElement("div");
  media.className = "news-feature-media";
  if (typeof item.image === "string" && /^assets\/news\/[a-z0-9._-]+$/i.test(item.image)) {
    appendNewsImage(media, item.image);
    return media;
  }
  try {
    const imageUrl = new URL(item.image);
    if (imageUrl.protocol === "https:") {
      appendNewsImage(media, imageUrl.href, "no-referrer");
      return media;
    }
  } catch {
    // The branded fallback below keeps the layout stable.
  }

  media.append(newsFallback());
  return media;
}

function renderNews() {
  const data = window.AULA_NEWS;
  const items = Array.isArray(data?.items)
    ? data.items.filter((item) => item?.title && allowedNewsUrl(item.url)).slice(0, 3)
    : [];
  if (items.length < 3 || !els.newsFeature || !els.newsList) return;

  const feature = items[0];
  els.newsFeature.href = feature.url;
  const featureCopy = document.createElement("div");
  featureCopy.className = "news-feature-copy";
  const topic = document.createElement("span");
  topic.className = "news-topic";
  topic.textContent = feature.topic || "Actualidad docente";
  const title = document.createElement("h2");
  title.textContent = feature.title;
  const summary = document.createElement("p");
  summary.textContent = feature.summary;
  const read = newsArrow("news-read");
  read.prepend("Leer comunicado ");
  featureCopy.append(newsMeta(feature), topic, title, summary, read);
  els.newsFeature.replaceChildren(newsMedia(feature), featureCopy);

  const cards = items.slice(1).map((item) => {
    const card = document.createElement("a");
    card.className = "news-card";
    card.href = item.url;
    card.target = "_blank";
    card.rel = "noreferrer";
    const cardTitle = document.createElement("h3");
    cardTitle.textContent = item.title;
    const cardSummary = document.createElement("p");
    cardSummary.textContent = item.summary;
    card.append(newsMeta(item), cardTitle, cardSummary, newsArrow("news-arrow"));
    return card;
  });
  els.newsList.replaceChildren(...cards);

  const generated = new Date(data.generatedAt);
  if (els.newsUpdated && !Number.isNaN(generated.valueOf())) {
    els.newsUpdated.textContent = `Actualizado ${new Intl.DateTimeFormat("es-CO", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(generated)}.`;
  }
}

function markStudyActivity() {
  const progress = loadProgress();
  const today = new Date().toISOString().slice(0, 10);
  if (progress.lastStudyDate === today) return;

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  progress.streak = progress.lastStudyDate === yesterday ? (progress.streak || 0) + 1 : 1;
  progress.lastStudyDate = today;
  saveProgress(progress);
  updateMetrics();
}

function renderQuestion() {
  const question = state.currentSet[state.currentIndex];
  const answer = state.answers[state.currentIndex];
  const percent = state.currentSet.length ? ((state.currentIndex + 1) / state.currentSet.length) * 100 : 0;
  const answered = state.answers.filter((item) => item !== null).length;

  els.questionMeta.textContent = `Pregunta ${state.currentIndex + 1} de ${state.currentSet.length}`;
  els.answeredCount.textContent = `${answered} de ${state.currentSet.length} respondidas`;
  els.progressBar.style.width = `${percent}%`;
  els.progressBar.parentElement.setAttribute("aria-valuenow", String(Math.round(percent)));
  els.prevBtn.disabled = state.currentIndex === 0;
  els.nextBtn.disabled = state.currentIndex === state.currentSet.length - 1;
  els.finishBtn.disabled = !state.currentSet.length;

  const options = question.options.map((option, index) => {
    const selected = answer === index ? " selected" : "";
    const reviewClass = state.reviewMode
      ? index === question.answer
        ? " correct"
        : answer === index
          ? " wrong"
          : ""
      : "";
    return `
      <button class="option${selected}${reviewClass}" data-answer="${index}" ${state.reviewMode ? "disabled" : ""}>
        <span class="letter">${String.fromCharCode(65 + index)}</span>
        <span>${option}</span>
      </button>`;
  }).join("");

  els.questionCard.className = "question-card";
  els.questionCard.innerHTML = `
    <span class="question-area">${labelCategory(question.category)}</span>
    <p class="question-text">${question.question}</p>
    <div>${options}</div>
    ${state.reviewMode ? `<div class="explanation"><strong>Explicacion:</strong> ${question.explanation}</div>` : ""}
  `;

  els.questionCard.querySelectorAll(".option").forEach((button) => {
    button.addEventListener("click", () => {
      state.answers[state.currentIndex] = Number(button.dataset.answer);
      markStudyActivity();
      renderQuestion();
      renderNavigator();
    });
  });

  renderNavigator();
}

function renderNavigator() {
  if (!state.currentSet.length) {
    els.questionNavigator.innerHTML = "";
    return;
  }

  els.questionNavigator.innerHTML = state.currentSet.map((question, index) => {
    const answered = state.answers[index] !== null ? " answered" : "";
    const current = index === state.currentIndex ? " current" : "";
    const reviewClass = state.reviewMode
      ? state.answers[index] === question.answer
        ? " correct"
        : " wrong"
      : "";
    return `<button class="nav-dot${answered}${current}${reviewClass}" type="button" data-index="${index}" aria-label="Ir a la pregunta ${index + 1}">${index + 1}</button>`;
  }).join("");

  els.questionNavigator.querySelectorAll(".nav-dot").forEach((button) => {
    button.addEventListener("click", () => {
      state.currentIndex = Number(button.dataset.index);
      renderQuestion();
    });
  });
}

function labelCategory(category) {
  return {
    pedagogia: "Pedagogia",
    normativa: "Normativa",
    competencias: "Competencias",
    lectura: "Lectura critica"
  }[category] || "General";
}

function startTimer(minutes) {
  clearInterval(state.timerId);
  state.timeLeft = minutes * 60;
  els.timer.textContent = formatTime(state.timeLeft);
  state.timerId = setInterval(() => {
    state.timeLeft -= 1;
    els.timer.textContent = formatTime(Math.max(state.timeLeft, 0));
    if (state.timeLeft <= 0) finishTest();
  }, 1000);
}

function startTest() {
  const category = els.categorySelect.value;
  const amount = Math.min(Math.max(Number(els.amountInput.value) || 10, 5), 20);
  const minutes = Math.min(Math.max(Number(els.minutesInput.value) || 45, 5), 120);
  const pool = category === "todas" ? questionBank : questionBank.filter((question) => question.category === category);

  state.currentSet = shuffle(pool).slice(0, Math.min(amount, pool.length));
  state.answers = Array(state.currentSet.length).fill(null);
  state.currentIndex = 0;
  state.reviewMode = false;
  startTimer(minutes);
  markStudyActivity();
  renderQuestion();
  renderNavigator();
}

function finishTest() {
  if (!state.currentSet.length) return;

  clearInterval(state.timerId);
  state.reviewMode = true;
  const correct = state.currentSet.reduce((sum, question, index) => sum + (state.answers[index] === question.answer ? 1 : 0), 0);
  const score = Math.round((correct / state.currentSet.length) * 100);
  const progress = loadProgress();
  const byCategory = {};

  state.currentSet.forEach((question, index) => {
    byCategory[question.category] = byCategory[question.category] || { total: 0, correct: 0 };
    byCategory[question.category].total += 1;
    if (state.answers[index] === question.answer) byCategory[question.category].correct += 1;
  });

  progress.attempts = [
    {
      date: new Date().toLocaleString("es-CO"),
      score,
      correct,
      total: state.currentSet.length,
      byCategory
    },
    ...progress.attempts
  ].slice(0, 8);

  saveProgress(progress);
  updateMetrics();
  renderQuestion();
  renderNavigator();
  renderProgress();
  els.questionMeta.textContent = `Resultado: ${correct}/${state.currentSet.length} correctas (${score}%)`;
}

function resetTest() {
  clearInterval(state.timerId);
  state.currentSet = [];
  state.answers = [];
  state.currentIndex = 0;
  state.reviewMode = false;
  els.timer.textContent = `${String(els.minutesInput.value).padStart(2, "0")}:00`;
  els.questionMeta.textContent = "Listo para empezar";
  els.answeredCount.textContent = "0 respondidas";
  els.progressBar.style.width = "0";
  els.progressBar.parentElement.setAttribute("aria-valuenow", "0");
  els.questionNavigator.innerHTML = "";
  els.prevBtn.disabled = true;
  els.nextBtn.disabled = true;
  els.finishBtn.disabled = true;
  els.questionCard.className = "question-card empty";
  els.questionCard.innerHTML = `
    <div class="empty-state">
      <div class="empty-illustration" aria-hidden="true">
        <span class="paper-line line-one"></span>
        <span class="paper-line line-two"></span>
        <span class="paper-line line-three"></span>
        <span class="paper-check">✓</span>
      </div>
      <h3>Todo listo para comenzar</h3>
      <p>Configura tu sesion a la izquierda. Aqui apareceran las preguntas y su retroalimentacion.</p>
    </div>
  `;
}

function renderStudy() {
  const progress = loadProgress();
  els.studyPlan.innerHTML = studyItems.map((item, index) => `
    <label class="check-item">
      <input type="checkbox" data-study="${index}" ${progress.completedItems.includes(index) ? "checked" : ""}>
      <span>${item}</span>
    </label>
  `).join("");

  els.studyPlan.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      const current = loadProgress();
      const id = Number(input.dataset.study);
      current.completedItems = input.checked
        ? [...new Set([...current.completedItems, id])]
        : current.completedItems.filter((item) => item !== id);
      saveProgress(current);
      markStudyActivity();
    });
  });

  els.flashcards.innerHTML = flashcards.map((card, index) => `
    <button class="flashcard" type="button" aria-expanded="false" data-card="${index}">
      <span class="flashcard-front">${card.front}</span>
      <span class="flashcard-back">${card.back}</span>
      <span class="flashcard-action">Tocar para ver respuesta</span>
    </button>
  `).join("");

  els.flashcards.querySelectorAll(".flashcard").forEach((card) => {
    card.addEventListener("click", () => {
      const expanded = card.classList.toggle("flipped");
      card.setAttribute("aria-expanded", String(expanded));
      card.querySelector(".flashcard-action").textContent = expanded ? "Tocar para ocultar" : "Tocar para ver respuesta";
      markStudyActivity();
    });
  });
}

function renderProgress() {
  const progress = loadProgress();
  if (!progress.attempts.length) {
    els.attemptsList.innerHTML = `<p>Aun no hay simulacros registrados.</p>`;
    els.recommendations.innerHTML = `<p>Completa un simulacro para recibir recomendaciones por area.</p>`;
    return;
  }

  els.attemptsList.innerHTML = progress.attempts.map((attempt) => `
    <div class="attempt">
      <strong>${attempt.score}% - ${attempt.correct}/${attempt.total}</strong>
      <span>${attempt.date}</span>
    </div>
  `).join("");

  const totals = {};
  progress.attempts.forEach((attempt) => {
    Object.entries(attempt.byCategory).forEach(([category, values]) => {
      totals[category] = totals[category] || { total: 0, correct: 0 };
      totals[category].total += values.total;
      totals[category].correct += values.correct;
    });
  });

  const ranked = Object.entries(totals)
    .map(([category, values]) => ({
      category,
      percent: Math.round((values.correct / values.total) * 100)
    }))
    .sort((a, b) => a.percent - b.percent);

  els.recommendations.innerHTML = ranked.map((item) => `
    <div class="recommendation">
      <strong>${labelCategory(item.category)}</strong>
      <p>Promedio reciente: ${item.percent}%. Dedica una sesion corta a errores frecuentes y vuelve a practicar.</p>
      <div class="score-bar" aria-hidden="true"><span style="width: ${item.percent}%"></span></div>
      <span class="tag">${item.percent < 70 ? "Prioridad alta" : "Mantener practica"}</span>
    </div>
  `).join("");
}

function switchView(viewId) {
  els.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.view === viewId));
  els.views.forEach((view) => view.classList.toggle("active", view.id === viewId));
  if (viewId === "estudio") renderStudy();
  if (viewId === "progreso") renderProgress();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

els.tabs.forEach((tab) => tab.addEventListener("click", () => switchView(tab.dataset.view)));
els.homeLink?.addEventListener("click", (event) => {
  event.preventDefault();
  switchView("inicio");
});
els.themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
});
els.mobileThemeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
});
els.sidebarToggle?.addEventListener("click", () => setSidebarCollapsed(true));
els.sidebarOpenBtn?.addEventListener("click", () => setSidebarCollapsed(false));
els.presets.forEach((preset) => {
  preset.addEventListener("click", () => {
    els.presets.forEach((item) => item.classList.remove("active"));
    preset.classList.add("active");
    els.amountInput.value = preset.dataset.questions;
    els.minutesInput.value = preset.dataset.minutes;
    if (!state.currentSet.length) {
      els.timer.textContent = `${String(preset.dataset.minutes).padStart(2, "0")}:00`;
    }
  });
});
els.startBtn.addEventListener("click", startTest);
els.resetBtn.addEventListener("click", resetTest);
els.prevBtn.addEventListener("click", () => {
  state.currentIndex -= 1;
  renderQuestion();
});
els.nextBtn.addEventListener("click", () => {
  state.currentIndex += 1;
  renderQuestion();
});
els.finishBtn.addEventListener("click", finishTest);
els.minutesInput.addEventListener("input", () => {
  if (!state.currentSet.length) els.timer.textContent = `${String(els.minutesInput.value || 0).padStart(2, "0")}:00`;
});

updateMetrics();
applyTheme(localStorage.getItem(themeKey) || "light");
setSidebarCollapsed(localStorage.getItem(sidebarKey) === "collapsed");
renderNews();
renderStudy();
renderProgress();
resetTest();
