var e=`<!-- 원본: python_advanced_chapter_12_book.md / 세부 장: 12-10 -->

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