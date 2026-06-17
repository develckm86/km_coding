var e=`<!-- 원본: python_advanced_chapter_14_book.md / 세부 장: 14-3 -->

# 14.3 API 클라이언트 설계

## 왜 API 클라이언트가 필요한가

API를 한두 번 호출할 때는 함수 하나면 충분할 수 있다. 하지만 실무에서는 보통 같은 서버의 여러 엔드포인트를 반복해서 호출한다.

예를 들어 다음과 같은 API를 사용한다고 하자.

\`\`\`text
GET /users
GET /orders
GET /products
GET /orders/{order_id}
\`\`\`

모든 요청에 공통으로 필요한 정보가 있다.

- 기본 URL
- 인증 헤더
- 타임아웃
- 공통 예외 처리
- 공통 로그
- 재시도 설정

이런 공통 요소를 매번 함수에 반복해서 작성하면 코드가 길어지고 실수가 늘어난다. 그래서 API 요청을 담당하는 클래스를 만들어 관리하는 것이 좋다.

## 기본 API 클라이언트

가장 단순한 형태의 API 클라이언트는 다음과 같다.

\`\`\`python
import requests


class APIClient:
    def __init__(self, base_url: str, timeout: int = 10):
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self.session = requests.Session()

    def get(self, path: str, params: dict | None = None) -> dict | list:
        url = self._build_url(path)
        response = self.session.get(url, params=params, timeout=self.timeout)
        response.raise_for_status()
        return response.json()

    def _build_url(self, path: str) -> str:
        return f"{self.base_url}/{path.lstrip('/')}"
\`\`\`

사용 예시는 다음과 같다.

\`\`\`python
client = APIClient("https://api.example.com")
users = client.get("/users")
orders = client.get("/orders", params={"page": 1, "limit": 100})
\`\`\`

이 구조의 장점은 API 호출 방식이 한 곳에 모인다는 점이다. 나중에 인증 헤더, 로그, 재시도, 응답 검증을 추가할 때도 \`APIClient\`만 수정하면 된다.

## Session을 사용하는 이유

\`requests.Session()\`은 여러 요청에서 설정을 재사용할 수 있게 해 준다.

\`\`\`python
session = requests.Session()
session.headers.update({"Accept": "application/json"})

response1 = session.get("https://api.example.com/users", timeout=10)
response2 = session.get("https://api.example.com/orders", timeout=10)
\`\`\`

Session을 사용하면 공통 헤더, 쿠키, 연결 풀 등을 재사용할 수 있다. API를 여러 번 호출하는 수집기에서는 \`requests.get()\`을 매번 직접 호출하는 것보다 Session을 사용하는 구조가 더 관리하기 쉽다.

## 응답 처리 분리하기

API 클라이언트에는 응답 처리 메서드를 따로 두는 것이 좋다.

\`\`\`python
import requests


class APIClient:
    def __init__(self, base_url: str, timeout: int = 10):
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self.session = requests.Session()
        self.session.headers.update({"Accept": "application/json"})

    def get(self, path: str, params: dict | None = None) -> dict | list | None:
        url = self._build_url(path)
        response = self.session.get(url, params=params, timeout=self.timeout)
        return self._handle_response(response)

    def _build_url(self, path: str) -> str:
        return f"{self.base_url}/{path.lstrip('/')}"

    def _handle_response(self, response: requests.Response) -> dict | list | None:
        response.raise_for_status()

        if response.status_code == 204:
            return None

        return response.json()
\`\`\`

\`204 No Content\`는 요청은 성공했지만 응답 본문이 없다는 의미다. 이 경우 \`response.json()\`을 호출하면 실패할 수 있으므로 따로 처리하는 것이 좋다.

## 엔드포인트별 메서드 만들기

실무에서는 API 경로를 사용하는 쪽에서 직접 문자열로 넣는 것보다, 의미가 드러나는 메서드를 만드는 것이 좋다.

\`\`\`python
class OrderAPIClient(APIClient):
    def fetch_orders(self, page: int = 1, limit: int = 100) -> dict | list:
        return self.get("/orders", params={"page": page, "limit": limit})

    def fetch_order_detail(self, order_id: int) -> dict:
        return self.get(f"/orders/{order_id}")
\`\`\`

사용 코드는 훨씬 읽기 쉬워진다.

\`\`\`python
client = OrderAPIClient("https://api.example.com")
orders = client.fetch_orders(page=1, limit=100)
order = client.fetch_order_detail(1001)
\`\`\`

이렇게 하면 API 경로가 바뀌어도 호출하는 쪽 코드를 많이 수정하지 않아도 된다.

## 요청 코드와 데이터 처리 코드 분리하기

좋지 않은 구조는 API 요청, 데이터 추출, 파일 저장이 한 함수에 모두 들어 있는 구조다.

\`\`\`python
# 좋지 않은 예

def collect_orders():
    response = requests.get("https://api.example.com/orders", timeout=10)
    data = response.json()

    rows = []
    for item in data["items"]:
        rows.append({
            "id": item["id"],
            "amount": item["amount"],
        })

    with open("orders.csv", "w", encoding="utf-8") as file:
        ...
\`\`\`

이 함수는 너무 많은 일을 한다.

- API 요청
- JSON 파싱
- 필요한 필드 추출
- CSV 저장

고급 과정에서는 역할을 나누는 습관이 중요하다.

\`\`\`python
def fetch_orders(client: APIClient) -> list[dict]:
    data = client.get("/orders")
    return data["items"]


def normalize_order(item: dict) -> dict:
    return {
        "id": item.get("id"),
        "amount": item.get("amount"),
        "created_at": item.get("created_at"),
    }


def save_orders(rows: list[dict], path: str) -> None:
    ...
\`\`\`

각 함수가 하나의 역할만 가지면 테스트하기 쉽고, 문제가 발생했을 때 원인을 찾기 쉽다.

---
`;export{e as default};