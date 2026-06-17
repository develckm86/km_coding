var e=`<!-- 원본: python_advanced_chapter_20_book.md / 세부 장: 20-2 -->

# 20.2 프로젝트 1: CSV 데이터 검증 도구

첫 번째 프로젝트는 CSV 데이터 검증 도구다. 데이터분석 전에 가장 자주 하는 일은 파일이 분석 가능한 형태인지 확인하는 것이다.

예를 들어 주문 데이터 CSV가 다음과 같은 형태라고 하자.

\`\`\`csv
order_id,customer_id,order_date,amount
O-001,C-001,2026-01-01,12000
O-002,C-002,2026-01-02,15000
O-003,,2026-01-03,9000
O-004,C-004,2026-01-04,abc
\`\`\`

이 데이터에는 문제가 있다.

\`\`\`text
- 세 번째 행은 customer_id가 비어 있다.
- 네 번째 행은 amount가 숫자로 변환되지 않는다.
\`\`\`

분석 전에 이런 행을 찾아내야 한다. 그렇지 않으면 이후 합계, 평균, 그룹화 과정에서 오류가 발생하거나 잘못된 결과가 나올 수 있다.

## 20.2.1 CSV 검증 도구의 요구사항

이번 프로젝트의 요구사항은 다음과 같다.

\`\`\`text
1. CSV 파일을 입력받는다.
2. 필수 컬럼이 모두 있는지 확인한다.
3. 필수 컬럼 값이 비어 있는 행을 찾는다.
4. 숫자 컬럼이 숫자로 변환 가능한지 확인한다.
5. 정상 행은 processed 폴더에 저장한다.
6. 실패 행은 invalid 폴더에 저장한다.
7. 처리 결과를 로그로 남긴다.
\`\`\`

이 요구사항을 기능 단위로 나누면 다음과 같다.

\`\`\`text
- CSV 읽기
- 필수 컬럼 확인
- 행 검증
- 정상 행과 실패 행 분리
- CSV 저장
- 로그 기록
\`\`\`

## 20.2.2 검증 결과 표현하기

행을 검증하면 성공 또는 실패가 나온다. 실패했다면 이유도 필요하다. 단순히 \`True\` 또는 \`False\`만 반환하면 어떤 이유로 실패했는지 알기 어렵다.

따라서 검증 결과를 데이터 클래스로 표현한다.

\`\`\`python
# src/data_tools/validators.py

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class ValidationResult:
    is_valid: bool
    errors: list[str]

    @classmethod
    def ok(cls) -> "ValidationResult":
        return cls(is_valid=True, errors=[])

    @classmethod
    def fail(cls, errors: list[str]) -> "ValidationResult":
        return cls(is_valid=False, errors=errors)
\`\`\`

이 구조를 사용하면 검증 함수가 다음처럼 명확해진다.

\`\`\`python
result = validate_row(row, required_columns, numeric_columns)

if result.is_valid:
    valid_rows.append(row)
else:
    row["errors"] = "; ".join(result.errors)
    invalid_rows.append(row)
\`\`\`

## 20.2.3 필수 컬럼 확인하기

CSV 파일을 읽었을 때 헤더에 필요한 컬럼이 모두 있는지 먼저 확인해야 한다.

\`\`\`python
# src/data_tools/validators.py


def find_missing_columns(
    fieldnames: list[str],
    required_columns: list[str],
) -> list[str]:
    fieldname_set = set(fieldnames)
    return [column for column in required_columns if column not in fieldname_set]
\`\`\`

리스트에서 매번 \`in\`으로 찾을 수도 있지만, 컬럼 수가 많아질 수 있으므로 \`set\`으로 바꾸면 포함 여부를 더 빠르게 확인할 수 있다. 고급 파이썬에서 자료구조 선택이 중요한 이유가 여기에 있다.

## 20.2.4 행 검증하기

행 검증 함수는 한 행만 검사한다. 한 번에 파일 전체를 처리하지 않는다. 이렇게 하면 테스트하기 쉽다.

\`\`\`python
# src/data_tools/validators.py


def validate_row(
    row: dict[str, str],
    required_columns: list[str],
    numeric_columns: list[str],
) -> ValidationResult:
    errors: list[str] = []

    for column in required_columns:
        value = row.get(column, "")
        if value.strip() == "":
            errors.append(f"필수값 누락: {column}")

    for column in numeric_columns:
        value = row.get(column, "")
        if value.strip() == "":
            continue

        try:
            float(value.replace(",", ""))
        except ValueError:
            errors.append(f"숫자 변환 실패: {column}={value}")

    if errors:
        return ValidationResult.fail(errors)

    return ValidationResult.ok()
\`\`\`

이 함수는 다음 장점을 가진다.

\`\`\`text
- 입력과 출력이 명확하다.
- 파일 시스템에 의존하지 않는다.
- 로깅에 의존하지 않는다.
- 테스트하기 쉽다.
- 검증 규칙을 추가하기 쉽다.
\`\`\`

실무형 함수는 가능하면 이렇게 작성하는 것이 좋다.

## 20.2.5 CSV 읽기와 쓰기

CSV 파일을 읽고 쓰는 기능은 별도 모듈로 분리한다.

\`\`\`python
# src/data_tools/csv_tools.py

from __future__ import annotations

import csv
from pathlib import Path


def read_csv(path: str | Path) -> tuple[list[str], list[dict[str, str]]]:
    csv_path = Path(path)

    with csv_path.open("r", encoding="utf-8-sig", newline="") as file:
        reader = csv.DictReader(file)
        fieldnames = list(reader.fieldnames or [])
        rows = list(reader)

    return fieldnames, rows


def write_csv(
    path: str | Path,
    rows: list[dict[str, str]],
    fieldnames: list[str],
) -> None:
    csv_path = Path(path)
    csv_path.parent.mkdir(parents=True, exist_ok=True)

    with csv_path.open("w", encoding="utf-8-sig", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
\`\`\`

\`utf-8-sig\`는 엑셀에서 저장한 CSV 파일을 다룰 때 유용한 경우가 많다. 파일 인코딩 문제는 데이터분석 전 단계에서 자주 발생하므로, 파일을 읽는 순간부터 주의해야 한다.

## 20.2.6 CSV 검증 실행 함수 만들기

이제 읽기, 검증, 저장을 묶는 함수를 만든다.

\`\`\`python
# src/data_tools/csv_tools.py

from __future__ import annotations

import logging
from pathlib import Path

from data_tools.validators import find_missing_columns, validate_row

logger = logging.getLogger(__name__)


def validate_csv_file(
    input_path: str | Path,
    valid_output_path: str | Path,
    invalid_output_path: str | Path,
    required_columns: list[str],
    numeric_columns: list[str],
) -> tuple[int, int]:
    fieldnames, rows = read_csv(input_path)

    missing_columns = find_missing_columns(fieldnames, required_columns)
    if missing_columns:
        raise ValueError(f"필수 컬럼이 없습니다: {missing_columns}")

    valid_rows: list[dict[str, str]] = []
    invalid_rows: list[dict[str, str]] = []

    for row in rows:
        result = validate_row(row, required_columns, numeric_columns)

        if result.is_valid:
            valid_rows.append(row)
        else:
            invalid_row = dict(row)
            invalid_row["errors"] = "; ".join(result.errors)
            invalid_rows.append(invalid_row)

    write_csv(valid_output_path, valid_rows, fieldnames)

    invalid_fieldnames = fieldnames + ["errors"]
    write_csv(invalid_output_path, invalid_rows, invalid_fieldnames)

    logger.info("CSV 검증 완료: 정상 %s건, 실패 %s건", len(valid_rows), len(invalid_rows))

    return len(valid_rows), len(invalid_rows)
\`\`\`

이 함수는 파일 전체를 처리하지만, 내부적으로는 이미 분리된 작은 함수들을 사용한다. 그래서 각 기능을 따로 테스트할 수 있다.

## 20.2.7 테스트 작성하기

가장 중요한 검증 함수부터 테스트한다.

\`\`\`python
# tests/test_validators.py

from data_tools.validators import find_missing_columns, validate_row


def test_find_missing_columns():
    fieldnames = ["order_id", "customer_id", "amount"]
    required = ["order_id", "customer_id", "order_date", "amount"]

    assert find_missing_columns(fieldnames, required) == ["order_date"]


def test_validate_row_success():
    row = {
        "order_id": "O-001",
        "customer_id": "C-001",
        "order_date": "2026-01-01",
        "amount": "12000",
    }

    result = validate_row(
        row,
        required_columns=["order_id", "customer_id", "order_date", "amount"],
        numeric_columns=["amount"],
    )

    assert result.is_valid is True
    assert result.errors == []


def test_validate_row_missing_required_value():
    row = {
        "order_id": "O-001",
        "customer_id": "",
        "order_date": "2026-01-01",
        "amount": "12000",
    }

    result = validate_row(
        row,
        required_columns=["order_id", "customer_id", "order_date", "amount"],
        numeric_columns=["amount"],
    )

    assert result.is_valid is False
    assert "필수값 누락: customer_id" in result.errors


def test_validate_row_invalid_number():
    row = {
        "order_id": "O-001",
        "customer_id": "C-001",
        "order_date": "2026-01-01",
        "amount": "abc",
    }

    result = validate_row(
        row,
        required_columns=["order_id", "customer_id", "order_date", "amount"],
        numeric_columns=["amount"],
    )

    assert result.is_valid is False
    assert "숫자 변환 실패: amount=abc" in result.errors
\`\`\`

테스트는 모든 코드를 한 번에 검증하려고 하지 않아도 된다. 먼저 가장 중요한 규칙부터 검증하면 된다.

## 20.2.8 CLI로 실행하기

사용자가 터미널에서 실행할 수 있도록 \`argparse\`를 사용한다.

\`\`\`python
# src/data_tools/cli.py

from __future__ import annotations

import argparse
import logging
from pathlib import Path

from data_tools.config import load_config
from data_tools.csv_tools import validate_csv_file


def setup_logging(log_dir: Path) -> None:
    log_dir.mkdir(parents=True, exist_ok=True)
    log_path = log_dir / "app.log"

    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s - %(message)s",
        handlers=[
            logging.FileHandler(log_path, encoding="utf-8"),
            logging.StreamHandler(),
        ],
    )


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="CSV 데이터 검증 도구")
    parser.add_argument("input", help="검증할 CSV 파일 경로")
    parser.add_argument("--config", default="config.ini", help="설정 파일 경로")
    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()

    config = load_config(args.config)
    setup_logging(config.log_dir)

    input_path = Path(args.input)
    valid_output_path = config.processed_dir / f"{input_path.stem}_valid.csv"
    invalid_output_path = config.invalid_dir / f"{input_path.stem}_invalid.csv"

    valid_count, invalid_count = validate_csv_file(
        input_path=input_path,
        valid_output_path=valid_output_path,
        invalid_output_path=invalid_output_path,
        required_columns=config.required_columns,
        numeric_columns=config.numeric_columns,
    )

    print(f"검증 완료: 정상 {valid_count}건, 실패 {invalid_count}건")


if __name__ == "__main__":
    main()
\`\`\`

실행은 다음처럼 한다.

\`\`\`bash
python -m data_tools.cli data/raw/orders.csv
\`\`\`

---
`;export{e as default};