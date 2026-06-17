var e=`# 7장. 누적 지표와 이동평균 분석

## 7.3 이번 장에서 사용할 주요 함수

이번 장에서는 다음 함수를 사용합니다.

| 함수 | 역할 |
|---|---|
| \`groupby()\` | 날짜별, 카테고리별, 고객별 집계 |
| \`cumsum()\` | 누적 합계 |
| \`cumcount()\` | 그룹 내 누적 순서 |
| \`rolling()\` | 이동 윈도우 계산 |
| \`expanding()\` | 시작부터 현재까지 확장 계산 |
| \`diff()\` | 이전 값과의 차이 |
| \`pct_change()\` | 이전 값 대비 변화율 |
| \`shift()\` | 이전 또는 다음 행 값 가져오기 |
| \`rank()\` | 순위 계산 |
| \`fillna()\` | 이동 계산 후 결측치 처리 |

---

### 7.3.1 \`cumsum()\`

누적 합계를 계산합니다.

\`\`\`python
df["cumulative_sales"] = df["sales"].cumsum()
\`\`\`

그룹별 누적 합계도 가능합니다.

\`\`\`python
df["customer_cumulative_purchase"] = (
    df.groupby("customer_id")["sales"].cumsum()
)
\`\`\`

---

### 7.3.2 \`rolling()\`

이동 윈도우를 만듭니다.

\`\`\`python
df["sales_3d_ma"] = df["sales"].rolling(window=3).mean()
\`\`\`

\`window=3\`은 최근 3개 행을 기준으로 계산한다는 뜻입니다.

---

### 7.3.3 \`expanding()\`

첫 행부터 현재 행까지 범위를 점점 확장하며 계산합니다.

\`\`\`python
df["expanding_avg_sales"] = df["sales"].expanding().mean()
\`\`\`

이동평균은 최근 N개만 보지만, expanding은 처음부터 현재까지 모두 봅니다.

---

### 7.3.4 \`diff()\`

이전 값과의 차이를 계산합니다.

\`\`\`python
df["sales_diff"] = df["sales"].diff()
\`\`\`

첫 번째 행은 이전 값이 없으므로 결측치가 됩니다.

---

### 7.3.5 \`pct_change()\`

이전 값 대비 변화율을 계산합니다.

\`\`\`python
df["sales_pct_change"] = df["sales"].pct_change() * 100
\`\`\`

결과는 비율입니다.  
100을 곱하면 백분율로 볼 수 있습니다.

---

### 7.3.6 \`shift()\`

이전 행 또는 다음 행의 값을 가져옵니다.

\`\`\`python
df["previous_sales"] = df["sales"].shift(1)
\`\`\`

\`shift(1)\`은 이전 행 값을 가져옵니다.  
전일 대비 계산이나 전월 대비 계산에서 자주 사용합니다.

---
`;export{e as default};