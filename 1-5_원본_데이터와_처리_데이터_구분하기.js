var e=`# 1장. 고급 분석 프로젝트 시작하기

## 1.5 원본 데이터와 처리 데이터 구분하기

분석 프로젝트에서 매우 중요한 원칙이 있습니다.

\`\`\`text
원본 데이터는 수정하지 않는다.
\`\`\`

원본 데이터는 항상 그대로 보존해야 합니다.

---

### 1.5.1 원본 데이터를 보존해야 하는 이유

원본 데이터를 보존해야 하는 이유는 다음과 같습니다.

\`\`\`text
전처리 과정에서 실수했을 때 다시 시작할 수 있다.
결과가 이상할 때 원본을 확인할 수 있다.
다른 사람이 분석 과정을 검증할 수 있다.
전처리 기준이 바뀌었을 때 다시 처리할 수 있다.
데이터 품질 문제를 추적할 수 있다.
\`\`\`

따라서 원본 파일은 \`data/raw/\`에 저장하고 직접 수정하지 않습니다.

전처리된 데이터는 \`data/processed/\`에 저장합니다.

---

### 1.5.2 데이터 저장 규칙

이번 과정에서는 다음 규칙을 사용합니다.

\`\`\`text
원본 데이터: data/raw/
전처리 데이터: data/processed/
분석 결과 표: outputs/tables/
그래프: outputs/charts/
보고서: outputs/reports/
\`\`\`

예를 들어 다음과 같이 저장할 수 있습니다.

\`\`\`text
data/raw/orders.csv
data/raw/customers.csv
data/raw/products.csv

data/processed/orders_mart.csv
data/processed/customer_features.csv

outputs/tables/category_sales.csv
outputs/tables/monthly_sales.csv

outputs/charts/monthly_sales.png
outputs/charts/category_sales.png

outputs/reports/sales_analysis_report.md
\`\`\`

---

### 1.5.3 파일 이름 작성 규칙

파일 이름도 중요합니다.

나쁜 예:

\`\`\`text
data.csv
new.csv
final.csv
real_final.csv
report2.md
\`\`\`

좋은 예:

\`\`\`text
orders_raw_2026_01.csv
orders_mart_2026_q1.csv
category_sales_summary.csv
monthly_sales_report.md
\`\`\`

좋은 파일 이름은 다음 정보를 포함합니다.

\`\`\`text
데이터 내용
처리 단계
기간
용도
\`\`\`

예를 들어:

\`\`\`text
orders_raw_2026_01.csv
\`\`\`

이 파일 이름은 다음을 의미합니다.

\`\`\`text
주문 데이터
원본 데이터
2026년 1월
CSV 파일
\`\`\`

---
`;export{e as default};