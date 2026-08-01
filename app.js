const studyItems = [
  "Leer el acuerdo, anexo y guia de orientacion cuando la CNSC los publique.",
  "Verificar requisitos minimos de la OPEC antes de pagar derechos de participacion.",
  "Repasar evaluacion formativa, inclusion, diseno universal y convivencia escolar.",
  "Resolver ejercicios de lectura critica con tesis, inferencias, evidencias y relaciones logicas.",
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

const storageKey = "concursoDocente2026";
const themeKey = "concursoDocente2026Theme";
const sidebarKey = "concursoDocente2026Sidebar";
const els = {
  tabs: document.querySelectorAll(".tab"),
  views: document.querySelectorAll(".view"),
  themeToggle: document.getElementById("themeToggle"),
  mobileThemeToggle: document.getElementById("mobileThemeToggle"),
  sidebarToggle: document.getElementById("sidebarToggle"),
  sidebarOpenBtn: document.getElementById("sidebarOpenBtn"),
  workspaceViewLabel: document.getElementById("workspaceViewLabel"),
  mobileViewLabel: document.getElementById("mobileViewLabel"),
  workspaceDate: document.getElementById("workspaceDate"),
  newsFeature: document.getElementById("newsFeature"),
  newsList: document.getElementById("newsList"),
  newsUpdated: document.getElementById("newsUpdated"),
  flyerReveal: document.getElementById("flyerReveal"),
  flyerToggle: document.getElementById("flyerToggle"),
  flyerToggles: document.querySelectorAll("[data-flyer-toggle]"),
  flyerToggleLabel: document.getElementById("flyerToggleLabel"),
  simulacroMenu: document.getElementById("simulacroMenu"),
  simulacroTab: document.getElementById("simulacroTab"),
  simulacroSubmenu: document.getElementById("simulacroSubmenu"),
  simulacroShortcuts: document.querySelectorAll("[data-simulacro-shortcut]"),
  simulacroPanels: document.querySelectorAll("[data-simulacro-panel]"),
  simulacroBrowser: document.querySelector(".simulacro-browser"),
  simulacroStartButtons: document.querySelectorAll("[data-start-simulacro]"),
  simulacroCounts: document.querySelectorAll("[data-simulacro-count]"),
  simulacroRunner: document.getElementById("simulacroRunner"),
  simulacroRunnerCategory: document.getElementById("simulacroRunnerCategory"),
  simulacroRunnerTitle: document.getElementById("simulacroRunnerTitle"),
  simulacroAnsweredCount: document.getElementById("simulacroAnsweredCount"),
  simulacroProgressBar: document.getElementById("simulacroProgressBar"),
  simulacroQuestionNav: document.getElementById("simulacroQuestionNav"),
  simulacroSituation: document.getElementById("simulacroSituation"),
  simulacroSituationRange: document.getElementById("simulacroSituationRange"),
  simulacroSituationTopic: document.getElementById("simulacroSituationTopic"),
  simulacroSituationText: document.getElementById("simulacroSituationText"),
  simulacroQuestionNumber: document.getElementById("simulacroQuestionNumber"),
  simulacroQuestionPrompt: document.getElementById("simulacroQuestionPrompt"),
  simulacroOptions: document.getElementById("simulacroOptions"),
  simulacroFeedback: document.getElementById("simulacroFeedback"),
  simulacroFeedbackTitle: document.getElementById("simulacroFeedbackTitle"),
  simulacroFeedbackSelection: document.getElementById("simulacroFeedbackSelection"),
  simulacroFeedbackWrongReason: document.getElementById("simulacroFeedbackWrongReason"),
  simulacroFeedbackCorrectAnswer: document.getElementById("simulacroFeedbackCorrectAnswer"),
  simulacroFeedbackCorrectReason: document.getElementById("simulacroFeedbackCorrectReason"),
  simulacroPrevBtn: document.getElementById("simulacroPrevBtn"),
  simulacroNextBtn: document.getElementById("simulacroNextBtn"),
  simulacroFinishBtn: document.getElementById("simulacroFinishBtn"),
  simulacroExitBtn: document.getElementById("simulacroExitBtn"),
  simulacroResult: document.getElementById("simulacroResult"),
  simulacroResultScore: document.getElementById("simulacroResultScore"),
  simulacroResultSummary: document.getElementById("simulacroResultSummary"),
  simulacroProvisionalNote: document.getElementById("simulacroProvisionalNote"),
  simulacroResultBreakdown: document.getElementById("simulacroResultBreakdown"),
  simulacroReviewBtn: document.getElementById("simulacroReviewBtn"),
  simulacroReturnBtn: document.getElementById("simulacroReturnBtn"),
  resetProgressBtn: document.getElementById("resetProgressBtn"),
  resetProgressDialog: document.getElementById("resetProgressDialog"),
  confirmResetProgressBtn: document.getElementById("confirmResetProgressBtn"),
  studyPlan: document.getElementById("studyPlan"),
  flashcards: document.getElementById("flashcards"),
  attemptsList: document.getElementById("attemptsList"),
  recommendations: document.getElementById("recommendations")
};

const simulacroState = {
  category: null,
  questions: [],
  answers: [],
  currentIndex: 0,
  currentBlockId: null,
  reviewMode: false,
  completed: false
};

function progressStorageKey() {
  if (!window.AULA_CONFIG?.authEnabled) return storageKey;
  return window.AULA_USER_ID ? `${storageKey}:${window.AULA_USER_ID}` : `${storageKey}:pending`;
}

function loadProgress() {
  const fallback = { attempts: [], completedItems: [], lastStudyDate: null, streak: 0 };
  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(progressStorageKey())) };
  } catch {
    return fallback;
  }
}

function saveProgress(progress) {
  localStorage.setItem(progressStorageKey(), JSON.stringify(progress));
}

function resetUserProgress() {
  localStorage.removeItem(progressStorageKey());
  renderStudy();
  renderProgress();
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

function setSimulacroMenuExpanded(expanded) {
  els.simulacroMenu?.classList.toggle("expanded", expanded);
  els.simulacroTab?.setAttribute("aria-expanded", String(expanded));
  if (els.simulacroSubmenu) els.simulacroSubmenu.hidden = !expanded;
}

function selectSimulacroCategory(category) {
  els.simulacroShortcuts.forEach((button) => {
    const selected = button.dataset.simulacroShortcut === category;
    button.classList.toggle("active", selected);
    if (selected) {
      button.setAttribute("aria-current", "true");
    } else {
      button.removeAttribute("aria-current");
    }
  });
  els.simulacroPanels.forEach((panel) => {
    panel.hidden = panel.dataset.simulacroPanel !== category;
  });
}

function simulacroCategoryLabel(category) {
  return {
    pedagogica: "Competencia pedagogica",
    especificos: "Conocimientos especificos",
    razonamiento: "Razonamiento + lectura critica"
  }[category] || "Simulacro";
}

function getSimulacroQuestions(category) {
  const tests = Array.isArray(window.AULA_SIMULACROS?.tests) ? window.AULA_SIMULACROS.tests : [];
  return tests.flatMap((test) => {
    const blocks = Array.isArray(test.blocks) ? test.blocks : [];
    return blocks
      .filter((block) => block.category === category && Array.isArray(block.questions))
      .flatMap((block) => block.questions
        .filter((question) => (
          Number.isInteger(question.answer)
          && question.answer >= 0
          && question.answer < 3
          && Array.isArray(question.options)
          && question.options.length === 3
          && typeof question.prompt === "string"
          && typeof question.explanation === "string"
          && Array.isArray(question.optionFeedback)
          && question.optionFeedback.length === 3
        ))
        .map((question) => ({
          ...question,
          testId: test.id,
          testTitle: test.title,
          blockId: block.id,
          range: block.range,
          topic: block.topic,
          situation: block.situation
        })));
  });
}

function shuffleItems(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

function randomizeSimulacroQuestions(questions) {
  const blocks = new Map();
  questions.forEach((question) => {
    const blockKey = `${question.testId || "test"}:${question.blockId || question.id}`;
    if (!blocks.has(blockKey)) blocks.set(blockKey, []);
    blocks.get(blockKey).push(question);
  });

  return shuffleItems([...blocks.values()])
    .flatMap((blockQuestions) => shuffleItems(blockQuestions));
}

function updateSimulacroCounts() {
  if (window.AULA_CONFIG?.authEnabled) return;
  els.simulacroCounts.forEach((counter) => {
    counter.textContent = String(getSimulacroQuestions(counter.dataset.simulacroCount).length);
  });
}

async function requestSecureQuiz(category, answers = null) {
  const config = window.AULA_CONFIG || {};
  const client = await window.AULA_AUTH_READY;
  const { data: sessionData } = await client.auth.getSession();
  const accessToken = sessionData.session?.access_token;
  if (!accessToken) throw new Error("Tu sesion ha vencido. Ingresa nuevamente.");

  const response = await fetch(
    `${config.supabaseUrl}/functions/v1/quiz?category=${encodeURIComponent(category)}`,
    {
      method: answers ? "POST" : "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        apikey: config.supabasePublishableKey,
        ...(answers ? { "Content-Type": "application/json" } : {})
      },
      body: answers ? JSON.stringify({ answers }) : undefined
    }
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "No fue posible consultar el simulacro.");
  return data;
}

function showSimulacroCatalog() {
  if (els.simulacroBrowser) els.simulacroBrowser.hidden = false;
  if (els.simulacroRunner) els.simulacroRunner.hidden = true;
  if (els.simulacroResult) els.simulacroResult.hidden = true;
}

function renderSimulacroNavigator() {
  const buttons = simulacroState.questions.map((question, index) => {
    const button = document.createElement("button");
    const answer = simulacroState.answers[index];
    button.type = "button";
    button.textContent = String(index + 1);
    button.classList.toggle("answered", answer !== null);
    button.classList.toggle("current", index === simulacroState.currentIndex);
    if (simulacroState.reviewMode) {
      button.classList.toggle("correct", answer === question.answer);
      button.classList.toggle("wrong", answer !== question.answer);
    }
    button.setAttribute("aria-label", `Ir a la pregunta ${index + 1}`);
    button.addEventListener("click", () => {
      simulacroState.currentIndex = index;
      renderSimulacroQuestion();
    });
    return button;
  });
  els.simulacroQuestionNav.replaceChildren(...buttons);
}

function renderSimulacroSituation(question) {
  const changedBlock = simulacroState.currentBlockId !== question.blockId;
  simulacroState.currentBlockId = question.blockId;
  els.simulacroSituationRange.textContent = `Situacion ${question.range}`;
  els.simulacroSituationTopic.textContent = question.topic;

  const paragraphs = String(question.situation || "")
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((text) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      return paragraph;
    });
  els.simulacroSituationText.replaceChildren(...paragraphs);
  if (changedBlock) els.simulacroSituation.open = true;
}

function renderSimulacroOptions(question) {
  const selectedAnswer = simulacroState.answers[simulacroState.currentIndex];
  const options = question.options.map((text, index) => {
    const option = document.createElement("button");
    const letter = document.createElement("span");
    const copy = document.createElement("span");
    option.type = "button";
    option.className = "simulacro-option";
    option.disabled = simulacroState.reviewMode;
    option.classList.toggle("selected", !simulacroState.reviewMode && selectedAnswer === index);
    if (simulacroState.reviewMode) {
      option.classList.toggle("correct", index === question.answer);
      option.classList.toggle("wrong", selectedAnswer === index && index !== question.answer);
    }
    letter.className = "simulacro-option-letter";
    letter.textContent = String.fromCharCode(65 + index);
    copy.textContent = text;
    option.append(letter, copy);
    option.addEventListener("click", () => {
      simulacroState.answers[simulacroState.currentIndex] = index;
      markStudyActivity();
      renderSimulacroQuestion();
    });
    return option;
  });
  els.simulacroOptions.replaceChildren(...options);
}

function renderSimulacroFeedback(question) {
  if (!simulacroState.reviewMode) {
    els.simulacroFeedback.hidden = true;
    return;
  }

  const selected = simulacroState.answers[simulacroState.currentIndex];
  const correct = selected === question.answer;
  const selectedLetter = String.fromCharCode(65 + selected);
  const correctLetter = String.fromCharCode(65 + question.answer);
  els.simulacroFeedback.hidden = false;
  els.simulacroFeedback.classList.toggle("correct", correct);
  els.simulacroFeedback.classList.toggle("wrong", !correct);
  els.simulacroFeedbackTitle.textContent = correct ? "Respuesta correcta" : "Respuesta incorrecta";
  els.simulacroFeedbackSelection.textContent = `Tu respuesta: ${selectedLetter}. ${question.options[selected]}`;
  els.simulacroFeedbackWrongReason.hidden = correct;
  els.simulacroFeedbackCorrectAnswer.hidden = correct;
  els.simulacroFeedbackWrongReason.textContent = correct
    ? ""
    : `Por qu\u00e9 qued\u00f3 mal: ${question.optionFeedback[selected]}`;
  els.simulacroFeedbackCorrectAnswer.textContent = correct
    ? ""
    : `Respuesta correcta: ${correctLetter}. ${question.options[question.answer]}`;
  els.simulacroFeedbackCorrectReason.textContent = `Por qu\u00e9 es correcta: ${question.explanation}`;
}

function renderSimulacroQuestion() {
  const question = simulacroState.questions[simulacroState.currentIndex];
  if (!question) return;

  const answered = simulacroState.answers.filter((answer) => answer !== null).length;
  const total = simulacroState.questions.length;
  const percent = total ? Math.round((answered / total) * 100) : 0;
  els.simulacroAnsweredCount.textContent = `${answered}/${total}`;
  els.simulacroProgressBar.style.width = `${percent}%`;
  els.simulacroProgressBar.parentElement.setAttribute("aria-valuenow", String(percent));
  els.simulacroQuestionNumber.textContent = `Pregunta ${simulacroState.currentIndex + 1} de ${total}`;
  els.simulacroQuestionPrompt.textContent = question.prompt;
  els.simulacroPrevBtn.disabled = simulacroState.currentIndex === 0;
  els.simulacroNextBtn.disabled = simulacroState.currentIndex === total - 1;
  els.simulacroFinishBtn.disabled = simulacroState.reviewMode || answered !== total;
  els.simulacroFinishBtn.textContent = answered === total ? "Finalizar" : `Faltan ${total - answered}`;
  renderSimulacroSituation(question);
  renderSimulacroOptions(question);
  renderSimulacroFeedback(question);
  renderSimulacroNavigator();
}

async function startSimulacro(category) {
  const secureMode = Boolean(window.AULA_CONFIG?.authEnabled);
  const data = secureMode ? await requestSecureQuiz(category) : null;
  const loadedQuestions = secureMode ? data.questions : getSimulacroQuestions(category);
  const questions = randomizeSimulacroQuestions(loadedQuestions);
  if (!questions.length) return;

  simulacroState.category = category;
  simulacroState.questions = questions;
  simulacroState.answers = Array(questions.length).fill(null);
  simulacroState.currentIndex = 0;
  simulacroState.currentBlockId = null;
  simulacroState.reviewMode = false;
  simulacroState.completed = false;
  els.simulacroRunnerCategory.textContent = simulacroCategoryLabel(category);
  els.simulacroRunnerTitle.textContent = questions[0].testTitle;
  els.simulacroBrowser.hidden = true;
  els.simulacroResult.hidden = true;
  els.simulacroRunner.hidden = false;
  renderSimulacroQuestion();
  els.simulacroRunner.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function finishSimulacro() {
  if (
    simulacroState.completed
    || !simulacroState.questions.length
    || simulacroState.answers.some((answer) => answer === null)
  ) return;

  const secureMode = Boolean(window.AULA_CONFIG?.authEnabled);
  let correct;
  let total;
  let score;

  if (secureMode) {
    els.simulacroFinishBtn.disabled = true;
    els.simulacroFinishBtn.textContent = "Calificando...";
    const result = await requestSecureQuiz(
      simulacroState.category,
      simulacroState.questions.map((question, index) => ({
        id: question.id,
        answer: simulacroState.answers[index]
      }))
    );
    const reviewById = new Map(result.review.map((item) => [item.id, item]));
    simulacroState.questions = simulacroState.questions.map((question) => {
      const review = reviewById.get(question.id);
      return {
        ...question,
        answer: review.correctAnswer,
        explanation: review.explanation,
        optionFeedback: review.optionFeedback
      };
    });
    ({ correct, total, score } = result);
  } else {
    correct = simulacroState.questions.reduce(
      (sum, question, index) => sum + (simulacroState.answers[index] === question.answer ? 1 : 0),
      0
    );
    total = simulacroState.questions.length;
    score = Math.round((correct / total) * 100);
  }
  const progress = loadProgress();
  progress.attempts = [
    {
      date: new Date().toLocaleString("es-CO"),
      score,
      correct,
      total,
      byCategory: {
        [simulacroState.category]: { total, correct }
      }
    },
    ...progress.attempts
  ].slice(0, 8);
  saveProgress(progress);
  simulacroState.completed = true;
  els.simulacroResultScore.textContent = `${score}%`;
  els.simulacroResultSummary.textContent = `${correct} respuestas correctas de ${total}.`;
  els.simulacroProvisionalNote.hidden = secureMode || !window.AULA_SIMULACROS?.provisionalAnswerKey;
  renderSimulacroBreakdown();
  els.simulacroRunner.hidden = true;
  els.simulacroResult.hidden = false;
  renderProgress();
  els.simulacroResult.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderSimulacroBreakdown() {
  const items = simulacroState.questions.map((question, index) => {
    const selected = simulacroState.answers[index];
    const correct = selected === question.answer;
    const correctLetter = String.fromCharCode(65 + question.answer);
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    const statusDot = document.createElement("span");
    const questionLabel = document.createElement("span");
    const status = document.createElement("strong");
    const body = document.createElement("div");
    const selection = document.createElement("p");
    const wrongReason = document.createElement("p");
    const correctAnswer = document.createElement("p");
    const correctReason = document.createElement("p");
    const selectedLetter = String.fromCharCode(65 + selected);

    details.className = `simulacro-result-item ${correct ? "correct" : "wrong"}`;
    details.open = !correct;
    statusDot.className = "simulacro-result-status-dot";
    selection.className = "simulacro-result-selection";
    wrongReason.className = "simulacro-result-wrong-reason";
    correctAnswer.className = "simulacro-result-correct-answer";
    correctReason.className = "simulacro-result-correct-reason";
    questionLabel.textContent = `Pregunta ${question.number}`;
    status.textContent = correct ? "Correcta" : "Incorrecta";
    selection.textContent = `Tu respuesta: ${selectedLetter}. ${question.options[selected]}`;
    if (correct) {
      correctReason.textContent = `Por qu\u00e9 es correcta: ${question.explanation}`;
      body.append(selection, correctReason);
    } else {
      wrongReason.textContent = `Por qu\u00e9 qued\u00f3 mal: ${question.optionFeedback[selected]}`;
      correctAnswer.textContent = `Respuesta correcta: ${correctLetter}. ${question.options[question.answer]}`;
      correctReason.textContent = `Por qu\u00e9 es correcta: ${question.explanation}`;
      body.append(selection, wrongReason, correctAnswer, correctReason);
    }
    summary.append(statusDot, questionLabel, status);
    details.append(summary, body);
    return details;
  });
  els.simulacroResultBreakdown.replaceChildren(...items);
}

function reviewSimulacro() {
  simulacroState.reviewMode = true;
  simulacroState.currentIndex = 0;
  simulacroState.currentBlockId = null;
  els.simulacroResult.hidden = true;
  els.simulacroRunner.hidden = false;
  renderSimulacroQuestion();
  els.simulacroRunner.scrollIntoView({ behavior: "smooth", block: "start" });
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
  const label = document.createElement("span");
  label.textContent = "Informacion oficial";
  fallback.append(label);
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
  }

function labelCategory(category) {
  return {
    pedagogia: "Pedagogia",
    pedagogica: "Competencia pedagogica",
    normativa: "Normativa",
    competencias: "Competencias",
    especificos: "Conocimientos especificos",
    lectura: "Lectura critica",
    razonamiento: "Razonamiento + lectura critica"
  }[category] || "General";
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
      <p>Promedio reciente: ${item.percent}%. Dedica una sesion corta a errores frecuentes y realiza otro simulacro.</p>
      <div class="score-bar" aria-hidden="true"><span style="width: ${item.percent}%"></span></div>
      <span class="tag">${item.percent < 70 ? "Prioridad alta" : "Mantener el ritmo"}</span>
    </div>
  `).join("");
}

function switchView(viewId) {
  const viewLabels = {
    inicio: "Inicio",
    clase: "Clase",
    simulacro: "Simulacros",
    estudio: "Estudiar",
    progreso: "Mi progreso"
  };
  els.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.view === viewId));
  els.views.forEach((view) => view.classList.toggle("active", view.id === viewId));
  if (els.workspaceViewLabel) els.workspaceViewLabel.textContent = viewLabels[viewId] || "Aula 2026";
  if (els.mobileViewLabel) els.mobileViewLabel.textContent = viewLabels[viewId] || "Inicio";
  if (viewId !== "simulacro") setSimulacroMenuExpanded(false);
  if (viewId === "estudio") renderStudy();
  if (viewId === "progreso") renderProgress();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

els.tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    if (tab.dataset.view === "simulacro") {
      setSimulacroMenuExpanded(!els.simulacroMenu?.classList.contains("expanded"));
    }
    switchView(tab.dataset.view);
  });
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
function setFlyerExpanded(expanded) {
  if (!els.flyerReveal || !els.flyerToggle) return;
  els.flyerReveal.classList.toggle("expanded", expanded);
  els.flyerToggles.forEach((toggle) => {
    toggle.setAttribute("aria-expanded", String(expanded));
    if (toggle.id === "flyerPreviewToggle") {
      toggle.setAttribute("aria-label", expanded ? "Contraer flyer" : "Desplegar flyer completo");
    }
  });
  if (els.flyerToggleLabel) {
    els.flyerToggleLabel.textContent = expanded
      ? "Contraer flyer"
      : "Desplegar flyer completo";
  }
}
els.flyerToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const expanded = els.flyerToggle.getAttribute("aria-expanded") === "true";
    setFlyerExpanded(!expanded);
    if (expanded) {
      els.flyerReveal?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
els.simulacroShortcuts.forEach((button) => {
  button.addEventListener("click", () => {
    showSimulacroCatalog();
    selectSimulacroCategory(button.dataset.simulacroShortcut);
    switchView("simulacro");
    if (window.matchMedia("(max-width: 900px)").matches) setSimulacroMenuExpanded(false);
  });
});
els.simulacroStartButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = "Cargando...";
    try {
      await startSimulacro(button.dataset.startSimulacro);
    } catch (error) {
      window.alert(error.message || "No fue posible cargar el simulacro.");
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
});
els.simulacroPrevBtn?.addEventListener("click", () => {
  if (simulacroState.currentIndex > 0) {
    simulacroState.currentIndex -= 1;
    renderSimulacroQuestion();
  }
});
els.simulacroNextBtn?.addEventListener("click", () => {
  if (simulacroState.currentIndex < simulacroState.questions.length - 1) {
    simulacroState.currentIndex += 1;
    renderSimulacroQuestion();
  }
});
els.simulacroFinishBtn?.addEventListener("click", async () => {
  try {
    await finishSimulacro();
  } catch (error) {
    els.simulacroFinishBtn.disabled = false;
    els.simulacroFinishBtn.textContent = "Finalizar";
    window.alert(error.message || "No fue posible calificar el simulacro.");
  }
});
els.simulacroExitBtn?.addEventListener("click", showSimulacroCatalog);
els.simulacroReviewBtn?.addEventListener("click", reviewSimulacro);
els.simulacroReturnBtn?.addEventListener("click", showSimulacroCatalog);
els.resetProgressBtn?.addEventListener("click", () => {
  if (!els.resetProgressDialog) return;
  els.resetProgressDialog.returnValue = "";
  if (typeof els.resetProgressDialog.showModal === "function") {
    els.resetProgressDialog.showModal();
  } else {
    els.resetProgressDialog.setAttribute("open", "");
  }
});
els.confirmResetProgressBtn?.addEventListener("click", resetUserProgress);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && els.simulacroMenu?.classList.contains("expanded")) {
    setSimulacroMenuExpanded(false);
    els.simulacroTab?.focus();
  }
});
window.addEventListener("aula:auth", (event) => {
  if (!event.detail?.user) return;
  renderStudy();
  renderProgress();
});
if (els.workspaceDate) {
  els.workspaceDate.textContent = new Intl.DateTimeFormat("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(new Date());
}
applyTheme(localStorage.getItem(themeKey) || "light");
setSidebarCollapsed(localStorage.getItem(sidebarKey) === "collapsed");
updateSimulacroCounts();
renderNews();
renderStudy();
renderProgress();
