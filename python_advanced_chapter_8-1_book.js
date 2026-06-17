var e=`<!-- 원본: python_advanced_chapter_8_book.md / 세부 장: 8-1 -->

# 8.1 데이터 모델이란?

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
`;export{e as default};