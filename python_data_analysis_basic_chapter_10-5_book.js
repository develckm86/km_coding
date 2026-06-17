var e=`<!-- 원본: python_data_analysis_basic_chapter_10_book.md / 세부 장: 10-5 -->

# 10.5 결측치 대체하기

결측치를 제거하는 대신 다른 값으로 채울 수도 있습니다.  
pandas에서는 \`fillna()\`를 사용합니다.

\`\`\`python
orders_clean.fillna(0)
\`\`\`

하지만 모든 결측치를 0으로 채우는 것은 위험합니다.  
컬럼의 의미에 따라 적절한 값으로 채워야 합니다.

예를 들어 수량이 비어 있다고 해서 0으로 채우는 것이 항상 맞지는 않습니다.  
정말 주문 수량이 0인 것인지, 입력이 누락된 것인지 다르기 때문입니다.

---

### 10.5.1 고정값으로 채우기

문자열 컬럼에서는 결측치를 \`"미상"\` 또는 \`"미입력"\` 같은 값으로 채울 수 있습니다.

\`\`\`python
orders_filled = orders_clean.copy()

orders_filled["region"] = orders_filled["region"].fillna("미상")
orders_filled["category"] = orders_filled["category"].fillna("미분류")

orders_filled
\`\`\`

지역이나 카테고리처럼 범주형 데이터에서는 결측치를 별도 범주로 두는 방식이 자주 사용됩니다.

예를 들어 지역이 없는 고객을 삭제하지 않고 \`"미상"\` 지역으로 분류할 수 있습니다.

---

### 10.5.2 숫자 컬럼을 0으로 채우기

숫자 컬럼은 상황에 따라 0으로 채울 수 있습니다.

\`\`\`python
orders_filled["quantity"] = orders_filled["quantity"].fillna(0)
\`\`\`

하지만 0으로 채우기 전에 반드시 의미를 확인해야 합니다.

예를 들어 다음 두 상황은 다릅니다.

| 상황 | 0으로 채워도 되는가? |
|---|---|
| 쿠폰 사용 금액이 비어 있음 | 사용하지 않았다는 의미라면 0 가능 |
| 주문 수량이 비어 있음 | 입력 누락일 수 있으므로 신중해야 함 |
| 재고 수량이 비어 있음 | 재고가 0인지 알 수 없으므로 신중해야 함 |
| 배송비가 비어 있음 | 무료배송이면 0 가능, 누락이면 신중해야 함 |

숫자 결측치를 무조건 0으로 채우면 평균, 합계, 비율 계산이 왜곡될 수 있습니다.

---

### 10.5.3 평균으로 채우기

수치형 데이터에서 결측치를 평균으로 채우는 방법도 있습니다.

\`\`\`python
mean_price = orders_clean["unit_price"].mean()

orders_filled["unit_price"] = orders_filled["unit_price"].fillna(mean_price)
\`\`\`

평균으로 채우는 방식은 전체적인 평균 수준을 유지하려는 목적이 있습니다.  
하지만 이상값이 있는 데이터에서는 평균이 크게 흔들릴 수 있습니다.

예를 들어 대부분 상품 가격이 1만 원에서 5만 원 사이인데, 일부 상품이 300만 원이라면 평균이 실제 일반적인 가격보다 높아질 수 있습니다.

---

### 10.5.4 중앙값으로 채우기

중앙값은 데이터를 크기순으로 정렬했을 때 가운데에 있는 값입니다.  
이상값의 영향을 평균보다 덜 받습니다.

\`\`\`python
median_price = orders_clean["unit_price"].median()

orders_filled["unit_price"] = orders_filled["unit_price"].fillna(median_price)
\`\`\`

금액, 소득, 주문 수량처럼 한쪽으로 크게 치우칠 수 있는 데이터에서는 평균보다 중앙값이 더 적절할 때가 많습니다.

---

### 10.5.5 최빈값으로 채우기

범주형 데이터에서는 가장 많이 등장한 값, 즉 최빈값으로 결측치를 채울 수 있습니다.

\`\`\`python
most_common_region = orders_clean["region"].mode()[0]

orders_filled["region"] = orders_filled["region"].fillna(most_common_region)
\`\`\`

\`mode()\`는 최빈값을 Series 형태로 반환합니다.  
따라서 첫 번째 값을 사용하려면 \`[0]\`을 붙입니다.

하지만 최빈값으로 채우면 가장 많은 범주가 더 많아지는 효과가 생깁니다.  
결측치가 많다면 데이터 분포가 왜곡될 수 있으므로 주의해야 합니다.

---

### 10.5.6 컬럼별로 다른 값 채우기

여러 컬럼을 한 번에 다른 값으로 채울 수도 있습니다.

\`\`\`python
orders_filled = orders_clean.fillna({
    "customer": "이름없음",
    "region": "미상",
    "category": "미분류",
    "quantity": 0
})

orders_filled
\`\`\`

딕셔너리를 사용하면 컬럼별로 다른 대체값을 지정할 수 있습니다.

이 방식은 실무에서 자주 사용됩니다.  
왜냐하면 컬럼마다 결측치의 의미가 다르기 때문입니다.

---
`;export{e as default};