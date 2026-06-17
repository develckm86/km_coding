var e=`<!-- 원본: python_data_analysis_basic_chapter_17_book.md / 세부 장: 17-11 -->

# 17.11 산점도

산점도는 두 수치형 변수의 관계를 확인할 때 사용합니다.

예를 들어 다음 질문에 적합합니다.

\`\`\`text
방문 횟수가 많을수록 주문 금액도 큰가?
주문 수량이 많을수록 주문 금액도 큰가?
만족도가 높을수록 구매 금액이 큰가?
나이와 구매 금액 사이에 관계가 있는가?
\`\`\`

---

### 17.11.1 matplotlib 산점도

\`\`\`python
plt.figure(figsize=(8, 4))

plt.scatter(orders["visit_count"], orders["total_price"])

plt.title("방문 횟수와 주문 금액의 관계")
plt.xlabel("방문 횟수")
plt.ylabel("주문 금액")

plt.show()
\`\`\`

각 점은 하나의 주문 또는 고객을 나타냅니다.  
x축은 방문 횟수, y축은 주문 금액입니다.

---

### 17.11.2 pandas plot 산점도

\`\`\`python
orders.plot(
    kind="scatter",
    x="visit_count",
    y="total_price"
)

plt.title("방문 횟수와 주문 금액의 관계")
plt.xlabel("방문 횟수")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

pandas plot으로도 산점도를 쉽게 그릴 수 있습니다.

---

### 17.11.3 seaborn 산점도

\`\`\`python
sns.scatterplot(
    data=orders,
    x="visit_count",
    y="total_price"
)

plt.title("방문 횟수와 주문 금액의 관계")
plt.xlabel("방문 횟수")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

seaborn은 \`hue\`를 사용해 범주별로 구분할 수도 있습니다.

\`\`\`python
sns.scatterplot(
    data=orders,
    x="visit_count",
    y="total_price",
    hue="grade"
)

plt.title("방문 횟수와 주문 금액의 관계")
plt.xlabel("방문 횟수")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

\`hue\`는 범주에 따라 점을 구분해서 보여줍니다.  
고객 등급별로 방문 횟수와 주문 금액의 관계가 다른지 확인할 수 있습니다.

---

### 17.11.4 산점도 해석

산점도를 볼 때는 다음을 확인합니다.

\`\`\`text
점들이 오른쪽 위로 올라가는가?
점들이 오른쪽 아래로 내려가는가?
점들이 흩어져 있는가?
멀리 떨어진 점이 있는가?
그룹별로 패턴이 다른가?
\`\`\`

오른쪽 위로 올라가는 형태라면 양의 관계가 있을 수 있습니다.  
오른쪽 아래로 내려가는 형태라면 음의 관계가 있을 수 있습니다.  
점들이 무작위로 흩어져 있으면 뚜렷한 관계가 약할 수 있습니다.

---

### 17.11.5 상관계수와 함께 보기

산점도는 상관계수와 함께 보면 좋습니다.

\`\`\`python
orders["visit_count"].corr(orders["total_price"])
\`\`\`

상관계수는 두 변수의 선형 관계를 숫자로 요약합니다.  
하지만 상관계수만 보면 데이터의 실제 모양을 놓칠 수 있습니다.

따라서 두 변수 관계를 분석할 때는 다음을 함께 확인합니다.

\`\`\`text
상관계수
산점도
이상값
그룹별 차이
\`\`\`

---
`;export{e as default};