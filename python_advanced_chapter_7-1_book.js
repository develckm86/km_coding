var e=`<!-- 원본: python_advanced_chapter_7_book.md / 세부 장: 7-1 -->

# 7.1 객체지향 복습과 심화 방향

객체지향 프로그래밍을 공부할 때 가장 먼저 기억해야 할 것은 **객체는 데이터와 동작을 함께 가지는 단위**라는 점입니다.

예를 들어 상품을 표현한다고 해보겠습니다.

\`\`\`python
product_name = "키보드"
product_price = 30000
product_stock = 10
\`\`\`

이 방식은 간단한 데이터에는 충분합니다. 하지만 상품이 많아지고, 상품마다 가격 변경, 재고 차감, 판매 가능 여부 확인 같은 기능이 필요해지면 데이터와 기능이 흩어지기 쉽습니다.

이럴 때 클래스를 사용할 수 있습니다.

\`\`\`python
class Product:
    def __init__(self, name: str, price: int, stock: int) -> None:
        self.name = name
        self.price = price
        self.stock = stock

    def is_available(self) -> bool:
        return self.stock > 0

    def decrease_stock(self, quantity: int) -> None:
        if quantity <= 0:
            raise ValueError("수량은 1 이상이어야 합니다.")
        if quantity > self.stock:
            raise ValueError("재고가 부족합니다.")

        self.stock -= quantity
\`\`\`

이제 상품이라는 데이터와 상품이 할 수 있는 동작이 하나의 클래스 안에 묶였습니다.

\`\`\`python
keyboard = Product("키보드", 30000, 10)

print(keyboard.is_available())
keyboard.decrease_stock(2)
print(keyboard.stock)
\`\`\`

객체지향은 이렇게 관련 있는 데이터와 동작을 함께 관리하는 방식입니다.

---

## 7.1.1 기초 객체지향과 고급 객체지향의 차이

기초 객체지향에서는 다음과 같은 질문을 주로 다룹니다.

\`\`\`text
클래스는 어떻게 만드는가?
객체는 어떻게 생성하는가?
메서드는 어떻게 정의하는가?
상속은 어떻게 사용하는가?
\`\`\`

고급 객체지향에서는 질문이 달라집니다.

\`\`\`text
이 기능을 클래스로 만들 필요가 있는가?
이 클래스는 너무 많은 일을 하고 있지 않은가?
상속을 사용하는 것이 맞는가, 조합을 사용하는 것이 맞는가?
변경이 생겼을 때 어떤 코드가 영향을 받는가?
테스트하기 쉬운 구조인가?
다른 데이터 소스가 추가되어도 코드를 크게 바꾸지 않을 수 있는가?
\`\`\`

문법 중심에서 설계 중심으로 이동하는 것이 고급 객체지향의 핵심입니다.

---

## 7.1.2 객체지향을 사용하는 이유

객체지향을 사용하는 이유는 단순히 코드를 멋있게 보이게 하기 위해서가 아닙니다. 실무에서는 코드가 계속 바뀝니다. 새로운 요구사항이 추가되고, 데이터 형식이 바뀌고, 처리 방식이 바뀌고, 예외 상황이 늘어납니다.

객체지향은 이런 변화에 대응하기 위한 구조를 만드는 데 도움이 됩니다.

대표적인 장점은 다음과 같습니다.

- 관련 데이터와 기능을 한곳에 모을 수 있다.
- 역할별로 코드를 분리할 수 있다.
- 중복 코드를 줄일 수 있다.
- 새로운 기능을 추가하기 쉬운 구조를 만들 수 있다.
- 테스트하기 쉬운 단위로 코드를 나눌 수 있다.
- 프로그램의 전체 구조를 이해하기 쉬워진다.

하지만 객체지향이 항상 정답은 아닙니다. 간단한 계산 하나를 위해 클래스를 만드는 것은 오히려 코드를 복잡하게 만들 수 있습니다.

\`\`\`python
def calculate_total(price: int, quantity: int) -> int:
    return price * quantity
\`\`\`

이 정도 기능은 함수 하나로 충분합니다.

객체지향은 데이터와 동작이 함께 관리되어야 하거나, 상태를 가진 객체가 여러 기능을 수행해야 하거나, 여러 구현을 같은 방식으로 다루어야 할 때 특히 유용합니다.

---

## 7.1.3 좋은 객체지향 코드의 기준

좋은 객체지향 코드는 다음과 같은 특징을 가집니다.

첫째, 클래스의 책임이 명확합니다.

\`\`\`text
Customer는 고객 정보를 책임진다.
Product는 상품 정보를 책임진다.
Order는 주문 정보를 책임진다.
ReportWriter는 보고서 저장을 책임진다.
\`\`\`

둘째, 클래스가 너무 많은 일을 하지 않습니다.

나쁜 예를 보겠습니다.

\`\`\`python
class OrderManager:
    def read_excel(self):
        pass

    def validate_order(self):
        pass

    def calculate_total(self):
        pass

    def save_database(self):
        pass

    def send_email(self):
        pass
\`\`\`

\`OrderManager\`라는 이름은 주문을 관리하는 클래스처럼 보이지만, 실제로는 엑셀 읽기, 주문 검증, 금액 계산, DB 저장, 이메일 전송까지 모두 하고 있습니다. 이런 클래스는 시간이 지날수록 수정하기 어려워집니다.

더 나은 구조는 역할을 나누는 것입니다.

\`\`\`python
class ExcelOrderReader:
    pass

class OrderValidator:
    pass

class OrderCalculator:
    pass

class OrderRepository:
    pass

class EmailSender:
    pass
\`\`\`

이렇게 나누면 각 클래스가 담당하는 일이 분명해집니다.

셋째, 변경에 강합니다. 엑셀 대신 CSV에서 주문을 읽게 되어도 주문 계산 클래스는 바뀌지 않아야 합니다. 이메일 대신 슬랙으로 알림을 보내도 주문 검증 클래스는 바뀌지 않아야 합니다.

객체지향 설계는 결국 **변경의 영향을 줄이는 구조를 만드는 일**입니다.

---
`;export{e as default};