var e=`<!-- 원본: python_data_analysis_basic_chapter_4_book.md / 세부 장: 4-6 -->

# 4.6 실무 예제: 고객, 상품, 주문 데이터 만들기

## 4.6.1 고객 데이터 DataFrame 만들기

실무에서 가장 자주 만나는 데이터 중 하나는 고객 데이터다.

고객 데이터에는 보통 다음과 같은 정보가 들어 있다.

- 고객 ID
- 이름
- 나이
- 지역
- 회원 등급

이를 DataFrame으로 만들어 보자.

\`\`\`python
import pandas as pd

customers = pd.DataFrame({
    "customer_id": [1, 2, 3, 4],
    "name": ["김민수", "이지영", "박철수", "최유진"],
    "age": [28, 31, 25, 34],
    "region": ["서울", "부산", "대구", "서울"],
    "grade": ["VIP", "BASIC", "GOLD", "VIP"],
})

print(customers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
   customer_id name  age region  grade
0            1  김민수   28     서울    VIP
1            2  이지영   31     부산  BASIC
2            3  박철수   25     대구   GOLD
3            4  최유진   34     서울    VIP
\`\`\`

이 DataFrame에서 한 행은 한 명의 고객을 의미한다. 각 열은 고객의 속성을 나타낸다.

이제 기본 정보를 확인해 보자.

\`\`\`python
print(customers.shape)
print(customers.columns)
print(customers.dtypes)
\`\`\`

이런 코드는 데이터 분석을 시작할 때 항상 사용하는 기본 확인 코드다.

---

## 4.6.2 상품 데이터 DataFrame 만들기

이번에는 상품 데이터를 만들어 보자.

\`\`\`python
import pandas as pd

products = pd.DataFrame({
    "product_id": [101, 102, 103, 104],
    "product_name": ["노트북", "마우스", "키보드", "모니터"],
    "category": ["전자기기", "주변기기", "주변기기", "전자기기"],
    "price": [1200000, 25000, 45000, 300000],
    "stock": [5, 30, 20, 8],
})

print(products)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
   product_id product_name category    price  stock
0         101          노트북     전자기기  1200000      5
1         102          마우스     주변기기    25000     30
2         103          키보드     주변기기    45000     20
3         104          모니터     전자기기   300000      8
\`\`\`

상품 데이터에서는 \`price\`와 \`stock\`이 숫자형 컬럼이다. \`product_name\`과 \`category\`는 문자열형 컬럼이다.

기본 구조를 확인해 보자.

\`\`\`python
products.info()
\`\`\`

수치형 컬럼의 요약 통계도 확인할 수 있다.

\`\`\`python
print(products.describe())
\`\`\`

아직 통계 해석을 깊게 할 필요는 없다. 지금은 \`describe()\`가 숫자 컬럼을 요약해 준다는 점만 이해하면 된다.

---

## 4.6.3 주문 데이터 DataFrame 만들기

주문 데이터는 고객 데이터와 상품 데이터보다 분석에 더 자주 사용된다. 매출 분석, 고객 분석, 상품 분석의 출발점이 되는 경우가 많다.

\`\`\`python
import pandas as pd

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005],
    "customer_id": [1, 2, 1, 4, 3],
    "product_id": [101, 102, 103, 104, 102],
    "quantity": [1, 2, 1, 1, 3],
    "order_date": ["2026-06-01", "2026-06-01", "2026-06-02", "2026-06-03", "2026-06-03"],
})

print(orders)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
   order_id  customer_id  product_id  quantity  order_date
0      1001            1         101         1  2026-06-01
1      1002            2         102         2  2026-06-01
2      1003            1         103         1  2026-06-02
3      1004            4         104         1  2026-06-03
4      1005            3         102         3  2026-06-03
\`\`\`

주문 데이터에서 한 행은 하나의 주문을 나타낸다.

여기서 \`customer_id\`는 어떤 고객의 주문인지 나타내고, \`product_id\`는 어떤 상품을 주문했는지 나타낸다. 나중에 데이터 결합 장에서는 이 두 값을 사용해 고객 정보와 상품 정보를 주문 데이터에 연결할 수 있다.

---

## 4.6.4 DataFrame에서 하나의 컬럼 계산하기

상품 데이터에서 재고 금액을 계산해 보자. 재고 금액은 상품 가격과 재고 수량을 곱한 값이다.

\`\`\`python
products["stock_value"] = products["price"] * products["stock"]

print(products)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
   product_id product_name category    price  stock  stock_value
0         101          노트북     전자기기  1200000      5      6000000
1         102          마우스     주변기기    25000     30       750000
2         103          키보드     주변기기    45000     20       900000
3         104          모니터     전자기기   300000      8      2400000
\`\`\`

여기서 중요한 점은 \`price\` 컬럼과 \`stock\` 컬럼을 곱해 새 컬럼을 만들었다는 것이다. 반복문을 사용하지 않았지만 각 행에 대해 계산이 적용되었다.

이 방식은 pandas에서 파생 변수를 만들 때 가장 기본이 되는 패턴이다.

---

## 4.6.5 DataFrame에서 간단한 조건 비교하기

상품 가격이 100,000원 이상인지 확인해 보자.

\`\`\`python
is_expensive = products["price"] >= 100000
print(is_expensive)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
0     True
1    False
2    False
3     True
Name: price, dtype: bool
\`\`\`

결과는 Series다. 각 상품이 조건을 만족하는지 \`True\` 또는 \`False\`로 표시한다.

이 결과를 사용하면 나중에 조건에 맞는 행만 선택할 수 있다. 조건 필터링은 7장에서 자세히 다룬다.

---

## 4.6.6 DataFrame과 Excel의 공통점과 차이점

pandas DataFrame은 Excel 표와 비슷해 보인다. 하지만 실제 사용 방식에는 차이가 있다.

공통점은 다음과 같다.

- 행과 열로 데이터를 표현한다.
- 컬럼 이름을 사용한다.
- 숫자, 문자열, 날짜 데이터를 다룰 수 있다.
- 계산 결과를 새 열로 만들 수 있다.
- 필터링과 정렬이 가능하다.

차이점은 다음과 같다.

| 구분 | Excel | pandas |
|---|---|---|
| 사용 방식 | 마우스와 메뉴 중심 | 코드 중심 |
| 반복 작업 | 수작업 또는 매크로 | 코드 재실행 |
| 대량 데이터 | 느려질 수 있음 | 비교적 자동화에 적합 |
| 재현성 | 작업 과정이 남지 않을 수 있음 | 코드로 과정이 남음 |
| 협업 | 파일 공유 중심 | 코드와 데이터 분리 가능 |

Excel은 눈으로 데이터를 확인하고 간단히 수정하기 좋다. pandas는 반복 가능한 분석 과정을 코드로 남기고, 같은 작업을 여러 데이터에 반복 적용하기 좋다.

데이터 분석에서는 Excel과 pandas 중 하나만 선택해야 하는 것이 아니다. Excel에서 데이터를 확인하고, pandas로 반복 분석과 전처리를 수행하고, 결과를 다시 Excel 파일로 저장할 수도 있다.

---

## 4.6.7 pandas를 처음 사용할 때 자주 하는 실수

pandas를 처음 배울 때는 다음 실수를 자주 한다.

### 실수 1: 컬럼 이름을 따옴표 없이 작성한다

잘못된 예:

\`\`\`python
customers[name]
\`\`\`

올바른 예:

\`\`\`python
customers["name"]
\`\`\`

컬럼 이름은 문자열이므로 따옴표로 감싸야 한다.

### 실수 2: 하나의 컬럼 선택과 여러 컬럼 선택을 헷갈린다

\`\`\`python
customers["name"]
\`\`\`

위 코드는 Series를 반환한다.

\`\`\`python
customers[["name", "region"]]
\`\`\`

위 코드는 DataFrame을 반환한다.

여러 컬럼을 선택할 때는 컬럼 이름 리스트를 전달해야 하므로 대괄호가 두 겹이 된다.

### 실수 3: \`shape\`를 함수처럼 호출한다

잘못된 예:

\`\`\`python
customers.shape()
\`\`\`

올바른 예:

\`\`\`python
customers.shape
\`\`\`

\`shape\`는 함수가 아니라 속성이다.

### 실수 4: DataFrame을 전체 출력하려고 한다

데이터가 많을 때는 전체를 출력하기보다 다음 함수를 사용하는 것이 좋다.

\`\`\`python
customers.head()
customers.info()
customers.describe()
\`\`\`

### 실수 5: 원본 데이터가 바뀌는지 확인하지 않는다

pandas에는 원본을 바꾸는 코드와 새 결과를 반환하는 코드가 섞여 있다. 초보 단계에서는 코드를 실행한 뒤 \`head()\`나 \`columns\`로 실제 DataFrame이 어떻게 바뀌었는지 확인하는 습관이 중요하다.

---

# 4장 핵심 정리

이 장에서는 pandas의 시작점이 되는 기본 개념을 배웠다.

pandas는 표 형태 데이터를 다루기 위한 파이썬 라이브러리다. 데이터 분석에서 CSV, Excel, 데이터베이스, API 응답 등 다양한 데이터를 처리할 때 자주 사용된다.

pandas의 핵심 자료구조는 \`Series\`와 \`DataFrame\`이다.

\`Series\`는 한 줄짜리 데이터 또는 하나의 컬럼을 표현한다. 값과 인덱스를 함께 가진다.

\`DataFrame\`은 행과 열이 있는 표 형태 데이터를 표현한다. 여러 개의 Series가 모여 만들어진 구조로 볼 수 있다.

DataFrame을 다룰 때는 다음 개념이 중요하다.

- 행은 하나의 관측값 또는 기록이다.
- 열은 하나의 변수 또는 속성이다.
- 컬럼 이름은 데이터를 선택하고 해석하는 기준이 된다.
- 인덱스는 행을 구분하는 이름이다.
- \`shape\`, \`columns\`, \`index\`, \`dtypes\`, \`head()\`, \`info()\`, \`describe()\`로 기본 구조를 확인할 수 있다.

pandas를 처음 배울 때는 복잡한 분석보다 DataFrame의 구조에 익숙해지는 것이 중요하다. 앞으로의 장에서는 이 DataFrame을 바탕으로 데이터를 불러오고, 선택하고, 필터링하고, 수정하고, 정리하는 방법을 하나씩 배운다.

---

# 연습문제

## 문제 1. 개념 확인

다음 중 pandas에 대한 설명으로 가장 적절한 것을 고르시오.

A. 이미지 편집을 위한 파이썬 라이브러리다.  
B. 표 형태 데이터를 다루기 위한 파이썬 라이브러리다.  
C. 웹 서버를 만들기 위한 전용 프레임워크다.  
D. 파이썬 코드를 실행하는 인터프리터다.

---

## 문제 2. Series와 DataFrame

다음 설명이 맞으면 O, 틀리면 X를 쓰시오.

1. Series는 하나의 컬럼처럼 볼 수 있다.  
2. DataFrame은 행과 열이 있는 표 형태 데이터다.  
3. DataFrame에서 하나의 컬럼을 선택하면 항상 DataFrame이 반환된다.  
4. DataFrame의 기본 인덱스는 보통 0부터 시작한다.

---

## 문제 3. 코드 결과 예측

다음 코드의 실행 결과를 예상하시오.

\`\`\`python
import pandas as pd

scores = pd.Series([80, 90, 70])
print(scores)
\`\`\`

---

## 문제 4. Series 만들기

다음 조건을 만족하는 Series를 만드시오.

- 인덱스: \`"서울"\`, \`"부산"\`, \`"대구"\`
- 값: \`120\`, \`80\`, \`60\`
- 변수명: \`customer_count\`

---

## 문제 5. DataFrame 만들기

다음 상품 데이터를 DataFrame으로 만드시오.

| product_id | product_name | price |
|---:|---|---:|
| 101 | 노트북 | 1200000 |
| 102 | 마우스 | 25000 |
| 103 | 키보드 | 45000 |

변수명은 \`products\`로 하시오.

---

## 문제 6. 컬럼 선택

다음 DataFrame에서 \`name\` 컬럼만 선택하는 코드를 작성하시오.

\`\`\`python
import pandas as pd

customers = pd.DataFrame({
    "name": ["김민수", "이지영", "박철수"],
    "age": [28, 31, 25],
    "region": ["서울", "부산", "대구"],
})
\`\`\`

---

## 문제 7. 여러 컬럼 선택

문제 6의 \`customers\` DataFrame에서 \`name\`과 \`region\` 컬럼만 선택하는 코드를 작성하시오.

---

## 문제 8. DataFrame 구조 확인

다음 항목을 확인하는 코드를 작성하시오.

1. DataFrame의 행과 열 개수  
2. 컬럼 이름 목록  
3. 컬럼별 자료형  
4. 앞의 2개 행

---

## 문제 9. 파생 컬럼 만들기

다음 주문 DataFrame에서 \`price\`와 \`quantity\`를 곱해 \`total\` 컬럼을 추가하시오.

\`\`\`python
import pandas as pd

orders = pd.DataFrame({
    "product": ["노트북", "마우스", "키보드"],
    "price": [1200000, 25000, 45000],
    "quantity": [1, 2, 3],
})
\`\`\`

---

## 문제 10. 오류 수정

다음 코드에는 오류가 있다. 올바르게 수정하시오.

\`\`\`python
import pandas as pd

customers = pd.DataFrame({
    "name": ["김민수", "이지영"],
    "age": [28, 31],
})

print(customers[name])
\`\`\`

---

# 정답 및 해설

## 문제 1 정답

정답: B

pandas는 표 형태 데이터를 다루기 위한 파이썬 라이브러리다. 데이터 분석에서 CSV, Excel, SQL, JSON 등 다양한 데이터를 DataFrame으로 다루는 데 많이 사용된다.

---

## 문제 2 정답

1. O  
2. O  
3. X  
4. O

해설:

DataFrame에서 하나의 컬럼을 선택하면 일반적으로 Series가 반환된다.

\`\`\`python
df["name"]
\`\`\`

여러 컬럼을 선택하면 DataFrame이 반환된다.

\`\`\`python
df[["name", "region"]]
\`\`\`

---

## 문제 3 정답

실행 결과는 다음과 비슷하다.

\`\`\`text
0    80
1    90
2    70
dtype: int64
\`\`\`

해설:

리스트로 Series를 만들면 기본 인덱스가 0부터 자동으로 붙는다.

---

## 문제 4 정답

\`\`\`python
import pandas as pd

customer_count = pd.Series(
    [120, 80, 60],
    index=["서울", "부산", "대구"]
)

print(customer_count)
\`\`\`

---

## 문제 5 정답

\`\`\`python
import pandas as pd

products = pd.DataFrame({
    "product_id": [101, 102, 103],
    "product_name": ["노트북", "마우스", "키보드"],
    "price": [1200000, 25000, 45000],
})

print(products)
\`\`\`

해설:

딕셔너리의 key는 컬럼 이름이 되고, value는 각 컬럼의 값 목록이 된다.

---

## 문제 6 정답

\`\`\`python
customers["name"]
\`\`\`

해설:

하나의 컬럼을 선택하면 Series가 반환된다.

---

## 문제 7 정답

\`\`\`python
customers[["name", "region"]]
\`\`\`

해설:

여러 컬럼을 선택할 때는 컬럼 이름 리스트를 전달해야 한다. 따라서 대괄호가 두 겹이 된다.

---

## 문제 8 정답

\`\`\`python
print(customers.shape)
print(customers.columns)
print(customers.dtypes)
print(customers.head(2))
\`\`\`

해설:

- \`shape\`: 행과 열 개수 확인
- \`columns\`: 컬럼 이름 확인
- \`dtypes\`: 컬럼별 자료형 확인
- \`head(2)\`: 앞의 2개 행 확인

---

## 문제 9 정답

\`\`\`python
orders["total"] = orders["price"] * orders["quantity"]
print(orders)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
  product    price  quantity    total
0     노트북  1200000         1  1200000
1      마우스    25000         2    50000
2      키보드    45000         3   135000
\`\`\`

해설:

pandas에서는 컬럼끼리 연산하면 같은 행의 값끼리 계산된다. 반복문 없이 새 컬럼을 만들 수 있다.

---

## 문제 10 정답

\`\`\`python
print(customers["name"])
\`\`\`

해설:

\`name\`은 컬럼 이름이므로 문자열로 작성해야 한다. 따옴표 없이 \`name\`이라고 쓰면 파이썬은 \`name\`이라는 변수를 찾으려고 한다. 해당 변수가 정의되어 있지 않으면 \`NameError\`가 발생한다.

---

# 4장 마무리

이번 장에서는 pandas의 핵심 자료구조인 Series와 DataFrame을 배웠다. 아직 복잡한 분석을 하지는 않았지만, pandas를 사용할 때 가장 중요한 기반을 다졌다.

다음 장에서는 실제 CSV, Excel, JSON 데이터를 불러오고 저장하는 방법을 배운다. 지금까지는 직접 DataFrame을 만들었지만, 실무에서는 대부분 파일이나 외부 시스템에서 데이터를 가져온다. 따라서 다음 장부터는 pandas가 실제 데이터 분석 도구로 어떻게 사용되는지 더 구체적으로 경험하게 된다.
`;export{e as default};