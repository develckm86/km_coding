var e=`# 4장. 분석용 데이터마트 만들기

## 4.5 실습 환경 준비

1장에서 만든 프로젝트 폴더를 사용합니다.

---

### 4.5.1 라이브러리 불러오기

\`\`\`python
from pathlib import Path
import pandas as pd
import numpy as np
\`\`\`

---

### 4.5.2 경로 설정

\`\`\`python
PROJECT_DIR = Path("advanced_data_analysis_project")

DATA_RAW = PROJECT_DIR / "data" / "raw"
DATA_PROCESSED = PROJECT_DIR / "data" / "processed"

OUTPUT_TABLES = PROJECT_DIR / "outputs" / "tables"
OUTPUT_REPORTS = PROJECT_DIR / "outputs" / "reports"

for path in [DATA_RAW, DATA_PROCESSED, OUTPUT_TABLES, OUTPUT_REPORTS]:
    path.mkdir(parents=True, exist_ok=True)
\`\`\`

이번 장에서는 정리된 데이터를 \`data/processed/\`에 저장합니다.

---
`;export{e as default};