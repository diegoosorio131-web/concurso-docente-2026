with question_index as (
  select
    q.id,
    q.question_number,
    case
      when q.question_number between 1 and 50 then 1
      when q.question_number between 51 and 100 then 2
      when q.question_number between 101 and 150 then 3
      else 4
    end as component_no,
    case
      when q.question_number between 1 and 50 then q.question_number
      when q.question_number between 51 and 100 then q.question_number - 50
      when q.question_number between 101 and 150 then q.question_number - 100
      else q.question_number - 150
    end as local_no
  from public.quiz_questions q
  where q.test_id = 'banco-quimica-200'
),
classified as (
  select
    qi.*,
    ((qi.local_no - 1) / 5)::int + 1 as scenario_no,
    ((qi.local_no - 1) % 5) + 1 as qtype
  from question_index qi
),
scenario_bank as (
  select
    array[
      'seguridad en el laboratorio y uso de elementos de protección',
      'contaminación del agua por residuos químicos',
      'clasificación de sustancias y mezclas',
      'enlaces y propiedades de materiales',
      'manejo de residuos y economía circular',
      'pH en productos de uso cotidiano',
      'química atmosférica y cambio climático',
      'soluciones y concentración en una práctica',
      'organización de la tabla periódica',
      'investigación escolar en química'
    ]::text[] as lectura_themes,
    array[
      'En una clase de Química, el docente comparte un texto corto sobre normas de seguridad en el laboratorio y pide a los estudiantes distinguir recomendaciones de riesgos.',
      'El grupo lee un texto divulgativo sobre cómo algunos residuos químicos llegan a ríos y quebradas, y luego deben reconocer los problemas que describe la lectura.',
      'La clase analiza un texto sobre sustancias puras, mezclas homogéneas y heterogéneas para identificar las ideas centrales del material.',
      'El docente entrega una lectura sobre enlaces químicos y propiedades de materiales cotidianos para que el grupo relacione estructura y comportamiento.',
      'Los estudiantes leen un texto sobre separación de residuos y economía circular para valorar qué argumentos son más sólidos y pertinentes.',
      'La guía de lectura presenta información sobre el pH de productos de uso cotidiano y su relación con el cuidado personal y el entorno.',
      'El curso trabaja un texto sobre química atmosférica, gases de efecto invernadero y sus implicaciones ambientales.',
      'En clase se usa una lectura sobre soluciones y concentración para que los estudiantes distingan datos, conclusiones y ejemplos.',
      'La actividad parte de un texto sobre la organización de la tabla periódica y el sentido pedagógico de reconocer patrones entre elementos.',
      'El grupo analiza una reseña sobre investigación escolar en química para discutir qué hace válida una conclusión científica.'
    ]::text[] as lectura_situations,
    array[
      'estimación de asistencia y porcentajes en un grupo de laboratorio',
      'preparación de una solución con masa y volumen conocidos',
      'comparación de rendimientos entre dos equipos de práctica',
      'lectura de una tabla de resultados experimentales',
      'cálculo de proporciones en una mezcla',
      'conversión de unidades en una práctica de laboratorio',
      'análisis de una gráfica de temperatura y tiempo',
      'promedio de medidas repetidas en un experimento',
      'interpretación de datos de consumo de insumos',
      'distribución porcentual de residuos recuperados'
    ]::text[] as cuant_themes,
    array[
      'En una guía de laboratorio, el docente registra cuántos estudiantes entregan informe, cuántos asisten y qué porcentaje participa en la práctica.',
      'En una práctica de soluciones, el grupo trabaja con masa de soluto, volumen de solvente y concentración final para comparar procedimientos.',
      'Dos equipos de estudiantes obtienen resultados distintos al medir un mismo fenómeno, y el docente pide analizar proporciones y diferencias.',
      'La clase interpreta una tabla con datos de temperatura, tiempo y cantidad de sustancia para decidir cuál lectura es más confiable.',
      'El docente presenta una mezcla con cantidades específicas y pide relacionar las partes para mantener una proporción constante.',
      'Los estudiantes convierten unidades de masa, volumen y temperatura para registrar con precisión sus observaciones de laboratorio.',
      'El curso analiza una gráfica sobre velocidad de reacción y debe interpretar cómo cambia el fenómeno en el tiempo.',
      'En un experimento se hacen tres mediciones del mismo valor y se necesita resumirlas sin perder la referencia central.',
      'La institución estudia el consumo de reactivos y materiales de una práctica para decidir ajustes en el presupuesto.',
      'El grupo compara porcentajes de separación y recuperación de residuos para interpretar la eficiencia de una estrategia.'
    ]::text[] as blandas_situations,
    array[
      'organizar una práctica de laboratorio en equipos',
      'reportar un error en el registro de datos',
      'repartir materiales y roles de trabajo',
      'tomar decisiones frente a residuos y cuidado ambiental',
      'resolver un desacuerdo durante una socialización',
      'liderar una actividad con estudiantes de ritmos distintos',
      'garantizar inclusión y participación en una práctica',
      'usar recursos escolares con responsabilidad',
      'comunicar una situación de riesgo de manera respetuosa',
      'cumplir protocolos de seguridad y convivencia'
    ]::text[] as blandas_themes,
    array[
      'materia y mezclas',
      'estructura atómica y tabla periódica',
      'enlaces y polaridad',
      'reacciones y balanceo',
      'soluciones y solubilidad',
      'ácidos, bases y pH',
      'energía y velocidad de reacción',
      'oxidación, reducción y corrosión',
      'química orgánica',
      'evaluación y didáctica'
    ]::text[] as disciplinar_themes,
    array[
      'En una clase de Química, el docente compara sustancias puras y mezclas para que el grupo explique cómo cambia la materia en contextos cercanos.',
      'El curso analiza la estructura atómica y la organización de la tabla periódica para entender por qué algunos elementos comparten propiedades.',
      'La clase estudia enlaces químicos, polaridad y propiedades de materiales para relacionar modelo microscópico y comportamiento observable.',
      'El grupo trabaja reacciones químicas, balanceo y conservación de la materia a partir de una situación de laboratorio.',
      'Los estudiantes revisan soluciones, concentración y solubilidad para conectar proporciones con fenómenos cotidianos.',
      'El docente aborda ácidos, bases y pH mediante ejemplos de productos de uso frecuente y su impacto en la vida diaria.',
      'La secuencia presenta energía de reacción, catalizadores y velocidad química para interpretar cambios en un proceso.',
      'El grupo analiza oxidación, reducción y corrosión para reconocer transferencia de electrones en ejemplos escolares.',
      'La clase estudia compuestos orgánicos y su presencia en materiales de uso cotidiano.',
      'El docente diseña una evaluación para valorar comprensión química, argumentación y aplicación pedagógica.'
    ]::text[] as disciplinar_situations
),
resolved as (
  select
    c.id,
    c.question_number,
    c.component_no,
    c.scenario_no,
    c.qtype,
    case c.component_no
      when 1 then sb.lectura_themes[c.scenario_no]
      when 2 then sb.cuant_themes[c.scenario_no]
      when 3 then sb.blandas_themes[c.scenario_no]
      else sb.disciplinar_themes[c.scenario_no]
    end as theme,
    case c.component_no
      when 1 then sb.lectura_situations[c.scenario_no]
      when 2 then sb.cuant_themes[c.scenario_no]
      when 3 then sb.blandas_situations[c.scenario_no]
      else sb.disciplinar_situations[c.scenario_no]
    end as situation,
    case c.component_no
      when 1 then 'Química: lectura crítica'
      when 2 then 'Química: razonamiento cuantitativo'
      when 3 then 'Química: competencias blandas'
      else 'Química: conocimientos disciplinares y pedagogía'
    end as topic,
    case c.component_no
      when 1 then 'quimica-lectura-critica'
      when 2 then 'quimica-razonamiento-cuantitativo'
      when 3 then 'quimica-competencias-blandas'
      else 'quimica-disciplinar-pedagogico'
    end as block_id,
    case c.component_no
      when 1 then '1-50'
      when 2 then '51-100'
      when 3 then '101-150'
      else '151-200'
    end as block_range,
    case c.component_no
      when 1 then format(
        case c.qtype
          when 1 then '¿Cuál es la idea principal del texto sobre %s?'
          when 2 then '¿Qué inferencia es más sólida a partir del texto sobre %s?'
          when 3 then '¿Con qué intención se presenta el texto sobre %s?'
          when 4 then '¿Qué fragmento respalda mejor la conclusión sobre %s?'
          else '¿Qué lectura crítica es más pertinente frente al texto sobre %s?'
        end,
        case c.component_no
          when 1 then sb.lectura_themes[c.scenario_no]
          when 2 then sb.cuant_themes[c.scenario_no]
          when 3 then sb.blandas_themes[c.scenario_no]
          else sb.disciplinar_themes[c.scenario_no]
        end
      )
      when 2 then format(
        case c.qtype
          when 1 then '¿Qué cálculo permite resolver mejor la situación sobre %s?'
          when 2 then '¿Qué relación numérica describe mejor la situación sobre %s?'
          when 3 then '¿Qué medida resume mejor los datos sobre %s?'
          when 4 then '¿Qué procedimiento evita errores al trabajar con %s?'
          else '¿Qué interpretación es correcta al leer la información sobre %s?'
        end,
        case c.component_no
          when 1 then sb.lectura_themes[c.scenario_no]
          when 2 then sb.cuant_themes[c.scenario_no]
          when 3 then sb.blandas_themes[c.scenario_no]
          else sb.disciplinar_themes[c.scenario_no]
        end
      )
      when 3 then format(
        case c.qtype
          when 1 then '¿Qué decisión muestra mejor liderazgo en %s?'
          when 2 then '¿Qué acción refleja mayor ética en %s?'
          when 3 then '¿Qué respuesta favorece mejor el trabajo en equipo en %s?'
          when 4 then '¿Qué conducta es más coherente con ciudadanía y convivencia en %s?'
          else '¿Qué resolución maneja mejor el conflicto en %s?'
        end,
        case c.component_no
          when 1 then sb.lectura_themes[c.scenario_no]
          when 2 then sb.cuant_themes[c.scenario_no]
          when 3 then sb.blandas_themes[c.scenario_no]
          else sb.disciplinar_themes[c.scenario_no]
        end
      )
      else format(
        case c.qtype
          when 1 then '¿Qué concepto químico explica mejor %s?'
          when 2 then '¿Qué error conceptual debe corregirse en %s?'
          when 3 then '¿Qué relación entre variables es más adecuada en %s?'
          when 4 then '¿Qué decisión didáctica es más pertinente para enseñar %s?'
          else '¿Qué evidencia de aprendizaje es más útil para valorar %s?'
        end,
        case c.component_no
          when 1 then sb.lectura_themes[c.scenario_no]
          when 2 then sb.cuant_themes[c.scenario_no]
          when 3 then sb.blandas_themes[c.scenario_no]
          else sb.disciplinar_themes[c.scenario_no]
        end
      )
    end as prompt,
    case c.component_no
      when 1 then
        case c.qtype
          when 1 then jsonb_build_array(
            'La idea central del texto resume el problema o recomendación principal.',
            'Un detalle secundario que no cambia el sentido global.',
            'Un dato ajeno al tema que solo decora la lectura.'
          )
          when 2 then jsonb_build_array(
            'Se puede inferir una conclusión coherente a partir de las evidencias del texto.',
            'Solo se repite una frase literal sin interpretar el contenido.',
            'La lectura sostiene la idea contraria a lo expuesto.'
          )
          when 3 then jsonb_build_array(
            'Se presenta para explicar, orientar o advertir con claridad al lector.',
            'Se presenta para confundir al lector y evitar que comprenda.',
            'Se presenta únicamente para extender el texto sin propósito.'
          )
          when 4 then jsonb_build_array(
            'El fragmento citado aporta evidencia directa para sostener la conclusión.',
            'Un comentario decorativo que no se relaciona con la conclusión.',
            'Una opinión aislada que no depende del texto.'
          )
          else jsonb_build_array(
            'La lectura crítica más pertinente reconoce la tesis, el soporte y la solidez del argumento.',
            'Aceptar todo lo leído sin revisar la fuente ni las evidencias.',
            'Ignorar la información del texto y responder por intuición.'
          )
        end
      when 2 then
        case c.qtype
          when 1 then jsonb_build_array(
            'Aplicar una operación o proporción coherente con los datos.',
            'Restar valores al azar para obtener una cifra cualquiera.',
            'Promediar sin revisar qué representa cada dato.'
          )
          when 2 then jsonb_build_array(
            'La relación entre las cantidades es proporcional y puede calcularse con una razón fija.',
            'Las magnitudes no guardan relación entre sí.',
            'La relación solo depende de una impresión visual.'
          )
          when 3 then jsonb_build_array(
            'La medida que resume mejor es la que representa la tendencia del conjunto.',
            'Solo el valor mayor sin analizar el resto.',
            'El primer dato de la lista porque aparece primero.'
          )
          when 4 then jsonb_build_array(
            'Conviene usar la unidad o la referencia correcta antes de concluir.',
            'Cambiar los datos sin criterio para que el resultado se vea mejor.',
            'Redondear todo antes de calcular, aunque se pierda precisión.'
          )
          else jsonb_build_array(
            'La interpretación correcta respeta la tabla, la escala o la proporción observada.',
            'Tomar un dato aislado y convertirlo en conclusión total.',
            'Ignorar la variación entre valores y responder por supuesto.'
          )
        end
      when 3 then
        case c.qtype
          when 1 then jsonb_build_array(
            'Organizar, escuchar y repartir responsabilidades de manera clara.',
            'Imponer sin escuchar para ahorrar tiempo.',
            'Esperar a que otro decida sin participar.'
          )
          when 2 then jsonb_build_array(
            'Registrar y comunicar con honestidad, incluso si hay un error.',
            'Ocultar el error para evitar incomodidades.',
            'Culpar a otro sin revisar qué pasó.'
          )
          when 3 then jsonb_build_array(
            'Escuchar, consensuar y complementar aportes para avanzar en equipo.',
            'Trabajar solo para no depender de nadie.',
            'Excluir a quien se demora en responder.'
          )
          when 4 then jsonb_build_array(
            'Cuidar normas, recursos y convivencia con responsabilidad.',
            'Ignorar acuerdos porque la actividad es corta.',
            'Burlarse de la norma para que el grupo se relaje.'
          )
          else jsonb_build_array(
            'Mediar con respeto y buscar una solución compartida.',
            'Responder con agresividad para imponer autoridad.',
            'Suspender la discusión sin analizar el problema.'
          )
        end
      else
        case c.qtype
          when 1 then jsonb_build_array(
            'El concepto químico correcto permite explicar la situación descrita.',
            'La explicación se basa solo en el color o la forma.',
            'No hay ninguna relación con la química.'
          )
          when 2 then jsonb_build_array(
            'Debe corregirse la relación entre estructura, propiedad o proceso.',
            'Es correcto cambiar el subíndice para ajustar el resultado.',
            'La idea no necesita revisión porque todo es equivalente.'
          )
          when 3 then jsonb_build_array(
            'La relación más adecuada es la que conecta magnitudes, variables o proporciones.',
            'Las variables no se relacionan en ningún caso.',
            'La relación depende solo del azar.'
          )
          when 4 then jsonb_build_array(
            'Conviene proponer una actividad que conecte concepto, ejemplo y análisis.',
            'Basta pedir memoria literal de definiciones.',
            'Es mejor evitar el contexto real para no complicar la clase.'
          )
          else jsonb_build_array(
            'La mejor evidencia combina explicación, aplicación y argumentación.',
            'Copiar definiciones sin contexto.',
            'Responder sin justificar el procedimiento.'
          )
        end
    end as options,
    case c.component_no
      when 1 then 0
      when 2 then 0
      when 3 then 0
      else 0
    end as correct_answer,
    case c.component_no
      when 1 then
        case c.qtype
          when 1 then 'La idea principal sintetiza el propósito global del texto, no un detalle aislado.'
          when 2 then 'La inferencia se apoya en la evidencia del texto y no en una repetición literal.'
          when 3 then 'La intención del texto es orientar la comprensión del lector con información pertinente.'
          when 4 then 'La evidencia seleccionada sostiene la conclusión porque está directamente vinculada con el argumento.'
          else 'La lectura crítica exige evaluar tesis, soporte y calidad del argumento.'
        end
      when 2 then
        case c.qtype
          when 1 then 'La operación debe responder a la relación numérica descrita por la situación.'
          when 2 then 'La razón o proporción permite comparar las cantidades sin perder sentido matemático.'
          when 3 then 'La medida resumen debe representar el conjunto de datos y no un valor aislado.'
          when 4 then 'El procedimiento correcto protege la precisión de unidades y referencias.'
          else 'La interpretación debe respetar la información observada en la tabla, gráfico o cálculo.'
        end
      when 3 then
        case c.qtype
          when 1 then 'El liderazgo se observa cuando la acción organiza, escucha y distribuye tareas de forma responsable.'
          when 2 then 'La ética exige transparencia y responsabilidad frente a errores o decisiones.'
          when 3 then 'El trabajo en equipo requiere diálogo, coordinación y complementariedad.'
          when 4 then 'La ciudadanía escolar se expresa en el respeto por normas, recursos y convivencia.'
          else 'La mejor forma de resolver el conflicto es con mediación, respeto y búsqueda de acuerdos.'
        end
      else
        case c.qtype
          when 1 then 'La explicación correcta conecta el concepto químico con la situación descrita.'
          when 2 then 'El error conceptual se corrige revisando la relación entre modelo, propiedad y proceso.'
          when 3 then 'La relación adecuada conecta magnitudes o variables sin perder coherencia científica.'
          when 4 then 'La decisión didáctica más pertinente integra contexto, concepto y aplicación.'
          else 'La evidencia de aprendizaje debe mostrar comprensión, argumentación y transferencia.'
        end
    end as explanation,
    case c.component_no
      when 1 then jsonb_build_array(
        'Correcta: reconoce la idea principal y no se queda en un detalle menor.',
        'Incorrecta: leer un fragmento no basta si no se interpreta el sentido global.',
        'Incorrecta: la opción no se sostiene con la evidencia del texto.'
      )
      when 2 then jsonb_build_array(
        'Correcta: usa la relación matemática adecuada para resolver la situación.',
        'Incorrecta: esa opción no representa el cálculo solicitado.',
        'Incorrecta: la respuesta no interpreta la información numérica.'
      )
      when 3 then jsonb_build_array(
        'Correcta: muestra una respuesta responsable, colaborativa y coherente con el rol docente.',
        'Incorrecta: esa opción rompe la comunicación o la responsabilidad.',
        'Incorrecta: la respuesta no resuelve la situación con criterio ético o ciudadano.'
      )
      else jsonb_build_array(
        'Correcta: conecta el concepto químico con la explicación esperada.',
        'Incorrecta: la respuesta no corrige el error conceptual o didáctico.',
        'Incorrecta: la opción no permite valorar comprensión real.'
      )
    end as option_feedback,
    'Simulacro #4 · Química' as test_title
  from classified c
  cross join scenario_bank sb
)
update public.quiz_questions q
set
  topic = r.topic,
  block_id = r.block_id,
  block_range = r.block_range,
  situation = r.situation,
  prompt = r.prompt,
  options = r.options,
  correct_answer = r.correct_answer,
  explanation = r.explanation,
  option_feedback = r.option_feedback,
  test_title = r.test_title,
  active = true
from resolved r
where q.id = r.id;
