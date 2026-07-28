create or replace function public.auto_approve_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.approved_users(user_id, active)
  values (new.id, true)
  on conflict (user_id) do update set active = true;

  return new;
end;
$$;

revoke all on function public.auto_approve_new_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_auto_approve on auth.users;

create trigger on_auth_user_auto_approve
  after insert on auth.users
  for each row execute function public.auto_approve_new_user();

insert into public.approved_users(user_id, active)
select id, true
from auth.users
on conflict (user_id) do update set active = true;
