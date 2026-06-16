var e=`<!-- 원본: python_basic_chapter_8_book.md / 세부 장: 8-2 -->

# 8.2 자주 쓰는 표준 라이브러리

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
`;export{e as default};