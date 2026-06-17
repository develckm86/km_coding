var e=`<!-- 원본: python_data_analysis_basic_chapter_4_book.md / 세부 장: 4-4 -->

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
`;export{e as default};