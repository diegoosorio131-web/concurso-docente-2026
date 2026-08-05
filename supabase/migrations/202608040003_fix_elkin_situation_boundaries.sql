update public.quiz_questions
set situation = substring(situation from position('Situación 2.' in situation))
where test_id = 'elkin-simulacro-100'
  and block_id = 'elkin-situacion-2'
  and position('Situación 2.' in situation) > 1;

update public.quiz_questions
set situation = substring(situation from position('Situación 3.' in situation))
where test_id = 'elkin-simulacro-100'
  and block_id = 'elkin-situacion-3'
  and position('Situación 3.' in situation) > 1;

update public.quiz_questions
set situation = substring(situation from position('Situación 4.' in situation))
where test_id = 'elkin-simulacro-100'
  and block_id = 'elkin-situacion-4'
  and position('Situación 4.' in situation) > 1;

do $$
begin
  if exists (
    select 1
    from public.quiz_questions
    where test_id = 'elkin-simulacro-100'
      and block_id in ('elkin-situacion-2', 'elkin-situacion-3', 'elkin-situacion-4')
      and situation not like 'Situación %'
  ) then
    raise exception 'No fue posible corregir todos los limites de las situaciones';
  end if;
end
$$;
