var e=`<!-- 원본: python_data_analysis_basic_chapter_5_book.md / 세부 장: 5-5 -->

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
`;export{e as default};