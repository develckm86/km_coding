var e=`# 20장. 종합 프로젝트: 데이터 분석 파이프라인 완성

## 20.3 프로젝트 환경 준비

먼저 프로젝트 폴더와 라이브러리를 준비합니다.

---

### 20.3.1 라이브러리 불러오기

\`\`\`python
from pathlib import Path
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import duckdb
\`\`\`

---

### 20.3.2 경로 설정

\`\`\`python
PROJECT_DIR = Path("advanced_data_analysis_project")

DATA_RAW = PROJECT_DIR / "data" / "raw"
DATA_PROCESSED = PROJECT_DIR / "data" / "processed"

OUTPUT_TABLES = PROJECT_DIR / "outputs" / "tables"
OUTPUT_CHARTS = PROJECT_DIR / "outputs" / "charts"
OUTPUT_REPORTS = PROJECT_DIR / "outputs" / "reports"
OUTPUT_QUERIES = PROJECT_DIR / "outputs" / "queries"

for path in [
    DATA_RAW,
    DATA_PROCESSED,
    OUTPUT_TABLES,
    OUTPUT_CHARTS,
    OUTPUT_REPORTS,
    OUTPUT_QUERIES
]:
    path.mkdir(parents=True, exist_ok=True)
\`\`\`

---

### 20.3.3 공통 설정

\`\`\`python
RANDOM_SEED = 42
rng = np.random.default_rng(RANDOM_SEED)

BASE_DATE = pd.Timestamp("2026-06-30")
\`\`\`

기준일은 RFM 분석과 리텐션 해석에 사용합니다.

---
`;export{e as default};