var e=`<!-- 원본: python_basic_chapter_7_book.md / 세부 장: 7-12 -->

# 7.12 특수 메서드

### 7.12.1 특수 메서드란 무엇인가

파이썬에는 앞뒤에 밑줄 두 개가 붙은 메서드가 있습니다.

\`\`\`python
__init__
__str__
__repr__
__len__
__eq__
\`\`\`

이런 메서드를 **특수 메서드**라고 부릅니다. 특수 메서드는 파이썬의 특정 문법이나 내장 함수와 연결됩니다.

예를 들어 \`len(obj)\`를 호출했을 때 내부적으로는 \`obj.__len__()\`이 사용될 수 있습니다. \`print(obj)\`를 호출했을 때는 내부적으로 \`obj.__str__()\`이 사용될 수 있습니다.

특수 메서드를 사용하면 직접 만든 객체도 파이썬의 기본 자료형처럼 자연스럽게 사용할 수 있습니다.

---

### 7.12.2 \`__str__\`

\`__str__\`은 객체를 사람이 읽기 좋은 문자열로 표현할 때 사용합니다.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __str__(self):
        return f"{self.name} ({self.price}원)"


product = Product("키보드", 30000)

print(product)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
키보드 (30000원)
\`\`\`

\`print(product)\`를 실행하면 내부적으로 \`product.__str__()\`이 호출됩니다.

---

### 7.12.3 \`__repr__\`

\`__repr__\`은 개발자가 객체를 확인할 때 도움이 되는 문자열 표현을 제공합니다.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __repr__(self):
        return f"Product(name={self.name!r}, price={self.price!r})"


product = Product("키보드", 30000)

print(repr(product))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
Product(name='키보드', price=30000)
\`\`\`

일반적으로 \`__str__\`은 사용자에게 보여주기 좋은 표현, \`__repr__\`은 개발자가 디버깅할 때 보기 좋은 표현이라고 생각하면 됩니다.

---

### 7.12.4 \`__len__\`

\`__len__\`을 정의하면 객체에 \`len()\`을 사용할 수 있습니다.

\`\`\`python
class Cart:
    def __init__(self):
        self.items = []

    def add_item(self, item):
        self.items.append(item)

    def __len__(self):
        return len(self.items)


cart = Cart()
cart.add_item("키보드")
cart.add_item("마우스")

print(len(cart))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
2
\`\`\`

장바구니 객체의 길이를 장바구니에 담긴 상품 수로 정의한 것입니다.

---

### 7.12.5 \`__eq__\`

\`__eq__\`는 객체끼리 \`==\`로 비교할 때 사용됩니다.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __eq__(self, other):
        return self.name == other.name and self.price == other.price


product1 = Product("키보드", 30000)
product2 = Product("키보드", 30000)

print(product1 == product2)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
\`\`\`

\`__eq__\`를 정의하지 않으면 두 객체는 값이 같아 보여도 서로 다른 객체로 판단될 수 있습니다. 객체 비교 기준을 직접 정하고 싶을 때 \`__eq__\`를 사용할 수 있습니다.

---

### 7.12.6 \`__lt__\`

\`__lt__\`는 \`<\` 연산과 연결됩니다. 가격 기준으로 상품을 비교하고 싶다면 다음처럼 작성할 수 있습니다.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def __lt__(self, other):
        return self.price < other.price


keyboard = Product("키보드", 30000)
mouse = Product("마우스", 15000)

print(mouse < keyboard)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
\`\`\`

\`mouse.price\`가 \`keyboard.price\`보다 작기 때문에 \`True\`가 출력됩니다.

---

### 7.12.7 특수 메서드 사용 시 주의점

특수 메서드는 객체를 자연스럽게 사용할 수 있게 해주지만, 아무렇게나 정의하면 코드를 읽는 사람이 혼란스러울 수 있습니다.

예를 들어 \`len(cart)\`가 장바구니 상품 개수를 의미하는 것은 자연스럽습니다. 하지만 \`len(customer)\`가 고객의 나이를 의미한다면 다소 어색합니다.

특수 메서드는 파이썬 문법이 기대하는 의미와 잘 맞을 때 사용하는 것이 좋습니다.

---
`;export{e as default};