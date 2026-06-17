var e=`<!-- 원본: python_data_analysis_basic_chapter_17_book.md / 세부 장: 17-12 -->

# 17.12 히트맵

히트맵은 행과 열로 이루어진 값을 색의 진하기로 표현하는 그래프입니다.

데이터 분석 기초에서는 주로 상관관계 행렬을 시각화할 때 사용합니다.

---

### 17.12.1 상관관계 행렬 만들기

먼저 수치형 컬럼의 상관관계를 계산합니다.

\`\`\`python
corr_matrix = orders[[
    "quantity",
    "total_price",
    "visit_count",
    "satisfaction"
]].corr()

corr_matrix
\`\`\`

---

### 17.12.2 seaborn 히트맵

\`\`\`python
sns.heatmap(
    corr_matrix,
    annot=True
)

plt.title("수치형 변수 상관관계")
plt.show()
\`\`\`

\`annot=True\`를 사용하면 각 칸에 상관계수 숫자가 표시됩니다.

히트맵은 상관관계 행렬처럼 여러 변수 간 관계를 한눈에 볼 때 유용합니다.

---

### 17.12.3 히트맵 해석

히트맵을 볼 때는 다음을 확인합니다.

\`\`\`text
어떤 변수 쌍의 상관관계가 높은가?
양의 관계인가, 음의 관계인가?
상관계수가 0에 가까운 변수 쌍은 무엇인가?
\`\`\`

다만 히트맵도 상관관계만 보여줄 뿐 인과관계를 증명하지는 않습니다.

예를 들어 방문 횟수와 주문 금액의 상관관계가 높아도 방문 횟수가 주문 금액을 증가시켰다고 단정할 수 없습니다.

---

### 17.12.4 히트맵 사용 시 주의점

히트맵은 변수가 너무 많으면 해석이 어려워집니다.  
처음에는 분석 목적에 맞는 수치형 컬럼만 선택하는 것이 좋습니다.

\`\`\`python
selected_columns = ["quantity", "total_price", "visit_count", "satisfaction"]
\`\`\`

또한 상관계수는 수치형 변수의 선형 관계를 나타내므로 범주형 변수를 그대로 넣으면 적절하지 않을 수 있습니다.

---
`;export{e as default};