# Automatizacion de noticias

La portada carga sus noticias desde `data/news-data.js`. Si ese archivo no esta
disponible o tiene menos de tres noticias validas, conserva el contenido incluido
en `index.html`.

## Fuentes

- Comision Nacional del Servicio Civil (CNSC)
- Ministerio de Educacion Nacional (MEN)

El actualizador solo acepta enlaces de dominios institucionales y prioriza
terminos relacionados con concurso docente, vacantes, carrera, OPEC y SIMO.

## Actualizacion manual

Requiere Node.js 20 o posterior:

```powershell
node scripts/update-news.mjs
```

## Actualizacion diaria

El flujo `.github/workflows/update-news.yml` se ejecuta todos los dias a las
11:15 UTC, aproximadamente 6:15 a. m. en Colombia. Tambien puede ejecutarse
manualmente desde la pestana Actions del repositorio.

Para permitir que GitHub publique el archivo actualizado, el repositorio debe
tener habilitado `Settings > Actions > General > Workflow permissions > Read and
write permissions`.

## Actualizacion local en Windows

Si la pagina se usa directamente desde este computador, se puede instalar una
tarea diaria a las 6:15 a. m.:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/install-daily-news-task.ps1
```

La tarea se registra con el nombre `Aula 2026 - Actualizar noticias`.
