var e=`<!-- 원본: python_basic_chapter_13_book.md / 세부 장: 13-2 -->

# 13.2 간단한 테스트 작성

### 13.2.1 \`assert\`란 무엇인가

\`assert\`는 조건이 참인지 확인하는 파이썬 문장입니다. 조건이 참이면 아무 일도 일어나지 않고 다음 코드로 넘어갑니다. 조건이 거짓이면 \`AssertionError\`가 발생합니다.

기본 구조는 다음과 같습니다.

\`\`\`python
assert 조건식
\`\`\`

예를 들어 다음 코드는 통과합니다.

\`\`\`python
assert 1 + 2 == 3
\`\`\`

\`1 + 2 == 3\`이 참이기 때문입니다.

반면 다음 코드는 실패합니다.

\`\`\`python
assert 1 + 2 == 4
\`\`\`

\`1 + 2\`의 결과는 3인데, 4와 같다고 검사했기 때문입니다. 이 코드는 \`AssertionError\`를 발생시킵니다.

\`assert\`에는 실패했을 때 보여줄 메시지를 함께 넣을 수도 있습니다.

\`\`\`python
assert 1 + 2 == 4, "1 + 2는 4가 아닙니다."
\`\`\`

테스트에서는 보통 다음 구조로 사용합니다.

\`\`\`python
실제_결과 = 함수(입력값)
assert 실제_결과 == 예상_결과
\`\`\`

예를 들어 총액 계산 함수를 테스트해보겠습니다.

\`\`\`python
def calculate_total_price(price, quantity):
    return price * quantity


result = calculate_total_price(10000, 3)
assert result == 30000
\`\`\`

위 테스트는 다음 의미입니다.

\`\`\`text
가격이 10,000원이고 수량이 3개라면 총액은 30,000원이어야 한다.
\`\`\`

테스트는 이렇게 코드가 지켜야 할 약속을 표현합니다.

---

### 13.2.2 \`assert\` 사용 시 주의할 점

\`assert\`는 테스트와 디버깅에 유용하지만, 사용자 입력 검증이나 운영 코드의 필수 검증 로직을 전부 \`assert\`에 맡기면 안 됩니다.

예를 들어 다음 코드는 좋아 보일 수 있습니다.

\`\`\`python
def withdraw(balance, amount):
    assert amount > 0
    assert balance >= amount
    return balance - amount
\`\`\`

하지만 실제 서비스 코드라면 다음처럼 명시적으로 예외를 발생시키는 편이 더 적절합니다.

\`\`\`python
def withdraw(balance, amount):
    if amount <= 0:
        raise ValueError("출금 금액은 0보다 커야 합니다.")

    if balance < amount:
        raise ValueError("잔액이 부족합니다.")

    return balance - amount
\`\`\`

\`assert\`는 “개발자가 예상한 조건이 맞는지 확인하는 용도”로 이해하는 것이 좋습니다. 사용자에게 보여줄 오류 메시지나 반드시 실행되어야 하는 검증은 \`if\`와 \`raise\`를 사용하는 편이 명확합니다.

이 장에서는 테스트 작성 도구로 \`assert\`를 사용합니다.

---

### 13.2.3 테스트 함수 형태로 작성하기

처음에는 \`assert\`를 파일 아래에 바로 작성해도 됩니다.

\`\`\`python
def add(a, b):
    return a + b


assert add(1, 2) == 3
assert add(10, 20) == 30
\`\`\`

하지만 테스트가 많아지면 함수로 나누는 것이 좋습니다.

\`\`\`python
def add(a, b):
    return a + b


def test_add():
    assert add(1, 2) == 3
    assert add(10, 20) == 30
    assert add(-1, 1) == 0
\`\`\`

테스트 함수 이름은 보통 \`test_\`로 시작합니다. 이렇게 하면 나중에 \`pytest\`가 테스트 함수를 자동으로 찾을 수 있습니다.

테스트 함수는 보통 다음 구조를 가집니다.

\`\`\`text
1. 준비한다.
2. 실행한다.
3. 확인한다.
\`\`\`

영어로는 Arrange, Act, Assert라고 부르기도 합니다.

예를 들어 할인 계산 테스트를 작성해보겠습니다.

\`\`\`python
def calculate_discounted_price(price, discount_rate):
    return price - int(price * discount_rate)


def test_calculate_discounted_price():
    # 준비
    price = 10000
    discount_rate = 0.1

    # 실행
    result = calculate_discounted_price(price, discount_rate)

    # 확인
    assert result == 9000
\`\`\`

짧은 테스트에서는 세 단계를 꼭 주석으로 나누지 않아도 됩니다.

\`\`\`python
def test_calculate_discounted_price():
    assert calculate_discounted_price(10000, 0.1) == 9000
\`\`\`

중요한 것은 테스트가 무엇을 확인하는지 읽을 수 있어야 한다는 점입니다.

---

### 13.2.4 정상 케이스 테스트

정상 케이스는 함수가 일반적으로 기대하는 입력값을 받았을 때의 동작을 확인하는 테스트입니다.

예를 들어 주문 금액 계산 함수를 보겠습니다.

\`\`\`python
def calculate_total_price(price, quantity):
    return price * quantity
\`\`\`

정상 케이스는 다음과 같습니다.

\`\`\`python
def test_calculate_total_price():
    assert calculate_total_price(10000, 3) == 30000
    assert calculate_total_price(15000, 2) == 30000
    assert calculate_total_price(5000, 1) == 5000
\`\`\`

정상 케이스 테스트는 함수의 기본 동작을 확인합니다.

배송비 계산 함수도 테스트해보겠습니다.

\`\`\`python
def calculate_shipping_fee(total_price):
    if total_price >= 50000:
        return 0
    return 3000
\`\`\`

정상 케이스는 다음처럼 작성할 수 있습니다.

\`\`\`python
def test_calculate_shipping_fee():
    assert calculate_shipping_fee(60000) == 0
    assert calculate_shipping_fee(10000) == 3000
\`\`\`

여기서 한 가지 더 확인해야 할 값이 있습니다. 바로 기준값입니다.

\`\`\`python
def test_calculate_shipping_fee_boundary():
    assert calculate_shipping_fee(50000) == 0
\`\`\`

50,000원 이상 무료 배송이라면 정확히 50,000원일 때도 무료 배송이어야 합니다. 이런 값을 경계값이라고 합니다.

---

### 13.2.5 예외 케이스 테스트

예외 케이스는 일반적인 입력값이 아닌 상황을 확인하는 테스트입니다. 여기서 말하는 예외 케이스는 반드시 파이썬 예외가 발생한다는 뜻만은 아닙니다. 함수가 다루기 어려운 입력, 비어 있는 값, 잘못된 값, 경계 밖의 값을 의미합니다.

예를 들어 나이 검증 함수를 보겠습니다.

\`\`\`python
def is_valid_age(age):
    return age >= 0
\`\`\`

정상 케이스는 다음과 같습니다.

\`\`\`python
def test_is_valid_age_normal():
    assert is_valid_age(20) is True
    assert is_valid_age(0) is True
\`\`\`

예외 케이스는 다음과 같습니다.

\`\`\`python
def test_is_valid_age_invalid():
    assert is_valid_age(-1) is False
\`\`\`

이 함수는 음수 나이를 잘못된 값으로 판단합니다.

이번에는 할인율 검증 함수를 보겠습니다.

\`\`\`python
def is_valid_discount_rate(rate):
    return 0 <= rate <= 1
\`\`\`

테스트는 다음처럼 작성할 수 있습니다.

\`\`\`python
def test_is_valid_discount_rate():
    assert is_valid_discount_rate(0) is True
    assert is_valid_discount_rate(0.5) is True
    assert is_valid_discount_rate(1) is True
    assert is_valid_discount_rate(-0.1) is False
    assert is_valid_discount_rate(1.1) is False
\`\`\`

좋은 테스트는 “잘 되는 경우”뿐 아니라 “잘못된 경우”도 확인합니다.

---

### 13.2.6 경계값 테스트

경계값은 조건이 바뀌는 기준이 되는 값입니다. 실무에서 버그는 경계값 근처에서 자주 발생합니다.

예를 들어 성인 여부를 판단하는 함수가 있습니다.

\`\`\`python
def is_adult(age):
    return age >= 19
\`\`\`

이 함수의 경계값은 19입니다.

테스트는 다음처럼 작성할 수 있습니다.

\`\`\`python
def test_is_adult():
    assert is_adult(18) is False
    assert is_adult(19) is True
    assert is_adult(20) is True
\`\`\`

무료 배송 기준이 50,000원인 경우도 경계값이 중요합니다.

\`\`\`python
def calculate_shipping_fee(total_price):
    if total_price >= 50000:
        return 0
    return 3000
\`\`\`

테스트는 다음처럼 작성합니다.

\`\`\`python
def test_calculate_shipping_fee_boundary():
    assert calculate_shipping_fee(49999) == 3000
    assert calculate_shipping_fee(50000) == 0
    assert calculate_shipping_fee(50001) == 0
\`\`\`

경계값 테스트는 조건문을 검증할 때 특히 중요합니다. \`>\`와 \`>=\`를 잘못 쓰는 실수는 매우 흔하기 때문입니다.

---

### 13.2.7 빈 값 테스트

실무 데이터에는 빈 값이 자주 등장합니다.

\`\`\`text
- 이름이 비어 있음
- 이메일이 비어 있음
- 주문 목록이 비어 있음
- 금액 값이 비어 있음
- 파일 내용이 비어 있음
\`\`\`

빈 값 처리를 테스트하지 않으면 실제 데이터에서 문제가 생길 수 있습니다.

예를 들어 이름을 정리하는 함수가 있다고 해봅시다.

\`\`\`python
def normalize_name(name):
    return name.strip()
\`\`\`

정상 케이스는 다음과 같습니다.

\`\`\`python
def test_normalize_name_normal():
    assert normalize_name("  홍길동  ") == "홍길동"
\`\`\`

빈 문자열도 테스트할 수 있습니다.

\`\`\`python
def test_normalize_name_empty():
    assert normalize_name("") == ""
    assert normalize_name("   ") == ""
\`\`\`

주문 목록의 총액을 계산하는 함수도 보겠습니다.

\`\`\`python
def calculate_order_total(items):
    total = 0

    for item in items:
        total += item["price"] * item["quantity"]

    return total
\`\`\`

빈 리스트가 들어왔을 때의 결과도 확인해야 합니다.

\`\`\`python
def test_calculate_order_total_empty():
    assert calculate_order_total([]) == 0
\`\`\`

빈 값 테스트는 코드가 실제 데이터에 더 강해지도록 도와줍니다.

---

### 13.2.8 테스트 데이터 만들기

테스트를 작성할 때는 테스트용 데이터를 직접 만들어 사용합니다. 이 데이터는 너무 복잡하지 않아야 하고, 무엇을 확인하는지 분명해야 합니다.

예를 들어 주문 총액 계산을 테스트하려면 다음처럼 작은 데이터를 만들 수 있습니다.

\`\`\`python
orders = [
    {"name": "키보드", "price": 30000, "quantity": 1},
    {"name": "마우스", "price": 15000, "quantity": 2},
]
\`\`\`

총액은 다음과 같습니다.

\`\`\`text
키보드: 30,000원 * 1개 = 30,000원
마우스: 15,000원 * 2개 = 30,000원
합계: 60,000원
\`\`\`

테스트는 다음처럼 작성합니다.

\`\`\`python
def calculate_order_total(orders):
    total = 0

    for order in orders:
        total += order["price"] * order["quantity"]

    return total


def test_calculate_order_total():
    orders = [
        {"name": "키보드", "price": 30000, "quantity": 1},
        {"name": "마우스", "price": 15000, "quantity": 2},
    ]

    assert calculate_order_total(orders) == 60000
\`\`\`

테스트 데이터는 크기보다 명확성이 중요합니다. 테스트용 데이터가 너무 크면, 테스트가 실패했을 때 원인을 찾기 어렵습니다.

좋은 테스트 데이터는 다음과 같습니다.

\`\`\`text
- 작다.
- 의미가 분명하다.
- 예상 결과를 쉽게 계산할 수 있다.
- 테스트하려는 상황을 정확히 보여준다.
\`\`\`

---

### 13.2.9 실무 예제: 할인 계산 함수 테스트

할인된 최종 가격을 계산하는 함수를 만들어보겠습니다.

\`\`\`python
def calculate_discounted_price(price, discount_rate):
    discount_amount = int(price * discount_rate)
    return price - discount_amount
\`\`\`

이 함수는 상품 가격과 할인율을 받아 최종 가격을 반환합니다.

테스트는 다음처럼 작성할 수 있습니다.

\`\`\`python
def test_calculate_discounted_price():
    assert calculate_discounted_price(10000, 0.1) == 9000
    assert calculate_discounted_price(20000, 0.25) == 15000
    assert calculate_discounted_price(5000, 0) == 5000
\`\`\`

여기서 확인하는 내용은 다음과 같습니다.

\`\`\`text
- 10,000원에 10% 할인 → 9,000원
- 20,000원에 25% 할인 → 15,000원
- 5,000원에 0% 할인 → 5,000원
\`\`\`

이제 함수를 수정하더라도 테스트를 다시 실행하면 기존 계산이 맞는지 확인할 수 있습니다.

---

### 13.2.10 실무 예제: 이메일 형식 검사 함수 테스트

간단한 이메일 형식 검사 함수를 만들어보겠습니다.

\`\`\`python
def is_valid_email(email):
    return "@" in email and "." in email
\`\`\`

이 함수는 완벽한 이메일 검증 함수는 아닙니다. 하지만 기초 수업에서는 간단한 조건 검증 예제로 충분합니다.

테스트는 다음처럼 작성할 수 있습니다.

\`\`\`python
def test_is_valid_email():
    assert is_valid_email("user@example.com") is True
    assert is_valid_email("admin@test.co.kr") is True
    assert is_valid_email("userexample.com") is False
    assert is_valid_email("user@example") is False
    assert is_valid_email("") is False
\`\`\`

테스트를 보면 이 함수가 어떤 기준으로 이메일을 검사하는지 알 수 있습니다. 테스트는 함수의 사용 예시이기도 합니다.

---
`;export{e as default};