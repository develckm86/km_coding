var e=`<!-- 원본: python_basic_chapter_8_book.md / 세부 장: 8-3 -->

# 8.3 직접 모듈 만들기

표준 라이브러리를 가져와 사용하는 것도 중요하지만, 실무에서 더 중요한 것은 **내가 만든 코드를 모듈로 나누는 것**입니다.

이번 절에서는 직접 모듈을 만들고 다른 파일에서 가져와 사용하는 방법을 배웁니다.

---

### 8.3.1 하나의 파일에 모든 코드를 작성했을 때의 문제

처음에는 다음처럼 모든 코드를 \`main.py\` 하나에 작성할 수 있습니다.

\`\`\`python
# main.py

def calculate_total_price(price, quantity):
    return price * quantity


def calculate_discount(total_price):
    if total_price >= 100000:
        return total_price * 0.1
    return 0


def format_price(price):
    return f"{price:,.0f}원"


price = 30000
quantity = 4

total_price = calculate_total_price(price, quantity)
discount = calculate_discount(total_price)
final_price = total_price - discount

print("총 금액:", format_price(total_price))
print("할인 금액:", format_price(discount))
print("최종 금액:", format_price(final_price))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
총 금액: 120,000원
할인 금액: 12,000원
최종 금액: 108,000원
\`\`\`

코드가 짧을 때는 괜찮습니다. 하지만 계산 함수가 늘어나고, 출력 함수가 늘어나고, 주문 데이터 처리 함수가 늘어나면 \`main.py\`가 점점 길어집니다.

이때 기능별로 파일을 나누는 것이 좋습니다.

---

### 8.3.2 계산 기능을 모듈로 분리하기

먼저 계산 관련 함수를 \`calculator.py\`로 분리해봅시다.

\`\`\`python
# calculator.py

def calculate_total_price(price, quantity):
    return price * quantity


def calculate_discount(total_price):
    if total_price >= 100000:
        return total_price * 0.1
    return 0
\`\`\`

그리고 \`main.py\`에서 이 모듈을 가져와 사용합니다.

\`\`\`python
# main.py

import calculator

price = 30000
quantity = 4

total_price = calculator.calculate_total_price(price, quantity)
discount = calculator.calculate_discount(total_price)
final_price = total_price - discount

print("총 금액:", total_price)
print("할인 금액:", discount)
print("최종 금액:", final_price)
\`\`\`

이제 계산 함수는 \`calculator.py\`에 있고, 프로그램 실행 흐름은 \`main.py\`에 있습니다.

역할이 조금 더 분명해졌습니다.

---

### 8.3.3 특정 함수만 가져오기

\`calculator\` 모듈에서 필요한 함수만 가져올 수도 있습니다.

\`\`\`python
# main.py

from calculator import calculate_total_price, calculate_discount

price = 30000
quantity = 4

total_price = calculate_total_price(price, quantity)
discount = calculate_discount(total_price)
final_price = total_price - discount

print("총 금액:", total_price)
print("할인 금액:", discount)
print("최종 금액:", final_price)
\`\`\`

이 방식은 함수 이름만 바로 사용할 수 있어서 코드가 짧아집니다.

하지만 함수가 어느 모듈에서 왔는지 잘 보이지 않을 수 있습니다. 그래서 팀 코드에서는 다음처럼 모듈명을 붙이는 방식을 선호하는 경우도 많습니다.

\`\`\`python
import calculator

calculator.calculate_total_price(30000, 4)
\`\`\`

정답은 하나가 아닙니다. 코드의 크기, 팀 규칙, 가독성을 고려해 선택하면 됩니다.

---

### 8.3.4 출력 기능을 모듈로 분리하기

이번에는 가격 출력 형식을 만드는 함수를 별도 모듈로 분리해봅시다.

\`\`\`python
# formatter.py

def format_price(price):
    return f"{price:,.0f}원"
\`\`\`

이제 \`main.py\`에서 두 모듈을 사용합니다.

\`\`\`python
# main.py

import calculator
import formatter

price = 30000
quantity = 4

total_price = calculator.calculate_total_price(price, quantity)
discount = calculator.calculate_discount(total_price)
final_price = total_price - discount

print("총 금액:", formatter.format_price(total_price))
print("할인 금액:", formatter.format_price(discount))
print("최종 금액:", formatter.format_price(final_price))
\`\`\`

파일 구조는 다음과 같습니다.

\`\`\`text
project/
  main.py
  calculator.py
  formatter.py
\`\`\`

이렇게 나누면 각 파일의 역할이 분명해집니다.

\`\`\`text
main.py       프로그램 실행 흐름
calculator.py 계산 관련 함수
formatter.py  출력 형식 관련 함수
\`\`\`

---

### 8.3.5 클래스도 모듈로 분리할 수 있다

모듈에는 함수뿐만 아니라 클래스도 작성할 수 있습니다.

예를 들어 상품 클래스를 \`product.py\`에 작성할 수 있습니다.

\`\`\`python
# product.py

class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock

    def decrease_stock(self, quantity):
        if quantity > self.stock:
            raise ValueError("재고가 부족합니다.")
        self.stock -= quantity

    def get_total_price(self, quantity):
        return self.price * quantity
\`\`\`

그리고 \`main.py\`에서 가져와 사용합니다.

\`\`\`python
# main.py

from product import Product

keyboard = Product("키보드", 30000, 10)
keyboard.decrease_stock(2)

print(keyboard.name)
print(keyboard.stock)
print(keyboard.get_total_price(2))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
키보드
8
60000
\`\`\`

객체지향 코드에서는 클래스를 파일별로 나누는 경우가 많습니다. 특히 클래스가 길어지면 하나의 파일에 모든 클래스를 넣기보다 역할별 파일로 나누는 것이 좋습니다.

---

### 8.3.6 설정값을 모듈로 분리하기

실무 코드에는 자주 바뀌는 값이 있습니다.

예를 들어 파일 경로, 할인 기준 금액, 기본 배송비 같은 값입니다.

이런 값을 코드 곳곳에 직접 쓰면 수정하기 어렵습니다.

\`\`\`python
if total_price >= 100000:
    discount = total_price * 0.1
\`\`\`

\`100000\`과 \`0.1\`이 여러 파일에 흩어져 있으면, 정책이 바뀔 때 모두 찾아서 수정해야 합니다.

그래서 설정값을 별도 파일로 분리할 수 있습니다.

\`\`\`python
# config.py

FREE_SHIPPING_MIN_PRICE = 50000
DISCOUNT_MIN_PRICE = 100000
DISCOUNT_RATE = 0.1
\`\`\`

그리고 다른 파일에서 가져와 사용합니다.

\`\`\`python
# calculator.py

import config


def calculate_discount(total_price):
    if total_price >= config.DISCOUNT_MIN_PRICE:
        return total_price * config.DISCOUNT_RATE
    return 0
\`\`\`

설정값을 분리하면 변경에 강한 코드가 됩니다.

다만 비밀번호, API 키처럼 민감한 정보는 코드 파일에 직접 쓰지 않는 것이 좋습니다. 이런 내용은 설정값 관리 장에서 더 자세히 다룹니다.

---

### 8.3.7 \`if __name__ == "__main__"\` 이해하기

모듈을 만들다 보면 다음 코드를 자주 보게 됩니다.

\`\`\`python
if __name__ == "__main__":
    main()
\`\`\`

처음 보면 어렵게 느껴질 수 있지만, 의미는 단순합니다.

이 코드는 **이 파일이 직접 실행될 때만 특정 코드를 실행하라**는 뜻입니다.

예를 들어 다음 파일을 보겠습니다.

\`\`\`python
# greeting.py

def say_hello(name):
    return f"{name}님, 안녕하세요."


print(say_hello("민수"))
\`\`\`

이 파일을 직접 실행하면 다음 결과가 나옵니다.

\`\`\`text
민수님, 안녕하세요.
\`\`\`

그런데 다른 파일에서 \`greeting\` 모듈을 import해도 \`print()\`가 실행됩니다.

\`\`\`python
# main.py

import greeting

print(greeting.say_hello("지영"))
\`\`\`

이 경우 의도하지 않게 \`greeting.py\`의 출력 코드까지 실행될 수 있습니다.

이 문제를 막기 위해 다음처럼 작성합니다.

\`\`\`python
# greeting.py

def say_hello(name):
    return f"{name}님, 안녕하세요."


if __name__ == "__main__":
    print(say_hello("민수"))
\`\`\`

이제 \`greeting.py\`를 직접 실행할 때만 아래 코드가 실행됩니다.

\`\`\`python
print(say_hello("민수"))
\`\`\`

다른 파일에서 import할 때는 함수만 가져오고, 테스트용 출력 코드는 실행되지 않습니다.

---

### 8.3.8 \`main()\` 함수 만들기

실무 코드에서는 프로그램 실행 흐름을 \`main()\` 함수에 넣는 경우가 많습니다.

\`\`\`python
# main.py

def main():
    price = 30000
    quantity = 4
    total_price = price * quantity
    print("총 금액:", total_price)


if __name__ == "__main__":
    main()
\`\`\`

이렇게 작성하면 프로그램의 시작 지점을 명확하게 만들 수 있습니다.

파일을 읽는 사람은 다음 부분을 보고 프로그램이 어디서 시작되는지 알 수 있습니다.

\`\`\`python
if __name__ == "__main__":
    main()
\`\`\`

\`main()\` 함수는 프로그램 실행 흐름을 담고, 실제 기능은 다른 함수나 모듈로 나누는 방식이 좋습니다.

\`\`\`python
# main.py

import calculator
import formatter


def main():
    price = 30000
    quantity = 4

    total_price = calculator.calculate_total_price(price, quantity)
    discount = calculator.calculate_discount(total_price)
    final_price = total_price - discount

    print("최종 금액:", formatter.format_price(final_price))


if __name__ == "__main__":
    main()
\`\`\`

이 구조는 이후 큰 프로그램을 만들 때도 자주 사용됩니다.

---

### 8.3.9 모듈 이름을 지을 때 주의할 점

모듈 이름은 파일 이름입니다. 그래서 모듈 이름을 잘 지어야 합니다.

좋은 모듈 이름의 기준은 다음과 같습니다.

- 역할이 드러나는 이름을 사용한다.
- 너무 길지 않게 작성한다.
- 파이썬 표준 라이브러리 이름과 겹치지 않게 한다.
- 공백이나 특수문자를 사용하지 않는다.
- 보통 소문자와 언더스코어를 사용한다.

좋은 예시는 다음과 같습니다.

\`\`\`text
calculator.py
file_utils.py
date_utils.py
order_service.py
report_generator.py
\`\`\`

피하는 것이 좋은 예시는 다음과 같습니다.

\`\`\`text
math.py
random.py
test file.py
my-module.py
1module.py
\`\`\`

특히 \`math.py\`, \`random.py\`, \`json.py\`처럼 표준 라이브러리와 같은 이름을 사용하면 import할 때 문제가 생길 수 있습니다.

예를 들어 현재 폴더에 \`random.py\`라는 파일을 만들면, 파이썬이 표준 라이브러리 \`random\` 대신 내 파일을 먼저 찾을 수 있습니다. 그러면 예상치 못한 에러가 발생할 수 있습니다.

---

### 8.3.10 순환 import 기초

초보 단계에서 자주 만나는 문제 중 하나가 순환 import입니다.

순환 import는 두 모듈이 서로를 import하는 상황입니다.

\`\`\`python
# a.py
import b
\`\`\`

\`\`\`python
# b.py
import a
\`\`\`

이렇게 되면 파이썬이 \`a.py\`를 읽다가 \`b.py\`를 읽고, 다시 \`a.py\`를 읽으려는 복잡한 상황이 생깁니다. 프로그램이 제대로 실행되지 않을 수 있습니다.

순환 import를 피하려면 다음 원칙을 기억하면 좋습니다.

- 공통으로 쓰는 함수는 별도 모듈로 분리한다.
- 서로 너무 의존하는 구조를 피한다.
- 실행 흐름은 \`main.py\`에 두고, 기능 모듈은 서로 독립적으로 만든다.
- 모듈이 다른 모듈을 지나치게 많이 import하고 있다면 구조를 다시 살핀다.

예를 들어 \`order.py\`와 \`customer.py\`가 서로를 import해야 한다면, 공통 타입이나 유틸리티를 별도 파일로 분리하는 방법을 생각해볼 수 있습니다.

---
`;export{e as default};