var e=`<!-- 원본: python_advanced_chapter_12_book.md / 세부 장: 12-7 -->

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
`;export{e as default};