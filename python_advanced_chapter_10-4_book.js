var e=`<!-- 원본: python_advanced_chapter_10_book.md / 세부 장: 10-4 -->

# 10.4 설정 관리

실무 코드에는 설정값이 많습니다.

\`\`\`text
입력 파일 경로
출력 파일 경로
로그 파일 경로
API URL
API Key
데이터베이스 경로
재시도 횟수
타임아웃 시간
실행 환경
\`\`\`

이런 값을 코드 중간에 직접 쓰면 유지보수가 어려워집니다.

\`\`\`python
# 좋지 않은 예
response = requests.get(
    "https://api.example.com/orders",
    headers={"Authorization": "Bearer abc123"},
    timeout=3,
)
\`\`\`

API URL, 인증 토큰, 타임아웃이 코드에 직접 들어가 있습니다. 나중에 값이 바뀌면 코드를 수정해야 합니다. 특히 인증 토큰 같은 민감 정보는 코드에 직접 쓰면 위험합니다.

설정 관리는 이런 값을 코드에서 분리하는 작업입니다.

---

## 10.4.1 설정값을 분리해야 하는 이유

설정값을 분리해야 하는 이유는 다음과 같습니다.

\`\`\`text
1. 환경마다 값이 다를 수 있다.
2. 자주 바뀌는 값을 코드와 분리할 수 있다.
3. 민감 정보를 코드에 직접 쓰지 않을 수 있다.
4. 테스트 환경과 실제 실행 환경을 나눌 수 있다.
5. 코드 재사용성이 좋아진다.
\`\`\`

예를 들어 개발 환경에서는 테스트용 API를 쓰고, 실제 운영 환경에서는 운영 API를 써야 할 수 있습니다.

\`\`\`text
개발 환경 API: https://dev-api.example.com
운영 환경 API: https://api.example.com
\`\`\`

이 값을 코드에 직접 쓰면 환경을 바꿀 때마다 코드를 수정해야 합니다. 설정 파일이나 환경 변수를 사용하면 실행 환경에 따라 값을 바꿀 수 있습니다.

---

## 10.4.2 파이썬 설정 파일 사용

가장 간단한 방법은 \`config.py\` 파일을 만드는 것입니다.

\`\`\`python
# config.py
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
LOG_DIR = BASE_DIR / "logs"

INPUT_FILE = DATA_DIR / "sales.csv"
OUTPUT_FILE = DATA_DIR / "result.json"
LOG_FILE = LOG_DIR / "app.log"
\`\`\`

다른 파일에서는 다음처럼 가져와 사용할 수 있습니다.

\`\`\`python
from config import INPUT_FILE, OUTPUT_FILE

print(INPUT_FILE)
print(OUTPUT_FILE)
\`\`\`

이 방식은 간단하고 파이썬 코드이기 때문에 경로 계산이나 기본값 처리도 쉽게 할 수 있습니다.

다만 \`config.py\`에 비밀번호나 API Key 같은 민감 정보를 직접 쓰는 것은 피해야 합니다.

---

## 10.4.3 JSON 설정 파일 사용

설정값을 JSON 파일로 분리할 수도 있습니다.

\`\`\`json
{
  "input_file": "data/sales.csv",
  "output_file": "data/result.json",
  "log_file": "logs/app.log",
  "timeout": 5
}
\`\`\`

이를 읽는 코드는 다음과 같습니다.

\`\`\`python
import json
from pathlib import Path
from typing import Any


def load_config(path: str | Path) -> dict[str, Any]:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


config = load_config("config.json")

print(config["input_file"])
print(config["timeout"])
\`\`\`

JSON 설정 파일은 사람이 읽기 쉽고, 다른 언어와도 호환됩니다. 하지만 주석을 직접 쓸 수 없고, 타입이 명확하지 않다는 단점이 있습니다.

타입 힌트를 더하고 싶다면 \`TypedDict\`를 사용할 수 있습니다.

\`\`\`python
from typing import TypedDict


class AppConfig(TypedDict):
    input_file: str
    output_file: str
    log_file: str
    timeout: int
\`\`\`

\`\`\`python
import json
from pathlib import Path


def load_config(path: str | Path) -> AppConfig:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)
\`\`\`

이렇게 하면 설정값의 구조를 코드에 표현할 수 있습니다.

---

## 10.4.4 환경 변수 사용

민감 정보는 보통 환경 변수로 관리합니다.

환경 변수는 운영체제나 실행 환경에 저장된 값입니다. 파이썬에서는 \`os.environ\`으로 읽을 수 있습니다.

\`\`\`python
import os

api_key = os.environ.get("API_KEY")

if api_key is None:
    raise RuntimeError("API_KEY 환경 변수가 설정되어 있지 않습니다.")
\`\`\`

환경 변수는 다음 값들을 저장할 때 자주 사용합니다.

\`\`\`text
API Key
비밀번호
데이터베이스 접속 정보
인증 토큰
실행 환경 이름
\`\`\`

환경 변수를 사용하는 이유는 민감 정보를 코드 저장소에 남기지 않기 위해서입니다.

좋지 않은 예입니다.

\`\`\`python
API_KEY = "sk-xxxxxxxxxxxxxxxx"
\`\`\`

이런 값이 코드에 들어가면 Git에 커밋될 수 있습니다. 한 번 공개 저장소에 올라간 비밀값은 삭제해도 이미 노출되었다고 보는 것이 안전합니다.

더 나은 방식은 다음과 같습니다.

\`\`\`python
import os

API_KEY = os.environ["API_KEY"]
\`\`\`

\`os.environ["API_KEY"]\`는 값이 없을 때 바로 \`KeyError\`를 발생시킵니다. 반드시 있어야 하는 값에는 이 방식이 적합할 수 있습니다.

기본값이 있어도 되는 설정에는 \`get()\`을 사용할 수 있습니다.

\`\`\`python
import os

TIMEOUT = int(os.environ.get("TIMEOUT", "5"))
\`\`\`

환경 변수는 문자열로 들어오기 때문에 숫자가 필요하면 직접 변환해야 합니다.

---

## 10.4.5 설정 객체 만들기

설정값이 많아지면 딕셔너리보다 클래스로 관리하는 것이 좋을 수 있습니다.

\`\`\`python
from dataclasses import dataclass
from pathlib import Path
import os


@dataclass(frozen=True)
class Settings:
    input_file: Path
    output_file: Path
    log_file: Path
    api_key: str
    timeout: int = 5


def load_settings() -> Settings:
    api_key = os.environ.get("API_KEY")
    if api_key is None:
        raise RuntimeError("API_KEY가 설정되어 있지 않습니다.")

    return Settings(
        input_file=Path(os.environ.get("INPUT_FILE", "data/sales.csv")),
        output_file=Path(os.environ.get("OUTPUT_FILE", "data/result.json")),
        log_file=Path(os.environ.get("LOG_FILE", "logs/app.log")),
        api_key=api_key,
        timeout=int(os.environ.get("TIMEOUT", "5")),
    )
\`\`\`

\`frozen=True\`를 사용하면 설정 객체를 만든 뒤 값을 바꾸지 못하게 할 수 있습니다.

\`\`\`python
settings = load_settings()
print(settings.input_file)
\`\`\`

설정 객체를 사용하면 함수에 필요한 설정을 명확히 전달할 수 있습니다.

\`\`\`python
def run(settings: Settings) -> None:
    print(settings.input_file)
    print(settings.output_file)
\`\`\`

전역 변수에 직접 의존하는 것보다 테스트하기 쉽고 구조가 명확합니다.

---
`;export{e as default};