var e=`<!-- 원본: python_advanced_chapter_5_book.md / 세부 장: 5-6 -->

# 5.6 실무에서 자주 만나는 데코레이터

데코레이터를 직접 만드는 것도 중요하지만, 실무에서는 이미 만들어진 데코레이터를 읽는 일이 더 많습니다.

대표적인 예는 다음과 같습니다.

- \`@property\`
- \`@classmethod\`
- \`@staticmethod\`
- \`@dataclass\`
- \`@pytest.fixture\`
- 웹 프레임워크의 라우터 데코레이터

이번 절에서는 기초 과정에서 봤던 데코레이터를 데코레이터 관점에서 다시 정리합니다.

---

### 5.6.1 \`@property\`

\`@property\`는 메서드를 속성처럼 사용할 수 있게 해주는 데코레이터입니다.

\`\`\`python
class Product:
    def __init__(self, price, quantity):
        self.price = price
        self.quantity = quantity

    @property
    def total_price(self):
        return self.price * self.quantity


product = Product(10000, 3)
print(product.total_price)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
30000
\`\`\`

\`total_price\`는 메서드처럼 정의되어 있지만 사용할 때는 괄호를 붙이지 않습니다.

\`\`\`python
product.total_price
\`\`\`

이렇게 하면 계산된 값을 속성처럼 제공할 수 있습니다.

\`@property\`는 다음과 같은 상황에서 유용합니다.

- 실제로 저장된 값이 아니라 계산된 값을 제공할 때
- 외부에서는 속성처럼 읽게 하고 내부에서는 메서드로 계산하고 싶을 때
- 읽기 전용 값을 만들고 싶을 때

---

### 5.6.2 \`@classmethod\`

\`@classmethod\`는 인스턴스가 아니라 클래스 자체를 첫 번째 인자로 받는 메서드를 만들 때 사용합니다.

\`\`\`python
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

    @classmethod
    def from_text(cls, text):
        name, email = text.split(",")
        return cls(name.strip(), email.strip())


user = User.from_text("홍길동, hong@example.com")
print(user.name)
print(user.email)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
홍길동
hong@example.com
\`\`\`

\`from_text\`는 문자열을 받아 \`User\` 객체를 생성합니다. 이런 메서드를 **대체 생성자**라고 부르기도 합니다.

\`@classmethod\`는 다음과 같은 상황에서 유용합니다.

- 문자열, 딕셔너리, JSON 등으로부터 객체를 만들 때
- 클래스 변수를 다룰 때
- 상속을 고려해 \`cls\`로 객체를 생성하고 싶을 때

---

### 5.6.3 \`@staticmethod\`

\`@staticmethod\`는 인스턴스 상태나 클래스 상태를 사용하지 않는 메서드를 클래스 안에 넣고 싶을 때 사용합니다.

\`\`\`python
class Validator:
    @staticmethod
    def is_email(value):
        return "@" in value and "." in value


print(Validator.is_email("user@example.com"))
print(Validator.is_email("invalid-email"))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
False
\`\`\`

\`is_email()\`은 특정 객체의 상태를 사용하지 않습니다. 단지 이메일 형식인지 검사하는 유틸리티 함수입니다.

\`@staticmethod\`는 다음과 같은 상황에서 유용합니다.

- 클래스와 관련은 있지만 객체 상태를 사용하지 않는 함수
- 간단한 검증 함수
- 변환 함수
- 계산 도우미 함수

다만 모든 유틸리티 함수를 클래스 안에 넣을 필요는 없습니다. 클래스와 관련이 약하다면 일반 함수로 두는 편이 더 낫습니다.

---

### 5.6.4 \`@dataclass\`

\`@dataclass\`는 데이터를 담는 클래스를 간단하게 만들 수 있게 해주는 데코레이터입니다.

\`\`\`python
from dataclasses import dataclass


@dataclass
class Product:
    name: str
    price: int
    quantity: int


product = Product("키보드", 30000, 2)
print(product)
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
Product(name='키보드', price=30000, quantity=2)
\`\`\`

\`@dataclass\`를 사용하면 \`__init__\`, \`__repr__\`, 비교 관련 메서드 등을 자동으로 만들어줍니다.

기초 과정에서는 \`@dataclass\`를 “데이터를 담는 클래스를 쉽게 만드는 문법”으로 배웠습니다. 고급 과정에서는 이것도 데코레이터라는 사실을 이해하면 됩니다. 즉, \`@dataclass\`는 클래스 정의를 받아서 여러 기능이 추가된 클래스로 바꿔주는 역할을 합니다.

---

### 5.6.5 \`@pytest.fixture\`

테스트 코드에서는 \`@pytest.fixture\`라는 데코레이터를 자주 만납니다.

\`\`\`python
import pytest


@pytest.fixture
def sample_user():
    return {"name": "홍길동", "email": "hong@example.com"}


def test_user_name(sample_user):
    assert sample_user["name"] == "홍길동"
\`\`\`

\`@pytest.fixture\`는 테스트에서 반복적으로 사용할 준비 데이터를 만드는 데 사용됩니다.

이 장에서 pytest를 자세히 다루지는 않습니다. 중요한 점은 \`@pytest.fixture\`도 데코레이터라는 것입니다. 즉, \`sample_user\` 함수에 테스트 도구가 필요한 기능을 덧붙이는 역할을 합니다.

---

### 5.6.6 웹 프레임워크의 라우터 데코레이터

웹 프레임워크에서도 데코레이터가 자주 사용됩니다.

예를 들어 FastAPI나 Flask 같은 프레임워크에서는 다음과 같은 형태의 코드를 볼 수 있습니다.

\`\`\`python
@app.get("/users")
def get_users():
    return ["민수", "지영", "철수"]
\`\`\`

여기서 \`@app.get("/users")\`는 \`get_users\` 함수를 \`/users\`라는 주소와 연결합니다.

웹 프레임워크를 아직 배우지 않았더라도 다음 정도로 이해하면 됩니다.

\`\`\`text
이 함수는 특정 URL로 요청이 들어왔을 때 실행될 함수로 등록된다.
\`\`\`

프레임워크의 데코레이터는 직접 만들기보다 먼저 읽을 수 있어야 합니다. 데코레이터 문법을 이해하면 나중에 웹 개발, 테스트, 데이터 파이프라인 도구를 배울 때 코드가 훨씬 덜 낯설게 느껴집니다.

---
`;export{e as default};