var e=`<!-- 원본: python_data_analysis_basic_chapter_11_book.md / 세부 장: 11-12 -->

# 11.12 핵심 정리

이번 장에서는 중복값과 이상값을 확인하고 처리하는 방법을 배웠습니다.

중복값은 같은 데이터가 두 번 이상 존재하는 상태입니다.  
pandas에서는 \`duplicated()\`로 중복 여부를 확인하고, \`drop_duplicates()\`로 중복 행을 제거할 수 있습니다.

\`\`\`python
df.duplicated()
df.duplicated(subset=["order_id"])
df.drop_duplicates(subset=["order_id"])
\`\`\`

중복을 처리할 때는 어떤 컬럼을 기준으로 중복을 판단할지 정해야 합니다.  
주문 데이터에서는 주문번호, 고객 데이터에서는 고객 ID나 이메일, 상품 데이터에서는 상품 ID가 기준이 될 수 있습니다.

이상값은 일반적인 범위를 벗어난 값입니다.  
이상값은 입력 오류일 수도 있고, 실제로 의미 있는 극단값일 수도 있습니다.

이상값을 찾을 때는 다음 방법을 사용할 수 있습니다.

\`\`\`python
df["column"].min()
df["column"].max()
df["column"].describe()
df["column"].quantile([0.25, 0.5, 0.75])
\`\`\`

IQR 기준으로 이상값 후보를 찾을 수도 있습니다.

\`\`\`python
q1 = df["column"].quantile(0.25)
q3 = df["column"].quantile(0.75)
iqr = q3 - q1

lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr
\`\`\`

이상값은 무조건 삭제하지 말고, 분석 목적과 데이터 의미를 고려해 처리해야 합니다.

가능한 처리 방법은 다음과 같습니다.

- 제거
- 대체
- 상한/하한 제한
- 이상값 여부 컬럼 추가
- 유지
- 포함/제외 분석 결과 비교

중복값과 이상값 처리는 데이터 분석 결과의 신뢰도에 직접적인 영향을 줍니다.  
따라서 처리 기준을 명확히 정하고, 처리 전후 결과를 비교하며, 반드시 기록을 남기는 습관이 필요합니다.

---
`;export{e as default};