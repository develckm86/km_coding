var e=`# 1장. 고급 분석 프로젝트 시작하기

## 1.14 이번 장에서 자주 하는 실수

프로젝트를 시작할 때 자주 하는 실수를 정리합니다.

---

### 1.14.1 원본 데이터와 처리 데이터를 같은 폴더에 두는 실수

원본 데이터와 처리 데이터를 같은 폴더에 두면 어떤 파일이 원본인지 알기 어려워집니다.

좋은 방식:

\`\`\`text
data/raw/        원본 데이터
data/processed/  처리 데이터
\`\`\`

---

### 1.14.2 파일 이름을 모호하게 짓는 실수

나쁜 예:

\`\`\`text
data.csv
final.csv
new_final.csv
\`\`\`

좋은 예:

\`\`\`text
orders_sample.csv
orders_mart.csv
category_sales_summary.csv
\`\`\`

파일 이름만 보고 내용과 용도를 알 수 있어야 합니다.

---

### 1.14.3 결과물을 저장하지 않는 실수

분석 결과를 노트북 화면에서만 확인하면 나중에 다시 사용하기 어렵습니다.

요약표는 CSV나 Excel로 저장하고, 그래프는 이미지로 저장하는 습관이 좋습니다.

\`\`\`python
summary.to_csv("summary.csv", index=False)
plt.savefig("chart.png", bbox_inches="tight")
\`\`\`

---

### 1.14.4 README를 작성하지 않는 실수

README가 없으면 프로젝트를 다시 열었을 때 구조를 이해하기 어렵습니다.

README에는 최소한 다음을 적어야 합니다.

\`\`\`text
프로젝트 목적
폴더 구조
데이터 설명
실행 방법
결과물 설명
\`\`\`

---

### 1.14.5 경로를 문자열로 반복해서 쓰는 실수

나쁜 예:

\`\`\`python
pd.read_csv("advanced_data_analysis_project/data/raw/orders_sample.csv")
\`\`\`

좋은 예:

\`\`\`python
pd.read_csv(DATA_RAW / "orders_sample.csv")
\`\`\`

경로를 변수로 관리하면 실수를 줄일 수 있습니다.

---

### 1.14.6 노트북에 코드만 쓰는 실수

좋은 분석 노트북은 코드와 설명이 함께 있어야 합니다.

\`\`\`markdown
## 데이터 구조 확인

데이터의 행과 열 개수, 컬럼명, 자료형을 확인한다.
\`\`\`

\`\`\`python
orders.info()
\`\`\`

\`\`\`markdown
order_date는 문자열이므로 날짜형 변환이 필요하다.
\`\`\`

---
`;export{e as default};