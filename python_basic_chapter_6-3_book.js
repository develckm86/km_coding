var e=`<!-- 원본: python_basic_chapter_6_book.md / 세부 장: 6-3 -->

# 6.3 예외 처리 실무 패턴

## 예외를 무조건 숨기면 안 되는 이유

예외 처리를 처음 배우면 모든 코드를 \`try-except\`로 감싸고 싶어질 수 있다.

\`\`\`python
try:
    # 많은 코드
    pass
except:
    pass
\`\`\`

하지만 이런 코드는 위험하다. 에러가 발생해도 아무 일도 하지 않기 때문에 문제가 사라진 것처럼 보인다. 실제로는 문제가 해결된 것이 아니라 감춰진 것이다.

다음 코드를 보자.

\`\`\`python
def calculate_total(price, quantity):
    try:
        return price * quantity
    except:
        return 0


print(calculate_total(10000, 3))
print(calculate_total("10000", 3))
\`\`\`

두 번째 호출은 사실 의도와 다르게 동작할 수 있다. 문자열과 정수를 곱하면 문자열 반복이 된다.

\`\`\`python
"10000" * 3
\`\`\`

결과는 다음과 같다.

\`\`\`text
100001000010000
\`\`\`

이 경우에는 에러가 발생하지 않기 때문에 \`except\`로도 잡히지 않는다. 더 큰 문제는 코드가 잘못된 값으로 계속 진행될 수 있다는 점이다.

또 다른 예를 보자.

\`\`\`python
def get_grade(customer):
    try:
        return customer["grade"]
    except:
        return "일반"
\`\`\`

이 함수는 \`grade\`가 없을 때 기본값을 반환하려는 의도일 수 있다. 하지만 \`customer\`가 딕셔너리가 아니라 문자열이어도 같은 방식으로 처리될 수 있다. 그러면 데이터 구조가 잘못되었다는 중요한 문제를 놓칠 수 있다.

더 나은 코드는 예상되는 예외만 처리하는 것이다.

\`\`\`python
def get_grade(customer):
    try:
        return customer["grade"]
    except KeyError:
        return "일반"
\`\`\`

이 코드는 \`grade\` key가 없을 때만 기본값을 반환한다. 그 외의 문제는 숨기지 않는다.

## \`except: pass\`를 조심하자

다음 코드는 특히 주의해야 한다.

\`\`\`python
try:
    number = int(value)
except:
    pass
\`\`\`

\`pass\`는 아무것도 하지 않는 코드이다. 즉, 에러가 발생해도 아무 메시지도 없고, 어떤 처리도 하지 않는다.

이런 코드는 문제를 찾기 어렵게 만든다. 프로그램이 왜 원하는 대로 동작하지 않는지 알 수 없기 때문이다.

정말 아무것도 하지 않아도 되는 특별한 상황이 아니라면, 최소한 메시지나 로그를 남기는 것이 좋다.

\`\`\`python
try:
    number = int(value)
except ValueError as error:
    print("숫자 변환 실패:", error)
\`\`\`

실무에서는 단순 출력 대신 로그를 남기는 경우가 많다. 로그는 12장에서 자세히 배운다.

## 예외 처리의 적절한 범위

\`try\` 블록에는 가능한 한 실패할 수 있는 코드만 넣는 것이 좋다.

좋지 않은 예를 보자.

\`\`\`python
try:
    value = input("숫자를 입력하세요: ")
    number = int(value)
    result = number * 10
    message = f"결과는 {result}입니다."
    print(message)
except ValueError:
    print("숫자를 입력해야 합니다.")
\`\`\`

이 코드도 동작하지만, \`try\` 안에 많은 코드가 들어 있다. 현재 실제로 \`ValueError\`가 발생할 가능성이 큰 코드는 \`int(value)\`이다.

조금 더 명확하게 작성하면 다음과 같다.

\`\`\`python
value = input("숫자를 입력하세요: ")

try:
    number = int(value)
except ValueError:
    print("숫자를 입력해야 합니다.")
else:
    result = number * 10
    message = f"결과는 {result}입니다."
    print(message)
\`\`\`

이렇게 작성하면 실패할 수 있는 부분과 성공 후 처리할 부분이 분리된다.

---

## 기본값으로 대체하기

실무에서는 데이터가 항상 완벽하지 않다. 어떤 고객은 이메일이 없을 수 있고, 어떤 상품은 할인율 정보가 없을 수 있다. 이런 경우 에러를 발생시키는 대신 기본값으로 처리할 수 있다.

## 딕셔너리에 없는 값 기본 처리

다음 딕셔너리를 보자.

\`\`\`python
customer = {
    "name": "홍길동",
    "grade": "VIP"
}
\`\`\`

이 고객에게 이메일 정보가 없을 수 있다. 이때 다음처럼 접근하면 \`KeyError\`가 발생한다.

\`\`\`python
email = customer["email"]
\`\`\`

안전하게 처리하려면 \`get()\`을 사용할 수 있다.

\`\`\`python
email = customer.get("email", "이메일 없음")
print(email)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
이메일 없음
\`\`\`

이 경우에는 굳이 \`try-except\`를 사용하지 않아도 된다. 딕셔너리의 없는 key는 \`get()\`으로 처리하는 편이 더 간단하고 명확할 수 있다.

## 숫자 변환 실패 시 기본값 사용

사용자 입력값이나 외부 데이터는 문자열로 들어오는 경우가 많다.

\`\`\`python
price_text = "15,000"
\`\`\`

이 문자열은 바로 정수로 변환할 수 없다.

\`\`\`python
int(price_text)
\`\`\`

쉼표가 들어 있기 때문이다. 먼저 쉼표를 제거해야 한다.

\`\`\`python
price = int(price_text.replace(",", ""))
\`\`\`

하지만 값이 비어 있거나 잘못된 문자열이면 여전히 에러가 발생할 수 있다. 안전한 변환 함수를 만들어 보자.

\`\`\`python
def to_int(value, default=0):
    try:
        return int(value)
    except ValueError:
        return default


print(to_int("100"))
print(to_int("abc"))
print(to_int("abc", default=-1))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
100
0
-1
\`\`\`

이 함수는 변환에 실패하면 기본값을 반환한다.

쉼표가 있는 금액 문자열까지 처리하려면 다음처럼 만들 수 있다.

\`\`\`python
def to_price(value, default=0):
    try:
        cleaned_value = value.replace(",", "")
        return int(cleaned_value)
    except ValueError:
        return default


print(to_price("15,000"))
print(to_price("가격없음"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
15000
0
\`\`\`

## 빈 리스트의 평균 처리

평균을 구하는 함수는 리스트가 비어 있을 때 문제가 생길 수 있다.

\`\`\`python
def average(numbers):
    return sum(numbers) / len(numbers)
\`\`\`

빈 리스트를 전달하면 0으로 나누는 에러가 발생한다.

\`\`\`python
average([])
\`\`\`

이런 경우 기본값을 정할 수 있다.

\`\`\`python
def average(numbers):
    if len(numbers) == 0:
        return 0
    return sum(numbers) / len(numbers)
\`\`\`

이 코드는 예외 처리를 사용하지 않는다. 예외가 발생하기 전에 조건문으로 미리 막는다. 모든 문제를 \`try-except\`로 처리할 필요는 없다. 조건문으로 자연스럽게 처리할 수 있는 경우에는 조건문을 사용하는 편이 좋다.

## 예외 처리와 조건문의 관계

예외 처리와 조건문은 모두 문제 상황을 다룰 수 있다. 하지만 사용하는 상황이 다르다.

조건문은 예상 가능한 상태를 검사할 때 사용한다.

\`\`\`python
if len(numbers) == 0:
    return 0
\`\`\`

예외 처리는 실행해 보기 전에는 실패 여부를 확실히 알기 어렵거나, 실패 가능성이 있는 작업을 안전하게 처리할 때 사용한다.

\`\`\`python
try:
    number = int(value)
except ValueError:
    return 0
\`\`\`

초보 단계에서는 다음 기준을 기억하면 좋다.

\`\`\`text
미리 쉽게 확인할 수 있으면 조건문을 사용한다.
실행 과정에서 실패할 수 있으면 예외 처리를 사용한다.
\`\`\`

---

## 사용자용 에러와 개발자용 에러

프로그램에서 에러가 발생했을 때, 모든 정보를 사용자에게 그대로 보여주는 것은 좋지 않다. 사용자는 \`ValueError\`, \`Traceback\`, \`KeyError\` 같은 메시지를 보고 무엇을 해야 할지 알기 어렵다.

사용자에게는 이해하기 쉬운 메시지를 보여주는 것이 좋다.

\`\`\`text
나이는 숫자로 입력해 주세요.
\`\`\`

반면 개발자는 원인을 파악할 수 있는 자세한 정보가 필요하다.

\`\`\`text
ValueError: invalid literal for int() with base 10: '스무살'
\`\`\`

따라서 실무에서는 사용자용 메시지와 개발자용 메시지를 구분하는 것이 중요하다.

## 사용자에게 보여줄 메시지

사용자용 메시지는 다음 기준을 만족하는 것이 좋다.

- 무엇이 잘못되었는지 알려준다.
- 어떻게 고치면 되는지 알려준다.
- 너무 기술적인 표현을 피한다.
- 사용자를 탓하는 표현을 피한다.

예를 들어 다음 메시지는 초보 사용자에게 불친절하다.

\`\`\`text
ValueError 발생
\`\`\`

조금 더 좋은 메시지는 다음과 같다.

\`\`\`text
나이는 숫자로 입력해 주세요.
\`\`\`

더 친절하게 쓰면 다음과 같다.

\`\`\`text
나이는 숫자로 입력해야 합니다. 예: 20
\`\`\`

## 개발자가 확인할 메시지

개발자는 실제 에러 원인을 확인해야 한다. 이때 예외 객체를 활용할 수 있다.

\`\`\`python
value = "스무살"

try:
    age = int(value)
except ValueError as error:
    print("사용자 메시지: 나이는 숫자로 입력해 주세요.")
    print("개발자 메시지:", error)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
사용자 메시지: 나이는 숫자로 입력해 주세요.
개발자 메시지: invalid literal for int() with base 10: '스무살'
\`\`\`

실무에서는 개발자 메시지를 화면에 직접 출력하기보다 로그 파일에 남기는 경우가 많다. 로그는 프로그램이 실행되는 동안 발생한 일들을 기록하는 방식이다. 자세한 내용은 12장에서 다룬다.

## 입력값 검증 함수 만들기

예외 처리는 함수로 분리하면 더 깔끔해진다.

\`\`\`python
def parse_age(value):
    try:
        return int(value)
    except ValueError:
        return None


age = parse_age("스무살")

if age is None:
    print("나이는 숫자로 입력해 주세요.")
else:
    print("입력한 나이:", age)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
나이는 숫자로 입력해 주세요.
\`\`\`

이 함수는 문자열을 나이로 변환하려고 시도한다. 성공하면 정수를 반환하고, 실패하면 \`None\`을 반환한다. 호출하는 쪽에서는 반환값이 \`None\`인지 확인해서 사용자에게 적절한 메시지를 보여줄 수 있다.

---

## 재시도 로직 기초

실패할 수 있는 작업 중에는 다시 시도하면 성공할 수 있는 작업도 있다. 예를 들어 사용자가 숫자를 잘못 입력했다면 다시 입력받으면 된다. 외부 API 요청도 일시적인 네트워크 문제 때문에 실패했다가 다시 시도하면 성공할 수 있다.

이번 장에서는 아직 네트워크 요청을 배우지 않았으므로, 사용자 입력을 예로 재시도 로직을 살펴보자.

## 숫자를 입력할 때까지 반복하기

다음 코드는 사용자가 올바른 숫자를 입력할 때까지 계속 입력을 요청한다.

\`\`\`python
while True:
    value = input("숫자를 입력하세요: ")

    try:
        number = int(value)
        break
    except ValueError:
        print("숫자로 입력해 주세요.")

print("입력한 숫자:", number)
\`\`\`

실행 흐름은 다음과 같다.

\`\`\`text
1. 값을 입력받는다.
2. 정수로 변환을 시도한다.
3. 성공하면 반복문을 종료한다.
4. 실패하면 안내 메시지를 출력하고 다시 입력받는다.
\`\`\`

이 코드는 사용자 입력을 다룰 때 자주 사용하는 패턴이다.

## 재시도 횟수 제한하기

무한히 다시 시도하는 것이 항상 좋은 것은 아니다. 경우에 따라 재시도 횟수를 제한해야 한다.

\`\`\`python
max_attempts = 3
attempt = 0
number = None

while attempt < max_attempts:
    value = input("숫자를 입력하세요: ")

    try:
        number = int(value)
        break
    except ValueError:
        attempt += 1
        print("숫자로 입력해 주세요.")

if number is None:
    print("입력 횟수를 초과했습니다.")
else:
    print("입력한 숫자:", number)
\`\`\`

이 코드는 최대 3번까지 입력을 다시 받을 수 있다. 3번 모두 실패하면 더 이상 입력을 받지 않고 종료 메시지를 출력한다.

## 재시도 로직을 함수로 분리하기

같은 입력 검증을 여러 곳에서 사용한다면 함수로 분리하는 것이 좋다.

\`\`\`python
def input_int(message, max_attempts=3):
    attempt = 0

    while attempt < max_attempts:
        value = input(message)

        try:
            return int(value)
        except ValueError:
            attempt += 1
            print("숫자로 입력해 주세요.")

    return None


age = input_int("나이를 입력하세요: ")

if age is None:
    print("나이를 입력하지 못했습니다.")
else:
    print("입력한 나이:", age)
\`\`\`

이 함수는 정수 입력을 안전하게 받는다. 입력에 성공하면 정수를 반환하고, 정해진 횟수 안에 성공하지 못하면 \`None\`을 반환한다.

## 재시도 로직에서 주의할 점

재시도 로직을 만들 때는 다음을 생각해야 한다.

\`\`\`text
몇 번까지 다시 시도할 것인가?
실패할 때 어떤 메시지를 보여줄 것인가?
계속 실패하면 어떤 값을 반환하거나 어떤 동작을 할 것인가?
성공하면 어디서 반복을 멈출 것인가?
\`\`\`

재시도는 좋은 방법이지만 무한 반복이 되지 않도록 조심해야 한다.

---

## 실무 예제: 안전한 주문 금액 계산

이번에는 지금까지 배운 내용을 이용해 안전한 주문 금액 계산 코드를 만들어 보자.

요구사항은 다음과 같다.

\`\`\`text
1. 가격과 수량을 문자열로 받는다.
2. 가격과 수량을 정수로 변환한다.
3. 변환에 실패하면 None을 반환한다.
4. 가격이나 수량이 음수이면 None을 반환한다.
5. 정상 값이면 총 금액을 반환한다.
\`\`\`

먼저 문자열을 정수로 바꾸는 함수를 만든다.

\`\`\`python
def to_int(value):
    try:
        return int(value)
    except ValueError:
        return None
\`\`\`

이제 주문 금액 계산 함수를 만든다.

\`\`\`python
def calculate_order_total(price_text, quantity_text):
    price = to_int(price_text)
    quantity = to_int(quantity_text)

    if price is None or quantity is None:
        return None

    if price < 0 or quantity < 0:
        return None

    return price * quantity
\`\`\`

사용해 보자.

\`\`\`python
print(calculate_order_total("10000", "3"))
print(calculate_order_total("가격", "3"))
print(calculate_order_total("10000", "수량"))
print(calculate_order_total("-10000", "3"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
30000
None
None
None
\`\`\`

이 함수는 잘못된 값이 들어왔을 때 프로그램을 멈추지 않는다. 대신 실패를 의미하는 값으로 \`None\`을 반환한다. 호출하는 쪽에서는 \`None\`인지 확인해서 사용자에게 메시지를 보여줄 수 있다.

\`\`\`python
result = calculate_order_total("가격", "3")

if result is None:
    print("가격과 수량은 0 이상의 숫자로 입력해야 합니다.")
else:
    print("총 금액:", result)
\`\`\`

이처럼 예외 처리는 함수, 조건문, 반환값과 함께 사용될 때 더 실무적인 코드가 된다.

---
`;export{e as default};