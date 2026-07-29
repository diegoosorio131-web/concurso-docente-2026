with base_sequence as (
  select coalesce(max(sequence), 0) as value
  from public.quiz_questions
  where category = 'pedagogica'
),
new_questions (
  position,
  external_id,
  question_number,
  prompt,
  options,
  correct_answer,
  explanation,
  option_feedback
) as (
  values
  (
    1,
    'p1',
    1,
    $q$¿Cuál actuación inicial permite establecer si el incremento reportado representa una variación institucional válida y no un efecto del cambio metodológico?$q$,
    jsonb_build_array(
      $q$Depurar registros duplicados, entregas tardías y valores extremos mediante reglas uniformes para precisar la magnitud observada antes de examinar equivalencia métrica institucional.$q$,
      $q$Homologar las rúbricas mediante anclajes compartidos, igualar la unidad docente y reponderar artefactos para reconstruir una estimación institucional comparable entre periodos evaluados.$q$,
      $q$Triangular resultados automatizados, apreciaciones docentes y actas de acompañamiento mediante una matriz probatoria para interpretar variaciones antes de recalibrar el indicador institucional.$q$
    ),
    1,
    $q$Antes de interpretar el aumento es necesario hacer comparables los dos periodos. Homologar la rúbrica, recuperar la unidad de análisis docente y corregir la ponderación evita atribuir al resultado cambios producidos por el método de medición.$q$,
    jsonb_build_array(
      $q$Depurar duplicados, entregas tardías y valores extremos mejora la calidad de los datos, pero no corrige el cambio de rúbrica, de unidad de análisis ni de ponderación. Por eso todavía no permite comparar válidamente los periodos.$q$,
      $q$Antes de interpretar el aumento es necesario hacer comparables los dos periodos. Homologar la rúbrica, recuperar la unidad de análisis docente y corregir la ponderación evita atribuir al resultado cambios producidos por el método de medición.$q$,
      $q$La triangulación ayuda a interpretar el resultado, pero se realizaría sobre mediciones que aún no son equivalentes. Primero debe corregirse la comparabilidad métrica para separar una mejora real de un efecto metodológico.$q$
    )
  ),
  (
    2,
    'p2',
    2,
    $q$¿Qué procedimiento ofrece la inferencia más defendible para valorar si la variación observada puede relacionarse con la estrategia y no con explicaciones rivales?$q$,
    jsonb_build_array(
      $q$Integrar series, entrevistas y auditorías de artefactos, jerarquizando evidencia según validez, para explicar mecanismos, sesgos y resultados derivados de la intervención institucional.$q$,
      $q$Aplicar un modelo multinivel de diferencias temporales, ajustando línea base, exposición desigual y sede, para estimar variación atribuible a la estrategia institucional.$q$,
      $q$Contrastar grupos según intensidad de acompañamiento, emparejando perfiles iniciales y efectuando análisis de sensibilidad, para valorar explicaciones rivales del cambio institucional observado.$q$
    ),
    2,
    $q$El acompañamiento no fue asignado al azar y su intensidad varió entre sedes. Comparar grupos semejantes, emparejar sus condiciones iniciales y aplicar análisis de sensibilidad permite examinar mejor ese sesgo y otras explicaciones rivales.$q$,
    jsonb_build_array(
      $q$La integración de series, entrevistas y auditorías explica mecanismos y aporta contexto, pero no construye una comparación suficientemente fuerte frente a la asignación no aleatoria del acompañamiento.$q$,
      $q$El modelo multinivel controla sede, tiempo y variables observadas, pero no aborda de manera explícita la selección no aleatoria de quienes recibieron más acompañamiento ni prueba la sensibilidad frente a ese sesgo.$q$,
      $q$El acompañamiento no fue asignado al azar y su intensidad varió entre sedes. Comparar grupos semejantes, emparejar sus condiciones iniciales y aplicar análisis de sensibilidad permite examinar mejor ese sesgo y otras explicaciones rivales.$q$
    )
  ),
  (
    3,
    'p3',
    3,
    $q$Ante la propuesta de cerrar la acción institucional y adoptar permanentemente la estrategia, ¿qué recomendación ofrece mayor proporcionalidad técnica y normativa?$q$,
    jsonb_build_array(
      $q$Reconocer el avance provisional, ampliar la implementación y anexar reservas metodológicas, para generar evidencia adicional durante el despliegue institucional de la fase.$q$,
      $q$Suspender temporalmente la estrategia, reservar recursos y solicitar revisión territorial, para prevenir decisiones institucionales apoyadas en resultados metodológicamente inestables durante la vigencia.$q$,
      $q$Mantener la estrategia bajo validación, redefinir indicador y fijar umbrales verificables, para decidir cierre o ampliación mediante evidencia equivalente del próximo corte.$q$
    ),
    2,
    $q$La evidencia muestra un avance, pero todavía no permite cerrar la acción ni adoptar definitivamente la estrategia. Mantenerla bajo validación, redefinir el indicador y establecer umbrales equilibra continuidad, prudencia y trazabilidad.$q$,
    jsonb_build_array(
      $q$Ampliar la implementación mientras solo se anexan reservas mantiene el indicador inestable y extiende una estrategia antes de definir criterios verificables para decidir si realmente funciona.$q$,
      $q$Suspender completamente la estrategia es desproporcionado porque existe una señal favorable y no se reportan daños que exijan detenerla. Puede continuar de manera controlada mientras se valida la medición.$q$,
      $q$La evidencia muestra un avance, pero todavía no permite cerrar la acción ni adoptar definitivamente la estrategia. Mantenerla bajo validación, redefinir el indicador y establecer umbrales equilibra continuidad, prudencia y trazabilidad.$q$
    )
  ),
  (
    4,
    'p4',
    4,
    $q$¿Cuál mecanismo permitiría desarrollar el siguiente ciclo de seguimiento con mayor trazabilidad, estabilidad de medición y capacidad para adoptar ajustes oportunos?$q$,
    jsonb_build_array(
      $q$Establecer un protocolo prospectivo con definiciones, unidades, fuentes, reglas de ausencia y umbrales, para activar ajustes institucionales trazables en cada revisión programada.$q$,
      $q$Implementar auditorías rotativas entre sedes, revisión documental y retroalimentación técnica, para fortalecer fidelidad operativa y detectar divergencias durante la ejecución institucional periódica.$q$,
      $q$Programar informes bimestrales, reuniones técnicas y compromisos responsables, para mantener actualización ejecutiva y facilitar decisiones del equipo directivo durante la vigencia institucional.$q$
    ),
    0,
    $q$Un protocolo definido antes de medir fija unidades, fuentes, tratamiento de ausencias y umbrales de decisión. Esto estabiliza la medición y permite saber cuándo y por qué se activa cada ajuste.$q$,
    jsonb_build_array(
      $q$Un protocolo definido antes de medir fija unidades, fuentes, tratamiento de ausencias y umbrales de decisión. Esto estabiliza la medición y permite saber cuándo y por qué se activa cada ajuste.$q$,
      $q$Las auditorías rotativas permiten detectar diferencias de ejecución, pero no fijan previamente las unidades, reglas de ausencia, fuentes y umbrales necesarios para que la medición sea estable.$q$,
      $q$Los informes y reuniones mejoran la coordinación, pero una mayor frecuencia de reporte no corrige por sí misma las inconsistencias del indicador ni establece reglas trazables de decisión.$q$
    )
  )
)
insert into public.quiz_questions (
  external_id,
  test_id,
  test_title,
  category,
  block_id,
  block_range,
  topic,
  situation,
  question_number,
  prompt,
  options,
  correct_answer,
  explanation,
  option_feedback,
  sequence,
  active
)
select
  new_questions.external_id,
  'prueba-competencias-docentes-01',
  'Prueba de competencias docentes 01',
  'pedagogica',
  'situacion-1-4',
  '1-4',
  'Seguimiento y evaluación institucional',
  $q$La Institución Educativa Altos de la Ribera incorporó en su planeación anual la estrategia Ciclos de Evidencia Pedagógica, orientada a mejorar la utilización institucional de evidencias para ajustar las prácticas educativas.

La línea base se obtuvo durante la vigencia anterior mediante una rúbrica de cuatro niveles. Cada docente entregó un registro pedagógico seleccionado mediante muestreo institucional, posteriormente valorado por dos evaluadores capacitados. La meta fijada consistía en aumentar 15 puntos porcentuales la proporción de docentes ubicados en los dos niveles superiores.

Al finalizar el tercer corte, el informe institucional presenta un incremento de 24 puntos porcentuales. El equipo directivo propone declarar cumplida la meta, cerrar la acción del Plan de Mejoramiento Institucional y adoptar permanentemente la estrategia.

Una docente encargada de aportar al seguimiento identifica que la rúbrica actual contiene cinco niveles y modificó varios descriptores; la unidad de análisis, la ponderación y el tratamiento de registros faltantes cambiaron; la ejecución y el acompañamiento fueron desiguales entre sedes; hubo una capacitación externa; y parte de las calificaciones automatizadas no cuenta con verificación humana. La docente deberá recomendar cómo valorar el resultado, determinar la posible eficacia de la estrategia y orientar su continuidad institucional.$q$,
  new_questions.question_number,
  new_questions.prompt,
  new_questions.options,
  new_questions.correct_answer,
  new_questions.explanation,
  new_questions.option_feedback,
  base_sequence.value + new_questions.position,
  true
from new_questions
cross join base_sequence
on conflict (external_id) do update set
  test_id = excluded.test_id,
  test_title = excluded.test_title,
  category = excluded.category,
  block_id = excluded.block_id,
  block_range = excluded.block_range,
  topic = excluded.topic,
  situation = excluded.situation,
  question_number = excluded.question_number,
  prompt = excluded.prompt,
  options = excluded.options,
  correct_answer = excluded.correct_answer,
  explanation = excluded.explanation,
  option_feedback = excluded.option_feedback,
  sequence = excluded.sequence,
  active = true;
