var e=`# 14장 API와 네트워크 데이터 처리

## 이 장에서 배울 내용

기초 과정에서는 \`requests.get()\`으로 API를 호출하고, 응답으로 받은 JSON에서 필요한 값을 꺼내는 방법을 배웠다. 고급 과정에서는 여기서 한 단계 더 나아간다. 실무에서 API를 사용할 때 중요한 것은 단순히 요청을 보내는 것이 아니라, **실패할 수 있는 외부 시스템을 안정적으로 다루는 것**이다.

API 서버는 항상 정상적으로 응답하지 않는다. 네트워크가 끊길 수도 있고, 서버가 느릴 수도 있고, 인증 토큰이 잘못되었을 수도 있다. 요청을 너무 많이 보내서 제한에 걸릴 수도 있고, 응답 구조가 문서와 다를 수도 있다. 페이지네이션이 적용된 API라면 한 번의 요청으로 모든 데이터를 받을 수 없기 때문에 여러 페이지를 반복해서 가져와야 한다.

데이터분석 과정으로 넘어가기 전에 API와 네트워크 데이터 처리를 배우는 이유는 분명하다. 많은 분석 데이터는 엑셀 파일이나 CSV 파일로만 주어지지 않는다. 공공 데이터, 사내 시스템, 광고 플랫폼, 쇼핑몰, 협업 도구, 금융 데이터, 로그 시스템 등은 API를 통해 데이터를 제공한다. 따라서 분석 전에 데이터를 안정적으로 수집하고 저장하는 능력이 필요하다.

이 장에서는 다음 내용을 다룬다.

- HTTP 요청과 응답 구조 복습
- URL, 쿼리 파라미터, 헤더, 상태 코드
- \`requests\`를 사용한 안전한 API 요청
- \`timeout\`, \`raise_for_status()\`, 예외 처리
- API 클라이언트 클래스로 요청 코드 구조화
- API Key와 Bearer Token 인증
- 환경 변수로 민감 정보 관리
- 페이지네이션 처리
- 재시도와 백오프 전략
- Rate Limit 대응
- API 응답 데이터 검증과 저장
- 실무형 API 데이터 수집기 구조

이 장의 목표는 “API를 한 번 호출하는 코드”가 아니라, **반복 실행해도 안정적으로 동작하는 API 수집 코드**를 작성할 수 있게 되는 것이다.

---

# 14.1 HTTP 복습

## API는 프로그램끼리 대화하는 통로다

API는 Application Programming Interface의 약자다. 쉽게 말하면 프로그램이 다른 프로그램의 기능이나 데이터에 접근하기 위해 사용하는 약속이다. 웹 API는 보통 HTTP라는 통신 규칙을 사용한다.

예를 들어 날씨 서비스가 다음과 같은 API를 제공한다고 하자.

\`\`\`text
https://api.example.com/weather?city=Seoul
\`\`\`

이 주소로 요청을 보내면 서버는 서울의 날씨 데이터를 JSON 형태로 돌려줄 수 있다.

\`\`\`json
{
  "city": "Seoul",
  "temperature": 27.4,
  "condition": "cloudy"
}
\`\`\`

우리가 브라우저에서 웹사이트를 볼 때도 HTTP 요청과 응답이 오간다. API도 같은 HTTP를 사용하지만, 사람이 보는 HTML 화면 대신 프로그램이 읽기 쉬운 JSON 데이터를 주고받는 경우가 많다.

## 요청과 응답

HTTP 통신은 기본적으로 요청과 응답으로 이루어진다.

\`\`\`text
클라이언트  ---- 요청 ---->  서버
클라이언트  <--- 응답 ----   서버
\`\`\`

파이썬 프로그램은 클라이언트 역할을 한다. 서버에게 “이 데이터를 주세요”라고 요청하면 서버는 처리 결과를 응답으로 보낸다.

요청에는 보통 다음 정보가 포함된다.

- 요청 URL
- HTTP 메서드
- 쿼리 파라미터
- 헤더
- 요청 본문
- 인증 정보

응답에는 보통 다음 정보가 포함된다.

- 상태 코드
- 응답 헤더
- 응답 본문
- 응답 인코딩
- 쿠키

API 코드를 작성할 때는 요청을 잘 만드는 것도 중요하지만, 응답을 올바르게 해석하는 것이 더 중요하다.

## HTTP 메서드

HTTP 메서드는 서버에게 어떤 작업을 요청하는지 표현한다.

| 메서드 | 의미 | 주로 사용하는 상황 |
|---|---|---|
| \`GET\` | 데이터 조회 | 목록 조회, 상세 조회 |
| \`POST\` | 데이터 생성 또는 요청 본문 전달 | 새 데이터 생성, 검색 요청 |
| \`PUT\` | 전체 수정 | 기존 데이터 전체 변경 |
| \`PATCH\` | 일부 수정 | 기존 데이터 일부 변경 |
| \`DELETE\` | 삭제 | 데이터 삭제 |

데이터 수집과 분석 전처리에서는 대부분 \`GET\` 요청을 많이 사용한다. 외부 API에서 데이터를 가져오는 작업이 많기 때문이다.

하지만 API에 따라 검색 조건이 복잡하면 \`POST\` 요청에 JSON 본문을 담아 보내기도 한다.

## URL 구조

URL은 단순한 문자열처럼 보이지만 여러 부분으로 나뉜다.

\`\`\`text
https://api.example.com/v1/orders?page=1&limit=100
\`\`\`

위 URL은 다음과 같이 나눌 수 있다.

| 부분 | 예시 | 의미 |
|---|---|---|
| 스킴 | \`https\` | 통신 방식 |
| 호스트 | \`api.example.com\` | 서버 주소 |
| 경로 | \`/v1/orders\` | 접근할 API 자원 |
| 쿼리 문자열 | \`page=1&limit=100\` | 요청 조건 |

파이썬에서는 URL을 문자열로 직접 이어 붙일 수도 있지만, 쿼리 파라미터는 가능하면 \`params\`나 \`urllib.parse\`를 사용해 처리하는 것이 안전하다.

\`\`\`python
from urllib.parse import urlencode

params = {
    "page": 1,
    "limit": 100,
    "keyword": "python api",
}

query_string = urlencode(params)
print(query_string)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
page=1&limit=100&keyword=python+api
\`\`\`

공백이나 한글처럼 URL에 그대로 넣기 어려운 문자는 적절한 방식으로 인코딩되어야 한다. \`requests\`의 \`params\` 인자를 사용하면 이 과정을 직접 처리하지 않아도 된다.

## 쿼리 파라미터

쿼리 파라미터는 API에 조건을 전달할 때 많이 사용한다.

\`\`\`text
https://api.example.com/orders?status=paid&page=1
\`\`\`

여기서 \`status=paid\`와 \`page=1\`이 쿼리 파라미터다.

\`requests\`에서는 다음처럼 딕셔너리로 전달한다.

\`\`\`python
import requests

url = "https://api.example.com/orders"
params = {
    "status": "paid",
    "page": 1,
}

response = requests.get(url, params=params, timeout=10)
\`\`\`

이 방식은 문자열로 URL을 직접 조립하는 것보다 안전하다. 값에 공백, 한글, 특수 문자가 포함되어도 라이브러리가 적절히 처리해 준다.

## 헤더

헤더는 요청이나 응답에 대한 부가 정보를 담는다. API 요청에서는 다음과 같은 정보를 헤더에 담는 경우가 많다.

- 인증 토큰
- 응답 형식
- 요청 본문 형식
- 사용자 에이전트
- 요청 추적 ID

예를 들어 Bearer Token 인증을 사용하는 API는 다음과 같은 헤더를 요구할 수 있다.

\`\`\`text
Authorization: Bearer <token>
\`\`\`

파이썬에서는 다음처럼 작성한다.

\`\`\`python
headers = {
    "Authorization": "Bearer my-token",
    "Accept": "application/json",
}

response = requests.get(
    "https://api.example.com/users",
    headers=headers,
    timeout=10,
)
\`\`\`

민감한 인증 정보는 코드에 직접 적지 않는 것이 원칙이다. 뒤에서 환경 변수를 사용해 관리하는 방법을 다룬다.

## 상태 코드

HTTP 상태 코드는 서버가 요청을 어떻게 처리했는지 알려준다.

| 범위 | 의미 | 예시 |
|---|---|---|
| 100번대 | 정보 응답 | 요청 처리 중 |
| 200번대 | 성공 | \`200 OK\`, \`201 Created\` |
| 300번대 | 리다이렉션 | 다른 위치로 이동 |
| 400번대 | 클라이언트 오류 | \`400 Bad Request\`, \`401 Unauthorized\`, \`404 Not Found\` |
| 500번대 | 서버 오류 | \`500 Internal Server Error\`, \`503 Service Unavailable\` |

실무 API 처리에서 자주 만나는 상태 코드는 다음과 같다.

| 상태 코드 | 의미 | 처리 방향 |
|---:|---|---|
| \`200\` | 요청 성공 | 데이터 처리 |
| \`201\` | 생성 성공 | 생성 결과 확인 |
| \`204\` | 성공했지만 응답 본문 없음 | 본문 파싱하지 않기 |
| \`400\` | 잘못된 요청 | 요청 파라미터 확인 |
| \`401\` | 인증 실패 | 토큰 또는 API Key 확인 |
| \`403\` | 권한 없음 | 권한 범위 확인 |
| \`404\` | 찾을 수 없음 | URL 또는 자원 ID 확인 |
| \`429\` | 요청이 너무 많음 | 대기 후 재시도 |
| \`500\` | 서버 내부 오류 | 재시도 또는 나중에 실행 |
| \`503\` | 서비스 이용 불가 | 재시도 또는 장애 대응 |

파이썬의 표준 라이브러리에는 상태 코드를 더 읽기 좋게 다룰 수 있는 \`HTTPStatus\`가 있다.

\`\`\`python
from http import HTTPStatus

print(HTTPStatus.OK)
print(HTTPStatus.OK.value)
print(HTTPStatus.OK.phrase)
\`\`\`

API 코드에서 매직 넘버처럼 \`200\`, \`404\`만 반복해서 쓰는 것보다, 의미가 드러나는 이름을 함께 사용하면 코드가 읽기 쉬워진다.

---

# 14.2 \`requests\`로 안전하게 요청하기

## 가장 기본적인 GET 요청

\`requests\`는 파이썬에서 HTTP 요청을 쉽게 보내기 위해 많이 사용하는 외부 라이브러리다. 기본적인 GET 요청은 다음과 같이 작성한다.

\`\`\`python
import requests

url = "https://api.example.com/users"
response = requests.get(url, timeout=10)

print(response.status_code)
print(response.text)
\`\`\`

여기서 \`response\`는 서버 응답을 담고 있는 객체다. 상태 코드, 응답 본문, 헤더, 인코딩 등 여러 정보를 가지고 있다.

하지만 실무에서는 위 코드만으로 부족하다. 최소한 다음 세 가지는 함께 고려해야 한다.

1. 요청이 너무 오래 걸리지 않도록 \`timeout\`을 지정한다.
2. 실패 상태 코드가 오면 적절히 처리한다.
3. JSON 파싱이 실패할 수 있음을 고려한다.

## timeout 지정하기

외부 API 요청은 항상 실패할 수 있다. 서버가 응답하지 않거나 네트워크가 불안정하면 프로그램이 오래 멈춰 있을 수 있다. 따라서 대부분의 외부 요청에는 \`timeout\`을 지정하는 습관이 필요하다.

\`\`\`python
import requests

response = requests.get(
    "https://api.example.com/users",
    timeout=10,
)
\`\`\`

\`timeout=10\`은 요청이 일정 시간 안에 진행되지 않으면 예외를 발생시키도록 한다. 실무에서는 연결 시간과 읽기 시간을 나누어 지정하기도 한다.

\`\`\`python
response = requests.get(
    "https://api.example.com/users",
    timeout=(3, 10),
)
\`\`\`

위 코드는 연결에는 최대 3초, 응답 읽기에는 최대 10초를 기다리겠다는 의미다.

\`timeout\`을 지정하지 않으면 프로그램이 예상보다 오래 멈출 수 있다. 자동화 작업이나 데이터 수집 스크립트에서는 이런 상황이 전체 작업 지연으로 이어진다.

## 응답 상태 확인하기

상태 코드를 직접 확인할 수도 있다.

\`\`\`python
response = requests.get("https://api.example.com/users", timeout=10)

if response.status_code == 200:
    data = response.json()
else:
    print("요청 실패:", response.status_code)
\`\`\`

하지만 매번 상태 코드를 직접 검사하면 코드가 길어진다. \`requests\`는 실패 상태 코드에 대해 예외를 발생시키는 \`raise_for_status()\` 메서드를 제공한다.

\`\`\`python
import requests

response = requests.get("https://api.example.com/users", timeout=10)
response.raise_for_status()

data = response.json()
\`\`\`

\`raise_for_status()\`는 400번대나 500번대 상태 코드가 응답되면 \`HTTPError\`를 발생시킨다. 이 메서드를 사용하면 “성공한 응답만 다음 단계로 넘긴다”는 흐름을 만들기 쉽다.

## JSON 응답 처리하기

API 응답이 JSON이라면 \`response.json()\`으로 파이썬 객체로 변환할 수 있다.

\`\`\`python
response = requests.get("https://api.example.com/users", timeout=10)
response.raise_for_status()

data = response.json()

print(type(data))
print(data)
\`\`\`

응답 JSON이 객체 형태라면 파이썬 딕셔너리로 변환된다.

\`\`\`json
{
  "id": 1,
  "name": "Alice"
}
\`\`\`

응답 JSON이 배열 형태라면 파이썬 리스트로 변환된다.

\`\`\`json
[
  {"id": 1, "name": "Alice"},
  {"id": 2, "name": "Bob"}
]
\`\`\`

다만 모든 응답이 항상 JSON인 것은 아니다. 서버가 HTML 에러 페이지를 돌려주거나, 응답 본문이 비어 있거나, JSON 형식이 깨져 있을 수 있다. 따라서 실무에서는 JSON 파싱도 예외 처리 대상이다.

\`\`\`python
import requests

try:
    response = requests.get("https://api.example.com/users", timeout=10)
    response.raise_for_status()
    data = response.json()
except requests.exceptions.HTTPError as error:
    print("HTTP 오류:", error)
except requests.exceptions.JSONDecodeError as error:
    print("JSON 파싱 오류:", error)
except requests.exceptions.RequestException as error:
    print("요청 오류:", error)
\`\`\`

\`RequestException\`은 \`requests\` 관련 예외의 상위 예외로 볼 수 있다. 구체적인 예외를 먼저 처리하고, 마지막에 넓은 범위의 예외를 처리하는 방식이 좋다.

## params로 쿼리 파라미터 전달하기

쿼리 파라미터가 있는 API는 다음처럼 호출한다.

\`\`\`python
import requests

url = "https://api.example.com/orders"
params = {
    "status": "paid",
    "page": 1,
    "limit": 100,
}

response = requests.get(url, params=params, timeout=10)
response.raise_for_status()

orders = response.json()
\`\`\`

이 방식은 다음처럼 URL을 직접 조립하는 것보다 안전하다.

\`\`\`python
# 권장하지 않는 방식
url = "https://api.example.com/orders?status=paid&page=1&limit=100"
\`\`\`

단순한 경우에는 직접 작성해도 동작하지만, 값에 공백이나 특수 문자가 포함되면 문제가 생길 수 있다. \`params\`를 사용하면 쿼리 문자열 인코딩을 라이브러리가 처리한다.

## headers 전달하기

인증이나 응답 형식을 지정할 때 헤더를 사용한다.

\`\`\`python
headers = {
    "Accept": "application/json",
    "Authorization": "Bearer my-token",
}

response = requests.get(
    "https://api.example.com/users",
    headers=headers,
    timeout=10,
)
\`\`\`

\`Accept\`는 클라이언트가 어떤 형식의 응답을 원하는지 서버에 알려준다. \`Authorization\`은 인증 정보를 전달할 때 사용한다.

## POST 요청과 JSON 본문

데이터 조회는 \`GET\`을 많이 사용하지만, 복잡한 검색 조건을 전달하거나 데이터를 생성할 때는 \`POST\`를 사용한다.

\`\`\`python
import requests

url = "https://api.example.com/search"
payload = {
    "keyword": "python",
    "start_date": "2026-01-01",
    "end_date": "2026-01-31",
}

response = requests.post(url, json=payload, timeout=10)
response.raise_for_status()

result = response.json()
\`\`\`

\`json=payload\`를 사용하면 요청 본문을 JSON으로 직렬화하고, 적절한 \`Content-Type\` 헤더도 설정된다. 반면 \`data=\`는 폼 데이터나 바이트 데이터를 보낼 때 사용하는 경우가 많다.

## 요청 함수로 분리하기

요청 코드가 여러 곳에 흩어지면 유지보수가 어렵다. 먼저 함수로 분리해 보자.

\`\`\`python
import requests


def fetch_json(url: str, params: dict | None = None) -> dict | list:
    response = requests.get(url, params=params, timeout=10)
    response.raise_for_status()
    return response.json()


users = fetch_json("https://api.example.com/users")
orders = fetch_json("https://api.example.com/orders", {"page": 1})
\`\`\`

이 함수는 간단하지만 중요한 구조를 가지고 있다.

- 요청을 보낸다.
- 실패 상태 코드를 예외로 처리한다.
- JSON으로 변환한다.
- 호출한 쪽에는 파이썬 데이터만 반환한다.

이런 식으로 “요청 처리”와 “데이터 활용”을 분리하면 코드가 깔끔해진다.

---

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

# 14.4 인증

## 인증이 필요한 이유

모든 API가 공개되어 있는 것은 아니다. 사용자 정보, 주문 정보, 결제 정보, 사내 데이터처럼 보호되어야 하는 데이터는 인증을 거쳐야 접근할 수 있다.

API 인증 방식은 서비스마다 다르지만, 실무에서 자주 만나는 방식은 다음과 같다.

- API Key
- Bearer Token
- Basic Auth
- OAuth 2.0

이 장에서는 API 수집과 자동화에서 자주 접하는 API Key와 Bearer Token 중심으로 다룬다.

## API Key 인증

API Key는 서비스가 발급하는 고유한 문자열이다. API 요청 시 이 값을 함께 보내면 서버가 사용자를 식별한다.

API Key는 쿼리 파라미터로 보내는 방식과 헤더로 보내는 방식이 있다.

### 쿼리 파라미터 방식

\`\`\`python
params = {
    "api_key": "my-api-key",
    "page": 1,
}

response = requests.get(
    "https://api.example.com/orders",
    params=params,
    timeout=10,
)
\`\`\`

### 헤더 방식

\`\`\`python
headers = {
    "X-API-Key": "my-api-key",
}

response = requests.get(
    "https://api.example.com/orders",
    headers=headers,
    timeout=10,
)
\`\`\`

가능하다면 API 문서에서 권장하는 방식을 따라야 한다. 보통 인증 정보는 URL에 노출되는 쿼리 파라미터보다 헤더에 담는 방식이 선호된다.

## Bearer Token 인증

Bearer Token 방식은 \`Authorization\` 헤더에 토큰을 담아 보낸다.

\`\`\`python
headers = {
    "Authorization": "Bearer my-token",
}

response = requests.get(
    "https://api.example.com/users",
    headers=headers,
    timeout=10,
)
\`\`\`

Bearer Token은 “이 토큰을 가진 사람에게 권한이 있다”는 의미로 사용된다. 따라서 토큰이 노출되면 다른 사람이 API에 접근할 수 있으므로 주의해야 한다.

## 환경 변수로 인증 정보 관리하기

API Key나 Token을 코드에 직접 적으면 안 된다.

\`\`\`python
# 좋지 않은 예
API_TOKEN = "real-secret-token"
\`\`\`

이런 코드는 다음과 같은 문제가 있다.

- GitHub 같은 저장소에 실수로 올라갈 수 있다.
- 다른 사람이 토큰을 볼 수 있다.
- 환경별로 다른 토큰을 쓰기 어렵다.
- 토큰을 교체할 때 코드를 수정해야 한다.

대신 환경 변수에서 읽어오는 구조를 사용한다.

\`\`\`python
import os

api_token = os.environ.get("API_TOKEN")

if not api_token:
    raise RuntimeError("API_TOKEN 환경 변수가 설정되어 있지 않습니다.")
\`\`\`

환경 변수는 운영체제나 실행 환경에 설정해 두고, 파이썬 프로그램은 실행 시 그 값을 읽어 사용한다.

API 클라이언트에 적용하면 다음과 같다.

\`\`\`python
import os
import requests


class APIClient:
    def __init__(self, base_url: str, token: str, timeout: int = 10):
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self.session = requests.Session()
        self.session.headers.update({
            "Accept": "application/json",
            "Authorization": f"Bearer {token}",
        })

    def get(self, path: str, params: dict | None = None) -> dict | list | None:
        url = f"{self.base_url}/{path.lstrip('/')}"
        response = self.session.get(url, params=params, timeout=self.timeout)
        response.raise_for_status()

        if response.status_code == 204:
            return None

        return response.json()


def create_client() -> APIClient:
    token = os.environ.get("API_TOKEN")

    if not token:
        raise RuntimeError("API_TOKEN 환경 변수가 필요합니다.")

    return APIClient("https://api.example.com", token=token)
\`\`\`

이 구조에서는 코드 안에 실제 토큰이 들어가지 않는다.

## 로그에 인증 정보를 남기지 않기

API 요청을 디버깅할 때 헤더나 URL을 로그로 남기는 경우가 있다. 이때 인증 정보가 로그에 그대로 남지 않도록 주의해야 한다.

\`\`\`python
headers = {
    "Authorization": "Bearer real-secret-token",
}
\`\`\`

위 값을 그대로 출력하면 위험하다.

\`\`\`python
# 위험한 예
print(headers)
\`\`\`

민감 정보를 출력해야 할 일이 있다면 일부만 가리거나 아예 출력하지 않는 방식이 좋다.

\`\`\`python
def mask_token(token: str) -> str:
    if len(token) <= 8:
        return "****"
    return f"{token[:4]}...{token[-4:]}"


print(mask_token("real-secret-token"))
\`\`\`

인증 정보는 코드, 로그, 에러 메시지, 테스트 데이터에 남지 않도록 관리해야 한다.

---

# 14.5 페이지네이션

## 한 번에 모든 데이터를 주지 않는 이유

API에서 목록 데이터를 요청하면 서버가 모든 데이터를 한 번에 보내지 않는 경우가 많다. 주문 데이터가 100만 건이라면 한 번의 응답으로 모두 보내는 것은 서버에도 클라이언트에도 부담이 크다.

그래서 API는 데이터를 여러 페이지로 나누어 제공한다. 이것을 페이지네이션이라고 한다.

페이지네이션 방식은 서비스마다 다르지만, 대표적으로 다음 방식이 있다.

- 페이지 번호 방식
- offset/limit 방식
- cursor 방식
- next URL 방식

## 페이지 번호 방식

가장 이해하기 쉬운 방식은 페이지 번호 방식이다.

\`\`\`text
GET /orders?page=1&limit=100
GET /orders?page=2&limit=100
GET /orders?page=3&limit=100
\`\`\`

응답은 다음과 같을 수 있다.

\`\`\`json
{
  "items": [
    {"id": 1, "amount": 10000},
    {"id": 2, "amount": 15000}
  ],
  "page": 1,
  "total_pages": 5
}
\`\`\`

이 경우 \`page\`를 1부터 \`total_pages\`까지 증가시키며 반복하면 된다.

\`\`\`python
def fetch_all_pages(client: APIClient) -> list[dict]:
    all_items = []
    page = 1

    while True:
        data = client.get("/orders", params={"page": page, "limit": 100})
        items = data["items"]
        all_items.extend(items)

        if page >= data["total_pages"]:
            break

        page += 1

    return all_items
\`\`\`

단순하지만 데이터가 많아지면 \`all_items\` 리스트가 커진다. 분석 전 단계에서는 결과를 바로 파일로 저장하거나 제너레이터로 처리하는 방식이 더 적합할 수 있다.

## 제너레이터로 페이지 처리하기

모든 데이터를 리스트에 모으지 않고 하나씩 넘겨주는 방식으로 만들 수 있다.

\`\`\`python
def iter_orders(client: APIClient):
    page = 1

    while True:
        data = client.get("/orders", params={"page": page, "limit": 100})
        items = data["items"]

        for item in items:
            yield item

        if page >= data["total_pages"]:
            break

        page += 1
\`\`\`

사용 코드는 다음과 같다.

\`\`\`python
for order in iter_orders(client):
    print(order)
\`\`\`

이 방식은 데이터가 많을 때 유리하다. 전체 데이터를 한 번에 리스트로 만들지 않고, 필요한 만큼 하나씩 처리할 수 있기 때문이다.

## offset/limit 방식

offset/limit 방식은 몇 번째 데이터부터 몇 개를 가져올지 지정한다.

\`\`\`text
GET /orders?offset=0&limit=100
GET /orders?offset=100&limit=100
GET /orders?offset=200&limit=100
\`\`\`

예시는 다음과 같다.

\`\`\`python
def iter_orders_by_offset(client: APIClient):
    offset = 0
    limit = 100

    while True:
        data = client.get("/orders", params={"offset": offset, "limit": limit})
        items = data["items"]

        if not items:
            break

        for item in items:
            yield item

        offset += limit
\`\`\`

응답에 전체 개수가 없더라도, 어느 순간 \`items\`가 빈 리스트가 되면 반복을 종료할 수 있다.

## cursor 방식

cursor 방식은 서버가 다음 요청에 사용할 커서를 알려주는 방식이다.

응답 예시는 다음과 같다.

\`\`\`json
{
  "items": [
    {"id": 101, "amount": 30000},
    {"id": 102, "amount": 45000}
  ],
  "next_cursor": "eyJpZCI6MTAyfQ=="
}
\`\`\`

다음 요청은 커서를 포함해 보낸다.

\`\`\`text
GET /orders?cursor=eyJpZCI6MTAyfQ==&limit=100
\`\`\`

파이썬으로 작성하면 다음과 같다.

\`\`\`python
def iter_orders_by_cursor(client: APIClient):
    cursor = None

    while True:
        params = {"limit": 100}

        if cursor:
            params["cursor"] = cursor

        data = client.get("/orders", params=params)
        items = data["items"]

        for item in items:
            yield item

        cursor = data.get("next_cursor")

        if not cursor:
            break
\`\`\`

cursor 방식은 데이터가 계속 추가되는 서비스에서 자주 사용된다. 페이지 번호 방식보다 안정적으로 다음 위치를 추적할 수 있기 때문이다.

## next URL 방식

일부 API는 다음 페이지 URL을 응답에 직접 포함한다.

\`\`\`json
{
  "results": [
    {"id": 1},
    {"id": 2}
  ],
  "next": "https://api.example.com/orders?page=2"
}
\`\`\`

이 경우 다음처럼 처리할 수 있다.

\`\`\`python
def iter_by_next_url(session: requests.Session, first_url: str):
    url = first_url

    while url:
        response = session.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()

        for item in data["results"]:
            yield item

        url = data.get("next")
\`\`\`

다만 next URL을 그대로 사용할지, base URL과 path를 재구성할지는 API 설계와 보안 정책에 따라 달라진다.

## 페이지네이션에서 주의할 점

페이지네이션 코드는 다음 사항을 고려해야 한다.

- 종료 조건이 명확해야 한다.
- 빈 페이지를 만났을 때 멈춰야 한다.
- 같은 페이지를 무한 반복하지 않도록 해야 한다.
- 요청 횟수가 많아지므로 Rate Limit을 고려해야 한다.
- 중간 실패 시 어디까지 수집했는지 기록할 필요가 있다.
- 데이터가 수집 중에도 변경될 수 있음을 고려해야 한다.

특히 무한 루프는 자주 발생하는 실수다.

\`\`\`python
# 위험한 예: page 증가가 빠져 있다.
while True:
    data = client.get("/orders", params={"page": page})
    ...
\`\`\`

반복 조건과 증가 조건을 명확히 작성해야 한다.

---

# 14.6 재시도와 타임아웃

## 네트워크 요청은 실패할 수 있다

파일 처리나 숫자 계산과 달리 API 요청은 외부 환경의 영향을 많이 받는다. 다음과 같은 문제가 발생할 수 있다.

- 인터넷 연결이 불안정하다.
- DNS 조회가 실패한다.
- 서버가 일시적으로 응답하지 않는다.
- 응답이 너무 늦다.
- 서버가 500번대 오류를 반환한다.
- 요청 제한에 걸려 429가 반환된다.

이런 문제는 코드가 잘못되어서가 아니라 외부 환경 때문에 발생할 수 있다. 따라서 API 수집 코드는 실패를 전제로 설계해야 한다.

## 재시도하면 되는 오류와 안 되는 오류

모든 오류를 재시도하면 안 된다.

재시도가 도움이 될 수 있는 경우는 보통 일시적인 오류다.

- 네트워크 연결 실패
- 타임아웃
- \`500 Internal Server Error\`
- \`502 Bad Gateway\`
- \`503 Service Unavailable\`
- \`504 Gateway Timeout\`
- \`429 Too Many Requests\`

반대로 재시도해도 해결되지 않을 가능성이 큰 오류도 있다.

- \`400 Bad Request\`: 요청 파라미터가 잘못됨
- \`401 Unauthorized\`: 인증 정보가 없음 또는 잘못됨
- \`403 Forbidden\`: 권한 없음
- \`404 Not Found\`: URL 또는 리소스가 없음

이런 오류는 코드를 고치거나 인증 정보를 확인해야 하는 경우가 많다.

## timeout 예외 처리

타임아웃은 별도로 처리하는 것이 좋다.

\`\`\`python
import requests

try:
    response = requests.get("https://api.example.com/orders", timeout=5)
    response.raise_for_status()
except requests.exceptions.Timeout:
    print("요청 시간이 초과되었습니다.")
except requests.exceptions.ConnectionError:
    print("서버에 연결할 수 없습니다.")
except requests.exceptions.HTTPError as error:
    print("HTTP 오류가 발생했습니다:", error)
except requests.exceptions.RequestException as error:
    print("요청 처리 중 오류가 발생했습니다:", error)
\`\`\`

구체적인 예외를 먼저 처리하고, 마지막에 넓은 범위의 예외를 처리한다.

## 간단한 수동 재시도

가장 단순한 재시도 로직은 반복문으로 만들 수 있다.

\`\`\`python
import time
import requests


def get_with_retry(url: str, max_attempts: int = 3):
    last_error = None

    for attempt in range(1, max_attempts + 1):
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as error:
            last_error = error
            print(f"요청 실패: {attempt}/{max_attempts}")

            if attempt < max_attempts:
                time.sleep(2)

    raise RuntimeError("최대 재시도 횟수를 초과했습니다.") from last_error
\`\`\`

이 코드는 요청이 실패하면 최대 3번까지 다시 시도한다. 모든 시도가 실패하면 마지막 예외를 원인으로 연결해 새 예외를 발생시킨다.

하지만 실무에서는 모든 오류에 대해 같은 방식으로 재시도하지 않는 것이 좋다. 상태 코드와 예외 종류에 따라 재시도 여부를 구분해야 한다.

## 백오프 전략

서버가 일시적으로 바쁜데 클라이언트가 같은 간격으로 계속 요청을 보내면 서버에 더 큰 부담이 될 수 있다. 그래서 재시도 간격을 점점 늘리는 방식을 사용한다. 이것을 백오프라고 한다.

간단한 예시는 다음과 같다.

\`\`\`python
import time

for attempt in range(1, 5):
    wait_seconds = 2 ** (attempt - 1)
    print(f"{wait_seconds}초 대기 후 재시도")
    time.sleep(wait_seconds)
\`\`\`

대기 시간은 다음처럼 증가한다.

\`\`\`text
1초, 2초, 4초, 8초
\`\`\`

실무에서는 여기에 약간의 무작위 지연을 섞어 여러 클라이언트가 동시에 재시도하는 상황을 줄이기도 한다.

## urllib3 Retry와 HTTPAdapter 사용하기

\`requests\`는 내부적으로 \`urllib3\`를 사용한다. \`urllib3.util.retry.Retry\`와 \`requests.adapters.HTTPAdapter\`를 조합하면 특정 상태 코드에 대해 자동 재시도를 설정할 수 있다.

\`\`\`python
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry


def create_retry_session() -> requests.Session:
    retry = Retry(
        total=3,
        connect=3,
        read=3,
        status=3,
        backoff_factor=1,
        status_forcelist=(429, 500, 502, 503, 504),
        allowed_methods=("GET",),
    )

    adapter = HTTPAdapter(max_retries=retry)

    session = requests.Session()
    session.mount("https://", adapter)
    session.mount("http://", adapter)

    return session
\`\`\`

사용 예시는 다음과 같다.

\`\`\`python
session = create_retry_session()

response = session.get("https://api.example.com/orders", timeout=10)
response.raise_for_status()

data = response.json()
\`\`\`

여기서 중요한 점은 재시도 대상 메서드를 신중하게 정해야 한다는 것이다. \`GET\` 요청은 보통 같은 요청을 여러 번 보내도 서버 상태를 바꾸지 않는 조회 요청이다. 반면 \`POST\` 요청은 데이터를 생성할 수 있으므로 무작정 재시도하면 중복 생성 문제가 생길 수 있다.

## 멱등성

멱등성은 같은 요청을 여러 번 수행해도 결과가 같다는 뜻이다.

일반적으로 다음 요청은 멱등성이 있다고 볼 수 있다.

- \`GET\`
- \`PUT\`
- \`DELETE\`

반면 \`POST\`는 새로운 데이터를 생성하는 데 사용되는 경우가 많아 멱등하지 않을 수 있다.

예를 들어 주문 생성 API에 \`POST /orders\`를 보냈는데 응답이 오기 전에 네트워크가 끊겼다고 하자. 서버에서는 이미 주문이 생성되었을 수 있다. 이때 같은 요청을 다시 보내면 주문이 두 번 생성될 수 있다.

그래서 \`POST\` 요청 재시도는 API가 중복 방지 키를 지원하는지 확인한 뒤 적용해야 한다.

## 재시도 로직을 API 클라이언트에 넣기

재시도 설정을 API 클라이언트에 포함하면 모든 요청이 같은 정책을 따른다.

\`\`\`python
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry


class APIClient:
    def __init__(self, base_url: str, token: str | None = None, timeout: int = 10):
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self.session = self._create_session(token)

    def _create_session(self, token: str | None) -> requests.Session:
        retry = Retry(
            total=3,
            backoff_factor=1,
            status_forcelist=(429, 500, 502, 503, 504),
            allowed_methods=("GET",),
        )
        adapter = HTTPAdapter(max_retries=retry)

        session = requests.Session()
        session.headers.update({"Accept": "application/json"})

        if token:
            session.headers.update({"Authorization": f"Bearer {token}"})

        session.mount("https://", adapter)
        session.mount("http://", adapter)
        return session

    def get(self, path: str, params: dict | None = None) -> dict | list | None:
        url = f"{self.base_url}/{path.lstrip('/')}"
        response = self.session.get(url, params=params, timeout=self.timeout)
        response.raise_for_status()

        if response.status_code == 204:
            return None

        return response.json()
\`\`\`

이제 이 클라이언트를 사용하는 쪽에서는 재시도 세부 구현을 몰라도 된다.

---

# 14.7 Rate Limit 대응

## Rate Limit이란?

Rate Limit은 일정 시간 동안 보낼 수 있는 요청 수의 제한이다. API 서버는 안정적인 서비스를 위해 사용자나 애플리케이션별로 요청 횟수를 제한한다.

예를 들어 다음과 같은 제한이 있을 수 있다.

\`\`\`text
분당 60회 요청 가능
하루 10,000회 요청 가능
동시에 5개 요청까지만 가능
\`\`\`

이 제한을 넘으면 서버는 보통 \`429 Too Many Requests\` 상태 코드를 반환한다.

## 왜 Rate Limit이 중요한가

데이터 수집 작업은 반복 요청이 많다. 페이지가 1,000개인 API를 빠르게 반복 호출하면 제한에 쉽게 걸릴 수 있다.

Rate Limit을 고려하지 않은 코드는 다음 문제를 만든다.

- 수집 작업이 중간에 실패한다.
- 서버에 불필요한 부담을 준다.
- API 사용이 일시 정지될 수 있다.
- 계정이나 토큰이 제한될 수 있다.

따라서 API 문서에 적힌 요청 제한을 반드시 확인해야 한다.

## 429 상태 코드 처리하기

\`429\`는 요청이 너무 많다는 의미다. 이때 응답 헤더에 \`Retry-After\`가 포함될 수 있다. \`Retry-After\`는 몇 초 뒤에 다시 요청해야 하는지 알려주는 헤더로 사용된다.

\`\`\`python
import time
import requests


def get_with_rate_limit_handling(url: str):
    response = requests.get(url, timeout=10)

    if response.status_code == 429:
        retry_after = response.headers.get("Retry-After")

        if retry_after and retry_after.isdigit():
            wait_seconds = int(retry_after)
        else:
            wait_seconds = 60

        print(f"요청 제한에 걸렸습니다. {wait_seconds}초 후 재시도합니다.")
        time.sleep(wait_seconds)
        response = requests.get(url, timeout=10)

    response.raise_for_status()
    return response.json()
\`\`\`

이 코드는 단순한 예시다. 실제로는 최대 재시도 횟수, 로그, 예외 처리, 백오프 전략을 함께 적용해야 한다.

## 요청 간격 조절하기

가장 단순한 Rate Limit 대응은 요청 사이에 대기 시간을 두는 것이다.

\`\`\`python
import time

for page in range(1, 101):
    data = client.get("/orders", params={"page": page})
    process(data)
    time.sleep(1)
\`\`\`

분당 60회 제한이라면 요청 사이에 최소 1초 정도의 간격을 두는 방식으로 시작할 수 있다. 하지만 실제 제한은 API마다 다르므로 문서를 확인해야 한다.

## 수집 속도보다 안정성이 중요하다

처음 API 수집기를 만들 때는 빠르게 수집하는 것보다 안정적으로 수집하는 것이 중요하다.

안정적인 수집기는 다음 조건을 만족한다.

- 제한에 걸리면 기다린다.
- 실패하면 재시도한다.
- 재시도해도 실패하면 기록하고 중단하거나 다음 작업으로 넘어간다.
- 어디까지 수집했는지 기록한다.
- 같은 데이터를 중복 저장하지 않는다.

데이터분석에서는 수집 속도보다 데이터의 신뢰성이 중요하다. 빠르게 수집했지만 중간 데이터가 누락되거나 중복되면 분석 결과가 흔들린다.

## 캐싱으로 불필요한 요청 줄이기

같은 API를 반복해서 호출할 필요가 없다면 결과를 파일이나 데이터베이스에 저장해 두고 재사용할 수 있다.

\`\`\`python
import json
from pathlib import Path


def fetch_or_load_cache(client: APIClient, path: str, cache_path: str):
    cache_file = Path(cache_path)

    if cache_file.exists():
        with cache_file.open("r", encoding="utf-8") as file:
            return json.load(file)

    data = client.get(path)

    with cache_file.open("w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=2)

    return data
\`\`\`

캐싱은 특히 개발 중에 유용하다. 같은 API를 테스트할 때마다 반복 호출하지 않아도 되고, 요청 제한을 줄일 수 있다.

다만 캐시 데이터가 오래되면 최신 데이터가 아닐 수 있다. 데이터 성격에 따라 캐시 만료 기준을 정해야 한다.

---

# 14.8 응답 데이터 검증과 저장

## 응답 구조를 믿기 전에 확인하기

API 문서에 응답 구조가 적혀 있더라도 실제 응답이 항상 기대와 같다고 가정하면 안 된다. 다음과 같은 상황이 생길 수 있다.

- 특정 필드가 빠져 있다.
- 숫자여야 할 값이 문자열로 온다.
- 날짜 형식이 섞여 있다.
- 빈 리스트가 온다.
- 에러 응답 구조가 성공 응답 구조와 다르다.
- 중첩 구조가 예상보다 깊다.

따라서 데이터를 저장하거나 분석에 넘기기 전에 최소한의 검증과 정규화가 필요하다.

## 필요한 필드만 추출하기

API 응답 전체를 그대로 분석에 사용하기보다, 필요한 필드만 명확히 추출하는 것이 좋다.

\`\`\`python
raw_order = {
    "id": 1001,
    "amount": "15000",
    "status": "paid",
    "created_at": "2026-06-01T10:30:00",
    "customer": {
        "id": 501,
        "name": "홍길동",
    },
}
\`\`\`

정규화 함수는 다음처럼 만들 수 있다.

\`\`\`python
def normalize_order(item: dict) -> dict:
    customer = item.get("customer") or {}

    return {
        "order_id": item.get("id"),
        "amount": int(item.get("amount", 0)),
        "status": item.get("status"),
        "created_at": item.get("created_at"),
        "customer_id": customer.get("id"),
        "customer_name": customer.get("name"),
    }
\`\`\`

이 함수는 API 응답 구조를 분석에 적합한 평평한 딕셔너리로 바꾼다. 데이터분석 과정에서 \`pandas\`로 읽기 쉬운 형태가 된다.

## 필수 필드 검사하기

반드시 있어야 하는 값이 없다면 해당 행을 저장하지 않거나 실패 목록에 기록해야 한다.

\`\`\`python
def validate_order(row: dict) -> list[str]:
    errors = []

    if row.get("order_id") is None:
        errors.append("order_id가 없습니다.")

    if row.get("amount") is None:
        errors.append("amount가 없습니다.")

    if not row.get("created_at"):
        errors.append("created_at이 없습니다.")

    return errors
\`\`\`

사용 예시는 다음과 같다.

\`\`\`python
row = normalize_order(raw_order)
errors = validate_order(row)

if errors:
    print("잘못된 데이터:", errors)
else:
    print("정상 데이터:", row)
\`\`\`

데이터 수집 단계에서 모든 검증을 완벽히 할 필요는 없지만, 분석에 반드시 필요한 필드는 확인하는 것이 좋다.

## JSON Lines로 저장하기

API 응답을 계속 수집할 때는 JSON Lines 형식이 유용하다. JSON Lines는 한 줄에 하나의 JSON 객체를 저장하는 방식이다.

\`\`\`text
{"id": 1, "amount": 10000}
{"id": 2, "amount": 15000}
{"id": 3, "amount": 20000}
\`\`\`

이 방식은 다음 장점이 있다.

- 한 줄씩 추가 저장하기 쉽다.
- 대용량 데이터를 한 줄씩 읽기 쉽다.
- 중간에 프로그램이 중단되어도 일부 데이터가 남아 있다.
- API 응답 원본 저장에 적합하다.

저장 함수는 다음처럼 만들 수 있다.

\`\`\`python
import json
from pathlib import Path


def append_jsonl(path: str, item: dict) -> None:
    output_path = Path(path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with output_path.open("a", encoding="utf-8") as file:
        line = json.dumps(item, ensure_ascii=False)
        file.write(line + "\\n")
\`\`\`

여러 건을 저장하려면 다음처럼 작성한다.

\`\`\`python
for order in iter_orders(client):
    append_jsonl("data/raw/orders.jsonl", order)
\`\`\`

## CSV로 저장하기

분석에 바로 넘길 정규화 데이터는 CSV로 저장할 수 있다.

\`\`\`python
import csv
from pathlib import Path


def save_rows_to_csv(path: str, rows: list[dict], fieldnames: list[str]) -> None:
    output_path = Path(path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with output_path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
\`\`\`

사용 예시는 다음과 같다.

\`\`\`python
rows = [normalize_order(item) for item in raw_orders]

save_rows_to_csv(
    "data/processed/orders.csv",
    rows,
    fieldnames=["order_id", "amount", "status", "created_at", "customer_id", "customer_name"],
)
\`\`\`

CSV는 표 형태 데이터 분석에 편하지만 중첩 구조를 표현하기 어렵다. 원본은 JSON Lines로 저장하고, 분석용 데이터는 CSV로 저장하는 방식이 자주 사용된다.

## 원본과 가공본을 함께 저장하기

실무에서는 원본 데이터와 가공 데이터를 분리해서 저장하는 것이 좋다.

\`\`\`text
data/
  raw/
    orders_2026_06_01.jsonl
  processed/
    orders_2026_06_01.csv
  errors/
    invalid_orders_2026_06_01.jsonl
\`\`\`

이렇게 저장하면 나중에 처리 로직이 잘못되었음을 발견했을 때 원본 데이터를 다시 읽어 가공할 수 있다. 원본을 덮어쓰지 않는 습관은 데이터분석에서 매우 중요하다.

---

# 14.9 실무형 API 수집기 만들기

## 목표 구조

이제 지금까지 배운 내용을 모아 작은 API 수집기 구조를 만들어 보자. 목표는 다음과 같다.

- API 클라이언트 클래스를 만든다.
- 환경 변수에서 토큰을 읽는다.
- 페이지네이션으로 주문 데이터를 수집한다.
- 원본 데이터를 JSON Lines로 저장한다.
- 정규화된 데이터를 CSV로 저장한다.
- 실패한 데이터는 별도 파일로 저장한다.
- 실행 과정은 로그로 남긴다.

실무 프로젝트라면 파일을 나누는 것이 좋지만, 여기서는 흐름을 이해하기 위해 하나의 예제로 구성한다.

## 전체 코드 예시

아래 코드는 실제 API 주소 대신 \`https://api.example.com\`을 사용한다. 실제 사용 시에는 API 문서에 맞게 URL, 응답 구조, 인증 방식을 수정해야 한다.

\`\`\`python
import csv
import json
import logging
import os
from pathlib import Path
from typing import Iterator

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)


class APIClient:
    def __init__(self, base_url: str, token: str, timeout: int = 10):
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self.session = self._create_session(token)

    def _create_session(self, token: str) -> requests.Session:
        retry = Retry(
            total=3,
            backoff_factor=1,
            status_forcelist=(429, 500, 502, 503, 504),
            allowed_methods=("GET",),
        )
        adapter = HTTPAdapter(max_retries=retry)

        session = requests.Session()
        session.headers.update({
            "Accept": "application/json",
            "Authorization": f"Bearer {token}",
        })
        session.mount("https://", adapter)
        session.mount("http://", adapter)
        return session

    def get(self, path: str, params: dict | None = None) -> dict:
        url = f"{self.base_url}/{path.lstrip('/')}"
        response = self.session.get(url, params=params, timeout=self.timeout)
        response.raise_for_status()
        return response.json()


class OrderCollector:
    def __init__(self, client: APIClient):
        self.client = client

    def iter_orders(self, limit: int = 100) -> Iterator[dict]:
        page = 1

        while True:
            logging.info("주문 데이터 요청: page=%s", page)
            data = self.client.get("/orders", params={"page": page, "limit": limit})
            items = data.get("items", [])

            if not items:
                logging.info("더 이상 수집할 주문 데이터가 없습니다.")
                break

            for item in items:
                yield item

            total_pages = data.get("total_pages")

            if total_pages is not None and page >= total_pages:
                break

            page += 1


def normalize_order(item: dict) -> dict:
    customer = item.get("customer") or {}

    return {
        "order_id": item.get("id"),
        "amount": to_int(item.get("amount")),
        "status": item.get("status"),
        "created_at": item.get("created_at"),
        "customer_id": customer.get("id"),
        "customer_name": customer.get("name"),
    }


def to_int(value) -> int | None:
    if value is None:
        return None

    try:
        return int(value)
    except (TypeError, ValueError):
        return None


def validate_order(row: dict) -> list[str]:
    errors = []

    if row.get("order_id") is None:
        errors.append("order_id가 없습니다.")

    if row.get("amount") is None:
        errors.append("amount가 올바르지 않습니다.")

    if not row.get("created_at"):
        errors.append("created_at이 없습니다.")

    return errors


def append_jsonl(path: str, item: dict) -> None:
    output_path = Path(path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with output_path.open("a", encoding="utf-8") as file:
        file.write(json.dumps(item, ensure_ascii=False) + "\\n")


def save_csv(path: str, rows: list[dict], fieldnames: list[str]) -> None:
    output_path = Path(path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with output_path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def main() -> None:
    token = os.environ.get("API_TOKEN")

    if not token:
        raise RuntimeError("API_TOKEN 환경 변수가 필요합니다.")

    client = APIClient("https://api.example.com", token=token)
    collector = OrderCollector(client)

    rows = []

    for raw_order in collector.iter_orders(limit=100):
        append_jsonl("data/raw/orders.jsonl", raw_order)

        row = normalize_order(raw_order)
        errors = validate_order(row)

        if errors:
            append_jsonl("data/errors/invalid_orders.jsonl", {
                "errors": errors,
                "raw": raw_order,
            })
            continue

        rows.append(row)

    save_csv(
        "data/processed/orders.csv",
        rows,
        fieldnames=[
            "order_id",
            "amount",
            "status",
            "created_at",
            "customer_id",
            "customer_name",
        ],
    )

    logging.info("수집 완료: %s건", len(rows))


if __name__ == "__main__":
    main()
\`\`\`

## 코드 구조 살펴보기

이 예제는 여러 역할을 나누어 작성했다.

| 구성 요소 | 역할 |
|---|---|
| \`APIClient\` | HTTP 요청, 인증, 재시도 설정 담당 |
| \`OrderCollector\` | 페이지네이션을 이용한 주문 데이터 반복 수집 |
| \`normalize_order()\` | API 응답을 분석용 형태로 변환 |
| \`validate_order()\` | 필수 필드와 값 검증 |
| \`append_jsonl()\` | 원본 또는 오류 데이터 저장 |
| \`save_csv()\` | 정규화 데이터 저장 |
| \`main()\` | 전체 실행 흐름 제어 |

이 구조는 데이터분석 전 단계에서 매우 유용하다. 나중에 분석 과정에서는 \`data/processed/orders.csv\`를 읽어 바로 분석할 수 있고, 문제가 생기면 \`data/raw/orders.jsonl\`에서 원본을 다시 확인할 수 있다.

## 더 개선할 수 있는 부분

이 예제도 완성형은 아니다. 실무에서는 다음 요소를 더 추가할 수 있다.

- 명령행 인수로 날짜와 저장 경로 받기
- 설정 파일에서 base URL 읽기
- 수집 시작일과 종료일 지정
- 마지막 수집 위치 저장
- 중복 주문 ID 제거
- 로그 파일로 저장
- 테스트 코드 작성
- API 응답 타입 정의
- 데이터베이스 저장

고급 파이썬 수업의 앞 장에서 배운 내용들이 모두 여기와 연결된다.

- 제너레이터는 페이지네이션 수집에 사용된다.
- 컨텍스트 매니저는 파일 저장에 사용된다.
- 객체지향은 API 클라이언트 구조에 사용된다.
- 타입 힌트는 데이터 처리 함수의 입출력을 명확히 한다.
- 예외 처리와 로깅은 수집 실패를 추적하게 한다.
- 테스트는 데이터 변환 함수가 안정적으로 동작하는지 검증한다.

---

# 14.10 API 수집 코드 작성 원칙

## 1. 외부 시스템은 실패한다고 가정한다

API 요청은 외부 서버와 네트워크에 의존한다. 따라서 실패가 예외적인 일이 아니라 정상적으로 고려해야 할 상황이라고 생각해야 한다.

좋은 API 코드는 다음 상황을 예상한다.

- 응답이 늦다.
- 요청이 실패한다.
- 인증이 만료된다.
- 응답 구조가 달라진다.
- 요청 제한에 걸린다.
- 일부 데이터가 잘못되어 있다.

## 2. timeout은 기본으로 넣는다

실무 API 요청에서 \`timeout\`을 생략하면 프로그램이 오래 멈출 수 있다.

\`\`\`python
# 권장하지 않음
requests.get(url)
\`\`\`

다음처럼 작성하는 습관이 좋다.

\`\`\`python
requests.get(url, timeout=10)
\`\`\`

## 3. 상태 코드를 확인한다

성공 응답인지 확인하지 않고 바로 JSON을 읽으면, 실패 응답을 정상 데이터로 착각할 수 있다.

\`\`\`python
response = requests.get(url, timeout=10)
response.raise_for_status()
data = response.json()
\`\`\`

## 4. 인증 정보는 코드에 쓰지 않는다

API Key와 Token은 환경 변수나 별도의 보안 설정으로 관리한다.

\`\`\`python
import os

token = os.environ.get("API_TOKEN")
\`\`\`

코드 저장소, 로그, 에러 메시지, 테스트 데이터에 민감 정보가 들어가지 않도록 주의해야 한다.

## 5. 페이지네이션 종료 조건을 명확히 한다

무한 루프를 방지하려면 종료 조건이 분명해야 한다.

\`\`\`python
if not items:
    break

if page >= total_pages:
    break
\`\`\`

페이지 번호 증가, cursor 갱신, next URL 갱신이 빠지지 않았는지 확인해야 한다.

## 6. 원본 데이터를 보존한다

분석용으로 가공한 데이터만 저장하면 나중에 문제가 생겼을 때 원인을 확인하기 어렵다. 가능하면 원본 응답 또는 원본 item을 별도로 저장한다.

\`\`\`text
data/raw/
data/processed/
data/errors/
\`\`\`

이 구조는 분석 재현성과 오류 추적에 도움이 된다.

## 7. 데이터 변환 함수는 작게 만든다

응답 구조를 바꾸는 함수는 작고 테스트 가능하게 작성한다.

\`\`\`python
def normalize_order(item: dict) -> dict:
    ...
\`\`\`

이런 함수는 외부 API를 호출하지 않아도 테스트할 수 있다.

## 8. 로그를 남긴다

API 수집 작업은 오래 걸릴 수 있다. 실행 중 어디까지 진행되었는지 알 수 있어야 한다.

남기면 좋은 로그는 다음과 같다.

- 수집 시작과 종료
- 요청한 페이지 번호
- 수집한 데이터 건수
- 실패한 요청
- 잘못된 데이터 건수
- 저장한 파일 경로

## 9. 재시도는 신중하게 적용한다

모든 요청을 무조건 재시도하면 안 된다. 특히 데이터를 생성하거나 수정하는 요청은 중복 실행 위험이 있다. 조회 중심의 \`GET\` 요청부터 재시도 정책을 적용하는 것이 안전하다.

## 10. 데이터분석으로 넘길 형태를 생각한다

API 응답은 중첩 구조인 경우가 많다. 분석 단계에서는 표 형태 데이터가 필요할 때가 많으므로, 수집 단계에서 최소한의 정규화를 해 두면 좋다.

\`\`\`python
{
    "order_id": 1001,
    "amount": 15000,
    "status": "paid",
    "created_at": "2026-06-01T10:30:00",
}
\`\`\`

이런 형태는 이후 \`pandas\`에서 다루기 쉽다.

---

# 14장 핵심 정리

이 장에서는 API와 네트워크 데이터 처리를 실무적으로 다루는 방법을 배웠다.

API 요청의 기본은 HTTP 요청과 응답을 이해하는 것이다. URL, 쿼리 파라미터, 헤더, 상태 코드는 API 코드를 읽고 디버깅하는 데 꼭 필요하다.

\`requests\`를 사용할 때는 \`params\`, \`headers\`, \`timeout\`, \`raise_for_status()\`, \`response.json()\`의 역할을 정확히 이해해야 한다. 특히 \`timeout\`을 지정하지 않으면 프로그램이 오래 멈출 수 있으므로 외부 요청에는 timeout을 넣는 습관이 필요하다.

API 클라이언트 클래스를 만들면 기본 URL, 인증 정보, 공통 헤더, 타임아웃, 재시도 정책을 한 곳에서 관리할 수 있다. 요청 코드와 데이터 처리 코드를 분리하면 테스트와 유지보수가 쉬워진다.

인증 정보는 코드에 직접 작성하지 않고 환경 변수로 관리해야 한다. API Key나 Token은 로그와 에러 메시지에도 남지 않도록 주의해야 한다.

목록 API는 페이지네이션이 적용되는 경우가 많다. 페이지 번호, offset/limit, cursor, next URL 방식에 따라 반복 구조를 설계해야 하며, 종료 조건을 명확히 해야 한다.

네트워크 요청은 실패할 수 있으므로 재시도와 백오프 전략을 고려해야 한다. 다만 모든 요청을 재시도하면 안 되며, 특히 \`POST\`처럼 서버 상태를 바꿀 수 있는 요청은 중복 실행 위험을 고려해야 한다.

Rate Limit은 API 수집에서 매우 중요하다. \`429 Too Many Requests\`가 발생하면 대기 후 재시도하거나 요청 간격을 조절해야 한다.

마지막으로 API 응답은 그대로 믿지 말고 필요한 필드를 추출하고 검증해야 한다. 원본 데이터는 JSON Lines로 보존하고, 분석용 데이터는 CSV나 DB에 저장하는 구조가 실무에서 유용하다.

---

# 연습문제

## 문제 1

API와 일반 웹 페이지 요청의 공통점과 차이점을 설명하시오.

## 문제 2

다음 URL에서 스킴, 호스트, 경로, 쿼리 파라미터를 구분하시오.

\`\`\`text
https://api.example.com/v1/orders?status=paid&page=2
\`\`\`

## 문제 3

다음 상태 코드의 의미를 간단히 설명하시오.

\`\`\`text
200, 201, 204, 400, 401, 403, 404, 429, 500, 503
\`\`\`

## 문제 4

다음 코드의 문제점을 설명하고 개선하시오.

\`\`\`python
import requests

response = requests.get("https://api.example.com/orders")
data = response.json()
\`\`\`

## 문제 5

\`requests.get()\`에서 \`params\`를 사용하는 이유를 설명하시오.

## 문제 6

다음 조건을 만족하는 GET 요청 코드를 작성하시오.

- URL: \`https://api.example.com/orders\`
- 쿼리 파라미터: \`status=paid\`, \`page=1\`, \`limit=100\`
- 헤더: \`Accept: application/json\`
- timeout: 10초
- 실패 상태 코드가 오면 예외 발생

## 문제 7

API Key나 Token을 코드에 직접 작성하면 안 되는 이유를 세 가지 이상 쓰시오.

## 문제 8

환경 변수 \`API_TOKEN\`을 읽고, 값이 없으면 \`RuntimeError\`를 발생시키는 코드를 작성하시오.

## 문제 9

페이지 번호 방식 API에서 다음 응답이 올 때, 반복을 종료해야 하는 조건을 설명하시오.

\`\`\`json
{
  "items": [],
  "page": 5,
  "total_pages": 5
}
\`\`\`

## 문제 10

cursor 방식 페이지네이션에서 \`next_cursor\`가 없거나 \`None\`이면 어떤 의미인지 설명하시오.

## 문제 11

다음 중 재시도가 도움이 될 가능성이 높은 상태 코드를 고르시오.

\`\`\`text
400, 401, 404, 429, 500, 502, 503, 504
\`\`\`

## 문제 12

\`POST\` 요청을 무작정 재시도하면 위험할 수 있는 이유를 설명하시오.

## 문제 13

\`429 Too Many Requests\` 응답을 받았을 때 확인하면 좋은 응답 헤더 이름은 무엇인가?

## 문제 14

다음 API 응답 item을 분석용 딕셔너리로 바꾸는 \`normalize_order()\` 함수를 작성하시오.

입력 예시:

\`\`\`python
item = {
    "id": 1001,
    "amount": "25000",
    "status": "paid",
    "created_at": "2026-06-01T10:30:00",
    "customer": {
        "id": 501,
        "name": "홍길동",
    },
}
\`\`\`

출력 예시:

\`\`\`python
{
    "order_id": 1001,
    "amount": 25000,
    "status": "paid",
    "created_at": "2026-06-01T10:30:00",
    "customer_id": 501,
    "customer_name": "홍길동",
}
\`\`\`

## 문제 15

JSON Lines 형식이 API 수집 데이터 저장에 유용한 이유를 설명하시오.

## 문제 16

API 수집기에서 원본 데이터와 가공 데이터를 분리해서 저장해야 하는 이유를 설명하시오.

## 문제 17

다음 함수의 역할을 한 문장으로 설명하시오.

\`\`\`python
def append_jsonl(path: str, item: dict) -> None:
    with open(path, "a", encoding="utf-8") as file:
        file.write(json.dumps(item, ensure_ascii=False) + "\\n")
\`\`\`

## 문제 18

안정적인 API 수집 코드가 갖추어야 할 요소를 다섯 가지 이상 쓰시오.

---

# 정답 및 해설

## 문제 1 정답

공통점은 둘 다 HTTP 요청과 응답을 사용한다는 점이다. 클라이언트가 서버에 요청을 보내고 서버가 응답을 돌려준다.

차이점은 일반 웹 페이지 요청은 사람이 보는 HTML 화면을 받는 경우가 많고, API 요청은 프로그램이 처리하기 쉬운 JSON 같은 데이터를 받는 경우가 많다는 점이다.

## 문제 2 정답

\`\`\`text
스킴: https
호스트: api.example.com
경로: /v1/orders
쿼리 파라미터: status=paid, page=2
\`\`\`

## 문제 3 정답

| 상태 코드 | 의미 |
|---:|---|
| 200 | 요청 성공 |
| 201 | 생성 성공 |
| 204 | 성공했지만 응답 본문 없음 |
| 400 | 잘못된 요청 |
| 401 | 인증 실패 |
| 403 | 권한 없음 |
| 404 | 찾을 수 없음 |
| 429 | 요청이 너무 많음 |
| 500 | 서버 내부 오류 |
| 503 | 서비스 이용 불가 |

## 문제 4 정답

문제점은 \`timeout\`이 없고, 상태 코드 확인 없이 바로 JSON을 파싱한다는 점이다. 서버가 응답하지 않으면 프로그램이 오래 멈출 수 있고, 실패 응답이 JSON이 아닐 경우 오류가 발생할 수 있다.

개선 예시는 다음과 같다.

\`\`\`python
import requests

response = requests.get("https://api.example.com/orders", timeout=10)
response.raise_for_status()
data = response.json()
\`\`\`

## 문제 5 정답

\`params\`를 사용하면 쿼리 파라미터를 딕셔너리로 전달할 수 있고, 공백이나 특수 문자 인코딩을 라이브러리가 처리해 준다. URL 문자열을 직접 조립하는 것보다 안전하고 읽기 쉽다.

## 문제 6 정답

\`\`\`python
import requests

url = "https://api.example.com/orders"
params = {
    "status": "paid",
    "page": 1,
    "limit": 100,
}
headers = {
    "Accept": "application/json",
}

response = requests.get(
    url,
    params=params,
    headers=headers,
    timeout=10,
)
response.raise_for_status()

data = response.json()
\`\`\`

## 문제 7 정답

API Key나 Token을 코드에 직접 작성하면 안 되는 이유는 다음과 같다.

- 코드 저장소에 실수로 올라갈 수 있다.
- 다른 사람이 인증 정보를 볼 수 있다.
- 토큰을 교체할 때 코드를 수정해야 한다.
- 개발 환경과 운영 환경의 값을 분리하기 어렵다.
- 로그나 에러 메시지에 노출될 위험이 있다.

## 문제 8 정답

\`\`\`python
import os

token = os.environ.get("API_TOKEN")

if not token:
    raise RuntimeError("API_TOKEN 환경 변수가 필요합니다.")
\`\`\`

## 문제 9 정답

\`items\`가 빈 리스트이므로 더 이상 수집할 데이터가 없다고 볼 수 있다. 또한 \`page\`가 \`total_pages\`와 같으므로 마지막 페이지에 도달했다. 따라서 반복을 종료해야 한다.

## 문제 10 정답

\`next_cursor\`가 없거나 \`None\`이면 다음 페이지가 없다는 의미다. cursor 방식에서는 이 값을 종료 조건으로 사용한다.

## 문제 11 정답

재시도가 도움이 될 가능성이 높은 상태 코드는 다음과 같다.

\`\`\`text
429, 500, 502, 503, 504
\`\`\`

\`429\`는 요청 제한이므로 일정 시간 기다린 뒤 재시도할 수 있다. \`500\`, \`502\`, \`503\`, \`504\`는 서버 또는 게이트웨이의 일시적 오류일 수 있어 재시도가 도움이 될 수 있다.

## 문제 12 정답

\`POST\` 요청은 데이터를 생성하거나 서버 상태를 바꾸는 경우가 많다. 응답을 받기 전에 네트워크가 끊겼더라도 서버에서는 이미 데이터가 생성되었을 수 있다. 이때 같은 \`POST\` 요청을 다시 보내면 중복 생성이 발생할 수 있다. 따라서 중복 방지 키나 API 문서의 재시도 정책을 확인해야 한다.

## 문제 13 정답

확인하면 좋은 헤더는 \`Retry-After\`다. 서버가 몇 초 뒤에 다시 요청하라고 알려줄 때 사용될 수 있다.

## 문제 14 정답

\`\`\`python
def normalize_order(item: dict) -> dict:
    customer = item.get("customer") or {}

    return {
        "order_id": item.get("id"),
        "amount": int(item.get("amount", 0)),
        "status": item.get("status"),
        "created_at": item.get("created_at"),
        "customer_id": customer.get("id"),
        "customer_name": customer.get("name"),
    }
\`\`\`

실무에서는 \`amount\`가 숫자로 변환되지 않을 가능성도 있으므로 별도 변환 함수를 두는 것이 더 안전하다.

## 문제 15 정답

JSON Lines는 한 줄에 하나의 JSON 객체를 저장하는 형식이다. API 수집 데이터 저장에 유용한 이유는 다음과 같다.

- 데이터를 한 건씩 추가 저장하기 쉽다.
- 대용량 파일을 한 줄씩 읽을 수 있다.
- 중간에 프로그램이 중단되어도 이미 저장된 데이터가 남는다.
- 중첩 구조의 원본 데이터를 보존하기 좋다.

## 문제 16 정답

원본 데이터와 가공 데이터를 분리하면 처리 로직에 문제가 생겼을 때 원본을 다시 읽어 재처리할 수 있다. 또한 분석 결과에 문제가 있을 때 원인을 추적하기 쉽다. 원본은 재현성과 검증을 위해 보존하고, 가공본은 분석하기 쉬운 형태로 따로 저장하는 것이 좋다.

## 문제 17 정답

이 함수는 딕셔너리 하나를 JSON 문자열로 변환한 뒤, 지정한 파일에 한 줄로 추가 저장하는 함수다. 즉 JSON Lines 파일에 데이터를 한 건씩 append하는 역할을 한다.

단, 이 코드에는 \`json\` import와 폴더 생성 처리가 빠져 있으므로 실제 사용 시 보완이 필요하다.

## 문제 18 정답

안정적인 API 수집 코드가 갖추어야 할 요소는 다음과 같다.

- timeout 지정
- 상태 코드 확인
- 예외 처리
- 재시도 정책
- Rate Limit 대응
- 인증 정보 안전 관리
- 페이지네이션 처리
- 원본 데이터 저장
- 가공 데이터 저장
- 실패 데이터 기록
- 로그 기록
- 데이터 검증
- 중복 저장 방지

---

# 참고 문서

- Requests 공식 문서: Quickstart  
  https://requests.readthedocs.io/en/latest/user/quickstart/
- Requests 공식 문서: Advanced Usage  
  https://requests.readthedocs.io/en/master/user/advanced/
- urllib3 공식 문서: Retry  
  https://urllib3.readthedocs.io/en/stable/reference/urllib3.util.html
- Python 공식 문서: \`urllib.parse\` — Parse URLs into components  
  https://docs.python.org/3/library/urllib.parse.html
- Python 공식 문서: \`http\` — HTTP modules  
  https://docs.python.org/3/library/http.html
- Python 공식 문서: \`os\` — Miscellaneous operating system interfaces  
  https://docs.python.org/3/library/os.html
- Python 공식 문서: \`json\` — JSON encoder and decoder  
  https://docs.python.org/3/library/json.html
`;export{e as default};