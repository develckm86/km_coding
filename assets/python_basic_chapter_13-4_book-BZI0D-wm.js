var e=`<!-- 원본: python_basic_chapter_13_book.md / 세부 장: 13-4 -->

# 13.4 코드 검증과 리팩터링

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
`;export{e as default};