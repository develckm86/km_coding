var e=`<!-- 원본: python_advanced_chapter_13_book.md / 세부 장: 13-3 -->

# 13.3 CSV 처리 심화

## CSV는 단순한 것처럼 보이지만 단순하지 않다

CSV는 쉼표로 값을 구분한 텍스트 파일이다. 보기에는 단순하지만 실무에서는 여러 문제가 발생한다.

- 구분자가 쉼표가 아니라 탭이나 세미콜론일 수 있다.
- 값 안에 쉼표가 포함될 수 있다.
- 값이 큰따옴표로 감싸져 있을 수 있다.
- 줄바꿈이 값 안에 포함될 수 있다.
- 헤더가 없거나, 헤더 이름이 중복될 수 있다.
- 일부 행의 컬럼 수가 맞지 않을 수 있다.
- 한글 인코딩이 \`utf-8\`이 아닐 수 있다.
- 숫자처럼 보이는 값이 문자열일 수 있다.

그래서 CSV를 직접 \`split(",")\`으로 나누는 방식은 위험하다.

\`\`\`python
line = '"홍길동","서울, 강남",30'
print(line.split(","))
\`\`\`

이 코드는 주소 안의 쉼표까지 구분자로 처리한다. 원하는 결과가 나오지 않는다. CSV는 \`csv\` 모듈로 처리하는 것이 안전하다.

## \`csv.reader\` 기본 구조

\`\`\`python
import csv

with open("customers.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.reader(file)

    for row in reader:
        print(row)
\`\`\`

\`csv.reader\`는 각 행을 리스트로 반환한다.

\`\`\`text
['name', 'email', 'age']
['Alice', 'alice@example.com', '30']
['Bob', 'bob@example.com', '25']
\`\`\`

CSV에서 읽은 값은 기본적으로 문자열이다. 나이, 금액, 수량처럼 숫자로 다뤄야 하는 값은 직접 변환해야 한다.

\`\`\`python
age = int(row[2])
\`\`\`

## \`newline=""\`를 사용하는 이유

CSV 파일을 열 때는 다음처럼 \`newline=""\`를 함께 쓰는 것이 좋다.

\`\`\`python
with open("customers.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.reader(file)
\`\`\`

특히 Windows 환경에서 CSV를 쓸 때 빈 줄이 추가되는 문제를 방지하는 데 도움이 된다. CSV 모듈이 줄바꿈을 직접 처리하도록 맡기는 방식이라고 이해하면 된다.

## \`csv.DictReader\`

헤더가 있는 CSV는 \`DictReader\`로 읽으면 다루기 쉽다.

\`\`\`python
import csv

with open("customers.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.DictReader(file)

    for row in reader:
        print(row["name"], row["email"])
\`\`\`

\`DictReader\`는 각 행을 딕셔너리로 반환한다.

\`\`\`python
{
    "name": "Alice",
    "email": "alice@example.com",
    "age": "30",
}
\`\`\`

열 순서가 바뀌어도 헤더 이름으로 값을 가져올 수 있으므로 실무에서 더 안전하다.

## \`csv.DictWriter\`

딕셔너리 데이터를 CSV로 저장할 때는 \`DictWriter\`를 사용할 수 있다.

\`\`\`python
import csv

rows = [
    {"name": "Alice", "email": "alice@example.com", "age": 30},
    {"name": "Bob", "email": "bob@example.com", "age": 25},
]

fieldnames = ["name", "email", "age"]

with open("output.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)
\`\`\`

\`fieldnames\`는 CSV에 저장할 컬럼의 순서를 결정한다. 딕셔너리는 key-value 구조이므로 출력 순서를 명확히 지정하는 것이 좋다.

## 구분자와 따옴표 처리

CSV라고 해서 항상 쉼표만 사용하는 것은 아니다. 탭으로 구분된 파일은 TSV라고 부르기도 한다.

\`\`\`python
import csv

with open("data.tsv", "r", encoding="utf-8", newline="") as file:
    reader = csv.reader(file, delimiter="\\t")

    for row in reader:
        print(row)
\`\`\`

세미콜론을 사용하는 데이터도 있다.

\`\`\`python
reader = csv.reader(file, delimiter=";")
\`\`\`

값 안에 구분자가 들어갈 수 있으면 따옴표 처리도 중요하다.

\`\`\`python
import csv

rows = [
    ["name", "address"],
    ["Alice", "Seoul, Korea"],
]

with open("address.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file, quoting=csv.QUOTE_MINIMAL)
    writer.writerows(rows)
\`\`\`

이렇게 쓰면 필요한 경우 따옴표로 값을 감싸 CSV 형식을 유지한다.

## 잘못된 행 처리하기

실무 CSV에는 일부 행의 컬럼 수가 맞지 않을 수 있다.

\`\`\`text
name,email,age
Alice,alice@example.com,30
Bob,bob@example.com
Charlie,charlie@example.com,40,VIP
\`\`\`

이런 파일을 무조건 읽으면 나중에 데이터 처리 단계에서 문제가 생긴다. 읽는 단계에서 검증하는 습관이 필요하다.

\`\`\`python
import csv

expected_columns = 3
valid_rows = []
invalid_rows = []

with open("customers.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.reader(file)
    header = next(reader)

    for line_number, row in enumerate(reader, start=2):
        if len(row) != expected_columns:
            invalid_rows.append({
                "line": line_number,
                "row": row,
                "reason": f"컬럼 수가 {len(row)}개입니다.",
            })
            continue

        valid_rows.append(row)

print(f"정상 행: {len(valid_rows)}")
print(f"오류 행: {len(invalid_rows)}")
\`\`\`

## 데이터 타입 변환하기

CSV는 텍스트 파일이므로 값은 문자열로 읽힌다. 숫자 변환은 명시적으로 해야 한다.

\`\`\`python
def parse_int(value: str, default: int = 0) -> int:
    value = value.strip().replace(",", "")

    if not value:
        return default

    return int(value)

price = parse_int("1,200")
print(price)
\`\`\`

실무에서는 변환 실패 가능성을 고려해야 한다.

\`\`\`python
def safe_parse_int(value: str, default: int | None = None) -> int | None:
    try:
        return int(value.strip().replace(",", ""))
    except ValueError:
        return default
\`\`\`

## CSV 검증 함수 만들기

CSV 검증은 데이터분석 전 단계에서 중요하다.

\`\`\`python
from pathlib import Path
import csv

REQUIRED_COLUMNS = {"name", "email", "age"}


def validate_csv_header(path: Path) -> list[str]:
    errors = []

    with path.open("r", encoding="utf-8", newline="") as file:
        reader = csv.DictReader(file)
        fieldnames = set(reader.fieldnames or [])

    missing_columns = REQUIRED_COLUMNS - fieldnames

    if missing_columns:
        errors.append(f"필수 컬럼 누락: {sorted(missing_columns)}")

    return errors

errors = validate_csv_header(Path("customers.csv"))

if errors:
    for error in errors:
        print(error)
else:
    print("CSV 헤더가 정상입니다.")
\`\`\`

이런 검증 함수는 나중에 테스트하기 쉽다. 고급 파이썬 과정에서 배운 타입 힌트와 테스트를 함께 적용할 수 있다.

## 표준 \`csv\` 모듈과 pandas의 역할 구분

\`csv\` 모듈은 표준 라이브러리이므로 별도 설치가 필요 없고, 행 단위 처리와 검증에 적합하다. 큰 CSV 파일을 한 줄씩 읽어 검사하거나, 잘못된 행을 분리 저장하는 작업에 좋다.

반면 데이터분석 과정에서는 \`pandas\`를 사용해 CSV를 DataFrame으로 읽고 분석하게 된다. 하지만 \`pandas.read_csv()\`로 바로 읽기 전에 원천 데이터의 인코딩, 컬럼, 형식, 잘못된 행을 점검하는 능력은 여전히 중요하다.

---
`;export{e as default};