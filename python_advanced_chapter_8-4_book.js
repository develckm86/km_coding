var e=`<!-- 원본: python_advanced_chapter_8_book.md / 세부 장: 8-4 -->

# 8.4 컨테이너처럼 동작하는 객체

파이썬에는 리스트, 튜플, 딕셔너리, 집합처럼 여러 값을 담는 객체가 많습니다. 이런 객체를 컨테이너라고 부릅니다.

직접 만든 클래스도 컨테이너처럼 동작하게 만들 수 있습니다.

예를 들어 장바구니 객체를 생각해봅시다.

\`\`\`python
cart = Cart()
cart.add(Product("키보드", 30000))
cart.add(Product("마우스", 15000))
\`\`\`

이 장바구니에 대해 다음과 같은 문법을 사용할 수 있다면 자연스럽습니다.

\`\`\`python
len(cart)
cart[0]
for product in cart:
    print(product)

"키보드" in cart
\`\`\`

이런 문법을 가능하게 하는 것이 컨테이너 관련 특수 메서드입니다.

---

## 8.4.1 \`__len__\`

\`__len__\`은 \`len()\`과 연결됩니다.

\`\`\`python
class Cart:
    def __init__(self) -> None:
        self._items: list[str] = []

    def add(self, item: str) -> None:
        self._items.append(item)

    def __len__(self) -> int:
        return len(self._items)


cart = Cart()
cart.add("키보드")
cart.add("마우스")

print(len(cart))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
2
\`\`\`

\`__len__\`은 반드시 정수를 반환해야 합니다. 음수를 반환하면 오류가 발생합니다.

---

## 8.4.2 \`__bool__\`과 비어 있는 객체 판단

객체를 조건문에서 사용할 때 파이썬은 참과 거짓을 판단합니다.

\`\`\`python
if cart:
    print("장바구니에 상품이 있습니다.")
else:
    print("장바구니가 비어 있습니다.")
\`\`\`

이때 \`__bool__\`이 정의되어 있으면 그것을 사용합니다. \`__bool__\`이 없고 \`__len__\`이 있으면 길이가 0인지 여부로 참과 거짓을 판단합니다.

\`\`\`python
class Cart:
    def __init__(self) -> None:
        self._items: list[str] = []

    def add(self, item: str) -> None:
        self._items.append(item)

    def __len__(self) -> int:
        return len(self._items)


cart = Cart()

if cart:
    print("상품 있음")
else:
    print("비어 있음")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
비어 있음
\`\`\`

\`__len__\`을 정의해두면 길이 확인뿐 아니라 조건문에서도 자연스럽게 사용할 수 있습니다.

---

## 8.4.3 \`__contains__\`

\`__contains__\`는 \`in\` 연산과 연결됩니다.

\`\`\`python
class Cart:
    def __init__(self) -> None:
        self._items: list[str] = []

    def add(self, item: str) -> None:
        self._items.append(item)

    def __contains__(self, item: str) -> bool:
        return item in self._items


cart = Cart()
cart.add("키보드")
cart.add("마우스")

print("키보드" in cart)
print("모니터" in cart)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
False
\`\`\`

\`__contains__\`를 사용하면 객체 내부 자료구조가 리스트인지, 집합인지, 딕셔너리인지 외부 코드가 몰라도 됩니다.

---

## 8.4.4 \`__getitem__\`

\`__getitem__\`은 대괄호 조회와 연결됩니다.

\`\`\`python
class Cart:
    def __init__(self) -> None:
        self._items: list[str] = []

    def add(self, item: str) -> None:
        self._items.append(item)

    def __getitem__(self, index: int) -> str:
        return self._items[index]


cart = Cart()
cart.add("키보드")
cart.add("마우스")

print(cart[0])
print(cart[1])
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
키보드
마우스
\`\`\`

이제 \`Cart\` 객체는 리스트처럼 인덱스로 접근할 수 있습니다.

---

## 8.4.5 슬라이싱 지원하기

\`__getitem__\`에는 정수 인덱스뿐 아니라 슬라이스 객체도 들어올 수 있습니다.

\`\`\`python
class Cart:
    def __init__(self) -> None:
        self._items: list[str] = []

    def add(self, item: str) -> None:
        self._items.append(item)

    def __getitem__(self, index: int | slice) -> str | list[str]:
        return self._items[index]


cart = Cart()
cart.add("키보드")
cart.add("마우스")
cart.add("모니터")

print(cart[0])
print(cart[0:2])
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
키보드
['키보드', '마우스']
\`\`\`

리스트 내부의 슬라이싱 동작을 그대로 위임했기 때문에 간단하게 구현할 수 있습니다.

---

## 8.4.6 \`__setitem__\`

\`__setitem__\`은 대괄호를 이용한 값 수정과 연결됩니다.

\`\`\`python
class Cart:
    def __init__(self) -> None:
        self._items: list[str] = []

    def add(self, item: str) -> None:
        self._items.append(item)

    def __getitem__(self, index: int) -> str:
        return self._items[index]

    def __setitem__(self, index: int, value: str) -> None:
        self._items[index] = value


cart = Cart()
cart.add("키보드")
cart.add("마우스")

cart[1] = "무선 마우스"

print(cart[1])
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
무선 마우스
\`\`\`

하지만 모든 컨테이너 객체가 수정 가능해야 하는 것은 아닙니다. 읽기 전용 컨테이너라면 \`__setitem__\`을 구현하지 않는 것이 좋습니다.

---

## 8.4.7 \`__iter__\`

\`__iter__\`는 반복과 연결됩니다.

\`\`\`python
class Cart:
    def __init__(self) -> None:
        self._items: list[str] = []

    def add(self, item: str) -> None:
        self._items.append(item)

    def __iter__(self):
        return iter(self._items)


cart = Cart()
cart.add("키보드")
cart.add("마우스")

for item in cart:
    print(item)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
키보드
마우스
\`\`\`

내부에 리스트를 가지고 있다면 보통 \`return iter(self._items)\`처럼 내부 리스트의 반복자를 그대로 반환하면 됩니다.

---

## 8.4.8 직접 만든 컨테이너 예제: 장바구니

지금까지 배운 내용을 합쳐 장바구니 객체를 만들어보겠습니다.

\`\`\`python
class Product:
    def __init__(self, name: str, price: int) -> None:
        self.name = name
        self.price = price

    def __repr__(self) -> str:
        return f"Product(name={self.name!r}, price={self.price!r})"


class Cart:
    def __init__(self) -> None:
        self._items: list[Product] = []

    def add(self, product: Product) -> None:
        if product.price < 0:
            raise ValueError("상품 가격은 음수일 수 없습니다.")
        self._items.append(product)

    def __len__(self) -> int:
        return len(self._items)

    def __iter__(self):
        return iter(self._items)

    def __getitem__(self, index: int | slice):
        return self._items[index]

    def __contains__(self, product_name: str) -> bool:
        return any(product.name == product_name for product in self._items)

    @property
    def total_price(self) -> int:
        return sum(product.price for product in self._items)


cart = Cart()
cart.add(Product("키보드", 30000))
cart.add(Product("마우스", 15000))
cart.add(Product("모니터", 200000))

print(len(cart))
print(cart[0])
print("마우스" in cart)
print(cart.total_price)

for product in cart:
    print(product.name)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
3
Product(name='키보드', price=30000)
True
245000
키보드
마우스
모니터
\`\`\`

이 예제에서 \`Cart\`는 단순히 내부 리스트를 노출하지 않습니다. 외부 코드는 \`Cart\`가 내부적으로 리스트를 쓰는지 몰라도 됩니다. 대신 \`len(cart)\`, \`cart[0]\`, \`for product in cart\`, \`"마우스" in cart\` 같은 자연스러운 문법으로 사용할 수 있습니다.

---

## 8.4.9 특수 메서드를 과하게 쓰지 않기

특수 메서드는 강력하지만 과하게 사용하면 오히려 코드가 헷갈릴 수 있습니다.

예를 들어 \`cart[0]\`은 장바구니의 첫 번째 상품을 의미하므로 자연스럽습니다. 하지만 \`cart["discount"]\`가 할인율을 반환한다면 조금 애매할 수 있습니다. 이런 경우에는 명시적인 메서드가 더 나을 수 있습니다.

\`\`\`python
cart.get_discount_rate()
cart.calculate_discount_amount()
\`\`\`

특수 메서드를 사용할 때는 다음 질문을 해보면 좋습니다.

\`\`\`text
이 객체가 정말 리스트처럼 동작하는가?
이 객체가 정말 숫자처럼 더해지는 것이 자연스러운가?
이 객체를 함수처럼 호출하는 것이 명확한가?
\`\`\`

파이썬다운 코드는 짧은 코드가 아니라 **의미가 자연스럽게 읽히는 코드**입니다.

---
`;export{e as default};