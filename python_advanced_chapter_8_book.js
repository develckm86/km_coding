var e=`# 8장. 파이썬 데이터 모델

7장에서 우리는 객체지향 프로그래밍을 문법이 아니라 설계의 관점에서 살펴보았습니다. 상속, 조합, 추상 클래스, \`Protocol\` 같은 개념은 클래스를 더 유연하게 설계하기 위한 도구였습니다.

이번 장에서는 한 단계 더 들어가서 **파이썬 객체가 파이썬 문법과 어떻게 연결되는지**를 살펴봅니다. 우리가 평소에 자연스럽게 사용하던 문법은 사실 내부적으로 특정 메서드와 연결되어 있습니다.

예를 들어 다음 코드를 생각해봅시다.

\`\`\`python
items = ["A", "B", "C"]

print(len(items))
print(items[0])
print("A" in items)
\`\`\`

겉으로 보기에는 \`len()\`, 대괄호 인덱싱, \`in\` 연산자를 사용하는 코드입니다. 하지만 내부적으로는 각각 객체가 가진 특별한 메서드와 연결됩니다.

\`\`\`text
len(items)       -> items.__len__()
items[0]         -> items.__getitem__(0)
"A" in items     -> items.__contains__("A") 또는 반복 검사
\`\`\`

파이썬은 이런 방식으로 객체와 문법을 연결합니다. 이 연결 규칙을 이해하면 우리가 직접 만든 클래스도 리스트처럼, 딕셔너리처럼, 함수처럼, 숫자처럼 동작하게 만들 수 있습니다.

이번 장의 목표는 다음과 같습니다.

- 파이썬 데이터 모델이 무엇인지 이해한다.
- 특수 메서드가 파이썬 문법과 어떻게 연결되는지 설명할 수 있다.
- \`__str__\`과 \`__repr__\`의 차이를 이해한다.
- 직접 만든 객체를 비교, 정렬, 길이 확인, 포함 여부 검사에 사용할 수 있다.
- 직접 만든 객체를 컨테이너처럼 동작하게 만들 수 있다.
- 직접 만든 객체를 함수처럼 호출할 수 있다.
- 속성 접근 제어 메서드의 역할과 위험성을 이해한다.
- 실무에서 파이썬다운 객체를 설계하는 기준을 세울 수 있다.

---

## 8.1 데이터 모델이란?

파이썬 데이터 모델은 **파이썬 객체가 언어의 기본 문법과 상호작용하는 규칙**입니다.

조금 더 쉽게 말하면, 데이터 모델은 다음 질문에 대한 답입니다.

\`\`\`text
어떤 객체에 len()을 호출하면 파이썬은 무엇을 실행할까?
어떤 객체를 print()로 출력하면 파이썬은 무엇을 실행할까?
어떤 객체끼리 ==로 비교하면 파이썬은 무엇을 실행할까?
어떤 객체에 []를 사용하면 파이썬은 무엇을 실행할까?
어떤 객체를 함수처럼 호출하면 파이썬은 무엇을 실행할까?
\`\`\`

이 질문의 답이 바로 특수 메서드입니다.

---

## 8.1.1 특수 메서드란?

특수 메서드는 이름 앞뒤에 밑줄 두 개가 붙은 메서드입니다.

\`\`\`python
__str__
__repr__
__len__
__getitem__
__iter__
__eq__
__call__
\`\`\`

이런 메서드를 보통 **dunder method**라고도 부릅니다. dunder는 double underscore를 줄인 말입니다. 한국어로는 “던더 메서드”라고 부르기도 하지만, 이 교재에서는 주로 **특수 메서드**라고 부르겠습니다.

특수 메서드는 우리가 직접 호출할 수도 있지만, 보통은 직접 호출하기보다 파이썬 문법을 통해 간접적으로 호출됩니다.

\`\`\`python
class Product:
    def __init__(self, name: str, price: int) -> None:
        self.name = name
        self.price = price

    def __str__(self) -> str:
        return f"{self.name}({self.price}원)"


product = Product("키보드", 30000)

print(product)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
키보드(30000원)
\`\`\`

\`print(product)\`라고 작성했지만, 파이썬은 내부적으로 \`product.__str__()\`을 사용해 출력할 문자열을 얻습니다.

---

## 8.1.2 특수 메서드를 직접 호출하지 않는 이유

아래 코드는 실행됩니다.

\`\`\`python
print(product.__str__())
\`\`\`

하지만 파이썬다운 코드는 아닙니다. 일반적으로는 다음처럼 작성합니다.

\`\`\`python
print(product)
str(product)
\`\`\`

특수 메서드는 파이썬의 문법과 내장 함수가 호출하도록 설계된 메서드입니다. 따라서 직접 \`__str__()\`을 호출하기보다 \`str(product)\` 또는 \`print(product)\`처럼 사용하는 것이 좋습니다.

비슷한 예를 더 보면 다음과 같습니다.

| 사용 코드 | 내부적으로 연결되는 메서드 |
|---|---|
| \`str(obj)\` | \`obj.__str__()\` |
| \`repr(obj)\` | \`obj.__repr__()\` |
| \`len(obj)\` | \`obj.__len__()\` |
| \`obj[key]\` | \`obj.__getitem__(key)\` |
| \`obj[key] = value\` | \`obj.__setitem__(key, value)\` |
| \`value in obj\` | \`obj.__contains__(value)\` |
| \`for x in obj\` | \`obj.__iter__()\` |
| \`obj()\` | \`obj.__call__()\` |
| \`a == b\` | \`a.__eq__(b)\` |
| \`a < b\` | \`a.__lt__(b)\` |

---

## 8.1.3 특수 메서드는 클래스에 정의해야 한다

특수 메서드를 이해할 때 중요한 점이 하나 있습니다. \`len(obj)\` 같은 문법은 인스턴스에 우연히 붙인 메서드를 찾지 않습니다. 일반적으로 특수 메서드는 **클래스에 정의해야** 파이썬 문법과 제대로 연결됩니다.

다음 코드를 보겠습니다.

\`\`\`python
class Empty:
    pass


obj = Empty()
obj.__len__ = lambda: 10

print(obj.__len__())
print(len(obj))
\`\`\`

첫 번째 출력은 동작할 수 있습니다. 하지만 \`len(obj)\`는 실패합니다.

\`\`\`text
10
TypeError: object of type 'Empty' has no len()
\`\`\`

\`obj.__len__\`이라는 속성을 인스턴스에 붙였지만, \`len(obj)\`는 그것을 일반 속성 조회 방식으로 찾지 않습니다. 특수 메서드는 클래스 수준에 정의해야 합니다.

\`\`\`python
class Box:
    def __len__(self) -> int:
        return 10


box = Box()
print(len(box))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
10
\`\`\`

이 규칙은 파이썬 인터프리터가 특수 메서드를 빠르고 일관성 있게 찾기 위해 사용하는 방식입니다. 실무에서는 단순하게 기억하면 됩니다.

\`\`\`text
특수 메서드는 인스턴스에 나중에 붙이지 말고 클래스 안에 정의한다.
\`\`\`

---

## 8.1.4 데이터 모델을 배우는 이유

데이터 모델을 배우는 이유는 특수 메서드 이름을 외우기 위해서가 아닙니다. 목표는 직접 만든 객체가 파이썬의 기본 문법과 자연스럽게 어울리도록 만드는 것입니다.

예를 들어 장바구니 객체를 만든다고 해보겠습니다.

\`\`\`python
cart = Cart()
cart.add(Product("키보드", 30000))
cart.add(Product("마우스", 15000))
\`\`\`

기초적인 방식으로는 다음처럼 메서드를 만들 수 있습니다.

\`\`\`python
cart.count_items()
cart.get_item(0)
cart.has_product("키보드")
cart.calculate_total_price()
\`\`\`

나쁘지 않습니다. 하지만 데이터 모델을 활용하면 더 자연스러운 코드로 만들 수 있습니다.

\`\`\`python
len(cart)
cart[0]
"키보드" in cart
cart.total_price
\`\`\`

이렇게 객체가 파이썬 문법과 잘 어울리면 코드가 읽기 쉬워집니다. 다만 모든 클래스에 특수 메서드를 넣어야 하는 것은 아닙니다. 객체가 정말로 “길이를 가진 것”, “반복 가능한 것”, “인덱스로 접근 가능한 것”, “비교 가능한 것”일 때 사용하는 것이 좋습니다.

---

## 8.2 문자열 표현

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

## 8.3 비교 연산

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

## 8.4 컨테이너처럼 동작하는 객체

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

## 8.5 숫자처럼 동작하는 객체

파이썬에서는 직접 만든 객체도 \`+\`, \`-\`, \`*\` 같은 연산자를 사용할 수 있게 만들 수 있습니다. 이를 연산자 오버로딩이라고 합니다.

예를 들어 금액을 표현하는 \`Money\` 클래스를 만든다고 해보겠습니다.

\`\`\`python
money1 = Money(10000)
money2 = Money(5000)

print(money1 + money2)
\`\`\`

이 코드가 자연스럽게 동작하려면 \`__add__\`를 정의해야 합니다.

---

## 8.5.1 \`__add__\`

\`__add__\`는 \`+\` 연산과 연결됩니다.

\`\`\`python
class Money:
    def __init__(self, amount: int) -> None:
        self.amount = amount

    def __add__(self, other: object):
        if not isinstance(other, Money):
            return NotImplemented
        return Money(self.amount + other.amount)

    def __repr__(self) -> str:
        return f"Money({self.amount})"


m1 = Money(10000)
m2 = Money(5000)

print(m1 + m2)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
Money(15000)
\`\`\`

여기서 중요한 점은 기존 객체의 값을 직접 바꾸지 않고 새 \`Money\` 객체를 반환했다는 점입니다. 숫자처럼 동작하는 객체는 보통 불변 객체처럼 설계하는 것이 이해하기 쉽습니다.

---

## 8.5.2 \`__sub__\`와 \`__mul__\`

빼기와 곱하기도 비슷하게 구현할 수 있습니다.

\`\`\`python
class Money:
    def __init__(self, amount: int) -> None:
        self.amount = amount

    def __add__(self, other: object):
        if not isinstance(other, Money):
            return NotImplemented
        return Money(self.amount + other.amount)

    def __sub__(self, other: object):
        if not isinstance(other, Money):
            return NotImplemented
        return Money(self.amount - other.amount)

    def __mul__(self, multiplier: object):
        if not isinstance(multiplier, int):
            return NotImplemented
        return Money(self.amount * multiplier)

    def __repr__(self) -> str:
        return f"Money({self.amount})"


price = Money(10000)
discount = Money(2000)

print(price - discount)
print(price * 3)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
Money(8000)
Money(30000)
\`\`\`

---

## 8.5.3 오른쪽 연산 \`__radd__\`, \`__rmul__\`

다음 코드는 어떨까요?

\`\`\`python
price = Money(10000)

print(price * 3)
print(3 * price)
\`\`\`

\`price * 3\`은 \`price.__mul__(3)\`으로 처리됩니다. 하지만 \`3 * price\`는 먼저 \`int\` 객체의 곱셈으로 처리하려고 합니다. 이때 \`Money\` 쪽에서 오른쪽 연산을 처리하려면 \`__rmul__\`을 정의할 수 있습니다.

\`\`\`python
class Money:
    def __init__(self, amount: int) -> None:
        self.amount = amount

    def __mul__(self, multiplier: object):
        if not isinstance(multiplier, int):
            return NotImplemented
        return Money(self.amount * multiplier)

    def __rmul__(self, multiplier: object):
        return self.__mul__(multiplier)

    def __repr__(self) -> str:
        return f"Money({self.amount})"


price = Money(10000)

print(price * 3)
print(3 * price)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
Money(30000)
Money(30000)
\`\`\`

---

## 8.5.4 제자리 연산 \`__iadd__\`

\`+=\` 같은 연산은 제자리 연산이라고 부릅니다.

\`\`\`python
money = Money(10000)
money += Money(5000)
\`\`\`

이를 직접 제어하려면 \`__iadd__\`를 정의할 수 있습니다. 하지만 불변 객체처럼 설계한다면 꼭 정의하지 않아도 됩니다. \`__iadd__\`가 없으면 파이썬은 \`__add__\`를 사용한 뒤 결과를 다시 변수에 할당합니다.

\`\`\`python
money = money + Money(5000)
\`\`\`

데이터 처리 코드에서는 객체가 예상치 못하게 내부 상태를 바꾸는 것보다 새 객체를 반환하는 방식이 안전할 때가 많습니다.

---

## 8.5.5 연산자 오버로딩을 사용할 때의 기준

연산자 오버로딩은 코드가 짧아지는 장점이 있지만, 의미가 분명하지 않으면 오히려 혼란을 만듭니다.

다음은 자연스러운 예입니다.

\`\`\`python
Money(10000) + Money(5000)
Vector(1, 2) + Vector(3, 4)
DateRange(...) & DateRange(...)
\`\`\`

반면 다음은 애매할 수 있습니다.

\`\`\`python
Customer("홍길동") + Product("키보드", 30000)
Report() * User()
\`\`\`

객체 사이의 연산이 현실 세계나 도메인에서 자연스럽게 이해될 때만 연산자 오버로딩을 사용하는 것이 좋습니다.

---

## 8.5.6 실무 예제: 금액 객체

금액 객체는 숫자처럼 동작시키기 좋은 예입니다.

\`\`\`python
class Money:
    def __init__(self, amount: int, currency: str = "KRW") -> None:
        if amount < 0:
            raise ValueError("금액은 음수일 수 없습니다.")
        self.amount = amount
        self.currency = currency

    def __repr__(self) -> str:
        return f"Money(amount={self.amount!r}, currency={self.currency!r})"

    def __str__(self) -> str:
        return f"{self.amount:,} {self.currency}"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Money):
            return NotImplemented
        return self.amount == other.amount and self.currency == other.currency

    def __add__(self, other: object):
        if not isinstance(other, Money):
            return NotImplemented
        if self.currency != other.currency:
            raise ValueError("통화가 다르면 더할 수 없습니다.")
        return Money(self.amount + other.amount, self.currency)

    def __sub__(self, other: object):
        if not isinstance(other, Money):
            return NotImplemented
        if self.currency != other.currency:
            raise ValueError("통화가 다르면 뺄 수 없습니다.")
        if self.amount < other.amount:
            raise ValueError("결과 금액은 음수일 수 없습니다.")
        return Money(self.amount - other.amount, self.currency)


price = Money(30000)
discount = Money(5000)

print(price)
print(price - discount)
print(price + Money(10000))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
30,000 KRW
25,000 KRW
40,000 KRW
\`\`\`

이 예제에서 \`Money\`는 단순한 정수보다 의미가 분명합니다. 금액이 음수가 되지 않도록 막고, 통화가 다르면 더하지 못하게 합니다. 이렇게 도메인 규칙을 객체 안에 넣을 수 있습니다.

---

## 8.6 호출 가능한 객체

파이썬에서는 함수만 호출할 수 있는 것이 아닙니다. 객체도 \`__call__\`을 정의하면 함수처럼 호출할 수 있습니다.

\`\`\`python
obj()
\`\`\`

이 문법은 내부적으로 다음과 연결됩니다.

\`\`\`python
obj.__call__()
\`\`\`

---

## 8.6.1 \`__call__\`

간단한 예제를 보겠습니다.

\`\`\`python
class Greeter:
    def __init__(self, greeting: str) -> None:
        self.greeting = greeting

    def __call__(self, name: str) -> str:
        return f"{self.greeting}, {name}!"


greet = Greeter("안녕하세요")

print(greet("홍길동"))
print(greet("김민수"))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
안녕하세요, 홍길동!
안녕하세요, 김민수!
\`\`\`

\`greet\`는 객체이지만 함수처럼 호출할 수 있습니다.

---

## 8.6.2 함수와 호출 가능한 객체의 차이

함수는 보통 필요한 값을 인자로 받아 처리합니다.

\`\`\`python
def add_prefix(text: str, prefix: str) -> str:
    return f"{prefix}{text}"
\`\`\`

그런데 같은 설정값을 여러 번 사용해야 한다면 매번 인자로 넘기는 것이 번거로울 수 있습니다.

\`\`\`python
print(add_prefix("001", "USER-"))
print(add_prefix("002", "USER-"))
print(add_prefix("003", "USER-"))
\`\`\`

호출 가능한 객체를 사용하면 설정값을 객체 상태로 보관할 수 있습니다.

\`\`\`python
class Prefixer:
    def __init__(self, prefix: str) -> None:
        self.prefix = prefix

    def __call__(self, text: str) -> str:
        return f"{self.prefix}{text}"


user_id = Prefixer("USER-")

print(user_id("001"))
print(user_id("002"))
print(user_id("003"))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
USER-001
USER-002
USER-003
\`\`\`

호출 가능한 객체는 **상태를 가진 함수**라고 이해하면 좋습니다.

---

## 8.6.3 실무 예제: 데이터 변환기

데이터 처리에서는 같은 규칙을 여러 값에 반복 적용하는 일이 많습니다. 예를 들어 문자열 앞뒤 공백을 제거하고, 빈 문자열이면 기본값으로 바꾸는 변환기를 만들 수 있습니다.

\`\`\`python
class TextCleaner:
    def __init__(self, default: str = "N/A") -> None:
        self.default = default

    def __call__(self, value: object) -> str:
        if value is None:
            return self.default

        text = str(value).strip()
        if not text:
            return self.default

        return text


clean = TextCleaner(default="없음")

values = ["  홍길동  ", "", None, "  김민수"]
cleaned_values = [clean(value) for value in values]

print(cleaned_values)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
['홍길동', '없음', '없음', '김민수']
\`\`\`

이처럼 \`__call__\`은 데이터 변환 규칙, 검증 규칙, 필터링 규칙을 객체로 만들 때 유용합니다.

---

## 8.6.4 실무 예제: 조건 필터

다음은 최소 금액 이상인 주문만 통과시키는 필터입니다.

\`\`\`python
class MinAmountFilter:
    def __init__(self, min_amount: int) -> None:
        self.min_amount = min_amount

    def __call__(self, order: dict[str, object]) -> bool:
        amount = int(order.get("amount", 0))
        return amount >= self.min_amount


orders = [
    {"order_id": "A001", "amount": 5000},
    {"order_id": "A002", "amount": 30000},
    {"order_id": "A003", "amount": 12000},
]

is_large_order = MinAmountFilter(10000)
large_orders = list(filter(is_large_order, orders))

print(large_orders)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[{'order_id': 'A002', 'amount': 30000}, {'order_id': 'A003', 'amount': 12000}]
\`\`\`

\`filter()\`는 함수를 받을 수 있지만, 정확히 말하면 호출 가능한 객체를 받을 수 있습니다. 함수도 호출 가능한 객체이고, \`__call__\`이 정의된 객체도 호출 가능한 객체입니다.

---

## 8.6.5 \`__call__\` 사용 기준

\`__call__\`은 편리하지만, 아무 객체나 함수처럼 만들면 코드가 헷갈릴 수 있습니다. 다음 기준을 생각해볼 수 있습니다.

\`__call__\`이 적절한 경우:

- 객체가 하나의 처리 규칙을 표현한다.
- 설정값을 상태로 가지고 반복 호출된다.
- 함수처럼 쓰는 것이 자연스럽다.
- \`map\`, \`filter\`, 콜백, 파이프라인에 넘기기 좋다.

명시적 메서드가 더 나은 경우:

- 객체가 여러 동작을 가진다.
- 호출 의미가 하나로 정해지지 않는다.
- \`obj()\`만 봐서는 무슨 일이 일어나는지 알기 어렵다.

예를 들어 보고서 생성 객체는 다음이 더 명확할 수 있습니다.

\`\`\`python
report_generator.generate()
\`\`\`

다음처럼 호출하는 것은 의미가 덜 분명할 수 있습니다.

\`\`\`python
report_generator()
\`\`\`

---

## 8.7 속성 접근 제어

파이썬 객체에서 속성에 접근할 때도 데이터 모델이 관여합니다.

\`\`\`python
obj.name
obj.name = "홍길동"
\`\`\`

이런 속성 접근은 내부적으로 여러 규칙을 따릅니다. 대부분의 경우 우리는 \`@property\` 정도만 사용하면 충분합니다. 하지만 고급 파이썬에서는 \`__getattr__\`, \`__getattribute__\`, \`__setattr__\`의 개념도 이해해두면 도움이 됩니다.

---

## 8.7.1 기본 속성 접근

일반적인 객체는 속성을 인스턴스 딕셔너리에 저장합니다.

\`\`\`python
class Customer:
    def __init__(self, name: str) -> None:
        self.name = name


customer = Customer("홍길동")

print(customer.name)
print(customer.__dict__)
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
홍길동
{'name': '홍길동'}
\`\`\`

\`customer.name\`이라고 쓰면 파이썬은 객체의 속성 저장 공간에서 \`name\`을 찾습니다.

---

## 8.7.2 \`__getattr__\`

\`__getattr__\`은 일반적인 속성 조회가 실패했을 때 호출됩니다.

\`\`\`python
class Config:
    def __init__(self, values: dict[str, str]) -> None:
        self._values = values

    def __getattr__(self, name: str) -> str:
        if name in self._values:
            return self._values[name]
        raise AttributeError(f"설정값을 찾을 수 없습니다: {name}")


config = Config({"host": "localhost", "port": "8000"})

print(config.host)
print(config.port)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
localhost
8000
\`\`\`

\`host\`와 \`port\`는 실제 인스턴스 속성이 아닙니다. 일반적인 속성 조회에서 찾지 못하면 \`__getattr__\`이 호출되고, 내부 딕셔너리에서 값을 찾아 반환합니다.

없는 속성에 접근하면 어떻게 될까요?

\`\`\`python
print(config.username)
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
AttributeError: 설정값을 찾을 수 없습니다: username
\`\`\`

\`__getattr__\`을 사용할 때는 없는 속성에 대해 반드시 \`AttributeError\`를 발생시키는 것이 좋습니다. 그래야 파이썬의 속성 조회 규칙과 다른 도구들이 정상적으로 동작합니다.

---

## 8.7.3 \`__getattribute__\`

\`__getattribute__\`는 모든 속성 조회 때 호출됩니다.

\`\`\`python
class DebugObject:
    def __init__(self, name: str) -> None:
        self.name = name

    def __getattribute__(self, name: str):
        print(f"속성 조회: {name}")
        return object.__getattribute__(self, name)


obj = DebugObject("테스트")
print(obj.name)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
속성 조회: name
테스트
\`\`\`

\`__getattribute__\`는 강력하지만 위험합니다. 모든 속성 접근에 개입하기 때문에 잘못 작성하면 무한 재귀가 발생할 수 있습니다.

예를 들어 다음 코드는 문제가 있습니다.

\`\`\`python
class Bad:
    def __getattribute__(self, name: str):
        return self.__dict__[name]
\`\`\`

\`self.__dict__\`에 접근하는 순간 다시 \`__getattribute__\`가 호출됩니다. 그래서 무한 재귀에 빠질 수 있습니다.

안전하게 작성하려면 보통 다음처럼 부모 클래스의 구현을 사용해야 합니다.

\`\`\`python
class Safe:
    def __getattribute__(self, name: str):
        return object.__getattribute__(self, name)
\`\`\`

실무에서는 대부분 \`__getattribute__\`보다 \`@property\`나 \`__getattr__\`이 더 안전하고 충분합니다.

---

## 8.7.4 \`__setattr__\`

\`__setattr__\`은 속성에 값을 할당할 때 호출됩니다.

\`\`\`python
class LoggedSetAttr:
    def __setattr__(self, name: str, value: object) -> None:
        print(f"속성 설정: {name} = {value!r}")
        object.__setattr__(self, name, value)


obj = LoggedSetAttr()
obj.name = "홍길동"
obj.age = 30
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
속성 설정: name = '홍길동'
속성 설정: age = 30
\`\`\`

\`__setattr__\`도 모든 속성 설정에 개입하므로 주의해야 합니다. 내부에서 \`self.name = value\`처럼 다시 속성을 설정하면 재귀가 발생할 수 있습니다.

\`\`\`python
object.__setattr__(self, name, value)
\`\`\`

처럼 부모 구현을 사용해야 안전합니다.

---

## 8.7.5 속성 접근 제어 실무 예제

다음은 읽기 전용 설정 객체입니다.

\`\`\`python
class ReadOnlyConfig:
    def __init__(self, values: dict[str, str]) -> None:
        object.__setattr__(self, "_values", dict(values))

    def __getattr__(self, name: str) -> str:
        values = object.__getattribute__(self, "_values")
        if name in values:
            return values[name]
        raise AttributeError(f"설정값을 찾을 수 없습니다: {name}")

    def __setattr__(self, name: str, value: object) -> None:
        raise AttributeError("설정값은 수정할 수 없습니다.")


config = ReadOnlyConfig({"host": "localhost", "port": "8000"})

print(config.host)

config.host = "127.0.0.1"
\`\`\`

마지막 줄에서는 오류가 발생합니다.

\`\`\`text
AttributeError: 설정값은 수정할 수 없습니다.
\`\`\`

이런 방식은 강력하지만, 모든 경우에 필요한 것은 아닙니다. 단순한 값 검증은 \`@property\`의 setter로 처리하는 것이 더 읽기 쉽습니다.

---

## 8.7.6 \`@property\`와 속성 특수 메서드 비교

속성 제어에는 여러 방법이 있습니다.

| 방법 | 특징 | 추천 상황 |
|---|---|---|
| \`@property\` | 특정 속성 하나를 제어 | 값 검증, 계산된 속성 |
| \`__getattr__\` | 없는 속성을 동적으로 처리 | 설정 객체, API 응답 래핑 |
| \`__getattribute__\` | 모든 속성 조회를 가로챔 | 프레임워크, 디버깅 도구, 고급 라이브러리 |
| \`__setattr__\` | 모든 속성 설정을 가로챔 | 읽기 전용 객체, 속성 설정 로그 |

실무 기준은 다음과 같습니다.

\`\`\`text
대부분은 @property로 충분하다.
동적 속성이 필요하면 __getattr__을 고려한다.
__getattribute__와 __setattr__은 꼭 필요할 때만 사용한다.
\`\`\`

---

## 8.8 실무 활용

이제 지금까지 배운 데이터 모델을 실무적인 예제로 정리해보겠습니다.

---

## 8.8.1 정렬 가능한 상품 객체 만들기

상품을 가격 기준으로 정렬할 수 있게 만들어보겠습니다.

\`\`\`python
from functools import total_ordering


@total_ordering
class Product:
    def __init__(self, product_id: str, name: str, price: int) -> None:
        self.product_id = product_id
        self.name = name
        self.price = price

    def __repr__(self) -> str:
        return (
            f"Product(product_id={self.product_id!r}, "
            f"name={self.name!r}, price={self.price!r})"
        )

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Product):
            return NotImplemented
        return self.product_id == other.product_id

    def __lt__(self, other: object) -> bool:
        if not isinstance(other, Product):
            return NotImplemented
        return self.price < other.price


products = [
    Product("P003", "모니터", 200000),
    Product("P001", "키보드", 30000),
    Product("P002", "마우스", 15000),
]

print(sorted(products))
\`\`\`

실행 결과는 가격 오름차순입니다.

\`\`\`text
[Product(product_id='P002', name='마우스', price=15000), Product(product_id='P001', name='키보드', price=30000), Product(product_id='P003', name='모니터', price=200000)]
\`\`\`

이 예제에서는 동일성은 \`product_id\`로 판단하고, 정렬은 \`price\`로 판단합니다. 이런 설계가 항상 좋은 것은 아닙니다. 동일성 기준과 정렬 기준이 다르면 혼란이 생길 수 있기 때문입니다.

더 명확한 방식은 객체 자체에 기본 정렬 기준을 넣지 않고, 정렬할 때 \`key\`를 사용하는 것입니다.

\`\`\`python
sorted(products, key=lambda product: product.price)
sorted(products, key=lambda product: product.name)
sorted(products, key=lambda product: product.product_id)
\`\`\`

실무에서는 정렬 기준이 상황마다 달라지는 경우가 많으므로 \`key\`를 사용하는 편이 더 명확할 때가 많습니다.

---

## 8.8.2 리스트처럼 동작하는 장바구니 객체 만들기

장바구니는 여러 상품을 담는 객체이므로 컨테이너처럼 동작하는 것이 자연스럽습니다.

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
        self._items.append(product)

    def remove(self, product_name: str) -> None:
        for index, product in enumerate(self._items):
            if product.name == product_name:
                self._items.pop(index)
                return
        raise ValueError(f"장바구니에 상품이 없습니다: {product_name}")

    def __len__(self) -> int:
        return len(self._items)

    def __iter__(self):
        return iter(self._items)

    def __getitem__(self, index: int | slice):
        return self._items[index]

    def __contains__(self, product_name: str) -> bool:
        return any(product.name == product_name for product in self._items)

    def __repr__(self) -> str:
        return f"Cart(items={self._items!r})"

    @property
    def total_price(self) -> int:
        return sum(product.price for product in self._items)


cart = Cart()
cart.add(Product("키보드", 30000))
cart.add(Product("마우스", 15000))

print(cart)
print(len(cart))
print(cart[0])
print("키보드" in cart)
print(cart.total_price)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
Cart(items=[Product(name='키보드', price=30000), Product(name='마우스', price=15000)])
2
Product(name='키보드', price=30000)
True
45000
\`\`\`

이 클래스는 내부 리스트를 그대로 외부에 공개하지 않으면서도 리스트와 비슷한 사용성을 제공합니다.

---

## 8.8.3 함수처럼 동작하는 데이터 변환기 만들기

데이터분석 과정으로 넘어가기 전에 자주 하게 될 작업 중 하나가 데이터 정리입니다. 다음은 문자열 값을 정리하는 변환기입니다.

\`\`\`python
class ColumnCleaner:
    def __init__(self, *, default: str = "", lowercase: bool = False) -> None:
        self.default = default
        self.lowercase = lowercase

    def __call__(self, value: object) -> str:
        if value is None:
            return self.default

        text = str(value).strip()
        if not text:
            return self.default

        if self.lowercase:
            text = text.lower()

        return text


clean_email = ColumnCleaner(default="unknown@example.com", lowercase=True)

emails = [" USER@EXAMPLE.COM ", "", None, "admin@test.com"]
cleaned = [clean_email(email) for email in emails]

print(cleaned)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
['user@example.com', 'unknown@example.com', 'unknown@example.com', 'admin@test.com']
\`\`\`

이 구조는 나중에 pandas의 \`apply()\` 같은 메서드와도 잘 어울립니다.

\`\`\`python
# 이후 데이터분석 과정에서 이런 식으로 연결할 수 있습니다.
# df["email"] = df["email"].apply(clean_email)
\`\`\`

---

## 8.8.4 API 응답 객체 설계하기

API 응답은 보통 딕셔너리로 다룰 수 있지만, 응답 구조를 객체로 감싸면 더 명확하게 사용할 수 있습니다.

\`\`\`python
class ApiResponse:
    def __init__(self, data: dict[str, object]) -> None:
        self._data = data

    def __getitem__(self, key: str) -> object:
        return self._data[key]

    def __contains__(self, key: str) -> bool:
        return key in self._data

    def __repr__(self) -> str:
        return f"ApiResponse(data={self._data!r})"

    def get(self, key: str, default: object = None) -> object:
        return self._data.get(key, default)

    @property
    def ok(self) -> bool:
        return bool(self._data.get("success", False))


response = ApiResponse({
    "success": True,
    "user": {"id": 1, "name": "홍길동"},
})

print(response.ok)
print("user" in response)
print(response["user"])
print(response.get("message", "메시지 없음"))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
True
{'id': 1, 'name': '홍길동'}
메시지 없음
\`\`\`

이 예제에서는 대괄호 접근과 \`in\` 연산을 지원합니다. 하지만 모든 딕셔너리 기능을 그대로 따라 할 필요는 없습니다. 필요한 기능만 명확하게 제공하는 것이 더 좋습니다.

---

## 8.8.5 데이터 모델과 데이터분석의 연결

데이터분석 과정에서는 pandas, NumPy 같은 라이브러리를 많이 사용하게 됩니다. 이런 라이브러리의 객체들도 파이썬 데이터 모델을 적극적으로 활용합니다.

예를 들어 DataFrame은 다음과 같은 문법을 지원합니다.

\`\`\`python
# 이후 과정에서 배우게 될 형태입니다.
df["컬럼명"]
len(df)
for column in df:
    ...
\`\`\`

이런 문법을 처음 보면 pandas만의 특수한 문법처럼 보일 수 있습니다. 하지만 사실은 파이썬 데이터 모델 위에서 만들어진 객체 사용 방식입니다.

고급 파이썬에서 데이터 모델을 이해해두면, 이후 데이터분석 수업에서 라이브러리 객체의 동작을 더 쉽게 이해할 수 있습니다.

\`\`\`text
대괄호 접근은 __getitem__과 관련 있다.
len()은 __len__과 관련 있다.
반복은 __iter__와 관련 있다.
출력 표현은 __repr__과 관련 있다.
\`\`\`

이 관점이 생기면 pandas나 NumPy 객체도 단순히 외워서 쓰는 것이 아니라, 파이썬 객체로서 이해할 수 있습니다.

---

## 8.9 데이터 모델 사용 시 주의사항

데이터 모델은 파이썬을 강력하게 만드는 핵심 기능이지만, 무조건 많이 사용할수록 좋은 것은 아닙니다.

---

## 8.9.1 의미가 자연스러울 때만 사용하기

특수 메서드는 파이썬 문법과 연결되기 때문에, 읽는 사람이 직관적으로 의미를 예상할 수 있어야 합니다.

자연스러운 예:

\`\`\`python
len(cart)
product in cart
money1 + money2
user.name
\`\`\`

어색한 예:

\`\`\`python
customer + report
config[3]
order * user
\`\`\`

문법은 짧지만 의미가 불분명하다면 좋은 코드가 아닙니다.

---

## 8.9.2 내부 자료구조를 그대로 노출하지 않기

컨테이너 객체를 만들 때 내부 리스트를 그대로 반환하면 외부에서 마음대로 수정할 수 있습니다.

\`\`\`python
class Cart:
    def __init__(self) -> None:
        self.items = []
\`\`\`

이렇게 작성하면 외부 코드가 직접 내부 리스트를 수정할 수 있습니다.

\`\`\`python
cart.items.append("잘못된 값")
cart.items.clear()
\`\`\`

안전하게 만들려면 내부 자료구조는 \`_items\`처럼 숨기고, 필요한 기능만 메서드나 특수 메서드로 제공하는 것이 좋습니다.

\`\`\`python
class Cart:
    def __init__(self) -> None:
        self._items = []

    def add(self, product: Product) -> None:
        self._items.append(product)
\`\`\`

---

## 8.9.3 디버깅을 위해 \`__repr__\`을 적극 활용하기

실무 코드에서는 객체 상태를 확인해야 하는 일이 많습니다. \`__repr__\`이 없으면 로그나 테스트 결과가 불친절해집니다.

\`\`\`text
<__main__.Product object at 0x...>
\`\`\`

이런 출력보다 다음이 훨씬 유용합니다.

\`\`\`text
Product(name='키보드', price=30000)
\`\`\`

복잡한 클래스를 만들 때는 \`__repr__\`부터 정의하는 습관을 들이면 좋습니다.

---

## 8.9.4 비교와 해시를 함께 생각하기

\`__eq__\`를 정의하면 객체의 동일성 기준이 바뀝니다. 이때 객체를 집합의 원소나 딕셔너리의 key로 사용할 계획이 있다면 \`__hash__\`도 함께 생각해야 합니다.

이 장에서는 \`__hash__\`를 깊게 다루지 않지만, 기본 원칙은 다음과 같습니다.

\`\`\`text
서로 같다고 판단되는 객체는 같은 해시값을 가져야 한다.
객체가 가변이면 해시 가능한 key로 쓰지 않는 것이 안전하다.
\`\`\`

예를 들어 상품 ID가 같으면 같은 상품이라고 판단한다면 해시도 상품 ID를 기준으로 만들어야 합니다. 하지만 객체의 상품 ID가 나중에 바뀔 수 있다면 딕셔너리 key로 쓰기 위험합니다.

고급 과정에서는 우선 다음 정도만 기억하면 충분합니다.

\`\`\`text
__eq__를 정의한 객체를 set이나 dict key로 쓰기 전에 __hash__ 문제를 확인한다.
가변 객체는 해시 가능한 key로 만들지 않는 편이 안전하다.
\`\`\`

---

## 8.9.5 \`dataclass\`와 데이터 모델

\`dataclass\`는 데이터 모델과 밀접한 관계가 있습니다. \`@dataclass\`는 사용자가 필드를 정의하면 \`__init__\`, \`__repr__\`, \`__eq__\` 같은 특수 메서드를 자동으로 만들어줍니다.

\`\`\`python
from dataclasses import dataclass


@dataclass
class Product:
    name: str
    price: int


p1 = Product("키보드", 30000)
p2 = Product("키보드", 30000)

print(p1)
print(p1 == p2)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
Product(name='키보드', price=30000)
True
\`\`\`

직접 \`__repr__\`과 \`__eq__\`를 정의하지 않았지만 자동으로 생성되었습니다. 단순히 데이터를 담는 클래스라면 \`dataclass\`를 적극적으로 고려할 수 있습니다.

다만 도메인 규칙이 많거나, 비교 기준을 특별히 정해야 하거나, 내부 상태를 강하게 보호해야 한다면 직접 클래스를 설계하는 편이 더 적절할 수 있습니다.

---

## 8.10 핵심 정리

이번 장에서는 파이썬 데이터 모델을 살펴보았습니다.

핵심은 다음과 같습니다.

- 파이썬 데이터 모델은 객체와 파이썬 문법을 연결하는 규칙이다.
- 특수 메서드는 이름 앞뒤에 밑줄 두 개가 붙은 메서드다.
- \`print(obj)\`와 \`str(obj)\`는 \`__str__\`과 연결된다.
- \`repr(obj)\`와 리스트 내부 출력은 \`__repr__\`과 연결된다.
- 객체 비교는 \`__eq__\`, \`__lt__\` 같은 비교 메서드로 제어할 수 있다.
- \`len(obj)\`는 \`__len__\`과 연결된다.
- \`obj[key]\`는 \`__getitem__\`과 연결된다.
- \`value in obj\`는 \`__contains__\`와 연결된다.
- \`for value in obj\`는 \`__iter__\`와 연결된다.
- \`obj()\`는 \`__call__\`과 연결된다.
- \`__getattr__\`, \`__getattribute__\`, \`__setattr__\`은 속성 접근을 제어한다.
- 특수 메서드는 의미가 자연스러운 경우에만 사용하는 것이 좋다.
- \`dataclass\`는 여러 특수 메서드를 자동으로 생성해주는 도구다.

데이터 모델을 이해하면 직접 만든 객체를 파이썬의 기본 문법과 자연스럽게 연결할 수 있습니다. 이것은 단순한 문법 확장이 아니라, 더 읽기 쉽고 파이썬다운 코드를 만드는 방법입니다.

---

# 연습문제

## 문제 1. 개념 확인

다음 설명 중 맞으면 O, 틀리면 X를 표시하세요.

1. \`len(obj)\`는 객체의 \`__len__\` 메서드와 관련이 있다.
2. \`__str__\`은 주로 개발자 디버깅용 표현을 만들 때 사용한다.
3. \`__repr__\`은 객체의 내부 상태를 확인하기 좋은 표현을 제공하는 것이 좋다.
4. \`obj()\`처럼 객체를 함수처럼 호출하려면 \`__call__\`을 정의할 수 있다.
5. 모든 클래스에는 가능한 한 많은 특수 메서드를 정의하는 것이 좋다.

---

## 문제 2. 실행 결과 예측

다음 코드의 실행 결과를 예측하세요.

\`\`\`python
class User:
    def __init__(self, name: str) -> None:
        self.name = name

    def __str__(self) -> str:
        return f"사용자: {self.name}"

    def __repr__(self) -> str:
        return f"User(name={self.name!r})"


user = User("홍길동")

print(user)
print(repr(user))
print([user])
\`\`\`

---

## 문제 3. 코드 작성

다음 조건을 만족하는 \`Book\` 클래스를 작성하세요.

- \`title\`, \`author\`, \`price\`를 인스턴스 변수로 가진다.
- \`print(book)\`을 실행하면 \`책제목 - 저자\` 형식으로 출력된다.
- \`repr(book)\`을 실행하면 \`Book(title='...', author='...', price=...)\` 형식으로 출력된다.

---

## 문제 4. 비교 메서드 작성

다음 조건을 만족하도록 \`Product\` 클래스를 작성하세요.

- \`name\`, \`price\`를 인스턴스 변수로 가진다.
- \`==\` 비교는 이름과 가격이 모두 같을 때 \`True\`가 되게 한다.
- \`<\` 비교는 가격을 기준으로 한다.
- \`sorted(products)\`로 가격 오름차순 정렬이 가능해야 한다.

---

## 문제 5. 컨테이너 객체 만들기

다음 조건을 만족하는 \`TodoList\` 클래스를 작성하세요.

- 내부에 할 일 목록을 저장한다.
- \`add(todo)\`로 할 일을 추가한다.
- \`len(todo_list)\`로 할 일 개수를 확인할 수 있다.
- \`todo_list[0]\`처럼 인덱스로 할 일을 조회할 수 있다.
- \`"공부" in todo_list\`처럼 포함 여부를 확인할 수 있다.
- \`for todo in todo_list\`로 반복할 수 있다.

---

## 문제 6. 호출 가능한 객체 만들기

다음 조건을 만족하는 \`MinLengthValidator\` 클래스를 작성하세요.

- 생성자에서 최소 길이를 받는다.
- 객체를 함수처럼 호출할 수 있다.
- 호출 시 문자열을 받아 길이가 최소 길이 이상이면 \`True\`, 아니면 \`False\`를 반환한다.

사용 예시는 다음과 같습니다.

\`\`\`python
validator = MinLengthValidator(5)

print(validator("python"))
print(validator("py"))
\`\`\`

예상 결과는 다음과 같습니다.

\`\`\`text
True
False
\`\`\`

---

## 문제 7. 오류 수정

다음 코드는 \`len(obj)\`가 10을 출력하기를 기대하고 작성한 코드입니다. 하지만 실제로는 오류가 발생합니다. 이유를 설명하고 코드를 수정하세요.

\`\`\`python
class Sample:
    pass


obj = Sample()
obj.__len__ = lambda: 10

print(len(obj))
\`\`\`

---

## 문제 8. 설계 판단

다음 상황에서 특수 메서드를 사용하는 것이 적절한지 판단하고 이유를 적어보세요.

1. 장바구니 객체에 \`len(cart)\`를 사용할 수 있게 한다.
2. 보고서 생성 객체에 \`report_generator()\`를 호출하면 보고서가 생성되게 한다.
3. 금액 객체끼리 \`money1 + money2\`를 사용할 수 있게 한다.
4. 고객 객체와 상품 객체를 \`customer + product\`로 더하면 주문이 생성되게 한다.

---

# 정답 및 해설

## 문제 1 정답

1. O
2. X
3. O
4. O
5. X

해설:

\`__str__\`은 사용자에게 읽기 좋은 표현을 만들 때 주로 사용합니다. 개발자 디버깅용 표현은 \`__repr__\`이 담당하는 것이 일반적입니다. 특수 메서드는 강력하지만, 의미가 자연스러운 경우에만 정의하는 것이 좋습니다.

---

## 문제 2 정답

실행 결과는 다음과 같습니다.

\`\`\`text
사용자: 홍길동
User(name='홍길동')
[User(name='홍길동')]
\`\`\`

해설:

\`print(user)\`는 \`__str__\`을 사용합니다. \`repr(user)\`는 \`__repr__\`을 사용합니다. 리스트 안의 객체를 출력할 때는 요소의 \`__repr__\`을 사용합니다.

---

## 문제 3 정답 예시

\`\`\`python
class Book:
    def __init__(self, title: str, author: str, price: int) -> None:
        self.title = title
        self.author = author
        self.price = price

    def __str__(self) -> str:
        return f"{self.title} - {self.author}"

    def __repr__(self) -> str:
        return (
            f"Book(title={self.title!r}, "
            f"author={self.author!r}, price={self.price!r})"
        )


book = Book("파이썬 데이터 모델", "홍길동", 25000)

print(book)
print(repr(book))
\`\`\`

---

## 문제 4 정답 예시

\`\`\`python
class Product:
    def __init__(self, name: str, price: int) -> None:
        self.name = name
        self.price = price

    def __repr__(self) -> str:
        return f"Product(name={self.name!r}, price={self.price!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Product):
            return NotImplemented
        return self.name == other.name and self.price == other.price

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

해설:

\`sorted()\`는 객체를 정렬하기 위해 크기 비교를 해야 합니다. \`__lt__\`를 정의하면 가격 기준으로 정렬할 수 있습니다.

---

## 문제 5 정답 예시

\`\`\`python
class TodoList:
    def __init__(self) -> None:
        self._todos: list[str] = []

    def add(self, todo: str) -> None:
        self._todos.append(todo)

    def __len__(self) -> int:
        return len(self._todos)

    def __getitem__(self, index: int) -> str:
        return self._todos[index]

    def __contains__(self, todo: str) -> bool:
        return todo in self._todos

    def __iter__(self):
        return iter(self._todos)


todo_list = TodoList()
todo_list.add("공부")
todo_list.add("운동")

print(len(todo_list))
print(todo_list[0])
print("공부" in todo_list)

for todo in todo_list:
    print(todo)
\`\`\`

---

## 문제 6 정답 예시

\`\`\`python
class MinLengthValidator:
    def __init__(self, min_length: int) -> None:
        self.min_length = min_length

    def __call__(self, text: str) -> bool:
        return len(text) >= self.min_length


validator = MinLengthValidator(5)

print(validator("python"))
print(validator("py"))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
False
\`\`\`

---

## 문제 7 정답 예시

이 코드는 인스턴스에 \`__len__\` 속성을 나중에 붙였습니다. 하지만 \`len(obj)\`는 특수 메서드를 인스턴스 속성에서 찾는 방식으로 동작하지 않습니다. 특수 메서드는 클래스에 정의해야 합니다.

수정 코드는 다음과 같습니다.

\`\`\`python
class Sample:
    def __len__(self) -> int:
        return 10


obj = Sample()

print(len(obj))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
10
\`\`\`

---

## 문제 8 정답 예시

1. 적절합니다. 장바구니는 여러 상품을 담는 컨테이너이므로 \`len(cart)\`는 자연스럽습니다.
2. 상황에 따라 다릅니다. 보고서 생성이라는 의미가 \`report_generator()\`만 보고 명확하지 않다면 \`report_generator.generate()\`가 더 좋습니다.
3. 적절합니다. 금액끼리 더하는 것은 도메인 의미가 자연스럽습니다.
4. 부적절한 편입니다. 고객과 상품을 더해서 주문을 만든다는 의미는 직관적이지 않습니다. \`Order.create(customer, product)\` 또는 \`customer.order(product)\` 같은 명시적인 표현이 더 낫습니다.

---

# 마무리

이번 장에서는 파이썬 객체가 언어 문법과 연결되는 방식을 배웠습니다. 데이터 모델을 이해하면 직접 만든 클래스도 리스트처럼, 딕셔너리처럼, 함수처럼, 숫자처럼 동작하게 만들 수 있습니다.

하지만 중요한 것은 “무엇이든 특수 메서드로 만들 수 있다”가 아닙니다. 더 중요한 기준은 **그 문법이 읽는 사람에게 자연스러운가**입니다.

다음 장에서는 타입 힌트 심화를 다룹니다. 데이터 모델이 파이썬 객체의 동작을 설명한다면, 타입 힌트는 객체와 함수의 사용 방식을 코드에 더 명확하게 표시하는 도구입니다. 제네릭, \`TypedDict\`, \`Protocol\` 같은 개념을 배우면 데이터 처리 코드의 입력과 출력을 더 안정적으로 설계할 수 있습니다.

---

# 참고 문서

- Python Documentation: Data model
- Python Documentation: functools
- Python Documentation: dataclasses

`;export{e as default};