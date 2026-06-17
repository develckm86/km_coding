var e=`<!-- 원본: python_advanced_chapter_14_book.md / 세부 장: 14-4 -->

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
`;export{e as default};