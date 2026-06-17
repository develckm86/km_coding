var e=`<!-- 원본: python_data_analysis_basic_chapter_16_book.md / 세부 장: 16-19 -->

# 16.19 정답 및 해설

### 문제 1 정답

정답: B

기술통계는 가지고 있는 데이터를 요약하고 설명하는 통계입니다.  
평균, 중앙값, 표준편차, 빈도, 비율 등이 대표적인 기술통계입니다.

---

### 문제 2 정답

\`\`\`python
df["sales"].mean()
\`\`\`

평균은 모든 값을 더한 뒤 개수로 나눈 값입니다.

---

### 문제 3 정답

\`\`\`python
df["sales"].median()
\`\`\`

중앙값은 데이터를 크기순으로 정렬했을 때 가운데에 있는 값입니다.  
이상값이 있을 때 평균보다 일반적인 수준을 더 잘 보여줄 수 있습니다.

---

### 문제 4 정답

정답: 평균

평균은 모든 값을 계산에 사용하므로 매우 큰 값이나 작은 값의 영향을 크게 받습니다.  
중앙값은 가운데 위치의 값이므로 이상값의 영향을 상대적으로 덜 받습니다.

---

### 문제 5 정답

\`\`\`python
df["score"].min()
df["score"].max()
df["score"].std()
\`\`\`

또는 한 번에 확인할 수도 있습니다.

\`\`\`python
df["score"].agg(["min", "max", "std"])
\`\`\`

---

### 문제 6 정답

\`\`\`python
df["amount"].quantile([0.25, 0.5, 0.75])
\`\`\`

\`0.25\`는 1사분위수, \`0.5\`는 중앙값, \`0.75\`는 3사분위수입니다.

---

### 문제 7 정답

빈도:

\`\`\`python
df["region"].value_counts()
\`\`\`

비율:

\`\`\`python
df["region"].value_counts(normalize=True)
\`\`\`

백분율로 보고 싶다면 다음처럼 작성할 수 있습니다.

\`\`\`python
(df["region"].value_counts(normalize=True) * 100).round(1)
\`\`\`

---

### 문제 8 정답

\`\`\`python
df["visit_count"].corr(df["total_price"])
\`\`\`

또는 두 컬럼의 상관행렬을 볼 수도 있습니다.

\`\`\`python
df[["visit_count", "total_price"]].corr()
\`\`\`

---

### 문제 9 정답

상관관계는 두 변수가 함께 움직이는 경향을 의미합니다.  
예를 들어 방문 횟수가 많을수록 구매 금액이 큰 경향이 있다면 양의 상관관계가 있다고 할 수 있습니다.

하지만 인과관계는 한 변수가 다른 변수의 원인이라는 뜻입니다.  
상관관계가 있다고 해서 반드시 인과관계가 있는 것은 아닙니다.

예를 들어 방문 횟수와 구매 금액의 상관관계가 높아도, 방문 횟수가 구매 금액을 증가시켰다고 단정할 수는 없습니다.  
고객 등급이나 구매 의향 같은 다른 요인이 영향을 주었을 수 있습니다.

---

### 문제 10 정답

\`\`\`python
price_summary = orders["total_price"].agg([
    "mean",
    "median",
    "min",
    "max",
    "std"
])

price_summary
\`\`\`

고객 등급별 주문 수와 평균 주문 금액:

\`\`\`python
grade_summary = (
    orders
    .groupby("grade")
    .agg(
        order_count=("total_price", "count"),
        avg_order_price=("total_price", "mean")
    )
    .reset_index()
)

grade_summary
\`\`\`

지역별 빈도와 비율:

\`\`\`python
region_count = orders["region"].value_counts()
region_ratio = orders["region"].value_counts(normalize=True) * 100

region_summary = pd.DataFrame({
    "count": region_count,
    "ratio_percent": region_ratio.round(1)
})

region_summary
\`\`\`

방문 횟수와 주문 금액의 상관계수:

\`\`\`python
visit_price_corr = orders["visit_count"].corr(orders["total_price"])

visit_price_corr
\`\`\`

이 분석 결과를 해석할 때는 평균과 중앙값의 차이, 등급별 데이터 수, 지역별 표본 수, 상관관계와 인과관계의 차이를 함께 고려해야 합니다.

---
`;export{e as default};