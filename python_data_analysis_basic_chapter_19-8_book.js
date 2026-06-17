var e=`<!-- 원본: python_data_analysis_basic_chapter_19_book.md / 세부 장: 19-8 -->

# 19.8 그래프 정리하기

그래프는 패턴을 빠르게 보여주는 데 좋습니다.  
하지만 그래프도 적절히 정리해야 합니다.

---

### 19.8.1 좋은 그래프의 조건

좋은 그래프는 다음 조건을 만족합니다.

\`\`\`text
분석 질문에 맞는 그래프를 사용한다.
제목이 명확하다.
축 이름과 단위가 있다.
범주형 값은 정렬되어 있다.
불필요한 요소가 적다.
그래프 아래에 해석 문장이 있다.
\`\`\`

그래프는 예쁘게 만드는 것보다 명확하게 전달하는 것이 중요합니다.

---

### 19.8.2 카테고리별 매출 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(
    category_report["category"],
    category_report["total_sales"]
)

plt.title("카테고리별 총매출")
plt.xlabel("카테고리")
plt.ylabel("매출")

plt.show()
\`\`\`

이 그래프의 해석 문장은 다음처럼 작성할 수 있습니다.

\`\`\`text
전자기기 카테고리의 매출이 가장 높게 나타난다.
이는 전자기기 상품의 평균 주문 금액이 높기 때문일 가능성이 있다.
\`\`\`

---

### 19.8.3 월별 매출 그래프

월별 매출 데이터를 만듭니다.

\`\`\`python
monthly_report = (
    orders
    .groupby("year_month")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count"),
        avg_order_price=("total_price", "mean")
    )
    .reset_index()
)

monthly_report
\`\`\`

월별 매출 추이를 그립니다.

\`\`\`python
plt.figure(figsize=(8, 4))

plt.plot(
    monthly_report["year_month"],
    monthly_report["total_sales"]
)

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")

plt.show()
\`\`\`

해석 문장 예시:

\`\`\`text
월별 매출은 2월에 낮아진 뒤 3월과 4월에 회복되는 흐름을 보인다.
4월 매출 증가는 전자기기 주문 증가와 관련이 있을 수 있어 카테고리별 월별 매출을 추가 확인할 필요가 있다.
\`\`\`

---

### 19.8.4 고객 등급별 주문 금액 그래프

고객 등급별 주문 금액 분포는 박스플롯으로 볼 수 있습니다.

\`\`\`python
sns.boxplot(
    data=orders,
    x="grade",
    y="total_price"
)

plt.title("고객 등급별 주문 금액 분포")
plt.xlabel("고객 등급")
plt.ylabel("주문 금액")

plt.show()
\`\`\`

해석 문장 예시:

\`\`\`text
VIP 고객의 주문 금액 분포가 일반 고객보다 높은 위치에 있다.
이는 VIP 고객이 상대적으로 고가 주문을 많이 하는 경향이 있음을 시사한다.
다만 등급별 데이터 수가 충분한지 함께 확인해야 한다.
\`\`\`

---

### 19.8.5 그래프와 표를 함께 사용하기

그래프는 패턴을 보여주고, 표는 정확한 숫자를 보여줍니다.

예를 들어 카테고리별 매출을 정리할 때는 다음 구성이 좋습니다.

\`\`\`text
1. 카테고리별 매출 막대 그래프
2. 카테고리별 매출 요약표
3. 해석 문장
\`\`\`

그래프만 있으면 정확한 수치를 확인하기 어렵고, 표만 있으면 패턴을 빠르게 보기 어렵습니다.  
따라서 중요한 결과는 표와 그래프를 함께 제시하는 것이 좋습니다.

---
`;export{e as default};