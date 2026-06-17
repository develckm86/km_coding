var e=`# 12장. A/B 테스트 분석 실습

## 12.4 실습 환경 준비

1장에서 만든 프로젝트 폴더 구조를 사용합니다.

---

### 12.4.1 라이브러리 불러오기

\`\`\`python
from pathlib import Path
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats
\`\`\`

\`scipy\`가 설치되어 있지 않다면 다음 명령으로 설치할 수 있습니다.

\`\`\`python
# pip install scipy
\`\`\`

---

### 12.4.2 경로 설정

\`\`\`python
PROJECT_DIR = Path("advanced_data_analysis_project")

DATA_PROCESSED = PROJECT_DIR / "data" / "processed"

OUTPUT_TABLES = PROJECT_DIR / "outputs" / "tables"
OUTPUT_CHARTS = PROJECT_DIR / "outputs" / "charts"
OUTPUT_REPORTS = PROJECT_DIR / "outputs" / "reports"

for path in [DATA_PROCESSED, OUTPUT_TABLES, OUTPUT_CHARTS, OUTPUT_REPORTS]:
    path.mkdir(parents=True, exist_ok=True)
\`\`\`

---
`;export{e as default};