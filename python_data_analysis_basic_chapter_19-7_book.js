var e=`<!-- 원본: python_data_analysis_basic_chapter_19_book.md / 세부 장: 19-7 -->

# 19.7 표 정리하기

분석 결과에서 표는 정확한 숫자를 전달하는 데 좋습니다.

하지만 표도 정리하지 않으면 읽기 어렵습니다.

---

### 19.7.1 좋은 표의 조건

좋은 표는 다음 조건을 만족합니다.

\`\`\`text
컬럼명이 명확하다.
중요한 기준으로 정렬되어 있다.
필요한 컬럼만 포함한다.
소수점 자릿수가 적절하다.
단위가 명확하다.
너무 많은 행을 보여주지 않는다.
\`\`\`

나쁜 표는 다음과 같습니다.

\`\`\`text
컬럼명이 total_price, mean, count처럼 의미가 불분명하다.
정렬이 되어 있지 않다.
필요 없는 중간 계산 컬럼이 많다.
소수점이 지나치게 길다.
행이 너무 많다.
\`\`\`

---

### 19.7.2 카테고리별 매출 표 만들기

카테고리별 매출 요약표를 만들어보겠습니다.

\`\`\`python
category_report = (
    orders
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

total_sales = category_report["total_sales"].sum()

category_report["sales_ratio_percent"] = (
    category_report["total_sales"] / total_sales * 100
)

category_report = category_report.sort_values(
    by="total_sales",
    ascending=False
).reset_index(drop=True)

category_report
\`\`\`

평균 주문 금액과 비율을 반올림합니다.

\`\`\`python
category_report["avg_order_price"] = category_report["avg_order_price"].round(0)
category_report["sales_ratio_percent"] = category_report["sales_ratio_percent"].round(1)

category_report
\`\`\`

---

### 19.7.3 표 컬럼명 한글화하기

보고서에서는 컬럼명을 읽기 쉽게 바꿀 수 있습니다.

\`\`\`python
category_report_display = category_report.rename(columns={
    "category": "카테고리",
    "total_sales": "총매출",
    "order_count": "주문 수",
    "avg_order_price": "평균 주문 금액",
    "unique_customers": "고유 고객 수",
    "sales_ratio_percent": "매출 비중(%)"
})

category_report_display
\`\`\`

한글 컬럼명은 보고서에는 좋지만, 코드에서는 영문 컬럼명이 더 편할 때가 많습니다.  
따라서 분석용 데이터와 보고용 데이터를 구분하는 것도 좋은 방법입니다.

---

### 19.7.4 표 해석 문장 작성하기

표만 보여주지 말고 해석 문장을 붙입니다.

예시:

\`\`\`text
카테고리별 매출 요약 결과, 전자기기 카테고리의 총매출이 가장 높게 나타났다.
전자기기는 주문 수뿐 아니라 평균 주문 금액도 높아 전체 매출 기여도가 크다.
도서와 생활용품은 전자기기보다 매출 규모는 작지만, 주문 수와 고객 수 측면에서 별도 관리가 필요하다.
\`\`\`

해석 문장은 표에서 가장 중요한 내용을 짚어주어야 합니다.

---

### 19.7.5 표에 너무 많은 내용을 넣지 않기

표에 모든 컬럼을 넣으면 읽기 어렵습니다.

보고용 표에는 핵심 컬럼만 남기는 것이 좋습니다.

예를 들어 카테고리 분석 표에서는 다음 정도면 충분할 수 있습니다.

\`\`\`text
카테고리
총매출
매출 비중
주문 수
평균 주문 금액
\`\`\`

너무 많은 지표를 넣어야 한다면 표를 여러 개로 나눌 수 있습니다.

---
`;export{e as default};