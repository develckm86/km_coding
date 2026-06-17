var e=`<!-- 원본: python_data_analysis_basic_chapter_7_book.md / 세부 장: 7-9 -->

# 7.9 자주 하는 실수

## 실수 1: 여러 컬럼 선택 시 리스트를 한 번만 쓰는 경우

잘못된 코드입니다.

\`\`\`python
orders["customer_name", "product"]
\`\`\`

여러 컬럼을 선택할 때는 컬럼명 목록을 리스트로 만들어야 합니다.

\`\`\`python
orders[["customer_name", "product"]]
\`\`\`

---

## 실수 2: 여러 조건에 \`and\`, \`or\`를 사용하는 경우

잘못된 코드입니다.

\`\`\`python
orders[(orders["region"] == "서울") and (orders["total_price"] >= 50000)]
\`\`\`

pandas에서는 \`&\`, \`|\`, \`~\`를 사용해야 합니다.

\`\`\`python
orders[(orders["region"] == "서울") & (orders["total_price"] >= 50000)]
\`\`\`

---

## 실수 3: 조건마다 괄호를 쓰지 않는 경우

잘못된 코드입니다.

\`\`\`python
orders[orders["region"] == "서울" & orders["total_price"] >= 50000]
\`\`\`

각 조건을 괄호로 감싸야 합니다.

\`\`\`python
orders[(orders["region"] == "서울") & (orders["total_price"] >= 50000)]
\`\`\`

---

## 실수 4: \`loc\`와 \`iloc\`를 혼동하는 경우

\`\`\`python
orders_by_id = orders.set_index("order_id")
\`\`\`

이 상태에서 다음 코드는 주문번호 1001을 선택합니다.

\`\`\`python
orders_by_id.loc[1001]
\`\`\`

하지만 다음 코드는 1001번째 위치의 행을 선택하려고 하기 때문에 에러가 발생할 가능성이 큽니다.

\`\`\`python
orders_by_id.iloc[1001]
\`\`\`

\`loc\`는 라벨 기준, \`iloc\`는 위치 기준입니다.

---

## 실수 5: 빈 문자열을 결측치로 착각하는 경우

\`\`\`python
orders[orders["phone"].isna()]
\`\`\`

이 코드는 \`None\`이나 \`NaN\`은 찾지만, 빈 문자열 \`""\`은 찾지 못합니다.

빈 문자열까지 비어 있다고 판단하려면 다음처럼 조건을 추가해야 합니다.

\`\`\`python
orders[orders["phone"].isna() | (orders["phone"] == "")]
\`\`\`

---

# 7장 핵심 정리

- 컬럼 하나를 선택하면 보통 Series가 반환된다.
- 여러 컬럼을 선택하려면 컬럼명 리스트를 사용한다.
- \`loc\`는 라벨 기준 선택 도구다.
- \`iloc\`는 위치 기준 선택 도구다.
- 조건 필터링은 \`True\`, \`False\`로 이루어진 불리언 마스크를 사용한다.
- 여러 조건을 연결할 때는 \`&\`, \`|\`, \`~\`를 사용한다.
- pandas 조건식에서는 \`and\`, \`or\`, \`not\`을 사용하지 않는다.
- 여러 조건을 사용할 때는 각 조건을 괄호로 감싼다.
- 문자열 조건은 \`.str.contains()\`, \`.str.startswith()\`, \`.str.endswith()\` 등을 사용한다.
- 범위 조건은 비교 연산자 또는 \`between()\`으로 만들 수 있다.
- 결측치 확인에는 \`isna()\`, \`notna()\`를 사용한다.
- 조건에 맞는 행과 필요한 열을 동시에 선택할 때는 \`df.loc[조건, 컬럼목록]\` 구조가 유용하다.

---

# 연습문제

## 문제 1. 컬럼 선택

다음 DataFrame에서 \`name\` 컬럼만 선택하는 코드를 작성하세요.

\`\`\`python
df = pd.DataFrame({
    "name": ["김민수", "이지은", "박서준"],
    "age": [28, 35, 41],
    "region": ["서울", "부산", "서울"]
})
\`\`\`

---

## 문제 2. 여러 컬럼 선택

위 DataFrame에서 \`name\`, \`region\` 컬럼만 선택하는 코드를 작성하세요.

---

## 문제 3. \`loc\`와 \`iloc\`

다음 설명 중 맞는 것을 고르세요.

1. \`loc\`는 위치 기준으로 행과 열을 선택한다.
2. \`iloc\`는 라벨 기준으로 행과 열을 선택한다.
3. \`loc\`는 라벨 기준, \`iloc\`는 위치 기준으로 선택한다.
4. \`loc\`와 \`iloc\`는 완전히 같은 기능이다.

---

## 문제 4. 조건 필터링

다음 DataFrame에서 \`region\`이 \`서울\`인 행만 선택하는 코드를 작성하세요.

\`\`\`python
df = pd.DataFrame({
    "name": ["김민수", "이지은", "박서준", "최유리"],
    "region": ["서울", "부산", "서울", "대구"],
    "amount": [50000, 30000, 80000, 20000]
})
\`\`\`

---

## 문제 5. 여러 조건 필터링

문제 4의 DataFrame에서 \`region\`이 \`서울\`이고 \`amount\`가 60,000 이상인 행만 선택하는 코드를 작성하세요.

---

## 문제 6. \`isin()\` 사용하기

문제 4의 DataFrame에서 지역이 \`서울\` 또는 \`부산\`인 행만 선택하는 코드를 \`isin()\`을 사용해 작성하세요.

---

## 문제 7. 문자열 조건 필터링

다음 DataFrame에서 \`email\` 컬럼에 \`gmail\`이 포함된 행만 선택하는 코드를 작성하세요.

\`\`\`python
df = pd.DataFrame({
    "name": ["김민수", "이지은", "박서준"],
    "email": ["minsu@gmail.com", "jieun@company.com", "seo@gmail.com"]
})
\`\`\`

---

## 문제 8. 범위 조건 필터링

다음 DataFrame에서 \`score\`가 70 이상 90 이하인 행만 선택하는 코드를 작성하세요.

\`\`\`python
df = pd.DataFrame({
    "name": ["A", "B", "C", "D"],
    "score": [65, 70, 85, 95]
})
\`\`\`

---

## 문제 9. 결측치 필터링

다음 DataFrame에서 \`phone\`이 결측치인 행만 선택하는 코드를 작성하세요.

\`\`\`python
df = pd.DataFrame({
    "name": ["김민수", "이지은", "박서준"],
    "phone": ["010-1111-2222", None, "010-3333-4444"]
})
\`\`\`

---

## 문제 10. 행과 열 동시에 선택하기

다음 조건에 맞는 데이터를 선택하세요.

- \`region\`이 \`서울\`
- 선택할 컬럼은 \`name\`, \`amount\`

\`\`\`python
df = pd.DataFrame({
    "name": ["김민수", "이지은", "박서준", "최유리"],
    "region": ["서울", "부산", "서울", "대구"],
    "amount": [50000, 30000, 80000, 20000]
})
\`\`\`

---

# 정답 및 해설

## 정답 1

\`\`\`python
df["name"]
\`\`\`

컬럼 하나를 선택할 때는 컬럼명을 문자열로 전달합니다. 결과는 Series입니다.

---

## 정답 2

\`\`\`python
df[["name", "region"]]
\`\`\`

여러 컬럼을 선택할 때는 컬럼명 목록을 리스트로 전달합니다.

---

## 정답 3

정답은 3번입니다.

\`loc\`는 라벨 기준으로 선택하고, \`iloc\`는 위치 기준으로 선택합니다.

---

## 정답 4

\`\`\`python
df[df["region"] == "서울"]
\`\`\`

\`df["region"] == "서울"\`은 각 행이 서울인지 여부를 \`True\`, \`False\`로 반환합니다.

---

## 정답 5

\`\`\`python
df[(df["region"] == "서울") & (df["amount"] >= 60000)]
\`\`\`

여러 조건을 함께 사용할 때는 \`&\`를 사용하고, 각 조건을 괄호로 감싸야 합니다.

---

## 정답 6

\`\`\`python
df[df["region"].isin(["서울", "부산"])]
\`\`\`

\`isin()\`은 여러 값 중 하나에 해당하는지 확인할 때 사용합니다.

---

## 정답 7

\`\`\`python
df[df["email"].str.contains("gmail", na=False)]
\`\`\`

문자열 포함 여부는 \`.str.contains()\`로 확인할 수 있습니다. 결측치가 있을 가능성이 있으면 \`na=False\`를 넣는 것이 안전합니다.

---

## 정답 8

\`\`\`python
df[df["score"].between(70, 90)]
\`\`\`

또는 다음처럼 비교 연산자를 사용할 수 있습니다.

\`\`\`python
df[(df["score"] >= 70) & (df["score"] <= 90)]
\`\`\`

---

## 정답 9

\`\`\`python
df[df["phone"].isna()]
\`\`\`

결측치인 행을 찾을 때는 \`isna()\`를 사용합니다.

---

## 정답 10

\`\`\`python
condition = df["region"] == "서울"
columns = ["name", "amount"]

df.loc[condition, columns]
\`\`\`

조건에 맞는 행과 필요한 컬럼을 동시에 선택할 때는 \`loc[조건, 컬럼목록]\` 구조를 사용하면 명확합니다.

---

# 실습 과제

## 과제 1. 주문 데이터 필터링

예제 \`orders\` 데이터에서 다음 조건을 만족하는 행을 선택하세요.

- 주문 상태가 \`완료\`
- 총 주문 금액이 50,000원 이상

결과에는 다음 컬럼만 남기세요.

- \`customer_name\`
- \`product\`
- \`total_price\`

---

## 과제 2. 지역별 분석 대상 추출

예제 \`orders\` 데이터에서 지역이 \`서울\` 또는 \`부산\`인 주문만 선택하세요. 단, 주문 상태가 \`취소\`인 행은 제외하세요.

---

## 과제 3. 전화번호가 없는 고객 찾기

예제 \`orders\` 데이터에서 전화번호가 비어 있는 행을 찾으세요.

조건은 다음 두 가지를 모두 고려해야 합니다.

- \`None\`인 경우
- 빈 문자열 \`""\`인 경우

---

## 과제 4. 상품명 조건 필터링

예제 \`orders\` 데이터에서 상품명에 \`마\`가 포함된 주문을 선택하세요.

---

## 과제 5. 분석용 데이터셋 만들기

예제 \`orders\` 데이터에서 다음 조건을 만족하는 분석용 데이터셋 \`analysis_orders\`를 만드세요.

- 주문 상태가 \`완료\`
- 총 주문 금액이 30,000원 이상
- 전화번호가 비어 있지 않음

남길 컬럼은 다음과 같습니다.

- \`order_id\`
- \`customer_name\`
- \`region\`
- \`category\`
- \`product\`
- \`total_price\`

---

# 실습 과제 예시 정답

## 과제 1 예시 정답

\`\`\`python
condition = (orders["order_status"] == "완료") & (orders["total_price"] >= 50000)
columns = ["customer_name", "product", "total_price"]

orders.loc[condition, columns]
\`\`\`

---

## 과제 2 예시 정답

\`\`\`python
condition = orders["region"].isin(["서울", "부산"]) & (orders["order_status"] != "취소")

orders[condition]
\`\`\`

---

## 과제 3 예시 정답

\`\`\`python
condition = orders["phone"].isna() | (orders["phone"] == "")

orders[condition]
\`\`\`

---

## 과제 4 예시 정답

\`\`\`python
orders[orders["product"].str.contains("마", na=False)]
\`\`\`

---

## 과제 5 예시 정답

\`\`\`python
is_completed = orders["order_status"] == "완료"
is_enough_price = orders["total_price"] >= 30000
has_phone = orders["phone"].notna() & (orders["phone"] != "")

condition = is_completed & is_enough_price & has_phone
columns = ["order_id", "customer_name", "region", "category", "product", "total_price"]

analysis_orders = orders.loc[condition, columns]
analysis_orders
\`\`\`

---

# 참고 자료

- pandas 공식 문서: Indexing and selecting data  
  https://pandas.pydata.org/docs/user_guide/indexing.html
- pandas 공식 문서: DataFrame.loc  
  https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.loc.html
- pandas 공식 문서: DataFrame.iloc  
  https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.iloc.html
`;export{e as default};