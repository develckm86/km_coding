var e=`# 4장. pandas 시작하기

3장에서 우리는 NumPy를 사용해 숫자 배열을 다루는 방법을 배웠다. NumPy 배열은 빠른 수치 계산에 강하다. 그러나 실제 데이터 분석에서 만나는 데이터는 단순한 숫자 배열만으로는 표현하기 어려운 경우가 많다.

예를 들어 쇼핑몰 주문 데이터를 생각해 보자.

\`\`\`text
주문번호, 고객명, 상품명, 수량, 단가, 주문일, 지역
\`\`\`

이 데이터에는 숫자도 있고, 문자열도 있고, 날짜도 있다. 열마다 의미가 다르고, 행마다 하나의 주문 기록을 나타낸다. 이런 데이터를 분석하려면 단순히 숫자 배열만 다루는 것보다 **행과 열이 있는 표 형태 데이터**를 편하게 다루는 도구가 필요하다.

이때 사용하는 대표적인 라이브러리가 **pandas**다.

pandas는 파이썬에서 표 형태 데이터를 다루기 위해 가장 많이 사용하는 라이브러리 중 하나다. CSV, Excel, JSON, SQL 같은 다양한 데이터 원본을 읽고, 데이터를 확인하고, 필요한 행과 열을 선택하고, 값을 수정하고, 그룹별로 집계하는 작업을 할 수 있다.

이 장에서는 pandas의 가장 기본이 되는 두 자료구조인 **Series**와 **DataFrame**을 배운다. 아직 데이터를 파일에서 불러오거나 복잡하게 분석하지는 않는다. 먼저 pandas가 데이터를 어떤 형태로 표현하는지 이해하는 것이 목표다.

---

## 이 장에서 배울 내용

이 장을 마치면 다음 내용을 할 수 있어야 한다.

- pandas가 어떤 목적으로 사용되는 라이브러리인지 설명할 수 있다.
- Excel 표와 pandas DataFrame의 공통점과 차이점을 이해할 수 있다.
- \`Series\`가 무엇인지 설명하고 직접 만들 수 있다.
- \`DataFrame\`이 무엇인지 설명하고 직접 만들 수 있다.
- DataFrame의 행, 열, 인덱스, 컬럼 개념을 이해할 수 있다.
- DataFrame의 기본 구조를 확인할 수 있다.
- pandas의 기본 출력 설정을 조정할 수 있다.
- 고객 데이터, 상품 데이터, 주문 데이터를 간단한 DataFrame으로 표현할 수 있다.

---

# 4.1 pandas란?

## 4.1.1 pandas의 역할

**pandas**는 파이썬에서 데이터를 표 형태로 다루기 위한 라이브러리다.

데이터 분석에서 가장 자주 만나는 형태는 행과 열로 이루어진 표다. 엑셀 파일, CSV 파일, 데이터베이스 테이블, 설문 응답 결과, 주문 내역, 고객 목록 모두 표 형태로 볼 수 있다.

예를 들어 다음과 같은 고객 데이터가 있다고 하자.

| customer_id | name | grade | region |
|---:|---|---|---|
| 1 | 김민수 | VIP | 서울 |
| 2 | 이지영 | BASIC | 부산 |
| 3 | 박철수 | GOLD | 대구 |

이런 데이터를 파이썬 기본 자료구조만으로도 표현할 수는 있다.

\`\`\`python
customers = [
    {"customer_id": 1, "name": "김민수", "grade": "VIP", "region": "서울"},
    {"customer_id": 2, "name": "이지영", "grade": "BASIC", "region": "부산"},
    {"customer_id": 3, "name": "박철수", "grade": "GOLD", "region": "대구"},
]
\`\`\`

리스트와 딕셔너리를 사용하면 여러 고객 정보를 저장할 수 있다. 하지만 데이터가 많아지면 문제가 생긴다.

예를 들어 다음 작업을 해야 한다고 생각해 보자.

- VIP 고객만 골라내기
- 지역별 고객 수 세기
- 특정 컬럼만 선택하기
- 새 컬럼 추가하기
- 결측치 확인하기
- Excel 파일로 저장하기

이런 작업을 리스트와 딕셔너리만으로 처리하려면 반복문과 조건문을 계속 작성해야 한다. pandas를 사용하면 표 형태 데이터에 자주 필요한 작업을 더 간결하게 처리할 수 있다.

pandas의 핵심은 다음 두 가지다.

- \`Series\`: 한 줄짜리 데이터 또는 하나의 컬럼을 표현하는 자료구조
- \`DataFrame\`: 행과 열이 있는 표 형태 데이터를 표현하는 자료구조

앞으로 데이터 분석 기초 과정의 대부분은 DataFrame을 다루는 방식으로 진행된다.

---

## 4.1.2 pandas를 사용하는 이유

pandas를 사용하는 가장 큰 이유는 **데이터 분석 작업을 표 중심으로 쉽게 처리할 수 있기 때문**이다.

실무 데이터는 보통 다음과 같은 특징을 가진다.

첫째, 데이터가 행과 열로 구성되어 있다.  
둘째, 열마다 의미와 자료형이 다르다.  
셋째, 일부 값이 비어 있을 수 있다.  
넷째, 여러 파일이나 여러 테이블로 나뉘어 있을 수 있다.  
다섯째, 분석 전에 정리와 변환이 필요하다.

pandas는 이런 상황을 다루기 위해 만들어진 도구다.

예를 들어 주문 데이터가 있을 때 pandas를 사용하면 다음과 같은 작업을 할 수 있다.

\`\`\`python
import pandas as pd

orders = pd.DataFrame({
    "product": ["노트북", "마우스", "키보드"],
    "price": [1200000, 25000, 45000],
    "quantity": [1, 2, 3],
})

orders["total"] = orders["price"] * orders["quantity"]
print(orders)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
  product    price  quantity    total
0     노트북  1200000         1  1200000
1      마우스    25000         2    50000
2      키보드    45000         3   135000
\`\`\`

위 코드에서 중요한 점은 반복문을 직접 작성하지 않았다는 것이다. \`price\` 컬럼과 \`quantity\` 컬럼을 곱하자, pandas가 각 행에 대해 계산을 수행해 새 컬럼을 만들었다.

이런 방식은 데이터 분석에서 매우 자주 사용된다.

---

## 4.1.3 pandas와 NumPy의 관계

NumPy는 숫자 배열을 빠르게 계산하는 데 강하고, pandas는 표 형태 데이터를 다루는 데 강하다.

두 라이브러리는 서로 경쟁하는 도구가 아니라 함께 사용되는 경우가 많다.

| 구분 | NumPy | pandas |
|---|---|---|
| 중심 자료구조 | 배열 | Series, DataFrame |
| 데이터 형태 | 주로 숫자 배열 | 행과 열이 있는 표 |
| 강점 | 빠른 수치 계산 | 데이터 정리, 탐색, 집계 |
| 주요 사용 상황 | 수학 계산, 배열 연산 | CSV, Excel, 데이터 분석 |

pandas는 내부적으로 NumPy 배열 개념과 밀접하게 연결되어 있다. 그래서 3장에서 배운 배열, 인덱싱, 슬라이싱, 벡터화 연산은 pandas를 이해하는 데 도움이 된다.

그러나 pandas는 NumPy보다 더 높은 수준의 도구다. 열 이름, 행 인덱스, 결측치 처리, 파일 입출력, 그룹화 같은 데이터 분석 기능을 제공한다.

---

## 4.1.4 pandas 불러오기

pandas를 사용하려면 먼저 import해야 한다.

\`\`\`python
import pandas as pd
\`\`\`

여기서 \`pd\`는 pandas의 관례적인 별칭이다. 꼭 \`pd\`라고 해야만 하는 것은 아니지만, 전 세계 대부분의 pandas 예제와 문서에서 \`pd\`를 사용한다. 따라서 수업에서도 \`pd\`를 사용한다.

이후 pandas 기능을 사용할 때는 다음처럼 작성한다.

\`\`\`python
pd.Series([10, 20, 30])
pd.DataFrame({"name": ["김민수", "이지영"]})
\`\`\`

pandas가 설치되어 있지 않다면 다음 명령으로 설치할 수 있다.

\`\`\`bash
pip install pandas
\`\`\`

Jupyter Notebook에서는 셀에 다음처럼 입력해 설치하기도 한다.

\`\`\`python
!pip install pandas
\`\`\`

다만 실제 프로젝트에서는 터미널에서 가상환경을 활성화한 뒤 설치하는 방식을 권장한다.

---

## 4.1.5 pandas에서 자주 만나는 용어

pandas를 처음 배울 때는 용어가 중요하다. 같은 표를 보더라도 어떤 부분을 행이라고 하고, 어떤 부분을 열이라고 하며, 인덱스가 무엇인지 알아야 한다.

다음 표를 보자.

| index | name | age | region |
|---:|---|---:|---|
| 0 | 김민수 | 28 | 서울 |
| 1 | 이지영 | 31 | 부산 |
| 2 | 박철수 | 25 | 대구 |

여기서 각 요소는 다음과 같이 부른다.

- 행: 한 사람의 데이터처럼 가로 한 줄의 데이터
- 열: \`name\`, \`age\`, \`region\`처럼 세로 방향의 데이터
- 컬럼: 열 이름 또는 열 자체를 가리키는 말
- 인덱스: 각 행을 구분하는 이름 또는 번호
- 값: 표 안에 들어 있는 실제 데이터
- DataFrame: 위와 같은 전체 표
- Series: 하나의 열 또는 한 줄짜리 데이터

처음에는 인덱스와 행 번호가 같아 보인다. 하지만 pandas에서 인덱스는 단순한 행 번호가 아니라, 각 행을 구분하는 이름으로 사용할 수 있다. 이 차이는 뒤에서 조금씩 더 중요해진다.

---

# 4.2 Series

## 4.2.1 Series란?

**Series**는 pandas에서 한 줄짜리 데이터 또는 하나의 컬럼을 표현하는 자료구조다.

가장 단순하게는 값들이 일렬로 나열된 형태라고 생각할 수 있다.

\`\`\`python
import pandas as pd

scores = pd.Series([80, 90, 75, 100])
print(scores)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
0     80
1     90
2     75
3    100
dtype: int64
\`\`\`

왼쪽의 \`0\`, \`1\`, \`2\`, \`3\`은 인덱스이고, 오른쪽의 \`80\`, \`90\`, \`75\`, \`100\`은 값이다. 마지막 줄의 \`dtype: int64\`는 이 Series에 들어 있는 값의 자료형을 의미한다.

Series는 단순한 리스트처럼 보이지만, 리스트와 다르게 인덱스와 자료형 정보를 함께 가진다.

---

## 4.2.2 리스트로 Series 만들기

가장 기본적인 Series 생성 방법은 리스트를 전달하는 것이다.

\`\`\`python
import pandas as pd

prices = pd.Series([12000, 15000, 9000, 30000])
print(prices)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
0    12000
1    15000
2     9000
3    30000
dtype: int64
\`\`\`

리스트에는 값만 있었지만, Series로 바뀌면서 자동으로 인덱스가 붙었다. 기본 인덱스는 \`0\`부터 시작한다.

Series는 하나의 컬럼처럼 사용할 수 있다. 예를 들어 상품 가격 컬럼을 따로 떼어 놓은 것이라고 생각할 수 있다.

---

## 4.2.3 인덱스를 직접 지정하기

Series를 만들 때 인덱스를 직접 지정할 수도 있다.

\`\`\`python
import pandas as pd

sales = pd.Series(
    [100, 150, 80],
    index=["월요일", "화요일", "수요일"]
)

print(sales)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
월요일    100
화요일    150
수요일     80
dtype: int64
\`\`\`

이제 \`0\`, \`1\`, \`2\` 대신 요일 이름이 인덱스로 사용된다.

인덱스를 직접 지정하면 데이터를 더 의미 있게 다룰 수 있다. 예를 들어 월별 매출, 상품별 재고, 지역별 고객 수처럼 이름이 있는 데이터를 표현할 때 유용하다.

---

## 4.2.4 딕셔너리로 Series 만들기

딕셔너리를 사용해 Series를 만들 수도 있다.

\`\`\`python
import pandas as pd

stock = pd.Series({
    "노트북": 5,
    "마우스": 20,
    "키보드": 12,
})

print(stock)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
노트북     5
마우스    20
키보드    12
dtype: int64
\`\`\`

딕셔너리의 key는 Series의 인덱스가 되고, value는 Series의 값이 된다.

이 방식은 의미 있는 이름과 값을 함께 가진 데이터를 만들 때 편리하다.

---

## 4.2.5 Series의 값 선택

Series에서 값을 선택하는 방법은 크게 두 가지다.

첫째, 인덱스 이름으로 선택한다.  
둘째, 위치 번호로 선택한다.

먼저 인덱스 이름으로 선택해 보자.

\`\`\`python
import pandas as pd

stock = pd.Series({
    "노트북": 5,
    "마우스": 20,
    "키보드": 12,
})

print(stock["마우스"])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
20
\`\`\`

이번에는 위치 번호로 선택해 보자.

\`\`\`python
print(stock.iloc[0])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
5
\`\`\`

\`iloc\`는 위치 기반으로 값을 선택할 때 사용한다. \`0\`은 첫 번째 값을 의미한다.

pandas에서는 나중에 \`loc\`와 \`iloc\`를 더 자세히 배운다. 지금은 다음 정도만 기억하면 된다.

- \`loc\`: 인덱스 이름 기준 선택
- \`iloc\`: 위치 번호 기준 선택

Series에서도 이 구분을 이해해 두면 DataFrame을 배울 때 훨씬 수월하다.

---

## 4.2.6 Series의 기본 정보 확인

Series는 값뿐만 아니라 여러 정보를 함께 가진다.

\`\`\`python
import pandas as pd

prices = pd.Series([12000, 15000, 9000, 30000], name="price")

print(prices.index)
print(prices.values)
print(prices.dtype)
print(prices.name)
\`\`\`

실행 결과는 환경에 따라 조금 다를 수 있지만, 대략 다음과 같다.

\`\`\`text
RangeIndex(start=0, stop=4, step=1)
[12000 15000  9000 30000]
int64
price
\`\`\`

각 속성의 의미는 다음과 같다.

| 속성 | 의미 |
|---|---|
| \`index\` | Series의 인덱스 |
| \`values\` | 실제 값 배열 |
| \`dtype\` | 값의 자료형 |
| \`name\` | Series의 이름 |

Series의 이름은 DataFrame의 컬럼 이름처럼 사용될 수 있다.

---

## 4.2.7 Series 연산

Series는 NumPy 배열처럼 여러 값에 한 번에 연산을 적용할 수 있다.

\`\`\`python
import pandas as pd

prices = pd.Series([10000, 20000, 30000])

discounted = prices * 0.9
print(discounted)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
0     9000.0
1    18000.0
2    27000.0
dtype: float64
\`\`\`

반복문을 사용하지 않았지만 모든 값에 \`0.9\`가 곱해졌다. 이런 계산 방식은 데이터 분석에서 매우 중요하다.

Series끼리도 연산할 수 있다.

\`\`\`python
import pandas as pd

price = pd.Series([10000, 20000, 30000])
quantity = pd.Series([1, 3, 2])

total = price * quantity
print(total)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
0    10000
1    60000
2    60000
dtype: int64
\`\`\`

각 위치의 값끼리 곱해졌다.

---

## 4.2.8 Series와 인덱스 정렬

Series끼리 연산할 때는 단순히 위치만 보는 것이 아니라 **인덱스 기준으로 맞춰서 계산**한다.

\`\`\`python
import pandas as pd

s1 = pd.Series([10, 20, 30], index=["A", "B", "C"])
s2 = pd.Series([1, 2, 3], index=["B", "C", "D"])

result = s1 + s2
print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
A     NaN
B    21.0
C    32.0
D     NaN
dtype: float64
\`\`\`

\`B\`와 \`C\`는 두 Series에 모두 있으므로 계산되었다. 하지만 \`A\`는 \`s2\`에 없고, \`D\`는 \`s1\`에 없기 때문에 결과가 \`NaN\`이 되었다.

\`NaN\`은 결측치를 의미한다. 즉, 값이 없다는 뜻이다.

이 예제는 pandas의 중요한 특징을 보여 준다. pandas는 데이터를 계산할 때 인덱스와 컬럼 이름을 기준으로 정렬하고 맞춰서 처리한다.

---

## 4.2.9 Series 조건 비교

Series는 조건 비교도 한 번에 할 수 있다.

\`\`\`python
import pandas as pd

prices = pd.Series([12000, 15000, 9000, 30000])

result = prices >= 15000
print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
0    False
1     True
2    False
3     True
dtype: bool
\`\`\`

각 가격이 \`15000\` 이상인지 비교한 결과가 \`True\` 또는 \`False\`로 나온다.

이런 결과는 나중에 DataFrame에서 조건 필터링을 할 때 매우 중요하게 사용된다.

---

# 4.3 DataFrame

## 4.3.1 DataFrame이란?

**DataFrame**은 pandas에서 행과 열이 있는 표 형태 데이터를 표현하는 자료구조다.

Series가 하나의 컬럼이라면, DataFrame은 여러 개의 Series가 모인 표라고 볼 수 있다.

\`\`\`python
import pandas as pd

customers = pd.DataFrame({
    "name": ["김민수", "이지영", "박철수"],
    "age": [28, 31, 25],
    "region": ["서울", "부산", "대구"],
})

print(customers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
  name  age region
0  김민수   28     서울
1  이지영   31     부산
2  박철수   25     대구
\`\`\`

이 표에서 \`name\`, \`age\`, \`region\`은 컬럼이다. 왼쪽의 \`0\`, \`1\`, \`2\`는 인덱스다. 각 가로줄은 한 명의 고객 정보를 나타낸다.

DataFrame은 데이터 분석에서 가장 중심이 되는 자료구조다. 앞으로 CSV 파일을 읽어도, Excel 파일을 읽어도, API 데이터를 정리해도 대부분 DataFrame 형태로 다루게 된다.

---

## 4.3.2 딕셔너리로 DataFrame 만들기

가장 자주 사용하는 DataFrame 생성 방법은 딕셔너리를 사용하는 것이다.

\`\`\`python
import pandas as pd

products = pd.DataFrame({
    "product_id": [101, 102, 103],
    "name": ["노트북", "마우스", "키보드"],
    "price": [1200000, 25000, 45000],
})

print(products)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
   product_id name    price
0         101  노트북  1200000
1         102  마우스    25000
2         103  키보드    45000
\`\`\`

이때 딕셔너리의 key는 컬럼 이름이 되고, value는 각 컬럼의 값 목록이 된다.

\`\`\`python
{
    "product_id": [101, 102, 103],
    "name": ["노트북", "마우스", "키보드"],
    "price": [1200000, 25000, 45000],
}
\`\`\`

각 리스트의 길이는 같아야 한다. 만약 컬럼마다 값의 개수가 다르면 DataFrame을 만들 수 없다.

잘못된 예를 보자.

\`\`\`python
import pandas as pd

products = pd.DataFrame({
    "name": ["노트북", "마우스", "키보드"],
    "price": [1200000, 25000],
})
\`\`\`

\`name\` 컬럼에는 값이 3개이고, \`price\` 컬럼에는 값이 2개다. 표를 만들려면 각 행마다 모든 컬럼의 값이 있어야 하므로 이런 구조는 오류가 발생한다.

---

## 4.3.3 리스트 안의 딕셔너리로 DataFrame 만들기

리스트 안에 딕셔너리를 넣어 DataFrame을 만들 수도 있다.

\`\`\`python
import pandas as pd

customers = pd.DataFrame([
    {"name": "김민수", "age": 28, "region": "서울"},
    {"name": "이지영", "age": 31, "region": "부산"},
    {"name": "박철수", "age": 25, "region": "대구"},
])

print(customers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
  name  age region
0  김민수   28     서울
1  이지영   31     부산
2  박철수   25     대구
\`\`\`

이 방식은 API 응답 데이터나 JSON 데이터를 DataFrame으로 바꿀 때 자주 사용된다.

예를 들어 다음처럼 여러 개의 딕셔너리가 리스트에 들어 있는 구조는 실무에서 매우 흔하다.

\`\`\`python
data = [
    {"order_id": 1, "product": "노트북", "amount": 1200000},
    {"order_id": 2, "product": "마우스", "amount": 50000},
    {"order_id": 3, "product": "키보드", "amount": 135000},
]

orders = pd.DataFrame(data)
\`\`\`

리스트의 각 딕셔너리는 DataFrame의 한 행이 된다. 딕셔너리의 key는 컬럼 이름이 된다.

---

## 4.3.4 Series를 모아 DataFrame 만들기

Series 여러 개를 모아 DataFrame을 만들 수도 있다.

\`\`\`python
import pandas as pd

names = pd.Series(["김민수", "이지영", "박철수"])
ages = pd.Series([28, 31, 25])
regions = pd.Series(["서울", "부산", "대구"])

customers = pd.DataFrame({
    "name": names,
    "age": ages,
    "region": regions,
})

print(customers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
  name  age region
0  김민수   28     서울
1  이지영   31     부산
2  박철수   25     대구
\`\`\`

이 예제를 통해 DataFrame이 여러 Series가 모여 만들어진 구조라는 것을 이해할 수 있다.

---

## 4.3.5 DataFrame의 컬럼 선택

DataFrame에서 하나의 컬럼을 선택하면 Series가 반환된다.

\`\`\`python
import pandas as pd

customers = pd.DataFrame({
    "name": ["김민수", "이지영", "박철수"],
    "age": [28, 31, 25],
    "region": ["서울", "부산", "대구"],
})

names = customers["name"]
print(names)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
0    김민수
1    이지영
2    박철수
Name: name, dtype: object
\`\`\`

\`customers["name"]\`은 DataFrame에서 \`name\` 컬럼 하나를 꺼낸 것이다. 결과는 Series다.

여러 컬럼을 선택하려면 컬럼 이름 리스트를 전달한다.

\`\`\`python
selected = customers[["name", "region"]]
print(selected)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
  name region
0  김민수     서울
1  이지영     부산
2  박철수     대구
\`\`\`

여러 컬럼을 선택하면 결과는 DataFrame이다.

정리하면 다음과 같다.

| 코드 | 결과 |
|---|---|
| \`df["name"]\` | Series |
| \`df[["name", "region"]]\` | DataFrame |

대괄호가 한 겹인지 두 겹인지에 따라 결과가 달라진다는 점에 주의해야 한다.

---

## 4.3.6 DataFrame의 인덱스 지정

DataFrame을 만들 때 인덱스를 직접 지정할 수 있다.

\`\`\`python
import pandas as pd

products = pd.DataFrame(
    {
        "name": ["노트북", "마우스", "키보드"],
        "price": [1200000, 25000, 45000],
    },
    index=["P001", "P002", "P003"]
)

print(products)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
     name    price
P001  노트북  1200000
P002  마우스    25000
P003  키보드    45000
\`\`\`

이제 기본 인덱스 \`0\`, \`1\`, \`2\` 대신 상품 코드가 인덱스가 되었다.

인덱스를 잘 활용하면 특정 행을 의미 있는 이름으로 찾을 수 있다. 그러나 초보 단계에서는 인덱스를 너무 복잡하게 사용하지 않는 것이 좋다. 처음에는 기본 인덱스에 익숙해지고, 나중에 데이터 선택과 필터링 장에서 \`loc\`와 \`iloc\`를 통해 더 자세히 다룬다.

---

## 4.3.7 DataFrame의 행과 열

DataFrame은 행과 열로 구성된다.

다음 DataFrame을 보자.

\`\`\`python
import pandas as pd

orders = pd.DataFrame({
    "order_id": [1, 2, 3],
    "product": ["노트북", "마우스", "키보드"],
    "quantity": [1, 2, 3],
    "price": [1200000, 25000, 45000],
})

print(orders)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
   order_id product  quantity    price
0         1     노트북         1  1200000
1         2     마우스         2    25000
2         3     키보드         3    45000
\`\`\`

이 DataFrame에는 3개의 행과 4개의 열이 있다.

- 첫 번째 행은 주문번호 1번 주문이다.
- \`product\` 열은 상품명을 나타낸다.
- \`quantity\` 열은 수량을 나타낸다.
- \`price\` 열은 단가를 나타낸다.

행은 하나의 관측값이나 기록을 의미하는 경우가 많다. 열은 하나의 변수나 속성을 의미하는 경우가 많다.

데이터 분석에서는 보통 다음 구조를 권장한다.

- 한 행은 하나의 관측값이다.
- 한 열은 하나의 변수다.
- 한 셀은 하나의 값이다.

이 원칙을 이해하면 데이터를 정리할 때 어떤 형태가 분석하기 좋은지 판단하기 쉬워진다.

---

# 4.4 DataFrame 기본 구조

## 4.4.1 \`shape\`로 행과 열 개수 확인하기

DataFrame의 크기를 확인할 때는 \`shape\`를 사용한다.

\`\`\`python
import pandas as pd

orders = pd.DataFrame({
    "order_id": [1, 2, 3],
    "product": ["노트북", "마우스", "키보드"],
    "quantity": [1, 2, 3],
    "price": [1200000, 25000, 45000],
})

print(orders.shape)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
(3, 4)
\`\`\`

\`(3, 4)\`는 행이 3개, 열이 4개라는 뜻이다.

\`shape\`는 괄호가 없는 속성이다. 따라서 \`orders.shape()\`처럼 호출하지 않는다.

---

## 4.4.2 \`columns\`로 컬럼 확인하기

DataFrame의 컬럼 이름을 확인하려면 \`columns\`를 사용한다.

\`\`\`python
print(orders.columns)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
Index(['order_id', 'product', 'quantity', 'price'], dtype='object')
\`\`\`

컬럼 이름만 리스트처럼 확인하고 싶다면 다음처럼 변환할 수 있다.

\`\`\`python
print(list(orders.columns))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['order_id', 'product', 'quantity', 'price']
\`\`\`

컬럼 이름은 데이터 분석에서 매우 중요하다. 컬럼 이름이 불명확하거나 공백이 섞여 있거나 대소문자가 뒤섞여 있으면 분석 코드가 복잡해진다.

실무에서는 데이터를 불러온 뒤 컬럼 이름을 먼저 확인하는 습관이 필요하다.

---

## 4.4.3 \`index\`로 인덱스 확인하기

DataFrame의 인덱스는 \`index\`로 확인한다.

\`\`\`python
print(orders.index)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
RangeIndex(start=0, stop=3, step=1)
\`\`\`

기본 인덱스는 \`0\`부터 시작해 행 개수만큼 자동으로 만들어진다.

인덱스는 행을 구분하는 이름이다. 대부분의 기초 분석에서는 기본 인덱스만으로 충분하다. 하지만 고객 ID, 날짜, 상품 코드처럼 행을 대표하는 값이 있을 때는 해당 컬럼을 인덱스로 사용하기도 한다.

---

## 4.4.4 \`dtypes\`로 자료형 확인하기

각 컬럼의 자료형은 \`dtypes\`로 확인한다.

\`\`\`python
print(orders.dtypes)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
order_id     int64
product     object
quantity     int64
price        int64
dtype: object
\`\`\`

각 컬럼의 자료형을 보면 다음을 알 수 있다.

- \`order_id\`는 정수형이다.
- \`product\`는 문자열처럼 다루는 object 타입이다.
- \`quantity\`는 정수형이다.
- \`price\`는 정수형이다.

pandas에서 자료형은 매우 중요하다. 숫자로 계산해야 할 컬럼이 문자열로 되어 있으면 합계나 평균을 제대로 계산할 수 없다. 날짜로 분석해야 할 컬럼이 문자열로 되어 있으면 월별 분석을 하기 어렵다.

따라서 데이터를 불러온 뒤에는 항상 컬럼별 자료형을 확인하는 습관이 필요하다.

---

## 4.4.5 \`values\`로 값 확인하기

DataFrame의 실제 값 배열은 \`values\`로 확인할 수 있다.

\`\`\`python
print(orders.values)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
[[1 '노트북' 1 1200000]
 [2 '마우스' 2 25000]
 [3 '키보드' 3 45000]]
\`\`\`

\`values\`는 DataFrame 안의 값을 NumPy 배열 형태로 보여 준다.

다만 일반적인 데이터 분석에서는 \`values\`를 직접 사용할 일이 많지는 않다. DataFrame은 컬럼 이름과 인덱스 정보를 함께 가지고 있기 때문에, 가능한 한 pandas 방식으로 데이터를 다루는 것이 좋다.

---

## 4.4.6 \`head()\`와 \`tail()\`로 일부 행 보기

DataFrame의 앞부분을 확인하려면 \`head()\`를 사용한다.

\`\`\`python
print(orders.head())
\`\`\`

행이 많을 때는 앞에서 5개 행만 보여 준다. 원하는 개수를 지정할 수도 있다.

\`\`\`python
print(orders.head(2))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
   order_id product  quantity    price
0         1     노트북         1  1200000
1         2     마우스         2    25000
\`\`\`

뒤쪽 행을 확인하려면 \`tail()\`을 사용한다.

\`\`\`python
print(orders.tail(2))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
   order_id product  quantity  price
1         2     마우스         2  25000
2         3     키보드         3  45000
\`\`\`

큰 데이터를 다룰 때는 전체를 한 번에 출력하기보다 \`head()\`와 \`tail()\`로 일부만 확인하는 것이 좋다.

---

## 4.4.7 \`info()\`로 전체 구조 확인하기

\`info()\`는 DataFrame의 전체 구조를 요약해서 보여 준다.

\`\`\`python
orders.info()
\`\`\`

실행 결과는 환경에 따라 조금 다를 수 있지만, 대략 다음과 비슷하다.

\`\`\`text
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 3 entries, 0 to 2
Data columns (total 4 columns):
 #   Column    Non-Null Count  Dtype 
---  ------    --------------  ----- 
 0   order_id  3 non-null      int64 
 1   product   3 non-null      object
 2   quantity  3 non-null      int64 
 3   price     3 non-null      int64 
dtypes: int64(3), object(1)
memory usage: ...
\`\`\`

\`info()\`를 보면 다음 정보를 확인할 수 있다.

- 행 개수
- 컬럼 개수
- 컬럼 이름
- 비어 있지 않은 값의 개수
- 컬럼별 자료형
- 메모리 사용량

데이터를 처음 불러왔을 때 \`info()\`는 가장 먼저 확인해야 할 함수 중 하나다.

---

## 4.4.8 \`describe()\`로 기초 통계 확인하기

수치형 컬럼의 기초 통계를 확인하려면 \`describe()\`를 사용한다.

\`\`\`python
print(orders.describe())
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
       order_id  quantity         price
count       3.0       3.0  3.000000e+00
mean        2.0       2.0  4.233333e+05
std         1.0       1.0  6.737333e+05
min         1.0       1.0  2.500000e+04
25%         1.5       1.5  3.500000e+04
50%         2.0       2.0  4.500000e+04
75%         2.5       2.5  6.225000e+05
max         3.0       3.0  1.200000e+06
\`\`\`

\`describe()\`는 다음 정보를 보여 준다.

| 항목 | 의미 |
|---|---|
| \`count\` | 값의 개수 |
| \`mean\` | 평균 |
| \`std\` | 표준편차 |
| \`min\` | 최솟값 |
| \`25%\` | 1사분위수 |
| \`50%\` | 중앙값 |
| \`75%\` | 3사분위수 |
| \`max\` | 최댓값 |

이 장에서는 \`describe()\`를 깊게 해석하지 않는다. 자세한 통계 해석은 뒤의 기본 통계 장에서 다룬다. 지금은 DataFrame의 수치형 컬럼을 빠르게 요약하는 도구라고 이해하면 된다.

---

# 4.5 pandas 기본 출력 설정

## 4.5.1 출력 설정이 필요한 이유

데이터가 작을 때는 DataFrame을 출력해도 문제가 없다. 하지만 행이 수천 개, 열이 수십 개가 되면 전체 데이터를 한 번에 출력하기 어렵다.

pandas는 기본적으로 너무 큰 DataFrame을 전부 보여 주지 않고 중간을 생략한다.

예를 들어 행이 많은 DataFrame을 출력하면 다음처럼 보일 수 있다.

\`\`\`text
      name  score
0      ...    ...
1      ...    ...
...    ...    ...
999    ...    ...
\`\`\`

이때 출력 설정을 조정하면 한 번에 보여 줄 행 개수, 열 개수, 소수점 표시 방식 등을 바꿀 수 있다.

출력 설정은 분석 결과 자체를 바꾸는 것이 아니라 **화면에 보이는 방식만 바꾸는 것**이다.

---

## 4.5.2 표시할 최대 행 개수 설정

표시할 최대 행 개수는 \`pd.set_option()\`으로 설정할 수 있다.

\`\`\`python
import pandas as pd

pd.set_option("display.max_rows", 20)
\`\`\`

위 코드는 DataFrame을 출력할 때 최대 20개 행까지 표시하도록 설정한다.

현재 설정값을 확인하려면 다음처럼 작성한다.

\`\`\`python
print(pd.get_option("display.max_rows"))
\`\`\`

설정을 기본값으로 되돌리려면 다음처럼 작성한다.

\`\`\`python
pd.reset_option("display.max_rows")
\`\`\`

---

## 4.5.3 표시할 최대 열 개수 설정

표시할 최대 열 개수는 \`display.max_columns\`로 설정한다.

\`\`\`python
pd.set_option("display.max_columns", 30)
\`\`\`

열이 많은 데이터를 분석할 때 유용하다. 예를 들어 설문 데이터처럼 컬럼이 매우 많은 경우 기본 설정에서는 일부 열이 생략될 수 있다.

기본값으로 되돌리려면 다음처럼 작성한다.

\`\`\`python
pd.reset_option("display.max_columns")
\`\`\`

---

## 4.5.4 소수점 표시 설정

분석 결과에 소수점이 너무 길게 표시되면 읽기 어렵다. 이때 소수점 표시 방식을 설정할 수 있다.

\`\`\`python
pd.set_option("display.float_format", "{:.2f}".format)
\`\`\`

위 설정은 실수를 소수점 둘째 자리까지 표시한다.

예를 들어 다음 DataFrame을 보자.

\`\`\`python
import pandas as pd

scores = pd.DataFrame({
    "name": ["김민수", "이지영", "박철수"],
    "average": [87.12345, 92.56789, 78.33333],
})

print(scores)
\`\`\`

소수점 표시 설정을 적용하면 평균 점수가 더 읽기 쉽게 표시된다.

설정을 해제하려면 다음처럼 작성한다.

\`\`\`python
pd.reset_option("display.float_format")
\`\`\`

주의할 점은 이 설정이 실제 값을 반올림해서 바꾸는 것이 아니라, 화면에 보이는 방식만 바꾼다는 것이다.

---

## 4.5.5 출력 설정을 사용할 때 주의할 점

출력 설정은 편리하지만 남용하면 안 된다.

특히 다음 점을 기억해야 한다.

첫째, 출력 설정은 실제 데이터 값을 바꾸지 않는다.  
둘째, Notebook 전체에 영향을 줄 수 있다.  
셋째, 분석 결과를 공유할 때는 설정 때문에 출력이 다르게 보일 수 있다.  
넷째, 필요할 때만 설정하고 기본값으로 되돌리는 습관이 좋다.

초보 단계에서는 다음 정도만 알아도 충분하다.

\`\`\`python
pd.set_option("display.max_rows", 20)
pd.set_option("display.max_columns", 20)
pd.set_option("display.float_format", "{:.2f}".format)
\`\`\`

그리고 필요하면 다음처럼 기본값으로 되돌린다.

\`\`\`python
pd.reset_option("display.max_rows")
pd.reset_option("display.max_columns")
pd.reset_option("display.float_format")
\`\`\`

---

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