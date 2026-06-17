var e=`<!-- 원본: python_advanced_chapter_11_book.md / 세부 장: 11-6 -->

# 11.6 실무 활용

이제 예외 처리와 로깅을 실제 데이터 처리 구조에 적용해 보겠습니다. 이 절에서는 다음 상황을 다룹니다.

\`\`\`text
1. API 요청 실패 기록
2. 데이터 처리 실패 행 기록
3. 자동화 프로그램 실행 로그
4. 사용자 메시지와 개발자 로그 분리
5. 실패에 강한 파이프라인 구조
\`\`\`

---

## 11.6.1 API 요청 실패 기록

외부 API는 언제든 실패할 수 있습니다.

\`\`\`text
네트워크가 끊길 수 있다.
서버가 응답하지 않을 수 있다.
응답 상태 코드가 500일 수 있다.
응답이 JSON 형식이 아닐 수 있다.
요청 제한에 걸릴 수 있다.
\`\`\`

API 호출 함수에서는 이런 실패를 고려해야 합니다.

아래 예제는 실제 \`requests\`를 사용한다고 가정한 구조입니다.

\`\`\`python
import logging
from typing import Any

import requests

logger = logging.getLogger(__name__)


class ApiClientError(Exception):
    pass


class ApiRequestError(ApiClientError):
    pass


class ApiResponseError(ApiClientError):
    pass


def fetch_json(url: str, params: dict[str, Any] | None = None) -> dict[str, Any]:
    try:
        response = requests.get(url, params=params, timeout=5)
        response.raise_for_status()
    except requests.RequestException as error:
        raise ApiRequestError(f"API 요청에 실패했습니다: url={url}") from error

    try:
        return response.json()
    except ValueError as error:
        raise ApiResponseError(f"JSON 응답을 해석할 수 없습니다: url={url}") from error
\`\`\`

이 함수는 \`requests\`의 예외를 그대로 외부로 내보내지 않고, 프로그램에서 정의한 \`ApiRequestError\`, \`ApiResponseError\`로 바꿉니다.

상위 코드에서는 다음처럼 처리할 수 있습니다.

\`\`\`python
def main() -> None:
    try:
        data = fetch_json("https://example.com/api/orders")
    except ApiClientError:
        logger.exception("API 데이터 수집 실패")
        return

    logger.info("API 데이터 수집 성공")
\`\`\`

이 구조의 장점은 다음과 같습니다.

\`\`\`text
API 요청 실패와 응답 파싱 실패를 구분할 수 있다.
상위 코드에서는 ApiClientError 하나로 묶어서 처리할 수 있다.
원래 예외는 raise from으로 보존된다.
로그는 최종 처리 지점에서 한 번만 남긴다.
\`\`\`

---

## 11.6.2 데이터 처리 실패 행 기록

데이터 처리에서는 한 행이 실패했다고 전체 작업을 멈추면 안 되는 경우가 많습니다. 예를 들어 주문 CSV 파일 10,000행 중 3행만 잘못되었다면, 나머지 9,997행은 정상 처리하고 실패한 3행만 따로 기록하는 것이 더 유용할 수 있습니다.

다음 예제는 행 단위 검증을 수행합니다.

\`\`\`python
import logging

logger = logging.getLogger(__name__)


class RowValidationError(Exception):
    def __init__(self, row_number: int, message: str):
        self.row_number = row_number
        self.message = message
        super().__init__(f"{row_number}번째 행 오류: {message}")


def parse_order_row(row: dict[str, str], row_number: int) -> dict[str, int | str]:
    order_id = row.get("order_id", "").strip()
    price_text = row.get("price", "").strip()
    quantity_text = row.get("quantity", "").strip()

    if not order_id:
        raise RowValidationError(row_number, "order_id가 비어 있습니다.")

    try:
        price = int(price_text)
    except ValueError as error:
        raise RowValidationError(row_number, f"price가 정수가 아닙니다: {price_text}") from error

    try:
        quantity = int(quantity_text)
    except ValueError as error:
        raise RowValidationError(row_number, f"quantity가 정수가 아닙니다: {quantity_text}") from error

    if price < 0:
        raise RowValidationError(row_number, "price는 0 이상이어야 합니다.")

    if quantity <= 0:
        raise RowValidationError(row_number, "quantity는 1 이상이어야 합니다.")

    return {
        "order_id": order_id,
        "price": price,
        "quantity": quantity,
        "total": price * quantity,
    }
\`\`\`

여러 행을 처리하는 함수는 다음처럼 작성할 수 있습니다.

\`\`\`python
def process_rows(rows: list[dict[str, str]]) -> tuple[list[dict[str, int | str]], list[str]]:
    success_rows: list[dict[str, int | str]] = []
    failed_messages: list[str] = []

    for index, row in enumerate(rows, start=1):
        try:
            parsed_row = parse_order_row(row, index)
        except RowValidationError as error:
            logger.warning("행 처리 실패: %s", error)
            failed_messages.append(str(error))
            continue

        success_rows.append(parsed_row)

    logger.info(
        "행 처리 완료: total=%d, success=%d, failed=%d",
        len(rows),
        len(success_rows),
        len(failed_messages),
    )

    return success_rows, failed_messages
\`\`\`

이 구조에서는 한 행이 실패해도 전체 반복문은 계속 진행됩니다. 실패한 행은 \`warning\` 로그와 실패 목록에 남습니다.

데이터 처리에서는 다음 기준이 중요합니다.

\`\`\`text
전체 작업을 중단해야 하는 오류인가?
해당 행만 실패 처리하고 계속 진행해도 되는가?
실패한 데이터를 나중에 확인할 수 있는가?
성공 건수와 실패 건수를 기록했는가?
\`\`\`

---

## 11.6.3 자동화 프로그램 실행 로그

자동화 프로그램은 사람이 직접 지켜보지 않는 상태에서 실행되는 경우가 많습니다. 따라서 실행 시작과 종료, 처리 건수, 실패 정보를 반드시 남기는 것이 좋습니다.

\`\`\`python
import logging
from pathlib import Path


def setup_logging(log_path: str) -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s - %(message)s",
        filename=log_path,
        encoding="utf-8",
    )


def run_job(input_path: str, output_path: str) -> None:
    logger = logging.getLogger(__name__)

    logger.info("작업 시작: input=%s, output=%s", input_path, output_path)

    if not Path(input_path).exists():
        raise FileNotFoundError(f"입력 파일이 없습니다: {input_path}")

    # 실제 처리 로직이 들어갈 위치
    logger.info("데이터 처리 중...")

    logger.info("작업 완료")


def main() -> None:
    setup_logging("job.log")
    logger = logging.getLogger(__name__)

    try:
        run_job("orders.csv", "result.csv")
    except Exception:
        logger.exception("작업 실패")
        raise


if __name__ == "__main__":
    main()
\`\`\`

이 코드는 작업 시작, 처리 중, 작업 완료 또는 실패를 로그로 남깁니다.

\`main()\`에서 \`logger.exception()\`으로 실패 정보를 남긴 뒤 \`raise\`를 다시 호출하고 있습니다. 이렇게 하면 프로그램 실행 환경에서 실패를 감지할 수 있습니다.

상황에 따라 \`raise\`를 다시 하지 않고 정상 종료할 수도 있습니다.

\`\`\`python
def main() -> None:
    setup_logging("job.log")
    logger = logging.getLogger(__name__)

    try:
        run_job("orders.csv", "result.csv")
    except Exception:
        logger.exception("작업 실패")
        return
\`\`\`

어떤 방식이 맞는지는 실행 환경에 따라 다릅니다.

\`\`\`text
자동화 스케줄러가 실패를 감지해야 한다면 다시 raise하거나 종료 코드를 조정한다.
사용자에게 메시지만 보여주고 종료하면 된다면 return할 수 있다.
\`\`\`

---

## 11.6.4 사용자 메시지와 개발자 로그 분리

사용자에게 traceback 전체를 보여주는 것은 좋지 않습니다. 사용자는 긴 traceback을 이해하기 어렵고, 내부 파일 경로나 민감한 정보가 노출될 수도 있습니다.

따라서 사용자 메시지와 개발자 로그를 분리해야 합니다.

\`\`\`python
import logging

logger = logging.getLogger(__name__)


class AppError(Exception):
    pass


class InvalidInputFileError(AppError):
    pass


def run_job(path: str) -> None:
    if not path.endswith(".csv"):
        raise InvalidInputFileError("입력 파일은 CSV 형식이어야 합니다.")


def main() -> None:
    try:
        run_job("orders.xlsx")
    except AppError as error:
        logger.exception("처리 가능한 업무 오류가 발생했습니다.")
        print(f"작업을 완료할 수 없습니다: {error}")
    except Exception:
        logger.exception("예상하지 못한 오류가 발생했습니다.")
        print("예상하지 못한 오류가 발생했습니다. 관리자에게 문의하세요.")
\`\`\`

사용자에게는 간단하고 이해 가능한 메시지를 보여줍니다.

\`\`\`text
작업을 완료할 수 없습니다: 입력 파일은 CSV 형식이어야 합니다.
\`\`\`

개발자 로그에는 traceback과 자세한 정보가 남습니다.

이 구조는 실무에서 매우 중요합니다.

\`\`\`text
사용자에게는 친절한 메시지
개발자에게는 원인 추적 정보
로그에는 traceback과 입력 조건
화면에는 민감 정보 최소화
\`\`\`

---

## 11.6.5 실패에 강한 파이프라인 구조

데이터분석 전 단계에서는 데이터 수집, 검증, 변환, 저장이 하나의 흐름으로 이어집니다.

\`\`\`text
1. 설정을 읽는다.
2. 원천 데이터를 가져온다.
3. 데이터를 검증한다.
4. 데이터를 변환한다.
5. 결과를 저장한다.
6. 실행 결과를 로그로 남긴다.
\`\`\`

이런 흐름을 파이프라인이라고 부를 수 있습니다. 파이프라인에서는 각 단계별 실패를 구분하는 것이 중요합니다.

\`\`\`python
class PipelineError(Exception):
    pass


class ConfigLoadError(PipelineError):
    pass


class DataLoadError(PipelineError):
    pass


class DataValidationError(PipelineError):
    pass


class DataSaveError(PipelineError):
    pass
\`\`\`

각 단계 함수는 필요한 경우 예외를 변환해서 전달합니다.

\`\`\`python
def load_config(path: str) -> dict[str, str]:
    try:
        with open(path, "r", encoding="utf-8") as file:
            content = file.read()
    except OSError as error:
        raise ConfigLoadError(f"설정 파일을 읽을 수 없습니다: {path}") from error

    return {"raw": content}
\`\`\`

\`\`\`python
def load_data(path: str) -> list[str]:
    try:
        with open(path, "r", encoding="utf-8") as file:
            return file.readlines()
    except OSError as error:
        raise DataLoadError(f"데이터 파일을 읽을 수 없습니다: {path}") from error
\`\`\`

\`\`\`python
def validate_data(rows: list[str]) -> None:
    if not rows:
        raise DataValidationError("데이터가 비어 있습니다.")
\`\`\`

\`\`\`python
def save_result(path: str, rows: list[str]) -> None:
    try:
        with open(path, "w", encoding="utf-8") as file:
            file.writelines(rows)
    except OSError as error:
        raise DataSaveError(f"결과 파일을 저장할 수 없습니다: {path}") from error
\`\`\`

실행 함수는 전체 흐름을 관리합니다.

\`\`\`python
import logging

logger = logging.getLogger(__name__)


def run_pipeline(config_path: str, input_path: str, output_path: str) -> None:
    logger.info("파이프라인 시작")

    config = load_config(config_path)
    logger.info("설정 로딩 완료")

    rows = load_data(input_path)
    logger.info("데이터 로딩 완료: rows=%d", len(rows))

    validate_data(rows)
    logger.info("데이터 검증 완료")

    save_result(output_path, rows)
    logger.info("결과 저장 완료: output=%s", output_path)

    logger.info("파이프라인 완료")
\`\`\`

\`main()\` 함수에서는 최종 예외 처리를 담당합니다.

\`\`\`python
def main() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s - %(message)s",
    )

    try:
        run_pipeline("config.txt", "input.txt", "output.txt")
    except ConfigLoadError:
        logger.exception("설정 단계 실패")
        print("설정 파일을 확인하세요.")
    except DataLoadError:
        logger.exception("데이터 로딩 단계 실패")
        print("입력 데이터 파일을 확인하세요.")
    except DataValidationError:
        logger.exception("데이터 검증 단계 실패")
        print("데이터 형식을 확인하세요.")
    except DataSaveError:
        logger.exception("결과 저장 단계 실패")
        print("결과 저장 위치를 확인하세요.")
    except PipelineError:
        logger.exception("파이프라인 처리 중 오류 발생")
        print("처리 중 오류가 발생했습니다.")
\`\`\`

이 구조는 처음에는 길어 보이지만, 실무에서는 매우 유용합니다.

\`\`\`text
어느 단계에서 실패했는지 알 수 있다.
로그에 원인 traceback이 남는다.
사용자에게는 단계별 안내 메시지를 보여줄 수 있다.
각 함수는 자기 역할만 담당한다.
테스트하기 쉽다.
\`\`\`

---

## 11.6.6 로그에 남기면 안 되는 정보

로그는 문제 해결에 매우 중요하지만, 아무 정보나 남기면 안 됩니다. 로그 파일은 나중에 여러 사람이 볼 수 있고, 운영 서버에 남을 수도 있습니다.

다음 정보는 주의해야 합니다.

\`\`\`text
비밀번호
API 키
개인식별정보
주민등록번호
카드번호
토큰
세션 값
민감한 내부 URL
\`\`\`

좋지 않은 예입니다.

\`\`\`python
logger.info("로그인 요청: user=%s, password=%s", user_id, password)
\`\`\`

비밀번호는 절대 로그에 남기면 안 됩니다.

더 나은 방식입니다.

\`\`\`python
logger.info("로그인 요청: user=%s", user_id)
\`\`\`

API 키도 마찬가지입니다.

\`\`\`python
# 좋지 않음
logger.debug("API 요청 헤더: %s", headers)
\`\`\`

헤더에 토큰이 들어 있다면 민감 정보가 로그에 남을 수 있습니다.

필요하다면 민감 정보를 마스킹해야 합니다.

\`\`\`python
def mask_token(token: str) -> str:
    if len(token) <= 8:
        return "****"
    return token[:4] + "****" + token[-4:]


logger.info("API token=%s", mask_token(api_token))
\`\`\`

로그는 자세해야 하지만 안전해야 합니다.

---

## 11.6.7 좋은 에러 처리 코드의 기준

이번 장의 내용을 종합하면 좋은 에러 처리 코드는 다음 특징을 가집니다.

\`\`\`text
예상 가능한 오류는 구체적으로 처리한다.
복구할 수 없는 오류는 억지로 숨기지 않는다.
사용자 정의 예외로 업무 오류를 명확히 표현한다.
예외 계층으로 오류를 범주화한다.
하위 함수와 상위 함수의 책임을 구분한다.
예외 변환 시 raise from으로 원인을 보존한다.
로그는 최종 처리 지점에서 한 번만 자세히 남긴다.
사용자 메시지와 개발자 로그를 분리한다.
민감 정보는 로그에 남기지 않는다.
성공 건수, 실패 건수, 입력 파일, 출력 파일 등 추적 가능한 정보를 남긴다.
\`\`\`

나쁜 예외 처리의 대표적인 모습은 다음과 같습니다.

\`\`\`python
try:
    run_job()
except Exception:
    pass
\`\`\`

이 코드는 실패를 숨깁니다. 실패를 숨기면 문제는 사라지는 것이 아니라 더 나중에 더 큰 문제로 나타납니다.

더 나은 구조는 다음과 같습니다.

\`\`\`python
try:
    run_job()
except AppError as error:
    logger.exception("업무 오류 발생")
    print(f"작업 실패: {error}")
except Exception:
    logger.exception("예상하지 못한 오류 발생")
    print("예상하지 못한 오류가 발생했습니다. 관리자에게 문의하세요.")
\`\`\`

실패는 피할 수 없습니다. 하지만 실패를 잘 다루는 코드는 만들 수 있습니다.

---

## 11장 핵심 정리

이번 장에서는 예외 처리와 로깅을 실무 관점에서 다루었습니다.

예외 처리는 프로그램을 무조건 계속 실행하게 만드는 기술이 아닙니다. 예외 처리는 실패를 올바른 위치에서 다루고, 복구할 수 있는 문제는 복구하며, 복구할 수 없는 문제는 정확한 정보와 함께 전달하는 설계입니다.

사용자 정의 예외는 내 프로그램의 업무 규칙을 표현할 때 유용합니다. \`OutOfStockError\`, \`MissingRequiredColumnError\`, \`ApiRequestError\`처럼 이름만 봐도 어떤 실패인지 알 수 있는 예외를 만들면 코드의 의도가 명확해집니다.

예외 계층은 오류를 범주별로 처리할 수 있게 해 줍니다. 공통 부모 예외를 만들면 애플리케이션 전체 오류를 한 번에 처리할 수 있고, 세부 예외를 만들면 상황별로 다르게 대응할 수 있습니다.

예외 전파는 하위 함수와 상위 함수의 책임을 나누는 핵심 개념입니다. 하위 함수는 구체적인 작업을 수행하고, 상위 함수는 전체 흐름에 따라 사용자 메시지와 로그, 종료 여부를 결정합니다.

\`raise from\`은 예외를 더 의미 있는 예외로 바꾸면서도 원래 원인을 보존하는 방법입니다. 데이터 변환 실패를 데이터 검증 오류로 바꾸거나, 파일 읽기 실패를 설정 로딩 실패로 바꿀 때 유용합니다.

로깅은 프로그램의 실행 기록을 남기는 도구입니다. \`print()\`는 학습과 간단한 확인에는 좋지만, 실무 프로그램에서는 \`logging\`을 사용해 시간, 레벨, 모듈 이름, 메시지, traceback을 체계적으로 남겨야 합니다.

좋은 로그는 문제를 해결하는 데 도움이 됩니다. 그러나 민감 정보를 남기면 안 됩니다. 비밀번호, 토큰, API 키, 개인정보는 로그에서 제외하거나 마스킹해야 합니다.

데이터 처리 프로그램에서는 일부 데이터가 실패해도 전체 작업을 계속 진행해야 할 수 있습니다. 이때 성공 건수, 실패 건수, 실패한 행 번호, 실패 이유를 로그와 결과 파일에 남기면 나중에 원인을 추적하고 재처리하기 쉽습니다.

---

## 연습문제

### 문제 1. 예외 처리의 목적

다음 중 실무에서 좋은 예외 처리의 목적과 가장 거리가 먼 것은 무엇인가요?

A. 복구 가능한 오류를 처리한다.  
B. 오류 원인을 추적할 정보를 남긴다.  
C. 모든 예외를 조용히 무시한다.  
D. 사용자에게 이해 가능한 메시지를 제공한다.

---

### 문제 2. 구체적인 예외 처리

다음 코드의 문제점을 설명하세요.

\`\`\`python
try:
    price = int(value)
except Exception:
    price = 0
\`\`\`

---

### 문제 3. 사용자 정의 예외 만들기

상품 재고가 부족할 때 발생시킬 \`OutOfStockError\` 예외 클래스를 만들고, 재고보다 주문 수량이 많으면 이 예외를 발생시키는 \`check_stock()\` 함수를 작성하세요.

---

### 문제 4. 예외 계층

다음 예외 계층에서 \`MissingColumnError\`를 처리할 수 있는 \`except\`는 무엇인가요?

\`\`\`python
class AppError(Exception):
    pass

class DataValidationError(AppError):
    pass

class MissingColumnError(DataValidationError):
    pass
\`\`\`

A. \`except MissingColumnError\`  
B. \`except DataValidationError\`  
C. \`except AppError\`  
D. 위 세 가지 모두

---

### 문제 5. \`raise from\`

다음 코드에서 \`from error\`를 사용하는 이유를 설명하세요.

\`\`\`python
class InvalidPriceError(Exception):
    pass

try:
    price = int(value)
except ValueError as error:
    raise InvalidPriceError("가격은 정수여야 합니다.") from error
\`\`\`

---

### 문제 6. 로그 레벨 선택

다음 상황에 적절한 로그 레벨을 고르세요.

1. 프로그램이 정상적으로 시작되었다.  
2. 일부 행의 값이 비어 있어 기본값을 사용했다.  
3. 파일 저장에 실패했다.  
4. 개발 중 변수의 중간값을 확인하고 싶다.  
5. 필수 설정이 없어 프로그램을 계속 실행할 수 없다.

---

### 문제 7. \`logger.exception()\`

\`logger.exception()\`은 보통 어디에서 사용하는 것이 적절한가요?

A. 아무 위치에서나 사용한다.  
B. \`except\` 블록 안에서 사용한다.  
C. 함수 시작 부분에서 사용한다.  
D. \`import\` 문 바로 아래에서 사용한다.

---

### 문제 8. 로그 중복

다음 코드의 문제점을 설명하세요.

\`\`\`python
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
        logger.exception("작업 실패")
\`\`\`

---

### 문제 9. 데이터 처리 실패 행 기록

다음 요구사항을 만족하는 흐름을 설명하세요.

\`\`\`text
CSV 데이터를 여러 행 처리한다.
일부 행이 실패해도 전체 처리는 계속한다.
실패한 행 번호와 실패 이유를 기록한다.
마지막에 성공 건수와 실패 건수를 로그로 남긴다.
\`\`\`

코드를 완성하지 않아도 되고, 어떤 구조로 작성할지 설명하면 됩니다.

---

### 문제 10. 사용자 메시지와 개발자 로그

예상하지 못한 오류가 발생했을 때 사용자에게 traceback 전체를 보여주면 안 되는 이유를 설명하세요.

---

## 정답 및 해설

### 정답 1

정답은 C입니다.

예외 처리는 모든 예외를 조용히 무시하기 위한 문법이 아닙니다. 복구 가능한 오류를 처리하고, 복구할 수 없는 오류는 적절한 위치로 전달하며, 원인을 추적할 수 있는 정보를 남기기 위한 설계입니다.

---

### 정답 2

이 코드는 너무 넓은 예외를 처리하고 있으며, 모든 오류를 \`price = 0\`으로 바꾸고 있습니다.

문제점은 다음과 같습니다.

\`\`\`text
ValueError가 아닌 다른 버그도 숨겨질 수 있다.
잘못된 가격이 0으로 처리되어 잘못된 결과가 나올 수 있다.
왜 변환에 실패했는지 알 수 없다.
로그나 오류 메시지가 없다.
\`\`\`

더 나은 코드는 구체적인 예외를 처리하는 것입니다.

\`\`\`python
try:
    price = int(value)
except ValueError:
    print("가격은 정수여야 합니다.")
\`\`\`

또는 상위 코드에서 처리하도록 예외를 그대로 전파할 수도 있습니다.

---

### 정답 3

예시는 다음과 같습니다.

\`\`\`python
class OutOfStockError(Exception):
    pass


def check_stock(stock: int, quantity: int) -> None:
    if quantity > stock:
        raise OutOfStockError(
            f"재고가 부족합니다. stock={stock}, quantity={quantity}"
        )
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
try:
    check_stock(stock=3, quantity=5)
except OutOfStockError as error:
    print(error)
\`\`\`

---

### 정답 4

정답은 D입니다.

\`MissingColumnError\`는 \`DataValidationError\`의 자식이고, \`DataValidationError\`는 \`AppError\`의 자식입니다. 따라서 세 가지 \`except\` 모두 \`MissingColumnError\`를 처리할 수 있습니다.

다만 실제 코드에서는 구체적인 예외를 먼저 작성해야 합니다.

\`\`\`python
try:
    raise MissingColumnError("필수 컬럼이 없습니다.")
except MissingColumnError:
    print("필수 컬럼 누락")
except DataValidationError:
    print("데이터 검증 오류")
except AppError:
    print("애플리케이션 오류")
\`\`\`

---

### 정답 5

\`from error\`는 원래 발생한 예외와 새로 발생시키는 예외의 관계를 보존하기 위해 사용합니다.

이 코드에서 원래 원인은 \`ValueError\`입니다. 하지만 상위 코드에는 업무적으로 더 의미 있는 \`InvalidPriceError\`를 전달하고 싶습니다. \`raise ... from error\`를 사용하면 \`InvalidPriceError\`를 발생시키면서도 원래 원인인 \`ValueError\`를 traceback에서 확인할 수 있습니다.

---

### 정답 6

가능한 답은 다음과 같습니다.

1. 프로그램이 정상적으로 시작되었다. → \`INFO\`  
2. 일부 행의 값이 비어 있어 기본값을 사용했다. → \`WARNING\`  
3. 파일 저장에 실패했다. → \`ERROR\`  
4. 개발 중 변수의 중간값을 확인하고 싶다. → \`DEBUG\`  
5. 필수 설정이 없어 프로그램을 계속 실행할 수 없다. → \`CRITICAL\`

실무에서는 조직이나 프로젝트 기준에 따라 다를 수 있지만, 위 기준이 일반적인 출발점입니다.

---

### 정답 7

정답은 B입니다.

\`logger.exception()\`은 현재 처리 중인 예외 정보를 함께 기록하므로 보통 \`except\` 블록 안에서 사용합니다.

\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    logger.exception("계산 실패")
\`\`\`

---

### 정답 8

이 코드는 같은 예외에 대해 로그가 두 번 남을 수 있습니다.

\`read_file()\`에서 \`logger.exception()\`으로 traceback을 기록한 뒤 다시 \`raise\`하고, \`main()\`에서도 같은 예외를 다시 \`logger.exception()\`으로 기록합니다. 그러면 로그가 중복되어 오히려 원인 파악이 어려워질 수 있습니다.

일반적으로는 예외를 최종적으로 처리하는 위치에서 한 번만 자세히 기록하는 것이 좋습니다.

\`\`\`python
def read_file(path: str) -> str:
    with open(path, "r", encoding="utf-8") as file:
        return file.read()


def main() -> None:
    try:
        read_file("missing.txt")
    except FileNotFoundError:
        logger.exception("작업 실패")
\`\`\`

---

### 정답 9

한 가지 구조는 다음과 같습니다.

\`\`\`text
1. 한 행을 검증하고 변환하는 parse_row() 함수를 만든다.
2. parse_row()는 잘못된 행을 만나면 RowValidationError를 발생시킨다.
3. 전체 행을 처리하는 process_rows() 함수에서 반복문을 사용한다.
4. 각 행마다 try-except로 RowValidationError를 처리한다.
5. 실패한 행은 실패 목록에 추가하고 warning 로그를 남긴다.
6. 성공한 행은 성공 목록에 추가한다.
7. 마지막에 total, success, failed 건수를 info 로그로 남긴다.
\`\`\`

예시 코드 일부는 다음과 같습니다.

\`\`\`python
success_rows = []
failed_rows = []

for row_number, row in enumerate(rows, start=1):
    try:
        parsed_row = parse_row(row, row_number)
    except RowValidationError as error:
        logger.warning("행 처리 실패: %s", error)
        failed_rows.append(str(error))
        continue

    success_rows.append(parsed_row)

logger.info(
    "처리 완료: total=%d, success=%d, failed=%d",
    len(rows),
    len(success_rows),
    len(failed_rows),
)
\`\`\`

---

### 정답 10

traceback에는 내부 파일 경로, 함수 이름, 코드 구조, 외부 라이브러리 정보, 때로는 민감한 값이 포함될 수 있습니다. 사용자는 긴 traceback을 이해하기 어렵고, 내부 정보가 노출될 위험도 있습니다.

따라서 사용자에게는 이해 가능한 짧은 메시지를 보여주고, 개발자가 확인할 자세한 정보는 로그에 남기는 것이 좋습니다.

예시는 다음과 같습니다.

\`\`\`python
try:
    run_job()
except Exception:
    logger.exception("예상하지 못한 오류 발생")
    print("예상하지 못한 오류가 발생했습니다. 관리자에게 문의하세요.")
\`\`\`

---

## 11장 마무리 실습

다음 요구사항을 만족하는 간단한 데이터 처리 프로그램 구조를 작성해 보세요.

\`\`\`text
1. 입력 데이터는 리스트 안의 딕셔너리로 주어진다.
2. 각 행에는 order_id, price, quantity가 있어야 한다.
3. price와 quantity는 정수로 변환 가능해야 한다.
4. quantity는 1 이상이어야 한다.
5. 잘못된 행은 건너뛰고 실패 이유를 로그로 남긴다.
6. 정상 행은 total 값을 추가해 결과 리스트에 저장한다.
7. 마지막에 전체 건수, 성공 건수, 실패 건수를 로그로 남긴다.
\`\`\`

예시 입력은 다음과 같습니다.

\`\`\`python
rows = [
    {"order_id": "A001", "price": "10000", "quantity": "2"},
    {"order_id": "A002", "price": "abc", "quantity": "1"},
    {"order_id": "", "price": "5000", "quantity": "3"},
    {"order_id": "A004", "price": "7000", "quantity": "0"},
]
\`\`\`

정답은 하나가 아닙니다. 중요한 것은 다음 네 가지입니다.

\`\`\`text
사용자 정의 예외를 만들었는가?
행 단위 실패를 처리했는가?
로그에 실패 이유와 처리 건수를 남겼는가?
정상 데이터와 실패 데이터를 구분했는가?
\`\`\`

---

## 참고 문서

- Python 공식 문서, Errors and Exceptions
- Python 공식 문서, Built-in Exceptions
- Python 공식 문서, logging
- Python 공식 문서, logging.handlers
`;export{e as default};