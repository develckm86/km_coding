var e=`<!-- 원본: python_advanced_chapter_16_book.md / 세부 장: 16-16 -->

# 16.16 종합 예제: URL 상태 검사 도구

## 목표

URL 목록을 받아 각 URL의 상태 코드를 확인하고 결과를 CSV로 저장하는 도구를 만들어보자.

이 예제는 다음 내용을 포함한다.

- \`ThreadPoolExecutor\`
- 동시 요청 개수 제한
- 요청 실패 처리
- 결과 구조 통일
- CSV 저장
- 실행 시간 측정

## 입력 데이터

\`\`\`python
urls = [
    "https://example.com",
    "https://www.python.org",
    "https://invalid.example.invalid",
]
\`\`\`

## 단일 URL 처리 함수

\`\`\`python
import requests


def check_url(url: str) -> dict:
    try:
        response = requests.get(url, timeout=5)
        return {
            "url": url,
            "ok": response.ok,
            "status_code": response.status_code,
            "error": "",
        }
    except requests.RequestException as error:
        return {
            "url": url,
            "ok": False,
            "status_code": "",
            "error": str(error),
        }
\`\`\`

이 함수는 성공하든 실패하든 항상 딕셔너리를 반환한다. 이렇게 결과 구조를 통일하면 후속 처리가 쉬워진다.

## 여러 URL 동시에 처리하기

\`\`\`python
from concurrent.futures import ThreadPoolExecutor, as_completed


def check_urls(urls: list[str], max_workers: int = 5) -> list[dict]:
    results = []

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_url = {
            executor.submit(check_url, url): url
            for url in urls
        }

        for future in as_completed(future_to_url):
            result = future.result()
            results.append(result)

    return results
\`\`\`

\`check_url()\` 함수 안에서 예외를 처리했기 때문에 \`future.result()\`에서 예외가 다시 발생할 가능성이 줄어든다. 다만 예기치 못한 예외를 대비하려면 \`future.result()\` 주변에도 예외 처리를 추가할 수 있다.

## CSV 저장 함수

\`\`\`python
import csv
from pathlib import Path


def save_csv(results: list[dict], output_path: str) -> None:
    fieldnames = ["url", "ok", "status_code", "error"]

    with Path(output_path).open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(results)
\`\`\`

## 전체 코드

\`\`\`python
import csv
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from time import perf_counter

import requests


def check_url(url: str) -> dict:
    try:
        response = requests.get(url, timeout=5)
        return {
            "url": url,
            "ok": response.ok,
            "status_code": response.status_code,
            "error": "",
        }
    except requests.RequestException as error:
        return {
            "url": url,
            "ok": False,
            "status_code": "",
            "error": str(error),
        }


def check_urls(urls: list[str], max_workers: int = 5) -> list[dict]:
    results = []

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_url = {
            executor.submit(check_url, url): url
            for url in urls
        }

        for future in as_completed(future_to_url):
            url = future_to_url[future]
            try:
                result = future.result()
            except Exception as error:
                results.append({
                    "url": url,
                    "ok": False,
                    "status_code": "",
                    "error": f"unexpected error: {error}",
                })
            else:
                results.append(result)

    return results


def save_csv(results: list[dict], output_path: str) -> None:
    fieldnames = ["url", "ok", "status_code", "error"]

    with Path(output_path).open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(results)


def main() -> None:
    urls = [
        "https://example.com",
        "https://www.python.org",
        "https://invalid.example.invalid",
    ]

    start = perf_counter()
    results = check_urls(urls, max_workers=5)
    save_csv(results, "url_status.csv")
    end = perf_counter()

    print(f"처리 개수: {len(results)}")
    print(f"실행 시간: {end - start:.2f}초")
    print("결과 파일: url_status.csv")


if __name__ == "__main__":
    main()
\`\`\`

## 이 예제에서 배울 점

이 코드는 단순하지만 실무 구조를 갖추고 있다.

- 단일 작업 함수가 있다.
- 여러 작업 실행 함수가 있다.
- 결과 저장 함수가 있다.
- 실행 진입점이 있다.
- 실패 결과를 기록한다.
- 동시 실행 개수를 제한한다.
- 실행 시간을 측정한다.

이 구조는 API 수집, 파일 검증, URL 점검, 데이터 다운로드 도구로 확장할 수 있다.

---
`;export{e as default};