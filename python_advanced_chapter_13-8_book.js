var e=`<!-- 원본: python_advanced_chapter_13_book.md / 세부 장: 13-8 -->

# 13.8 종합 실습: 원천 데이터 전처리 도구 만들기

## 실습 목표

이번 종합 실습에서는 다음 기능을 가진 전처리 도구를 만든다.

- 입력 폴더에서 CSV 파일을 찾는다.
- 필수 컬럼이 있는지 확인한다.
- 금액 컬럼의 쉼표를 제거한다.
- 빈 값이 있는 행은 오류 파일에 기록한다.
- 정상 행은 하나의 CSV 파일로 저장한다.
- 처리 결과 요약을 JSON 파일로 저장한다.

이 실습은 데이터분석 전에 원천 데이터를 정리하는 흐름을 보여준다.

## 예제 폴더 구조

\`\`\`text
project/
  raw/
    orders_2026_01.csv
    orders_2026_02.csv
  processed/
  logs/
  preprocess_orders.py
\`\`\`

## 전체 코드

\`\`\`python
import csv
import json
from pathlib import Path

REQUIRED_COLUMNS = ["order_id", "customer_id", "amount", "order_date"]


def clean_amount(value: str) -> str:
    return value.strip().replace(",", "")


def validate_row(row: dict, line_number: int, file_name: str) -> list[str]:
    errors = []

    for column in REQUIRED_COLUMNS:
        if not row.get(column, "").strip():
            errors.append(f"{file_name}:{line_number} - {column} 값이 비어 있습니다.")

    amount = clean_amount(row.get("amount", ""))

    if amount and not amount.isdigit():
        errors.append(f"{file_name}:{line_number} - amount가 숫자가 아닙니다: {row.get('amount')}")

    return errors


def process_csv_file(path: Path):
    valid_rows = []
    error_messages = []

    with path.open("r", encoding="utf-8", newline="") as file:
        reader = csv.DictReader(file)
        fieldnames = reader.fieldnames or []

        missing_columns = set(REQUIRED_COLUMNS) - set(fieldnames)

        if missing_columns:
            error_messages.append(f"{path.name} - 필수 컬럼 누락: {sorted(missing_columns)}")
            return valid_rows, error_messages

        for line_number, row in enumerate(reader, start=2):
            row_errors = validate_row(row, line_number, path.name)

            if row_errors:
                error_messages.extend(row_errors)
                continue

            valid_rows.append({
                "order_id": row["order_id"].strip(),
                "customer_id": row["customer_id"].strip(),
                "amount": clean_amount(row["amount"]),
                "order_date": row["order_date"].strip(),
            })

    return valid_rows, error_messages


def write_csv(path: Path, rows: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)

    with path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=REQUIRED_COLUMNS)
        writer.writeheader()
        writer.writerows(rows)


def write_text(path: Path, lines: list[str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)

    with path.open("w", encoding="utf-8") as file:
        for line in lines:
            file.write(line + "\\n")


def write_json(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)

    with path.open("w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=2)


def main() -> None:
    input_dir = Path("raw")
    output_path = Path("processed/orders_cleaned.csv")
    error_path = Path("logs/preprocess_errors.log")
    summary_path = Path("processed/summary.json")

    all_valid_rows = []
    all_errors = []
    file_count = 0

    for csv_path in input_dir.glob("*.csv"):
        file_count += 1
        valid_rows, error_messages = process_csv_file(csv_path)
        all_valid_rows.extend(valid_rows)
        all_errors.extend(error_messages)

    write_csv(output_path, all_valid_rows)
    write_text(error_path, all_errors)

    summary = {
        "file_count": file_count,
        "valid_row_count": len(all_valid_rows),
        "error_count": len(all_errors),
        "output_file": str(output_path),
        "error_file": str(error_path),
    }

    write_json(summary_path, summary)

    print("전처리가 완료되었습니다.")
    print(f"정상 행 수: {len(all_valid_rows)}")
    print(f"오류 수: {len(all_errors)}")


if __name__ == "__main__":
    main()
\`\`\`

## 코드 구조 해설

이 코드는 하나의 함수가 너무 많은 일을 하지 않도록 나누어져 있다.

| 함수 | 역할 |
|---|---|
| \`clean_amount()\` | 금액 문자열 정리 |
| \`validate_row()\` | 행 단위 검증 |
| \`process_csv_file()\` | CSV 파일 하나 처리 |
| \`write_csv()\` | 정상 결과 CSV 저장 |
| \`write_text()\` | 오류 로그 저장 |
| \`write_json()\` | 요약 JSON 저장 |
| \`main()\` | 전체 실행 흐름 관리 |

이 구조는 테스트하기도 쉽다. 예를 들어 \`clean_amount()\`와 \`validate_row()\`는 파일 없이도 테스트할 수 있다.

## 개선할 수 있는 부분

이 실습 코드는 학습용으로 단순화되어 있다. 실제 실무 도구로 확장하려면 다음을 추가할 수 있다.

- 명령행 인수로 입력 폴더와 출력 파일 받기
- \`logging\`으로 실행 로그 남기기
- 인코딩을 설정값으로 분리하기
- \`pytest\`로 함수별 테스트 작성하기
- 잘못된 행 전체를 별도 CSV로 저장하기
- 처리 시간을 측정하기
- gzip 파일도 입력으로 받기
- 중복 주문 번호 검사하기

고급 파이썬 과정의 앞 장에서 배운 내용을 모두 연결할 수 있는 좋은 연습이 된다.

---

# 13장 핵심 정리

## 텍스트와 바이너리

- 파일은 내부적으로 바이트로 저장된다.
- 텍스트 모드는 바이트를 문자열로 디코딩해서 다룬다.
- 바이너리 모드는 \`bytes\`를 그대로 다룬다.
- 텍스트 파일은 \`encoding\`을 명확히 지정하는 것이 좋다.
- 이미지, PDF, 압축 파일은 바이너리 모드로 다루는 것이 안전하다.

## 대용량 파일 처리

- 큰 파일은 \`read()\`로 한 번에 읽지 않는 것이 좋다.
- 텍스트 파일은 한 줄씩 처리할 수 있다.
- 바이너리 파일은 청크 단위로 처리할 수 있다.
- 제너레이터를 사용하면 메모리 효율적인 데이터 흐름을 만들 수 있다.
- 정상 데이터와 실패 데이터를 분리해서 기록하는 습관이 중요하다.

## CSV 처리

- CSV를 직접 \`split(",")\`으로 처리하면 위험하다.
- \`csv.reader\`, \`csv.DictReader\`, \`csv.DictWriter\`를 사용한다.
- CSV 파일을 열 때는 보통 \`newline=""\`를 함께 사용한다.
- 숫자, 날짜, 금액은 문자열로 읽히므로 명시적으로 변환해야 한다.
- 데이터분석 전에 필수 컬럼과 잘못된 행을 검증하는 것이 좋다.

## JSON 처리

- JSON은 텍스트 기반 데이터 교환 형식이다.
- \`loads()\`와 \`dumps()\`는 문자열 변환에 사용한다.
- \`load()\`와 \`dump()\`는 파일 입출력에 사용한다.
- 여러 JSON 객체를 이어서 저장하면 올바른 JSON 파일이 아니다.
- 여러 객체를 줄 단위로 저장하려면 JSON Lines 형식을 사용할 수 있다.

## 압축 파일 처리

- gzip은 주로 단일 파일 압축에 사용한다.
- zip은 여러 파일을 묶고 압축하는 데 사용한다.
- gzip 파일은 \`gzip.open()\`으로 텍스트처럼 읽고 쓸 수 있다.
- zip 파일 내부의 파일은 압축 해제 없이 읽을 수 있다.
- 신뢰할 수 없는 zip 파일은 압축 해제 경로를 검사해야 한다.

## 경로와 파일 시스템

- 문자열 경로보다 \`pathlib.Path\`를 사용하면 코드가 읽기 쉽다.
- \`glob()\`와 \`rglob()\`로 파일을 검색할 수 있다.
- \`shutil\`은 파일 복사와 이동에 유용하다.
- \`tempfile\`은 임시 파일과 임시 폴더를 안전하게 만들 수 있다.
- 중요한 파일은 임시 파일에 먼저 저장한 뒤 교체하는 방식이 안전하다.

---

# 연습문제

## 문제 1. 텍스트 모드와 바이너리 모드

다음 중 바이너리 모드로 여는 것이 가장 적절한 파일을 모두 고르시오.

1. \`report.txt\`
2. \`customers.csv\`
3. \`image.png\`
4. \`archive.zip\`
5. \`config.json\`

## 문제 2. 대용량 파일 처리

다음 코드는 큰 로그 파일을 읽는 코드다. 어떤 문제가 생길 수 있는지 설명하시오.

\`\`\`python
with open("server.log", "r", encoding="utf-8") as file:
    content = file.read()

for line in content.splitlines():
    if "ERROR" in line:
        print(line)
\`\`\`

## 문제 3. 한 줄씩 읽기

\`server.log\` 파일에서 \`WARNING\`이 포함된 줄만 \`warnings.log\` 파일에 저장하는 코드를 작성하시오.

## 문제 4. CSV 처리

다음처럼 CSV를 처리하는 방식이 위험한 이유를 설명하시오.

\`\`\`python
line = 'Alice,"Seoul, Korea",30'
columns = line.split(",")
\`\`\`

## 문제 5. \`DictReader\`

\`customers.csv\` 파일에는 \`name\`, \`email\`, \`age\` 컬럼이 있다. 이 파일을 읽어서 나이가 30 이상인 고객의 이름과 이메일만 출력하는 코드를 작성하시오.

## 문제 6. CSV 필수 컬럼 검증

CSV 파일에 \`order_id\`, \`amount\`, \`order_date\` 컬럼이 모두 있는지 확인하는 함수를 작성하시오. 누락된 컬럼이 있으면 누락 컬럼 목록을 반환하시오.

## 문제 7. JSON과 Python 값

다음 JSON 값에 대응하는 파이썬 값을 쓰시오.

| JSON | Python |
|---|---|
| \`true\` | ? |
| \`false\` | ? |
| \`null\` | ? |
| object | ? |
| array | ? |

## 문제 8. JSON Lines 저장

다음 리스트를 \`users.jsonl\` 파일에 JSON Lines 형식으로 저장하는 코드를 작성하시오.

\`\`\`python
users = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"},
]
\`\`\`

## 문제 9. gzip 파일 읽기

\`server.log.gz\` 파일에서 \`ERROR\`가 포함된 줄만 출력하는 코드를 작성하시오.

## 문제 10. zip 내부 CSV 읽기

\`data.zip\` 파일 안에 \`customers.csv\`가 들어 있다. 압축을 풀지 않고 CSV를 읽어 각 행을 출력하는 코드를 작성하시오.

## 문제 11. \`pathlib\`

다음 경로에서 파일명, 확장자, 부모 폴더를 출력하는 코드를 작성하시오.

\`\`\`python
path = "data/raw/orders_2026_01.csv"
\`\`\`

## 문제 12. 임시 폴더

\`tempfile.TemporaryDirectory()\`를 사용하면 어떤 장점이 있는지 설명하시오.

## 문제 13. 원자적 저장

결과 파일을 직접 덮어쓰는 대신 임시 파일에 먼저 저장한 뒤 교체하는 방식이 유용한 이유를 설명하시오.

## 문제 14. 종합 문제

입력 폴더 \`raw_logs\` 안의 모든 \`.log\` 파일을 읽고, \`ERROR\`가 포함된 줄만 \`processed/errors.log\`에 저장하는 프로그램을 작성하시오. 하위 폴더까지 검색해야 한다.

---

# 정답 및 해설

## 문제 1 정답

정답은 3번과 4번이다.

\`image.png\`는 이미지 파일이므로 바이너리 모드가 적절하다. \`archive.zip\`은 압축 파일이므로 바이너리 데이터로 다루어야 한다.

\`report.txt\`, \`customers.csv\`, \`config.json\`은 텍스트 기반 파일이므로 보통 텍스트 모드로 열고 인코딩을 지정한다.

## 문제 2 정답

\`file.read()\`는 파일 전체를 한 번에 메모리에 올린다. 로그 파일이 매우 크면 메모리를 많이 사용하거나 프로그램이 느려질 수 있다. 이런 경우에는 파일 객체를 반복하면서 한 줄씩 처리하는 방식이 더 안전하다.

개선 예시는 다음과 같다.

\`\`\`python
with open("server.log", "r", encoding="utf-8") as file:
    for line in file:
        if "ERROR" in line:
            print(line.strip())
\`\`\`

## 문제 3 정답

\`\`\`python
with open("server.log", "r", encoding="utf-8") as src, \\
     open("warnings.log", "w", encoding="utf-8") as dst:
    for line in src:
        if "WARNING" in line:
            dst.write(line)
\`\`\`

파일을 한 줄씩 읽고, 조건에 맞는 줄만 결과 파일에 바로 저장한다.

## 문제 4 정답

CSV 값 안에 쉼표가 포함될 수 있기 때문이다. 예제의 \`"Seoul, Korea"\`는 하나의 값이지만 \`split(",")\`을 사용하면 두 개의 값처럼 나뉜다. CSV는 따옴표와 구분자 규칙을 처리해야 하므로 \`csv.reader\`를 사용하는 것이 안전하다.

## 문제 5 정답

\`\`\`python
import csv

with open("customers.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.DictReader(file)

    for row in reader:
        age = int(row["age"])

        if age >= 30:
            print(row["name"], row["email"])
\`\`\`

CSV에서 읽은 값은 문자열이므로 \`age\`는 \`int()\`로 변환해야 한다.

## 문제 6 정답

\`\`\`python
import csv
from pathlib import Path


def check_required_columns(path: Path) -> list[str]:
    required_columns = {"order_id", "amount", "order_date"}

    with path.open("r", encoding="utf-8", newline="") as file:
        reader = csv.DictReader(file)
        fieldnames = set(reader.fieldnames or [])

    missing_columns = required_columns - fieldnames
    return sorted(missing_columns)
\`\`\`

사용 예시는 다음과 같다.

\`\`\`python
missing = check_required_columns(Path("orders.csv"))

if missing:
    print("누락 컬럼:", missing)
else:
    print("필수 컬럼이 모두 있습니다.")
\`\`\`

## 문제 7 정답

| JSON | Python |
|---|---|
| \`true\` | \`True\` |
| \`false\` | \`False\` |
| \`null\` | \`None\` |
| object | \`dict\` |
| array | \`list\` |

## 문제 8 정답

\`\`\`python
import json

users = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"},
]

with open("users.jsonl", "w", encoding="utf-8") as file:
    for user in users:
        file.write(json.dumps(user, ensure_ascii=False) + "\\n")
\`\`\`

한 줄에 JSON 객체 하나씩 저장하는 방식이다.

## 문제 9 정답

\`\`\`python
import gzip

with gzip.open("server.log.gz", "rt", encoding="utf-8") as file:
    for line in file:
        if "ERROR" in line:
            print(line.strip())
\`\`\`

\`rt\`는 gzip 파일을 텍스트 읽기 모드로 여는 방식이다.

## 문제 10 정답

\`\`\`python
import csv
import io
from zipfile import ZipFile

with ZipFile("data.zip", "r") as archive:
    with archive.open("customers.csv", "r") as raw_file:
        text_file = io.TextIOWrapper(raw_file, encoding="utf-8", newline="")
        reader = csv.DictReader(text_file)

        for row in reader:
            print(row)
\`\`\`

\`archive.open()\`으로 얻은 파일은 바이너리 파일 객체이므로 \`TextIOWrapper\`로 감싸 텍스트로 읽는다.

## 문제 11 정답

\`\`\`python
from pathlib import Path

path = Path("data/raw/orders_2026_01.csv")

print(path.name)
print(path.suffix)
print(path.parent)
\`\`\`

출력 예시는 다음과 같다.

\`\`\`text
orders_2026_01.csv
.csv
data/raw
\`\`\`

## 문제 12 정답

\`TemporaryDirectory()\`는 임시 폴더를 만들고, \`with\` 블록이 끝나면 자동으로 정리해 준다. 테스트나 중간 처리 작업에서 불필요한 파일이 남는 문제를 줄일 수 있고, 직접 임시 폴더 이름을 만들 필요가 없어 더 안전하다.

## 문제 13 정답

결과 파일을 직접 덮어쓰는 도중 프로그램이 중단되면 파일이 깨질 수 있다. 임시 파일에 먼저 저장하고 저장이 끝난 뒤 최종 파일명으로 교체하면, 기존 파일이 손상될 가능성을 줄일 수 있다. 설정 파일이나 중요한 결과 파일을 저장할 때 유용하다.

## 문제 14 정답

\`\`\`python
from pathlib import Path

input_dir = Path("raw_logs")
output_path = Path("processed/errors.log")
output_path.parent.mkdir(parents=True, exist_ok=True)

with output_path.open("w", encoding="utf-8") as output_file:
    for log_path in input_dir.rglob("*.log"):
        with log_path.open("r", encoding="utf-8") as input_file:
            for line in input_file:
                if "ERROR" in line:
                    output_file.write(f"[{log_path}] {line}")
\`\`\`

\`rglob("*.log")\`를 사용했기 때문에 하위 폴더의 \`.log\` 파일까지 검색한다.

---

# 참고 문서

- Python 공식 문서: Input and Output  
  https://docs.python.org/3/tutorial/inputoutput.html
- Python 공식 문서: \`csv\` — CSV File Reading and Writing  
  https://docs.python.org/3/library/csv.html
- Python 공식 문서: \`json\` — JSON encoder and decoder  
  https://docs.python.org/3/library/json.html
- Python 공식 문서: \`pathlib\` — Object-oriented filesystem paths  
  https://docs.python.org/3/library/pathlib.html
- Python 공식 문서: \`shutil\` — High-level file operations  
  https://docs.python.org/3/library/shutil.html
- Python 공식 문서: \`tempfile\` — Generate temporary files and directories  
  https://docs.python.org/3/library/tempfile.html
- Python 공식 문서: \`gzip\` — Support for gzip files  
  https://docs.python.org/3/library/gzip.html
- Python 공식 문서: \`zipfile\` — Work with ZIP archives  
  https://docs.python.org/3/library/zipfile.html
`;export{e as default};