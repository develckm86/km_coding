var e=`<!-- 원본: python_data_analysis_basic_chapter_17_book.md / 세부 장: 17-6 -->

# 17.6 seaborn 기초

seaborn은 통계적 시각화에 편리한 라이브러리입니다.  
pandas DataFrame과 함께 사용하기 좋습니다.

일반적으로 다음처럼 불러옵니다.

\`\`\`python
import seaborn as sns
\`\`\`

seaborn은 보통 \`data\`, \`x\`, \`y\` 인자를 사용합니다.

\`\`\`python
sns.barplot(data=category_sales, x="category", y="total_sales")
\`\`\`

이 구조는 읽기 쉽습니다.

\`\`\`text
category_sales 데이터에서
x축은 category
y축은 total_sales
\`\`\`

---

### 17.6.1 seaborn 막대 그래프

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

seaborn의 \`barplot()\`은 범주별 값을 비교할 때 사용합니다.

주의할 점은 원본 데이터에서 \`barplot()\`을 사용하면 기본적으로 평균을 그릴 수 있다는 것입니다.  
이미 집계된 데이터인 \`category_sales\`를 사용하면 각 카테고리의 \`total_sales\` 값을 막대로 표현합니다.

---

### 17.6.2 seaborn 히스토그램

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

\`histplot()\`은 분포를 확인할 때 사용합니다.

---

### 17.6.3 seaborn 박스플롯

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

박스플롯은 그룹별 분포를 비교할 때 유용합니다.  
예를 들어 VIP 고객과 일반 고객의 주문 금액 분포를 비교할 수 있습니다.

---

### 17.6.4 seaborn 산점도

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

산점도는 두 수치형 변수의 관계를 확인할 때 사용합니다.

---

### 17.6.5 seaborn 히트맵

상관관계 행렬을 히트맵으로 표현할 수 있습니다.

\`\`\`python
corr_matrix = orders[["quantity", "total_price", "visit_count", "satisfaction"]].corr()

sns.heatmap(
    corr_matrix,
    annot=True
)

plt.title("수치형 변수 상관관계")
plt.show()
\`\`\`

\`annot=True\`는 각 칸에 상관계수 값을 표시합니다.

히트맵은 상관관계나 교차표처럼 행과 열이 있는 데이터를 시각화할 때 유용합니다.

---
`;export{e as default};