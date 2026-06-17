var e=`<!-- 원본: python_advanced_chapter_20_book.md / 세부 장: 20-6 -->

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
`;export{e as default};