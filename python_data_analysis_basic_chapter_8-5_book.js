var e=`<!-- 원본: python_data_analysis_basic_chapter_8_book.md / 세부 장: 8-5 -->

# 8.5 순위 계산: \`rank()\`

정렬은 데이터를 순서대로 배치하는 작업입니다.  
반면 순위 계산은 각 행에 “몇 등인지”를 부여하는 작업입니다.

예를 들어 주문 금액 기준으로 순위를 매기면 다음과 같은 컬럼을 만들 수 있습니다.

\`\`\`text
주문 금액 300000 → 1등
주문 금액 160000 → 3등
주문 금액 60000  → 4등
\`\`\`

pandas에서는 \`rank()\`를 사용해 순위를 계산합니다.

---

### 8.5.1 기본 순위 계산

\`total_price\` 기준으로 순위를 계산해봅시다.

\`\`\`python
orders["price_rank"] = orders["total_price"].rank()

orders
\`\`\`

기본 설정에서는 작은 값이 1등입니다.  
즉, 오름차순 기준으로 순위가 매겨집니다.

하지만 매출이나 주문 금액 분석에서는 보통 큰 값이 1등이어야 합니다.  
이때는 \`ascending=False\`를 사용합니다.

\`\`\`python
orders["price_rank"] = orders["total_price"].rank(ascending=False)

orders
\`\`\`

이제 \`total_price\`가 큰 주문일수록 더 높은 순위를 갖습니다.

---

### 8.5.2 순위는 기본적으로 실수로 표시된다

\`rank()\` 결과는 보통 \`1.0\`, \`2.0\`, \`3.0\`처럼 실수 형태로 나옵니다.

\`\`\`python
orders["total_price"].rank(ascending=False)
\`\`\`

그 이유는 동점자가 있을 때 평균 순위를 부여할 수 있기 때문입니다.

예를 들어 주문 금액이 같은 데이터가 두 개 있고, 이들이 1등과 2등 자리를 함께 차지한다면 기본 방식에서는 두 행 모두 \`1.5\`등이 됩니다.

---

### 8.5.3 동점자 처리 방식

\`rank()\`에서 가장 중요한 부분은 동점자 처리입니다.

\`method\` 인자를 사용하면 동점자 순위를 어떻게 매길지 정할 수 있습니다.

\`\`\`python
orders["rank_average"] = orders["total_price"].rank(
    ascending=False,
    method="average"
)
\`\`\`

주요 방식은 다음과 같습니다.

| method | 의미 |
|---|---|
| \`"average"\` | 동점자의 평균 순위 부여 |
| \`"min"\` | 동점자에게 가장 높은 순위 번호 부여 |
| \`"max"\` | 동점자에게 가장 낮은 순위 번호 부여 |
| \`"first"\` | 데이터에 등장한 순서대로 순위 부여 |
| \`"dense"\` | 동점자는 같은 순위, 다음 순위는 바로 다음 번호 |

말만 보면 헷갈릴 수 있으므로 예제로 확인해봅시다.

\`\`\`python
scores = pd.DataFrame({
    "name": ["A", "B", "C", "D"],
    "score": [100, 90, 90, 80]
})

scores
\`\`\`

내림차순으로 순위를 매겨보겠습니다.

\`\`\`python
scores["rank_average"] = scores["score"].rank(ascending=False, method="average")
scores["rank_min"] = scores["score"].rank(ascending=False, method="min")
scores["rank_max"] = scores["score"].rank(ascending=False, method="max")
scores["rank_first"] = scores["score"].rank(ascending=False, method="first")
scores["rank_dense"] = scores["score"].rank(ascending=False, method="dense")

scores
\`\`\`

결과를 개념적으로 정리하면 다음과 같습니다.

| 이름 | 점수 | average | min | max | first | dense |
|---|---:|---:|---:|---:|---:|---:|
| A | 100 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 |
| B | 90 | 2.5 | 2.0 | 3.0 | 2.0 | 2.0 |
| C | 90 | 2.5 | 2.0 | 3.0 | 3.0 | 2.0 |
| D | 80 | 4.0 | 4.0 | 4.0 | 4.0 | 3.0 |

실무에서는 상황에 따라 적절한 방식을 선택해야 합니다.

- 스포츠 경기처럼 공동 2등 다음을 4등으로 둘 수 있다면 \`min\`
- 동점자를 같은 순위로 묶고 다음 순위를 바로 이어가려면 \`dense\`
- 입력 순서가 의미가 있다면 \`first\`
- 통계적 평균 순위가 필요하다면 \`average\`

일반적인 매출 순위표에서는 \`dense\`를 사용하면 보기 편한 경우가 많습니다.

\`\`\`python
orders["price_rank"] = orders["total_price"].rank(
    ascending=False,
    method="dense"
)
\`\`\`

---

### 8.5.4 순위를 정수로 변환하기

순위 결과가 \`1.0\`, \`2.0\`처럼 보이는 것이 어색할 수 있습니다.  
동점자 처리 방식으로 \`dense\`나 \`min\`을 사용하면 순위를 정수로 변환할 수 있습니다.

\`\`\`python
orders["price_rank"] = orders["total_price"].rank(
    ascending=False,
    method="dense"
).astype(int)

orders
\`\`\`

다만 \`average\` 방식은 \`2.5\` 같은 값이 나올 수 있으므로 무조건 정수로 바꾸면 의미가 왜곡될 수 있습니다.

---

### 8.5.5 순위 기준 정렬하기

순위 컬럼을 만든 뒤에는 그 순위 컬럼을 기준으로 다시 정렬할 수 있습니다.

\`\`\`python
orders["price_rank"] = orders["total_price"].rank(
    ascending=False,
    method="dense"
).astype(int)

orders.sort_values(by="price_rank")
\`\`\`

이렇게 하면 순위가 높은 데이터부터 볼 수 있습니다.

사실 \`total_price\` 자체를 내림차순 정렬해도 비슷하게 볼 수 있지만, 순위 컬럼을 추가하면 보고서 형태로 정리하기 좋습니다.

---

### 8.5.6 백분위 순위

\`rank()\`에는 \`pct=True\` 옵션이 있습니다.  
이 옵션을 사용하면 순위를 비율 형태로 계산합니다.

\`\`\`python
orders["price_rank_pct"] = orders["total_price"].rank(
    ascending=False,
    pct=True
)

orders
\`\`\`

백분위 순위는 전체 데이터에서 상대적인 위치를 보고 싶을 때 사용합니다.

예를 들어 고객 구매 금액 데이터에서 상위 10% 고객을 구분하거나, 점수 데이터에서 상대적 위치를 판단할 때 사용할 수 있습니다.

기초 과정에서는 백분위 순위를 깊게 다루지 않습니다.  
다만 \`rank()\`가 단순한 등수뿐 아니라 상대적 위치를 계산하는 데도 쓰일 수 있다는 점만 기억하면 됩니다.

---
`;export{e as default};