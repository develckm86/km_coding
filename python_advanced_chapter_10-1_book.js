var e=`<!-- 원본: python_advanced_chapter_10_book.md / 세부 장: 10-1 -->

# 10.1 실무 프로젝트 구조

기초 과정에서는 하나의 \`.py\` 파일로도 충분했습니다. 예를 들어 다음과 같은 파일 하나로 주문 금액을 계산할 수 있습니다.

\`\`\`python
# order.py

def calculate_total(price: int, quantity: int) -> int:
    return price * quantity

price = 10000
quantity = 3
print(calculate_total(price, quantity))
\`\`\`

이 정도 코드는 한 파일에 있어도 이해하기 어렵지 않습니다. 하지만 기능이 늘어나면 상황이 달라집니다.

\`\`\`text
주문 데이터를 CSV에서 읽는다.
상품별 금액을 계산한다.
잘못된 데이터를 검증한다.
결과를 JSON으로 저장한다.
에러를 로그 파일에 남긴다.
명령행 인수로 입력 파일 경로를 받는다.
테스트 코드를 작성한다.
\`\`\`

이 모든 코드를 하나의 파일에 넣으면 파일이 길어지고, 서로 다른 역할의 코드가 뒤섞입니다.

실무 프로젝트 구조를 만드는 목적은 코드를 예쁘게 정리하는 것이 아닙니다. 목적은 **역할별로 코드를 나누어 수정과 재사용을 쉽게 만드는 것**입니다.

---

## 10.1.1 단일 파일의 한계

단일 파일은 처음에는 편합니다.

\`\`\`text
run.py
\`\`\`

하나의 파일만 실행하면 되기 때문에 단순합니다. 하지만 코드가 길어지면 다음 문제가 생깁니다.

\`\`\`text
1. 원하는 함수를 찾기 어렵다.
2. 수정한 코드가 다른 기능에 영향을 주기 쉽다.
3. 테스트하기 어렵다.
4. 여러 사람이 동시에 작업하기 어렵다.
5. 재사용 가능한 코드와 실행용 코드가 섞인다.
6. 설정값, 파일 경로, 비밀번호 같은 값이 코드 중간에 흩어진다.
\`\`\`

예를 들어 다음 코드는 작은 자동화 스크립트에서는 흔히 볼 수 있습니다.

\`\`\`python
import csv
import json

INPUT_FILE = "sales.csv"
OUTPUT_FILE = "result.json"

rows = []
with open(INPUT_FILE, "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        row["price"] = int(row["price"])
        row["quantity"] = int(row["quantity"])
        row["total"] = row["price"] * row["quantity"]
        rows.append(row)

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
\`\`\`

처음에는 괜찮아 보입니다. 하지만 여기에 다음 요구사항이 추가되면 코드가 빠르게 복잡해집니다.

\`\`\`text
- 입력 파일을 명령행 인수로 받기
- price나 quantity가 비어 있으면 에러 행으로 분리하기
- 결과 파일명을 날짜별로 만들기
- 처리 로그 남기기
- 테스트 코드 작성하기
\`\`\`

이때 코드를 역할별로 나누어야 합니다.

---

## 10.1.2 기능별 파일 분리

같은 코드를 다음처럼 나눌 수 있습니다.

\`\`\`text
sales_app/
  main.py
  reader.py
  processor.py
  writer.py
\`\`\`

각 파일의 역할은 다음과 같습니다.

\`\`\`text
main.py       프로그램 실행 흐름 담당
reader.py     CSV 파일 읽기 담당
processor.py  데이터 변환과 계산 담당
writer.py     결과 저장 담당
\`\`\`

이제 각 파일에는 자신이 맡은 기능만 들어갑니다.

\`\`\`python
# reader.py
import csv
from pathlib import Path


def read_sales_csv(path: str | Path) -> list[dict[str, str]]:
    with open(path, "r", encoding="utf-8") as f:
        return list(csv.DictReader(f))
\`\`\`

\`\`\`python
# processor.py

def add_total_price(row: dict[str, str]) -> dict[str, object]:
    price = int(row["price"])
    quantity = int(row["quantity"])

    return {
        **row,
        "price": price,
        "quantity": quantity,
        "total": price * quantity,
    }
\`\`\`

\`\`\`python
# writer.py
import json
from pathlib import Path


def write_json(data: list[dict[str, object]], path: str | Path) -> None:
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
\`\`\`

\`\`\`python
# main.py
from reader import read_sales_csv
from processor import add_total_price
from writer import write_json


def main() -> None:
    rows = read_sales_csv("sales.csv")
    result = [add_total_price(row) for row in rows]
    write_json(result, "result.json")


if __name__ == "__main__":
    main()
\`\`\`

파일이 많아졌지만 구조는 더 명확해졌습니다. 각 파일을 따로 테스트할 수도 있고, 나중에 \`CSV\` 대신 \`JSON\` 입력을 추가하기도 쉬워집니다.

---

## 10.1.3 실행 코드와 기능 코드 분리

프로젝트 구조에서 중요한 원칙 중 하나는 **실행 코드와 기능 코드를 분리하는 것**입니다.

실행 코드는 프로그램을 시작하는 코드입니다.

\`\`\`python
def main() -> None:
    rows = read_sales_csv("sales.csv")
    result = [add_total_price(row) for row in rows]
    write_json(result, "result.json")


if __name__ == "__main__":
    main()
\`\`\`

기능 코드는 실제 작업을 수행하는 함수나 클래스입니다.

\`\`\`python
def add_total_price(row: dict[str, str]) -> dict[str, object]:
    price = int(row["price"])
    quantity = int(row["quantity"])
    return {**row, "total": price * quantity}
\`\`\`

실행 코드와 기능 코드가 섞이면 테스트하기 어렵습니다. 파일을 import하는 순간 실제 파일을 읽거나 API를 호출할 수 있기 때문입니다.

좋지 않은 예를 봅시다.

\`\`\`python
# processor.py
import csv

with open("sales.csv", "r", encoding="utf-8") as f:
    rows = list(csv.DictReader(f))

for row in rows:
    print(row)
\`\`\`

이 파일은 import만 해도 파일을 읽고 출력합니다.

\`\`\`python
import processor
\`\`\`

위 한 줄을 실행하는 순간 \`sales.csv\`가 필요하고 출력도 발생합니다. 이런 구조는 테스트와 재사용에 불리합니다.

더 좋은 구조는 다음과 같습니다.

\`\`\`python
# processor.py
import csv
from pathlib import Path


def read_rows(path: str | Path) -> list[dict[str, str]]:
    with open(path, "r", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def main() -> None:
    rows = read_rows("sales.csv")
    for row in rows:
        print(row)


if __name__ == "__main__":
    main()
\`\`\`

이제 \`read_rows()\`는 import해서 재사용할 수 있고, 실제 실행은 파일을 직접 실행할 때만 일어납니다.

---

## 10.1.4 폴더 단위 코드 관리

파일이 더 많아지면 폴더로 나누는 것이 좋습니다.

예를 들어 데이터 수집과 검증, 저장 기능이 있는 프로젝트는 다음처럼 나눌 수 있습니다.

\`\`\`text
data_tool/
  main.py
  config.py
  readers/
    csv_reader.py
    json_reader.py
  validators/
    sales_validator.py
  writers/
    json_writer.py
    csv_writer.py
  utils/
    date_utils.py
    path_utils.py
\`\`\`

각 폴더는 역할을 나타냅니다.

\`\`\`text
readers/      데이터를 읽는 코드
validators/   데이터를 검증하는 코드
writers/      데이터를 저장하는 코드
utils/        여러 곳에서 쓰는 보조 기능
\`\`\`

폴더 구조는 정답이 하나로 정해져 있지 않습니다. 중요한 것은 프로젝트 안에서 일관된 기준을 유지하는 것입니다.

---

## 10.1.5 데이터 처리 프로젝트의 기본 흐름

데이터분석 전 단계의 파이썬 프로젝트는 보통 다음 흐름을 가집니다.

\`\`\`text
1. 설정값을 읽는다.
2. 원천 데이터를 읽는다.
3. 데이터를 검증한다.
4. 데이터를 변환한다.
5. 결과를 저장한다.
6. 처리 기록을 로그로 남긴다.
\`\`\`

이를 코드 구조로 옮기면 다음과 같습니다.

\`\`\`text
project/
  main.py
  config.py
  readers.py
  validators.py
  transformers.py
  writers.py
  logging_config.py
\`\`\`

처음부터 복잡하게 시작할 필요는 없습니다. 작은 프로젝트는 파일 몇 개로 시작하고, 기능이 늘어나면 폴더로 확장하면 됩니다.

---
`;export{e as default};