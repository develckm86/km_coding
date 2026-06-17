var e=`<!-- 원본: python_advanced_chapter_13_book.md / 세부 장: 13-4 -->

# 13.4 JSON 처리 심화

## JSON은 데이터 교환 형식이다

JSON은 key-value 구조를 가진 텍스트 기반 데이터 형식이다. 파이썬의 딕셔너리와 비슷하게 생겼지만 완전히 같은 것은 아니다.

\`\`\`json
{
  "name": "Alice",
  "age": 30,
  "active": true
}
\`\`\`

파이썬 딕셔너리에서는 불리언 값이 \`True\`, \`False\`지만 JSON에서는 \`true\`, \`false\`다. 값이 없음을 나타내는 것도 파이썬은 \`None\`, JSON은 \`null\`이다.

| JSON | Python |
|---|---|
| object | dict |
| array | list |
| string | str |
| number | int 또는 float |
| true | True |
| false | False |
| null | None |

## \`loads()\`와 \`dumps()\`

문자열 형태의 JSON을 파이썬 객체로 바꿀 때는 \`json.loads()\`를 사용한다.

\`\`\`python
import json

text = '{"name": "Alice", "age": 30}'
data = json.loads(text)

print(data["name"])
\`\`\`

파이썬 객체를 JSON 문자열로 바꿀 때는 \`json.dumps()\`를 사용한다.

\`\`\`python
import json

data = {
    "name": "Alice",
    "age": 30,
    "skills": ["Python", "SQL"],
}

text = json.dumps(data, ensure_ascii=False, indent=2)
print(text)
\`\`\`

\`ensure_ascii=False\`는 한글을 사람이 읽을 수 있는 형태로 저장할 때 자주 사용한다.

\`\`\`python
import json

data = {"message": "안녕하세요"}

print(json.dumps(data))
print(json.dumps(data, ensure_ascii=False))
\`\`\`

첫 번째는 한글이 유니코드 이스케이프 형태로 보일 수 있고, 두 번째는 한글 그대로 보인다.

## \`load()\`와 \`dump()\`

파일에서 JSON을 읽을 때는 \`json.load()\`를 사용한다.

\`\`\`python
import json

with open("config.json", "r", encoding="utf-8") as file:
    config = json.load(file)

print(config)
\`\`\`

파일에 JSON을 저장할 때는 \`json.dump()\`를 사용한다.

\`\`\`python
import json

config = {
    "input_path": "data/input.csv",
    "output_path": "data/output.csv",
    "encoding": "utf-8",
}

with open("config.json", "w", encoding="utf-8") as file:
    json.dump(config, file, ensure_ascii=False, indent=2)
\`\`\`

JSON은 텍스트 형식이다. 따라서 보통 파일을 텍스트 모드로 열고 인코딩을 지정한다.

## 중첩 JSON 접근하기

API 응답은 단순한 딕셔너리보다 복잡한 구조인 경우가 많다.

\`\`\`python
response = {
    "status": "success",
    "data": {
        "users": [
            {"id": 1, "name": "Alice", "score": 90},
            {"id": 2, "name": "Bob", "score": 85},
        ]
    }
}
\`\`\`

사용자 목록을 꺼내려면 다음처럼 접근한다.

\`\`\`python
users = response["data"]["users"]

for user in users:
    print(user["name"], user["score"])
\`\`\`

하지만 실무에서는 key가 없을 수도 있다. 무조건 대괄호로 접근하면 \`KeyError\`가 발생할 수 있다.

\`\`\`python
users = response.get("data", {}).get("users", [])

for user in users:
    print(user.get("name"), user.get("score"))
\`\`\`

\`get()\`을 사용하면 기본값을 지정할 수 있어 안전하다. 다만 기본값으로 문제를 숨기는 경우도 있으므로, 필수 데이터가 없다면 명확히 예외를 발생시키는 편이 더 나을 수 있다.

## 필수 key 검증하기

API 응답이나 설정 파일에서는 반드시 있어야 하는 key가 있다.

\`\`\`python
def require_keys(data: dict, required_keys: set[str]) -> None:
    missing_keys = required_keys - set(data)

    if missing_keys:
        raise ValueError(f"필수 key가 없습니다: {sorted(missing_keys)}")

user = {"id": 1, "name": "Alice"}
require_keys(user, {"id", "name", "email"})
\`\`\`

이 함수는 \`email\` key가 없으면 예외를 발생시킨다. 데이터 분석 전처리에서는 이렇게 초기에 문제를 발견하는 것이 좋다.

## 여러 JSON 객체를 한 파일에 저장할 때 주의할 점

다음 코드는 언뜻 보면 여러 JSON 객체를 파일에 저장하는 것처럼 보인다.

\`\`\`python
import json

rows = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"},
]

with open("users.json", "w", encoding="utf-8") as file:
    for row in rows:
        json.dump(row, file, ensure_ascii=False)
\`\`\`

하지만 이렇게 저장하면 올바른 JSON 파일이 아니다.

\`\`\`json
{"id": 1, "name": "Alice"}{"id": 2, "name": "Bob"}
\`\`\`

JSON 문서 하나 안에 객체가 여러 개 이어 붙어 있기 때문이다. 여러 객체를 저장하려면 보통 두 가지 방법 중 하나를 선택한다.

첫 번째는 리스트 하나로 감싸 저장하는 것이다.

\`\`\`python
with open("users.json", "w", encoding="utf-8") as file:
    json.dump(rows, file, ensure_ascii=False, indent=2)
\`\`\`

두 번째는 JSON Lines 형식으로 저장하는 것이다.

## JSON Lines

JSON Lines는 한 줄에 JSON 객체 하나를 저장하는 방식이다.

\`\`\`text
{"id": 1, "name": "Alice"}
{"id": 2, "name": "Bob"}
{"id": 3, "name": "Charlie"}
\`\`\`

확장자는 관례적으로 \`.jsonl\`을 많이 사용한다. JSON Lines는 대용량 데이터나 API 응답 누적 저장에 유용하다. 전체 파일을 하나의 JSON 리스트로 만들지 않아도 되기 때문이다.

저장 예시는 다음과 같다.

\`\`\`python
import json

rows = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"},
]

with open("users.jsonl", "w", encoding="utf-8") as file:
    for row in rows:
        line = json.dumps(row, ensure_ascii=False)
        file.write(line + "\\n")
\`\`\`

읽을 때는 한 줄씩 읽고 \`json.loads()\`를 적용한다.

\`\`\`python
import json

with open("users.jsonl", "r", encoding="utf-8") as file:
    for line in file:
        row = json.loads(line)
        print(row["id"], row["name"])
\`\`\`

## 잘못된 JSON Lines 처리하기

실무에서는 일부 줄만 JSON 형식이 잘못되어 있을 수 있다.

\`\`\`python
import json

valid_rows = []
invalid_rows = []

with open("events.jsonl", "r", encoding="utf-8") as file:
    for line_number, line in enumerate(file, start=1):
        line = line.strip()

        if not line:
            continue

        try:
            row = json.loads(line)
        except json.JSONDecodeError as error:
            invalid_rows.append({
                "line": line_number,
                "content": line,
                "error": str(error),
            })
            continue

        valid_rows.append(row)

print(f"정상 JSON: {len(valid_rows)}")
print(f"잘못된 JSON: {len(invalid_rows)}")
\`\`\`

전체 파일을 포기하지 않고 실패한 줄을 따로 기록하는 방식이다.

## JSON Lines를 CSV로 변환하기

데이터분석 전에 JSON Lines를 CSV로 변환해야 하는 경우가 있다.

\`\`\`python
import csv
import json
from pathlib import Path

input_path = Path("users.jsonl")
output_path = Path("users.csv")

fieldnames = ["id", "name", "score"]

with input_path.open("r", encoding="utf-8") as src, \\
     output_path.open("w", encoding="utf-8", newline="") as dst:
    writer = csv.DictWriter(dst, fieldnames=fieldnames)
    writer.writeheader()

    for line in src:
        row = json.loads(line)
        writer.writerow({
            "id": row.get("id"),
            "name": row.get("name"),
            "score": row.get("score"),
        })
\`\`\`

이 예제는 API 수집 데이터에서 필요한 컬럼만 선택해 분석 가능한 CSV로 저장하는 전형적인 전처리 패턴이다.

---
`;export{e as default};