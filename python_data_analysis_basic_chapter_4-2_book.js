var e=`<!-- 원본: python_data_analysis_basic_chapter_4_book.md / 세부 장: 4-2 -->

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
`;export{e as default};