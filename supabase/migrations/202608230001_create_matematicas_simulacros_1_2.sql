with source_questions as (
  select
    *,
    row_number() over (order by question_number asc) as rn_asc,
    row_number() over (order by question_number desc) as rn_desc
  from public.quiz_questions
  where test_id = 'tuiran-matematicas-08'
    and active = true
),
base_1 as (
  select coalesce(max(sequence), 0) + 1000 as value
  from public.quiz_questions
),
base_2 as (
  select coalesce(max(sequence), 0) + 2000 as value
  from public.quiz_questions
)
insert into public.quiz_questions (
  external_id, category, topic, test_id, test_title, block_id, block_range,
  situation, question_number, prompt, options, correct_answer, explanation,
  option_feedback, active, sequence
)
select
  regexp_replace(s.external_id, '^tuiran-matematicas-08', 'generado-matematicas-01') as external_id,
  s.category,
  s.topic,
  'generado-matematicas-01' as test_id,
  'Simulacro #1 - Matematicas' as test_title,
  replace(s.block_id, 'tuiran-matematicas-08', 'generado-matematicas-01') as block_id,
  s.block_range,
  s.situation,
  s.question_number,
  s.prompt,
  s.options,
  s.correct_answer,
  s.explanation,
  s.option_feedback,
  true as active,
  b.value + s.rn_asc as sequence
from source_questions s
cross join base_1 b
on conflict (external_id) do update set
  category = excluded.category,
  topic = excluded.topic,
  test_id = excluded.test_id,
  test_title = excluded.test_title,
  block_id = excluded.block_id,
  block_range = excluded.block_range,
  situation = excluded.situation,
  question_number = excluded.question_number,
  prompt = excluded.prompt,
  options = excluded.options,
  correct_answer = excluded.correct_answer,
  explanation = excluded.explanation,
  option_feedback = excluded.option_feedback,
  active = true,
  sequence = excluded.sequence;

with source_questions as (
  select
    *,
    row_number() over (order by question_number asc) as rn_asc,
    row_number() over (order by question_number desc) as rn_desc
  from public.quiz_questions
  where test_id = 'tuiran-matematicas-08'
    and active = true
),
base_2 as (
  select coalesce(max(sequence), 0) + 2000 as value
  from public.quiz_questions
)
insert into public.quiz_questions (
  external_id, category, topic, test_id, test_title, block_id, block_range,
  situation, question_number, prompt, options, correct_answer, explanation,
  option_feedback, active, sequence
)
select
  regexp_replace(s.external_id, '^tuiran-matematicas-08', 'generado-matematicas-02') as external_id,
  s.category,
  s.topic,
  'generado-matematicas-02' as test_id,
  'Simulacro #2 - Matematicas' as test_title,
  replace(s.block_id, 'tuiran-matematicas-08', 'generado-matematicas-02') as block_id,
  s.block_range,
  s.situation,
  s.question_number,
  s.prompt,
  s.options,
  s.correct_answer,
  s.explanation,
  s.option_feedback,
  true as active,
  b.value + s.rn_desc as sequence
from source_questions s
cross join base_2 b
on conflict (external_id) do update set
  category = excluded.category,
  topic = excluded.topic,
  test_id = excluded.test_id,
  test_title = excluded.test_title,
  block_id = excluded.block_id,
  block_range = excluded.block_range,
  situation = excluded.situation,
  question_number = excluded.question_number,
  prompt = excluded.prompt,
  options = excluded.options,
  correct_answer = excluded.correct_answer,
  explanation = excluded.explanation,
  option_feedback = excluded.option_feedback,
  active = true,
  sequence = excluded.sequence;
