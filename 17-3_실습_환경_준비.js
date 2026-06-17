var e=`# 17장. 고급 시각화 리포트 만들기

## 17.3 실습 환경 준비

1장에서 만든 프로젝트 구조를 사용합니다.

---

### 17.3.1 라이브러리 불러오기

\`\`\`python
from pathlib import Path
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
\`\`\`

---

### 17.3.2 경로 설정

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

### 17.3.3 한글 폰트 설정 참고

matplotlib에서 한글이 깨질 수 있습니다.

환경에 따라 다음처럼 폰트를 설정할 수 있습니다.

\`\`\`python
plt.rcParams["axes.unicode_minus"] = False
\`\`\`

한글 폰트 설정은 운영체제마다 다릅니다.  
수업 환경에서 한글이 깨진다면 사용 가능한 한글 폰트를 확인해 설정합니다.

예시:

\`\`\`python
# plt.rcParams["font.family"] = "Malgun Gothic"
# plt.rcParams["font.family"] = "AppleGothic"
# plt.rcParams["font.family"] = "NanumGothic"
\`\`\`

---
`;export{e as default};