var e=`<!-- 원본: python_advanced_chapter_1_book.md / 세부 장: 1-6 -->

# 1.6 좋은 파이썬 코드의 기준

고급 파이썬을 배우기 전에 좋은 코드의 기준을 먼저 정리해야 한다. 좋은 코드의 기준을 알아야 왜 함수, 클래스, 타입 힌트, 테스트, 로깅을 배우는지 이해할 수 있다.

좋은 코드는 보통 다음과 같은 특징을 가진다.

---

### 1.6.1 읽기 쉬운 코드

코드는 컴퓨터만 읽는 것이 아니다. 사람도 읽는다. 실무에서는 미래의 나 자신도 코드를 다시 읽어야 한다.

읽기 쉬운 코드는 다음과 같은 특징이 있다.

\`\`\`text
변수와 함수 이름이 의미를 가진다.
한 함수가 너무 많은 일을 하지 않는다.
복잡한 조건문을 적절히 나눈다.
불필요하게 똑똑해 보이는 코드를 피한다.
주석 없이도 흐름이 어느 정도 읽힌다.
\`\`\`

예를 들어 다음 코드는 실행은 되지만 의미를 파악하기 어렵다.

\`\`\`python
def f(x):
    r = []
    for i in x:
        if i["s"] == "paid" and i["a"]:
            r.append(int(i["a"]))
    return sum(r)
\`\`\`

아래 코드는 같은 일을 하지만 조금 더 읽기 쉽다.

\`\`\`python
def calculate_paid_order_total(orders):
    paid_amounts = []

    for order in orders:
        if order["status"] == "paid" and order["amount"]:
            paid_amounts.append(int(order["amount"]))

    return sum(paid_amounts)
\`\`\`

좋은 코드는 짧은 코드가 아니라, **의도를 이해하기 쉬운 코드**다.

---

### 1.6.2 수정하기 쉬운 코드

실무 코드는 한 번 작성하고 끝나지 않는다. 요구사항은 계속 바뀐다.

예를 들어 처음에는 결제 완료 주문만 합산하면 되었지만, 나중에 다음 요구사항이 추가될 수 있다.

\`\`\`text
취소 주문은 제외한다.
환불 주문은 별도로 계산한다.
금액이 비어 있으면 0으로 처리한다.
특정 날짜 이후 주문만 계산한다.
VIP 고객 주문만 따로 계산한다.
\`\`\`

수정하기 쉬운 코드는 변경이 생겼을 때 수정할 위치가 분명하다. 반대로 모든 로직이 한 곳에 섞여 있으면 작은 변경도 어렵다.

수정하기 쉬운 코드를 만들려면 역할을 나누어야 한다.

\`\`\`python
def is_target_order(order):
    return order["status"] == "paid"


def get_order_amount(order):
    amount = order.get("amount")
    if not amount:
        return 0
    return int(amount)


def calculate_total(orders):
    total = 0

    for order in orders:
        if is_target_order(order):
            total += get_order_amount(order)

    return total
\`\`\`

이 구조에서는 주문 조건이 바뀌면 \`is_target_order()\`를 수정하면 되고, 금액 변환 방식이 바뀌면 \`get_order_amount()\`를 수정하면 된다.

---

### 1.6.3 재사용 가능한 코드

재사용 가능한 코드는 다른 곳에서도 다시 사용할 수 있는 코드다.

예를 들어 파일 경로에서 확장자를 확인하는 코드를 여러 곳에서 사용한다고 하자.

\`\`\`python
filename = "report.xlsx"

if filename.endswith(".xlsx"):
    print("엑셀 파일입니다.")
\`\`\`

이 로직이 여러 파일에 반복되면 나중에 수정하기 어렵다. 함수로 분리하면 재사용하기 쉬워진다.

\`\`\`python
def is_excel_file(filename: str) -> bool:
    return filename.endswith(".xlsx") or filename.endswith(".xls")
\`\`\`

이제 다른 곳에서도 같은 함수를 사용할 수 있다.

\`\`\`python
if is_excel_file("report.xlsx"):
    print("엑셀 파일입니다.")
\`\`\`

재사용 가능한 코드를 작성하려면 특정 상황에 너무 강하게 묶인 코드를 피해야 한다.

---

### 1.6.4 테스트 가능한 코드

테스트 가능한 코드는 입력과 출력이 분명하다.

아래 함수는 테스트하기 쉽다.

\`\`\`python
def calculate_discount_price(price: int, discount_rate: float) -> int:
    return int(price * (1 - discount_rate))
\`\`\`

입력값을 주면 결과가 반환된다.

\`\`\`python
result = calculate_discount_price(10000, 0.1)
print(result)  # 9000
\`\`\`

반면 아래 코드는 테스트하기 어렵다.

\`\`\`python
def calculate_discount_price():
    price = int(input("가격을 입력하세요: "))
    discount_rate = float(input("할인율을 입력하세요: "))
    print(int(price * (1 - discount_rate)))
\`\`\`

이 함수는 내부에서 직접 입력을 받고 직접 출력한다. 사람이 값을 입력해야 하므로 자동 테스트가 어렵다.

고급 파이썬에서는 테스트 가능한 구조를 중요하게 다룬다. 데이터분석에서도 전처리 함수가 맞게 동작하는지 검증해야 하기 때문이다.

---

### 1.6.5 실패에 강한 코드

실무 환경에서는 항상 정상 데이터만 들어오지 않는다.

\`\`\`text
파일이 없을 수 있다.
API 요청이 실패할 수 있다.
숫자여야 할 값이 문자열일 수 있다.
필수 컬럼이 누락될 수 있다.
날짜 형식이 잘못될 수 있다.
네트워크가 느릴 수 있다.
\`\`\`

실패에 강한 코드는 이런 상황을 예상하고 처리한다.

예를 들어 문자열을 정수로 변환할 때 실패할 가능성을 고려할 수 있다.

\`\`\`python
def safe_int(value: str, default: int = 0) -> int:
    try:
        return int(value)
    except ValueError:
        return default
\`\`\`

이 함수는 숫자로 바꿀 수 없는 값이 들어와도 프로그램 전체가 멈추지 않는다.

\`\`\`python
print(safe_int("100"))     # 100
print(safe_int("abc"))     # 0
\`\`\`

물론 모든 예외를 무조건 숨기면 안 된다. 중요한 것은 실패 가능성을 알고, 적절한 위치에서 처리하는 것이다.

---

### 1.6.6 성능을 고려한 코드

처리할 데이터가 작을 때는 대부분의 코드가 빠르게 실행된다. 하지만 데이터가 커지면 문제가 달라진다.

예를 들어 10개의 데이터에서는 어떤 방식이든 큰 차이가 없다. 하지만 100만 개의 데이터를 처리한다면 자료구조 선택, 반복 방식, 메모리 사용량이 중요해진다.

아래 코드는 리스트에서 값을 찾는다.

\`\`\`python
users = ["kim", "lee", "park", "choi"]

if "park" in users:
    print("존재합니다.")
\`\`\`

데이터가 아주 많고 포함 여부를 자주 확인해야 한다면 집합이 더 적합할 수 있다.

\`\`\`python
users = {"kim", "lee", "park", "choi"}

if "park" in users:
    print("존재합니다.")
\`\`\`

고급 과정에서는 성능 최적화를 무조건 많이 하는 것이 아니라, **언제 성능을 고려해야 하는지**와 **어디를 측정해야 하는지**를 배운다.

---
`;export{e as default};