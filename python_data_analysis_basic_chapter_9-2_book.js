var e=`<!-- 원본: python_data_analysis_basic_chapter_9_book.md / 세부 장: 9-2 -->

# 9.2 컬럼 이름 변경

## 9.2.1 컬럼 이름을 바꿔야 하는 이유

데이터를 불러오면 컬럼명이 다음과 같이 되어 있는 경우가 많습니다.

\`\`\`text
Order ID
Customer Name
Order Date
Discount Rate
\`\`\`

이런 컬럼명은 사람이 읽기에는 괜찮지만, 코드에서 사용할 때는 불편합니다.

예를 들어 컬럼명에 공백이 있으면 다음과 같이 대괄호를 사용해야 합니다.

\`\`\`python
orders["Customer Name"]
\`\`\`

물론 이 방식도 문제는 없습니다.  
하지만 여러 번 사용하다 보면 오타가 나기 쉽고, 코드가 길어집니다.

실무에서는 컬럼명을 다음과 같이 정리하는 경우가 많습니다.

\`\`\`text
order_id
customer_name
order_date
discount_rate
\`\`\`

이처럼 소문자와 밑줄을 사용하는 방식은 파이썬 코드와 잘 어울립니다.  
컬럼명은 분석 과정 내내 반복해서 사용되므로, 초기에 정리해두면 이후 작업이 편해집니다.

---

## 9.2.2 \`rename()\`으로 일부 컬럼명 변경하기

특정 컬럼명만 바꾸고 싶을 때는 \`rename()\`을 사용합니다.

\`\`\`python
orders_renamed = orders.rename(columns={
    "Order ID": "order_id",
    "Customer Name": "customer_name",
    "Order Date": "order_date"
})

orders_renamed
\`\`\`

\`columns\`에는 기존 컬럼명과 새 컬럼명을 딕셔너리 형태로 전달합니다.

\`\`\`python
{
    "기존 컬럼명": "새 컬럼명"
}
\`\`\`

\`rename()\`은 기본적으로 원본 DataFrame을 직접 바꾸지 않고, 컬럼명이 바뀐 새 DataFrame을 반환합니다.  
따라서 결과를 계속 사용하려면 새 변수에 저장해야 합니다.

\`\`\`python
orders = orders.rename(columns={
    "Order ID": "order_id",
    "Customer Name": "customer_name"
})
\`\`\`

---

## 9.2.3 전체 컬럼명 한 번에 변경하기

컬럼 개수가 많지 않다면 전체 컬럼명을 한 번에 바꿀 수도 있습니다.

\`\`\`python
orders.columns = [
    "order_id",
    "customer_name",
    "category",
    "order_date",
    "price",
    "quantity",
    "discount_rate",
    "region"
]

orders
\`\`\`

이 방식은 간단하지만 주의할 점이 있습니다.

전체 컬럼명을 바꿀 때는 새 컬럼명 개수가 기존 컬럼 개수와 정확히 같아야 합니다.  
컬럼 개수가 맞지 않으면 에러가 발생합니다.

\`\`\`python
len(orders.columns)
\`\`\`

전체 컬럼명을 바꾸는 방식은 데이터 구조를 정확히 알고 있을 때 사용하면 좋습니다.  
반면 일부 컬럼만 바꾸고 싶을 때는 \`rename()\`이 더 안전합니다.

---

## 9.2.4 컬럼명 공백과 대소문자 정리하기

실무 데이터에서는 컬럼명에 공백이 들어 있거나 대소문자가 섞여 있는 경우가 많습니다.

\`\`\`python
orders.columns
\`\`\`

컬럼명 전체를 규칙적으로 정리하려면 문자열 메서드를 사용할 수 있습니다.

다음 코드는 컬럼명을 모두 소문자로 바꾸고, 공백을 밑줄로 바꿉니다.

\`\`\`python
orders = pd.DataFrame({
    "Order ID": [1001, 1002],
    "Customer Name": ["민수", "지영"],
    "Order Date": ["2026-01-03", "2026-01-05"]
})

orders.columns = (
    orders.columns
    .str.strip()
    .str.lower()
    .str.replace(" ", "_")
)

orders
\`\`\`

실행 후 컬럼명은 다음과 같이 바뀝니다.

\`\`\`text
order_id
customer_name
order_date
\`\`\`

컬럼명 정리는 작은 작업처럼 보이지만, 분석 전체의 가독성을 크게 높여줍니다.

---

## 9.2.5 컬럼 이름 변경 시 주의할 점

컬럼 이름을 변경할 때는 다음을 확인해야 합니다.

- 새 컬럼명이 너무 짧거나 모호하지 않은가?
- 같은 이름의 컬럼이 생기지 않는가?
- 이후 코드에서 기존 컬럼명을 계속 사용하고 있지 않은가?
- 공백, 특수문자, 한글 컬럼명을 어떻게 처리할 것인가?
- 팀이나 프로젝트에서 사용하는 컬럼명 규칙이 있는가?

실무에서는 컬럼명을 자주 바꾸는 것보다, 분석 초기에 한 번 정리하고 그 규칙을 유지하는 것이 좋습니다.

---
`;export{e as default};