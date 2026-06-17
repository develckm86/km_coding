var e=`<!-- 원본: python_data_analysis_basic_chapter_17_book.md / 세부 장: 17-17 -->

# 17.17 실무 예제 3: 주문 금액 분포 확인

주문 금액의 분포를 히스토그램과 박스플롯으로 확인해보겠습니다.

---

### 17.17.1 히스토그램

\`\`\`python
plt.figure(figsize=(8, 4))

plt.hist(orders["total_price"], bins=5)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")

plt.show()
\`\`\`

---

### 17.17.2 박스플롯

\`\`\`python
sns.boxplot(
    data=orders,
    y="total_price"
)

plt.title("주문 금액 박스플롯")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

---

### 17.17.3 해석 예시

\`\`\`text
히스토그램을 보면 주문 금액이 낮은 구간에 많이 몰려 있고 일부 고가 주문이 존재할 수 있다.
박스플롯을 보면 중앙값과 사분위수, 이상값 후보를 확인할 수 있다.
평균 주문 금액을 해석할 때는 고가 주문이 평균을 끌어올리는지 함께 확인해야 한다.
\`\`\`

---
`;export{e as default};