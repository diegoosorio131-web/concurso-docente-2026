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
    prompt: "Según el texto del Decreto 915, ¿cuáles son los mínimos aprobatorios de la prueba eliminatoria?",
    options: ["50 para docentes y 60 para directivos", "70 para docentes y 80 para directivos", "80 para docentes y 70 para directivos"],
    correct: 1,
    explanation: "El decreto fija 70/100 para docentes y 80/100 para directivos docentes."
  },
  {
    id: "written-weight", module: 4,
    prompt: "Para docentes, la ponderación de aptitudes y competencias básicas no puede ser menor a:",
    options: ["45%", "55%", "70%"],
    correct: 1,
    explanation: "El 55% es un límite mínimo de ponderación, distinto del mínimo aprobatorio de 70/100."
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

function updateClassStatusText() {
  if (!els.classStatusText) return;
  const completed = Number(classLessonState.completed) + Number(classTwoLessonState.completed);
  if (completed === 2) els.classStatusText.textContent = "2 clases completadas · 56 bloqueadas";
  else if (completed === 1) els.classStatusText.textContent = "1 completada · 1 disponible · 56 bloqueadas";
  else els.classStatusText.textContent = "2 disponibles · 56 bloqueadas";
}

function renderClassRoadmap() {
  if (!els.classRoadmapGrid) return;
  els.classRoadmapGrid.innerHTML = Array.from({ length: 56 }, (_, index) => {
    const classNumber = String(index + 3).padStart(2, "0");
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
  }
  els.classCatalog.hidden = open;
  els.classLesson.hidden = !open;
  if (els.classTwoLesson) els.classTwoLesson.hidden = true;
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
  }
  els.classCatalog.hidden = open;
  if (els.classLesson) els.classLesson.hidden = true;
  els.classTwoLesson.hidden = !open;
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
renderClassRoadmap();
renderClassQuizQuestions();
renderClassTwoQuizQuestions();
renderNews();
renderStudy();
renderProgress();
