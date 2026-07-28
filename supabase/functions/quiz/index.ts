import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
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
  const category = url.searchParams.get("category");
  if (!["pedagogica", "especificos", "razonamiento"].includes(category || "")) {
    return json({ error: "Categoria no valida." }, 400);
  }

  const { data: questions, error: questionsError } = await admin
    .from("quiz_questions")
    .select("*")
    .eq("category", category)
    .eq("active", true)
    .order("sequence");

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

  const { error: attemptError } = await admin.from("quiz_attempts").insert({
    user_id: userData.user.id,
    category,
    score,
    correct_count: correctCount,
    total_count: questions.length,
    answers: Object.fromEntries(submitted)
  });
  if (attemptError) return json({ error: "No fue posible guardar el resultado." }, 500);

  return json({
    score,
    correct: correctCount,
    total: questions.length,
    review
  });
});
