var e=`<!-- 원본: python_advanced_chapter_20_book.md / 세부 장: 20-1 -->

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
`;export{e as default};