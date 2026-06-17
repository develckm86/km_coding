var e=`# 19장. 대용량 데이터 처리 실습

## 19.2 대용량 데이터 처리의 기본 원칙

대용량 데이터 처리는 단순히 “큰 파일을 읽는 것”이 아닙니다.  
데이터 크기를 줄이고, 필요한 계산만 수행하고, 결과를 검증하는 과정입니다.

---

### 19.2.1 필요한 컬럼만 읽기

대용량 데이터에서 가장 먼저 할 일은 필요한 컬럼만 읽는 것입니다.

예를 들어 원본 CSV에 50개 컬럼이 있지만, 월별 매출 분석에 필요한 컬럼이 다음 4개뿐이라고 합시다.

\`\`\`text
order_id
order_date
category
net_amount
\`\`\`

그러면 전체 컬럼을 읽을 필요가 없습니다.

\`\`\`python
usecols = ["order_id", "order_date", "category", "net_amount"]

df = pd.read_csv("large_orders.csv", usecols=usecols)
\`\`\`

컬럼을 줄이면 메모리 사용량과 읽기 시간이 줄어듭니다.

---

### 19.2.2 자료형 최적화

pandas는 데이터를 읽을 때 기본적으로 넉넉한 자료형을 사용합니다.

예를 들어 정수형은 기본적으로 \`int64\`, 실수형은 \`float64\`가 될 수 있습니다.

하지만 값의 범위가 작다면 더 작은 자료형을 사용할 수 있습니다.

\`\`\`text
int64 → int32 또는 int16
float64 → float32
object → category
\`\`\`

특히 문자열 컬럼에 반복되는 값이 많다면 \`category\` 자료형이 메모리 절약에 도움이 됩니다.

예:

\`\`\`text
category 컬럼: 전자기기, 도서, 생활용품
region 컬럼: 서울, 부산, 대전
device 컬럼: mobile, desktop
\`\`\`

이런 컬럼은 \`category\`로 바꾸기 좋습니다.

---

### 19.2.3 chunk 단위 처리

파일이 너무 커서 한 번에 읽기 어렵다면 chunk 단위로 처리합니다.

\`\`\`python
for chunk in pd.read_csv("large_orders.csv", chunksize=100_000):
    # chunk 단위로 집계
\`\`\`

chunk 처리는 다음 상황에 유용합니다.

\`\`\`text
전체 데이터를 메모리에 올리기 어려울 때
집계 결과만 필요할 때
필터링 후 작은 결과만 저장하면 될 때
\`\`\`

예를 들어 월별 매출만 필요하다면 전체 원본을 모두 저장할 필요가 없습니다.  
chunk별로 월별 매출을 계산한 뒤 마지막에 합치면 됩니다.

---

### 19.2.4 Parquet 활용

CSV는 사람이 보기 쉽고 범용적이지만, 대용량 분석에는 비효율적일 수 있습니다.

Parquet은 분석용 컬럼 기반 파일 형식입니다.

Parquet의 장점은 다음과 같습니다.

\`\`\`text
파일 크기가 작아질 수 있다.
읽기 속도가 빨라질 수 있다.
컬럼 단위 읽기에 유리하다.
자료형 정보를 보존한다.
대용량 분석 환경에서 널리 사용된다.
\`\`\`

pandas에서는 다음처럼 저장할 수 있습니다.

\`\`\`python
df.to_parquet("orders.parquet", index=False)
\`\`\`

다시 읽을 때는 다음처럼 사용합니다.

\`\`\`python
df = pd.read_parquet("orders.parquet")
\`\`\`

---

### 19.2.5 DuckDB로 대용량 파일 직접 집계

DuckDB를 사용하면 CSV 파일을 pandas로 모두 읽지 않고 SQL로 바로 집계할 수 있습니다.

\`\`\`sql
SELECT
    year_month,
    SUM(net_amount) AS total_sales
FROM read_csv_auto('large_orders.csv')
GROUP BY year_month;
\`\`\`

이 방식은 원본 전체를 pandas DataFrame으로 올리지 않고도 결과를 얻을 수 있어 효율적입니다.

---
`;export{e as default};