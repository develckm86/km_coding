var e=`<!-- 원본: python_advanced_chapter_14_book.md / 세부 장: 14-6 -->

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
`;export{e as default};