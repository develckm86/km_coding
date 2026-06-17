var e=`<!-- 원본: python_advanced_chapter_11_book.md / 세부 장: 11-2 -->

# 11.2 사용자 정의 예외

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
`;export{e as default};