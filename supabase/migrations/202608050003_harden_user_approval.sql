-- Reforzamiento de seguridad para la aprobación de usuarios en Supabase Auth
-- Reemplaza la aprobación automática incondicional por una aprobación explícita del administrador (active = false por defecto)

create or replace function public.auto_approve_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- Por seguridad, las nuevas cuentas quedan inactivas por defecto hasta aprobación del admin
  insert into public.approved_users(user_id, active)
  values (new.id, false)
  on conflict (user_id) do nothing;

  return new;
end;
$$;

revoke all on function public.auto_approve_new_user() from public, anon, authenticated;
