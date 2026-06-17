var e=`<!-- 원본: python_advanced_chapter_20_book.md / 세부 장: 20-9 -->

# 20.9 정답 및 해설

종합 실습의 정답은 하나로 고정되지 않는다. 실무 프로그램은 같은 요구사항도 여러 구조로 구현할 수 있다. 여기서는 핵심 아이디어와 참고 구현을 제시한다.

## 과제 1 해설

핵심은 파일 처리와 검증 로직을 분리하는 것이다.

\`\`\`python
def validate_row(row, required_columns, numeric_columns):
    errors = []

    for column in required_columns:
        if row.get(column, "").strip() == "":
            errors.append(f"필수값 누락: {column}")

    for column in numeric_columns:
        value = row.get(column, "").replace(",", "")
        if value.strip() == "":
            continue
        try:
            float(value)
        except ValueError:
            errors.append(f"숫자 변환 실패: {column}")

    return errors
\`\`\`

이 함수는 파일을 열지 않는다. 따라서 테스트에서 딕셔너리 하나만 넘기면 검증할 수 있다.

## 과제 2 해설

JSON Lines 저장의 핵심은 “리스트 전체를 하나의 JSON으로 저장하지 않는 것”이다.

\`\`\`python
import json
from pathlib import Path


def write_jsonl(path, items):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)

    count = 0
    with path.open("w", encoding="utf-8") as file:
        for item in items:
            file.write(json.dumps(item, ensure_ascii=False) + "\\n")
            count += 1

    return count
\`\`\`

JSON Lines는 이후 한 줄씩 읽기 쉽기 때문에 데이터 수집 결과 저장 형식으로 유용하다.

## 과제 3 해설

정규표현식은 먼저 한 줄 파싱 함수로 분리한다.

\`\`\`python
import re

pattern = re.compile(
    r'^(?P<timestamp>\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) '
    r'ERROR user_id=(?P<user_id>\\S+) '
    r'code=(?P<code>\\S+) '
    r'message="(?P<message>.*)"$'
)


def parse_line(line):
    match = pattern.search(line.strip())
    if match is None:
        return None
    return match.groupdict()
\`\`\`

이후 파일을 한 줄씩 읽으며 \`parse_line()\`을 호출하면 된다.

## 과제 4 해설

SQLite 저장에서는 파라미터 바인딩을 사용해야 한다.

\`\`\`python
connection.execute(
    """
    INSERT OR IGNORE INTO products (id, name, price, collected_at)
    VALUES (?, ?, ?, ?)
    """,
    (product_id, name, price, collected_at),
)
\`\`\`

SQL 문자열에 값을 직접 끼워 넣는 방식은 피해야 한다.

\`\`\`python
# 피해야 하는 방식
sql = f"INSERT INTO products VALUES ('{product_id}', '{name}', {price})"
\`\`\`

사용자 입력이나 외부 데이터가 SQL에 직접 들어가면 보안과 안정성 문제가 생길 수 있다.

## 과제 5 해설

하위 명령 구조는 프로그램이 커질 때 유용하다.

\`\`\`python
def run_command(args):
    if args.command == "validate-csv":
        run_validate_csv(args)
    elif args.command == "parse-log":
        run_parse_log(args)
    elif args.command == "import-db":
        run_import_db(args)
    elif args.command == "export-db":
        run_export_db(args)
    else:
        raise ValueError(f"알 수 없는 명령입니다: {args.command}")
\`\`\`

하위 명령이 많아지면 각 명령을 별도 함수로 분리해야 한다. \`main()\` 함수가 너무 길어지면 유지보수하기 어렵다.

---
`;export{e as default};