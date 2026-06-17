var e=`<!-- 원본: python_data_analysis_basic_chapter_14_book.md / 세부 장: 14-5 -->

# 14.5 여러 집계를 한 번에 수행하기: \`agg()\`

\`agg()\`는 여러 집계 함수를 한 번에 적용할 때 사용합니다.

---

### 14.5.1 하나의 컬럼에 여러 집계 함수 적용

카테고리별 주문 금액에 대해 합계, 평균, 최대값을 한 번에 구해보겠습니다.

\`\`\`python
category_summary = (
    orders
    .groupby("category")["total_price"]
    .agg(["sum", "mean", "max"])
)

category_summary
\`\`\`

결과는 다음과 같은 형태입니다.

\`\`\`text
           sum       mean     max
category
도서       ...
생활용품     ...
전자기기     ...
\`\`\`

DataFrame 형태로 정리하려면 \`reset_index()\`를 사용합니다.

\`\`\`python
category_summary = (
    orders
    .groupby("category")["total_price"]
    .agg(["sum", "mean", "max"])
    .reset_index()
)

category_summary
\`\`\`

컬럼명을 더 명확히 바꿀 수도 있습니다.

\`\`\`python
category_summary = category_summary.rename(columns={
    "sum": "total_sales",
    "mean": "avg_order_price",
    "max": "max_order_price"
})

category_summary
\`\`\`

---

### 14.5.2 여러 컬럼에 여러 집계 적용

카테고리별로 주문 금액 합계와 평균, 주문 수량 합계를 함께 계산해보겠습니다.

\`\`\`python
category_summary = (
    orders
    .groupby("category")
    .agg({
        "total_price": ["sum", "mean", "max"],
        "quantity": ["sum", "mean"],
        "order_id": "count"
    })
)

category_summary
\`\`\`

이 방식은 여러 컬럼에 여러 집계를 적용할 수 있어 강력합니다.  
하지만 결과 컬럼이 다층 구조가 되어 초보자에게는 조금 복잡해 보일 수 있습니다.

---

### 14.5.3 이름 있는 집계

보고서용 요약표를 만들 때는 이름 있는 집계 방식이 가장 읽기 좋습니다.

\`\`\`python
category_summary = (
    orders
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        avg_order_price=("total_price", "mean"),
        max_order_price=("total_price", "max"),
        total_quantity=("quantity", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

category_summary
\`\`\`

이 방식의 장점은 다음과 같습니다.

- 결과 컬럼명을 직접 지정할 수 있다.
- 여러 컬럼에 서로 다른 집계 함수를 적용할 수 있다.
- 결과가 보고서 형태로 깔끔하다.
- 컬럼명 정리 과정이 줄어든다.

실무에서는 이 이름 있는 집계 방식을 자주 사용합니다.

---

### 14.5.4 집계 결과 반올림

평균값은 소수점이 길게 나올 수 있습니다.  
보고서에서는 적절히 반올림하는 것이 좋습니다.

\`\`\`python
category_summary["avg_order_price"] = category_summary["avg_order_price"].round(0)

category_summary
\`\`\`

여러 컬럼을 한 번에 반올림할 수도 있습니다.

\`\`\`python
category_summary = category_summary.round({
    "avg_order_price": 0
})
\`\`\`

반올림은 분석 목적에 맞게 사용해야 합니다.  
중간 계산 과정에서는 원본 값을 유지하고, 최종 출력이나 보고 단계에서 반올림하는 것이 좋습니다.

---
`;export{e as default};