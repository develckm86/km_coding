var e=`<!-- 원본: python_data_analysis_basic_chapter_7_book.md / 세부 장: 7-8 -->

# 7.8 실무 미니 프로젝트: 분석 대상 주문 추출하기

## 문제 상황

쇼핑몰 주문 데이터에서 분석 대상 주문만 추출하려고 합니다.

분석 대상 조건은 다음과 같습니다.

1. 주문 상태가 \`완료\`이다.
2. 지역이 \`서울\` 또는 \`부산\`이다.
3. 총 주문 금액이 30,000원 이상이다.
4. 전화번호가 비어 있지 않다.

최종 결과에는 다음 컬럼만 남깁니다.

- \`order_id\`
- \`customer_name\`
- \`region\`
- \`product\`
- \`total_price\`
- \`phone\`

---

## 1단계: 조건 만들기

\`\`\`python
is_completed = orders["order_status"] == "완료"
is_target_region = orders["region"].isin(["서울", "부산"])
is_enough_price = orders["total_price"] >= 30000
has_phone = orders["phone"].notna() & (orders["phone"] != "")
\`\`\`

조건을 한 줄에 모두 쓰지 않고 변수로 분리했습니다. 이렇게 하면 각각의 조건이 무엇을 의미하는지 쉽게 알 수 있습니다.

---

## 2단계: 조건 결합하기

\`\`\`python
condition = is_completed & is_target_region & is_enough_price & has_phone
\`\`\`

모든 조건을 만족해야 하므로 \`&\`를 사용합니다.

---

## 3단계: 필요한 컬럼 목록 만들기

\`\`\`python
columns = ["order_id", "customer_name", "region", "product", "total_price", "phone"]
\`\`\`

분석 결과에 필요한 컬럼만 남기기 위해 컬럼 목록을 따로 만듭니다.

---

## 4단계: 최종 데이터 추출하기

\`\`\`python
target_orders = orders.loc[condition, columns]

target_orders
\`\`\`

이제 \`target_orders\`에는 분석 대상 주문만 남습니다.

---

## 5단계: 결과 확인하기

\`\`\`python
target_orders.shape
\`\`\`

행과 열 개수를 확인합니다.

\`\`\`python
target_orders.head()
\`\`\`

추출 결과가 예상과 맞는지 일부 데이터를 확인합니다.

---

## 코드 전체

\`\`\`python
import pandas as pd

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006, 1007],
    "customer_name": ["김민수", "이지은", "박서준", "최유리", "정다은", "홍길동", "오하나"],
    "region": ["서울", "부산", "서울", "대구", "서울", "부산", "서울"],
    "category": ["전자제품", "생활용품", "전자제품", "식품", "생활용품", "식품", "전자제품"],
    "product": ["키보드", "세제", "모니터", "커피", "수건", "라면", "마우스"],
    "quantity": [2, 5, 1, 10, 3, 20, 4],
    "unit_price": [30000, 7000, 200000, 1200, 8000, 900, 15000],
    "order_status": ["완료", "완료", "취소", "완료", "대기", "완료", "완료"],
    "phone": ["010-1111-2222", "010-2222-3333", None, "010-4444-5555", "", "010-6666-7777", "010-7777-8888"]
})

orders["total_price"] = orders["quantity"] * orders["unit_price"]

is_completed = orders["order_status"] == "완료"
is_target_region = orders["region"].isin(["서울", "부산"])
is_enough_price = orders["total_price"] >= 30000
has_phone = orders["phone"].notna() & (orders["phone"] != "")

condition = is_completed & is_target_region & is_enough_price & has_phone

columns = ["order_id", "customer_name", "region", "product", "total_price", "phone"]

target_orders = orders.loc[condition, columns]

target_orders
\`\`\`

---
`;export{e as default};