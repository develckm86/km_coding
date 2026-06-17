var e=`# 10장. 모듈, 패키지, 프로젝트 구조

9장에서 우리는 타입 힌트를 사용해 함수와 데이터 구조의 의도를 명확하게 표현하는 방법을 배웠습니다. 타입 힌트는 코드 한 줄 한 줄을 더 읽기 쉽게 만들어 줍니다. 하지만 실무 코드에서는 한 파일 안에 모든 코드를 넣는 방식만으로는 부족합니다.

처음 파이썬을 배울 때는 하나의 파일에 코드를 작성해도 충분합니다.

\`\`\`text
main.py
\`\`\`

하지만 기능이 조금만 늘어나도 문제가 생깁니다. 파일 읽기 함수, 데이터 검증 함수, API 요청 함수, 설정값, 예외 클래스, 로그 설정, 테스트 코드가 모두 하나의 파일에 들어가면 코드를 찾기도 어렵고 수정하기도 어려워집니다.

이때 필요한 것이 **모듈, 패키지, 프로젝트 구조**입니다.

모듈은 코드를 파일 단위로 나누는 방법입니다. 패키지는 여러 모듈을 폴더 단위로 묶는 방법입니다. 프로젝트 구조는 실행 코드, 기능 코드, 설정, 테스트, 데이터 파일을 어떤 위치에 둘지 정하는 방식입니다.

데이터분석 과정으로 넘어가면 이런 구조화 능력이 더 중요해집니다. 분석을 처음 시작할 때는 주피터 노트북 하나로 충분해 보일 수 있습니다. 하지만 데이터 수집, 전처리, 검증, 저장, 리포트 생성, 자동 실행까지 이어지면 결국 재사용 가능한 \`.py\` 파일과 패키지 구조가 필요해집니다.

이번 장의 목표는 다음과 같습니다.

- 모듈과 패키지를 실무 관점에서 다시 이해한다.
- \`import\`가 단순히 파일을 가져오는 문법이 아니라 검색, 실행, 이름 바인딩 과정을 포함한다는 점을 이해한다.
- 절대 import와 상대 import의 차이를 이해한다.
- 순환 import가 왜 발생하고 어떻게 피하는지 이해한다.
- \`__init__.py\`의 역할과 패키지 공개 API 설계 방법을 배운다.
- 설정값과 민감 정보를 코드에서 분리하는 방법을 배운다.
- \`pyproject.toml\`의 역할을 이해한다.
- \`requirements.txt\`와 버전 고정의 의미를 이해한다.
- 데이터분석 전 단계에 적합한 실무 프로젝트 구조를 설계할 수 있다.

---

## 10.1 실무 프로젝트 구조

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

## 10.2 import 구조 심화

기초 과정에서는 \`import\`를 “다른 파일이나 라이브러리를 가져오는 문법” 정도로 배웠습니다.

\`\`\`python
import math
\`\`\`

고급 과정에서는 조금 더 깊게 이해해야 합니다. \`import\`는 단순히 파일을 복사해 오는 동작이 아닙니다.

파이썬에서 \`import\`는 크게 다음 과정을 거칩니다.

\`\`\`text
1. 모듈을 찾는다.
2. 모듈 객체를 만든다.
3. 모듈 코드를 실행한다.
4. 실행 결과로 만들어진 모듈 객체를 이름에 연결한다.
5. 이미 import된 모듈은 캐시에서 재사용한다.
\`\`\`

이 과정을 이해하면 다음 문제를 설명할 수 있습니다.

\`\`\`text
왜 import할 때 print가 실행될까?
왜 같은 모듈을 여러 번 import해도 한 번만 실행될까?
왜 순환 import가 발생할까?
왜 실행 위치에 따라 ModuleNotFoundError가 발생할까?
\`\`\`

---

## 10.2.1 import는 이름을 바인딩한다

다음 코드를 봅시다.

\`\`\`python
import math

print(math.sqrt(16))
\`\`\`

\`import math\`를 실행하면 파이썬은 \`math\`라는 모듈을 찾고, 그 결과를 현재 파일의 이름공간에 \`math\`라는 이름으로 연결합니다. 그래서 \`math.sqrt()\`처럼 사용할 수 있습니다.

다음처럼 특정 이름만 가져올 수도 있습니다.

\`\`\`python
from math import sqrt

print(sqrt(16))
\`\`\`

이 경우 현재 파일에는 \`math\`라는 이름이 생기지 않고, \`sqrt\`라는 이름만 생깁니다.

\`\`\`python
from math import sqrt

print(sqrt(16))
print(math.pi)  # NameError
\`\`\`

\`from ... import ...\` 문법은 편리하지만, 어떤 모듈에서 온 이름인지 덜 명확해질 수 있습니다. 실무에서는 코드의 명확성을 기준으로 선택합니다.

---

## 10.2.2 import 시 모듈의 최상위 코드가 실행된다

다음 파일을 만들어 봅시다.

\`\`\`python
# message.py
print("message.py가 실행되었습니다.")

text = "안녕하세요"
\`\`\`

그리고 다른 파일에서 import합니다.

\`\`\`python
# main.py
import message

print(message.text)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
message.py가 실행되었습니다.
안녕하세요
\`\`\`

왜 \`message.py\` 안의 \`print()\`가 실행되었을까요? 파이썬은 모듈을 처음 import할 때 그 파일의 최상위 코드를 실행하기 때문입니다.

그래서 모듈 파일의 최상위에는 보통 다음 정도만 두는 것이 좋습니다.

\`\`\`text
- import 문
- 상수
- 함수 정의
- 클래스 정의
\`\`\`

반대로 다음 코드는 가급적 \`main()\` 함수나 별도 함수 안에 두는 것이 좋습니다.

\`\`\`text
- 실제 파일 읽기
- API 요청
- 데이터베이스 연결
- 긴 계산 작업
- 사용자 입력 받기
\`\`\`

---

## 10.2.3 \`sys.modules\`와 import 캐시

같은 모듈을 여러 번 import하면 매번 파일이 다시 실행될까요?

다음 예제를 봅시다.

\`\`\`python
# counter_module.py
print("counter_module imported")

value = 10
\`\`\`

\`\`\`python
# main.py
import counter_module
import counter_module
import counter_module

print(counter_module.value)
\`\`\`

실행 결과는 보통 다음과 같습니다.

\`\`\`text
counter_module imported
10
\`\`\`

\`import counter_module\`을 세 번 작성했지만 출력은 한 번만 일어납니다. 파이썬은 이미 import한 모듈을 \`sys.modules\`라는 캐시에 저장합니다. 같은 모듈을 다시 import하면 파일을 다시 실행하지 않고 캐시된 모듈 객체를 사용합니다.

직접 확인해볼 수도 있습니다.

\`\`\`python
import sys
import math

print("math" in sys.modules)
print(sys.modules["math"])
\`\`\`

이 특성은 중요합니다. 모듈 최상위 코드에 부수 효과가 있으면 첫 import 시점에만 실행됩니다. 이 때문에 import 시 실행되는 코드와 프로그램 실행 코드를 구분해야 합니다.

---

## 10.2.4 절대 import

절대 import는 프로젝트의 최상위 패키지 이름부터 전체 경로를 적는 방식입니다.

예를 들어 다음 구조가 있다고 가정합니다.

\`\`\`text
project/
  sales_app/
    __init__.py
    main.py
    services/
      __init__.py
      processor.py
    utils/
      __init__.py
      date_utils.py
\`\`\`

\`processor.py\`에서 \`date_utils.py\`를 import하려면 다음처럼 작성할 수 있습니다.

\`\`\`python
from sales_app.utils.date_utils import get_today_string
\`\`\`

이 방식은 어디에서 import하는지 명확합니다. 파일 위치가 바뀌어도 패키지 기준 경로가 유지되면 import 문을 이해하기 쉽습니다.

실무 프로젝트에서는 절대 import를 기본으로 사용하는 경우가 많습니다.

---

## 10.2.5 상대 import

상대 import는 현재 모듈의 위치를 기준으로 import하는 방식입니다.

\`\`\`python
from ..utils.date_utils import get_today_string
\`\`\`

여기서 \`..\`는 한 단계 위 패키지를 의미합니다.

예를 들어 다음 파일에서 사용할 수 있습니다.

\`\`\`text
sales_app/
  services/
    processor.py
  utils/
    date_utils.py
\`\`\`

\`processor.py\`에서 \`utils.date_utils\`를 상대 import하려면 다음처럼 쓸 수 있습니다.

\`\`\`python
from ..utils.date_utils import get_today_string
\`\`\`

상대 import는 패키지 내부 구조를 기준으로 작성하기 때문에 패키지 안에서는 간결할 수 있습니다. 하지만 파일을 직접 실행할 때 문제가 생기기 쉽습니다.

예를 들어 다음처럼 실행하면 상대 import가 실패할 수 있습니다.

\`\`\`bash
python sales_app/services/processor.py
\`\`\`

상대 import는 “이 파일이 어떤 패키지 안에 있는지”를 알아야 동작합니다. 따라서 패키지 내부 모듈은 직접 실행하기보다, 프로젝트 루트에서 모듈 형태로 실행하는 것이 좋습니다.

\`\`\`bash
python -m sales_app.services.processor
\`\`\`

하지만 실무에서는 보통 내부 모듈을 직접 실행하지 않고 \`main.py\`나 CLI 진입점에서 실행 흐름을 시작합니다.

---

## 10.2.6 import 경로와 실행 위치

\`ModuleNotFoundError\`는 초보자뿐 아니라 실무에서도 자주 만나는 에러입니다.

\`\`\`text
ModuleNotFoundError: No module named 'sales_app'
\`\`\`

이 에러는 파이썬이 해당 모듈을 검색 경로에서 찾지 못했다는 뜻입니다.

파이썬은 import할 때 여러 위치를 검색합니다. 그중 중요한 것은 다음과 같습니다.

\`\`\`text
- 현재 실행 중인 스크립트의 위치 또는 현재 작업 디렉터리
- PYTHONPATH 환경 변수에 등록된 경로
- 표준 라이브러리 경로
- site-packages에 설치된 외부 패키지 경로
\`\`\`

현재 작업 디렉터리가 달라지면 같은 코드도 다르게 동작할 수 있습니다.

예를 들어 다음 구조를 생각해 봅시다.

\`\`\`text
project/
  sales_app/
    __init__.py
    main.py
    utils.py
\`\`\`

프로젝트 루트에서 실행하면 정상 동작할 수 있습니다.

\`\`\`bash
cd project
python -m sales_app.main
\`\`\`

하지만 \`sales_app\` 폴더 안으로 들어가서 실행하면 import 기준이 달라져 문제가 생길 수 있습니다.

\`\`\`bash
cd project/sales_app
python main.py
\`\`\`

그래서 실무에서는 다음 원칙을 정해두는 것이 좋습니다.

\`\`\`text
프로젝트 루트에서 실행한다.
패키지 내부 파일을 직접 실행하지 않는다.
실행 진입점을 명확히 둔다.
\`\`\`

---

## 10.2.7 순환 import 문제

순환 import는 두 모듈이 서로를 import할 때 발생합니다.

\`\`\`text
user.py  -> order.py를 import
order.py -> user.py를 import
\`\`\`

예를 들어 다음 코드를 봅시다.

\`\`\`python
# user.py
from order import Order


class User:
    def __init__(self, name: str) -> None:
        self.name = name
        self.orders: list[Order] = []
\`\`\`

\`\`\`python
# order.py
from user import User


class Order:
    def __init__(self, user: User, amount: int) -> None:
        self.user = user
        self.amount = amount
\`\`\`

두 파일은 서로를 필요로 합니다. 이 경우 import 시점에 한쪽 모듈이 아직 완전히 초기화되지 않은 상태에서 다른 모듈이 접근하면서 에러가 발생할 수 있습니다.

대표적인 해결 방법은 다음과 같습니다.

\`\`\`text
1. 공통 타입을 별도 모듈로 분리한다.
2. 두 클래스가 반드시 서로를 알아야 하는지 설계를 다시 본다.
3. 타입 힌트만 필요하다면 지연 평가 방식을 사용한다.
4. 함수 내부에서 필요한 시점에 import한다.
\`\`\`

타입 힌트만 필요한 경우에는 다음처럼 문자열 타입 힌트를 사용할 수 있습니다.

\`\`\`python
# order.py

class Order:
    def __init__(self, user: "User", amount: int) -> None:
        self.user = user
        self.amount = amount
\`\`\`

또는 다음처럼 \`TYPE_CHECKING\`을 사용할 수 있습니다.

\`\`\`python
# order.py
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from user import User


class Order:
    def __init__(self, user: "User", amount: int) -> None:
        self.user = user
        self.amount = amount
\`\`\`

\`TYPE_CHECKING\`은 타입 검사 도구가 코드를 분석할 때는 \`True\`처럼 취급되지만, 실제 실행 중에는 \`False\`입니다. 따라서 런타임 순환 import를 피하면서 타입 힌트를 유지할 수 있습니다.

하지만 순환 import가 자주 발생한다면 단순한 import 문제가 아니라 설계 문제일 가능성이 높습니다. 두 모듈이 서로 너무 강하게 의존하고 있다는 신호일 수 있습니다.

---

## 10.2.8 import 시 코드가 실행되는 문제

다음 파일을 봅시다.

\`\`\`python
# report.py
from pathlib import Path

DATA_PATH = Path("sales.csv")

print("보고서를 생성합니다.")
text = DATA_PATH.read_text(encoding="utf-8")
print(text)
\`\`\`

다른 파일에서 \`report.py\`의 상수만 사용하고 싶어서 import했습니다.

\`\`\`python
from report import DATA_PATH

print(DATA_PATH)
\`\`\`

하지만 import하는 순간 \`report.py\`의 최상위 코드가 실행되어 파일을 읽고 출력합니다. 이런 코드는 재사용하기 어렵습니다.

다음처럼 바꾸는 것이 좋습니다.

\`\`\`python
# report.py
from pathlib import Path

DATA_PATH = Path("sales.csv")


def read_report(path: Path = DATA_PATH) -> str:
    return path.read_text(encoding="utf-8")


def main() -> None:
    print("보고서를 생성합니다.")
    print(read_report())


if __name__ == "__main__":
    main()
\`\`\`

이제 import할 때는 함수와 상수만 정의되고, 실제 실행은 직접 파일을 실행할 때만 일어납니다.

---

## 10.3 패키지 구성

모듈은 하나의 \`.py\` 파일입니다. 패키지는 여러 모듈을 계층적으로 묶는 구조입니다.

다음 구조에서 \`sales_app\`은 패키지입니다.

\`\`\`text
sales_app/
  __init__.py
  main.py
  models.py
  services.py
\`\`\`

그리고 \`services\` 폴더도 패키지가 될 수 있습니다.

\`\`\`text
sales_app/
  __init__.py
  services/
    __init__.py
    processor.py
    validator.py
\`\`\`

패키지를 사용하면 코드의 이름 공간을 나누고, 기능을 계층적으로 관리할 수 있습니다.

---

## 10.3.1 \`__init__.py\`의 역할

기초 과정에서는 \`__init__.py\`를 “패키지임을 알려주는 파일” 정도로 배웠습니다. 고급 과정에서는 조금 더 구체적으로 이해해 봅시다.

일반 패키지는 보통 폴더 안에 \`__init__.py\` 파일을 둡니다.

\`\`\`text
sales_app/
  __init__.py
  models.py
  services.py
\`\`\`

\`__init__.py\`는 패키지를 import할 때 실행됩니다.

\`\`\`python
import sales_app
\`\`\`

이때 \`sales_app/__init__.py\`의 코드가 실행됩니다.

따라서 \`__init__.py\`에는 무거운 작업을 넣지 않는 것이 좋습니다.

\`\`\`text
좋은 사용 예:
- 버전 정보 정의
- 자주 사용하는 클래스나 함수 노출
- 패키지 공개 API 정리

피해야 할 사용 예:
- 파일 읽기
- API 요청
- 데이터베이스 연결
- 시간이 오래 걸리는 초기화
\`\`\`

---

## 10.3.2 공개 API 설계

패키지를 만들 때는 외부에서 어떤 이름을 사용하게 할지 정할 수 있습니다.

예를 들어 내부 파일 구조는 다음과 같습니다.

\`\`\`text
sales_app/
  __init__.py
  models.py
  services.py
\`\`\`

\`models.py\`에는 \`SaleRecord\`가 있고, \`services.py\`에는 \`calculate_total_sales()\`가 있다고 가정합니다.

\`\`\`python
# models.py
from dataclasses import dataclass


@dataclass
class SaleRecord:
    product: str
    price: int
    quantity: int
\`\`\`

\`\`\`python
# services.py
from .models import SaleRecord


def calculate_total_sales(records: list[SaleRecord]) -> int:
    return sum(record.price * record.quantity for record in records)
\`\`\`

이제 \`__init__.py\`에서 외부에 공개할 이름을 정리할 수 있습니다.

\`\`\`python
# __init__.py
from .models import SaleRecord
from .services import calculate_total_sales

__all__ = ["SaleRecord", "calculate_total_sales"]
\`\`\`

사용자는 다음처럼 간단하게 사용할 수 있습니다.

\`\`\`python
from sales_app import SaleRecord, calculate_total_sales
\`\`\`

이 구조의 장점은 내부 파일 구조가 바뀌어도 외부 사용법을 어느 정도 유지할 수 있다는 점입니다.

---

## 10.3.3 내부 모듈과 외부 사용 모듈 구분

패키지 안에는 외부 사용자가 직접 사용하기를 기대하는 모듈과 내부 구현용 모듈이 함께 있을 수 있습니다.

\`\`\`text
sales_app/
  __init__.py
  models.py
  services.py
  _internal.py
\`\`\`

관례적으로 이름 앞에 \`_\`를 붙이면 내부용이라는 의미를 나타냅니다.

\`\`\`python
# _internal.py

def normalize_product_name(name: str) -> str:
    return name.strip().lower()
\`\`\`

파이썬이 \`_internal.py\` 사용을 강제로 막는 것은 아닙니다. 하지만 이름을 통해 “이 모듈은 외부에서 직접 사용하지 않는 것이 좋다”는 의도를 전달할 수 있습니다.

이런 구분은 실무 프로젝트에서 중요합니다.

\`\`\`text
공개 API: 외부 코드가 사용해도 되는 안정적인 기능
내부 구현: 패키지 내부에서만 사용할 것을 기대하는 기능
\`\`\`

외부 사용자가 내부 구현에 의존하면 나중에 구조를 바꾸기 어려워집니다.

---

## 10.3.4 하위 패키지 구성

프로젝트가 커지면 패키지 안에 하위 패키지를 둘 수 있습니다.

\`\`\`text
sales_app/
  __init__.py
  models/
    __init__.py
    sales.py
    customer.py
  services/
    __init__.py
    sales_service.py
    report_service.py
  utils/
    __init__.py
    date_utils.py
    file_utils.py
\`\`\`

이 구조는 기능이 많을 때 유용합니다. 하지만 처음부터 과하게 나누면 오히려 복잡합니다.

작은 프로젝트에서는 다음 구조로 충분할 수 있습니다.

\`\`\`text
sales_app/
  __init__.py
  models.py
  services.py
  utils.py
\`\`\`

그리고 기능이 늘어나면 폴더로 분리합니다.

\`\`\`text
sales_app/
  models/
  services/
  utils/
\`\`\`

좋은 구조는 처음부터 완벽하게 만들어지는 것이 아니라, 기능이 늘어나면서 자연스럽게 정리됩니다.

---

## 10.3.5 \`__all__\`의 의미

\`__all__\`은 \`from package import *\`를 사용할 때 어떤 이름을 가져올지 정하는 목록입니다.

\`\`\`python
# sales_app/__init__.py
from .models import SaleRecord
from .services import calculate_total_sales

__all__ = ["SaleRecord", "calculate_total_sales"]
\`\`\`

이제 다음 코드를 실행하면 \`__all__\`에 있는 이름만 가져옵니다.

\`\`\`python
from sales_app import *
\`\`\`

하지만 실무에서는 \`import *\`를 자주 사용하지 않는 것이 좋습니다. 어떤 이름이 들어오는지 명확하지 않기 때문입니다.

\`\`\`python
# 권장하지 않는 방식
from sales_app import *
\`\`\`

명확한 import가 더 좋습니다.

\`\`\`python
from sales_app import SaleRecord, calculate_total_sales
\`\`\`

그럼에도 \`__all__\`은 패키지가 외부에 제공하려는 공개 이름을 문서화하는 효과가 있습니다.

---

## 10.4 설정 관리

실무 코드에는 설정값이 많습니다.

\`\`\`text
입력 파일 경로
출력 파일 경로
로그 파일 경로
API URL
API Key
데이터베이스 경로
재시도 횟수
타임아웃 시간
실행 환경
\`\`\`

이런 값을 코드 중간에 직접 쓰면 유지보수가 어려워집니다.

\`\`\`python
# 좋지 않은 예
response = requests.get(
    "https://api.example.com/orders",
    headers={"Authorization": "Bearer abc123"},
    timeout=3,
)
\`\`\`

API URL, 인증 토큰, 타임아웃이 코드에 직접 들어가 있습니다. 나중에 값이 바뀌면 코드를 수정해야 합니다. 특히 인증 토큰 같은 민감 정보는 코드에 직접 쓰면 위험합니다.

설정 관리는 이런 값을 코드에서 분리하는 작업입니다.

---

## 10.4.1 설정값을 분리해야 하는 이유

설정값을 분리해야 하는 이유는 다음과 같습니다.

\`\`\`text
1. 환경마다 값이 다를 수 있다.
2. 자주 바뀌는 값을 코드와 분리할 수 있다.
3. 민감 정보를 코드에 직접 쓰지 않을 수 있다.
4. 테스트 환경과 실제 실행 환경을 나눌 수 있다.
5. 코드 재사용성이 좋아진다.
\`\`\`

예를 들어 개발 환경에서는 테스트용 API를 쓰고, 실제 운영 환경에서는 운영 API를 써야 할 수 있습니다.

\`\`\`text
개발 환경 API: https://dev-api.example.com
운영 환경 API: https://api.example.com
\`\`\`

이 값을 코드에 직접 쓰면 환경을 바꿀 때마다 코드를 수정해야 합니다. 설정 파일이나 환경 변수를 사용하면 실행 환경에 따라 값을 바꿀 수 있습니다.

---

## 10.4.2 파이썬 설정 파일 사용

가장 간단한 방법은 \`config.py\` 파일을 만드는 것입니다.

\`\`\`python
# config.py
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
LOG_DIR = BASE_DIR / "logs"

INPUT_FILE = DATA_DIR / "sales.csv"
OUTPUT_FILE = DATA_DIR / "result.json"
LOG_FILE = LOG_DIR / "app.log"
\`\`\`

다른 파일에서는 다음처럼 가져와 사용할 수 있습니다.

\`\`\`python
from config import INPUT_FILE, OUTPUT_FILE

print(INPUT_FILE)
print(OUTPUT_FILE)
\`\`\`

이 방식은 간단하고 파이썬 코드이기 때문에 경로 계산이나 기본값 처리도 쉽게 할 수 있습니다.

다만 \`config.py\`에 비밀번호나 API Key 같은 민감 정보를 직접 쓰는 것은 피해야 합니다.

---

## 10.4.3 JSON 설정 파일 사용

설정값을 JSON 파일로 분리할 수도 있습니다.

\`\`\`json
{
  "input_file": "data/sales.csv",
  "output_file": "data/result.json",
  "log_file": "logs/app.log",
  "timeout": 5
}
\`\`\`

이를 읽는 코드는 다음과 같습니다.

\`\`\`python
import json
from pathlib import Path
from typing import Any


def load_config(path: str | Path) -> dict[str, Any]:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


config = load_config("config.json")

print(config["input_file"])
print(config["timeout"])
\`\`\`

JSON 설정 파일은 사람이 읽기 쉽고, 다른 언어와도 호환됩니다. 하지만 주석을 직접 쓸 수 없고, 타입이 명확하지 않다는 단점이 있습니다.

타입 힌트를 더하고 싶다면 \`TypedDict\`를 사용할 수 있습니다.

\`\`\`python
from typing import TypedDict


class AppConfig(TypedDict):
    input_file: str
    output_file: str
    log_file: str
    timeout: int
\`\`\`

\`\`\`python
import json
from pathlib import Path


def load_config(path: str | Path) -> AppConfig:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)
\`\`\`

이렇게 하면 설정값의 구조를 코드에 표현할 수 있습니다.

---

## 10.4.4 환경 변수 사용

민감 정보는 보통 환경 변수로 관리합니다.

환경 변수는 운영체제나 실행 환경에 저장된 값입니다. 파이썬에서는 \`os.environ\`으로 읽을 수 있습니다.

\`\`\`python
import os

api_key = os.environ.get("API_KEY")

if api_key is None:
    raise RuntimeError("API_KEY 환경 변수가 설정되어 있지 않습니다.")
\`\`\`

환경 변수는 다음 값들을 저장할 때 자주 사용합니다.

\`\`\`text
API Key
비밀번호
데이터베이스 접속 정보
인증 토큰
실행 환경 이름
\`\`\`

환경 변수를 사용하는 이유는 민감 정보를 코드 저장소에 남기지 않기 위해서입니다.

좋지 않은 예입니다.

\`\`\`python
API_KEY = "sk-xxxxxxxxxxxxxxxx"
\`\`\`

이런 값이 코드에 들어가면 Git에 커밋될 수 있습니다. 한 번 공개 저장소에 올라간 비밀값은 삭제해도 이미 노출되었다고 보는 것이 안전합니다.

더 나은 방식은 다음과 같습니다.

\`\`\`python
import os

API_KEY = os.environ["API_KEY"]
\`\`\`

\`os.environ["API_KEY"]\`는 값이 없을 때 바로 \`KeyError\`를 발생시킵니다. 반드시 있어야 하는 값에는 이 방식이 적합할 수 있습니다.

기본값이 있어도 되는 설정에는 \`get()\`을 사용할 수 있습니다.

\`\`\`python
import os

TIMEOUT = int(os.environ.get("TIMEOUT", "5"))
\`\`\`

환경 변수는 문자열로 들어오기 때문에 숫자가 필요하면 직접 변환해야 합니다.

---

## 10.4.5 설정 객체 만들기

설정값이 많아지면 딕셔너리보다 클래스로 관리하는 것이 좋을 수 있습니다.

\`\`\`python
from dataclasses import dataclass
from pathlib import Path
import os


@dataclass(frozen=True)
class Settings:
    input_file: Path
    output_file: Path
    log_file: Path
    api_key: str
    timeout: int = 5


def load_settings() -> Settings:
    api_key = os.environ.get("API_KEY")
    if api_key is None:
        raise RuntimeError("API_KEY가 설정되어 있지 않습니다.")

    return Settings(
        input_file=Path(os.environ.get("INPUT_FILE", "data/sales.csv")),
        output_file=Path(os.environ.get("OUTPUT_FILE", "data/result.json")),
        log_file=Path(os.environ.get("LOG_FILE", "logs/app.log")),
        api_key=api_key,
        timeout=int(os.environ.get("TIMEOUT", "5")),
    )
\`\`\`

\`frozen=True\`를 사용하면 설정 객체를 만든 뒤 값을 바꾸지 못하게 할 수 있습니다.

\`\`\`python
settings = load_settings()
print(settings.input_file)
\`\`\`

설정 객체를 사용하면 함수에 필요한 설정을 명확히 전달할 수 있습니다.

\`\`\`python
def run(settings: Settings) -> None:
    print(settings.input_file)
    print(settings.output_file)
\`\`\`

전역 변수에 직접 의존하는 것보다 테스트하기 쉽고 구조가 명확합니다.

---

## 10.5 \`pyproject.toml\` 기초

\`pyproject.toml\`은 파이썬 프로젝트의 메타데이터와 도구 설정을 담을 수 있는 파일입니다.

기초 과정에서는 \`requirements.txt\`만 사용해도 충분했습니다. 하지만 프로젝트가 커지고 패키징, 테스트, 포맷팅, 타입 검사, 빌드 도구 설정이 필요해지면 \`pyproject.toml\`을 자주 만나게 됩니다.

파일 이름에서 알 수 있듯이 형식은 TOML입니다.

\`\`\`toml
[project]
name = "sales-tool"
version = "0.1.0"
description = "A small sales data processing tool"
requires-python = ">=3.11"
dependencies = [
    "requests>=2.32",
]
\`\`\`

처음부터 모든 설정을 알 필요는 없습니다. 이 장에서는 \`pyproject.toml\`이 어떤 역할을 하는 파일인지 이해하는 것이 목표입니다.

---

## 10.5.1 프로젝트 메타데이터

\`[project]\` 영역에는 프로젝트의 기본 정보를 적을 수 있습니다.

\`\`\`toml
[project]
name = "sales-tool"
version = "0.1.0"
description = "Sales data processing tool"
readme = "README.md"
requires-python = ">=3.11"
\`\`\`

각 항목은 다음 의미를 가집니다.

\`\`\`text
name              프로젝트 또는 패키지 이름
version           버전
description       짧은 설명
readme            README 파일
requires-python   필요한 파이썬 버전
\`\`\`

실무 내부 도구라도 버전과 설명을 적어두면 관리하기 쉽습니다.

---

## 10.5.2 의존성 정보

프로젝트가 사용하는 외부 라이브러리는 \`dependencies\`에 적을 수 있습니다.

\`\`\`toml
[project]
name = "sales-tool"
version = "0.1.0"
dependencies = [
    "requests>=2.32",
    "pydantic>=2.0",
]
\`\`\`

테스트나 개발 도구처럼 실행에는 필요 없지만 개발 중에 필요한 의존성은 별도 그룹으로 관리할 수 있습니다. 도구마다 표현 방식은 조금씩 다를 수 있습니다.

예를 들어 선택 의존성으로 다음처럼 표현할 수 있습니다.

\`\`\`toml
[project.optional-dependencies]
dev = [
    "pytest>=8.0",
    "mypy>=1.0",
]
\`\`\`

이런 방식은 “실행에 필요한 라이브러리”와 “개발에 필요한 라이브러리”를 구분하는 데 도움이 됩니다.

---

## 10.5.3 도구 설정 위치

\`pyproject.toml\`은 여러 도구의 설정을 담는 장소로도 사용됩니다.

예를 들어 pytest 설정을 넣을 수 있습니다.

\`\`\`toml
[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = ["test_*.py"]
\`\`\`

mypy 설정도 넣을 수 있습니다.

\`\`\`toml
[tool.mypy]
python_version = "3.11"
strict = true
\`\`\`

이처럼 \`pyproject.toml\`은 프로젝트 설정의 중심 파일 역할을 할 수 있습니다.

단, 모든 도구가 반드시 \`pyproject.toml\`만 사용하는 것은 아닙니다. 어떤 도구는 별도 설정 파일을 사용할 수도 있습니다. 중요한 것은 프로젝트에서 어떤 기준을 쓸지 정하고 일관되게 관리하는 것입니다.

---

## 10.5.4 \`pyproject.toml\`과 \`requirements.txt\`의 차이

두 파일은 비슷해 보이지만 목적이 다릅니다.

\`\`\`text
requirements.txt   특정 환경에 설치할 패키지 목록
pyproject.toml     프로젝트 메타데이터와 도구 설정, 의존성 선언
\`\`\`

\`requirements.txt\`는 보통 다음처럼 설치 목록을 적습니다.

\`\`\`text
requests==2.32.3
pandas==2.2.3
pytest==8.3.4
\`\`\`

\`pyproject.toml\`은 프로젝트 정보를 더 구조적으로 표현합니다.

\`\`\`toml
[project]
name = "sales-tool"
version = "0.1.0"
dependencies = [
    "requests>=2.32",
]
\`\`\`

초보 실무 프로젝트에서는 \`requirements.txt\`만으로도 충분할 수 있습니다. 하지만 배포 가능한 패키지를 만들거나 여러 도구 설정을 통합하려면 \`pyproject.toml\`을 이해해야 합니다.

---

## 10.6 의존성 관리

의존성은 프로젝트가 동작하기 위해 필요한 외부 라이브러리입니다.

예를 들어 다음 코드를 실행하려면 \`requests\`가 설치되어 있어야 합니다.

\`\`\`python
import requests

response = requests.get("https://example.com")
\`\`\`

\`requests\`는 이 프로젝트의 의존성입니다.

실무에서는 의존성을 제대로 관리하지 않으면 다음 문제가 생깁니다.

\`\`\`text
내 컴퓨터에서는 되는데 다른 사람 컴퓨터에서는 안 된다.
어제는 되던 코드가 오늘은 안 된다.
라이브러리 버전이 달라서 함수 사용법이 다르다.
서버에 배포했더니 필요한 패키지가 빠져 있다.
\`\`\`

---

## 10.6.1 \`requirements.txt\`

가장 단순한 의존성 관리 방법은 \`requirements.txt\` 파일을 사용하는 것입니다.

\`\`\`text
requests==2.32.3
pandas==2.2.3
pytest==8.3.4
\`\`\`

다른 환경에서는 다음 명령으로 같은 패키지를 설치할 수 있습니다.

\`\`\`bash
pip install -r requirements.txt
\`\`\`

현재 환경에 설치된 패키지 목록을 파일로 저장할 수도 있습니다.

\`\`\`bash
pip freeze > requirements.txt
\`\`\`

하지만 \`pip freeze\`는 현재 환경의 모든 패키지를 적기 때문에 불필요한 패키지까지 들어갈 수 있습니다. 그래서 프로젝트에 정말 필요한 패키지만 직접 정리하는 방식도 많이 사용합니다.

---

## 10.6.2 버전 고정

버전 고정은 특정 버전의 라이브러리를 사용하겠다고 명시하는 것입니다.

\`\`\`text
requests==2.32.3
\`\`\`

이렇게 하면 항상 같은 버전이 설치됩니다.

범위를 지정할 수도 있습니다.

\`\`\`text
requests>=2.32,<3.0
\`\`\`

이 의미는 다음과 같습니다.

\`\`\`text
2.32 이상
3.0 미만
\`\`\`

버전 범위를 넓게 잡으면 업데이트를 쉽게 받을 수 있지만, 예상하지 못한 변경으로 코드가 깨질 수 있습니다. 버전을 완전히 고정하면 재현성은 좋아지지만, 보안 업데이트나 버그 수정 반영이 늦어질 수 있습니다.

의존성 관리는 항상 균형이 필요합니다.

---

## 10.6.3 개발용 의존성과 실행용 의존성

실행용 의존성은 프로그램이 실제로 동작하기 위해 필요한 라이브러리입니다.

\`\`\`text
requests
pandas
openpyxl
\`\`\`

개발용 의존성은 개발, 테스트, 검사에 필요한 라이브러리입니다.

\`\`\`text
pytest
mypy
ruff
black
\`\`\`

작은 프로젝트에서는 하나의 \`requirements.txt\`에 모두 적어도 됩니다. 하지만 프로젝트가 커지면 구분하는 것이 좋습니다.

예를 들어 다음처럼 파일을 나눌 수 있습니다.

\`\`\`text
requirements.txt
requirements-dev.txt
\`\`\`

\`requirements.txt\`:

\`\`\`text
requests==2.32.3
pandas==2.2.3
\`\`\`

\`requirements-dev.txt\`:

\`\`\`text
-r requirements.txt
pytest==8.3.4
mypy==1.13.0
\`\`\`

이제 개발 환경에서는 다음 명령을 사용합니다.

\`\`\`bash
pip install -r requirements-dev.txt
\`\`\`

운영 환경에서는 실행에 필요한 것만 설치할 수 있습니다.

\`\`\`bash
pip install -r requirements.txt
\`\`\`

---

## 10.6.4 재현 가능한 환경 만들기

재현 가능한 환경이란 다른 컴퓨터에서도 같은 코드가 같은 방식으로 실행될 수 있는 환경을 말합니다.

이를 위해 필요한 것은 다음과 같습니다.

\`\`\`text
1. 파이썬 버전을 명시한다.
2. 외부 라이브러리 목록을 관리한다.
3. 중요한 라이브러리 버전을 고정한다.
4. 실행 방법을 README에 적는다.
5. 설정값과 환경 변수를 문서화한다.
\`\`\`

예를 들어 README에는 다음처럼 적을 수 있습니다.

\`\`\`markdown
## 실행 방법

\`\`\`bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m sales_app.main --input data/sales.csv --output data/result.json
\`\`\`
\`\`\`

윈도우 환경이면 가상환경 활성화 명령이 다를 수 있으므로 따로 안내하는 것이 좋습니다.

\`\`\`powershell
.venv\\Scripts\\activate
\`\`\`

재현 가능한 환경은 데이터분석에서도 중요합니다. 분석 결과는 코드뿐 아니라 라이브러리 버전, 데이터 파일, 실행 설정에 영향을 받기 때문입니다.

---

## 10.7 실무 프로젝트 예시 구조

이제 지금까지 배운 내용을 바탕으로 고급 파이썬 수업과 데이터분석 과정 사이에 적합한 프로젝트 구조를 설계해 봅시다.

여기서는 \`sales_tool\`이라는 데이터 처리 도구를 예로 들겠습니다.

---

## 10.7.1 기본 구조

\`\`\`text
sales-tool/
  README.md
  pyproject.toml
  requirements.txt
  requirements-dev.txt
  .gitignore
  data/
    input/
    output/
  logs/
  src/
    sales_tool/
      __init__.py
      main.py
      config.py
      logging_config.py
      models.py
      readers.py
      validators.py
      transformers.py
      writers.py
      services.py
      utils/
        __init__.py
        path_utils.py
        date_utils.py
  tests/
    test_validators.py
    test_transformers.py
\`\`\`

각 요소의 역할은 다음과 같습니다.

\`\`\`text
README.md             프로젝트 설명과 실행 방법
pyproject.toml         프로젝트 메타데이터와 도구 설정
requirements.txt       실행용 의존성
requirements-dev.txt   개발용 의존성
.gitignore             Git에 올리지 않을 파일 목록
data/                  예제 데이터 또는 로컬 데이터
logs/                  로그 파일
src/                   실제 패키지 코드
tests/                 테스트 코드
\`\`\`

여기서 \`src/\` 폴더 안에 실제 패키지를 넣는 구조를 **src layout**이라고 부릅니다.

---

## 10.7.2 src layout

\`src layout\`은 실제 import 가능한 패키지를 프로젝트 루트가 아니라 \`src/\` 아래에 두는 방식입니다.

\`\`\`text
sales-tool/
  src/
    sales_tool/
      __init__.py
      main.py
\`\`\`

반대로 프로젝트 루트에 바로 패키지를 두는 방식도 있습니다.

\`\`\`text
sales-tool/
  sales_tool/
    __init__.py
    main.py
\`\`\`

이런 방식은 \`flat layout\`이라고 부를 수 있습니다.

\`src layout\`은 처음에는 한 단계 더 깊어 보여서 복잡하게 느껴질 수 있습니다. 하지만 실무 패키지에서는 장점이 있습니다.

\`\`\`text
- 프로젝트 루트에 있는 파일이 우연히 import되는 문제를 줄인다.
- 설치된 패키지를 기준으로 테스트하는 습관을 만들 수 있다.
- 패키지 코드와 설정 파일, 테스트 파일, 데이터 파일이 명확히 분리된다.
\`\`\`

학습 초반에는 \`flat layout\`도 괜찮습니다. 하지만 고급 과정 이후 데이터 수집 도구나 분석 전처리 패키지를 만들 계획이라면 \`src layout\`에 익숙해지는 것이 좋습니다.

---

## 10.7.3 \`src layout\`에서 실행하기

\`src layout\`을 사용할 때는 패키지를 설치 가능한 상태로 만들어 실행하는 것이 일반적입니다.

개발 중에는 editable 설치를 사용할 수 있습니다.

\`\`\`bash
pip install -e .
\`\`\`

이 명령은 현재 프로젝트를 개발 모드로 설치합니다. 그러면 \`src/sales_tool\` 안의 코드를 수정해도 다시 설치하지 않고 변경 사항을 반영할 수 있습니다.

그다음 모듈 형태로 실행할 수 있습니다.

\`\`\`bash
python -m sales_tool.main
\`\`\`

\`main.py\`에는 다음처럼 실행 진입점을 둡니다.

\`\`\`python
# src/sales_tool/main.py
from sales_tool.config import load_settings
from sales_tool.services import run_pipeline


def main() -> None:
    settings = load_settings()
    run_pipeline(settings)


if __name__ == "__main__":
    main()
\`\`\`

---

## 10.7.4 패키지 내부 코드 예시

\`models.py\`에는 데이터 구조를 둡니다.

\`\`\`python
# src/sales_tool/models.py
from dataclasses import dataclass


@dataclass(frozen=True)
class SalesRow:
    product: str
    price: int
    quantity: int


@dataclass(frozen=True)
class SalesResult:
    product: str
    price: int
    quantity: int
    total: int
\`\`\`

\`readers.py\`에는 파일 읽기 코드를 둡니다.

\`\`\`python
# src/sales_tool/readers.py
import csv
from pathlib import Path


def read_sales_csv(path: Path) -> list[dict[str, str]]:
    with open(path, "r", encoding="utf-8") as f:
        return list(csv.DictReader(f))
\`\`\`

\`validators.py\`에는 검증 코드를 둡니다.

\`\`\`python
# src/sales_tool/validators.py

REQUIRED_COLUMNS = {"product", "price", "quantity"}


def validate_columns(row: dict[str, str]) -> None:
    missing = REQUIRED_COLUMNS - row.keys()
    if missing:
        raise ValueError(f"필수 컬럼이 없습니다: {missing}")


def validate_number(value: str, field_name: str) -> None:
    if not value.strip().isdigit():
        raise ValueError(f"{field_name} 값은 숫자여야 합니다: {value}")
\`\`\`

\`transformers.py\`에는 변환 코드를 둡니다.

\`\`\`python
# src/sales_tool/transformers.py
from sales_tool.models import SalesResult
from sales_tool.validators import validate_columns, validate_number


def transform_row(row: dict[str, str]) -> SalesResult:
    validate_columns(row)
    validate_number(row["price"], "price")
    validate_number(row["quantity"], "quantity")

    price = int(row["price"])
    quantity = int(row["quantity"])

    return SalesResult(
        product=row["product"].strip(),
        price=price,
        quantity=quantity,
        total=price * quantity,
    )
\`\`\`

\`writers.py\`에는 저장 코드를 둡니다.

\`\`\`python
# src/sales_tool/writers.py
import csv
from dataclasses import asdict
from pathlib import Path
from sales_tool.models import SalesResult


def write_sales_csv(rows: list[SalesResult], path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)

    with open(path, "w", encoding="utf-8", newline="") as f:
        fieldnames = ["product", "price", "quantity", "total"]
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()

        for row in rows:
            writer.writerow(asdict(row))
\`\`\`

\`services.py\`에는 전체 처리 흐름을 둡니다.

\`\`\`python
# src/sales_tool/services.py
from sales_tool.config import Settings
from sales_tool.readers import read_sales_csv
from sales_tool.transformers import transform_row
from sales_tool.writers import write_sales_csv


def run_pipeline(settings: Settings) -> None:
    raw_rows = read_sales_csv(settings.input_file)
    results = [transform_row(row) for row in raw_rows]
    write_sales_csv(results, settings.output_file)
\`\`\`

이 구조의 장점은 각 파일의 책임이 분명하다는 것입니다.

\`\`\`text
models.py        데이터 구조
readers.py       입력
validators.py    검증
transformers.py  변환
writers.py       출력
services.py      흐름 조합
main.py          실행 진입점
\`\`\`

---

## 10.7.5 테스트 구조

테스트 코드는 \`tests/\` 폴더에 둡니다.

\`\`\`text
tests/
  test_validators.py
  test_transformers.py
\`\`\`

예를 들어 변환 함수를 테스트할 수 있습니다.

\`\`\`python
# tests/test_transformers.py
from sales_tool.transformers import transform_row


def test_transform_row() -> None:
    row = {
        "product": "키보드",
        "price": "30000",
        "quantity": "2",
    }

    result = transform_row(row)

    assert result.product == "키보드"
    assert result.price == 30000
    assert result.quantity == 2
    assert result.total == 60000
\`\`\`

잘못된 값이 들어왔을 때 예외가 발생하는지도 확인할 수 있습니다.

\`\`\`python
import pytest
from sales_tool.transformers import transform_row


def test_transform_row_with_invalid_price() -> None:
    row = {
        "product": "키보드",
        "price": "삼만원",
        "quantity": "2",
    }

    with pytest.raises(ValueError):
        transform_row(row)
\`\`\`

패키지 구조가 잘 잡혀 있으면 테스트가 훨씬 쉬워집니다. 반대로 모든 코드가 \`main.py\`에 섞여 있으면 일부 함수만 따로 테스트하기 어렵습니다.

---

## 10.7.6 README 작성

실무 프로젝트에는 README가 필요합니다. README는 미래의 나와 동료를 위한 사용 설명서입니다.

간단한 README 구조는 다음과 같습니다.

\`\`\`markdown
# sales-tool

CSV 매출 데이터를 검증하고 총액을 계산해 새 CSV 파일로 저장하는 도구입니다.

## 설치

\`\`\`bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
\`\`\`

## 실행

\`\`\`bash
python -m sales_tool.main
\`\`\`

## 환경 변수

| 이름 | 설명 | 기본값 |
|---|---|---|
| INPUT_FILE | 입력 CSV 경로 | data/input/sales.csv |
| OUTPUT_FILE | 출력 CSV 경로 | data/output/result.csv |
| LOG_FILE | 로그 파일 경로 | logs/app.log |

## 테스트

\`\`\`bash
pytest
\`\`\`
\`\`\`
\`\`\`

README를 작성하면 프로젝트를 다시 열었을 때 빠르게 실행 방법을 기억할 수 있습니다.

---

## 10.8 프로젝트 구조 설계 원칙

지금까지 다양한 구조를 살펴보았습니다. 마지막으로 실무에서 사용할 수 있는 기준을 정리해 봅시다.

---

## 10.8.1 작게 시작하고 필요할 때 나누기

처음부터 다음과 같은 구조를 만들 필요는 없습니다.

\`\`\`text
models/
services/
repositories/
controllers/
interfaces/
infrastructure/
\`\`\`

프로젝트가 작다면 다음 정도로 충분합니다.

\`\`\`text
main.py
config.py
utils.py
\`\`\`

기능이 늘어나면 나눕니다.

\`\`\`text
main.py
config.py
readers.py
writers.py
transformers.py
validators.py
\`\`\`

더 커지면 폴더로 나눕니다.

\`\`\`text
readers/
writers/
services/
models/
\`\`\`

구조는 코드를 돕기 위해 존재해야 합니다. 구조 자체가 목적이 되면 안 됩니다.

---

## 10.8.2 역할이 섞이면 분리하기

하나의 파일이나 함수가 너무 많은 일을 하면 분리할 신호입니다.

다음 함수는 너무 많은 일을 합니다.

\`\`\`python
def process_sales() -> None:
    # 설정 읽기
    # CSV 읽기
    # 데이터 검증
    # 총액 계산
    # 결과 저장
    # 로그 출력
    pass
\`\`\`

역할별로 나누면 더 좋습니다.

\`\`\`python
def load_settings() -> Settings:
    ...


def read_sales_csv(path: Path) -> list[dict[str, str]]:
    ...


def transform_row(row: dict[str, str]) -> SalesResult:
    ...


def write_sales_csv(rows: list[SalesResult], path: Path) -> None:
    ...


def run_pipeline(settings: Settings) -> None:
    ...
\`\`\`

이렇게 나누면 각 함수가 짧아지고, 테스트도 쉬워집니다.

---

## 10.8.3 import 방향을 단순하게 유지하기

좋은 프로젝트는 import 방향이 비교적 단순합니다.

예를 들어 다음 방향은 자연스럽습니다.

\`\`\`text
main.py -> services.py -> readers.py
                  └----> transformers.py -> validators.py
                  └----> writers.py
\`\`\`

하지만 모든 파일이 서로를 import하면 구조가 복잡해집니다.

\`\`\`text
A -> B -> C -> A
\`\`\`

이런 구조는 순환 import를 만들기 쉽습니다.

가능하면 낮은 수준의 유틸리티 모듈은 높은 수준의 서비스 모듈을 import하지 않게 합니다.

\`\`\`text
utils.py        다른 모듈을 거의 모름
models.py       데이터 구조만 정의
validators.py   models 정도만 의존
services.py     여러 기능을 조합
main.py         실행 흐름 시작
\`\`\`

---

## 10.8.4 데이터분석으로 이어지는 구조

데이터분석 프로젝트에서는 노트북과 \`.py\` 파일을 함께 사용하는 경우가 많습니다.

예를 들어 다음 구조가 가능합니다.

\`\`\`text
analysis-project/
  README.md
  requirements.txt
  data/
    raw/
    processed/
  notebooks/
    01_exploration.ipynb
    02_analysis.ipynb
  src/
    analysis_tools/
      __init__.py
      readers.py
      cleaners.py
      validators.py
      features.py
  tests/
\`\`\`

노트북에는 탐색과 시각화 코드를 두고, 반복적으로 사용하는 함수는 \`src/analysis_tools\`로 옮깁니다.

\`\`\`text
노트북에 남기기 좋은 코드:
- 데이터 확인
- 그래프 출력
- 분석 아이디어 실험
- 중간 결과 관찰

.py 파일로 옮기기 좋은 코드:
- 반복 사용되는 전처리 함수
- 데이터 검증 함수
- 파일 읽기 함수
- API 수집 함수
- 테스트가 필요한 로직
\`\`\`

이 습관을 만들면 데이터분석 기초와 고급 과정에서 코드를 훨씬 안정적으로 관리할 수 있습니다.

---

# 10장 핵심 정리

이번 장에서는 파이썬 코드를 실무 프로젝트 형태로 구성하는 방법을 배웠습니다.

핵심 내용은 다음과 같습니다.

\`\`\`text
1. 코드가 길어지면 역할별로 파일을 나누어야 한다.
2. 모듈은 하나의 .py 파일이고, 패키지는 모듈을 폴더 단위로 묶은 구조다.
3. import는 모듈을 찾고, 실행하고, 이름에 연결하는 과정이다.
4. 모듈은 처음 import될 때 최상위 코드가 실행된다.
5. 이미 import된 모듈은 sys.modules 캐시에서 재사용된다.
6. 실행 코드와 기능 코드는 분리하는 것이 좋다.
7. 절대 import는 전체 패키지 경로를 기준으로 하고, 상대 import는 현재 모듈 위치를 기준으로 한다.
8. 순환 import는 보통 설계가 서로 강하게 얽혀 있다는 신호다.
9. __init__.py는 패키지 초기화와 공개 API 정리에 사용할 수 있다.
10. 설정값과 민감 정보는 코드에서 분리해야 한다.
11. pyproject.toml은 프로젝트 메타데이터와 도구 설정을 담을 수 있다.
12. requirements.txt는 환경에 설치할 의존성 목록을 관리하는 데 사용한다.
13. src layout은 패키지 코드와 프로젝트 루트 파일을 명확히 분리하는 구조다.
14. 데이터분석으로 넘어가기 전, 반복 사용되는 코드는 .py 파일과 패키지로 정리하는 습관이 필요하다.
\`\`\`

---

# 10장 연습문제

## 문제 1. 단일 파일의 한계

다음 중 코드가 커졌을 때 하나의 파일에 모든 코드를 넣는 방식의 문제로 적절하지 않은 것은 무엇인가요?

A. 원하는 함수를 찾기 어려워질 수 있다.  
B. 테스트하기 어려워질 수 있다.  
C. 기능별 재사용이 어려워질 수 있다.  
D. 파이썬 코드가 절대 실행되지 않는다.

---

## 문제 2. 모듈과 패키지

다음 설명 중 올바른 것을 고르세요.

A. 모듈은 반드시 폴더여야 한다.  
B. 패키지는 여러 모듈을 계층적으로 묶는 구조로 사용할 수 있다.  
C. 패키지 안에는 하위 패키지를 둘 수 없다.  
D. \`__init__.py\`에는 반드시 데이터베이스 연결 코드가 있어야 한다.

---

## 문제 3. import 시 실행되는 코드

다음 파일이 있습니다.

\`\`\`python
# hello.py
print("hello module")

message = "안녕하세요"
\`\`\`

다른 파일에서 다음 코드를 실행하면 어떤 일이 일어날까요?

\`\`\`python
import hello
print(hello.message)
\`\`\`

실행 결과를 예상해 보세요.

---

## 문제 4. \`if __name__ == "__main__"\`

다음 코드에서 \`if __name__ == "__main__":\`를 사용하는 이유를 설명해 보세요.

\`\`\`python
def main() -> None:
    print("프로그램을 실행합니다.")


if __name__ == "__main__":
    main()
\`\`\`

---

## 문제 5. 절대 import와 상대 import

다음 구조가 있습니다.

\`\`\`text
sales_app/
  __init__.py
  services/
    __init__.py
    processor.py
  utils/
    __init__.py
    date_utils.py
\`\`\`

\`processor.py\`에서 \`date_utils.py\`의 \`get_today_string()\` 함수를 절대 import하는 코드를 작성해 보세요.

---

## 문제 6. 순환 import

다음 구조는 어떤 문제가 생길 수 있나요?

\`\`\`python
# a.py
from b import B

class A:
    pass
\`\`\`

\`\`\`python
# b.py
from a import A

class B:
    pass
\`\`\`

문제의 이름과 해결 방향을 간단히 설명해 보세요.

---

## 문제 7. 설정 관리

다음 코드의 문제점을 설명해 보세요.

\`\`\`python
API_KEY = "secret-key-123"
API_URL = "https://api.example.com"
\`\`\`

그리고 더 나은 방식을 간단히 작성해 보세요.

---

## 문제 8. \`requirements.txt\`

\`requirements.txt\` 파일의 역할을 설명해 보세요.

---

## 문제 9. 프로젝트 구조 설계

다음 기능을 가진 작은 도구를 만들려고 합니다.

\`\`\`text
1. CSV 파일을 읽는다.
2. 각 행의 값을 검증한다.
3. 금액을 계산한다.
4. 결과를 새 CSV로 저장한다.
5. 테스트 코드를 작성한다.
\`\`\`

적절한 파일 구조를 설계해 보세요.

---

## 문제 10. 데이터분석 프로젝트에서 \`.py\` 파일로 분리하면 좋은 코드

다음 중 주피터 노트북에만 두기보다 \`.py\` 파일로 분리하기 좋은 코드를 모두 고르세요.

A. 반복적으로 사용하는 결측치 처리 함수  
B. 한 번만 확인해 보는 그래프 출력 코드  
C. 여러 노트북에서 사용하는 파일 읽기 함수  
D. 데이터 검증 함수  
E. 분석 아이디어를 빠르게 실험하는 임시 코드

---

# 정답 및 해설

## 문제 1 정답

정답: **D**

하나의 파일에 모든 코드를 넣는다고 해서 파이썬 코드가 절대 실행되지 않는 것은 아닙니다. 다만 코드가 커질수록 찾기 어렵고, 테스트하기 어렵고, 재사용하기 어려운 구조가 됩니다.

---

## 문제 2 정답

정답: **B**

모듈은 보통 하나의 \`.py\` 파일입니다. 패키지는 여러 모듈을 폴더 단위로 묶어 계층적으로 관리하는 구조입니다. 패키지 안에는 하위 패키지를 둘 수 있습니다. \`__init__.py\`에는 무거운 실행 코드를 넣지 않는 것이 좋습니다.

---

## 문제 3 정답

예상 실행 결과는 다음과 같습니다.

\`\`\`text
hello module
안녕하세요
\`\`\`

\`import hello\`를 실행할 때 \`hello.py\`의 최상위 코드가 실행됩니다. 그래서 먼저 \`hello module\`이 출력되고, 이후 \`hello.message\` 값이 출력됩니다.

---

## 문제 4 정답

\`if __name__ == "__main__":\`는 해당 파일이 직접 실행될 때만 \`main()\`을 호출하기 위해 사용합니다. 다른 파일에서 import할 때는 함수와 클래스만 사용할 수 있고, 프로그램 실행 코드는 자동으로 실행되지 않게 할 수 있습니다.

---

## 문제 5 정답

\`\`\`python
from sales_app.utils.date_utils import get_today_string
\`\`\`

절대 import는 최상위 패키지 이름인 \`sales_app\`부터 전체 경로를 적습니다.

---

## 문제 6 정답

문제의 이름은 **순환 import**입니다.

\`a.py\`가 \`b.py\`를 import하고, \`b.py\`가 다시 \`a.py\`를 import하기 때문에 한쪽 모듈이 완전히 초기화되기 전에 다른 쪽에서 접근하려고 할 수 있습니다.

해결 방향은 다음과 같습니다.

\`\`\`text
- 공통 코드를 별도 모듈로 분리한다.
- 두 모듈이 서로 알아야 하는 구조인지 설계를 다시 본다.
- 타입 힌트만 필요하다면 문자열 타입 힌트나 TYPE_CHECKING을 사용한다.
- 꼭 필요한 경우 함수 내부 import로 지연시킨다.
\`\`\`

---

## 문제 7 정답

문제점은 민감 정보인 \`API_KEY\`를 코드에 직접 작성했다는 점입니다. 이 값이 Git 저장소에 올라가면 외부에 노출될 수 있습니다.

더 나은 방식은 환경 변수에서 읽는 것입니다.

\`\`\`python
import os

API_KEY = os.environ["API_KEY"]
API_URL = os.environ.get("API_URL", "https://api.example.com")
\`\`\`

---

## 문제 8 정답

\`requirements.txt\`는 프로젝트 실행에 필요한 외부 라이브러리 목록을 기록하는 파일입니다. 다른 환경에서 다음 명령으로 필요한 패키지를 설치할 수 있습니다.

\`\`\`bash
pip install -r requirements.txt
\`\`\`

이를 통해 여러 개발자나 실행 환경에서 비슷한 라이브러리 환경을 구성할 수 있습니다.

---

## 문제 9 정답 예시

예시는 다음과 같습니다.

\`\`\`text
csv_tool/
  main.py
  readers.py
  validators.py
  transformers.py
  writers.py
  tests/
    test_validators.py
    test_transformers.py
\`\`\`

조금 더 구조화하면 다음처럼 만들 수 있습니다.

\`\`\`text
csv-tool/
  README.md
  requirements.txt
  src/
    csv_tool/
      __init__.py
      main.py
      readers.py
      validators.py
      transformers.py
      writers.py
  tests/
    test_validators.py
    test_transformers.py
\`\`\`

중요한 것은 CSV 읽기, 검증, 변환, 저장, 테스트의 역할을 분리하는 것입니다.

---

## 문제 10 정답

정답: **A, C, D**

반복적으로 사용하는 결측치 처리 함수, 여러 노트북에서 사용하는 파일 읽기 함수, 데이터 검증 함수는 \`.py\` 파일로 분리하는 것이 좋습니다. 반면 한 번만 확인하는 그래프 코드나 분석 아이디어를 빠르게 실험하는 임시 코드는 노트북에 남겨도 괜찮습니다.

---

# 10장 마무리

이 장은 고급 파이썬 과정에서 매우 중요한 전환점입니다.

앞선 장들에서는 함수, 객체, 타입 힌트처럼 코드 내부의 표현력을 높이는 방법을 배웠습니다. 이번 장에서는 그 코드를 **프로젝트 단위로 배치하고 관리하는 방법**을 배웠습니다.

데이터분석 과정으로 넘어가면 많은 학습자가 노트북 하나에 모든 코드를 넣는 방식으로 시작합니다. 처음에는 괜찮지만, 데이터가 커지고 분석이 반복되면 다음 문제가 생깁니다.

\`\`\`text
같은 전처리 코드를 여러 번 복사한다.
어느 노트북의 함수가 최신인지 알기 어렵다.
데이터 검증 로직을 재사용하기 어렵다.
API 수집 코드와 분석 코드가 섞인다.
테스트하기 어렵다.
\`\`\`

이번 장에서 배운 모듈, 패키지, 프로젝트 구조는 이런 문제를 줄여 줍니다. 분석 코드는 노트북에서 실험하되, 반복되는 로직은 \`.py\` 파일로 옮기고, 검증 가능한 함수와 패키지로 관리하는 것이 좋습니다.

다음 장에서는 프로젝트가 실패 상황에 더 강해지도록 **예외 처리와 로깅 심화**를 다룹니다. 프로젝트 구조가 뼈대라면, 예외 처리와 로깅은 코드가 실제 환경에서 안정적으로 동작하도록 도와주는 안전장치입니다.

---

# 참고 문서

- [Python 공식 문서: The import system](https://docs.python.org/3/reference/import.html)
- [Python 공식 튜토리얼: Modules](https://docs.python.org/3/tutorial/modules.html)
- [Python Packaging User Guide: src layout vs flat layout](https://packaging.python.org/en/latest/discussions/src-layout-vs-flat-layout/)
- [Python Packaging User Guide: Writing your pyproject.toml](https://packaging.python.org/en/latest/guides/writing-pyproject-toml/)
`;export{e as default};