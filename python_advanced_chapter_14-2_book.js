var e=`<!-- 원본: python_advanced_chapter_14_book.md / 세부 장: 14-2 -->

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
`;export{e as default};