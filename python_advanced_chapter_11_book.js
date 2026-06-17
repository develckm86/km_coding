var e=`# 11장. 예외 처리와 로깅 심화

10장에서 우리는 모듈, 패키지, 프로젝트 구조를 다루었습니다. 코드를 여러 파일과 폴더로 나누면 프로그램은 더 커질 수 있고, 여러 기능이 서로 연결될 수 있습니다. 하지만 프로그램이 커질수록 한 가지 문제가 더 중요해집니다.

바로 **실패를 어떻게 다룰 것인가**입니다.

파이썬 프로그램은 언제든 실패할 수 있습니다. 파일이 없을 수 있고, API 서버가 응답하지 않을 수 있고, CSV 파일에 잘못된 값이 들어 있을 수 있고, 데이터베이스 연결이 끊길 수 있습니다. 사용자가 예상하지 못한 값을 입력할 수도 있습니다.

기초 과정에서는 \`try\`, \`except\`, \`else\`, \`finally\`를 사용해 프로그램이 중단되지 않도록 만드는 방법을 배웠습니다. 고급 과정에서는 여기서 한 걸음 더 나아가 다음 질문을 다룹니다.

\`\`\`text
어떤 예외를 어디에서 처리해야 할까?
예외를 직접 만들어야 하는 경우는 언제일까?
예외 메시지는 어떻게 작성해야 할까?
로그에는 무엇을 남겨야 할까?
사용자에게 보여줄 메시지와 개발자가 확인할 정보는 어떻게 구분해야 할까?
데이터 처리 중 일부 데이터만 실패하면 전체 작업을 멈춰야 할까?
\`\`\`

이번 장의 목표는 단순히 에러를 없애는 것이 아닙니다. 목표는 **실패하더라도 원인을 추적할 수 있고, 가능한 범위에서 안전하게 계속 실행되며, 나중에 유지보수하기 쉬운 코드**를 작성하는 것입니다.

이번 장에서 배울 내용은 다음과 같습니다.

- 예외 처리 문법을 실무 관점에서 다시 정리한다.
- 사용자 정의 예외를 만들어 도메인 오류를 명확하게 표현한다.
- 예외 계층을 설계해 오류를 체계적으로 분류한다.
- 예외를 처리할 위치와 전파할 위치를 구분한다.
- \`raise\`와 \`raise from\`을 사용해 원인 예외를 보존한다.
- \`logging\` 모듈을 사용해 실행 기록과 에러 정보를 남긴다.
- 모듈별 logger, 로그 포맷, 파일 로그, 회전 로그를 구성한다.
- 데이터 처리, API 요청, 자동화 프로그램에서 실패에 강한 구조를 만든다.

---

## 11.1 예외 처리 복습

예외 처리는 프로그램 실행 중 발생할 수 있는 비정상 상황을 다루는 방법입니다. 예외가 발생하면 파이썬은 현재 실행 흐름을 중단하고, 해당 예외를 처리할 수 있는 \`except\` 블록을 찾습니다.

기초 문법은 다음과 같습니다.

\`\`\`python
try:
    # 예외가 발생할 수 있는 코드
    pass
except SomeError:
    # 예외가 발생했을 때 실행할 코드
    pass
else:
    # 예외가 발생하지 않았을 때 실행할 코드
    pass
finally:
    # 예외 발생 여부와 관계없이 항상 실행할 코드
    pass
\`\`\`

문법 자체는 어렵지 않습니다. 하지만 실무에서는 문법보다 **처리 기준**이 더 중요합니다.

---

## 11.1.1 예외 처리는 실패를 숨기는 문법이 아니다

초보자가 자주 하는 실수 중 하나는 프로그램이 멈추지 않게 하려고 모든 코드를 \`try-except\`로 감싸는 것입니다.

\`\`\`python
try:
    price = int(input_price)
    total = price * quantity
except Exception:
    pass
\`\`\`

이 코드는 위험합니다. 예외가 발생해도 아무 일도 하지 않고 넘어가기 때문입니다. 프로그램은 멈추지 않을 수 있지만, 잘못된 결과를 만들 수 있습니다.

예외 처리는 실패를 숨기는 문법이 아닙니다. 예외 처리는 다음 중 하나를 하기 위한 문법입니다.

\`\`\`text
1. 문제를 복구한다.
2. 더 의미 있는 예외로 바꾸어 전달한다.
3. 실패 정보를 기록한다.
4. 사용자에게 이해 가능한 메시지를 보여준다.
5. 안전하게 작업을 종료한다.
\`\`\`

따라서 예외를 처리할 때는 먼저 질문해야 합니다.

\`\`\`text
이 예외가 발생했을 때 내가 복구할 수 있는가?
복구할 수 없다면 어디로 전달해야 하는가?
원인을 추적할 정보는 남기고 있는가?
\`\`\`

---

## 11.1.2 특정 예외만 처리하기

가능하면 \`except Exception\`보다 구체적인 예외를 처리하는 것이 좋습니다.

\`\`\`python
value = "10,000"

try:
    number = int(value)
except ValueError:
    print("숫자로 변환할 수 없습니다.")
\`\`\`

\`int("10,000")\`은 쉼표 때문에 \`ValueError\`를 발생시킵니다. 이 상황에서는 값 변환 실패가 예상 가능한 문제이므로 \`ValueError\`를 처리하면 됩니다.

반대로 아래 코드는 너무 넓습니다.

\`\`\`python
try:
    number = int(value)
except Exception:
    print("오류가 발생했습니다.")
\`\`\`

이렇게 작성하면 어떤 이유로 실패했는지 알기 어렵습니다. 예를 들어 변수 이름을 잘못 써서 \`NameError\`가 발생해도 같은 메시지가 출력됩니다. 그러면 실제 버그를 놓칠 수 있습니다.

---

## 11.1.3 여러 예외 처리하기

하나의 작업에서 여러 종류의 예외가 발생할 수 있습니다.

\`\`\`python
def parse_quantity(value: str) -> int:
    try:
        quantity = int(value)
        result = 100 // quantity
        return result
    except ValueError:
        print("정수로 변환할 수 없습니다.")
    except ZeroDivisionError:
        print("0으로 나눌 수 없습니다.")
\`\`\`

예외별로 처리 방식이 다르다면 \`except\`를 분리하는 것이 좋습니다.

예외별 처리 방식이 같다면 튜플로 묶을 수도 있습니다.

\`\`\`python
def read_number(data: dict, key: str) -> int:
    try:
        return int(data[key])
    except (KeyError, ValueError):
        return 0
\`\`\`

이 함수는 딕셔너리에 key가 없거나, 값이 정수로 변환되지 않으면 기본값 \`0\`을 반환합니다.

---

## 11.1.4 \`else\`는 정상 흐름을 분리한다

\`else\`는 \`try\` 블록에서 예외가 발생하지 않았을 때만 실행됩니다.

\`\`\`python
try:
    price = int("12000")
except ValueError:
    print("가격이 올바르지 않습니다.")
else:
    print("가격 변환 성공:", price)
\`\`\`

출력 결과는 다음과 같습니다.

\`\`\`text
가격 변환 성공: 12000
\`\`\`

\`else\`를 사용하면 예외가 발생할 수 있는 코드와 정상 처리 코드를 분리할 수 있습니다.

\`\`\`python
def parse_price(value: str) -> int | None:
    try:
        price = int(value)
    except ValueError:
        return None
    else:
        return price
\`\`\`

이 코드에서 \`int(value)\`만 실패 가능성이 있는 코드입니다. 정상 처리인 \`return price\`를 \`else\`로 분리하면 실패 가능성이 있는 범위가 명확해집니다.

---

## 11.1.5 \`finally\`는 정리가 필요할 때 사용한다

\`finally\`는 예외 발생 여부와 관계없이 항상 실행됩니다.

\`\`\`python
file = None

try:
    file = open("data.txt", "r", encoding="utf-8")
    content = file.read()
except FileNotFoundError:
    print("파일이 없습니다.")
finally:
    if file is not None:
        file.close()
\`\`\`

파일을 직접 열고 닫는 경우에는 이런 정리 작업이 필요합니다. 하지만 파일 처리에서는 보통 \`with\` 문을 사용하는 것이 더 좋습니다.

\`\`\`python
try:
    with open("data.txt", "r", encoding="utf-8") as file:
        content = file.read()
except FileNotFoundError:
    print("파일이 없습니다.")
\`\`\`

\`with\` 문은 파일을 자동으로 닫아 주므로 \`finally\`를 직접 작성할 필요가 줄어듭니다.

그래도 \`finally\`는 여전히 중요합니다. 다음과 같은 상황에서 사용됩니다.

\`\`\`text
파일 닫기
데이터베이스 연결 종료
임시 파일 삭제
락 해제
외부 리소스 정리
\`\`\`

---

## 11.1.6 예외를 다시 발생시키기

예외를 잡은 뒤 추가 작업을 하고 다시 발생시켜야 할 때가 있습니다.

\`\`\`python
def load_config(path: str) -> str:
    try:
        with open(path, "r", encoding="utf-8") as file:
            return file.read()
    except FileNotFoundError:
        print(f"설정 파일을 찾을 수 없습니다: {path}")
        raise
\`\`\`

\`raise\`만 사용하면 현재 처리 중인 예외를 그대로 다시 발생시킵니다. 이렇게 하면 호출한 쪽에서 예외를 계속 처리할 수 있습니다.

이 방식은 “여기서는 간단히 기록만 하고, 최종 처리는 상위 코드에 맡기고 싶다”는 상황에서 사용합니다.

다만 같은 예외를 여러 위치에서 계속 기록하면 로그가 중복될 수 있습니다. 보통은 **예외를 처리하는 최종 지점에서 한 번만 자세히 기록**하는 것이 좋습니다.

---

## 11.2 사용자 정의 예외

파이썬에는 이미 많은 내장 예외가 있습니다.

\`\`\`text
ValueError
TypeError
KeyError
IndexError
FileNotFoundError
PermissionError
ConnectionError
TimeoutError
\`\`\`

대부분의 기초 코드에서는 내장 예외만으로 충분합니다. 하지만 실무 코드에서는 프로그램의 업무 규칙을 더 명확하게 표현하기 위해 직접 예외를 만들기도 합니다.

예를 들어 주문 처리 프로그램에서 다음과 같은 상황이 있다고 가정해 보겠습니다.

\`\`\`text
상품 재고가 부족하다.
주문 금액이 최소 주문 금액보다 작다.
지원하지 않는 결제 수단이다.
고객 등급이 올바르지 않다.
\`\`\`

이런 상황을 모두 \`ValueError\`로만 처리하면 의미가 흐려집니다.

\`\`\`python
raise ValueError("재고가 부족합니다.")
\`\`\`

나쁘지는 않지만, 예외 종류만 봐서는 업무적으로 어떤 실패인지 알기 어렵습니다. 이럴 때 사용자 정의 예외를 만들 수 있습니다.

---

## 11.2.1 사용자 정의 예외 만들기

사용자 정의 예외는 보통 \`Exception\`을 상속해서 만듭니다.

\`\`\`python
class OutOfStockError(Exception):
    pass
\`\`\`

이제 이 예외를 직접 발생시킬 수 있습니다.

\`\`\`python
def check_stock(stock: int, quantity: int) -> None:
    if quantity > stock:
        raise OutOfStockError("재고가 부족합니다.")

check_stock(stock=3, quantity=5)
\`\`\`

실행하면 \`OutOfStockError\`가 발생합니다.

\`\`\`text
OutOfStockError: 재고가 부족합니다.
\`\`\`

사용자 정의 예외의 장점은 코드의 의도가 명확해진다는 점입니다.

\`\`\`python
try:
    check_stock(stock=3, quantity=5)
except OutOfStockError:
    print("고객에게 재고 부족 안내 메시지를 보여줍니다.")
\`\`\`

\`except OutOfStockError\`만 봐도 어떤 상황을 처리하는지 알 수 있습니다.

---

## 11.2.2 언제 사용자 정의 예외가 필요한가

사용자 정의 예외는 다음 상황에서 유용합니다.

\`\`\`text
1. 업무 규칙 위반을 표현하고 싶을 때
2. 여러 오류를 하나의 범주로 묶고 싶을 때
3. 호출한 쪽에서 오류 종류별로 다르게 처리해야 할 때
4. 라이브러리나 패키지 사용자에게 명확한 예외를 제공하고 싶을 때
5. 로그와 모니터링에서 오류 종류를 구분하고 싶을 때
\`\`\`

하지만 모든 오류에 사용자 정의 예외가 필요한 것은 아닙니다.

\`\`\`python
int("abc")
\`\`\`

이런 값 변환 실패에는 \`ValueError\`가 자연스럽습니다. 파일이 없을 때는 \`FileNotFoundError\`가 자연스럽습니다.

사용자 정의 예외는 **파이썬 자체 오류가 아니라 내 프로그램의 업무 규칙을 표현할 때** 특히 유용합니다.

---

## 11.2.3 예외 이름 짓기

예외 클래스 이름은 보통 \`Error\`로 끝냅니다.

\`\`\`python
class InvalidEmailError(Exception):
    pass

class InvalidOrderError(Exception):
    pass

class PaymentFailedError(Exception):
    pass
\`\`\`

예외 이름은 다음 기준으로 작성하면 좋습니다.

\`\`\`text
구체적인 실패 상황이 드러나야 한다.
너무 넓은 이름은 피한다.
일관되게 Error로 끝낸다.
업무 도메인 용어를 반영한다.
\`\`\`

예를 들어 다음 이름은 너무 모호합니다.

\`\`\`python
class DataError(Exception):
    pass
\`\`\`

무슨 데이터가 왜 잘못되었는지 알기 어렵습니다.

조금 더 구체적으로 작성할 수 있습니다.

\`\`\`python
class MissingRequiredColumnError(Exception):
    pass

class InvalidDateFormatError(Exception):
    pass

class DuplicateOrderIdError(Exception):
    pass
\`\`\`

데이터 처리 프로그램에서는 이런 예외 이름이 훨씬 유용합니다.

---

## 11.2.4 예외에 추가 정보 담기

예외는 메시지만 가질 수도 있지만, 필요한 경우 추가 정보를 속성으로 저장할 수 있습니다.

\`\`\`python
class MissingRequiredColumnError(Exception):
    def __init__(self, column_name: str):
        self.column_name = column_name
        super().__init__(f"필수 컬럼이 없습니다: {column_name}")
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
def validate_columns(columns: list[str]) -> None:
    required_columns = ["order_id", "price", "quantity"]

    for column in required_columns:
        if column not in columns:
            raise MissingRequiredColumnError(column)

try:
    validate_columns(["order_id", "price"])
except MissingRequiredColumnError as error:
    print(error)
    print("누락된 컬럼:", error.column_name)
\`\`\`

출력 결과는 다음과 같습니다.

\`\`\`text
필수 컬럼이 없습니다: quantity
누락된 컬럼: quantity
\`\`\`

예외 객체에 추가 정보를 담으면 상위 코드에서 더 구체적으로 처리할 수 있습니다.

---

## 11.2.5 사용자 정의 예외와 데이터 검증

데이터분석 전 단계에서는 데이터를 검증하는 코드가 자주 필요합니다. 예를 들어 CSV 파일에 반드시 있어야 하는 컬럼을 검사한다고 가정해 보겠습니다.

\`\`\`python
class DataValidationError(Exception):
    pass

class MissingRequiredColumnError(DataValidationError):
    def __init__(self, column_name: str):
        self.column_name = column_name
        super().__init__(f"필수 컬럼이 없습니다: {column_name}")

class InvalidNumberError(DataValidationError):
    def __init__(self, column_name: str, value: str):
        self.column_name = column_name
        self.value = value
        super().__init__(f"숫자로 변환할 수 없습니다. column={column_name}, value={value}")
\`\`\`

이제 데이터 검증 함수에서 이 예외들을 사용할 수 있습니다.

\`\`\`python
def validate_required_columns(row: dict[str, str]) -> None:
    required_columns = ["order_id", "price", "quantity"]

    for column in required_columns:
        if column not in row:
            raise MissingRequiredColumnError(column)


def parse_int_column(row: dict[str, str], column_name: str) -> int:
    value = row[column_name]

    try:
        return int(value)
    except ValueError as error:
        raise InvalidNumberError(column_name, value) from error
\`\`\`

\`parse_int_column()\`에서 \`ValueError\`를 잡고 \`InvalidNumberError\`로 바꾸고 있습니다. 여기서 \`from error\`를 사용하면 원래 발생한 \`ValueError\`도 함께 추적할 수 있습니다.

---

## 11.3 예외 계층 설계

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

## 11.4 예외 전파

예외는 발생한 위치에서 반드시 처리해야 하는 것은 아닙니다. 함수 안에서 예외가 발생했지만 그 함수가 처리하지 않으면, 예외는 호출한 쪽으로 전달됩니다. 이것을 **예외 전파**라고 합니다.

\`\`\`python
def parse_price(value: str) -> int:
    return int(value)


def calculate_total(price_text: str, quantity: int) -> int:
    price = parse_price(price_text)
    return price * quantity


calculate_total("abc", 3)
\`\`\`

\`parse_price()\`에서 \`ValueError\`가 발생하지만, 그 함수 안에는 \`except\`가 없습니다. 따라서 예외는 \`calculate_total()\`로 전달되고, 거기서도 처리되지 않으면 프로그램의 최상위로 전달됩니다.

예외 전파는 나쁜 것이 아닙니다. 오히려 실무 코드에서는 예외를 적절한 위치까지 전파하는 것이 중요합니다.

---

## 11.4.1 예외를 처리할 위치 정하기

예외를 어디에서 처리할지는 매우 중요합니다.

예를 들어 다음 함수는 문자열을 정수로 바꾸는 기능만 담당합니다.

\`\`\`python
def parse_price(value: str) -> int:
    return int(value)
\`\`\`

이 함수 안에서 사용자에게 메시지를 출력하는 것은 좋지 않을 수 있습니다.

\`\`\`python
def parse_price(value: str) -> int:
    try:
        return int(value)
    except ValueError:
        print("가격이 잘못되었습니다.")
        return 0
\`\`\`

이 함수는 이제 두 가지 일을 하고 있습니다.

\`\`\`text
1. 문자열을 정수로 변환한다.
2. 사용자에게 오류 메시지를 출력한다.
\`\`\`

게다가 잘못된 가격을 \`0\`으로 바꾸는 것이 항상 올바른 처리인지도 알 수 없습니다. 어떤 프로그램에서는 기본값 \`0\`이 괜찮을 수 있지만, 어떤 프로그램에서는 잘못된 데이터로 판단하고 전체 작업을 멈춰야 할 수도 있습니다.

따라서 하위 함수는 예외를 그대로 전달하고, 상위 함수에서 상황에 맞게 처리하는 구조가 더 나을 수 있습니다.

\`\`\`python
def parse_price(value: str) -> int:
    return int(value)


def main() -> None:
    try:
        price = parse_price("abc")
    except ValueError:
        print("가격이 올바르지 않습니다. 입력값을 확인하세요.")
\`\`\`

이 구조에서는 변환 함수가 변환 책임만 가지고, 사용자 메시지는 실행 흐름을 관리하는 \`main()\` 함수에서 담당합니다.

---

## 11.4.2 하위 함수와 상위 함수의 역할

실무 코드에서는 다음 원칙을 사용할 수 있습니다.

\`\`\`text
하위 함수는 구체적인 작업을 수행한다.
하위 함수는 복구할 수 없는 예외를 억지로 처리하지 않는다.
상위 함수는 전체 흐름을 알고 있으므로 사용자 메시지, 로그, 종료 여부를 결정한다.
\`\`\`

예를 들어 파일을 읽는 함수는 파일 읽기에만 집중합니다.

\`\`\`python
def read_text_file(path: str) -> str:
    with open(path, "r", encoding="utf-8") as file:
        return file.read()
\`\`\`

실행 흐름을 담당하는 함수에서 예외를 처리합니다.

\`\`\`python
def main() -> None:
    path = "config.txt"

    try:
        content = read_text_file(path)
    except FileNotFoundError:
        print(f"파일을 찾을 수 없습니다: {path}")
        return

    print(content)
\`\`\`

이렇게 하면 \`read_text_file()\`은 다른 곳에서도 재사용하기 쉽습니다.

---

## 11.4.3 예외 변환

내장 예외를 그대로 전달하는 대신, 프로그램의 의미에 맞는 예외로 바꾸어 전달할 수 있습니다.

\`\`\`python
class ConfigError(Exception):
    pass


def load_config(path: str) -> str:
    try:
        with open(path, "r", encoding="utf-8") as file:
            return file.read()
    except FileNotFoundError as error:
        raise ConfigError(f"설정 파일을 찾을 수 없습니다: {path}") from error
\`\`\`

여기서 실제 원인은 \`FileNotFoundError\`입니다. 하지만 상위 코드 입장에서는 “파일이 없다”보다 “설정 로딩에 실패했다”가 더 의미 있을 수 있습니다.

\`raise ... from error\`를 사용하면 원래 예외와 새 예외의 관계가 보존됩니다.

실행하면 traceback에 원래 예외와 새 예외가 함께 나타납니다. 이것을 **예외 체이닝**이라고 합니다.

---

## 11.4.4 \`raise from\`을 사용하는 이유

다음 코드를 보겠습니다.

\`\`\`python
class InvalidPriceError(Exception):
    pass


def parse_price(value: str) -> int:
    try:
        return int(value)
    except ValueError as error:
        raise InvalidPriceError(f"가격으로 사용할 수 없는 값입니다: {value}") from error
\`\`\`

이 코드에서 외부로 드러나는 예외는 \`InvalidPriceError\`입니다. 하지만 원래 원인인 \`ValueError\`도 traceback에 남습니다.

\`raise from\`을 사용하는 이유는 다음과 같습니다.

\`\`\`text
1. 상위 코드에는 더 의미 있는 예외를 전달할 수 있다.
2. 디버깅할 때 원래 예외 원인을 확인할 수 있다.
3. 예외 변환 과정이 명시적으로 드러난다.
\`\`\`

\`raise from\`은 특히 다음 상황에서 유용합니다.

\`\`\`text
파일 처리 예외를 설정 오류로 바꾸기
JSON 파싱 예외를 API 응답 오류로 바꾸기
값 변환 예외를 데이터 검증 오류로 바꾸기
외부 라이브러리 예외를 내 애플리케이션 예외로 바꾸기
\`\`\`

---

## 11.4.5 \`raise from None\`

때로는 원래 예외를 사용자에게 보여주고 싶지 않을 수 있습니다. 이때 \`raise from None\`을 사용할 수 있습니다.

\`\`\`python
class InvalidPriceError(Exception):
    pass


def parse_price(value: str) -> int:
    try:
        return int(value)
    except ValueError:
        raise InvalidPriceError("가격은 정수여야 합니다.") from None
\`\`\`

\`from None\`은 원래 예외와의 연결을 숨깁니다. 사용자에게 단순한 메시지만 보여주고 싶을 때 사용할 수 있습니다.

하지만 실무에서는 원인 추적이 중요하므로 무조건 숨기면 안 됩니다. 개발자가 확인할 로그에는 원래 원인이 남아야 합니다.

정리하면 다음과 같습니다.

\`\`\`text
원인 추적이 중요하면 raise ... from error
사용자에게 단순한 메시지만 보여주려면 raise ... from None
디버깅 정보가 사라질 수 있으므로 from None은 신중하게 사용
\`\`\`

---

## 11.4.6 예외를 처리하지 말아야 하는 경우

모든 예외를 처리하려고 하면 오히려 코드가 나빠집니다.

\`\`\`python
def calculate_total(price: int, quantity: int) -> int:
    try:
        return price * quantity
    except Exception:
        return 0
\`\`\`

이 함수는 어떤 오류가 발생해도 \`0\`을 반환합니다. 하지만 이 동작은 위험합니다.

\`\`\`text
price가 문자열이어도 0이 반환될 수 있다.
quantity가 None이어도 0이 반환될 수 있다.
실제 버그가 숨겨진다.
잘못된 결과가 정상 결과처럼 사용될 수 있다.
\`\`\`

예외를 처리하지 않는 것이 더 나은 경우도 많습니다.

\`\`\`python
def calculate_total(price: int, quantity: int) -> int:
    return price * quantity
\`\`\`

이 함수는 입력값이 잘못되면 자연스럽게 예외가 발생합니다. 그러면 호출한 쪽에서 입력값 검증을 하거나 오류를 수정할 수 있습니다.

예외 처리는 “프로그램이 멈추지 않게 하는 장치”가 아니라 “실패를 올바른 위치에서 다루는 설계”입니다.

---

## 11.5 로깅 심화

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

## 11.6 실무 활용

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