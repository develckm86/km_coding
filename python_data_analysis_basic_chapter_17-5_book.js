var e=`<!-- 원본: python_data_analysis_basic_chapter_17_book.md / 세부 장: 17-5 -->

# 17.5 pandas plot 기초

pandas는 DataFrame이나 Series에서 바로 그래프를 그릴 수 있는 \`plot()\` 기능을 제공합니다.

pandas plot은 내부적으로 matplotlib을 사용합니다.  
따라서 pandas plot으로 그래프를 그리고, matplotlib 함수로 제목과 축 이름을 추가할 수 있습니다.

---

### 17.5.1 DataFrame에서 바로 선 그래프 그리기

\`\`\`python
monthly_sales.plot(
    x="year_month",
    y="total_sales",
    kind="line"
)

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")
plt.show()
\`\`\`

이 코드는 \`monthly_sales\` DataFrame에서 \`year_month\`를 x축, \`total_sales\`를 y축으로 하는 선 그래프를 그립니다.

---

### 17.5.2 막대 그래프 그리기

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

pandas plot에서 \`kind="bar"\`를 지정하면 막대 그래프가 됩니다.

---

### 17.5.3 히스토그램 그리기

\`\`\`python
orders["total_price"].plot(kind="hist", bins=5)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")
plt.show()
\`\`\`

Series에서도 \`plot()\`을 사용할 수 있습니다.  
수치형 Series에 \`kind="hist"\`를 사용하면 히스토그램을 그립니다.

---

### 17.5.4 박스플롯 그리기

\`\`\`python
orders["total_price"].plot(kind="box")

plt.title("주문 금액 박스플롯")
plt.ylabel("주문 금액")
plt.show()
\`\`\`

박스플롯은 중앙값, 사분위수, 이상값 후보를 확인할 때 사용합니다.

---

### 17.5.5 pandas plot의 장점과 한계

pandas plot의 장점은 간단하다는 것입니다.

\`\`\`python
df.plot()
\`\`\`

DataFrame에서 바로 그래프를 그릴 수 있기 때문에 탐색 단계에서 빠르게 사용하기 좋습니다.

하지만 복잡한 그래프를 세밀하게 조정하려면 matplotlib이나 seaborn을 직접 사용하는 것이 더 적합할 수 있습니다.

정리하면 다음과 같습니다.

| 상황 | 추천 도구 |
|---|---|
| 빠르게 데이터 확인 | pandas plot |
| 기본 그래프를 직접 제어 | matplotlib |
| 통계적 시각화를 편하게 작성 | seaborn |
| 고급 커스터마이징 | matplotlib |

---
`;export{e as default};