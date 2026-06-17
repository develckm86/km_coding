var e=`<!-- 원본: python_advanced_chapter_16_book.md / 세부 장: 16-6 -->

# 16.6 \`ThreadPoolExecutor\`

## 직접 스레드를 만들 때의 불편함

\`threading.Thread\`로 스레드를 직접 만들 수 있지만, 작업이 많아지면 코드가 복잡해진다.

예를 들어 다음을 직접 관리해야 한다.

- 스레드 생성
- 스레드 시작
- 스레드 종료 대기
- 결과 저장
- 예외 처리
- 동시 실행 개수 제한

이럴 때는 \`concurrent.futures\` 모듈의 \`ThreadPoolExecutor\`를 사용하는 것이 더 편하다.

## ThreadPoolExecutor 기본 구조

\`ThreadPoolExecutor\`는 스레드 풀을 만들어 작업을 실행한다. 스레드 풀은 미리 정해진 개수의 작업자를 두고, 여러 작업을 나누어 처리하는 구조다.

\`\`\`python
from concurrent.futures import ThreadPoolExecutor
import time


def fetch(user_id: int) -> dict:
    time.sleep(1)
    return {"user_id": user_id, "status": "ok"}


user_ids = [1, 2, 3, 4, 5]

with ThreadPoolExecutor(max_workers=3) as executor:
    results = list(executor.map(fetch, user_ids))

print(results)
\`\`\`

\`max_workers=3\`은 동시에 최대 3개의 작업을 실행하겠다는 뜻이다.

\`executor.map()\`은 여러 입력값에 함수를 적용하고 결과를 반환한다.

## \`map()\` 방식

\`map()\` 방식은 입력 순서와 결과 순서를 맞춰야 할 때 편하다.

\`\`\`python
from concurrent.futures import ThreadPoolExecutor
import time


def square(number: int) -> int:
    time.sleep(0.5)
    return number * number


numbers = [1, 2, 3, 4, 5]

with ThreadPoolExecutor(max_workers=3) as executor:
    results = list(executor.map(square, numbers))

print(results)
\`\`\`

결과는 입력 순서와 같은 순서로 정리된다.

\`\`\`text
[1, 4, 9, 16, 25]
\`\`\`

작업 완료 순서는 달라도 결과 순서는 입력 순서와 맞춰진다.

## \`submit()\`과 \`as_completed()\` 방식

작업이 끝나는 순서대로 처리하고 싶다면 \`submit()\`과 \`as_completed()\`를 사용한다.

\`\`\`python
from concurrent.futures import ThreadPoolExecutor, as_completed
import time


def fetch(user_id: int) -> dict:
    time.sleep(1)
    return {"user_id": user_id, "status": "ok"}


user_ids = [1, 2, 3, 4, 5]

with ThreadPoolExecutor(max_workers=3) as executor:
    futures = [executor.submit(fetch, user_id) for user_id in user_ids]

    for future in as_completed(futures):
        result = future.result()
        print(result)
\`\`\`

\`submit()\`은 작업을 제출하고 \`Future\` 객체를 반환한다. \`Future\`는 아직 완료되지 않았을 수도 있는 작업의 결과를 나타낸다.

\`as_completed()\`는 작업이 완료되는 순서대로 \`Future\`를 꺼내준다.

## 예외 처리

동시성 코드에서는 각 작업이 실패할 수 있다. \`future.result()\`를 호출할 때 작업 내부에서 발생한 예외가 다시 발생한다.

\`\`\`python
from concurrent.futures import ThreadPoolExecutor, as_completed


def parse_number(value: str) -> int:
    return int(value)


values = ["10", "20", "abc", "30"]

with ThreadPoolExecutor(max_workers=2) as executor:
    future_to_value = {
        executor.submit(parse_number, value): value
        for value in values
    }

    for future in as_completed(future_to_value):
        value = future_to_value[future]
        try:
            result = future.result()
        except ValueError:
            print(f"변환 실패: {value}")
        else:
            print(f"변환 성공: {result}")
\`\`\`

동시성 코드에서는 실패한 작업을 무시하면 안 된다. 어떤 입력값이 실패했는지 함께 기록해야 한다.

## API 요청 예제 구조

실제 API 요청에서는 \`requests\`를 함께 사용할 수 있다.

\`\`\`python
from concurrent.futures import ThreadPoolExecutor, as_completed
import requests


def fetch_json(url: str) -> dict:
    response = requests.get(url, timeout=5)
    response.raise_for_status()
    return response.json()


urls = [
    "https://api.example.com/items/1",
    "https://api.example.com/items/2",
    "https://api.example.com/items/3",
]

with ThreadPoolExecutor(max_workers=5) as executor:
    future_to_url = {
        executor.submit(fetch_json, url): url
        for url in urls
    }

    for future in as_completed(future_to_url):
        url = future_to_url[future]
        try:
            data = future.result()
        except requests.RequestException as error:
            print(f"요청 실패: {url} - {error}")
        else:
            print(f"요청 성공: {url}")
\`\`\`

이 구조는 실무에서 자주 사용된다.

## 동시 실행 개수 제한

\`max_workers\`를 크게 하면 무조건 빨라질 것 같지만 그렇지 않다.

동시 요청이 너무 많으면 다음 문제가 생길 수 있다.

- API 서버에 부담을 준다.
- 요청 제한에 걸린다.
- 네트워크 오류가 증가한다.
- 로컬 컴퓨터 자원을 과도하게 사용한다.
- 실패 재시도가 한꺼번에 몰린다.

따라서 동시 실행 개수는 작업의 성격에 맞게 조절해야 한다.

\`\`\`python
with ThreadPoolExecutor(max_workers=5) as executor:
    ...
\`\`\`

처음에는 작은 값으로 시작하고, 로그와 실패율을 확인하면서 조정하는 것이 좋다.

---
`;export{e as default};