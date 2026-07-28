# Acceso privado de Aula 2026

La pagina usa cuentas creadas por el administrador. El registro publico debe
permanecer desactivado.

## Administrar usuarios

1. Crear cada usuario desde Authentication > Users.
2. Activar `Auto Confirm User`.

El trigger `on_auth_user_auto_approve` agrega automaticamente cada cuenta nueva
a `approved_users` con `active = true`.

Importante: `Allow new users to sign up` debe permanecer desactivado en
Authentication > Settings. De lo contrario, cualquier persona que se registre
tambien quedaria aprobada automaticamente.

Para retirar el acceso sin eliminar la cuenta:

```sql
update public.approved_users
set active = false
where user_id = (
  select id from auth.users where lower(email) = lower('persona@correo.com')
);
```

## Estado actual

- Supabase conectado al proyecto `wceoekdvnbxfnogakkdc`.
- Registro publico desactivado.
- Aprobacion automatica activa para usuarios creados por el administrador.
- Banco inicial de 20 preguntas migrado.
- Funcion `quiz` desplegada.
- El sitio carga los enunciados sin la clave y califica en el servidor.

La clave administrativa nunca debe guardarse en este repositorio ni en
`config.js`. Supabase proporciona las credenciales privadas directamente a la
funcion desplegada.

## Limite de proteccion

Las preguntas mostradas a un usuario autorizado pueden copiarse. La funcion
evita que la clave de respuestas, las explicaciones y el banco completo se
descarguen junto con la pagina.
