var e=`<!-- 원본: python_advanced_chapter_12_book.md / 세부 장: 12-1 -->

# 12.1 테스트 설계 복습

## 테스트는 무엇을 확인하는가

테스트는 코드가 기대한 대로 동작하는지 확인하는 코드다. 하지만 실무에서의 테스트는 “결과값 하나가 맞는지”만 확인하지 않는다. 다음과 같은 질문에 답할 수 있어야 한다.

- 정상 입력이 들어왔을 때 올바른 결과를 내는가?
- 잘못된 입력이 들어왔을 때 적절히 실패하는가?
- 경계값에서 의도대로 동작하는가?
- 외부 시스템이 실패해도 프로그램이 예측 가능한 방식으로 동작하는가?
- 코드를 수정한 뒤에도 기존 기능이 유지되는가?

테스트는 코드의 동작을 문서화하는 역할도 한다. 잘 작성된 테스트를 읽으면 그 함수나 클래스가 어떤 입력을 받고 어떤 결과를 내야 하는지 알 수 있다.

## 테스트 가능한 코드의 특징

테스트가 어려운 코드는 보통 다음과 같은 특징을 가진다.

- 함수 안에서 너무 많은 일을 한다.
- 입력과 출력이 명확하지 않다.
- 외부 파일, API, 데이터베이스에 직접 의존한다.
- 현재 시간, 랜덤값, 환경 변수에 강하게 의존한다.
- 실행 결과를 반환하지 않고 화면에만 출력한다.
- 전역 상태를 자주 변경한다.

반대로 테스트하기 쉬운 코드는 다음과 같은 특징을 가진다.

- 하나의 함수가 하나의 역할을 한다.
- 입력과 출력이 명확하다.
- 외부 의존성을 함수 밖에서 주입받는다.
- 계산 로직과 입출력 로직이 분리되어 있다.
- 실패 상황을 예외나 명확한 반환값으로 표현한다.

다음 예제를 보자.

\`\`\`python
# 테스트하기 어려운 코드

def print_discounted_price():
    price = int(input("가격을 입력하세요: "))
    discounted = int(price * 0.9)
    print(discounted)
\`\`\`

이 함수는 입력을 직접 받고, 계산도 하고, 출력도 한다. 테스트하려면 사용자 입력과 화면 출력을 모두 다뤄야 한다.

아래처럼 계산 로직을 분리하면 훨씬 테스트하기 쉬워진다.

\`\`\`python
# 테스트하기 쉬운 코드

def calculate_discounted_price(price: int, rate: float) -> int:
    return int(price * (1 - rate))
\`\`\`

이제 테스트는 간단하다.

\`\`\`python

def test_calculate_discounted_price():
    assert calculate_discounted_price(10000, 0.1) == 9000
\`\`\`

테스트를 잘하려면 테스트 도구보다 먼저 **코드를 테스트 가능한 형태로 설계하는 습관**이 필요하다.

## 정상 케이스, 예외 케이스, 경계값

테스트는 보통 세 종류로 나누어 생각할 수 있다.

첫째, 정상 케이스다. 가장 일반적인 입력에 대해 기대한 결과가 나오는지 확인한다.

\`\`\`python

def test_calculate_total_price_normal_case():
    assert calculate_total_price(10000, 3) == 30000
\`\`\`

둘째, 예외 케이스다. 잘못된 입력에 대해 적절한 예외가 발생하는지 확인한다.

\`\`\`python
import pytest


def test_calculate_total_price_with_negative_quantity():
    with pytest.raises(ValueError):
        calculate_total_price(10000, -1)
\`\`\`

셋째, 경계값 테스트다. 조건이 바뀌는 지점의 값을 확인한다. 예를 들어 무료 배송 기준이 50,000원이라면 49,999원, 50,000원, 50,001원을 테스트해야 한다.

\`\`\`python

def is_free_shipping(total_price: int) -> bool:
    return total_price >= 50000


def test_free_shipping_boundary():
    assert is_free_shipping(49999) is False
    assert is_free_shipping(50000) is True
    assert is_free_shipping(50001) is True
\`\`\`

경계값 테스트는 실무에서 매우 중요하다. 많은 버그는 일반적인 값이 아니라 조건이 바뀌는 지점에서 발생한다.

## 테스트 이름 짓기

테스트 이름은 단순히 \`test_1\`, \`test_2\`처럼 짓지 않는 것이 좋다. 테스트 이름은 무엇을 검증하는지 드러나야 한다.

좋지 않은 예:

\`\`\`python

def test_price():
    ...
\`\`\`

좋은 예:

\`\`\`python

def test_calculate_total_price_returns_price_times_quantity():
    ...
\`\`\`

또는 한국어 프로젝트라면 다음처럼 작성할 수도 있다.

\`\`\`python

def test_수량과_가격을_곱해_총액을_계산한다():
    ...
\`\`\`

팀의 규칙에 따라 영어 또는 한국어를 선택하면 된다. 중요한 것은 테스트 이름만 읽어도 의도를 알 수 있어야 한다는 점이다.

## Given-When-Then 구조

테스트는 보통 세 단계로 작성하면 읽기 쉽다.

- Given: 테스트에 필요한 상황을 준비한다.
- When: 테스트할 동작을 실행한다.
- Then: 결과를 검증한다.

\`\`\`python

def test_calculate_total_price_returns_price_times_quantity():
    # Given
    price = 10000
    quantity = 3

    # When
    result = calculate_total_price(price, quantity)

    # Then
    assert result == 30000
\`\`\`

단순한 테스트에서는 주석을 생략해도 된다. 하지만 테스트가 길어질수록 Given-When-Then 구조는 테스트를 읽기 쉽게 만든다.

---
`;export{e as default};