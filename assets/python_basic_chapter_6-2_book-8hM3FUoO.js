var e=`<!-- 원본: python_basic_chapter_6_book.md / 세부 장: 6-2 -->

# 6.2 예외 처리 기본 문법

## \`try-except\`

프로그램을 만들 때 어떤 코드는 실패할 가능성이 있다. 예를 들어 문자열을 숫자로 변환하는 코드를 보자.

\`\`\`python
value = input("숫자를 입력하세요: ")
number = int(value)
print(number)
\`\`\`

사용자가 \`100\`을 입력하면 정상 동작한다. 하지만 \`abc\`를 입력하면 \`ValueError\`가 발생하고 프로그램이 멈춘다.

이처럼 실패할 수 있는 코드를 안전하게 처리하기 위해 사용하는 문법이 \`try-except\`이다.

기본 구조는 다음과 같다.

\`\`\`python
try:
    에러가 발생할 수 있는 코드
except:
    에러가 발생했을 때 실행할 코드
\`\`\`

예제로 확인해 보자.

\`\`\`python
try:
    value = input("숫자를 입력하세요: ")
    number = int(value)
    print(number)
except:
    print("숫자로 변환할 수 없습니다.")
\`\`\`

사용자가 숫자를 입력하면 \`try\` 안의 코드가 정상 실행된다. 사용자가 숫자가 아닌 값을 입력하면 에러가 발생하고, 파이썬은 \`except\` 블록으로 이동한다.

\`\`\`text
숫자로 변환할 수 없습니다.
\`\`\`

\`try-except\`를 사용하면 프로그램이 갑자기 멈추는 대신, 에러 상황에 맞는 처리를 할 수 있다.

## 예외 처리의 흐름

다음 코드를 보자.

\`\`\`python
try:
    print("변환을 시작합니다.")
    number = int("abc")
    print("변환이 완료되었습니다.")
except:
    print("변환 중 문제가 발생했습니다.")

print("프로그램을 종료합니다.")
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
변환을 시작합니다.
변환 중 문제가 발생했습니다.
프로그램을 종료합니다.
\`\`\`

\`number = int("abc")\`에서 에러가 발생했기 때문에 그 아래에 있는 \`print("변환이 완료되었습니다.")\`는 실행되지 않는다. 대신 \`except\` 블록이 실행되고, 그 후 프로그램은 계속 진행된다.

예외 처리는 실패한 코드를 억지로 성공시키는 문법이 아니다. 실패가 발생했을 때 프로그램이 무너지는 대신, 적절한 다음 행동을 정하는 문법이다.

## 아무 예외나 처리하는 방식의 문제

아래처럼 \`except:\`만 쓰면 모든 예외를 잡는다.

\`\`\`python
try:
    number = int("abc")
except:
    print("오류가 발생했습니다.")
\`\`\`

초보 단계에서는 이해하기 쉽지만, 실무에서는 조심해야 한다. 모든 에러를 같은 방식으로 처리하면 진짜 문제를 놓칠 수 있기 때문이다.

예를 들어 다음 코드를 보자.

\`\`\`python
try:
    number = int("100")
    result = number / count
except:
    print("오류가 발생했습니다.")
\`\`\`

이 코드에서 \`count\`라는 변수를 만든 적이 없다면 \`NameError\`가 발생한다. 그런데 \`except:\`가 모든 에러를 잡아 버리면 단순히 \`"오류가 발생했습니다."\`만 출력된다. 그러면 개발자는 실제 문제가 \`count\` 변수가 없다는 사실을 바로 알기 어렵다.

그래서 가능하면 어떤 예외를 처리할지 구체적으로 쓰는 것이 좋다.

---

## 특정 예외 처리

특정 예외만 처리하려면 \`except\` 뒤에 예외 이름을 적는다.

\`\`\`python
try:
    value = input("숫자를 입력하세요: ")
    number = int(value)
    print(number)
except ValueError:
    print("숫자 형식으로 입력해야 합니다.")
\`\`\`

이 코드는 \`ValueError\`만 처리한다. 숫자로 변환할 수 없는 값이 들어왔을 때만 \`except ValueError\` 블록이 실행된다.

특정 예외를 처리하면 코드의 의도가 분명해진다.

\`\`\`text
이 코드는 숫자 변환 실패를 예상하고 있다.
\`\`\`

이처럼 읽을 수 있기 때문이다.

## 여러 예외 처리하기

한 코드에서 여러 종류의 예외가 발생할 수 있다.

다음 코드를 보자.

\`\`\`python
def get_item(items, index_text):
    index = int(index_text)
    return items[index]


products = ["키보드", "마우스", "모니터"]
print(get_item(products, "5"))
\`\`\`

이 함수에서는 두 가지 문제가 생길 수 있다.

첫째, \`index_text\`가 숫자로 바꿀 수 없는 문자열이면 \`ValueError\`가 발생한다.

\`\`\`python
get_item(products, "abc")
\`\`\`

둘째, 숫자로는 바꿀 수 있지만 리스트 범위를 벗어나면 \`IndexError\`가 발생한다.

\`\`\`python
get_item(products, "5")
\`\`\`

이럴 때는 예외를 나누어 처리할 수 있다.

\`\`\`python
def get_item(items, index_text):
    try:
        index = int(index_text)
        return items[index]
    except ValueError:
        return "인덱스는 숫자로 입력해야 합니다."
    except IndexError:
        return "해당 위치의 데이터가 없습니다."


products = ["키보드", "마우스", "모니터"]

print(get_item(products, "abc"))
print(get_item(products, "5"))
print(get_item(products, "1"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
인덱스는 숫자로 입력해야 합니다.
해당 위치의 데이터가 없습니다.
마우스
\`\`\`

예외를 나누어 처리하면 사용자에게 더 정확한 안내를 할 수 있다.

## 여러 예외를 한 번에 처리하기

서로 비슷하게 처리할 예외라면 하나의 \`except\`에서 묶을 수 있다.

\`\`\`python
try:
    index = int(index_text)
    value = items[index]
except (ValueError, IndexError):
    print("올바른 인덱스를 입력해야 합니다.")
\`\`\`

\`ValueError\`와 \`IndexError\`를 같은 방식으로 처리하고 싶을 때 사용할 수 있다.

다만 예외별로 안내 메시지를 다르게 주고 싶다면 따로 처리하는 편이 좋다.

## 예외 객체 확인하기

예외가 발생했을 때 자세한 에러 메시지를 확인하고 싶다면 \`as\`를 사용할 수 있다.

\`\`\`python
try:
    number = int("abc")
except ValueError as error:
    print("에러가 발생했습니다.")
    print(error)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
에러가 발생했습니다.
invalid literal for int() with base 10: 'abc'
\`\`\`

\`error\` 변수에는 실제 에러 메시지가 들어 있다. 이 정보는 개발자가 문제를 확인하거나 로그를 남길 때 유용하다.

## 예외 처리 순서

예외를 여러 개 처리할 때는 구체적인 예외를 먼저 쓰는 것이 좋다. 아직 이 수업에서는 예외 상속 구조를 깊게 다루지는 않지만, 넓은 범위의 예외를 먼저 처리하면 뒤에 있는 구체적인 예외 처리 코드가 실행되지 않을 수 있다.

초보 단계에서는 다음 원칙을 기억하자.

\`\`\`text
가능하면 예상되는 구체적인 예외를 적는다.
모든 예외를 잡는 코드는 마지막 수단으로 사용한다.
\`\`\`

---

## \`else\`

\`try-except\` 문에는 \`else\`를 붙일 수 있다. \`else\`는 \`try\` 블록에서 예외가 발생하지 않았을 때 실행된다.

기본 구조는 다음과 같다.

\`\`\`python
try:
    에러가 발생할 수 있는 코드
except 예외종류:
    에러가 발생했을 때 실행할 코드
else:
    에러가 발생하지 않았을 때 실행할 코드
\`\`\`

예제를 보자.

\`\`\`python
try:
    value = input("숫자를 입력하세요: ")
    number = int(value)
except ValueError:
    print("숫자로 변환할 수 없습니다.")
else:
    print("변환 성공:", number)
\`\`\`

사용자가 \`100\`을 입력하면 \`else\`가 실행된다.

\`\`\`text
변환 성공: 100
\`\`\`

사용자가 \`abc\`를 입력하면 \`except\`가 실행되고 \`else\`는 실행되지 않는다.

\`\`\`text
숫자로 변환할 수 없습니다.
\`\`\`

## \`else\`를 사용하는 이유

\`else\` 없이도 코드를 작성할 수 있다.

\`\`\`python
try:
    value = input("숫자를 입력하세요: ")
    number = int(value)
    print("변환 성공:", number)
except ValueError:
    print("숫자로 변환할 수 없습니다.")
\`\`\`

이 코드도 동작한다. 그렇다면 왜 \`else\`를 사용할까?

\`else\`를 사용하면 “예외가 발생할 수 있는 코드”와 “정상일 때 실행할 코드”를 분리할 수 있다.

\`\`\`python
try:
    number = int(value)
except ValueError:
    print("숫자로 변환할 수 없습니다.")
else:
    print("변환 성공:", number)
\`\`\`

이렇게 작성하면 \`try\` 안에는 정말 실패할 수 있는 코드만 두고, 성공 후 처리 코드는 \`else\`로 분리할 수 있다. 코드의 의도가 더 명확해진다.

## 실무 예제: 안전한 할인율 계산

다음 함수는 가격과 할인율 문자열을 받아 할인된 금액을 계산한다.

\`\`\`python
def calculate_discount_price(price, rate_text):
    try:
        rate = float(rate_text)
    except ValueError:
        return "할인율은 숫자로 입력해야 합니다."
    else:
        return price - (price * rate)


print(calculate_discount_price(10000, "0.1"))
print(calculate_discount_price(10000, "십퍼센트"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
9000.0
할인율은 숫자로 입력해야 합니다.
\`\`\`

\`try\`에서는 할인율을 숫자로 변환한다. 변환에 실패하면 메시지를 반환한다. 변환에 성공하면 \`else\`에서 계산을 진행한다.

---

## \`finally\`

\`finally\`는 예외 발생 여부와 상관없이 항상 실행되는 블록이다.

기본 구조는 다음과 같다.

\`\`\`python
try:
    에러가 발생할 수 있는 코드
except 예외종류:
    에러가 발생했을 때 실행할 코드
finally:
    항상 실행할 코드
\`\`\`

예제를 보자.

\`\`\`python
try:
    number = int("abc")
except ValueError:
    print("숫자로 변환할 수 없습니다.")
finally:
    print("작업을 종료합니다.")
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
숫자로 변환할 수 없습니다.
작업을 종료합니다.
\`\`\`

이번에는 에러가 발생하지 않는 예제를 보자.

\`\`\`python
try:
    number = int("100")
    print(number)
except ValueError:
    print("숫자로 변환할 수 없습니다.")
finally:
    print("작업을 종료합니다.")
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
100
작업을 종료합니다.
\`\`\`

에러가 발생하든 발생하지 않든 \`finally\`는 실행된다.

## \`finally\`는 언제 사용할까?

\`finally\`는 어떤 작업이 성공하든 실패하든 반드시 정리해야 하는 일이 있을 때 사용한다.

대표적인 예는 다음과 같다.

- 파일 닫기
- 네트워크 연결 종료
- 임시 데이터 정리
- 작업 종료 메시지 출력
- 실행 상태 초기화

파일 처리는 뒤에서 자세히 배우지만, 개념만 간단히 보면 다음과 같다.

\`\`\`python
file = None

try:
    file = open("data.txt", "r", encoding="utf-8")
    content = file.read()
except FileNotFoundError:
    print("파일을 찾을 수 없습니다.")
finally:
    if file is not None:
        file.close()
\`\`\`

파일을 열었다면 작업이 성공하든 실패하든 마지막에 닫아야 한다. 이처럼 반드시 실행되어야 하는 정리 코드를 \`finally\`에 넣는다.

다만 파일 처리에서는 보통 \`with\` 문을 사용하면 파일을 자동으로 닫을 수 있다. 이 내용은 10장에서 다룬다.

## \`try-except-else-finally\` 전체 구조

네 가지를 모두 사용하면 다음과 같은 구조가 된다.

\`\`\`python
try:
    에러가 발생할 수 있는 코드
except 예외종류:
    에러가 발생했을 때 실행할 코드
else:
    에러가 발생하지 않았을 때 실행할 코드
finally:
    항상 실행할 코드
\`\`\`

모든 상황에서 네 가지를 다 써야 하는 것은 아니다. 필요한 부분만 사용하면 된다.

가장 자주 쓰는 형태는 다음과 같다.

\`\`\`python
try:
    에러가 발생할 수 있는 코드
except 예외종류:
    에러가 발생했을 때 실행할 코드
\`\`\`

조금 더 명확하게 성공 흐름을 분리하고 싶을 때는 \`else\`를 사용한다.

\`\`\`python
try:
    에러가 발생할 수 있는 코드
except 예외종류:
    에러 처리
else:
    성공 후 처리
\`\`\`

항상 실행해야 하는 정리 코드가 있을 때는 \`finally\`를 사용한다.

\`\`\`python
try:
    작업 실행
except 예외종류:
    에러 처리
finally:
    정리 작업
\`\`\`

---
`;export{e as default};