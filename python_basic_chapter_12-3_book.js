var e=`<!-- 원본: python_basic_chapter_12_book.md / 세부 장: 12-3 -->

# 12.3 로그 남기기

### 12.3.1 로그가 필요한 이유

프로그램을 실행하다 보면 다음과 같은 질문이 생깁니다.

\`\`\`text
- 프로그램이 언제 실행되었는가?
- 어느 파일까지 처리했는가?
- 어떤 데이터에서 오류가 발생했는가?
- API 요청은 성공했는가?
- 실패했다면 어떤 이유로 실패했는가?
\`\`\`

이런 정보를 기록하는 것이 로그입니다.

초보 단계에서는 \`print()\`로 중간값을 확인하는 경우가 많습니다.

\`\`\`python
print("파일을 읽기 시작합니다.")
print("파일 처리 완료")
\`\`\`

하지만 실무에서는 \`print()\`만으로는 부족합니다. \`print()\`는 단순히 화면에 출력할 뿐이며, 로그 레벨을 나누거나 파일에 체계적으로 기록하기 어렵습니다.

파이썬에서는 \`logging\` 모듈을 사용해 로그를 남길 수 있습니다.

---

### 12.3.2 \`print()\`와 logging의 차이

\`print()\`는 사용자에게 보여줄 값을 출력할 때 적합합니다.

\`\`\`python
print("총 금액은 30000원입니다.")
\`\`\`

반면 \`logging\`은 프로그램 실행 기록을 남길 때 적합합니다.

\`\`\`python
import logging

logging.info("주문 금액 계산을 시작합니다.")
\`\`\`

두 방식의 차이를 정리하면 다음과 같습니다.

| 구분 | \`print()\` | \`logging\` |
|---|---|---|
| 목적 | 화면 출력 | 실행 기록 관리 |
| 로그 레벨 | 없음 | DEBUG, INFO, WARNING, ERROR, CRITICAL |
| 파일 저장 | 직접 구현해야 함 | 설정으로 가능 |
| 실무 운영 | 제한적 | 적합 |
| 메시지 관리 | 단순 출력 | 시간, 레벨, 위치 등 포함 가능 |

개발 중 간단한 확인은 \`print()\`로도 충분합니다. 하지만 자동화 프로그램, 데이터 처리 프로그램, API 연동 프로그램처럼 실행 기록이 중요한 경우에는 \`logging\`을 사용하는 것이 좋습니다.

---

### 12.3.3 logging 기본 사용법

가장 간단한 로그 코드는 다음과 같습니다.

\`\`\`python
import logging

logging.basicConfig(level=logging.INFO)

logging.info("프로그램을 시작합니다.")
logging.warning("주의가 필요한 상황입니다.")
logging.error("오류가 발생했습니다.")
\`\`\`

실행하면 설정한 로그 레벨 이상의 메시지가 출력됩니다.

\`basicConfig()\`는 logging의 기본 설정을 지정합니다. \`level=logging.INFO\`는 INFO 이상의 로그를 출력하겠다는 뜻입니다.

---

### 12.3.4 로그 레벨

로그에는 중요도에 따라 레벨이 있습니다.

| 로그 레벨 | 의미 | 사용 예시 |
|---|---|---|
| \`DEBUG\` | 개발 중 자세한 확인 정보 | 변수값, 반복 흐름 확인 |
| \`INFO\` | 정상적인 실행 정보 | 프로그램 시작, 파일 처리 완료 |
| \`WARNING\` | 주의가 필요한 상황 | 데이터 일부 누락, 기본값 사용 |
| \`ERROR\` | 오류 발생 | 파일 처리 실패, API 요청 실패 |
| \`CRITICAL\` | 심각한 오류 | 프로그램 계속 실행 불가 |

예를 들어 파일 처리 프로그램에서는 다음처럼 사용할 수 있습니다.

\`\`\`python
import logging

logging.basicConfig(level=logging.INFO)

file_name = "sales.csv"

logging.info("파일 처리를 시작합니다: %s", file_name)
logging.warning("일부 행에 빈 값이 있습니다.")
logging.error("파일을 읽는 중 오류가 발생했습니다.")
\`\`\`

로그 메시지에 값을 넣을 때는 f-string을 사용할 수도 있지만, logging에서는 다음 방식도 자주 사용합니다.

\`\`\`python
logging.info("처리한 파일 개수: %s", 10)
\`\`\`

이 방식은 logging이 메시지를 처리하는 방식과 잘 맞습니다.

---

### 12.3.5 로그 형식 지정하기

로그에는 시간, 레벨, 메시지를 함께 남기는 것이 좋습니다.

\`\`\`python
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

logging.info("프로그램을 시작합니다.")
\`\`\`

출력 예시는 다음과 비슷합니다.

\`\`\`text
2026-06-15 10:30:00,123 [INFO] 프로그램을 시작합니다.
\`\`\`

자주 사용하는 형식 요소는 다음과 같습니다.

| 형식 | 의미 |
|---|---|
| \`%(asctime)s\` | 로그 시간 |
| \`%(levelname)s\` | 로그 레벨 |
| \`%(message)s\` | 로그 메시지 |
| \`%(filename)s\` | 파일명 |
| \`%(lineno)d\` | 줄 번호 |
| \`%(name)s\` | 로거 이름 |

개발 중에는 파일명과 줄 번호를 포함하면 문제를 추적하기 쉽습니다.

\`\`\`python
import logging

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s [%(levelname)s] %(filename)s:%(lineno)d - %(message)s"
)

logging.debug("디버그 메시지입니다.")
\`\`\`

---

### 12.3.6 파일로 로그 저장하기

자동화 프로그램은 사용자가 실행 화면을 계속 보고 있지 않을 수 있습니다. 이런 경우 로그를 파일로 저장해야 나중에 실행 기록을 확인할 수 있습니다.

\`\`\`python
import logging

logging.basicConfig(
    filename="app.log",
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    encoding="utf-8"
)

logging.info("프로그램을 시작합니다.")
logging.info("파일 처리를 완료했습니다.")
\`\`\`

이 코드를 실행하면 \`app.log\` 파일에 로그가 저장됩니다.

로그 파일에는 다음과 같은 정보가 남을 수 있습니다.

\`\`\`text
2026-06-15 10:30:00,123 [INFO] 프로그램을 시작합니다.
2026-06-15 10:30:01,456 [INFO] 파일 처리를 완료했습니다.
\`\`\`

한글 로그를 파일로 저장할 때는 \`encoding="utf-8"\`을 지정하는 것이 좋습니다.

---

### 12.3.7 로거 사용하기

간단한 프로그램에서는 \`logging.info()\`처럼 바로 사용해도 됩니다. 하지만 파일이 여러 개로 나뉜 프로젝트에서는 로거를 만들어 사용하는 것이 좋습니다.

\`\`\`python
import logging

logger = logging.getLogger(__name__)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s - %(message)s"
)

logger.info("현재 모듈에서 로그를 남깁니다.")
\`\`\`

\`__name__\`은 현재 모듈 이름을 의미합니다. 이 값을 로거 이름으로 사용하면 어떤 파일에서 로그가 발생했는지 파악하기 쉽습니다.

실무 프로젝트에서는 다음처럼 각 파일에서 로거를 만들 수 있습니다.

\`\`\`python
# order_service.py
import logging

logger = logging.getLogger(__name__)


def process_order(order_id: str) -> None:
    logger.info("주문 처리를 시작합니다: %s", order_id)
\`\`\`

---

### 12.3.8 예외와 로그 함께 사용하기

예외가 발생했을 때 로그를 남기면 문제를 추적하기 쉽습니다.

\`\`\`python
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

try:
    number = int("abc")
except ValueError as error:
    logging.error("숫자 변환에 실패했습니다: %s", error)
\`\`\`

더 자세한 에러 정보를 남기고 싶다면 \`logging.exception()\`을 사용할 수 있습니다. \`logging.exception()\`은 예외 정보와 함께 호출 위치의 추적 정보를 남깁니다. 보통 \`except\` 블록 안에서 사용합니다.

\`\`\`python
try:
    number = int("abc")
except ValueError:
    logging.exception("숫자 변환 중 예외가 발생했습니다.")
\`\`\`

실무에서 오류 원인을 찾을 때는 단순히 “실패했습니다”보다 “어떤 값에서, 어떤 작업 중, 어떤 오류가 발생했는지”가 중요합니다.

\`\`\`python
value = "abc"

try:
    number = int(value)
except ValueError:
    logging.exception("정수 변환 실패: value=%s", value)
\`\`\`

---

### 12.3.9 실무 로그 작성 기준

로그를 너무 적게 남기면 문제가 생겼을 때 원인을 찾기 어렵습니다. 반대로 너무 많이 남기면 중요한 정보를 찾기 어렵습니다.

처음에는 다음 기준을 사용하면 좋습니다.

\`\`\`text
INFO
- 프로그램 시작과 종료
- 주요 작업 시작과 완료
- 처리한 파일명
- 처리한 데이터 개수

WARNING
- 일부 데이터 누락
- 기본값 사용
- 예상과 다르지만 계속 진행 가능한 상황

ERROR
- 파일 처리 실패
- API 요청 실패
- 데이터 변환 실패
- 작업을 완료하지 못한 상황

DEBUG
- 개발 중 확인이 필요한 변수값
- 반복문 내부의 세부 흐름
\`\`\`

예를 들어 파일 처리 프로그램에서는 다음처럼 로그를 남길 수 있습니다.

\`\`\`python
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

files = ["sales_01.csv", "sales_02.csv", "sales_03.csv"]

logging.info("파일 처리 시작: 총 %s개", len(files))

for file_name in files:
    try:
        logging.info("파일 처리 중: %s", file_name)
        # 파일 처리 코드가 들어간다고 가정한다.
    except Exception:
        logging.exception("파일 처리 실패: %s", file_name)

logging.info("파일 처리 종료")
\`\`\`

---
`;export{e as default};