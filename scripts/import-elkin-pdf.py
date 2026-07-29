import json
import re
import sys
from pathlib import Path

from pypdf import PdfReader


SOURCE_RANGES = (
    (1, 2, 12, "pedagogica", "Convivencia escolar y rutas de atencion"),
    (2, 12, 25, "pedagogica", "Inclusion educativa y evaluacion"),
    (3, 25, 38, "pedagogica", "Competencias comportamentales docentes"),
    (4, 38, 52, "razonamiento", "Razonamiento cuantitativo y lectura critica"),
)

ANSWER_RANGES = (
    (1, 53, 59),
    (2, 60, 66),
    (3, 67, 73),
    (4, 74, 80),
)


def clean_page(text, page_number):
    lines = []
    for line in text.replace("\r", "").splitlines():
        stripped = line.strip()
        if not stripped or stripped == str(page_number) or stripped == "El Profe Elkin.":
            continue
        lines.append(stripped)
    return " ".join(lines)


def page_range(reader, start, end):
    return " ".join(
        clean_page(reader.pages[index].extract_text() or "", index + 1)
        for index in range(start, end + 1)
    )


def normalize(value):
    return re.sub(r"\s+", " ", value).strip()


def parse_source_block(text, block_number):
    next_heading = f"Situación {block_number + 1}."
    if next_heading in text:
        text = text.split(next_heading, 1)[0]

    first_question = re.search(r"\bPregunta\s+1\b", text)
    if not first_question:
        raise ValueError(f"No se encontro la primera pregunta del bloque {block_number}.")

    situation = normalize(text[: first_question.start()])
    situation = re.sub(
        r"A partir de esta situación, responda las preguntas 1 a 25\.\s*$",
        "",
        situation,
    ).strip()

    raw_questions = re.findall(
        r"\bPregunta\s+(\d+)\s+(.*?)(?=\bPregunta\s+\d+\s+|$)",
        text[first_question.start() :],
    )
    questions = {}
    for raw_number, body in raw_questions:
        number = int(raw_number)
        match = re.match(
            r"(.*?)\s+A\.\s+(.*?)\s+B\.\s+(.*?)\s+C\.\s+(.*)$",
            normalize(body),
        )
        if not match:
            raise ValueError(
                f"No se pudieron separar las opciones del bloque {block_number}, pregunta {number}."
            )
        questions[number] = {
            "prompt": normalize(match.group(1)),
            "options": [normalize(match.group(index)) for index in range(2, 5)],
        }

    if sorted(questions) != list(range(1, 26)):
        raise ValueError(
            f"El bloque {block_number} contiene {len(questions)} preguntas en lugar de 25."
        )
    return situation, questions


def parse_answer_block(text, block_number):
    raw_answers = re.findall(
        r"\bPregunta\s+(\d+)\s+(.*?)(?=\bPregunta\s+\d+\s+|$)",
        text,
    )
    answers = {}
    for raw_number, body in raw_answers:
        number = int(raw_number)
        normalized = normalize(body)
        key_match = re.search(r"Respuesta correcta:\s*([ABC])", normalized)
        feedback_match = re.search(
            r"Opción A\.\s+(?:Correcta|Incorrecta)\.\s+(.*?)\s+"
            r"Opción B\.\s+(?:Correcta|Incorrecta)\.\s+(.*?)\s+"
            r"Opción C\.\s+(?:Correcta|Incorrecta)\.\s+(.*)$",
            normalized,
        )
        if not key_match or not feedback_match:
            raise ValueError(
                f"No se pudo leer la clave del bloque {block_number}, pregunta {number}."
            )
        correct_answer = ord(key_match.group(1)) - ord("A")
        feedback = [normalize(feedback_match.group(index)) for index in range(1, 4)]
        answers[number] = {
            "correct_answer": correct_answer,
            "explanation": feedback[correct_answer],
            "option_feedback": feedback,
        }

    if sorted(answers) != list(range(1, 26)):
        raise ValueError(
            f"El bloque {block_number} contiene {len(answers)} respuestas en lugar de 25."
        )
    return answers


def sql_text(value):
    return "'" + value.replace("'", "''") + "'"


def sql_json(value):
    return f"{sql_text(json.dumps(value, ensure_ascii=False))}::jsonb"


def build_migration(blocks):
    block_rows = []
    question_rows = []
    category_positions = {"pedagogica": 0, "razonamiento": 0}

    for block in blocks:
        block_rows.append(
            "("
            + ", ".join(
                [
                    sql_text(block["id"]),
                    sql_text(block["range"]),
                    sql_text(block["category"]),
                    sql_text(block["topic"]),
                    sql_text(block["situation"]),
                ]
            )
            + ")"
        )
        for number in range(1, 26):
            question = block["questions"][number]
            category_positions[block["category"]] += 1
            global_number = ((block["number"] - 1) * 25) + number
            question_rows.append(
                "("
                + ", ".join(
                    [
                        sql_text(block["id"]),
                        str(category_positions[block["category"]]),
                        sql_text(f"elkin-s{block['number']}-q{number}"),
                        str(global_number),
                        sql_text(question["prompt"]),
                        sql_json(question["options"]),
                        str(question["correct_answer"]),
                        sql_text(question["explanation"]),
                        sql_json(question["option_feedback"]),
                    ]
                )
                + ")"
            )

    return f"""with base_sequences as (
  select category, coalesce(max(sequence), 0) as value
  from public.quiz_questions
  where category in ('pedagogica', 'razonamiento')
  group by category
),
blocks (block_id, block_range, category, topic, situation) as (
  values
    {",\n    ".join(block_rows)}
),
new_questions (
  block_id,
  category_position,
  external_id,
  question_number,
  prompt,
  options,
  correct_answer,
  explanation,
  option_feedback
) as (
  values
    {",\n    ".join(question_rows)}
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
  'elkin-simulacro-100',
  'Simulacro de 100 preguntas - El Profe Elkin',
  blocks.category,
  blocks.block_id,
  blocks.block_range,
  blocks.topic,
  blocks.situation,
  new_questions.question_number,
  new_questions.prompt,
  new_questions.options,
  new_questions.correct_answer,
  new_questions.explanation,
  new_questions.option_feedback,
  coalesce(base_sequences.value, 0) + new_questions.category_position,
  true
from new_questions
join blocks using (block_id)
left join base_sequences using (category)
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
"""


def main():
    if len(sys.argv) != 3:
        raise SystemExit(
            "Uso: python scripts/import-elkin-pdf.py <archivo.pdf> <migracion.sql>"
        )

    source = Path(sys.argv[1])
    destination = Path(sys.argv[2])
    reader = PdfReader(source)
    if len(reader.pages) != 83:
        raise ValueError(f"Se esperaban 83 paginas y se encontraron {len(reader.pages)}.")

    answers_by_block = {
        block_number: parse_answer_block(
            page_range(reader, start, end),
            block_number,
        )
        for block_number, start, end in ANSWER_RANGES
    }

    blocks = []
    for block_number, start, end, category, topic in SOURCE_RANGES:
        situation, questions = parse_source_block(
            page_range(reader, start, end),
            block_number,
        )
        for number in range(1, 26):
            questions[number].update(answers_by_block[block_number][number])
            question = questions[number]
            fields = [
                question["prompt"],
                question["explanation"],
                *question["options"],
                *question["option_feedback"],
            ]
            if any("\ufffd" in field for field in fields):
                raise ValueError(
                    f"Se detecto un caracter danado en el bloque {block_number}, pregunta {number}."
                )
            if len(question["prompt"]) < 30 or any(
                len(option) < 5 for option in question["options"]
            ):
                raise ValueError(
                    f"Contenido incompleto en el bloque {block_number}, pregunta {number}."
                )
            if question["correct_answer"] not in (0, 1, 2):
                raise ValueError(
                    f"Respuesta invalida en el bloque {block_number}, pregunta {number}."
                )
        if len(situation) < 500 or "\ufffd" in situation:
            raise ValueError(f"Situacion incompleta o danada en el bloque {block_number}.")
        blocks.append(
            {
                "number": block_number,
                "id": f"elkin-situacion-{block_number}",
                "range": f"{((block_number - 1) * 25) + 1}-{block_number * 25}",
                "category": category,
                "topic": topic,
                "situation": situation,
                "questions": questions,
            }
        )

    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(build_migration(blocks), encoding="utf-8")
    print(
        "Importacion validada: 100 preguntas, "
        "75 pedagogicas y 25 de razonamiento."
    )


if __name__ == "__main__":
    main()
