var e=`<!-- 원본: python_advanced_chapter_12_book.md / 세부 장: 12-3 -->

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
`;export{e as default};