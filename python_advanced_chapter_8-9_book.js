var e=`<!-- 원본: python_advanced_chapter_8_book.md / 세부 장: 8-9 -->

# 8.9 데이터 모델 사용 시 주의사항

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
`;export{e as default};