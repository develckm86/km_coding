var e=`<!-- 원본: python_data_analysis_basic_chapter_5_book.md / 세부 장: 5-8 -->

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