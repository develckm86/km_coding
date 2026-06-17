var e=`# 7장. 누적 지표와 이동평균 분석

## 7.4 실습 환경 준비

1장에서 만든 프로젝트 구조를 사용합니다.

---

### 7.4.1 라이브러리 불러오기

\`\`\`python
from pathlib import Path
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
\`\`\`

---

### 7.4.2 경로 설정

\`\`\`python
PROJECT_DIR = Path("advanced_data_analysis_project")

DATA_PROCESSED = PROJECT_DIR / "data" / "processed"

OUTPUT_TABLES = PROJECT_DIR / "outputs" / "tables"
OUTPUT_CHARTS = PROJECT_DIR / "outputs" / "charts"
OUTPUT_REPORTS = PROJECT_DIR / "outputs" / "reports"

for path in [DATA_PROCESSED, OUTPUT_TABLES, OUTPUT_CHARTS, OUTPUT_REPORTS]:
    path.mkdir(parents=True, exist_ok=True)
\`\`\`

이번 장에서는 표, 그래프, 보고서를 모두 저장합니다.

---
`;export{e as default};