var e=`<!-- 원본: python_basic_chapter_7_book.md / 세부 장: 7-8 -->

# 7.8 프로퍼티 \`@property\`

### 7.8.1 \`@property\`가 필요한 이유

getter와 setter를 직접 만들면 안전하지만, 사용하는 코드가 조금 길어집니다.

\`\`\`python
product.set_price(35000)
print(product.get_price())
\`\`\`

파이썬에서는 \`@property\`를 사용해 메서드를 속성처럼 사용할 수 있습니다.

\`\`\`python
print(product.price)
product.price = 35000
\`\`\`

이렇게 쓰면서도 내부적으로는 검증 로직을 실행할 수 있습니다.

---

### 7.8.2 getter 만들기

\`@property\`를 붙이면 메서드를 속성처럼 읽을 수 있습니다.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self._price = price

    @property
    def price(self):
        return self._price


product = Product("키보드", 30000)

print(product.price)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
30000
\`\`\`

겉으로는 \`product.price\`처럼 속성을 읽는 것 같지만, 실제로는 \`price()\` 메서드가 실행됩니다.

---

### 7.8.3 setter 만들기

값을 수정할 때 실행되는 setter를 만들려면 \`@속성이름.setter\`를 사용합니다.

\`\`\`python
class Product:
    def __init__(self, name, price):
        self.name = name
        self._price = price

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, price):
        if price < 0:
            raise ValueError("가격은 0보다 작을 수 없습니다.")
        self._price = price


product = Product("키보드", 30000)
product.price = 35000

print(product.price)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
35000
\`\`\`

잘못된 값을 넣으면 에러가 발생합니다.

\`\`\`python
product.price = -1000
\`\`\`

\`\`\`text
ValueError: 가격은 0보다 작을 수 없습니다.
\`\`\`

---

### 7.8.4 읽기 전용 속성

프로퍼티를 사용하면 계산된 값을 읽기 전용 속성처럼 제공할 수 있습니다.

\`\`\`python
class Order:
    def __init__(self, price, quantity):
        self.price = price
        self.quantity = quantity

    @property
    def total_price(self):
        return self.price * self.quantity


order = Order(30000, 3)

print(order.total_price)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
90000
\`\`\`

\`total_price\`는 실제로 저장된 값이 아니라 \`price\`와 \`quantity\`를 이용해 계산한 값입니다. 하지만 사용하는 쪽에서는 속성처럼 읽을 수 있습니다.

\`\`\`python
order.total_price = 100000
\`\`\`

setter를 만들지 않았으므로 위와 같이 값을 직접 대입하면 에러가 발생합니다.


---
`;export{e as default};