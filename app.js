const studyItems = [
  { category: "Convocatoria", title: "Revisar documentos oficiales", detail: "Acuerdo, anexo y guia de orientacion publicados por la CNSC." },
  { category: "OPEC", title: "Verificar requisitos minimos", detail: "Empleo, funciones, formacion y experiencia exigida antes del pago." },
  { category: "Pedagogia", title: "Consolidar fundamentos pedagogicos", detail: "Evaluacion formativa, inclusion, DUA y convivencia escolar." },
  { category: "Lectura critica", title: "Practicar interpretacion de textos", detail: "Tesis, inferencias, evidencias y relaciones logicas." },
  { category: "Simulacros", title: "Analizar resultados y errores", detail: "Identificar patrones antes de realizar un nuevo intento." },
  { category: "SIMO", title: "Organizar los documentos", detail: "Certificados de formacion y experiencia con soportes legibles." }
];

const flashcards = [
  {
    category: "Normativa",
    front: "Merito",
    back: "Principio central de ingreso y ascenso en empleos de carrera: seleccion objetiva segun requisitos, pruebas y reglas de convocatoria."
  },
  {
    category: "Pedagogia",
    front: "Evaluacion formativa",
    back: "Proceso continuo para recoger evidencias, retroalimentar y ajustar la ensenanza antes del cierre de una unidad."
  },
  {
    category: "Convocatoria",
    front: "OPEC",
    back: "Oferta Publica de Empleos de Carrera. Detalla empleo, ubicacion, funciones y requisitos."
  },
  {
    category: "Pedagogia",
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
  classCatalog: document.getElementById("classCatalog"),
  classRoadmapGrid: document.getElementById("classRoadmapGrid"),
  classLesson: document.getElementById("classLesson"),
  classOpenBtn: document.getElementById("classOpenBtn"),
  classBackBtn: document.getElementById("classBackBtn"),
  classTwoLesson: document.getElementById("classTwoLesson"),
  classTwoOpenBtn: document.getElementById("classTwoOpenBtn"),
  classTwoBackBtn: document.getElementById("classTwoBackBtn"),
  classStatusText: document.getElementById("classStatusText"),
  classModuleButtons: document.querySelectorAll("[data-class-module]"),
  classModulePanels: document.querySelectorAll("[data-class-panel]"),
  classProgressText: document.getElementById("classProgressText"),
  classProgressPercent: document.getElementById("classProgressPercent"),
  classProgressBar: document.getElementById("classProgressBar"),
  classPrevModule: document.getElementById("classPrevModule"),
  classNextModule: document.getElementById("classNextModule"),
  classNextModuleLabel: document.getElementById("classNextModuleLabel"),
  classPracticeCheck: document.querySelector("[data-class-check]"),
  classQuiz: document.getElementById("classQuiz"),
  classQuizQuestions: document.getElementById("classQuizQuestions"),
  classQuizMessage: document.getElementById("classQuizMessage"),
  classQuizResult: document.getElementById("classQuizResult"),
  classQuizScore: document.getElementById("classQuizScore"),
  classQuizResultTitle: document.getElementById("classQuizResultTitle"),
  classQuizResultCopy: document.getElementById("classQuizResultCopy"),
  classQuizRetry: document.getElementById("classQuizRetry"),
  classTwoModuleButtons: document.querySelectorAll("[data-class-two-module]"),
  classTwoModulePanels: document.querySelectorAll("[data-class-two-panel]"),
  classTwoProgressText: document.getElementById("classTwoProgressText"),
  classTwoProgressPercent: document.getElementById("classTwoProgressPercent"),
  classTwoProgressBar: document.getElementById("classTwoProgressBar"),
  classTwoPrevModule: document.getElementById("classTwoPrevModule"),
  classTwoNextModule: document.getElementById("classTwoNextModule"),
  classTwoNextModuleLabel: document.getElementById("classTwoNextModuleLabel"),
  classTwoQuiz: document.getElementById("classTwoQuiz"),
  classTwoQuizQuestions: document.getElementById("classTwoQuizQuestions"),
  classTwoQuizMessage: document.getElementById("classTwoQuizMessage"),
  classTwoQuizResult: document.getElementById("classTwoQuizResult"),
  classTwoQuizScore: document.getElementById("classTwoQuizScore"),
  classTwoQuizResultTitle: document.getElementById("classTwoQuizResultTitle"),
  classTwoQuizResultCopy: document.getElementById("classTwoQuizResultCopy"),
  classTwoQuizRetry: document.getElementById("classTwoQuizRetry"),
  classThreeLesson: document.getElementById("classThreeLesson"),
  classThreeOpenBtn: document.getElementById("classThreeOpenBtn"),
  classThreeBackBtn: document.getElementById("classThreeBackBtn"),
  classThreeModuleButtons: document.querySelectorAll("[data-class-three-module]"),
  classThreeModulePanels: document.querySelectorAll("[data-class-three-panel]"),
  classThreeProgressText: document.getElementById("classThreeProgressText"),
  classThreeProgressPercent: document.getElementById("classThreeProgressPercent"),
  classThreeProgressBar: document.getElementById("classThreeProgressBar"),
  classThreePrevModule: document.getElementById("classThreePrevModule"),
  classThreeNextModule: document.getElementById("classThreeNextModule"),
  classThreeNextModuleLabel: document.getElementById("classThreeNextModuleLabel"),
  classThreeQuiz: document.getElementById("classThreeQuiz"),
  classThreeQuizQuestions: document.getElementById("classThreeQuizQuestions"),
  classThreeQuizMessage: document.getElementById("classThreeQuizMessage"),
  classThreeQuizResult: document.getElementById("classThreeQuizResult"),
  classThreeQuizScore: document.getElementById("classThreeQuizScore"),
  classThreeQuizResultTitle: document.getElementById("classThreeQuizResultTitle"),
  classThreeQuizResultCopy: document.getElementById("classThreeQuizResultCopy"),
  classThreeQuizRetry: document.getElementById("classThreeQuizRetry"),
  classFourLesson: document.getElementById("classFourLesson"),
  classFourOpenBtn: document.getElementById("classFourOpenBtn"),
  classFourBackBtn: document.getElementById("classFourBackBtn"),
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
  simulacroSheetProgress: document.getElementById("simulacroSheetProgress"),
  simulacroProgressBar: document.getElementById("simulacroProgressBar"),
  simulacroQuestionNav: document.getElementById("simulacroQuestionNav"),
  simulacroSituation: document.getElementById("simulacroSituation"),
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
  studyTabs: document.querySelectorAll("[data-study-view]"),
  studyPanels: document.querySelectorAll("[data-study-panel]"),
  studyContinueBtn: document.getElementById("studyContinueBtn"),
  studyTodayDescription: document.getElementById("studyTodayDescription"),
  studyCompletionMetric: document.getElementById("studyCompletionMetric"),
  studyStreakMetric: document.getElementById("studyStreakMetric"),
  studyScoreMetric: document.getElementById("studyScoreMetric"),
  aspirantProfileForm: document.getElementById("aspirantProfileForm"),
  aspirantArea: document.getElementById("aspirantArea"),
  aspirantTerritory: document.getElementById("aspirantTerritory"),
  aspirantGoal: document.getElementById("aspirantGoal"),
  aspirantProfileStatus: document.getElementById("aspirantProfileStatus"),
  studyRouteProgressText: document.getElementById("studyRouteProgressText"),
  studyRouteProgressBar: document.getElementById("studyRouteProgressBar"),
  studyMemoryCard: document.getElementById("studyMemoryCard"),
  studyCardCategory: document.getElementById("studyCardCategory"),
  studyCardFront: document.getElementById("studyCardFront"),
  studyCardBack: document.getElementById("studyCardBack"),
  studyCardCounter: document.getElementById("studyCardCounter"),
  studyRevealCard: document.getElementById("studyRevealCard"),
  studyConfidenceActions: document.getElementById("studyConfidenceActions"),
  studyReviewCard: document.getElementById("studyReviewCard"),
  studyKnowCard: document.getElementById("studyKnowCard"),
  studyAttemptSelect: document.getElementById("studyAttemptSelect"),
  studyErrorsStatus: document.getElementById("studyErrorsStatus"),
  studyErrorsList: document.getElementById("studyErrorsList"),
  attemptsList: document.getElementById("attemptsList"),
  recommendations: document.getElementById("recommendations")
};

const simulacroState = {
  category: null,
  testId: null,
  title: null,
  questions: [],
  answers: [],
  currentIndex: 0,
  currentBlockId: null,
  reviewMode: false,
  completed: false
};

const classLessonState = {
  current: 0,
  visited: new Set([0]),
  completed: false,
  score: null
};

const classQuizSize = 10;
const classQuizBank = [
  {
    id: "manual-purpose", module: 1,
    prompt: "¿Qué organiza el Manual de Funciones, Requisitos y Competencias?",
    options: ["Las funciones, competencias y requisitos de los cargos", "Únicamente los salarios del personal", "El calendario académico de cada institución"],
    correct: 0,
    explanation: "El manual permite identificar qué exige cada cargo en funciones, competencias, formación y experiencia."
  },
  {
    id: "manual-cnsc", module: 1,
    prompt: "¿Para qué utiliza la CNSC este manual en un concurso docente?",
    options: ["Para reemplazar el PEI", "Para verificar requisitos y orientar el diseño de las pruebas", "Para asignar directamente las vacantes"],
    correct: 1,
    explanation: "La CNSC debe considerarlo al verificar requisitos y al estructurar las pruebas del proceso de selección."
  },
  {
    id: "manual-first-step", module: 1,
    prompt: "¿Cuál es el primer paso para estudiar correctamente el manual?",
    options: ["Identificar el cargo exacto al que se aspira", "Memorizar todos los títulos profesionales", "Leer solamente las disposiciones generales"],
    correct: 0,
    explanation: "Identificar primero el cargo evita mezclar funciones y requisitos de perfiles diferentes."
  },
  {
    id: "manual-resolution", module: 1,
    prompt: "¿Qué norma adoptó el manual trabajado en esta clase?",
    options: ["La Resolución 003842 de 2022", "La Ley 115 de 1994 exclusivamente", "El Decreto Ley 1278 de 2002 sin resolución posterior"],
    correct: 0,
    explanation: "La Resolución 003842 del 18 de marzo de 2022 adoptó el nuevo manual estudiado."
  },
  {
    id: "manual-pei", module: 1,
    prompt: "¿Qué relación existe entre el manual y el Proyecto Educativo Institucional (PEI)?",
    options: ["El manual elimina la autonomía institucional", "El manual reemplaza el PEI", "El manual define los cargos, pero varias funciones se desarrollan conforme al PEI"],
    correct: 2,
    explanation: "El manual no reemplaza el PEI; las funciones docentes se articulan con la planeación y las orientaciones institucionales."
  },
  {
    id: "structure-chapters", module: 2,
    prompt: "¿En qué capítulo del manual se ubican los docentes de aula?",
    options: ["Capítulo de cargos docentes", "Capítulo de directivos docentes", "Capítulo de disposiciones presupuestales"],
    correct: 0,
    explanation: "Los docentes de preescolar, primaria y área de conocimiento pertenecen al capítulo de cargos docentes."
  },
  {
    id: "academic-competence", module: 2,
    prompt: "¿Cuál pertenece a la gestión académica?",
    options: ["Negociación y mediación", "Evaluación del aprendizaje", "Interacción con la comunidad y el entorno"],
    correct: 1,
    explanation: "La evaluación del aprendizaje es una de las cuatro competencias de la gestión académica."
  },
  {
    id: "administrative-competence", module: 2,
    prompt: "Un docente aprovecha adecuadamente materiales, equipos y apoyos pedagógicos. ¿Qué gestión predomina?",
    options: ["Gestión administrativa", "Gestión comunitaria", "Competencia comportamental"],
    correct: 0,
    explanation: "El uso eficiente de recursos pedagógicos forma parte de la gestión administrativa."
  },
  {
    id: "community-competence", module: 2,
    prompt: "La comunicación permanente con familias y el aprovechamiento del entorno corresponden principalmente a:",
    options: ["Gestión comunitaria", "Gestión académica", "Gestión administrativa"],
    correct: 0,
    explanation: "La gestión comunitaria reúne la comunicación institucional y la interacción con familias, comunidad y entorno."
  },
  {
    id: "behavioral-competence", module: 2,
    prompt: "¿Cuál es una competencia comportamental del docente de aula?",
    options: ["Evaluación del aprendizaje", "Trabajo en equipo", "Uso eficiente de recursos pedagógicos"],
    correct: 1,
    explanation: "Trabajo en equipo describe una forma de actuación; las otras opciones son competencias funcionales."
  },
  {
    id: "functional-areas", module: 2,
    prompt: "¿En cuántas áreas de gestión se demuestran las competencias funcionales docentes?",
    options: ["Dos", "Tres", "Cinco"],
    correct: 1,
    explanation: "Las competencias funcionales se agrupan en gestión académica, administrativa y comunitaria."
  },
  {
    id: "aula-types", module: 3,
    prompt: "¿Cuáles son los tres tipos de cargos de docente de aula descritos por el manual?",
    options: ["Preescolar, primaria y área de conocimiento", "Rector, coordinador y orientador", "Primaria, rectoría y supervisión"],
    correct: 0,
    explanation: "El apartado comprende docentes de preescolar, básica primaria y áreas de conocimiento de básica y media."
  },
  {
    id: "aula-assignment", module: 3,
    prompt: "¿Qué caracteriza principalmente al docente de aula?",
    options: ["Cumplir una asignación académica mediante asignaturas o proyectos pedagógicos", "Ejercer exclusivamente funciones administrativas", "Definir por sí solo el plan de estudios institucional"],
    correct: 0,
    explanation: "El docente de aula cumple una asignación académica en las horas y condiciones previstas por las normas."
  },
  {
    id: "general-planning", module: 3,
    prompt: "La revisión de lineamientos académicos debe realizarse conforme a:",
    options: ["Las preferencias personales del docente", "El PEI, el Plan Operativo Anual y los objetivos institucionales", "Únicamente los resultados de una prueba externa"],
    correct: 1,
    explanation: "La función general número 2 vincula los lineamientos con el PEI, el Plan Operativo Anual y los objetivos institucionales."
  },
  {
    id: "general-quality", module: 3,
    prompt: "¿Quién define los referentes de calidad y la normatividad que el docente debe conocer y actualizar?",
    options: ["Cada estudiante", "El Ministerio de Educación Nacional", "Solo el consejo de padres"],
    correct: 1,
    explanation: "El manual exige actualizarse en los referentes de calidad y la normatividad definidos por el MEN para el nivel educativo."
  },
  {
    id: "general-environments", module: 3,
    prompt: "Un docente organiza equipos en los que los estudiantes toman decisiones y se apoyan entre sí. ¿Qué función aplica?",
    options: ["Construir ambientes de aprendizaje autónomo y cooperativo", "Limitar el aprendizaje al trabajo individual", "Delegar la evaluación a las familias"],
    correct: 0,
    explanation: "La función general número 7 promueve ambientes que desarrollen autonomía y cooperación."
  },
  {
    id: "general-assessment", module: 3,
    prompt: "¿Cómo debe realizarse el seguimiento, evaluación y retroalimentación?",
    options: ["Con un enfoque integral, flexible y formativo", "Solo con una prueba final", "Con criterios distintos para cada estudiante sin justificación"],
    correct: 0,
    explanation: "La función general número 12 exige un enfoque integral, flexible y formativo."
  },
  {
    id: "general-reports", module: 3,
    prompt: "¿A quiénes debe presentar el docente informes regulares sobre la situación personal y académica?",
    options: ["Únicamente al rector", "A estudiantes y familias o acudientes", "Solamente a la secretaría de educación"],
    correct: 1,
    explanation: "La función número 13 contempla informes a estudiantes y familias o acudientes durante y al cierre de los periodos."
  },
  {
    id: "general-ict", module: 3,
    prompt: "¿Para qué debe utilizar el docente las TIC y los recursos de apoyo pedagógico?",
    options: ["Para reemplazar toda interacción presencial", "Para el desarrollo de su práctica educativa", "Solo para diligenciar la matrícula"],
    correct: 1,
    explanation: "La función número 17 integra recursos didácticos, TIC y apoyos institucionales a la práctica educativa."
  },
  {
    id: "general-inclusion", module: 3,
    prompt: "Un docente identifica una necesidad especial en un estudiante. ¿Qué debe hacer?",
    options: ["Ignorarla hasta finalizar el periodo", "Atender oportunamente desde su rol y activar las rutas institucionales", "Trasladar toda la responsabilidad a la familia"],
    correct: 1,
    explanation: "La función número 27 exige atención oportuna desde el rol docente y activación de las rutas establecidas."
  },
  {
    id: "area-siee", module: 4,
    prompt: "¿Qué debe hacer el docente de área respecto del SIEE?",
    options: ["Conocerlo para seguir y evaluar el trabajo en el aula", "Modificarlo individualmente", "Aplicarlo únicamente al finalizar el año"],
    correct: 0,
    explanation: "La primera función específica del docente de área es conocer el SIEE para el seguimiento y evaluación del aula."
  },
  {
    id: "area-leveling", module: 4,
    prompt: "¿Cuándo se plantean actividades de apoyo y nivelación?",
    options: ["Sin revisar evidencias previas", "Después de analizar el proceso formativo del estudiante", "Solo cuando lo solicita otro docente"],
    correct: 1,
    explanation: "El manual exige analizar previamente el proceso formativo antes de definir apoyos y nivelación."
  },
  {
    id: "area-didactics", module: 4,
    prompt: "¿Qué debe considerar la planeación académica del docente de área?",
    options: ["Las estrategias didácticas propias de la disciplina", "Solamente actividades administrativas", "Un método idéntico para todas las áreas"],
    correct: 0,
    explanation: "La planeación debe reconocer las estrategias didácticas propias de la disciplina o área de conocimiento."
  },
  {
    id: "area-application", module: 4,
    prompt: "Relacionar un concepto de química con una situación cotidiana responde a la función de:",
    options: ["Orientar la reflexión y aplicación práctica del conocimiento", "Sustituir el currículo institucional", "Evitar experiencias fuera del texto guía"],
    correct: 0,
    explanation: "El docente de área debe vincular los conocimientos disciplinares con situaciones de aula y experiencias cotidianas."
  },
  {
    id: "area-interdisciplinary", module: 4,
    prompt: "¿Qué busca el trabajo conjunto con docentes de otras áreas?",
    options: ["Articular y enriquecer el trabajo interdisciplinario", "Eliminar las diferencias entre disciplinas", "Reducir la planeación a una sola asignatura"],
    correct: 0,
    explanation: "La quinta función específica promueve espacios conjuntos para articular y enriquecer el trabajo interdisciplinario."
  },
  {
    id: "area-common-functions", module: 4,
    prompt: "¿Por qué Ciencias Naturales y Química comparten las cinco funciones específicas?",
    options: ["Porque pertenecen al cargo de docente de área de conocimiento", "Porque tienen exactamente los mismos títulos habilitantes", "Porque son cargos directivos"],
    correct: 0,
    explanation: "Comparten las funciones del docente de área, aunque cada perfil tiene su propio listado de títulos habilitantes."
  },
  {
    id: "area-unlisted-degree", module: 4,
    prompt: "Si un título no aparece expresamente en el perfil, ¿quién puede conceptuar sobre su habilitación?",
    options: ["El aspirante por interpretación propia", "El Ministerio de Educación Nacional", "Cualquier institución educativa"],
    correct: 1,
    explanation: "La competencia para conceptuar sobre un título no listado corresponde al Ministerio de Educación Nacional."
  },
  {
    id: "chemistry-degree", module: 4,
    prompt: "¿Cuál aparece entre los títulos profesionales del perfil de Ciencias Naturales - Química?",
    options: ["Bacteriología", "Arquitectura", "Contaduría pública"],
    correct: 0,
    explanation: "Bacteriología figura expresamente entre los títulos profesionales universitarios habilitantes de ese perfil."
  }
];

let currentClassQuizAttempt = [];

const classTwoLessonState = {
  current: 0,
  visited: new Set([0]),
  completed: false,
  score: null
};

const classTwoQuizSize = 8;
const classTwoQuizBank = [
  {
    id: "scope", module: 1,
    prompt: "¿A qué vacantes aplica el procedimiento regulado por el Decreto 915 de 2016?",
    options: ["A vacantes definitivas docentes y directivas docentes para población mayoritaria", "A cualquier empleo público nacional", "Solo a encargos temporales"],
    correct: 0,
    explanation: "El ámbito comprende vacantes definitivas de docentes y directivos docentes administradas por entidades territoriales certificadas para población mayoritaria."
  },
  {
    id: "principles", module: 1,
    prompt: "¿Cuál de los siguientes es un principio expreso del concurso?",
    options: ["Reserva absoluta", "Transparencia", "Libre designación"],
    correct: 1,
    explanation: "Transparencia integra el listado de principios junto con igualdad, oportunidad, publicidad, objetividad y otros."
  },
  {
    id: "first-stage", module: 2,
    prompt: "¿Cuál es la primera etapa de la estructura del concurso?",
    options: ["Entrevista", "Determinación de vacantes definitivas", "Nombramiento en período de prueba"],
    correct: 1,
    explanation: "El proceso comienza con la determinación de las vacantes definitivas que respaldarán la convocatoria."
  },
  {
    id: "requirements-stage", module: 2,
    prompt: "¿Quiénes presentan documentos para la verificación de requisitos?",
    options: ["Todos los inscritos antes de las pruebas", "Solo quienes aprobaron aptitudes y competencias básicas", "Únicamente quienes ya están en lista de elegibles"],
    correct: 1,
    explanation: "La recepción documental y verificación de requisitos se realiza para quienes superaron la prueba eliminatoria."
  },
  {
    id: "binding-call", module: 3,
    prompt: "¿Qué valor tiene la convocatoria dentro del concurso?",
    options: ["Es una recomendación", "Es la norma obligatoria que regula el concurso", "Solo informa la fecha de las pruebas"],
    correct: 1,
    explanation: "La convocatoria es obligatoria para personas, entidades e instituciones participantes."
  },
  {
    id: "call-changes", module: 3,
    prompt: "Iniciadas las inscripciones, ¿qué puede modificar la CNSC en la convocatoria?",
    options: ["Los requisitos mínimos del cargo", "El sitio, hora o fecha de las pruebas", "El carácter eliminatorio de una prueba ya anunciada"],
    correct: 1,
    explanation: "Después de iniciar inscripciones solo pueden modificarse sitio, hora o fecha de las pruebas, con la divulgación exigida."
  },
  {
    id: "registration-term", module: 3,
    prompt: "¿Cuál es el término mínimo para realizar la inscripción?",
    options: ["Cinco días hábiles", "Diez días calendario", "Quince días calendario"],
    correct: 2,
    explanation: "El artículo 2.4.1.1.8 establece un término no menor de quince días calendario."
  },
  {
    id: "registration-data", module: 3,
    prompt: "Una vez efectuada la inscripción, la información suministrada:",
    options: ["Puede actualizarse en cualquier momento", "No puede modificarse ni actualizarse", "Solo puede cambiarse después de la prueba"],
    correct: 1,
    explanation: "La información se entiende suministrada bajo juramento y no puede modificarse después de completar la inscripción."
  },
  {
    id: "eliminatory-test", module: 4,
    prompt: "¿Cuál es la única prueba de carácter eliminatorio?",
    options: ["Entrevista", "Valoración de antecedentes", "Aptitudes y competencias básicas"],
    correct: 2,
    explanation: "Las demás pruebas son clasificatorias; aptitudes y competencias básicas determina quién continúa."
  },
  {
    id: "minimum-scores", module: 4,
    prompt: "¿Cuáles son los mínimos aprobatorios presentados provisionalmente en esta clase?",
    options: ["50 para docentes y 60 para directivos", "60 para docentes y 70 para directivos", "70 para docentes y 80 para directivos"],
    correct: 1,
    explanation: "La clase muestra provisionalmente 60/100 para docentes y 70/100 para directivos, pendiente de incorporar la fuente oficial que respalde el cambio."
  },
  {
    id: "written-weight", module: 4,
    prompt: "Para docentes, la ponderación de aptitudes y competencias básicas no puede ser menor a:",
    options: ["45%", "55%", "70%"],
    correct: 1,
    explanation: "El 55% es un límite mínimo de ponderación, distinto del mínimo aprobatorio provisional de 60/100."
  },
  {
    id: "psychotechnical", module: 4,
    prompt: "¿Qué caracteriza a la prueba psicotécnica para docentes?",
    options: ["Es eliminatoria y pesa mínimo 55%", "Es clasificatoria y su peso no supera 10%", "Solo verifica títulos académicos"],
    correct: 1,
    explanation: "La psicotécnica es clasificatoria, valora actitudes y motivaciones, y para docentes no puede superar el 10%."
  },
  {
    id: "test-components", module: 4,
    prompt: "¿Cuál es un componente mínimo de aptitudes y competencias básicas?",
    options: ["Lectura crítica", "Administración presupuestal avanzada", "Legislación tributaria"],
    correct: 0,
    explanation: "Lectura crítica integra los componentes mínimos junto con razonamiento cuantitativo, competencias blandas y pedagógicas."
  },
  {
    id: "antecedents-access", module: 4,
    prompt: "La valoración de antecedentes y la entrevista se aplican a quienes:",
    options: ["Solo pagaron los derechos de participación", "Cumplen requisitos y aprobaron la prueba eliminatoria", "Obtuvieron el primer lugar antes de la entrevista"],
    correct: 1,
    explanation: "Son pruebas clasificatorias reservadas a aspirantes que acreditan requisitos y superan aptitudes y competencias básicas."
  },
  {
    id: "eligible-validity", module: 5,
    prompt: "¿Cuánto dura la lista territorial de elegibles desde su firmeza?",
    options: ["Un año", "Dos años", "Cuatro años"],
    correct: 1,
    explanation: "La lista de elegibles tiene una vigencia de dos años contados desde su firmeza."
  },
  {
    id: "vacancy-hearing", module: 5,
    prompt: "¿Cómo se realiza la escogencia de vacante en audiencia pública?",
    options: ["Por orden de llegada", "En orden descendente de la lista y para el cargo concursado", "Mediante sorteo entre todos los inscritos"],
    correct: 1,
    explanation: "La elección respeta el orden de mérito y el cargo docente o directivo para el cual se concursó."
  },
  {
    id: "appointment-deadlines", module: 5,
    prompt: "Comunicado el nombramiento, ¿qué plazos tiene el designado?",
    options: ["Cinco días hábiles para aceptar y diez adicionales para posesionarse", "Quince días para aceptar y cinco para posesionarse", "Treinta días sin distinción"],
    correct: 0,
    explanation: "El decreto concede cinco días hábiles para aceptar y diez días hábiles adicionales para tomar posesión."
  },
  {
    id: "non-licensed", module: 5,
    prompt: "¿Qué debe acreditar adicionalmente un profesional no licenciado para inscribirse en el escalafón?",
    options: ["Posgrado en educación en curso o terminado, o programa de pedagogía", "Cinco años obligatorios como directivo", "Una segunda carrera profesional de cualquier área"],
    correct: 0,
    explanation: "Debe acreditar la ruta pedagógica prevista: posgrado en educación o programa de pedagogía bajo responsabilidad de una institución de educación superior."
  }
];

let currentClassTwoQuizAttempt = [];

const classThreeLessonState = {
  current: 0,
  visited: new Set([0]),
  completed: false,
  score: null
};

const classThreeQuizSize = 8;
const classThreeQuizBank = [
  {
    id: "statute-purpose", module: 1,
    prompt: "¿Cuál es el objeto principal del Decreto Ley 1278 de 2002?",
    options: ["Expedir el Estatuto de Profesionalización Docente", "Definir únicamente el calendario escolar", "Regular exclusivamente la educación privada"],
    correct: 0,
    explanation: "El decreto establece el Estatuto de Profesionalización Docente y regula la relación del Estado con los educadores a su servicio."
  },
  {
    id: "statute-application", module: 1,
    prompt: "¿A quiénes se aplica principalmente este estatuto?",
    options: ["A quienes se vinculan desde su vigencia como docentes o directivos docentes estatales", "A todo trabajador público sin distinción", "Solo a docentes universitarios"],
    correct: 0,
    explanation: "Su ámbito comprende las nuevas vinculaciones estatales en preescolar, básica y media, además de quienes sean asimilados conforme a la norma."
  },
  {
    id: "service-vs-scale", module: 1,
    prompt: "Una persona nombrada en período de prueba, ¿ya está inscrita automáticamente en el escalafón?",
    options: ["Sí, desde la posesión", "No; debe superar satisfactoriamente el período de prueba", "Solo si renuncia a la evaluación"],
    correct: 1,
    explanation: "Primero se ingresa al servicio; la inscripción en el escalafón procede después de superar el período de prueba."
  },
  {
    id: "statute-scope-case", module: 1,
    prompt: "Una docente universitaria privada pregunta si el Decreto 1278 regula directamente su vinculación. ¿Cuál es la respuesta adecuada?",
    options: ["No; el ámbito estudiado se refiere a docentes y directivos docentes estatales de preescolar, básica y media", "Sí; regula toda relación docente pública o privada", "Sí, pero únicamente si tiene maestría"],
    correct: 0,
    explanation: "El artículo 2 delimita la aplicación a las vinculaciones estatales señaladas. La docencia universitaria privada no entra automáticamente en ese ámbito."
  },
  {
    id: "career-rights-order", module: 1,
    prompt: "Camila ganó el concurso y fue nombrada en período de prueba. ¿Qué falta para adquirir derechos de carrera?",
    options: ["Superar satisfactoriamente el período de prueba y quedar inscrita en el escalafón", "Cumplir solamente el primer mes de servicio", "Solicitar una designación provisional"],
    correct: 0,
    explanation: "Concurso, período de prueba satisfactorio e inscripción en el escalafón forman la secuencia para adquirir derechos de carrera."
  },
  {
    id: "education-professionals", module: 2,
    prompt: "¿Cuál grupo está reconocido como profesional de la educación por el estatuto?",
    options: ["Licenciados, profesionales no licenciados legalmente habilitados y normalistas superiores", "Únicamente licenciados con doctorado", "Cualquier bachiller sin formación adicional"],
    correct: 0,
    explanation: "El artículo 3 incluye expresamente esos tres perfiles dentro de la profesión educativa."
  },
  {
    id: "teaching-function", module: 2,
    prompt: "¿Qué integra la función docente definida por el Decreto 1278?",
    options: ["Diagnóstico, planeación, ejecución y evaluación de la enseñanza-aprendizaje", "Solo vigilancia disciplinaria", "Únicamente elaboración de informes administrativos"],
    correct: 0,
    explanation: "La función docente es profesional y comprende directamente el proceso sistemático de enseñanza-aprendizaje y sus resultados."
  },
  {
    id: "directive-function", module: 2,
    prompt: "¿Qué caracteriza principalmente la función directiva docente?",
    options: ["La gestión, orientación y conducción institucional", "La sustitución de todas las funciones del docente de aula", "La administración de entidades privadas"],
    correct: 0,
    explanation: "La función directiva se concentra en dirección, planeación, coordinación, administración y orientación del servicio educativo."
  },
  {
    id: "non-lecture-activities", module: 2,
    prompt: "Una docente afirma que atender a las familias no forma parte de su función porque ocurre fuera de la clase. ¿Es correcto?",
    options: ["No; la función también comprende actividades curriculares no lectivas y atención a la comunidad", "Sí; la función termina al finalizar la asignación académica", "Sí; únicamente corresponde al rector"],
    correct: 0,
    explanation: "El artículo 4 incluye atención a la comunidad, planeación, evaluación y otras actividades institucionales, no solo la enseñanza directa."
  },
  {
    id: "directive-cargos", module: 2,
    prompt: "¿Cuál de los siguientes corresponde a un cargo directivo docente reconocido por el estatuto?",
    options: ["Coordinador", "Secretario administrativo", "Representante estudiantil"],
    correct: 0,
    explanation: "El coordinador ejerce función directiva docente. Los otros roles no adquieren esa condición por el solo nombre del cargo."
  },
  {
    id: "open-competition", module: 3,
    prompt: "¿Cuál es el mecanismo ordinario de ingreso a un cargo estatal de carrera docente?",
    options: ["Concurso abierto de méritos", "Designación discrecional permanente", "Elección por las familias"],
    correct: 0,
    explanation: "El ingreso se fundamenta en el mérito demostrado mediante concurso abierto."
  },
  {
    id: "probation-months", module: 3,
    prompt: "¿Qué tiempo mínimo debe haberse servido el cargo para la evaluación del período de prueba en el año académico?",
    options: ["Dos meses", "Cuatro meses", "Doce meses completos"],
    correct: 1,
    explanation: "La evaluación procede si el educador ha servido el cargo por un período no menor de cuatro meses durante el respectivo año académico."
  },
  {
    id: "probation-score", module: 3,
    prompt: "¿Qué calificación se considera satisfactoria en la evaluación del período de prueba?",
    options: ["50% o más", "60% o más", "80% obligatorio"],
    correct: 1,
    explanation: "El artículo 31 establece como satisfactoria una calificación igual o superior al 60%."
  },
  {
    id: "eligible-list-effect", module: 3,
    prompt: "Aparecer en una lista de elegibles, ¿produce por sí solo la inscripción inmediata en el escalafón?",
    options: ["No; todavía deben surtirse el nombramiento, el período de prueba y su evaluación satisfactoria", "Sí; la lista reemplaza todas las etapas posteriores", "Sí, siempre que la persona acepte cualquier vacante"],
    correct: 0,
    explanation: "La lista permite continuar el proceso de provisión, pero no reemplaza el período de prueba ni la inscripción posterior."
  },
  {
    id: "directive-probation-effect", module: 3,
    prompt: "Un directivo no supera el período de prueba y ya estaba inscrito en el escalafón como docente. ¿Qué efecto contempla el artículo 31?",
    options: ["Regresa a la docencia cuando exista vacante", "Obtiene automáticamente otro cargo directivo", "Asciende al siguiente nivel salarial"],
    correct: 0,
    explanation: "Si ya estaba inscrito, el directivo regresa a la docencia cuando exista vacante; si no lo estaba, procede el retiro del servicio."
  },
  {
    id: "grade-one", module: 4,
    prompt: "¿Qué formación se asocia con el grado 1 del escalafón?",
    options: ["Normalista superior o tecnólogo en educación", "Únicamente doctorado", "Cualquier título técnico no educativo"],
    correct: 0,
    explanation: "El grado 1 corresponde a normalistas superiores y tecnólogos en educación en los términos del estatuto."
  },
  {
    id: "grade-three", module: 4,
    prompt: "¿Qué requisito académico distingue al grado 3?",
    options: ["Maestría o doctorado en un área afín", "Solo experiencia sin título", "Un curso de menos de cien horas"],
    correct: 0,
    explanation: "El grado 3 exige título de licenciado o profesional y maestría o doctorado en un área afín."
  },
  {
    id: "salary-levels", module: 4,
    prompt: "¿Cuáles son los niveles salariales dentro de cada grado?",
    options: ["A, B, C y D", "I, II y III", "Básico y avanzado únicamente"],
    correct: 0,
    explanation: "Cada uno de los tres grados contiene cuatro niveles salariales identificados con las letras A, B, C y D."
  },
  {
    id: "relocation-concept", module: 4,
    prompt: "Una educadora pasa de 2A a 2B. ¿Cómo se denomina ese movimiento?",
    options: ["Reubicación de nivel salarial", "Ascenso de grado", "Nuevo ingreso a la carrera"],
    correct: 0,
    explanation: "Cambiar al nivel siguiente dentro del mismo grado es reubicación. El ascenso implica pasar a otro grado."
  },
  {
    id: "promotion-concept", module: 4,
    prompt: "¿Qué elemento distingue un ascenso de una reubicación salarial?",
    options: ["El ascenso supone pasar a otro grado del escalafón", "El ascenso cambia únicamente de A a B", "La reubicación exige retirarse de la carrera"],
    correct: 0,
    explanation: "El grado cambia en el ascenso; la reubicación ocurre entre niveles salariales del mismo grado."
  },
  {
    id: "right-association", module: 5,
    prompt: "¿Cuál es un derecho expresamente reconocido por el artículo 37 del Decreto 1278?",
    options: ["Asociarse libremente", "Omitir la evaluación anual", "Permanecer en el cargo sin importar el desempeño"],
    correct: 0,
    explanation: "La libre asociación es un derecho expreso. La evaluación sigue siendo obligatoria cuando corresponde y la permanencia está sujeta a las condiciones legales."
  },
  {
    id: "conditional-permanence", module: 5,
    prompt: "¿Cómo debe entenderse el derecho de permanencia en el cargo?",
    options: ["Se mantiene mientras trabajo y conducta sean satisfactorios y no exista una causal legal de retiro", "Es absoluto desde el nombramiento provisional", "Impide toda evaluación del desempeño"],
    correct: 0,
    explanation: "La estabilidad de carrera no es absoluta: depende del desempeño, la conducta y las demás condiciones previstas en la ley."
  },
  {
    id: "ethical-values", module: 5,
    prompt: "¿Cuál conjunto refleja valores del artículo 39?",
    options: ["Responsabilidad, honestidad, justicia, respeto y transparencia", "Competencia comercial, reserva y rentabilidad", "Obediencia partidista y proselitismo"],
    correct: 0,
    explanation: "El marco ético docente destaca responsabilidad, honestidad, conocimiento, justicia, respeto y transparencia."
  },
  {
    id: "unenforceable-articles", module: 5,
    prompt: "¿Cómo deben estudiarse actualmente los artículos 41 y 42 del Decreto 1278?",
    options: ["Como disposiciones declaradas inexequibles, no como una lista autónoma vigente", "Como el único catálogo disciplinario aplicable", "Como reglas que sustituyen la Constitución y la ley"],
    correct: 0,
    explanation: "La Sentencia C-1157 de 2003 declaró inexequibles esos artículos. Las responsabilidades vigentes se buscan en las fuentes actuales aplicables."
  },
  {
    id: "disciplinary-source-case", module: 5,
    prompt: "Ante una posible falta disciplinaria de un docente, ¿cuál es el análisis correcto?",
    options: ["Identificar la conducta y contrastarla con la Constitución, la ley disciplinaria, los reglamentos y el manual aplicable", "Citar únicamente el artículo 42 anulado", "Aplicar una sanción sin procedimiento"],
    correct: 0,
    explanation: "La conducta debe relacionarse con una fuente vigente y tramitarse mediante el procedimiento competente; una disposición inexequible no basta."
  },
  {
    id: "evaluation-types", module: 6,
    prompt: "¿Cuáles son los tres tipos de evaluación señalados por el estatuto?",
    options: ["Período de prueba, desempeño anual y competencias", "Ingreso, entrevista y retiro", "Autoevaluación, coevaluación y examen final"],
    correct: 0,
    explanation: "El artículo 27 contempla evaluación de período de prueba, evaluación ordinaria periódica de desempeño anual y evaluación de competencias."
  },
  {
    id: "annual-service", module: 6,
    prompt: "¿Cuándo se aplica la evaluación anual de desempeño según el tiempo servido en el establecimiento?",
    options: ["Cuando se han servido más de tres meses durante el año académico", "Solo después de diez años", "Desde el primer día sin excepción"],
    correct: 0,
    explanation: "La evaluación anual se realiza a quienes hayan servido en el establecimiento por un término superior a tres meses durante el año académico."
  },
  {
    id: "annual-consecutive-result", module: 6,
    prompt: "Un docente obtiene menos del 60% en la evaluación anual durante dos años consecutivos. ¿Qué consecuencia establece el artículo 36?",
    options: ["Exclusión del escalafón y retiro del servicio", "Ascenso automático al grado siguiente", "Repetición sin ningún efecto de permanencia"],
    correct: 0,
    explanation: "Dos evaluaciones anuales consecutivas no satisfactorias producen la exclusión del escalafón y el retiro del docente. Para directivos existen reglas diferenciadas."
  },
  {
    id: "probation-components", module: 6,
    prompt: "Laura obtiene 70% en desempeño y 55% en competencias específicas durante el período de prueba. ¿Lo supera?",
    options: ["No; debe alcanzar por lo menos 60% en los componentes exigidos", "Sí; basta promediar ambos resultados", "Sí; cualquier resultado superior a 50% es suficiente"],
    correct: 0,
    explanation: "La evaluación satisfactoria exige al menos 60% en desempeño y competencias específicas; el 55% no cumple el mínimo."
  },
  {
    id: "decree-953-current", module: 6,
    prompt: "¿Qué norma actualizó en 2025 la reglamentación de la evaluación para ascenso y reubicación de educadores del Decreto 1278?",
    options: ["Decreto 953 de 2025", "Decreto 915 de 2016", "Resolución 003842 de 2022"],
    correct: 0,
    explanation: "El Decreto 953 de 2025 subrogó el capítulo correspondiente del Decreto 1075 y mantuvo el carácter diagnóstico formativo del proceso."
  }
];

let currentClassThreeQuizAttempt = [];

function updateClassStatusText() {
  if (!els.classStatusText) return;
  const completed = Number(classLessonState.completed) + Number(classTwoLessonState.completed) + Number(classThreeLessonState.completed);
  const totalAvailable = 4;
  const locked = 54;
  const available = totalAvailable - completed;
  if (completed === 0) {
    els.classStatusText.textContent = `${totalAvailable} disponibles · ${locked} bloqueadas`;
    return;
  }
  if (available === 0) {
    els.classStatusText.textContent = `${totalAvailable} clases completadas · ${locked} bloqueadas`;
    return;
  }
  els.classStatusText.textContent = `${completed} completada${completed === 1 ? "" : "s"} · ${available} disponible${available === 1 ? "" : "s"} · ${locked} bloqueadas`;
}

function renderClassRoadmap() {
  if (!els.classRoadmapGrid) return;
  els.classRoadmapGrid.innerHTML = Array.from({ length: 54 }, (_, index) => {
    const classNumber = String(index + 5).padStart(2, "0");
    return `
      <article class="class-locked-card" aria-label="Clase ${classNumber}, bloqueada">
        <span>${classNumber}</span>
        <div><strong>Clase ${classNumber}</strong><small>Contenido por definir</small></div>
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
      </article>`;
  }).join("");
}

function progressStorageKey() {
  if (!window.AULA_CONFIG?.authEnabled) return storageKey;
  return window.AULA_USER_ID ? `${storageKey}:${window.AULA_USER_ID}` : `${storageKey}:pending`;
}

function loadProgress() {
  const fallback = { attempts: [], completedItems: [], lastStudyDate: null, streak: 0, aspirantProfile: {} };
  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(progressStorageKey())) };
  } catch {
    return fallback;
  }
}

function saveProgress(progress) {
  localStorage.setItem(progressStorageKey(), JSON.stringify(progress));
}

async function resetUserProgress() {
  if (window.AULA_CONFIG?.authEnabled && window.AULA_USER_ID) {
    try {
      await requestSecureAttemptData("history=1", "DELETE");
      secureHistoryUserId = window.AULA_USER_ID;
    } catch (error) {
      window.alert(error.message || "No fue posible reiniciar tu progreso.");
      return;
    }
  }
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
    lectura_critica: "Lectura critica",
    razonamiento_cuantitativo: "Razonamiento cuantitativo",
    competencias_blandas: "Competencias blandas",
    competencias_pedagogicas: "Competencias pedagogicas",
    ofimatica: "Ofimatica",
    conocimientos_especificos: "Conocimientos especificos"
  }[category] || "Simulacro";
}

function profileAreaLabel(area) {
  return {
    competencias_pedagogicas: "Competencias pedagógicas",
    lectura_critica: "Lectura crítica",
    razonamiento_cuantitativo: "Razonamiento cuantitativo",
    ofimatica: "Ofimática",
    quimica: "Química",
    ciencias_naturales: "Ciencias naturales",
    otro: "Otra área"
  }[area] || "";
}

function renderAspirantProfile(progress = loadProgress()) {
  const profile = progress.aspirantProfile || {};
  if (els.aspirantArea) els.aspirantArea.value = profile.area || "";
  if (els.aspirantTerritory) els.aspirantTerritory.value = profile.territory || "";
  if (els.aspirantGoal) els.aspirantGoal.value = Number.isFinite(profile.goal) ? String(profile.goal) : "";
  if (!els.aspirantProfileStatus) return;
  const details = [profileAreaLabel(profile.area), profile.territory, profile.goal ? `Meta ${profile.goal}/100` : ""].filter(Boolean);
  els.aspirantProfileStatus.textContent = details.length ? details.join(" · ") : "Aún sin configurar";
}

function getSimulacroTitle(category, testId, questions = []) {
  const trigger = Array.from(document.querySelectorAll("[data-start-simulacro]")).find((button) => (
    button.dataset.startSimulacro === category
    && (button.dataset.simulacroTest || null) === (testId || null)
  ));
  const catalogTitle = trigger
    ?.closest(".simulacro-entry")
    ?.querySelector(".simulacro-entry-copy strong")
    ?.textContent
    ?.trim();

  return catalogTitle || questions[0]?.testTitle || simulacroCategoryLabel(category);
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

async function requestSecureQuiz(category, answers = null, testId = null) {
  const config = window.AULA_CONFIG || {};
  const client = await window.AULA_AUTH_READY;
  const { data: sessionData } = await client.auth.getSession();
  const accessToken = sessionData.session?.access_token;
  if (!accessToken) throw new Error("Tu sesion ha vencido. Ingresa nuevamente.");

  const testQuery = testId ? `&test=${encodeURIComponent(testId)}` : "";
  const response = await fetch(
    `${config.supabaseUrl}/functions/v1/quiz?category=${encodeURIComponent(category)}${testQuery}`,
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

async function requestSecureAttemptData(query, method = "GET") {
  const config = window.AULA_CONFIG || {};
  const client = await window.AULA_AUTH_READY;
  const { data: sessionData } = await client.auth.getSession();
  const accessToken = sessionData.session?.access_token;
  if (!accessToken) throw new Error("Tu sesion ha vencido. Ingresa nuevamente.");

  const response = await fetch(`${config.supabaseUrl}/functions/v1/quiz?${query}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      apikey: config.supabasePublishableKey
    }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "No fue posible consultar tus respuestas.");
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
    const number = document.createElement("span");
    const choices = document.createElement("span");
    const answer = simulacroState.answers[index];
    button.type = "button";
    number.className = "simulacro-answer-number";
    number.textContent = String(index + 1);
    choices.className = "simulacro-answer-choices";
    choices.style.setProperty("--answer-count", String(question.options.length));
    question.options.forEach((_, optionIndex) => {
      const marker = document.createElement("span");
      marker.textContent = String.fromCharCode(65 + optionIndex);
      marker.classList.toggle("selected", !simulacroState.reviewMode && answer === optionIndex);
      if (simulacroState.reviewMode) {
        marker.classList.toggle("correct", optionIndex === question.answer);
        marker.classList.toggle("wrong", answer === optionIndex && optionIndex !== question.answer);
      }
      choices.append(marker);
    });
    button.append(number, choices);
    button.classList.toggle("answered", answer !== null);
    button.classList.toggle("current", index === simulacroState.currentIndex);
    if (simulacroState.reviewMode) {
      button.classList.toggle("correct", answer === question.answer);
      button.classList.toggle("wrong", answer !== question.answer);
    }
    const answerLabel = answer === null ? "sin responder" : `respuesta ${String.fromCharCode(65 + answer)}`;
    button.setAttribute("aria-label", `Pregunta ${index + 1}, ${answerLabel}`);
    button.addEventListener("click", () => {
      simulacroState.currentIndex = index;
      renderSimulacroQuestion();
    });
    return button;
  });
  els.simulacroQuestionNav.replaceChildren(...buttons);
  if (els.simulacroSheetProgress) {
    const answered = simulacroState.answers.filter((answer) => answer !== null).length;
    els.simulacroSheetProgress.textContent = `${answered}/${simulacroState.questions.length}`;
  }
}

function renderSimulacroSituation(question) {
  const changedBlock = simulacroState.currentBlockId !== question.blockId;
  simulacroState.currentBlockId = question.blockId;
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
  if (changedBlock) {
    els.simulacroSituation.open = true;
    els.simulacroSituationText.scrollTop = 0;
  }
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

async function startSimulacro(category, testId = null) {
  const secureMode = Boolean(window.AULA_CONFIG?.authEnabled);
  const data = secureMode ? await requestSecureQuiz(category, null, testId) : null;
  const localQuestions = getSimulacroQuestions(category);
  const loadedQuestions = secureMode
    ? data.questions
    : localQuestions.filter((question) => (
      !testId
      || (testId === "pedagogicas-general" && question.testId !== "tuiran-pedagogicas-01")
      || question.testId === testId
    ));
  const questions = randomizeSimulacroQuestions(loadedQuestions);
  if (!questions.length) return;

  simulacroState.category = category;
  simulacroState.testId = testId;
  simulacroState.title = getSimulacroTitle(category, testId, questions);
  simulacroState.questions = questions;
  simulacroState.answers = Array(questions.length).fill(null);
  simulacroState.currentIndex = 0;
  simulacroState.currentBlockId = null;
  simulacroState.reviewMode = false;
  simulacroState.completed = false;
  els.simulacroRunnerCategory.textContent = simulacroCategoryLabel(category);
  els.simulacroRunnerTitle.textContent = simulacroState.title;
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
  let attemptId = null;
  let attemptDate = new Date().toISOString();

  if (secureMode) {
    els.simulacroFinishBtn.disabled = true;
    els.simulacroFinishBtn.textContent = "Calificando...";
    const result = await requestSecureQuiz(
      simulacroState.category,
      simulacroState.questions.map((question, index) => ({
        id: question.id,
        answer: simulacroState.answers[index]
      })),
      simulacroState.testId
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
    ({ correct, total, score, attemptId } = result);
    attemptDate = result.createdAt || attemptDate;
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
      attemptId,
      createdAt: attemptDate,
      date: new Date(attemptDate).toLocaleString("es-CO"),
      simulacroTitle: simulacroState.title,
      testId: simulacroState.testId,
      questionIds: simulacroState.questions.map((question) => question.id),
      answers: [...simulacroState.answers],
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

function newsImpact(item) {
  if (item.impact) return item.impact;
  const text = `${item.title || ""} ${item.summary || ""}`.toLowerCase();
  if (/(convocatoria|inscripcion|prueba|concurso)/.test(text)) {
    return "Revisa si modifica fechas, requisitos, pruebas o documentos de tu inscripcion.";
  }
  if (/(vacante|opec|encargo|provision)/.test(text)) {
    return "Puede afectar la oferta de cargos o la forma en que se proveen las vacantes.";
  }
  if (/(decreto|ley|resolucion|norma|escalafon)/.test(text)) {
    return "Contrasta esta novedad con la norma vigente antes de tomar decisiones de inscripcion.";
  }
  return "Consulta la fuente oficial para confirmar si tiene efectos directos en tu preparacion.";
}

function newsImpactBlock(item, compact = false) {
  const impact = document.createElement("div");
  const label = document.createElement("span");
  const copy = document.createElement("p");
  const priority = ["prioridad", "seguimiento", "informativa"].includes(item.priority)
    ? item.priority
    : "informativa";

  impact.className = `news-impact ${compact ? "compact" : ""} ${priority}`.trim();
  label.textContent = compact ? "Para tu preparacion" : "Como te afecta";
  copy.textContent = newsImpact(item);
  impact.append(label, copy);
  return impact;
}

function isNewsRelevantForPreparation(item) {
  const text = `${item.title || ""} ${item.summary || ""}`.toLowerCase();
  return /(concurso|convocatoria|inscripcion|prueba|vacante|opec|simo|merito|carrera docente|encargo|escalafon|decreto|resolucion)/.test(text);
}

function newsDateValue(item) {
  const value = Date.parse(`${item.date || ""}T00:00:00Z`);
  return Number.isNaN(value) ? 0 : value;
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
    ? data.items
      .filter((item) => item?.title && allowedNewsUrl(item.url) && isNewsRelevantForPreparation(item))
      .sort((first, second) => newsDateValue(second) - newsDateValue(first))
      .slice(0, 3)
    : [];
  if (items.length < 2 || !els.newsFeature || !els.newsList) return;

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
  featureCopy.append(newsMeta(feature), topic, title, summary, newsImpactBlock(feature), read);
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
    card.append(newsMeta(item), cardTitle, cardSummary, newsImpactBlock(item, true), newsArrow("news-arrow"));
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
    razonamiento: "Razonamiento + lectura critica",
    lectura_critica: "Lectura critica",
    razonamiento_cuantitativo: "Razonamiento cuantitativo",
    competencias_blandas: "Competencias blandas",
    competencias_pedagogicas: "Competencias pedagogicas",
    ofimatica: "Ofimatica",
    conocimientos_especificos: "Conocimientos especificos"
  }[category] || "General";
}
let studyViewState = "route";
let studyCardIndex = 0;
let studyCardRevealed = false;
let studyErrorRequestToken = 0;
const studyAttemptReviewCache = new Map();

function renderStudyOverview(progress = loadProgress()) {
  const completed = progress.completedItems.filter((id) => id >= 0 && id < studyItems.length).length;
  const percent = Math.round((completed / studyItems.length) * 100);
  const nextItem = studyItems.find((_, index) => !progress.completedItems.includes(index));
  const latestAttempt = progress.attempts[0];

  els.studyCompletionMetric.textContent = `${percent}%`;
  els.studyStreakMetric.textContent = `${progress.streak || 0} ${(progress.streak || 0) === 1 ? "dia" : "dias"}`;
  els.studyScoreMetric.textContent = latestAttempt ? `${latestAttempt.score}%` : "Sin intento";
  const profile = progress.aspirantProfile || {};
  const target = profile.goal ? ` Tu meta es ${profile.goal}/100.` : "";
  const area = profileAreaLabel(profile.area);
  els.studyTodayDescription.textContent = nextItem
    ? `${area ? `${area}: ` : ""}${nextItem.category}: ${nextItem.title}.${target}`
    : "Ruta completada. Refuerza tus errores o realiza un nuevo simulacro.";
  els.studyContinueBtn.textContent = nextItem ? "Continuar ruta" : "Repasar tarjetas";
  els.studyContinueBtn.append(newsArrow("button-arrow"));
}

function renderStudyRoute(progress = loadProgress()) {
  const completed = progress.completedItems.filter((id) => id >= 0 && id < studyItems.length).length;
  const percent = Math.round((completed / studyItems.length) * 100);
  els.studyRouteProgressText.textContent = `${completed} de ${studyItems.length}`;
  els.studyRouteProgressBar.style.width = `${percent}%`;

  const items = studyItems.map((item, index) => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    const number = document.createElement("span");
    const copy = document.createElement("span");
    const category = document.createElement("small");
    const title = document.createElement("strong");
    const detail = document.createElement("span");

    label.className = "study-route-item";
    checkbox.type = "checkbox";
    checkbox.dataset.study = String(index);
    checkbox.checked = progress.completedItems.includes(index);
    number.className = "study-route-number";
    copy.className = "study-route-copy";
    number.textContent = String(index + 1).padStart(2, "0");
    category.textContent = item.category;
    title.textContent = item.title;
    detail.textContent = item.detail;
    copy.append(category, title, detail);
    label.append(checkbox, number, copy);

    checkbox.addEventListener("change", () => {
      const current = loadProgress();
      current.completedItems = checkbox.checked
        ? [...new Set([...current.completedItems, index])]
        : current.completedItems.filter((savedId) => savedId !== index);
      saveProgress(current);
      markStudyActivity();
      renderStudyOverview(loadProgress());
      renderStudyRoute(loadProgress());
    });
    return label;
  });
  els.studyPlan.replaceChildren(...items);
}

function renderStudyFlashcard() {
  const card = flashcards[studyCardIndex];
  if (!card) return;
  const progress = loadProgress();
  const reviewState = progress.flashcardReview?.[studyCardIndex];
  els.studyCardCategory.textContent = card.category;
  els.studyCardFront.textContent = card.front;
  els.studyCardBack.textContent = card.back;
  els.studyCardBack.hidden = !studyCardRevealed;
  els.studyCardFront.hidden = studyCardRevealed;
  els.studyCardCounter.textContent = `${studyCardIndex + 1} / ${flashcards.length}`;
  els.studyMemoryCard.classList.toggle("revealed", studyCardRevealed);
  els.studyMemoryCard.dataset.reviewState = reviewState || "new";
  els.studyRevealCard.hidden = studyCardRevealed;
  els.studyConfidenceActions.hidden = !studyCardRevealed;
}

function rateStudyFlashcard(status) {
  const progress = loadProgress();
  progress.flashcardReview = { ...(progress.flashcardReview || {}), [studyCardIndex]: status };
  saveProgress(progress);
  markStudyActivity();
  studyCardIndex = (studyCardIndex + 1) % flashcards.length;
  studyCardRevealed = false;
  renderStudyFlashcard();
}

function setStudyView(view) {
  studyViewState = view;
  els.studyTabs.forEach((tab) => {
    const selected = tab.dataset.studyView === view;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
  });
  els.studyPanels.forEach((panel) => {
    const selected = panel.dataset.studyPanel === view;
    panel.classList.toggle("active", selected);
    panel.hidden = !selected;
  });
  if (view === "cards") renderStudyFlashcard();
  if (view === "errors") void loadStudyMistakes();
}

function studyAttemptValue(attempt, index) {
  return attempt.attemptId || `local-${index}`;
}

function renderStudyAttemptOptions(progress = loadProgress()) {
  if (!els.studyAttemptSelect) return;
  const previousValue = els.studyAttemptSelect.value;
  const attempts = progress.attempts || [];
  const options = attempts.map((attempt, index) => {
    const option = document.createElement("option");
    option.value = studyAttemptValue(attempt, index);
    option.textContent = `${attempt.simulacroTitle || "Simulacro"} · ${attempt.score}%`;
    return option;
  });
  els.studyAttemptSelect.replaceChildren(...options);
  els.studyAttemptSelect.disabled = !attempts.length;
  if (options.some((option) => option.value === previousValue)) {
    els.studyAttemptSelect.value = previousValue;
  }
  if (!attempts.length) {
    const option = document.createElement("option");
    option.textContent = "Sin intentos disponibles";
    els.studyAttemptSelect.append(option);
  }
}

function selectedStudyAttempt() {
  const attempts = loadProgress().attempts || [];
  return attempts.find((attempt, index) => studyAttemptValue(attempt, index) === els.studyAttemptSelect.value);
}

async function loadStudyMistakes() {
  const requestToken = ++studyErrorRequestToken;
  const attempt = selectedStudyAttempt();
  els.studyErrorsList.replaceChildren();
  if (!attempt) {
    els.studyErrorsStatus.textContent = "Completa un simulacro para crear tu lista de repaso.";
    return;
  }

  els.studyErrorsStatus.textContent = "Consultando tus respuestas...";
  try {
    let questions = studyAttemptReviewCache.get(attempt.attemptId);
    if (!questions && window.AULA_CONFIG?.authEnabled && attempt.attemptId) {
      const data = await requestSecureAttemptData(`attempt=${encodeURIComponent(attempt.attemptId)}`);
      questions = data.questions;
      studyAttemptReviewCache.set(attempt.attemptId, questions);
    }
    if (!questions) {
      const category = Object.keys(attempt.byCategory || {})[0];
      const bank = new Map(getSimulacroQuestions(category).map((question) => [question.id, question]));
      questions = (attempt.questionIds || []).map((id, index) => ({
        ...bank.get(id),
        selected: attempt.answers?.[index]
      })).filter((question) => question.id);
    }
    if (requestToken !== studyErrorRequestToken) return;

    const errors = questions.filter((question) => question.selected !== question.answer);
    els.studyErrorsStatus.textContent = errors.length
      ? `${errors.length} ${errors.length === 1 ? "error identificado" : "errores identificados"} en este intento.`
      : "No tuviste respuestas incorrectas en este intento.";

    const errorItems = errors.map((question) => {
      const details = document.createElement("details");
      const summary = document.createElement("summary");
      const number = document.createElement("span");
      const label = document.createElement("strong");
      const body = document.createElement("div");
      const prompt = document.createElement("p");
      const selected = document.createElement("p");
      const correct = document.createElement("p");
      const explanation = document.createElement("p");
      const selectedLetter = String.fromCharCode(65 + question.selected);
      const correctLetter = String.fromCharCode(65 + question.answer);

      details.className = "study-error-item";
      number.textContent = `Pregunta ${question.number}`;
      label.textContent = question.topic || labelCategory(question.category);
      prompt.className = "study-error-prompt";
      selected.className = "study-error-selected";
      correct.className = "study-error-correct";
      explanation.className = "study-error-explanation";
      prompt.textContent = question.prompt;
      selected.textContent = `Tu respuesta: ${selectedLetter}. ${question.options[question.selected]}`;
      correct.textContent = `Respuesta correcta: ${correctLetter}. ${question.options[question.answer]}`;
      explanation.textContent = question.explanation;
      summary.append(number, label);
      body.append(prompt, selected, correct, explanation);
      details.append(summary, body);
      return details;
    });
    els.studyErrorsList.replaceChildren(...errorItems);
  } catch (error) {
    if (requestToken !== studyErrorRequestToken) return;
    els.studyErrorsStatus.textContent = error.message || "No fue posible consultar los errores.";
  }
}

function renderStudy() {
  const progress = loadProgress();
  renderAspirantProfile(progress);
  renderStudyOverview(progress);
  renderStudyRoute(progress);
  renderStudyFlashcard();
  renderStudyAttemptOptions(progress);
  setStudyView(studyViewState);
}

let secureHistoryUserId = null;
let secureHistoryLoading = false;

async function syncSecureAttemptHistory() {
  const userId = window.AULA_USER_ID;
  if (!window.AULA_CONFIG?.authEnabled || !userId || secureHistoryLoading || secureHistoryUserId === userId) return;

  secureHistoryLoading = true;
  try {
    const data = await requestSecureAttemptData("history=1");
    const progress = loadProgress();
    progress.attempts = data.attempts.map((attempt) => ({
      attemptId: attempt.id,
      createdAt: attempt.createdAt,
      date: new Date(attempt.createdAt).toLocaleString("es-CO"),
      simulacroTitle: attempt.title,
      testId: attempt.testId,
      score: attempt.score,
      correct: attempt.correct,
      total: attempt.total,
      byCategory: {
        [attempt.category]: { total: attempt.total, correct: attempt.correct }
      }
    }));
    saveProgress(progress);
    secureHistoryUserId = userId;
    renderStudyOverview(progress);
    renderStudyAttemptOptions(progress);
    if (studyViewState === "errors") void loadStudyMistakes();
    renderProgress();
  } catch (error) {
    console.error("No fue posible sincronizar el historial de simulacros.", error);
  } finally {
    secureHistoryLoading = false;
  }
}

async function openAttemptReview(attempt, button) {
  const originalLabel = button.querySelector(".attempt-action")?.textContent || "Ver respuestas";
  button.disabled = true;
  const action = button.querySelector(".attempt-action");
  if (action) action.textContent = "Cargando...";

  try {
    let questions;
    let title = attempt.simulacroTitle;
    let category = Object.keys(attempt.byCategory || {})[0] || "competencias_pedagogicas";
    let testId = attempt.testId || null;

    if (window.AULA_CONFIG?.authEnabled && attempt.attemptId) {
      const data = await requestSecureAttemptData(`attempt=${encodeURIComponent(attempt.attemptId)}`);
      questions = data.questions;
      title = data.attempt.title;
      category = data.attempt.category;
      testId = data.attempt.testId;
    } else {
      const bank = new Map(getSimulacroQuestions(category).map((question) => [question.id, question]));
      questions = (attempt.questionIds || []).map((id, index) => ({
        ...bank.get(id),
        selected: attempt.answers?.[index]
      })).filter((question) => question.id);
    }

    if (!questions?.length) throw new Error("Este intento anterior no tiene respuestas guardadas para revisar.");
    simulacroState.category = category;
    simulacroState.testId = testId;
    simulacroState.title = title;
    simulacroState.questions = questions;
    simulacroState.answers = questions.map((question) => question.selected);
    simulacroState.currentIndex = 0;
    simulacroState.currentBlockId = null;
    simulacroState.reviewMode = true;
    simulacroState.completed = true;
    els.simulacroRunnerCategory.textContent = simulacroCategoryLabel(category);
    els.simulacroRunnerTitle.textContent = title;
    els.simulacroBrowser.hidden = true;
    els.simulacroResult.hidden = true;
    els.simulacroRunner.hidden = false;
    switchView("simulacro");
    renderSimulacroQuestion();
  } catch (error) {
    window.alert(error.message || "No fue posible abrir las respuestas.");
  } finally {
    button.disabled = false;
    if (action) action.textContent = originalLabel;
  }
}

function renderProgress() {
  void syncSecureAttemptHistory();
  const progress = loadProgress();
  if (!progress.attempts.length) {
    els.attemptsList.innerHTML = `<p>Aun no hay simulacros registrados.</p>`;
    els.recommendations.innerHTML = `<p>Completa un simulacro para recibir recomendaciones por area.</p>`;
    return;
  }

  els.attemptsList.replaceChildren();
  progress.attempts.forEach((attempt) => {
    const category = Object.keys(attempt.byCategory || {})[0];
    const attemptTitle = attempt.simulacroTitle
      || (category ? simulacroCategoryLabel(category) : "Simulacro");
    const item = document.createElement("button");
    const summary = document.createElement("div");
    const title = document.createElement("strong");
    const result = document.createElement("span");
    const meta = document.createElement("span");
    const date = document.createElement("time");
    const action = document.createElement("span");

    item.className = "attempt";
    item.type = "button";
    summary.className = "attempt-summary";
    title.className = "attempt-title";
    result.className = "attempt-result";
    meta.className = "attempt-meta";
    date.className = "attempt-date";
    action.className = "attempt-action";
    title.textContent = attemptTitle;
    result.textContent = `${attempt.score}% · ${attempt.correct}/${attempt.total} correctas`;
    date.textContent = attempt.date;
    action.textContent = "Ver respuestas →";
    item.setAttribute("aria-label", `Revisar respuestas de ${attemptTitle}`);
    summary.append(title, result);
    meta.append(date, action);
    item.append(summary, meta);
    item.addEventListener("click", () => openAttemptReview(attempt, item));
    els.attemptsList.append(item);
  });

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

  const profile = progress.aspirantProfile || {};
  const preferredArea = profile.area;
  ranked.sort((a, b) => (a.category === preferredArea ? -1 : b.category === preferredArea ? 1 : a.percent - b.percent));
  const targetMessage = profile.goal
    ? `<div class="recommendation profile-recommendation"><strong>Meta personal: ${profile.goal}/100</strong><p>${profile.territory ? `${profile.territory}. ` : ""}Compara tus próximos resultados con esta meta y prioriza el área seleccionada.</p><span class="tag">${profileAreaLabel(profile.area) || "Perfil activo"}</span></div>`
    : "";
  els.recommendations.innerHTML = targetMessage + ranked.map((item) => `
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
  if (viewId === "clase") {
    if (els.classCatalog) els.classCatalog.hidden = false;
    if (els.classLesson) els.classLesson.hidden = true;
    if (els.classTwoLesson) els.classTwoLesson.hidden = true;
    if (els.classThreeLesson) els.classThreeLesson.hidden = true;
    if (els.classFourLesson) els.classFourLesson.hidden = true;
  }
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

function classProgressStorageKey() {
  const base = "concursoDocente2026Class01v2";
  return window.AULA_USER_ID ? `${base}:${window.AULA_USER_ID}` : base;
}

function loadClassLessonProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(classProgressStorageKey()));
    classLessonState.current = Math.min(4, Math.max(0, Number(saved?.current) || 0));
    classLessonState.visited = new Set(
      Array.isArray(saved?.visited)
        ? saved.visited.filter((index) => Number.isInteger(index) && index >= 0 && index <= 4)
        : [0]
    );
    classLessonState.visited.add(classLessonState.current);
    classLessonState.completed = Boolean(saved?.completed);
    classLessonState.score = Number.isInteger(saved?.score) ? saved.score : null;
  } catch {
    classLessonState.current = 0;
    classLessonState.visited = new Set([0]);
    classLessonState.completed = false;
    classLessonState.score = null;
  }
}

function saveClassLessonProgress() {
  localStorage.setItem(classProgressStorageKey(), JSON.stringify({
    current: classLessonState.current,
    visited: [...classLessonState.visited],
    completed: classLessonState.completed,
    score: classLessonState.score
  }));
}
function renderClassModule(index, shouldScroll = true) {
  const nextIndex = Math.min(4, Math.max(0, index));
  classLessonState.current = nextIndex;
  classLessonState.visited.add(nextIndex);

  els.classModuleButtons.forEach((button) => {
    const moduleIndex = Number(button.dataset.classModule);
    const active = moduleIndex === nextIndex;
    button.classList.toggle("active", active);
    button.classList.toggle("visited", classLessonState.visited.has(moduleIndex));
    if (active) button.setAttribute("aria-current", "step");
    else button.removeAttribute("aria-current");
  });
  els.classModulePanels.forEach((panel) => {
    const active = Number(panel.dataset.classPanel) === nextIndex;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });

  const progress = Math.round((classLessonState.visited.size / 5) * 100);
  if (els.classProgressText) els.classProgressText.textContent = `Modulo ${nextIndex + 1} de 5`;
  if (els.classProgressPercent) els.classProgressPercent.textContent = `${progress}%`;
  if (els.classProgressBar) {
    els.classProgressBar.style.width = `${progress}%`;
    els.classProgressBar.parentElement?.setAttribute("aria-valuenow", String(progress));
  }
  if (els.classPrevModule) els.classPrevModule.disabled = nextIndex === 0;
  if (els.classNextModule) els.classNextModule.hidden = nextIndex === 4;
  if (els.classNextModuleLabel) {
    els.classNextModuleLabel.textContent = nextIndex === 3 ? "Ir a la evaluacion" : "Siguiente modulo";
  }
  updateClassStatusText();
  saveClassLessonProgress();

  if (shouldScroll) {
    document.querySelector(".class-learning-progress")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function setClassLessonOpen(open) {
  if (!els.classCatalog || !els.classLesson || !els.classOpenBtn) return;
  if (open) {
    loadClassLessonProgress();
    loadClassTwoProgress();
    loadClassThreeProgress();
  }
  els.classCatalog.hidden = open;
  els.classLesson.hidden = !open;
  if (els.classTwoLesson) els.classTwoLesson.hidden = true;
  if (els.classThreeLesson) els.classThreeLesson.hidden = true;
  els.classOpenBtn.setAttribute("aria-expanded", String(open));
  if (open) renderClassModule(classLessonState.current, false);
  const target = open ? els.classLesson : document.querySelector(".class-heading");
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => (open ? els.classBackBtn : els.classOpenBtn)?.focus(), 350);
}

function classQuizSignatureStorageKey() {
  const base = "concursoDocente2026Class01QuizSignature";
  return window.AULA_USER_ID ? `${base}:${window.AULA_USER_ID}` : base;
}

function createClassQuizAttempt() {
  const distribution = new Map([[1, 2], [2, 2], [3, 3], [4, 3]]);
  let selected = [...distribution.entries()].flatMap(([module, amount]) => (
    shuffleItems(classQuizBank.filter((question) => question.module === module)).slice(0, amount)
  ));
  selected = shuffleItems(selected).slice(0, classQuizSize);

  const previousSignature = localStorage.getItem(classQuizSignatureStorageKey());
  let signature = selected.map((question) => question.id).join("|");
  if (signature === previousSignature && selected.length > 1) {
    selected = [...selected.slice(1), selected[0]];
    signature = selected.map((question) => question.id).join("|");
  }
  localStorage.setItem(classQuizSignatureStorageKey(), signature);

  return selected.map((question) => {
    const options = shuffleItems(question.options.map((text, index) => ({
      text,
      isCorrect: index === question.correct
    })));
    return {
      ...question,
      options: options.map((option) => option.text),
      correct: options.findIndex((option) => option.isCorrect)
    };
  });
}

function getClassQuizQuestionElements() {
  return [...(els.classQuizQuestions?.querySelectorAll("[data-class-quiz-question]") || [])];
}

function renderClassQuizQuestions() {
  if (!els.classQuizQuestions) return;
  currentClassQuizAttempt = createClassQuizAttempt();
  const fragment = document.createDocumentFragment();

  currentClassQuizAttempt.forEach((question, questionIndex) => {
    const fieldset = document.createElement("fieldset");
    fieldset.dataset.classQuizQuestion = "";
    fieldset.dataset.answer = String(question.correct);

    const legend = document.createElement("legend");
    const number = document.createElement("span");
    number.textContent = String(questionIndex + 1);
    legend.append(number, document.createTextNode(question.prompt));
    fieldset.append(legend);

    question.options.forEach((option, optionIndex) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      const copy = document.createElement("span");
      input.type = "radio";
      input.name = `classQuiz${questionIndex + 1}`;
      input.value = String(optionIndex);
      copy.textContent = option;
      label.append(input, copy);
      fieldset.append(label);
    });

    const explanation = document.createElement("p");
    explanation.className = "class-quiz-explanation";
    explanation.hidden = true;
    fieldset.append(explanation);
    fragment.append(fieldset);
  });

  els.classQuizQuestions.replaceChildren(fragment);
}

function resetClassQuiz() {
  renderClassQuizQuestions();
  if (els.classQuizMessage) els.classQuizMessage.textContent = "";
  if (els.classQuizResult) els.classQuizResult.hidden = true;
  els.classQuiz?.querySelector("button[type='submit']")?.removeAttribute("hidden");
}

els.classOpenBtn?.addEventListener("click", () => setClassLessonOpen(true));
els.classBackBtn?.addEventListener("click", () => setClassLessonOpen(false));
els.classModuleButtons.forEach((button) => {
  button.addEventListener("click", () => renderClassModule(Number(button.dataset.classModule)));
});
els.classPrevModule?.addEventListener("click", () => renderClassModule(classLessonState.current - 1));
els.classNextModule?.addEventListener("click", () => renderClassModule(classLessonState.current + 1));

els.classPracticeCheck?.querySelectorAll("[data-class-check-answer]").forEach((button) => {
  button.addEventListener("click", () => {
    const selected = Number(button.dataset.classCheckAnswer);
    const feedback = els.classPracticeCheck.querySelector(".class-check-feedback");
    els.classPracticeCheck.querySelectorAll("[data-class-check-answer]").forEach((option) => {
      option.classList.toggle("correct", Number(option.dataset.classCheckAnswer) === 2);
      option.classList.toggle("wrong", option === button && selected !== 2);
    });
    if (feedback) {
      feedback.textContent = selected === 2
        ? "Correcto. La relacion con las familias y el entorno corresponde a la gestion comunitaria."
        : "Revisa el foco de la situacion: la relacion con familias y entorno pertenece a la gestion comunitaria.";
      feedback.dataset.state = selected === 2 ? "correct" : "wrong";
    }
  });
});

els.classQuiz?.addEventListener("submit", (event) => {
  event.preventDefault();
  const questionElements = getClassQuizQuestionElements();
  const unanswered = questionElements.filter((question) => !question.querySelector("input:checked"));
  if (unanswered.length) {
    if (els.classQuizMessage) els.classQuizMessage.textContent = `Responde las ${unanswered.length} pregunta${unanswered.length === 1 ? "" : "s"} pendiente${unanswered.length === 1 ? "" : "s"}.`;
    unanswered[0].scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  let score = 0;
  questionElements.forEach((question, questionIndex) => {
    const selected = Number(question.querySelector("input:checked").value);
    const correct = Number(question.dataset.answer);
    const isCorrect = selected === correct;
    const explanation = question.querySelector(".class-quiz-explanation");
    const attemptQuestion = currentClassQuizAttempt[questionIndex];
    if (isCorrect) score += 1;
    question.classList.toggle("correct", isCorrect);
    question.classList.toggle("wrong", !isCorrect);
    question.querySelectorAll("label").forEach((label, optionIndex) => {
      label.classList.toggle("correct-option", optionIndex === correct);
      label.classList.toggle("wrong-option", optionIndex === selected && !isCorrect);
    });
    question.querySelectorAll("input").forEach((input) => { input.disabled = true; });
    if (explanation) {
      explanation.textContent = isCorrect
        ? `Correcto. ${attemptQuestion.explanation}`
        : `La respuesta correcta es “${attemptQuestion.options[correct]}”. ${attemptQuestion.explanation}`;
      explanation.hidden = false;
    }
  });

  const total = questionElements.length;
  const passingScore = Math.ceil(total * 0.8);
  classLessonState.score = score;
  classLessonState.completed = score >= passingScore;
  saveClassLessonProgress();
  updateClassStatusText();
  if (els.classQuizMessage) els.classQuizMessage.textContent = "";
  if (els.classQuizScore) els.classQuizScore.textContent = `${score}/${total}`;
  if (els.classQuizResultTitle) {
    els.classQuizResultTitle.textContent = score >= passingScore ? "Clase completada" : "Conviene repasar";
  }
  if (els.classQuizResultCopy) {
    els.classQuizResultCopy.textContent = score >= passingScore
      ? "Ya diferencias la estructura, las competencias y los requisitos principales del manual."
      : "Lee las explicaciones, repasa los modulos necesarios y vuelve a intentarlo.";
  }
  if (els.classQuizResult) {
    els.classQuizResult.hidden = false;
    els.classQuizResult.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  els.classQuiz.querySelector("button[type='submit']")?.setAttribute("hidden", "");
});

els.classQuizRetry?.addEventListener("click", () => {
  resetClassQuiz();
  els.classQuiz?.scrollIntoView({ behavior: "smooth", block: "start" });
});

function classTwoProgressStorageKey() {
  const base = "concursoDocente2026Class02v1";
  return window.AULA_USER_ID ? `${base}:${window.AULA_USER_ID}` : base;
}

function loadClassTwoProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(classTwoProgressStorageKey()));
    classTwoLessonState.current = Math.min(5, Math.max(0, Number(saved?.current) || 0));
    classTwoLessonState.visited = new Set(
      Array.isArray(saved?.visited)
        ? saved.visited.filter((index) => Number.isInteger(index) && index >= 0 && index <= 5)
        : [0]
    );
    classTwoLessonState.visited.add(classTwoLessonState.current);
    classTwoLessonState.completed = Boolean(saved?.completed);
    classTwoLessonState.score = Number.isInteger(saved?.score) ? saved.score : null;
  } catch {
    classTwoLessonState.current = 0;
    classTwoLessonState.visited = new Set([0]);
    classTwoLessonState.completed = false;
    classTwoLessonState.score = null;
  }
}

function saveClassTwoProgress() {
  localStorage.setItem(classTwoProgressStorageKey(), JSON.stringify({
    current: classTwoLessonState.current,
    visited: [...classTwoLessonState.visited],
    completed: classTwoLessonState.completed,
    score: classTwoLessonState.score
  }));
}

function renderClassTwoModule(index, shouldScroll = true) {
  const nextIndex = Math.min(5, Math.max(0, index));
  classTwoLessonState.current = nextIndex;
  classTwoLessonState.visited.add(nextIndex);

  els.classTwoModuleButtons.forEach((button) => {
    const moduleIndex = Number(button.dataset.classTwoModule);
    const active = moduleIndex === nextIndex;
    button.classList.toggle("active", active);
    button.classList.toggle("visited", classTwoLessonState.visited.has(moduleIndex));
    if (active) button.setAttribute("aria-current", "step");
    else button.removeAttribute("aria-current");
  });
  els.classTwoModulePanels.forEach((panel) => {
    const active = Number(panel.dataset.classTwoPanel) === nextIndex;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });

  const progress = Math.round((classTwoLessonState.visited.size / 6) * 100);
  if (els.classTwoProgressText) els.classTwoProgressText.textContent = `Modulo ${nextIndex + 1} de 6`;
  if (els.classTwoProgressPercent) els.classTwoProgressPercent.textContent = `${progress}%`;
  if (els.classTwoProgressBar) {
    els.classTwoProgressBar.style.width = `${progress}%`;
    els.classTwoProgressBar.parentElement?.setAttribute("aria-valuenow", String(progress));
  }
  if (els.classTwoPrevModule) els.classTwoPrevModule.disabled = nextIndex === 0;
  if (els.classTwoNextModule) els.classTwoNextModule.hidden = nextIndex === 5;
  if (els.classTwoNextModuleLabel) {
    els.classTwoNextModuleLabel.textContent = nextIndex === 4 ? "Ir a la evaluacion" : "Siguiente modulo";
  }
  saveClassTwoProgress();
  updateClassStatusText();

  if (shouldScroll) {
    els.classTwoLesson?.querySelector(".class-learning-progress")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function setClassTwoLessonOpen(open) {
  if (!els.classCatalog || !els.classTwoLesson || !els.classTwoOpenBtn) return;
  if (open) {
    loadClassLessonProgress();
    loadClassTwoProgress();
    loadClassThreeProgress();
  }
  els.classCatalog.hidden = open;
  if (els.classLesson) els.classLesson.hidden = true;
  els.classTwoLesson.hidden = !open;
  if (els.classThreeLesson) els.classThreeLesson.hidden = true;
  els.classTwoOpenBtn.setAttribute("aria-expanded", String(open));
  if (open) renderClassTwoModule(classTwoLessonState.current, false);
  const target = open ? els.classTwoLesson : document.querySelector(".class-heading");
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => (open ? els.classTwoBackBtn : els.classTwoOpenBtn)?.focus(), 350);
}

function classTwoQuizSignatureStorageKey() {
  const base = "concursoDocente2026Class02QuizSignature";
  return window.AULA_USER_ID ? `${base}:${window.AULA_USER_ID}` : base;
}

function createClassTwoQuizAttempt() {
  const distribution = new Map([[1, 1], [2, 1], [3, 2], [4, 2], [5, 2]]);
  let selected = [...distribution.entries()].flatMap(([module, amount]) => (
    shuffleItems(classTwoQuizBank.filter((question) => question.module === module)).slice(0, amount)
  ));
  selected = shuffleItems(selected).slice(0, classTwoQuizSize);

  const previousSignature = localStorage.getItem(classTwoQuizSignatureStorageKey());
  let signature = selected.map((question) => question.id).join("|");
  if (signature === previousSignature && selected.length > 1) {
    selected = [...selected.slice(1), selected[0]];
    signature = selected.map((question) => question.id).join("|");
  }
  localStorage.setItem(classTwoQuizSignatureStorageKey(), signature);

  return selected.map((question) => {
    const options = shuffleItems(question.options.map((text, index) => ({
      text,
      isCorrect: index === question.correct
    })));
    return {
      ...question,
      options: options.map((option) => option.text),
      correct: options.findIndex((option) => option.isCorrect)
    };
  });
}

function getClassTwoQuizQuestionElements() {
  return [...(els.classTwoQuizQuestions?.querySelectorAll("[data-class-two-quiz-question]") || [])];
}

function renderClassTwoQuizQuestions() {
  if (!els.classTwoQuizQuestions) return;
  currentClassTwoQuizAttempt = createClassTwoQuizAttempt();
  const fragment = document.createDocumentFragment();

  currentClassTwoQuizAttempt.forEach((question, questionIndex) => {
    const fieldset = document.createElement("fieldset");
    fieldset.dataset.classTwoQuizQuestion = "";
    fieldset.dataset.answer = String(question.correct);
    const legend = document.createElement("legend");
    const number = document.createElement("span");
    number.textContent = String(questionIndex + 1);
    legend.append(number, document.createTextNode(question.prompt));
    fieldset.append(legend);

    question.options.forEach((option, optionIndex) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      const copy = document.createElement("span");
      input.type = "radio";
      input.name = `classTwoQuiz${questionIndex + 1}`;
      input.value = String(optionIndex);
      copy.textContent = option;
      label.append(input, copy);
      fieldset.append(label);
    });

    const explanation = document.createElement("p");
    explanation.className = "class-quiz-explanation";
    explanation.hidden = true;
    fieldset.append(explanation);
    fragment.append(fieldset);
  });
  els.classTwoQuizQuestions.replaceChildren(fragment);
}

function resetClassTwoQuiz() {
  renderClassTwoQuizQuestions();
  if (els.classTwoQuizMessage) els.classTwoQuizMessage.textContent = "";
  if (els.classTwoQuizResult) els.classTwoQuizResult.hidden = true;
  els.classTwoQuiz?.querySelector("button[type='submit']")?.removeAttribute("hidden");
}

els.classTwoOpenBtn?.addEventListener("click", () => setClassTwoLessonOpen(true));
els.classTwoBackBtn?.addEventListener("click", () => setClassTwoLessonOpen(false));
els.classTwoModuleButtons.forEach((button) => {
  button.addEventListener("click", () => renderClassTwoModule(Number(button.dataset.classTwoModule)));
});
els.classTwoPrevModule?.addEventListener("click", () => renderClassTwoModule(classTwoLessonState.current - 1));
els.classTwoNextModule?.addEventListener("click", () => renderClassTwoModule(classTwoLessonState.current + 1));

els.classTwoQuiz?.addEventListener("submit", (event) => {
  event.preventDefault();
  const questionElements = getClassTwoQuizQuestionElements();
  const unanswered = questionElements.filter((question) => !question.querySelector("input:checked"));
  if (unanswered.length) {
    if (els.classTwoQuizMessage) {
      els.classTwoQuizMessage.textContent = `Responde las ${unanswered.length} pregunta${unanswered.length === 1 ? "" : "s"} pendiente${unanswered.length === 1 ? "" : "s"}.`;
    }
    unanswered[0].scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  let score = 0;
  questionElements.forEach((question, questionIndex) => {
    const selected = Number(question.querySelector("input:checked").value);
    const correct = Number(question.dataset.answer);
    const isCorrect = selected === correct;
    const explanation = question.querySelector(".class-quiz-explanation");
    const attemptQuestion = currentClassTwoQuizAttempt[questionIndex];
    if (isCorrect) score += 1;
    question.classList.toggle("correct", isCorrect);
    question.classList.toggle("wrong", !isCorrect);
    question.querySelectorAll("label").forEach((label, optionIndex) => {
      label.classList.toggle("correct-option", optionIndex === correct);
      label.classList.toggle("wrong-option", optionIndex === selected && !isCorrect);
    });
    question.querySelectorAll("input").forEach((input) => { input.disabled = true; });
    if (explanation) {
      explanation.textContent = isCorrect
        ? `Correcto. ${attemptQuestion.explanation}`
        : `La respuesta correcta es “${attemptQuestion.options[correct]}”. ${attemptQuestion.explanation}`;
      explanation.hidden = false;
    }
  });

  const total = questionElements.length;
  const passingScore = Math.ceil(total * 0.75);
  classTwoLessonState.score = score;
  classTwoLessonState.completed = score >= passingScore;
  saveClassTwoProgress();
  updateClassStatusText();
  if (els.classTwoQuizMessage) els.classTwoQuizMessage.textContent = "";
  if (els.classTwoQuizScore) els.classTwoQuizScore.textContent = `${score}/${total}`;
  if (els.classTwoQuizResultTitle) {
    els.classTwoQuizResultTitle.textContent = score >= passingScore ? "Clase completada" : "Conviene repasar";
  }
  if (els.classTwoQuizResultCopy) {
    els.classTwoQuizResultCopy.textContent = score >= passingScore
      ? "Ya reconoces la estructura del concurso, las pruebas y los momentos posteriores a la lista de elegibles."
      : "Lee las explicaciones, revisa los módulos necesarios y genera un nuevo intento.";
  }
  if (els.classTwoQuizResult) {
    els.classTwoQuizResult.hidden = false;
    els.classTwoQuizResult.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  els.classTwoQuiz.querySelector("button[type='submit']")?.setAttribute("hidden", "");
});

els.classTwoQuizRetry?.addEventListener("click", () => {
  resetClassTwoQuiz();
  els.classTwoQuiz?.scrollIntoView({ behavior: "smooth", block: "start" });
});

function classThreeProgressStorageKey() {
  const base = "concursoDocente2026Class03v1";
  return window.AULA_USER_ID ? `${base}:${window.AULA_USER_ID}` : base;
}

function loadClassThreeProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(classThreeProgressStorageKey()));
    classThreeLessonState.current = Math.min(6, Math.max(0, Number(saved?.current) || 0));
    classThreeLessonState.visited = new Set(
      Array.isArray(saved?.visited)
        ? saved.visited.filter((index) => Number.isInteger(index) && index >= 0 && index <= 5)
        : [0]
    );
    classThreeLessonState.visited.add(classThreeLessonState.current);
    classThreeLessonState.completed = Boolean(saved?.completed);
    classThreeLessonState.score = Number.isInteger(saved?.score) ? saved.score : null;
  } catch {
    classThreeLessonState.current = 0;
    classThreeLessonState.visited = new Set([0]);
    classThreeLessonState.completed = false;
    classThreeLessonState.score = null;
  }
}

function saveClassThreeProgress() {
  localStorage.setItem(classThreeProgressStorageKey(), JSON.stringify({
    current: classThreeLessonState.current,
    visited: [...classThreeLessonState.visited],
    completed: classThreeLessonState.completed,
    score: classThreeLessonState.score
  }));
}

function renderClassThreeModule(index, shouldScroll = true) {
  const nextIndex = Math.min(5, Math.max(0, index));
  classThreeLessonState.current = nextIndex;
  classThreeLessonState.visited.add(nextIndex);

  els.classThreeModuleButtons.forEach((button) => {
    const moduleIndex = Number(button.dataset.classThreeModule);
    const active = moduleIndex === nextIndex;
    button.classList.toggle("active", active);
    button.classList.toggle("visited", classThreeLessonState.visited.has(moduleIndex));
    if (active) button.setAttribute("aria-current", "step");
    else button.removeAttribute("aria-current");
  });
  els.classThreeModulePanels.forEach((panel) => {
    const active = Number(panel.dataset.classThreePanel) === nextIndex;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });

  const progress = Math.round((classThreeLessonState.visited.size / 7) * 100);
  if (els.classThreeProgressText) els.classThreeProgressText.textContent = `Modulo ${nextIndex + 1} de 7`;
  if (els.classThreeProgressPercent) els.classThreeProgressPercent.textContent = `${progress}%`;
  if (els.classThreeProgressBar) {
    els.classThreeProgressBar.style.width = `${progress}%`;
    els.classThreeProgressBar.parentElement?.setAttribute("aria-valuenow", String(progress));
  }
  if (els.classThreePrevModule) els.classThreePrevModule.disabled = nextIndex === 0;
  if (els.classThreeNextModule) els.classThreeNextModule.hidden = nextIndex === 6;
  if (els.classThreeNextModuleLabel) {
    els.classThreeNextModuleLabel.textContent = nextIndex === 5 ? "Ir a la evaluacion" : "Siguiente modulo";
  }
  saveClassThreeProgress();
  updateClassStatusText();

  if (shouldScroll) {
    els.classThreeLesson?.querySelector(".class-learning-progress")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function setClassThreeLessonOpen(open) {
  if (!els.classCatalog || !els.classThreeLesson || !els.classThreeOpenBtn) return;
  if (open) {
    loadClassLessonProgress();
    loadClassTwoProgress();
    loadClassThreeProgress();
  }
  els.classCatalog.hidden = open;
  if (els.classLesson) els.classLesson.hidden = true;
  if (els.classTwoLesson) els.classTwoLesson.hidden = true;
  els.classThreeLesson.hidden = !open;
  els.classThreeOpenBtn.setAttribute("aria-expanded", String(open));
  if (open) renderClassThreeModule(classThreeLessonState.current, false);
  const target = open ? els.classThreeLesson : document.querySelector(".class-heading");
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => (open ? els.classThreeBackBtn : els.classThreeOpenBtn)?.focus(), 350);
}

function classThreeQuizSignatureStorageKey() {
  const base = "concursoDocente2026Class03QuizSignature";
  return window.AULA_USER_ID ? `${base}:${window.AULA_USER_ID}` : base;
}

function createClassThreeQuizAttempt() {
  const distribution = new Map([[1, 1], [2, 1], [3, 2], [4, 1], [5, 1], [6, 2]]);
  let selected = [...distribution.entries()].flatMap(([module, amount]) => (
    shuffleItems(classThreeQuizBank.filter((question) => question.module === module)).slice(0, amount)
  ));
  selected = shuffleItems(selected).slice(0, classThreeQuizSize);

  const previousSignature = localStorage.getItem(classThreeQuizSignatureStorageKey());
  let signature = selected.map((question) => question.id).join("|");
  if (signature === previousSignature && selected.length > 1) {
    selected = [...selected.slice(1), selected[0]];
    signature = selected.map((question) => question.id).join("|");
  }
  localStorage.setItem(classThreeQuizSignatureStorageKey(), signature);

  return selected.map((question) => {
    const options = shuffleItems(question.options.map((text, index) => ({
      text,
      isCorrect: index === question.correct
    })));
    return {
      ...question,
      options: options.map((option) => option.text),
      correct: options.findIndex((option) => option.isCorrect)
    };
  });
}

function getClassThreeQuizQuestionElements() {
  return [...(els.classThreeQuizQuestions?.querySelectorAll("[data-class-three-quiz-question]") || [])];
}

function renderClassThreeQuizQuestions() {
  if (!els.classThreeQuizQuestions) return;
  currentClassThreeQuizAttempt = createClassThreeQuizAttempt();
  const fragment = document.createDocumentFragment();

  currentClassThreeQuizAttempt.forEach((question, questionIndex) => {
    const fieldset = document.createElement("fieldset");
    fieldset.dataset.classThreeQuizQuestion = "";
    fieldset.dataset.answer = String(question.correct);
    const legend = document.createElement("legend");
    const number = document.createElement("span");
    number.textContent = String(questionIndex + 1);
    legend.append(number, document.createTextNode(question.prompt));
    fieldset.append(legend);

    question.options.forEach((option, optionIndex) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      const copy = document.createElement("span");
      input.type = "radio";
      input.name = `classThreeQuiz${questionIndex + 1}`;
      input.value = String(optionIndex);
      copy.textContent = option;
      label.append(input, copy);
      fieldset.append(label);
    });

    const explanation = document.createElement("p");
    explanation.className = "class-quiz-explanation";
    explanation.hidden = true;
    fieldset.append(explanation);
    fragment.append(fieldset);
  });
  els.classThreeQuizQuestions.replaceChildren(fragment);
}

function resetClassThreeQuiz() {
  renderClassThreeQuizQuestions();
  if (els.classThreeQuizMessage) els.classThreeQuizMessage.textContent = "";
  if (els.classThreeQuizResult) els.classThreeQuizResult.hidden = true;
  els.classThreeQuiz?.querySelector("button[type='submit']")?.removeAttribute("hidden");
}

function setClassFourLessonOpen(open) {
  if (!els.classCatalog || !els.classFourLesson || !els.classFourOpenBtn) return;
  els.classCatalog.hidden = open;
  if (els.classLesson) els.classLesson.hidden = true;
  if (els.classTwoLesson) els.classTwoLesson.hidden = true;
  if (els.classThreeLesson) els.classThreeLesson.hidden = true;
  els.classFourLesson.hidden = !open;
  els.classFourOpenBtn.setAttribute("aria-expanded", String(open));
  const target = open ? els.classFourLesson : document.querySelector(".class-heading");
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => (open ? els.classFourBackBtn : els.classFourOpenBtn)?.focus(), 350);
}

els.classFourOpenBtn?.addEventListener("click", () => setClassFourLessonOpen(true));
els.classFourBackBtn?.addEventListener("click", () => setClassFourLessonOpen(false));
els.classThreeOpenBtn?.addEventListener("click", () => setClassThreeLessonOpen(true));
els.classThreeBackBtn?.addEventListener("click", () => setClassThreeLessonOpen(false));
els.classThreeModuleButtons.forEach((button) => {
  button.addEventListener("click", () => renderClassThreeModule(Number(button.dataset.classThreeModule)));
});
els.classThreePrevModule?.addEventListener("click", () => renderClassThreeModule(classThreeLessonState.current - 1));
els.classThreeNextModule?.addEventListener("click", () => renderClassThreeModule(classThreeLessonState.current + 1));

els.classThreeQuiz?.addEventListener("submit", (event) => {
  event.preventDefault();
  const questionElements = getClassThreeQuizQuestionElements();
  const unanswered = questionElements.filter((question) => !question.querySelector("input:checked"));
  if (unanswered.length) {
    if (els.classThreeQuizMessage) {
      els.classThreeQuizMessage.textContent = `Responde las ${unanswered.length} pregunta${unanswered.length === 1 ? "" : "s"} pendiente${unanswered.length === 1 ? "" : "s"}.`;
    }
    unanswered[0].scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  let score = 0;
  questionElements.forEach((question, questionIndex) => {
    const selected = Number(question.querySelector("input:checked").value);
    const correct = Number(question.dataset.answer);
    const isCorrect = selected === correct;
    const explanation = question.querySelector(".class-quiz-explanation");
    const attemptQuestion = currentClassThreeQuizAttempt[questionIndex];
    if (isCorrect) score += 1;
    question.classList.toggle("correct", isCorrect);
    question.classList.toggle("wrong", !isCorrect);
    question.querySelectorAll("label").forEach((label, optionIndex) => {
      label.classList.toggle("correct-option", optionIndex === correct);
      label.classList.toggle("wrong-option", optionIndex === selected && !isCorrect);
    });
    question.querySelectorAll("input").forEach((input) => { input.disabled = true; });
    if (explanation) {
      explanation.textContent = isCorrect
        ? `Correcto. ${attemptQuestion.explanation}`
        : `La respuesta correcta es “${attemptQuestion.options[correct]}”. ${attemptQuestion.explanation}`;
      explanation.hidden = false;
    }
  });

  const total = questionElements.length;
  const passingScore = Math.ceil(total * 0.75);
  classThreeLessonState.score = score;
  classThreeLessonState.completed = score >= passingScore;
  saveClassThreeProgress();
  updateClassStatusText();
  if (els.classThreeQuizMessage) els.classThreeQuizMessage.textContent = "";
  if (els.classThreeQuizScore) els.classThreeQuizScore.textContent = `${score}/${total}`;
  if (els.classThreeQuizResultTitle) {
    els.classThreeQuizResultTitle.textContent = score >= passingScore ? "Clase completada" : "Conviene repasar";
  }
  if (els.classThreeQuizResultCopy) {
    els.classThreeQuizResultCopy.textContent = score >= passingScore
      ? "Ya diferencias el ingreso, el escalafón, los derechos, el marco ético y la regulación vigente de la evaluación."
      : "Lee las explicaciones, revisa los módulos necesarios y genera un nuevo intento.";
  }
  if (els.classThreeQuizResult) {
    els.classThreeQuizResult.hidden = false;
    els.classThreeQuizResult.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  els.classThreeQuiz.querySelector("button[type='submit']")?.setAttribute("hidden", "");
});

els.classThreeQuizRetry?.addEventListener("click", () => {
  resetClassThreeQuiz();
  els.classThreeQuiz?.scrollIntoView({ behavior: "smooth", block: "start" });
});

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
      await startSimulacro(button.dataset.startSimulacro, button.dataset.simulacroTest || null);
    } catch (error) {
      window.alert(error.message || "No fue posible cargar el simulacro.");
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
});
els.studyTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => setStudyView(tab.dataset.studyView));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + els.studyTabs.length) % els.studyTabs.length;
    els.studyTabs[nextIndex].focus();
    setStudyView(els.studyTabs[nextIndex].dataset.studyView);
  });
});
els.studyContinueBtn?.addEventListener("click", () => {
  const progress = loadProgress();
  const nextIndex = studyItems.findIndex((_, index) => !progress.completedItems.includes(index));
  if (nextIndex === -1) {
    setStudyView("cards");
    document.getElementById("studyCardsPanel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  setStudyView("route");
  const target = els.studyPlan.querySelector(`[data-study="${nextIndex}"]`);
  target?.closest(".study-route-item")?.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => target?.focus(), 350);
});
els.studyRevealCard?.addEventListener("click", () => {
  studyCardRevealed = true;
  markStudyActivity();
  renderStudyFlashcard();
});
els.studyReviewCard?.addEventListener("click", () => rateStudyFlashcard("review"));
els.studyKnowCard?.addEventListener("click", () => rateStudyFlashcard("known"));
els.studyAttemptSelect?.addEventListener("change", () => void loadStudyMistakes());
els.aspirantProfileForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const goal = Number(els.aspirantGoal.value);
  const progress = loadProgress();
  progress.aspirantProfile = {
    area: els.aspirantArea.value,
    territory: els.aspirantTerritory.value.trim(),
    goal: Number.isFinite(goal) && goal >= 50 && goal <= 100 ? goal : null
  };
  saveProgress(progress);
  renderAspirantProfile(progress);
  renderStudyOverview(progress);
  renderProgress();
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
  secureHistoryUserId = null;
  loadClassLessonProgress();
  loadClassTwoProgress();
  loadClassThreeProgress();
  updateClassStatusText();
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
renderClassRoadmap();
renderClassQuizQuestions();
renderClassTwoQuizQuestions();
renderClassThreeQuizQuestions();
renderNews();
renderStudy();
renderProgress();
