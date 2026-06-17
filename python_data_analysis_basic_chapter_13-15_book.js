var e=`<!-- 원본: python_data_analysis_basic_chapter_13_book.md / 세부 장: 13-15 -->

# 13.15 핵심 정리

이번 장에서는 pandas에서 날짜와 시간 데이터를 처리하는 방법을 배웠습니다.

문자열 날짜는 분석하기 전에 날짜형으로 변환해야 합니다.

\`\`\`python
df["date"] = pd.to_datetime(df["date"], errors="coerce")
\`\`\`

변환할 수 없는 값은 \`errors="coerce"\`를 사용해 \`NaT\`로 만들 수 있습니다.  
변환 후에는 반드시 실패한 행을 확인해야 합니다.

\`\`\`python
df[df["date"].isna()]
\`\`\`

날짜형 데이터에서는 \`.dt\` 접근자를 사용해 연도, 월, 일, 요일 같은 정보를 추출할 수 있습니다.

\`\`\`python
df["year"] = df["date"].dt.year
df["month"] = df["date"].dt.month
df["weekday"] = df["date"].dt.day_name()
\`\`\`

날짜 기준 필터링은 비교 연산자나 \`between()\`을 사용할 수 있습니다.

\`\`\`python
df[df["date"] >= "2026-01-01"]
df[df["date"].between("2026-01-01", "2026-01-31")]
\`\`\`

날짜끼리 빼면 기간을 계산할 수 있습니다.

\`\`\`python
df["days"] = (df["end_date"] - df["start_date"]).dt.days
\`\`\`

월별 분석에는 연월 컬럼을 만들어 사용하는 것이 좋습니다.

\`\`\`python
df["year_month"] = df["date"].dt.to_period("M")
df.groupby("year_month")["sales"].sum()
\`\`\`

날짜 데이터는 필터링, 집계, 시각화, EDA에서 계속 사용됩니다.  
날짜형 변환과 \`.dt\` 접근자 사용에 익숙해지면 시간 흐름을 기준으로 데이터를 분석할 수 있습니다.

---
`;export{e as default};