import fs from "node:fs";
import vm from "node:vm";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Define SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY solo en la terminal local.");
}

const source = fs.readFileSync(new URL("../data/simulacros.js", import.meta.url), "utf8");
const context = { window: {} };
vm.runInNewContext(source, context, { filename: "data/simulacros.js" });

const rows = [];
let sequence = 0;
for (const test of context.window.AULA_SIMULACROS?.tests || []) {
  for (const block of test.blocks || []) {
    for (const question of block.questions || []) {
      sequence += 1;
      rows.push({
        external_id: `${test.id}:${question.id}`,
        test_id: test.id,
        test_title: test.title,
        category: block.category,
        block_id: block.id,
        block_range: block.range,
        topic: block.topic,
        situation: block.situation,
        question_number: question.number,
        prompt: question.prompt,
        options: question.options,
        correct_answer: question.answer,
        explanation: question.explanation,
        option_feedback: question.optionFeedback,
        sequence,
        active: true
      });
    }
  }
}

if (!rows.length) throw new Error("No se encontraron preguntas para migrar.");

const response = await fetch(`${supabaseUrl}/rest/v1/quiz_questions?on_conflict=external_id`, {
  method: "POST",
  headers: {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates,return=minimal"
  },
  body: JSON.stringify(rows)
});

if (!response.ok) {
  throw new Error(`Supabase respondio ${response.status}: ${await response.text()}`);
}

console.log(`${rows.length} preguntas migradas correctamente.`);
