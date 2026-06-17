var e=`<!-- 원본: python_data_analysis_basic_chapter_2_book.md / 세부 장: 2-5 -->

# 2.5 분석 프로젝트 폴더 구조

데이터 분석에서는 파일이 많아진다.

처음에는 CSV 파일 하나와 노트북 하나로 시작하더라도, 실습이 진행되면 다음 파일들이 생긴다.

- 원본 데이터
- 정리된 데이터
- 분석 노트북
- 그래프 이미지
- 결과 보고서
- 재사용 함수
- 환경 설정 파일

이 파일들을 한 폴더에 모두 섞어 두면 관리가 어려워진다.  
따라서 처음부터 폴더 구조를 정해 두는 것이 좋다.

---

## 2.5.1 기본 폴더 구조

이 수업에서는 다음 구조를 기본으로 사용한다.

\`\`\`text
data_analysis_project/
  data/
    raw/
    processed/
  notebooks/
  outputs/
    charts/
    reports/
  src/
  README.md
  requirements.txt
\`\`\`

각 폴더의 역할은 다음과 같다.

| 폴더 또는 파일 | 역할 |
|---|---|
| \`data/raw/\` | 원본 데이터 저장 |
| \`data/processed/\` | 정리된 데이터 저장 |
| \`notebooks/\` | Jupyter Notebook 저장 |
| \`outputs/charts/\` | 그래프 이미지 저장 |
| \`outputs/reports/\` | 분석 보고서 저장 |
| \`src/\` | 재사용할 파이썬 코드 저장 |
| \`README.md\` | 프로젝트 설명 |
| \`requirements.txt\` | 필요한 라이브러리 목록 |

---

## 2.5.2 원본 데이터와 처리 데이터 분리

데이터 분석에서 중요한 원칙 중 하나는 **원본 데이터를 함부로 수정하지 않는 것**이다.

원본 데이터는 \`data/raw/\`에 저장하고, 분석 과정에서 정리한 데이터는 \`data/processed/\`에 저장한다.

\`\`\`text
data/
  raw/
    orders_2026.csv
  processed/
    orders_cleaned.csv
\`\`\`

이렇게 분리하면 다음 장점이 있다.

- 원본 데이터가 보존된다.
- 전처리 과정을 다시 실행할 수 있다.
- 실수로 데이터를 잘못 수정해도 원본에서 다시 시작할 수 있다.
- 다른 사람이 분석 과정을 검토하기 쉽다.

분석 수업에서는 항상 “원본은 보존하고, 결과는 별도 파일로 저장한다”는 습관을 들이는 것이 좋다.

---

## 2.5.3 notebooks 폴더

\`notebooks/\` 폴더에는 분석 노트북을 저장한다.

예시는 다음과 같다.

\`\`\`text
notebooks/
  01_environment_check.ipynb
  02_load_sales_data.ipynb
  03_basic_exploration.ipynb
\`\`\`

노트북 파일 이름은 순서와 목적이 드러나게 작성한다.  
파일 이름만 봐도 어떤 작업을 하는 노트북인지 알 수 있어야 한다.

---

## 2.5.4 outputs 폴더

\`outputs/\` 폴더에는 분석 결과를 저장한다.

예를 들어 그래프는 \`outputs/charts/\`에 저장하고, 보고서는 \`outputs/reports/\`에 저장한다.

\`\`\`text
outputs/
  charts/
    monthly_sales.png
    category_sales.png
  reports/
    sales_summary.xlsx
    analysis_report.md
\`\`\`

분석 결과를 코드 실행 결과로만 남기면 나중에 다시 찾기 어렵다.  
중요한 표, 그래프, 보고서는 파일로 저장하는 것이 좋다.

---

## 2.5.5 src 폴더

\`src/\` 폴더에는 재사용할 파이썬 코드를 저장한다.

기초 과정 초반에는 노트북 안에 모든 코드를 작성해도 괜찮다.  
하지만 같은 코드를 여러 노트북에서 반복해서 사용한다면 함수로 분리하는 것이 좋다.

예를 들어 다음과 같은 파일을 만들 수 있다.

\`\`\`text
src/
  data_loader.py
  cleaning.py
  visualization.py
\`\`\`

분석 고급 과정에서는 노트북과 \`.py\` 파일을 함께 사용하는 구조가 더 중요해진다.

---

## 2.5.6 README.md

\`README.md\`는 프로젝트 설명 파일이다.  
이 파일에는 프로젝트의 목적과 실행 방법을 적는다.

예를 들어 다음과 같이 작성할 수 있다.

\`\`\`markdown
# 매출 데이터 분석 프로젝트

## 목적
월별 매출 추이와 카테고리별 매출 비중을 분석한다.

## 폴더 구조
- data/raw: 원본 데이터
- data/processed: 전처리된 데이터
- notebooks: 분석 노트북
- outputs: 결과 파일

## 실행 방법
1. 가상환경을 활성화한다.
2. 필요한 라이브러리를 설치한다.
3. notebooks 폴더의 노트북을 순서대로 실행한다.
\`\`\`

좋은 분석 프로젝트는 코드만 있는 것이 아니라, 어떤 목적의 프로젝트인지 설명하는 문서도 함께 있어야 한다.

---
`;export{e as default};