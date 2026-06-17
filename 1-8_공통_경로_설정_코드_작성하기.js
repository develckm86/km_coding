var e=`# 1장. 고급 분석 프로젝트 시작하기

## 1.8 공통 경로 설정 코드 작성하기

분석 프로젝트에서는 파일 경로를 여러 번 사용합니다.

매번 문자열로 경로를 쓰면 실수하기 쉽습니다.

나쁜 예:

\`\`\`python
pd.read_csv("advanced_data_analysis_project/data/raw/orders.csv")
\`\`\`

좋은 예:

\`\`\`python
DATA_RAW / "orders.csv"
\`\`\`

---

### 1.8.1 경로 상수 만들기

\`\`\`python
from pathlib import Path

PROJECT_DIR = Path("advanced_data_analysis_project")

DATA_RAW = PROJECT_DIR / "data" / "raw"
DATA_PROCESSED = PROJECT_DIR / "data" / "processed"

OUTPUT_TABLES = PROJECT_DIR / "outputs" / "tables"
OUTPUT_CHARTS = PROJECT_DIR / "outputs" / "charts"
OUTPUT_REPORTS = PROJECT_DIR / "outputs" / "reports"

SRC_DIR = PROJECT_DIR / "src"
\`\`\`

이렇게 경로를 변수로 만들어두면 이후 코드가 깔끔해집니다.

\`\`\`python
orders_path = DATA_RAW / "orders.csv"
\`\`\`

---

### 1.8.2 폴더가 없으면 자동 생성하기

\`\`\`python
for path in [DATA_RAW, DATA_PROCESSED, OUTPUT_TABLES, OUTPUT_CHARTS, OUTPUT_REPORTS, SRC_DIR]:
    path.mkdir(parents=True, exist_ok=True)
\`\`\`

이 코드를 노트북 초반에 넣어두면 결과 저장 폴더가 없어서 오류가 나는 일을 줄일 수 있습니다.

---

### 1.8.3 경로 설정을 함수로 만들기

나중에는 경로 설정 코드를 함수로 만들 수도 있습니다.

\`\`\`python
def make_project_dirs(project_dir: Path) -> dict:
    paths = {
        "data_raw": project_dir / "data" / "raw",
        "data_processed": project_dir / "data" / "processed",
        "output_tables": project_dir / "outputs" / "tables",
        "output_charts": project_dir / "outputs" / "charts",
        "output_reports": project_dir / "outputs" / "reports",
        "src": project_dir / "src",
    }

    for path in paths.values():
        path.mkdir(parents=True, exist_ok=True)

    return paths
\`\`\`

사용 예:

\`\`\`python
paths = make_project_dirs(Path("advanced_data_analysis_project"))

paths
\`\`\`

고급 과정에서는 이렇게 반복되는 코드를 함수로 정리하는 습관이 중요합니다.

---
`;export{e as default};