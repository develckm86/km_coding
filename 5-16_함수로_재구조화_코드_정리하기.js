var e=`# 5장. 데이터 재구조화 실습

## 5.16 함수로 재구조화 코드 정리하기

반복되는 재구조화 작업은 함수로 만들 수 있습니다.

---

### 5.16.1 지역별 카테고리 피벗 함수

\`\`\`python
def make_region_category_pivot(df: pd.DataFrame) -> pd.DataFrame:
    pivot = pd.pivot_table(
        data=df,
        index="region",
        columns="category",
        values="net_amount",
        aggfunc="sum",
        fill_value=0,
        margins=True,
        margins_name="합계"
    )

    return pivot.reset_index()
\`\`\`

사용 예:

\`\`\`python
make_region_category_pivot(orders_mart)
\`\`\`

---

### 5.16.2 월별 카테고리 long 데이터 함수

\`\`\`python
def make_monthly_category_long(df: pd.DataFrame) -> pd.DataFrame:
    return (
        df
        .groupby(["year_month", "category"])
        .agg(
            total_sales=("net_amount", "sum"),
            order_count=("order_id", "count")
        )
        .reset_index()
        .sort_values(["year_month", "category"])
    )
\`\`\`

---

### 5.16.3 월별 카테고리 pivot 함수

\`\`\`python
def make_monthly_category_pivot(df: pd.DataFrame) -> pd.DataFrame:
    pivot = pd.pivot_table(
        data=df,
        index="year_month",
        columns="category",
        values="net_amount",
        aggfunc="sum",
        fill_value=0
    )

    pivot["합계"] = pivot.sum(axis=1)

    return pivot.reset_index()
\`\`\`

---

### 5.16.4 함수 사용 결과 확인

\`\`\`python
region_pivot_func = make_region_category_pivot(orders_mart)
monthly_long_func = make_monthly_category_long(orders_mart)
monthly_pivot_func = make_monthly_category_pivot(orders_mart)

region_pivot_func
monthly_long_func
monthly_pivot_func
\`\`\`

함수로 만들면 다음 장점이 있습니다.

\`\`\`text
재사용 가능하다.
코드가 짧아진다.
분석 흐름이 명확해진다.
자동 리포트 생성에 활용할 수 있다.
\`\`\`

---
`;export{e as default};