var e=`<!-- 원본: python_advanced_chapter_14_book.md / 세부 장: 14-1 -->

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
`;export{e as default};