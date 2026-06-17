var e=`<!-- 원본: python_advanced_chapter_8_book.md / 세부 장: 8-5 -->

# 8.5 숫자처럼 동작하는 객체

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
`;export{e as default};