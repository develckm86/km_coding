var e=`# 6장. 고급 groupby 분석 리포트

## 6.4 이름 있는 집계로 카테고리 리포트 만들기

첫 번째 실습은 카테고리별 매출 요약 리포트를 만드는 것입니다.

분석 질문:

\`\`\`text
카테고리별 매출, 주문 수, 평균 주문 금액, 고유 고객 수는 어떻게 다른가?
\`\`\`

---

### 6.4.1 기본 집계

\`\`\`python
category_summary = (
    orders_mart
    .groupby("category")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        total_quantity=("quantity", "sum"),
        avg_order_amount=("net_amount", "mean"),
        median_order_amount=("net_amount", "median"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

category_summary
\`\`\`

여기서 사용한 방식은 이름 있는 집계입니다.

\`\`\`python
새컬럼명=("기존컬럼명", "집계함수")
\`\`\`

이 방식은 결과 컬럼명을 직접 지정할 수 있어서 보고용 표를 만들 때 매우 편리합니다.

---

### 6.4.2 매출 비중 추가

카테고리별 매출 비중을 계산합니다.

\`\`\`python
total_sales = category_summary["total_sales"].sum()

category_summary["sales_ratio_percent"] = (
    category_summary["total_sales"] / total_sales * 100
).round(1)

category_summary
\`\`\`

---

### 6.4.3 평균값 반올림과 정렬

\`\`\`python
category_summary["avg_order_amount"] = category_summary["avg_order_amount"].round(0)
category_summary["median_order_amount"] = category_summary["median_order_amount"].round(0)

category_summary = category_summary.sort_values(
    by="total_sales",
    ascending=False
).reset_index(drop=True)

category_summary
\`\`\`

---

### 6.4.4 저장하기

\`\`\`python
category_summary.to_csv(
    OUTPUT_TABLES / "chapter_06_category_summary.csv",
    index=False
)
\`\`\`

---

### 6.4.5 해석 예시

\`\`\`text
카테고리별 요약 결과, 전자기기 카테고리의 총매출이 가장 높게 나타난다.
전자기기는 평균 주문 금액이 높아 전체 매출 비중에서도 큰 비중을 차지할 가능성이 높다.
도서와 생활용품은 총매출은 낮을 수 있지만 주문 수와 고객 수를 함께 확인해야 한다.
\`\`\`

---
`;export{e as default};