var e=`<!-- 원본: python_advanced_chapter_12_book.md / 세부 장: 12-5 -->

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
`;export{e as default};