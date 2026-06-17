var e=`<!-- 원본: python_advanced_chapter_18_book.md / 세부 장: 18-5 -->

# 18.5 작업 결과 저장

CLI 프로그램은 실행 결과를 화면에만 출력해서는 부족한 경우가 많다.  
실무 자동화에서는 결과를 파일로 남겨야 한다.

예를 들어 파일 검증 프로그램이라면 다음과 같은 결과를 남길 수 있다.

- 정상 파일 목록
- 실패 파일 목록
- 오류 메시지
- 처리 요약
- 실행 로그

---

### 18.5.1 텍스트 결과 저장

가장 단순한 결과는 텍스트 파일로 저장할 수 있다.

\`\`\`python
from pathlib import Path

def save_text(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")
\`\`\`

사용 예시는 다음과 같다.

\`\`\`python
summary = """처리 결과
성공: 10개
실패: 2개
"""

save_text(Path("result/summary.txt"), summary)
\`\`\`

텍스트 결과는 사람이 읽기 좋다.  
간단한 보고서나 실행 요약을 저장할 때 적합하다.

---

### 18.5.2 CSV 결과 저장

표 형태 결과는 CSV로 저장하는 것이 좋다.

\`\`\`python
import csv
from pathlib import Path

def save_csv(path: Path, rows: list[dict[str, str]]) -> None:
    if not rows:
        return

    path.parent.mkdir(parents=True, exist_ok=True)

    fieldnames = list(rows[0].keys())

    with path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
\`\`\`

사용 예시는 다음과 같다.

\`\`\`python
failed_rows = [
    {"file": "customers.csv", "error": "email 컬럼이 없습니다."},
    {"file": "orders.csv", "error": "amount 컬럼이 없습니다."},
]

save_csv(Path("result/failed.csv"), failed_rows)
\`\`\`

CSV는 엑셀이나 pandas에서 다시 열기 쉽기 때문에 데이터 처리 결과 저장에 자주 사용된다.

---

### 18.5.3 JSON 결과 저장

구조가 복잡한 결과는 JSON으로 저장할 수 있다.

\`\`\`python
import json
from pathlib import Path
from typing import Any

def save_json(path: Path, data: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(data, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
\`\`\`

사용 예시는 다음과 같다.

\`\`\`python
result = {
    "success_count": 10,
    "failed_count": 2,
    "failed_files": [
        {"file": "customers.csv", "error": "email 컬럼 없음"},
        {"file": "orders.csv", "error": "amount 컬럼 없음"},
    ],
}

save_json(Path("result/result.json"), result)
\`\`\`

JSON은 다른 프로그램과 데이터를 주고받기 좋다.  
API 수집 결과나 설정 구조를 저장할 때도 많이 사용된다.

---

### 18.5.4 실패 목록 저장하기

자동화 프로그램에서 모든 작업이 항상 성공하는 것은 아니다.  
실무에서는 일부만 실패하고 나머지는 성공하는 경우가 많다.

예를 들어 100개의 파일을 처리하는데 3개 파일만 실패할 수 있다.  
이때 프로그램 전체를 중단할지, 실패 파일만 기록하고 계속할지 결정해야 한다.

대량 처리 작업에서는 보통 실패 목록을 따로 저장하고 계속 진행한다.

\`\`\`python
def process_files(files: list[Path]) -> list[dict[str, str]]:
    failed: list[dict[str, str]] = []

    for file in files:
        try:
            process_file(file)
        except Exception as error:
            failed.append({
                "file": str(file),
                "error": str(error),
            })

    return failed
\`\`\`

이후 실패 목록을 CSV나 JSON으로 저장하면 된다.

\`\`\`python
failed = process_files(files)
save_csv(Path("result/failed.csv"), failed)
\`\`\`

실패 목록은 나중에 원인을 분석하고 재처리할 때 매우 중요하다.

---
`;export{e as default};