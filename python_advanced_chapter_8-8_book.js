var e=`<!-- 원본: python_advanced_chapter_8_book.md / 세부 장: 8-8 -->

# 8.8 실무 활용

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
`;export{e as default};