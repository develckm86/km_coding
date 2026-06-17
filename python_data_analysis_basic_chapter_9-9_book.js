var e=`<!-- 원본: python_data_analysis_basic_chapter_9_book.md / 세부 장: 9-9 -->

# 9.9 데이터 수정 시 자주 하는 실수

## 9.9.1 원본 데이터를 바로 덮어쓰는 실수

분석 초반에는 원본 데이터를 바로 수정하기보다 복사본을 만드는 것이 안전합니다.

\`\`\`python
orders = raw_orders.copy()
\`\`\`

원본을 보존해두면 중간에 실수해도 다시 시작할 수 있습니다.

---

## 9.9.2 타입 변환 전에 값을 확인하지 않는 실수

숫자형으로 바꾸기 전에 값에 쉼표, 공백, 문자 등이 섞여 있는지 확인해야 합니다.

\`\`\`python
df["price"].unique()
\`\`\`

값을 확인하지 않고 바로 변환하면 에러가 발생하거나 잘못된 결과가 나올 수 있습니다.

---

## 9.9.3 조건 순서를 잘못 작성하는 실수

여러 조건으로 등급을 만들 때는 조건 순서가 중요합니다.

잘못된 예:

\`\`\`python
conditions = [
    orders["final_amount"] >= 50000,
    orders["final_amount"] >= 100000,
    orders["final_amount"] >= 200000
]
\`\`\`

이렇게 작성하면 200000원 이상인 값도 먼저 50000원 이상 조건에 걸릴 수 있습니다.

올바른 예:

\`\`\`python
conditions = [
    orders["final_amount"] >= 200000,
    orders["final_amount"] >= 100000,
    orders["final_amount"] >= 50000
]
\`\`\`

큰 기준부터 작성하면 의도한 등급을 만들기 쉽습니다.

---

## 9.9.4 \`loc\` 없이 조건 수정하는 실수

다음과 같은 코드는 피하는 것이 좋습니다.

\`\`\`python
orders[orders["final_amount"] >= 100000]["order_grade"] = "High"
\`\`\`

조건에 맞는 값을 수정할 때는 \`loc\`를 사용합니다.

\`\`\`python
orders.loc[orders["final_amount"] >= 100000, "order_grade"] = "High"
\`\`\`

---

## 9.9.5 파생 변수를 만든 뒤 검산하지 않는 실수

파생 변수를 만들었다면 몇 개 행을 직접 확인해야 합니다.

\`\`\`python
orders[["price", "quantity", "order_amount"]].head()
\`\`\`

예를 들어 \`order_amount\`가 \`price * quantity\`로 제대로 계산되었는지 확인합니다.

\`\`\`python
orders[["order_amount", "discount_rate", "discount_amount", "final_amount"]].head()
\`\`\`

데이터 수정 후에는 반드시 결과를 확인하는 습관이 필요합니다.

---
`;export{e as default};