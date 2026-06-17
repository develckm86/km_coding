var e=`# 18장. SQL 기반 분석 실습

## 18.4 실습 환경 준비

1장에서 만든 프로젝트 구조를 사용합니다.

### 18.4.1 라이브러리 불러오기

\`\`\`python
from pathlib import Path
import pandas as pd
import numpy as np
import duckdb
\`\`\`

### 18.4.2 경로 설정

\`\`\`python
PROJECT_DIR = Path("advanced_data_analysis_project")

DATA_PROCESSED = PROJECT_DIR / "data" / "processed"

OUTPUT_TABLES = PROJECT_DIR / "outputs" / "tables"
OUTPUT_QUERIES = PROJECT_DIR / "outputs" / "queries"
OUTPUT_REPORTS = PROJECT_DIR / "outputs" / "reports"

for path in [DATA_PROCESSED, OUTPUT_TABLES, OUTPUT_QUERIES, OUTPUT_REPORTS]:
    path.mkdir(parents=True, exist_ok=True)
\`\`\`

이번 장에서는 SQL 쿼리 파일도 저장하므로 \`outputs/queries/\` 폴더를 사용합니다.

---
`;export{e as default};