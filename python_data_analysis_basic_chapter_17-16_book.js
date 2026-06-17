var e=`<!-- 원본: python_data_analysis_basic_chapter_17_book.md / 세부 장: 17-16 -->

# 17.16 실무 예제 2: 카테고리별 매출 비교

카테고리별 매출은 막대 그래프로 표현하는 것이 적합합니다.

---

### 17.16.1 카테고리별 매출 데이터 만들기

\`\`\`python
category_sales = (
    orders
    .groupby("category")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
    .sort_values(by="total_sales", ascending=False)
)

category_sales
\`\`\`

---

### 17.16.2 막대 그래프 그리기

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(category_sales["category"], category_sales["total_sales"])

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")

plt.show()
\`\`\`

---

### 17.16.3 seaborn으로 그리기

\`\`\`python
sns.barplot(
    data=category_sales,
    x="category",
    y="total_sales"
)

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")
plt.show()
\`\`\`

---

### 17.16.4 해석 예시

\`\`\`text
전자기기 카테고리의 매출이 가장 높게 나타난다.
전자기기는 주문 건수가 많지 않더라도 단가가 높아 전체 매출 기여도가 클 수 있다.
주문 건수와 평균 주문 금액을 함께 확인하면 매출 차이의 원인을 더 잘 이해할 수 있다.
\`\`\`

---
`;export{e as default};