var e=`# 1장. 고급 분석 프로젝트 시작하기

## 1.15 1장 실습 과제

이번 장의 과제는 고급 분석 프로젝트의 시작 환경을 직접 만드는 것입니다.

---

### 과제 1. 프로젝트 폴더 만들기

다음 구조를 Python 코드로 생성하세요.

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

제출물:

\`\`\`text
폴더 구조 생성 코드
생성된 폴더 목록
\`\`\`

---

### 과제 2. README 작성하기

README에 다음 내용을 포함하세요.

\`\`\`text
프로젝트 제목
프로젝트 개요
분석 목적
폴더 구조
데이터 관리 규칙
사용 도구
예상 결과물
\`\`\`

제출물:

\`\`\`text
README.md
\`\`\`

---

### 과제 3. 샘플 데이터 저장하기

다음 세 데이터를 만들어 \`data/raw/\` 폴더에 CSV로 저장하세요.

\`\`\`text
orders_sample.csv
customers_sample.csv
products_sample.csv
\`\`\`

각 데이터는 최소 5행 이상으로 구성하세요.

제출물:

\`\`\`text
샘플 데이터 생성 코드
저장된 CSV 파일
\`\`\`

---

### 과제 4. 간단한 결과표 만들기

주문 데이터와 상품 데이터를 결합해 카테고리별 매출을 계산하세요.

필수 결과 컬럼:

\`\`\`text
category
total_sales
order_count
\`\`\`

결과를 \`outputs/tables/category_summary.csv\`로 저장하세요.

---

### 과제 5. 그래프 저장하기

카테고리별 매출 막대 그래프를 만들고 \`outputs/charts/category_sales.png\`로 저장하세요.

---

### 과제 6. 실습 보고서 작성하기

\`outputs/reports/chapter_01_report.md\` 파일을 만들고 다음 내용을 작성하세요.

\`\`\`text
실습 목적
생성한 폴더 구조
생성한 데이터
생성한 결과물
실습을 통해 배운 점
\`\`\`

---
`;export{e as default};