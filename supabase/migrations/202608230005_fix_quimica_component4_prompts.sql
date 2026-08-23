with q as (
  select
    id,
    question_number,
    ((question_number - 151) / 5)::int + 1 as scenario_no,
    ((question_number - 151) % 5) + 1 as qtype
  from public.quiz_questions
  where test_id = 'banco-quimica-200'
    and question_number between 151 and 200
),
themes as (
  select array[
    'materia y mezclas',
    'estructura atómica y tabla periódica',
    'enlaces y polaridad',
    'reacciones y balanceo',
    'soluciones y solubilidad',
    'ácidos, bases y pH',
    'energía y velocidad de reacción',
    'oxidación, reducción y corrosión',
    'química orgánica',
    'evaluación y didáctica'
  ]::text[] as items
)
update public.quiz_questions qq
set prompt = format(
  case q.qtype
    when 1 then '¿Qué concepto químico explica mejor %s?'
    when 2 then '¿Qué error conceptual debe corregirse en %s?'
    when 3 then '¿Qué relación entre variables es más adecuada en %s?'
    when 4 then '¿Qué decisión didáctica es más pertinente para enseñar %s?'
    else '¿Qué evidencia de aprendizaje es más útil para valorar %s?'
  end,
  t.items[q.scenario_no]
)
from q
cross join themes t
where qq.id = q.id;
