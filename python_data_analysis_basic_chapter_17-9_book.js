var e=`<!-- 원본: python_data_analysis_basic_chapter_17_book.md / 세부 장: 17-9 -->

# 17.9 히스토그램

히스토그램은 수치형 데이터의 분포를 보여줍니다.

예를 들어 주문 금액이 어느 구간에 많이 몰려 있는지 알고 싶을 때 사용합니다.

\`\`\`text
주문 금액이 낮은 구간에 몰려 있는가?
고가 주문이 일부 존재하는가?
데이터가 한쪽으로 치우쳐 있는가?
\`\`\`

---

### 17.9.1 matplotlib 히스토그램

\`\`\`python
plt.figure(figsize=(8, 4))

plt.hist(orders["total_price"], bins=5)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")

plt.show()
\`\`\`

\`bins\`는 구간 개수를 의미합니다.  
구간 개수에 따라 그래프 모양이 달라질 수 있습니다.

---

### 17.9.2 pandas plot 히스토그램

\`\`\`python
orders["total_price"].plot(kind="hist", bins=5)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")
plt.show()
\`\`\`

pandas Series에서 바로 히스토그램을 그릴 수 있습니다.

---

### 17.9.3 seaborn 히스토그램

\`\`\`python
sns.histplot(
    data=orders,
    x="total_price",
    bins=5
)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")
plt.show()
\`\`\`

seaborn의 \`histplot()\`은 분포 확인에 자주 사용됩니다.

---

### 17.9.4 히스토그램 해석

히스토그램을 볼 때는 다음을 확인합니다.

\`\`\`text
어느 구간에 값이 많이 몰려 있는가?
분포가 오른쪽으로 치우쳐 있는가?
분포가 왼쪽으로 치우쳐 있는가?
값이 넓게 퍼져 있는가?
빈 구간이 있는가?
이상하게 떨어진 값이 있는가?
\`\`\`

주문 금액 데이터는 보통 오른쪽으로 치우친 분포를 보일 수 있습니다.  
대부분의 주문은 낮거나 중간 금액이고, 일부 고가 주문이 존재하기 때문입니다.

---

### 17.9.5 bins 설정 주의점

\`bins\` 값이 너무 작으면 분포가 지나치게 단순하게 보입니다.

\`\`\`python
plt.hist(orders["total_price"], bins=3)
plt.show()
\`\`\`

\`bins\` 값이 너무 크면 데이터가 너무 잘게 나뉘어 해석이 어려울 수 있습니다.

\`\`\`python
plt.hist(orders["total_price"], bins=20)
plt.show()
\`\`\`

적절한 구간 수는 데이터 크기와 분석 목적에 따라 다릅니다.  
기초 분석에서는 여러 \`bins\` 값을 시도해보고 분포를 확인하는 것이 좋습니다.

---
`;export{e as default};