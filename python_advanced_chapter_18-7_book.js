var e=`<!-- 원본: python_advanced_chapter_18_book.md / 세부 장: 18-7 -->

# 18.7 종합 실습: CSV 검증 CLI 만들기

이번에는 데이터분석 과정으로 이어지는 예제를 살펴보자.  
데이터분석을 하기 전에는 원천 데이터가 올바른지 확인해야 한다. CSV 파일에 필수 컬럼이 없거나 빈 값이 많으면 분석 결과도 신뢰하기 어렵다.

이번 실습의 목표는 다음과 같다.

\`\`\`text
1. CSV 파일 경로를 입력받는다.
2. 필수 컬럼 목록을 옵션으로 받는다.
3. 필수 컬럼이 없으면 실패 처리한다.
4. 각 행에서 필수값이 비어 있는지 검사한다.
5. 문제가 있는 행을 CSV로 저장한다.
6. 전체 결과를 화면과 로그에 출력한다.
\`\`\`

실행 예시는 다음과 같다.

\`\`\`bash
python validate_csv.py customers.csv --required name email phone --failed-output result/failed_rows.csv
\`\`\`

---

### 18.7.1 CSV 검증 CLI 예제 코드

\`\`\`python
from __future__ import annotations

import argparse
import csv
import logging
from pathlib import Path

logger = logging.getLogger(__name__)


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="CSV 필수 컬럼과 빈 값을 검사하는 도구")

    parser.add_argument("input_file", help="검사할 CSV 파일 경로")

    parser.add_argument(
        "--required",
        nargs="+",
        required=True,
        help="필수 컬럼 목록",
    )

    parser.add_argument(
        "--failed-output",
        default="result/failed_rows.csv",
        help="문제 행 저장 파일",
    )

    parser.add_argument(
        "--encoding",
        default="utf-8",
        help="CSV 파일 인코딩",
    )

    return parser.parse_args(argv)


def read_csv(path: Path, encoding: str) -> list[dict[str, str]]:
    with path.open("r", encoding=encoding, newline="") as file:
        reader = csv.DictReader(file)
        return list(reader)


def check_required_columns(rows: list[dict[str, str]], required: list[str]) -> None:
    if not rows:
        raise ValueError("CSV 파일에 데이터가 없습니다.")

    columns = set(rows[0].keys())
    missing = [column for column in required if column not in columns]

    if missing:
        raise ValueError(f"필수 컬럼이 없습니다: {missing}")


def find_failed_rows(
    rows: list[dict[str, str]],
    required: list[str],
) -> list[dict[str, str]]:
    failed_rows: list[dict[str, str]] = []

    for index, row in enumerate(rows, start=2):
        missing_values = [
            column
            for column in required
            if not row.get(column, "").strip()
        ]

        if missing_values:
            failed_row = dict(row)
            failed_row["row_number"] = str(index)
            failed_row["error"] = f"빈 값 컬럼: {', '.join(missing_values)}"
            failed_rows.append(failed_row)

    return failed_rows


def save_failed_rows(path: Path, rows: list[dict[str, str]]) -> None:
    if not rows:
        return

    path.parent.mkdir(parents=True, exist_ok=True)

    fieldnames = list(rows[0].keys())

    with path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)

    input_file = Path(args.input_file)
    failed_output = Path(args.failed_output)

    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",
    )

    try:
        rows = read_csv(input_file, encoding=args.encoding)
        check_required_columns(rows, args.required)
        failed_rows = find_failed_rows(rows, args.required)
        save_failed_rows(failed_output, failed_rows)

        print(f"전체 행 수: {len(rows)}")
        print(f"문제 행 수: {len(failed_rows)}")

        if failed_rows:
            print(f"문제 행 저장 위치: {failed_output}")

        logger.info("CSV 검증 완료")
        return 0

    except Exception as error:
        logger.exception("CSV 검증 실패")
        print(f"검증 실패: {error}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
\`\`\`

---

### 18.7.2 데이터분석 과정과의 연결

데이터분석에서는 \`pandas\`를 사용해 데이터를 분석하는 일이 많다.  
하지만 분석 전에 데이터가 어떤 상태인지 확인하지 않으면, 분석 결과가 잘못될 수 있다.

예를 들어 다음과 같은 문제는 분석 전에 발견하는 것이 좋다.

- 필수 컬럼이 없음
- 이메일이 비어 있음
- 전화번호 형식이 다름
- 날짜 형식이 섞여 있음
- 금액 컬럼에 문자가 들어 있음
- 중복 행이 있음

CLI 검증 도구를 만들어두면 분석 전에 원천 데이터를 자동으로 검사할 수 있다.

\`\`\`bash
python validate_csv.py customers.csv --required name email phone
\`\`\`

이런 도구는 데이터분석 기초 과정으로 넘어가기 전에 매우 좋은 준비가 된다.

---
`;export{e as default};