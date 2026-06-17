var e=`<!-- 원본: python_data_analysis_basic_chapter_13_book.md / 세부 장: 13-4 -->

# 13.4 날짜형으로 변환하기

날짜 분석의 첫 단계는 문자열 날짜를 날짜형으로 변환하는 것입니다.

pandas에서는 \`pd.to_datetime()\`을 사용합니다.

---

### 13.4.1 \`pd.to_datetime()\` 기본 사용법

주문일을 날짜형으로 변환해보겠습니다.

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(orders["order_date"])

orders[["order_date", "order_date_dt"]]
\`\`\`

하지만 이 코드는 오류가 발생할 수 있습니다.  
예제 데이터에는 \`"잘못된 날짜"\`라는 값이 들어 있기 때문입니다.

실무 데이터에는 이런 잘못된 날짜가 자주 포함됩니다.

---

### 13.4.2 변환 실패 처리: \`errors="coerce"\`

잘못된 날짜가 있을 때는 \`errors="coerce"\`를 사용할 수 있습니다.

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(
    orders["order_date"],
    errors="coerce"
)

orders[["order_date", "order_date_dt"]]
\`\`\`

\`errors="coerce"\`는 변환할 수 없는 값을 \`NaT\`로 바꿉니다.

\`NaT\`는 Not a Time의 약자입니다.  
날짜와 시간 데이터에서의 결측치라고 이해하면 됩니다.

\`\`\`text
잘못된 날짜 → NaT
\`\`\`

날짜 데이터를 다룰 때는 \`NaN\` 대신 \`NaT\`를 자주 보게 됩니다.

---

### 13.4.3 배송일 변환하기

배송일도 날짜형으로 변환합니다.

\`\`\`python
orders["ship_date_dt"] = pd.to_datetime(
    orders["ship_date"],
    errors="coerce"
)

orders[["ship_date", "ship_date_dt"]]
\`\`\`

\`ship_date\`에 있는 \`None\`도 날짜형 변환 후 \`NaT\`로 처리됩니다.

---

### 13.4.4 날짜 형식 지정하기: \`format\`

날짜 형식이 일정하다면 \`format\`을 지정할 수 있습니다.

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(
    orders["order_date"],
    format="%Y-%m-%d",
    errors="coerce"
)
\`\`\`

여기서 \`"%Y-%m-%d"\`는 다음을 의미합니다.

| 코드 | 의미 | 예시 |
|---|---|---|
| \`%Y\` | 4자리 연도 | 2026 |
| \`%m\` | 2자리 월 | 01 |
| \`%d\` | 2자리 일 | 05 |

날짜 형식 코드는 이후에도 자주 사용됩니다.

대표적인 형식은 다음과 같습니다.

| 문자열 예시 | format |
|---|---|
| \`2026-01-05\` | \`%Y-%m-%d\` |
| \`2026/01/05\` | \`%Y/%m/%d\` |
| \`2026.01.05\` | \`%Y.%m.%d\` |
| \`20260105\` | \`%Y%m%d\` |
| \`05-01-2026\` | \`%d-%m-%Y\` |

형식이 일정할 때는 \`format\`을 지정하면 의도를 명확히 표현할 수 있습니다.

---

### 13.4.5 날짜 변환 후 자료형 확인

날짜형으로 변환한 뒤에는 자료형을 확인합니다.

\`\`\`python
orders.dtypes
\`\`\`

날짜형 컬럼은 보통 다음과 비슷하게 표시됩니다.

\`\`\`text
datetime64[ns]
\`\`\`

이제 이 컬럼은 날짜 계산과 \`.dt\` 접근자를 사용할 수 있는 상태입니다.

\`\`\`python
orders["order_date_dt"].dt.year
\`\`\`

---

### 13.4.6 잘못된 날짜 찾기

\`errors="coerce"\`를 사용하면 잘못된 날짜가 \`NaT\`로 바뀝니다.  
이제 어떤 행에서 날짜 변환에 실패했는지 찾을 수 있습니다.

\`\`\`python
orders[orders["order_date_dt"].isna()]
\`\`\`

이 코드는 주문일 변환에 실패한 행을 보여줍니다.

실무에서는 이런 행을 별도로 검토해야 합니다.

\`\`\`text
원본 날짜가 잘못 입력되었는가?
수정 가능한가?
분석에서 제외해야 하는가?
날짜 분석이 아닌 다른 분석에는 사용할 수 있는가?
\`\`\`

---
`;export{e as default};