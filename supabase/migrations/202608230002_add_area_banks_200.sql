with base_sequence as (
  select coalesce(max(sequence), 0) + 1000 as value
  from public.quiz_questions
),
chem_templates (
  template_no, block_id, block_range, topic, situation_template, prompt_template,
  options_template, correct_answer, explanation_template, feedback_template
) as (
  values
  (1, 'banco-quimica-materia', '1-20', 'Química: materia y propiedades',
   $$En la ruta de estudio de Química, caso %s, los estudiantes comparan muestras y describen propiedades observables.$$,
   $$Al clasificar una muestra, ¿qué diferencia mejor una mezcla de una sustancia pura?$$,
   jsonb_build_array(
     $$La composición variable y la separación por métodos físicos.$$,
     $$Que siempre sea transparente.$$,
     $$Que tenga la misma forma del recipiente.$$
   ),
   0,
   $$La mezcla no tiene composición fija y suele separarse por procesos físicos.$$,
   jsonb_build_array(
     $$Correcta: usa el criterio de composición.$$,
     $$Incorrecta: la transparencia no define pureza.$$,
     $$Incorrecta: la forma del recipiente no clasifica la materia.$$
   )),
  (2, 'banco-quimica-atomo', '21-40', 'Química: modelo atómico y periodicidad',
   $$En la ruta de estudio de Química, caso %s, el grupo interpreta información sobre partículas, isótopos y organización de la tabla periódica.$$,
   $$¿Qué idea explica mejor que los elementos de un mismo grupo tengan propiedades semejantes?$$,
   jsonb_build_array(
     $$Comparten configuración electrónica externa semejante.$$,
     $$Todos tienen el mismo número de masa.$$,
     $$Todos se encuentran en el mismo estado físico.$$ 
   ),
   0,
   $$Las propiedades químicas dependen de la configuración electrónica de valencia y de tendencias periódicas.$$,
   jsonb_build_array(
     $$Correcta: relaciona periodicidad con electrones de valencia.$$,
     $$Incorrecta: el número de masa no determina por sí solo la semejanza química.$$,
     $$Incorrecta: el estado físico no define el grupo.$$
   )),
  (3, 'banco-quimica-enlace', '41-60', 'Química: enlace químico y polaridad',
   $$En la ruta de estudio de Química, caso %s, los estudiantes comparan sustancias para explicar conductividad, solubilidad y polaridad.$$,
   $$¿Qué explicación es más adecuada para una molécula polar?$$,
   jsonb_build_array(
     $$Tiene distribución desigual de cargas y un dipolo neto.$$,
     $$Siempre está formada por un metal y un no metal.$$,
     $$No presenta enlaces entre átomos.$$
   ),
   0,
   $$La polaridad depende de la distribución de cargas y de la geometría molecular.$$,
   jsonb_build_array(
     $$Correcta: conecta enlaces y geometría.$$,
     $$Incorrecta: el tipo de elementos no basta para definir polaridad.$$,
     $$Incorrecta: toda molécula tiene enlaces internos.$$
   )),
  (4, 'banco-quimica-reacciones', '61-80', 'Química: reacciones y estequiometría',
   $$En la ruta de estudio de Química, caso %s, el docente propone balancear ecuaciones y relacionar masa, mol y número de partículas.$$,
   $$Al balancear una ecuación química, ¿qué se conserva?$$,
   jsonb_build_array(
     $$El número de átomos de cada elemento.$$,
     $$El color de las sustancias.$$,
     $$La temperatura ambiente.$$ 
   ),
   0,
   $$El balanceo respeta la conservación de la materia, por eso los átomos deben quedar iguales en ambos lados.$$,
   jsonb_build_array(
     $$Correcta: aplica la ley de conservación de la materia.$$,
     $$Incorrecta: el color puede cambiar sin afectar el balanceo.$$,
     $$Incorrecta: la temperatura no define el equilibrio de átomos.$$
   )),
  (5, 'banco-quimica-soluciones', '81-100', 'Química: soluciones y concentración',
   $$En la ruta de estudio de Química, caso %s, los estudiantes preparan soluciones para comparar concentración y solubilidad.$$,
   $$¿Qué relación describe mejor una solución más concentrada?$$,
   jsonb_build_array(
     $$Tiene mayor cantidad de soluto por cantidad de solución.$$,
     $$Tiene menos partículas disueltas que cualquier mezcla.$$,
     $$Siempre es más ácida que una diluida.$$ 
   ),
   0,
   $$La concentración relaciona la cantidad de soluto con el volumen o masa de la solución.$$,
   jsonb_build_array(
     $$Correcta: usa la idea de cantidad relativa de soluto.$$,
     $$Incorrecta: menos partículas no implica mayor concentración.$$,
     $$Incorrecta: concentración no equivale a acidez.$$
   )),
  (6, 'banco-quimica-acidos', '101-120', 'Química: ácidos y bases',
   $$En la ruta de estudio de Química, caso %s, el grupo compara sustancias de uso cotidiano y analiza cambios de pH.$$,
   $$¿Qué afirmación describe mejor una base?$$,
   jsonb_build_array(
     $$En agua puede asociarse con presencia de iones hidróxido o aceptación de protones.$$,
     $$Siempre es un metal sólido.$$,
     $$Nunca participa en reacciones de neutralización.$$ 
   ),
   0,
   $$Las bases pueden describirse por su comportamiento en agua y por su papel en neutralización.$$,
   jsonb_build_array(
     $$Correcta: reconoce el comportamiento ácido-base.$$,
     $$Incorrecta: no toda base es un metal sólido.$$,
     $$Incorrecta: las bases sí participan en neutralización.$$
   )),
  (7, 'banco-quimica-termo', '121-140', 'Química: energía y velocidad de reacción',
   $$En la ruta de estudio de Química, caso %s, el docente analiza energía de activación, temperatura y catalizadores.$$,
   $$¿Qué efecto suele tener un catalizador en una reacción?$$,
   jsonb_build_array(
     $$Disminuye la energía de activación y acelera la reacción.$$,
     $$Aumenta la masa total del sistema.$$,
     $$Convierte los reactivos en otro elemento químico.$$ 
   ),
   0,
   $$El catalizador ofrece una ruta alternativa sin consumirse globalmente.$$,
   jsonb_build_array(
     $$Correcta: explica el papel cinético del catalizador.$$,
     $$Incorrecta: la masa se conserva.$$,
     $$Incorrecta: no hay transmutación de elementos.$$
   )),
  (8, 'banco-quimica-redox', '141-160', 'Química: oxidación y reducción',
   $$En la ruta de estudio de Química, caso %s, el grupo estudia corrosión, pilas sencillas y transferencia de electrones.$$,
   $$En una reacción redox, ¿qué ocurre en la oxidación?$$,
   jsonb_build_array(
     $$Una especie pierde electrones.$$,
     $$Una especie gana masa por evaporación.$$,
     $$Una especie deja de tener átomos.$$ 
   ),
   0,
   $$Oxidación es pérdida de electrones; reducción es ganancia de electrones.$$,
   jsonb_build_array(
     $$Correcta: usa la definición electrónica.$$,
     $$Incorrecta: la masa no desaparece por evaporación en la reacción.$$,
     $$Incorrecta: los átomos no desaparecen.$$
   )),
  (9, 'banco-quimica-organica', '161-180', 'Química: compuestos orgánicos',
   $$En la ruta de estudio de Química, caso %s, los estudiantes reconocen hidrocarburos, alcoholes y polímeros de uso cotidiano.$$,
   $$¿Qué característica general comparten muchos compuestos orgánicos?$$,
   jsonb_build_array(
     $$Presentan esqueletos basados en carbono.$$,
     $$Siempre son sales iónicas.$$,
     $$Solo existen como gases.$$ 
   ),
   0,
   $$La química orgánica estudia compuestos basados en carbono y sus transformaciones.$$,
   jsonb_build_array(
     $$Correcta: identifica la base estructural de la química orgánica.$$,
     $$Incorrecta: no todos los compuestos orgánicos son sales.$$,
     $$Incorrecta: pueden ser sólidos, líquidos o gases.$$
   )),
  (10, 'banco-quimica-didactica', '181-200', 'Química: didáctica y evaluación',
   $$En la ruta de estudio de Química, caso %s, el docente diseña una evaluación para comprobar comprensión aplicada.$$,
   $$¿Cuál evidencia de aprendizaje es más pertinente?$$,
   jsonb_build_array(
     $$Que el estudiante explique un fenómeno químico con conceptos y justifique su respuesta.$$,
     $$Que copie diez definiciones sin contexto.$$,
     $$Que memorice colores de recipientes de laboratorio.$$ 
   ),
   0,
   $$La evaluación debe pedir aplicación, argumentación y relación con situaciones reales.$$,
   jsonb_build_array(
     $$Correcta: evalúa comprensión y transferencia.$$,
     $$Incorrecta: memorizar definiciones no asegura aplicación.$$,
     $$Incorrecta: el color de recipientes no prueba dominio conceptual.$$
   ))
),
nat_templates (
  template_no, block_id, block_range, topic, situation_template, prompt_template,
  options_template, correct_answer, explanation_template, feedback_template
) as (
  values
  (1, 'banco-naturales-inquiry', '1-20', 'Ciencias naturales: indagación científica',
   $$En la ruta de Ciencias Naturales, caso %s, el docente guía a los estudiantes para formular preguntas, observar y registrar datos.$$,
   $$¿Qué acción refleja mejor una indagación científica escolar?$$,
   jsonb_build_array(
     $$Plantear una pregunta, recoger evidencias y comparar resultados.$$,
     $$Elegir una respuesta antes de observar.$$,
     $$Aceptar una idea sin verificarla.$$
   ),
   0,
   $$La indagación exige pregunta, evidencia y análisis de resultados.$$,
   jsonb_build_array(
     $$Correcta: sigue el ciclo de indagación.$$,
     $$Incorrecta: decidir antes de observar anula el análisis.$$,
     $$Incorrecta: aceptar sin verificar no es indagación.$$
   )),
  (2, 'banco-naturales-cell', '21-40', 'Ciencias naturales: célula y organización de los seres vivos',
   $$En la ruta de Ciencias Naturales, caso %s, los estudiantes comparan tejidos, órganos y funciones celulares.$$,
   $$¿Qué afirmación describe mejor la célula?$$,
   jsonb_build_array(
     $$Es la unidad básica de estructura y función de los seres vivos.$$,
     $$Solo aparece en animales vertebrados.$$,
     $$No participa en procesos vitales.$$ 
   ),
   0,
   $$La célula es la unidad mínima de organización y realiza funciones vitales.$$,
   jsonb_build_array(
     $$Correcta: define la base biológica.$$,
     $$Incorrecta: también existe en plantas, hongos y microorganismos.$$,
     $$Incorrecta: la célula sí participa en funciones vitales.$$
   )),
  (3, 'banco-naturales-genetics', '41-60', 'Ciencias naturales: herencia y variabilidad',
   $$En la ruta de Ciencias Naturales, caso %s, el grupo analiza rasgos heredables y diferencias entre individuos.$$,
   $$¿Qué explica mejor que dos hermanos tengan similitudes y diferencias?$$,
   jsonb_build_array(
     $$La herencia genética combinada con variación hereditaria y ambiente.$$,
     $$La casualidad sin ningún mecanismo biológico.$$,
     $$Que ambos pertenezcan a especies distintas.$$ 
   ),
   0,
   $$La herencia y el ambiente interactúan para producir semejanzas y diferencias entre organismos.$$,
   jsonb_build_array(
     $$Correcta: integra herencia y ambiente.$$,
     $$Incorrecta: sí hay mecanismos biológicos de transmisión.$$,
     $$Incorrecta: los hermanos pertenecen a la misma especie.$$
   )),
  (4, 'banco-naturales-ecosystems', '61-80', 'Ciencias naturales: ecosistemas y biodiversidad',
   $$En la ruta de Ciencias Naturales, caso %s, los estudiantes relacionan seres vivos, energía y ciclos de la materia.$$,
   $$¿Qué decisión favorece un ecosistema más equilibrado?$$,
   jsonb_build_array(
     $$Proteger hábitats y mantener relaciones entre especies nativas.$$,
     $$Eliminar todos los organismos que parezcan molestos.$$,
     $$Introducir especies sin análisis de impacto.$$ 
   ),
   0,
   $$La conservación del hábitat y de las interacciones ecológicas ayuda a sostener la biodiversidad.$$,
   jsonb_build_array(
     $$Correcta: protege interacciones y equilibrio ecológico.$$,
     $$Incorrecta: eliminar organismos altera la red trófica.$$,
     $$Incorrecta: introducir especies puede generar invasiones biológicas.$$
   )),
  (5, 'banco-naturales-human-body', '81-100', 'Ciencias naturales: cuerpo humano y salud',
   $$En la ruta de Ciencias Naturales, caso %s, el grupo estudia nutrición, respiración, circulación y autocuidado.$$,
   $$¿Qué práctica apoya mejor la salud integral en la escuela?$$,
   jsonb_build_array(
     $$Promover hábitos de higiene, actividad física y alimentación balanceada.$$,
     $$Sustituir el descanso por más horas de pantalla.$$,
     $$Evitar toda conversación sobre autocuidado.$$ 
   ),
   0,
   $$La salud escolar se fortalece con hábitos preventivos y educación para el cuidado del cuerpo.$$,
   jsonb_build_array(
     $$Correcta: integra prevención y bienestar.$$,
     $$Incorrecta: el exceso de pantalla no favorece la salud.$$,
     $$Incorrecta: la educación en autocuidado sí es pertinente.$$
   )),
  (6, 'banco-naturales-force', '101-120', 'Ciencias naturales: fuerza, movimiento y energía',
   $$En la ruta de Ciencias Naturales, caso %s, los estudiantes describen movimiento, fuerza y transformación de energía.$$,
   $$¿Qué relación es correcta entre fuerza y movimiento?$$,
   jsonb_build_array(
     $$Una fuerza puede cambiar la velocidad o la dirección de un cuerpo.$$,
     $$Toda fuerza detiene siempre el movimiento.$$,
     $$La fuerza no tiene efecto observable.$$ 
   ),
   0,
   $$La fuerza puede modificar el estado de movimiento o deformar un cuerpo.$$,
   jsonb_build_array(
     $$Correcta: reconoce el efecto de la fuerza.$$,
     $$Incorrecta: una fuerza no siempre detiene el movimiento.$$,
     $$Incorrecta: la fuerza sí produce efectos observables.$$
   )),
  (7, 'banco-naturales-waves', '121-140', 'Ciencias naturales: ondas y sonido',
   $$En la ruta de Ciencias Naturales, caso %s, el grupo observa propagación del sonido y características de las ondas.$$,
   $$¿Qué propiedad describe mejor una onda sonora?$$,
   jsonb_build_array(
     $$Necesita un medio material para propagarse.$$,
     $$Siempre viaja más rápido que la luz.$$,
     $$Solo se produce en el vacío.$$ 
   ),
   0,
   $$El sonido es una onda mecánica y requiere un medio para propagarse.$$,
   jsonb_build_array(
     $$Correcta: identifica el carácter mecánico del sonido.$$,
     $$Incorrecta: no supera a la luz en velocidad.$$,
     $$Incorrecta: en el vacío no se propaga.$$
   )),
  (8, 'banco-naturales-earth', '141-160', 'Ciencias naturales: Tierra y astronomía',
   $$En la ruta de Ciencias Naturales, caso %s, los estudiantes relacionan movimientos de la Tierra con fenómenos diarios.$$,
   $$¿Qué causa principal explica la sucesión de día y noche?$$,
   jsonb_build_array(
     $$La rotación de la Tierra sobre su eje.$$,
     $$La traslación de la Tierra alrededor del Sol.$$,
     $$El cambio de estaciones por la lluvia.$$ 
   ),
   0,
   $$La rotación terrestre produce alternancia entre iluminación y oscuridad.$$,
   jsonb_build_array(
     $$Correcta: vincula movimiento de rotación y día-noche.$$,
     $$Incorrecta: la traslación explica el año y las estaciones.$$,
     $$Incorrecta: la lluvia no genera el ciclo diario.$$
   )),
  (9, 'banco-naturales-environment', '161-180', 'Ciencias naturales: ambiente y sostenibilidad',
   $$En la ruta de Ciencias Naturales, caso %s, la institución diseña acciones para proteger agua, suelo y aire.$$,
   $$¿Cuál acción es más sostenible en la escuela?$$,
   jsonb_build_array(
     $$Reducir residuos, separar materiales y ahorrar agua y energía.$$,
     $$Mezclar todos los desechos para ahorrar tiempo.$$,
     $$Usar recursos sin control porque son renovables.$$ 
   ),
   0,
   $$La sostenibilidad combina reducción de impactos, uso responsable y cultura ambiental.$$,
   jsonb_build_array(
     $$Correcta: promueve gestión responsable.$$,
     $$Incorrecta: mezclar residuos dificulta el reciclaje.$$,
     $$Incorrecta: aun los recursos renovables requieren manejo cuidadoso.$$
   )),
  (10, 'banco-naturales-didactics', '181-200', 'Ciencias naturales: didáctica y evaluación',
   $$En la ruta de Ciencias Naturales, caso %s, el docente busca una evaluación que muestre comprensión aplicada.$$,
   $$¿Qué evidencia es más pertinente para valorar aprendizaje científico?$$,
   jsonb_build_array(
     $$Que el estudiante explique un fenómeno con conceptos y use datos observables.$$,
     $$Que copie definiciones sin relacionarlas con el contexto.$$,
     $$Que memorice fechas sin argumentar.$$ 
   ),
   0,
   $$La comprensión científica se evidencia al explicar, relacionar y usar datos en contexto.$$,
   jsonb_build_array(
     $$Correcta: evalúa comprensión y argumentación.$$,
     $$Incorrecta: copiar definiciones no prueba aplicación.$$,
     $$Incorrecta: memorizar fechas no basta para valorar ciencia.$$
   ))
),
math_templates (
  template_no, block_id, block_range, topic, situation_template, prompt_template,
  options_template, correct_answer, explanation_template, feedback_template
) as (
  values
  (1, 'banco-matematicas-numeros', '1-20', 'Matemáticas: números y operaciones',
   $$En la ruta de Matemáticas, caso %s, el grupo resuelve situaciones con números naturales y operaciones básicas.$$,
   $$¿Qué estrategia es más adecuada para resolver una suma de varios términos?$$,
   jsonb_build_array(
     $$Agrupar términos y operar con sentido de valor posicional.$$,
     $$Cambiar el orden sin pensar en el resultado.$$,
     $$Convertir todos los números en letras.$$ 
   ),
   0,
   $$Agrupar y descomponer números ayuda a calcular con precisión y a estimar resultados.$$,
   jsonb_build_array(
     $$Correcta: usa una estrategia de cálculo con sentido.$$,
     $$Incorrecta: cambiar el orden no garantiza comprensión.$$,
     $$Incorrecta: escribir en letras no resuelve la operación.$$
   )),
  (2, 'banco-matematicas-fracciones', '21-40', 'Matemáticas: fracciones y porcentajes',
   $$En la ruta de Matemáticas, caso %s, el docente presenta repartos, razones y porcentajes en contextos cotidianos.$$,
   $$¿Qué interpretación es correcta para una fracción?$$,
   jsonb_build_array(
     $$Representa una parte de un todo o una razón entre cantidades.$$,
     $$Es solo un número decimal sin relación con cantidades.$$,
     $$No puede usarse en contextos reales.$$ 
   ),
   0,
   $$Las fracciones permiten describir partes, cocientes y comparaciones entre cantidades.$$,
   jsonb_build_array(
     $$Correcta: reconoce el significado múltiple de la fracción.$$,
     $$Incorrecta: una fracción sí puede expresarse como decimal y razón.$$,
     $$Incorrecta: se usa en muchos contextos reales.$$
   )),
  (3, 'banco-matematicas-proporcionalidad', '41-60', 'Matemáticas: proporcionalidad',
   $$En la ruta de Matemáticas, caso %s, el grupo compara escalas, razones y magnitudes directamente proporcionales.$$,
   $$¿Qué relación describe mejor una proporcionalidad directa?$$,
   jsonb_build_array(
     $$Si una magnitud aumenta, la otra también aumenta en la misma razón.$$,
     $$Una magnitud cambia y la otra nunca responde.$$,
     $$Las dos magnitudes dejan de tener relación.$$ 
   ),
   0,
   $$En la proporcionalidad directa el cociente entre magnitudes se mantiene constante.$$,
   jsonb_build_array(
     $$Correcta: identifica la razón constante.$$,
     $$Incorrecta: sí existe relación entre las variables.$$,
     $$Incorrecta: la proporcionalidad sí expresa relación.$$
   )),
  (4, 'banco-matematicas-algebra', '61-80', 'Matemáticas: álgebra y expresiones',
   $$En la ruta de Matemáticas, caso %s, los estudiantes traducen situaciones a expresiones algebraicas.$$,
   $$¿Qué representa mejor una expresión algebraica?$$,
   jsonb_build_array(
     $$Una relación escrita con números, variables y operaciones.$$,
     $$Una imagen decorativa sin significado numérico.$$,
     $$Una lista de palabras sin estructura.$$ 
   ),
   0,
   $$El álgebra permite generalizar y representar relaciones mediante símbolos.$$,
   jsonb_build_array(
     $$Correcta: define el lenguaje algebraico.$$,
     $$Incorrecta: una imagen no sustituye la representación simbólica.$$,
     $$Incorrecta: una lista de palabras no expresa relación matemática.$$
   )),
  (5, 'banco-matematicas-equations', '81-100', 'Matemáticas: ecuaciones',
   $$En la ruta de Matemáticas, caso %s, el grupo resuelve ecuaciones de primer grado en contexto escolar.$$,
   $$¿Qué significa resolver una ecuación?$$,
   jsonb_build_array(
     $$Encontrar el valor de la incógnita que hace verdadera la igualdad.$$,
     $$Cambiar todos los signos al azar.$$,
     $$Eliminar el símbolo igual.$$ 
   ),
   0,
   $$Resolver implica hallar el valor que satisface la igualdad planteada.$$,
   jsonb_build_array(
     $$Correcta: interpreta el objetivo de una ecuación.$$,
     $$Incorrecta: cambiar signos sin criterio no resuelve.$$,
     $$Incorrecta: el signo igual es parte esencial de la ecuación.$$
   )),
  (6, 'banco-matematicas-geometry', '101-120', 'Matemáticas: geometría',
   $$En la ruta de Matemáticas, caso %s, los estudiantes analizan figuras, ángulos y relaciones espaciales.$$,
   $$¿Qué propiedad es esencial para clasificar un triángulo?$$,
   jsonb_build_array(
     $$La medida de sus lados o de sus ángulos internos.$$,
     $$El color del dibujo.$$,
     $$El nombre del cuaderno donde aparece.$$ 
   ),
   0,
   $$Los triángulos se clasifican por lados y ángulos, no por rasgos decorativos.$$,
   jsonb_build_array(
     $$Correcta: usa un criterio geométrico.$$,
     $$Incorrecta: el color no clasifica figuras.$$,
     $$Incorrecta: el cuaderno no afecta sus propiedades.$$
   )),
  (7, 'banco-matematicas-measurement', '121-140', 'Matemáticas: medida',
   $$En la ruta de Matemáticas, caso %s, el grupo trabaja con unidades de longitud, masa, tiempo y capacidad.$$,
   $$¿Qué decisión evita errores en una medición?$$,
   jsonb_build_array(
     $$Elegir la unidad adecuada y registrar con precisión.$$,
     $$Cambiar de unidad sin avisar.$$,
     $$Redondear siempre antes de medir.$$ 
   ),
   0,
   $$Medir exige seleccionar la unidad correcta y registrar datos con claridad.$$,
   jsonb_build_array(
     $$Correcta: cuida unidad y registro.$$,
     $$Incorrecta: cambiar de unidad sin control distorsiona resultados.$$,
     $$Incorrecta: redondear antes de medir altera el dato.$$
   )),
  (8, 'banco-matematicas-statistics', '141-160', 'Matemáticas: estadística',
   $$En la ruta de Matemáticas, caso %s, los estudiantes organizan datos y comparan medidas de tendencia central.$$,
   $$¿Qué medida resume mejor un conjunto de datos con valores extremos?$$,
   jsonb_build_array(
     $$La mediana, porque no se afecta tanto por valores extremos.$$,
     $$Solo el mayor dato.$$,
     $$La primera fila de la tabla.$$ 
   ),
   0,
   $$La mediana describe la posición central y resiste mejor los extremos que el promedio.$$,
   jsonb_build_array(
     $$Correcta: elige una medida robusta.$$,
     $$Incorrecta: un solo dato no resume la distribución.$$,
     $$Incorrecta: la primera fila no es una medida estadística.$$
   )),
  (9, 'banco-matematicas-probability', '161-180', 'Matemáticas: probabilidad',
   $$En la ruta de Matemáticas, caso %s, el grupo analiza experiencias aleatorias simples.$$,
   $$¿Qué describe mejor un evento probable?$$,
   jsonb_build_array(
     $$Un suceso que puede ocurrir y cuya posibilidad puede estimarse.$$,
     $$Un hecho absolutamente imposible en cualquier situación.$$,
     $$Una certeza que no depende del experimento.$$ 
   ),
   0,
   $$La probabilidad permite cuantificar la posibilidad de ocurrencia de un evento.$$,
   jsonb_build_array(
     $$Correcta: reconoce la noción de posibilidad.$$,
     $$Incorrecta: un evento probable no es imposible.$$,
     $$Incorrecta: una certeza no requiere cálculo de probabilidad.$$
   )),
  (10, 'banco-matematicas-didactics', '181-200', 'Matemáticas: didáctica y resolución de problemas',
   $$En la ruta de Matemáticas, caso %s, el docente diseña una clase para que los estudiantes argumenten procedimientos y resultados.$$,
   $$¿Qué evidencia muestra mejor comprensión matemática?$$,
   jsonb_build_array(
     $$Que el estudiante explique su procedimiento y verifique el resultado.$$,
     $$Que copie la respuesta de un compañero.$$,
     $$Que use una fórmula sin interpretar el contexto.$$ 
   ),
   0,
   $$La comprensión se observa cuando el estudiante explica, justifica y revisa su solución.$$,
   jsonb_build_array(
     $$Correcta: integra procedimiento y argumentación.$$,
     $$Incorrecta: copiar no evidencia aprendizaje.$$,
     $$Incorrecta: aplicar sin interpretar limita la comprensión.$$
   ))
),
generated_questions as (
  select
    format('banco-quimica-%s-%s', template_no, variant) as external_id,
    'banco-quimica-200' as test_id,
    'Banco de 200 preguntas · Química' as test_title,
    'especificos' as category,
    block_id,
    block_range,
    topic,
    format(situation_template, variant) as situation,
    ((template_no - 1) * 20 + variant) as question_number,
    format(prompt_template, variant) as prompt,
    options_template as options,
    correct_answer,
    explanation_template as explanation,
    feedback_template as option_feedback,
    1 as area_order,
    template_no,
    variant
  from chem_templates
  cross join generate_series(1, 20) as v(variant)

  union all

  select
    format('banco-naturales-%s-%s', template_no, variant) as external_id,
    'banco-naturales-200' as test_id,
    'Banco de 200 preguntas · Ciencias Naturales' as test_title,
    'especificos' as category,
    block_id,
    block_range,
    topic,
    format(situation_template, variant) as situation,
    ((template_no - 1) * 20 + variant) as question_number,
    format(prompt_template, variant) as prompt,
    options_template as options,
    correct_answer,
    explanation_template as explanation,
    feedback_template as option_feedback,
    2 as area_order,
    template_no,
    variant
  from nat_templates
  cross join generate_series(1, 20) as v(variant)

  union all

  select
    format('banco-matematicas-%s-%s', template_no, variant) as external_id,
    'banco-matematicas-200' as test_id,
    'Banco de 200 preguntas · Matemáticas' as test_title,
    'especificos' as category,
    block_id,
    block_range,
    topic,
    format(situation_template, variant) as situation,
    ((template_no - 1) * 20 + variant) as question_number,
    format(prompt_template, variant) as prompt,
    options_template as options,
    correct_answer,
    explanation_template as explanation,
    feedback_template as option_feedback,
    3 as area_order,
    template_no,
    variant
  from math_templates
  cross join generate_series(1, 20) as v(variant)
),
ordered_questions as (
  select
    *,
    row_number() over (order by area_order, template_no, variant) as rn
  from generated_questions
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
  base_sequence.value + rn,
  true
from ordered_questions
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
