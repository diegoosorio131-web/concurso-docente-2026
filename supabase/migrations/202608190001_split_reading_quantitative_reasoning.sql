update public.quiz_questions
set topic = case
  when question_number in (76, 77, 78, 80, 81, 82, 83, 84, 85, 90, 91, 92, 93, 96, 97, 98, 100)
    then 'Razonamiento cuantitativo'
  when question_number in (79, 86, 87, 88, 89, 94, 95, 99)
    then 'Lectura critica'
  else topic
end
where category = 'razonamiento'
  and test_id = 'elkin-simulacro-100'
  and question_number between 76 and 100;
