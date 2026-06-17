var e=`<!-- 원본: python_data_analysis_basic_chapter_5_book.md / 세부 장: 5-1 -->

4장에서는 pandas의 핵심 자료구조인 \`Series\`와 \`DataFrame\`을 배웠다. 직접 딕셔너리와 리스트를 사용해서 DataFrame을 만들었고, 행과 열, 인덱스와 컬럼의 의미를 살펴보았다.

하지만 실제 데이터 분석에서는 DataFrame을 직접 손으로 만드는 경우보다 **파일에서 데이터를 불러오는 경우**가 훨씬 많다. 회사의 매출 데이터는 CSV 파일일 수 있고, 고객 명단은 Excel 파일일 수 있으며, 외부 API에서 받은 데이터는 JSON 파일일 수 있다. 분석가는 이런 데이터를 파이썬으로 불러온 뒤 확인하고, 정리하고, 분석한 결과를 다시 파일로 저장해야 한다.

예를 들어 다음과 같은 업무를 생각해 보자.

\`\`\`text
1. 지난달 매출 CSV 파일을 불러온다.
2. 고객 정보 Excel 파일을 불러온다.
3. API에서 받은 JSON 데이터를 확인한다.
4. 분석에 필요한 컬럼만 정리한다.
5. 정리된 데이터를 새 CSV 또는 Excel 파일로 저장한다.
\`\`\`

이 과정의 출발점은 언제나 **데이터를 제대로 불러오는 것**이다. 데이터를 잘못 불러오면 이후 분석 결과도 잘못될 수 있다. 컬럼명이 밀려 있거나, 한글이 깨지거나, 숫자가 문자열로 들어오거나, 날짜가 제대로 변환되지 않는 문제는 실무에서 매우 자주 발생한다.

이 장에서는 pandas를 사용해 CSV, Excel, JSON 파일을 불러오고 저장하는 방법을 배운다. 또한 파일 경로를 관리하는 기본 방법도 함께 다룬다. 이 장을 마치면 분석에 사용할 데이터를 직접 불러오고, 정리된 결과를 파일로 저장하는 기본 흐름을 만들 수 있다.

---

## 이 장에서 배울 내용

이 장을 마치면 다음 내용을 할 수 있어야 한다.

- CSV 파일이 무엇인지 설명할 수 있다.
- \`pd.read_csv()\`로 CSV 파일을 DataFrame으로 불러올 수 있다.
- CSV 파일을 불러올 때 인코딩, 구분자, 헤더를 설정할 수 있다.
- Excel 파일을 \`pd.read_excel()\`로 불러올 수 있다.
- Excel 파일의 특정 시트를 선택해서 읽을 수 있다.
- JSON 파일의 기본 구조를 이해하고 \`pd.read_json()\`으로 불러올 수 있다.
- DataFrame을 CSV, Excel, JSON 파일로 저장할 수 있다.
- 저장할 때 인덱스를 포함할지 제외할지 결정할 수 있다.
- 상대 경로와 절대 경로의 차이를 이해할 수 있다.
- \`pathlib\`를 사용해 데이터 파일 경로를 관리할 수 있다.

---

# 5.1 CSV 파일 불러오기

## 5.1.1 CSV 파일이란?

**CSV**는 Comma-Separated Values의 약자다. 말 그대로 값을 콤마로 구분해서 저장하는 파일 형식이다.

예를 들어 다음과 같은 표가 있다고 하자.

| order_id | customer | product | quantity | price |
|---:|---|---|---:|---:|
| 1001 | 김민수 | 노트북 | 1 | 1200000 |
| 1002 | 이지영 | 마우스 | 2 | 25000 |
| 1003 | 박철수 | 키보드 | 1 | 45000 |

이 표를 CSV 형식으로 저장하면 다음과 비슷한 텍스트가 된다.

\`\`\`csv
order_id,customer,product,quantity,price
1001,김민수,노트북,1,1200000
1002,이지영,마우스,2,25000
1003,박철수,키보드,1,45000
\`\`\`

CSV 파일은 겉으로는 Excel 파일처럼 보일 수 있지만, 실제로는 단순한 텍스트 파일이다. 각 줄이 하나의 행을 나타내고, 각 값은 콤마로 구분된다.

CSV는 데이터 분석에서 매우 자주 사용된다. 이유는 단순하다.

- 구조가 단순하다.
- 대부분의 분석 도구에서 지원한다.
- Excel, 데이터베이스, 웹 서비스에서 쉽게 내보낼 수 있다.
- 텍스트 파일이므로 용량이 비교적 가볍다.
- 버전 관리나 자동 처리에 유리하다.

다만 CSV는 단순한 형식이기 때문에 주의할 점도 있다. 한글 인코딩 문제, 구분자 문제, 컬럼명 문제, 숫자와 문자열 구분 문제 등이 생길 수 있다.

---

## 5.1.2 실습 파일 만들기

먼저 이 장에서 사용할 간단한 CSV 파일을 만들어 보자. 실제 수업에서는 강사가 미리 파일을 제공해도 좋고, 아래 코드를 실행해 직접 만들어도 된다.

\`\`\`python
import pandas as pd

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003, 1004, 1005],
    "customer": ["김민수", "이지영", "박철수", "최유진", "정다은"],
    "product": ["노트북", "마우스", "키보드", "모니터", "마우스"],
    "quantity": [1, 2, 1, 1, 3],
    "price": [1200000, 25000, 45000, 300000, 25000],
    "order_date": ["2026-01-03", "2026-01-04", "2026-01-05", "2026-01-05", "2026-01-06"],
})

orders.to_csv("orders.csv", index=False, encoding="utf-8-sig")
\`\`\`

위 코드를 실행하면 현재 작업 폴더에 \`orders.csv\` 파일이 만들어진다.

여기서 \`index=False\`는 DataFrame의 인덱스를 파일에 저장하지 않겠다는 의미다. 지금 데이터의 인덱스는 0, 1, 2, 3, 4처럼 자동으로 붙은 번호일 뿐이다. 이런 번호는 분석 데이터의 실제 컬럼이 아니므로 저장하지 않는 편이 일반적이다.

\`encoding="utf-8-sig"\`는 한글이 포함된 CSV 파일을 Excel에서 열 때 한글이 깨지는 문제를 줄이기 위해 자주 사용한다. 파이썬 안에서만 읽고 쓸 때는 \`utf-8\`도 충분한 경우가 많지만, Windows 환경에서 Excel로 CSV를 열어야 한다면 \`utf-8-sig\`가 실무에서 편리할 때가 많다.

---

## 5.1.3 \`read_csv()\` 기본 사용법

CSV 파일을 pandas DataFrame으로 불러올 때는 \`pd.read_csv()\`를 사용한다.

\`\`\`python
import pandas as pd

orders = pd.read_csv("orders.csv")
print(orders)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
   order_id customer product  quantity    price  order_date
0      1001      김민수     노트북         1  1200000  2026-01-03
1      1002      이지영     마우스         2    25000  2026-01-04
2      1003      박철수     키보드         1    45000  2026-01-05
3      1004      최유진     모니터         1   300000  2026-01-05
4      1005      정다은     마우스         3    25000  2026-01-06
\`\`\`

\`read_csv()\`는 CSV 파일을 읽어서 DataFrame으로 반환한다. 따라서 불러온 뒤에는 4장에서 배운 DataFrame 기능을 그대로 사용할 수 있다.

예를 들어 앞의 3개 행만 보고 싶다면 \`head()\`를 사용한다.

\`\`\`python
print(orders.head(3))
\`\`\`

컬럼별 자료형을 보고 싶다면 \`dtypes\`를 사용한다.

\`\`\`python
print(orders.dtypes)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
order_id       int64
customer      object
product       object
quantity       int64
price          int64
order_date    object
dtype: object
\`\`\`

여기서 \`order_date\`는 날짜처럼 보이지만 아직 문자열로 읽혔다. 날짜형으로 변환하는 방법은 13장에서 자세히 다룬다.

---

## 5.1.4 파일 경로 지정

\`read_csv()\`의 첫 번째 인자에는 파일 경로를 넣는다.

\`\`\`python
orders = pd.read_csv("orders.csv")
\`\`\`

위 코드는 현재 파이썬을 실행하는 위치에 \`orders.csv\`가 있다는 뜻이다.

만약 \`data/raw/\` 폴더 안에 파일이 있다면 다음처럼 작성할 수 있다.

\`\`\`python
orders = pd.read_csv("data/raw/orders.csv")
\`\`\`

Windows에서 경로를 작성할 때는 역슬래시 \`\\\` 때문에 문제가 생길 수 있다.

\`\`\`python
# 권장하지 않는 방식
orders = pd.read_csv("C:\\data\\orders.csv")
\`\`\`

위 코드에서 \`\\d\`는 특별한 의미를 갖지 않기 때문에 문제가 없을 수도 있지만, \`\\n\`이나 \`\\t\`처럼 이스케이프 문자로 해석되는 조합이 들어가면 의도하지 않은 문제가 생길 수 있다. 그래서 경로를 다룰 때는 다음 방식 중 하나를 사용하는 것이 좋다.

\`\`\`python
orders = pd.read_csv(r"C:\\data\\orders.csv")
\`\`\`

또는 슬래시 \`/\`를 사용할 수도 있다.

\`\`\`python
orders = pd.read_csv("C:/data/orders.csv")
\`\`\`

실무에서는 \`pathlib\`를 사용하는 방법을 더 추천한다. \`pathlib\`는 이 장의 5.5절에서 다룬다.

---

## 5.1.5 인코딩 설정

CSV 파일을 읽을 때 한글이 깨지거나 다음과 같은 에러가 발생할 수 있다.

\`\`\`text
UnicodeDecodeError: 'utf-8' codec can't decode byte ...
\`\`\`

이런 에러는 파일에 저장된 문자 인코딩과 pandas가 읽으려고 하는 인코딩이 맞지 않을 때 발생한다.

CSV 파일을 읽을 때 인코딩을 지정하려면 \`encoding\` 옵션을 사용한다.

\`\`\`python
orders = pd.read_csv("orders.csv", encoding="utf-8")
\`\`\`

Excel에서 저장한 CSV 파일은 환경에 따라 \`cp949\` 또는 \`utf-8-sig\`로 읽어야 할 때가 있다.

\`\`\`python
orders = pd.read_csv("orders.csv", encoding="cp949")
\`\`\`

\`\`\`python
orders = pd.read_csv("orders.csv", encoding="utf-8-sig")
\`\`\`

처음부터 모든 인코딩을 외울 필요는 없다. 다만 한글 CSV 파일에서 문제가 생기면 다음 순서로 확인하면 좋다.

\`\`\`text
1. utf-8로 읽어본다.
2. 한글이 깨지거나 에러가 나면 utf-8-sig를 시도한다.
3. 그래도 안 되면 cp949를 시도한다.
4. 원본 파일이 어떤 프로그램에서 저장되었는지 확인한다.
\`\`\`

인코딩 문제는 분석 실무에서 매우 흔하다. 분석 코드가 틀렸다기보다 파일이 저장된 방식과 읽는 방식이 맞지 않아서 생기는 문제인 경우가 많다.

---

## 5.1.6 구분자 설정

CSV라는 이름은 콤마로 값을 구분한다는 뜻이지만, 실제 데이터 파일은 콤마가 아닌 다른 문자로 구분되어 있을 때도 있다.

예를 들어 세미콜론 \`;\`으로 구분된 파일은 다음처럼 생겼다.

\`\`\`csv
order_id;customer;product;quantity;price
1001;김민수;노트북;1;1200000
1002;이지영;마우스;2;25000
\`\`\`

이런 파일을 읽을 때는 \`sep\` 옵션을 사용한다.

\`\`\`python
orders = pd.read_csv("orders_semicolon.csv", sep=";")
\`\`\`

탭으로 구분된 파일은 다음처럼 읽을 수 있다.

\`\`\`python
orders = pd.read_csv("orders.tsv", sep="\\t")
\`\`\`

확장자가 \`.csv\`라고 해서 항상 콤마 구분이라고 단정하면 안 된다. 파일을 열었을 때 값이 이상하게 한 컬럼에 몰려 있다면 구분자가 잘못 지정되었을 가능성이 있다.

---

## 5.1.7 헤더 처리

CSV 파일의 첫 번째 줄에는 보통 컬럼명이 들어 있다.

\`\`\`csv
order_id,customer,product,quantity,price
1001,김민수,노트북,1,1200000
1002,이지영,마우스,2,25000
\`\`\`

pandas는 기본적으로 첫 번째 줄을 컬럼명으로 사용한다.

\`\`\`python
orders = pd.read_csv("orders.csv")
\`\`\`

하지만 컬럼명이 없는 CSV 파일도 있다.

\`\`\`csv
1001,김민수,노트북,1,1200000
1002,이지영,마우스,2,25000
1003,박철수,키보드,1,45000
\`\`\`

이런 파일을 기본 설정으로 읽으면 첫 번째 데이터 행이 컬럼명으로 잘못 처리된다. 컬럼명이 없는 파일은 \`header=None\`을 사용한다.

\`\`\`python
orders = pd.read_csv("orders_no_header.csv", header=None)
print(orders)
\`\`\`

컬럼명을 직접 지정하려면 \`names\` 옵션을 사용한다.

\`\`\`python
columns = ["order_id", "customer", "product", "quantity", "price"]
orders = pd.read_csv("orders_no_header.csv", header=None, names=columns)
\`\`\`

실무에서 CSV 파일을 받으면 먼저 다음을 확인해야 한다.

- 첫 번째 줄이 컬럼명인가?
- 컬럼명이 한글인가, 영어인가?
- 불필요한 제목 줄이나 설명 줄이 포함되어 있는가?
- 실제 데이터는 몇 번째 줄부터 시작하는가?

불필요한 앞부분을 건너뛰고 읽어야 할 때는 \`skiprows\`를 사용할 수 있다.

\`\`\`python
orders = pd.read_csv("orders_with_title.csv", skiprows=2)
\`\`\`

---

## 5.1.8 필요한 컬럼만 읽기

데이터 파일에 컬럼이 많을 때 모든 컬럼이 필요한 것은 아니다. 분석에 필요한 컬럼만 읽고 싶다면 \`usecols\` 옵션을 사용할 수 있다.

\`\`\`python
orders = pd.read_csv(
    "orders.csv",
    usecols=["order_id", "customer", "product", "price"]
)
\`\`\`

이렇게 하면 지정한 컬럼만 DataFrame으로 불러온다.

\`\`\`python
print(orders.head())
\`\`\`

\`\`\`text
   order_id customer product    price
0      1001      김민수     노트북  1200000
1      1002      이지영     마우스    25000
2      1003      박철수     키보드    45000
3      1004      최유진     모니터   300000
4      1005      정다은     마우스    25000
\`\`\`

기초 과정에서는 성능 최적화까지 깊게 다루지는 않지만, 필요한 컬럼만 읽는 습관은 좋다. 데이터가 커질수록 불필요한 컬럼을 줄이는 것이 메모리와 분석 속도에 도움이 된다.

---

## 5.1.9 자료형 지정하기

CSV 파일은 텍스트 파일이다. 따라서 파일 안에 있는 값이 숫자처럼 보여도 실제 파일에는 문자로 저장되어 있다. pandas는 데이터를 읽으면서 각 컬럼의 자료형을 추론한다.

대부분은 자동 추론으로 충분하지만, 실무에서는 자료형을 직접 지정해야 할 때가 있다.

예를 들어 주문번호를 숫자로 계산할 일이 없다면 문자열로 읽는 편이 안전할 수 있다. 특히 앞에 0이 붙는 코드값은 숫자로 읽으면 앞의 0이 사라진다.

\`\`\`csv
code,name
001,상품A
002,상품B
003,상품C
\`\`\`

이 파일을 그냥 읽으면 \`001\`이 숫자 \`1\`로 변환될 수 있다. 코드값은 문자열로 읽어야 한다.

\`\`\`python
products = pd.read_csv("products.csv", dtype={"code": "string"})
\`\`\`

\`dtype\` 옵션은 컬럼별 자료형을 지정할 때 사용한다.

\`\`\`python
orders = pd.read_csv(
    "orders.csv",
    dtype={
        "order_id": "string",
        "customer": "string",
        "product": "string",
    }
)
\`\`\`

단, 날짜형은 보통 \`pd.to_datetime()\`으로 따로 변환하는 방식을 많이 사용한다. 날짜 처리는 13장에서 자세히 배운다.

---

## 5.1.10 일부 행만 읽기

파일이 큰 경우 처음부터 전체를 읽지 않고 일부 행만 확인하고 싶을 수 있다. 이때는 \`nrows\`를 사용한다.

\`\`\`python
sample = pd.read_csv("orders.csv", nrows=3)
print(sample)
\`\`\`

실행 결과는 앞의 3개 행만 포함한다.

\`\`\`text
   order_id customer product  quantity    price  order_date
0      1001      김민수     노트북         1  1200000  2026-01-03
1      1002      이지영     마우스         2    25000  2026-01-04
2      1003      박철수     키보드         1    45000  2026-01-05
\`\`\`

데이터가 매우 큰 경우에는 고급 과정에서 \`chunksize\` 같은 방법을 배운다. 기초 과정에서는 먼저 \`head()\`, \`info()\`, \`nrows\`를 사용해 파일 구조를 확인하는 습관을 들이면 충분하다.

---
`;export{e as default};