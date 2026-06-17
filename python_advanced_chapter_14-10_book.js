var e=`<!-- 원본: python_advanced_chapter_14_book.md / 세부 장: 14-10 -->

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