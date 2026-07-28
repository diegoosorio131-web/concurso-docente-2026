# Acceso privado de Aula 2026

La pagina usa cuentas creadas por el administrador. El registro publico debe
permanecer desactivado.

## Activacion

1. Crear un proyecto en Supabase.
2. En Authentication > Providers > Email, desactivar `Allow new users to sign up`.
3. Ejecutar la migracion de `supabase/migrations` con Supabase CLI.
4. Desplegar la funcion `quiz`.
5. Crear cada usuario desde Authentication > Users.
6. Aprobarlo desde SQL Editor:

```sql
select public.approve_user_by_email('persona@correo.com');
```

7. Completar `config.js` con la URL y la clave publicable del proyecto.
8. Migrar el banco desde una terminal local:

```powershell
$env:SUPABASE_URL="https://TU-PROYECTO.supabase.co"
$env:SUPABASE_SERVICE_ROLE_KEY="TU_CLAVE_PRIVADA"
node scripts/migrate-question-bank.mjs
Remove-Item Env:SUPABASE_SERVICE_ROLE_KEY
```

9. Eliminar la carga de `data/simulacros.js` y activar `authEnabled` solamente
   despues de comprobar la migracion.

La clave `service_role` nunca debe guardarse en este repositorio ni en
`config.js`. Supabase la proporciona automaticamente a la funcion desplegada.

## Limite de proteccion

Las preguntas mostradas a un usuario autorizado pueden copiarse. La funcion
evita que la clave de respuestas, las explicaciones y el banco completo se
descarguen junto con la pagina.
