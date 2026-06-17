var e=`# 7장. 누적 지표와 이동평균 분석

## 7.8 이동평균 계산

일별 매출은 변동이 클 수 있습니다.  
이동평균은 이런 변동을 줄이고 흐름을 보기 위해 사용합니다.

---

### 7.8.1 3일 이동평균

\`\`\`python
daily_sales["sales_3d_ma"] = (
    daily_sales["daily_sales"]
    .rolling(window=3, min_periods=1)
    .mean()
)

daily_sales[["order_date_dt", "daily_sales", "sales_3d_ma"]].head()
\`\`\`

\`window=3\`은 최근 3일을 기준으로 평균을 계산한다는 뜻입니다.  
\`min_periods=1\`은 데이터가 1개만 있어도 평균을 계산하겠다는 뜻입니다.

\`min_periods\`를 지정하지 않으면 처음 2일은 3일치 데이터가 없기 때문에 결측치가 됩니다.

---

### 7.8.2 7일 이동평균

\`\`\`python
daily_sales["sales_7d_ma"] = (
    daily_sales["daily_sales"]
    .rolling(window=7, min_periods=1)
    .mean()
)

daily_sales[["order_date_dt", "daily_sales", "sales_3d_ma", "sales_7d_ma"]].head(10)
\`\`\`

7일 이동평균은 3일 이동평균보다 더 부드러운 추세를 보여줍니다.

---

### 7.8.3 주문 수 이동평균

매출뿐 아니라 주문 수에도 이동평균을 적용할 수 있습니다.

\`\`\`python
daily_sales["order_count_7d_ma"] = (
    daily_sales["order_count"]
    .rolling(window=7, min_periods=1)
    .mean()
)

daily_sales[["order_date_dt", "order_count", "order_count_7d_ma"]].head()
\`\`\`

---

### 7.8.4 이동평균 해석

이동평균을 해석할 때는 다음을 생각합니다.

\`\`\`text
이동평균이 상승하고 있는가?
이동평균이 하락하고 있는가?
일별 매출보다 이동평균이 안정적인가?
단기 변동이 심한 날은 어떤 날인가?
\`\`\`

3일 이동평균은 단기 흐름을 빠르게 반영합니다.  
7일 이동평균은 더 부드러운 흐름을 보여줍니다.

---

### 7.8.5 이동평균 사용 시 주의점

이동평균은 과거 데이터를 평균내기 때문에 실제 변화보다 늦게 반응할 수 있습니다.

또한 이동평균은 원인을 설명하지 않습니다.  
추세를 부드럽게 보여줄 뿐입니다.

예를 들어 7일 이동평균이 상승했다면 다음을 추가로 확인해야 합니다.

\`\`\`text
주문 수가 늘었는가?
평균 주문 금액이 늘었는가?
특정 카테고리 매출이 증가했는가?
이벤트나 프로모션이 있었는가?
\`\`\`

---
`;export{e as default};