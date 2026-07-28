create extension if not exists pgcrypto;

create table public.approved_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  external_id text not null unique,
  test_id text not null,
  test_title text not null,
  category text not null check (category in ('pedagogica', 'especificos', 'razonamiento')),
  block_id text not null,
  block_range text not null,
  topic text not null,
  situation text not null,
  question_number integer not null,
  prompt text not null,
  options jsonb not null check (jsonb_typeof(options) = 'array'),
  correct_answer smallint not null check (correct_answer between 0 and 2),
  explanation text not null,
  option_feedback jsonb not null check (jsonb_typeof(option_feedback) = 'array'),
  sequence integer not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index quiz_questions_category_sequence_idx
  on public.quiz_questions(category, sequence)
  where active = true;

create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  score integer not null check (score between 0 and 100),
  correct_count integer not null,
  total_count integer not null,
  answers jsonb not null,
  created_at timestamptz not null default now()
);

create index quiz_attempts_user_created_idx
  on public.quiz_attempts(user_id, created_at desc);

alter table public.approved_users enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.quiz_attempts enable row level security;

create policy "Users can read their approval"
  on public.approved_users
  for select
  to authenticated
  using (user_id = auth.uid());

create policy "Users can read their attempts"
  on public.quiz_attempts
  for select
  to authenticated
  using (user_id = auth.uid());

revoke all on public.quiz_questions from anon, authenticated;
revoke insert, update, delete on public.approved_users from anon, authenticated;
revoke insert, update, delete on public.quiz_attempts from anon, authenticated;

create or replace function public.approve_user_by_email(account_email text)
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  account_id uuid;
begin
  select id into account_id
  from auth.users
  where lower(email) = lower(account_email)
  limit 1;

  if account_id is null then
    raise exception 'No existe una cuenta con ese correo';
  end if;

  insert into public.approved_users(user_id, active)
  values (account_id, true)
  on conflict (user_id) do update set active = true;
end;
$$;

revoke all on function public.approve_user_by_email(text) from public, anon, authenticated;

