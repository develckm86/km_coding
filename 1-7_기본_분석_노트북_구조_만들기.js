var e=`# 1장. 고급 분석 프로젝트 시작하기

## 1.7 기본 분석 노트북 구조 만들기

고급 분석 과정에서는 매 장마다 분석 노트북을 작성합니다.

좋은 노트북은 코드만 나열하지 않습니다.  
Markdown 설명과 코드, 결과, 해석이 함께 있어야 합니다.

---

### 1.7.1 좋은 노트북의 기본 구조

분석 노트북은 다음 구조를 가질 수 있습니다.

\`\`\`text
1. 제목
2. 분석 목적
3. 라이브러리 불러오기
4. 경로 설정
5. 데이터 불러오기
6. 데이터 구조 확인
7. 전처리
8. 분석
9. 시각화
10. 해석
11. 결과 저장
12. 한계와 다음 분석
\`\`\`

Jupyter Notebook에서는 Markdown 셀과 코드 셀을 구분해서 작성합니다.

---

### 1.7.2 노트북 Markdown 템플릿

다음은 기본 노트북 템플릿입니다.

\`\`\`\`markdown
# 01. 고급 분석 프로젝트 시작하기

## 1. 분석 목적

이번 노트북은 고급 데이터 분석 프로젝트의 기본 구조를 만들고,
데이터와 결과물을 체계적으로 관리하기 위한 환경을 준비하는 것을 목적으로 한다.

## 2. 라이브러리 불러오기

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path
\`\`\`

## 3. 경로 설정

\`\`\`python
PROJECT_DIR = Path("advanced_data_analysis_project")
DATA_RAW = PROJECT_DIR / "data" / "raw"
DATA_PROCESSED = PROJECT_DIR / "data" / "processed"
OUTPUT_TABLES = PROJECT_DIR / "outputs" / "tables"
OUTPUT_CHARTS = PROJECT_DIR / "outputs" / "charts"
OUTPUT_REPORTS = PROJECT_DIR / "outputs" / "reports"
\`\`\`

## 4. 데이터 불러오기

## 5. 데이터 구조 확인

## 6. 결과 저장

## 7. 정리
\`\`\`\`

---

### 1.7.3 코드 셀과 설명 셀의 균형

나쁜 노트북은 코드만 있습니다.

\`\`\`python
import pandas as pd
df = pd.read_csv("data.csv")
df.head()
df.info()
df.describe()
df.groupby("category")["sales"].sum()
\`\`\`

좋은 노트북은 코드 앞뒤에 설명이 있습니다.

\`\`\`markdown
## 데이터 구조 확인

먼저 데이터의 행과 열 개수, 자료형, 결측치 여부를 확인한다.
\`\`\`

\`\`\`python
df.info()
\`\`\`

\`\`\`markdown
order_date는 문자열이므로 날짜 분석을 위해 datetime 형식으로 변환할 필요가 있다.
\`\`\`

이렇게 작성하면 노트북이 분석 기록이자 보고서 초안이 됩니다.

---
`;export{e as default};