var e=`<!-- 원본: python_data_analysis_basic_chapter_5_book.md / 세부 장: 5-4 -->

# 5.4 데이터 저장하기

## 5.4.1 저장이 중요한 이유

데이터 분석은 불러오기만으로 끝나지 않는다. 분석 과정에서 정리한 데이터, 계산한 결과, 보고서용 요약표를 다시 파일로 저장해야 한다.

예를 들어 다음과 같은 상황이 있다.

- 원본 CSV에서 필요한 컬럼만 골라 새 CSV로 저장한다.
- 결측치와 중복값을 정리한 데이터를 Excel로 저장한다.
- API에서 받은 데이터를 JSON으로 저장한다.
- 분석 결과를 다른 사람에게 전달하기 위해 Excel 파일로 저장한다.

데이터를 저장할 때는 다음을 신경 써야 한다.

- 어떤 파일 형식으로 저장할 것인가?
- 인덱스를 저장할 것인가?
- 한글이 깨지지 않도록 인코딩을 어떻게 할 것인가?
- 저장 위치는 어디인가?
- 기존 파일을 덮어써도 되는가?

---

## 5.4.2 CSV로 저장하기

DataFrame을 CSV 파일로 저장할 때는 \`to_csv()\`를 사용한다.

\`\`\`python
import pandas as pd

orders = pd.read_csv("orders.csv")
orders["total"] = orders["quantity"] * orders["price"]

orders.to_csv("orders_with_total.csv", index=False, encoding="utf-8-sig")
\`\`\`

위 코드는 \`orders.csv\`를 불러온 뒤 \`total\` 컬럼을 추가하고, 결과를 \`orders_with_total.csv\`로 저장한다.

저장된 파일은 다음과 비슷한 구조를 가진다.

\`\`\`csv
order_id,customer,product,quantity,price,order_date,total
1001,김민수,노트북,1,1200000,2026-01-03,1200000
1002,이지영,마우스,2,25000,2026-01-04,50000
\`\`\`

\`index=False\`를 사용하지 않으면 DataFrame의 인덱스가 첫 번째 컬럼으로 함께 저장된다.

\`\`\`python
orders.to_csv("orders_with_index.csv", encoding="utf-8-sig")
\`\`\`

이렇게 저장하면 파일에 다음처럼 불필요한 인덱스 컬럼이 들어갈 수 있다.

\`\`\`csv
,order_id,customer,product,quantity,price,order_date,total
0,1001,김민수,노트북,1,1200000,2026-01-03,1200000
1,1002,이지영,마우스,2,25000,2026-01-04,50000
\`\`\`

특별한 이유가 없다면 분석 결과를 CSV로 저장할 때는 \`index=False\`를 자주 사용한다.

---

## 5.4.3 Excel로 저장하기

DataFrame을 Excel 파일로 저장할 때는 \`to_excel()\`을 사용한다.

\`\`\`python
orders.to_excel("orders_with_total.xlsx", index=False)
\`\`\`

Excel 파일로 저장하면 비개발자와 결과를 공유하기 편하다. 특히 실무에서는 CSV보다 Excel 파일을 선호하는 경우가 많다.

여러 DataFrame을 하나의 Excel 파일에 여러 시트로 저장할 수도 있다.

\`\`\`python
customers = pd.read_excel("customers.xlsx")
orders = pd.read_csv("orders.csv")
orders["total"] = orders["quantity"] * orders["price"]

with pd.ExcelWriter("analysis_result.xlsx") as writer:
    customers.to_excel(writer, sheet_name="customers", index=False)
    orders.to_excel(writer, sheet_name="orders", index=False)
\`\`\`

위 코드는 \`analysis_result.xlsx\` 파일을 만들고, 그 안에 \`customers\` 시트와 \`orders\` 시트를 저장한다.

Excel 저장은 편리하지만 CSV보다 파일 구조가 복잡하고 저장 속도가 느릴 수 있다. 분석 중간 데이터는 CSV로 저장하고, 최종 공유용 결과는 Excel로 저장하는 방식도 자주 사용된다.

---

## 5.4.4 JSON으로 저장하기

DataFrame을 JSON 파일로 저장할 때는 \`to_json()\`을 사용한다.

\`\`\`python
customers = pd.read_excel("customers.xlsx")

customers.to_json(
    "customers_output.json",
    orient="records",
    force_ascii=False,
    indent=2
)
\`\`\`

저장된 JSON은 다음과 비슷하다.

\`\`\`json
[
  {
    "customer_id": 1,
    "name": "김민수",
    "grade": "VIP",
    "region": "서울"
  },
  {
    "customer_id": 2,
    "name": "이지영",
    "grade": "BASIC",
    "region": "부산"
  }
]
\`\`\`

\`to_json()\`을 사용할 때 자주 보는 옵션은 다음과 같다.

| 옵션 | 의미 |
|---|---|
| \`orient="records"\` | 행 단위 객체 리스트 형태로 저장 |
| \`force_ascii=False\` | 한글을 그대로 저장 |
| \`indent=2\` | 사람이 읽기 좋게 들여쓰기 |

JSON은 사람이 직접 열어볼 수도 있지만, 주로 프로그램끼리 데이터를 주고받을 때 많이 사용된다. API 응답을 저장하거나, 다른 시스템으로 데이터를 넘겨야 할 때 유용하다.

---

## 5.4.5 저장 전 확인해야 할 것

파일을 저장하기 전에 다음을 확인하는 습관을 들이는 것이 좋다.

\`\`\`python
print(orders.head())
print(orders.shape)
print(orders.dtypes)
\`\`\`

저장 전 확인할 항목은 다음과 같다.

- 행 개수가 예상과 맞는가?
- 컬럼 개수가 예상과 맞는가?
- 컬럼명이 올바른가?
- 불필요한 컬럼이 포함되어 있지 않은가?
- 숫자 컬럼이 숫자형으로 되어 있는가?
- 날짜 컬럼이 의도한 형식인가?
- 저장 경로가 올바른가?
- 기존 파일을 덮어써도 되는가?

실무에서는 파일 저장 코드 한 줄보다 저장 전 확인이 더 중요할 때가 많다. 잘못된 결과를 저장하고 공유하면 이후 업무에 혼란이 생길 수 있기 때문이다.

---
`;export{e as default};