var e=`<!-- 원본: python_data_analysis_basic_chapter_11_book.md / 세부 장: 11-14 -->

# 11.14 정답 및 해설

### 문제 1 정답

정답: B

중복값은 같은 데이터가 두 번 이상 존재하는 상태를 말합니다.  
단, 어떤 컬럼을 기준으로 중복을 판단할지는 데이터의 의미에 따라 달라집니다.

---

### 문제 2 정답

\`\`\`python
df.duplicated()
\`\`\`

전체 행이 완전히 같은 경우 중복으로 판단합니다.

중복된 행만 보고 싶다면 다음처럼 작성할 수 있습니다.

\`\`\`python
df[df.duplicated()]
\`\`\`

---

### 문제 3 정답

\`\`\`python
df[df.duplicated(subset=["id"], keep=False)]
\`\`\`

\`keep=False\`를 사용하면 중복 그룹에 속한 모든 행을 표시합니다.  
따라서 첫 번째 중복 행도 함께 볼 수 있습니다.

---

### 문제 4 정답

\`\`\`python
customers_clean = customers.drop_duplicates(
    subset=["customer_id"],
    keep="first"
)

customers_clean
\`\`\`

\`customer_id\`가 같은 행 중 첫 번째 행을 남기고 나머지를 제거합니다.

---

### 문제 5 정답

\`email\` 컬럼을 기준으로 중복을 판단하고, 중복된 이메일이 있을 경우 마지막 행을 남긴다는 의미입니다.

예를 들어 같은 이메일을 가진 고객 정보가 여러 개 있다면 마지막에 등장한 행만 유지됩니다.

---

### 문제 6 정답

\`\`\`python
orders["amount"].min()
orders["amount"].max()
orders["amount"].mean()
orders["amount"].median()
\`\`\`

또는 한 번에 요약하려면 다음처럼 작성할 수 있습니다.

\`\`\`python
orders["amount"].describe()
\`\`\`

---

### 문제 7 정답

\`\`\`python
orders.sort_values(by="amount", ascending=False).head(3)
\`\`\`

\`amount\`가 큰 값부터 정렬하고 상위 3개 행을 확인합니다.

---

### 문제 8 정답

\`\`\`python
outliers = orders[
    (orders["amount"] < lower_bound) |
    (orders["amount"] > upper_bound)
]
\`\`\`

IQR 기준 하한보다 작거나 상한보다 큰 값을 이상값 후보로 봅니다.

---

### 문제 9 정답

반드시 삭제해야 하는 것은 아닙니다.

IQR 기준으로 탐지된 값은 “이상값 후보”입니다.  
이 값이 실제 오류일 수도 있지만, 실제로 의미 있는 극단값일 수도 있습니다.

예를 들어 1,000,000원 주문은 입력 오류일 수도 있고, 실제 고액 주문일 수도 있습니다.  
따라서 원본 데이터나 업무 맥락을 확인한 뒤 제거, 유지, 별도 표시 중 적절한 방법을 선택해야 합니다.

---

### 문제 10 정답

\`\`\`python
orders_no_dup = orders.drop_duplicates(
    subset=["order_id"],
    keep="first",
    ignore_index=True
)

q1 = orders_no_dup["amount"].quantile(0.25)
q3 = orders_no_dup["amount"].quantile(0.75)
iqr = q3 - q1

lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

orders_no_dup["is_outlier"] = (
    (orders_no_dup["amount"] < lower_bound) |
    (orders_no_dup["amount"] > upper_bound)
)

orders_no_dup
\`\`\`

처리 과정은 다음과 같습니다.

1. \`order_id\` 기준으로 중복을 제거합니다.
2. \`amount\` 컬럼의 Q1, Q3, IQR을 계산합니다.
3. IQR 기준의 하한과 상한을 계산합니다.
4. 범위를 벗어나는 값을 \`is_outlier\` 컬럼에 \`True\`로 표시합니다.

중요한 점은 이상값 후보를 바로 삭제하지 않고 표시만 했다는 것입니다.  
이후 원본 확인이나 분석 목적에 따라 최종 처리 여부를 결정할 수 있습니다.

---
`;export{e as default};