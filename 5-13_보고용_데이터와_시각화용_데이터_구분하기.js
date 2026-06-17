var e=`# 5장. 데이터 재구조화 실습

## 5.13 보고용 데이터와 시각화용 데이터 구분하기

데이터 재구조화에서 중요한 실무 감각은 보고용 데이터와 시각화용 데이터를 구분하는 것입니다.

---

### 5.13.1 보고용 데이터

보고용 데이터는 사람이 표로 보기 좋은 형태입니다.

예:

\`\`\`text
지역별 카테고리 매출 피벗 테이블
고객별 월별 구매 금액 테이블
월별 카테고리 매출 비교표
\`\`\`

특징:

\`\`\`text
넓은 형태가 많다.
합계 행과 합계 열이 있을 수 있다.
숫자 포맷이 정리되어 있다.
엑셀로 전달하기 좋다.
\`\`\`

예:

\`\`\`python
region_category_pivot_total
\`\`\`

---

### 5.13.2 시각화용 데이터

시각화용 데이터는 그래프를 그리기 좋은 형태입니다.

seaborn에서는 long format이 편리합니다.

예:

\`\`\`text
year_month | category | total_sales
2026-01    | 도서      | 45000
2026-01    | 전자기기  | 300000
2026-02    | 도서      | 35000
2026-02    | 전자기기  | 220000
\`\`\`

이런 구조는 다음처럼 시각화하기 좋습니다.

\`\`\`python
# 예시
# sns.lineplot(data=monthly_category_long, x="year_month", y="total_sales", hue="category")
\`\`\`

기초 과정에서는 seaborn의 모든 기능을 깊게 다루지 않았지만, 고급 시각화 장에서는 long format의 중요성이 더 커집니다.

---

### 5.13.3 같은 데이터를 두 형태로 모두 저장하기

실무에서는 같은 분석 결과를 두 형태로 모두 저장하기도 합니다.

\`\`\`text
보고용 wide table
시각화용 long table
\`\`\`

예:

\`\`\`python
monthly_category_pivot_with_total.reset_index().to_csv(
    OUTPUT_TABLES / "monthly_category_pivot.csv",
    index=False
)

monthly_category_long.to_csv(
    OUTPUT_TABLES / "monthly_category_long.csv",
    index=False
)
\`\`\`

이렇게 하면 보고서와 그래프에 모두 활용할 수 있습니다.

---
`;export{e as default};