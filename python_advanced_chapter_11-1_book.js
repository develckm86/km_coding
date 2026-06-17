var e=`<!-- 원본: python_advanced_chapter_11_book.md / 세부 장: 11-1 -->

# 11.1 예외 처리 복습

예외 처리는 프로그램 실행 중 발생할 수 있는 비정상 상황을 다루는 방법입니다. 예외가 발생하면 파이썬은 현재 실행 흐름을 중단하고, 해당 예외를 처리할 수 있는 \`except\` 블록을 찾습니다.

기초 문법은 다음과 같습니다.

\`\`\`python
try:
    # 예외가 발생할 수 있는 코드
    pass
except SomeError:
    # 예외가 발생했을 때 실행할 코드
    pass
else:
    # 예외가 발생하지 않았을 때 실행할 코드
    pass
finally:
    # 예외 발생 여부와 관계없이 항상 실행할 코드
    pass
\`\`\`

문법 자체는 어렵지 않습니다. 하지만 실무에서는 문법보다 **처리 기준**이 더 중요합니다.

---

## 11.1.1 예외 처리는 실패를 숨기는 문법이 아니다

초보자가 자주 하는 실수 중 하나는 프로그램이 멈추지 않게 하려고 모든 코드를 \`try-except\`로 감싸는 것입니다.

\`\`\`python
try:
    price = int(input_price)
    total = price * quantity
except Exception:
    pass
\`\`\`

이 코드는 위험합니다. 예외가 발생해도 아무 일도 하지 않고 넘어가기 때문입니다. 프로그램은 멈추지 않을 수 있지만, 잘못된 결과를 만들 수 있습니다.

예외 처리는 실패를 숨기는 문법이 아닙니다. 예외 처리는 다음 중 하나를 하기 위한 문법입니다.

\`\`\`text
1. 문제를 복구한다.
2. 더 의미 있는 예외로 바꾸어 전달한다.
3. 실패 정보를 기록한다.
4. 사용자에게 이해 가능한 메시지를 보여준다.
5. 안전하게 작업을 종료한다.
\`\`\`

따라서 예외를 처리할 때는 먼저 질문해야 합니다.

\`\`\`text
이 예외가 발생했을 때 내가 복구할 수 있는가?
복구할 수 없다면 어디로 전달해야 하는가?
원인을 추적할 정보는 남기고 있는가?
\`\`\`

---

## 11.1.2 특정 예외만 처리하기

가능하면 \`except Exception\`보다 구체적인 예외를 처리하는 것이 좋습니다.

\`\`\`python
value = "10,000"

try:
    number = int(value)
except ValueError:
    print("숫자로 변환할 수 없습니다.")
\`\`\`

\`int("10,000")\`은 쉼표 때문에 \`ValueError\`를 발생시킵니다. 이 상황에서는 값 변환 실패가 예상 가능한 문제이므로 \`ValueError\`를 처리하면 됩니다.

반대로 아래 코드는 너무 넓습니다.

\`\`\`python
try:
    number = int(value)
except Exception:
    print("오류가 발생했습니다.")
\`\`\`

이렇게 작성하면 어떤 이유로 실패했는지 알기 어렵습니다. 예를 들어 변수 이름을 잘못 써서 \`NameError\`가 발생해도 같은 메시지가 출력됩니다. 그러면 실제 버그를 놓칠 수 있습니다.

---

## 11.1.3 여러 예외 처리하기

하나의 작업에서 여러 종류의 예외가 발생할 수 있습니다.

\`\`\`python
def parse_quantity(value: str) -> int:
    try:
        quantity = int(value)
        result = 100 // quantity
        return result
    except ValueError:
        print("정수로 변환할 수 없습니다.")
    except ZeroDivisionError:
        print("0으로 나눌 수 없습니다.")
\`\`\`

예외별로 처리 방식이 다르다면 \`except\`를 분리하는 것이 좋습니다.

예외별 처리 방식이 같다면 튜플로 묶을 수도 있습니다.

\`\`\`python
def read_number(data: dict, key: str) -> int:
    try:
        return int(data[key])
    except (KeyError, ValueError):
        return 0
\`\`\`

이 함수는 딕셔너리에 key가 없거나, 값이 정수로 변환되지 않으면 기본값 \`0\`을 반환합니다.

---

## 11.1.4 \`else\`는 정상 흐름을 분리한다

\`else\`는 \`try\` 블록에서 예외가 발생하지 않았을 때만 실행됩니다.

\`\`\`python
try:
    price = int("12000")
except ValueError:
    print("가격이 올바르지 않습니다.")
else:
    print("가격 변환 성공:", price)
\`\`\`

출력 결과는 다음과 같습니다.

\`\`\`text
가격 변환 성공: 12000
\`\`\`

\`else\`를 사용하면 예외가 발생할 수 있는 코드와 정상 처리 코드를 분리할 수 있습니다.

\`\`\`python
def parse_price(value: str) -> int | None:
    try:
        price = int(value)
    except ValueError:
        return None
    else:
        return price
\`\`\`

이 코드에서 \`int(value)\`만 실패 가능성이 있는 코드입니다. 정상 처리인 \`return price\`를 \`else\`로 분리하면 실패 가능성이 있는 범위가 명확해집니다.

---

## 11.1.5 \`finally\`는 정리가 필요할 때 사용한다

\`finally\`는 예외 발생 여부와 관계없이 항상 실행됩니다.

\`\`\`python
file = None

try:
    file = open("data.txt", "r", encoding="utf-8")
    content = file.read()
except FileNotFoundError:
    print("파일이 없습니다.")
finally:
    if file is not None:
        file.close()
\`\`\`

파일을 직접 열고 닫는 경우에는 이런 정리 작업이 필요합니다. 하지만 파일 처리에서는 보통 \`with\` 문을 사용하는 것이 더 좋습니다.

\`\`\`python
try:
    with open("data.txt", "r", encoding="utf-8") as file:
        content = file.read()
except FileNotFoundError:
    print("파일이 없습니다.")
\`\`\`

\`with\` 문은 파일을 자동으로 닫아 주므로 \`finally\`를 직접 작성할 필요가 줄어듭니다.

그래도 \`finally\`는 여전히 중요합니다. 다음과 같은 상황에서 사용됩니다.

\`\`\`text
파일 닫기
데이터베이스 연결 종료
임시 파일 삭제
락 해제
외부 리소스 정리
\`\`\`

---

## 11.1.6 예외를 다시 발생시키기

예외를 잡은 뒤 추가 작업을 하고 다시 발생시켜야 할 때가 있습니다.

\`\`\`python
def load_config(path: str) -> str:
    try:
        with open(path, "r", encoding="utf-8") as file:
            return file.read()
    except FileNotFoundError:
        print(f"설정 파일을 찾을 수 없습니다: {path}")
        raise
\`\`\`

\`raise\`만 사용하면 현재 처리 중인 예외를 그대로 다시 발생시킵니다. 이렇게 하면 호출한 쪽에서 예외를 계속 처리할 수 있습니다.

이 방식은 “여기서는 간단히 기록만 하고, 최종 처리는 상위 코드에 맡기고 싶다”는 상황에서 사용합니다.

다만 같은 예외를 여러 위치에서 계속 기록하면 로그가 중복될 수 있습니다. 보통은 **예외를 처리하는 최종 지점에서 한 번만 자세히 기록**하는 것이 좋습니다.

---
`;export{e as default};