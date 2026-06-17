var e=`<!-- 원본: python_advanced_chapter_11_book.md / 세부 장: 11-4 -->

# 11.4 예외 전파

예외는 발생한 위치에서 반드시 처리해야 하는 것은 아닙니다. 함수 안에서 예외가 발생했지만 그 함수가 처리하지 않으면, 예외는 호출한 쪽으로 전달됩니다. 이것을 **예외 전파**라고 합니다.

\`\`\`python
def parse_price(value: str) -> int:
    return int(value)


def calculate_total(price_text: str, quantity: int) -> int:
    price = parse_price(price_text)
    return price * quantity


calculate_total("abc", 3)
\`\`\`

\`parse_price()\`에서 \`ValueError\`가 발생하지만, 그 함수 안에는 \`except\`가 없습니다. 따라서 예외는 \`calculate_total()\`로 전달되고, 거기서도 처리되지 않으면 프로그램의 최상위로 전달됩니다.

예외 전파는 나쁜 것이 아닙니다. 오히려 실무 코드에서는 예외를 적절한 위치까지 전파하는 것이 중요합니다.

---

## 11.4.1 예외를 처리할 위치 정하기

예외를 어디에서 처리할지는 매우 중요합니다.

예를 들어 다음 함수는 문자열을 정수로 바꾸는 기능만 담당합니다.

\`\`\`python
def parse_price(value: str) -> int:
    return int(value)
\`\`\`

이 함수 안에서 사용자에게 메시지를 출력하는 것은 좋지 않을 수 있습니다.

\`\`\`python
def parse_price(value: str) -> int:
    try:
        return int(value)
    except ValueError:
        print("가격이 잘못되었습니다.")
        return 0
\`\`\`

이 함수는 이제 두 가지 일을 하고 있습니다.

\`\`\`text
1. 문자열을 정수로 변환한다.
2. 사용자에게 오류 메시지를 출력한다.
\`\`\`

게다가 잘못된 가격을 \`0\`으로 바꾸는 것이 항상 올바른 처리인지도 알 수 없습니다. 어떤 프로그램에서는 기본값 \`0\`이 괜찮을 수 있지만, 어떤 프로그램에서는 잘못된 데이터로 판단하고 전체 작업을 멈춰야 할 수도 있습니다.

따라서 하위 함수는 예외를 그대로 전달하고, 상위 함수에서 상황에 맞게 처리하는 구조가 더 나을 수 있습니다.

\`\`\`python
def parse_price(value: str) -> int:
    return int(value)


def main() -> None:
    try:
        price = parse_price("abc")
    except ValueError:
        print("가격이 올바르지 않습니다. 입력값을 확인하세요.")
\`\`\`

이 구조에서는 변환 함수가 변환 책임만 가지고, 사용자 메시지는 실행 흐름을 관리하는 \`main()\` 함수에서 담당합니다.

---

## 11.4.2 하위 함수와 상위 함수의 역할

실무 코드에서는 다음 원칙을 사용할 수 있습니다.

\`\`\`text
하위 함수는 구체적인 작업을 수행한다.
하위 함수는 복구할 수 없는 예외를 억지로 처리하지 않는다.
상위 함수는 전체 흐름을 알고 있으므로 사용자 메시지, 로그, 종료 여부를 결정한다.
\`\`\`

예를 들어 파일을 읽는 함수는 파일 읽기에만 집중합니다.

\`\`\`python
def read_text_file(path: str) -> str:
    with open(path, "r", encoding="utf-8") as file:
        return file.read()
\`\`\`

실행 흐름을 담당하는 함수에서 예외를 처리합니다.

\`\`\`python
def main() -> None:
    path = "config.txt"

    try:
        content = read_text_file(path)
    except FileNotFoundError:
        print(f"파일을 찾을 수 없습니다: {path}")
        return

    print(content)
\`\`\`

이렇게 하면 \`read_text_file()\`은 다른 곳에서도 재사용하기 쉽습니다.

---

## 11.4.3 예외 변환

내장 예외를 그대로 전달하는 대신, 프로그램의 의미에 맞는 예외로 바꾸어 전달할 수 있습니다.

\`\`\`python
class ConfigError(Exception):
    pass


def load_config(path: str) -> str:
    try:
        with open(path, "r", encoding="utf-8") as file:
            return file.read()
    except FileNotFoundError as error:
        raise ConfigError(f"설정 파일을 찾을 수 없습니다: {path}") from error
\`\`\`

여기서 실제 원인은 \`FileNotFoundError\`입니다. 하지만 상위 코드 입장에서는 “파일이 없다”보다 “설정 로딩에 실패했다”가 더 의미 있을 수 있습니다.

\`raise ... from error\`를 사용하면 원래 예외와 새 예외의 관계가 보존됩니다.

실행하면 traceback에 원래 예외와 새 예외가 함께 나타납니다. 이것을 **예외 체이닝**이라고 합니다.

---

## 11.4.4 \`raise from\`을 사용하는 이유

다음 코드를 보겠습니다.

\`\`\`python
class InvalidPriceError(Exception):
    pass


def parse_price(value: str) -> int:
    try:
        return int(value)
    except ValueError as error:
        raise InvalidPriceError(f"가격으로 사용할 수 없는 값입니다: {value}") from error
\`\`\`

이 코드에서 외부로 드러나는 예외는 \`InvalidPriceError\`입니다. 하지만 원래 원인인 \`ValueError\`도 traceback에 남습니다.

\`raise from\`을 사용하는 이유는 다음과 같습니다.

\`\`\`text
1. 상위 코드에는 더 의미 있는 예외를 전달할 수 있다.
2. 디버깅할 때 원래 예외 원인을 확인할 수 있다.
3. 예외 변환 과정이 명시적으로 드러난다.
\`\`\`

\`raise from\`은 특히 다음 상황에서 유용합니다.

\`\`\`text
파일 처리 예외를 설정 오류로 바꾸기
JSON 파싱 예외를 API 응답 오류로 바꾸기
값 변환 예외를 데이터 검증 오류로 바꾸기
외부 라이브러리 예외를 내 애플리케이션 예외로 바꾸기
\`\`\`

---

## 11.4.5 \`raise from None\`

때로는 원래 예외를 사용자에게 보여주고 싶지 않을 수 있습니다. 이때 \`raise from None\`을 사용할 수 있습니다.

\`\`\`python
class InvalidPriceError(Exception):
    pass


def parse_price(value: str) -> int:
    try:
        return int(value)
    except ValueError:
        raise InvalidPriceError("가격은 정수여야 합니다.") from None
\`\`\`

\`from None\`은 원래 예외와의 연결을 숨깁니다. 사용자에게 단순한 메시지만 보여주고 싶을 때 사용할 수 있습니다.

하지만 실무에서는 원인 추적이 중요하므로 무조건 숨기면 안 됩니다. 개발자가 확인할 로그에는 원래 원인이 남아야 합니다.

정리하면 다음과 같습니다.

\`\`\`text
원인 추적이 중요하면 raise ... from error
사용자에게 단순한 메시지만 보여주려면 raise ... from None
디버깅 정보가 사라질 수 있으므로 from None은 신중하게 사용
\`\`\`

---

## 11.4.6 예외를 처리하지 말아야 하는 경우

모든 예외를 처리하려고 하면 오히려 코드가 나빠집니다.

\`\`\`python
def calculate_total(price: int, quantity: int) -> int:
    try:
        return price * quantity
    except Exception:
        return 0
\`\`\`

이 함수는 어떤 오류가 발생해도 \`0\`을 반환합니다. 하지만 이 동작은 위험합니다.

\`\`\`text
price가 문자열이어도 0이 반환될 수 있다.
quantity가 None이어도 0이 반환될 수 있다.
실제 버그가 숨겨진다.
잘못된 결과가 정상 결과처럼 사용될 수 있다.
\`\`\`

예외를 처리하지 않는 것이 더 나은 경우도 많습니다.

\`\`\`python
def calculate_total(price: int, quantity: int) -> int:
    return price * quantity
\`\`\`

이 함수는 입력값이 잘못되면 자연스럽게 예외가 발생합니다. 그러면 호출한 쪽에서 입력값 검증을 하거나 오류를 수정할 수 있습니다.

예외 처리는 “프로그램이 멈추지 않게 하는 장치”가 아니라 “실패를 올바른 위치에서 다루는 설계”입니다.

---
`;export{e as default};