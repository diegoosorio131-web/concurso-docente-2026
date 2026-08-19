import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS"
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" }
  });
}

function publicQuestion(question: Record<string, unknown>) {
  return {
    id: question.id,
    testId: question.test_id,
    testTitle: question.test_title,
    category: question.category,
    blockId: question.block_id,
    range: question.block_range,
    topic: question.topic,
    situation: question.situation,
    number: question.question_number,
    prompt: question.prompt,
    options: question.options
  };
}

function displayTestTitle(testId: string | null, fallback = "Simulacro") {
  const titles: Record<string, string> = {
    "pedagogicas-general": "Simulacro de competencias pedagógicas",
    "tuiran-pedagogicas-01": "Simulacro #1 · Competencias pedagógicas",
    "tuiran-pedagogicas-02": "Simulacro #2 · Competencias pedagógicas",
    "tuiran-quimica-08": "Simulacro #1 · Química",
    "tuiran-quimica-12": "Simulacro #2 · Química",
    "tuiran-naturales-08": "Simulacro #1 · Ciencias Naturales",
    "generado-quimica-01": "Simulacro #3 · Química",
    "generado-naturales-01": "Simulacro #2 · Ciencias Naturales",
    "ofimatica-01": "Simulacro #1 · Ofimática"
  };
  return titles[testId || ""] || fallback;
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const authorization = request.headers.get("Authorization");

  if (!supabaseUrl || !anonKey || !serviceKey || !authorization) {
    return json({ error: "Acceso no autorizado." }, 401);
  }

  const authClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false }
  });
  const { data: userData, error: userError } = await authClient.auth.getUser();
  if (userError || !userData.user) return json({ error: "Sesion no valida." }, 401);

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false }
  });
  const { data: approval } = await admin
    .from("approved_users")
    .select("active")
    .eq("user_id", userData.user.id)
    .maybeSingle();

  if (!approval?.active) return json({ error: "Esta cuenta no tiene acceso." }, 403);

  const url = new URL(request.url);
  const historyRequested = url.searchParams.get("history") === "1";
  const attemptId = url.searchParams.get("attempt");

  if (historyRequested) {
    if (request.method === "DELETE") {
      const { error: deleteError } = await admin
        .from("quiz_attempts")
        .delete()
        .eq("user_id", userData.user.id);
      if (deleteError) return json({ error: "No fue posible eliminar tu historial." }, 500);
      return json({ deleted: true });
    }

    if (request.method !== "GET") return json({ error: "Metodo no permitido." }, 405);
    const { data: attempts, error: attemptsError } = await admin
      .from("quiz_attempts")
      .select("id, category, score, correct_count, total_count, answers, created_at")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false })
      .limit(8);
    if (attemptsError) return json({ error: "No fue posible consultar tu historial." }, 500);

    const firstQuestionIds = (attempts || [])
      .map((attempt) => Object.keys(attempt.answers || {})[0])
      .filter(Boolean);
    const { data: titleQuestions, error: titleError } = firstQuestionIds.length
      ? await admin.from("quiz_questions").select("id, test_id, test_title").in("id", firstQuestionIds)
      : { data: [], error: null };
    if (titleError) return json({ error: "No fue posible identificar los simulacros." }, 500);
    const titleByQuestion = new Map((titleQuestions || []).map((question) => [question.id, question]));

    return json({
      attempts: (attempts || []).map((attempt) => {
        const firstQuestion = titleByQuestion.get(Object.keys(attempt.answers || {})[0]);
        const testId = firstQuestion?.test_id || null;
        return {
          id: attempt.id,
          category: attempt.category,
          score: attempt.score,
          correct: attempt.correct_count,
          total: attempt.total_count,
          createdAt: attempt.created_at,
          testId,
          title: displayTestTitle(testId, firstQuestion?.test_title || "Simulacro")
        };
      })
    });
  }

  if (attemptId) {
    const { data: attempt, error: attemptError } = await admin
      .from("quiz_attempts")
      .select("id, category, score, correct_count, total_count, answers, created_at")
      .eq("id", attemptId)
      .eq("user_id", userData.user.id)
      .maybeSingle();
    if (attemptError || !attempt) return json({ error: "No se encontró este intento." }, 404);

    const submitted = attempt.answers || {};
    const questionIds = Object.keys(submitted);
    const { data: attemptQuestions, error: questionsError } = await admin
      .from("quiz_questions")
      .select("*")
      .in("id", questionIds)
      .order("sequence");
    if (questionsError) return json({ error: "No fue posible cargar las respuestas." }, 500);

    const firstQuestion = attemptQuestions?.[0];
    const testId = firstQuestion?.test_id || null;
    return json({
      attempt: {
        id: attempt.id,
        category: attempt.category,
        title: displayTestTitle(testId, firstQuestion?.test_title || "Simulacro"),
        testId
      },
      questions: (attemptQuestions || []).map((question) => ({
        ...publicQuestion(question),
        selected: submitted[question.id],
        answer: question.correct_answer,
        explanation: question.explanation,
        optionFeedback: question.option_feedback
      }))
    });
  }

  const category = url.searchParams.get("category");
  const test = url.searchParams.get("test");
  const categoryFilters: Record<string, { source: string; topic?: string; excludeTopic?: string }> = {
    lectura_critica: { source: "razonamiento" },
    razonamiento_cuantitativo: { source: "razonamiento" },
    competencias_blandas: { source: "pedagogica", topic: "Competencias comportamentales docentes" },
    competencias_pedagogicas: { source: "pedagogica", excludeTopic: "Competencias comportamentales docentes" },
    ofimatica: { source: "ofimatica" },
    conocimientos_especificos: { source: "especificos" }
  };
  const categoryFilter = category ? categoryFilters[category] : null;
  if (!categoryFilter) {
    return json({ error: "Categoria no valida." }, 400);
  }
  const allowedTests = new Set([
    "pedagogicas-general",
    "tuiran-pedagogicas-01",
    "tuiran-pedagogicas-02",
    "tuiran-quimica-08",
    "tuiran-quimica-12",
    "tuiran-naturales-08",
    "generado-quimica-01",
    "generado-naturales-01",
    "ofimatica-01"
  ]);
  if (test && !allowedTests.has(test)) {
    return json({ error: "Simulacro no valido." }, 400);
  }

  let questionsQuery = admin
    .from("quiz_questions")
    .select("*")
    .eq("category", categoryFilter.source)
    .eq("active", true)
    .order("sequence");
  if (categoryFilter.topic) questionsQuery = questionsQuery.eq("topic", categoryFilter.topic);
  if (categoryFilter.excludeTopic) questionsQuery = questionsQuery.neq("topic", categoryFilter.excludeTopic);
  if (test === "pedagogicas-general") {
    questionsQuery = questionsQuery
      .neq("test_id", "tuiran-pedagogicas-01")
      .neq("test_id", "tuiran-pedagogicas-02");
  }
  if (test === "tuiran-pedagogicas-01") questionsQuery = questionsQuery.eq("test_id", test);
  if (test === "tuiran-pedagogicas-02") questionsQuery = questionsQuery.eq("test_id", test);
  if (test === "tuiran-quimica-08") questionsQuery = questionsQuery.eq("test_id", test);
  if (test === "tuiran-quimica-12") questionsQuery = questionsQuery.eq("test_id", test);
  if (test === "tuiran-naturales-08") questionsQuery = questionsQuery.eq("test_id", test);
  if (test === "generado-quimica-01") questionsQuery = questionsQuery.eq("test_id", test);
  if (test === "generado-naturales-01") questionsQuery = questionsQuery.eq("test_id", test);
  if (test === "ofimatica-01") questionsQuery = questionsQuery.eq("test_id", test);

  const { data: questions, error: questionsError } = await questionsQuery;

  if (questionsError) return json({ error: "No fue posible cargar el simulacro." }, 500);

  if (request.method === "GET") {
    return json({ questions: (questions || []).map(publicQuestion) });
  }

  if (request.method !== "POST") return json({ error: "Metodo no permitido." }, 405);

  let payload: { answers?: Array<{ id?: string; answer?: number }> };
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Solicitud no valida." }, 400);
  }

  const submitted = new Map(
    (Array.isArray(payload.answers) ? payload.answers : [])
      .filter((answer) => (
        typeof answer.id === "string"
        && Number.isInteger(answer.answer)
        && Number(answer.answer) >= 0
        && Number(answer.answer) <= 2
      ))
      .map((answer) => [answer.id, answer.answer])
  );

  const hasEveryQuestion = questions?.every((question) => submitted.has(question.id));
  if (!questions?.length || submitted.size !== questions.length || !hasEveryQuestion) {
    return json({ error: "Debes responder todas las preguntas." }, 400);
  }

  let correctCount = 0;
  const review = questions.map((question) => {
    const selected = submitted.get(question.id);
    const correct = selected === question.correct_answer;
    if (correct) correctCount += 1;
    return {
      id: question.id,
      selected,
      correct,
      correctAnswer: question.correct_answer,
      explanation: question.explanation,
      optionFeedback: question.option_feedback
    };
  });
  const score = Math.round((correctCount / questions.length) * 100);

  const { data: savedAttempt, error: attemptError } = await admin
    .from("quiz_attempts")
    .insert({
      user_id: userData.user.id,
      category,
      score,
      correct_count: correctCount,
      total_count: questions.length,
      answers: Object.fromEntries(submitted)
    })
    .select("id, created_at")
    .single();
  if (attemptError || !savedAttempt) return json({ error: "No fue posible guardar el resultado." }, 500);

  return json({
    score,
    correct: correctCount,
    total: questions.length,
    attemptId: savedAttempt.id,
    createdAt: savedAttempt.created_at,
    review
  });
});
