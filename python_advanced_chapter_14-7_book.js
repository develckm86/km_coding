var e=`<!-- 원본: python_advanced_chapter_14_book.md / 세부 장: 14-7 -->

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
`;export{e as default};