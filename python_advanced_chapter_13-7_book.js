var e=`<!-- 원본: python_advanced_chapter_13_book.md / 세부 장: 13-7 -->

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
`;export{e as default};