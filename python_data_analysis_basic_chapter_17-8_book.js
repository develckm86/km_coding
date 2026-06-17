var e=`<!-- 원본: python_data_analysis_basic_chapter_17_book.md / 세부 장: 17-8 -->

# 17.8 막대 그래프

막대 그래프는 범주별 크기를 비교할 때 사용합니다.

예를 들어 다음 분석에 적합합니다.

\`\`\`text
카테고리별 매출
지역별 고객 수
고객 등급별 평균 주문 금액
상품별 판매량
요일별 주문 건수
\`\`\`

---

### 17.8.1 카테고리별 매출 막대 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(category_sales["category"], category_sales["total_sales"])

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")

plt.show()
\`\`\`

막대의 길이가 값의 크기를 나타냅니다.  
값이 큰 카테고리와 작은 카테고리를 쉽게 비교할 수 있습니다.

---

### 17.8.2 pandas plot으로 막대 그래프 그리기

\`\`\`python
category_sales.plot(
    x="category",
    y="total_sales",
    kind="bar"
)

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")
plt.show()
\`\`\`

pandas plot에서는 집계된 DataFrame에서 바로 막대 그래프를 그릴 수 있습니다.

---

### 17.8.3 seaborn으로 막대 그래프 그리기

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

seaborn은 DataFrame의 컬럼명을 직접 사용하므로 코드가 읽기 쉽습니다.

---

### 17.8.4 막대 그래프 정렬

막대 그래프는 보통 큰 값부터 정렬하면 보기 좋습니다.

\`\`\`python
category_sales_sorted = category_sales.sort_values(
    by="total_sales",
    ascending=False
)

sns.barplot(
    data=category_sales_sorted,
    x="category",
    y="total_sales"
)

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")
plt.show()
\`\`\`

정렬되지 않은 막대 그래프는 비교가 어려울 수 있습니다.  
특히 범주가 많을 때는 정렬이 중요합니다.

---

### 17.8.5 가로 막대 그래프

범주 이름이 길거나 항목이 많을 때는 가로 막대 그래프가 더 보기 좋습니다.

\`\`\`python
plt.figure(figsize=(8, 4))

plt.barh(category_sales_sorted["category"], category_sales_sorted["total_sales"])

plt.title("카테고리별 매출")
plt.xlabel("매출")
plt.ylabel("카테고리")

plt.show()
\`\`\`

가로 막대 그래프는 상품명, 지역명, 긴 카테고리명처럼 x축에 쓰기 어려운 이름을 보여줄 때 유용합니다.

---

### 17.8.6 막대 그래프 사용 시 주의점

막대 그래프는 범주 비교에 적합합니다.  
하지만 범주가 너무 많으면 그래프가 복잡해집니다.

예를 들어 상품 500개의 매출을 모두 막대 그래프로 그리면 읽기 어렵습니다.  
이럴 때는 상위 10개 또는 상위 20개만 선택하는 것이 좋습니다.

\`\`\`python
top_categories = category_sales_sorted.head(10)
\`\`\`

또한 막대 그래프는 보통 0을 기준으로 시작하는 것이 해석에 안전합니다.  
축을 과도하게 잘라내면 작은 차이가 크게 보일 수 있습니다.

---
`;export{e as default};