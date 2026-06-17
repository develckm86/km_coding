var e=`<!-- 원본: python_data_analysis_basic_chapter_5_book.md / 세부 장: 5-7 -->

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
`;export{e as default};