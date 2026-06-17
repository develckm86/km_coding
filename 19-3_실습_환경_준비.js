var e=`# 19장. 대용량 데이터 처리 실습

## 19.3 실습 환경 준비

1장에서 만든 프로젝트 구조를 사용합니다.

---

### 19.3.1 라이브러리 불러오기

\`\`\`python
from pathlib import Path
import pandas as pd
import numpy as np
import duckdb
import time
import gc
\`\`\`

\`gc\`는 garbage collection 모듈입니다.  
큰 DataFrame을 삭제한 뒤 메모리 정리를 요청할 때 사용할 수 있습니다.

---

### 19.3.2 경로 설정

\`\`\`python
PROJECT_DIR = Path("advanced_data_analysis_project")

DATA_RAW = PROJECT_DIR / "data" / "raw"
DATA_PROCESSED = PROJECT_DIR / "data" / "processed"

OUTPUT_TABLES = PROJECT_DIR / "outputs" / "tables"
OUTPUT_QUERIES = PROJECT_DIR / "outputs" / "queries"
OUTPUT_REPORTS = PROJECT_DIR / "outputs" / "reports"

for path in [DATA_RAW, DATA_PROCESSED, OUTPUT_TABLES, OUTPUT_QUERIES, OUTPUT_REPORTS]:
    path.mkdir(parents=True, exist_ok=True)
\`\`\`

---

### 19.3.3 시간 측정 함수

처리 시간을 비교하기 위해 간단한 함수를 만듭니다.

\`\`\`python
def now():
    return time.perf_counter()
\`\`\`

사용 예:

\`\`\`python
start = now()
# 실행할 코드
elapsed = now() - start
print(elapsed)
\`\`\`

---

### 19.3.4 메모리 사용량 함수

DataFrame의 메모리 사용량을 MB 단위로 확인합니다.

\`\`\`python
def dataframe_memory_mb(df: pd.DataFrame) -> float:
    return df.memory_usage(deep=True).sum() / 1024 ** 2
\`\`\`

---
`;export{e as default};