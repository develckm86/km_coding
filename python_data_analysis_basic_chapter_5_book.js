var e=`# 5장. 데이터 불러오기와 저장하기

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

# 5.2 Excel 파일 불러오기

## 5.2.1 Excel 파일과 pandas

Excel 파일은 실무에서 가장 자주 만나는 데이터 형식 중 하나다. 많은 부서에서 고객 명단, 매출 내역, 재고 현황, 설문 결과를 Excel 파일로 관리한다.

pandas에서는 \`pd.read_excel()\`을 사용해 Excel 파일을 DataFrame으로 불러올 수 있다.

CSV와 Excel의 가장 큰 차이는 다음과 같다.

| 구분 | CSV | Excel |
|---|---|---|
| 파일 형식 | 텍스트 파일 | 스프레드시트 파일 |
| 확장자 | \`.csv\` | \`.xlsx\`, \`.xls\` |
| 시트 | 없음 | 여러 시트 가능 |
| 서식 | 거의 없음 | 글꼴, 색상, 셀 병합 등 가능 |
| 데이터 처리 | 단순하고 빠름 | 구조가 복잡할 수 있음 |

분석에 가장 적합한 형태는 보통 깔끔한 표 구조다. Excel 파일은 사람이 보기 좋게 꾸며져 있는 경우가 많지만, 데이터 분석에는 오히려 불편할 수 있다. 셀 병합, 여러 줄 제목, 중간 합계 행, 빈 행이 많은 Excel 파일은 분석 전에 정리가 필요하다.

---

## 5.2.2 Excel 읽기 준비

Excel 파일을 읽으려면 보통 \`openpyxl\` 라이브러리가 필요하다. 2장에서 분석 환경을 준비할 때 설치했다면 바로 사용할 수 있다.

설치되어 있지 않다면 터미널에서 다음 명령어로 설치한다.

\`\`\`bash
pip install openpyxl
\`\`\`

이 장에서 사용할 Excel 파일을 만들어 보자.

\`\`\`python
import pandas as pd

customers = pd.DataFrame({
    "customer_id": [1, 2, 3, 4, 5],
    "name": ["김민수", "이지영", "박철수", "최유진", "정다은"],
    "grade": ["VIP", "BASIC", "GOLD", "VIP", "BASIC"],
    "region": ["서울", "부산", "대구", "서울", "광주"],
})

customers.to_excel("customers.xlsx", index=False)
\`\`\`

위 코드를 실행하면 현재 작업 폴더에 \`customers.xlsx\` 파일이 생성된다.

---

## 5.2.3 \`read_excel()\` 기본 사용법

Excel 파일을 불러올 때는 \`pd.read_excel()\`을 사용한다.

\`\`\`python
import pandas as pd

customers = pd.read_excel("customers.xlsx")
print(customers)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
   customer_id name  grade region
0            1  김민수    VIP     서울
1            2  이지영  BASIC     부산
2            3  박철수   GOLD     대구
3            4  최유진    VIP     서울
4            5  정다은  BASIC     광주
\`\`\`

\`read_excel()\`도 \`read_csv()\`와 마찬가지로 DataFrame을 반환한다. 따라서 불러온 뒤에는 DataFrame의 모든 기능을 사용할 수 있다.

\`\`\`python
print(customers.head())
print(customers.info())
\`\`\`

---

## 5.2.4 시트 선택하기

Excel 파일은 여러 개의 시트를 가질 수 있다. 예를 들어 하나의 파일 안에 고객 정보 시트와 주문 정보 시트가 함께 있을 수 있다.

다음 코드는 여러 시트가 있는 Excel 파일을 만든다.

\`\`\`python
import pandas as pd

customers = pd.DataFrame({
    "customer_id": [1, 2, 3],
    "name": ["김민수", "이지영", "박철수"],
    "grade": ["VIP", "BASIC", "GOLD"],
})

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003],
    "customer_id": [1, 2, 1],
    "product": ["노트북", "마우스", "키보드"],
    "amount": [1200000, 50000, 45000],
})

with pd.ExcelWriter("shop_data.xlsx") as writer:
    customers.to_excel(writer, sheet_name="customers", index=False)
    orders.to_excel(writer, sheet_name="orders", index=False)
\`\`\`

특정 시트를 읽으려면 \`sheet_name\` 옵션을 사용한다.

\`\`\`python
customers = pd.read_excel("shop_data.xlsx", sheet_name="customers")
orders = pd.read_excel("shop_data.xlsx", sheet_name="orders")

print(customers)
print(orders)
\`\`\`

시트 이름 대신 시트 번호를 사용할 수도 있다. 첫 번째 시트는 0번이다.

\`\`\`python
first_sheet = pd.read_excel("shop_data.xlsx", sheet_name=0)
\`\`\`

여러 시트를 한 번에 읽을 수도 있다.

\`\`\`python
sheets = pd.read_excel("shop_data.xlsx", sheet_name=None)
\`\`\`

이 경우 \`sheets\`는 DataFrame 하나가 아니라 딕셔너리다. key는 시트 이름이고, value는 해당 시트의 DataFrame이다.

\`\`\`python
print(sheets.keys())
print(sheets["customers"])
\`\`\`

기초 과정에서는 우선 \`sheet_name\`으로 필요한 시트를 정확히 선택하는 정도를 익히면 충분하다.

---

## 5.2.5 Excel 파일에서 필요한 행과 열만 읽기

Excel 파일도 CSV 파일처럼 필요한 컬럼만 읽을 수 있다.

\`\`\`python
customers = pd.read_excel(
    "customers.xlsx",
    usecols=["customer_id", "name", "grade"]
)
\`\`\`

앞부분 몇 행만 읽고 싶다면 \`nrows\`를 사용할 수 있다.

\`\`\`python
sample = pd.read_excel("customers.xlsx", nrows=3)
\`\`\`

앞의 불필요한 행을 건너뛰고 싶다면 \`skiprows\`를 사용할 수 있다.

\`\`\`python
customers = pd.read_excel("customers_with_title.xlsx", skiprows=2)
\`\`\`

실무 Excel 파일에는 다음과 같은 형태가 많다.

\`\`\`text
2026년 1월 고객 명단
작성자: 영업관리팀

customer_id | name | grade | region
1           | 김민수 | VIP   | 서울
2           | 이지영 | BASIC | 부산
\`\`\`

이런 파일을 바로 읽으면 제목과 작성자 줄 때문에 컬럼이 잘못 인식될 수 있다. 실제 데이터가 몇 번째 줄부터 시작하는지 확인하고 \`skiprows\`를 적절히 사용해야 한다.

---

## 5.2.6 Excel 파일을 읽을 때 주의할 점

Excel 파일은 사람이 보기 좋게 만든 문서일 때가 많다. 하지만 데이터 분석에는 다음과 같은 구조가 불편하다.

- 셀 병합이 많다.
- 제목 행이 여러 줄이다.
- 중간에 빈 행이 많다.
- 중간 합계 행이 포함되어 있다.
- 하나의 시트에 여러 표가 있다.
- 숫자와 문자가 섞여 있다.
- 날짜가 문자열로 저장되어 있다.

분석에 좋은 Excel 데이터는 다음과 같은 형태다.

\`\`\`text
첫 번째 행: 컬럼명
두 번째 행부터: 실제 데이터
하나의 열: 하나의 의미
하나의 행: 하나의 관측값 또는 기록
셀 병합 없음
중간 합계 행 없음
빈 행 최소화
\`\`\`

Excel 파일을 불러온 뒤에는 먼저 \`head()\`, \`info()\`, \`columns\`, \`shape\`를 확인해야 한다.

\`\`\`python
customers = pd.read_excel("customers.xlsx")

print(customers.head())
print(customers.shape)
print(customers.columns)
print(customers.info())
\`\`\`

파일을 불러오는 것 자체보다, **제대로 불러왔는지 확인하는 습관**이 더 중요하다.

---

# 5.3 JSON 파일 불러오기

## 5.3.1 JSON이란?

**JSON**은 JavaScript Object Notation의 약자다. 데이터를 key-value 구조로 표현하는 텍스트 기반 형식이다. 웹 API에서 데이터를 주고받을 때 많이 사용된다.

예를 들어 고객 한 명의 정보를 JSON으로 표현하면 다음과 같다.

\`\`\`json
{
  "customer_id": 1,
  "name": "김민수",
  "grade": "VIP",
  "region": "서울"
}
\`\`\`

여러 고객을 표현할 때는 보통 객체를 리스트 안에 담는다.

\`\`\`json
[
  {
    "customer_id": 1,
    "name": "김민수",
    "grade": "VIP",
    "region": "서울"
  },
  {
    "customer_id": 2,
    "name": "이지영",
    "grade": "BASIC",
    "region": "부산"
  }
]
\`\`\`

파이썬의 리스트와 딕셔너리를 배웠다면 JSON 구조는 비교적 쉽게 이해할 수 있다.

\`\`\`python
customers = [
    {"customer_id": 1, "name": "김민수", "grade": "VIP", "region": "서울"},
    {"customer_id": 2, "name": "이지영", "grade": "BASIC", "region": "부산"},
]
\`\`\`

위 파이썬 데이터와 JSON 데이터는 매우 비슷하게 생겼다. 실제로 JSON은 API 응답, 설정 파일, 로그 데이터, 웹 서비스 데이터 저장 등에 많이 사용된다.

---

## 5.3.2 JSON 실습 파일 만들기

다음 코드를 실행해 JSON 파일을 만들어 보자.

\`\`\`python
import pandas as pd

customers = pd.DataFrame({
    "customer_id": [1, 2, 3],
    "name": ["김민수", "이지영", "박철수"],
    "grade": ["VIP", "BASIC", "GOLD"],
    "region": ["서울", "부산", "대구"],
})

customers.to_json(
    "customers.json",
    orient="records",
    force_ascii=False,
    indent=2
)
\`\`\`

\`orient="records"\`는 각 행을 하나의 JSON 객체로 만들고, 전체를 리스트로 저장한다는 의미다.

저장된 파일은 다음과 비슷하다.

\`\`\`json
[
  {
    "customer_id": 1,
    "name": "김민수",
    "grade": "VIP",
    "region": "서울"
  },
  {
    "customer_id": 2,
    "name": "이지영",
    "grade": "BASIC",
    "region": "부산"
  },
  {
    "customer_id": 3,
    "name": "박철수",
    "grade": "GOLD",
    "region": "대구"
  }
]
\`\`\`

\`force_ascii=False\`는 한글을 유니코드 이스케이프 형태가 아니라 실제 한글로 저장하기 위해 사용한다. 이 옵션을 사용하지 않으면 한글이 \`\\uae40\\ubbfc\\uc218\` 같은 형태로 저장될 수 있다. 그것도 잘못된 것은 아니지만, 사람이 파일을 직접 읽을 때는 불편하다.

---

## 5.3.3 \`read_json()\` 기본 사용법

JSON 파일을 DataFrame으로 불러올 때는 \`pd.read_json()\`을 사용한다.

\`\`\`python
import pandas as pd

customers = pd.read_json("customers.json")
print(customers)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
   customer_id name  grade region
0            1  김민수    VIP     서울
1            2  이지영  BASIC     부산
2            3  박철수   GOLD     대구
\`\`\`

JSON 파일이 표 형태에 가까운 구조라면 pandas로 쉽게 불러올 수 있다. 하지만 모든 JSON이 바로 DataFrame으로 깔끔하게 바뀌는 것은 아니다.

예를 들어 다음처럼 중첩 구조가 있는 JSON을 생각해 보자.

\`\`\`json
{
  "customer_id": 1,
  "name": "김민수",
  "address": {
    "city": "서울",
    "district": "강남구"
  }
}
\`\`\`

\`address\` 안에 다시 \`city\`, \`district\`가 들어 있다. 이런 구조를 중첩 JSON이라고 한다. pandas로 읽을 수는 있지만, 바로 깔끔한 표가 되지 않을 수 있다.

중첩 JSON을 다루는 방법은 고급 과정이나 API 데이터 처리 과정에서 더 자세히 다룬다. 기초 과정에서는 우선 다음 형태의 JSON을 편하게 읽고 쓰는 것을 목표로 한다.

\`\`\`json
[
  {"컬럼1": "값", "컬럼2": "값"},
  {"컬럼1": "값", "컬럼2": "값"}
]
\`\`\`

---

## 5.3.4 JSON 구조와 DataFrame의 관계

DataFrame은 행과 열이 있는 표다. JSON은 key-value 구조다. 따라서 pandas가 JSON을 DataFrame으로 바꿀 때는 key를 컬럼명으로 사용하고, 각 객체를 하나의 행으로 변환한다.

다음 JSON을 보자.

\`\`\`json
[
  {"name": "김민수", "grade": "VIP"},
  {"name": "이지영", "grade": "BASIC"}
]
\`\`\`

이 JSON은 다음 DataFrame으로 바뀔 수 있다.

| name | grade |
|---|---|
| 김민수 | VIP |
| 이지영 | BASIC |

그런데 각 객체가 서로 다른 key를 가지고 있다면 어떻게 될까?

\`\`\`json
[
  {"name": "김민수", "grade": "VIP"},
  {"name": "이지영", "region": "부산"}
]
\`\`\`

이 경우 DataFrame은 다음처럼 만들어질 수 있다.

| name | grade | region |
|---|---|---|
| 김민수 | VIP | NaN |
| 이지영 | NaN | 부산 |

없는 값은 결측치로 처리된다. 결측치 처리는 10장에서 자세히 배운다.

---

# 5.4 데이터 저장하기

## 5.4.1 저장이 중요한 이유

데이터 분석은 불러오기만으로 끝나지 않는다. 분석 과정에서 정리한 데이터, 계산한 결과, 보고서용 요약표를 다시 파일로 저장해야 한다.

예를 들어 다음과 같은 상황이 있다.

- 원본 CSV에서 필요한 컬럼만 골라 새 CSV로 저장한다.
- 결측치와 중복값을 정리한 데이터를 Excel로 저장한다.
- API에서 받은 데이터를 JSON으로 저장한다.
- 분석 결과를 다른 사람에게 전달하기 위해 Excel 파일로 저장한다.

데이터를 저장할 때는 다음을 신경 써야 한다.

- 어떤 파일 형식으로 저장할 것인가?
- 인덱스를 저장할 것인가?
- 한글이 깨지지 않도록 인코딩을 어떻게 할 것인가?
- 저장 위치는 어디인가?
- 기존 파일을 덮어써도 되는가?

---

## 5.4.2 CSV로 저장하기

DataFrame을 CSV 파일로 저장할 때는 \`to_csv()\`를 사용한다.

\`\`\`python
import pandas as pd

orders = pd.read_csv("orders.csv")
orders["total"] = orders["quantity"] * orders["price"]

orders.to_csv("orders_with_total.csv", index=False, encoding="utf-8-sig")
\`\`\`

위 코드는 \`orders.csv\`를 불러온 뒤 \`total\` 컬럼을 추가하고, 결과를 \`orders_with_total.csv\`로 저장한다.

저장된 파일은 다음과 비슷한 구조를 가진다.

\`\`\`csv
order_id,customer,product,quantity,price,order_date,total
1001,김민수,노트북,1,1200000,2026-01-03,1200000
1002,이지영,마우스,2,25000,2026-01-04,50000
\`\`\`

\`index=False\`를 사용하지 않으면 DataFrame의 인덱스가 첫 번째 컬럼으로 함께 저장된다.

\`\`\`python
orders.to_csv("orders_with_index.csv", encoding="utf-8-sig")
\`\`\`

이렇게 저장하면 파일에 다음처럼 불필요한 인덱스 컬럼이 들어갈 수 있다.

\`\`\`csv
,order_id,customer,product,quantity,price,order_date,total
0,1001,김민수,노트북,1,1200000,2026-01-03,1200000
1,1002,이지영,마우스,2,25000,2026-01-04,50000
\`\`\`

특별한 이유가 없다면 분석 결과를 CSV로 저장할 때는 \`index=False\`를 자주 사용한다.

---

## 5.4.3 Excel로 저장하기

DataFrame을 Excel 파일로 저장할 때는 \`to_excel()\`을 사용한다.

\`\`\`python
orders.to_excel("orders_with_total.xlsx", index=False)
\`\`\`

Excel 파일로 저장하면 비개발자와 결과를 공유하기 편하다. 특히 실무에서는 CSV보다 Excel 파일을 선호하는 경우가 많다.

여러 DataFrame을 하나의 Excel 파일에 여러 시트로 저장할 수도 있다.

\`\`\`python
customers = pd.read_excel("customers.xlsx")
orders = pd.read_csv("orders.csv")
orders["total"] = orders["quantity"] * orders["price"]

with pd.ExcelWriter("analysis_result.xlsx") as writer:
    customers.to_excel(writer, sheet_name="customers", index=False)
    orders.to_excel(writer, sheet_name="orders", index=False)
\`\`\`

위 코드는 \`analysis_result.xlsx\` 파일을 만들고, 그 안에 \`customers\` 시트와 \`orders\` 시트를 저장한다.

Excel 저장은 편리하지만 CSV보다 파일 구조가 복잡하고 저장 속도가 느릴 수 있다. 분석 중간 데이터는 CSV로 저장하고, 최종 공유용 결과는 Excel로 저장하는 방식도 자주 사용된다.

---

## 5.4.4 JSON으로 저장하기

DataFrame을 JSON 파일로 저장할 때는 \`to_json()\`을 사용한다.

\`\`\`python
customers = pd.read_excel("customers.xlsx")

customers.to_json(
    "customers_output.json",
    orient="records",
    force_ascii=False,
    indent=2
)
\`\`\`

저장된 JSON은 다음과 비슷하다.

\`\`\`json
[
  {
    "customer_id": 1,
    "name": "김민수",
    "grade": "VIP",
    "region": "서울"
  },
  {
    "customer_id": 2,
    "name": "이지영",
    "grade": "BASIC",
    "region": "부산"
  }
]
\`\`\`

\`to_json()\`을 사용할 때 자주 보는 옵션은 다음과 같다.

| 옵션 | 의미 |
|---|---|
| \`orient="records"\` | 행 단위 객체 리스트 형태로 저장 |
| \`force_ascii=False\` | 한글을 그대로 저장 |
| \`indent=2\` | 사람이 읽기 좋게 들여쓰기 |

JSON은 사람이 직접 열어볼 수도 있지만, 주로 프로그램끼리 데이터를 주고받을 때 많이 사용된다. API 응답을 저장하거나, 다른 시스템으로 데이터를 넘겨야 할 때 유용하다.

---

## 5.4.5 저장 전 확인해야 할 것

파일을 저장하기 전에 다음을 확인하는 습관을 들이는 것이 좋다.

\`\`\`python
print(orders.head())
print(orders.shape)
print(orders.dtypes)
\`\`\`

저장 전 확인할 항목은 다음과 같다.

- 행 개수가 예상과 맞는가?
- 컬럼 개수가 예상과 맞는가?
- 컬럼명이 올바른가?
- 불필요한 컬럼이 포함되어 있지 않은가?
- 숫자 컬럼이 숫자형으로 되어 있는가?
- 날짜 컬럼이 의도한 형식인가?
- 저장 경로가 올바른가?
- 기존 파일을 덮어써도 되는가?

실무에서는 파일 저장 코드 한 줄보다 저장 전 확인이 더 중요할 때가 많다. 잘못된 결과를 저장하고 공유하면 이후 업무에 혼란이 생길 수 있기 때문이다.

---

# 5.5 파일 경로 관리

## 5.5.1 상대 경로와 절대 경로

데이터 파일을 불러오고 저장할 때는 파일 경로를 정확히 지정해야 한다. 경로에는 크게 두 가지가 있다.

- 상대 경로
- 절대 경로

**상대 경로**는 현재 작업 위치를 기준으로 파일 위치를 표현하는 방식이다.

\`\`\`python
orders = pd.read_csv("orders.csv")
\`\`\`

위 코드는 현재 작업 폴더에 있는 \`orders.csv\`를 읽는다.

\`\`\`python
orders = pd.read_csv("data/raw/orders.csv")
\`\`\`

위 코드는 현재 작업 폴더 안의 \`data/raw/\` 폴더에 있는 \`orders.csv\`를 읽는다.

**절대 경로**는 컴퓨터의 루트 위치부터 전체 경로를 작성하는 방식이다.

\`\`\`python
orders = pd.read_csv("C:/Users/user/data/orders.csv")
\`\`\`

또는 macOS, Linux에서는 다음처럼 보일 수 있다.

\`\`\`python
orders = pd.read_csv("/Users/user/data/orders.csv")
\`\`\`

절대 경로는 위치가 명확하다는 장점이 있지만, 다른 사람의 컴퓨터에서는 경로가 달라질 수 있다. 그래서 협업이나 수업에서는 상대 경로를 사용하는 편이 좋다.

---

## 5.5.2 현재 작업 폴더 확인하기

파일을 찾을 수 없다는 에러가 발생할 때 가장 먼저 확인할 것은 현재 작업 폴더다.

\`\`\`python
from pathlib import Path

print(Path.cwd())
\`\`\`

\`Path.cwd()\`는 현재 파이썬이 실행 중인 작업 폴더를 알려준다.

예를 들어 현재 작업 폴더가 다음과 같다고 하자.

\`\`\`text
C:/python_data_analysis
\`\`\`

이 상태에서 다음 코드를 실행하면 pandas는 아래 위치에서 파일을 찾는다.

\`\`\`python
orders = pd.read_csv("data/raw/orders.csv")
\`\`\`

\`\`\`text
C:/python_data_analysis/data/raw/orders.csv
\`\`\`

따라서 파일이 없다는 에러가 난다면 다음을 확인해야 한다.

- 현재 작업 폴더가 어디인가?
- 파일이 실제로 그 위치에 있는가?
- 폴더 이름과 파일 이름을 정확히 썼는가?
- 확장자를 빠뜨리지 않았는가?
- 대소문자가 다른가?

---

## 5.5.3 \`pathlib\` 사용하기

파이썬에서는 파일 경로를 문자열로만 다룰 수도 있지만, \`pathlib\`를 사용하면 더 읽기 쉽고 안전하게 경로를 관리할 수 있다.

\`\`\`python
from pathlib import Path

DATA_DIR = Path("data")
RAW_DIR = DATA_DIR / "raw"
PROCESSED_DIR = DATA_DIR / "processed"

orders_path = RAW_DIR / "orders.csv"

orders = pd.read_csv(orders_path)
\`\`\`

\`/\` 연산자를 사용해 경로를 자연스럽게 연결할 수 있다.

\`\`\`python
RAW_DIR / "orders.csv"
\`\`\`

이 코드는 운영체제에 맞는 경로로 처리된다. Windows, macOS, Linux에서 경로 구분자가 다르더라도 \`pathlib\`가 적절히 다뤄준다.

---

## 5.5.4 폴더가 없으면 만들기

분석 결과를 저장할 때 \`outputs/\` 또는 \`data/processed/\` 폴더가 없으면 에러가 날 수 있다. 저장 전에 폴더를 만들어 두면 안전하다.

\`\`\`python
from pathlib import Path

OUTPUT_DIR = Path("outputs")
OUTPUT_DIR.mkdir(exist_ok=True)
\`\`\`

하위 폴더까지 한 번에 만들고 싶다면 \`parents=True\`를 사용한다.

\`\`\`python
PROCESSED_DIR = Path("data") / "processed"
PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
\`\`\`

이제 이 폴더에 파일을 저장할 수 있다.

\`\`\`python
output_path = PROCESSED_DIR / "orders_clean.csv"
orders.to_csv(output_path, index=False, encoding="utf-8-sig")
\`\`\`

실무 분석 프로젝트에서는 보통 다음처럼 폴더를 나누어 관리한다.

\`\`\`text
data_analysis_project/
  data/
    raw/
      orders.csv
      customers.xlsx
    processed/
      orders_clean.csv
  outputs/
    reports/
    charts/
  notebooks/
  src/
\`\`\`

원본 데이터와 처리된 데이터를 분리하면 실수로 원본을 덮어쓰는 일을 줄일 수 있다.

---

## 5.5.5 파일 존재 여부 확인하기

파일을 읽기 전에 파일이 실제로 있는지 확인할 수도 있다.

\`\`\`python
from pathlib import Path

orders_path = Path("data/raw/orders.csv")

if orders_path.exists():
    orders = pd.read_csv(orders_path)
    print("파일을 불러왔습니다.")
else:
    print("파일이 없습니다:", orders_path)
\`\`\`

파일 이름, 확장자, 위치가 조금만 달라도 pandas는 파일을 찾을 수 없다. 파일 입출력 오류는 초보자뿐 아니라 실무자에게도 자주 발생한다. 경로를 확인하는 코드를 작성하는 습관은 매우 중요하다.

---

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

# 5.7 파일 입출력 문제 해결 체크리스트

데이터 파일을 불러오거나 저장할 때 문제가 생기면 다음 순서로 확인해 보자.

## 5.7.1 파일을 찾을 수 없을 때

대표적인 에러는 다음과 같다.

\`\`\`text
FileNotFoundError: [Errno 2] No such file or directory
\`\`\`

확인할 것:

\`\`\`text
1. 현재 작업 폴더가 어디인지 확인한다.
2. 파일 이름을 정확히 썼는지 확인한다.
3. 확장자를 빠뜨리지 않았는지 확인한다.
4. 파일이 실제로 해당 폴더에 있는지 확인한다.
5. 상대 경로 기준이 맞는지 확인한다.
\`\`\`

확인 코드:

\`\`\`python
from pathlib import Path

print(Path.cwd())
print(Path("orders.csv").exists())
\`\`\`

---

## 5.7.2 한글이 깨질 때

확인할 것:

\`\`\`text
1. encoding="utf-8"로 읽어본다.
2. encoding="utf-8-sig"로 읽어본다.
3. encoding="cp949"로 읽어본다.
4. 파일을 어떤 프로그램에서 저장했는지 확인한다.
\`\`\`

예시:

\`\`\`python
orders = pd.read_csv("orders.csv", encoding="utf-8-sig")
\`\`\`

또는

\`\`\`python
orders = pd.read_csv("orders.csv", encoding="cp949")
\`\`\`

---

## 5.7.3 컬럼이 한 칸에 몰려 있을 때

CSV 파일을 읽었는데 모든 값이 하나의 컬럼에 들어가 있다면 구분자 문제일 수 있다.

확인할 것:

\`\`\`text
1. 파일의 구분자가 콤마인지 확인한다.
2. 세미콜론인지 확인한다.
3. 탭으로 구분되어 있는지 확인한다.
4. read_csv의 sep 옵션을 지정한다.
\`\`\`

예시:

\`\`\`python
orders = pd.read_csv("orders.csv", sep=";")
\`\`\`

\`\`\`python
orders = pd.read_csv("orders.tsv", sep="\\t")
\`\`\`

---

## 5.7.4 첫 번째 행이 컬럼명으로 잘못 들어갔을 때

컬럼명이 없는 파일인데 첫 번째 데이터 행이 컬럼명으로 사용되었을 수 있다.

\`\`\`python
orders = pd.read_csv("orders_no_header.csv", header=None)
\`\`\`

컬럼명을 직접 지정하려면 다음처럼 작성한다.

\`\`\`python
columns = ["order_id", "customer", "product", "quantity", "price"]
orders = pd.read_csv("orders_no_header.csv", header=None, names=columns)
\`\`\`

---

## 5.7.5 저장한 파일에 불필요한 인덱스가 생겼을 때

CSV나 Excel로 저장한 파일을 열었을 때 \`Unnamed: 0\` 같은 컬럼이 생긴다면 인덱스가 함께 저장된 것이다.

저장할 때 다음처럼 \`index=False\`를 사용한다.

\`\`\`python
df.to_csv("result.csv", index=False, encoding="utf-8-sig")
\`\`\`

\`\`\`python
df.to_excel("result.xlsx", index=False)
\`\`\`

이미 저장된 파일을 다시 읽었을 때 \`Unnamed: 0\` 컬럼이 있다면 필요에 따라 삭제할 수 있다.

\`\`\`python
df = df.drop(columns=["Unnamed: 0"])
\`\`\`

---

# 5.8 핵심 정리

이 장에서는 데이터 분석의 출발점인 파일 불러오기와 저장하기를 배웠다.

CSV 파일은 단순한 텍스트 기반 표 형식이며, pandas에서는 \`pd.read_csv()\`로 불러온다. CSV를 읽을 때는 파일 경로, 인코딩, 구분자, 헤더, 자료형을 주의해야 한다.

Excel 파일은 실무에서 자주 사용되는 스프레드시트 형식이며, pandas에서는 \`pd.read_excel()\`로 불러온다. Excel 파일에는 여러 시트가 있을 수 있으므로 \`sheet_name\`을 사용해 필요한 시트를 선택할 수 있다.

JSON 파일은 key-value 구조의 데이터 형식이며, 웹 API와 자주 연결된다. pandas에서는 \`pd.read_json()\`으로 JSON 파일을 불러올 수 있다. 다만 중첩 구조가 복잡한 JSON은 기초 수준에서 바로 DataFrame으로 다루기 어려울 수 있다.

DataFrame을 파일로 저장할 때는 \`to_csv()\`, \`to_excel()\`, \`to_json()\`을 사용한다. 저장할 때는 인덱스 포함 여부, 인코딩, 저장 위치를 확인해야 한다.

마지막으로 파일 경로를 안정적으로 관리하기 위해 \`pathlib\`를 배웠다. 상대 경로와 절대 경로의 차이를 이해하고, \`Path\` 객체로 데이터 폴더와 파일 경로를 관리하면 분석 프로젝트를 더 깔끔하게 구성할 수 있다.

---

# 연습문제

## 문제 1

CSV 파일에 대한 설명으로 가장 적절한 것은 무엇인가?

A. 여러 시트를 가질 수 있는 스프레드시트 파일이다.  
B. 콤마 등 구분자로 값을 나누어 저장하는 텍스트 기반 파일이다.  
C. 이미지 데이터를 저장하기 위한 파일이다.  
D. 파이썬 코드만 저장할 수 있는 파일이다.

---

## 문제 2

\`orders.csv\` 파일을 DataFrame으로 불러오는 코드를 작성하라.

---

## 문제 3

한글이 포함된 CSV 파일을 읽을 때 인코딩 문제를 해결하기 위해 사용할 수 있는 옵션을 포함해 코드를 작성하라.

파일명은 \`customers.csv\`라고 가정한다.

---

## 문제 4

세미콜론 \`;\`으로 구분된 \`sales.csv\` 파일을 읽는 코드를 작성하라.

---

## 문제 5

컬럼명이 없는 \`orders_no_header.csv\` 파일을 읽으려고 한다. 컬럼명은 다음과 같다.

\`\`\`python
["order_id", "customer", "product", "quantity", "price"]
\`\`\`

이 컬럼명을 직접 지정해 읽는 코드를 작성하라.

---

## 문제 6

\`customers.xlsx\` 파일의 \`VIP\` 시트를 읽는 코드를 작성하라.

---

## 문제 7

다음 DataFrame을 \`result.csv\`로 저장하는 코드를 작성하라. 단, 인덱스는 저장하지 않고 한글이 Excel에서 깨지지 않도록 한다.

\`\`\`python
result.to_csv(...)
\`\`\`

---

## 문제 8

다음 코드에서 \`index=False\`를 사용하는 이유를 설명하라.

\`\`\`python
df.to_excel("result.xlsx", index=False)
\`\`\`

---

## 문제 9

\`pathlib\`를 사용해 \`data/raw/orders.csv\` 경로를 만드는 코드를 작성하라.

---

## 문제 10

다음 요구사항을 만족하는 코드를 작성하라.

\`\`\`text
1. data/raw/orders.csv 파일을 읽는다.
2. quantity와 price를 곱해 total 컬럼을 만든다.
3. data/processed/orders_result.csv 파일로 저장한다.
4. 저장할 때 인덱스는 제외한다.
\`\`\`

---

# 정답 및 해설

## 문제 1 정답

정답: **B**

CSV는 값을 콤마 등 구분자로 나누어 저장하는 텍스트 기반 파일이다. Excel 파일처럼 여러 시트를 가질 수는 없다.

---

## 문제 2 정답

\`\`\`python
import pandas as pd

orders = pd.read_csv("orders.csv")
\`\`\`

해설:

\`pd.read_csv()\`는 CSV 파일을 읽어 DataFrame으로 반환한다.

---

## 문제 3 정답

\`\`\`python
import pandas as pd

customers = pd.read_csv("customers.csv", encoding="utf-8-sig")
\`\`\`

또는 파일에 따라 다음처럼 읽어야 할 수도 있다.

\`\`\`python
customers = pd.read_csv("customers.csv", encoding="cp949")
\`\`\`

해설:

한글 CSV 파일은 저장 방식에 따라 인코딩 문제가 발생할 수 있다. \`utf-8\`, \`utf-8-sig\`, \`cp949\` 등을 상황에 따라 확인한다.

---

## 문제 4 정답

\`\`\`python
import pandas as pd

sales = pd.read_csv("sales.csv", sep=";")
\`\`\`

해설:

콤마가 아닌 세미콜론으로 구분된 파일은 \`sep=";"\`를 지정해야 한다.

---

## 문제 5 정답

\`\`\`python
import pandas as pd

columns = ["order_id", "customer", "product", "quantity", "price"]

orders = pd.read_csv(
    "orders_no_header.csv",
    header=None,
    names=columns
)
\`\`\`

해설:

컬럼명이 없는 CSV 파일은 \`header=None\`으로 읽고, \`names\`로 컬럼명을 지정한다.

---

## 문제 6 정답

\`\`\`python
import pandas as pd

vip_customers = pd.read_excel("customers.xlsx", sheet_name="VIP")
\`\`\`

해설:

Excel 파일에서 특정 시트를 읽을 때는 \`sheet_name\` 옵션을 사용한다.

---

## 문제 7 정답

\`\`\`python
result.to_csv("result.csv", index=False, encoding="utf-8-sig")
\`\`\`

해설:

\`index=False\`는 DataFrame의 인덱스를 파일에 저장하지 않도록 한다. \`encoding="utf-8-sig"\`는 한글이 포함된 CSV를 Excel에서 열 때 깨짐을 줄이는 데 도움이 된다.

---

## 문제 8 정답

\`index=False\`는 DataFrame의 인덱스를 Excel 파일에 저장하지 않기 위해 사용한다.

해설:

DataFrame의 인덱스가 실제 분석 데이터가 아닌 단순한 행 번호라면 파일에 저장하지 않는 것이 일반적이다. \`index=False\`를 사용하지 않으면 Excel 파일에 0, 1, 2 같은 인덱스 값이 별도 컬럼처럼 저장될 수 있다.

---

## 문제 9 정답

\`\`\`python
from pathlib import Path

orders_path = Path("data") / "raw" / "orders.csv"
\`\`\`

해설:

\`pathlib\`에서는 \`/\` 연산자를 사용해 경로를 연결할 수 있다.

---

## 문제 10 정답

\`\`\`python
import pandas as pd
from pathlib import Path

RAW_DIR = Path("data/raw")
PROCESSED_DIR = Path("data/processed")
PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

orders = pd.read_csv(RAW_DIR / "orders.csv", encoding="utf-8-sig")
orders["total"] = orders["quantity"] * orders["price"]

orders.to_csv(
    PROCESSED_DIR / "orders_result.csv",
    index=False,
    encoding="utf-8-sig"
)
\`\`\`

해설:

\`Path("data/raw") / "orders.csv"\`로 입력 파일 경로를 만들고, 결과 저장 폴더가 없을 수 있으므로 \`mkdir()\`로 폴더를 만든다. 그다음 CSV를 읽고 \`total\` 컬럼을 계산한 뒤 \`to_csv()\`로 저장한다.

---

# 5장 마무리

이번 장에서는 실제 데이터 분석에서 가장 먼저 필요한 작업인 데이터 불러오기와 저장하기를 배웠다. pandas의 \`read_csv()\`, \`read_excel()\`, \`read_json()\`을 사용하면 다양한 파일 형식의 데이터를 DataFrame으로 가져올 수 있다. 또한 \`to_csv()\`, \`to_excel()\`, \`to_json()\`을 사용하면 분석 결과를 다시 파일로 저장할 수 있다.

데이터를 불러온 뒤에는 반드시 구조를 확인해야 한다. \`head()\`, \`shape\`, \`columns\`, \`dtypes\`, \`info()\`를 사용해 데이터가 의도한 대로 들어왔는지 점검하는 습관이 중요하다.

다음 장에서는 불러온 데이터를 더 자세히 확인하고 탐색하는 방법을 배운다. 데이터 분석은 파일을 읽는 것으로 시작하지만, 본격적인 분석은 데이터의 구조와 품질을 확인하는 데서 출발한다.

---

# 참고 문서

- pandas User Guide: Input/output tools  
  https://pandas.pydata.org/docs/user_guide/io.html
- pandas API Reference: \`read_csv\`  
  https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html
- pandas API Reference: \`read_excel\`  
  https://pandas.pydata.org/docs/reference/api/pandas.read_excel.html
- pandas API Reference: \`DataFrame.to_csv\`  
  https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_csv.html
- pandas API Reference: \`DataFrame.to_excel\`  
  https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_excel.html
- Python Standard Library: \`pathlib\`  
  https://docs.python.org/3/library/pathlib.html
`;export{e as default};