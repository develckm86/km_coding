var e=`<!-- 원본: python_basic_chapter_11_book.md / 세부 장: 11-6 -->

# 11.6 \`pandas\` 기초

### 11.6.1 pandas를 사용하는 이유

파이썬 기본 문법만으로도 리스트와 딕셔너리를 사용해 데이터를 처리할 수 있습니다. 하지만 데이터가 표 형태로 되어 있고, 행과 열이 많아지면 기본 자료구조만으로는 작업이 번거로워집니다.

예를 들어 다음과 같은 데이터를 생각해 봅시다.

| order_id | customer | category | price | quantity |
|---|---|---|---:|---:|
| A001 | 홍길동 | 문구 | 3000 | 2 |
| A002 | 김민수 | 전자기기 | 15000 | 1 |
| A003 | 이서연 | 문구 | 2000 | 5 |

이런 표 형태 데이터에서는 다음과 같은 작업을 자주 합니다.

\`\`\`text
- 특정 컬럼만 선택하기
- 조건에 맞는 행만 필터링하기
- 새 컬럼 만들기
- 카테고리별 합계 구하기
- 결측치 처리하기
- CSV나 엑셀로 저장하기
\`\`\`

이런 작업을 편하게 해 주는 외부 라이브러리가 \`pandas\`입니다.

설치 명령은 다음과 같습니다.

\`\`\`bash
python -m pip install pandas openpyxl
\`\`\`

엑셀 파일을 읽고 쓰는 예제를 함께 다루려면 \`openpyxl\`도 설치해 두는 것이 좋습니다.

---

### 11.6.2 pandas import

pandas는 보통 \`pd\`라는 별칭으로 import합니다.

\`\`\`python
import pandas as pd
\`\`\`

\`pd\`는 pandas 공식 예제와 실무 코드에서 매우 자주 사용되는 관례입니다.

---

### 11.6.3 Series와 DataFrame

pandas에는 대표적인 데이터 구조가 두 가지 있습니다.

| 구조 | 의미 |
|---|---|
| Series | 1차원 데이터 |
| DataFrame | 2차원 표 형태 데이터 |

Series는 하나의 열처럼 생각할 수 있습니다.

\`\`\`python
import pandas as pd

prices = pd.Series([3000, 15000, 2000])

print(prices)
\`\`\`

DataFrame은 행과 열로 구성된 표입니다.

\`\`\`python
import pandas as pd

data = {
    "order_id": ["A001", "A002", "A003"],
    "customer": ["홍길동", "김민수", "이서연"],
    "category": ["문구", "전자기기", "문구"],
    "price": [3000, 15000, 2000],
    "quantity": [2, 1, 5]
}

df = pd.DataFrame(data)

print(df)
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
  order_id customer category  price  quantity
0     A001      홍길동       문구   3000         2
1     A002      김민수     전자기기  15000         1
2     A003      이서연       문구   2000         5
\`\`\`

왼쪽의 \`0\`, \`1\`, \`2\`는 인덱스입니다. 인덱스는 행을 구분하는 이름이라고 생각하면 됩니다.

---

### 11.6.4 CSV 읽기

CSV 파일을 DataFrame으로 읽을 때는 \`pd.read_csv()\`를 사용합니다.

예를 들어 \`orders.csv\` 파일이 다음과 같다고 가정합니다.

\`\`\`csv
order_id,customer,category,price,quantity
A001,홍길동,문구,3000,2
A002,김민수,전자기기,15000,1
A003,이서연,문구,2000,5
\`\`\`

파이썬에서는 다음처럼 읽습니다.

\`\`\`python
import pandas as pd

df = pd.read_csv("orders.csv", encoding="utf-8")

print(df)
\`\`\`

한글이 깨진다면 파일의 인코딩을 확인해야 합니다. 파일에 따라 \`utf-8\`, \`utf-8-sig\`, \`cp949\` 등을 사용해야 할 수 있습니다.

\`\`\`python
df = pd.read_csv("orders.csv", encoding="utf-8-sig")
\`\`\`

또는 다음처럼 읽어야 하는 경우도 있습니다.

\`\`\`python
df = pd.read_csv("orders.csv", encoding="cp949")
\`\`\`

---

### 11.6.5 엑셀 읽기

엑셀 파일을 읽을 때는 \`pd.read_excel()\`을 사용합니다.

\`\`\`python
import pandas as pd

df = pd.read_excel("orders.xlsx")

print(df)
\`\`\`

특정 시트를 읽고 싶다면 \`sheet_name\`을 사용합니다.

\`\`\`python
df = pd.read_excel("orders.xlsx", sheet_name="6월주문")
\`\`\`

엑셀 파일을 읽으려면 보통 \`openpyxl\` 라이브러리가 필요합니다.

\`\`\`bash
python -m pip install openpyxl
\`\`\`

---

### 11.6.6 데이터 확인하기

데이터를 읽은 뒤에는 바로 분석하지 말고 먼저 구조를 확인해야 합니다.

\`\`\`python
print(df.head())
\`\`\`

\`head()\`는 앞부분 몇 행을 보여 줍니다. 기본값은 5행입니다.

\`\`\`python
print(df.tail())
\`\`\`

\`tail()\`은 뒷부분 몇 행을 보여 줍니다.

\`\`\`python
print(df.info())
\`\`\`

\`info()\`는 컬럼 이름, 결측치가 아닌 값의 개수, 자료형 등을 보여 줍니다.

\`\`\`python
print(df.describe())
\`\`\`

\`describe()\`는 숫자형 컬럼의 개수, 평균, 표준편차, 최솟값, 최댓값 등을 요약합니다.

데이터의 크기를 확인할 때는 \`shape\`를 사용합니다.

\`\`\`python
print(df.shape)
\`\`\`

컬럼 목록은 다음처럼 확인합니다.

\`\`\`python
print(df.columns)
\`\`\`

데이터 처리의 첫 단계는 항상 다음 질문에 답하는 것입니다.

\`\`\`text
- 행이 몇 개 있는가?
- 컬럼이 몇 개 있는가?
- 컬럼 이름은 무엇인가?
- 각 컬럼의 자료형은 무엇인가?
- 비어 있는 값은 있는가?
\`\`\`

---

### 11.6.7 컬럼 선택하기

하나의 컬럼을 선택하려면 대괄호를 사용합니다.

\`\`\`python
customers = df["customer"]
print(customers)
\`\`\`

여러 컬럼을 선택하려면 리스트를 사용합니다.

\`\`\`python
selected = df[["order_id", "customer", "price"]]
print(selected)
\`\`\`

대괄호가 두 번 들어가는 것에 주의해야 합니다.

\`\`\`python
df[["컬럼1", "컬럼2"]]
\`\`\`

안쪽 대괄호는 컬럼 이름 목록이고, 바깥쪽 대괄호는 DataFrame에서 컬럼을 선택하는 문법입니다.

---

### 11.6.8 행 필터링하기

조건에 맞는 행만 고를 때는 비교 연산자를 사용합니다.

\`\`\`python
expensive_orders = df[df["price"] >= 10000]
print(expensive_orders)
\`\`\`

여러 조건을 함께 사용할 때는 괄호와 \`&\`, \`|\`를 사용합니다.

\`\`\`python
result = df[(df["price"] >= 10000) & (df["category"] == "전자기기")]
print(result)
\`\`\`

\`and\`, \`or\`가 아니라 \`&\`, \`|\`를 사용한다는 점에 주의해야 합니다.

| 연산자 | 의미 |
|---|---|
| \`&\` | 그리고 |
| \`|\` | 또는 |
| \`~\` | 아니다 |

각 조건은 반드시 괄호로 감싸는 것이 안전합니다.

---

### 11.6.9 새 컬럼 만들기

가격과 수량을 곱해서 총 금액 컬럼을 만들 수 있습니다.

\`\`\`python
df["total"] = df["price"] * df["quantity"]

print(df)
\`\`\`

문자열 컬럼을 조합해서 새 컬럼을 만들 수도 있습니다.

\`\`\`python
df["order_label"] = df["order_id"] + "_" + df["customer"]

print(df)
\`\`\`

새 컬럼을 만들 때는 기존 컬럼의 자료형을 확인해야 합니다. 숫자처럼 보이는 문자열이라면 먼저 숫자로 변환해야 할 수 있습니다.

---

### 11.6.10 컬럼 수정과 삭제

컬럼 값을 수정할 때는 기존 컬럼에 다시 값을 할당합니다.

\`\`\`python
df["customer"] = df["customer"].str.strip()
\`\`\`

컬럼을 삭제할 때는 \`drop()\`을 사용할 수 있습니다.

\`\`\`python
df = df.drop(columns=["order_label"])
\`\`\`

\`drop()\`은 기본적으로 원본을 직접 바꾸지 않고 새 DataFrame을 반환합니다. 그래서 결과를 다시 변수에 저장해야 합니다.

---

### 11.6.11 정렬하기

특정 컬럼 기준으로 정렬할 때는 \`sort_values()\`를 사용합니다.

\`\`\`python
sorted_df = df.sort_values("total")
print(sorted_df)
\`\`\`

내림차순 정렬은 \`ascending=False\`를 사용합니다.

\`\`\`python
sorted_df = df.sort_values("total", ascending=False)
print(sorted_df)
\`\`\`

여러 컬럼 기준으로 정렬할 수도 있습니다.

\`\`\`python
sorted_df = df.sort_values(["category", "total"], ascending=[True, False])
\`\`\`

---

### 11.6.12 그룹화하기

그룹화는 같은 값을 가진 데이터끼리 묶어서 계산하는 작업입니다.

예를 들어 카테고리별 매출 합계를 구하려면 다음처럼 작성합니다.

\`\`\`python
category_sales = df.groupby("category")["total"].sum()

print(category_sales)
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
category
문구       16000
전자기기     15000
Name: total, dtype: int64
\`\`\`

DataFrame 형태로 보고 싶다면 \`reset_index()\`를 사용할 수 있습니다.

\`\`\`python
category_sales = df.groupby("category")["total"].sum().reset_index()

print(category_sales)
\`\`\`

여러 집계 함수를 사용할 수도 있습니다.

\`\`\`python
summary = df.groupby("category")["total"].agg(["sum", "mean", "count"]).reset_index()

print(summary)
\`\`\`

그룹화는 실무 데이터 분석에서 매우 자주 사용됩니다.

\`\`\`text
- 부서별 인원 수
- 월별 매출 합계
- 고객 등급별 평균 구매 금액
- 상품 카테고리별 주문 건수
\`\`\`

---

### 11.6.13 결측치 처리

비어 있는 값을 결측치라고 합니다. pandas에서는 결측치를 보통 \`NaN\`으로 표시합니다.

결측치가 있는지 확인하려면 \`isna()\`를 사용합니다.

\`\`\`python
print(df.isna())
\`\`\`

컬럼별 결측치 개수를 확인하려면 다음처럼 작성합니다.

\`\`\`python
print(df.isna().sum())
\`\`\`

결측치가 있는 행을 제거하려면 \`dropna()\`를 사용합니다.

\`\`\`python
clean_df = df.dropna()
\`\`\`

결측치를 특정 값으로 채우려면 \`fillna()\`를 사용합니다.

\`\`\`python
df["customer"] = df["customer"].fillna("이름 없음")
df["quantity"] = df["quantity"].fillna(0)
\`\`\`

무조건 결측치를 제거하는 것이 좋은 것은 아닙니다. 어떤 값은 제거해야 하고, 어떤 값은 기본값으로 채워야 합니다.

예를 들어 고객 이름이 없으면 분석에서 제외할 수 있지만, 포인트가 비어 있으면 0으로 채우는 것이 자연스러울 수 있습니다.

---

### 11.6.14 데이터 저장하기

DataFrame을 CSV로 저장하려면 \`to_csv()\`를 사용합니다.

\`\`\`python
df.to_csv("orders_result.csv", index=False, encoding="utf-8-sig")
\`\`\`

\`index=False\`는 왼쪽 인덱스를 파일에 저장하지 않겠다는 뜻입니다. 실무에서 결과 CSV를 만들 때 자주 사용합니다.

엑셀로 저장하려면 \`to_excel()\`을 사용합니다.

\`\`\`python
df.to_excel("orders_result.xlsx", index=False)
\`\`\`

여러 시트로 저장하려면 \`ExcelWriter\`를 사용할 수 있습니다.

\`\`\`python
import pandas as pd

with pd.ExcelWriter("report.xlsx") as writer:
    df.to_excel(writer, sheet_name="원본데이터", index=False)
    category_sales.to_excel(writer, sheet_name="카테고리별매출", index=False)
\`\`\`

---

### 11.6.15 pandas 실무 예제: 매출 데이터 분석하기

다음 데이터를 사용해 간단한 매출 분석을 해 보겠습니다.

\`\`\`python
import pandas as pd

data = {
    "order_id": ["A001", "A002", "A003", "A004", "A005"],
    "customer": ["홍길동", "김민수", "이서연", "홍길동", "박지훈"],
    "category": ["문구", "전자기기", "문구", "생활용품", "전자기기"],
    "price": [3000, 15000, 2000, 8000, 12000],
    "quantity": [2, 1, 5, 3, 2]
}

df = pd.DataFrame(data)

# 총 금액 컬럼 만들기
df["total"] = df["price"] * df["quantity"]

# 카테고리별 매출 합계
category_sales = df.groupby("category")["total"].sum().reset_index()

# 총 금액 기준 내림차순 정렬
sorted_orders = df.sort_values("total", ascending=False)

print("전체 주문")
print(df)

print("카테고리별 매출")
print(category_sales)

print("주문 금액 높은 순")
print(sorted_orders)
\`\`\`

이 예제는 작지만 실제 업무 분석의 기본 구조를 포함합니다.

\`\`\`text
1. 데이터를 DataFrame으로 만든다.
2. 계산에 필요한 새 컬럼을 만든다.
3. 그룹별로 집계한다.
4. 기준에 따라 정렬한다.
5. 결과를 확인한다.
\`\`\`

---
`;export{e as default};