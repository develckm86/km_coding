var e=`# 3장. 데이터 품질 진단 리포트 만들기

## 3.4 실습 환경 준비

1장에서 만든 프로젝트 폴더를 사용합니다.

---

### 3.4.1 라이브러리 불러오기

\`\`\`python
from pathlib import Path
import pandas as pd
import numpy as np
\`\`\`

---

### 3.4.2 경로 설정

\`\`\`python
PROJECT_DIR = Path("advanced_data_analysis_project")

DATA_RAW = PROJECT_DIR / "data" / "raw"
DATA_PROCESSED = PROJECT_DIR / "data" / "processed"

OUTPUT_TABLES = PROJECT_DIR / "outputs" / "tables"
OUTPUT_REPORTS = PROJECT_DIR / "outputs" / "reports"

for path in [DATA_RAW, DATA_PROCESSED, OUTPUT_TABLES, OUTPUT_REPORTS]:
    path.mkdir(parents=True, exist_ok=True)
\`\`\`

이번 장에서는 결과표를 \`outputs/tables/\`에 저장하고, 보고서를 \`outputs/reports/\`에 저장합니다.

---
`;export{e as default};