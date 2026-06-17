var e=`<!-- 원본: python_data_analysis_basic_chapter_9_book.md / 세부 장: 9-7 -->

# 9.7 행과 열 삭제

## 9.7.1 컬럼 삭제

분석에 필요 없는 컬럼은 삭제할 수 있습니다.

\`\`\`python
orders = orders.drop(columns=["shipping_label"])

orders
\`\`\`

여러 컬럼을 한 번에 삭제할 수도 있습니다.

\`\`\`python
orders = orders.drop(columns=["tax", "payment_amount"])
\`\`\`

단, 삭제하려는 컬럼이 실제로 존재하지 않으면 에러가 발생합니다.

삭제 전에 컬럼 목록을 확인하면 좋습니다.

\`\`\`python
orders.columns
\`\`\`

---

## 9.7.2 행 삭제

특정 인덱스의 행을 삭제할 수도 있습니다.

\`\`\`python
orders = orders.drop(index=0)

orders
\`\`\`

하지만 실무 분석에서는 인덱스 번호로 행을 삭제하기보다, 조건 필터링을 통해 필요한 행만 남기는 경우가 더 많습니다.

예를 들어 최종 결제 금액이 0보다 큰 행만 남길 수 있습니다.

\`\`\`python
orders = orders[orders["final_amount"] > 0]

orders
\`\`\`

조건으로 행을 걸러내는 방식은 삭제 기준이 코드에 명확히 드러난다는 장점이 있습니다.

---

## 9.7.3 삭제보다 선택을 먼저 생각하기

데이터 분석에서는 “무엇을 삭제할까?”보다 “무엇을 남길까?”를 먼저 생각하는 것이 좋습니다.

예를 들어 보고서에 필요한 컬럼만 선택할 수 있습니다.

\`\`\`python
report = orders[
    [
        "order_id",
        "customer_name",
        "category",
        "order_date",
        "final_amount",
        "order_grade"
    ]
]

report
\`\`\`

불필요한 컬럼을 하나씩 삭제하는 것보다, 필요한 컬럼을 명확히 선택하는 방식이 더 안전한 경우가 많습니다.

---
`;export{e as default};