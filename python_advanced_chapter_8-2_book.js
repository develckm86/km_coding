var e=`<!-- 원본: python_advanced_chapter_8_book.md / 세부 장: 8-2 -->

# 8.2 문자열 표현

객체를 만들면 가장 먼저 마주치는 문제가 출력입니다.

\`\`\`python
class Product:
    def __init__(self, name: str, price: int) -> None:
        self.name = name
        self.price = price


product = Product("키보드", 30000)
print(product)
\`\`\`

실행 결과는 보통 다음과 비슷합니다.

\`\`\`text
<__main__.Product object at 0x...>
\`\`\`

이 결과는 사람이 보기에는 별로 유용하지 않습니다. 객체가 어떤 상품인지, 가격이 얼마인지 알 수 없습니다. 이런 문제를 해결하기 위해 \`__str__\`과 \`__repr__\`을 사용합니다.

---

## 8.2.1 \`__str__\`

\`__str__\`은 객체를 **사용자에게 보여줄 문자열**로 표현할 때 사용합니다.

\`\`\`python
class Product:
    def __init__(self, name: str, price: int) -> None:
        self.name = name
        self.price = price

    def __str__(self) -> str:
        return f"{self.name} - {self.price:,}원"


product = Product("키보드", 30000)
print(product)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
키보드 - 30,000원
\`\`\`

\`__str__\`은 다음 상황에서 사용됩니다.

\`\`\`python
print(product)
str(product)
f"상품: {product}"
\`\`\`

즉, 사람에게 읽기 좋은 문자열이 필요할 때 사용됩니다.

---

## 8.2.2 \`__repr__\`

\`__repr__\`은 객체를 **개발자가 디버깅할 때 유용한 문자열**로 표현할 때 사용합니다.

\`\`\`python
class Product:
    def __init__(self, name: str, price: int) -> None:
        self.name = name
        self.price = price

    def __repr__(self) -> str:
        return f"Product(name={self.name!r}, price={self.price!r})"


product = Product("키보드", 30000)
print(repr(product))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
Product(name='키보드', price=30000)
\`\`\`

\`__repr__\`은 객체의 내부 상태를 명확하게 보여주는 것이 좋습니다. 가능하다면 같은 객체를 다시 만들 수 있을 정도로 구체적인 표현을 제공하는 것이 좋습니다.

---

## 8.2.3 \`__str__\`과 \`__repr__\`의 차이

두 메서드는 모두 객체를 문자열로 표현하지만 목적이 다릅니다.

| 메서드 | 목적 | 주 사용자 |
|---|---|---|
| \`__str__\` | 읽기 좋은 표현 | 일반 사용자 |
| \`__repr__\` | 디버깅에 유용한 표현 | 개발자 |

다음 예제를 보겠습니다.

\`\`\`python
class Product:
    def __init__(self, name: str, price: int) -> None:
        self.name = name
        self.price = price

    def __str__(self) -> str:
        return f"{self.name} - {self.price:,}원"

    def __repr__(self) -> str:
        return f"Product(name={self.name!r}, price={self.price!r})"


product = Product("키보드", 30000)

print(str(product))
print(repr(product))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
키보드 - 30,000원
Product(name='키보드', price=30000)
\`\`\`

리스트 안에 객체를 넣으면 차이가 더 분명해집니다.

\`\`\`python
products = [
    Product("키보드", 30000),
    Product("마우스", 15000),
]

print(products)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[Product(name='키보드', price=30000), Product(name='마우스', price=15000)]
\`\`\`

리스트는 내부 요소를 보여줄 때 \`__repr__\`을 사용합니다. 그래서 \`__repr__\`을 잘 정의해두면 디버깅이 훨씬 쉬워집니다.

---

## 8.2.4 \`!r\`의 의미

앞의 코드에서 다음 표현을 사용했습니다.

\`\`\`python
f"Product(name={self.name!r}, price={self.price!r})"
\`\`\`

여기서 \`!r\`은 해당 값을 \`repr()\`로 표현하라는 뜻입니다.

\`\`\`python
name = "키보드"

print(f"{name}")
print(f"{name!r}")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
키보드
'키보드'
\`\`\`

문자열 값이 따옴표와 함께 표현되므로 디버깅용 문자열을 만들 때 유용합니다.

---

## 8.2.5 실무 기준

실무에서는 다음 기준을 추천합니다.

\`\`\`text
__repr__은 가능하면 항상 정의한다.
__str__은 사용자에게 보여줄 별도 표현이 필요할 때 정의한다.
\`\`\`

예를 들어 로그에 객체를 남기거나 테스트 실패 메시지를 볼 때 \`__repr__\`이 잘 정의되어 있으면 원인 파악이 쉬워집니다.

\`\`\`python
class Customer:
    def __init__(self, customer_id: int, name: str, grade: str) -> None:
        self.customer_id = customer_id
        self.name = name
        self.grade = grade

    def __repr__(self) -> str:
        return (
            f"Customer(customer_id={self.customer_id!r}, "
            f"name={self.name!r}, grade={self.grade!r})"
        )
\`\`\`

---
`;export{e as default};