update public.quiz_questions
set test_title = case test_id
  when 'generado-quimica-01' then 'Simulacro #13 · Química'
  when 'generado-naturales-01' then 'Simulacro #9 · Ciencias Naturales'
  else test_title
end
where test_id in ('generado-quimica-01', 'generado-naturales-01');
