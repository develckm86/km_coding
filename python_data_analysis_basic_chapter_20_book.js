var e=`# 20장. 종합 실습

## 20.0 들어가며

이 장은 데이터 분석 기초 과정의 마지막 장입니다.

지금까지 우리는 데이터 분석에 필요한 핵심 기술을 하나씩 배웠습니다.

\`\`\`text
1. 데이터 분석의 흐름 이해
2. 분석 환경 준비
3. NumPy 기초
4. pandas의 Series와 DataFrame
5. 데이터 불러오기와 저장하기
6. 데이터 확인과 기본 탐색
7. 데이터 선택과 필터링
8. 데이터 정렬과 순위
9. 데이터 수정과 파생 변수
10. 결측치 처리
11. 중복값과 이상값 처리
12. 문자열 데이터 처리
13. 날짜와 시간 데이터 처리
14. 그룹화와 집계
15. 데이터 결합
16. 기본 통계 이해
17. 데이터 시각화 기초
18. 탐색적 데이터 분석, EDA
19. 분석 결과 정리
\`\`\`

이 기술들은 각각 따로 배울 때도 중요하지만, 실제 분석에서는 하나의 흐름 안에서 함께 사용됩니다.

실제 데이터 분석은 다음과 같이 진행됩니다.

\`\`\`text
데이터를 불러온다.
데이터 구조를 확인한다.
결측치와 중복값을 확인한다.
문자열과 날짜 데이터를 정리한다.
필요한 데이터를 결합한다.
분석에 필요한 파생 변수를 만든다.
그룹화와 집계로 요약표를 만든다.
통계값과 그래프로 패턴을 확인한다.
EDA를 통해 주요 결과를 찾는다.
분석 결과를 보고서로 정리한다.
\`\`\`

이번 장에서는 이 전체 흐름을 하나의 종합 실습으로 수행합니다.

이 장의 목표는 새로운 문법을 배우는 것이 아닙니다.  
지금까지 배운 내용을 실제 프로젝트처럼 연결해보는 것입니다.

종합 실습의 주제는 **쇼핑몰 주문 데이터 분석**입니다.

우리는 주문 데이터, 고객 데이터, 상품 데이터를 사용하여 다음 질문에 답해볼 것입니다.

\`\`\`text
전체 매출은 어느 정도인가?
월별 매출은 어떻게 변하는가?
어떤 카테고리가 매출에 가장 많이 기여하는가?
고객 등급별 구매 패턴은 어떻게 다른가?
지역별 매출 차이가 있는가?
상품별 판매 성과는 어떻게 다른가?
결측치, 중복값, 이상값은 분석에 영향을 주는가?
분석 결과에서 어떤 인사이트를 도출할 수 있는가?
\`\`\`

마지막에는 분석 결과를 Markdown 보고서 형태로 정리합니다.

이 장을 마치면 데이터 분석 기초 과정에서 배운 내용을 실제 분석 프로젝트의 흐름으로 사용할 수 있게 됩니다.

---

## 20.1 종합 실습 목표

이번 종합 실습의 목표는 다음과 같습니다.

\`\`\`text
1. 여러 데이터를 준비하고 결합할 수 있다.
2. 데이터 구조와 품질을 점검할 수 있다.
3. 결측치, 중복값, 이상값을 확인하고 처리 기준을 세울 수 있다.
4. 문자열과 날짜 데이터를 분석 가능한 형태로 정리할 수 있다.
5. 분석에 필요한 파생 변수를 만들 수 있다.
6. 그룹화와 집계로 요약표를 만들 수 있다.
7. 기본 통계와 시각화로 데이터를 탐색할 수 있다.
8. EDA 결과를 바탕으로 인사이트를 정리할 수 있다.
9. 최종 분석 보고서를 작성할 수 있다.
\`\`\`

이번 실습에서는 데이터 분석 기초 과정에서 배운 대부분의 내용을 사용합니다.

특히 다음 기능을 많이 사용합니다.

\`\`\`python
pd.DataFrame()
pd.to_datetime()
pd.concat()
pd.merge()
df.head()
df.info()
df.describe()
df.isna().sum()
df.duplicated()
df.drop_duplicates()
df.fillna()
df.groupby()
df.agg()
df.sort_values()
df.value_counts()
df.plot()
plt.plot()
plt.bar()
plt.hist()
sns.boxplot()
sns.scatterplot()
\`\`\`

---

## 20.2 프로젝트 시나리오

여러분은 쇼핑몰 운영팀의 데이터 분석 담당자라고 가정합니다.

운영팀은 최근 4개월 동안의 주문 데이터를 바탕으로 매출 구조를 파악하고 싶어합니다.

운영팀에서 알고 싶은 내용은 다음과 같습니다.

\`\`\`text
1. 전체 매출과 주문 수는 어느 정도인가?
2. 월별 매출은 증가하고 있는가?
3. 어떤 상품 카테고리가 매출을 주도하는가?
4. VIP 고객과 일반 고객의 구매 패턴은 다른가?
5. 지역별 매출 차이가 있는가?
6. 어떤 상품이 많이 팔리는가?
7. 데이터 품질 문제는 없는가?
8. 다음 분석에서는 어떤 데이터를 추가로 확인해야 하는가?
\`\`\`

분석에 사용할 데이터는 세 가지입니다.

\`\`\`text
주문 데이터
고객 데이터
상품 데이터
\`\`\`

주문 데이터에는 주문 정보가 들어 있습니다.

\`\`\`text
주문 ID
주문일
고객 ID
상품 ID
수량
쿠폰 금액
\`\`\`

고객 데이터에는 고객 정보가 들어 있습니다.

\`\`\`text
고객 ID
고객명
지역
고객 등급
가입일
방문 횟수
마케팅 수신 동의 여부
\`\`\`

상품 데이터에는 상품 정보가 들어 있습니다.

\`\`\`text
상품 ID
상품명
카테고리
상품 가격
공급사
\`\`\`

분석을 하려면 이 세 데이터를 결합해야 합니다.

---

## 20.3 프로젝트 폴더 구조

실제 프로젝트에서는 데이터와 결과물을 폴더별로 나누어 관리하는 것이 좋습니다.

예를 들어 다음과 같은 구조를 사용할 수 있습니다.

\`\`\`text
shopping_mall_analysis/
  data/
    raw/
    processed/
  notebooks/
  outputs/
    tables/
    charts/
    reports/
  README.md
\`\`\`

각 폴더의 역할은 다음과 같습니다.

| 폴더 | 역할 |
|---|---|
| \`data/raw/\` | 원본 데이터 저장 |
| \`data/processed/\` | 정리된 데이터 저장 |
| \`notebooks/\` | 분석 노트북 저장 |
| \`outputs/tables/\` | 분석 결과 표 저장 |
| \`outputs/charts/\` | 그래프 이미지 저장 |
| \`outputs/reports/\` | 보고서 저장 |

이번 교재에서는 파일을 직접 불러오는 대신 예제 데이터를 코드로 생성합니다.  
하지만 실제 프로젝트에서는 CSV나 Excel 파일을 \`data/raw/\`에 저장하고 불러오는 방식으로 진행합니다.

---

## 20.4 라이브러리 준비

먼저 필요한 라이브러리를 불러옵니다.

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
\`\`\`

분석 과정에서 자주 사용하는 라이브러리는 다음과 같습니다.

| 라이브러리 | 용도 |
|---|---|
| \`pandas\` | 표 형태 데이터 처리 |
| \`matplotlib\` | 기본 시각화 |
| \`seaborn\` | 통계적 시각화 |

실제 Jupyter Notebook에서는 맨 위 셀에 라이브러리를 모아두는 것이 좋습니다.

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
\`\`\`

---

## 20.5 데이터 준비

이번 실습에서는 주문 데이터, 고객 데이터, 상품 데이터를 직접 만들어 사용합니다.

---

### 20.5.1 주문 데이터 만들기

\`\`\`python
orders_raw = pd.DataFrame({
    "order_id": [
        1001, 1002, 1003, 1004, 1005,
        1006, 1007, 1008, 1009, 1010,
        1011, 1012, 1013, 1014, 1015,
        1016, 1017, 1017
    ],
    "order_date": [
        "2026-01-03", "2026-01-05", "2026-01-10",
        "2026-02-02", "2026-02-14", "2026-03-01",
        "2026-03-15", "2026-03-20", "2026-03-22",
        "2026-04-01", "2026-04-05", "2026-04-08",
        "2026-04-15", "2026-04-20", "2026-04-25",
        "2026-04-28", "잘못된 날짜", "잘못된 날짜"
    ],
    "customer_id": [
        1, 2, 3, 1, 4,
        2, 5, 6, 7, 8,
        3, 5, 9, 10, 2,
        11, 2, 2
    ],
    "product_id": [
        "P001", "P002", "P003", "P001", "P004",
        "P003", "P001", "P002", "P003", "P001",
        "P002", "P003", "P005", "P002", "P001",
        "P999", "P004", "P004"
    ],
    "quantity": [
        1, 3, 2, 1, 2,
        4, 1, 2, 5, 1,
        3, 2, 1, 2, 1,
        1, 2, 2
    ],
    "coupon_amount": [
        0, 0, 5000, 10000, None,
        0, 0, None, 0, 20000,
        0, 0, 15000, 0, 10000,
        0, 0, 0
    ]
})

orders_raw
\`\`\`

이 주문 데이터에는 일부 품질 문제가 포함되어 있습니다.

\`\`\`text
order_id 1017이 중복되어 있다.
order_date에 "잘못된 날짜"가 있다.
coupon_amount에 결측치가 있다.
product_id P999는 상품 데이터에 없을 예정이다.
\`\`\`

실제 데이터도 이처럼 분석 전에 확인해야 할 문제가 들어 있는 경우가 많습니다.

---

### 20.5.2 고객 데이터 만들기

\`\`\`python
customers_raw = pd.DataFrame({
    "customer_id": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    "customer_name": [
        " 김민수", "이지영 ", "박철수", "최영희", "정수진",
        "강현우", "오도윤", "한서연", "윤하준", "문유나"
    ],
    "region": [
        "서울특별시", "부산광역시", "서울시", "대전광역시", "부산시",
        "서울", "대전", "서울특별시", "대전", "서울시"
    ],
    "grade": [
        "VIP", "일반", "일반", "일반", "VIP",
        "일반", "일반", "VIP", "일반", "VIP"
    ],
    "signup_date": [
        "2025-12-01", "2026-01-01", "2026-01-08", "2026-02-01", "2026-02-15",
        "2026-03-01", "2026-03-10", "2026-03-20", "2026-04-01", "2026-04-05"
    ],
    "visit_count": [12, 5, 7, 3, 10, 4, 6, 15, 8, 11],
    "agree_marketing": ["Y", "Y", "N", "Y", "Y", "N", "Y", "Y", "N", "Y"]
})

customers_raw
\`\`\`

고객 데이터에는 다음 특징이 있습니다.

\`\`\`text
customer_name에 앞뒤 공백이 있다.
region 표기가 서울특별시, 서울시, 서울처럼 섞여 있다.
customer_id 11은 고객 데이터에 없다.
\`\`\`

---

### 20.5.3 상품 데이터 만들기

\`\`\`python
products_raw = pd.DataFrame({
    "product_id": ["P001", "P002", "P003", "P004", "P005"],
    "product_name": ["노트북", "파이썬 입문서", "머그컵", "SQL 기초", "무선 마우스"],
    "category": ["전자기기", "도서", "생활용품", "도서", "전자기기"],
    "unit_price": [300000, 15000, 25000, 17500, 35000],
    "supplier": ["A사", "B사", "C사", "B사", "A사"]
})

products_raw
\`\`\`

상품 데이터에는 상품 ID, 상품명, 카테고리, 단가, 공급사가 포함되어 있습니다.

주문 데이터에 있는 \`P999\`는 상품 데이터에 없습니다.  
결합 후 이 값은 상품 정보가 없는 주문으로 확인될 것입니다.

---

## 20.6 1단계: 데이터 구조 확인

분석을 시작할 때는 각 데이터의 구조를 확인합니다.

---

### 20.6.1 주문 데이터 구조 확인

\`\`\`python
orders_raw.head()
orders_raw.shape
orders_raw.info()
\`\`\`

확인할 내용은 다음과 같습니다.

\`\`\`text
행과 열 개수
컬럼명
자료형
결측치 여부
날짜 컬럼이 문자열인지 여부
\`\`\`

주문 데이터에서 \`order_date\`는 문자열입니다.  
날짜 분석을 위해 날짜형으로 변환해야 합니다.

---

### 20.6.2 고객 데이터 구조 확인

\`\`\`python
customers_raw.head()
customers_raw.shape
customers_raw.info()
\`\`\`

고객 데이터에서는 이름과 지역 표기 방식을 확인합니다.

\`\`\`python
customers_raw["region"].value_counts()
\`\`\`

지역 표기가 섞여 있으므로 표준화가 필요합니다.

---

### 20.6.3 상품 데이터 구조 확인

\`\`\`python
products_raw.head()
products_raw.shape
products_raw.info()
\`\`\`

상품 데이터에서는 \`product_id\`가 유일한지 확인해야 합니다.

\`\`\`python
products_raw["product_id"].is_unique
\`\`\`

상품 ID는 상품 기준표의 key이므로 유일해야 합니다.

---

## 20.7 2단계: 데이터 품질 점검

데이터 구조를 확인한 뒤에는 품질을 점검합니다.

---

### 20.7.1 결측치 확인

\`\`\`python
orders_raw.isna().sum()
customers_raw.isna().sum()
products_raw.isna().sum()
\`\`\`

주문 데이터의 \`coupon_amount\`에는 결측치가 있습니다.

쿠폰 금액 결측치를 어떻게 처리할지 기준을 세워야 합니다.

이번 실습에서는 다음 기준을 사용합니다.

\`\`\`text
coupon_amount가 비어 있으면 쿠폰을 사용하지 않은 것으로 보고 0으로 대체한다.
\`\`\`

---

### 20.7.2 중복값 확인

주문 ID 기준 중복을 확인합니다.

\`\`\`python
orders_raw.duplicated(subset=["order_id"]).sum()
\`\`\`

중복된 주문을 확인합니다.

\`\`\`python
orders_raw[orders_raw.duplicated(subset=["order_id"], keep=False)]
\`\`\`

이번 실습에서는 \`order_id\`가 같은 행이 완전히 같은 중복이라고 가정하고 첫 번째 행만 남기겠습니다.

---

### 20.7.3 key 유일성 확인

고객 데이터의 \`customer_id\`가 유일한지 확인합니다.

\`\`\`python
customers_raw["customer_id"].is_unique
\`\`\`

상품 데이터의 \`product_id\`가 유일한지 확인합니다.

\`\`\`python
products_raw["product_id"].is_unique
\`\`\`

고객 정보와 상품 정보를 주문 데이터에 붙일 때, 고객 데이터와 상품 데이터는 기준표 역할을 합니다.  
따라서 key가 유일해야 합니다.

---

### 20.7.4 날짜 변환 가능 여부 확인

주문일을 날짜형으로 변환합니다.

\`\`\`python
pd.to_datetime(orders_raw["order_date"], errors="coerce")
\`\`\`

변환할 수 없는 값은 \`NaT\`가 됩니다.

이후 분석에서 날짜가 필요한 경우 \`NaT\`는 제외해야 합니다.

---

## 20.8 3단계: 데이터 전처리

이제 분석에 사용할 데이터를 정리합니다.

원본 데이터는 그대로 두고, 복사본을 만들어 처리합니다.

---

### 20.8.1 주문 데이터 복사

\`\`\`python
orders = orders_raw.copy()
customers = customers_raw.copy()
products = products_raw.copy()
\`\`\`

원본을 직접 수정하지 않고 복사본을 사용하는 이유는 문제가 생겼을 때 원본을 다시 확인할 수 있기 때문입니다.

---

### 20.8.2 중복 주문 제거

\`\`\`python
orders = orders.drop_duplicates(
    subset=["order_id"],
    keep="first",
    ignore_index=True
)

orders
\`\`\`

중복 제거 후 다시 확인합니다.

\`\`\`python
orders.duplicated(subset=["order_id"]).sum()
\`\`\`

---

### 20.8.3 쿠폰 금액 결측치 처리

\`\`\`python
orders["coupon_amount"] = orders["coupon_amount"].fillna(0)
\`\`\`

결측치가 처리되었는지 확인합니다.

\`\`\`python
orders["coupon_amount"].isna().sum()
\`\`\`

---

### 20.8.4 날짜형 변환

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(
    orders["order_date"],
    errors="coerce"
)
\`\`\`

변환 실패 행을 확인합니다.

\`\`\`python
orders[orders["order_date_dt"].isna()]
\`\`\`

이번 실습에서는 날짜 분석에서는 날짜가 유효한 주문만 사용하고, 전체 매출 분석에서는 날짜가 없어도 주문 금액 계산이 가능하면 유지할 수 있습니다.

---

### 20.8.5 고객명 공백 제거

고객명 앞뒤 공백을 제거합니다.

\`\`\`python
customers["customer_name"] = customers["customer_name"].str.strip()
\`\`\`

---

### 20.8.6 지역명 표준화

지역명이 다음처럼 섞여 있습니다.

\`\`\`text
서울특별시
서울시
서울
부산광역시
부산시
대전광역시
\`\`\`

이를 서울, 부산, 대전으로 통일합니다.

\`\`\`python
region_map = {
    "서울특별시": "서울",
    "서울시": "서울",
    "서울": "서울",
    "부산광역시": "부산",
    "부산시": "부산",
    "부산": "부산",
    "대전광역시": "대전",
    "대전": "대전"
}

customers["region_clean"] = customers["region"].replace(region_map)

customers[["region", "region_clean"]]
\`\`\`

표준화 결과를 확인합니다.

\`\`\`python
customers["region_clean"].value_counts()
\`\`\`

---

### 20.8.7 날짜 파생 변수 만들기

날짜가 유효한 주문에 대해 연월과 요일을 만듭니다.

\`\`\`python
orders["year_month"] = orders["order_date_dt"].dt.to_period("M").astype(str)
orders["weekday"] = orders["order_date_dt"].dt.day_name()
\`\`\`

날짜가 \`NaT\`인 행은 \`year_month\`, \`weekday\`도 결측치가 됩니다.

\`\`\`python
orders[["order_date", "order_date_dt", "year_month", "weekday"]]
\`\`\`

---

## 20.9 4단계: 데이터 결합

주문 데이터에 고객 정보와 상품 정보를 붙여 분석용 데이터를 만듭니다.

---

### 20.9.1 결합 전 기준값 저장

결합 전 행 수와 계산 가능한 주문 금액 관련 정보를 저장합니다.

\`\`\`python
before_rows = len(orders)

before_rows
\`\`\`

주문 데이터에는 아직 상품 단가가 없으므로 최종 매출은 결합 후 계산합니다.

---

### 20.9.2 고객 정보 결합

\`\`\`python
orders_customer = orders.merge(
    customers,
    on="customer_id",
    how="left",
    validate="many_to_one",
    indicator=True
)

orders_customer["_merge"].value_counts()
\`\`\`

매칭되지 않은 고객을 확인합니다.

\`\`\`python
orders_customer[orders_customer["_merge"] == "left_only"]
\`\`\`

주문 데이터에는 \`customer_id\` 11이 있지만 고객 데이터에는 없습니다.  
따라서 해당 주문은 고객 정보가 결측치로 남습니다.

검증이 끝나면 \`_merge\` 컬럼을 제거합니다.

\`\`\`python
orders_customer = orders_customer.drop(columns=["_merge"])
\`\`\`

---

### 20.9.3 상품 정보 결합

\`\`\`python
orders_full = orders_customer.merge(
    products,
    on="product_id",
    how="left",
    validate="many_to_one",
    indicator=True
)

orders_full["_merge"].value_counts()
\`\`\`

매칭되지 않은 상품을 확인합니다.

\`\`\`python
orders_full[orders_full["_merge"] == "left_only"]
\`\`\`

\`product_id\` P999는 상품 데이터에 없으므로 상품명, 카테고리, 단가가 결측치로 남습니다.

검증 후 \`_merge\` 컬럼을 제거합니다.

\`\`\`python
orders_full = orders_full.drop(columns=["_merge"])
\`\`\`

---

### 20.9.4 결합 후 행 수 확인

\`\`\`python
after_rows = len(orders_full)

before_rows, after_rows
\`\`\`

\`left join\`을 사용했으므로 행 수는 유지되어야 합니다.

---

### 20.9.5 결합 후 결측치 확인

\`\`\`python
orders_full.isna().sum()
\`\`\`

고객 정보가 없는 주문, 상품 정보가 없는 주문, 날짜 변환에 실패한 주문을 확인할 수 있습니다.

---

## 20.10 5단계: 파생 변수 생성

분석에 필요한 컬럼을 추가합니다.

---

### 20.10.1 주문 금액 계산

주문 데이터에는 수량과 상품 단가가 있습니다.  
쿠폰 금액을 반영한 최종 주문 금액을 계산합니다.

\`\`\`python
orders_full["gross_amount"] = orders_full["quantity"] * orders_full["unit_price"]
orders_full["net_amount"] = orders_full["gross_amount"] - orders_full["coupon_amount"]

orders_full[["quantity", "unit_price", "coupon_amount", "gross_amount", "net_amount"]]
\`\`\`

\`unit_price\`가 결측치인 주문은 \`gross_amount\`와 \`net_amount\`도 결측치가 됩니다.

---

### 20.10.2 주문 금액 계산 가능 데이터 분리

매출 분석에는 상품 단가가 있는 주문만 사용합니다.

\`\`\`python
orders_analysis = orders_full.dropna(subset=["net_amount"]).copy()

orders_analysis
\`\`\`

분석에서 제외된 주문을 확인합니다.

\`\`\`python
excluded_orders = orders_full[orders_full["net_amount"].isna()]

excluded_orders
\`\`\`

제외 기준은 보고서에 기록해야 합니다.

\`\`\`text
상품 정보가 없어 단가를 확인할 수 없는 주문은 매출 분석에서 제외했다.
\`\`\`

---

### 20.10.3 고객 정보 결측치 처리

고객 정보가 없는 주문을 분석에서 무조건 제외할 필요는 없습니다.  
지역이나 등급별 분석에서는 제외되거나 \`미상\`으로 처리할 수 있습니다.

이번 실습에서는 고객 정보가 없는 경우 다음과 같이 처리합니다.

\`\`\`python
orders_analysis["customer_name"] = orders_analysis["customer_name"].fillna("고객정보없음")
orders_analysis["region_clean"] = orders_analysis["region_clean"].fillna("미상")
orders_analysis["grade"] = orders_analysis["grade"].fillna("미상")
\`\`\`

이렇게 하면 지역별, 등급별 분석에서 정보가 없는 주문도 별도 그룹으로 확인할 수 있습니다.

---

### 20.10.4 가격대 파생 변수 만들기

주문 금액 기준으로 가격대를 나눠봅니다.

\`\`\`python
orders_analysis["price_level"] = "저가"
orders_analysis.loc[orders_analysis["net_amount"] >= 50000, "price_level"] = "중가"
orders_analysis.loc[orders_analysis["net_amount"] >= 200000, "price_level"] = "고가"

orders_analysis[["net_amount", "price_level"]]
\`\`\`

기준은 분석 목적에 따라 달라질 수 있습니다.

이번 실습에서는 다음 기준을 사용합니다.

\`\`\`text
저가: 50,000원 미만
중가: 50,000원 이상 200,000원 미만
고가: 200,000원 이상
\`\`\`

---

## 20.11 6단계: 기본 분석 지표 확인

이제 분석용 데이터로 기본 지표를 계산합니다.

---

### 20.11.1 전체 요약 지표

\`\`\`python
summary = {
    "분석 대상 주문 수": len(orders_analysis),
    "고유 고객 수": orders_analysis["customer_id"].nunique(),
    "총매출": orders_analysis["net_amount"].sum(),
    "평균 주문 금액": orders_analysis["net_amount"].mean(),
    "중앙 주문 금액": orders_analysis["net_amount"].median(),
    "최대 주문 금액": orders_analysis["net_amount"].max()
}

summary
\`\`\`

이 지표는 보고서의 데이터 개요나 주요 결과에 사용할 수 있습니다.

---

### 20.11.2 주문 금액 기술통계

\`\`\`python
orders_analysis["net_amount"].describe()
\`\`\`

평균과 중앙값을 비교합니다.

\`\`\`python
orders_analysis["net_amount"].mean()
orders_analysis["net_amount"].median()
\`\`\`

평균이 중앙값보다 크다면 고가 주문이 평균을 끌어올릴 수 있습니다.

---

### 20.11.3 범주형 분포 확인

카테고리 분포를 확인합니다.

\`\`\`python
orders_analysis["category"].value_counts()
\`\`\`

고객 등급 분포를 확인합니다.

\`\`\`python
orders_analysis["grade"].value_counts()
\`\`\`

지역 분포를 확인합니다.

\`\`\`python
orders_analysis["region_clean"].value_counts()
\`\`\`

---

## 20.12 7단계: 카테고리별 매출 분석

카테고리별 매출 구조를 분석합니다.

---

### 20.12.1 카테고리별 요약표

\`\`\`python
category_report = (
    orders_analysis
    .groupby("category")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        total_quantity=("quantity", "sum"),
        avg_order_amount=("net_amount", "mean"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

total_sales = category_report["total_sales"].sum()

category_report["sales_ratio_percent"] = (
    category_report["total_sales"] / total_sales * 100
).round(1)

category_report["avg_order_amount"] = category_report["avg_order_amount"].round(0)

category_report = category_report.sort_values(
    by="total_sales",
    ascending=False
).reset_index(drop=True)

category_report
\`\`\`

---

### 20.12.2 카테고리별 매출 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(category_report["category"], category_report["total_sales"])

plt.title("카테고리별 총매출")
plt.xlabel("카테고리")
plt.ylabel("매출")

plt.show()
\`\`\`

---

### 20.12.3 해석 예시

\`\`\`text
카테고리별 매출 분석 결과, 전자기기 카테고리의 매출 비중이 가장 높게 나타난다.
전자기기는 평균 주문 금액이 높아 전체 매출 기여도가 큰 카테고리로 볼 수 있다.
도서와 생활용품은 매출 규모는 상대적으로 작지만 주문 수와 고객 수 측면에서 별도 관리가 필요할 수 있다.
\`\`\`

---

## 20.13 8단계: 월별 매출 분석

날짜가 유효한 주문만 사용해 월별 매출을 분석합니다.

---

### 20.13.1 월별 요약표

\`\`\`python
monthly_report = (
    orders_analysis
    .dropna(subset=["year_month"])
    .groupby("year_month")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        avg_order_amount=("net_amount", "mean"),
        unique_customers=("customer_id", "nunique")
    )
    .reset_index()
)

monthly_report["avg_order_amount"] = monthly_report["avg_order_amount"].round(0)

monthly_report
\`\`\`

---

### 20.13.2 월별 매출 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.plot(monthly_report["year_month"], monthly_report["total_sales"])

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")

plt.show()
\`\`\`

---

### 20.13.3 해석 예시

\`\`\`text
월별 매출은 특정 월에 증가하거나 감소하는 흐름을 보일 수 있다.
매출 변화의 원인을 이해하려면 주문 수, 평균 주문 금액, 카테고리별 매출을 함께 확인해야 한다.
\`\`\`

---

## 20.14 9단계: 고객 등급별 구매 분석

고객 등급별 구매 차이를 확인합니다.

---

### 20.14.1 등급별 요약표

\`\`\`python
grade_report = (
    orders_analysis
    .groupby("grade")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique"),
        avg_order_amount=("net_amount", "mean"),
        median_order_amount=("net_amount", "median"),
        avg_visit_count=("visit_count", "mean")
    )
    .reset_index()
)

grade_report = grade_report.round({
    "avg_order_amount": 0,
    "median_order_amount": 0,
    "avg_visit_count": 1
})

grade_report
\`\`\`

---

### 20.14.2 등급별 주문 금액 분포

\`\`\`python
sns.boxplot(
    data=orders_analysis,
    x="grade",
    y="net_amount"
)

plt.title("고객 등급별 주문 금액 분포")
plt.xlabel("고객 등급")
plt.ylabel("주문 금액")

plt.show()
\`\`\`

---

### 20.14.3 해석 예시

\`\`\`text
VIP 고객의 평균 주문 금액이 일반 고객보다 높게 나타날 수 있다.
이는 VIP 고객이 매출 기여도가 높은 고객군일 가능성을 시사한다.
다만 등급별 주문 수와 고유 고객 수가 충분한지 함께 확인해야 한다.
\`\`\`

---

## 20.15 10단계: 지역별 매출 분석

지역별 매출 차이를 확인합니다.

---

### 20.15.1 지역별 요약표

\`\`\`python
region_report = (
    orders_analysis
    .groupby("region_clean")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        unique_customers=("customer_id", "nunique"),
        avg_order_amount=("net_amount", "mean")
    )
    .reset_index()
)

region_report["avg_order_amount"] = region_report["avg_order_amount"].round(0)

region_report = region_report.sort_values(
    by="total_sales",
    ascending=False
).reset_index(drop=True)

region_report
\`\`\`

---

### 20.15.2 지역별 매출 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(region_report["region_clean"], region_report["total_sales"])

plt.title("지역별 총매출")
plt.xlabel("지역")
plt.ylabel("매출")

plt.show()
\`\`\`

---

### 20.15.3 해석 예시

\`\`\`text
지역별 매출을 보면 특정 지역의 매출이 높게 나타날 수 있다.
하지만 지역별 매출 차이는 고객 수, 주문 수, 평균 주문 금액의 영향을 함께 받는다.
따라서 지역별 총매출만 보고 지역 성과를 단정하기보다는 주문 수와 고객 수를 함께 확인해야 한다.
\`\`\`

---

## 20.16 11단계: 상품별 성과 분석

상품별 판매 성과를 분석합니다.

---

### 20.16.1 상품별 요약표

\`\`\`python
product_report = (
    orders_analysis
    .groupby(["product_id", "product_name", "category"])
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count"),
        total_quantity=("quantity", "sum"),
        avg_order_amount=("net_amount", "mean")
    )
    .reset_index()
)

product_report["avg_order_amount"] = product_report["avg_order_amount"].round(0)

product_report = product_report.sort_values(
    by="total_sales",
    ascending=False
).reset_index(drop=True)

product_report
\`\`\`

---

### 20.16.2 매출 상위 상품 확인

\`\`\`python
top_products = product_report.head(5)

top_products
\`\`\`

---

### 20.16.3 상품별 매출 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.barh(top_products["product_name"], top_products["total_sales"])

plt.title("매출 상위 상품")
plt.xlabel("매출")
plt.ylabel("상품명")

plt.show()
\`\`\`

---

### 20.16.4 해석 예시

\`\`\`text
매출 상위 상품은 전체 매출에 큰 영향을 준다.
특히 단가가 높은 상품은 주문 수가 많지 않아도 매출 기여도가 클 수 있다.
상품별 성과를 볼 때는 총매출, 판매 수량, 주문 수를 함께 확인해야 한다.
\`\`\`

---

## 20.17 12단계: 주문 금액 분포와 이상값 확인

주문 금액의 분포를 확인합니다.

---

### 20.17.1 히스토그램

\`\`\`python
plt.figure(figsize=(8, 4))

plt.hist(orders_analysis["net_amount"], bins=6)

plt.title("주문 금액 분포")
plt.xlabel("주문 금액")
plt.ylabel("빈도")

plt.show()
\`\`\`

---

### 20.17.2 박스플롯

\`\`\`python
sns.boxplot(
    data=orders_analysis,
    y="net_amount"
)

plt.title("주문 금액 박스플롯")
plt.ylabel("주문 금액")

plt.show()
\`\`\`

---

### 20.17.3 IQR 기준 이상값 후보 확인

\`\`\`python
q1 = orders_analysis["net_amount"].quantile(0.25)
q3 = orders_analysis["net_amount"].quantile(0.75)
iqr = q3 - q1

lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

outlier_orders = orders_analysis[
    (orders_analysis["net_amount"] < lower_bound) |
    (orders_analysis["net_amount"] > upper_bound)
]

outlier_orders
\`\`\`

---

### 20.17.4 해석 예시

\`\`\`text
주문 금액에는 일부 고가 주문이 존재할 수 있다.
이 값들은 이상값 후보로 볼 수 있지만, 실제 고가 상품 주문이라면 제거하지 않는 것이 적절할 수 있다.
이상값은 무조건 삭제하기보다 원본과 업무 맥락을 확인한 뒤 처리 여부를 결정해야 한다.
\`\`\`

---

## 20.18 13단계: 방문 횟수와 주문 금액 관계 분석

방문 횟수와 주문 금액 사이의 관계를 확인합니다.

---

### 20.18.1 상관계수 계산

\`\`\`python
visit_price_corr = orders_analysis["visit_count"].corr(
    orders_analysis["net_amount"]
)

visit_price_corr
\`\`\`

---

### 20.18.2 산점도

\`\`\`python
sns.scatterplot(
    data=orders_analysis,
    x="visit_count",
    y="net_amount",
    hue="grade"
)

plt.title("방문 횟수와 주문 금액의 관계")
plt.xlabel("방문 횟수")
plt.ylabel("주문 금액")

plt.show()
\`\`\`

---

### 20.18.3 해석 예시

\`\`\`text
방문 횟수와 주문 금액 사이에 양의 관계가 관찰될 수 있다.
다만 상관관계는 인과관계를 의미하지 않는다.
방문 횟수가 높은 고객이 원래 구매 의향이 높은 고객일 수도 있고, VIP 고객 특성이 함께 영향을 줄 수도 있다.
\`\`\`

---

## 20.19 14단계: 분석 결과 저장

분석 결과를 파일로 저장하는 방법을 정리합니다.

---

### 20.19.1 정리된 데이터 저장

\`\`\`python
orders_analysis.to_csv("orders_analysis.csv", index=False)
\`\`\`

Excel 파일로 저장할 수도 있습니다.

\`\`\`python
orders_analysis.to_excel("orders_analysis.xlsx", index=False)
\`\`\`

---

### 20.19.2 요약표 저장

여러 요약표를 하나의 Excel 파일에 시트별로 저장할 수 있습니다.

\`\`\`python
with pd.ExcelWriter("summary_reports.xlsx") as writer:
    category_report.to_excel(writer, sheet_name="category", index=False)
    monthly_report.to_excel(writer, sheet_name="monthly", index=False)
    grade_report.to_excel(writer, sheet_name="grade", index=False)
    region_report.to_excel(writer, sheet_name="region", index=False)
    product_report.to_excel(writer, sheet_name="product", index=False)
\`\`\`

---

### 20.19.3 그래프 저장

그래프를 이미지 파일로 저장할 수 있습니다.

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(category_report["category"], category_report["total_sales"])

plt.title("카테고리별 총매출")
plt.xlabel("카테고리")
plt.ylabel("매출")

plt.savefig("category_sales.png", bbox_inches="tight")
plt.show()
\`\`\`

실무에서는 결과 파일을 \`outputs/\` 폴더 아래에 저장하는 것이 좋습니다.

---

## 20.20 15단계: 최종 분석 보고서 작성

분석 결과를 Markdown 보고서 형태로 정리합니다.

---

### 20.20.1 보고서 기본 구조

\`\`\`markdown
# 쇼핑몰 주문 데이터 분석 보고서

## 1. 분석 목적

## 2. 데이터 개요

## 3. 전처리 및 분석 기준

## 4. 주요 결과 요약

## 5. 상세 분석

### 5.1 카테고리별 매출 분석

### 5.2 월별 매출 분석

### 5.3 고객 등급별 구매 분석

### 5.4 지역별 매출 분석

### 5.5 상품별 성과 분석

## 6. 인사이트

## 7. 분석 한계

## 8. 다음 분석 방향
\`\`\`

---

### 20.20.2 분석 목적 예시

\`\`\`text
이 분석은 쇼핑몰 주문 데이터를 사용하여
카테고리별 매출 구조, 월별 매출 흐름, 고객 등급별 구매 패턴, 지역별 매출 차이를 파악하는 것을 목적으로 한다.
이를 통해 핵심 매출 카테고리와 주요 고객군을 확인하고,
추가 분석이 필요한 영역을 도출한다.
\`\`\`

---

### 20.20.3 데이터 개요 예시

\`\`\`text
분석에는 주문 데이터, 고객 데이터, 상품 데이터를 사용했다.
주문 데이터는 고객 ID와 상품 ID를 기준으로 고객 정보와 상품 정보를 결합했다.
분석 대상은 상품 단가가 확인되어 주문 금액 계산이 가능한 주문으로 한정했다.
\`\`\`

---

### 20.20.4 전처리 기준 예시

\`\`\`text
전처리 및 분석 기준
- order_id 기준 중복 주문은 첫 번째 행만 남기고 제거했다.
- coupon_amount 결측치는 쿠폰 미사용으로 보고 0으로 대체했다.
- order_date는 날짜형으로 변환했으며, 변환 실패 값은 날짜 기반 분석에서 제외했다.
- 고객명 앞뒤 공백을 제거했다.
- 지역명은 서울, 부산, 대전으로 표준화했다.
- 주문 데이터는 customer_id 기준으로 고객 데이터와 left join했다.
- 주문 데이터는 product_id 기준으로 상품 데이터와 left join했다.
- 상품 정보가 없어 단가를 확인할 수 없는 주문은 매출 분석에서 제외했다.
- 최종 주문 금액은 quantity × unit_price - coupon_amount로 계산했다.
\`\`\`

---

### 20.20.5 주요 결과 요약 예시

\`\`\`text
주요 결과 요약
1. 전자기기 카테고리가 전체 매출에서 가장 큰 비중을 차지했다.
2. 월별 매출은 특정 월에 증가하는 흐름을 보였으며, 카테고리 구성이 영향을 줄 수 있다.
3. VIP 고객의 평균 주문 금액은 일반 고객보다 높게 나타날 수 있다.
4. 특정 지역의 총매출이 높게 나타났지만, 고객 수와 주문 수를 함께 고려해야 한다.
5. 방문 횟수와 주문 금액 사이에는 양의 관계가 관찰될 수 있으나 인과관계로 해석하면 안 된다.
\`\`\`

---

### 20.20.6 인사이트 예시

\`\`\`text
인사이트
- 전자기기는 매출 기여도가 높은 핵심 카테고리이므로 재고 관리와 프로모션 우선순위에서 중요하게 다룰 필요가 있다.
- VIP 고객은 평균 주문 금액이 높아 매출 기여도가 큰 고객군으로 볼 수 있으므로, 재구매 유도와 이탈 방지 전략이 중요하다.
- 월별 매출 변화는 총매출만 보기보다 주문 수, 평균 주문 금액, 카테고리별 매출을 함께 확인해야 한다.
- 상품 정보가 없는 주문은 분석에서 제외되었으므로, 상품 마스터 데이터 품질 관리가 필요하다.
\`\`\`

---

### 20.20.7 분석 한계 예시

\`\`\`text
분석 한계
- 예제 데이터의 행 수가 적어 결과를 일반화하기 어렵다.
- 분석 기간이 짧아 장기 추세나 계절성을 판단하기 어렵다.
- 광고비, 할인 이벤트, 유입 경로 데이터가 없어 매출 변화의 원인을 명확히 설명하기 어렵다.
- 일부 주문은 상품 정보가 없어 매출 분석에서 제외되었다.
- 상관관계는 인과관계를 의미하지 않는다.
\`\`\`

---

### 20.20.8 다음 분석 방향 예시

\`\`\`text
다음 분석 방향
- 상품 단위 매출과 판매 수량을 더 자세히 분석한다.
- VIP 고객의 재구매율과 이탈 여부를 분석한다.
- 프로모션, 광고비, 유입 경로 데이터를 결합해 매출 변화 원인을 확인한다.
- 월별 매출을 더 긴 기간으로 확장해 계절성과 추세를 확인한다.
- 상품 정보가 누락된 주문의 원인을 파악해 데이터 품질을 개선한다.
\`\`\`

---

## 20.21 종합 실습 체크리스트

이번 종합 실습을 마친 뒤 다음 항목을 확인합니다.

---

### 20.21.1 데이터 준비 체크리스트

\`\`\`text
□ 주문 데이터, 고객 데이터, 상품 데이터를 준비했는가?
□ 각 데이터의 행과 열 개수를 확인했는가?
□ 각 데이터의 컬럼과 자료형을 확인했는가?
□ key 컬럼의 유일성을 확인했는가?
\`\`\`

---

### 20.21.2 전처리 체크리스트

\`\`\`text
□ 결측치를 확인했는가?
□ 중복 주문을 확인했는가?
□ 날짜 데이터를 날짜형으로 변환했는가?
□ 변환 실패 날짜를 확인했는가?
□ 문자열 공백을 제거했는가?
□ 지역명을 표준화했는가?
□ 쿠폰 금액 결측치를 처리했는가?
\`\`\`

---

### 20.21.3 결합 체크리스트

\`\`\`text
□ 주문 데이터에 고객 정보를 결합했는가?
□ 주문 데이터에 상품 정보를 결합했는가?
□ 결합 전후 행 수를 확인했는가?
□ 매칭되지 않은 고객 또는 상품을 확인했는가?
□ 결합 후 결측치를 확인했는가?
\`\`\`

---

### 20.21.4 분석 체크리스트

\`\`\`text
□ 전체 요약 지표를 계산했는가?
□ 카테고리별 매출을 분석했는가?
□ 월별 매출을 분석했는가?
□ 고객 등급별 구매 패턴을 분석했는가?
□ 지역별 매출을 분석했는가?
□ 상품별 성과를 분석했는가?
□ 주문 금액 분포와 이상값 후보를 확인했는가?
□ 방문 횟수와 주문 금액 관계를 확인했는가?
\`\`\`

---

### 20.21.5 보고서 체크리스트

\`\`\`text
□ 분석 목적을 작성했는가?
□ 데이터 개요를 작성했는가?
□ 전처리 및 분석 기준을 작성했는가?
□ 주요 결과를 3~5개로 요약했는가?
□ 표와 그래프에 해석 문장을 붙였는가?
□ 인사이트를 작성했는가?
□ 분석 한계를 작성했는가?
□ 다음 분석 방향을 제시했는가?
\`\`\`

---

## 20.22 종합 실습 과제

이번 장의 내용을 바탕으로 직접 분석 보고서를 작성해봅니다.

---

### 과제 1. 분석용 데이터 만들기

다음 작업을 수행하세요.

\`\`\`text
1. 주문 데이터, 고객 데이터, 상품 데이터를 준비한다.
2. 주문 데이터의 중복 주문을 제거한다.
3. 쿠폰 금액 결측치를 0으로 처리한다.
4. 주문일을 날짜형으로 변환한다.
5. 고객명 공백을 제거한다.
6. 지역명을 표준화한다.
7. 주문 데이터에 고객 정보와 상품 정보를 결합한다.
8. 최종 주문 금액을 계산한다.
\`\`\`

---

### 과제 2. 기본 분석 수행

다음 분석을 수행하세요.

\`\`\`text
1. 전체 주문 수, 총매출, 평균 주문 금액 계산
2. 카테고리별 매출 분석
3. 월별 매출 분석
4. 고객 등급별 평균 주문 금액 분석
5. 지역별 매출 분석
6. 상품별 매출 상위 5개 확인
\`\`\`

---

### 과제 3. 시각화 수행

다음 그래프를 작성하세요.

\`\`\`text
1. 월별 매출 선 그래프
2. 카테고리별 매출 막대 그래프
3. 고객 등급별 주문 금액 박스플롯
4. 주문 금액 히스토그램
5. 방문 횟수와 주문 금액 산점도
\`\`\`

---

### 과제 4. 보고서 작성

다음 구조로 Markdown 보고서를 작성하세요.

\`\`\`markdown
# 쇼핑몰 주문 데이터 분석 보고서

## 1. 분석 목적

## 2. 데이터 개요

## 3. 전처리 및 분석 기준

## 4. 주요 결과 요약

## 5. 상세 분석

## 6. 인사이트

## 7. 분석 한계

## 8. 다음 분석 방향
\`\`\`

---

## 20.23 평가 기준

종합 실습 결과는 다음 기준으로 평가할 수 있습니다.

| 평가 항목 | 설명 |
|---|---|
| 데이터 이해 | 데이터 구조와 컬럼 의미를 이해했는가 |
| 전처리 | 결측치, 중복값, 날짜, 문자열 처리를 적절히 수행했는가 |
| 데이터 결합 | key 기준 결합과 결합 후 검증을 수행했는가 |
| 분석 정확성 | 집계와 계산이 분석 목적에 맞게 수행되었는가 |
| 시각화 | 질문에 맞는 그래프를 선택했는가 |
| 해석 | 표와 그래프에 대한 해석이 적절한가 |
| 인사이트 | 데이터 기반으로 실무적 의미를 도출했는가 |
| 한계 인식 | 분석의 한계와 주의점을 명확히 적었는가 |
| 보고서 구성 | 읽기 쉬운 구조로 결과를 정리했는가 |

---

## 20.24 자주 하는 실수

종합 실습에서 자주 발생하는 실수를 정리합니다.

---

### 20.24.1 원본 데이터를 바로 수정하는 실수

원본 데이터는 보존하고 복사본을 만들어 처리하는 것이 좋습니다.

\`\`\`python
orders = orders_raw.copy()
\`\`\`

---

### 20.24.2 결합 후 검증하지 않는 실수

\`merge()\`를 실행했다고 결합이 올바른 것은 아닙니다.

반드시 다음을 확인해야 합니다.

\`\`\`python
len(before)
len(after)
df.isna().sum()
df["_merge"].value_counts()
\`\`\`

---

### 20.24.3 key 중복을 확인하지 않는 실수

고객 데이터와 상품 데이터의 key는 유일해야 합니다.

\`\`\`python
customers["customer_id"].is_unique
products["product_id"].is_unique
\`\`\`

---

### 20.24.4 결측치를 무조건 0으로 채우는 실수

쿠폰 금액은 0으로 채울 수 있을 수 있지만, 상품 단가나 고객 ID 결측치를 0으로 채우면 안 됩니다.

컬럼의 의미에 따라 처리 기준이 달라야 합니다.

---

### 20.24.5 날짜 변환 실패를 확인하지 않는 실수

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(
    orders["order_date"],
    errors="coerce"
)
\`\`\`

이후 반드시 \`NaT\`가 생겼는지 확인해야 합니다.

\`\`\`python
orders[orders["order_date_dt"].isna()]
\`\`\`

---

### 20.24.6 그래프만 만들고 해석하지 않는 실수

그래프는 해석 문장과 함께 제시해야 합니다.

\`\`\`text
카테고리별 매출 그래프를 보면 전자기기 매출이 가장 높다.
이는 전자기기의 높은 단가가 전체 매출에 크게 기여했기 때문일 수 있다.
\`\`\`

---

### 20.24.7 상관관계를 인과관계로 해석하는 실수

방문 횟수와 주문 금액이 함께 증가하는 경향이 있어도, 방문 횟수가 주문 금액을 증가시켰다고 단정할 수 없습니다.

안전한 표현:

\`\`\`text
방문 횟수와 주문 금액 사이에는 양의 관계가 관찰된다.
다만 인과관계 여부는 추가 분석이 필요하다.
\`\`\`

---

### 20.24.8 분석 한계를 쓰지 않는 실수

분석 한계는 반드시 포함해야 합니다.

\`\`\`text
데이터 수가 적다.
분석 기간이 짧다.
외부 요인 데이터가 없다.
일부 데이터가 결합되지 않았다.
\`\`\`

---

## 20.25 핵심 정리

이번 장에서는 데이터 분석 기초 과정에서 배운 내용을 하나의 종합 실습으로 연결했습니다.

종합 분석 프로젝트의 기본 흐름은 다음과 같습니다.

\`\`\`text
1. 분석 목적 정의
2. 데이터 준비
3. 데이터 구조 확인
4. 데이터 품질 점검
5. 전처리
6. 데이터 결합
7. 파생 변수 생성
8. 요약 지표 계산
9. 그룹화와 집계
10. 시각화
11. EDA
12. 인사이트 도출
13. 보고서 작성
\`\`\`

분석에서 중요한 것은 코드를 많이 쓰는 것이 아닙니다.  
분석 질문에 맞는 데이터를 준비하고, 적절한 기준으로 처리하며, 결과를 정확하게 해석하는 것입니다.

이번 장에서 특히 중요한 습관은 다음과 같습니다.

\`\`\`text
원본 데이터는 보존한다.
처리 기준을 기록한다.
결합 후 검증한다.
숫자는 표로, 패턴은 그래프로 확인한다.
그래프에는 해석 문장을 붙인다.
상관관계를 인과관계로 단정하지 않는다.
분석 한계를 명확히 적는다.
\`\`\`

데이터 분석 기초 과정은 여기서 마무리됩니다.

이제 여러분은 pandas를 사용해 데이터를 불러오고, 정리하고, 분석하고, 시각화하고, 결과를 보고서로 정리하는 기본 흐름을 수행할 수 있습니다.

다음 과정인 데이터 분석 고급에서는 더 깊은 주제를 다루게 됩니다.

\`\`\`text
고급 pandas 처리
시계열 분석
통계 분석 심화
가설검정
회귀분석
고급 시각화
대용량 데이터 처리
분석 자동화
머신러닝 전처리
실무 분석 프로젝트
\`\`\`

기초 과정에서 배운 내용은 고급 과정의 기반이 됩니다.  
특히 데이터 확인, 전처리, 그룹화, 시각화, EDA, 보고서 작성은 어떤 고급 분석을 하더라도 계속 사용됩니다.

---

## 20.26 연습문제

### 문제 1. 개념 확인

종합 분석 프로젝트의 일반적인 흐름으로 가장 적절한 것은 무엇인가요?

A. 그래프 작성 → 데이터 불러오기 → 전처리 → 분석 목적 정의  
B. 분석 목적 정의 → 데이터 준비 → 전처리 → 분석 → 보고서 작성  
C. 보고서 작성 → 데이터 삭제 → 그래프 작성 → 결측치 확인  
D. 모델 학습 → 데이터 생성 → 결론 작성 → 코드 삭제  

---

### 문제 2. 코드 작성

다음 주문 데이터에서 \`coupon_amount\` 결측치를 0으로 채우세요.

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1, 2, 3],
    "coupon_amount": [1000, None, 0]
})
\`\`\`

---

### 문제 3. 코드 작성

다음 주문 데이터에서 \`order_date\`를 날짜형으로 변환하되, 변환할 수 없는 값은 \`NaT\`로 처리하세요.

\`\`\`python
orders = pd.DataFrame({
    "order_date": ["2026-01-01", "잘못된 날짜", "2026-01-03"]
})
\`\`\`

---

### 문제 4. 코드 작성

다음 고객 데이터에서 \`customer_name\`의 앞뒤 공백을 제거하세요.

\`\`\`python
customers = pd.DataFrame({
    "customer_name": [" 김민수", "이지영 ", " 박철수 "]
})
\`\`\`

---

### 문제 5. 코드 작성

다음 주문 데이터와 고객 데이터를 \`customer_id\` 기준으로 left join하세요.

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1, 2, 3],
    "customer_id": [10, 20, 30]
})

customers = pd.DataFrame({
    "customer_id": [10, 20],
    "customer_name": ["민수", "지영"]
})
\`\`\`

---

### 문제 6. 코드 작성

다음 데이터에서 \`net_amount = quantity * unit_price - coupon_amount\` 컬럼을 만드세요.

\`\`\`python
df = pd.DataFrame({
    "quantity": [1, 2, 3],
    "unit_price": [10000, 20000, 30000],
    "coupon_amount": [0, 1000, 5000]
})
\`\`\`

---

### 문제 7. 코드 작성

다음 데이터에서 카테고리별 총매출과 주문 수를 계산하세요.

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1, 2, 3, 4],
    "category": ["전자기기", "도서", "전자기기", "생활용품"],
    "net_amount": [300000, 20000, 250000, 50000]
})
\`\`\`

---

### 문제 8. 코드 작성

다음 데이터에서 월별 매출을 계산하세요.

\`\`\`python
orders = pd.DataFrame({
    "order_date": ["2026-01-01", "2026-01-15", "2026-02-01", "2026-02-20"],
    "net_amount": [10000, 20000, 30000, 40000]
})
\`\`\`

---

### 문제 9. 해석 문제

다음 결과를 보고 인사이트 문장을 작성하세요.

\`\`\`text
전자기기 카테고리의 총매출이 가장 높고,
평균 주문 금액도 다른 카테고리보다 높다.
\`\`\`

---

### 문제 10. 보고서 작성 문제

종합 분석 보고서에 포함해야 할 항목을 6가지 이상 적으세요.

---

## 20.27 정답 및 해설

### 문제 1 정답

정답: B

종합 분석 프로젝트는 보통 다음 흐름으로 진행합니다.

\`\`\`text
분석 목적 정의
데이터 준비
데이터 구조 확인
전처리
분석
시각화
보고서 작성
\`\`\`

---

### 문제 2 정답

\`\`\`python
orders["coupon_amount"] = orders["coupon_amount"].fillna(0)
\`\`\`

쿠폰 금액 결측치를 쿠폰 미사용으로 해석할 수 있다면 0으로 채울 수 있습니다.

---

### 문제 3 정답

\`\`\`python
orders["order_date_dt"] = pd.to_datetime(
    orders["order_date"],
    errors="coerce"
)
\`\`\`

\`errors="coerce"\`를 사용하면 변환할 수 없는 날짜가 \`NaT\`로 처리됩니다.

---

### 문제 4 정답

\`\`\`python
customers["customer_name"] = customers["customer_name"].str.strip()
\`\`\`

\`str.strip()\`은 문자열 앞뒤 공백을 제거합니다.

---

### 문제 5 정답

\`\`\`python
orders_customer = orders.merge(
    customers,
    on="customer_id",
    how="left"
)

orders_customer
\`\`\`

왼쪽 데이터인 주문 데이터는 모두 유지되고, 고객 정보가 없는 주문은 고객명이 결측치가 됩니다.

---

### 문제 6 정답

\`\`\`python
df["net_amount"] = (
    df["quantity"] * df["unit_price"] - df["coupon_amount"]
)

df
\`\`\`

최종 주문 금액은 수량과 단가를 곱한 뒤 쿠폰 금액을 뺀 값입니다.

---

### 문제 7 정답

\`\`\`python
category_report = (
    orders
    .groupby("category")
    .agg(
        total_sales=("net_amount", "sum"),
        order_count=("order_id", "count")
    )
    .reset_index()
)

category_report
\`\`\`

---

### 문제 8 정답

\`\`\`python
orders["order_date"] = pd.to_datetime(orders["order_date"])
orders["year_month"] = orders["order_date"].dt.to_period("M")

monthly_report = (
    orders
    .groupby("year_month")["net_amount"]
    .sum()
    .reset_index(name="total_sales")
)

monthly_report
\`\`\`

---

### 문제 9 정답

예시 답안:

\`\`\`text
전자기기 카테고리는 총매출과 평균 주문 금액이 모두 높아 전체 매출에 크게 기여하는 핵심 카테고리로 볼 수 있다.
따라서 전자기기 상품군은 재고 관리, 가격 전략, 프로모션 성과 모니터링에서 우선적으로 관리할 필요가 있다.
\`\`\`

---

### 문제 10 정답

종합 분석 보고서에는 다음 항목을 포함할 수 있습니다.

\`\`\`text
분석 목적
데이터 개요
전처리 및 분석 기준
주요 결과 요약
상세 분석 결과
시각화
인사이트
분석 한계
다음 분석 방향
\`\`\`

---

## 20.28 마무리

데이터 분석 기초 과정은 여기서 마무리됩니다.

이 과정에서 배운 핵심은 단순히 pandas 문법이 아닙니다.  
데이터 분석의 전체 흐름을 익히는 것이 핵심입니다.

데이터 분석은 다음 능력들이 함께 필요합니다.

\`\`\`text
데이터를 읽는 능력
데이터 품질을 점검하는 능력
분석 질문을 만드는 능력
필요한 데이터를 선택하는 능력
적절한 기준으로 집계하는 능력
통계값과 그래프를 해석하는 능력
결과를 문서로 정리하는 능력
한계를 인식하고 다음 질문을 만드는 능력
\`\`\`

데이터 분석 기초 과정의 목표는 이 흐름을 혼자 따라갈 수 있게 되는 것입니다.

이제 다음 단계에서는 데이터 분석 고급 과정으로 넘어갈 수 있습니다.

고급 과정에서는 기초 과정에서 배운 내용을 바탕으로 더 깊은 분석을 수행합니다.

\`\`\`text
고급 pandas
시계열 데이터 분석
통계 분석 심화
가설검정
회귀분석
고급 시각화
대용량 데이터 처리
분석 자동화
머신러닝 전처리
실무 프로젝트
\`\`\`

기초 과정에서 배운 전처리, 집계, 시각화, EDA, 보고서 작성 능력은 고급 분석에서도 계속 사용됩니다.

따라서 이번 종합 실습은 끝이 아니라 다음 과정으로 넘어가기 위한 출발점입니다.

---

## 참고 문서

- pandas 공식 문서: Getting started tutorials
- pandas 공식 문서: Merge, join, concatenate and compare
- pandas 공식 문서: Group by: split-apply-combine
- pandas 공식 문서: Working with missing data
- pandas 공식 문서: Chart visualization
- Matplotlib 공식 문서: Pyplot tutorial
- seaborn 공식 문서: Tutorial
`;export{e as default};