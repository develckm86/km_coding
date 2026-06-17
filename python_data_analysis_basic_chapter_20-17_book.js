var e=`<!-- 원본: python_data_analysis_basic_chapter_20_book.md / 세부 장: 20-17 -->

# 20.17 12단계: 주문 금액 분포와 이상값 확인

주문 금액의 분포를 확인합니다.

---

### 20.17.1 히스토그램

\`\`\`python
plt.figure(figsize=(8, 4))

plt.hist(orders_analysis["net_amount"], bins=6)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")

plt.show()
\`\`\`

---

### 20.17.2 박스플롯

\`\`\`python
sns.boxplot(
    data=orders_analysis,
    y="net_amount"
)

plt.title("주문 금액 박스플롯")
plt.ylabel("주문 금액")

plt.show()
\`\`\`

---

### 20.17.3 IQR 기준 이상값 후보 확인

\`\`\`python
q1 = orders_analysis["net_amount"].quantile(0.25)
q3 = orders_analysis["net_amount"].quantile(0.75)
iqr = q3 - q1

lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

outlier_orders = orders_analysis[
    (orders_analysis["net_amount"] < lower_bound) |
    (orders_analysis["net_amount"] > upper_bound)
]

outlier_orders
\`\`\`

---

### 20.17.4 해석 예시

\`\`\`text
주문 금액에는 일부 고가 주문이 존재할 수 있다.
이 값들은 이상값 후보로 볼 수 있지만, 실제 고가 상품 주문이라면 제거하지 않는 것이 적절할 수 있다.
이상값은 무조건 삭제하기보다 원본과 업무 맥락을 확인한 뒤 처리 여부를 결정해야 한다.
\`\`\`

---
`;export{e as default};