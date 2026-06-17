var e=`<!-- 원본: python_advanced_chapter_20_book.md / 세부 장: 20-3 -->

# 20.3 프로젝트 2: API 데이터 수집기

두 번째 프로젝트는 API 데이터 수집기다. 데이터분석에서는 파일뿐 아니라 외부 API에서 데이터를 가져오는 경우도 많다. API 수집 코드는 단순히 \`requests.get()\` 한 줄로 끝나지 않는다.

실무에서는 다음 문제가 자주 발생한다.

\`\`\`text
- 응답이 느리다.
- 요청이 실패한다.
- 인증 정보가 필요하다.
- 한 번에 모든 데이터를 주지 않고 페이지 단위로 준다.
- 응답 구조가 예상과 다르다.
- 수집 중간에 실패했을 때 어디까지 저장됐는지 알아야 한다.
\`\`\`

따라서 API 수집기는 안정성을 고려해서 작성해야 한다.

## 20.3.1 API 수집기의 요구사항

이번 프로젝트의 요구사항은 다음과 같다.

\`\`\`text
1. API URL을 설정값으로 관리한다.
2. 필요한 경우 API Key를 헤더에 넣는다.
3. 페이지 단위로 데이터를 가져온다.
4. 실패 시 일정 횟수 재시도한다.
5. 수집한 데이터를 JSON Lines 파일로 저장한다.
6. 실행 과정을 로그로 남긴다.
\`\`\`

이 장에서는 실제 외부 API에 의존하지 않고, API 클라이언트 구조를 중심으로 살펴본다.

## 20.3.2 API 응답을 저장할 형식

API 응답 데이터는 JSON Lines 형식으로 저장할 수 있다. JSON Lines는 한 줄에 하나의 JSON 객체를 저장하는 방식이다.

\`\`\`json
{"id": 1, "name": "Keyboard", "price": 30000}
{"id": 2, "name": "Mouse", "price": 15000}
{"id": 3, "name": "Monitor", "price": 200000}
\`\`\`

이 형식은 다음 장점이 있다.

\`\`\`text
- 한 줄씩 읽을 수 있다.
- 대용량 데이터 처리에 적합하다.
- 중간에 일부 데이터가 깨져도 전체 파일을 모두 잃지 않는다.
- API 수집 결과를 누적 저장하기 쉽다.
\`\`\`

## 20.3.3 API 클라이언트 클래스 만들기

API 수집 기능은 클래스로 만들면 공통 설정을 관리하기 좋다.

\`\`\`python
# src/data_tools/api_client.py

from __future__ import annotations

import logging
import time
from dataclasses import dataclass
from typing import Any, Iterator

import requests

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class APIClientConfig:
    base_url: str
    timeout: float = 5.0
    max_retries: int = 3
    retry_delay: float = 1.0
    api_key: str | None = None


class APIClient:
    def __init__(self, config: APIClientConfig) -> None:
        self.config = config
        self.session = requests.Session()

        if config.api_key:
            self.session.headers.update({"Authorization": f"Bearer {config.api_key}"})

    def get_json(self, endpoint: str, params: dict[str, Any] | None = None) -> dict[str, Any]:
        url = f"{self.config.base_url.rstrip('/')}/{endpoint.lstrip('/')}"

        last_error: Exception | None = None

        for attempt in range(1, self.config.max_retries + 1):
            try:
                response = self.session.get(url, params=params, timeout=self.config.timeout)
                response.raise_for_status()
                return response.json()
            except requests.RequestException as error:
                last_error = error
                logger.warning("API 요청 실패: attempt=%s error=%s", attempt, error)
                time.sleep(self.config.retry_delay)

        raise RuntimeError(f"API 요청 실패: {url}") from last_error
\`\`\`

이 클래스는 다음 역할을 가진다.

\`\`\`text
- 공통 base URL 관리
- 공통 timeout 관리
- 인증 헤더 관리
- 재시도 처리
- JSON 응답 반환
\`\`\`

## 20.3.4 페이지네이션 처리하기

API가 데이터를 한 번에 모두 주지 않는 경우가 많다. 예를 들어 \`page=1\`, \`page=2\`처럼 페이지 번호를 바꾸며 요청해야 한다.

제너레이터를 사용하면 페이지 데이터를 필요한 만큼 하나씩 가져올 수 있다.

\`\`\`python
# src/data_tools/api_client.py


class PaginatedAPIClient(APIClient):
    def iter_items(
        self,
        endpoint: str,
        item_key: str = "items",
        page_key: str = "page",
        start_page: int = 1,
        max_pages: int | None = None,
    ) -> Iterator[dict[str, Any]]:
        page = start_page
        fetched_pages = 0

        while True:
            if max_pages is not None and fetched_pages >= max_pages:
                break

            data = self.get_json(endpoint, params={page_key: page})
            items = data.get(item_key, [])

            if not items:
                break

            logger.info("API 페이지 수집: page=%s count=%s", page, len(items))

            for item in items:
                yield item

            page += 1
            fetched_pages += 1
\`\`\`

이 함수는 모든 데이터를 리스트에 담아서 반환하지 않는다. 대신 \`yield\`로 하나씩 내보낸다. 데이터가 많아질 때 메모리를 절약할 수 있다.

## 20.3.5 JSON Lines 저장하기

수집한 데이터를 한 줄씩 저장한다.

\`\`\`python
# src/data_tools/api_client.py

import json
from pathlib import Path


def write_jsonl(path: str | Path, items: Iterator[dict[str, Any]]) -> int:
    output_path = Path(path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    count = 0
    with output_path.open("w", encoding="utf-8") as file:
        for item in items:
            file.write(json.dumps(item, ensure_ascii=False) + "\\n")
            count += 1

    logger.info("JSON Lines 저장 완료: path=%s count=%s", output_path, count)
    return count
\`\`\`

## 20.3.6 API 수집 실행 예제

\`\`\`python
from data_tools.api_client import APIClientConfig, PaginatedAPIClient, write_jsonl


config = APIClientConfig(
    base_url="https://example.com/api",
    timeout=5.0,
    max_retries=3,
    retry_delay=1.0,
)

client = PaginatedAPIClient(config)
items = client.iter_items(endpoint="products", item_key="items", max_pages=10)
count = write_jsonl("data/raw/products.jsonl", items)

print(f"수집 완료: {count}건")
\`\`\`

실제 수업에서는 공개 테스트 API나 내부 샘플 API를 사용할 수 있다. 중요한 것은 API 주소 자체가 아니라 수집 코드의 구조다.

## 20.3.7 API 수집기에서 확인해야 할 점

API 수집 코드를 작성할 때는 다음을 확인해야 한다.

\`\`\`text
- timeout을 설정했는가?
- 실패 시 재시도 횟수를 제한했는가?
- 인증 정보를 코드에 직접 쓰지 않았는가?
- 페이지네이션 종료 조건이 명확한가?
- 응답 구조가 예상과 다를 때 처리하는가?
- 수집 결과를 중간 형식으로 저장하는가?
- 로그를 남기는가?
\`\`\`

---
`;export{e as default};