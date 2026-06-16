var e=`# 8장 모듈과 패키지

## 이 장에서 배울 내용

지금까지 우리는 파이썬의 기본 문법, 자료구조, 함수, 예외 처리, 객체지향 프로그래밍을 배웠습니다. 이제 코드를 어느 정도 작성할 수 있게 되었지만, 프로그램이 커지면 또 다른 문제가 생깁니다.

처음에는 하나의 파일에 모든 코드를 작성해도 괜찮습니다. 하지만 함수가 많아지고 클래스가 늘어나면 하나의 파일이 너무 길어집니다. 파일 하나에 모든 코드가 들어 있으면 원하는 함수를 찾기도 어렵고, 수정할 때 실수할 가능성도 커집니다.

이 문제를 해결하기 위해 파이썬에서는 코드를 **모듈**과 **패키지**로 나누어 관리합니다.

모듈은 하나의 파이썬 파일입니다. 패키지는 여러 모듈을 폴더 단위로 묶은 구조입니다. 모듈과 패키지를 잘 사용하면 코드를 기능별로 나눌 수 있고, 필요한 곳에서 다시 가져와 사용할 수 있습니다.

이 장에서는 다음 내용을 배웁니다.

- 모듈이 무엇인지 이해하기
- \`import\`로 다른 파일의 코드를 가져와 사용하기
- 파이썬 표준 라이브러리 사용하기
- 직접 모듈을 만들어 코드 분리하기
- 패키지 구조의 기본 이해하기
- 자주 쓰는 내장 함수 정리하기
- 명령행 인수로 프로그램 실행 방식 확장하기

이 장의 목표는 “여러 파일로 나누어진 파이썬 프로그램을 읽고 작성할 수 있는 것”입니다.

---

## 8.1 모듈 사용하기

### 8.1.1 모듈이란 무엇인가

모듈은 파이썬 코드가 들어 있는 하나의 파일입니다.

예를 들어 다음과 같은 파일이 있다고 해봅시다.

\`\`\`text
calculator.py
\`\`\`

이 파일 안에 파이썬 코드가 들어 있다면, \`calculator.py\`는 하나의 모듈입니다.

모듈에는 변수, 함수, 클래스 등을 작성할 수 있습니다.

\`\`\`python
# calculator.py

def add(a, b):
    return a + b


def subtract(a, b):
    return a - b
\`\`\`

이렇게 작성한 코드는 다른 파이썬 파일에서 가져와 사용할 수 있습니다. 즉, 모듈은 **재사용 가능한 코드 파일**이라고 생각하면 됩니다.

처음 코드를 배울 때는 하나의 파일에 모든 코드를 작성해도 괜찮습니다. 하지만 프로그램이 커지면 파일을 나누어야 합니다.

예를 들어 주문 처리 프로그램을 만든다고 해봅시다.

\`\`\`text
주문 데이터 읽기
주문 금액 계산
할인 금액 계산
보고서 생성
결과 저장
\`\`\`

이 모든 코드를 하나의 파일에 넣으면 파일이 길어집니다. 그래서 기능별로 파일을 나누는 것이 좋습니다.

\`\`\`text
main.py
order.py
discount.py
report.py
\`\`\`

이때 각각의 \`.py\` 파일이 모듈입니다.

---

### 8.1.2 모듈을 사용하는 이유

모듈을 사용하는 가장 큰 이유는 코드를 정리하고 재사용하기 위해서입니다.

프로그램이 작을 때는 모든 코드를 한 파일에 작성해도 문제가 없어 보입니다.

\`\`\`python
# main.py

def calculate_total_price(price, quantity):
    return price * quantity


def calculate_discount(total_price):
    if total_price >= 100000:
        return total_price * 0.1
    return 0


def print_order_summary(price, quantity):
    total_price = calculate_total_price(price, quantity)
    discount = calculate_discount(total_price)
    final_price = total_price - discount

    print("총 금액:", total_price)
    print("할인 금액:", discount)
    print("최종 금액:", final_price)


print_order_summary(30000, 4)
\`\`\`

하지만 함수가 수십 개로 늘어나면 파일이 복잡해집니다. 이때 계산 관련 함수는 \`calculator.py\`, 출력 관련 함수는 \`printer.py\`처럼 나눌 수 있습니다.

모듈을 사용하면 다음과 같은 장점이 있습니다.

첫째, 코드가 짧아지고 읽기 쉬워집니다.

둘째, 기능별로 파일을 나눌 수 있습니다.

셋째, 같은 코드를 여러 파일에서 재사용할 수 있습니다.

넷째, 수정해야 할 위치를 찾기 쉬워집니다.

다섯째, 협업할 때 각자 맡은 파일을 나누어 작업하기 좋습니다.

모듈은 코드 정리의 첫 단계입니다.

---

### 8.1.3 \`import\` 기본 문법

다른 모듈의 코드를 사용하려면 \`import\`를 사용합니다.

파이썬에는 기본으로 제공되는 모듈이 많습니다. 이런 모듈을 **표준 라이브러리**라고 합니다.

예를 들어 \`math\` 모듈은 수학 계산에 필요한 기능을 제공합니다.

\`\`\`python
import math

print(math.sqrt(16))
print(math.pi)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
4.0
3.141592653589793
\`\`\`

\`import math\`는 \`math\`라는 모듈을 사용하겠다는 뜻입니다.

모듈 안의 기능을 사용할 때는 다음 형식으로 작성합니다.

\`\`\`python
모듈명.기능명
\`\`\`

예를 들어 \`math.sqrt()\`는 \`math\` 모듈 안에 있는 \`sqrt()\` 함수를 사용하는 코드입니다.

\`\`\`python
import math

result = math.sqrt(25)
print(result)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
5.0
\`\`\`

---

### 8.1.4 \`from ... import ...\`

모듈 전체를 가져오는 대신, 모듈 안의 특정 기능만 가져올 수도 있습니다.

\`\`\`python
from math import sqrt

print(sqrt(16))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
4.0
\`\`\`

이 방식은 \`math.sqrt()\`라고 쓰지 않고 바로 \`sqrt()\`라고 사용할 수 있다는 장점이 있습니다.

하지만 이름이 어디에서 왔는지 잘 보이지 않을 수 있습니다. 초보 단계에서는 모듈명을 함께 쓰는 방식이 더 읽기 쉬울 때가 많습니다.

\`\`\`python
import math

print(math.sqrt(16))
\`\`\`

위 코드처럼 작성하면 \`sqrt()\`가 \`math\` 모듈에서 온 함수라는 사실이 분명합니다.

두 방식은 모두 자주 사용됩니다.

\`\`\`python
import math
from math import sqrt
\`\`\`

중요한 것은 어떤 방식이든 코드를 읽는 사람이 이해하기 쉽게 사용하는 것입니다.

---

### 8.1.5 별칭 사용하기

모듈 이름이 길거나, 관례적으로 줄여 쓰는 이름이 있는 경우에는 별칭을 사용할 수 있습니다.

별칭은 \`as\`를 사용합니다.

\`\`\`python
import math as m

print(m.sqrt(16))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
4.0
\`\`\`

실무에서 자주 볼 수 있는 별칭은 다음과 같습니다.

\`\`\`python
import pandas as pd
import numpy as np
\`\`\`

이 장에서는 아직 외부 라이브러리를 본격적으로 다루지 않지만, 이후 데이터 처리 수업에서 \`pandas\`를 사용할 때 \`pd\`라는 별칭을 자주 보게 됩니다.

별칭은 편리하지만 너무 낯선 이름으로 줄이면 코드가 읽기 어려워집니다.

\`\`\`python
import math as x
\`\`\`

위와 같이 쓰면 \`x.sqrt()\`가 무엇인지 바로 알기 어렵습니다. 별칭은 널리 쓰이는 관례가 있거나, 의미가 분명할 때 사용하는 것이 좋습니다.

---

### 8.1.6 \`import *\`는 조심해서 사용하기

파이썬에서는 다음과 같은 문법도 사용할 수 있습니다.

\`\`\`python
from math import *

print(sqrt(16))
print(pi)
\`\`\`

이 코드는 \`math\` 모듈 안의 많은 이름을 현재 파일로 가져옵니다. 그래서 \`math.sqrt()\`가 아니라 \`sqrt()\`처럼 바로 사용할 수 있습니다.

하지만 이 방식은 초보 단계와 실무 코드에서는 권장하지 않는 경우가 많습니다.

이유는 다음과 같습니다.

- 어떤 이름이 어느 모듈에서 왔는지 알기 어렵다.
- 기존에 있던 변수명이나 함수명과 충돌할 수 있다.
- 코드가 길어졌을 때 추적이 어려워진다.

예를 들어 현재 파일에 \`sqrt\`라는 함수를 직접 만들었는데, 나중에 \`from math import *\`를 사용하면 이름이 헷갈릴 수 있습니다.

따라서 처음에는 다음 방식 중 하나를 사용하는 것이 좋습니다.

\`\`\`python
import math
\`\`\`

또는 필요한 것만 명확하게 가져옵니다.

\`\`\`python
from math import sqrt
\`\`\`

---

### 8.1.7 모듈을 import하면 어떤 일이 일어날까

모듈을 import하면 파이썬은 해당 모듈 파일을 찾아 실행하고, 그 안에 있는 변수, 함수, 클래스를 사용할 수 있게 준비합니다.

예를 들어 \`greeting.py\` 파일이 있다고 해봅시다.

\`\`\`python
# greeting.py

message = "안녕하세요"


def say_hello(name):
    return f"{name}님, 안녕하세요."
\`\`\`

다른 파일에서 이 모듈을 가져올 수 있습니다.

\`\`\`python
# main.py

import greeting

print(greeting.message)
print(greeting.say_hello("민수"))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
안녕하세요
민수님, 안녕하세요.
\`\`\`

중요한 점은 \`import greeting\`을 하면 \`greeting.py\` 파일 안의 코드가 읽힌다는 것입니다.

그래서 모듈 파일에는 import될 때 실행되면 곤란한 코드를 함부로 작성하지 않는 것이 좋습니다. 이 문제는 뒤에서 \`if __name__ == "__main__"\`을 배울 때 다시 살펴봅니다.

---

### 8.1.8 표준 라이브러리란 무엇인가

파이썬에는 설치하지 않아도 바로 사용할 수 있는 모듈들이 많이 있습니다. 이를 **표준 라이브러리**라고 합니다.

표준 라이브러리는 파이썬과 함께 제공되는 기본 도구입니다.

예를 들어 다음과 같은 모듈이 표준 라이브러리에 포함됩니다.

| 모듈 | 용도 |
|---|---|
| \`math\` | 수학 계산 |
| \`random\` | 무작위 값 생성 |
| \`datetime\` | 날짜와 시간 처리 |
| \`os\` | 운영체제 관련 기능 |
| \`pathlib\` | 파일 경로 처리 |
| \`json\` | JSON 데이터 처리 |
| \`csv\` | CSV 파일 처리 |
| \`sys\` | 파이썬 실행 환경 관련 기능 |
| \`argparse\` | 명령행 인수 처리 |

표준 라이브러리를 잘 활용하면 많은 기능을 직접 만들지 않아도 됩니다.

예를 들어 현재 날짜를 구하는 기능을 직접 만들기는 어렵습니다. 하지만 \`datetime\` 모듈을 사용하면 쉽게 처리할 수 있습니다.

\`\`\`python
from datetime import datetime

now = datetime.now()
print(now)
\`\`\`

표준 라이브러리는 파이썬을 실무에서 강력하게 만들어주는 중요한 도구입니다.

---

## 8.2 자주 쓰는 표준 라이브러리

이 절에서는 실무에서 자주 볼 수 있는 표준 라이브러리를 간단히 살펴봅니다. 각 모듈을 깊게 다루지는 않습니다. 여기서는 “어떤 상황에서 어떤 모듈을 떠올리면 되는지”를 이해하는 것이 목표입니다.

파일 처리, JSON, CSV, 날짜 데이터는 이후 장에서 더 자세히 다룹니다.

---

### 8.2.1 \`datetime\`: 날짜와 시간

\`datetime\`은 날짜와 시간을 다룰 때 사용하는 표준 라이브러리입니다.

오늘 날짜, 현재 시간, 특정 날짜 계산, 날짜 문자열 변환 등에 사용합니다.

\`\`\`python
from datetime import datetime

now = datetime.now()

print(now)
print(now.year)
print(now.month)
print(now.day)
\`\`\`

실행 결과는 실행한 시점에 따라 달라집니다.

\`\`\`text
2026-06-15 10:30:20.123456
2026
6
15
\`\`\`

실무에서는 날짜가 자주 필요합니다.

예를 들어 보고서 파일명을 만들 때 오늘 날짜를 넣을 수 있습니다.

\`\`\`python
from datetime import datetime

today = datetime.now().strftime("%Y-%m-%d")
filename = f"report_{today}.xlsx"

print(filename)
\`\`\`

실행 결과 예시는 다음과 같습니다.

\`\`\`text
report_2026-06-15.xlsx
\`\`\`

\`strftime()\`은 날짜와 시간을 원하는 문자열 형식으로 바꿀 때 사용합니다. 이 내용은 데이터 처리 장에서 더 자세히 다룹니다.

---

### 8.2.2 \`time\`: 시간 지연과 실행 시간 확인

\`time\` 모듈은 시간과 관련된 간단한 작업에 사용합니다.

가장 자주 보는 기능 중 하나는 \`sleep()\`입니다.

\`\`\`python
import time

print("작업 시작")
time.sleep(2)
print("2초 후 작업 종료")
\`\`\`

\`time.sleep(2)\`는 프로그램을 2초 동안 잠시 멈춥니다.

실무에서는 다음과 같은 상황에서 사용될 수 있습니다.

- API 요청을 너무 빠르게 반복하지 않기
- 자동화 작업 사이에 잠깐 대기하기
- 간단한 실행 시간 측정하기

실행 시간을 대략 측정할 수도 있습니다.

\`\`\`python
import time

start = time.time()

for _ in range(1000000):
    pass

end = time.time()

print("실행 시간:", end - start)
\`\`\`

\`time.time()\`은 현재 시각을 숫자로 반환합니다. 두 시점의 차이를 구하면 실행 시간을 대략 확인할 수 있습니다.

---

### 8.2.3 \`random\`: 무작위 값 생성

\`random\` 모듈은 무작위 값을 만들 때 사용합니다.

\`\`\`python
import random

number = random.randint(1, 10)
print(number)
\`\`\`

\`randint(1, 10)\`은 1부터 10 사이의 정수 중 하나를 무작위로 반환합니다.

리스트에서 무작위로 하나를 고를 수도 있습니다.

\`\`\`python
import random

names = ["민수", "지영", "철수", "영희"]
selected = random.choice(names)

print(selected)
\`\`\`

리스트 순서를 섞을 수도 있습니다.

\`\`\`python
import random

items = [1, 2, 3, 4, 5]
random.shuffle(items)

print(items)
\`\`\`

실무에서는 무작위 샘플링, 테스트 데이터 생성, 간단한 추첨 기능 등에 사용할 수 있습니다.

---

### 8.2.4 \`math\`: 수학 계산

\`math\` 모듈은 수학 계산에 필요한 함수와 값을 제공합니다.

\`\`\`python
import math

print(math.sqrt(16))
print(math.ceil(3.2))
print(math.floor(3.8))
print(math.pi)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
4.0
4
3
3.141592653589793
\`\`\`

자주 쓰는 기능은 다음과 같습니다.

| 기능 | 설명 |
|---|---|
| \`math.sqrt()\` | 제곱근 |
| \`math.ceil()\` | 올림 |
| \`math.floor()\` | 내림 |
| \`math.pi\` | 원주율 |

일반적인 덧셈, 뺄셈, 곱셈, 나눗셈은 연산자로 충분합니다. 하지만 수학 함수가 필요할 때는 \`math\` 모듈을 떠올리면 됩니다.

---

### 8.2.5 \`json\`: JSON 데이터 처리

\`json\` 모듈은 JSON 데이터를 다룰 때 사용합니다.

JSON은 API 응답이나 설정 파일에서 자주 만나는 데이터 형식입니다.

파이썬 딕셔너리를 JSON 문자열로 바꿀 수 있습니다.

\`\`\`python
import json

user = {
    "name": "김민수",
    "age": 30,
    "is_admin": False,
}

json_text = json.dumps(user, ensure_ascii=False)
print(json_text)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
{"name": "김민수", "age": 30, "is_admin": false}
\`\`\`

반대로 JSON 문자열을 파이썬 딕셔너리로 바꿀 수도 있습니다.

\`\`\`python
import json

json_text = '{"name": "김민수", "age": 30}'
user = json.loads(json_text)

print(user["name"])
print(user["age"])
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
김민수
30
\`\`\`

JSON은 11장에서 더 자세히 다룹니다.

---

### 8.2.6 \`csv\`: CSV 파일 처리

\`csv\` 모듈은 CSV 파일을 읽고 쓸 때 사용합니다.

CSV는 콤마로 구분된 표 형태 데이터입니다.

\`\`\`text
name,email,grade
김민수,minsu@example.com,VIP
이지영,jiyoung@example.com,일반
\`\`\`

파이썬에서는 \`csv\` 모듈을 사용해 이런 데이터를 행 단위로 처리할 수 있습니다.

\`\`\`python
import csv

rows = [
    ["name", "email", "grade"],
    ["김민수", "minsu@example.com", "VIP"],
    ["이지영", "jiyoung@example.com", "일반"],
]

with open("customers.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(rows)
\`\`\`

위 코드는 CSV 파일을 만드는 예시입니다. 아직 파일 처리 문법을 자세히 배우기 전이라 어렵게 느껴질 수 있습니다. 지금은 \`csv\` 모듈이 표 형태 데이터를 다룰 때 사용된다는 정도만 이해하면 됩니다.

CSV 파일 처리는 10장에서 자세히 다룹니다.

---

### 8.2.7 \`os\`: 운영체제 관련 기능

\`os\` 모듈은 운영체제와 관련된 기능을 사용할 때 쓰입니다.

예를 들어 현재 작업 폴더를 확인할 수 있습니다.

\`\`\`python
import os

print(os.getcwd())
\`\`\`

폴더 안의 파일 목록을 확인할 수도 있습니다.

\`\`\`python
import os

files = os.listdir(".")
print(files)
\`\`\`

\`os\` 모듈은 파일과 폴더를 다루는 자동화 작업에서 자주 사용됩니다.

예를 들어 다음과 같은 작업에 사용됩니다.

- 현재 폴더 확인하기
- 폴더 만들기
- 파일 목록 가져오기
- 파일 존재 여부 확인하기
- 환경 변수 읽기

파일과 폴더 자동화는 10장에서 더 자세히 다룹니다.

---

### 8.2.8 \`pathlib\`: 경로를 객체처럼 다루기

\`pathlib\`은 파일 경로를 더 읽기 쉽게 다루기 위한 표준 라이브러리입니다.

\`\`\`python
from pathlib import Path

path = Path("data") / "customers.csv"

print(path)
print(path.name)
print(path.suffix)
print(path.parent)
\`\`\`

실행 결과 예시는 다음과 같습니다.

\`\`\`text
data/customers.csv
customers.csv
.csv
data
\`\`\`

\`pathlib\`을 사용하면 문자열을 직접 이어 붙이는 것보다 경로를 안전하고 읽기 쉽게 만들 수 있습니다.

\`\`\`python
from pathlib import Path

folder = Path("reports")
filename = "sales.xlsx"
path = folder / filename

print(path)
\`\`\`

\`pathlib\`은 실무 파일 처리 코드에서 많이 사용됩니다.

---

### 8.2.9 \`glob\`: 패턴으로 파일 찾기

\`glob\` 모듈은 특정 패턴에 맞는 파일을 찾을 때 사용합니다.

예를 들어 현재 폴더에서 \`.txt\` 파일만 찾고 싶다면 다음처럼 작성할 수 있습니다.

\`\`\`python
import glob

text_files = glob.glob("*.txt")
print(text_files)
\`\`\`

모든 엑셀 파일을 찾고 싶을 수도 있습니다.

\`\`\`python
import glob

excel_files = glob.glob("*.xlsx")
print(excel_files)
\`\`\`

실무에서는 다음과 같은 상황에서 사용할 수 있습니다.

- 다운로드 폴더에서 엑셀 파일만 찾기
- 로그 파일만 모아서 처리하기
- 특정 이름으로 시작하는 파일 찾기

\`pathlib\`에서도 비슷한 기능을 사용할 수 있습니다.

\`\`\`python
from pathlib import Path

files = list(Path(".").glob("*.txt"))
print(files)
\`\`\`

---

### 8.2.10 \`shutil\`: 파일 복사와 이동

\`shutil\` 모듈은 파일이나 폴더를 복사하고 이동할 때 사용합니다.

\`\`\`python
import shutil

shutil.copy("source.txt", "backup.txt")
\`\`\`

파일을 이동할 수도 있습니다.

\`\`\`python
import shutil

shutil.move("report.xlsx", "reports/report.xlsx")
\`\`\`

이 코드는 실제 파일을 옮기므로 실습할 때는 주의해야 합니다. 잘못된 경로를 사용하면 원하는 파일이 아닌 다른 파일을 옮기거나 덮어쓸 수 있습니다.

파일 복사와 이동은 자동화 작업에서 자주 쓰이지만, 처음에는 테스트용 폴더에서 연습하는 것이 좋습니다.

---

### 8.2.11 \`sys\`: 실행 환경과 프로그램 인수

\`sys\` 모듈은 파이썬 실행 환경과 관련된 기능을 제공합니다.

파이썬 버전을 확인할 수 있습니다.

\`\`\`python
import sys

print(sys.version)
\`\`\`

프로그램 실행 시 전달된 값을 확인할 수도 있습니다.

\`\`\`python
import sys

print(sys.argv)
\`\`\`

\`sys.argv\`는 뒤에서 명령행 인수를 다룰 때 자세히 배웁니다.

\`sys.exit()\`를 사용하면 프로그램을 종료할 수도 있습니다.

\`\`\`python
import sys

print("프로그램 종료")
sys.exit()
\`\`\`

실무에서는 입력값이 잘못되었을 때 프로그램을 중단하거나, 실행 인수를 확인할 때 \`sys\` 모듈을 사용할 수 있습니다.

---

## 8.3 직접 모듈 만들기

표준 라이브러리를 가져와 사용하는 것도 중요하지만, 실무에서 더 중요한 것은 **내가 만든 코드를 모듈로 나누는 것**입니다.

이번 절에서는 직접 모듈을 만들고 다른 파일에서 가져와 사용하는 방법을 배웁니다.

---

### 8.3.1 하나의 파일에 모든 코드를 작성했을 때의 문제

처음에는 다음처럼 모든 코드를 \`main.py\` 하나에 작성할 수 있습니다.

\`\`\`python
# main.py

def calculate_total_price(price, quantity):
    return price * quantity


def calculate_discount(total_price):
    if total_price >= 100000:
        return total_price * 0.1
    return 0


def format_price(price):
    return f"{price:,.0f}원"


price = 30000
quantity = 4

total_price = calculate_total_price(price, quantity)
discount = calculate_discount(total_price)
final_price = total_price - discount

print("총 금액:", format_price(total_price))
print("할인 금액:", format_price(discount))
print("최종 금액:", format_price(final_price))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
총 금액: 120,000원
할인 금액: 12,000원
최종 금액: 108,000원
\`\`\`

코드가 짧을 때는 괜찮습니다. 하지만 계산 함수가 늘어나고, 출력 함수가 늘어나고, 주문 데이터 처리 함수가 늘어나면 \`main.py\`가 점점 길어집니다.

이때 기능별로 파일을 나누는 것이 좋습니다.

---

### 8.3.2 계산 기능을 모듈로 분리하기

먼저 계산 관련 함수를 \`calculator.py\`로 분리해봅시다.

\`\`\`python
# calculator.py

def calculate_total_price(price, quantity):
    return price * quantity


def calculate_discount(total_price):
    if total_price >= 100000:
        return total_price * 0.1
    return 0
\`\`\`

그리고 \`main.py\`에서 이 모듈을 가져와 사용합니다.

\`\`\`python
# main.py

import calculator

price = 30000
quantity = 4

total_price = calculator.calculate_total_price(price, quantity)
discount = calculator.calculate_discount(total_price)
final_price = total_price - discount

print("총 금액:", total_price)
print("할인 금액:", discount)
print("최종 금액:", final_price)
\`\`\`

이제 계산 함수는 \`calculator.py\`에 있고, 프로그램 실행 흐름은 \`main.py\`에 있습니다.

역할이 조금 더 분명해졌습니다.

---

### 8.3.3 특정 함수만 가져오기

\`calculator\` 모듈에서 필요한 함수만 가져올 수도 있습니다.

\`\`\`python
# main.py

from calculator import calculate_total_price, calculate_discount

price = 30000
quantity = 4

total_price = calculate_total_price(price, quantity)
discount = calculate_discount(total_price)
final_price = total_price - discount

print("총 금액:", total_price)
print("할인 금액:", discount)
print("최종 금액:", final_price)
\`\`\`

이 방식은 함수 이름만 바로 사용할 수 있어서 코드가 짧아집니다.

하지만 함수가 어느 모듈에서 왔는지 잘 보이지 않을 수 있습니다. 그래서 팀 코드에서는 다음처럼 모듈명을 붙이는 방식을 선호하는 경우도 많습니다.

\`\`\`python
import calculator

calculator.calculate_total_price(30000, 4)
\`\`\`

정답은 하나가 아닙니다. 코드의 크기, 팀 규칙, 가독성을 고려해 선택하면 됩니다.

---

### 8.3.4 출력 기능을 모듈로 분리하기

이번에는 가격 출력 형식을 만드는 함수를 별도 모듈로 분리해봅시다.

\`\`\`python
# formatter.py

def format_price(price):
    return f"{price:,.0f}원"
\`\`\`

이제 \`main.py\`에서 두 모듈을 사용합니다.

\`\`\`python
# main.py

import calculator
import formatter

price = 30000
quantity = 4

total_price = calculator.calculate_total_price(price, quantity)
discount = calculator.calculate_discount(total_price)
final_price = total_price - discount

print("총 금액:", formatter.format_price(total_price))
print("할인 금액:", formatter.format_price(discount))
print("최종 금액:", formatter.format_price(final_price))
\`\`\`

파일 구조는 다음과 같습니다.

\`\`\`text
project/
  main.py
  calculator.py
  formatter.py
\`\`\`

이렇게 나누면 각 파일의 역할이 분명해집니다.

\`\`\`text
main.py       프로그램 실행 흐름
calculator.py 계산 관련 함수
formatter.py  출력 형식 관련 함수
\`\`\`

---

### 8.3.5 클래스도 모듈로 분리할 수 있다

모듈에는 함수뿐만 아니라 클래스도 작성할 수 있습니다.

예를 들어 상품 클래스를 \`product.py\`에 작성할 수 있습니다.

\`\`\`python
# product.py

class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock

    def decrease_stock(self, quantity):
        if quantity > self.stock:
            raise ValueError("재고가 부족합니다.")
        self.stock -= quantity

    def get_total_price(self, quantity):
        return self.price * quantity
\`\`\`

그리고 \`main.py\`에서 가져와 사용합니다.

\`\`\`python
# main.py

from product import Product

keyboard = Product("키보드", 30000, 10)
keyboard.decrease_stock(2)

print(keyboard.name)
print(keyboard.stock)
print(keyboard.get_total_price(2))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
키보드
8
60000
\`\`\`

객체지향 코드에서는 클래스를 파일별로 나누는 경우가 많습니다. 특히 클래스가 길어지면 하나의 파일에 모든 클래스를 넣기보다 역할별 파일로 나누는 것이 좋습니다.

---

### 8.3.6 설정값을 모듈로 분리하기

실무 코드에는 자주 바뀌는 값이 있습니다.

예를 들어 파일 경로, 할인 기준 금액, 기본 배송비 같은 값입니다.

이런 값을 코드 곳곳에 직접 쓰면 수정하기 어렵습니다.

\`\`\`python
if total_price >= 100000:
    discount = total_price * 0.1
\`\`\`

\`100000\`과 \`0.1\`이 여러 파일에 흩어져 있으면, 정책이 바뀔 때 모두 찾아서 수정해야 합니다.

그래서 설정값을 별도 파일로 분리할 수 있습니다.

\`\`\`python
# config.py

FREE_SHIPPING_MIN_PRICE = 50000
DISCOUNT_MIN_PRICE = 100000
DISCOUNT_RATE = 0.1
\`\`\`

그리고 다른 파일에서 가져와 사용합니다.

\`\`\`python
# calculator.py

import config


def calculate_discount(total_price):
    if total_price >= config.DISCOUNT_MIN_PRICE:
        return total_price * config.DISCOUNT_RATE
    return 0
\`\`\`

설정값을 분리하면 변경에 강한 코드가 됩니다.

다만 비밀번호, API 키처럼 민감한 정보는 코드 파일에 직접 쓰지 않는 것이 좋습니다. 이런 내용은 설정값 관리 장에서 더 자세히 다룹니다.

---

### 8.3.7 \`if __name__ == "__main__"\` 이해하기

모듈을 만들다 보면 다음 코드를 자주 보게 됩니다.

\`\`\`python
if __name__ == "__main__":
    main()
\`\`\`

처음 보면 어렵게 느껴질 수 있지만, 의미는 단순합니다.

이 코드는 **이 파일이 직접 실행될 때만 특정 코드를 실행하라**는 뜻입니다.

예를 들어 다음 파일을 보겠습니다.

\`\`\`python
# greeting.py

def say_hello(name):
    return f"{name}님, 안녕하세요."


print(say_hello("민수"))
\`\`\`

이 파일을 직접 실행하면 다음 결과가 나옵니다.

\`\`\`text
민수님, 안녕하세요.
\`\`\`

그런데 다른 파일에서 \`greeting\` 모듈을 import해도 \`print()\`가 실행됩니다.

\`\`\`python
# main.py

import greeting

print(greeting.say_hello("지영"))
\`\`\`

이 경우 의도하지 않게 \`greeting.py\`의 출력 코드까지 실행될 수 있습니다.

이 문제를 막기 위해 다음처럼 작성합니다.

\`\`\`python
# greeting.py

def say_hello(name):
    return f"{name}님, 안녕하세요."


if __name__ == "__main__":
    print(say_hello("민수"))
\`\`\`

이제 \`greeting.py\`를 직접 실행할 때만 아래 코드가 실행됩니다.

\`\`\`python
print(say_hello("민수"))
\`\`\`

다른 파일에서 import할 때는 함수만 가져오고, 테스트용 출력 코드는 실행되지 않습니다.

---

### 8.3.8 \`main()\` 함수 만들기

실무 코드에서는 프로그램 실행 흐름을 \`main()\` 함수에 넣는 경우가 많습니다.

\`\`\`python
# main.py

def main():
    price = 30000
    quantity = 4
    total_price = price * quantity
    print("총 금액:", total_price)


if __name__ == "__main__":
    main()
\`\`\`

이렇게 작성하면 프로그램의 시작 지점을 명확하게 만들 수 있습니다.

파일을 읽는 사람은 다음 부분을 보고 프로그램이 어디서 시작되는지 알 수 있습니다.

\`\`\`python
if __name__ == "__main__":
    main()
\`\`\`

\`main()\` 함수는 프로그램 실행 흐름을 담고, 실제 기능은 다른 함수나 모듈로 나누는 방식이 좋습니다.

\`\`\`python
# main.py

import calculator
import formatter


def main():
    price = 30000
    quantity = 4

    total_price = calculator.calculate_total_price(price, quantity)
    discount = calculator.calculate_discount(total_price)
    final_price = total_price - discount

    print("최종 금액:", formatter.format_price(final_price))


if __name__ == "__main__":
    main()
\`\`\`

이 구조는 이후 큰 프로그램을 만들 때도 자주 사용됩니다.

---

### 8.3.9 모듈 이름을 지을 때 주의할 점

모듈 이름은 파일 이름입니다. 그래서 모듈 이름을 잘 지어야 합니다.

좋은 모듈 이름의 기준은 다음과 같습니다.

- 역할이 드러나는 이름을 사용한다.
- 너무 길지 않게 작성한다.
- 파이썬 표준 라이브러리 이름과 겹치지 않게 한다.
- 공백이나 특수문자를 사용하지 않는다.
- 보통 소문자와 언더스코어를 사용한다.

좋은 예시는 다음과 같습니다.

\`\`\`text
calculator.py
file_utils.py
date_utils.py
order_service.py
report_generator.py
\`\`\`

피하는 것이 좋은 예시는 다음과 같습니다.

\`\`\`text
math.py
random.py
test file.py
my-module.py
1module.py
\`\`\`

특히 \`math.py\`, \`random.py\`, \`json.py\`처럼 표준 라이브러리와 같은 이름을 사용하면 import할 때 문제가 생길 수 있습니다.

예를 들어 현재 폴더에 \`random.py\`라는 파일을 만들면, 파이썬이 표준 라이브러리 \`random\` 대신 내 파일을 먼저 찾을 수 있습니다. 그러면 예상치 못한 에러가 발생할 수 있습니다.

---

### 8.3.10 순환 import 기초

초보 단계에서 자주 만나는 문제 중 하나가 순환 import입니다.

순환 import는 두 모듈이 서로를 import하는 상황입니다.

\`\`\`python
# a.py
import b
\`\`\`

\`\`\`python
# b.py
import a
\`\`\`

이렇게 되면 파이썬이 \`a.py\`를 읽다가 \`b.py\`를 읽고, 다시 \`a.py\`를 읽으려는 복잡한 상황이 생깁니다. 프로그램이 제대로 실행되지 않을 수 있습니다.

순환 import를 피하려면 다음 원칙을 기억하면 좋습니다.

- 공통으로 쓰는 함수는 별도 모듈로 분리한다.
- 서로 너무 의존하는 구조를 피한다.
- 실행 흐름은 \`main.py\`에 두고, 기능 모듈은 서로 독립적으로 만든다.
- 모듈이 다른 모듈을 지나치게 많이 import하고 있다면 구조를 다시 살핀다.

예를 들어 \`order.py\`와 \`customer.py\`가 서로를 import해야 한다면, 공통 타입이나 유틸리티를 별도 파일로 분리하는 방법을 생각해볼 수 있습니다.

---

## 8.4 패키지 구조 기초

모듈이 많아지면 파일이 너무 많아집니다. 이때 관련 모듈을 폴더 단위로 묶을 수 있습니다. 이렇게 묶은 구조를 패키지라고 합니다.

---

### 8.4.1 패키지란 무엇인가

패키지는 여러 모듈을 모아 놓은 폴더입니다.

예를 들어 다음 구조를 보겠습니다.

\`\`\`text
project/
  main.py
  utils/
    date_utils.py
    price_utils.py
\`\`\`

여기서 \`utils\` 폴더는 관련 기능을 모아둔 폴더입니다. \`date_utils.py\`와 \`price_utils.py\`는 각각 모듈입니다.

패키지를 사용하면 많은 모듈을 역할별로 정리할 수 있습니다.

예를 들어 쇼핑몰 주문 처리 프로그램은 다음처럼 나눌 수 있습니다.

\`\`\`text
project/
  main.py
  models/
    customer.py
    product.py
    order.py
  services/
    order_service.py
    payment_service.py
  utils/
    date_utils.py
    price_utils.py
\`\`\`

폴더 이름만 봐도 대략적인 역할을 알 수 있습니다.

\`\`\`text
models    데이터 구조를 표현하는 클래스
services  주요 기능과 비즈니스 로직
utils     여러 곳에서 쓰는 보조 함수
\`\`\`

---

### 8.4.2 모듈과 패키지의 차이

모듈과 패키지의 차이를 간단히 정리하면 다음과 같습니다.

| 구분 | 의미 | 예시 |
|---|---|---|
| 모듈 | 하나의 \`.py\` 파일 | \`calculator.py\` |
| 패키지 | 여러 모듈을 담은 폴더 | \`utils/\`, \`models/\` |

모듈은 파일이고, 패키지는 폴더입니다.

물론 패키지 안에는 여러 모듈이 들어갈 수 있고, 패키지 안에 또 다른 패키지를 넣을 수도 있습니다.

\`\`\`text
project/
  app/
    models/
      user.py
      order.py
    services/
      user_service.py
      order_service.py
\`\`\`

처음부터 너무 복잡한 구조로 시작할 필요는 없습니다. 작은 프로젝트에서는 파일 몇 개만으로 충분합니다. 하지만 코드가 많아지면 패키지 구조가 필요해집니다.

---

### 8.4.3 \`__init__.py\`의 개념

패키지 폴더 안에는 \`__init__.py\`라는 파일을 둘 수 있습니다.

\`\`\`text
project/
  main.py
  utils/
    __init__.py
    date_utils.py
    price_utils.py
\`\`\`

\`__init__.py\`는 해당 폴더를 패키지로 사용할 때 관련된 초기 설정을 작성할 수 있는 파일입니다.

기초 단계에서는 \`__init__.py\`를 비워 두어도 괜찮습니다.

\`\`\`python
# utils/__init__.py
\`\`\`

비어 있는 파일이어도 패키지 구조를 명확하게 보여주는 역할을 합니다.

패키지 안의 모듈을 가져올 때는 점을 사용합니다.

\`\`\`python
from utils.price_utils import format_price

print(format_price(30000))
\`\`\`

여기서 \`utils.price_utils\`는 \`utils\` 패키지 안의 \`price_utils\` 모듈을 의미합니다.

---

### 8.4.4 패키지 안의 모듈 import하기

다음과 같은 구조를 생각해봅시다.

\`\`\`text
project/
  main.py
  utils/
    __init__.py
    price_utils.py
\`\`\`

\`price_utils.py\`에는 다음 코드가 있습니다.

\`\`\`python
# utils/price_utils.py

def format_price(price):
    return f"{price:,.0f}원"
\`\`\`

\`main.py\`에서는 다음처럼 가져와 사용할 수 있습니다.

\`\`\`python
# main.py

from utils.price_utils import format_price

print(format_price(30000))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
30,000원
\`\`\`

모듈 전체를 가져오는 방식도 가능합니다.

\`\`\`python
# main.py

import utils.price_utils

print(utils.price_utils.format_price(30000))
\`\`\`

하지만 이름이 길어질 수 있습니다. 그래서 필요한 함수만 가져오거나 별칭을 사용할 수 있습니다.

\`\`\`python
import utils.price_utils as price_utils

print(price_utils.format_price(30000))
\`\`\`

---

### 8.4.5 기능별 폴더 나누기

실무 프로젝트에서는 파일을 역할별 폴더로 나누는 경우가 많습니다.

예를 들어 다음과 같은 구조를 사용할 수 있습니다.

\`\`\`text
project/
  main.py
  config.py
  models/
    __init__.py
    customer.py
    product.py
    order.py
  services/
    __init__.py
    order_service.py
    report_service.py
  utils/
    __init__.py
    date_utils.py
    file_utils.py
    price_utils.py
\`\`\`

각 폴더의 역할은 다음과 같이 생각할 수 있습니다.

| 폴더 | 역할 |
|---|---|
| \`models\` | 데이터를 표현하는 클래스 |
| \`services\` | 주요 업무 로직 |
| \`utils\` | 여러 곳에서 쓰는 보조 함수 |
| \`config.py\` | 설정값 |
| \`main.py\` | 프로그램 시작 지점 |

예를 들어 \`models/product.py\`에는 상품 클래스가 들어갈 수 있습니다.

\`\`\`python
# models/product.py

class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price
\`\`\`

\`services/order_service.py\`에는 주문 관련 기능이 들어갈 수 있습니다.

\`\`\`python
# services/order_service.py

def calculate_order_total(products):
    total = 0
    for product in products:
        total += product.price
    return total
\`\`\`

\`main.py\`에서는 이들을 가져와 사용합니다.

\`\`\`python
# main.py

from models.product import Product
from services.order_service import calculate_order_total

products = [
    Product("키보드", 30000),
    Product("마우스", 15000),
]

total = calculate_order_total(products)
print(total)
\`\`\`

파일을 이렇게 나누면 프로그램의 구조가 눈에 잘 들어옵니다.

---

### 8.4.6 상대 import와 절대 import 맛보기

패키지 구조에서는 import 방식이 조금 복잡해질 수 있습니다.

크게 보면 두 가지 방식이 있습니다.

첫째, 절대 import입니다.

\`\`\`python
from utils.price_utils import format_price
\`\`\`

프로젝트의 기준 위치에서 전체 경로를 적는 방식입니다.

둘째, 상대 import입니다.

\`\`\`python
from .price_utils import format_price
\`\`\`

현재 패키지를 기준으로 상대적인 위치를 적는 방식입니다.

기초 단계에서는 우선 절대 import 방식에 익숙해지는 것이 좋습니다. 상대 import는 패키지를 더 깊게 다룰 때 필요합니다.

실무에서 import 문제가 생기는 경우는 대부분 실행 위치와 폴더 구조가 맞지 않아서 발생합니다. 따라서 처음에는 단순한 구조로 시작하고, 프로젝트 루트에서 실행하는 습관을 들이는 것이 좋습니다.

\`\`\`text
project/
  main.py
  utils/
    price_utils.py
\`\`\`

터미널에서는 \`project\` 폴더에서 다음처럼 실행합니다.

\`\`\`bash
python main.py
\`\`\`

---

### 8.4.7 프로젝트 구조를 설계하는 기준

처음부터 완벽한 폴더 구조를 만들려고 하면 오히려 어렵습니다. 프로젝트 구조는 프로그램이 커지는 과정에서 조금씩 정리해도 됩니다.

다만 다음 기준을 기억하면 도움이 됩니다.

첫째, 같은 역할의 코드를 같은 곳에 둡니다.

둘째, 파일 이름만 보고 역할을 알 수 있게 합니다.

셋째, \`main.py\`에는 실행 흐름만 두고 세부 기능은 모듈로 분리합니다.

넷째, 여러 곳에서 쓰는 함수는 \`utils\` 같은 보조 모듈로 분리합니다.

다섯째, 데이터 구조를 표현하는 클래스는 \`models\` 같은 폴더에 둡니다.

여섯째, 실제 업무 규칙을 처리하는 코드는 \`services\` 같은 폴더에 둘 수 있습니다.

작은 프로그램에서는 다음 정도로 충분합니다.

\`\`\`text
project/
  main.py
  calculator.py
  formatter.py
\`\`\`

조금 커지면 다음처럼 나눌 수 있습니다.

\`\`\`text
project/
  main.py
  config.py
  utils/
    date_utils.py
    price_utils.py
  services/
    order_service.py
\`\`\`

더 커지면 객체와 테스트까지 분리할 수 있습니다.

\`\`\`text
project/
  main.py
  config.py
  models/
    customer.py
    product.py
    order.py
  services/
    order_service.py
    report_service.py
  utils/
    date_utils.py
    file_utils.py
  tests/
    test_order_service.py
\`\`\`

구조는 목적에 맞게 단순하게 시작하고, 필요할 때 나누는 것이 좋습니다.

---

## 8.5 자주 쓰는 내장 함수

모듈은 \`import\`해서 사용하는 기능입니다. 하지만 파이썬에는 \`import\` 없이 바로 사용할 수 있는 함수도 있습니다. 이런 함수를 **내장 함수**라고 합니다.

예를 들어 \`print()\`, \`len()\`, \`type()\`은 별도로 import하지 않아도 사용할 수 있습니다.

\`\`\`python
print("안녕하세요")
print(len("Python"))
print(type(10))
\`\`\`

이 절에서는 실무에서 자주 쓰는 내장 함수를 정리합니다.

---

### 8.5.1 자료형 확인과 변환 함수

가장 먼저 볼 함수는 자료형 확인과 변환에 사용하는 함수입니다.

| 함수 | 설명 |
|---|---|
| \`type()\` | 값의 자료형 확인 |
| \`isinstance()\` | 특정 자료형인지 확인 |
| \`int()\` | 정수로 변환 |
| \`float()\` | 실수로 변환 |
| \`str()\` | 문자열로 변환 |
| \`bool()\` | 불리언으로 변환 |
| \`list()\` | 리스트로 변환 |
| \`tuple()\` | 튜플로 변환 |
| \`dict()\` | 딕셔너리로 변환 |
| \`set()\` | 집합으로 변환 |

\`type()\`은 값의 자료형을 확인할 때 사용합니다.

\`\`\`python
print(type("Python"))
print(type(10))
print(type(3.14))
print(type(True))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
<class 'str'>
<class 'int'>
<class 'float'>
<class 'bool'>
\`\`\`

\`isinstance()\`는 값이 특정 자료형인지 확인할 때 사용합니다.

\`\`\`python
value = 10

print(isinstance(value, int))
print(isinstance(value, str))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
False
\`\`\`

실무에서는 입력값이나 함수 인자의 자료형을 확인할 때 사용할 수 있습니다.

\`\`\`python
def calculate_total(price, quantity):
    if not isinstance(price, int):
        raise TypeError("price는 정수여야 합니다.")
    if not isinstance(quantity, int):
        raise TypeError("quantity는 정수여야 합니다.")
    return price * quantity
\`\`\`

자료형 변환 함수도 자주 사용합니다.

\`\`\`python
price_text = "30000"
price = int(price_text)

rate_text = "0.1"
rate = float(rate_text)

message = str(price)
\`\`\`

입력값, CSV 데이터, API 응답 데이터는 문자열로 들어오는 경우가 많기 때문에 필요한 자료형으로 변환하는 과정이 중요합니다.

---

### 8.5.2 반복과 순회 함수

반복문과 함께 자주 사용하는 내장 함수도 있습니다.

| 함수 | 설명 |
|---|---|
| \`range()\` | 정해진 범위의 숫자 생성 |
| \`enumerate()\` | 인덱스와 값을 함께 반환 |
| \`zip()\` | 여러 반복 가능한 데이터를 묶음 |

\`range()\`는 정해진 횟수만큼 반복할 때 사용합니다.

\`\`\`python
for number in range(1, 6):
    print(number)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1
2
3
4
5
\`\`\`

\`enumerate()\`는 리스트를 반복하면서 인덱스와 값을 함께 사용하고 싶을 때 유용합니다.

\`\`\`python
names = ["민수", "지영", "철수"]

for index, name in enumerate(names):
    print(index, name)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
0 민수
1 지영
2 철수
\`\`\`

번호를 1부터 시작하고 싶다면 두 번째 인자에 시작값을 줄 수 있습니다.

\`\`\`python
names = ["민수", "지영", "철수"]

for index, name in enumerate(names, start=1):
    print(index, name)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1 민수
2 지영
3 철수
\`\`\`

\`zip()\`은 여러 리스트를 같은 위치끼리 묶을 때 사용합니다.

\`\`\`python
names = ["키보드", "마우스", "모니터"]
prices = [30000, 15000, 200000]

for name, price in zip(names, prices):
    print(name, price)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
키보드 30000
마우스 15000
모니터 200000
\`\`\`

실무에서는 상품명 목록과 가격 목록, 이름 목록과 이메일 목록처럼 서로 대응되는 데이터를 묶을 때 사용할 수 있습니다.

---

### 8.5.3 집계 함수

여러 데이터에서 개수, 합계, 최댓값, 최솟값을 구할 때는 다음 내장 함수를 자주 사용합니다.

| 함수 | 설명 |
|---|---|
| \`len()\` | 길이 또는 개수 |
| \`sum()\` | 합계 |
| \`min()\` | 최솟값 |
| \`max()\` | 최댓값 |

\`\`\`python
prices = [30000, 15000, 200000]

print(len(prices))
print(sum(prices))
print(min(prices))
print(max(prices))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
3
245000
15000
200000
\`\`\`

\`len()\`은 문자열, 리스트, 튜플, 딕셔너리, 집합 등 다양한 컬렉션에 사용할 수 있습니다.

\`\`\`python
print(len("Python"))
print(len([10, 20, 30]))
print(len({"name": "민수", "age": 30}))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
6
3
2
\`\`\`

실무에서는 다음과 같은 상황에서 자주 사용합니다.

- 고객 수 구하기
- 주문 건수 구하기
- 매출 합계 구하기
- 가장 높은 점수 찾기
- 가장 낮은 가격 찾기

---

### 8.5.4 정렬과 판단 함수

\`sorted()\`는 정렬된 새 리스트를 반환합니다.

\`\`\`python
numbers = [3, 1, 4, 2]

sorted_numbers = sorted(numbers)

print(sorted_numbers)
print(numbers)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
[1, 2, 3, 4]
[3, 1, 4, 2]
\`\`\`

\`sorted()\`는 원본 리스트를 바꾸지 않습니다. 원본 리스트 자체를 바꾸고 싶다면 리스트의 \`sort()\` 메서드를 사용합니다.

딕셔너리 리스트를 특정 기준으로 정렬할 수도 있습니다.

\`\`\`python
products = [
    {"name": "키보드", "price": 30000},
    {"name": "마우스", "price": 15000},
    {"name": "모니터", "price": 200000},
]

sorted_products = sorted(products, key=lambda product: product["price"])

print(sorted_products)
\`\`\`

\`any()\`는 여러 값 중 하나라도 참이면 \`True\`를 반환합니다.

\`\`\`python
values = [False, False, True]

print(any(values))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
\`\`\`

\`all()\`은 모든 값이 참일 때만 \`True\`를 반환합니다.

\`\`\`python
values = [True, True, True]

print(all(values))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
\`\`\`

실무에서는 입력값 검증에 유용합니다.

\`\`\`python
required_values = ["김민수", "minsu@example.com", "VIP"]

if all(required_values):
    print("모든 필수 값이 입력되었습니다.")
else:
    print("비어 있는 값이 있습니다.")
\`\`\`

하나라도 조건에 맞는 데이터가 있는지 확인할 수도 있습니다.

\`\`\`python
orders = [5000, 12000, 8000, 30000]

has_large_order = any(order >= 30000 for order in orders)

print(has_large_order)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
\`\`\`

---

### 8.5.5 입출력 관련 함수

입출력과 관련된 대표 내장 함수는 다음과 같습니다.

| 함수 | 설명 |
|---|---|
| \`print()\` | 화면에 출력 |
| \`input()\` | 사용자 입력 받기 |
| \`open()\` | 파일 열기 |

\`print()\`는 값을 화면에 출력합니다.

\`\`\`python
name = "민수"
print("안녕하세요", name)
\`\`\`

\`input()\`은 사용자 입력을 받습니다.

\`\`\`python
name = input("이름을 입력하세요: ")
print(name)
\`\`\`

\`input()\`의 결과는 항상 문자열입니다. 숫자로 사용하려면 변환해야 합니다.

\`\`\`python
age_text = input("나이를 입력하세요: ")
age = int(age_text)

print(age + 1)
\`\`\`

\`open()\`은 파일을 열 때 사용합니다.

\`\`\`python
file = open("memo.txt", "w", encoding="utf-8")
file.write("안녕하세요")
file.close()
\`\`\`

파일 처리는 실수하면 파일이 덮어쓰이거나 데이터가 손상될 수 있으므로 10장에서 더 자세히 배웁니다. 실무에서는 보통 \`with\` 문과 함께 사용합니다.

\`\`\`python
with open("memo.txt", "w", encoding="utf-8") as file:
    file.write("안녕하세요")
\`\`\`

---

### 8.5.6 내장 함수를 사용할 때의 주의점

내장 함수 이름을 변수명으로 사용하지 않는 것이 좋습니다.

예를 들어 다음 코드는 좋지 않습니다.

\`\`\`python
list = [1, 2, 3]
print(list)
\`\`\`

이렇게 작성하면 원래 내장 함수 \`list()\`를 사용하기 어려워질 수 있습니다.

\`\`\`python
list = [1, 2, 3]

numbers = list("123")
\`\`\`

위 코드는 에러가 발생합니다. \`list\`라는 이름에 이미 리스트 값이 저장되어 있기 때문입니다.

다음과 같은 이름은 변수명으로 사용하지 않는 것이 좋습니다.

\`\`\`text
list
str
int
dict
set
sum
min
max
input
open
\`\`\`

대신 의미가 분명한 이름을 사용합니다.

\`\`\`python
numbers = [1, 2, 3]
user_name = "민수"
total_price = 30000
\`\`\`

내장 함수는 편리하지만, 이름을 덮어쓰지 않도록 주의해야 합니다.

---

## 8.6 프로그램 실행 인수 다루기

지금까지는 코드 안에 값을 직접 넣거나 \`input()\`으로 실행 중에 값을 입력받았습니다. 하지만 실무 자동화 프로그램에서는 프로그램을 실행할 때 파일 경로, 날짜, 옵션 등을 함께 전달하는 방식이 자주 사용됩니다.

예를 들어 다음과 같은 명령을 생각해봅시다.

\`\`\`bash
python report.py sales.xlsx
\`\`\`

이 명령은 \`report.py\`를 실행하면서 \`sales.xlsx\`라는 값을 함께 전달합니다. 이렇게 프로그램 실행 시 전달하는 값을 **명령행 인수**라고 합니다.

---

### 8.6.1 명령행 인수란 무엇인가

명령행 인수는 터미널에서 프로그램을 실행할 때 함께 넘겨주는 값입니다.

예를 들어 파일 이름을 코드에 직접 쓰면 다음과 같습니다.

\`\`\`python
filename = "sales.xlsx"
\`\`\`

이 방식은 간단하지만, 다른 파일을 처리할 때마다 코드를 수정해야 합니다.

명령행 인수를 사용하면 실행할 때 파일명을 바꿀 수 있습니다.

\`\`\`bash
python report.py sales_2026_06.xlsx
python report.py sales_2026_07.xlsx
python report.py sales_2026_08.xlsx
\`\`\`

이 방식은 자동화 프로그램에 적합합니다.

명령행 인수는 다음과 같은 상황에서 유용합니다.

- 처리할 파일 경로를 실행 시 전달하기
- 보고서 기준 날짜를 전달하기
- 저장할 결과 파일명을 전달하기
- 옵션에 따라 다른 기능 실행하기
- 배치 작업이나 스케줄러에서 프로그램 실행하기

---

### 8.6.2 \`sys.argv\` 사용하기

명령행 인수는 \`sys.argv\`로 확인할 수 있습니다.

다음 코드를 \`args_example.py\`라는 파일로 저장했다고 해봅시다.

\`\`\`python
# args_example.py

import sys

print(sys.argv)
\`\`\`

터미널에서 다음처럼 실행합니다.

\`\`\`bash
python args_example.py hello python
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
['args_example.py', 'hello', 'python']
\`\`\`

\`sys.argv\`는 리스트입니다.

첫 번째 값인 \`sys.argv[0]\`에는 실행한 파일 이름이 들어갑니다.

그 뒤의 값부터 사용자가 전달한 인수입니다.

\`\`\`python
import sys

print("실행 파일:", sys.argv[0])
print("첫 번째 인수:", sys.argv[1])
print("두 번째 인수:", sys.argv[2])
\`\`\`

다음처럼 실행하면,

\`\`\`bash
python args_example.py hello python
\`\`\`

결과는 다음과 같습니다.

\`\`\`text
실행 파일: args_example.py
첫 번째 인수: hello
두 번째 인수: python
\`\`\`

---

### 8.6.3 명령행 인수는 문자열이다

\`input()\`의 결과가 문자열인 것처럼, 명령행 인수도 문자열입니다.

다음 코드를 보겠습니다.

\`\`\`python
# add.py

import sys

number1 = sys.argv[1]
number2 = sys.argv[2]

print(number1 + number2)
\`\`\`

터미널에서 다음처럼 실행합니다.

\`\`\`bash
python add.py 10 20
\`\`\`

결과는 다음과 같습니다.

\`\`\`text
1020
\`\`\`

숫자 덧셈이 아니라 문자열 연결이 일어났습니다. \`sys.argv[1]\`과 \`sys.argv[2]\`는 문자열이기 때문입니다.

숫자로 계산하려면 변환해야 합니다.

\`\`\`python
# add.py

import sys

number1 = int(sys.argv[1])
number2 = int(sys.argv[2])

print(number1 + number2)
\`\`\`

이제 실행 결과는 다음과 같습니다.

\`\`\`text
30
\`\`\`

명령행 인수를 사용할 때는 항상 자료형 변환을 생각해야 합니다.

---

### 8.6.4 인수 개수 확인하기

\`sys.argv\`를 사용할 때 인수가 부족하면 에러가 발생합니다.

\`\`\`python
import sys

filename = sys.argv[1]
print(filename)
\`\`\`

이 코드를 인수 없이 실행하면 \`sys.argv[1]\`이 없기 때문에 에러가 발생합니다.

\`\`\`bash
python program.py
\`\`\`

그래서 인수 개수를 먼저 확인하는 것이 좋습니다.

\`\`\`python
# read_filename.py

import sys

if len(sys.argv) < 2:
    print("사용법: python read_filename.py <파일명>")
    sys.exit()

filename = sys.argv[1]
print("처리할 파일:", filename)
\`\`\`

실행 예시는 다음과 같습니다.

\`\`\`bash
python read_filename.py sales.xlsx
\`\`\`

결과는 다음과 같습니다.

\`\`\`text
처리할 파일: sales.xlsx
\`\`\`

인수가 없으면 다음과 같이 안내 메시지를 보여줄 수 있습니다.

\`\`\`text
사용법: python read_filename.py <파일명>
\`\`\`

---

### 8.6.5 \`argparse\`가 필요한 이유

\`sys.argv\`는 간단하지만, 인수가 많아지면 관리하기 어렵습니다.

예를 들어 다음과 같은 명령을 만들고 싶다고 해봅시다.

\`\`\`bash
python report.py --input sales.xlsx --output result.xlsx --date 2026-06-15
\`\`\`

이런 옵션을 직접 \`sys.argv\`로 처리하려면 코드가 복잡해집니다. 이때 \`argparse\`를 사용하면 명령행 인수를 더 체계적으로 처리할 수 있습니다.

\`argparse\`는 파이썬 표준 라이브러리입니다. 별도로 설치하지 않아도 사용할 수 있습니다.

---

### 8.6.6 \`argparse\` 기본 사용법

다음은 \`argparse\`의 기본 예시입니다.

\`\`\`python
# greet.py

import argparse

parser = argparse.ArgumentParser(description="인사말을 출력하는 프로그램")
parser.add_argument("name", help="인사할 사람의 이름")

args = parser.parse_args()

print(f"{args.name}님, 안녕하세요.")
\`\`\`

터미널에서 다음처럼 실행합니다.

\`\`\`bash
python greet.py 민수
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
민수님, 안녕하세요.
\`\`\`

\`parser.add_argument("name")\`은 필수 인수 하나를 받겠다는 뜻입니다.

사용자가 값을 주지 않으면 \`argparse\`가 자동으로 오류 메시지를 보여줍니다.

도움말도 자동으로 만들 수 있습니다.

\`\`\`bash
python greet.py --help
\`\`\`

도움말에는 프로그램 설명과 인수 설명이 표시됩니다.

---

### 8.6.7 선택 옵션 만들기

이번에는 \`--input\`, \`--output\` 같은 선택 옵션을 만들어봅시다.

\`\`\`python
# report.py

import argparse

parser = argparse.ArgumentParser(description="보고서 생성 프로그램")
parser.add_argument("--input", required=True, help="입력 파일 경로")
parser.add_argument("--output", required=True, help="출력 파일 경로")

args = parser.parse_args()

print("입력 파일:", args.input)
print("출력 파일:", args.output)
\`\`\`

터미널에서 다음처럼 실행합니다.

\`\`\`bash
python report.py --input sales.xlsx --output result.xlsx
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
입력 파일: sales.xlsx
출력 파일: result.xlsx
\`\`\`

\`required=True\`는 반드시 입력해야 하는 옵션이라는 뜻입니다.

옵션이 누락되면 \`argparse\`가 자동으로 오류를 알려줍니다.

---

### 8.6.8 기본값과 자료형 지정하기

\`argparse\`에서는 기본값과 자료형도 지정할 수 있습니다.

\`\`\`python
# discount.py

import argparse

parser = argparse.ArgumentParser(description="할인 금액 계산 프로그램")
parser.add_argument("price", type=int, help="상품 가격")
parser.add_argument("--rate", type=float, default=0.1, help="할인율")

args = parser.parse_args()

discount = args.price * args.rate
final_price = args.price - discount

print("상품 가격:", args.price)
print("할인율:", args.rate)
print("할인 금액:", discount)
print("최종 금액:", final_price)
\`\`\`

터미널에서 다음처럼 실행할 수 있습니다.

\`\`\`bash
python discount.py 30000
\`\`\`

\`--rate\`를 생략하면 기본값 \`0.1\`이 사용됩니다.

\`\`\`text
상품 가격: 30000
할인율: 0.1
할인 금액: 3000.0
최종 금액: 27000.0
\`\`\`

할인율을 직접 지정할 수도 있습니다.

\`\`\`bash
python discount.py 30000 --rate 0.2
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
상품 가격: 30000
할인율: 0.2
할인 금액: 6000.0
최종 금액: 24000.0
\`\`\`

---

### 8.6.9 명령행 프로그램의 기본 구조

명령행 인수를 사용하는 프로그램도 \`main()\` 함수와 함께 작성하면 구조가 깔끔해집니다.

\`\`\`python
# report.py

import argparse


def parse_args():
    parser = argparse.ArgumentParser(description="보고서 생성 프로그램")
    parser.add_argument("--input", required=True, help="입력 파일 경로")
    parser.add_argument("--output", required=True, help="출력 파일 경로")
    return parser.parse_args()


def main():
    args = parse_args()

    print("입력 파일:", args.input)
    print("출력 파일:", args.output)
    print("보고서를 생성합니다.")


if __name__ == "__main__":
    main()
\`\`\`

이 구조는 다음과 같이 역할을 나눕니다.

\`\`\`text
parse_args()  명령행 인수 처리
main()        프로그램 실행 흐름
\`\`\`

나중에 파일 읽기, 데이터 처리, 보고서 저장 기능을 추가하더라도 구조가 유지됩니다.

---

### 8.6.10 \`input()\`과 명령행 인수의 차이

\`input()\`과 명령행 인수는 모두 사용자에게 값을 받는 방법입니다. 하지만 사용되는 상황이 다릅니다.

| 방식 | 특징 | 적합한 상황 |
|---|---|---|
| \`input()\` | 실행 중 사용자에게 직접 입력받음 | 학습용 프로그램, 간단한 대화형 프로그램 |
| 명령행 인수 | 실행할 때 값을 함께 전달 | 자동화 프로그램, 배치 작업, 반복 실행 |

예를 들어 \`input()\` 방식은 다음과 같습니다.

\`\`\`python
filename = input("파일명을 입력하세요: ")
print(filename)
\`\`\`

명령행 인수 방식은 다음과 같습니다.

\`\`\`bash
python report.py sales.xlsx
\`\`\`

자동화 프로그램에서는 명령행 인수가 더 적합한 경우가 많습니다. 사람의 입력 없이 정해진 시간에 프로그램을 실행하거나, 여러 파일을 순서대로 처리하기 쉽기 때문입니다.

---

## 8장 핵심 정리

이 장에서는 모듈과 패키지를 중심으로 파이썬 코드를 여러 파일로 나누어 관리하는 방법을 배웠습니다.

핵심 내용을 정리하면 다음과 같습니다.

첫째, 모듈은 하나의 \`.py\` 파일입니다. 모듈에는 변수, 함수, 클래스를 작성할 수 있고, 다른 파일에서 import해서 사용할 수 있습니다.

둘째, \`import\`는 다른 모듈의 코드를 가져와 사용할 때 사용하는 문법입니다. 모듈 전체를 가져올 수도 있고, 특정 함수나 클래스만 가져올 수도 있습니다.

셋째, 표준 라이브러리는 파이썬이 기본으로 제공하는 모듈 모음입니다. \`datetime\`, \`math\`, \`random\`, \`json\`, \`os\`, \`pathlib\`, \`sys\`, \`argparse\` 등이 대표적입니다.

넷째, 직접 만든 모듈을 사용하면 코드를 기능별로 나눌 수 있습니다. 계산 함수, 출력 함수, 설정값, 클래스 등을 별도 파일로 분리할 수 있습니다.

다섯째, \`if __name__ == "__main__"\`은 파일이 직접 실행될 때만 특정 코드를 실행하기 위해 사용하는 구조입니다.

여섯째, 패키지는 여러 모듈을 모아 놓은 폴더입니다. \`models\`, \`services\`, \`utils\`처럼 역할별로 폴더를 나누면 프로젝트 구조가 명확해집니다.

일곱째, 내장 함수는 import 없이 바로 사용할 수 있는 함수입니다. \`type()\`, \`len()\`, \`sum()\`, \`enumerate()\`, \`zip()\`, \`sorted()\`, \`any()\`, \`all()\` 등은 실무에서도 자주 사용됩니다.

여덟째, 명령행 인수는 프로그램 실행 시 값을 전달하는 방법입니다. 간단한 경우 \`sys.argv\`를 사용할 수 있고, 옵션이 많아지면 \`argparse\`를 사용하는 것이 좋습니다.

모듈과 패키지는 단순한 문법이 아니라 코드를 관리하는 방법입니다. 프로그램이 커질수록 “어떤 코드를 어디에 둘 것인가”가 중요해집니다.

---

## 8장 연습문제

### 문제 1. 모듈의 의미

다음 중 모듈에 대한 설명으로 가장 적절한 것을 고르세요.

A. 파이썬에서만 사용하는 숫자 자료형  
B. 하나의 파이썬 코드 파일  
C. 반복문 안에서만 사용하는 변수  
D. 화면에 값을 출력하는 함수  

---

### 문제 2. import 문 이해하기

다음 코드를 실행하면 어떤 결과가 출력될까요?

\`\`\`python
import math

print(math.sqrt(9))
\`\`\`

---

### 문제 3. 특정 함수만 가져오기

다음 코드를 \`from ... import ...\` 방식으로 바꾸세요.

\`\`\`python
import math

result = math.sqrt(25)
print(result)
\`\`\`

---

### 문제 4. 모듈 분리하기

다음 함수가 있습니다.

\`\`\`python
def format_price(price):
    return f"{price:,.0f}원"
\`\`\`

이 함수를 \`formatter.py\` 파일에 넣었다고 가정합니다. \`main.py\`에서 이 함수를 가져와 \`30000\`을 \`30,000원\`으로 출력하는 코드를 작성하세요.

---

### 문제 5. \`if __name__ == "__main__"\`

다음 코드에서 \`if __name__ == "__main__"\`가 하는 역할을 설명하세요.

\`\`\`python
def main():
    print("프로그램을 실행합니다.")


if __name__ == "__main__":
    main()
\`\`\`

---

### 문제 6. 패키지 import

다음과 같은 폴더 구조가 있습니다.

\`\`\`text
project/
  main.py
  utils/
    __init__.py
    price_utils.py
\`\`\`

\`price_utils.py\` 안에는 다음 함수가 있습니다.

\`\`\`python
def format_price(price):
    return f"{price:,.0f}원"
\`\`\`

\`main.py\`에서 \`format_price\` 함수를 가져오는 코드를 작성하세요.

---

### 문제 7. 내장 함수 사용하기

다음 리스트에서 가격의 개수, 합계, 최솟값, 최댓값을 출력하는 코드를 작성하세요.

\`\`\`python
prices = [30000, 15000, 200000, 50000]
\`\`\`

---

### 문제 8. \`enumerate()\` 사용하기

다음 리스트를 번호와 함께 출력하는 코드를 작성하세요. 번호는 1부터 시작해야 합니다.

\`\`\`python
names = ["민수", "지영", "철수"]
\`\`\`

예상 출력은 다음과 같습니다.

\`\`\`text
1 민수
2 지영
3 철수
\`\`\`

---

### 문제 9. \`zip()\` 사용하기

다음 두 리스트를 사용해 상품명과 가격을 함께 출력하는 코드를 작성하세요.

\`\`\`python
names = ["키보드", "마우스", "모니터"]
prices = [30000, 15000, 200000]
\`\`\`

예상 출력은 다음과 같습니다.

\`\`\`text
키보드 30000
마우스 15000
모니터 200000
\`\`\`

---

### 문제 10. \`sys.argv\` 이해하기

다음 코드를 \`args.py\`로 저장하고,

\`\`\`python
import sys

print(sys.argv)
\`\`\`

터미널에서 다음처럼 실행했다고 가정합니다.

\`\`\`bash
python args.py apple banana
\`\`\`

출력되는 리스트의 내용을 예상해보세요.

---

### 문제 11. 명령행 인수 숫자 변환

다음 프로그램은 두 숫자를 명령행 인수로 받아 더하는 프로그램입니다. 빈칸을 채우세요.

\`\`\`python
import sys

number1 = ________(sys.argv[1])
number2 = ________(sys.argv[2])

print(number1 + number2)
\`\`\`

예를 들어 다음처럼 실행하면,

\`\`\`bash
python add.py 10 20
\`\`\`

출력 결과는 다음과 같아야 합니다.

\`\`\`text
30
\`\`\`

---

### 문제 12. \`argparse\` 기본 구조

다음 조건을 만족하는 \`argparse\` 코드를 작성하세요.

- 프로그램은 \`name\`이라는 필수 인수를 받는다.
- 실행하면 \`{name}님, 안녕하세요.\`를 출력한다.

예를 들어 다음처럼 실행하면,

\`\`\`bash
python greet.py 민수
\`\`\`

다음 결과가 출력되어야 합니다.

\`\`\`text
민수님, 안녕하세요.
\`\`\`

---

## 8장 정답 및 해설

### 문제 1 정답

정답: B

모듈은 하나의 파이썬 코드 파일입니다. 예를 들어 \`calculator.py\`, \`formatter.py\`, \`main.py\`는 각각 모듈이 될 수 있습니다.

---

### 문제 2 정답

\`\`\`text
3.0
\`\`\`

해설:

\`math.sqrt(9)\`는 9의 제곱근을 구합니다. 결과는 실수 \`3.0\`입니다.

---

### 문제 3 정답

\`\`\`python
from math import sqrt

result = sqrt(25)
print(result)
\`\`\`

해설:

\`from math import sqrt\`를 사용하면 \`math.sqrt()\`가 아니라 \`sqrt()\`라고 바로 사용할 수 있습니다.

---

### 문제 4 정답

\`\`\`python
from formatter import format_price

print(format_price(30000))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
30,000원
\`\`\`

해설:

\`formatter.py\` 파일에 있는 \`format_price\` 함수를 가져오기 위해 \`from formatter import format_price\`를 사용합니다.

---

### 문제 5 정답

\`if __name__ == "__main__"\`는 이 파일이 직접 실행될 때만 \`main()\` 함수를 실행하라는 의미입니다.

이 구조를 사용하면 다른 파일에서 이 모듈을 import할 때는 \`main()\`이 자동으로 실행되지 않습니다. 그래서 테스트 코드나 실행 코드를 안전하게 분리할 수 있습니다.

---

### 문제 6 정답

\`\`\`python
from utils.price_utils import format_price

print(format_price(30000))
\`\`\`

해설:

\`utils\` 폴더 안의 \`price_utils.py\` 모듈에서 \`format_price\` 함수를 가져옵니다. 패키지 안의 모듈을 가져올 때는 점을 사용합니다.

---

### 문제 7 정답

\`\`\`python
prices = [30000, 15000, 200000, 50000]

print("개수:", len(prices))
print("합계:", sum(prices))
print("최솟값:", min(prices))
print("최댓값:", max(prices))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
개수: 4
합계: 295000
최솟값: 15000
최댓값: 200000
\`\`\`

해설:

\`len()\`은 개수, \`sum()\`은 합계, \`min()\`은 최솟값, \`max()\`는 최댓값을 구합니다.

---

### 문제 8 정답

\`\`\`python
names = ["민수", "지영", "철수"]

for index, name in enumerate(names, start=1):
    print(index, name)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1 민수
2 지영
3 철수
\`\`\`

해설:

\`enumerate(names, start=1)\`을 사용하면 인덱스를 1부터 시작할 수 있습니다.

---

### 문제 9 정답

\`\`\`python
names = ["키보드", "마우스", "모니터"]
prices = [30000, 15000, 200000]

for name, price in zip(names, prices):
    print(name, price)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
키보드 30000
마우스 15000
모니터 200000
\`\`\`

해설:

\`zip()\`은 여러 리스트에서 같은 위치에 있는 값을 하나씩 묶어줍니다.

---

### 문제 10 정답

\`\`\`text
['args.py', 'apple', 'banana']
\`\`\`

해설:

\`sys.argv\`는 리스트입니다. 첫 번째 값은 실행 파일 이름이고, 그 뒤에는 사용자가 전달한 인수가 순서대로 들어갑니다.

---

### 문제 11 정답

\`\`\`python
import sys

number1 = int(sys.argv[1])
number2 = int(sys.argv[2])

print(number1 + number2)
\`\`\`

해설:

명령행 인수는 문자열로 들어옵니다. 숫자 계산을 하려면 \`int()\`로 변환해야 합니다.

---

### 문제 12 정답

\`\`\`python
import argparse

parser = argparse.ArgumentParser(description="인사말 출력 프로그램")
parser.add_argument("name", help="인사할 사람의 이름")

args = parser.parse_args()

print(f"{args.name}님, 안녕하세요.")
\`\`\`

해설:

\`parser.add_argument("name")\`은 \`name\`이라는 필수 인수를 받겠다는 뜻입니다. \`parse_args()\`가 명령행 인수를 분석하고, 결과는 \`args.name\`으로 사용할 수 있습니다.
`;export{e as default};