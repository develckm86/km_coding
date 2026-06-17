var e=`# 5장. 데이터 재구조화 실습

## 5.4 실습 환경 준비

1장에서 만든 프로젝트 구조를 사용합니다.

---

### 5.4.1 라이브러리 불러오기

\`\`\`python
from pathlib import Path
import pandas as pd
import numpy as np
\`\`\`

---

### 5.4.2 경로 설정

\`\`\`python
PROJECT_DIR = Path("advanced_data_analysis_project")

DATA_PROCESSED = PROJECT_DIR / "data" / "processed"

OUTPUT_TABLES = PROJECT_DIR / "outputs" / "tables"
OUTPUT_REPORTS = PROJECT_DIR / "outputs" / "reports"

for path in [DATA_PROCESSED, OUTPUT_TABLES, OUTPUT_REPORTS]:
    path.mkdir(parents=True, exist_ok=True)
\`\`\`

이번 장에서는 4장에서 만든 데이터마트를 사용할 예정입니다.

파일명:

\`\`\`text
data/processed/chapter_04_orders_mart.csv
\`\`\`

---
`;export{e as default};