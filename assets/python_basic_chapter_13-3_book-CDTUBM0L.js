var e=`<!-- 원본: python_basic_chapter_13_book.md / 세부 장: 13-3 -->

# 13.3 \`pytest\` 기초

### 13.3.1 \`pytest\`란 무엇인가

\`pytest\`는 파이썬에서 테스트를 쉽게 작성하고 실행할 수 있도록 도와주는 외부 라이브러리입니다.

앞에서 우리는 \`assert\`를 사용해 테스트를 작성했습니다. 그런데 테스트 함수가 많아지면 파일을 하나하나 실행하기 번거롭습니다. 어떤 테스트가 통과했고, 어떤 테스트가 실패했는지도 보기 좋게 확인하고 싶습니다.

\`pytest\`는 이런 일을 도와줍니다.

\`\`\`text
- 테스트 파일을 자동으로 찾는다.
- 테스트 함수를 자동으로 실행한다.
- 어떤 테스트가 통과했는지 알려준다.
- 어떤 테스트가 실패했는지 알려준다.
- 실패한 이유를 자세히 보여준다.
- 예외가 발생해야 하는 상황도 테스트할 수 있다.
\`\`\`

\`pytest\`는 외부 라이브러리이므로 사용하려면 설치해야 합니다.

\`\`\`bash
pip install pytest
\`\`\`

설치 후 다음 명령으로 확인할 수 있습니다.

\`\`\`bash
pytest --version
\`\`\`

테스트를 실행할 때는 보통 프로젝트 폴더에서 다음 명령을 사용합니다.

\`\`\`bash
pytest
\`\`\`

그러면 \`pytest\`가 테스트 파일과 테스트 함수를 찾아 실행합니다.

---

### 13.3.2 테스트 파일 이름 규칙

\`pytest\`가 테스트를 자동으로 찾으려면 파일 이름과 함수 이름에 일정한 규칙을 사용하는 것이 좋습니다.

테스트 파일 이름은 보통 다음과 같이 작성합니다.

\`\`\`text
test_파일이름.py
\`\`\`

예를 들어 계산 함수 테스트 파일이라면 다음과 같이 만들 수 있습니다.

\`\`\`text
test_calculator.py
\`\`\`

또는 파일 이름 끝에 \`_test.py\`를 붙이는 방식도 사용됩니다.

\`\`\`text
calculator_test.py
\`\`\`

초보 단계에서는 \`test_\`로 시작하는 파일 이름을 사용하는 습관을 들이면 좋습니다.

예시 프로젝트 구조는 다음과 같습니다.

\`\`\`text
project/
  calculator.py
  test_calculator.py
\`\`\`

\`calculator.py\`에는 실제 함수가 들어갑니다.

\`\`\`python
# calculator.py

def add(a, b):
    return a + b
\`\`\`

\`test_calculator.py\`에는 테스트 코드가 들어갑니다.

\`\`\`python
# test_calculator.py

from calculator import add


def test_add():
    assert add(1, 2) == 3
\`\`\`

이제 터미널에서 다음 명령을 실행하면 됩니다.

\`\`\`bash
pytest
\`\`\`

---

### 13.3.3 테스트 함수 이름 규칙

\`pytest\`가 테스트 함수를 찾으려면 함수 이름도 보통 \`test_\`로 시작해야 합니다.

\`\`\`python
def test_add():
    assert add(1, 2) == 3
\`\`\`

반면 다음 함수는 일반 함수로 취급될 수 있습니다.

\`\`\`python
def check_add():
    assert add(1, 2) == 3
\`\`\`

테스트 함수 이름은 단순히 \`test1\`, \`test2\`처럼 짓기보다 무엇을 검증하는지 드러나게 작성하는 것이 좋습니다.

좋은 예:

\`\`\`python
def test_add_two_positive_numbers():
    assert add(1, 2) == 3
\`\`\`

\`\`\`python
def test_shipping_fee_is_free_when_total_price_is_50000():
    assert calculate_shipping_fee(50000) == 0
\`\`\`

이름이 길어져도 괜찮습니다. 테스트 이름은 문서 역할도 합니다. 나중에 테스트가 실패했을 때 이름만 보고 어떤 상황이 실패했는지 알 수 있으면 좋습니다.

---

### 13.3.4 \`pytest\` 실행하기

다음과 같은 파일을 준비해보겠습니다.

\`\`\`python
# test_sample.py

def add(a, b):
    return a + b


def test_add():
    assert add(1, 2) == 3
\`\`\`

터미널에서 해당 파일이 있는 폴더로 이동한 뒤 다음 명령을 실행합니다.

\`\`\`bash
pytest
\`\`\`

실행 결과는 환경에 따라 조금 다를 수 있지만, 대략 다음과 비슷합니다.

\`\`\`text
============================= test session starts =============================
collected 1 item

test_sample.py .                                                        [100%]

============================== 1 passed in 0.01s ==============================
\`\`\`

여기서 중요한 부분은 다음입니다.

\`\`\`text
collected 1 item
1 passed
\`\`\`

\`collected 1 item\`은 테스트 1개를 찾았다는 뜻입니다. \`1 passed\`는 테스트 1개가 통과했다는 뜻입니다.

이번에는 실패하는 테스트를 만들어보겠습니다.

\`\`\`python
# test_sample.py

def add(a, b):
    return a + b


def test_add():
    assert add(1, 2) == 4
\`\`\`

다시 실행하면 실패 결과가 나옵니다.

\`\`\`text
FAILED test_sample.py::test_add
\`\`\`

\`pytest\`는 어떤 테스트가 실패했는지와 실제 값이 무엇이었는지 보여줍니다. 이것이 \`print()\`로 직접 확인하는 것보다 편리한 점입니다.

---

### 13.3.5 여러 테스트 작성하기

하나의 함수에는 여러 테스트를 작성할 수 있습니다.

\`\`\`python
# calculator.py

def add(a, b):
    return a + b


def subtract(a, b):
    return a - b


def multiply(a, b):
    return a * b
\`\`\`

테스트 파일은 다음과 같이 작성합니다.

\`\`\`python
# test_calculator.py

from calculator import add, subtract, multiply


def test_add():
    assert add(1, 2) == 3
    assert add(-1, 1) == 0


def test_subtract():
    assert subtract(10, 3) == 7
    assert subtract(3, 10) == -7


def test_multiply():
    assert multiply(3, 4) == 12
    assert multiply(5, 0) == 0
\`\`\`

\`pytest\`를 실행하면 여러 테스트가 한 번에 실행됩니다.

\`\`\`bash
pytest
\`\`\`

테스트가 많아질수록 자동 실행의 장점이 커집니다. 하나의 명령으로 프로젝트 전체의 주요 기능을 검증할 수 있기 때문입니다.

---

### 13.3.6 테스트 실패 해석하기

테스트가 실패하면 무조건 나쁜 것은 아닙니다. 오히려 테스트가 실패했다는 것은 코드나 예상 결과 중 어딘가에 문제가 있다는 신호입니다.

예를 들어 다음 코드를 보겠습니다.

\`\`\`python
def calculate_total_price(price, quantity):
    return price + quantity


def test_calculate_total_price():
    assert calculate_total_price(10000, 3) == 30000
\`\`\`

테스트는 실패합니다. 함수가 가격과 수량을 더하고 있기 때문입니다. 올바른 계산은 곱셈입니다.

\`\`\`python
def calculate_total_price(price, quantity):
    return price * quantity
\`\`\`

테스트가 실패했을 때는 다음 순서로 확인합니다.

\`\`\`text
1. 어떤 테스트가 실패했는가?
2. 예상 결과는 무엇인가?
3. 실제 결과는 무엇인가?
4. 함수 코드가 잘못되었는가?
5. 테스트의 예상 결과가 잘못되었는가?
6. 테스트 데이터가 의도한 상황을 잘 표현하는가?
\`\`\`

테스트 실패는 문제를 알려주는 도구입니다. 실패 메시지를 잘 읽는 습관이 중요합니다.

---

### 13.3.7 예외 테스트: \`pytest.raises\`

어떤 함수는 잘못된 입력이 들어왔을 때 예외를 발생시키는 것이 올바른 동작입니다. 이런 경우에는 “예외가 발생하는지”도 테스트해야 합니다.

예를 들어 나눗셈 함수를 만들어보겠습니다.

\`\`\`python
def divide(a, b):
    if b == 0:
        raise ValueError("0으로 나눌 수 없습니다.")

    return a / b
\`\`\`

정상 케이스 테스트는 다음과 같습니다.

\`\`\`python
def test_divide():
    assert divide(10, 2) == 5
\`\`\`

그렇다면 \`b\`가 0일 때 \`ValueError\`가 발생하는지도 테스트해야 합니다.

\`\`\`python
import pytest


def test_divide_by_zero():
    with pytest.raises(ValueError):
        divide(10, 0)
\`\`\`

이 테스트는 다음 의미입니다.

\`\`\`text
10을 0으로 나누려고 하면 ValueError가 발생해야 한다.
\`\`\`

만약 예외가 발생하지 않으면 테스트가 실패합니다. 만약 다른 종류의 예외가 발생해도 테스트가 실패합니다.

예외 테스트는 입력값 검증 함수에서 자주 사용됩니다.

---

### 13.3.8 실무 예제: 입력값 검증 함수 테스트

상품 가격은 0보다 크거나 같아야 한다고 가정해보겠습니다.

\`\`\`python
def validate_price(price):
    if price < 0:
        raise ValueError("가격은 음수가 될 수 없습니다.")

    return price
\`\`\`

테스트는 다음처럼 작성할 수 있습니다.

\`\`\`python
import pytest


def test_validate_price_normal():
    assert validate_price(10000) == 10000
    assert validate_price(0) == 0


def test_validate_price_negative():
    with pytest.raises(ValueError):
        validate_price(-1000)
\`\`\`

이 테스트는 정상 입력과 잘못된 입력을 모두 확인합니다.

\`\`\`text
- 10,000원은 정상 가격이다.
- 0원도 허용한다.
- -1,000원은 잘못된 가격이므로 ValueError가 발생해야 한다.
\`\`\`

이처럼 테스트는 함수가 어떤 값을 허용하고 어떤 값을 거부하는지 명확하게 보여줍니다.

---

### 13.3.9 실무 예제: 날짜 문자열 변환 테스트

날짜 문자열을 파일명에 사용할 수 있는 형태로 변환하는 함수를 만들어보겠습니다.

\`\`\`python
def normalize_date_text(date_text):
    return date_text.replace("-", "")
\`\`\`

테스트는 다음처럼 작성할 수 있습니다.

\`\`\`python
def test_normalize_date_text():
    assert normalize_date_text("2026-06-15") == "20260615"
    assert normalize_date_text("2025-01-01") == "20250101"
\`\`\`

하지만 빈 값이나 이미 하이픈이 없는 값도 생각해볼 수 있습니다.

\`\`\`python
def test_normalize_date_text_edge_cases():
    assert normalize_date_text("") == ""
    assert normalize_date_text("20260615") == "20260615"
\`\`\`

간단한 함수라도 입력값의 종류를 나누어 테스트하면 더 안전합니다.

---

### 13.3.10 테스트 파일 구조 예시

실무에서는 실제 코드와 테스트 코드를 분리해서 관리하는 경우가 많습니다. 기초 단계에서는 다음과 같은 구조부터 시작하면 충분합니다.

\`\`\`text
project/
  calculator.py
  test_calculator.py
\`\`\`

조금 더 프로젝트처럼 구성하면 다음과 같습니다.

\`\`\`text
project/
  app/
    __init__.py
    calculator.py
    order.py
  tests/
    test_calculator.py
    test_order.py
\`\`\`

이 구조에서는 실제 코드는 \`app\` 폴더에 두고, 테스트 코드는 \`tests\` 폴더에 둡니다.

예를 들어 \`app/order.py\`에 다음 코드가 있다고 해보겠습니다.

\`\`\`python
# app/order.py

def calculate_order_total(items):
    total = 0

    for item in items:
        total += item["price"] * item["quantity"]

    return total
\`\`\`

테스트 코드는 다음과 같이 작성할 수 있습니다.

\`\`\`python
# tests/test_order.py

from app.order import calculate_order_total


def test_calculate_order_total():
    items = [
        {"name": "키보드", "price": 30000, "quantity": 1},
        {"name": "마우스", "price": 15000, "quantity": 2},
    ]

    assert calculate_order_total(items) == 60000
\`\`\`

처음부터 복잡한 구조를 사용할 필요는 없습니다. 하지만 프로젝트가 커지면 실제 코드와 테스트 코드를 분리하는 습관이 도움이 됩니다.

---
`;export{e as default};