var e=`<!-- 원본: python_advanced_chapter_8_book.md / 세부 장: 8-10 -->

# 8.10 핵심 정리

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