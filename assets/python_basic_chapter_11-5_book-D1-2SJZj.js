var e=`<!-- 원본: python_basic_chapter_11_book.md / 세부 장: 11-5 -->

# 11.5 \`requests\`로 API 데이터 가져오기

### 11.5.1 API란 무엇인가

API는 프로그램끼리 데이터를 주고받기 위한 약속입니다. 사용자가 웹 브라우저로 웹사이트를 보는 것처럼, 파이썬 프로그램도 API를 통해 다른 서버에 데이터를 요청할 수 있습니다.

예를 들어 다음과 같은 일을 할 수 있습니다.

\`\`\`text
- 날씨 API에서 현재 날씨 가져오기
- 환율 API에서 오늘의 환율 가져오기
- 공공 데이터 API에서 통계 데이터 가져오기
- 사내 시스템 API에서 주문 내역 가져오기
- 외부 서비스 API로 메시지 보내기
\`\`\`

API를 사용하면 사람이 웹사이트에 들어가서 복사해 오던 데이터를 코드로 가져올 수 있습니다.

---

### 11.5.2 HTTP 요청과 응답

API를 이해하려면 요청과 응답의 개념을 알아야 합니다.

\`\`\`text
1. 클라이언트가 서버에 요청을 보낸다.
2. 서버가 요청을 처리한다.
3. 서버가 클라이언트에게 응답을 보낸다.
\`\`\`

파이썬 프로그램은 클라이언트 역할을 할 수 있습니다.

\`\`\`text
파이썬 프로그램 → API 서버: 데이터 주세요.
API 서버 → 파이썬 프로그램: 여기 데이터입니다.
\`\`\`

가장 기본적인 요청 방식은 GET 요청입니다. GET 요청은 서버에서 데이터를 가져올 때 자주 사용합니다.

---

### 11.5.3 \`requests\` 설치와 기본 사용

API 요청을 쉽게 보내기 위해 \`requests\` 라이브러리를 사용할 수 있습니다.

설치 명령은 다음과 같습니다.

\`\`\`bash
python -m pip install requests
\`\`\`

설치 후에는 다음처럼 import합니다.

\`\`\`python
import requests
\`\`\`

기본 GET 요청 예제입니다.

\`\`\`python
import requests

url = "https://jsonplaceholder.typicode.com/posts/1"

response = requests.get(url)

print(response.status_code)
print(response.text)
\`\`\`

\`status_code\`는 서버 응답 상태를 나타냅니다. 대표적인 상태 코드는 다음과 같습니다.

| 상태 코드 | 의미 |
|---|---|
| 200 | 요청 성공 |
| 400 | 잘못된 요청 |
| 401 | 인증 필요 또는 인증 실패 |
| 403 | 접근 권한 없음 |
| 404 | 요청한 자료 없음 |
| 500 | 서버 내부 오류 |

---

### 11.5.4 JSON 응답 처리하기

API 응답이 JSON 형식이라면 \`response.json()\`을 사용해 파이썬 객체로 변환할 수 있습니다.

\`\`\`python
import requests

url = "https://jsonplaceholder.typicode.com/posts/1"

response = requests.get(url)
data = response.json()

print(data)
print(type(data))
print(data["title"])
\`\`\`

응답 JSON이 딕셔너리 형태라면 key로 값을 꺼낼 수 있습니다. 응답이 리스트 형태라면 반복문으로 처리할 수 있습니다.

\`\`\`python
import requests

url = "https://jsonplaceholder.typicode.com/posts"

response = requests.get(url)
posts = response.json()

for post in posts[:3]:
    print(post["id"], post["title"])
\`\`\`

API 응답을 처리할 때는 항상 데이터 구조를 먼저 확인해야 합니다.

\`\`\`python
print(type(posts))
print(posts[0].keys())
\`\`\`

---

### 11.5.5 요청 파라미터 사용하기

API는 요청할 때 조건을 함께 전달할 수 있습니다. 이를 요청 파라미터라고 합니다.

\`\`\`python
import requests

url = "https://jsonplaceholder.typicode.com/posts"
params = {
    "userId": 1
}

response = requests.get(url, params=params)
posts = response.json()

for post in posts[:3]:
    print(post["userId"], post["title"])
\`\`\`

\`params\`를 사용하면 URL 뒤에 직접 \`?userId=1\`을 붙이지 않아도 됩니다. requests가 알아서 적절한 URL로 만들어 요청합니다.

---

### 11.5.6 요청 실패 처리하기

API 요청은 항상 성공하지 않습니다.

\`\`\`text
- 인터넷 연결 문제
- 서버 오류
- 잘못된 URL
- 인증 실패
- 응답 시간이 너무 오래 걸림
- JSON 형식이 아닌 응답
\`\`\`

따라서 API 요청 코드는 예외 처리를 함께 사용하는 것이 좋습니다.

\`\`\`python
import requests

url = "https://jsonplaceholder.typicode.com/posts/1"

try:
    response = requests.get(url, timeout=5)
    response.raise_for_status()
    data = response.json()
    print(data["title"])
except requests.exceptions.Timeout:
    print("요청 시간이 초과되었습니다.")
except requests.exceptions.HTTPError as error:
    print("HTTP 오류가 발생했습니다.", error)
except requests.exceptions.RequestException as error:
    print("요청 중 오류가 발생했습니다.", error)
except ValueError:
    print("JSON 응답을 해석할 수 없습니다.")
\`\`\`

여기서 중요한 부분은 \`timeout\`입니다. 외부 서버가 응답하지 않을 때 프로그램이 계속 기다리는 것을 막기 위해 요청 제한 시간을 지정합니다.

\`raise_for_status()\`는 응답 상태 코드가 오류일 때 예외를 발생시킵니다. 이렇게 하면 실패한 요청을 성공한 요청처럼 처리하는 실수를 줄일 수 있습니다.

---

### 11.5.7 API 데이터를 파일로 저장하기

API에서 받은 데이터를 JSON 파일로 저장해 보겠습니다.

\`\`\`python
import json
import requests

url = "https://jsonplaceholder.typicode.com/posts"

response = requests.get(url, timeout=5)
response.raise_for_status()

posts = response.json()

with open("posts.json", "w", encoding="utf-8") as file:
    json.dump(posts, file, ensure_ascii=False, indent=2)
\`\`\`

필요한 값만 추출해서 CSV로 저장할 수도 있습니다.

\`\`\`python
import csv
import requests

url = "https://jsonplaceholder.typicode.com/posts"

response = requests.get(url, timeout=5)
response.raise_for_status()

posts = response.json()

with open("posts.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(["id", "userId", "title"])

    for post in posts:
        writer.writerow([post["id"], post["userId"], post["title"]])
\`\`\`

이 흐름은 실무 API 자동화의 기본 구조입니다.

\`\`\`text
1. API에 요청한다.
2. 응답 상태를 확인한다.
3. JSON 응답을 파이썬 객체로 바꾼다.
4. 필요한 값을 추출한다.
5. 파일로 저장한다.
\`\`\`

---
`;export{e as default};