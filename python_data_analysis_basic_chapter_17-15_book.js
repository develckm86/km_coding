var e=`<!-- 원본: python_data_analysis_basic_chapter_17_book.md / 세부 장: 17-15 -->

# 17.15 실무 예제 1: 월별 매출 추이 시각화

월별 매출 추이를 선 그래프로 표현해보겠습니다.

---

### 17.15.1 월별 매출 데이터 만들기

\`\`\`python
monthly_sales = (
    orders
    .groupby("year_month")
    .agg(
        total_sales=("total_price", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
)

monthly_sales
\`\`\`

---

### 17.15.2 선 그래프 그리기

\`\`\`python
plt.figure(figsize=(8, 4))

plt.plot(monthly_sales["year_month"], monthly_sales["total_sales"])

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")

plt.show()
\`\`\`

---

### 17.15.3 해석 예시

\`\`\`text
월별 매출 추이를 보면 2월에 매출이 낮아진 뒤 3월과 4월에 다시 회복되는 흐름을 확인할 수 있다.
다만 매출 변화의 원인을 파악하려면 주문 건수, 평균 주문 금액, 카테고리별 매출을 추가로 확인해야 한다.
\`\`\`

---
`;export{e as default};