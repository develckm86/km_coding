var e=`<!-- 원본: python_data_analysis_basic_chapter_19_book.md / 세부 장: 19-6 -->

# 19.6 전처리 및 분석 기준 정리하기

분석 결과를 신뢰하려면 결과가 어떻게 만들어졌는지 알려야 합니다.

전처리와 분석 기준은 길게 쓸 필요는 없지만, 핵심 기준은 반드시 남겨야 합니다.

---

### 19.6.1 데이터 품질 확인 코드

\`\`\`python
missing_summary = orders.isna().sum()
duplicate_order_count = orders.duplicated(subset=["order_id"]).sum()

missing_summary, duplicate_order_count
\`\`\`

날짜 컬럼의 자료형도 확인할 수 있습니다.

\`\`\`python
orders["order_date"].dtype
\`\`\`

---

### 19.6.2 분석 기준 예시

\`\`\`text
전처리 및 분석 기준
- order_date는 문자열에서 날짜형으로 변환했다.
- year_month는 order_date에서 연월 정보를 추출해 생성했다.
- order_id 기준 중복 주문은 발견되지 않았다.
- 주요 분석 컬럼인 category, grade, region, total_price에는 결측치가 없었다.
- 매출은 total_price 컬럼을 기준으로 계산했다.
- 월별 분석은 year_month 기준으로 수행했다.
- 고객 수는 customer_id의 고유값 개수로 계산했다.
\`\`\`

이런 기준이 있어야 결과를 읽는 사람이 계산 방식을 이해할 수 있습니다.

---

### 19.6.3 계산식 명시하기

계산식이 있는 지표는 명시하는 것이 좋습니다.

예를 들어 매출 비중은 다음처럼 정의할 수 있습니다.

\`\`\`text
카테고리별 매출 비중 = 카테고리별 매출 / 전체 매출 × 100
\`\`\`

평균 주문 금액은 다음처럼 정의합니다.

\`\`\`text
평균 주문 금액 = 총 주문 금액 / 주문 건수
\`\`\`

고객 수는 다음처럼 정의합니다.

\`\`\`text
고객 수 = customer_id의 고유값 개수
\`\`\`

같은 단어라도 계산 기준에 따라 결과가 달라질 수 있습니다.  
따라서 중요한 지표는 계산 기준을 적어야 합니다.

---
`;export{e as default};