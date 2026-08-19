update public.quiz_questions
set test_title = case test_id
  when 'tuiran-quimica-08' then 'Simulacro #1 · Química'
  when 'tuiran-quimica-12' then 'Simulacro #2 · Química'
  when 'generado-quimica-01' then 'Simulacro #3 · Química'
  when 'tuiran-naturales-08' then 'Simulacro #1 · Ciencias Naturales'
  when 'generado-naturales-01' then 'Simulacro #2 · Ciencias Naturales'
  else test_title
end
where test_id in (
  'tuiran-quimica-08',
  'tuiran-quimica-12',
  'generado-quimica-01',
  'tuiran-naturales-08',
  'generado-naturales-01'
);
