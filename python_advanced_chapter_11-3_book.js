var e=`<!-- 원본: python_advanced_chapter_11_book.md / 세부 장: 11-3 -->

# 11.3 예외 계층 설계

예외가 하나일 때는 단순합니다.

\`\`\`python
class OutOfStockError(Exception):
    pass
\`\`\`

하지만 프로그램이 커지면 예외도 여러 개가 됩니다.

\`\`\`text
파일 오류
데이터 검증 오류
API 요청 오류
설정 오류
권한 오류
주문 처리 오류
\`\`\`

이때 모든 예외가 \`Exception\`만 직접 상속하면, 예외를 범주별로 처리하기 어렵습니다. 예외 계층을 설계하면 이런 문제를 줄일 수 있습니다.

---

## 11.3.1 공통 부모 예외 만들기

하나의 프로그램 또는 패키지에서 발생하는 예외를 묶기 위해 공통 부모 예외를 만들 수 있습니다.

\`\`\`python
class AppError(Exception):
    """애플리케이션에서 발생하는 모든 사용자 정의 예외의 부모 클래스"""


class ConfigError(AppError):
    pass


class DataValidationError(AppError):
    pass


class ApiError(AppError):
    pass
\`\`\`

이렇게 하면 상위 코드에서 사용자 정의 예외 전체를 한 번에 처리할 수 있습니다.

\`\`\`python
try:
    run_job()
except AppError as error:
    print(f"업무 처리 중 오류가 발생했습니다: {error}")
\`\`\`

동시에 특정 예외만 따로 처리할 수도 있습니다.

\`\`\`python
try:
    run_job()
except ConfigError:
    print("설정 파일을 확인하세요.")
except DataValidationError:
    print("입력 데이터 형식을 확인하세요.")
except ApiError:
    print("외부 API 연결 상태를 확인하세요.")
\`\`\`

---

## 11.3.2 예외 계층 예시

데이터 수집 프로그램의 예외 계층을 다음처럼 설계할 수 있습니다.

\`\`\`python
class DataPipelineError(Exception):
    """데이터 파이프라인 전체 예외의 부모 클래스"""


class ConfigError(DataPipelineError):
    """설정 관련 예외"""


class DataSourceError(DataPipelineError):
    """데이터 원천 관련 예외"""


class ApiRequestError(DataSourceError):
    """API 요청 실패"""


class FileReadError(DataSourceError):
    """파일 읽기 실패"""


class DataValidationError(DataPipelineError):
    """데이터 검증 실패"""


class MissingColumnError(DataValidationError):
    """필수 컬럼 누락"""


class InvalidValueError(DataValidationError):
    """잘못된 값"""


class DataSaveError(DataPipelineError):
    """결과 저장 실패"""
\`\`\`

이 구조를 보면 어떤 오류가 어느 범주에 속하는지 알 수 있습니다.

\`\`\`text
DataPipelineError
├── ConfigError
├── DataSourceError
│   ├── ApiRequestError
│   └── FileReadError
├── DataValidationError
│   ├── MissingColumnError
│   └── InvalidValueError
└── DataSaveError
\`\`\`

이렇게 예외 계층을 만들면 처리 코드도 더 명확해집니다.

\`\`\`python
try:
    run_pipeline()
except ConfigError as error:
    print("설정 오류:", error)
except DataValidationError as error:
    print("데이터 검증 오류:", error)
except DataPipelineError as error:
    print("파이프라인 오류:", error)
\`\`\`

주의할 점은 더 구체적인 예외를 먼저 처리해야 한다는 것입니다. 부모 예외를 먼저 처리하면 자식 예외 처리 블록은 실행되지 않습니다.

\`\`\`python
# 좋지 않은 예
try:
    run_pipeline()
except DataPipelineError:
    print("파이프라인 오류")
except DataValidationError:
    print("데이터 검증 오류")  # 실행될 기회가 없음
\`\`\`

\`DataValidationError\`는 \`DataPipelineError\`의 자식이므로, 첫 번째 \`except\`에서 이미 잡혀 버립니다.

---

## 11.3.3 예외 계층이 너무 복잡해지는 경우

예외 계층은 유용하지만 너무 복잡하게 만들 필요는 없습니다.

다음처럼 지나치게 세분화하면 오히려 유지보수가 어려워질 수 있습니다.

\`\`\`python
class InvalidCustomerNameLengthGreaterThanMaxError(Exception):
    pass

class InvalidCustomerNameContainsNumberError(Exception):
    pass

class InvalidCustomerNameContainsSpecialCharacterError(Exception):
    pass
\`\`\`

이런 경우에는 하나의 예외로 묶고 메시지나 속성으로 세부 정보를 표현하는 편이 더 낫습니다.

\`\`\`python
class InvalidCustomerNameError(Exception):
    def __init__(self, name: str, reason: str):
        self.name = name
        self.reason = reason
        super().__init__(f"올바르지 않은 고객 이름입니다. name={name}, reason={reason}")
\`\`\`

예외 계층을 설계할 때는 다음 기준을 사용하면 좋습니다.

\`\`\`text
호출한 쪽에서 다르게 처리해야 하면 별도 예외로 만든다.
처리 방식이 같다면 같은 예외로 묶는다.
메시지만 다른 경우에는 예외 속성으로 표현한다.
너무 많은 예외 클래스는 피한다.
\`\`\`

---

## 11.3.4 예외 메시지 작성법

예외 메시지는 나중에 문제를 추적하는 사람을 위한 정보입니다. 메시지가 너무 짧으면 원인을 파악하기 어렵고, 너무 길면 읽기 어렵습니다.

좋지 않은 예입니다.

\`\`\`python
raise ValueError("오류")
\`\`\`

조금 낫지만 여전히 부족합니다.

\`\`\`python
raise ValueError("값이 잘못되었습니다.")
\`\`\`

더 좋은 예입니다.

\`\`\`python
raise ValueError("price는 0 이상의 정수여야 합니다. value=-100")
\`\`\`

예외 메시지에는 보통 다음 정보가 들어가면 좋습니다.

\`\`\`text
무엇이 잘못되었는가?
어떤 값 때문에 실패했는가?
어떤 조건을 기대했는가?
가능하다면 어느 위치의 데이터인가?
\`\`\`

예를 들어 CSV 행 검증에서는 행 번호를 포함하면 좋습니다.

\`\`\`python
class InvalidRowError(Exception):
    def __init__(self, row_number: int, message: str):
        self.row_number = row_number
        self.message = message
        super().__init__(f"{row_number}번째 행 오류: {message}")
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
raise InvalidRowError(15, "price 값이 비어 있습니다.")
\`\`\`

출력 메시지는 다음과 같습니다.

\`\`\`text
15번째 행 오류: price 값이 비어 있습니다.
\`\`\`

---
`;export{e as default};