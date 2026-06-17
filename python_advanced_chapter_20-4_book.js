var e=`<!-- 원본: python_advanced_chapter_20_book.md / 세부 장: 20-4 -->

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
`;export{e as default};