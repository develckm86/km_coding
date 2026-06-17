var e=`<!-- 원본: python_data_analysis_basic_chapter_19_book.md / 세부 장: 19-16 -->

# 19.16 실무 예제 3: 월별 매출 흐름 결과 정리

---

### 19.16.1 분석 질문

\`\`\`text
월별 매출은 어떤 흐름을 보이는가?
\`\`\`

---

### 19.16.2 분석 코드

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

monthly_report["avg_order_price"] = monthly_report["avg_order_price"].round(0)

monthly_report
\`\`\`

---

### 19.16.3 시각화 코드

\`\`\`python
plt.figure(figsize=(8, 4))

plt.plot(monthly_report["year_month"], monthly_report["total_sales"])

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")

plt.show()
\`\`\`

---

### 19.16.4 보고서 문장 예시

\`\`\`text
월별 매출은 2월에 낮아진 뒤 3월과 4월에 회복되는 흐름을 보인다.
4월 매출이 상대적으로 높게 나타나며, 이는 전자기기 카테고리의 고가 주문과 관련이 있을 수 있다.
다만 월별 매출 변화의 원인을 명확히 판단하려면 이벤트, 할인, 광고비, 유입 경로 데이터를 추가로 확인해야 한다.
\`\`\`

---

### 19.16.5 인사이트 예시

\`\`\`text
월별 매출 변화는 단순한 주문 수 변화뿐 아니라 카테고리 구성과 평균 주문 금액의 영향을 받을 수 있다.
따라서 월별 매출 모니터링 시 총매출뿐 아니라 주문 수, 평균 주문 금액, 카테고리별 매출을 함께 확인해야 한다.
\`\`\`

---
`;export{e as default};