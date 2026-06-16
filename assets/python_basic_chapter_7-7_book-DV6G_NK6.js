var e=`<!-- 원본: python_basic_chapter_7_book.md / 세부 장: 7-7 -->

# 7.7 캡슐화와 접근 제어

### 7.7.1 캡슐화란 무엇인가

캡슐화는 객체 내부의 데이터를 외부에서 함부로 바꾸지 못하게 하고, 정해진 방법을 통해서만 다루게 하는 방식입니다.

예를 들어 상품 가격은 음수가 되면 안 됩니다.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price


product = Product("키보드", 30000)
product.price = -10000

print(product.price)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
-10000
\`\`\`

상품 가격이 음수가 되었지만 파이썬은 막지 않습니다. 이런 상황을 방지하려면 가격을 직접 수정하는 대신 메서드나 프로퍼티를 통해 검증해야 합니다.

---

### 7.7.2 \`_변수명\` 관례

파이썬에서는 변수명 앞에 밑줄 하나를 붙여 내부용 변수라는 뜻을 표현합니다.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self._price = price
\`\`\`

\`_price\`는 “클래스 내부에서 사용하는 값이므로 외부에서 직접 건드리지 않는 것이 좋다”는 의미입니다.

하지만 이것은 강제 규칙이 아니라 관례입니다. 외부에서 접근 자체가 불가능한 것은 아닙니다.

\`\`\`python
product = Product("키보드", 30000)
print(product._price)
\`\`\`

이 코드는 실행됩니다. 그러나 실무 코드에서는 \`_\`로 시작하는 속성은 외부에서 직접 사용하지 않는 것이 좋습니다.

---

### 7.7.3 \`__변수명\`과 이름 맹글링

변수명 앞에 밑줄 두 개를 붙이면 이름 맹글링이 적용됩니다.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.__price = price


product = Product("키보드", 30000)
print(product.__price)
\`\`\`

위 코드는 에러가 발생합니다.

\`\`\`text
AttributeError
\`\`\`

파이썬은 \`__price\`라는 이름을 내부적으로 다른 이름으로 바꿉니다. 이를 이름 맹글링이라고 합니다. 다만 이것도 완벽한 보안 기능은 아닙니다. 주 목적은 실수로 외부에서 직접 접근하는 것을 줄이는 데 있습니다.

---

### 7.7.4 getter와 setter

객체의 값을 직접 수정하지 않고 메서드를 통해 읽고 변경할 수 있습니다.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self._price = price

    def get_price(self):
        return self._price

    def set_price(self, price):
        if price < 0:
            raise ValueError("가격은 0보다 작을 수 없습니다.")
        self._price = price


product = Product("키보드", 30000)
product.set_price(35000)

print(product.get_price())
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
35000
\`\`\`

이제 \`set_price()\`를 통해 가격을 변경하면 검증을 거칠 수 있습니다.

\`\`\`python
product.set_price(-1000)
\`\`\`

실행하면 다음과 같은 에러가 발생합니다.

\`\`\`text
ValueError: 가격은 0보다 작을 수 없습니다.
\`\`\`

---
`;export{e as default};