var e=`<!-- 원본: python_advanced_chapter_14_book.md / 세부 장: 14-9 -->

# 14.9 실무형 API 수집기 만들기

## 목표 구조

이제 지금까지 배운 내용을 모아 작은 API 수집기 구조를 만들어 보자. 목표는 다음과 같다.

- API 클라이언트 클래스를 만든다.
- 환경 변수에서 토큰을 읽는다.
- 페이지네이션으로 주문 데이터를 수집한다.
- 원본 데이터를 JSON Lines로 저장한다.
- 정규화된 데이터를 CSV로 저장한다.
- 실패한 데이터는 별도 파일로 저장한다.
- 실행 과정은 로그로 남긴다.

실무 프로젝트라면 파일을 나누는 것이 좋지만, 여기서는 흐름을 이해하기 위해 하나의 예제로 구성한다.

## 전체 코드 예시

아래 코드는 실제 API 주소 대신 \`https://api.example.com\`을 사용한다. 실제 사용 시에는 API 문서에 맞게 URL, 응답 구조, 인증 방식을 수정해야 한다.

\`\`\`python
import csv
import json
import logging
import os
from pathlib import Path
from typing import Iterator

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)


class APIClient:
    def __init__(self, base_url: str, token: str, timeout: int = 10):
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self.session = self._create_session(token)

    def _create_session(self, token: str) -> requests.Session:
        retry = Retry(
            total=3,
            backoff_factor=1,
            status_forcelist=(429, 500, 502, 503, 504),
            allowed_methods=("GET",),
        )
        adapter = HTTPAdapter(max_retries=retry)

        session = requests.Session()
        session.headers.update({
            "Accept": "application/json",
            "Authorization": f"Bearer {token}",
        })
        session.mount("https://", adapter)
        session.mount("http://", adapter)
        return session

    def get(self, path: str, params: dict | None = None) -> dict:
        url = f"{self.base_url}/{path.lstrip('/')}"
        response = self.session.get(url, params=params, timeout=self.timeout)
        response.raise_for_status()
        return response.json()


class OrderCollector:
    def __init__(self, client: APIClient):
        self.client = client

    def iter_orders(self, limit: int = 100) -> Iterator[dict]:
        page = 1

        while True:
            logging.info("주문 데이터 요청: page=%s", page)
            data = self.client.get("/orders", params={"page": page, "limit": limit})
            items = data.get("items", [])

            if not items:
                logging.info("더 이상 수집할 주문 데이터가 없습니다.")
                break

            for item in items:
                yield item

            total_pages = data.get("total_pages")

            if total_pages is not None and page >= total_pages:
                break

            page += 1


def normalize_order(item: dict) -> dict:
    customer = item.get("customer") or {}

    return {
        "order_id": item.get("id"),
        "amount": to_int(item.get("amount")),
        "status": item.get("status"),
        "created_at": item.get("created_at"),
        "customer_id": customer.get("id"),
        "customer_name": customer.get("name"),
    }


def to_int(value) -> int | None:
    if value is None:
        return None

    try:
        return int(value)
    except (TypeError, ValueError):
        return None


def validate_order(row: dict) -> list[str]:
    errors = []

    if row.get("order_id") is None:
        errors.append("order_id가 없습니다.")

    if row.get("amount") is None:
        errors.append("amount가 올바르지 않습니다.")

    if not row.get("created_at"):
        errors.append("created_at이 없습니다.")

    return errors


def append_jsonl(path: str, item: dict) -> None:
    output_path = Path(path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with output_path.open("a", encoding="utf-8") as file:
        file.write(json.dumps(item, ensure_ascii=False) + "\\n")


def save_csv(path: str, rows: list[dict], fieldnames: list[str]) -> None:
    output_path = Path(path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with output_path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def main() -> None:
    token = os.environ.get("API_TOKEN")

    if not token:
        raise RuntimeError("API_TOKEN 환경 변수가 필요합니다.")

    client = APIClient("https://api.example.com", token=token)
    collector = OrderCollector(client)

    rows = []

    for raw_order in collector.iter_orders(limit=100):
        append_jsonl("data/raw/orders.jsonl", raw_order)

        row = normalize_order(raw_order)
        errors = validate_order(row)

        if errors:
            append_jsonl("data/errors/invalid_orders.jsonl", {
                "errors": errors,
                "raw": raw_order,
            })
            continue

        rows.append(row)

    save_csv(
        "data/processed/orders.csv",
        rows,
        fieldnames=[
            "order_id",
            "amount",
            "status",
            "created_at",
            "customer_id",
            "customer_name",
        ],
    )

    logging.info("수집 완료: %s건", len(rows))


if __name__ == "__main__":
    main()
\`\`\`

## 코드 구조 살펴보기

이 예제는 여러 역할을 나누어 작성했다.

| 구성 요소 | 역할 |
|---|---|
| \`APIClient\` | HTTP 요청, 인증, 재시도 설정 담당 |
| \`OrderCollector\` | 페이지네이션을 이용한 주문 데이터 반복 수집 |
| \`normalize_order()\` | API 응답을 분석용 형태로 변환 |
| \`validate_order()\` | 필수 필드와 값 검증 |
| \`append_jsonl()\` | 원본 또는 오류 데이터 저장 |
| \`save_csv()\` | 정규화 데이터 저장 |
| \`main()\` | 전체 실행 흐름 제어 |

이 구조는 데이터분석 전 단계에서 매우 유용하다. 나중에 분석 과정에서는 \`data/processed/orders.csv\`를 읽어 바로 분석할 수 있고, 문제가 생기면 \`data/raw/orders.jsonl\`에서 원본을 다시 확인할 수 있다.

## 더 개선할 수 있는 부분

이 예제도 완성형은 아니다. 실무에서는 다음 요소를 더 추가할 수 있다.

- 명령행 인수로 날짜와 저장 경로 받기
- 설정 파일에서 base URL 읽기
- 수집 시작일과 종료일 지정
- 마지막 수집 위치 저장
- 중복 주문 ID 제거
- 로그 파일로 저장
- 테스트 코드 작성
- API 응답 타입 정의
- 데이터베이스 저장

고급 파이썬 수업의 앞 장에서 배운 내용들이 모두 여기와 연결된다.

- 제너레이터는 페이지네이션 수집에 사용된다.
- 컨텍스트 매니저는 파일 저장에 사용된다.
- 객체지향은 API 클라이언트 구조에 사용된다.
- 타입 힌트는 데이터 처리 함수의 입출력을 명확히 한다.
- 예외 처리와 로깅은 수집 실패를 추적하게 한다.
- 테스트는 데이터 변환 함수가 안정적으로 동작하는지 검증한다.

---
`;export{e as default};