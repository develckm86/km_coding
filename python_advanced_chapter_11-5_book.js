var e=`<!-- 원본: python_advanced_chapter_11_book.md / 세부 장: 11-5 -->

# 11.5 로깅 심화

예외 처리는 실패를 다루는 방법입니다. 로깅은 프로그램이 실행되는 동안 무슨 일이 있었는지 기록하는 방법입니다.

기초 과정에서는 \`print()\`로 값을 확인했습니다. 하지만 실무에서는 \`print()\`만으로는 부족합니다.

\`\`\`text
언제 실행되었는가?
어떤 파일을 처리했는가?
몇 건을 성공했고 몇 건을 실패했는가?
오류는 어느 함수에서 발생했는가?
실패한 데이터는 무엇인가?
프로그램이 자동 실행되었을 때 결과를 어디서 확인할 수 있는가?
\`\`\`

이런 정보를 남기기 위해 \`logging\` 모듈을 사용합니다.

---

## 11.5.1 \`print()\`와 \`logging\`의 차이

\`print()\`는 화면에 값을 출력합니다.

\`\`\`python
print("파일 처리를 시작합니다.")
\`\`\`

간단한 학습이나 디버깅에는 좋습니다. 하지만 실무 프로그램에서는 다음 한계가 있습니다.

\`\`\`text
로그 레벨을 구분하기 어렵다.
파일로 저장하기 번거롭다.
시간 정보를 일관되게 남기기 어렵다.
모듈별 로그를 구분하기 어렵다.
운영 환경에서 출력 위치를 관리하기 어렵다.
\`\`\`

\`logging\`은 이런 문제를 해결하기 위한 표준 도구입니다.

\`\`\`python
import logging

logging.info("파일 처리를 시작합니다.")
logging.warning("일부 데이터가 비어 있습니다.")
logging.error("파일 저장에 실패했습니다.")
\`\`\`

\`logging\`은 메시지에 레벨을 붙일 수 있고, 콘솔과 파일에 동시에 남길 수도 있으며, 형식을 통일할 수도 있습니다.

---

## 11.5.2 로그 레벨

로그 레벨은 메시지의 중요도를 나타냅니다.

| 레벨 | 의미 | 예시 |
|---|---|---|
| \`DEBUG\` | 개발 중 상세 정보 | 변수값, 반복 횟수, 내부 상태 |
| \`INFO\` | 정상 실행 흐름 | 작업 시작, 작업 완료, 처리 건수 |
| \`WARNING\` | 문제가 될 수 있지만 계속 실행 가능 | 일부 데이터 누락, 기본값 사용 |
| \`ERROR\` | 작업 일부 실패 | 파일 저장 실패, API 요청 실패 |
| \`CRITICAL\` | 프로그램 전체에 치명적 문제 | 필수 설정 없음, DB 연결 불가 |

예시는 다음과 같습니다.

\`\`\`python
import logging

logging.basicConfig(level=logging.INFO)

logging.debug("디버깅 정보입니다.")
logging.info("작업을 시작합니다.")
logging.warning("일부 값이 비어 있습니다.")
logging.error("파일 저장에 실패했습니다.")
logging.critical("필수 설정이 없습니다.")
\`\`\`

\`level=logging.INFO\`로 설정하면 \`INFO\` 이상의 로그만 출력됩니다. 따라서 \`DEBUG\` 메시지는 출력되지 않습니다.

---

## 11.5.3 로그 기본 설정

가장 간단한 로그 설정은 \`basicConfig()\`를 사용하는 것입니다.

\`\`\`python
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)

logging.info("프로그램을 시작합니다.")
\`\`\`

출력 예시는 다음과 비슷합니다.

\`\`\`text
2026-06-16 10:30:00,123 [INFO] 프로그램을 시작합니다.
\`\`\`

\`format\`에서 자주 사용하는 항목은 다음과 같습니다.

| 항목 | 의미 |
|---|---|
| \`%(asctime)s\` | 로그 발생 시간 |
| \`%(levelname)s\` | 로그 레벨 |
| \`%(name)s\` | logger 이름 |
| \`%(message)s\` | 로그 메시지 |
| \`%(filename)s\` | 파일명 |
| \`%(lineno)d\` | 줄 번호 |
| \`%(funcName)s\` | 함수 이름 |

실무에서는 최소한 시간, 레벨, logger 이름, 메시지를 포함하는 것이 좋습니다.

\`\`\`python
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s - %(message)s",
)
\`\`\`

---

## 11.5.4 모듈별 logger

작은 프로그램에서는 \`logging.info()\`처럼 바로 사용해도 됩니다. 하지만 프로젝트가 커지면 모듈별 logger를 사용하는 것이 좋습니다.

\`\`\`python
import logging

logger = logging.getLogger(__name__)


def process_file(path: str) -> None:
    logger.info("파일 처리를 시작합니다: %s", path)
\`\`\`

\`__name__\`은 현재 모듈 이름입니다. 예를 들어 \`services.file_service\` 모듈이라면 logger 이름도 \`services.file_service\`가 됩니다.

모듈별 logger를 사용하면 다음 장점이 있습니다.

\`\`\`text
어느 모듈에서 로그가 발생했는지 알 수 있다.
특정 모듈의 로그 레벨만 조정할 수 있다.
라이브러리 코드와 애플리케이션 코드의 로그를 구분할 수 있다.
\`\`\`

프로젝트 구조 예시는 다음과 같습니다.

\`\`\`text
my_app/
  main.py
  services/
    file_service.py
    api_service.py
\`\`\`

\`file_service.py\`에서 다음처럼 logger를 만들 수 있습니다.

\`\`\`python
# services/file_service.py

import logging

logger = logging.getLogger(__name__)


def read_file(path: str) -> str:
    logger.info("파일 읽기 시작: %s", path)

    with open(path, "r", encoding="utf-8") as file:
        return file.read()
\`\`\`

\`api_service.py\`에서도 같은 방식으로 logger를 만듭니다.

\`\`\`python
# services/api_service.py

import logging

logger = logging.getLogger(__name__)


def request_data(url: str) -> dict:
    logger.info("API 요청 시작: %s", url)
    return {"status": "ok"}
\`\`\`

이렇게 하면 로그에서 어떤 모듈이 메시지를 남겼는지 확인할 수 있습니다.

---

## 11.5.5 로그 메시지 작성 방식

로그 메시지에는 f-string을 사용할 수도 있지만, logging에서는 보통 다음 방식도 많이 사용합니다.

\`\`\`python
logger.info("파일 처리 시작: %s", path)
\`\`\`

이 방식은 메시지 템플릿과 값을 분리합니다.

\`\`\`python
# 가능은 하지만 대량 로그에서는 권장도가 떨어질 수 있음
logger.debug(f"현재 데이터: {expensive_function()}")

# logging이 필요할 때 포매팅하도록 값 전달
logger.debug("현재 데이터: %s", data)
\`\`\`

특히 \`DEBUG\` 로그처럼 실제로 출력되지 않을 수 있는 로그에서는 문자열을 미리 만들어 버리는 방식보다 값만 넘기는 방식이 더 적합할 수 있습니다.

좋은 로그 메시지는 다음 조건을 만족합니다.

\`\`\`text
무슨 작업을 하는지 알 수 있다.
중요한 식별자를 포함한다.
너무 많은 개인정보나 민감 정보를 담지 않는다.
문제가 발생했을 때 원인 추적에 도움이 된다.
\`\`\`

예를 들어 다음 로그는 부족합니다.

\`\`\`python
logger.info("처리 시작")
\`\`\`

더 나은 로그입니다.

\`\`\`python
logger.info("주문 파일 처리 시작: path=%s", path)
\`\`\`

데이터 처리 로그라면 처리 건수를 포함하면 좋습니다.

\`\`\`python
logger.info("주문 데이터 처리 완료: total=%d, success=%d, failed=%d", total, success, failed)
\`\`\`

---

## 11.5.6 파일에 로그 저장하기

자동화 프로그램은 사람이 화면을 보고 있지 않을 때 실행될 수 있습니다. 이때는 로그를 파일로 저장해야 합니다.

\`\`\`python
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s - %(message)s",
    filename="app.log",
    encoding="utf-8",
)

logger = logging.getLogger(__name__)

logger.info("프로그램을 시작합니다.")
\`\`\`

이 코드는 로그를 \`app.log\` 파일에 저장합니다.

파일 로그를 사용할 때는 다음 사항을 고려해야 합니다.

\`\`\`text
로그 파일 경로
로그 파일 인코딩
로그 파일 크기
로그 보관 기간
민감 정보 포함 여부
\`\`\`

로그 파일이 계속 커지는 문제도 있습니다. 이때 회전 로그를 사용할 수 있습니다.

---

## 11.5.7 Handler와 Formatter

\`basicConfig()\`는 간단하지만, 실무에서는 콘솔과 파일에 동시에 로그를 남기고 싶을 때가 많습니다. 이때 handler와 formatter를 직접 설정할 수 있습니다.

\`\`\`python
import logging

logger = logging.getLogger("my_app")
logger.setLevel(logging.INFO)

formatter = logging.Formatter(
    "%(asctime)s [%(levelname)s] %(name)s - %(message)s"
)

console_handler = logging.StreamHandler()
console_handler.setFormatter(formatter)

file_handler = logging.FileHandler("app.log", encoding="utf-8")
file_handler.setFormatter(formatter)

logger.addHandler(console_handler)
logger.addHandler(file_handler)

logger.info("콘솔과 파일에 동시에 기록됩니다.")
\`\`\`

이 구조에서 역할은 다음과 같습니다.

\`\`\`text
Logger: 로그 메시지를 생성하는 객체
Handler: 로그를 어디로 보낼지 결정하는 객체
Formatter: 로그 메시지 형식을 정하는 객체
\`\`\`

하나의 logger에 여러 handler를 붙일 수 있습니다.

\`\`\`text
logger
├── console_handler
└── file_handler
\`\`\`

따라서 같은 로그 메시지를 콘솔과 파일에 동시에 남길 수 있습니다.

---

## 11.5.8 회전 로그

로그 파일을 계속 하나의 파일에만 저장하면 파일이 너무 커질 수 있습니다. 이때 \`RotatingFileHandler\`를 사용할 수 있습니다.

\`\`\`python
import logging
from logging.handlers import RotatingFileHandler

logger = logging.getLogger("my_app")
logger.setLevel(logging.INFO)

formatter = logging.Formatter(
    "%(asctime)s [%(levelname)s] %(name)s - %(message)s"
)

handler = RotatingFileHandler(
    "app.log",
    maxBytes=1_000_000,
    backupCount=3,
    encoding="utf-8",
)
handler.setFormatter(formatter)

logger.addHandler(handler)

logger.info("회전 로그 예제입니다.")
\`\`\`

이 설정은 로그 파일이 약 1MB를 넘으면 새 파일로 회전하고, 백업 파일을 최대 3개까지 유지합니다.

실무에서는 다음과 같은 이유로 회전 로그가 필요합니다.

\`\`\`text
로그 파일이 무한히 커지는 것을 방지한다.
오래된 로그를 일정 개수만 보관한다.
디스크 용량 문제를 줄인다.
자동화 프로그램의 운영 안정성을 높인다.
\`\`\`

시간 기준으로 회전하고 싶다면 \`TimedRotatingFileHandler\`를 사용할 수 있습니다.

\`\`\`python
from logging.handlers import TimedRotatingFileHandler

handler = TimedRotatingFileHandler(
    "app.log",
    when="midnight",
    interval=1,
    backupCount=7,
    encoding="utf-8",
)
\`\`\`

이 설정은 매일 자정에 로그 파일을 회전하고 최근 7개 백업을 유지하는 방식입니다.

---

## 11.5.9 예외 정보 로그 남기기

예외가 발생했을 때 단순히 메시지만 남기면 원인을 찾기 어렵습니다.

\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    logger.error("계산에 실패했습니다.")
\`\`\`

이 로그에는 어떤 줄에서 예외가 발생했는지, traceback이 무엇인지 남지 않습니다.

예외 정보까지 남기려면 \`logger.exception()\`을 사용할 수 있습니다.

\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    logger.exception("계산 중 예외가 발생했습니다.")
\`\`\`

\`logger.exception()\`은 \`except\` 블록 안에서 사용해야 합니다. 현재 처리 중인 예외 정보와 traceback을 함께 기록합니다.

비슷하게 \`logger.error()\`에 \`exc_info=True\`를 줄 수도 있습니다.

\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    logger.error("계산 중 예외가 발생했습니다.", exc_info=True)
\`\`\`

일반적으로 예외를 기록할 때는 다음 기준을 사용합니다.

\`\`\`text
예외 정보와 traceback이 필요하면 logger.exception()
단순 오류 메시지만 필요하면 logger.error()
경고 수준이면 logger.warning()
\`\`\`

---

## 11.5.10 로그 중복 문제

하위 함수에서 예외를 로그로 남기고 다시 \`raise\`하면, 상위 함수에서도 같은 예외를 다시 로그로 남길 수 있습니다.

\`\`\`python
logger = logging.getLogger(__name__)


def read_file(path: str) -> str:
    try:
        with open(path, "r", encoding="utf-8") as file:
            return file.read()
    except FileNotFoundError:
        logger.exception("파일 읽기 실패")
        raise


def main() -> None:
    try:
        read_file("missing.txt")
    except FileNotFoundError:
        logger.exception("프로그램 실행 실패")
\`\`\`

이 코드는 같은 예외에 대해 traceback이 두 번 기록될 수 있습니다. 로그가 중복되면 오히려 원인을 파악하기 어려워집니다.

보통은 다음 원칙을 사용합니다.

\`\`\`text
하위 함수는 예외를 변환하거나 필요한 정보만 추가한다.
예외를 최종적으로 처리하는 지점에서 한 번만 자세히 로그를 남긴다.
예외를 복구하고 계속 진행하는 경우에는 그 지점에서 로그를 남긴다.
\`\`\`

예를 들어 다음 구조가 더 깔끔합니다.

\`\`\`python
def read_file(path: str) -> str:
    with open(path, "r", encoding="utf-8") as file:
        return file.read()


def main() -> None:
    try:
        read_file("missing.txt")
    except FileNotFoundError:
        logger.exception("프로그램 실행 실패")
\`\`\`

또는 하위 함수에서 예외를 더 의미 있는 예외로 바꾸되, 로그는 상위에서 남길 수 있습니다.

\`\`\`python
class ConfigError(Exception):
    pass


def load_config(path: str) -> str:
    try:
        with open(path, "r", encoding="utf-8") as file:
            return file.read()
    except FileNotFoundError as error:
        raise ConfigError(f"설정 파일을 찾을 수 없습니다: {path}") from error


def main() -> None:
    try:
        load_config("config.json")
    except ConfigError:
        logger.exception("설정 로딩 실패")
\`\`\`

---
`;export{e as default};