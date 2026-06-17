var e=`<!-- 원본: python_data_analysis_basic_chapter_5_book.md / 세부 장: 5-6 -->

# 5.6 실무 예제: 주문 데이터를 불러오고 결과 저장하기

이제 CSV 파일을 불러오고, 간단한 계산을 한 뒤, 결과를 새 파일로 저장하는 흐름을 만들어 보자.

## 5.6.1 실습 목표

이번 실습의 목표는 다음과 같다.

\`\`\`text
1. 주문 CSV 파일을 불러온다.
2. 데이터 구조를 확인한다.
3. 주문 금액 total 컬럼을 추가한다.
4. 필요한 컬럼만 선택한다.
5. 결과를 CSV와 Excel 파일로 저장한다.
\`\`\`

---

## 5.6.2 실습 데이터 만들기

\`\`\`python
import pandas as pd
from pathlib import Path

RAW_DIR = Path("data/raw")
RAW_DIR.mkdir(parents=True, exist_ok=True)

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006],
    "customer": ["김민수", "이지영", "박철수", "최유진", "정다은", "한지훈"],
    "product": ["노트북", "마우스", "키보드", "모니터", "마우스", "노트북"],
    "category": ["PC", "ACC", "ACC", "MONITOR", "ACC", "PC"],
    "quantity": [1, 2, 1, 1, 3, 1],
    "price": [1200000, 25000, 45000, 300000, 25000, 1150000],
    "order_date": ["2026-01-03", "2026-01-04", "2026-01-05", "2026-01-05", "2026-01-06", "2026-01-07"],
})

orders.to_csv(RAW_DIR / "orders.csv", index=False, encoding="utf-8-sig")
\`\`\`

---

## 5.6.3 데이터 불러오기

\`\`\`python
import pandas as pd
from pathlib import Path

RAW_DIR = Path("data/raw")
orders_path = RAW_DIR / "orders.csv"

orders = pd.read_csv(orders_path, encoding="utf-8-sig")
\`\`\`

---

## 5.6.4 데이터 구조 확인하기

\`\`\`python
print(orders.head())
print(orders.shape)
print(orders.columns)
print(orders.dtypes)
\`\`\`

출력 결과를 통해 다음을 확인한다.

- 데이터가 제대로 불러와졌는가?
- 행과 열 개수는 예상과 맞는가?
- 컬럼명이 올바른가?
- \`quantity\`와 \`price\`가 숫자형인가?
- \`order_date\`는 어떤 자료형인가?

---

## 5.6.5 주문 금액 컬럼 추가하기

\`\`\`python
orders["total"] = orders["quantity"] * orders["price"]
print(orders.head())
\`\`\`

\`total\` 컬럼은 수량과 단가를 곱한 값이다. 9장에서 파생 변수를 더 자세히 다루지만, 지금은 간단한 계산 컬럼을 추가하는 정도만 익히면 된다.

---

## 5.6.6 필요한 컬럼만 선택하기

\`\`\`python
result = orders[[
    "order_id",
    "customer",
    "product",
    "category",
    "quantity",
    "price",
    "total",
    "order_date",
]]

print(result)
\`\`\`

컬럼 순서를 원하는 형태로 정리하면 결과 파일을 다른 사람이 보기 쉬워진다.

---

## 5.6.7 결과 저장하기

\`\`\`python
PROCESSED_DIR = Path("data/processed")
PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

result.to_csv(PROCESSED_DIR / "orders_result.csv", index=False, encoding="utf-8-sig")
result.to_excel(PROCESSED_DIR / "orders_result.xlsx", index=False)
\`\`\`

실행 후 다음 파일이 생성된다.

\`\`\`text
data/processed/orders_result.csv
data/processed/orders_result.xlsx
\`\`\`

CSV 파일은 분석 도구와 연동하기 좋고, Excel 파일은 사람에게 공유하기 좋다. 둘 중 하나만 저장해도 되지만, 수업에서는 두 형식을 모두 경험해 보는 것이 좋다.

---

## 5.6.8 전체 코드

지금까지의 실습을 하나의 코드로 정리하면 다음과 같다.

\`\`\`python
import pandas as pd
from pathlib import Path

RAW_DIR = Path("data/raw")
PROCESSED_DIR = Path("data/processed")

RAW_DIR.mkdir(parents=True, exist_ok=True)
PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

# 1. 실습 데이터 생성
orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005, 1006],
    "customer": ["김민수", "이지영", "박철수", "최유진", "정다은", "한지훈"],
    "product": ["노트북", "마우스", "키보드", "모니터", "마우스", "노트북"],
    "category": ["PC", "ACC", "ACC", "MONITOR", "ACC", "PC"],
    "quantity": [1, 2, 1, 1, 3, 1],
    "price": [1200000, 25000, 45000, 300000, 25000, 1150000],
    "order_date": ["2026-01-03", "2026-01-04", "2026-01-05", "2026-01-05", "2026-01-06", "2026-01-07"],
})

orders.to_csv(RAW_DIR / "orders.csv", index=False, encoding="utf-8-sig")

# 2. 데이터 불러오기
orders = pd.read_csv(RAW_DIR / "orders.csv", encoding="utf-8-sig")

# 3. 데이터 구조 확인
print(orders.head())
print(orders.shape)
print(orders.dtypes)

# 4. 파생 컬럼 추가
orders["total"] = orders["quantity"] * orders["price"]

# 5. 필요한 컬럼 정리
result = orders[[
    "order_id",
    "customer",
    "product",
    "category",
    "quantity",
    "price",
    "total",
    "order_date",
]]

# 6. 결과 저장
result.to_csv(PROCESSED_DIR / "orders_result.csv", index=False, encoding="utf-8-sig")
result.to_excel(PROCESSED_DIR / "orders_result.xlsx", index=False)

print("저장이 완료되었습니다.")
\`\`\`

---
`;export{e as default};