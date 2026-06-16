var e=`<!-- 원본: python_basic_chapter_12_book.md / 세부 장: 12-4 -->

# 12.4 설정값 관리

### 12.4.1 설정값이란 무엇인가

설정값은 프로그램의 동작을 바꾸는 값입니다. 예를 들어 다음과 같은 값이 설정값입니다.

\`\`\`text
- 입력 파일 경로
- 출력 파일 경로
- API URL
- API 키
- 기본 인코딩
- 로그 파일 경로
- 무료 배송 기준 금액
- 최대 재시도 횟수
\`\`\`

처음에는 이런 값을 코드 안에 직접 작성하기 쉽습니다.

\`\`\`python
input_file = "data/sales.csv"
output_file = "result/report.xlsx"
api_key = "my-secret-api-key"
\`\`\`

하지만 설정값을 코드 안에 직접 쓰면 문제가 생길 수 있습니다.

\`\`\`text
- 값이 바뀔 때마다 코드를 수정해야 한다.
- 개발 환경과 운영 환경의 값이 다를 수 있다.
- API 키나 비밀번호 같은 민감 정보가 코드에 노출될 수 있다.
- 같은 값이 여러 파일에 반복될 수 있다.
\`\`\`

따라서 실무에서는 설정값을 코드와 분리해서 관리하는 습관이 필요합니다.

---

### 12.4.2 상수로 분리하기

가장 간단한 설정값 관리는 상수로 분리하는 것입니다.

\`\`\`python
DEFAULT_ENCODING = "utf-8"
INPUT_FILE = "data/sales.csv"
OUTPUT_FILE = "result/report.xlsx"
FREE_DELIVERY_AMOUNT = 50000
\`\`\`

그리고 코드에서는 직접 값을 쓰지 않고 상수를 사용합니다.

\`\`\`python
with open(INPUT_FILE, "r", encoding=DEFAULT_ENCODING) as file:
    data = file.read()
\`\`\`

상수로 분리하면 값의 의미가 명확해지고, 수정할 위치도 줄어듭니다.

하지만 상수도 결국 코드 안에 들어 있습니다. 환경마다 값이 달라져야 한다면 설정 파일이나 환경 변수를 사용하는 것이 좋습니다.

---

### 12.4.3 설정 파일 사용하기

설정값을 JSON 파일로 분리할 수 있습니다.

\`config.json\` 파일을 만들어봅시다.

\`\`\`json
{
  "input_file": "data/sales.csv",
  "output_file": "result/report.xlsx",
  "encoding": "utf-8",
  "free_delivery_amount": 50000
}
\`\`\`

파이썬에서 이 파일을 읽을 수 있습니다.

\`\`\`python
import json

with open("config.json", "r", encoding="utf-8") as file:
    config = json.load(file)

input_file = config["input_file"]
output_file = config["output_file"]
encoding = config["encoding"]
free_delivery_amount = config["free_delivery_amount"]

print(input_file)
print(output_file)
\`\`\`

이렇게 하면 코드 수정 없이 \`config.json\` 파일만 수정해서 입력 파일이나 출력 파일을 바꿀 수 있습니다.

설정 파일을 사용할 때는 없는 key를 안전하게 처리하는 것도 중요합니다.

\`\`\`python
encoding = config.get("encoding", "utf-8")
retry_count = config.get("retry_count", 3)
\`\`\`

\`get()\`을 사용하면 설정값이 없을 때 기본값을 사용할 수 있습니다.

---

### 12.4.4 파이썬 설정 파일 사용하기

작은 프로젝트에서는 \`config.py\` 파일을 만들어 설정값을 관리하기도 합니다.

\`\`\`python
# config.py
INPUT_FILE = "data/sales.csv"
OUTPUT_FILE = "result/report.xlsx"
DEFAULT_ENCODING = "utf-8"
FREE_DELIVERY_AMOUNT = 50000
\`\`\`

다른 파일에서 import해서 사용할 수 있습니다.

\`\`\`python
# main.py
from config import INPUT_FILE, OUTPUT_FILE, DEFAULT_ENCODING

with open(INPUT_FILE, "r", encoding=DEFAULT_ENCODING) as file:
    data = file.read()

print(OUTPUT_FILE)
\`\`\`

\`config.py\` 방식은 파이썬 코드로 설정값을 관리하기 때문에 사용하기 쉽습니다. 하지만 일반 사용자가 수정해야 하는 설정이라면 JSON, INI 같은 별도 설정 파일이 더 적합할 수 있습니다.

---

### 12.4.5 INI 설정 파일과 configparser 기초

파이썬에는 INI 형식 설정 파일을 읽기 위한 \`configparser\` 모듈이 있습니다.

\`settings.ini\` 파일을 만들어봅시다.

\`\`\`ini
[file]
input_file = data/sales.csv
output_file = result/report.xlsx
encoding = utf-8

[delivery]
free_amount = 50000
default_fee = 3000
\`\`\`

파이썬에서 읽는 코드는 다음과 같습니다.

\`\`\`python
import configparser

config = configparser.ConfigParser()
config.read("settings.ini", encoding="utf-8")

input_file = config["file"]["input_file"]
output_file = config["file"]["output_file"]
encoding = config["file"].get("encoding", "utf-8")

free_amount = config["delivery"].getint("free_amount")
default_fee = config["delivery"].getint("default_fee")

print(input_file)
print(free_amount)
\`\`\`

INI 파일은 섹션을 나누어 설정을 관리할 수 있다는 장점이 있습니다. 예를 들어 \`[file]\`, \`[api]\`, \`[database]\`처럼 설정을 영역별로 나눌 수 있습니다.

---

### 12.4.6 환경 변수 기초

환경 변수는 운영체제나 실행 환경에 저장해두는 값입니다. API 키, 비밀번호, 토큰 같은 민감 정보는 코드나 설정 파일에 직접 쓰지 않는 것이 좋습니다. 이런 값은 환경 변수로 관리하는 방식이 자주 사용됩니다.

파이썬에서는 \`os.environ\`으로 환경 변수를 읽을 수 있습니다.

\`\`\`python
import os

api_key = os.environ.get("API_KEY")

if api_key is None:
    raise ValueError("API_KEY 환경 변수가 설정되어 있지 않습니다.")

print("API 키를 읽었습니다.")
\`\`\`

환경 변수는 실행 환경마다 다르게 설정할 수 있습니다.

\`\`\`text
개발 환경: 테스트 API 키 사용
운영 환경: 실제 API 키 사용
\`\`\`

이렇게 하면 코드에는 민감 정보를 넣지 않고, 실행 환경에서 필요한 값을 주입할 수 있습니다.

---

### 12.4.7 민감 정보 관리

다음과 같은 값은 코드에 직접 쓰지 않는 것이 좋습니다.

\`\`\`text
- API 키
- 비밀번호
- 데이터베이스 접속 정보
- 인증 토큰
- 개인 정보가 포함된 경로
- 사내 시스템 주소
\`\`\`

나쁜 예:

\`\`\`python
API_KEY = "abc123-secret-key"
PASSWORD = "my-password"
\`\`\`

좋은 예:

\`\`\`python
import os

API_KEY = os.environ.get("API_KEY")
PASSWORD = os.environ.get("PASSWORD")
\`\`\`

민감 정보 관리에서 중요한 원칙은 다음과 같습니다.

\`\`\`text
- 코드 저장소에 비밀번호나 API 키를 올리지 않는다.
- 설정 파일에 민감 정보가 들어 있다면 공유 범위를 제한한다.
- 예제 파일에는 가짜 값을 넣는다.
- 로그에 민감 정보가 출력되지 않게 한다.
\`\`\`

로그에 API 키 전체를 남기는 것은 위험합니다.

\`\`\`python
# 나쁜 예
logging.info("API_KEY=%s", api_key)
\`\`\`

필요하다면 일부만 표시합니다.

\`\`\`python
# 예시: 앞 4글자만 표시
masked_key = api_key[:4] + "****"
logging.info("API 키 확인: %s", masked_key)
\`\`\`

---

### 12.4.8 설정값을 읽는 함수 만들기

설정 파일을 읽는 코드는 여러 곳에 흩어지지 않게 함수로 분리하는 것이 좋습니다.

\`\`\`python
import json


def load_config(file_path: str) -> dict:
    with open(file_path, "r", encoding="utf-8") as file:
        return json.load(file)
\`\`\`

이제 필요한 곳에서 함수를 호출합니다.

\`\`\`python
config = load_config("config.json")

input_file = config.get("input_file", "data/input.csv")
output_file = config.get("output_file", "result/output.csv")
\`\`\`

더 안전하게 작성하려면 필수 설정값을 검사할 수 있습니다.

\`\`\`python
def require_config(config: dict, key: str) -> str:
    value = config.get(key)

    if value is None or value == "":
        raise ValueError(f"필수 설정값이 없습니다: {key}")

    return value
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
config = load_config("config.json")
input_file = require_config(config, "input_file")
\`\`\`

설정값을 읽는 코드를 함수로 만들면 테스트하기도 쉽고, 설정 파일 구조가 바뀌었을 때 수정 범위도 줄어듭니다.

---
`;export{e as default};