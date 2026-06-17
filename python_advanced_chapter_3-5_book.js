var e=`<!-- 원본: python_advanced_chapter_3_book.md / 세부 장: 3-5 -->

# 3.5 클로저

클로저는 함수 안에서 만든 내부 함수가 외부 함수의 변수를 기억하는 구조입니다. 클로저는 데코레이터를 이해하는 핵심 개념이기도 합니다.

처음에는 어려워 보일 수 있지만, 차근차근 보면 “설정값을 기억하는 함수”라고 이해할 수 있습니다.

---

### 3.5.1 중첩 함수

먼저 함수 안에 함수를 정의하는 중첩 함수를 보겠습니다.

\`\`\`python
def outer():
    print("outer 함수 실행")

    def inner():
        print("inner 함수 실행")

    inner()

outer()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
outer 함수 실행
inner 함수 실행
\`\`\`

\`inner\` 함수는 \`outer\` 함수 안에서 정의되었습니다. 따라서 기본적으로 \`outer\` 함수 안에서만 사용할 수 있습니다.

---

### 3.5.2 내부 함수를 반환하기

내부 함수를 반환하면 외부에서도 사용할 수 있습니다.

\`\`\`python
def outer():
    def inner():
        print("inner 함수 실행")

    return inner

func = outer()
func()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
inner 함수 실행
\`\`\`

\`outer()\`를 호출하면 \`inner\` 함수가 반환됩니다. 반환된 함수는 \`func\`라는 변수에 저장되고, 이후 \`func()\`로 호출할 수 있습니다.

---

### 3.5.3 외부 함수의 변수 기억하기

클로저의 핵심은 내부 함수가 외부 함수의 변수를 기억한다는 점입니다.

\`\`\`python
def make_multiplier(factor):
    def multiplier(number):
        return number * factor

    return multiplier

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(10))
print(triple(10))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
20
30
\`\`\`

\`make_multiplier(2)\`가 실행된 뒤에는 이미 \`make_multiplier\` 함수 실행이 끝났습니다. 그런데 반환된 \`double\` 함수는 여전히 \`factor\` 값 \`2\`를 기억합니다.

마찬가지로 \`triple\` 함수는 \`factor\` 값 \`3\`을 기억합니다.

이처럼 내부 함수가 외부 함수의 변수를 기억하는 구조가 클로저입니다.

---

### 3.5.4 클로저가 필요한 이유

클로저는 설정값을 기억하는 함수를 만들 때 유용합니다.

예를 들어 할인율을 기억하는 함수를 만들 수 있습니다.

\`\`\`python
def make_discount_calculator(discount_rate):
    def calculate(price):
        return price * (1 - discount_rate)

    return calculate

vip_discount = make_discount_calculator(0.2)
normal_discount = make_discount_calculator(0.05)

print(vip_discount(10000))
print(normal_discount(10000))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
8000.0
9500.0
\`\`\`

할인율을 매번 인자로 전달하지 않아도 됩니다. 할인율을 기억하는 함수를 한 번 만들어두고, 가격만 전달하면 됩니다.

---

### 3.5.5 검증 규칙을 기억하는 함수

클로저를 사용하면 기준값을 기억하는 검증 함수를 만들 수 있습니다.

\`\`\`python
def make_minimum_validator(min_value):
    def validate(value):
        return value >= min_value

    return validate

is_adult = make_minimum_validator(19)
is_free_shipping = make_minimum_validator(30000)

print(is_adult(20))
print(is_adult(15))
print(is_free_shipping(45000))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
False
True
\`\`\`

\`is_adult\`는 최소값 \`19\`를 기억하고, \`is_free_shipping\`은 최소값 \`30000\`을 기억합니다.

---

### 3.5.6 \`nonlocal\`

클로저 내부에서 외부 함수의 변수를 변경하려면 \`nonlocal\`을 사용할 수 있습니다.

\`\`\`python
def make_counter():
    count = 0

    def counter():
        nonlocal count
        count += 1
        return count

    return counter

counter = make_counter()

print(counter())
print(counter())
print(counter())
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1
2
3
\`\`\`

\`counter\` 함수는 \`count\` 값을 기억하고, 호출될 때마다 값을 증가시킵니다.

\`nonlocal\`은 내부 함수에서 외부 함수의 지역 변수를 수정하겠다는 의미입니다. 너무 많이 사용하면 코드 흐름이 복잡해질 수 있으므로 필요한 경우에만 사용하는 것이 좋습니다.

---

### 3.5.7 클로저와 클래스 비교

클로저는 상태를 기억하는 함수를 만들 수 있습니다. 하지만 상태와 동작이 복잡해지면 클래스를 사용하는 편이 더 명확할 수 있습니다.

클로저 방식은 다음과 같습니다.

\`\`\`python
def make_discount_calculator(discount_rate):
    def calculate(price):
        return price * (1 - discount_rate)

    return calculate
\`\`\`

클래스 방식은 다음과 같습니다.

\`\`\`python
class DiscountCalculator:
    def __init__(self, discount_rate):
        self.discount_rate = discount_rate

    def calculate(self, price):
        return price * (1 - self.discount_rate)
\`\`\`

둘 다 할인율을 기억하고 계산할 수 있습니다. 선택 기준은 다음과 같습니다.

- 간단히 설정값 하나를 기억하는 함수가 필요하다면 클로저가 적합합니다.
- 여러 상태와 여러 메서드가 필요하다면 클래스가 적합합니다.
- 협업자가 이해하기 쉬운 구조가 중요하다면 클래스가 더 나을 수 있습니다.
- 데코레이터 구조를 만들 때는 클로저가 자주 사용됩니다.

---
`;export{e as default};