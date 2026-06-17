var e=`<!-- 원본: python_advanced_chapter_13_book.md / 세부 장: 13-2 -->

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
`;export{e as default};