var e=`<!-- 원본: python_data_analysis_basic_chapter_8_book.md / 세부 장: 8-8 -->

# 8.8 정렬할 때 자주 하는 실수

정렬은 간단해 보이지만 초보자가 자주 하는 실수가 있습니다.

---

### 8.8.1 정렬 결과를 저장하지 않는 실수

\`\`\`python
orders.sort_values(by="total_price", ascending=False)
\`\`\`

이 코드는 정렬된 결과를 보여주지만 원본 \`orders\`를 바꾸지는 않습니다.

정렬 결과를 계속 사용하려면 반드시 변수에 저장해야 합니다.

\`\`\`python
orders_sorted = orders.sort_values(by="total_price", ascending=False)
\`\`\`

---

### 8.8.2 \`ascending=False\`를 문자열로 쓰는 실수

다음 코드는 잘못된 예입니다.

\`\`\`python
orders.sort_values(by="total_price", ascending="False")
\`\`\`

\`"False"\`는 문자열입니다.  
\`ascending\`에는 불리언 값인 \`False\`를 넣어야 합니다.

올바른 코드는 다음과 같습니다.

\`\`\`python
orders.sort_values(by="total_price", ascending=False)
\`\`\`

---

### 8.8.3 여러 조건 정렬에서 \`ascending\` 개수를 맞추지 않는 실수

다음 코드는 두 개 컬럼을 기준으로 정렬합니다.

\`\`\`python
orders.sort_values(
    by=["category", "total_price"],
    ascending=[True, False]
)
\`\`\`

\`by\`에 두 개 컬럼을 넣었다면, \`ascending\`에도 각 컬럼에 대응하는 값을 넣어야 합니다.

\`\`\`text
category → True
total_price → False
\`\`\`

---

### 8.8.4 날짜를 문자열로 둔 채 정렬하는 실수

날짜 문자열이 \`"2026-1-2"\`처럼 자리수가 일정하지 않으면 문자열 정렬 결과가 날짜 순서와 다를 수 있습니다.

안전하게 정렬하려면 날짜형으로 변환합니다.

\`\`\`python
orders["order_date"] = pd.to_datetime(orders["order_date"])
orders.sort_values(by="order_date")
\`\`\`

날짜 데이터 처리는 이후 장에서 더 자세히 다룹니다.

---

### 8.8.5 순위와 정렬을 혼동하는 실수

정렬은 행의 순서를 바꾸는 작업입니다.

\`\`\`python
orders.sort_values(by="total_price", ascending=False)
\`\`\`

순위 계산은 각 행에 등수 값을 부여하는 작업입니다.

\`\`\`python
orders["rank"] = orders["total_price"].rank(ascending=False)
\`\`\`

정렬만 한다고 순위 컬럼이 생기지는 않습니다.  
순위 컬럼이 필요하다면 \`rank()\`를 사용해야 합니다.

---
`;export{e as default};