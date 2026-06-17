var e=`# 12장 테스트 심화

## 이 장에서 배울 내용

기초 과정에서는 \`assert\`와 \`pytest\`를 이용해 함수가 의도대로 동작하는지 확인하는 방법을 배웠다. 고급 과정의 테스트는 단순히 “정답이 맞는지 확인하는 코드”에서 한 걸음 더 나아간다. 여기서는 테스트를 통해 코드의 구조를 더 좋게 만들고, 외부 환경에 흔들리지 않는 프로그램을 만드는 방법을 배운다.

실무 코드는 혼자 실행되는 경우가 드물다. 파일을 읽고, API를 호출하고, 데이터베이스에 저장하고, 날짜와 시간에 따라 다른 결과를 만들며, 운영 환경의 설정값을 사용한다. 이런 코드를 테스트하려면 단순한 함수 테스트만으로는 부족하다. 테스트 데이터를 준비하고, 실행 후 정리하고, 같은 테스트를 여러 입력값으로 반복하고, 외부 의존성을 가짜 객체로 대체하는 기술이 필요하다.

이 장에서는 다음 내용을 다룬다.

- 테스트 설계 복습
- \`pytest\` 심화 사용법
- fixture를 이용한 테스트 준비와 정리
- parametrization을 이용한 반복 테스트
- mock을 이용한 외부 의존성 대체
- 테스트 커버리지의 의미와 활용
- 데이터 처리 코드에 적용할 수 있는 실무 테스트 패턴

테스트를 잘 작성하면 단순히 버그를 줄이는 데서 끝나지 않는다. 코드를 수정할 수 있는 자신감이 생기고, 기능을 추가할 때 기존 기능이 깨지지 않았는지 빠르게 확인할 수 있다. 좋은 테스트는 좋은 설계를 유도한다.

---

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

# 12.2 pytest 심화

## pytest가 테스트를 찾는 방식

\`pytest\`는 기본적으로 일정한 규칙에 따라 테스트 파일과 테스트 함수를 찾는다.

일반적으로 테스트 파일은 다음과 같은 이름을 사용한다.

\`\`\`text
test_*.py
*_test.py
\`\`\`

테스트 함수는 다음처럼 \`test_\`로 시작한다.

\`\`\`python

def test_add():
    assert add(1, 2) == 3
\`\`\`

테스트 클래스도 만들 수 있다. 테스트 클래스 이름은 보통 \`Test\`로 시작한다.

\`\`\`python
class TestPriceCalculator:
    def test_total_price(self):
        assert calculate_total_price(10000, 2) == 20000
\`\`\`

테스트 클래스는 관련 테스트를 묶을 때 유용하다. 다만 초보 단계에서는 함수 단위 테스트만으로도 충분하다. 고급 과정에서는 테스트가 많아질 때 구조적으로 묶는 방법을 익히는 것이 좋다.

## pytest 실행

터미널에서 다음 명령으로 테스트를 실행한다.

\`\`\`bash
pytest
\`\`\`

특정 파일만 실행할 수도 있다.

\`\`\`bash
pytest tests/test_price.py
\`\`\`

특정 테스트 함수만 실행할 수도 있다.

\`\`\`bash
pytest tests/test_price.py::test_calculate_total_price
\`\`\`

출력을 자세히 보고 싶다면 \`-v\` 옵션을 사용한다.

\`\`\`bash
pytest -v
\`\`\`

테스트 중 \`print()\` 출력까지 보고 싶다면 \`-s\` 옵션을 사용한다.

\`\`\`bash
pytest -s
\`\`\`

실무에서는 실패한 테스트만 다시 실행하거나, 키워드로 테스트를 골라 실행하는 경우도 많다.

\`\`\`bash
pytest -k price
\`\`\`

위 명령은 이름에 \`price\`가 들어간 테스트만 실행한다.

## pytest의 assert

\`pytest\`에서는 일반 \`assert\` 문을 그대로 사용한다.

\`\`\`python

def test_numbers():
    assert 1 + 2 == 3
\`\`\`

\`pytest\`의 장점은 실패했을 때 비교 내용을 자세히 보여준다는 점이다.

\`\`\`python

def test_list():
    assert [1, 2, 3] == [1, 2, 4]
\`\`\`

이 테스트가 실패하면 어느 위치의 값이 다른지 보여준다. 그래서 별도의 복잡한 assertion 메서드를 사용하지 않아도 읽기 쉬운 테스트를 작성할 수 있다.

## 예외 테스트

잘못된 입력에 대해 예외가 발생해야 한다면 \`pytest.raises()\`를 사용한다.

\`\`\`python
import pytest


def divide(a: int, b: int) -> float:
    if b == 0:
        raise ValueError("0으로 나눌 수 없습니다.")
    return a / b


def test_divide_by_zero_raises_value_error():
    with pytest.raises(ValueError):
        divide(10, 0)
\`\`\`

예외 메시지까지 확인할 수도 있다.

\`\`\`python

def test_divide_by_zero_error_message():
    with pytest.raises(ValueError, match="0으로 나눌 수 없습니다"):
        divide(10, 0)
\`\`\`

예외 테스트는 데이터 검증 함수, 설정값 검사 함수, 파일 처리 함수에서 자주 사용된다.

## 임시 디렉터리와 파일 테스트

파일을 다루는 코드를 테스트할 때 실제 프로젝트 폴더를 건드리면 위험하다. \`pytest\`는 임시 경로를 제공하는 \`tmp_path\` fixture를 제공한다.

\`\`\`python
from pathlib import Path


def save_text(path: Path, text: str) -> None:
    path.write_text(text, encoding="utf-8")


def test_save_text(tmp_path):
    file_path = tmp_path / "sample.txt"

    save_text(file_path, "hello")

    assert file_path.read_text(encoding="utf-8") == "hello"
\`\`\`

\`tmp_path\`는 테스트 실행 중에만 사용할 임시 폴더를 제공한다. 테스트가 끝난 뒤에는 pytest가 정리하므로 안전하다.

## 출력 테스트

화면 출력이 필요한 함수를 테스트할 때는 \`capsys\` fixture를 사용할 수 있다.

\`\`\`python

def greet(name: str) -> None:
    print(f"안녕하세요, {name}님")


def test_greet_output(capsys):
    greet("민수")

    captured = capsys.readouterr()

    assert captured.out == "안녕하세요, 민수님\\n"
\`\`\`

하지만 실무에서는 가능하면 출력 자체를 테스트하기보다, 출력할 문자열을 반환하는 함수와 실제 출력 함수를 분리하는 편이 좋다.

\`\`\`python

def make_greeting(name: str) -> str:
    return f"안녕하세요, {name}님"


def print_greeting(name: str) -> None:
    print(make_greeting(name))
\`\`\`

이렇게 하면 핵심 로직은 \`make_greeting()\`에서 쉽게 테스트할 수 있다.

---

# 12.3 fixture

## fixture란 무엇인가

fixture는 테스트 실행에 필요한 준비 작업을 재사용하기 위한 기능이다. 테스트를 작성하다 보면 여러 테스트에서 같은 준비 코드가 반복된다.

\`\`\`python

def test_vip_discount():
    user = {"name": "민수", "grade": "VIP"}
    product = {"name": "키보드", "price": 100000}
    ...


def test_normal_discount():
    user = {"name": "지영", "grade": "NORMAL"}
    product = {"name": "키보드", "price": 100000}
    ...
\`\`\`

공통 데이터가 많아지면 테스트가 길고 지저분해진다. fixture를 사용하면 테스트 준비 코드를 분리할 수 있다.

\`\`\`python
import pytest


@pytest.fixture
def keyboard():
    return {"name": "키보드", "price": 100000}


def test_product_price(keyboard):
    assert keyboard["price"] == 100000
\`\`\`

테스트 함수의 매개변수 이름이 fixture 이름과 같으면 pytest가 해당 fixture를 실행하고 결과를 전달한다.

## fixture로 테스트 데이터 만들기

데이터 처리 코드에서는 테스트용 데이터를 자주 만든다.

\`\`\`python
import pytest


@pytest.fixture
def sample_orders():
    return [
        {"order_id": 1, "price": 10000, "quantity": 2},
        {"order_id": 2, "price": 15000, "quantity": 1},
        {"order_id": 3, "price": 20000, "quantity": 3},
    ]


def calculate_total_sales(orders: list[dict]) -> int:
    total = 0
    for order in orders:
        total += order["price"] * order["quantity"]
    return total


def test_calculate_total_sales(sample_orders):
    assert calculate_total_sales(sample_orders) == 95000
\`\`\`

fixture를 사용하면 테스트 함수는 검증하려는 내용에 집중할 수 있다.

## fixture의 setup과 teardown

테스트 전에는 준비가 필요하고, 테스트 후에는 정리가 필요한 경우가 있다. 예를 들어 임시 파일을 만들거나, 테스트용 연결을 열거나, 환경을 바꾼 뒤 되돌려야 할 수 있다.

fixture 안에서 \`yield\`를 사용하면 테스트 전후 작업을 나눌 수 있다.

\`\`\`python
import pytest


@pytest.fixture
def resource():
    print("준비")
    data = {"status": "ready"}

    yield data

    print("정리")
\`\`\`

\`yield\` 앞부분은 테스트 실행 전에 실행되고, \`yield\` 뒤쪽은 테스트가 끝난 뒤 실행된다.

\`\`\`python

def test_resource(resource):
    assert resource["status"] == "ready"
\`\`\`

이 구조는 데이터베이스 연결, 임시 파일, 외부 리소스 테스트에서 자주 사용된다.

## fixture scope

fixture는 실행 범위를 정할 수 있다. 기본값은 \`function\`이다. 즉, 테스트 함수마다 fixture가 새로 실행된다.

\`\`\`python
@pytest.fixture(scope="function")
def sample_data():
    return []
\`\`\`

자주 사용하는 scope는 다음과 같다.

| scope | 의미 |
|---|---|
| \`function\` | 테스트 함수마다 실행 |
| \`class\` | 테스트 클래스마다 실행 |
| \`module\` | 테스트 파일마다 실행 |
| \`session\` | 전체 테스트 실행 동안 한 번 실행 |

데이터가 변경될 수 있는 fixture는 보통 \`function\` scope를 사용한다. 여러 테스트가 같은 객체를 공유하면 한 테스트의 변경이 다른 테스트에 영향을 줄 수 있기 때문이다.

\`\`\`python
@pytest.fixture(scope="session")
def config():
    return {"env": "test", "debug": True}
\`\`\`

설정값처럼 변경되지 않는 데이터는 \`session\` scope를 사용할 수 있다.

## conftest.py

여러 테스트 파일에서 같은 fixture를 사용해야 한다면 \`conftest.py\` 파일에 fixture를 정의할 수 있다.

\`\`\`text
project/
  src/
    my_app/
      pricing.py
  tests/
    conftest.py
    test_pricing.py
    test_orders.py
\`\`\`

\`\`\`python
# tests/conftest.py

import pytest


@pytest.fixture
def sample_user():
    return {"name": "민수", "grade": "VIP"}
\`\`\`

이제 같은 폴더와 하위 폴더의 테스트 파일에서 \`sample_user\` fixture를 사용할 수 있다.

\`\`\`python
# tests/test_orders.py


def test_user_grade(sample_user):
    assert sample_user["grade"] == "VIP"
\`\`\`

\`conftest.py\`는 테스트 전용 설정 파일처럼 생각하면 된다.

## fixture factory

테스트 데이터가 조금씩 달라져야 할 때는 fixture가 함수를 반환하게 만들 수 있다. 이를 factory fixture라고 부르기도 한다.

\`\`\`python
import pytest


@pytest.fixture
def make_user():
    def _make_user(name: str = "사용자", grade: str = "NORMAL") -> dict:
        return {"name": name, "grade": grade}

    return _make_user


def test_make_vip_user(make_user):
    user = make_user(name="민수", grade="VIP")

    assert user == {"name": "민수", "grade": "VIP"}
\`\`\`

테스트마다 다양한 사용자를 만들어야 한다면 이 방식이 유용하다.

## fixture를 너무 많이 쓰면 생기는 문제

fixture는 편리하지만 남용하면 테스트가 읽기 어려워진다.

다음과 같은 문제가 생길 수 있다.

- 테스트 함수만 봐서는 어떤 데이터가 들어오는지 알기 어렵다.
- \`conftest.py\`가 너무 커진다.
- fixture끼리 의존성이 복잡해진다.
- 테스트 실패 원인을 찾기 어려워진다.

fixture는 반복을 줄이기 위해 사용하되, 테스트의 의도가 흐려지지 않게 관리해야 한다.

---

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

# 12.5 mock

## mock이 필요한 이유

실무 코드는 외부 환경에 의존하는 경우가 많다.

- API 요청
- 데이터베이스 조회
- 파일 시스템 접근
- 현재 시간
- 랜덤값
- 이메일 발송
- 결제 시스템 호출

이런 외부 의존성을 테스트에서 그대로 사용하면 문제가 생긴다.

예를 들어 API를 실제로 호출하는 테스트는 다음과 같은 단점이 있다.

- 인터넷 연결이 필요하다.
- API 서버 상태에 따라 테스트가 실패할 수 있다.
- 테스트가 느려진다.
- API 호출 제한에 걸릴 수 있다.
- 실제 데이터를 변경할 위험이 있다.

테스트에서는 외부 시스템을 실제로 호출하지 않고, 가짜 객체로 대체하는 것이 좋다. 이때 사용하는 것이 mock이다.

## Mock 기본 사용

파이썬 표준 라이브러리에는 \`unittest.mock\`이 있다.

\`\`\`python
from unittest.mock import Mock


def test_mock_basic():
    fake_client = Mock()
    fake_client.get_user.return_value = {"name": "민수", "grade": "VIP"}

    result = fake_client.get_user(1)

    assert result == {"name": "민수", "grade": "VIP"}
    fake_client.get_user.assert_called_once_with(1)
\`\`\`

위 코드에서 \`fake_client.get_user()\`는 실제 API를 호출하지 않는다. 우리가 지정한 값을 반환할 뿐이다.

## return_value

\`return_value\`는 mock 함수가 호출되었을 때 반환할 값을 지정한다.

\`\`\`python
from unittest.mock import Mock

mock_func = Mock()
mock_func.return_value = 100

assert mock_func() == 100
\`\`\`

## side_effect

\`side_effect\`는 호출 시 예외를 발생시키거나, 호출할 때마다 다른 값을 반환하게 할 수 있다.

\`\`\`python
from unittest.mock import Mock

mock_func = Mock()
mock_func.side_effect = [1, 2, 3]

assert mock_func() == 1
assert mock_func() == 2
assert mock_func() == 3
\`\`\`

예외를 발생시킬 수도 있다.

\`\`\`python
mock_func = Mock()
mock_func.side_effect = TimeoutError("요청 시간 초과")

try:
    mock_func()
except TimeoutError:
    print("실패 처리")
\`\`\`

## patch

\`patch()\`는 특정 모듈의 객체를 테스트 중에 임시로 바꿀 때 사용한다.

예를 들어 다음과 같은 코드가 있다고 하자.

\`\`\`python
# src/my_app/weather.py

import requests


def get_temperature(city: str) -> float:
    response = requests.get(
        "https://example.com/weather",
        params={"city": city},
        timeout=3,
    )
    data = response.json()
    return data["temperature"]
\`\`\`

테스트에서 실제 \`requests.get()\`을 호출하고 싶지 않다면 patch를 사용할 수 있다.

\`\`\`python
# tests/test_weather.py

from unittest.mock import Mock, patch

from my_app.weather import get_temperature


def test_get_temperature():
    fake_response = Mock()
    fake_response.json.return_value = {"temperature": 23.5}

    with patch("my_app.weather.requests.get", return_value=fake_response) as mock_get:
        result = get_temperature("Seoul")

    assert result == 23.5
    mock_get.assert_called_once()
\`\`\`

중요한 점은 patch 대상이다. \`requests.get\`을 원래 위치에서 패치하는 것이 아니라, **테스트 대상 코드가 바라보는 위치**를 패치해야 한다. 위 코드에서는 \`my_app.weather\` 모듈 안에서 \`requests.get\`을 사용하므로 \`my_app.weather.requests.get\`을 패치한다.

## mock으로 호출 여부 검증하기

mock은 함수가 호출되었는지 확인할 수 있다.

\`\`\`python
from unittest.mock import Mock


def send_welcome_email(email_sender, email: str) -> None:
    email_sender.send(email, "환영합니다")


def test_send_welcome_email():
    email_sender = Mock()

    send_welcome_email(email_sender, "user@example.com")

    email_sender.send.assert_called_once_with("user@example.com", "환영합니다")
\`\`\`

이 테스트는 실제 이메일을 보내지 않는다. 대신 이메일 발송 함수가 올바른 인자로 호출되었는지 확인한다.

## monkeypatch

\`pytest\`는 \`monkeypatch\` fixture를 제공한다. 환경 변수, 객체 속성, 함수 등을 테스트 중에 임시로 바꿀 때 유용하다.

\`\`\`python
import os


def get_api_key() -> str:
    return os.environ["API_KEY"]


def test_get_api_key(monkeypatch):
    monkeypatch.setenv("API_KEY", "test-key")

    assert get_api_key() == "test-key"
\`\`\`

테스트가 끝나면 변경 내용은 자동으로 되돌아간다.

함수도 바꿀 수 있다.

\`\`\`python
from pathlib import Path


def get_home_directory() -> Path:
    return Path.home()


def test_get_home_directory(monkeypatch):
    monkeypatch.setattr(Path, "home", lambda: Path("/tmp/test-home"))

    assert get_home_directory() == Path("/tmp/test-home")
\`\`\`

## mock을 남용하면 생기는 문제

mock은 강력하지만 남용하면 테스트의 신뢰도가 떨어진다.

다음과 같은 테스트는 주의해야 한다.

- 실제 동작은 검증하지 않고 mock 호출 여부만 검증한다.
- 내부 구현을 지나치게 자세히 검증한다.
- 코드 구조가 조금만 바뀌어도 테스트가 깨진다.
- mock 설정이 실제 객체의 동작과 다르다.

좋은 테스트는 결과와 행위를 균형 있게 검증한다. 계산 함수는 결과값을 검증하고, 외부 시스템 호출은 호출 여부와 인자를 검증하는 식으로 나누는 것이 좋다.

## 외부 의존성을 주입하는 설계

mock을 더 쉽게 사용하려면 외부 의존성을 함수나 클래스 밖에서 주입받도록 설계하는 것이 좋다.

\`\`\`python
class WeatherService:
    def __init__(self, http_client):
        self.http_client = http_client

    def get_temperature(self, city: str) -> float:
        response = self.http_client.get(
            "https://example.com/weather",
            params={"city": city},
            timeout=3,
        )
        return response.json()["temperature"]
\`\`\`

테스트에서는 가짜 \`http_client\`를 전달하면 된다.

\`\`\`python
from unittest.mock import Mock


def test_weather_service_get_temperature():
    fake_response = Mock()
    fake_response.json.return_value = {"temperature": 23.5}

    fake_client = Mock()
    fake_client.get.return_value = fake_response

    service = WeatherService(fake_client)
    result = service.get_temperature("Seoul")

    assert result == 23.5
\`\`\`

이 방식은 patch를 많이 쓰지 않아도 되므로 테스트가 단순해진다.

---

# 12.6 테스트 커버리지

## 커버리지란 무엇인가

테스트 커버리지는 테스트를 실행했을 때 실제 코드의 어느 부분이 실행되었는지 측정하는 지표다. 예를 들어 전체 코드 100줄 중 테스트 실행 중 80줄이 실행되었다면 라인 커버리지는 80%라고 볼 수 있다.

커버리지는 테스트가 부족한 영역을 찾는 데 도움을 준다. 하지만 커버리지가 높다고 해서 반드시 좋은 테스트가 있는 것은 아니다.

다음 테스트를 보자.

\`\`\`python

def calculate_total_price(price: int, quantity: int) -> int:
    return price * quantity


def test_calculate_total_price():
    calculate_total_price(10000, 3)
\`\`\`

이 테스트는 함수를 실행하므로 커버리지는 올라간다. 하지만 결과를 검증하지 않으므로 좋은 테스트가 아니다.

좋은 테스트는 실행뿐 아니라 검증을 포함해야 한다.

\`\`\`python

def test_calculate_total_price():
    assert calculate_total_price(10000, 3) == 30000
\`\`\`

## coverage.py와 pytest-cov

파이썬에서는 \`coverage.py\`를 사용해 커버리지를 측정할 수 있다. \`pytest\`와 함께 사용할 때는 \`pytest-cov\` 플러그인을 많이 사용한다.

설치 예시는 다음과 같다.

\`\`\`bash
pip install pytest-cov
\`\`\`

테스트를 실행하면서 커버리지를 확인하려면 다음처럼 실행한다.

\`\`\`bash
pytest --cov=my_app
\`\`\`

터미널에 커버리지 요약이 출력된다.

HTML 보고서를 만들 수도 있다.

\`\`\`bash
pytest --cov=my_app --cov-report=html
\`\`\`

실행 후 \`htmlcov\` 폴더가 만들어지고, 브라우저에서 어떤 줄이 테스트되었는지 확인할 수 있다.

## 커버리지 결과 해석

커버리지 결과를 볼 때는 숫자만 보지 말고 다음을 함께 확인해야 한다.

- 중요한 비즈니스 로직이 테스트되었는가?
- 예외 처리 경로가 테스트되었는가?
- 경계값이 테스트되었는가?
- 단순한 getter나 출력 코드의 커버리지에만 집중하고 있지는 않은가?
- 테스트가 실제로 결과를 검증하고 있는가?

커버리지는 테스트 품질의 전부가 아니라, 테스트 범위를 파악하기 위한 도구다.

## 커버리지 목표를 정할 때 주의할 점

팀에서 커버리지 목표를 정할 수 있다. 예를 들어 80% 이상을 목표로 삼을 수 있다. 하지만 커버리지 숫자를 목표로만 삼으면 형식적인 테스트가 늘어날 수 있다.

중요한 것은 다음 순서다.

1. 핵심 로직부터 테스트한다.
2. 실패 가능성이 높은 부분을 테스트한다.
3. 데이터 변환, 검증, 계산 로직을 테스트한다.
4. 예외 처리와 경계값을 테스트한다.
5. 커버리지 보고서로 빠진 부분을 점검한다.

커버리지는 마지막 점검 도구로 사용하는 것이 좋다.

---

# 12.7 실무 테스트 패턴

## 데이터 검증 함수 테스트

데이터분석 전 단계에서는 데이터 검증 함수가 중요하다. 예를 들어 주문 데이터에 필수 컬럼이 있는지 확인하는 함수를 만들 수 있다.

\`\`\`python

def validate_required_keys(row: dict, required_keys: list[str]) -> None:
    missing_keys = []

    for key in required_keys:
        if key not in row:
            missing_keys.append(key)

    if missing_keys:
        raise ValueError(f"필수 key가 없습니다: {missing_keys}")
\`\`\`

테스트는 다음과 같다.

\`\`\`python
import pytest


def test_validate_required_keys_success():
    row = {"name": "민수", "email": "minsu@example.com"}

    validate_required_keys(row, ["name", "email"])



def test_validate_required_keys_missing_key():
    row = {"name": "민수"}

    with pytest.raises(ValueError, match="email"):
        validate_required_keys(row, ["name", "email"])
\`\`\`

검증 함수는 데이터 처리에서 장애를 줄이는 핵심 코드다. 정상 케이스뿐 아니라 실패 케이스를 반드시 테스트해야 한다.

## 파일 처리 함수 테스트

파일을 읽고 쓰는 함수는 \`tmp_path\`를 이용하면 안전하게 테스트할 수 있다.

\`\`\`python
from pathlib import Path


def read_lines(path: Path) -> list[str]:
    return path.read_text(encoding="utf-8").splitlines()


def test_read_lines(tmp_path):
    file_path = tmp_path / "sample.txt"
    file_path.write_text("A\\nB\\nC", encoding="utf-8")

    result = read_lines(file_path)

    assert result == ["A", "B", "C"]
\`\`\`

실제 운영 파일을 테스트에서 직접 건드리면 안 된다. 테스트는 항상 안전한 임시 경로에서 실행되어야 한다.

## 날짜와 시간 테스트

현재 시간에 의존하는 코드는 테스트가 어려워진다.

\`\`\`python
from datetime import datetime


def make_report_filename() -> str:
    today = datetime.now().strftime("%Y%m%d")
    return f"report_{today}.csv"
\`\`\`

이 함수는 실행 날짜에 따라 결과가 달라진다. 테스트하기 쉽게 만들려면 날짜를 외부에서 전달받도록 바꿀 수 있다.

\`\`\`python
from datetime import date


def make_report_filename(today: date) -> str:
    return f"report_{today.strftime('%Y%m%d')}.csv"
\`\`\`

테스트는 간단해진다.

\`\`\`python
from datetime import date


def test_make_report_filename():
    result = make_report_filename(date(2026, 6, 16))

    assert result == "report_20260616.csv"
\`\`\`

테스트하기 쉬운 설계는 코드의 품질을 높인다.

## API 클라이언트 테스트

API 요청 코드는 실제 API를 호출하지 않고 테스트하는 것이 좋다.

\`\`\`python
class UserApiClient:
    def __init__(self, http_client, base_url: str):
        self.http_client = http_client
        self.base_url = base_url

    def get_user(self, user_id: int) -> dict:
        response = self.http_client.get(
            f"{self.base_url}/users/{user_id}",
            timeout=3,
        )
        return response.json()
\`\`\`

테스트에서는 가짜 HTTP 클라이언트를 사용한다.

\`\`\`python
from unittest.mock import Mock


def test_get_user():
    fake_response = Mock()
    fake_response.json.return_value = {"id": 1, "name": "민수"}

    fake_http_client = Mock()
    fake_http_client.get.return_value = fake_response

    client = UserApiClient(fake_http_client, "https://example.com")
    result = client.get_user(1)

    assert result == {"id": 1, "name": "민수"}
    fake_http_client.get.assert_called_once_with(
        "https://example.com/users/1",
        timeout=3,
    )
\`\`\`

이 방식은 API 서버 상태와 무관하게 빠르고 안정적인 테스트를 만들 수 있다.

## 데이터 변환 함수 테스트

데이터분석으로 이어지는 과정에서는 데이터 변환 함수가 많아진다. 예를 들어 문자열 금액을 정수로 바꾸는 함수가 있다고 하자.

\`\`\`python

def parse_price(value: str) -> int:
    cleaned = value.replace(",", "").replace("원", "").strip()
    return int(cleaned)
\`\`\`

여러 입력값을 parametrization으로 테스트할 수 있다.

\`\`\`python
import pytest


@pytest.mark.parametrize(
    "value, expected",
    [
        ("1,000원", 1000),
        (" 2500 ", 2500),
        ("0", 0),
        ("10,000", 10000),
    ],
)
def test_parse_price(value, expected):
    assert parse_price(value) == expected
\`\`\`

잘못된 값도 테스트한다.

\`\`\`python
@pytest.mark.parametrize("value", ["", "abc", "1만원"])
def test_parse_price_invalid_value(value):
    with pytest.raises(ValueError):
        parse_price(value)
\`\`\`

데이터 변환 함수는 작아 보이지만, 실제 분석 결과에 큰 영향을 준다. 반드시 다양한 입력값으로 테스트해야 한다.

---

# 12.8 테스트 구조 설계

## 프로젝트 안에서 테스트 위치

실무 프로젝트에서는 보통 \`src\`와 \`tests\`를 분리한다.

\`\`\`text
project/
  src/
    my_app/
      __init__.py
      pricing.py
      validators.py
      api_client.py
  tests/
    conftest.py
    test_pricing.py
    test_validators.py
    test_api_client.py
\`\`\`

코드 파일과 테스트 파일의 이름을 대응시키면 찾기 쉽다.

\`\`\`text
src/my_app/pricing.py        -> tests/test_pricing.py
src/my_app/validators.py     -> tests/test_validators.py
src/my_app/api_client.py     -> tests/test_api_client.py
\`\`\`

## 테스트 단위 나누기

테스트는 보통 다음 단위로 나눌 수 있다.

| 테스트 종류 | 설명 | 예시 |
|---|---|---|
| 단위 테스트 | 함수나 클래스 하나를 테스트 | 가격 계산 함수 테스트 |
| 통합 테스트 | 여러 구성 요소가 함께 동작하는지 테스트 | 파일 읽기 후 데이터 변환 |
| 외부 연동 테스트 | API, DB 등 외부 시스템과 연결 테스트 | 실제 테스트 서버 API 호출 |

고급 파이썬 과정에서는 단위 테스트와 작은 통합 테스트에 집중하는 것이 좋다. 실제 외부 시스템을 사용하는 테스트는 느리고 관리가 어렵기 때문에 별도로 분리하는 것이 좋다.

## 빠른 테스트와 느린 테스트 분리

빠른 테스트는 자주 실행할 수 있어야 한다. 느린 테스트는 별도 표시를 해두고 필요할 때만 실행할 수 있다.

pytest marker를 사용할 수 있다.

\`\`\`python
import pytest


@pytest.mark.slow
def test_large_file_processing():
    ...
\`\`\`

특정 marker를 제외하고 실행할 수 있다.

\`\`\`bash
pytest -m "not slow"
\`\`\`

실무에서는 빠른 단위 테스트를 자주 실행하고, 느린 통합 테스트는 배포 전이나 CI에서 실행하는 식으로 나눌 수 있다.

## 테스트 데이터 관리

테스트 데이터는 작고 명확해야 한다. 너무 큰 테스트 파일은 테스트를 느리게 만들고 실패 원인을 찾기 어렵게 한다.

좋은 테스트 데이터의 조건은 다음과 같다.

- 크기가 작다.
- 의도가 분명하다.
- 테스트 코드에서 바로 이해할 수 있다.
- 경계값과 예외 상황을 포함한다.
- 실제 개인정보나 민감 정보를 포함하지 않는다.

작은 데이터는 테스트 코드 안에 직접 둘 수 있다.

\`\`\`python
orders = [
    {"id": 1, "price": 10000, "quantity": 2},
    {"id": 2, "price": 15000, "quantity": 1},
]
\`\`\`

파일 형식 자체를 테스트해야 한다면 \`tests/fixtures\` 폴더를 사용할 수 있다.

\`\`\`text
tests/
  fixtures/
    sample_orders.csv
    invalid_orders.csv
\`\`\`

## 테스트가 설계를 바꾸는 방식

테스트를 작성하다 보면 코드의 설계 문제가 드러난다.

예를 들어 테스트하기 어렵다면 다음 질문을 해볼 수 있다.

- 함수가 너무 많은 일을 하고 있지 않은가?
- 외부 의존성을 직접 만들고 있지 않은가?
- 결과를 반환하지 않고 출력만 하고 있지 않은가?
- 현재 시간이나 환경 변수에 직접 의존하고 있지 않은가?
- 파일 경로가 코드 안에 고정되어 있지 않은가?

테스트하기 어려운 코드를 억지로 테스트하려 하기보다, 테스트하기 쉬운 구조로 코드를 개선하는 것이 좋다.

---

# 12.9 종합 예제: CSV 검증 도구 테스트하기

이번에는 데이터분석 과정으로 이어질 수 있는 예제를 만들어 보자. CSV 파일에서 읽은 행 데이터가 다음 조건을 만족하는지 검증하는 코드를 작성한다.

- \`name\`, \`email\`, \`age\` 필드가 있어야 한다.
- \`name\`과 \`email\`은 비어 있으면 안 된다.
- \`age\`는 정수로 변환 가능해야 한다.
- \`age\`는 0 이상이어야 한다.

## 검증 코드

\`\`\`python
# src/my_app/validators.py

class RowValidationError(ValueError):
    pass


REQUIRED_FIELDS = ["name", "email", "age"]


def validate_customer_row(row: dict[str, str]) -> None:
    for field in REQUIRED_FIELDS:
        if field not in row:
            raise RowValidationError(f"필수 필드가 없습니다: {field}")

    if not row["name"].strip():
        raise RowValidationError("이름이 비어 있습니다")

    if not row["email"].strip():
        raise RowValidationError("이메일이 비어 있습니다")

    try:
        age = int(row["age"])
    except ValueError as error:
        raise RowValidationError("나이는 정수여야 합니다") from error

    if age < 0:
        raise RowValidationError("나이는 0 이상이어야 합니다")
\`\`\`

## 테스트 코드

\`\`\`python
# tests/test_validators.py

import pytest

from my_app.validators import RowValidationError, validate_customer_row


def test_validate_customer_row_success():
    row = {
        "name": "민수",
        "email": "minsu@example.com",
        "age": "25",
    }

    validate_customer_row(row)


@pytest.mark.parametrize(
    "row, message",
    [
        ({"email": "a@example.com", "age": "20"}, "name"),
        ({"name": "민수", "age": "20"}, "email"),
        ({"name": "민수", "email": "a@example.com"}, "age"),
        ({"name": "", "email": "a@example.com", "age": "20"}, "이름"),
        ({"name": "민수", "email": "", "age": "20"}, "이메일"),
        ({"name": "민수", "email": "a@example.com", "age": "abc"}, "정수"),
        ({"name": "민수", "email": "a@example.com", "age": "-1"}, "0 이상"),
    ],
)
def test_validate_customer_row_invalid(row, message):
    with pytest.raises(RowValidationError, match=message):
        validate_customer_row(row)
\`\`\`

이 테스트는 정상 케이스 하나와 여러 실패 케이스를 확인한다. parametrization을 사용했기 때문에 코드 중복이 줄어들고, 어떤 입력이 어떤 예외를 발생시키는지 명확하게 볼 수 있다.

## 파일 검증 함수로 확장하기

이제 여러 행을 검증하고 실패한 행만 모으는 함수를 생각해보자.

\`\`\`python
# src/my_app/validators.py


def collect_invalid_rows(rows: list[dict[str, str]]) -> list[dict[str, str]]:
    invalid_rows = []

    for index, row in enumerate(rows, start=1):
        try:
            validate_customer_row(row)
        except RowValidationError as error:
            invalid_rows.append({
                "row_number": str(index),
                "error": str(error),
                **row,
            })

    return invalid_rows
\`\`\`

테스트는 다음과 같다.

\`\`\`python

def test_collect_invalid_rows():
    rows = [
        {"name": "민수", "email": "minsu@example.com", "age": "25"},
        {"name": "", "email": "empty@example.com", "age": "20"},
        {"name": "지영", "email": "jiyoung@example.com", "age": "abc"},
    ]

    result = collect_invalid_rows(rows)

    assert len(result) == 2
    assert result[0]["row_number"] == "2"
    assert "이름" in result[0]["error"]
    assert result[1]["row_number"] == "3"
    assert "정수" in result[1]["error"]
\`\`\`

이 예제는 데이터분석 과정 전에 반드시 필요한 데이터 품질 검증 로직이다. 데이터분석 자체는 나중에 pandas로 진행하더라도, 데이터를 분석 가능한 상태로 만들기 위해서는 이런 검증 코드가 필요하다.

---

# 12.10 테스트 작성 체크리스트

테스트를 작성할 때 다음 질문을 점검하자.

## 테스트 대상

- 테스트하려는 함수나 클래스의 역할이 명확한가?
- 하나의 테스트가 하나의 동작을 검증하는가?
- 테스트 이름만 보고 의도를 알 수 있는가?

## 입력과 출력

- 정상 입력을 테스트했는가?
- 잘못된 입력을 테스트했는가?
- 경계값을 테스트했는가?
- 반환값을 명확히 검증했는가?

## 외부 의존성

- 실제 API를 호출하지 않는가?
- 실제 운영 파일을 변경하지 않는가?
- 현재 시간이나 랜덤값에 의존하지 않는가?
- 필요한 경우 mock이나 fixture를 사용했는가?

## 테스트 구조

- 반복되는 준비 코드를 fixture로 분리했는가?
- 같은 동작의 여러 입력값은 parametrization을 사용했는가?
- 테스트 데이터가 너무 크거나 복잡하지 않은가?
- 테스트 실패 시 원인을 쉽게 찾을 수 있는가?

## 유지보수

- 내부 구현에 너무 의존하지 않는가?
- 코드 수정 후에도 의미 있는 테스트로 남는가?
- 테스트 코드도 읽기 쉽게 작성되었는가?
- 커버리지 숫자보다 중요한 로직 검증에 집중했는가?

---

# 12장 핵심 정리

- 테스트는 코드가 의도대로 동작하는지 확인하는 코드다.
- 고급 테스트에서는 단순 결과 검증뿐 아니라 준비, 정리, 외부 의존성 대체까지 고려해야 한다.
- 테스트하기 쉬운 코드는 입력과 출력이 명확하고, 외부 의존성이 분리되어 있다.
- \`pytest\`는 간결한 \`assert\`, 예외 테스트, fixture, parametrization 등 실무 테스트에 유용한 기능을 제공한다.
- fixture는 테스트 준비 코드를 재사용하게 해준다.
- \`yield\` fixture를 사용하면 테스트 전후 작업을 나눌 수 있다.
- \`conftest.py\`는 여러 테스트 파일에서 공통 fixture를 공유할 때 사용한다.
- parametrization은 같은 테스트를 여러 입력값으로 반복 실행할 때 유용하다.
- mock은 API, 파일, 시간, 이메일 발송 같은 외부 의존성을 테스트에서 대체하는 데 사용한다.
- \`patch()\`를 사용할 때는 테스트 대상 코드가 실제로 참조하는 위치를 패치해야 한다.
- \`monkeypatch\`는 환경 변수나 객체 속성을 테스트 중 임시로 바꿀 때 유용하다.
- 커버리지는 테스트가 실행한 코드 범위를 보여주지만, 테스트 품질을 완전히 보장하지는 않는다.
- 좋은 테스트는 좋은 설계를 유도한다.

---

# 연습문제

## 문제 1. 테스트 가능한 코드로 바꾸기

다음 함수는 사용자 입력, 계산, 출력을 한 번에 처리한다.

\`\`\`python

def run():
    price = int(input("가격: "))
    quantity = int(input("수량: "))
    print(price * quantity)
\`\`\`

이 코드에서 계산 로직만 테스트할 수 있도록 함수를 분리해보자.

---

## 문제 2. 예외 테스트 작성하기

다음 함수가 있다.

\`\`\`python

def calculate_average(numbers: list[int]) -> float:
    if not numbers:
        raise ValueError("빈 리스트는 평균을 계산할 수 없습니다")
    return sum(numbers) / len(numbers)
\`\`\`

빈 리스트가 들어왔을 때 \`ValueError\`가 발생하는지 테스트하는 코드를 작성하라.

---

## 문제 3. parametrization 사용하기

다음 함수를 여러 입력값으로 테스트하라.

\`\`\`python

def is_free_shipping(total_price: int) -> bool:
    return total_price >= 50000
\`\`\`

다음 케이스를 모두 테스트해야 한다.

| 입력값 | 기대 결과 |
|---:|---|
| 49999 | False |
| 50000 | True |
| 50001 | True |

---

## 문제 4. fixture 작성하기

다음과 같은 주문 목록을 여러 테스트에서 사용하려고 한다.

\`\`\`python
orders = [
    {"id": 1, "price": 10000, "quantity": 2},
    {"id": 2, "price": 15000, "quantity": 1},
]
\`\`\`

이 데이터를 반환하는 pytest fixture를 작성하라.

---

## 문제 5. tmp_path 사용하기

다음 함수를 테스트하라.

\`\`\`python
from pathlib import Path


def save_result(path: Path, result: str) -> None:
    path.write_text(result, encoding="utf-8")
\`\`\`

\`tmp_path\`를 사용해 파일이 올바르게 저장되는지 확인하라.

---

## 문제 6. mock으로 외부 호출 대체하기

다음 함수는 \`email_sender\` 객체를 받아 이메일을 보낸다.

\`\`\`python

def notify_user(email_sender, email: str) -> None:
    email_sender.send(email, "작업이 완료되었습니다")
\`\`\`

실제 이메일을 보내지 않고, \`send()\`가 올바른 인자로 한 번 호출되었는지 확인하는 테스트를 작성하라.

---

## 문제 7. 환경 변수 테스트하기

다음 함수를 테스트하라.

\`\`\`python
import os


def get_mode() -> str:
    return os.getenv("APP_MODE", "development")
\`\`\`

\`monkeypatch\`를 사용해 \`APP_MODE\`가 \`test\`일 때 함수가 \`test\`를 반환하는지 확인하라.

---

## 문제 8. 커버리지에 대한 설명

다음 문장이 맞으면 O, 틀리면 X를 표시하라.

1. 커버리지가 100%이면 테스트 품질도 반드시 완벽하다.
2. 커버리지는 테스트가 실행한 코드 범위를 확인하는 데 도움이 된다.
3. 결과를 검증하지 않는 테스트도 커버리지를 올릴 수 있다.
4. 커버리지는 중요한 로직이 테스트에서 빠졌는지 확인하는 참고 자료로 사용할 수 있다.

---

# 정답 및 해설

## 문제 1 정답

\`\`\`python

def calculate_total_price(price: int, quantity: int) -> int:
    return price * quantity


def run():
    price = int(input("가격: "))
    quantity = int(input("수량: "))
    print(calculate_total_price(price, quantity))
\`\`\`

테스트는 계산 함수에 대해 작성할 수 있다.

\`\`\`python

def test_calculate_total_price():
    assert calculate_total_price(10000, 3) == 30000
\`\`\`

입력과 출력이 섞인 코드는 테스트하기 어렵다. 계산 로직을 별도 함수로 분리하면 테스트가 쉬워진다.

---

## 문제 2 정답

\`\`\`python
import pytest


def test_calculate_average_empty_list():
    with pytest.raises(ValueError, match="빈 리스트"):
        calculate_average([])
\`\`\`

예외가 발생해야 하는 상황은 \`pytest.raises()\`로 검증한다. \`match\`를 사용하면 예외 메시지 일부도 확인할 수 있다.

---

## 문제 3 정답

\`\`\`python
import pytest


@pytest.mark.parametrize(
    "total_price, expected",
    [
        (49999, False),
        (50000, True),
        (50001, True),
    ],
)
def test_is_free_shipping(total_price, expected):
    assert is_free_shipping(total_price) is expected
\`\`\`

무료 배송 기준처럼 조건이 바뀌는 지점은 경계값 테스트가 중요하다.

---

## 문제 4 정답

\`\`\`python
import pytest


@pytest.fixture
def sample_orders():
    return [
        {"id": 1, "price": 10000, "quantity": 2},
        {"id": 2, "price": 15000, "quantity": 1},
    ]
\`\`\`

사용 예시는 다음과 같다.

\`\`\`python

def test_order_count(sample_orders):
    assert len(sample_orders) == 2
\`\`\`

fixture는 반복되는 테스트 데이터를 재사용할 때 유용하다.

---

## 문제 5 정답

\`\`\`python

def test_save_result(tmp_path):
    file_path = tmp_path / "result.txt"

    save_result(file_path, "success")

    assert file_path.read_text(encoding="utf-8") == "success"
\`\`\`

\`tmp_path\`를 사용하면 실제 프로젝트 파일을 건드리지 않고 안전하게 파일 테스트를 할 수 있다.

---

## 문제 6 정답

\`\`\`python
from unittest.mock import Mock


def test_notify_user():
    email_sender = Mock()

    notify_user(email_sender, "user@example.com")

    email_sender.send.assert_called_once_with(
        "user@example.com",
        "작업이 완료되었습니다",
    )
\`\`\`

mock을 사용하면 실제 이메일을 보내지 않고, 이메일 발송 객체가 어떻게 호출되었는지만 검증할 수 있다.

---

## 문제 7 정답

\`\`\`python

def test_get_mode(monkeypatch):
    monkeypatch.setenv("APP_MODE", "test")

    assert get_mode() == "test"
\`\`\`

\`monkeypatch.setenv()\`는 테스트 중 환경 변수를 임시로 설정한다. 테스트가 끝나면 변경은 되돌아간다.

---

## 문제 8 정답

1. X  
2. O  
3. O  
4. O  

커버리지가 높다고 해서 테스트 품질이 항상 좋은 것은 아니다. 결과를 검증하지 않고 함수만 실행해도 커버리지는 올라갈 수 있다. 커버리지는 테스트의 품질을 보장하는 지표라기보다, 테스트가 어느 코드를 실행했는지 확인하는 참고 자료로 사용하는 것이 좋다.

---

# 다음 장 예고

다음 장에서는 **파일과 데이터 입출력 심화**를 다룬다. 기초 과정에서 텍스트 파일, CSV, 엑셀 파일을 읽고 쓰는 방법을 배웠다면, 고급 과정에서는 더 큰 파일을 안전하게 처리하는 방법을 배운다.

다음 장에서 다룰 주요 내용은 다음과 같다.

- 텍스트와 바이너리 파일의 차이
- 인코딩과 디코딩 심화
- 대용량 파일을 한 줄씩 처리하는 방법
- CSV 처리 심화
- JSON Lines 형식
- 압축 파일 처리
- 파일 시스템을 안전하게 다루는 방법

테스트 심화에서 배운 내용은 다음 장의 파일 처리 코드에도 그대로 이어진다. 파일 처리 코드는 외부 환경에 영향을 받기 쉽기 때문에, \`tmp_path\`, fixture, 예외 테스트를 적극적으로 활용해야 한다.
`;export{e as default};