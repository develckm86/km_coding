var e=`# 13장 테스트와 코드 검증 기초

## 이 장에서 배울 내용

지금까지 우리는 파이썬으로 값을 저장하고, 조건에 따라 흐름을 나누고, 반복하고, 함수를 만들고, 예외를 처리하고, 객체지향 구조를 만들고, 파일과 데이터를 다루는 방법을 배웠습니다. 이제 마지막으로 생각해야 할 질문이 하나 남아 있습니다.

\`\`\`text
“내가 작성한 코드가 정말 의도한 대로 동작하는가?”
\`\`\`

코드는 실행된다고 해서 반드시 올바른 것은 아닙니다. 에러 없이 실행되더라도 결과가 틀릴 수 있고, 정상적인 입력에서는 잘 동작하지만 비어 있는 값이나 잘못된 값이 들어왔을 때 문제가 생길 수도 있습니다.

예를 들어 다음 함수는 할인 금액을 계산하는 함수처럼 보입니다.

\`\`\`python
def calculate_discount_price(price, discount_rate):
    return price * discount_rate
\`\`\`

이 함수는 실행됩니다. 하지만 함수 이름을 보면 “할인된 최종 가격”을 반환할 것처럼 보이는데, 실제로는 “할인 금액”만 반환합니다. 10,000원 상품에 10% 할인을 적용하면 최종 가격은 9,000원이어야 하지만, 위 함수는 1,000을 반환합니다.

이런 문제는 문법 에러가 아니므로 파이썬이 자동으로 알려주지 않습니다. 사람이 확인해야 합니다. 그리고 사람이 매번 직접 확인하는 일을 줄이기 위해 **테스트**를 작성합니다.

이 장에서는 다음 내용을 배웁니다.

\`\`\`text
- 테스트가 필요한 이유
- 수동 테스트와 자동 테스트의 차이
- 테스트 가능한 코드의 특징
- assert로 간단한 테스트 작성하기
- 정상 케이스, 예외 케이스, 경계값 테스트
- pytest 기초
- pytest로 예외 테스트하기
- 테스트 후 코드를 안전하게 개선하는 방법
\`\`\`

이 장의 목표는 테스트 전문가가 되는 것이 아닙니다. 목표는 내가 작성한 함수를 스스로 검증할 수 있고, 코드를 수정할 때 “망가졌는지 아닌지”를 확인할 수 있는 기본 습관을 갖는 것입니다.

---

## 13.1 테스트가 필요한 이유

### 13.1.1 테스트란 무엇인가

테스트란 코드가 의도한 대로 동작하는지 확인하는 과정입니다.

사람이 계산기를 만들었다면 다음과 같은 질문을 해봐야 합니다.

\`\`\`text
- 1 + 2를 입력하면 3이 나오는가?
- 10 - 3을 입력하면 7이 나오는가?
- 5 * 0을 입력하면 0이 나오는가?
- 10 / 0을 입력하면 어떻게 처리되는가?
\`\`\`

이 질문에 대해 직접 실행해보고 결과를 확인하는 것이 테스트입니다.

파이썬 함수도 마찬가지입니다.

\`\`\`python
def add(a, b):
    return a + b
\`\`\`

이 함수가 잘 동작하는지 확인하려면 다음처럼 실행해볼 수 있습니다.

\`\`\`python
print(add(1, 2))
print(add(10, 20))
print(add(-1, 1))
\`\`\`

실행 결과를 눈으로 보고 맞는지 확인할 수 있습니다. 하지만 프로그램이 커질수록 \`print()\`로 직접 확인하는 방식에는 한계가 있습니다.

테스트는 단순히 “한 번 실행해보기”가 아니라, **예상한 결과와 실제 결과를 비교하는 과정**입니다.

\`\`\`text
입력값: 1, 2
예상 결과: 3
실제 결과: 3
판단: 통과
\`\`\`

이처럼 테스트는 코드의 동작을 확인하는 기준을 만들어줍니다.

---

### 13.1.2 테스트가 필요한 이유

처음에는 테스트가 귀찮게 느껴질 수 있습니다.

\`\`\`text
“코드를 한 번 실행해봤는데 잘 되던데요?”
\`\`\`

작은 코드에서는 그렇게 느낄 수 있습니다. 하지만 실무에서는 코드가 계속 바뀝니다. 요구사항이 바뀌고, 파일 형식이 바뀌고, 새로운 조건이 추가됩니다. 이때 기존 기능이 그대로 잘 동작하는지 매번 직접 확인하기는 어렵습니다.

테스트가 필요한 이유는 다음과 같습니다.

\`\`\`text
- 코드가 의도대로 동작하는지 확인할 수 있다.
- 코드를 수정한 뒤 기존 기능이 망가지지 않았는지 확인할 수 있다.
- 실수로 잘못된 결과를 만드는 상황을 줄일 수 있다.
- 함수의 사용 방법을 예제로 남길 수 있다.
- 코드에 대한 자신감을 높일 수 있다.
\`\`\`

예를 들어 배송비 계산 함수가 있다고 해봅시다.

\`\`\`python
def calculate_shipping_fee(total_price):
    if total_price >= 50000:
        return 0
    return 3000
\`\`\`

이 함수는 50,000원 이상이면 무료 배송, 그보다 낮으면 배송비 3,000원을 반환합니다. 처음에는 잘 동작하는 것처럼 보입니다.

그런데 나중에 정책이 바뀌어 30,000원 이상 무료 배송으로 수정해야 한다면 어떻게 해야 할까요?

\`\`\`python
def calculate_shipping_fee(total_price):
    if total_price >= 30000:
        return 0
    return 3000
\`\`\`

수정 후에는 다음을 확인해야 합니다.

\`\`\`text
- 29,999원은 배송비 3,000원이 맞는가?
- 30,000원은 무료 배송이 맞는가?
- 50,000원도 여전히 무료 배송인가?
\`\`\`

이런 확인을 테스트로 만들어두면, 함수를 수정할 때마다 자동으로 검사할 수 있습니다.

---

### 13.1.3 수동 테스트와 자동 테스트

테스트는 크게 수동 테스트와 자동 테스트로 나눌 수 있습니다.

수동 테스트는 사람이 직접 코드를 실행하고 결과를 눈으로 확인하는 방식입니다.

\`\`\`python
print(calculate_shipping_fee(29999))
print(calculate_shipping_fee(30000))
print(calculate_shipping_fee(50000))
\`\`\`

이 방식은 처음에는 쉽습니다. 하지만 결과를 사람이 직접 비교해야 합니다. 실행 결과가 많아지면 실수하기 쉽습니다.

자동 테스트는 예상 결과를 코드로 작성해두고, 컴퓨터가 실제 결과와 비교하게 하는 방식입니다.

\`\`\`python
assert calculate_shipping_fee(29999) == 3000
assert calculate_shipping_fee(30000) == 0
assert calculate_shipping_fee(50000) == 0
\`\`\`

위 코드는 결과가 맞으면 조용히 지나갑니다. 결과가 틀리면 에러가 발생합니다. 즉, 자동 테스트는 “사람이 눈으로 비교하는 일”을 코드가 대신하게 만듭니다.

비교하면 다음과 같습니다.

| 구분 | 수동 테스트 | 자동 테스트 |
|---|---|---|
| 확인 방식 | 사람이 직접 확인 | 코드가 자동으로 확인 |
| 장점 | 시작하기 쉽다 | 반복 실행하기 좋다 |
| 단점 | 실수하기 쉽다 | 처음에는 작성법을 배워야 한다 |
| 적합한 상황 | 간단한 실험 | 반복 검증, 실무 코드 |

수업 초반에는 \`print()\`로 확인하는 것도 중요합니다. 하지만 함수가 늘어나고 코드가 커질수록 \`assert\`와 \`pytest\` 같은 자동 테스트 도구가 필요합니다.

---

### 13.1.4 테스트가 필요한 상황

테스트는 모든 코드에 같은 수준으로 작성할 필요는 없습니다. 하지만 다음과 같은 코드는 테스트를 작성하는 것이 좋습니다.

\`\`\`text
- 계산 결과가 중요한 코드
- 돈, 수량, 비율을 계산하는 코드
- 날짜를 변환하거나 비교하는 코드
- 입력값을 검증하는 코드
- 파일명을 만들거나 경로를 처리하는 코드
- 예외 상황을 처리해야 하는 코드
- 여러 곳에서 재사용되는 함수
\`\`\`

예를 들어 다음 함수들은 테스트하기 좋은 대상입니다.

\`\`\`python
def calculate_total_price(price, quantity):
    return price * quantity


def is_valid_age(age):
    return age >= 0


def make_report_filename(date_text):
    return f"report_{date_text}.xlsx"
\`\`\`

반면 다음과 같은 코드는 테스트하기가 조금 더 어렵습니다.

\`\`\`python
name = input("이름을 입력하세요: ")
print(f"안녕하세요, {name}님")
\`\`\`

이 코드는 사용자 입력과 화면 출력에 직접 의존합니다. 이런 코드를 테스트하기 쉽게 만들려면, 입력과 출력을 함수 밖으로 분리하는 것이 좋습니다.

\`\`\`python
def make_greeting(name):
    return f"안녕하세요, {name}님"
\`\`\`

이제 이 함수는 테스트하기 쉬워졌습니다.

\`\`\`python
assert make_greeting("민수") == "안녕하세요, 민수님"
\`\`\`

테스트하기 쉬운 코드는 보통 구조도 좋습니다. 입력과 출력이 분명하고, 하나의 함수가 하나의 역할만 하기 때문입니다.

---

### 13.1.5 테스트 가능한 코드의 특징

테스트하기 쉬운 코드는 대체로 다음과 같은 특징을 가집니다.

\`\`\`text
- 입력값이 명확하다.
- 반환값이 명확하다.
- 함수가 하나의 역할만 한다.
- 외부 환경에 덜 의존한다.
- 실행할 때마다 결과가 예측 가능하다.
\`\`\`

예를 들어 다음 함수는 테스트하기 쉽습니다.

\`\`\`python
def calculate_discounted_price(price, discount_rate):
    return price - int(price * discount_rate)
\`\`\`

입력값은 \`price\`와 \`discount_rate\`이고, 반환값은 할인된 가격입니다. 같은 입력을 넣으면 항상 같은 결과가 나옵니다.

반면 다음 함수는 테스트하기 어렵습니다.

\`\`\`python
import random


def create_coupon_code():
    number = random.randint(1000, 9999)
    return f"COUPON-{number}"
\`\`\`

이 함수는 실행할 때마다 결과가 달라집니다. 이런 코드는 테스트할 때 “정확히 어떤 값이 나와야 한다”라고 쓰기 어렵습니다. 물론 테스트할 수 없는 것은 아니지만, 처음 배우는 단계에서는 입력과 출력이 분명한 함수부터 테스트하는 것이 좋습니다.

테스트하기 어려운 코드의 예는 다음과 같습니다.

\`\`\`text
- 함수 안에서 input()을 직접 호출하는 코드
- 함수 안에서 print()만 하고 반환값이 없는 코드
- 현재 시간, 랜덤값, 외부 API에 직접 의존하는 코드
- 파일을 직접 읽고 쓰는 코드와 계산 로직이 섞인 코드
- 하나의 함수가 너무 많은 일을 하는 코드
\`\`\`

이런 코드는 역할을 나누면 테스트하기 쉬워집니다.

예를 들어 파일에서 데이터를 읽고 총액을 계산하는 코드가 있다면, 파일 읽기와 총액 계산을 분리합니다.

\`\`\`python
def calculate_total_amount(orders):
    total = 0

    for order in orders:
        total += order["price"] * order["quantity"]

    return total
\`\`\`

이제 파일 없이도 주문 데이터만 전달해서 계산 로직을 테스트할 수 있습니다.

---

## 13.2 간단한 테스트 작성

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

## 13.3 \`pytest\` 기초

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

## 13.4 코드 검증과 리팩터링

### 13.4.1 리팩터링이란 무엇인가

리팩터링은 코드의 외부 동작은 유지하면서 내부 구조를 개선하는 작업입니다.

쉽게 말하면 다음과 같습니다.

\`\`\`text
결과는 그대로 두고, 코드를 더 읽기 쉽고 관리하기 좋게 바꾸는 것
\`\`\`

예를 들어 다음 코드는 동작은 하지만 읽기 어렵습니다.

\`\`\`python
def calc(orders):
    t = 0
    for x in orders:
        if x["status"] == "paid":
            t += x["price"] * x["quantity"]
    return t
\`\`\`

리팩터링하면 다음처럼 바꿀 수 있습니다.

\`\`\`python
def calculate_paid_order_total(orders):
    total_price = 0

    for order in orders:
        if order["status"] == "paid":
            total_price += order["price"] * order["quantity"]

    return total_price
\`\`\`

함수 이름과 변수명을 바꿨지만 외부 동작은 같습니다. 이런 변경은 테스트가 있을 때 더 안전하게 할 수 있습니다.

리팩터링 전 테스트를 작성해두면, 코드를 고친 뒤에도 같은 테스트가 통과하는지 확인할 수 있습니다.

---

### 13.4.2 테스트가 리팩터링을 안전하게 만든다

다음 함수를 예로 들어보겠습니다.

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

먼저 테스트를 작성합니다.

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

이제 내부 코드를 바꾸고 싶다고 해봅시다.

\`\`\`python
def get_grade(score):
    grade_rules = [
        (90, "A"),
        (80, "B"),
        (70, "C"),
    ]

    for minimum_score, grade in grade_rules:
        if score >= minimum_score:
            return grade

    return "F"
\`\`\`

코드 구조는 바뀌었지만 기대하는 결과는 같습니다. 테스트를 실행해서 모두 통과하면, 리팩터링 후에도 기능이 유지된다는 확신을 가질 수 있습니다.

테스트가 없는 상태에서 코드를 고치면 불안합니다.

\`\`\`text
“이거 바꿔도 괜찮을까?”
\`\`\`

테스트가 있으면 확인할 수 있습니다.

\`\`\`text
“바꾼 뒤 테스트가 통과하는지 보자.”
\`\`\`

이 차이가 실무에서 매우 중요합니다.

---

### 13.4.3 회귀 버그와 테스트

회귀 버그란 예전에 잘 동작하던 기능이 코드를 수정한 뒤 다시 망가지는 문제를 말합니다.

예를 들어 무료 배송 기준이 50,000원이라고 해봅시다.

\`\`\`python
def calculate_shipping_fee(total_price):
    if total_price >= 50000:
        return 0
    return 3000
\`\`\`

나중에 VIP 회원은 항상 무료 배송이라는 조건이 추가되었습니다.

\`\`\`python
def calculate_shipping_fee(total_price, is_vip):
    if is_vip:
        return 0

    if total_price > 50000:
        return 0

    return 3000
\`\`\`

겉으로는 VIP 조건이 잘 추가된 것처럼 보입니다. 하지만 기존 조건이 \`>=\`에서 \`>\`로 바뀌었습니다. 이제 정확히 50,000원인 일반 회원은 배송비 3,000원을 내게 됩니다. 기존 기능이 망가진 것입니다.

이런 문제를 막기 위해 테스트를 작성합니다.

\`\`\`python
def test_shipping_fee_for_normal_user():
    assert calculate_shipping_fee(49999, False) == 3000
    assert calculate_shipping_fee(50000, False) == 0
    assert calculate_shipping_fee(50001, False) == 0


def test_shipping_fee_for_vip_user():
    assert calculate_shipping_fee(1000, True) == 0
\`\`\`

테스트가 있으면 기존 조건이 실수로 바뀌었을 때 바로 알 수 있습니다.

---

### 13.4.4 좋은 테스트의 기준

테스트도 코드입니다. 따라서 테스트 코드도 읽기 좋아야 합니다.

좋은 테스트는 다음과 같은 특징을 가집니다.

\`\`\`text
- 무엇을 검증하는지 분명하다.
- 테스트 데이터가 너무 크지 않다.
- 하나의 테스트에서 너무 많은 것을 확인하지 않는다.
- 예상 결과가 명확하다.
- 실패했을 때 원인을 추측하기 쉽다.
- 실제 코드의 구현 방식보다 결과를 검증한다.
\`\`\`

예를 들어 다음 테스트는 조금 모호합니다.

\`\`\`python
def test_order():
    orders = [
        {"price": 10000, "quantity": 2, "status": "paid"},
        {"price": 5000, "quantity": 1, "status": "cancelled"},
        {"price": 7000, "quantity": 3, "status": "paid"},
    ]
    assert process(orders) == 41000
\`\`\`

\`process()\`가 무엇을 하는지, 41,000이 어떤 계산 결과인지 바로 알기 어렵습니다.

조금 더 명확하게 바꿔보겠습니다.

\`\`\`python
def test_calculate_paid_order_total_excludes_cancelled_orders():
    orders = [
        {"price": 10000, "quantity": 2, "status": "paid"},
        {"price": 5000, "quantity": 1, "status": "cancelled"},
        {"price": 7000, "quantity": 3, "status": "paid"},
    ]

    assert calculate_paid_order_total(orders) == 41000
\`\`\`

이제 테스트 이름만 봐도 취소된 주문은 제외하고 결제 완료 주문만 합산한다는 것을 알 수 있습니다.

---

### 13.4.5 테스트가 너무 복잡해지는 경우

테스트가 너무 복잡하다면 실제 코드가 너무 복잡하다는 신호일 수 있습니다.

예를 들어 테스트 하나를 작성하기 위해 다음과 같은 준비가 필요하다면 어떨까요?

\`\`\`text
- 파일을 만들어야 한다.
- 설정 파일을 읽어야 한다.
- 외부 API를 호출해야 한다.
- 현재 날짜를 맞춰야 한다.
- 여러 객체를 복잡하게 생성해야 한다.
\`\`\`

이런 경우에는 함수의 역할을 나누는 것이 좋습니다.

예를 들어 API에서 데이터를 가져오고, 데이터를 정리하고, 결과를 저장하는 코드가 하나의 함수에 모두 들어 있다면 테스트하기 어렵습니다.

\`\`\`python
def create_sales_report():
    data = request_sales_data()
    cleaned_data = clean_sales_data(data)
    result = calculate_sales_summary(cleaned_data)
    save_report(result)
\`\`\`

이 함수 전체를 테스트하기는 어렵습니다. 하지만 내부 기능을 나누면 각각 테스트할 수 있습니다.

\`\`\`python
def clean_sales_data(data):
    cleaned_data = []

    for item in data:
        if item["amount"] > 0:
            cleaned_data.append(item)

    return cleaned_data


def calculate_sales_summary(data):
    total_amount = 0

    for item in data:
        total_amount += item["amount"]

    return total_amount
\`\`\`

이제 데이터 정리와 합계 계산은 외부 API나 파일 없이 테스트할 수 있습니다.

테스트하기 쉬운 구조는 유지보수하기 쉬운 구조와 연결됩니다.

---

### 13.4.6 테스트와 예외 처리의 관계

6장에서 예외 처리를 배웠습니다. 예외 처리는 프로그램이 예상 가능한 오류 상황을 만났을 때 적절하게 대응하는 방법입니다.

테스트는 예외 처리가 의도대로 동작하는지 확인할 수 있습니다.

예를 들어 가격 문자열을 정수로 변환하는 함수를 보겠습니다.

\`\`\`python
def parse_price(price_text):
    cleaned_text = price_text.replace(",", "")

    if not cleaned_text.isdigit():
        raise ValueError("가격은 숫자여야 합니다.")

    return int(cleaned_text)
\`\`\`

정상 케이스 테스트는 다음과 같습니다.

\`\`\`python
def test_parse_price_normal():
    assert parse_price("10000") == 10000
    assert parse_price("10,000") == 10000
\`\`\`

예외 케이스 테스트는 다음과 같습니다.

\`\`\`python
import pytest


def test_parse_price_invalid_text():
    with pytest.raises(ValueError):
        parse_price("만원")
\`\`\`

테스트를 통해 정상 변환과 실패 처리를 모두 확인할 수 있습니다.

예외 처리는 코드를 안전하게 만들고, 테스트는 그 안전장치가 제대로 동작하는지 확인합니다.

---

### 13.4.7 테스트와 로그의 관계

12장에서 로그를 배웠습니다. 로그는 프로그램 실행 기록을 남기는 도구입니다. 테스트와 로그는 서로 역할이 다릅니다.

\`\`\`text
테스트: 코드가 맞게 동작하는지 확인한다.
로그: 코드가 어떻게 실행되었는지 기록한다.
\`\`\`

테스트가 있다고 해서 로그가 필요 없는 것은 아닙니다. 로그가 있다고 해서 테스트가 필요 없는 것도 아닙니다.

예를 들어 파일 처리 프로그램을 생각해봅시다.

\`\`\`text
- 테스트는 파일명 변환 함수가 올바르게 동작하는지 확인한다.
- 로그는 실제 실행 중 어떤 파일을 처리했고 어떤 파일에서 실패했는지 기록한다.
\`\`\`

테스트는 개발 단계에서 코드의 신뢰성을 높이고, 로그는 실행 단계에서 문제를 추적하는 데 도움을 줍니다.

---

### 13.4.8 실무 마무리 점검 목록

코드를 작성한 뒤에는 다음 항목을 점검해보면 좋습니다.

\`\`\`text
- 주요 함수에 테스트가 있는가?
- 정상 케이스를 테스트했는가?
- 경계값을 테스트했는가?
- 잘못된 입력값을 테스트했는가?
- 예외가 발생해야 하는 상황을 테스트했는가?
- 함수 이름과 테스트 이름이 의미 있는가?
- 테스트 데이터가 너무 복잡하지 않은가?
- 리팩터링 후 테스트가 통과하는가?
- 로그가 필요한 작업에는 로그를 남겼는가?
- 설정값이나 파일 경로를 코드에 직접 박아두지 않았는가?
\`\`\`

처음부터 완벽한 테스트를 작성할 필요는 없습니다. 가장 중요한 함수부터 테스트를 작성하는 습관을 들이면 됩니다.

---

## 13.5 작은 종합 예제: 주문 금액 계산 테스트

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