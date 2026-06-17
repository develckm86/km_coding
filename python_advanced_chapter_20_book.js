var e=`# 20장. 종합 실습

## 들어가며

파이썬 고급 과정의 마지막 장에서는 지금까지 배운 내용을 하나의 흐름으로 묶어 본다. 기초 과정에서는 변수, 조건문, 반복문, 함수, 파일 처리, 객체지향, 모듈, 테스트를 배웠고, 고급 과정에서는 객체 모델, 함수 심화, 이터레이터와 제너레이터, 데코레이터, 컨텍스트 매니저, 객체지향 심화, 데이터 모델, 타입 힌트, 프로젝트 구조, 예외 처리와 로깅, 테스트 심화, API, 데이터베이스, 동시성, 성능 최적화, CLI 프로그램까지 다루었다.

이 모든 내용을 따로따로 배울 때는 각각의 문법처럼 보인다. 하지만 실무에서는 문법 하나만 단독으로 쓰이는 경우가 많지 않다. 실제 프로그램은 다음 요소가 함께 움직인다.

\`\`\`text
- 입력을 받는다.
- 설정값을 읽는다.
- 파일이나 API에서 데이터를 가져온다.
- 데이터를 검증한다.
- 실패한 데이터와 정상 데이터를 분리한다.
- 처리 결과를 저장한다.
- 실행 과정을 로그로 남긴다.
- 문제가 생겼을 때 예외를 처리한다.
- 중요한 함수는 테스트로 검증한다.
- 명령행에서 실행할 수 있게 만든다.
\`\`\`

종합 실습의 목표는 “멋진 대형 프로젝트”를 만드는 것이 아니다. 더 중요한 목표는 **작지만 실무적으로 동작하는 프로그램을 안정적인 구조로 만드는 경험**을 하는 것이다.

이 장에서는 네 개의 프로젝트를 통해 고급 파이썬의 핵심 요소를 연결한다.

\`\`\`text
프로젝트 1: CSV 데이터 검증 도구
프로젝트 2: API 데이터 수집기
프로젝트 3: 로그 파일 분석 전처리기
프로젝트 4: SQLite 기반 데이터 저장 도구
\`\`\`

마지막에는 네 프로젝트를 하나의 데이터 준비 흐름으로 묶는 방법을 정리한다. 이 흐름은 이후 데이터분석 기초 과정에서 \`pandas\`로 데이터를 읽고 분석하기 전 단계에 해당한다.

---

## 학습 목표

이 장을 마치면 다음 내용을 구현하고 설명할 수 있어야 한다.

- 명령행에서 실행할 수 있는 작은 데이터 처리 도구를 설계할 수 있다.
- CSV 파일의 필수 컬럼, 빈 값, 숫자 변환 가능 여부를 검증할 수 있다.
- 잘못된 데이터 행을 정상 데이터와 분리해서 저장할 수 있다.
- API에서 데이터를 가져와 JSON Lines 형식으로 저장할 수 있다.
- 페이지네이션이 있는 API 응답을 반복적으로 수집할 수 있다.
- 큰 로그 파일을 한 줄씩 읽으며 필요한 패턴만 추출할 수 있다.
- SQLite에 데이터를 저장하고 중복 저장을 방지할 수 있다.
- 로깅, 예외 처리, 타입 힌트, 테스트를 실무 흐름에 적용할 수 있다.
- 데이터분석 과정으로 넘길 수 있는 “분석 준비 데이터”를 만들 수 있다.

---

# 20.1 종합 실습 목표

종합 실습은 단순히 코드를 많이 작성하는 시간이 아니다. 중요한 것은 **프로그램을 어떻게 나누고, 어떤 책임을 어디에 둘 것인가**이다.

초보자는 보통 모든 코드를 한 파일에 작성한다.

\`\`\`text
main.py
\`\`\`

작은 실습에서는 괜찮다. 하지만 코드가 커지면 다음 문제가 생긴다.

\`\`\`text
- 파일을 읽는 코드와 검증 코드가 섞인다.
- 예외 처리가 여기저기 흩어진다.
- 로그를 어디서 남겨야 할지 애매하다.
- 테스트하기 어렵다.
- 다른 프로젝트에서 재사용하기 어렵다.
- 기능을 수정할 때 의도하지 않은 부분이 함께 망가진다.
\`\`\`

따라서 종합 실습에서는 처음부터 기능을 나누어 설계한다.

## 20.1.1 종합 실습에서 사용할 공통 원칙

이번 장의 모든 프로젝트는 다음 원칙을 따른다.

\`\`\`text
1. 입력과 출력을 명확하게 한다.
2. 데이터를 읽는 코드와 처리하는 코드를 분리한다.
3. 예외는 필요한 위치에서만 처리한다.
4. 실패한 데이터는 버리지 않고 별도로 저장한다.
5. 실행 과정은 로그로 남긴다.
6. 중요한 함수는 테스트할 수 있게 작성한다.
7. 명령행에서 실행할 수 있는 구조로 만든다.
\`\`\`

이 원칙은 이후 데이터분석 수업에서도 중요하다. 분석 코드는 처음에는 노트북에서 빠르게 작성할 수 있지만, 반복 실행해야 하는 전처리 코드는 \`.py\` 파일과 함수, 클래스 구조로 정리하는 편이 좋다.

## 20.1.2 종합 실습 공통 프로젝트 구조

이번 장에서 권장하는 기본 구조는 다음과 같다.

\`\`\`text
advanced_project/
  README.md
  config.ini
  data/
    raw/
    processed/
    invalid/
  logs/
  src/
    data_tools/
      __init__.py
      cli.py
      config.py
      validators.py
      csv_tools.py
      api_client.py
      log_parser.py
      database.py
      exceptions.py
  tests/
    test_validators.py
    test_csv_tools.py
    test_log_parser.py
\`\`\`

각 폴더의 역할은 다음과 같다.

| 경로 | 역할 |
|---|---|
| \`data/raw/\` | 원본 데이터 저장 |
| \`data/processed/\` | 처리된 정상 데이터 저장 |
| \`data/invalid/\` | 검증 실패 데이터 저장 |
| \`logs/\` | 실행 로그 저장 |
| \`src/data_tools/\` | 실제 프로그램 코드 |
| \`tests/\` | 테스트 코드 |
| \`config.ini\` | 설정값 |

프로젝트를 처음부터 이렇게 나누면 조금 복잡해 보일 수 있다. 그러나 실무에서는 원본 데이터와 결과 데이터를 분리하는 습관이 매우 중요하다. 원본 데이터는 가능한 한 수정하지 않고 보관해야 한다. 그래야 처리 로직이 잘못되었을 때 다시 원본에서 시작할 수 있다.

## 20.1.3 공통 설정 파일

먼저 간단한 설정 파일을 만든다.

\`\`\`ini
[paths]
raw_dir = data/raw
processed_dir = data/processed
invalid_dir = data/invalid
log_dir = logs

[validation]
required_columns = order_id,customer_id,order_date,amount
numeric_columns = amount
\`\`\`

설정값을 코드에 직접 쓰지 않고 파일로 분리하면, 경로나 검증 기준이 바뀌어도 코드 자체를 수정하지 않아도 된다.

설정 파일을 읽는 코드는 다음처럼 만들 수 있다.

\`\`\`python
# src/data_tools/config.py

from __future__ import annotations

from configparser import ConfigParser
from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class AppConfig:
    raw_dir: Path
    processed_dir: Path
    invalid_dir: Path
    log_dir: Path
    required_columns: list[str]
    numeric_columns: list[str]


def load_config(path: str | Path) -> AppConfig:
    parser = ConfigParser()
    parser.read(path, encoding="utf-8")

    required_columns = [
        column.strip()
        for column in parser.get("validation", "required_columns").split(",")
        if column.strip()
    ]

    numeric_columns = [
        column.strip()
        for column in parser.get("validation", "numeric_columns").split(",")
        if column.strip()
    ]

    return AppConfig(
        raw_dir=Path(parser.get("paths", "raw_dir")),
        processed_dir=Path(parser.get("paths", "processed_dir")),
        invalid_dir=Path(parser.get("paths", "invalid_dir")),
        log_dir=Path(parser.get("paths", "log_dir")),
        required_columns=required_columns,
        numeric_columns=numeric_columns,
    )
\`\`\`

\`dataclass(frozen=True)\`를 사용하면 설정 객체를 만든 뒤 값을 함부로 바꾸기 어렵다. 설정은 프로그램이 실행되는 동안 기준이 되는 값이므로, 불필요한 변경을 막는 것이 좋다.

---

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

# 20.3 프로젝트 2: API 데이터 수집기

두 번째 프로젝트는 API 데이터 수집기다. 데이터분석에서는 파일뿐 아니라 외부 API에서 데이터를 가져오는 경우도 많다. API 수집 코드는 단순히 \`requests.get()\` 한 줄로 끝나지 않는다.

실무에서는 다음 문제가 자주 발생한다.

\`\`\`text
- 응답이 느리다.
- 요청이 실패한다.
- 인증 정보가 필요하다.
- 한 번에 모든 데이터를 주지 않고 페이지 단위로 준다.
- 응답 구조가 예상과 다르다.
- 수집 중간에 실패했을 때 어디까지 저장됐는지 알아야 한다.
\`\`\`

따라서 API 수집기는 안정성을 고려해서 작성해야 한다.

## 20.3.1 API 수집기의 요구사항

이번 프로젝트의 요구사항은 다음과 같다.

\`\`\`text
1. API URL을 설정값으로 관리한다.
2. 필요한 경우 API Key를 헤더에 넣는다.
3. 페이지 단위로 데이터를 가져온다.
4. 실패 시 일정 횟수 재시도한다.
5. 수집한 데이터를 JSON Lines 파일로 저장한다.
6. 실행 과정을 로그로 남긴다.
\`\`\`

이 장에서는 실제 외부 API에 의존하지 않고, API 클라이언트 구조를 중심으로 살펴본다.

## 20.3.2 API 응답을 저장할 형식

API 응답 데이터는 JSON Lines 형식으로 저장할 수 있다. JSON Lines는 한 줄에 하나의 JSON 객체를 저장하는 방식이다.

\`\`\`json
{"id": 1, "name": "Keyboard", "price": 30000}
{"id": 2, "name": "Mouse", "price": 15000}
{"id": 3, "name": "Monitor", "price": 200000}
\`\`\`

이 형식은 다음 장점이 있다.

\`\`\`text
- 한 줄씩 읽을 수 있다.
- 대용량 데이터 처리에 적합하다.
- 중간에 일부 데이터가 깨져도 전체 파일을 모두 잃지 않는다.
- API 수집 결과를 누적 저장하기 쉽다.
\`\`\`

## 20.3.3 API 클라이언트 클래스 만들기

API 수집 기능은 클래스로 만들면 공통 설정을 관리하기 좋다.

\`\`\`python
# src/data_tools/api_client.py

from __future__ import annotations

import logging
import time
from dataclasses import dataclass
from typing import Any, Iterator

import requests

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class APIClientConfig:
    base_url: str
    timeout: float = 5.0
    max_retries: int = 3
    retry_delay: float = 1.0
    api_key: str | None = None


class APIClient:
    def __init__(self, config: APIClientConfig) -> None:
        self.config = config
        self.session = requests.Session()

        if config.api_key:
            self.session.headers.update({"Authorization": f"Bearer {config.api_key}"})

    def get_json(self, endpoint: str, params: dict[str, Any] | None = None) -> dict[str, Any]:
        url = f"{self.config.base_url.rstrip('/')}/{endpoint.lstrip('/')}"

        last_error: Exception | None = None

        for attempt in range(1, self.config.max_retries + 1):
            try:
                response = self.session.get(url, params=params, timeout=self.config.timeout)
                response.raise_for_status()
                return response.json()
            except requests.RequestException as error:
                last_error = error
                logger.warning("API 요청 실패: attempt=%s error=%s", attempt, error)
                time.sleep(self.config.retry_delay)

        raise RuntimeError(f"API 요청 실패: {url}") from last_error
\`\`\`

이 클래스는 다음 역할을 가진다.

\`\`\`text
- 공통 base URL 관리
- 공통 timeout 관리
- 인증 헤더 관리
- 재시도 처리
- JSON 응답 반환
\`\`\`

## 20.3.4 페이지네이션 처리하기

API가 데이터를 한 번에 모두 주지 않는 경우가 많다. 예를 들어 \`page=1\`, \`page=2\`처럼 페이지 번호를 바꾸며 요청해야 한다.

제너레이터를 사용하면 페이지 데이터를 필요한 만큼 하나씩 가져올 수 있다.

\`\`\`python
# src/data_tools/api_client.py


class PaginatedAPIClient(APIClient):
    def iter_items(
        self,
        endpoint: str,
        item_key: str = "items",
        page_key: str = "page",
        start_page: int = 1,
        max_pages: int | None = None,
    ) -> Iterator[dict[str, Any]]:
        page = start_page
        fetched_pages = 0

        while True:
            if max_pages is not None and fetched_pages >= max_pages:
                break

            data = self.get_json(endpoint, params={page_key: page})
            items = data.get(item_key, [])

            if not items:
                break

            logger.info("API 페이지 수집: page=%s count=%s", page, len(items))

            for item in items:
                yield item

            page += 1
            fetched_pages += 1
\`\`\`

이 함수는 모든 데이터를 리스트에 담아서 반환하지 않는다. 대신 \`yield\`로 하나씩 내보낸다. 데이터가 많아질 때 메모리를 절약할 수 있다.

## 20.3.5 JSON Lines 저장하기

수집한 데이터를 한 줄씩 저장한다.

\`\`\`python
# src/data_tools/api_client.py

import json
from pathlib import Path


def write_jsonl(path: str | Path, items: Iterator[dict[str, Any]]) -> int:
    output_path = Path(path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    count = 0
    with output_path.open("w", encoding="utf-8") as file:
        for item in items:
            file.write(json.dumps(item, ensure_ascii=False) + "\\n")
            count += 1

    logger.info("JSON Lines 저장 완료: path=%s count=%s", output_path, count)
    return count
\`\`\`

## 20.3.6 API 수집 실행 예제

\`\`\`python
from data_tools.api_client import APIClientConfig, PaginatedAPIClient, write_jsonl


config = APIClientConfig(
    base_url="https://example.com/api",
    timeout=5.0,
    max_retries=3,
    retry_delay=1.0,
)

client = PaginatedAPIClient(config)
items = client.iter_items(endpoint="products", item_key="items", max_pages=10)
count = write_jsonl("data/raw/products.jsonl", items)

print(f"수집 완료: {count}건")
\`\`\`

실제 수업에서는 공개 테스트 API나 내부 샘플 API를 사용할 수 있다. 중요한 것은 API 주소 자체가 아니라 수집 코드의 구조다.

## 20.3.7 API 수집기에서 확인해야 할 점

API 수집 코드를 작성할 때는 다음을 확인해야 한다.

\`\`\`text
- timeout을 설정했는가?
- 실패 시 재시도 횟수를 제한했는가?
- 인증 정보를 코드에 직접 쓰지 않았는가?
- 페이지네이션 종료 조건이 명확한가?
- 응답 구조가 예상과 다를 때 처리하는가?
- 수집 결과를 중간 형식으로 저장하는가?
- 로그를 남기는가?
\`\`\`

---

# 20.4 프로젝트 3: 로그 파일 분석 전처리기

세 번째 프로젝트는 로그 파일 분석 전처리기다. 로그 파일은 보통 크기가 크다. 따라서 파일 전체를 한 번에 메모리에 올리는 방식은 적절하지 않을 수 있다.

로그 파일 예시는 다음과 같다.

\`\`\`text
2026-01-01 10:00:01 INFO user_id=U001 action=login
2026-01-01 10:00:03 ERROR user_id=U002 code=E500 message="server error"
2026-01-01 10:00:05 INFO user_id=U001 action=logout
2026-01-01 10:00:08 ERROR user_id=U003 code=E404 message="not found"
\`\`\`

이 로그에서 \`ERROR\` 행만 추출하고, 날짜, 사용자 ID, 에러 코드, 메시지를 CSV로 저장해 보자.

## 20.4.1 로그 전처리기의 요구사항

\`\`\`text
1. 큰 로그 파일을 한 줄씩 읽는다.
2. ERROR 로그만 찾는다.
3. 정규표현식으로 필요한 값을 추출한다.
4. 추출 결과를 CSV로 저장한다.
5. 파싱 실패 행은 로그로 남긴다.
6. 메모리를 많이 사용하지 않는다.
\`\`\`

## 20.4.2 로그 한 줄 파싱하기

먼저 로그 한 줄을 파싱하는 함수를 만든다.

\`\`\`python
# src/data_tools/log_parser.py

from __future__ import annotations

import re
from dataclasses import dataclass


@dataclass(frozen=True)
class ErrorLog:
    timestamp: str
    user_id: str
    code: str
    message: str


ERROR_LOG_PATTERN = re.compile(
    r'^(?P<timestamp>\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) '
    r'ERROR user_id=(?P<user_id>\\S+) '
    r'code=(?P<code>\\S+) '
    r'message="(?P<message>.*)"$'
)


def parse_error_log_line(line: str) -> ErrorLog | None:
    match = ERROR_LOG_PATTERN.search(line.strip())

    if match is None:
        return None

    return ErrorLog(
        timestamp=match.group("timestamp"),
        user_id=match.group("user_id"),
        code=match.group("code"),
        message=match.group("message"),
    )
\`\`\`

한 줄 파싱 함수는 파일을 직접 열지 않는다. 이렇게 작성하면 테스트가 쉽다.

## 20.4.3 큰 파일을 한 줄씩 처리하기

제너레이터를 사용해 에러 로그만 하나씩 반환한다.

\`\`\`python
# src/data_tools/log_parser.py

from pathlib import Path
from typing import Iterator
import logging

logger = logging.getLogger(__name__)


def iter_error_logs(path: str | Path) -> Iterator[ErrorLog]:
    log_path = Path(path)

    with log_path.open("r", encoding="utf-8") as file:
        for line_number, line in enumerate(file, start=1):
            if "ERROR" not in line:
                continue

            parsed = parse_error_log_line(line)

            if parsed is None:
                logger.warning("파싱 실패: line=%s content=%s", line_number, line.strip())
                continue

            yield parsed
\`\`\`

이 함수는 에러 로그를 리스트로 모아서 반환하지 않는다. 필요한 순간에 하나씩 반환한다. 대용량 로그 파일을 처리할 때 유리하다.

## 20.4.4 CSV로 저장하기

\`\`\`python
# src/data_tools/log_parser.py

import csv


def write_error_logs_to_csv(
    output_path: str | Path,
    logs: Iterator[ErrorLog],
) -> int:
    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)

    fieldnames = ["timestamp", "user_id", "code", "message"]
    count = 0

    with path.open("w", encoding="utf-8-sig", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()

        for log in logs:
            writer.writerow(
                {
                    "timestamp": log.timestamp,
                    "user_id": log.user_id,
                    "code": log.code,
                    "message": log.message,
                }
            )
            count += 1

    logger.info("에러 로그 CSV 저장 완료: path=%s count=%s", path, count)
    return count
\`\`\`

## 20.4.5 로그 전처리 실행 예제

\`\`\`python
from data_tools.log_parser import iter_error_logs, write_error_logs_to_csv


logs = iter_error_logs("data/raw/app.log")
count = write_error_logs_to_csv("data/processed/error_logs.csv", logs)

print(f"에러 로그 추출 완료: {count}건")
\`\`\`

이 프로젝트는 고급 파이썬의 여러 개념을 함께 사용한다.

\`\`\`text
- 정규표현식
- 데이터 클래스
- 제너레이터
- 파일 입출력
- 타입 힌트
- 로깅
- 테스트 가능한 함수 설계
\`\`\`

## 20.4.6 테스트 작성하기

\`\`\`python
# tests/test_log_parser.py

from data_tools.log_parser import parse_error_log_line


def test_parse_error_log_line_success():
    line = '2026-01-01 10:00:03 ERROR user_id=U002 code=E500 message="server error"'

    result = parse_error_log_line(line)

    assert result is not None
    assert result.timestamp == "2026-01-01 10:00:03"
    assert result.user_id == "U002"
    assert result.code == "E500"
    assert result.message == "server error"


def test_parse_error_log_line_not_error():
    line = "2026-01-01 10:00:01 INFO user_id=U001 action=login"

    result = parse_error_log_line(line)

    assert result is None
\`\`\`

테스트는 정규표현식이 기대한 대로 동작하는지 확인하는 데 특히 유용하다. 정규표현식은 조금만 수정해도 결과가 달라질 수 있기 때문이다.

---

# 20.5 프로젝트 4: SQLite 기반 데이터 저장 도구

네 번째 프로젝트는 SQLite 기반 데이터 저장 도구다. CSV나 JSON Lines 파일만으로도 데이터를 보관할 수 있지만, 데이터가 많아지고 중복을 관리해야 하거나 조건 검색이 많아지면 데이터베이스가 유용하다.

이번 프로젝트에서는 다음 흐름을 만든다.

\`\`\`text
1. JSON Lines 파일을 읽는다.
2. 각 데이터를 SQLite에 저장한다.
3. 중복 ID는 저장하지 않는다.
4. 날짜 기준으로 데이터를 조회한다.
5. 분석용 CSV로 내보낸다.
\`\`\`

## 20.5.1 테이블 설계하기

상품 데이터를 저장한다고 가정하자.

\`\`\`text
products
- id
- name
- price
- collected_at
\`\`\`

SQLite 테이블 생성 SQL은 다음과 같다.

\`\`\`sql
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    collected_at TEXT NOT NULL
);
\`\`\`

\`id\`를 기본키로 지정하면 같은 ID가 중복 저장되는 것을 막을 수 있다.

## 20.5.2 데이터베이스 연결 함수

\`\`\`python
# src/data_tools/database.py

from __future__ import annotations

import sqlite3
from pathlib import Path


def connect(db_path: str | Path) -> sqlite3.Connection:
    path = Path(db_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    return sqlite3.connect(path)
\`\`\`

## 20.5.3 테이블 생성하기

\`\`\`python
# src/data_tools/database.py


def create_tables(connection: sqlite3.Connection) -> None:
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS products (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            collected_at TEXT NOT NULL
        )
        """
    )
    connection.commit()
\`\`\`

테이블 생성 코드는 프로그램 시작 시 한 번 실행하면 된다.

## 20.5.4 JSON Lines 읽기

\`\`\`python
# src/data_tools/database.py

import json
from typing import Iterator, Any


def read_jsonl(path: str | Path) -> Iterator[dict[str, Any]]:
    jsonl_path = Path(path)

    with jsonl_path.open("r", encoding="utf-8") as file:
        for line in file:
            if not line.strip():
                continue
            yield json.loads(line)
\`\`\`

여기서도 제너레이터를 사용한다. JSON Lines 파일이 커져도 한 줄씩 처리할 수 있다.

## 20.5.5 데이터 저장하기

\`\`\`python
# src/data_tools/database.py

from datetime import datetime
import logging

logger = logging.getLogger(__name__)


def insert_product(
    connection: sqlite3.Connection,
    product: dict[str, Any],
) -> bool:
    product_id = str(product["id"])
    name = str(product["name"])
    price = float(product["price"])
    collected_at = datetime.now().isoformat(timespec="seconds")

    cursor = connection.execute(
        """
        INSERT OR IGNORE INTO products (id, name, price, collected_at)
        VALUES (?, ?, ?, ?)
        """,
        (product_id, name, price, collected_at),
    )

    return cursor.rowcount > 0
\`\`\`

\`INSERT OR IGNORE\`를 사용하면 기본키가 중복될 때 오류를 내지 않고 저장을 건너뛴다. 중복 데이터가 자주 들어오는 수집 작업에서 유용하다.

## 20.5.6 JSON Lines 데이터를 DB에 저장하기

\`\`\`python
# src/data_tools/database.py


def import_products_from_jsonl(
    db_path: str | Path,
    jsonl_path: str | Path,
) -> tuple[int, int]:
    inserted = 0
    skipped = 0

    with connect(db_path) as connection:
        create_tables(connection)

        for product in read_jsonl(jsonl_path):
            try:
                was_inserted = insert_product(connection, product)
            except (KeyError, ValueError, TypeError) as error:
                logger.warning("상품 저장 실패: product=%s error=%s", product, error)
                skipped += 1
                continue

            if was_inserted:
                inserted += 1
            else:
                skipped += 1

        connection.commit()

    logger.info("DB 저장 완료: inserted=%s skipped=%s", inserted, skipped)
    return inserted, skipped
\`\`\`

여기서는 일부 데이터가 잘못되어도 전체 저장 작업이 멈추지 않게 했다. 대신 실패한 데이터는 로그로 남긴다. 실무 데이터 처리에서는 “일부 실패 때문에 전체 프로그램이 중단될 것인지”를 신중하게 결정해야 한다.

## 20.5.7 분석용 CSV로 내보내기

\`\`\`python
# src/data_tools/database.py

import csv


def export_products_to_csv(
    db_path: str | Path,
    output_path: str | Path,
) -> int:
    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)

    with connect(db_path) as connection:
        cursor = connection.execute(
            """
            SELECT id, name, price, collected_at
            FROM products
            ORDER BY collected_at, id
            """
        )
        rows = cursor.fetchall()

    with path.open("w", encoding="utf-8-sig", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["id", "name", "price", "collected_at"])
        writer.writerows(rows)

    logger.info("분석용 CSV 내보내기 완료: path=%s count=%s", path, len(rows))
    return len(rows)
\`\`\`

이제 API로 수집한 JSON Lines 데이터를 DB에 저장하고, 분석용 CSV로 내보낼 수 있다.

## 20.5.8 실행 예제

\`\`\`python
from data_tools.database import import_products_from_jsonl, export_products_to_csv


inserted, skipped = import_products_from_jsonl(
    db_path="data/processed/products.db",
    jsonl_path="data/raw/products.jsonl",
)

print(f"DB 저장 완료: 저장 {inserted}건, 건너뜀 {skipped}건")

count = export_products_to_csv(
    db_path="data/processed/products.db",
    output_path="data/processed/products_for_analysis.csv",
)

print(f"분석용 CSV 생성 완료: {count}건")
\`\`\`

---

# 20.6 네 프로젝트를 하나의 흐름으로 연결하기

이제 네 프로젝트를 하나의 데이터 준비 흐름으로 연결해 보자.

\`\`\`text
1. API에서 원천 데이터를 수집한다.
2. JSON Lines로 저장한다.
3. SQLite DB에 저장한다.
4. 분석용 CSV로 내보낸다.
5. CSV 검증 도구로 필수 컬럼과 값 형식을 검사한다.
6. 로그 파일에서 에러 패턴을 추출해 문제를 확인한다.
\`\`\`

이 흐름은 실제 데이터분석 프로젝트의 전처리 단계와 비슷하다.

## 20.6.1 전체 실행 흐름

\`\`\`text
API 수집
  ↓
JSON Lines 저장
  ↓
SQLite 저장
  ↓
분석용 CSV 내보내기
  ↓
CSV 검증
  ↓
정상 데이터와 실패 데이터 분리
  ↓
분석 과정으로 전달
\`\`\`

이 흐름을 코드로 표현하면 다음과 같다.

\`\`\`python
from data_tools.api_client import APIClientConfig, PaginatedAPIClient, write_jsonl
from data_tools.database import import_products_from_jsonl, export_products_to_csv
from data_tools.csv_tools import validate_csv_file


api_config = APIClientConfig(base_url="https://example.com/api")
client = PaginatedAPIClient(api_config)

items = client.iter_items(endpoint="products", item_key="items", max_pages=10)
write_jsonl("data/raw/products.jsonl", items)

import_products_from_jsonl(
    db_path="data/processed/products.db",
    jsonl_path="data/raw/products.jsonl",
)

export_products_to_csv(
    db_path="data/processed/products.db",
    output_path="data/processed/products_for_analysis.csv",
)

validate_csv_file(
    input_path="data/processed/products_for_analysis.csv",
    valid_output_path="data/processed/products_valid.csv",
    invalid_output_path="data/invalid/products_invalid.csv",
    required_columns=["id", "name", "price", "collected_at"],
    numeric_columns=["price"],
)
\`\`\`

이 코드는 예시이므로 실제 프로젝트에서는 설정 파일, 로깅, 예외 처리를 함께 연결해야 한다.

## 20.6.2 종합 CLI 설계하기

실무에서는 하나의 CLI에 여러 하위 명령을 만들 수 있다.

\`\`\`bash
python -m data_tools.cli validate-csv data/raw/orders.csv
python -m data_tools.cli collect-api products
python -m data_tools.cli parse-log data/raw/app.log
python -m data_tools.cli export-db data/processed/products.db
\`\`\`

\`argparse\`의 subparser를 사용하면 다음처럼 구성할 수 있다.

\`\`\`python
# src/data_tools/cli.py

import argparse


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="데이터 준비 도구")
    subparsers = parser.add_subparsers(dest="command", required=True)

    validate_parser = subparsers.add_parser("validate-csv", help="CSV 파일 검증")
    validate_parser.add_argument("input")

    api_parser = subparsers.add_parser("collect-api", help="API 데이터 수집")
    api_parser.add_argument("endpoint")
    api_parser.add_argument("--max-pages", type=int, default=10)

    log_parser = subparsers.add_parser("parse-log", help="에러 로그 추출")
    log_parser.add_argument("input")
    log_parser.add_argument("--output", default="data/processed/error_logs.csv")

    export_parser = subparsers.add_parser("export-db", help="DB 데이터를 CSV로 내보내기")
    export_parser.add_argument("db_path")
    export_parser.add_argument("--output", default="data/processed/products_for_analysis.csv")

    parser.add_argument("--config", default="config.ini")

    return parser
\`\`\`

하위 명령을 사용하면 하나의 실행 파일 안에서 여러 기능을 관리할 수 있다.

## 20.6.3 예외 처리 전략

종합 프로젝트에서는 예외를 어디서 처리할지 정해야 한다.

권장 방식은 다음과 같다.

\`\`\`text
- 작은 함수에서는 예외를 무조건 숨기지 않는다.
- 복구 가능한 오류는 해당 위치에서 처리한다.
- 전체 프로그램을 중단해야 하는 오류는 상위로 올린다.
- CLI의 main() 근처에서 사용자에게 보여줄 메시지를 정리한다.
- 상세 오류는 로그로 남긴다.
\`\`\`

예를 들어 다음처럼 작성할 수 있다.

\`\`\`python
import logging

logger = logging.getLogger(__name__)


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()

    try:
        run_command(args)
    except FileNotFoundError as error:
        logger.exception("파일을 찾을 수 없습니다")
        print(f"파일을 찾을 수 없습니다: {error}")
    except ValueError as error:
        logger.exception("입력값이 올바르지 않습니다")
        print(f"입력값이 올바르지 않습니다: {error}")
    except Exception as error:
        logger.exception("예상하지 못한 오류가 발생했습니다")
        print(f"예상하지 못한 오류가 발생했습니다: {error}")
\`\`\`

실무에서는 마지막 \`except Exception\`을 남용하면 안 된다. 하지만 CLI 프로그램의 최상위에서는 프로그램이 아무 메시지 없이 종료되는 것을 막기 위해 사용할 수 있다. 중요한 것은 상세 오류를 로그로 남기는 것이다.

## 20.6.4 로그 설계

종합 프로젝트에서는 로그 메시지를 다음 기준으로 나누면 좋다.

| 로그 레벨 | 사용하는 상황 |
|---|---|
| \`DEBUG\` | 개발 중 상세 상태 확인 |
| \`INFO\` | 정상 실행 흐름 기록 |
| \`WARNING\` | 일부 데이터 실패, 재시도 등 |
| \`ERROR\` | 작업 실패 |
| \`CRITICAL\` | 프로그램 전체 중단 수준의 심각한 오류 |

예를 들어 CSV 검증 도구에서는 다음 로그가 필요하다.

\`\`\`text
INFO - CSV 검증 시작
INFO - 입력 파일 경로
INFO - 전체 행 수
INFO - 정상 행 수
INFO - 실패 행 수
WARNING - 특정 행 검증 실패
ERROR - 필수 컬럼 누락으로 처리 중단
\`\`\`

로그를 잘 남기면 나중에 데이터분석 결과가 이상할 때 원인을 추적할 수 있다.

---

# 20.7 최종 코드 리뷰 기준

종합 실습에서는 결과 파일이 만들어지는 것도 중요하지만, 코드의 구조를 점검하는 일이 더 중요하다. 다음 기준으로 자신이 작성한 코드를 검토해 보자.

## 20.7.1 함수 분리

다음 질문을 확인한다.

\`\`\`text
- 한 함수가 너무 많은 일을 하고 있지 않은가?
- 파일 읽기와 데이터 검증이 분리되어 있는가?
- 데이터 변환과 저장이 분리되어 있는가?
- 테스트하기 쉬운 작은 함수가 있는가?
\`\`\`

나쁜 예시는 다음과 같다.

\`\`\`python
def process_all():
    # 파일 읽기
    # 검증
    # 변환
    # 저장
    # 로그
    # 출력
    pass
\`\`\`

좋은 방향은 다음과 같다.

\`\`\`python
def read_data(path):
    ...


def validate_data(rows):
    ...


def save_data(path, rows):
    ...


def run_pipeline(input_path, output_path):
    rows = read_data(input_path)
    valid_rows = validate_data(rows)
    save_data(output_path, valid_rows)
\`\`\`

## 20.7.2 클래스 설계

클래스를 만들었다면 다음을 확인한다.

\`\`\`text
- 클래스가 하나의 책임을 가지는가?
- 클래스 이름이 역할을 잘 드러내는가?
- 속성과 메서드가 자연스럽게 묶여 있는가?
- 상속을 억지로 사용하지 않았는가?
- 조합으로 해결할 수 있는 문제를 상속으로 복잡하게 만들지 않았는가?
\`\`\`

API 클라이언트처럼 공통 상태가 필요한 경우 클래스가 적합하다.

\`\`\`python
client = APIClient(config)
client.get_json("products")
\`\`\`

반면 단순한 문자열 검증 함수처럼 상태가 필요 없는 기능은 함수로 충분하다.

\`\`\`python
def is_valid_email(value: str) -> bool:
    ...
\`\`\`

## 20.7.3 타입 힌트

타입 힌트는 코드 실행을 직접 바꾸지는 않지만, 코드 이해를 크게 돕는다.

확인할 항목은 다음과 같다.

\`\`\`text
- 함수 매개변수 타입이 표시되어 있는가?
- 반환값 타입이 표시되어 있는가?
- dict[str, str]처럼 데이터 구조가 명확한가?
- Iterator, Iterable 같은 반복 타입을 적절히 사용했는가?
- Any를 남용하지 않았는가?
\`\`\`

## 20.7.4 예외 처리

예외 처리는 많다고 좋은 것이 아니다. 필요한 위치에서 적절히 처리해야 한다.

확인할 항목은 다음과 같다.

\`\`\`text
- 모든 예외를 무조건 숨기고 있지 않은가?
- 어떤 오류가 발생했는지 로그에 남기는가?
- 사용자에게 보여줄 메시지와 개발자용 로그를 구분했는가?
- 일부 데이터 실패와 전체 프로그램 실패를 구분했는가?
\`\`\`

## 20.7.5 로깅

로그는 나중에 프로그램을 운영할 때 중요하다.

확인할 항목은 다음과 같다.

\`\`\`text
- 프로그램 시작과 종료를 기록하는가?
- 입력 파일과 출력 파일 경로를 기록하는가?
- 처리 건수를 기록하는가?
- 실패한 행이나 요청을 기록하는가?
- 예외 발생 시 stack trace를 남기는가?
\`\`\`

## 20.7.6 테스트

종합 실습에서 모든 코드를 완벽히 테스트할 필요는 없다. 하지만 핵심 로직은 테스트해야 한다.

우선순위는 다음과 같다.

\`\`\`text
1. 순수 함수
2. 데이터 검증 함수
3. 정규표현식 파싱 함수
4. 변환 함수
5. 예외가 발생해야 하는 함수
\`\`\`

파일, API, DB처럼 외부 환경에 의존하는 코드는 fixture나 mock을 사용해서 테스트할 수 있다.

## 20.7.7 성능

성능 최적화는 가장 마지막에 한다. 하지만 대용량 데이터를 다룰 가능성이 있다면 처음부터 다음 습관은 지키는 것이 좋다.

\`\`\`text
- 큰 파일은 한 줄씩 처리한다.
- 불필요하게 리스트로 모두 만들지 않는다.
- 포함 여부 확인이 많으면 set을 고려한다.
- 같은 계산을 반복하면 캐싱을 고려한다.
- 먼저 측정하고 최적화한다.
\`\`\`

---

# 20.8 종합 실습 과제

이번 장의 과제는 단순 문제 풀이가 아니라 작은 프로그램을 완성하는 형태다. 모든 과제를 한 번에 완성하지 않아도 된다. 먼저 핵심 기능을 만들고, 그다음 예외 처리, 로깅, 테스트를 추가하는 방식으로 진행한다.

## 과제 1. CSV 데이터 검증 도구 완성하기

다음 조건을 만족하는 CSV 검증 도구를 작성하라.

\`\`\`text
입력:
- 주문 데이터 CSV 파일

필수 컬럼:
- order_id
- customer_id
- order_date
- amount

검증 규칙:
- 필수 컬럼이 모두 있어야 한다.
- 필수 컬럼 값은 비어 있으면 안 된다.
- amount는 숫자로 변환 가능해야 한다.

출력:
- 정상 행 CSV
- 실패 행 CSV
- 실패 행에는 errors 컬럼 추가
\`\`\`

추가 조건은 다음과 같다.

\`\`\`text
- 검증 함수는 파일 입출력과 분리한다.
- 처리 결과를 로그로 남긴다.
- validate_row 함수는 pytest로 테스트한다.
\`\`\`

## 과제 2. JSON Lines 저장 함수 만들기

다음 데이터를 JSON Lines 파일로 저장하는 함수를 작성하라.

\`\`\`python
items = [
    {"id": "P001", "name": "Keyboard", "price": 30000},
    {"id": "P002", "name": "Mouse", "price": 15000},
    {"id": "P003", "name": "Monitor", "price": 200000},
]
\`\`\`

요구사항은 다음과 같다.

\`\`\`text
- ensure_ascii=False를 사용한다.
- 한 줄에 하나의 JSON 객체를 저장한다.
- 저장한 건수를 반환한다.
- 출력 폴더가 없으면 생성한다.
\`\`\`

## 과제 3. 로그 파일에서 ERROR 추출하기

다음 형식의 로그에서 \`ERROR\` 행만 추출하라.

\`\`\`text
2026-01-01 10:00:01 INFO user_id=U001 action=login
2026-01-01 10:00:03 ERROR user_id=U002 code=E500 message="server error"
2026-01-01 10:00:08 ERROR user_id=U003 code=E404 message="not found"
\`\`\`

출력 CSV 컬럼은 다음과 같다.

\`\`\`text
timestamp,user_id,code,message
\`\`\`

추가 조건은 다음과 같다.

\`\`\`text
- 정규표현식을 사용한다.
- 큰 파일을 고려해서 한 줄씩 처리한다.
- 파싱 실패 행은 로그로 남긴다.
\`\`\`

## 과제 4. SQLite에 상품 데이터 저장하기

JSON Lines 파일에서 상품 데이터를 읽어 SQLite DB에 저장하라.

테이블 구조는 다음과 같다.

\`\`\`sql
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    collected_at TEXT NOT NULL
);
\`\`\`

요구사항은 다음과 같다.

\`\`\`text
- id가 중복되면 저장하지 않는다.
- 잘못된 데이터는 건너뛰고 로그로 남긴다.
- 저장 건수와 건너뛴 건수를 반환한다.
- DB 데이터를 분석용 CSV로 내보낸다.
\`\`\`

## 과제 5. 하나의 CLI로 묶기

다음 명령을 지원하는 CLI 프로그램을 작성하라.

\`\`\`bash
python -m data_tools.cli validate-csv data/raw/orders.csv
python -m data_tools.cli parse-log data/raw/app.log
python -m data_tools.cli import-db data/raw/products.jsonl
python -m data_tools.cli export-db data/processed/products.db
\`\`\`

요구사항은 다음과 같다.

\`\`\`text
- argparse subparser를 사용한다.
- --config 옵션을 제공한다.
- 로그 파일을 생성한다.
- 사용자에게 처리 결과를 출력한다.
\`\`\`

---

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

# 20.10 전체 과정 마무리

파이썬 고급 과정은 단순히 어려운 문법을 배우는 과정이 아니다. 이 과정의 핵심은 **파이썬을 안정적인 실무 도구로 사용하는 방법**을 익히는 것이다.

지금까지 배운 내용을 다시 정리해 보자.

\`\`\`text
1장  고급 파이썬으로 들어가기
2장  파이썬 실행 구조와 객체 모델
3장  함수 고급 활용
4장  이터레이터와 제너레이터
5장  데코레이터
6장  컨텍스트 매니저와 리소스 관리
7장  객체지향 프로그래밍 심화
8장  파이썬 데이터 모델
9장  타입 힌트 심화
10장 모듈, 패키지, 프로젝트 구조
11장 예외 처리와 로깅 심화
12장 테스트 심화
13장 파일과 데이터 입출력 심화
14장 API와 네트워크 데이터 처리
15장 데이터베이스 기초
16장 동시성 프로그래밍
17장 성능 최적화 기초
18장 실무 자동화와 CLI 프로그램
19장 데이터분석 과정으로 넘어가기 전 준비
20장 종합 실습
\`\`\`

이제 파이썬 문법을 단순히 아는 것을 넘어, 다음 질문을 스스로 할 수 있어야 한다.

\`\`\`text
- 이 코드는 어떤 책임을 가지고 있는가?
- 이 함수는 테스트하기 쉬운가?
- 이 데이터는 어디서 들어오고 어디로 나가는가?
- 실패했을 때 어떤 일이 일어나는가?
- 로그로 원인을 추적할 수 있는가?
- 데이터가 커져도 메모리 문제가 없는가?
- 이후 데이터분석 과정에서 바로 사용할 수 있는 형태인가?
\`\`\`

데이터분석 기초 과정에서는 이제 준비된 데이터를 실제로 분석한다. \`NumPy\`, \`pandas\`, 시각화, 결측치 처리, 그룹화, 집계, 탐색적 데이터 분석을 배우게 된다. 그때 이 고급 파이썬 과정에서 익힌 코드 구조, 예외 처리, 파일 처리, API 수집, DB 저장, 테스트 습관은 분석 작업의 기반이 된다.

데이터분석에서 좋은 결과를 얻으려면 좋은 분석 기법도 필요하지만, 그보다 먼저 좋은 데이터 준비 과정이 필요하다. 이 장의 종합 실습은 그 준비 과정을 직접 구현하는 연습이다.

---

## 20장 핵심 정리

- 종합 실습의 목표는 여러 문법을 하나의 실무 흐름으로 연결하는 것이다.
- CSV 검증 도구는 필수 컬럼, 빈 값, 숫자 변환 가능 여부를 확인한다.
- API 수집기는 timeout, 재시도, 페이지네이션, 저장 형식을 고려해야 한다.
- 로그 전처리기는 큰 파일을 한 줄씩 처리하고 필요한 패턴만 추출한다.
- SQLite 저장 도구는 중복 데이터 관리와 조건 조회에 유용하다.
- JSON Lines는 API 수집 결과를 한 줄씩 저장하기에 적합하다.
- 좋은 프로그램은 입력, 처리, 출력, 예외 처리, 로그, 테스트가 분리되어 있다.
- 데이터분석 전에 원천 데이터를 검증하고 정리하는 과정이 필요하다.
- 코드 리뷰 기준은 함수 분리, 클래스 설계, 타입 힌트, 예외 처리, 로깅, 테스트, 성능이다.
- 고급 파이썬은 데이터분석을 위한 안정적인 기반이 된다.

---

## 마무리 질문

다음 질문에 답해 보자.

1. CSV 검증 도구에서 검증 로직과 파일 입출력을 분리해야 하는 이유는 무엇인가?
2. API 수집 결과를 JSON Lines로 저장하면 어떤 장점이 있는가?
3. 큰 로그 파일을 처리할 때 리스트에 모든 줄을 담지 않는 이유는 무엇인가?
4. SQLite에서 \`INSERT OR IGNORE\`를 사용하면 어떤 효과가 있는가?
5. CLI 프로그램에서 \`main()\` 함수가 너무 길어지면 어떤 문제가 생기는가?
6. 데이터분석 전에 데이터 품질을 점검해야 하는 이유는 무엇인가?
7. 종합 실습 코드에서 가장 먼저 테스트해야 하는 부분은 어디인가?
8. 로그를 남기지 않은 자동화 프로그램은 운영 중 어떤 문제가 생길 수 있는가?

---

## 다음 과정으로 이어가기

고급 파이썬 과정이 끝나면 데이터분석 기초 과정으로 넘어간다. 다음 과정에서는 준비된 데이터를 바탕으로 다음 내용을 학습한다.

\`\`\`text
- NumPy 배열 기초
- pandas Series와 DataFrame
- CSV와 엑셀 데이터 읽기
- 데이터 선택과 필터링
- 결측치 처리
- 중복 데이터 처리
- 그룹화와 집계
- 데이터 시각화 기초
- 탐색적 데이터 분석
\`\`\`

고급 파이썬 과정에서 만든 CSV 검증 도구, API 수집기, 로그 전처리기, SQLite 저장 도구는 데이터분석 과정의 입력 데이터를 준비하는 기반이 된다. 이제 파이썬은 단순한 문법 학습 도구가 아니라, 실제 데이터를 다루고 분석하기 위한 작업 환경이 된다.
`;export{e as default};