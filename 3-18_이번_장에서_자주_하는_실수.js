var e=`# 3장. 데이터 품질 진단 리포트 만들기

## 3.18 이번 장에서 자주 하는 실수

데이터 품질 진단 과정에서 자주 하는 실수를 정리합니다.

---

### 3.18.1 결측치 개수만 보고 비율을 보지 않는 실수

결측치 10개가 항상 큰 문제는 아닙니다.  
전체가 100행이면 10%이고, 전체가 100만 행이면 0.001%입니다.

따라서 결측치 개수와 비율을 함께 봐야 합니다.

\`\`\`python
df.isna().sum()
df.isna().mean() * 100
\`\`\`

---

### 3.18.2 전체 행 중복만 확인하는 실수

다음 코드는 전체 행이 완전히 같은 중복만 확인합니다.

\`\`\`python
df.duplicated().sum()
\`\`\`

하지만 실무에서는 key 기준 중복이 더 중요할 때가 많습니다.

\`\`\`python
orders.duplicated(subset=["order_id"]).sum()
customers.duplicated(subset=["customer_id"]).sum()
products.duplicated(subset=["product_id"]).sum()
\`\`\`

---

### 3.18.3 기준표 key 중복을 확인하지 않고 merge하는 실수

고객 데이터나 상품 데이터에 key 중복이 있으면 결합 후 행 수가 늘어날 수 있습니다.

\`\`\`python
customers["customer_id"].is_unique
products["product_id"].is_unique
\`\`\`

결합 전 key 유일성을 반드시 확인해야 합니다.

---

### 3.18.4 key 매칭 실패를 확인하지 않는 실수

\`merge()\` 후 결측치가 생겼다면 매칭 실패가 있었을 수 있습니다.

품질 진단 단계에서 미리 확인해야 합니다.

\`\`\`python
set(orders["product_id"]) - set(products["product_id"])
\`\`\`

---

### 3.18.5 날짜 변환 실패를 그냥 지나치는 실수

\`errors="coerce"\`를 사용하면 오류가 나지 않지만, 실패한 값은 \`NaT\`가 됩니다.

\`\`\`python
df["date"] = pd.to_datetime(df["date"], errors="coerce")
\`\`\`

이후 반드시 실패한 행을 확인해야 합니다.

\`\`\`python
df[df["date"].isna()]
\`\`\`

---

### 3.18.6 이상값을 무조건 삭제하는 실수

IQR 기준 이상값 후보는 검토 대상입니다.  
정상적인 고가 주문일 수도 있습니다.

이상값은 다음 중 하나로 처리해야 합니다.

\`\`\`text
원본 확인 후 수정
분석에서 제외
별도 표시
그대로 유지
포함/제외 결과 비교
\`\`\`

---

### 3.18.7 품질 진단 결과를 문서화하지 않는 실수

품질 문제를 코드로만 확인하고 문서화하지 않으면 나중에 처리 기준을 설명하기 어렵습니다.

품질 진단 결과는 반드시 표와 보고서로 남기는 것이 좋습니다.

---
`;export{e as default};