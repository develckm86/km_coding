var e=`# 1장. 고급 분석 프로젝트 시작하기

## 1.4 프로젝트 폴더 구조 설계

분석 프로젝트를 시작할 때 가장 먼저 할 일은 폴더 구조를 만드는 것입니다.

처음에는 폴더 구조가 번거롭게 느껴질 수 있습니다.  
하지만 프로젝트가 길어지고 결과물이 많아지면 폴더 구조가 매우 중요해집니다.

---

### 1.4.1 나쁜 프로젝트 구조

초보자가 자주 만드는 구조는 다음과 같습니다.

\`\`\`text
analysis/
  data.csv
  data_new.csv
  data_final.csv
  final_real.csv
  test.ipynb
  test2.ipynb
  chart.png
  report.md
  report_final.md
  report_final2.md
\`\`\`

이 구조의 문제는 다음과 같습니다.

\`\`\`text
원본 데이터가 무엇인지 알기 어렵다.
처리된 데이터가 무엇인지 알기 어렵다.
중간 결과와 최종 결과가 섞여 있다.
노트북의 실행 순서를 알기 어렵다.
그래프와 보고서가 한 폴더에 섞여 있다.
다른 사람이 프로젝트를 이해하기 어렵다.
\`\`\`

---

### 1.4.2 좋은 프로젝트 구조

이번 과정에서는 다음 구조를 사용합니다.

\`\`\`text
advanced_data_analysis_project/
  data/
    raw/
    processed/
  notebooks/
  outputs/
    tables/
    charts/
    reports/
  src/
  README.md
\`\`\`

각 폴더의 역할은 다음과 같습니다.

| 폴더 | 역할 |
|---|---|
| \`data/raw/\` | 원본 데이터 저장 |
| \`data/processed/\` | 전처리된 데이터 저장 |
| \`notebooks/\` | 분석 노트북 저장 |
| \`outputs/tables/\` | 분석 결과 표 저장 |
| \`outputs/charts/\` | 그래프 이미지 저장 |
| \`outputs/reports/\` | 분석 보고서 저장 |
| \`src/\` | 재사용 가능한 함수 코드 저장 |
| \`README.md\` | 프로젝트 설명 문서 |

이 구조는 반드시 정답은 아닙니다.  
하지만 실습과 실무 모두에서 사용하기 좋은 기본 구조입니다.

---

### 1.4.3 폴더 구조 만들기

Python으로 폴더 구조를 만들 수 있습니다.

\`\`\`python
from pathlib import Path

project_dir = Path("advanced_data_analysis_project")

folders = [
    "data/raw",
    "data/processed",
    "notebooks",
    "outputs/tables",
    "outputs/charts",
    "outputs/reports",
    "src"
]

for folder in folders:
    (project_dir / folder).mkdir(parents=True, exist_ok=True)
\`\`\`

이 코드는 다음 작업을 수행합니다.

\`\`\`text
advanced_data_analysis_project 폴더를 만든다.
그 안에 data/raw, data/processed 등을 만든다.
이미 폴더가 있어도 오류가 나지 않게 한다.
\`\`\`

\`parents=True\`는 상위 폴더가 없으면 함께 만들라는 뜻입니다.  
\`exist_ok=True\`는 이미 폴더가 있어도 오류를 내지 말라는 뜻입니다.

---

### 1.4.4 폴더 생성 확인하기

생성된 폴더를 확인하려면 다음처럼 작성할 수 있습니다.

\`\`\`python
for path in project_dir.rglob("*"):
    print(path)
\`\`\`

\`rglob("*")\`은 하위 폴더와 파일을 모두 찾습니다.

실습에서는 실제 파일 탐색기에서 폴더가 만들어졌는지도 확인해보는 것이 좋습니다.

---
`;export{e as default};