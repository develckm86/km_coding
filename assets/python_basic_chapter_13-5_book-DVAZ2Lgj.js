var e=`<!-- 원본: python_basic_chapter_13_book.md / 세부 장: 13-5 -->

# 13.5 작은 종합 예제: 주문 금액 계산 테스트

이번 장에서 배운 내용을 작은 예제로 정리해보겠습니다.

요구사항은 다음과 같습니다.

\`\`\`text
- 주문 목록을 받아 총 결제 금액을 계산한다.
- 취소된 주문은 제외한다.
- 상품 가격과 수량을 곱해 주문 금액을 계산한다.
- 주문 목록이 비어 있으면 0을 반환한다.
\`\`\`

먼저 함수를 작성합니다.

\`\`\`python
def calculate_paid_order_total(orders):
    total_price = 0

    for order in orders:
        if order["status"] != "paid":
            continue

        total_price += order["price"] * order["quantity"]

    return total_price
\`\`\`

테스트 파일을 작성합니다.

\`\`\`python
def test_calculate_paid_order_total():
    orders = [
        {"name": "키보드", "price": 30000, "quantity": 1, "status": "paid"},
        {"name": "마우스", "price": 15000, "quantity": 2, "status": "paid"},
    ]

    assert calculate_paid_order_total(orders) == 60000
\`\`\`

취소 주문을 제외하는지도 테스트합니다.

\`\`\`python
def test_calculate_paid_order_total_excludes_cancelled_orders():
    orders = [
        {"name": "키보드", "price": 30000, "quantity": 1, "status": "paid"},
        {"name": "모니터", "price": 200000, "quantity": 1, "status": "cancelled"},
    ]

    assert calculate_paid_order_total(orders) == 30000
\`\`\`

빈 목록도 테스트합니다.

\`\`\`python
def test_calculate_paid_order_total_empty_orders():
    assert calculate_paid_order_total([]) == 0
\`\`\`

이제 다음 세 가지를 확인할 수 있습니다.

\`\`\`text
- 결제 완료 주문의 총액 계산
- 취소 주문 제외
- 빈 주문 목록 처리
\`\`\`

테스트가 여러 개로 나뉘어 있기 때문에 실패했을 때 어떤 조건에서 문제가 생겼는지 찾기 쉽습니다.

---

## 13장 핵심 정리

이 장에서는 테스트와 코드 검증의 기초를 배웠습니다.

테스트는 코드가 의도한 대로 동작하는지 확인하는 과정입니다. 작은 코드에서는 \`print()\`로 확인할 수 있지만, 코드가 커지고 수정이 반복되면 자동 테스트가 필요합니다.

\`assert\`는 조건이 참인지 확인하는 문장입니다. 테스트에서는 실제 결과와 예상 결과를 비교할 때 자주 사용합니다.

\`\`\`python
assert calculate_total_price(10000, 3) == 30000
\`\`\`

테스트는 정상 케이스뿐 아니라 예외 케이스, 경계값, 빈 값도 확인해야 합니다.

\`\`\`text
- 정상 케이스: 일반적으로 기대하는 입력
- 예외 케이스: 잘못된 값이나 특수한 상황
- 경계값: 조건이 바뀌는 기준값
- 빈 값: 빈 문자열, 빈 리스트, None 등
\`\`\`

\`pytest\`는 테스트 파일과 테스트 함수를 자동으로 찾아 실행하는 외부 라이브러리입니다. 테스트 파일과 함수 이름을 \`test_\`로 시작하면 테스트를 쉽게 관리할 수 있습니다.

\`\`\`bash
pytest
\`\`\`

예외가 발생해야 하는 상황은 \`pytest.raises\`로 테스트할 수 있습니다.

\`\`\`python
with pytest.raises(ValueError):
    validate_price(-1000)
\`\`\`

테스트가 있으면 리팩터링을 더 안전하게 할 수 있습니다. 코드를 개선한 뒤 테스트를 실행해 기존 기능이 유지되는지 확인할 수 있기 때문입니다.

이제 여러분은 파이썬 기초 문법을 배우는 것을 넘어, 작성한 코드가 정말 올바른지 검증하는 첫걸음을 배웠습니다.

---

## 13장 연습문제

### 문제 1. 테스트의 목적

다음 중 테스트의 목적으로 가장 적절한 것을 고르세요.

\`\`\`text
A. 코드를 더 길게 만들기 위해서
B. 코드가 의도한 대로 동작하는지 확인하기 위해서
C. 파이썬 파일을 자동으로 삭제하기 위해서
D. 실행 속도를 무조건 빠르게 만들기 위해서
\`\`\`

---

### 문제 2. \`assert\` 결과 예측

다음 코드의 실행 결과를 설명하세요.

\`\`\`python
assert 10 + 5 == 15
\`\`\`

---

### 문제 3. 실패하는 \`assert\`

다음 코드가 실패하는 이유를 설명하세요.

\`\`\`python
assert 2 * 3 == 5
\`\`\`

---

### 문제 4. 함수 테스트 작성하기

다음 함수가 있습니다.

\`\`\`python
def calculate_total_price(price, quantity):
    return price * quantity
\`\`\`

\`calculate_total_price(10000, 3)\`의 결과가 \`30000\`인지 확인하는 \`assert\` 문을 작성하세요.

---

### 문제 5. 경계값 테스트

다음 함수가 있습니다.

\`\`\`python
def is_adult(age):
    return age >= 19
\`\`\`

18세, 19세, 20세에 대한 테스트를 작성하세요.

---

### 문제 6. 빈 값 테스트

다음 함수가 있습니다.

\`\`\`python
def normalize_name(name):
    return name.strip()
\`\`\`

다음 두 가지를 확인하는 테스트를 작성하세요.

\`\`\`text
- "  홍길동  "은 "홍길동"이 되어야 한다.
- "   "은 ""이 되어야 한다.
\`\`\`

---

### 문제 7. 테스트 파일 이름

\`pytest\`에서 테스트 파일 이름으로 적절한 것을 모두 고르세요.

\`\`\`text
A. test_calculator.py
B. calculator_test.py
C. calculator.py
D. memo.txt
\`\`\`

---

### 문제 8. 테스트 함수 이름

다음 중 \`pytest\`가 테스트 함수로 찾기 쉬운 이름을 고르세요.

\`\`\`text
A. check_add
B. add_test
C. test_add
D. run_add
\`\`\`

---

### 문제 9. 예외 테스트

다음 함수가 있습니다.

\`\`\`python
def validate_price(price):
    if price < 0:
        raise ValueError("가격은 음수가 될 수 없습니다.")
    return price
\`\`\`

\`validate_price(-1000)\`을 호출했을 때 \`ValueError\`가 발생하는지 \`pytest.raises\`를 사용해 테스트하세요.

---

### 문제 10. 코드 오류 찾기

다음 함수는 주문 총액을 계산해야 합니다. 하지만 코드에 오류가 있습니다.

\`\`\`python
def calculate_total_price(price, quantity):
    return price + quantity
\`\`\`

다음 테스트가 실패하는 이유와 수정 방법을 설명하세요.

\`\`\`python
def test_calculate_total_price():
    assert calculate_total_price(10000, 3) == 30000
\`\`\`

---

### 문제 11. 테스트 케이스 추가하기

다음 함수가 있습니다.

\`\`\`python
def calculate_shipping_fee(total_price):
    if total_price >= 50000:
        return 0
    return 3000
\`\`\`

다음 세 값을 테스트하는 코드를 작성하세요.

\`\`\`text
49,999원 → 3,000원
50,000원 → 0원
50,001원 → 0원
\`\`\`

---

### 문제 12. 리팩터링과 테스트

다음 설명이 맞으면 O, 틀리면 X를 표시하세요.

\`\`\`text
리팩터링은 코드의 외부 동작은 유지하면서 내부 구조를 개선하는 작업이다.
\`\`\`

---

### 문제 13. 테스트하기 쉬운 코드

다음 두 함수 중 테스트하기 더 쉬운 함수를 고르고 이유를 설명하세요.

\`\`\`python
def print_greeting():
    name = input("이름을 입력하세요: ")
    print(f"안녕하세요, {name}님")
\`\`\`

\`\`\`python
def make_greeting(name):
    return f"안녕하세요, {name}님"
\`\`\`

---

### 문제 14. 주문 총액 테스트 작성하기

다음 함수가 있습니다.

\`\`\`python
def calculate_paid_order_total(orders):
    total_price = 0

    for order in orders:
        if order["status"] != "paid":
            continue

        total_price += order["price"] * order["quantity"]

    return total_price
\`\`\`

다음 주문 목록을 사용해 결과가 \`60000\`인지 확인하는 테스트를 작성하세요.

\`\`\`python
orders = [
    {"name": "키보드", "price": 30000, "quantity": 1, "status": "paid"},
    {"name": "마우스", "price": 15000, "quantity": 2, "status": "paid"},
]
\`\`\`

---

### 문제 15. 종합 문제

다음 조건을 만족하는 함수와 테스트를 작성하세요.

\`\`\`text
함수 이름: get_grade
입력값: score
동작:
- 90점 이상이면 "A"
- 80점 이상이면 "B"
- 70점 이상이면 "C"
- 그 외에는 "F"
\`\`\`

다음 값을 테스트하세요.

\`\`\`text
95 → A
90 → A
85 → B
80 → B
75 → C
70 → C
60 → F
\`\`\`

---

## 정답 및 해설

### 문제 1 정답

정답: B

테스트의 목적은 코드가 의도한 대로 동작하는지 확인하는 것입니다. 코드를 길게 만들거나 실행 속도를 무조건 빠르게 만드는 것이 목적은 아닙니다.

---

### 문제 2 정답

\`\`\`python
assert 10 + 5 == 15
\`\`\`

이 조건은 참이므로 아무 에러도 발생하지 않고 다음 코드로 넘어갑니다.

해설:

\`assert\`는 조건이 참이면 조용히 지나가고, 거짓이면 \`AssertionError\`를 발생시킵니다.

---

### 문제 3 정답

\`\`\`python
assert 2 * 3 == 5
\`\`\`

\`2 * 3\`의 결과는 6입니다. 6은 5와 같지 않으므로 조건이 거짓이 되고 \`AssertionError\`가 발생합니다.

---

### 문제 4 정답

\`\`\`python
assert calculate_total_price(10000, 3) == 30000
\`\`\`

해설:

실제 함수 실행 결과와 예상 결과를 \`==\`로 비교합니다.

---

### 문제 5 정답

\`\`\`python
def test_is_adult():
    assert is_adult(18) is False
    assert is_adult(19) is True
    assert is_adult(20) is True
\`\`\`

해설:

19세가 기준값이므로 18, 19, 20을 함께 테스트하면 경계값 근처의 동작을 확인할 수 있습니다.

---

### 문제 6 정답

\`\`\`python
def test_normalize_name():
    assert normalize_name("  홍길동  ") == "홍길동"
    assert normalize_name("   ") == ""
\`\`\`

해설:

\`strip()\`은 문자열 앞뒤의 공백을 제거합니다. 공백만 있는 문자열은 빈 문자열이 됩니다.

---

### 문제 7 정답

정답: A, B

해설:

\`pytest\`에서는 보통 \`test_\`로 시작하거나 \`_test.py\`로 끝나는 파일 이름을 테스트 파일로 사용합니다. 초보 단계에서는 \`test_calculator.py\`처럼 \`test_\`로 시작하는 이름을 추천합니다.

---

### 문제 8 정답

정답: C

해설:

\`pytest\`가 테스트 함수를 찾기 쉽게 하려면 함수 이름을 \`test_\`로 시작하는 것이 좋습니다.

---

### 문제 9 정답

\`\`\`python
import pytest


def test_validate_price_negative():
    with pytest.raises(ValueError):
        validate_price(-1000)
\`\`\`

해설:

\`pytest.raises(ValueError)\`는 해당 코드 블록 안에서 \`ValueError\`가 발생해야 테스트가 통과합니다.

---

### 문제 10 정답

실패 이유:

\`\`\`python
def calculate_total_price(price, quantity):
    return price + quantity
\`\`\`

이 함수는 가격과 수량을 더하고 있습니다. 주문 총액은 가격과 수량을 곱해야 하므로 잘못된 결과가 나옵니다.

수정 코드:

\`\`\`python
def calculate_total_price(price, quantity):
    return price * quantity
\`\`\`

---

### 문제 11 정답

\`\`\`python
def test_calculate_shipping_fee_boundary():
    assert calculate_shipping_fee(49999) == 3000
    assert calculate_shipping_fee(50000) == 0
    assert calculate_shipping_fee(50001) == 0
\`\`\`

해설:

50,000원이 무료 배송 기준이므로 기준값 바로 아래, 기준값, 기준값 바로 위를 테스트합니다.

---

### 문제 12 정답

정답: O

해설:

리팩터링은 코드의 외부 동작은 유지하면서 내부 구조를 개선하는 작업입니다. 테스트가 있으면 리팩터링 후에도 기존 기능이 유지되는지 확인할 수 있습니다.

---

### 문제 13 정답

테스트하기 더 쉬운 함수는 다음 함수입니다.

\`\`\`python
def make_greeting(name):
    return f"안녕하세요, {name}님"
\`\`\`

이유:

\`\`\`text
- 입력값이 명확하다.
- 반환값이 명확하다.
- input()에 의존하지 않는다.
- print() 결과를 눈으로 확인하지 않아도 된다.
\`\`\`

테스트 예시:

\`\`\`python
def test_make_greeting():
    assert make_greeting("민수") == "안녕하세요, 민수님"
\`\`\`

---

### 문제 14 정답

\`\`\`python
def test_calculate_paid_order_total():
    orders = [
        {"name": "키보드", "price": 30000, "quantity": 1, "status": "paid"},
        {"name": "마우스", "price": 15000, "quantity": 2, "status": "paid"},
    ]

    assert calculate_paid_order_total(orders) == 60000
\`\`\`

해설:

키보드는 30,000원이고, 마우스는 15,000원 2개이므로 30,000원입니다. 합계는 60,000원입니다.

---

### 문제 15 정답

함수:

\`\`\`python
def get_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    else:
        return "F"
\`\`\`

테스트:

\`\`\`python
def test_get_grade():
    assert get_grade(95) == "A"
    assert get_grade(90) == "A"
    assert get_grade(85) == "B"
    assert get_grade(80) == "B"
    assert get_grade(75) == "C"
    assert get_grade(70) == "C"
    assert get_grade(60) == "F"
\`\`\`

해설:

90, 80, 70은 각 등급의 경계값입니다. 경계값을 포함해서 테스트하면 비교 연산자를 잘못 사용하는 실수를 줄일 수 있습니다.

---

## 참고 자료

이 장의 내용은 파이썬 공식 문서의 \`assert\` 문 설명과 pytest 공식 문서의 시작하기, assertion, 예외 테스트 내용을 기초 수업 수준에 맞게 재구성했습니다.

\`\`\`text
- Python 공식 문서: The assert statement
- pytest 공식 문서: Get Started
- pytest 공식 문서: How to write and report assertions in tests
- pytest 공식 문서: pytest.raises
\`\`\`

---

## 과정 마무리

이 장으로 파이썬 기초 과정의 주요 문법과 실무 활용 기초를 모두 살펴보았습니다.

우리는 1장에서 파이썬이 무엇인지 이해했고, 2장에서 기본 문법을 배웠습니다. 3장에서는 조건문과 반복문으로 프로그램의 흐름을 제어했고, 4장에서는 리스트, 튜플, 딕셔너리, 집합으로 데이터를 구조화했습니다. 5장에서는 함수를 통해 코드를 재사용하는 방법을 배웠고, 6장에서는 예외 처리와 디버깅을 배웠습니다. 7장에서는 객체지향 프로그래밍으로 코드를 더 큰 구조로 설계하는 방법을 익혔습니다.

이후 8장에서는 모듈과 패키지, 9장에서는 외부 라이브러리, 10장에서는 파일 다루기, 11장에서는 데이터 처리 기초, 12장에서는 실무 코드 작성 습관을 배웠습니다. 마지막 13장에서는 작성한 코드가 의도대로 동작하는지 확인하는 테스트 기초를 배웠습니다.

파이썬을 잘 사용한다는 것은 문법을 많이 외우는 것만을 의미하지 않습니다. 중요한 것은 다음과 같은 흐름을 스스로 만들 수 있는 것입니다.

\`\`\`text
문제를 이해한다.
작은 단계로 나눈다.
데이터를 적절한 구조로 표현한다.
함수와 클래스로 코드를 나눈다.
예외 상황을 고려한다.
읽기 좋게 정리한다.
테스트로 검증한다.
\`\`\`

이 흐름을 반복하면 단순한 예제 코드를 넘어 실제 업무 문제를 해결하는 파이썬 코드를 작성할 수 있습니다.
`;export{e as default};