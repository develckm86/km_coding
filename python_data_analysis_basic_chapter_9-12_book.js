var e=`<!-- 원본: python_data_analysis_basic_chapter_9_book.md / 세부 장: 9-12 -->

# 9.12 정답 및 해설

## 문제 1 정답

정답: B

\`rename()\`은 행 또는 컬럼의 이름을 변경할 때 사용하는 메서드입니다.

---

## 문제 2 정답

정답: B

파생 변수는 기존 데이터에서 계산하거나 조건을 적용해서 새롭게 만든 변수입니다.  
예를 들어 \`price * quantity\`로 만든 \`total_price\`는 파생 변수입니다.

---

## 문제 3 정답

\`\`\`python
df = df.rename(columns={
    "Customer Name": "customer_name"
})
\`\`\`

\`columns\` 인자에 기존 컬럼명과 새 컬럼명을 딕셔너리로 전달합니다.

---

## 문제 4 정답

\`\`\`python
df["total_price"] = df["price"] * df["quantity"]
\`\`\`

기존 두 컬럼을 곱해 새 컬럼을 만들었습니다.

---

## 문제 5 정답

\`\`\`python
df["region"] = df["region"].replace("SEOUL", "Seoul")
\`\`\`

특정 값을 다른 값으로 바꿀 때는 \`replace()\`를 사용할 수 있습니다.

---

## 문제 6 정답

\`\`\`python
df["is_high_sales"] = df["sales"] >= 100000
\`\`\`

비교 연산의 결과는 \`True\` 또는 \`False\`가 됩니다.  
따라서 이 결과를 그대로 새 컬럼에 저장할 수 있습니다.

---

## 문제 7 정답

\`\`\`python
df["order_date"] = pd.to_datetime(df["order_date"])
\`\`\`

문자열로 저장된 날짜를 날짜형으로 변환할 때는 \`pd.to_datetime()\`을 사용합니다.

---

## 문제 8 정답

\`\`\`python
df["price"] = df["price"].astype(int)
\`\`\`

모든 값이 숫자로 변환 가능하다면 \`astype(int)\`를 사용할 수 있습니다.

또는 다음과 같이 작성할 수도 있습니다.

\`\`\`python
df["price"] = pd.to_numeric(df["price"])
\`\`\`

---

## 문제 9 정답

\`\`\`python
import numpy as np

conditions = [
    df["score"] >= 90,
    df["score"] >= 80
]

choices = ["A", "B"]

df["grade"] = np.select(
    conditions,
    choices,
    default="C"
)
\`\`\`

조건은 높은 기준부터 작성하는 것이 안전합니다.  
95점은 \`"A"\`, 85점은 \`"B"\`, 70점은 \`"C"\`가 됩니다.

---

## 문제 10 정답

\`\`\`python
orders["order_amount"] = orders["price"] * orders["quantity"]

orders["discount_amount"] = (
    orders["order_amount"] * orders["discount_rate"]
)

orders["final_amount"] = (
    orders["order_amount"] - orders["discount_amount"]
)

orders["free_shipping"] = orders["final_amount"] >= 50000

orders
\`\`\`

각 컬럼의 의미는 다음과 같습니다.

| 컬럼명 | 의미 |
|---|---|
| \`order_amount\` | 할인 전 주문 금액 |
| \`discount_amount\` | 할인 금액 |
| \`final_amount\` | 최종 결제 금액 |
| \`free_shipping\` | 무료배송 여부 |

---
`;export{e as default};