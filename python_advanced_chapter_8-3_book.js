var e=`<!-- 원본: python_advanced_chapter_8_book.md / 세부 장: 8-3 -->

# 8.3 비교 연산

객체를 만들다 보면 객체끼리 비교해야 하는 상황이 생깁니다.

\`\`\`python
product1 = Product("키보드", 30000)
product2 = Product("키보드", 30000)

print(product1 == product2)
\`\`\`

기본적으로 사용자 정의 객체는 같은 값을 가지고 있어도 서로 다른 객체이면 \`False\`가 나올 수 있습니다. 파이썬은 우리가 만든 클래스의 어떤 속성을 기준으로 같다고 판단해야 하는지 알 수 없기 때문입니다.

객체 비교 기준을 직접 정하고 싶다면 비교 특수 메서드를 정의해야 합니다.

---

## 8.3.1 \`__eq__\`

\`__eq__\`는 \`==\` 연산과 연결됩니다.

\`\`\`python
class Product:
    def __init__(self, name: str, price: int) -> None:
        self.name = name
        self.price = price

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Product):
            return False
        return self.name == other.name and self.price == other.price


p1 = Product("키보드", 30000)
p2 = Product("키보드", 30000)
p3 = Product("마우스", 15000)

print(p1 == p2)
print(p1 == p3)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
False
\`\`\`

이제 파이썬은 두 \`Product\` 객체의 이름과 가격이 같으면 같은 상품으로 판단합니다.

---

## 8.3.2 비교 대상이 다른 타입일 때

\`__eq__\`를 구현할 때는 비교 대상이 같은 타입인지 확인하는 것이 좋습니다.

\`\`\`python
def __eq__(self, other: object) -> bool:
    if not isinstance(other, Product):
        return False
    return self.name == other.name and self.price == other.price
\`\`\`

조금 더 파이썬 내부 규칙에 맞게 작성하려면 \`NotImplemented\`를 반환할 수도 있습니다.

\`\`\`python
def __eq__(self, other: object) -> bool:
    if not isinstance(other, Product):
        return NotImplemented
    return self.name == other.name and self.price == other.price
\`\`\`

\`NotImplemented\`는 “이 타입과의 비교는 내가 처리할 수 없다”는 의미입니다. 그러면 파이썬은 다른 쪽 객체의 비교 메서드를 시도하거나, 적절한 기본 동작을 선택합니다.

초급 실무 코드에서는 \`False\`를 반환해도 충분한 경우가 많습니다. 하지만 라이브러리나 재사용 가능한 객체를 만들 때는 \`NotImplemented\`를 이해하고 사용하는 것이 좋습니다.

---

## 8.3.3 정렬을 위한 비교 메서드

객체를 정렬하려면 크기 비교 기준이 필요합니다.

\`\`\`python
products = [
    Product("키보드", 30000),
    Product("마우스", 15000),
    Product("모니터", 200000),
]

print(sorted(products))
\`\`\`

이 코드는 기본 상태에서는 실패할 수 있습니다. 파이썬은 \`Product\` 객체끼리 무엇을 기준으로 작고 큰지 모르기 때문입니다.

가장 단순한 방법은 \`sorted()\`에 \`key\`를 넘기는 것입니다.

\`\`\`python
sorted_products = sorted(products, key=lambda product: product.price)
\`\`\`

하지만 객체 자체가 가격 기준으로 비교 가능해야 한다면 \`__lt__\`를 정의할 수 있습니다.

\`\`\`python
class Product:
    def __init__(self, name: str, price: int) -> None:
        self.name = name
        self.price = price

    def __repr__(self) -> str:
        return f"Product({self.name!r}, {self.price!r})"

    def __lt__(self, other: object) -> bool:
        if not isinstance(other, Product):
            return NotImplemented
        return self.price < other.price


products = [
    Product("키보드", 30000),
    Product("마우스", 15000),
    Product("모니터", 200000),
]

print(sorted(products))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[Product('마우스', 15000), Product('키보드', 30000), Product('모니터', 200000)]
\`\`\`

\`__lt__\`는 \`<\` 연산과 연결됩니다. \`sorted()\`는 내부적으로 값을 비교해야 하므로 \`__lt__\`가 있으면 정렬할 수 있습니다.

---

## 8.3.4 비교 메서드 종류

객체 비교에 사용할 수 있는 대표 특수 메서드는 다음과 같습니다.

| 연산자 | 특수 메서드 |
|---|---|
| \`==\` | \`__eq__\` |
| \`!=\` | \`__ne__\` |
| \`<\` | \`__lt__\` |
| \`<=\` | \`__le__\` |
| \`>\` | \`__gt__\` |
| \`>=\` | \`__ge__\` |

이 메서드를 모두 직접 구현할 수도 있지만, 대부분의 경우에는 \`__eq__\`와 \`__lt__\` 정도만 구현하고 나머지는 도구를 활용하는 편이 낫습니다.

---

## 8.3.5 \`functools.total_ordering\`

\`functools.total_ordering\`은 비교 메서드 구현을 줄이는 데 도움을 주는 데코레이터입니다. \`__eq__\`와 순서 비교 메서드 하나를 정의하면 나머지 비교 메서드를 자동으로 만들어줍니다.

\`\`\`python
from functools import total_ordering


@total_ordering
class Product:
    def __init__(self, name: str, price: int) -> None:
        self.name = name
        self.price = price

    def __repr__(self) -> str:
        return f"Product({self.name!r}, {self.price!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Product):
            return NotImplemented
        return self.price == other.price

    def __lt__(self, other: object) -> bool:
        if not isinstance(other, Product):
            return NotImplemented
        return self.price < other.price


keyboard = Product("키보드", 30000)
mouse = Product("마우스", 15000)

print(mouse < keyboard)
print(mouse <= keyboard)
print(keyboard >= mouse)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
True
True
\`\`\`

\`total_ordering\`은 편리하지만 모든 경우에 필요한 것은 아닙니다. 정렬만 필요하다면 \`sorted(..., key=...)\`가 더 명확할 때가 많습니다.

---

## 8.3.6 비교 기준은 객체의 의미와 맞아야 한다

비교 메서드를 만들 때 가장 중요한 것은 기준입니다.

상품 객체를 생각해보겠습니다.

\`\`\`text
상품명과 가격이 같으면 같은 상품인가?
상품 ID가 같으면 같은 상품인가?
가격이 같으면 같은 상품인가?
\`\`\`

실무에서는 보통 상품 ID처럼 고유 식별자가 있으면 그것을 기준으로 동일성을 판단하는 것이 좋습니다.

\`\`\`python
class Product:
    def __init__(self, product_id: str, name: str, price: int) -> None:
        self.product_id = product_id
        self.name = name
        self.price = price

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Product):
            return NotImplemented
        return self.product_id == other.product_id
\`\`\`

가격은 바뀔 수 있습니다. 상품명도 수정될 수 있습니다. 하지만 상품 ID가 고정되어 있다면 동일성을 판단하는 기준으로 더 적합합니다.

정렬 기준도 마찬가지입니다. 가격순 정렬이 자연스러운 객체도 있고, 날짜순 정렬이 자연스러운 객체도 있습니다. 객체 자체의 기본 정렬 기준이 애매하다면 \`__lt__\`를 정의하지 말고 \`sorted()\`의 \`key\`를 사용하는 편이 더 낫습니다.

---
`;export{e as default};