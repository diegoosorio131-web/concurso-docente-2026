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
  homeLink: document.getElementById("homeLink"),
  themeToggle: document.getElementById("themeToggle"),
  mobileThemeToggle: document.getElementById("mobileThemeToggle"),
  sidebarToggle: document.getElementById("sidebarToggle"),
  sidebarOpenBtn: document.getElementById("sidebarOpenBtn"),
  newsFeature: document.getElementById("newsFeature"),
  newsList: document.getElementById("newsList"),
  newsUpdated: document.getElementById("newsUpdated"),
  simulacroMenu: document.getElementById("simulacroMenu"),
  simulacroTab: document.getElementById("simulacroTab"),
  simulacroSubmenu: document.getElementById("simulacroSubmenu"),
  simulacroShortcuts: document.querySelectorAll("[data-simulacro-shortcut]"),
  simulacroPanels: document.querySelectorAll("[data-simulacro-panel]"),
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
  }

function labelCategory(category) {
  return {
    pedagogia: "Pedagogia",
    normativa: "Normativa",
    competencias: "Competencias",
    lectura: "Lectura critica"
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
  els.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.view === viewId));
  els.views.forEach((view) => view.classList.toggle("active", view.id === viewId));
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
els.simulacroShortcuts.forEach((button) => {
  button.addEventListener("click", () => {
    selectSimulacroCategory(button.dataset.simulacroShortcut);
    switchView("simulacro");
    if (window.matchMedia("(max-width: 900px)").matches) setSimulacroMenuExpanded(false);
  });
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && els.simulacroMenu?.classList.contains("expanded")) {
    setSimulacroMenuExpanded(false);
    els.simulacroTab?.focus();
  }
});
applyTheme(localStorage.getItem(themeKey) || "light");
setSidebarCollapsed(localStorage.getItem(sidebarKey) === "collapsed");
renderNews();
renderStudy();
renderProgress();
