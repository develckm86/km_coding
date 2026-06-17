var e=`<!-- 원본: python_data_analysis_basic_chapter_9_book.md / 세부 장: 9-5 -->

# 9.5 데이터 타입 변환

## 9.5.1 데이터 타입을 바꿔야 하는 이유

데이터를 불러오면 숫자처럼 보이는 값이 문자열로 들어오는 경우가 많습니다.

예를 들어 CSV 파일에서 다음처럼 저장되어 있으면:

\`\`\`text
price
"300000"
"15000"
"80000"
\`\`\`

pandas는 이 컬럼을 문자열로 인식할 수 있습니다.

문자열은 숫자처럼 계산할 수 없습니다.  
따라서 분석 전에 데이터 타입을 확인하고 필요하면 변환해야 합니다.

\`\`\`python
orders.dtypes
\`\`\`

데이터 타입 변환은 분석 전처리에서 매우 중요한 작업입니다.

---

## 9.5.2 \`astype()\`으로 타입 변환하기

\`astype()\`은 컬럼의 데이터 타입을 바꿀 때 사용합니다.

다음 예제를 보겠습니다.

\`\`\`python
df = pd.DataFrame({
    "price": ["300000", "15000", "80000"],
    "quantity": ["1", "3", "2"]
})

df.dtypes
\`\`\`

\`price\`와 \`quantity\`가 문자열이라면 숫자로 변환할 수 있습니다.

\`\`\`python
df["price"] = df["price"].astype(int)
df["quantity"] = df["quantity"].astype(int)

df.dtypes
\`\`\`

여러 컬럼을 한 번에 바꿀 수도 있습니다.

\`\`\`python
df = df.astype({
    "price": int,
    "quantity": int
})
\`\`\`

\`astype()\`은 값이 모두 정상적으로 변환 가능할 때 사용하기 좋습니다.

---

## 9.5.3 숫자 변환 실패 처리: \`pd.to_numeric()\`

실무 데이터에는 숫자로 변환할 수 없는 값이 섞여 있을 수 있습니다.

\`\`\`python
df = pd.DataFrame({
    "price": ["300000", "15,000", "unknown", "80000"]
})

df
\`\`\`

이 데이터에서 \`astype(int)\`를 사용하면 에러가 발생할 수 있습니다.  
\`"15,000"\`에는 쉼표가 있고, \`"unknown"\`은 숫자가 아니기 때문입니다.

먼저 쉼표를 제거합니다.

\`\`\`python
df["price_clean"] = df["price"].str.replace(",", "")
\`\`\`

그다음 \`pd.to_numeric()\`을 사용할 수 있습니다.

\`\`\`python
df["price_clean"] = pd.to_numeric(df["price_clean"], errors="coerce")

df
\`\`\`

\`errors="coerce"\`는 변환할 수 없는 값을 \`NaN\`으로 바꿉니다.

\`\`\`text
unknown → NaN
\`\`\`

이 방식은 잘못된 숫자 데이터를 찾아내고 처리하는 데 유용합니다.

---

## 9.5.4 날짜형 변환: \`pd.to_datetime()\`

날짜 데이터는 처음에 문자열로 들어오는 경우가 많습니다.

\`\`\`python
orders["order_date"].dtype
\`\`\`

문자열 상태에서도 화면에는 날짜처럼 보일 수 있습니다.  
하지만 문자열은 날짜 계산이나 월별 집계에 적합하지 않습니다.

날짜형으로 변환하려면 \`pd.to_datetime()\`을 사용합니다.

\`\`\`python
orders["order_date"] = pd.to_datetime(orders["order_date"])

orders.dtypes
\`\`\`

날짜형으로 변환하면 다음과 같은 작업을 할 수 있습니다.

- 연도 추출
- 월 추출
- 요일 추출
- 특정 기간 필터링
- 날짜 차이 계산
- 월별 집계

예를 들어 주문 월을 추출할 수 있습니다.

\`\`\`python
orders["order_month"] = orders["order_date"].dt.month

orders
\`\`\`

날짜와 시간 데이터는 13장에서 더 자세히 다룹니다.  
이번 장에서는 날짜형 변환이 파생 변수 생성과 연결된다는 점을 이해하면 됩니다.

---

## 9.5.5 범주형 데이터로 변환하기

범주형 데이터는 값의 종류가 제한된 데이터입니다.

예를 들어 다음과 같은 컬럼이 범주형 데이터입니다.

- 지역
- 성별
- 고객 등급
- 상품 카테고리
- 주문 상태

pandas에서는 이런 데이터를 \`category\` 타입으로 바꿀 수 있습니다.

\`\`\`python
orders["category"] = orders["category"].astype("category")
orders["region"] = orders["region"].astype("category")

orders.dtypes
\`\`\`

기초 과정에서는 범주형 타입을 깊게 다루지 않습니다.  
다만 값의 종류가 정해진 컬럼은 숫자형이나 일반 문자열과 성격이 다르다는 점을 기억해두면 좋습니다.

---

## 9.5.6 타입 변환 전 확인할 것

타입 변환 전에 다음을 확인하는 습관이 필요합니다.

\`\`\`python
orders.dtypes
orders.head()
orders.info()
\`\`\`

확인할 질문은 다음과 같습니다.

- 숫자여야 하는 컬럼이 문자열로 되어 있지 않은가?
- 날짜여야 하는 컬럼이 문자열로 되어 있지 않은가?
- 쉼표나 원화 기호 같은 문자가 섞여 있지 않은가?
- 변환할 수 없는 값이 섞여 있지 않은가?
- 결측치가 타입 변환에 영향을 주지 않는가?

타입 변환은 한 번에 끝나는 작업이 아닐 수 있습니다.  
실무에서는 값 정리, 결측치 처리, 타입 변환이 함께 이루어집니다.

---
`;export{e as default};