var e=`# 13장 파일과 데이터 입출력 심화

## 이 장에서 배울 내용

기초 과정에서는 텍스트 파일을 읽고 쓰는 방법, CSV 파일을 다루는 방법, 엑셀 파일을 자동화하는 방법을 배웠다. 고급 과정의 파일 입출력은 단순히 “파일을 열고 저장한다”에서 끝나지 않는다. 실무에서는 파일 크기가 커지고, 인코딩이 섞이고, CSV 형식이 일정하지 않으며, API 응답을 계속 저장해야 하고, 압축 파일 안의 데이터를 바로 처리해야 하는 경우가 많다.

데이터분석 과정으로 넘어가기 전에 특히 중요한 것은 **원천 데이터를 안정적으로 읽고, 검증하고, 분석 가능한 형태로 저장하는 능력**이다. 분석 도구를 잘 쓰더라도 원천 데이터가 깨져 있거나, 날짜 형식이 섞여 있거나, 한글 인코딩이 잘못되어 있거나, 일부 행이 잘못되어 있으면 분석 결과도 신뢰하기 어렵다.

이 장에서는 다음 내용을 다룬다.

- 텍스트 파일과 바이너리 파일의 차이
- 인코딩과 디코딩, \`bytes\` 처리
- 대용량 파일을 한 번에 읽지 않고 처리하는 방법
- CSV 파일의 구분자, 따옴표, 잘못된 행 처리
- 중첩 JSON과 JSON Lines 저장 방식
- gzip, zip 압축 파일 처리
- \`pathlib\`, \`shutil\`, \`tempfile\`을 활용한 안전한 파일 시스템 작업
- 데이터분석 전 원천 데이터를 정리하는 실무 패턴

이 장의 목표는 파일 처리 코드를 “예제 수준”에서 “실무에 쓸 수 있는 도구 수준”으로 끌어올리는 것이다.

---

# 13.1 텍스트와 바이너리

## 파일은 결국 바이트다

컴퓨터가 파일에 저장하는 것은 결국 바이트다. 텍스트 파일도 내부적으로는 바이트로 저장된다. 우리가 텍스트 파일을 읽을 때 문자열로 보이는 이유는 파이썬이 바이트를 특정 인코딩 규칙에 따라 문자열로 변환해 주기 때문이다.

예를 들어 다음과 같은 문자열이 있다고 하자.

\`\`\`python
text = "안녕하세요"
\`\`\`

이 문자열을 파일에 저장하면 컴퓨터는 문자 자체를 그대로 저장하지 않는다. \`UTF-8\` 같은 인코딩 규칙에 따라 바이트로 바꿔 저장한다.

\`\`\`python
text = "안녕하세요"
data = text.encode("utf-8")

print(data)
\`\`\`

실행하면 사람이 읽는 한글이 아니라 바이트 표현이 출력된다.

\`\`\`text
b'\\xec\\x95\\x88\\xeb\\x85\\x95\\xed\\x95\\x98\\xec\\x84\\xb8\\xec\\x9a\\x94'
\`\`\`

반대로 바이트를 다시 문자열로 바꾸는 과정은 디코딩이다.

\`\`\`python
text = data.decode("utf-8")
print(text)
\`\`\`

\`\`\`text
안녕하세요
\`\`\`

파일 입출력에서 인코딩 문제가 중요한 이유가 여기에 있다. 파일은 바이트로 저장되지만, 우리는 문자열로 읽고 싶어 한다. 따라서 어떤 규칙으로 바이트를 문자열로 바꿀지 명확히 지정해야 한다.

## 텍스트 모드와 바이너리 모드

파이썬에서 파일을 열 때는 텍스트 모드와 바이너리 모드를 구분해야 한다.

\`\`\`python
# 텍스트 모드
with open("message.txt", "r", encoding="utf-8") as file:
    text = file.read()

# 바이너리 모드
with open("image.png", "rb") as file:
    data = file.read()
\`\`\`

텍스트 모드에서는 파일 내용을 문자열로 읽는다. 이때 인코딩이 사용된다.

바이너리 모드에서는 파일 내용을 \`bytes\`로 읽는다. 이때는 인코딩을 지정하지 않는다.

| 구분 | 모드 예시 | 읽는 값 | 주로 사용하는 경우 |
|---|---|---|---|
| 텍스트 모드 | \`r\`, \`w\`, \`a\` | \`str\` | \`.txt\`, \`.csv\`, \`.json\`, 로그 파일 |
| 바이너리 모드 | \`rb\`, \`wb\`, \`ab\` | \`bytes\` | 이미지, PDF, 압축 파일, 실행 파일 |

텍스트 파일을 바이너리 모드로 읽으면 문자열이 아니라 바이트가 나온다.

\`\`\`python
with open("message.txt", "rb") as file:
    data = file.read()

print(type(data))
\`\`\`

\`\`\`text
<class 'bytes'>
\`\`\`

바이너리 파일을 텍스트 모드로 열면 디코딩 과정에서 오류가 발생하거나 파일 내용이 손상될 수 있다. 이미지, PDF, 압축 파일처럼 사람이 읽는 문자가 아닌 파일은 반드시 바이너리 모드로 다루는 것이 안전하다.

## 파일 모드 정리

파일을 열 때 사용하는 모드는 파일을 어떻게 사용할지를 결정한다.

| 모드 | 의미 | 기존 파일이 있을 때 | 파일이 없을 때 |
|---|---|---|---|
| \`r\` | 읽기 | 읽음 | 에러 |
| \`w\` | 쓰기 | 기존 내용 삭제 | 새로 생성 |
| \`a\` | 이어쓰기 | 끝에 추가 | 새로 생성 |
| \`x\` | 새 파일 만들기 | 에러 | 새로 생성 |
| \`r+\` | 읽기와 쓰기 | 읽고 씀 | 에러 |
| \`rb\` | 바이너리 읽기 | 바이트로 읽음 | 에러 |
| \`wb\` | 바이너리 쓰기 | 기존 내용 삭제 | 새로 생성 |

\`w\` 모드는 조심해야 한다. 같은 이름의 파일이 있으면 기존 내용이 지워진다.

\`\`\`python
with open("result.txt", "w", encoding="utf-8") as file:
    file.write("새 결과")
\`\`\`

기존 파일을 실수로 덮어쓰면 복구가 어려울 수 있다. 중요한 원본 파일은 직접 덮어쓰지 말고, 새 파일에 결과를 저장하는 습관을 들이는 것이 좋다.

## 줄바꿈 처리

텍스트 파일에서 줄바꿈은 운영체제마다 다르게 표현될 수 있다.

| 운영체제 | 줄바꿈 표현 |
|---|---|
| Linux, macOS | \`\\n\` |
| Windows | \`\\r\\n\` |

텍스트 모드로 파일을 열면 파이썬이 줄바꿈을 어느 정도 자동으로 처리한다. 일반 텍스트 파일에서는 큰 문제가 되지 않지만, CSV 파일을 다룰 때는 줄바꿈 처리 때문에 빈 줄이 추가되는 문제가 생길 수 있다.

그래서 \`csv\` 모듈을 사용할 때는 보통 다음처럼 \`newline=""\`를 지정한다.

\`\`\`python
import csv

with open("data.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)
\`\`\`

이 내용은 13.3절에서 다시 자세히 다룬다.

## \`StringIO\`와 \`BytesIO\`

파일처럼 동작하지만 실제 디스크 파일은 아닌 객체가 필요할 때가 있다. 예를 들어 테스트 코드에서 임시 파일을 만들지 않고 문자열 데이터를 파일처럼 읽고 싶을 수 있다.

이때 \`io.StringIO\`를 사용할 수 있다.

\`\`\`python
from io import StringIO

text_file = StringIO("name,score\\nAlice,90\\nBob,85\\n")

for line in text_file:
    print(line.strip())
\`\`\`

\`StringIO\`는 문자열 기반 파일 객체처럼 동작한다.

바이트 데이터를 파일처럼 다루고 싶을 때는 \`BytesIO\`를 사용한다.

\`\`\`python
from io import BytesIO

binary_file = BytesIO()
binary_file.write(b"hello")

binary_file.seek(0)
print(binary_file.read())
\`\`\`

\`StringIO\`와 \`BytesIO\`는 테스트, 네트워크 응답 처리, 압축 파일 내부 데이터 처리에서 유용하게 사용된다.

## 실무에서 자주 생기는 문제

파일 입출력에서 자주 만나는 문제는 다음과 같다.

- 한글이 깨진다.
- 파일을 읽었는데 이상한 기호가 나온다.
- CSV를 저장했더니 빈 줄이 생긴다.
- 이미지 파일을 텍스트 모드로 열어 오류가 난다.
- 큰 파일을 \`read()\`로 한 번에 읽어서 메모리가 부족해진다.
- 원본 파일을 실수로 덮어썼다.

이 문제들은 대부분 다음 원칙으로 줄일 수 있다.

- 텍스트 파일은 \`encoding\`을 명확히 지정한다.
- 바이너리 파일은 \`b\` 모드로 연다.
- 큰 파일은 한 번에 읽지 않는다.
- 원본 파일은 직접 덮어쓰지 않는다.
- CSV 파일은 \`newline=""\`를 함께 사용한다.

---

# 13.2 대용량 파일 처리

## 큰 파일을 한 번에 읽으면 생기는 문제

기초 과정에서는 다음과 같은 코드를 자주 사용했다.

\`\`\`python
with open("log.txt", "r", encoding="utf-8") as file:
    content = file.read()
\`\`\`

파일이 작다면 문제없다. 하지만 파일 크기가 수백 MB, 수 GB라면 이 방식은 위험하다. \`read()\`는 파일 전체를 한 번에 메모리에 올린다. 파일이 커질수록 메모리 사용량이 급격히 늘어난다.

대용량 파일을 다룰 때는 다음 질문을 먼저 해야 한다.

- 파일 전체가 한 번에 필요한가?
- 한 줄씩 처리해도 되는가?
- 일정 크기 단위로 나누어 처리할 수 있는가?
- 처리 결과만 따로 저장하면 되는가?

실무 데이터 처리에서는 파일 전체를 메모리에 올리지 않고 **스트리밍 방식**으로 처리하는 경우가 많다.

## 한 줄씩 읽기

텍스트 파일은 보통 한 줄씩 처리할 수 있다.

\`\`\`python
from pathlib import Path

path = Path("server.log")

with path.open("r", encoding="utf-8") as file:
    for line in file:
        if "ERROR" in line:
            print(line.strip())
\`\`\`

이 방식은 파일 전체를 한 번에 읽지 않는다. 파일 객체에서 한 줄씩 꺼내 처리한다. 로그 파일, CSV 파일, JSON Lines 파일처럼 줄 단위 데이터에서는 매우 유용하다.

## 청크 단위로 읽기

바이너리 파일이나 줄 단위로 나누기 어려운 파일은 일정 크기 단위로 읽을 수 있다.

\`\`\`python
from pathlib import Path

source = Path("large_file.bin")
target = Path("copy_large_file.bin")

chunk_size = 1024 * 1024  # 1MB

with source.open("rb") as src, target.open("wb") as dst:
    while True:
        chunk = src.read(chunk_size)
        if not chunk:
            break
        dst.write(chunk)
\`\`\`

이 코드는 파일을 1MB씩 읽고 바로 쓴다. 파일 크기가 커도 한 번에 사용하는 메모리는 비교적 작다.

## 제너레이터로 파일 처리하기

파일 처리 로직을 제너레이터로 만들면 데이터 흐름을 더 깔끔하게 구성할 수 있다.

\`\`\`python
def read_error_lines(path: str):
    with open(path, "r", encoding="utf-8") as file:
        for line in file:
            if "ERROR" in line:
                yield line.strip()

for error_line in read_error_lines("server.log"):
    print(error_line)
\`\`\`

\`yield\`를 사용하면 조건에 맞는 줄을 하나씩 생성할 수 있다. 전체 결과를 리스트로 만들지 않기 때문에 메모리를 아낄 수 있다.

다음처럼 여러 처리 단계를 이어 붙일 수도 있다.

\`\`\`python
def read_lines(path: str):
    with open(path, "r", encoding="utf-8") as file:
        for line in file:
            yield line.strip()


def filter_errors(lines):
    for line in lines:
        if "ERROR" in line:
            yield line


def extract_message(lines):
    for line in lines:
        yield line.split("ERROR", 1)[-1].strip()

lines = read_lines("server.log")
errors = filter_errors(lines)
messages = extract_message(errors)

for message in messages:
    print(message)
\`\`\`

이런 방식은 데이터 파이프라인의 기초가 된다. 데이터를 읽고, 필터링하고, 변환하고, 저장하는 단계를 함수로 나누어 연결할 수 있다.

## 진행 상황 표시하기

큰 파일을 처리할 때는 프로그램이 멈춘 것처럼 보일 수 있다. 간단한 진행 상황을 출력하면 처리 상태를 확인하기 쉽다.

\`\`\`python
from pathlib import Path

path = Path("server.log")
count = 0
error_count = 0

with path.open("r", encoding="utf-8") as file:
    for line in file:
        count += 1

        if "ERROR" in line:
            error_count += 1

        if count % 100_000 == 0:
            print(f"{count:,} lines processed")

print(f"전체 줄 수: {count:,}")
print(f"에러 줄 수: {error_count:,}")
\`\`\`

이런 방식은 별도 라이브러리 없이도 대용량 처리 상황을 확인하는 데 도움이 된다.

## 잘못된 줄을 건너뛰기

실무 파일에는 깨진 줄, 형식이 잘못된 줄, 일부 값이 비어 있는 줄이 섞여 있을 수 있다. 전체 작업을 멈추기보다 실패한 줄만 기록하고 나머지는 계속 처리하는 방식이 필요하다.

\`\`\`python
def parse_score_line(line: str) -> dict:
    name, score_text = line.strip().split(",")
    return {
        "name": name,
        "score": int(score_text),
    }

valid_rows = []
invalid_lines = []

with open("scores.txt", "r", encoding="utf-8") as file:
    for line_number, line in enumerate(file, start=1):
        try:
            row = parse_score_line(line)
        except ValueError as error:
            invalid_lines.append((line_number, line.strip(), str(error)))
            continue

        valid_rows.append(row)

print(f"정상 데이터 수: {len(valid_rows)}")
print(f"실패 데이터 수: {len(invalid_lines)}")
\`\`\`

데이터 처리에서 중요한 것은 모든 데이터를 항상 완벽하게 처리하는 것이 아니다. 어떤 데이터가 실패했는지 추적할 수 있게 만드는 것이다.

## 리스트로 모을지 바로 저장할지 결정하기

다음 코드는 조건에 맞는 줄을 모두 리스트에 모은다.

\`\`\`python
errors = []

with open("server.log", "r", encoding="utf-8") as file:
    for line in file:
        if "ERROR" in line:
            errors.append(line)
\`\`\`

에러 줄이 적다면 괜찮다. 하지만 에러 줄도 많다면 메모리를 많이 사용할 수 있다. 이 경우 결과를 바로 파일에 쓰는 방식이 더 낫다.

\`\`\`python
with open("server.log", "r", encoding="utf-8") as src, \\
     open("errors.log", "w", encoding="utf-8") as dst:
    for line in src:
        if "ERROR" in line:
            dst.write(line)
\`\`\`

대용량 파일 처리에서는 “중간 결과를 메모리에 모을 필요가 있는가?”를 계속 생각해야 한다.

---

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

# 13.5 압축 파일 처리

## 압축 파일을 코드로 다루는 이유

실무 데이터는 압축된 상태로 전달되는 경우가 많다.

- 로그 파일이 \`.gz\`로 압축되어 있다.
- 여러 CSV 파일이 \`.zip\` 하나로 묶여 있다.
- API에서 압축된 응답을 제공한다.
- 오래된 데이터를 보관하기 위해 압축한다.
- 대용량 파일 전송 시간을 줄이기 위해 압축한다.

압축 파일을 매번 수동으로 풀고 처리하면 자동화가 어렵다. 파이썬은 표준 라이브러리로 gzip과 zip 파일을 다룰 수 있다.

## gzip 파일 읽기

gzip은 보통 단일 파일을 압축하는 데 사용된다. 예를 들어 \`server.log.gz\`는 \`server.log\`를 gzip으로 압축한 파일일 수 있다.

텍스트 gzip 파일은 다음처럼 읽을 수 있다.

\`\`\`python
import gzip

with gzip.open("server.log.gz", "rt", encoding="utf-8") as file:
    for line in file:
        if "ERROR" in line:
            print(line.strip())
\`\`\`

\`rt\`는 gzip 파일을 텍스트 읽기 모드로 열겠다는 뜻이다. 바이너리로 읽고 싶으면 \`rb\`를 사용한다.

\`\`\`python
with gzip.open("data.bin.gz", "rb") as file:
    data = file.read()
\`\`\`

## gzip 파일 쓰기

텍스트 데이터를 gzip으로 압축해 저장할 수도 있다.

\`\`\`python
import gzip

lines = [
    "첫 번째 줄\\n",
    "두 번째 줄\\n",
    "세 번째 줄\\n",
]

with gzip.open("result.txt.gz", "wt", encoding="utf-8") as file:
    file.writelines(lines)
\`\`\`

압축 파일로 저장하면 디스크 공간을 절약할 수 있다. 특히 로그 파일이나 JSON Lines처럼 텍스트가 반복되는 데이터는 압축률이 좋은 편이다.

## CSV를 gzip으로 바로 저장하기

\`gzip.open()\`은 파일 객체처럼 동작한다. 따라서 \`csv\` 모듈과 함께 사용할 수 있다.

\`\`\`python
import csv
import gzip

rows = [
    {"name": "Alice", "score": 90},
    {"name": "Bob", "score": 85},
]

with gzip.open("scores.csv.gz", "wt", encoding="utf-8", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=["name", "score"])
    writer.writeheader()
    writer.writerows(rows)
\`\`\`

읽을 때도 비슷하다.

\`\`\`python
with gzip.open("scores.csv.gz", "rt", encoding="utf-8", newline="") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row)
\`\`\`

## zip 파일 다루기

zip은 여러 파일과 폴더를 하나의 압축 파일로 묶는 형식이다. 파이썬에서는 \`zipfile\` 모듈을 사용한다.

\`\`\`python
from zipfile import ZipFile

with ZipFile("data.zip", "r") as archive:
    print(archive.namelist())
\`\`\`

\`namelist()\`는 zip 파일 안에 들어 있는 파일 이름 목록을 반환한다.

## zip 파일에서 특정 파일 읽기

압축을 풀지 않고 zip 내부 파일을 읽을 수 있다.

\`\`\`python
from zipfile import ZipFile

with ZipFile("data.zip", "r") as archive:
    with archive.open("customers.csv", "r") as file:
        content = file.read()
        print(content[:100])
\`\`\`

\`archive.open()\`은 기본적으로 바이너리 파일 객체를 반환한다. 텍스트로 읽고 싶다면 \`io.TextIOWrapper\`로 감싸면 된다.

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

이 방식은 압축 파일을 디스크에 풀지 않고 바로 처리할 때 유용하다.

## zip 파일 만들기

\`\`\`python
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

files = [
    Path("result/customers.csv"),
    Path("result/summary.json"),
]

with ZipFile("result.zip", "w", compression=ZIP_DEFLATED) as archive:
    for path in files:
        archive.write(path, arcname=path.name)
\`\`\`

\`arcname\`은 zip 파일 안에서 보일 이름이다. 전체 경로를 그대로 넣지 않고 파일명만 넣고 싶을 때 사용한다.

## 안전한 압축 해제

zip 파일을 해제할 때는 주의해야 한다. 악의적으로 만들어진 zip 파일은 \`../\` 같은 경로를 포함해 의도하지 않은 위치에 파일을 풀려고 할 수 있다. 이것을 경로 순회 문제라고 한다.

신뢰할 수 없는 zip 파일은 무조건 \`extractall()\`로 풀기보다, 내부 파일 경로를 검사한 뒤 해제하는 것이 안전하다.

\`\`\`python
from pathlib import Path
from zipfile import ZipFile


def safe_extract(zip_path: Path, target_dir: Path) -> None:
    target_dir = target_dir.resolve()

    with ZipFile(zip_path, "r") as archive:
        for member in archive.namelist():
            member_path = (target_dir / member).resolve()

            if not str(member_path).startswith(str(target_dir)):
                raise ValueError(f"위험한 경로가 포함되어 있습니다: {member}")

        archive.extractall(target_dir)
\`\`\`

수업 수준에서는 이 코드를 완벽하게 이해하지 못해도 된다. 중요한 것은 **외부에서 받은 압축 파일을 무조건 신뢰하면 안 된다**는 점이다.

## gzip과 zip 비교

| 구분 | gzip | zip |
|---|---|---|
| 주 용도 | 단일 파일 압축 | 여러 파일 묶기와 압축 |
| 확장자 | \`.gz\` | \`.zip\` |
| 파이썬 모듈 | \`gzip\` | \`zipfile\` |
| 내부 파일 목록 | 보통 없음 | 있음 |
| 실무 예 | 로그 파일 압축 | 여러 CSV 파일 전달 |

---

# 13.6 경로와 파일 시스템 심화

## 문자열 경로보다 \`Path\` 객체를 사용하자

기초 과정에서는 파일 경로를 문자열로 다뤘다.

\`\`\`python
path = "data/input.csv"
\`\`\`

작은 예제에서는 괜찮지만, 경로를 많이 조합하고 검사해야 하는 실무 코드에서는 \`pathlib.Path\`가 더 편리하다.

\`\`\`python
from pathlib import Path

path = Path("data") / "input.csv"

print(path.name)
print(path.suffix)
print(path.parent)
\`\`\`

\`Path\` 객체는 운영체제별 경로 구분자를 어느 정도 자연스럽게 처리해 준다.

## 경로 정보 확인하기

\`\`\`python
from pathlib import Path

path = Path("data/input.csv")

print(path.name)      # input.csv
print(path.stem)      # input
print(path.suffix)    # .csv
print(path.parent)    # data
\`\`\`

파일명, 확장자, 부모 폴더를 분리할 때 문자열 메서드보다 안전하고 읽기 쉽다.

## 파일과 폴더 존재 여부 확인

\`\`\`python
from pathlib import Path

path = Path("data/input.csv")

if path.exists():
    print("파일 또는 폴더가 존재합니다.")

if path.is_file():
    print("파일입니다.")

if path.is_dir():
    print("폴더입니다.")
\`\`\`

존재 여부를 확인하는 코드는 파일 처리 예외를 줄이는 데 도움이 된다. 하지만 확인 직후 다른 프로그램이 파일을 삭제할 수도 있으므로, 중요한 파일 작업은 여전히 예외 처리가 필요하다.

## 폴더 만들기

\`\`\`python
from pathlib import Path

output_dir = Path("result")
output_dir.mkdir(parents=True, exist_ok=True)
\`\`\`

\`parents=True\`는 중간 폴더가 없으면 함께 만든다는 뜻이다. \`exist_ok=True\`는 이미 폴더가 있어도 에러를 내지 않겠다는 뜻이다.

## 파일 검색하기

특정 폴더의 CSV 파일을 찾을 수 있다.

\`\`\`python
from pathlib import Path

for path in Path("data").glob("*.csv"):
    print(path)
\`\`\`

하위 폴더까지 재귀적으로 찾고 싶으면 \`rglob()\`을 사용한다.

\`\`\`python
for path in Path("data").rglob("*.csv"):
    print(path)
\`\`\`

이 기능은 여러 원천 데이터 파일을 일괄 처리할 때 매우 유용하다.

## 파일 복사와 이동

파일 복사와 이동에는 \`shutil\`을 사용할 수 있다.

\`\`\`python
import shutil
from pathlib import Path

source = Path("data/input.csv")
target = Path("backup/input.csv")

target.parent.mkdir(parents=True, exist_ok=True)
shutil.copy2(source, target)
\`\`\`

\`copy2()\`는 가능한 경우 파일의 메타데이터도 함께 복사한다. 단, 모든 메타데이터가 완벽히 복사되는 것은 아니므로 중요한 권한 정보가 필요한 시스템에서는 별도 확인이 필요하다.

파일 이동은 다음처럼 한다.

\`\`\`python
shutil.move("data/input.csv", "archive/input.csv")
\`\`\`

## 임시 파일과 임시 폴더

중간 결과를 잠시 저장해야 할 때는 직접 임시 파일 이름을 만들기보다 \`tempfile\`을 사용하는 것이 안전하다.

\`\`\`python
import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as temp_dir:
    temp_path = Path(temp_dir)
    work_file = temp_path / "work.txt"

    work_file.write_text("임시 데이터", encoding="utf-8")
    print(work_file.read_text(encoding="utf-8"))

# with 블록이 끝나면 임시 폴더는 정리된다.
\`\`\`

임시 폴더는 테스트와 중간 처리 작업에 유용하다. 작업이 끝나면 자동으로 정리되므로 불필요한 파일이 남는 문제를 줄일 수 있다.

## 안전한 파일명 만들기

사용자 입력값이나 외부 데이터 값을 파일명으로 사용할 때는 조심해야 한다. 파일명에 사용할 수 없는 문자가 포함될 수 있고, 경로 조작 문제가 생길 수도 있다.

간단한 파일명 정리 함수는 다음처럼 만들 수 있다.

\`\`\`python
import re


def make_safe_filename(name: str, default: str = "untitled") -> str:
    name = name.strip()
    name = re.sub(r"[^\\w\\-.가-힣 ]", "_", name)
    name = name.strip(" .")

    if not name:
        return default

    return name

print(make_safe_filename("2026/06/매출:보고서?.csv"))
\`\`\`

파일명 규칙은 운영체제마다 다를 수 있다. 중요한 시스템에서는 더 엄격한 규칙을 정해야 한다.

## 원자적 저장 패턴

결과 파일을 저장하는 도중 프로그램이 중단되면 파일이 깨질 수 있다. 특히 기존 파일을 덮어쓰는 경우 위험하다.

안전한 방법 중 하나는 임시 파일에 먼저 쓰고, 저장이 완료되면 최종 파일명으로 교체하는 것이다.

\`\`\`python
from pathlib import Path
import tempfile


def atomic_write_text(path: Path, content: str, encoding: str = "utf-8") -> None:
    path.parent.mkdir(parents=True, exist_ok=True)

    with tempfile.NamedTemporaryFile(
        "w",
        encoding=encoding,
        delete=False,
        dir=path.parent,
        prefix=path.name,
        suffix=".tmp",
    ) as temp_file:
        temp_path = Path(temp_file.name)
        temp_file.write(content)

    temp_path.replace(path)

atomic_write_text(Path("result/summary.txt"), "처리 완료")
\`\`\`

이 패턴은 설정 파일, 결과 요약 파일, 중요한 중간 결과 파일을 저장할 때 유용하다.

## 폴더 순회하며 파일 처리하기

여러 하위 폴더에 흩어진 파일을 처리하는 예제다.

\`\`\`python
from pathlib import Path

input_dir = Path("raw_data")
output_dir = Path("processed")
output_dir.mkdir(parents=True, exist_ok=True)

for path in input_dir.rglob("*.txt"):
    relative_path = path.relative_to(input_dir)
    target_path = output_dir / relative_path
    target_path.parent.mkdir(parents=True, exist_ok=True)

    text = path.read_text(encoding="utf-8")
    cleaned_text = text.strip()
    target_path.write_text(cleaned_text, encoding="utf-8")
\`\`\`

\`relative_to()\`를 사용하면 원본 폴더 구조를 유지하면서 결과 폴더에 저장할 수 있다.

---

# 13.7 실무 활용: 데이터분석 전 원천 데이터 정리

## 데이터분석 전 단계가 중요한 이유

데이터분석 수업에서는 pandas, NumPy, 시각화 도구를 배우게 된다. 하지만 분석 도구에 데이터를 넣기 전까지의 과정도 중요하다.

현실의 원천 데이터는 다음과 같은 상태일 수 있다.

- 여러 폴더에 파일이 흩어져 있다.
- CSV 인코딩이 서로 다르다.
- 컬럼명이 파일마다 다르다.
- 일부 행의 컬럼 수가 맞지 않는다.
- 날짜 형식이 섞여 있다.
- 숫자에 쉼표나 원화 기호가 들어 있다.
- API 응답이 중첩 JSON 구조다.
- 압축 파일 안에 데이터가 들어 있다.

따라서 분석 전에 다음 작업을 수행해야 한다.

1. 원천 데이터 위치 확인
2. 파일 형식 확인
3. 인코딩 확인
4. 필수 컬럼 확인
5. 잘못된 행 분리
6. 필요한 필드 추출
7. 분석 가능한 형식으로 저장

## 예제 1: 대용량 로그 파일 전처리

목표는 큰 로그 파일에서 에러 로그만 추출해 CSV로 저장하는 것이다.

\`\`\`python
import csv
import re
from pathlib import Path

LOG_PATTERN = re.compile(
    r"\\[(?P<time>.*?)\\] (?P<level>INFO|WARNING|ERROR) (?P<message>.*)"
)


def parse_log_line(line: str) -> dict | None:
    match = LOG_PATTERN.search(line)

    if not match:
        return None

    return match.groupdict()


def extract_error_logs(input_path: Path, output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with input_path.open("r", encoding="utf-8") as src, \\
         output_path.open("w", encoding="utf-8", newline="") as dst:
        writer = csv.DictWriter(dst, fieldnames=["time", "level", "message"])
        writer.writeheader()

        for line in src:
            row = parse_log_line(line)

            if row is None:
                continue

            if row["level"] == "ERROR":
                writer.writerow(row)

extract_error_logs(Path("logs/server.log"), Path("result/error_logs.csv"))
\`\`\`

이 예제는 정규표현식, 파일 스트리밍, CSV 저장을 함께 사용한다.

## 예제 2: API 응답을 JSON Lines로 저장하기

API에서 페이지 단위로 데이터를 가져오는 상황을 가정하자. 실제 API 호출 대신 예제에서는 가짜 함수를 사용한다.

\`\`\`python
import json
from pathlib import Path


def fetch_page(page: int) -> list[dict]:
    sample_data = {
        1: [
            {"id": 1, "name": "Alice", "score": 90},
            {"id": 2, "name": "Bob", "score": 85},
        ],
        2: [
            {"id": 3, "name": "Charlie", "score": 92},
        ],
        3: [],
    }
    return sample_data.get(page, [])


def collect_api_data(output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with output_path.open("w", encoding="utf-8") as file:
        page = 1

        while True:
            rows = fetch_page(page)

            if not rows:
                break

            for row in rows:
                file.write(json.dumps(row, ensure_ascii=False) + "\\n")

            page += 1

collect_api_data(Path("raw/api_users.jsonl"))
\`\`\`

JSON Lines는 데이터를 계속 추가하거나, 큰 데이터를 줄 단위로 읽을 때 유용하다.

## 예제 3: 여러 CSV 파일 병합 전 준비

여러 CSV 파일을 하나로 합치기 전에 필수 컬럼이 있는지 확인하고, 정상 파일만 처리하는 예제다.

\`\`\`python
import csv
from pathlib import Path

REQUIRED_COLUMNS = {"order_id", "customer_id", "amount"}


def read_valid_csv_rows(path: Path):
    with path.open("r", encoding="utf-8", newline="") as file:
        reader = csv.DictReader(file)
        fieldnames = set(reader.fieldnames or [])

        missing = REQUIRED_COLUMNS - fieldnames
        if missing:
            raise ValueError(f"{path.name}: 필수 컬럼 누락 {sorted(missing)}")

        for row in reader:
            yield {
                "order_id": row["order_id"],
                "customer_id": row["customer_id"],
                "amount": row["amount"].replace(",", ""),
            }


def merge_csv_files(input_dir: Path, output_path: Path, error_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    error_path.parent.mkdir(parents=True, exist_ok=True)

    with output_path.open("w", encoding="utf-8", newline="") as output_file, \\
         error_path.open("w", encoding="utf-8") as error_file:
        writer = csv.DictWriter(output_file, fieldnames=["order_id", "customer_id", "amount"])
        writer.writeheader()

        for csv_path in input_dir.glob("*.csv"):
            try:
                for row in read_valid_csv_rows(csv_path):
                    writer.writerow(row)
            except ValueError as error:
                error_file.write(str(error) + "\\n")

merge_csv_files(
    Path("raw/orders"),
    Path("processed/orders_merged.csv"),
    Path("logs/merge_errors.log"),
)
\`\`\`

이 코드는 모든 파일을 한 번에 메모리에 올리지 않는다. 파일을 하나씩 읽고, 행을 하나씩 처리하며, 문제가 있는 파일은 로그로 남긴다.

## 예제 4: 압축된 로그 파일 처리

여러 \`.gz\` 로그 파일에서 에러 줄만 추출해 하나의 파일로 저장하는 예제다.

\`\`\`python
import gzip
from pathlib import Path


def iter_gzip_lines(path: Path):
    with gzip.open(path, "rt", encoding="utf-8") as file:
        for line in file:
            yield line


def collect_errors_from_gzip(input_dir: Path, output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with output_path.open("w", encoding="utf-8") as output_file:
        for gzip_path in input_dir.glob("*.gz"):
            for line in iter_gzip_lines(gzip_path):
                if "ERROR" in line:
                    output_file.write(f"[{gzip_path.name}] {line}")

collect_errors_from_gzip(Path("logs/archive"), Path("result/errors_from_gzip.log"))
\`\`\`

압축을 풀지 않고 바로 읽는 방식이다. 대량 로그 처리에서 자주 사용하는 패턴이다.

---

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