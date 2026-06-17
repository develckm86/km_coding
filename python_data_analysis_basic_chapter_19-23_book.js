var e=`<!-- 원본: python_data_analysis_basic_chapter_19_book.md / 세부 장: 19-23 -->

# 19.23 정답 및 해설

### 문제 1 정답

정답: B

분석 결과 정리는 분석 결과를 다른 사람이 이해하고 활용할 수 있게 하기 위해 필요합니다.  
분석 결과가 정리되지 않으면 의사결정에 사용되기 어렵습니다.

---

### 문제 2 정답

EDA는 데이터를 탐색하는 과정입니다.  
여러 표와 그래프를 만들어보며 데이터 구조, 품질, 패턴, 관계를 확인합니다.

최종 보고서는 EDA 결과 중 중요한 내용을 선별해 정리한 문서입니다.  
독자가 핵심 결과와 인사이트를 빠르게 이해할 수 있도록 구성해야 합니다.

---

### 문제 3 정답

분석 보고서에는 다음 항목을 포함할 수 있습니다.

\`\`\`text
분석 목적
데이터 설명
전처리 및 분석 기준
주요 결과 요약
상세 분석 결과
시각화와 해석
인사이트
분석 한계
다음 분석 방향
\`\`\`

---

### 문제 4 정답

개선 전:

\`\`\`text
전자기기가 좋다.
\`\`\`

개선 후 예시:

\`\`\`text
전자기기 카테고리는 전체 카테고리 중 총매출이 가장 높게 나타났다.
이는 전자기기 상품의 평균 주문 금액이 높아 전체 매출 기여도가 크기 때문일 가능성이 있다.
\`\`\`

기존 문장은 모호하고 데이터 근거가 부족합니다.  
개선 문장에는 분석 기준과 해석이 포함되어 있습니다.

---

### 문제 5 정답

문제점:

\`\`\`text
상관관계를 인과관계로 단정하고 있다.
\`\`\`

더 안전한 표현:

\`\`\`text
방문 횟수와 주문 금액 사이에는 양의 관계가 관찰된다.
다만 방문 횟수가 주문 금액을 증가시킨다고 단정하려면 추가 분석이 필요하다.
\`\`\`

---

### 문제 6 정답

\`\`\`python
category_report = (
    orders
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean")
    )
    .reset_index()
)

category_report
\`\`\`

---

### 문제 7 정답

\`\`\`python
category_report["avg_order_price"] = category_report["avg_order_price"].round(0)

category_report = category_report.sort_values(
    by="total_sales",
    ascending=False
).reset_index(drop=True)

category_report
\`\`\`

---

### 문제 8 정답

예시 답안:

\`\`\`text
VIP 고객은 일반 고객보다 평균 주문 금액과 방문 횟수가 높게 나타난다.
이는 VIP 고객이 매출 기여도와 활동성이 모두 높은 핵심 고객군일 가능성을 시사한다.
따라서 VIP 고객의 재구매 유도와 이탈 방지 전략을 별도로 검토할 필요가 있다.
\`\`\`

---

### 문제 9 정답

예시 답안:

\`\`\`text
분석 기간이 2개월로 짧아 장기적인 매출 추세나 계절성을 판단하기 어렵다.
주문 데이터가 30건으로 적어 카테고리별 매출 결과를 일반화하기 어렵다.
할인, 광고비, 프로모션 여부가 포함되어 있지 않아 전자기기 매출이 높은 원인을 정확히 설명하기 어렵다.
\`\`\`

---

### 문제 10 정답

예시 보고서 초안:

\`\`\`text
분석 목적
이 분석은 주문 데이터를 바탕으로 카테고리별 매출 구조와 고객 등급별 구매 차이를 파악하는 것을 목적으로 한다.

데이터 개요
분석 데이터는 총 6건의 주문으로 구성되어 있으며,
주요 컬럼은 주문 ID, 상품 카테고리, 고객 등급, 주문 금액이다.

카테고리별 매출 결과
전자기기 카테고리의 총매출이 가장 높게 나타났다.
전자기기는 주문 건수와 주문 금액 측면에서 전체 매출에 가장 크게 기여한다.

고객 등급별 평균 주문 금액 결과
VIP 고객의 평균 주문 금액이 일반 고객보다 높게 나타난다.
이는 VIP 고객이 상대적으로 고가 주문을 많이 하는 고객군일 가능성을 보여준다.

주요 인사이트
1. 전자기기 카테고리는 핵심 매출 카테고리이므로 재고 관리와 판매 전략에서 우선적으로 고려할 필요가 있다.
2. VIP 고객은 평균 주문 금액이 높아 매출 기여도가 큰 고객군이므로 재구매 유도와 유지 전략이 중요하다.

분석 한계
1. 데이터가 6건으로 매우 적어 결과를 일반화하기 어렵다.
2. 분석 기간, 고객 수, 할인 여부, 상품 단가 정보가 없어 매출 차이의 원인을 세부적으로 설명하기 어렵다.
\`\`\`

코드로 결과를 계산하면 다음과 같습니다.

\`\`\`python
category_report = (
    orders
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean")
    )
    .reset_index()
    .sort_values(by="total_sales", ascending=False)
)

grade_report = (
    orders
    .groupby("grade")
    .agg(
        avg_order_price=("total_price", "mean"),
        order_count=("order_id", "count")
    )
    .reset_index()
)

category_report, grade_report
\`\`\`

---
`;export{e as default};