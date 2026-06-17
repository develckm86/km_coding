var e=`<!-- 원본: python_data_analysis_basic_chapter_11_book.md / 세부 장: 11-8 -->

# 11.8 이상값 처리 방법

이상값을 찾았다고 해서 바로 제거하면 안 됩니다.  
이상값 처리는 분석 목적과 데이터 의미에 따라 결정해야 합니다.

대표적인 처리 방법은 다음과 같습니다.

- 제거하기
- 대체하기
- 상한/하한으로 제한하기
- 별도 표시하기
- 유지하기

---

### 11.8.1 이상값 제거하기

명백한 오류라면 이상값을 제거할 수 있습니다.

예를 들어 주문 수량이 음수라면 오류일 가능성이 큽니다.

\`\`\`python
orders_valid = orders[orders["quantity"] >= 0]
\`\`\`

IQR 기준으로 이상값 후보를 제거할 수도 있습니다.

\`\`\`python
q1 = orders["total_price"].quantile(0.25)
q3 = orders["total_price"].quantile(0.75)
iqr = q3 - q1

lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

orders_without_outliers = orders[
    (orders["total_price"] >= lower_bound) &
    (orders["total_price"] <= upper_bound)
]

orders_without_outliers
\`\`\`

하지만 이 방법은 주의해야 합니다.  
실제로 중요한 고액 주문이 제거될 수 있기 때문입니다.

이상값 제거는 다음 경우에 적합할 수 있습니다.

- 명백한 입력 오류
- 분석 목적과 무관한 값
- 시스템 오류로 생성된 값
- 극단값이 분석 결과를 크게 왜곡하는 경우
- 원본 확인 결과 잘못된 값으로 판단된 경우

---

### 11.8.2 이상값 대체하기

이상값을 제거하지 않고 다른 값으로 대체할 수도 있습니다.

예를 들어 음수 수량은 결측치로 바꾼 뒤 별도 처리할 수 있습니다.

\`\`\`python
orders_fixed = orders.copy()

orders_fixed.loc[orders_fixed["quantity"] < 0, "quantity"] = pd.NA
\`\`\`

명백한 입력 오류라면 올바른 값으로 수정할 수도 있습니다.  
다만 이 경우에는 원본 데이터나 업무 기준을 확인해야 합니다.

\`\`\`text
5,000,000원이 실제 가격인가?
500,000원을 잘못 입력한 것인가?
50,000원을 잘못 입력한 것인가?
\`\`\`

정확한 근거 없이 임의로 값을 고치면 안 됩니다.

---

### 11.8.3 상한과 하한으로 제한하기

극단값을 특정 범위 안으로 제한하는 방식도 있습니다.

예를 들어 주문 금액이 상한값을 넘으면 상한값으로 바꿀 수 있습니다.

\`\`\`python
orders_capped = orders.copy()

orders_capped["total_price_capped"] = orders_capped["total_price"].clip(
    lower=lower_bound,
    upper=upper_bound
)

orders_capped[["total_price", "total_price_capped"]]
\`\`\`

\`clip()\`은 값이 하한보다 작으면 하한으로, 상한보다 크면 상한으로 바꿉니다.

이 방식은 머신러닝 전처리나 통계 분석에서 사용될 수 있습니다.  
하지만 기초 분석 보고서에서는 원본 값을 바꾸기보다 이상값 여부를 표시하는 방식이 더 이해하기 쉬울 때가 많습니다.

---

### 11.8.4 이상값 여부 컬럼 만들기

이상값을 제거하지 않고 표시만 할 수도 있습니다.

\`\`\`python
orders_flagged = orders.copy()

orders_flagged["is_outlier_total_price"] = (
    (orders_flagged["total_price"] < lower_bound) |
    (orders_flagged["total_price"] > upper_bound)
)

orders_flagged
\`\`\`

이 방식은 원본 데이터를 유지하면서 이상값 후보를 따로 관리할 수 있습니다.

이상값 여부 컬럼은 다음과 같은 경우에 유용합니다.

- 이상값을 제거하지 않고 보고서에서 따로 설명하고 싶을 때
- 이상값 포함 분석과 제외 분석을 비교하고 싶을 때
- 나중에 업무 담당자가 검토할 수 있도록 표시하고 싶을 때

---

### 11.8.5 이상값 유지하기

이상값이 실제로 의미 있는 값이라면 그대로 유지해야 합니다.

예를 들어 다음과 같은 경우입니다.

\`\`\`text
VIP 고객의 고액 구매
기업 고객의 대량 주문
특별 이벤트 기간의 폭발적 매출
희귀하지만 실제 가능한 센서 값
\`\`\`

이상값을 유지할 때는 보고서에 설명을 남기는 것이 좋습니다.

\`\`\`text
주문 금액 5,000,000원은 이상값 후보로 탐지되었지만,
원본 주문 내역 확인 결과 실제 고가 상품 주문으로 확인되어 분석에 포함했다.
\`\`\`

분석에서 중요한 것은 값을 기계적으로 삭제하는 것이 아니라, 데이터의 맥락을 이해하는 것입니다.

---
`;export{e as default};