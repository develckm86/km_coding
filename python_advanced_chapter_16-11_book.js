var e=`<!-- 원본: python_advanced_chapter_16_book.md / 세부 장: 16-11 -->

# 16.11 실무 패턴 1: 여러 API 요청 처리

## 문제 상황

사용자 ID 목록이 있고, 각 사용자에 대해 API를 호출해 상세 정보를 가져와야 한다고 가정하자.

\`\`\`python
user_ids = [1, 2, 3, 4, 5]
\`\`\`

순차 실행은 단순하지만 느릴 수 있다.

\`\`\`python
results = []

for user_id in user_ids:
    data = fetch_user(user_id)
    results.append(data)
\`\`\`

각 요청이 1초씩 걸리고 사용자가 1,000명이라면 전체 시간이 길어진다.

## ThreadPoolExecutor로 처리하기

\`\`\`python
from concurrent.futures import ThreadPoolExecutor, as_completed
import requests


BASE_URL = "https://api.example.com/users"


def fetch_user(user_id: int) -> dict:
    url = f"{BASE_URL}/{user_id}"
    response = requests.get(url, timeout=5)
    response.raise_for_status()
    return response.json()


def collect_users(user_ids: list[int]) -> tuple[list[dict], list[dict]]:
    results = []
    failures = []

    with ThreadPoolExecutor(max_workers=5) as executor:
        future_to_user_id = {
            executor.submit(fetch_user, user_id): user_id
            for user_id in user_ids
        }

        for future in as_completed(future_to_user_id):
            user_id = future_to_user_id[future]
            try:
                data = future.result()
            except requests.RequestException as error:
                failures.append({
                    "user_id": user_id,
                    "error": str(error),
                })
            else:
                results.append(data)

    return results, failures
\`\`\`

이 구조는 다음 장점이 있다.

- 요청을 여러 개 동시에 보낸다.
- 성공한 결과와 실패한 결과를 분리한다.
- 실패한 사용자 ID를 기록할 수 있다.
- 동시 요청 개수를 \`max_workers\`로 제한한다.

## 실패 목록 저장하기

실무에서는 실패한 요청을 화면에 출력하는 것만으로는 부족하다. 실패 목록을 파일로 저장하면 재처리할 수 있다.

\`\`\`python
import json
from pathlib import Path


def save_failures(failures: list[dict], path: str) -> None:
    output_path = Path(path)
    with output_path.open("w", encoding="utf-8") as file:
        json.dump(failures, file, ensure_ascii=False, indent=2)
\`\`\`

동시성 코드에서 중요한 것은 성공 속도뿐만 아니라 실패 관리다.

## 요청 제한 지키기

외부 API는 보통 요청 제한이 있다. 동시에 너무 많은 요청을 보내면 차단되거나 오류가 증가할 수 있다.

따라서 다음을 지켜야 한다.

- \`max_workers\`를 적절히 제한한다.
- API 문서의 Rate Limit을 확인한다.
- 실패 시 무한 재시도하지 않는다.
- 재시도 간격을 둔다.
- 로그를 남긴다.

동시성은 상대 서버를 공격하듯 요청을 보내기 위한 도구가 아니다. 외부 시스템의 규칙을 지키면서 효율적으로 처리하기 위한 도구다.

---
`;export{e as default};