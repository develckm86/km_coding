var e=`# 19장. 대용량 데이터 처리 실습

## 19.17 이번 장에서 자주 하는 실수

대용량 데이터 처리에서 자주 하는 실수를 정리합니다.

---

### 19.17.1 무조건 전체 CSV를 읽는 실수

대용량 CSV를 무조건 전체 읽으면 메모리 부족이 발생할 수 있습니다.

먼저 다음을 확인합니다.

\`\`\`text
필요한 컬럼만 읽을 수 있는가?
샘플만 먼저 확인할 수 있는가?
chunk로 처리할 수 있는가?
DuckDB로 직접 집계할 수 있는가?
\`\`\`

---

### 19.17.2 usecols를 사용하지 않는 실수

분석에 필요 없는 컬럼까지 읽으면 메모리를 낭비합니다.

\`\`\`python
pd.read_csv(path, usecols=["order_id", "year_month", "net_amount"])
\`\`\`

---

### 19.17.3 자료형 최적화를 하지 않는 실수

반복 값이 많은 문자열 컬럼을 object로 두면 메모리를 많이 사용합니다.

\`\`\`python
df["category"] = df["category"].astype("category")
\`\`\`

---

### 19.17.4 chunk별 고유 개수를 단순 합산하는 실수

고유 고객 수를 chunk별로 계산한 뒤 더하면 같은 고객이 여러 chunk에 있을 때 중복 계산됩니다.

정확한 방법:

\`\`\`text
월별 customer_id 쌍을 모은다.
중복 제거 후 고객 수를 계산한다.
\`\`\`

또는 DuckDB의 \`COUNT(DISTINCT customer_id)\`를 사용합니다.

---

### 19.17.5 CSV만 계속 사용하는 실수

반복 분석에는 Parquet이 더 적합할 수 있습니다.

\`\`\`python
df.to_parquet("orders.parquet", index=False)
\`\`\`

---

### 19.17.6 중간 파일을 관리하지 않는 실수

대용량 분석에서는 중간 파일이 많아질 수 있습니다.

파일명과 폴더 구조를 명확히 관리해야 합니다.

\`\`\`text
raw: 원본
processed: 처리된 데이터
outputs/tables: 결과표
outputs/reports: 보고서
\`\`\`

---

### 19.17.7 처리 결과를 검증하지 않는 실수

처리 방식이 달라도 결과는 일관되어야 합니다.

\`\`\`text
pandas 결과
chunk 결과
DuckDB 결과
\`\`\`

서로 비교해 검증해야 합니다.

---
`;export{e as default};