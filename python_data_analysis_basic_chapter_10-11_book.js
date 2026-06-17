var e=`<!-- 원본: python_data_analysis_basic_chapter_10_book.md / 세부 장: 10-11 -->

# 10.11 핵심 정리

이번 장에서는 pandas에서 결측치를 확인하고 처리하는 방법을 배웠습니다.

결측치는 데이터에서 값이 비어 있거나 존재하지 않는 상태입니다.  
pandas에서는 \`isna()\`와 \`notna()\`로 결측치를 확인할 수 있습니다.

컬럼별 결측치 개수는 다음과 같이 확인합니다.

\`\`\`python
df.isna().sum()
\`\`\`

컬럼별 결측치 비율은 다음과 같이 확인합니다.

\`\`\`python
df.isna().mean() * 100
\`\`\`

결측치가 있는 행을 제거하려면 \`dropna()\`를 사용합니다.

\`\`\`python
df.dropna()
df.dropna(subset=["quantity", "unit_price"])
\`\`\`

결측치를 다른 값으로 채우려면 \`fillna()\`를 사용합니다.

\`\`\`python
df["region"] = df["region"].fillna("미상")
df["coupon_amount"] = df["coupon_amount"].fillna(0)
\`\`\`

시계열 데이터처럼 순서가 의미 있는 데이터에서는 \`ffill()\`이나 \`bfill()\`을 사용할 수 있습니다.

\`\`\`python
df["value"] = df["value"].ffill()
\`\`\`

결측치 처리에서 가장 중요한 것은 문법보다 판단입니다.  
결측치를 삭제할지, 대체할지, 별도 범주로 둘지, 그대로 둘지는 데이터의 의미와 분석 목적에 따라 결정해야 합니다.

---
`;export{e as default};