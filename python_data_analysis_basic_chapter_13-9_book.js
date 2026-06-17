var e=`<!-- 원본: python_data_analysis_basic_chapter_13_book.md / 세부 장: 13-9 -->

# 13.9 날짜 데이터 클리닝

실무 날짜 데이터에는 여러 문제가 섞여 있습니다.

\`\`\`text
잘못된 날짜
서로 다른 날짜 형식
결측치
문자열과 날짜형 혼합
시간대 문제
날짜와 시간이 붙어 있는 데이터
\`\`\`

이번 절에서는 기초 과정에서 알아야 할 날짜 데이터 클리닝 방법을 정리합니다.

---

### 13.9.1 잘못된 날짜 처리

잘못된 날짜는 \`errors="coerce"\`로 \`NaT\`로 변환한 뒤 확인합니다.

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(
    orders["order_date"],
    errors="coerce"
)

invalid_dates = orders[orders["order_date_dt"].isna()]

invalid_dates
\`\`\`

잘못된 날짜가 있는 행을 어떻게 처리할지는 분석 목적에 따라 다릅니다.

\`\`\`text
날짜 분석에서는 제외한다.
원본 데이터를 확인해 수정한다.
날짜가 필요 없는 분석에는 유지한다.
\`\`\`

---

### 13.9.2 결측 날짜 처리

날짜 컬럼의 결측치도 분석 목적에 따라 처리해야 합니다.

예를 들어 배송일이 없는 것은 아직 배송되지 않았다는 의미일 수 있습니다.

\`\`\`python
orders[orders["ship_date_dt"].isna()]
\`\`\`

배송일 결측치를 임의로 채우면 잘못된 배송 소요일이 계산될 수 있습니다.  
따라서 배송 소요일 분석에서는 배송일이 있는 행만 사용합니다.

\`\`\`python
delivery_data = orders.dropna(subset=["order_date_dt", "ship_date_dt"]).copy()

delivery_data["delivery_days"] = (
    delivery_data["ship_date_dt"] - delivery_data["order_date_dt"]
).dt.days

delivery_data
\`\`\`

---

### 13.9.3 여러 날짜 형식이 섞인 경우

다음처럼 날짜 형식이 섞여 있을 수 있습니다.

\`\`\`python
mixed_dates = pd.Series([
    "2026-01-05",
    "2026/01/06",
    "2026.01.07",
    "20260108",
    "잘못된 날짜"
])

pd.to_datetime(mixed_dates, errors="coerce")
\`\`\`

pandas가 여러 형식을 자동으로 처리하는 경우도 있지만, 모든 형식을 항상 완벽하게 처리하는 것은 아닙니다.  
형식이 복잡하게 섞여 있다면 먼저 문자열을 표준화하는 작업이 필요할 수 있습니다.

예를 들어 \`/\`와 \`.\`을 \`-\`로 바꿀 수 있습니다.

\`\`\`python
mixed_dates_clean = (
    mixed_dates
    .str.replace("/", "-", regex=False)
    .str.replace(".", "-", regex=False)
)

pd.to_datetime(mixed_dates_clean, errors="coerce")
\`\`\`

형식이 지나치게 다양하면 원본 데이터 생성 단계에서부터 표준 형식을 정하는 것이 가장 좋습니다.

---

### 13.9.4 날짜 형식 표준화

분석 결과를 저장하거나 보고서에 표시할 때는 날짜 형식을 통일하는 것이 좋습니다.

날짜형 데이터를 문자열로 변환하려면 \`dt.strftime()\`을 사용합니다.

\`\`\`python
orders["order_date_text"] = orders["order_date_dt"].dt.strftime("%Y-%m-%d")

orders[["order_date_dt", "order_date_text"]]
\`\`\`

\`strftime()\`은 날짜를 원하는 문자열 형식으로 바꿉니다.

예를 들어 다음과 같은 형식이 가능합니다.

\`\`\`python
orders["order_date_dt"].dt.strftime("%Y/%m/%d")
orders["order_date_dt"].dt.strftime("%Y년 %m월 %d일")
\`\`\`

분석할 때는 날짜형을 유지하고, 출력이나 보고용으로만 문자열 형식을 사용하는 것이 좋습니다.

---

### 13.9.5 시간대 기초

실무에서 해외 서비스나 서버 로그를 다루면 시간대 문제가 생길 수 있습니다.

\`\`\`text
한국 시간
UTC
미국 시간
서버 시간
사용자 로컬 시간
\`\`\`

기초 과정에서는 시간대를 깊게 다루지 않습니다.  
다만 다음 정도는 알고 있어야 합니다.

\`\`\`text
시간대가 다른 데이터를 비교할 때는 기준 시간대를 맞춰야 한다.
서버 로그는 UTC로 저장되는 경우가 많다.
한국 시간은 UTC보다 9시간 빠르다.
\`\`\`

pandas에서는 시간대가 있는 날짜도 다룰 수 있습니다.

\`\`\`python
time_data = pd.to_datetime(["2026-01-01 00:00:00"], utc=True)

time_data
\`\`\`

시간대 처리는 데이터 분석 고급 과정이나 실무 프로젝트에서 더 자세히 다루는 것이 좋습니다.

---
`;export{e as default};