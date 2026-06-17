var e=`<!-- 원본: python_advanced_chapter_16_book.md / 세부 장: 16-12 -->

# 16.12 실무 패턴 2: 여러 파일 처리

## 문제 상황

폴더 안에 많은 텍스트 파일이 있고, 각 파일에서 특정 단어가 등장한 횟수를 세어야 한다고 하자.

\`\`\`text
data/
  log_001.txt
  log_002.txt
  log_003.txt
  ...
\`\`\`

파일 수가 많다면 순차 처리 시간이 길어질 수 있다.

## 파일 처리 함수 만들기

먼저 파일 하나를 처리하는 함수를 만든다.

\`\`\`python
from pathlib import Path


def count_keyword(path: Path, keyword: str) -> dict:
    count = 0

    with path.open("r", encoding="utf-8") as file:
        for line in file:
            if keyword in line:
                count += 1

    return {
        "filename": path.name,
        "keyword": keyword,
        "count": count,
    }
\`\`\`

이 함수는 입력과 출력이 명확하다. 동시성에 적용하기 좋다.

## 스레드로 파일 처리하기

파일 읽기는 I/O가 포함되므로 스레드가 도움이 될 수 있다.

\`\`\`python
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path


def process_files(folder: str, keyword: str) -> list[dict]:
    paths = list(Path(folder).glob("*.txt"))
    results = []

    with ThreadPoolExecutor(max_workers=4) as executor:
        future_to_path = {
            executor.submit(count_keyword, path, keyword): path
            for path in paths
        }

        for future in as_completed(future_to_path):
            path = future_to_path[future]
            try:
                result = future.result()
            except UnicodeDecodeError as error:
                results.append({
                    "filename": path.name,
                    "error": f"인코딩 오류: {error}",
                })
            except OSError as error:
                results.append({
                    "filename": path.name,
                    "error": f"파일 오류: {error}",
                })
            else:
                results.append(result)

    return results
\`\`\`

파일마다 실패할 수 있으므로 예외 처리를 포함했다.

## 결과 CSV 저장하기

\`\`\`python
import csv
from pathlib import Path


def save_results_csv(results: list[dict], output_path: str) -> None:
    fieldnames = ["filename", "keyword", "count", "error"]

    with Path(output_path).open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()

        for row in results:
            writer.writerow({
                "filename": row.get("filename", ""),
                "keyword": row.get("keyword", ""),
                "count": row.get("count", ""),
                "error": row.get("error", ""),
            })
\`\`\`

동시 처리 결과를 저장할 때는 정상 결과와 오류 결과가 함께 들어올 수 있다. 그래서 \`get()\`을 사용해 없는 key를 안전하게 처리했다.

## 작업 단위 분리의 중요성

동시성 코드는 작업 단위가 분명해야 한다.

\`\`\`text
1. 파일 하나를 처리하는 함수
2. 여러 파일을 동시에 실행하는 함수
3. 결과를 저장하는 함수
\`\`\`

이렇게 나누면 테스트하기 쉽고, 동시성 방식을 바꾸기도 쉽다. 예를 들어 \`ThreadPoolExecutor\`를 \`ProcessPoolExecutor\`로 바꾸어 실험할 수도 있다.

---
`;export{e as default};