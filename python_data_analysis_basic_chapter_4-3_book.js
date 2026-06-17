var e=`<!-- 원본: python_data_analysis_basic_chapter_4_book.md / 세부 장: 4-3 -->

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
`;export{e as default};