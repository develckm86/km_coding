var e=`<!-- 원본: python_basic_chapter_11_book.md / 세부 장: 11-7 -->

# 11.7 데이터 클리닝 실무 패턴

### 11.7.1 데이터 클리닝이란 무엇인가

데이터 클리닝은 원본 데이터를 사용하기 좋은 형태로 정리하는 작업입니다.

실무 데이터는 처음부터 깨끗하지 않은 경우가 많습니다.

\`\`\`text
- 같은 고객이 중복으로 들어 있음
- 이름 앞뒤에 공백이 있음
- 전화번호 형식이 서로 다름
- 금액이 문자열로 저장되어 있음
- 날짜 형식이 서로 다름
- 필요한 값이 비어 있음
- 컬럼 이름이 제각각임
\`\`\`

분석이나 자동화 전에 이런 문제를 정리하지 않으면 결과가 틀어질 수 있습니다.

예를 들어 \`"홍길동"\`과 \`" 홍길동 "\`은 사람 눈에는 같아 보이지만, 컴퓨터는 서로 다른 문자열로 처리할 수 있습니다. 따라서 앞뒤 공백을 제거하는 과정이 필요합니다.

---

### 11.7.2 예제 데이터 만들기

다음 데이터는 일부러 문제가 섞여 있는 고객 주문 데이터입니다.

\`\`\`python
import pandas as pd

data = {
    "name": [" 홍길동", "김민수", "이서연 ", "홍길동", None],
    "email": ["HONG@EXAMPLE.COM", "minsu@example.com", "seo@example.com", "hong@example.com", "no_name@example.com"],
    "phone": ["010-1234-5678", "01098765432", "010 2222 3333", "010-1234-5678", None],
    "order_date": ["2026-06-01", "2026/06/02", "2026.06.03", "2026-06-01", "잘못된 날짜"],
    "amount": ["35,000원", "12000", "8,500원", "35,000원", None]
}

df = pd.DataFrame(data)

print(df)
\`\`\`

이 데이터에는 다음 문제가 있습니다.

\`\`\`text
- name 컬럼에 공백과 결측치가 있다.
- email 컬럼에 대문자가 섞여 있다.
- phone 컬럼의 형식이 서로 다르다.
- order_date 컬럼의 날짜 형식이 서로 다르고 잘못된 값도 있다.
- amount 컬럼은 숫자가 아니라 문자열이다.
- 일부 행은 중복이다.
\`\`\`

하나씩 정리해 보겠습니다.

---

### 11.7.3 문자열 공백 제거

이름 앞뒤 공백을 제거합니다.

\`\`\`python
df["name"] = df["name"].str.strip()

print(df["name"])
\`\`\`

문자열 메서드를 pandas 컬럼에 적용할 때는 \`.str\`을 사용합니다.

\`\`\`python
df["컬럼명"].str.strip()
\`\`\`

단, 결측치가 있는 컬럼에서도 \`.str\` 접근자는 대체로 사용할 수 있지만, 결과를 확인하는 습관이 필요합니다.

---

### 11.7.4 대소문자 통일

이메일 주소는 대소문자가 섞여 있으면 비교하기 불편합니다. 보통 소문자로 통일합니다.

\`\`\`python
df["email"] = df["email"].str.lower()

print(df["email"])
\`\`\`

이렇게 하면 \`HONG@EXAMPLE.COM\`과 \`hong@example.com\`을 같은 이메일로 비교하기 쉬워집니다.

---

### 11.7.5 전화번호 형식 통일

전화번호에서 숫자가 아닌 문자를 제거해 숫자만 남깁니다.

\`\`\`python
df["phone"] = df["phone"].str.replace(r"[^0-9]", "", regex=True)

print(df["phone"])
\`\`\`

\`regex=True\`를 사용하면 정규표현식 패턴으로 문자열을 바꿀 수 있습니다.

결과는 다음과 비슷합니다.

\`\`\`text
0    01012345678
1    01098765432
2    01022223333
3    01012345678
4           None
Name: phone, dtype: object
\`\`\`

필요하다면 다시 하이픈이 있는 형식으로 바꿀 수도 있습니다.

\`\`\`python
def format_phone(phone):
    if pd.isna(phone):
        return phone

    if len(phone) == 11:
        return f"{phone[:3]}-{phone[3:7]}-{phone[7:]}"

    return phone


df["phone"] = df["phone"].apply(format_phone)
\`\`\`

---

### 11.7.6 금액 문자열을 숫자로 변환

금액 컬럼에는 쉼표와 원화 기호가 들어 있습니다.

\`\`\`text
35,000원
8,500원
\`\`\`

이 값은 숫자처럼 보이지만 실제로는 문자열입니다. 계산하려면 숫자로 바꿔야 합니다.

\`\`\`python
df["amount"] = df["amount"].str.replace(",", "", regex=False)
df["amount"] = df["amount"].str.replace("원", "", regex=False)
df["amount"] = pd.to_numeric(df["amount"], errors="coerce")

print(df["amount"])
\`\`\`

\`pd.to_numeric()\`은 값을 숫자로 변환합니다. \`errors="coerce"\`는 변환할 수 없는 값을 결측치로 처리합니다.

---

### 11.7.7 날짜 형식 통일

날짜 형식이 여러 가지라면 먼저 구분자를 통일하거나, \`pd.to_datetime()\`을 사용할 수 있습니다.

\`\`\`python
df["order_date"] = df["order_date"].str.replace("/", "-", regex=False)
df["order_date"] = df["order_date"].str.replace(".", "-", regex=False)
df["order_date"] = pd.to_datetime(df["order_date"], errors="coerce")

print(df["order_date"])
\`\`\`

잘못된 날짜는 \`NaT\`로 표시됩니다. \`NaT\`는 날짜형 데이터에서 사용하는 결측치라고 이해하면 됩니다.

날짜를 다시 문자열로 저장하고 싶다면 다음처럼 할 수 있습니다.

\`\`\`python
df["order_date_text"] = df["order_date"].dt.strftime("%Y-%m-%d")
\`\`\`

---

### 11.7.8 결측치 처리

결측치를 확인합니다.

\`\`\`python
print(df.isna().sum())
\`\`\`

필수 컬럼에 값이 없는 행은 제거할 수 있습니다.

\`\`\`python
df = df.dropna(subset=["name", "email"])
\`\`\`

금액이 비어 있다면 0으로 채울 수도 있습니다.

\`\`\`python
df["amount"] = df["amount"].fillna(0)
\`\`\`

결측치 처리는 데이터의 의미를 고려해야 합니다. 무조건 0으로 채우면 안 되는 경우도 있습니다.

---

### 11.7.9 중복 제거

중복 행을 확인하려면 \`duplicated()\`를 사용합니다.

\`\`\`python
print(df.duplicated())
\`\`\`

중복 행을 제거하려면 \`drop_duplicates()\`를 사용합니다.

\`\`\`python
df = df.drop_duplicates()
\`\`\`

특정 컬럼 기준으로 중복을 제거할 수도 있습니다.

\`\`\`python
df = df.drop_duplicates(subset=["email"])
\`\`\`

이 경우 같은 이메일이 여러 번 등장하면 하나만 남깁니다.

---

### 11.7.10 컬럼 이름 정리

실무 데이터에서는 컬럼 이름이 다음처럼 들어오는 경우가 있습니다.

\`\`\`text
고객명, 고객 이메일, 주문 금액, 주문일
\`\`\`

코드에서는 공백이 없고 일관된 영문 컬럼명이 더 다루기 편할 때가 많습니다.

\`\`\`python
df = df.rename(columns={
    "name": "customer_name",
    "email": "customer_email",
    "phone": "phone_number",
    "order_date": "ordered_at"
})
\`\`\`

컬럼 이름을 정리하면 이후 코드가 더 명확해집니다.

---

### 11.7.11 필요한 컬럼만 선택하기

정리된 데이터에서 필요한 컬럼만 남길 수 있습니다.

\`\`\`python
result = df[["customer_name", "customer_email", "phone_number", "ordered_at", "amount"]]

print(result)
\`\`\`

분석이나 저장에 필요 없는 컬럼은 제거하는 것이 좋습니다. 결과 파일이 깔끔해지고, 다음 작업자가 이해하기 쉬워집니다.

---

### 11.7.12 데이터 클리닝 전체 흐름

앞에서 배운 내용을 하나의 흐름으로 정리하면 다음과 같습니다.

\`\`\`python
import pandas as pd

# 1. 데이터 만들기
data = {
    "name": [" 홍길동", "김민수", "이서연 ", "홍길동", None],
    "email": ["HONG@EXAMPLE.COM", "minsu@example.com", "seo@example.com", "hong@example.com", "no_name@example.com"],
    "phone": ["010-1234-5678", "01098765432", "010 2222 3333", "010-1234-5678", None],
    "order_date": ["2026-06-01", "2026/06/02", "2026.06.03", "2026-06-01", "잘못된 날짜"],
    "amount": ["35,000원", "12000", "8,500원", "35,000원", None]
}

df = pd.DataFrame(data)

# 2. 문자열 정리
df["name"] = df["name"].str.strip()
df["email"] = df["email"].str.lower()
df["phone"] = df["phone"].str.replace(r"[^0-9]", "", regex=True)

# 3. 금액 정리
df["amount"] = df["amount"].str.replace(",", "", regex=False)
df["amount"] = df["amount"].str.replace("원", "", regex=False)
df["amount"] = pd.to_numeric(df["amount"], errors="coerce")

# 4. 날짜 정리
df["order_date"] = df["order_date"].str.replace("/", "-", regex=False)
df["order_date"] = df["order_date"].str.replace(".", "-", regex=False)
df["order_date"] = pd.to_datetime(df["order_date"], errors="coerce")

# 5. 결측치 처리
df = df.dropna(subset=["name", "email"])
df["amount"] = df["amount"].fillna(0)

# 6. 중복 제거
df = df.drop_duplicates(subset=["email"])

# 7. 컬럼 이름 변경
df = df.rename(columns={
    "name": "customer_name",
    "email": "customer_email",
    "phone": "phone_number",
    "order_date": "ordered_at"
})

# 8. 필요한 컬럼만 선택
result = df[["customer_name", "customer_email", "phone_number", "ordered_at", "amount"]]

print(result)
\`\`\`

데이터 클리닝은 정답이 하나로 정해져 있지 않습니다. 데이터의 의미와 업무 목적에 따라 어떤 값을 제거할지, 어떤 값을 기본값으로 채울지, 어떤 형식으로 통일할지를 결정해야 합니다.

---

## 11장 핵심 정리

이 장에서는 데이터를 다루는 기본 도구를 배웠습니다.

JSON은 API와 설정 파일에서 자주 사용하는 데이터 형식입니다. 파이썬에서는 \`json\` 모듈을 사용해 JSON 문자열과 파일을 딕셔너리, 리스트 같은 파이썬 객체로 변환할 수 있습니다.

날짜와 시간 데이터는 문자열 그대로 사용하기보다 \`datetime\` 객체로 변환해서 비교하고 계산하는 것이 좋습니다. \`strftime()\`은 날짜를 문자열로 바꿀 때, \`strptime()\`은 문자열을 날짜로 바꿀 때 사용합니다.

정규표현식은 문자열에서 일정한 패턴을 찾거나 바꿀 때 사용합니다. 이메일, 전화번호, 날짜, 숫자, 로그 메시지처럼 규칙이 있는 문자열을 처리할 때 유용합니다.

\`requests\`는 API에 HTTP 요청을 보내고 응답을 받을 때 사용하는 대표적인 외부 라이브러리입니다. API 요청에서는 상태 코드 확인, 예외 처리, timeout 설정이 중요합니다.

\`pandas\`는 표 형태 데이터를 다루는 강력한 라이브러리입니다. CSV와 엑셀 파일을 읽고, 컬럼을 선택하고, 행을 필터링하고, 그룹별로 집계하고, 결과를 다시 파일로 저장할 수 있습니다.

데이터 클리닝은 실무 데이터 처리의 핵심입니다. 중복 제거, 결측치 처리, 문자열 정리, 날짜 형식 통일, 숫자형 변환을 통해 데이터를 분석하기 좋은 형태로 바꿉니다.

정리하면 11장의 핵심 흐름은 다음과 같습니다.

\`\`\`text
1. 외부 데이터를 읽는다.
2. 데이터 구조를 확인한다.
3. 필요한 값만 추출한다.
4. 날짜, 문자열, 숫자 형식을 정리한다.
5. 결측치와 중복을 처리한다.
6. 분석하거나 저장한다.
\`\`\`

---

## 11장 연습문제

### 문제 1

다음 중 JSON에 대한 설명으로 가장 적절한 것은 무엇인가요?

A. 이미지 파일을 저장하기 위한 형식이다.  
B. 데이터를 주고받을 때 자주 사용하는 텍스트 기반 형식이다.  
C. 파이썬에서만 사용할 수 있는 전용 파일 형식이다.  
D. 실행 가능한 파이썬 코드 파일이다.

---

### 문제 2

다음 JSON 문자열을 파이썬 딕셔너리로 변환하는 코드를 작성하세요.

\`\`\`python
json_text = '{"name": "홍길동", "age": 30}'
\`\`\`

---

### 문제 3

다음 파이썬 딕셔너리를 한글이 그대로 보이도록 JSON 문자열로 변환하는 코드를 작성하세요.

\`\`\`python
data = {
    "name": "이서연",
    "grade": "VIP"
}
\`\`\`

---

### 문제 4

다음 코드의 빈칸을 채우세요.

\`\`\`python
from datetime import datetime

date_text = "2026-06-15"
date_value = datetime.______(date_text, "%Y-%m-%d")

print(date_value)
\`\`\`

---

### 문제 5

오늘 날짜를 기준으로 7일 전 날짜를 구하는 코드를 작성하세요. \`date\`와 \`timedelta\`를 사용하세요.

---

### 문제 6

다음 문자열에서 모든 주문번호를 추출하는 정규표현식 코드를 작성하세요.

\`\`\`python
text = "주문번호는 A001, A002, A003입니다."
\`\`\`

원하는 결과는 다음과 같습니다.

\`\`\`python
['A001', 'A002', 'A003']
\`\`\`

---

### 문제 7

다음 전화번호에서 숫자가 아닌 문자를 제거하여 \`01012345678\`로 만드는 코드를 작성하세요.

\`\`\`python
phone = "010-1234-5678"
\`\`\`

---

### 문제 8

다음 중 \`requests.get()\` 요청에서 \`timeout\`을 지정하는 이유로 가장 적절한 것은 무엇인가요?

A. 응답 데이터를 자동으로 엑셀로 저장하기 위해서  
B. 서버가 응답하지 않을 때 프로그램이 계속 기다리는 것을 막기 위해서  
C. JSON 데이터를 자동으로 한글 번역하기 위해서  
D. 상태 코드를 항상 200으로 바꾸기 위해서

---

### 문제 9

다음 코드의 빈칸을 채우세요.

\`\`\`python
import pandas as pd

df = pd.______("orders.csv", encoding="utf-8")
\`\`\`

CSV 파일을 읽는 코드입니다.

---

### 문제 10

다음 DataFrame에서 \`price\`가 10000 이상인 행만 선택하는 코드를 작성하세요.

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "product": ["키보드", "마우스", "모니터"],
    "price": [30000, 15000, 200000]
})
\`\`\`

---

### 문제 11

다음 DataFrame에 \`total\` 컬럼을 추가하세요. \`total\`은 \`price * quantity\`입니다.

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "product": ["키보드", "마우스"],
    "price": [30000, 15000],
    "quantity": [2, 3]
})
\`\`\`

---

### 문제 12

다음 DataFrame에서 카테고리별 매출 합계를 구하는 코드를 작성하세요.

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "category": ["문구", "문구", "전자기기"],
    "total": [6000, 10000, 15000]
})
\`\`\`

---

### 문제 13

다음 고객 데이터에서 이메일을 소문자로 통일하고, 이름의 앞뒤 공백을 제거하는 코드를 작성하세요.

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "name": [" 홍길동", "김민수 "],
    "email": ["HONG@EXAMPLE.COM", "MINSU@EXAMPLE.COM"]
})
\`\`\`

---

### 문제 14

다음 금액 문자열 컬럼을 숫자형으로 변환하는 코드를 작성하세요.

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "amount": ["35,000원", "12000", "8,500원"]
})
\`\`\`

---

### 문제 15

데이터 클리닝을 할 때 결측치를 무조건 0으로 채우면 안 되는 이유를 간단히 설명하세요.

---

## 정답 및 해설

### 문제 1 정답

정답: **B**

해설:

JSON은 데이터를 주고받을 때 자주 사용하는 텍스트 기반 형식입니다. API 응답이나 설정 파일에서 많이 사용됩니다.

---

### 문제 2 정답

\`\`\`python
import json

json_text = '{"name": "홍길동", "age": 30}'

data = json.loads(json_text)

print(data)
\`\`\`

해설:

JSON 문자열을 파이썬 객체로 변환할 때는 \`json.loads()\`를 사용합니다.

---

### 문제 3 정답

\`\`\`python
import json

data = {
    "name": "이서연",
    "grade": "VIP"
}

json_text = json.dumps(data, ensure_ascii=False)

print(json_text)
\`\`\`

해설:

한글을 사람이 읽을 수 있는 형태로 출력하려면 \`ensure_ascii=False\`를 사용합니다.

---

### 문제 4 정답

\`\`\`python
from datetime import datetime

date_text = "2026-06-15"
date_value = datetime.strptime(date_text, "%Y-%m-%d")

print(date_value)
\`\`\`

해설:

문자열을 날짜와 시간 객체로 변환할 때는 \`strptime()\`을 사용합니다.

---

### 문제 5 정답

\`\`\`python
from datetime import date, timedelta

today = date.today()
seven_days_ago = today - timedelta(days=7)

print(seven_days_ago)
\`\`\`

해설:

날짜를 더하거나 뺄 때는 \`timedelta\`를 사용합니다.

---

### 문제 6 정답

\`\`\`python
import re

text = "주문번호는 A001, A002, A003입니다."

orders = re.findall(r"A\\d+", text)

print(orders)
\`\`\`

해설:

\`A\\d+\`는 A 뒤에 숫자가 1개 이상 이어지는 패턴입니다.

---

### 문제 7 정답

\`\`\`python
import re

phone = "010-1234-5678"
clean_phone = re.sub(r"[^0-9]", "", phone)

print(clean_phone)
\`\`\`

해설:

\`[^0-9]\`는 숫자가 아닌 문자를 의미합니다. 숫자가 아닌 문자를 빈 문자열로 바꾸면 숫자만 남습니다.

---

### 문제 8 정답

정답: **B**

해설:

API 서버가 응답하지 않을 때 프로그램이 무한정 기다리지 않도록 \`timeout\`을 지정합니다.

---

### 문제 9 정답

\`\`\`python
import pandas as pd

df = pd.read_csv("orders.csv", encoding="utf-8")
\`\`\`

해설:

CSV 파일을 DataFrame으로 읽을 때는 \`pd.read_csv()\`를 사용합니다.

---

### 문제 10 정답

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "product": ["키보드", "마우스", "모니터"],
    "price": [30000, 15000, 200000]
})

result = df[df["price"] >= 10000]

print(result)
\`\`\`

해설:

pandas에서는 조건식을 사용해 조건에 맞는 행만 선택할 수 있습니다.

---

### 문제 11 정답

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "product": ["키보드", "마우스"],
    "price": [30000, 15000],
    "quantity": [2, 3]
})

df["total"] = df["price"] * df["quantity"]

print(df)
\`\`\`

해설:

DataFrame에서는 컬럼끼리 연산해서 새 컬럼을 만들 수 있습니다.

---

### 문제 12 정답

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "category": ["문구", "문구", "전자기기"],
    "total": [6000, 10000, 15000]
})

result = df.groupby("category")["total"].sum().reset_index()

print(result)
\`\`\`

해설:

그룹별 합계를 구할 때는 \`groupby()\`와 \`sum()\`을 함께 사용할 수 있습니다.

---

### 문제 13 정답

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "name": [" 홍길동", "김민수 "],
    "email": ["HONG@EXAMPLE.COM", "MINSU@EXAMPLE.COM"]
})

df["name"] = df["name"].str.strip()
df["email"] = df["email"].str.lower()

print(df)
\`\`\`

해설:

pandas에서 문자열 컬럼에 문자열 함수를 적용할 때는 \`.str\` 접근자를 사용합니다.

---

### 문제 14 정답

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "amount": ["35,000원", "12000", "8,500원"]
})

df["amount"] = df["amount"].str.replace(",", "", regex=False)
df["amount"] = df["amount"].str.replace("원", "", regex=False)
df["amount"] = pd.to_numeric(df["amount"], errors="coerce")

print(df)
\`\`\`

해설:

숫자가 아닌 쉼표와 원화 기호를 제거한 뒤 \`pd.to_numeric()\`으로 숫자형으로 변환합니다.

---

### 문제 15 정답

예시 답안:

\`\`\`text
결측치가 무엇을 의미하는지에 따라 처리 방법이 달라지기 때문이다.
예를 들어 포인트가 비어 있으면 0으로 채워도 될 수 있지만,
이름이나 주문일처럼 필수 정보가 비어 있는 경우 0으로 채우면 데이터 의미가 왜곡된다.
\`\`\`

해설:

결측치 처리는 데이터의 의미를 고려해야 합니다. 무조건 제거하거나 무조건 0으로 채우면 잘못된 분석 결과가 나올 수 있습니다.

---

## 다음 장 예고

다음 장에서는 **실무 코드 작성 습관**을 배웁니다.

지금까지는 파이썬 문법과 데이터 처리 방법을 배웠습니다. 하지만 실무에서는 코드가 “작동하는 것”만으로 충분하지 않습니다. 다른 사람이 읽을 수 있어야 하고, 나중에 수정하기 쉬워야 하며, 문제가 생겼을 때 원인을 추적할 수 있어야 합니다.

다음 장에서 다룰 내용은 다음과 같습니다.

\`\`\`text
- 읽기 좋은 코드 작성법
- 변수명, 함수명, 클래스명 짓기
- 타입 힌트 기초
- logging으로 로그 남기기
- 설정값 관리
- 이터레이터와 제너레이터 기초
\`\`\`

11장에서 배운 데이터 처리 코드는 12장에서 더 실무적인 형태로 정리됩니다. 같은 기능을 하더라도 더 읽기 쉽고, 더 안전하고, 더 유지보수하기 좋은 코드로 만드는 방법을 배우게 됩니다.
`;export{e as default};