var e=`<!-- 원본: python_advanced_chapter_12_book.md / 세부 장: 12-4 -->

# 12.4 parametrization

## 같은 테스트를 여러 입력값으로 실행하기

비슷한 테스트를 여러 개 작성해야 하는 경우가 많다.

\`\`\`python

def is_even(number: int) -> bool:
    return number % 2 == 0


def test_is_even_2():
    assert is_even(2) is True


def test_is_even_3():
    assert is_even(3) is False


def test_is_even_0():
    assert is_even(0) is True
\`\`\`

이런 테스트는 \`pytest.mark.parametrize\`를 사용해 하나로 줄일 수 있다.

\`\`\`python
import pytest


@pytest.mark.parametrize(
    "number, expected",
    [
        (2, True),
        (3, False),
        (0, True),
        (-4, True),
        (-5, False),
    ],
)
def test_is_even(number, expected):
    assert is_even(number) is expected
\`\`\`

하나의 테스트 함수가 여러 입력값으로 반복 실행된다.

## 할인 계산 예제

실무에 가까운 예제를 보자.

\`\`\`python

def calculate_discounted_price(price: int, rate: float) -> int:
    if price < 0:
        raise ValueError("가격은 0 이상이어야 합니다.")
    if not 0 <= rate <= 1:
        raise ValueError("할인율은 0과 1 사이여야 합니다.")

    return int(price * (1 - rate))
\`\`\`

정상 케이스를 parametrization으로 테스트할 수 있다.

\`\`\`python
import pytest


@pytest.mark.parametrize(
    "price, rate, expected",
    [
        (10000, 0.1, 9000),
        (10000, 0.0, 10000),
        (10000, 1.0, 0),
        (9999, 0.1, 8999),
    ],
)
def test_calculate_discounted_price(price, rate, expected):
    assert calculate_discounted_price(price, rate) == expected
\`\`\`

예외 케이스도 parametrization으로 테스트할 수 있다.

\`\`\`python
@pytest.mark.parametrize(
    "price, rate",
    [
        (-1, 0.1),
        (10000, -0.1),
        (10000, 1.1),
    ],
)
def test_calculate_discounted_price_invalid_input(price, rate):
    with pytest.raises(ValueError):
        calculate_discounted_price(price, rate)
\`\`\`

## 테스트 케이스에 이름 붙이기

입력값이 많아지면 실패한 테스트가 어떤 경우인지 보기 어려울 수 있다. 이때 \`ids\`를 사용할 수 있다.

\`\`\`python
@pytest.mark.parametrize(
    "price, rate, expected",
    [
        (10000, 0.1, 9000),
        (10000, 0.0, 10000),
        (10000, 1.0, 0),
    ],
    ids=["10_percent_discount", "no_discount", "free"],
)
def test_calculate_discounted_price_with_ids(price, rate, expected):
    assert calculate_discounted_price(price, rate) == expected
\`\`\`

테스트 결과에서 각 케이스 이름이 보이면 실패 원인을 찾기 쉽다.

## parametrization을 사용할 때 주의할 점

parametrization은 반복 테스트를 줄이는 데 좋지만, 모든 테스트를 무조건 하나로 합치는 것은 좋지 않다.

다음 경우에는 테스트를 분리하는 편이 낫다.

- 테스트의 의도가 서로 다르다.
- 준비 과정이 많이 다르다.
- 검증 방식이 다르다.
- 실패했을 때 별도로 읽는 것이 더 명확하다.

parametrization은 “같은 동작을 여러 입력값으로 확인할 때” 사용하는 것이 가장 적절하다.

---
`;export{e as default};