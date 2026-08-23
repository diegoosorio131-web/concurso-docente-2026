with quimica_updates as (
  select * from (
    values
      (1, 20,
       $$En una clase de Química, el docente propone comparar sal común, agua, dióxido de carbono y un metal para que el grupo relacione estructura microscópica y propiedades macroscópicas.$$,
       $$Al comparar una mezcla con una sustancia pura, ¿qué criterio permite diferenciarlas mejor?$$,
       'Simulacro #4 · Química'),
      (21, 40,
       $$En una secuencia sobre modelo atómico y tabla periódica, los estudiantes analizan partículas, isótopos y tendencias periódicas para explicar propiedades de los elementos.$$,
       $$¿Qué idea explica mejor que los elementos de un mismo grupo tengan propiedades semejantes?$$,
       'Simulacro #4 · Química'),
      (41, 60,
       $$En una práctica de laboratorio, el grupo compara sustancias para explicar conductividad, solubilidad y polaridad a partir del tipo de enlace.$$,
       $$¿Qué explicación es más adecuada para una molécula polar?$$,
       'Simulacro #4 · Química'),
      (61, 80,
       $$El docente plantea una actividad de balanceo de ecuaciones y cálculo de reactivos y productos para revisar conservación de la masa y relaciones estequiométricas.$$,
       $$Al balancear una ecuación química, ¿qué se conserva?$$,
       'Simulacro #4 · Química'),
      (81, 100,
       $$En una guía sobre soluciones, los estudiantes preparan mezclas de diferente concentración y comparan la relación entre soluto y solvente.$$,
       $$¿Qué relación describe mejor una solución más concentrada?$$,
       'Simulacro #4 · Química'),
      (101, 120,
       $$En una clase de ácido-base, el grupo contrasta sustancias cotidianas, interpreta valores de pH y analiza procesos de neutralización.$$,
       $$¿Qué afirmación describe mejor una base?$$,
       'Simulacro #4 · Química'),
      (121, 140,
       $$El docente compara reacciones endotérmicas, exotérmicas y el efecto de la temperatura y de los catalizadores sobre la velocidad de reacción.$$,
       $$¿Qué efecto suele tener un catalizador en una reacción?$$,
       'Simulacro #4 · Química'),
      (141, 160,
       $$La clase estudia corrosión, pilas sencillas y transferencia de electrones para interpretar procesos redox en situaciones cotidianas.$$,
       $$En una reacción redox, ¿qué ocurre en la oxidación?$$,
       'Simulacro #4 · Química'),
      (161, 180,
       $$Los estudiantes reconocen hidrocarburos, alcoholes y polímeros de uso frecuente a partir de su estructura de carbono.$$,
       $$¿Qué rasgo general caracteriza a muchos compuestos orgánicos?$$,
       'Simulacro #4 · Química'),
      (181, 200,
       $$El equipo docente diseña una evaluación para verificar si el estudiante explica fenómenos químicos con conceptos, evidencia y argumentación.$$,
       $$¿Cuál evidencia permite valorar mejor una comprensión aplicada de la química?$$,
       'Simulacro #4 · Química')
  ) as v(range_start, range_end, situation, prompt, test_title)
)
update public.quiz_questions q
set
  situation = u.situation,
  prompt = u.prompt,
  test_title = u.test_title
from quimica_updates u
where q.test_id = 'banco-quimica-200'
  and q.question_number between u.range_start and u.range_end;

with naturales_updates as (
  select * from (
    values
      (1, 20,
       $$En una clase de Ciencias Naturales, el docente guía a los estudiantes para formular preguntas, observar fenómenos y registrar datos antes de sacar conclusiones.$$,
       $$¿Qué acción refleja mejor una indagación científica escolar?$$,
       'Simulacro #3 · Ciencias Naturales'),
      (21, 40,
       $$En una secuencia sobre la célula, el grupo compara tejidos, órganos y funciones vitales para reconocer niveles de organización biológica.$$,
       $$¿Qué afirmación describe mejor la célula?$$,
       'Simulacro #3 · Ciencias Naturales'),
      (41, 60,
       $$El docente propone analizar rasgos heredables y variaciones entre organismos para explicar similitudes y diferencias en una familia.$$,
       $$¿Qué explica mejor que dos hermanos tengan similitudes y diferencias?$$,
       'Simulacro #3 · Ciencias Naturales'),
      (61, 80,
       $$En un proyecto sobre ecosistemas, los estudiantes relacionan seres vivos, hábitat y flujo de energía para proponer acciones de conservación.$$,
       $$¿Qué decisión favorece un ecosistema más equilibrado?$$,
       'Simulacro #3 · Ciencias Naturales'),
      (81, 100,
       $$En un eje sobre cuerpo humano y salud, el grupo analiza hábitos de autocuidado, nutrición y actividad física para prevenir enfermedades.$$,
       $$¿Qué práctica apoya mejor la salud integral en la escuela?$$,
       'Simulacro #3 · Ciencias Naturales'),
      (101, 120,
       $$En una clase de física escolar, los estudiantes observan cómo una fuerza puede modificar el movimiento o la forma de un cuerpo.$$,
       $$¿Qué relación es correcta entre fuerza y movimiento?$$,
       'Simulacro #3 · Ciencias Naturales'),
      (121, 140,
       $$El docente explora propagación del sonido y otras ondas para que el grupo identifique cómo viaja la energía en distintos medios.$$,
       $$¿Qué propiedad describe mejor una onda sonora?$$,
       'Simulacro #3 · Ciencias Naturales'),
      (141, 160,
       $$La clase analiza la rotación y traslación de la Tierra para relacionarlas con fenómenos observables en la vida cotidiana.$$,
       $$¿Qué causa principal explica la sucesión de día y noche?$$,
       'Simulacro #3 · Ciencias Naturales'),
      (161, 180,
       $$En un trabajo sobre ambiente y sostenibilidad, el curso diseña acciones para disminuir residuos y cuidar agua, suelo y aire.$$,
       $$¿Cuál acción es más sostenible en la escuela?$$,
       'Simulacro #3 · Ciencias Naturales'),
      (181, 200,
       $$El docente diseña una evaluación para comprobar si el estudiante explica fenómenos naturales con evidencia, conceptos y lenguaje científico.$$,
       $$¿Qué evidencia es más pertinente para valorar aprendizaje científico?$$,
       'Simulacro #3 · Ciencias Naturales')
  ) as v(range_start, range_end, situation, prompt, test_title)
)
update public.quiz_questions q
set
  situation = u.situation,
  prompt = u.prompt,
  test_title = u.test_title
from naturales_updates u
where q.test_id = 'banco-naturales-200'
  and q.question_number between u.range_start and u.range_end;

with matematicas_updates as (
  select * from (
    values
      (1, 20,
       $$En una clase de Matemáticas, el docente plantea situaciones de cálculo con números naturales para revisar estrategias de estimación y operación.$$,
       $$¿Qué estrategia es más adecuada para resolver una suma de varios términos?$$,
       'Simulacro #4 · Matemáticas'),
      (21, 40,
       $$En una secuencia sobre fracciones y porcentajes, el grupo analiza repartos, razones y comparaciones entre cantidades.$$,
       $$¿Qué interpretación es correcta para una fracción?$$,
       'Simulacro #4 · Matemáticas'),
      (41, 60,
       $$El docente usa problemas de proporcionalidad para que los estudiantes comparen magnitudes y reconozcan relaciones constantes.$$,
       $$¿Qué relación describe mejor una proporcionalidad directa?$$,
       'Simulacro #4 · Matemáticas'),
      (61, 80,
       $$En un eje de álgebra, el grupo traduce situaciones cotidianas a expresiones para representar relaciones entre cantidades.$$,
       $$¿Qué representa mejor una expresión algebraica?$$,
       'Simulacro #4 · Matemáticas'),
      (81, 100,
       $$El docente propone ecuaciones de primer grado en contexto para que el grupo encuentre incógnitas y explique el procedimiento.$$,
       $$¿Qué significa resolver una ecuación?$$,
       'Simulacro #4 · Matemáticas'),
      (101, 120,
       $$En una secuencia de geometría, los estudiantes clasifican figuras, miden ángulos y analizan propiedades de triángulos y polígonos.$$,
       $$¿Qué propiedad es esencial para clasificar un triángulo?$$,
       'Simulacro #4 · Matemáticas'),
      (121, 140,
       $$El curso trabaja magnitudes y unidades de medida para elegir instrumentos y registrar datos con precisión.$$,
       $$¿Qué decisión evita errores en una medición?$$,
       'Simulacro #4 · Matemáticas'),
      (141, 160,
       $$En un bloque de estadística, los estudiantes organizan datos, comparan frecuencias y analizan medidas de tendencia central.$$,
       $$¿Qué medida resume mejor un conjunto de datos con valores extremos?$$,
       'Simulacro #4 · Matemáticas'),
      (161, 180,
       $$El docente propone experiencias aleatorias para que el grupo estime la probabilidad de que ocurra un evento sencillo.$$,
       $$¿Qué describe mejor un evento probable?$$,
       'Simulacro #4 · Matemáticas'),
      (181, 200,
       $$En el cierre de la unidad, el docente diseña problemas para que los estudiantes argumenten procedimientos y verifiquen resultados.$$,
       $$¿Qué evidencia muestra mejor comprensión matemática?$$,
       'Simulacro #4 · Matemáticas')
  ) as v(range_start, range_end, situation, prompt, test_title)
)
update public.quiz_questions q
set
  situation = u.situation,
  prompt = u.prompt,
  test_title = u.test_title
from matematicas_updates u
where q.test_id = 'banco-matematicas-200'
  and q.question_number between u.range_start and u.range_end;
