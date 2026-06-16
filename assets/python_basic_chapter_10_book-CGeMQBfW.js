var e=`# 10장 파일 다루기

## 이 장에서 배울 내용

지금까지 우리는 파이썬의 기본 문법, 조건문과 반복문, 자료구조, 함수, 예외 처리, 객체지향 프로그래밍, 모듈과 패키지, 외부 라이브러리의 개념을 배웠습니다. 이제는 파이썬을 사용해 컴퓨터 안에 있는 실제 파일을 다루는 방법을 배웁니다.

많은 업무는 결국 파일을 읽고, 내용을 정리하고, 다시 파일로 저장하는 작업으로 이루어져 있습니다.

예를 들어 다음과 같은 일을 생각해 볼 수 있습니다.

\`\`\`text
- 텍스트 파일에서 필요한 문장 찾기
- 로그 파일에서 에러 메시지 확인하기
- 고객 명단 CSV 파일 읽기
- 특정 조건에 맞는 고객만 새 CSV로 저장하기
- 엑셀 파일에서 매출 데이터를 읽기
- 계산 결과를 새 엑셀 파일로 만들기
- 다운로드 폴더의 파일을 확장자별로 분류하기
- 파일명을 날짜 기준으로 일괄 변경하기
\`\`\`

이런 작업은 사람이 직접 할 수도 있습니다. 하지만 파일이 많아지고 데이터가 커지면 수작업은 오래 걸리고 실수도 늘어납니다. 파이썬을 사용하면 반복적인 파일 작업을 코드로 처리할 수 있습니다.

이 장에서는 다음 내용을 배웁니다.

- 파일을 읽고 쓰는 기본 개념 이해하기
- \`open()\` 함수와 \`with\` 문 사용하기
- 텍스트 파일을 읽고 쓰기
- CSV 파일을 읽고 쓰기
- \`openpyxl\`로 엑셀 파일을 읽고 쓰기
- \`os\`와 \`pathlib\`로 파일 경로 다루기
- 파일명 변경, 이동, 복사, 삭제 자동화하기
- 파일 처리 중 발생할 수 있는 예외 다루기

이 장의 목표는 단순히 파일을 여는 방법을 외우는 것이 아닙니다. 목표는 **파일을 안전하게 읽고, 필요한 데이터를 처리하고, 결과를 다시 저장하는 흐름**을 이해하는 것입니다.

---

## 10.1 텍스트 파일 읽고 쓰기

### 10.1.1 파일 처리의 개념

프로그램은 실행되는 동안 변수에 값을 저장합니다. 하지만 변수에 저장된 값은 프로그램이 종료되면 사라집니다.

예를 들어 다음 코드를 실행해 봅시다.

\`\`\`python
message = "오늘 처리한 주문 수: 25건"
print(message)
\`\`\`

위 코드는 화면에 문장을 출력합니다. 하지만 프로그램이 끝나면 \`message\` 변수도 사라집니다. 나중에 다시 확인하려면 같은 코드를 다시 실행해야 합니다.

반면 파일에 저장하면 프로그램이 종료된 뒤에도 결과를 보관할 수 있습니다.

\`\`\`text
result.txt
\`\`\`

파일은 데이터를 오래 보관하기 위한 저장 공간입니다. 파이썬은 파일을 열고, 읽고, 쓰고, 닫는 기능을 제공합니다.

파일 처리에서 가장 기본이 되는 작업은 다음 네 가지입니다.

\`\`\`text
1. 파일 열기
2. 파일 읽기 또는 쓰기
3. 필요한 처리 하기
4. 파일 닫기
\`\`\`

파이썬에서는 이 과정을 \`open()\` 함수와 \`with\` 문을 사용해서 처리합니다.

---

### 10.1.2 파일을 읽는다는 것과 쓴다는 것

파일을 다룬다는 말은 크게 두 가지 의미로 나눌 수 있습니다.

첫 번째는 **파일 읽기**입니다.

파일 읽기는 이미 존재하는 파일의 내용을 파이썬 프로그램 안으로 가져오는 작업입니다.

예를 들어 \`memo.txt\` 파일에 다음 내용이 있다고 가정해 봅시다.

\`\`\`text
오늘 회의 내용 정리
내일까지 보고서 작성
\`\`\`

파이썬은 이 파일을 열어 내용을 문자열로 읽어올 수 있습니다.

두 번째는 **파일 쓰기**입니다.

파일 쓰기는 파이썬 프로그램에서 만든 내용을 파일로 저장하는 작업입니다.

예를 들어 다음과 같은 결과를 파일로 저장할 수 있습니다.

\`\`\`text
총 매출: 350000원
처리된 주문 수: 27건
실패한 주문 수: 2건
\`\`\`

실무에서는 읽기와 쓰기가 함께 사용되는 경우가 많습니다.

\`\`\`text
기존 파일 읽기 → 필요한 내용 처리 → 새 파일로 저장
\`\`\`

이 흐름은 텍스트 파일뿐 아니라 CSV, 엑셀, JSON 파일 처리에서도 반복해서 사용됩니다.

---

### 10.1.3 \`open()\` 함수

파이썬에서 파일을 열 때는 \`open()\` 함수를 사용합니다.

기본 형태는 다음과 같습니다.

\`\`\`python
file = open("파일이름", "모드", encoding="인코딩")
\`\`\`

예를 들어 \`memo.txt\` 파일을 읽기 모드로 열려면 다음과 같이 작성합니다.

\`\`\`python
file = open("memo.txt", "r", encoding="utf-8")
\`\`\`

여기서 각각의 의미는 다음과 같습니다.

| 항목 | 의미 |
|---|---|
| \`"memo.txt"\` | 열고 싶은 파일 이름 또는 경로 |
| \`"r"\` | 파일을 읽기 모드로 연다는 뜻 |
| \`encoding="utf-8"\` | 문자를 UTF-8 방식으로 해석한다는 뜻 |

\`open()\` 함수는 파일 객체를 반환합니다. 파일 객체는 열린 파일을 가리키는 객체입니다. 이 객체를 사용해서 파일 내용을 읽거나 쓸 수 있습니다.

---

### 10.1.4 파일 모드

파일을 열 때는 어떤 목적으로 열 것인지 정해야 합니다. 이것을 **파일 모드**라고 합니다.

기초 단계에서 자주 사용하는 모드는 다음과 같습니다.

| 모드 | 의미 | 파일이 없을 때 | 기존 내용 |
|---|---|---|---|
| \`r\` | 읽기 | 에러 발생 | 유지 |
| \`w\` | 쓰기 | 새로 생성 | 모두 지우고 새로 씀 |
| \`a\` | 이어쓰기 | 새로 생성 | 기존 내용 뒤에 추가 |
| \`x\` | 새 파일 만들기 | 새로 생성 | 이미 있으면 에러 |

가장 많이 사용하는 모드는 \`r\`, \`w\`, \`a\`입니다.

읽기 모드는 기존 파일을 읽을 때 사용합니다.

\`\`\`python
file = open("memo.txt", "r", encoding="utf-8")
\`\`\`

쓰기 모드는 파일에 새 내용을 저장할 때 사용합니다.

\`\`\`python
file = open("result.txt", "w", encoding="utf-8")
\`\`\`

주의할 점은 \`w\` 모드입니다. \`w\` 모드는 파일이 이미 있으면 기존 내용을 모두 지우고 새로 씁니다.

이어쓰기 모드는 기존 내용 뒤에 내용을 추가할 때 사용합니다.

\`\`\`python
file = open("log.txt", "a", encoding="utf-8")
\`\`\`

로그 파일처럼 기존 기록을 유지하면서 새 기록을 추가할 때 유용합니다.

---

### 10.1.5 파일을 닫아야 하는 이유

\`open()\`으로 파일을 열면 작업이 끝난 뒤 파일을 닫아야 합니다.

\`\`\`python
file = open("memo.txt", "r", encoding="utf-8")
content = file.read()
file.close()
\`\`\`

파일을 닫는 이유는 다음과 같습니다.

\`\`\`text
- 운영체제에 사용이 끝났다고 알려야 한다.
- 쓰기 작업이 제대로 저장되도록 해야 한다.
- 다른 프로그램이 파일을 사용할 수 있게 해야 한다.
- 불필요한 자원 사용을 줄여야 한다.
\`\`\`

하지만 매번 \`close()\`를 직접 작성하면 실수로 빠뜨릴 수 있습니다. 예외가 발생하면 \`close()\`가 실행되지 않을 수도 있습니다.

그래서 실무에서는 보통 \`with\` 문을 사용합니다.

---

### 10.1.6 \`with\` 문

\`with\` 문을 사용하면 파일을 사용한 뒤 자동으로 닫을 수 있습니다.

\`\`\`python
with open("memo.txt", "r", encoding="utf-8") as file:
    content = file.read()

print(content)
\`\`\`

위 코드에서 파일은 \`with\` 블록 안에서 사용됩니다. 블록이 끝나면 파이썬이 자동으로 파일을 닫습니다.

\`with\` 문을 사용하면 다음 장점이 있습니다.

\`\`\`text
- 파일을 닫는 코드를 따로 작성하지 않아도 된다.
- 예외가 발생해도 파일을 안전하게 정리할 수 있다.
- 파일을 사용하는 범위가 명확해진다.
- 실무 코드에서 더 안전하고 읽기 좋다.
\`\`\`

이 책에서는 파일을 다룰 때 대부분 \`with\` 문을 사용합니다.

---

### 10.1.7 텍스트 파일 전체 읽기

파일 전체 내용을 한 번에 읽을 때는 \`read()\`를 사용합니다.

먼저 \`memo.txt\` 파일에 다음 내용이 있다고 가정해 봅시다.

\`\`\`text
파이썬 파일 처리 연습
텍스트 파일을 읽고 있습니다.
\`\`\`

이 파일을 읽는 코드는 다음과 같습니다.

\`\`\`python
with open("memo.txt", "r", encoding="utf-8") as file:
    content = file.read()

print(content)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
파이썬 파일 처리 연습
텍스트 파일을 읽고 있습니다.
\`\`\`

\`read()\`는 파일의 전체 내용을 하나의 문자열로 읽어옵니다.

파일이 작을 때는 \`read()\`를 사용해도 괜찮습니다. 하지만 파일이 매우 크다면 전체 내용을 한 번에 읽는 것이 부담이 될 수 있습니다. 큰 파일은 한 줄씩 읽는 방식이 더 안전합니다.

---

### 10.1.8 텍스트 파일 한 줄씩 읽기

파일을 한 줄씩 읽을 때는 반복문을 사용할 수 있습니다.

\`\`\`python
with open("memo.txt", "r", encoding="utf-8") as file:
    for line in file:
        print(line)
\`\`\`

파일 객체는 반복 가능한 객체입니다. 그래서 \`for\` 문으로 한 줄씩 읽을 수 있습니다.

다만 위 코드는 줄 사이에 빈 줄이 하나씩 더 보일 수 있습니다. 파일의 각 줄에는 줄바꿈 문자가 포함되어 있고, \`print()\`도 기본적으로 줄바꿈을 추가하기 때문입니다.

이럴 때는 \`strip()\`이나 \`rstrip()\`을 사용할 수 있습니다.

\`\`\`python
with open("memo.txt", "r", encoding="utf-8") as file:
    for line in file:
        print(line.rstrip())
\`\`\`

\`rstrip()\`은 문자열 오른쪽 끝의 공백과 줄바꿈을 제거합니다.

---

### 10.1.9 \`readline()\`과 \`readlines()\`

파일 읽기에는 \`readline()\`과 \`readlines()\`도 사용할 수 있습니다.

\`readline()\`은 한 줄만 읽습니다.

\`\`\`python
with open("memo.txt", "r", encoding="utf-8") as file:
    first_line = file.readline()

print(first_line)
\`\`\`

\`readlines()\`는 모든 줄을 리스트로 읽습니다.

\`\`\`python
with open("memo.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()

print(lines)
\`\`\`

예를 들어 파일 내용이 다음과 같다면,

\`\`\`text
첫 번째 줄
두 번째 줄
세 번째 줄
\`\`\`

\`readlines()\`의 결과는 다음과 비슷합니다.

\`\`\`python
["첫 번째 줄\\n", "두 번째 줄\\n", "세 번째 줄\\n"]
\`\`\`

각 줄 끝의 \`\\n\`은 줄바꿈 문자입니다.

기초 단계에서는 다음 기준으로 선택하면 됩니다.

| 방법 | 사용 상황 |
|---|---|
| \`read()\` | 파일 전체를 하나의 문자열로 읽고 싶을 때 |
| \`readline()\` | 한 줄만 읽고 싶을 때 |
| \`readlines()\` | 모든 줄을 리스트로 다루고 싶을 때 |
| \`for line in file\` | 큰 파일을 한 줄씩 안전하게 처리하고 싶을 때 |

---

### 10.1.10 텍스트 파일 쓰기

파일에 내용을 쓸 때는 \`w\` 모드를 사용합니다.

\`\`\`python
with open("result.txt", "w", encoding="utf-8") as file:
    file.write("파이썬 파일 쓰기 연습입니다.")
\`\`\`

이 코드를 실행하면 \`result.txt\` 파일이 생성되고, 파일 안에는 다음 내용이 저장됩니다.

\`\`\`text
파이썬 파일 쓰기 연습입니다.
\`\`\`

여러 줄을 쓰고 싶다면 줄바꿈 문자 \`\\n\`을 직접 넣어야 합니다.

\`\`\`python
with open("result.txt", "w", encoding="utf-8") as file:
    file.write("첫 번째 줄\\n")
    file.write("두 번째 줄\\n")
    file.write("세 번째 줄\\n")
\`\`\`

파일 내용은 다음과 같습니다.

\`\`\`text
첫 번째 줄
두 번째 줄
세 번째 줄
\`\`\`

\`write()\`는 자동으로 줄바꿈을 넣어주지 않습니다. 필요한 경우 직접 \`\\n\`을 넣어야 합니다.

---

### 10.1.11 기존 파일에 내용 추가하기

기존 파일의 내용을 유지하고 뒤에 새 내용을 추가하려면 \`a\` 모드를 사용합니다.

\`\`\`python
with open("log.txt", "a", encoding="utf-8") as file:
    file.write("프로그램 실행 시작\\n")
\`\`\`

다시 실행하면 같은 문장이 파일 뒤에 계속 추가됩니다.

\`\`\`text
프로그램 실행 시작
프로그램 실행 시작
프로그램 실행 시작
\`\`\`

\`a\` 모드는 로그 파일을 만들 때 자주 사용됩니다. 예를 들어 자동화 프로그램이 실행될 때마다 처리 결과를 기록할 수 있습니다.

\`\`\`python
with open("process.log", "a", encoding="utf-8") as file:
    file.write("sales.xlsx 파일 처리 완료\\n")
\`\`\`

---

### 10.1.12 여러 줄 쓰기

리스트에 있는 여러 줄을 파일에 쓰고 싶을 때는 반복문을 사용할 수 있습니다.

\`\`\`python
lines = [
    "고객명: 홍길동\\n",
    "등급: VIP\\n",
    "주문 수: 3건\\n"
]

with open("customer_summary.txt", "w", encoding="utf-8") as file:
    for line in lines:
        file.write(line)
\`\`\`

또는 \`writelines()\`를 사용할 수도 있습니다.

\`\`\`python
lines = [
    "고객명: 홍길동\\n",
    "등급: VIP\\n",
    "주문 수: 3건\\n"
]

with open("customer_summary.txt", "w", encoding="utf-8") as file:
    file.writelines(lines)
\`\`\`

주의할 점은 \`writelines()\`도 줄바꿈을 자동으로 넣어주지 않는다는 점입니다. 리스트의 각 문자열에 \`\\n\`이 포함되어 있어야 줄이 나뉩니다.

---

### 10.1.13 인코딩

텍스트 파일을 다룰 때는 인코딩이 중요합니다.

컴퓨터는 문자를 숫자로 저장합니다. 사람이 보는 글자를 컴퓨터가 저장할 수 있는 바이트로 바꾸는 규칙을 인코딩이라고 합니다.

파이썬에서 한글 텍스트 파일을 읽거나 쓸 때는 보통 다음처럼 \`encoding="utf-8"\`을 명시합니다.

\`\`\`python
with open("memo.txt", "r", encoding="utf-8") as file:
    content = file.read()
\`\`\`

파일을 만들 때도 인코딩을 명시하는 습관이 좋습니다.

\`\`\`python
with open("result.txt", "w", encoding="utf-8") as file:
    file.write("한글이 포함된 파일입니다.")
\`\`\`

인코딩을 맞추지 않으면 다음과 같은 문제가 생길 수 있습니다.

\`\`\`text
- 한글이 깨져 보인다.
- 파일을 읽는 중 에러가 발생한다.
- 다른 프로그램에서 파일을 열었을 때 글자가 이상하게 보인다.
\`\`\`

특히 CSV나 텍스트 파일을 다른 프로그램과 주고받을 때 인코딩 문제가 자주 발생합니다.

---

### 10.1.14 실무 예제: 처리 결과를 텍스트 파일로 저장하기

주문 처리 결과를 텍스트 파일로 저장하는 예제를 만들어 봅시다.

\`\`\`python
orders = [12000, 35000, 18000, 50000]

total_amount = sum(orders)
order_count = len(orders)
average_amount = total_amount / order_count

with open("order_report.txt", "w", encoding="utf-8") as file:
    file.write("주문 처리 결과\\n")
    file.write("---------------\\n")
    file.write(f"주문 건수: {order_count}건\\n")
    file.write(f"총 주문 금액: {total_amount}원\\n")
    file.write(f"평균 주문 금액: {average_amount:.0f}원\\n")
\`\`\`

실행 후 \`order_report.txt\` 파일을 열면 다음과 같은 내용을 확인할 수 있습니다.

\`\`\`text
주문 처리 결과
---------------
주문 건수: 4건
총 주문 금액: 115000원
평균 주문 금액: 28750원
\`\`\`

이 예제는 간단하지만 파일 처리의 핵심 흐름을 포함합니다.

\`\`\`text
데이터 준비 → 계산 → 파일 생성 → 결과 저장
\`\`\`

---

## 10.2 CSV 파일 다루기

### 10.2.1 CSV 파일이란?

CSV는 Comma-Separated Values의 줄임말입니다. 우리말로 하면 “쉼표로 구분된 값”이라는 뜻입니다.

CSV 파일은 표 형태 데이터를 텍스트로 저장하는 간단한 형식입니다.

예를 들어 고객 명단을 CSV로 표현하면 다음과 같습니다.

\`\`\`csv
name,email,grade
홍길동,hong@example.com,VIP
김민수,minsu@example.com,BASIC
이지영,jiyoung@example.com,VIP
\`\`\`

첫 번째 줄은 보통 헤더입니다.

\`\`\`csv
name,email,grade
\`\`\`

헤더는 각 열의 이름을 의미합니다.

그 아래 줄들은 실제 데이터입니다.

\`\`\`csv
홍길동,hong@example.com,VIP
김민수,minsu@example.com,BASIC
이지영,jiyoung@example.com,VIP
\`\`\`

CSV 파일은 엑셀에서도 열 수 있고, 파이썬에서도 쉽게 처리할 수 있습니다. 그래서 데이터 교환 형식으로 자주 사용됩니다.

---

### 10.2.2 CSV와 엑셀의 차이

CSV와 엑셀 파일은 모두 표 형태 데이터를 담을 수 있습니다. 하지만 둘은 다릅니다.

| 구분 | CSV | 엑셀 파일 |
|---|---|---|
| 확장자 | \`.csv\` | \`.xlsx\` |
| 저장 방식 | 텍스트 | 엑셀 전용 파일 형식 |
| 서식 | 거의 없음 | 글꼴, 색상, 셀 병합 등 가능 |
| 시트 | 기본적으로 하나 | 여러 시트 가능 |
| 용도 | 데이터 교환, 간단한 표 데이터 | 보고서, 서식 있는 문서, 복잡한 표 |

CSV는 단순합니다. 그래서 많은 시스템에서 쉽게 읽고 쓸 수 있습니다. 반면 엑셀 파일은 서식과 여러 시트를 사용할 수 있어 보고서 작성에 적합합니다.

파이썬에서 CSV를 다룰 때는 표준 라이브러리인 \`csv\` 모듈을 사용할 수 있습니다. 엑셀 파일을 다룰 때는 보통 \`openpyxl\` 같은 외부 라이브러리를 사용합니다.

---

### 10.2.3 \`csv\` 모듈

파이썬에는 CSV 파일을 다루기 위한 \`csv\` 모듈이 기본으로 들어 있습니다.

\`\`\`python
import csv
\`\`\`

\`csv\` 모듈을 사용하면 쉼표, 따옴표, 줄바꿈이 섞인 CSV 데이터를 직접 문자열로 나누는 것보다 안전하게 처리할 수 있습니다.

CSV 파일은 단순해 보이지만 실제로는 다음과 같은 경우가 있습니다.

\`\`\`csv
name,memo
홍길동,"서울, 부산 출장"
김민수,"우수 고객"
\`\`\`

위 데이터에서 \`"서울, 부산 출장"\` 안에는 쉼표가 들어 있습니다. 단순히 \`split(",")\`로 나누면 잘못 나뉠 수 있습니다. 이런 이유로 CSV 파일은 직접 문자열로 처리하기보다 \`csv\` 모듈을 사용하는 것이 좋습니다.

---

### 10.2.4 CSV 파일 읽기: 리스트 형태

먼저 리스트 형태로 CSV 파일을 읽어 봅시다.

\`customers.csv\` 파일이 다음과 같다고 가정합니다.

\`\`\`csv
name,email,grade
홍길동,hong@example.com,VIP
김민수,minsu@example.com,BASIC
이지영,jiyoung@example.com,VIP
\`\`\`

이 파일을 읽는 코드는 다음과 같습니다.

\`\`\`python
import csv

with open("customers.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)

    for row in reader:
        print(row)
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`python
['name', 'email', 'grade']
['홍길동', 'hong@example.com', 'VIP']
['김민수', 'minsu@example.com', 'BASIC']
['이지영', 'jiyoung@example.com', 'VIP']
\`\`\`

\`csv.reader()\`는 CSV 파일의 각 행을 리스트로 읽어옵니다.

첫 번째 행은 헤더이고, 그 다음 행부터 실제 데이터입니다.

---

### 10.2.5 헤더 건너뛰기

CSV 파일에서 첫 번째 줄이 헤더라면, 데이터 처리에서 헤더를 건너뛰고 싶을 수 있습니다.

\`\`\`python
import csv

with open("customers.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    header = next(reader)

    print("헤더:", header)

    for row in reader:
        print(row)
\`\`\`

\`next(reader)\`는 첫 번째 행을 읽어옵니다. 이후 반복문은 그 다음 행부터 처리합니다.

실행 결과는 다음과 비슷합니다.

\`\`\`text
헤더: ['name', 'email', 'grade']
['홍길동', 'hong@example.com', 'VIP']
['김민수', 'minsu@example.com', 'BASIC']
['이지영', 'jiyoung@example.com', 'VIP']
\`\`\`

\`next()\`는 반복 가능한 객체에서 다음 값을 하나 꺼내는 함수입니다. CSV 처리에서 헤더를 분리할 때 자주 사용됩니다.

---

### 10.2.6 CSV 파일 읽기: 딕셔너리 형태

CSV 파일에 헤더가 있다면 \`csv.DictReader\`를 사용하는 것이 편리합니다.

\`\`\`python
import csv

with open("customers.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)

    for row in reader:
        print(row["name"], row["email"], row["grade"])
\`\`\`

\`DictReader\`는 각 행을 딕셔너리처럼 다룰 수 있게 해줍니다.

예를 들어 첫 번째 데이터 행은 다음과 비슷하게 처리됩니다.

\`\`\`python
{
    "name": "홍길동",
    "email": "hong@example.com",
    "grade": "VIP"
}
\`\`\`

리스트 형태로 읽으면 \`row[0]\`, \`row[1]\`, \`row[2]\`처럼 인덱스로 접근해야 합니다.

\`\`\`python
print(row[0])
\`\`\`

하지만 딕셔너리 형태로 읽으면 열 이름으로 접근할 수 있습니다.

\`\`\`python
print(row["name"])
\`\`\`

실무에서는 열의 의미가 명확하게 보이는 \`DictReader\` 방식이 읽기 좋은 경우가 많습니다.

---

### 10.2.7 CSV 파일 쓰기: 리스트 형태

CSV 파일을 새로 만들 때는 \`csv.writer()\`를 사용할 수 있습니다.

\`\`\`python
import csv

with open("result.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)

    writer.writerow(["name", "email", "grade"])
    writer.writerow(["홍길동", "hong@example.com", "VIP"])
    writer.writerow(["김민수", "minsu@example.com", "BASIC"])
\`\`\`

실행 후 \`result.csv\` 파일을 열면 다음 내용이 저장됩니다.

\`\`\`csv
name,email,grade
홍길동,hong@example.com,VIP
김민수,minsu@example.com,BASIC
\`\`\`

여기서 \`newline=""\`은 CSV 파일을 쓸 때 불필요한 빈 줄이 생기는 것을 방지하기 위해 자주 사용합니다.

여러 행을 한 번에 쓰고 싶다면 \`writerows()\`를 사용할 수 있습니다.

\`\`\`python
import csv

rows = [
    ["name", "email", "grade"],
    ["홍길동", "hong@example.com", "VIP"],
    ["김민수", "minsu@example.com", "BASIC"],
]

with open("result.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(rows)
\`\`\`

---

### 10.2.8 CSV 파일 쓰기: 딕셔너리 형태

딕셔너리 데이터는 \`csv.DictWriter\`로 저장할 수 있습니다.

\`\`\`python
import csv

customers = [
    {"name": "홍길동", "email": "hong@example.com", "grade": "VIP"},
    {"name": "김민수", "email": "minsu@example.com", "grade": "BASIC"},
]

fieldnames = ["name", "email", "grade"]

with open("customers_result.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=fieldnames)

    writer.writeheader()
    writer.writerows(customers)
\`\`\`

\`fieldnames\`는 CSV 파일의 열 이름입니다.

\`writeheader()\`는 헤더 행을 씁니다.

\`writerows()\`는 딕셔너리 목록을 여러 행으로 저장합니다.

딕셔너리 데이터를 저장할 때는 열 이름과 딕셔너리의 key가 맞아야 합니다.

---

### 10.2.9 CSV 데이터 필터링

CSV 파일에서 특정 조건에 맞는 행만 골라 새 파일로 저장해 봅시다.

예를 들어 VIP 고객만 추출한다고 가정합니다.

\`\`\`python
import csv

vip_customers = []

with open("customers.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)

    for row in reader:
        if row["grade"] == "VIP":
            vip_customers.append(row)

fieldnames = ["name", "email", "grade"]

with open("vip_customers.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(vip_customers)
\`\`\`

이 코드는 다음 흐름으로 동작합니다.

\`\`\`text
1. customers.csv 파일을 연다.
2. 각 행을 딕셔너리로 읽는다.
3. grade 값이 VIP인 행만 리스트에 모은다.
4. vip_customers.csv 파일을 만든다.
5. VIP 고객 목록을 저장한다.
\`\`\`

이것이 파일 처리에서 매우 자주 사용되는 패턴입니다.

\`\`\`text
파일 읽기 → 조건 처리 → 새 파일 쓰기
\`\`\`

---

### 10.2.10 CSV 데이터 형 변환

CSV 파일에서 읽은 값은 기본적으로 문자열입니다.

예를 들어 다음 CSV가 있다고 가정합니다.

\`\`\`csv
product,price,quantity
키보드,30000,2
마우스,15000,3
모니터,200000,1
\`\`\`

\`price\`와 \`quantity\`는 숫자처럼 보이지만, CSV에서 읽으면 문자열입니다.

\`\`\`python
import csv

with open("orders.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)

    for row in reader:
        price = row["price"]
        quantity = row["quantity"]
        print(type(price), type(quantity))
\`\`\`

출력 결과는 다음과 같습니다.

\`\`\`text
<class 'str'> <class 'str'>
\`\`\`

계산하려면 정수로 변환해야 합니다.

\`\`\`python
import csv

with open("orders.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)

    for row in reader:
        price = int(row["price"])
        quantity = int(row["quantity"])
        total = price * quantity

        print(row["product"], total)
\`\`\`

실무에서 CSV 파일을 읽은 뒤 숫자 계산이 필요하다면 형 변환을 잊지 않아야 합니다.

---

### 10.2.11 실무 예제: 주문 CSV에서 총액 계산하기

주문 CSV를 읽고, 각 상품별 총액을 계산한 뒤 새 CSV로 저장해 봅시다.

입력 파일 \`orders.csv\`는 다음과 같습니다.

\`\`\`csv
product,price,quantity
키보드,30000,2
마우스,15000,3
모니터,200000,1
\`\`\`

코드는 다음과 같습니다.

\`\`\`python
import csv

result_rows = []

with open("orders.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)

    for row in reader:
        price = int(row["price"])
        quantity = int(row["quantity"])
        total = price * quantity

        result_rows.append({
            "product": row["product"],
            "price": price,
            "quantity": quantity,
            "total": total
        })

fieldnames = ["product", "price", "quantity", "total"]

with open("order_result.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(result_rows)
\`\`\`

결과 파일은 다음과 같습니다.

\`\`\`csv
product,price,quantity,total
키보드,30000,2,60000
마우스,15000,3,45000
모니터,200000,1,200000
\`\`\`

이 예제는 CSV 처리의 기본 흐름을 잘 보여줍니다.

\`\`\`text
CSV 읽기 → 문자열을 숫자로 변환 → 계산 → 새 CSV로 저장
\`\`\`

---

## 10.3 엑셀 파일 다루기

### 10.3.1 엑셀 파일을 코드로 다루는 이유

실무에서 엑셀은 매우 많이 사용됩니다. 매출, 고객 명단, 재고, 인사 정보, 보고서 등 많은 데이터가 엑셀 파일로 관리됩니다.

파이썬으로 엑셀 파일을 다룰 수 있으면 다음과 같은 일을 자동화할 수 있습니다.

\`\`\`text
- 매출 엑셀 파일에서 합계 계산하기
- 여러 엑셀 파일의 데이터를 하나로 합치기
- 특정 조건의 행만 골라 새 파일로 저장하기
- 보고서 양식에 결과 자동 입력하기
- 날짜별 엑셀 파일을 자동으로 생성하기
\`\`\`

이 장에서는 \`openpyxl\`을 사용합니다.

\`openpyxl\`은 엑셀의 \`.xlsx\` 파일을 읽고 쓸 수 있는 외부 라이브러리입니다. 9장에서 외부 라이브러리와 \`pip\`를 배웠으므로, 이제 실제 라이브러리를 사용해 파일을 처리해 봅니다.

---

### 10.3.2 \`openpyxl\` 설치

\`openpyxl\`은 표준 라이브러리가 아니므로 설치가 필요합니다.

터미널에서 다음 명령을 실행합니다.

\`\`\`bash
python -m pip install openpyxl
\`\`\`

설치 후 파이썬 코드에서 다음처럼 import할 수 있습니다.

\`\`\`python
import openpyxl
\`\`\`

또는 필요한 클래스와 함수를 직접 가져올 수도 있습니다.

\`\`\`python
from openpyxl import Workbook, load_workbook
\`\`\`

이 장에서는 주로 다음 두 가지를 사용합니다.

| 기능 | 용도 |
|---|---|
| \`Workbook\` | 새 엑셀 파일 만들기 |
| \`load_workbook\` | 기존 엑셀 파일 열기 |

---

### 10.3.3 워크북, 워크시트, 셀

엑셀 파일을 다룰 때는 세 가지 개념을 알아야 합니다.

\`\`\`text
워크북 → 엑셀 파일 전체
워크시트 → 엑셀 파일 안의 시트 하나
셀 → 데이터를 입력하는 칸 하나
\`\`\`

예를 들어 \`sales.xlsx\`라는 엑셀 파일이 있다고 합시다.

이 파일 전체가 워크북입니다.

파일 안에 \`1월\`, \`2월\`, \`3월\` 시트가 있다면 각각이 워크시트입니다.

각 시트 안의 \`A1\`, \`B2\`, \`C3\` 같은 칸이 셀입니다.

파이썬 코드로 표현하면 다음과 같은 흐름입니다.

\`\`\`python
from openpyxl import Workbook

workbook = Workbook()
worksheet = workbook.active
worksheet["A1"] = "상품명"
\`\`\`

---

### 10.3.4 새 엑셀 파일 만들기

새 엑셀 파일을 만들 때는 \`Workbook\`을 사용합니다.

\`\`\`python
from openpyxl import Workbook

workbook = Workbook()
worksheet = workbook.active

worksheet["A1"] = "상품명"
worksheet["B1"] = "가격"
worksheet["A2"] = "키보드"
worksheet["B2"] = 30000

workbook.save("products.xlsx")
\`\`\`

이 코드를 실행하면 \`products.xlsx\` 파일이 생성됩니다.

파일 내용은 다음과 같습니다.

| A | B |
|---|---|
| 상품명 | 가격 |
| 키보드 | 30000 |

\`workbook.active\`는 현재 활성화된 시트를 의미합니다. 새 워크북을 만들면 기본 시트가 하나 생성되며, 이 시트를 \`active\`로 가져올 수 있습니다.

---

### 10.3.5 시트 이름 바꾸기

기본 시트의 이름은 보통 \`Sheet\`입니다. 시트 이름은 \`title\` 속성으로 변경할 수 있습니다.

\`\`\`python
from openpyxl import Workbook

workbook = Workbook()
worksheet = workbook.active
worksheet.title = "상품목록"

worksheet["A1"] = "상품명"
worksheet["B1"] = "가격"
worksheet["A2"] = "키보드"
worksheet["B2"] = 30000

workbook.save("products.xlsx")
\`\`\`

이제 시트 이름은 \`상품목록\`이 됩니다.

새 시트를 추가할 수도 있습니다.

\`\`\`python
summary_sheet = workbook.create_sheet("요약")
summary_sheet["A1"] = "요약 정보"
\`\`\`

여러 시트를 가진 보고서를 만들 때 유용합니다.

---

### 10.3.6 행 단위로 데이터 추가하기

엑셀에 데이터를 한 행씩 추가할 때는 \`append()\`를 사용할 수 있습니다.

\`\`\`python
from openpyxl import Workbook

workbook = Workbook()
worksheet = workbook.active
worksheet.title = "매출"

worksheet.append(["상품명", "가격", "수량"])
worksheet.append(["키보드", 30000, 2])
worksheet.append(["마우스", 15000, 3])
worksheet.append(["모니터", 200000, 1])

workbook.save("sales.xlsx")
\`\`\`

\`append()\`는 리스트에 담긴 값을 한 행으로 추가합니다.

결과는 다음과 같습니다.

| 상품명 | 가격 | 수량 |
|---|---:|---:|
| 키보드 | 30000 | 2 |
| 마우스 | 15000 | 3 |
| 모니터 | 200000 | 1 |

셀 주소를 하나씩 지정하는 방식보다 행 단위 데이터 추가에 더 편리합니다.

---

### 10.3.7 기존 엑셀 파일 열기

기존 엑셀 파일을 열 때는 \`load_workbook()\`을 사용합니다.

\`\`\`python
from openpyxl import load_workbook

workbook = load_workbook("sales.xlsx")
worksheet = workbook.active

print(worksheet["A1"].value)
print(worksheet["B2"].value)
\`\`\`

셀의 값을 읽을 때는 \`.value\`를 사용합니다.

\`\`\`python
worksheet["A1"].value
\`\`\`

또는 \`cell()\` 메서드로 행과 열 번호를 사용해 접근할 수도 있습니다.

\`\`\`python
value = worksheet.cell(row=1, column=1).value
print(value)
\`\`\`

엑셀에서 \`A1\`은 \`row=1\`, \`column=1\`과 같습니다.

---

### 10.3.8 시트 선택하기

워크북에 여러 시트가 있을 때는 시트 이름으로 선택할 수 있습니다.

\`\`\`python
from openpyxl import load_workbook

workbook = load_workbook("sales.xlsx")
worksheet = workbook["매출"]

print(worksheet["A1"].value)
\`\`\`

현재 워크북에 어떤 시트가 있는지 확인하려면 \`sheetnames\`를 사용합니다.

\`\`\`python
print(workbook.sheetnames)
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`python
['매출', '요약']
\`\`\`

실무에서는 시트 이름이 바뀌거나 누락될 수 있습니다. 따라서 특정 시트를 열기 전에 시트 이름을 확인하는 습관이 좋습니다.

\`\`\`python
if "매출" in workbook.sheetnames:
    worksheet = workbook["매출"]
else:
    print("매출 시트가 없습니다.")
\`\`\`

---

### 10.3.9 행 단위로 엑셀 데이터 읽기

엑셀 데이터를 여러 행으로 읽을 때는 \`iter_rows()\`를 사용할 수 있습니다.

\`\`\`python
from openpyxl import load_workbook

workbook = load_workbook("sales.xlsx")
worksheet = workbook.active

for row in worksheet.iter_rows(values_only=True):
    print(row)
\`\`\`

\`values_only=True\`를 사용하면 셀 객체가 아니라 셀 값만 가져옵니다.

결과는 다음과 비슷합니다.

\`\`\`python
('상품명', '가격', '수량')
('키보드', 30000, 2)
('마우스', 15000, 3)
('모니터', 200000, 1)
\`\`\`

첫 번째 행이 헤더라면 다음처럼 건너뛸 수 있습니다.

\`\`\`python
rows = list(worksheet.iter_rows(values_only=True))
header = rows[0]
data_rows = rows[1:]

print(header)
print(data_rows)
\`\`\`

하지만 파일이 매우 크다면 전체를 리스트로 바꾸기보다 반복문 안에서 처리하는 것이 좋습니다.

---

### 10.3.10 엑셀 데이터 계산하기

엑셀 파일에서 가격과 수량을 읽어 총액을 계산해 봅시다.

\`sales.xlsx\` 파일의 구조가 다음과 같다고 가정합니다.

| 상품명 | 가격 | 수량 |
|---|---:|---:|
| 키보드 | 30000 | 2 |
| 마우스 | 15000 | 3 |
| 모니터 | 200000 | 1 |

코드는 다음과 같습니다.

\`\`\`python
from openpyxl import load_workbook

workbook = load_workbook("sales.xlsx")
worksheet = workbook.active

total_sales = 0

for row in worksheet.iter_rows(min_row=2, values_only=True):
    product, price, quantity = row
    amount = price * quantity
    total_sales += amount

print("총 매출:", total_sales)
\`\`\`

\`min_row=2\`는 두 번째 행부터 읽겠다는 뜻입니다. 첫 번째 행이 헤더이기 때문에 데이터만 처리하려고 이렇게 작성했습니다.

---

### 10.3.11 계산 결과를 새 엑셀 파일로 저장하기

이번에는 입력 파일을 읽고, 총액 컬럼을 추가한 새 엑셀 파일을 만들어 봅시다.

\`\`\`python
from openpyxl import load_workbook, Workbook

input_workbook = load_workbook("sales.xlsx")
input_sheet = input_workbook.active

output_workbook = Workbook()
output_sheet = output_workbook.active
output_sheet.title = "매출결과"

output_sheet.append(["상품명", "가격", "수량", "총액"])

for row in input_sheet.iter_rows(min_row=2, values_only=True):
    product, price, quantity = row
    total = price * quantity
    output_sheet.append([product, price, quantity, total])

output_workbook.save("sales_result.xlsx")
\`\`\`

이 코드는 다음 흐름으로 동작합니다.

\`\`\`text
1. 기존 sales.xlsx 파일을 연다.
2. 새 엑셀 파일을 만든다.
3. 결과 파일에 헤더를 쓴다.
4. 기존 파일의 각 행을 읽는다.
5. 가격과 수량을 곱해 총액을 계산한다.
6. 결과 파일에 한 행씩 추가한다.
7. sales_result.xlsx로 저장한다.
\`\`\`

---

### 10.3.12 간단한 엑셀 서식 적용하기

보고서 파일을 만들 때는 헤더를 구분하기 위해 굵게 표시하거나 열 너비를 조정할 수 있습니다.

\`\`\`python
from openpyxl import Workbook
from openpyxl.styles import Font

workbook = Workbook()
worksheet = workbook.active
worksheet.title = "보고서"

worksheet.append(["상품명", "가격", "수량", "총액"])
worksheet.append(["키보드", 30000, 2, 60000])
worksheet.append(["마우스", 15000, 3, 45000])

for cell in worksheet[1]:
    cell.font = Font(bold=True)

worksheet.column_dimensions["A"].width = 15
worksheet.column_dimensions["B"].width = 12
worksheet.column_dimensions["C"].width = 10
worksheet.column_dimensions["D"].width = 12

workbook.save("report.xlsx")
\`\`\`

이 예제에서는 첫 번째 행의 글자를 굵게 만들고, 각 열의 너비를 조정했습니다.

이 장에서는 서식을 깊게 다루지는 않습니다. 중요한 것은 엑셀 파일도 파이썬 코드로 만들고 수정할 수 있다는 점입니다.

---

### 10.3.13 실무 예제: 월별 매출 보고서 만들기

월별 매출 데이터를 읽어 총 매출을 계산하고, 요약 시트를 가진 보고서 파일을 만들어 봅시다.

입력 파일 \`monthly_sales.xlsx\`의 \`매출\` 시트가 다음과 같다고 가정합니다.

| 날짜 | 상품명 | 가격 | 수량 |
|---|---|---:|---:|
| 2026-06-01 | 키보드 | 30000 | 2 |
| 2026-06-02 | 마우스 | 15000 | 3 |
| 2026-06-03 | 모니터 | 200000 | 1 |

코드는 다음과 같습니다.

\`\`\`python
from openpyxl import load_workbook, Workbook
from openpyxl.styles import Font

input_workbook = load_workbook("monthly_sales.xlsx")
input_sheet = input_workbook["매출"]

report_workbook = Workbook()
detail_sheet = report_workbook.active
detail_sheet.title = "상세"
summary_sheet = report_workbook.create_sheet("요약")

detail_sheet.append(["날짜", "상품명", "가격", "수량", "총액"])

total_sales = 0
order_count = 0

for row in input_sheet.iter_rows(min_row=2, values_only=True):
    date, product, price, quantity = row
    amount = price * quantity
    total_sales += amount
    order_count += 1

    detail_sheet.append([date, product, price, quantity, amount])

summary_sheet["A1"] = "월별 매출 요약"
summary_sheet["A2"] = "주문 건수"
summary_sheet["B2"] = order_count
summary_sheet["A3"] = "총 매출"
summary_sheet["B3"] = total_sales

summary_sheet["A1"].font = Font(bold=True)

report_workbook.save("monthly_sales_report.xlsx")
\`\`\`

이 예제는 엑셀 자동화의 기본 구조를 보여줍니다.

\`\`\`text
기존 엑셀 읽기 → 상세 데이터 처리 → 요약 계산 → 새 엑셀 보고서 저장
\`\`\`

---

## 10.4 파일과 폴더 자동화

### 10.4.1 파일 경로란?

파일 경로는 파일이나 폴더의 위치를 나타내는 문자열입니다.

예를 들어 다음은 파일 경로입니다.

\`\`\`text
report.txt
./data/customers.csv
C:\\Users\\user\\Downloads\\sales.xlsx
/home/user/downloads/sales.xlsx
\`\`\`

파일 경로는 크게 두 종류로 나눌 수 있습니다.

\`\`\`text
상대 경로
절대 경로
\`\`\`

상대 경로는 현재 작업 위치를 기준으로 한 경로입니다.

\`\`\`text
./data/customers.csv
\`\`\`

절대 경로는 컴퓨터의 루트 위치부터 전체 위치를 적은 경로입니다.

\`\`\`text
C:\\Users\\user\\Downloads\\sales.xlsx
\`\`\`

또는 리눅스와 macOS에서는 다음과 같은 형태를 사용합니다.

\`\`\`text
/home/user/downloads/sales.xlsx
\`\`\`

운영체제마다 경로 구분자가 다를 수 있으므로, 실무에서는 문자열을 직접 이어붙이기보다 \`pathlib\`을 사용하는 것이 좋습니다.

---

### 10.4.2 현재 작업 폴더 확인하기

현재 작업 폴더는 파이썬 프로그램이 기준으로 삼는 폴더입니다.

\`pathlib\`을 사용하면 현재 작업 폴더를 확인할 수 있습니다.

\`\`\`python
from pathlib import Path

current_dir = Path.cwd()
print(current_dir)
\`\`\`

\`Path.cwd()\`는 current working directory, 즉 현재 작업 폴더를 의미합니다.

상대 경로로 파일을 열 때는 현재 작업 폴더가 기준이 됩니다.

\`\`\`python
with open("memo.txt", "r", encoding="utf-8") as file:
    content = file.read()
\`\`\`

위 코드는 현재 작업 폴더 안의 \`memo.txt\` 파일을 찾습니다. 만약 현재 작업 폴더에 파일이 없으면 \`FileNotFoundError\`가 발생합니다.

---

### 10.4.3 \`os\` 모듈과 \`pathlib\`

파이썬에서 파일과 폴더를 다룰 때는 \`os\` 모듈과 \`pathlib\`을 사용할 수 있습니다.

\`os\`는 오래전부터 사용된 표준 라이브러리입니다.

\`\`\`python
import os

print(os.getcwd())
\`\`\`

\`pathlib\`은 파일 경로를 객체처럼 다룰 수 있게 해주는 표준 라이브러리입니다.

\`\`\`python
from pathlib import Path

path = Path("data") / "customers.csv"
print(path)
\`\`\`

이 책에서는 가능하면 \`pathlib\`을 중심으로 설명합니다. \`pathlib\`을 사용하면 경로를 문자열로 직접 조합하는 것보다 읽기 쉽고, 운영체제별 경로 차이를 줄일 수 있습니다.

---

### 10.4.4 경로 만들기

\`pathlib\`의 \`Path\` 객체를 사용하면 경로를 쉽게 만들 수 있습니다.

\`\`\`python
from pathlib import Path

file_path = Path("data") / "customers.csv"
print(file_path)
\`\`\`

\`/\` 연산자는 경로를 연결합니다.

\`\`\`python
base_dir = Path("reports")
file_path = base_dir / "sales_report.xlsx"

print(file_path)
\`\`\`

문자열을 직접 연결하면 운영체제별 구분자를 신경 써야 합니다.

\`\`\`python
file_path = "reports" + "/" + "sales_report.xlsx"
\`\`\`

하지만 \`Path\`를 사용하면 더 명확하게 표현할 수 있습니다.

\`\`\`python
file_path = Path("reports") / "sales_report.xlsx"
\`\`\`

---

### 10.4.5 파일과 폴더 존재 여부 확인하기

파일이 있는지 확인할 때는 \`exists()\`를 사용할 수 있습니다.

\`\`\`python
from pathlib import Path

file_path = Path("memo.txt")

if file_path.exists():
    print("파일이 있습니다.")
else:
    print("파일이 없습니다.")
\`\`\`

파일인지 폴더인지 확인할 수도 있습니다.

\`\`\`python
path = Path("memo.txt")

print(path.is_file())
print(path.is_dir())
\`\`\`

실무에서는 파일을 열기 전에 존재 여부를 확인하는 경우가 많습니다.

\`\`\`python
from pathlib import Path

file_path = Path("sales.xlsx")

if not file_path.exists():
    print("매출 파일이 없습니다.")
else:
    print("매출 파일을 처리합니다.")
\`\`\`

---

### 10.4.6 폴더 만들기

새 폴더를 만들 때는 \`mkdir()\`을 사용합니다.

\`\`\`python
from pathlib import Path

folder = Path("reports")
folder.mkdir()
\`\`\`

이미 폴더가 있으면 에러가 발생할 수 있습니다. 실무에서는 보통 다음처럼 작성합니다.

\`\`\`python
from pathlib import Path

folder = Path("reports")
folder.mkdir(exist_ok=True)
\`\`\`

\`exist_ok=True\`는 폴더가 이미 있어도 에러를 발생시키지 말라는 뜻입니다.

중간 폴더까지 한 번에 만들고 싶다면 \`parents=True\`를 사용합니다.

\`\`\`python
folder = Path("reports") / "2026" / "06"
folder.mkdir(parents=True, exist_ok=True)
\`\`\`

이 코드는 \`reports/2026/06\` 폴더를 만듭니다. 중간 폴더가 없으면 함께 생성합니다.

---

### 10.4.7 폴더 안의 파일 목록 확인하기

폴더 안에 있는 파일과 폴더를 확인하려면 \`iterdir()\`를 사용할 수 있습니다.

\`\`\`python
from pathlib import Path

folder = Path(".")

for path in folder.iterdir():
    print(path)
\`\`\`

현재 폴더 안의 항목들이 출력됩니다.

파일만 출력하고 싶다면 \`is_file()\`을 사용할 수 있습니다.

\`\`\`python
from pathlib import Path

folder = Path(".")

for path in folder.iterdir():
    if path.is_file():
        print(path.name)
\`\`\`

\`path.name\`은 파일명만 가져옵니다.

---

### 10.4.8 특정 확장자 파일 찾기

특정 확장자의 파일만 찾고 싶을 때는 \`glob()\`을 사용할 수 있습니다.

\`\`\`python
from pathlib import Path

folder = Path("downloads")

for file_path in folder.glob("*.xlsx"):
    print(file_path.name)
\`\`\`

위 코드는 \`downloads\` 폴더 안의 \`.xlsx\` 파일을 찾습니다.

하위 폴더까지 모두 찾고 싶다면 \`rglob()\`을 사용할 수 있습니다.

\`\`\`python
from pathlib import Path

folder = Path("downloads")

for file_path in folder.rglob("*.xlsx"):
    print(file_path)
\`\`\`

\`glob()\`은 현재 폴더 기준 검색이고, \`rglob()\`은 하위 폴더까지 재귀적으로 검색합니다.

---

### 10.4.9 파일명과 확장자 다루기

\`Path\` 객체는 파일명과 확장자를 쉽게 분리할 수 있습니다.

\`\`\`python
from pathlib import Path

file_path = Path("reports/sales_2026_06.xlsx")

print(file_path.name)
print(file_path.stem)
print(file_path.suffix)
print(file_path.parent)
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
sales_2026_06.xlsx
sales_2026_06
.xlsx
reports
\`\`\`

각 속성의 의미는 다음과 같습니다.

| 속성 | 의미 |
|---|---|
| \`name\` | 파일명 전체 |
| \`stem\` | 확장자를 제외한 파일명 |
| \`suffix\` | 확장자 |
| \`parent\` | 부모 폴더 |

파일명을 일괄 변경하거나 확장자별로 분류할 때 자주 사용합니다.

---

### 10.4.10 파일명 변경하기

파일명을 변경할 때는 \`rename()\`을 사용할 수 있습니다.

\`\`\`python
from pathlib import Path

old_path = Path("old_name.txt")
new_path = Path("new_name.txt")

old_path.rename(new_path)
\`\`\`

파일명 앞에 접두어를 붙이고 싶다면 다음처럼 작성할 수 있습니다.

\`\`\`python
from pathlib import Path

file_path = Path("report.txt")
new_path = file_path.with_name("2026_" + file_path.name)

file_path.rename(new_path)
\`\`\`

\`with_name()\`은 같은 폴더 안에서 파일명만 바꾼 새 경로를 만듭니다.

---

### 10.4.11 파일 이동과 복사

파일을 이동하거나 복사할 때는 \`shutil\` 모듈을 사용할 수 있습니다.

\`\`\`python
import shutil
from pathlib import Path

source = Path("report.txt")
target = Path("reports") / "report.txt"

shutil.move(source, target)
\`\`\`

파일을 복사하려면 \`shutil.copy2()\`를 사용할 수 있습니다.

\`\`\`python
import shutil
from pathlib import Path

source = Path("report.txt")
target = Path("backup") / "report.txt"

shutil.copy2(source, target)
\`\`\`

\`move()\`는 원본 파일을 이동합니다. \`copy2()\`는 원본 파일을 남겨 두고 복사본을 만듭니다.

실무에서 중요한 파일을 처리할 때는 바로 이동하거나 삭제하기보다 먼저 복사본을 만들어 두는 것이 안전합니다.

---

### 10.4.12 파일 삭제하기

파일을 삭제할 때는 \`unlink()\`를 사용할 수 있습니다.

\`\`\`python
from pathlib import Path

file_path = Path("old_file.txt")
file_path.unlink()
\`\`\`

삭제는 되돌리기 어려울 수 있으므로 주의해야 합니다. 파일이 있는지 확인한 뒤 삭제하는 것이 좋습니다.

\`\`\`python
from pathlib import Path

file_path = Path("old_file.txt")

if file_path.exists():
    file_path.unlink()
    print("파일을 삭제했습니다.")
else:
    print("삭제할 파일이 없습니다.")
\`\`\`

실무에서는 삭제보다 \`archive\` 폴더로 이동하는 방식이 더 안전할 때가 많습니다.

---

### 10.4.13 실무 예제: 다운로드 폴더 파일 분류하기

다운로드 폴더에 여러 파일이 섞여 있다고 가정합니다.

\`\`\`text
report.xlsx
photo.png
memo.txt
sales.csv
chart.jpg
\`\`\`

확장자별로 폴더를 만들어 파일을 이동해 봅시다.

\`\`\`python
import shutil
from pathlib import Path

source_folder = Path("downloads")

extension_map = {
    ".xlsx": "excel",
    ".csv": "csv",
    ".txt": "text",
    ".png": "images",
    ".jpg": "images",
}

for file_path in source_folder.iterdir():
    if not file_path.is_file():
        continue

    extension = file_path.suffix.lower()
    folder_name = extension_map.get(extension, "others")
    target_folder = source_folder / folder_name
    target_folder.mkdir(exist_ok=True)

    target_path = target_folder / file_path.name
    shutil.move(file_path, target_path)
\`\`\`

이 코드는 다음 흐름으로 동작합니다.

\`\`\`text
1. downloads 폴더의 항목을 하나씩 확인한다.
2. 파일이 아니면 건너뛴다.
3. 확장자를 확인한다.
4. 확장자에 맞는 폴더 이름을 정한다.
5. 폴더가 없으면 만든다.
6. 파일을 해당 폴더로 이동한다.
\`\`\`

파일 자동화에서 매우 자주 쓰이는 패턴입니다.

---

### 10.4.14 실무 예제: 파일명 일괄 변경하기

특정 폴더 안의 \`.txt\` 파일 이름 앞에 날짜를 붙여 봅시다.

\`\`\`python
from pathlib import Path

folder = Path("documents")
prefix = "2026_06_"

for file_path in folder.glob("*.txt"):
    new_name = prefix + file_path.name
    new_path = file_path.with_name(new_name)
    file_path.rename(new_path)
\`\`\`

예를 들어 다음 파일들이 있다면,

\`\`\`text
memo.txt
meeting.txt
summary.txt
\`\`\`

실행 후 다음처럼 변경됩니다.

\`\`\`text
2026_06_memo.txt
2026_06_meeting.txt
2026_06_summary.txt
\`\`\`

파일명 변경은 실수하면 원래 이름을 되돌리기 어려울 수 있습니다. 따라서 실제 실행 전에 변경될 이름을 먼저 출력해 보는 것이 좋습니다.

\`\`\`python
from pathlib import Path

folder = Path("documents")
prefix = "2026_06_"

for file_path in folder.glob("*.txt"):
    new_name = prefix + file_path.name
    new_path = file_path.with_name(new_name)
    print(file_path, "->", new_path)
\`\`\`

출력 결과를 확인한 뒤 문제가 없을 때 \`rename()\`을 실행하는 방식이 안전합니다.

---

## 10.5 파일 처리 예외 처리

### 10.5.1 파일 처리에서 예외가 자주 발생하는 이유

파일 처리는 외부 환경에 의존합니다. 코드가 맞아도 파일이 없거나, 권한이 없거나, 인코딩이 다르면 에러가 발생할 수 있습니다.

예를 들어 다음과 같은 상황이 있습니다.

\`\`\`text
- 읽으려는 파일이 없다.
- 파일 이름을 잘못 입력했다.
- 다른 프로그램이 파일을 사용 중이다.
- 파일을 읽을 권한이 없다.
- 한글 인코딩이 맞지 않는다.
- CSV 파일의 열 이름이 예상과 다르다.
- 엑셀 파일에 필요한 시트가 없다.
\`\`\`

파일 처리 코드는 이런 상황을 고려해야 합니다. 예외 처리를 하지 않으면 프로그램이 중간에 멈출 수 있습니다.

---

### 10.5.2 \`FileNotFoundError\`

존재하지 않는 파일을 읽으려고 하면 \`FileNotFoundError\`가 발생합니다.

\`\`\`python
with open("missing.txt", "r", encoding="utf-8") as file:
    content = file.read()
\`\`\`

파일이 없을 수 있다면 예외 처리를 할 수 있습니다.

\`\`\`python
try:
    with open("missing.txt", "r", encoding="utf-8") as file:
        content = file.read()
except FileNotFoundError:
    print("파일을 찾을 수 없습니다.")
\`\`\`

또는 파일을 열기 전에 존재 여부를 확인할 수도 있습니다.

\`\`\`python
from pathlib import Path

file_path = Path("missing.txt")

if file_path.exists():
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()
else:
    print("파일이 없습니다.")
\`\`\`

두 방식은 상황에 따라 선택할 수 있습니다.

---

### 10.5.3 \`PermissionError\`

파일을 읽거나 쓸 권한이 없으면 \`PermissionError\`가 발생할 수 있습니다.

예를 들어 다음 상황에서 발생할 수 있습니다.

\`\`\`text
- 접근 권한이 없는 폴더에 파일을 만들려고 할 때
- 다른 프로그램이 파일을 잠그고 있을 때
- 운영체제가 보호하는 위치에 저장하려고 할 때
\`\`\`

예외 처리는 다음처럼 할 수 있습니다.

\`\`\`python
try:
    with open("protected.txt", "w", encoding="utf-8") as file:
        file.write("저장 테스트")
except PermissionError:
    print("파일을 쓸 권한이 없습니다.")
\`\`\`

실무에서는 결과 파일을 저장할 폴더에 쓰기 권한이 있는지 확인해야 합니다.

---

### 10.5.4 인코딩 에러

파일의 실제 인코딩과 코드에서 지정한 인코딩이 다르면 \`UnicodeDecodeError\`가 발생할 수 있습니다.

\`\`\`python
with open("data.csv", "r", encoding="utf-8") as file:
    content = file.read()
\`\`\`

파일이 UTF-8이 아닌 다른 인코딩으로 저장되어 있다면 에러가 날 수 있습니다.

예외 처리는 다음처럼 할 수 있습니다.

\`\`\`python
try:
    with open("data.csv", "r", encoding="utf-8") as file:
        content = file.read()
except UnicodeDecodeError:
    print("파일 인코딩을 확인해야 합니다.")
\`\`\`

한글 CSV 파일에서는 \`utf-8\`, \`utf-8-sig\`, \`cp949\` 같은 인코딩을 마주칠 수 있습니다. 다만 무작정 여러 인코딩을 시도하기보다, 파일이 어떤 프로그램에서 만들어졌는지 확인하는 것이 좋습니다.

---

### 10.5.5 CSV 열 이름 오류

\`DictReader\`로 CSV를 읽을 때 예상한 열 이름이 없으면 \`KeyError\`가 발생할 수 있습니다.

\`\`\`python
import csv

with open("customers.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)

    for row in reader:
        print(row["grade"])
\`\`\`

만약 CSV 파일에 \`grade\` 열이 없다면 에러가 발생합니다.

이런 경우에는 헤더를 먼저 확인할 수 있습니다.

\`\`\`python
import csv

with open("customers.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)

    print(reader.fieldnames)

    if "grade" not in reader.fieldnames:
        print("grade 열이 없습니다.")
    else:
        for row in reader:
            print(row["grade"])
\`\`\`

실무에서 외부에서 받은 CSV 파일은 열 이름이 바뀌는 경우가 있습니다. 열 이름을 확인하는 코드를 넣으면 원인을 찾기 쉬워집니다.

---

### 10.5.6 엑셀 시트 오류

엑셀 파일에서 특정 시트를 열려고 할 때 해당 시트가 없으면 에러가 발생합니다.

\`\`\`python
from openpyxl import load_workbook

workbook = load_workbook("sales.xlsx")
worksheet = workbook["매출"]
\`\`\`

\`매출\` 시트가 없으면 문제가 생깁니다. 시트 이름을 먼저 확인해 봅시다.

\`\`\`python
from openpyxl import load_workbook

workbook = load_workbook("sales.xlsx")

if "매출" not in workbook.sheetnames:
    print("매출 시트가 없습니다.")
else:
    worksheet = workbook["매출"]
    print("매출 시트를 처리합니다.")
\`\`\`

파일 처리에서 중요한 습관은 “있을 것이라고 가정하지 않는 것”입니다.

\`\`\`text
파일이 있는가?
시트가 있는가?
열이 있는가?
값이 비어 있지 않은가?
숫자로 변환할 수 있는가?
\`\`\`

이런 질문을 코드에 반영해야 안정적인 프로그램을 만들 수 있습니다.

---

### 10.5.7 안전한 파일 처리 패턴

파일을 안전하게 처리하기 위한 기본 패턴은 다음과 같습니다.

\`\`\`python
from pathlib import Path

file_path = Path("sales.xlsx")

if not file_path.exists():
    print("파일이 없습니다.")
else:
    print("파일을 처리합니다.")
\`\`\`

예외 처리까지 포함하면 다음처럼 작성할 수 있습니다.

\`\`\`python
from pathlib import Path

file_path = Path("memo.txt")

try:
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()
except FileNotFoundError:
    print("파일을 찾을 수 없습니다.")
except PermissionError:
    print("파일을 읽을 권한이 없습니다.")
except UnicodeDecodeError:
    print("파일 인코딩을 확인해야 합니다.")
else:
    print("파일을 정상적으로 읽었습니다.")
    print(content)
\`\`\`

이 코드는 파일 처리에서 발생할 수 있는 대표적인 문제를 나누어 처리합니다.

---

### 10.5.8 일부 파일 실패해도 계속 처리하기

여러 파일을 처리할 때 하나의 파일에서 에러가 발생하더라도 전체 프로그램이 멈추지 않게 만들 수 있습니다.

\`\`\`python
from pathlib import Path

folder = Path("texts")

for file_path in folder.glob("*.txt"):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()
    except UnicodeDecodeError:
        print(file_path.name, "인코딩 문제로 건너뜁니다.")
        continue
    except PermissionError:
        print(file_path.name, "권한 문제로 건너뜁니다.")
        continue

    print(file_path.name, "처리 완료")
\`\`\`

이런 구조는 실무에서 매우 유용합니다.

\`\`\`text
전체 파일 100개 중 1개가 실패해도 나머지 99개는 처리해야 하는 경우
\`\`\`

특히 자동화 프로그램에서는 일부 실패를 기록하고 다음 파일을 계속 처리하는 방식이 중요합니다.

---

### 10.5.9 실패한 파일 기록하기

실패한 파일 목록을 텍스트 파일로 남겨 봅시다.

\`\`\`python
from pathlib import Path

folder = Path("texts")
failed_files = []

for file_path in folder.glob("*.txt"):
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()
    except UnicodeDecodeError:
        failed_files.append(f"{file_path.name}: 인코딩 오류")
        continue
    except PermissionError:
        failed_files.append(f"{file_path.name}: 권한 오류")
        continue

    print(file_path.name, "처리 완료")

with open("failed_files.txt", "w", encoding="utf-8") as file:
    for failed in failed_files:
        file.write(failed + "\\n")
\`\`\`

실패한 파일을 기록하면 나중에 원인을 확인하고 다시 처리할 수 있습니다.

이런 기록은 12장에서 배우는 로그와도 연결됩니다.

---

## 10.6 장 마무리

### 10.6.1 이 장에서 배운 내용

이 장에서는 파이썬으로 파일을 다루는 방법을 배웠습니다.

텍스트 파일에서는 \`open()\` 함수와 \`with\` 문을 사용했습니다. 파일을 읽을 때는 \`read()\`, \`readline()\`, \`readlines()\`, 반복문을 사용할 수 있었고, 파일을 쓸 때는 \`write()\`와 \`writelines()\`를 사용할 수 있었습니다.

CSV 파일에서는 \`csv.reader\`, \`csv.writer\`, \`csv.DictReader\`, \`csv.DictWriter\`를 사용했습니다. 특히 헤더가 있는 CSV 파일은 딕셔너리 형태로 읽으면 열 이름으로 접근할 수 있어 실무에서 읽기 좋았습니다.

엑셀 파일에서는 \`openpyxl\`을 사용했습니다. \`Workbook\`으로 새 엑셀 파일을 만들고, \`load_workbook\`으로 기존 파일을 열었습니다. 워크북, 워크시트, 셀의 개념을 이해하고, 행 단위로 데이터를 읽고 쓰는 방법을 배웠습니다.

파일과 폴더 자동화에서는 \`pathlib\`을 중심으로 파일 경로를 다루었습니다. 파일 존재 여부 확인, 폴더 생성, 파일 목록 확인, 특정 확장자 파일 찾기, 파일명 변경, 이동, 복사, 삭제를 다뤘습니다.

마지막으로 파일 처리에서 발생할 수 있는 예외를 다뤘습니다. 파일이 없거나, 권한이 없거나, 인코딩이 맞지 않거나, CSV 열 이름과 엑셀 시트 이름이 예상과 다를 때 프로그램이 멈추지 않게 처리하는 방법을 배웠습니다.

---

### 10.6.2 핵심 정리

파일 처리의 기본 흐름은 다음과 같습니다.

\`\`\`text
파일 열기 → 읽기 또는 쓰기 → 처리하기 → 파일 닫기
\`\`\`

실무에서는 \`with\` 문을 사용해 파일을 안전하게 닫는 것이 좋습니다.

\`\`\`python
with open("memo.txt", "r", encoding="utf-8") as file:
    content = file.read()
\`\`\`

CSV 파일은 표 형태 데이터를 텍스트로 저장한 형식입니다.

\`\`\`python
import csv

with open("customers.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)
\`\`\`

엑셀 파일은 \`openpyxl\`로 읽고 쓸 수 있습니다.

\`\`\`python
from openpyxl import Workbook, load_workbook
\`\`\`

파일 경로는 \`pathlib\`을 사용하면 더 안전하고 읽기 쉽게 다룰 수 있습니다.

\`\`\`python
from pathlib import Path

file_path = Path("reports") / "sales.xlsx"
\`\`\`

파일 처리는 외부 환경에 의존하므로 예외 처리가 중요합니다.

\`\`\`python
try:
    with open("memo.txt", "r", encoding="utf-8") as file:
        content = file.read()
except FileNotFoundError:
    print("파일이 없습니다.")
\`\`\`

---

## 10.7 연습문제

### 문제 1. 텍스트 파일 쓰기

다음 내용을 \`profile.txt\` 파일로 저장하는 코드를 작성하세요.

\`\`\`text
이름: 홍길동
직무: 데이터 분석가
관심 분야: 파이썬 자동화
\`\`\`

---

### 문제 2. 텍스트 파일 읽기

\`profile.txt\` 파일을 읽어서 화면에 출력하는 코드를 작성하세요.

---

### 문제 3. 줄 번호 붙여 출력하기

\`memo.txt\` 파일을 한 줄씩 읽고, 다음과 같이 줄 번호를 붙여 출력하는 코드를 작성하세요.

\`\`\`text
1: 첫 번째 줄 내용
2: 두 번째 줄 내용
3: 세 번째 줄 내용
\`\`\`

---

### 문제 4. CSV 파일 읽기

다음과 같은 \`customers.csv\` 파일이 있습니다.

\`\`\`csv
name,email,grade
홍길동,hong@example.com,VIP
김민수,minsu@example.com,BASIC
이지영,jiyoung@example.com,VIP
\`\`\`

\`DictReader\`를 사용해서 고객 이름과 등급만 출력하는 코드를 작성하세요.

---

### 문제 5. VIP 고객만 저장하기

문제 4의 \`customers.csv\` 파일에서 등급이 \`VIP\`인 고객만 골라 \`vip_customers.csv\` 파일로 저장하는 코드를 작성하세요.

---

### 문제 6. CSV 숫자 계산

다음과 같은 \`orders.csv\` 파일이 있습니다.

\`\`\`csv
product,price,quantity
키보드,30000,2
마우스,15000,3
모니터,200000,1
\`\`\`

각 상품의 총액을 계산해 화면에 출력하는 코드를 작성하세요.

출력 예시는 다음과 같습니다.

\`\`\`text
키보드 60000
마우스 45000
모니터 200000
\`\`\`

---

### 문제 7. 엑셀 파일 만들기

\`openpyxl\`을 사용해서 다음 데이터를 가진 \`products.xlsx\` 파일을 만드는 코드를 작성하세요.

| 상품명 | 가격 |
|---|---:|
| 키보드 | 30000 |
| 마우스 | 15000 |
| 모니터 | 200000 |

---

### 문제 8. 엑셀 파일 읽기

문제 7에서 만든 \`products.xlsx\` 파일을 읽고, 상품명과 가격을 출력하는 코드를 작성하세요.

---

### 문제 9. 특정 확장자 파일 찾기

\`downloads\` 폴더에서 \`.xlsx\` 확장자를 가진 파일 이름만 출력하는 코드를 작성하세요.

---

### 문제 10. 파일 존재 여부 확인

\`sales.xlsx\` 파일이 있으면 \`파일을 처리합니다.\`를 출력하고, 없으면 \`파일이 없습니다.\`를 출력하는 코드를 작성하세요.

---

### 문제 11. 파일명 변경 전 미리보기

\`documents\` 폴더 안의 모든 \`.txt\` 파일 이름 앞에 \`backup_\`을 붙이려고 합니다. 실제로 이름을 바꾸지는 말고, 다음 형식으로 변경 예정 이름만 출력하는 코드를 작성하세요.

\`\`\`text
memo.txt -> backup_memo.txt
meeting.txt -> backup_meeting.txt
\`\`\`

---

### 문제 12. 예외 처리

\`memo.txt\` 파일을 읽는 코드를 작성하되, 파일이 없으면 \`파일을 찾을 수 없습니다.\`를 출력하도록 예외 처리를 하세요.

---

## 10.8 정답 및 해설

### 문제 1 정답

\`\`\`python
with open("profile.txt", "w", encoding="utf-8") as file:
    file.write("이름: 홍길동\\n")
    file.write("직무: 데이터 분석가\\n")
    file.write("관심 분야: 파이썬 자동화\\n")
\`\`\`

\`w\` 모드는 파일을 새로 쓰는 모드입니다. 파일이 없으면 새로 만들고, 파일이 이미 있으면 기존 내용을 지우고 새로 씁니다.

---

### 문제 2 정답

\`\`\`python
with open("profile.txt", "r", encoding="utf-8") as file:
    content = file.read()

print(content)
\`\`\`

\`read()\`는 파일 전체 내용을 하나의 문자열로 읽어옵니다.

---

### 문제 3 정답

\`\`\`python
with open("memo.txt", "r", encoding="utf-8") as file:
    for line_number, line in enumerate(file, start=1):
        print(f"{line_number}: {line.rstrip()}")
\`\`\`

\`enumerate()\`를 사용하면 반복하면서 번호를 함께 얻을 수 있습니다. \`rstrip()\`은 각 줄 끝의 줄바꿈 문자를 제거합니다.

---

### 문제 4 정답

\`\`\`python
import csv

with open("customers.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)

    for row in reader:
        print(row["name"], row["grade"])
\`\`\`

\`DictReader\`를 사용하면 열 이름으로 값에 접근할 수 있습니다.

---

### 문제 5 정답

\`\`\`python
import csv

vip_customers = []

with open("customers.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)

    for row in reader:
        if row["grade"] == "VIP":
            vip_customers.append(row)

fieldnames = ["name", "email", "grade"]

with open("vip_customers.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(vip_customers)
\`\`\`

CSV 필터링의 핵심은 읽은 행 중 조건에 맞는 행만 새 리스트에 모은 뒤, 그 리스트를 새 파일로 저장하는 것입니다.

---

### 문제 6 정답

\`\`\`python
import csv

with open("orders.csv", "r", encoding="utf-8") as file:
    reader = csv.DictReader(file)

    for row in reader:
        product = row["product"]
        price = int(row["price"])
        quantity = int(row["quantity"])
        total = price * quantity

        print(product, total)
\`\`\`

CSV에서 읽은 값은 문자열입니다. 계산을 하려면 \`int()\`로 변환해야 합니다.

---

### 문제 7 정답

\`\`\`python
from openpyxl import Workbook

workbook = Workbook()
worksheet = workbook.active
worksheet.title = "상품목록"

worksheet.append(["상품명", "가격"])
worksheet.append(["키보드", 30000])
worksheet.append(["마우스", 15000])
worksheet.append(["모니터", 200000])

workbook.save("products.xlsx")
\`\`\`

\`Workbook()\`으로 새 엑셀 파일을 만들고, \`append()\`로 행을 추가한 뒤 \`save()\`로 저장합니다.

---

### 문제 8 정답

\`\`\`python
from openpyxl import load_workbook

workbook = load_workbook("products.xlsx")
worksheet = workbook.active

for row in worksheet.iter_rows(min_row=2, values_only=True):
    product, price = row
    print(product, price)
\`\`\`

\`min_row=2\`는 헤더를 제외하고 두 번째 행부터 읽겠다는 뜻입니다.

---

### 문제 9 정답

\`\`\`python
from pathlib import Path

folder = Path("downloads")

for file_path in folder.glob("*.xlsx"):
    print(file_path.name)
\`\`\`

\`glob("*.xlsx")\`는 현재 폴더에서 \`.xlsx\` 확장자를 가진 파일을 찾습니다.

---

### 문제 10 정답

\`\`\`python
from pathlib import Path

file_path = Path("sales.xlsx")

if file_path.exists():
    print("파일을 처리합니다.")
else:
    print("파일이 없습니다.")
\`\`\`

\`exists()\`는 해당 경로가 존재하는지 확인합니다.

---

### 문제 11 정답

\`\`\`python
from pathlib import Path

folder = Path("documents")

for file_path in folder.glob("*.txt"):
    new_name = "backup_" + file_path.name
    print(f"{file_path.name} -> {new_name}")
\`\`\`

실제 파일명을 바꾸기 전에 먼저 출력으로 확인하는 습관이 중요합니다.

---

### 문제 12 정답

\`\`\`python
try:
    with open("memo.txt", "r", encoding="utf-8") as file:
        content = file.read()
except FileNotFoundError:
    print("파일을 찾을 수 없습니다.")
else:
    print(content)
\`\`\`

파일이 없을 가능성이 있는 작업은 \`try-except\`로 처리할 수 있습니다. \`else\`는 예외가 발생하지 않았을 때 실행됩니다.

---

## 10.9 다음 장 예고

이번 장에서는 파일을 직접 읽고 쓰는 방법을 배웠습니다. 텍스트 파일, CSV 파일, 엑셀 파일을 다루면서 실무에서 자주 쓰이는 파일 처리 흐름을 익혔습니다.

다음 장에서는 **데이터 처리 기초**를 배웁니다.

다음 장에서는 다음 내용을 다룹니다.

\`\`\`text
- JSON 데이터 다루기
- 날짜와 시간 데이터 처리
- 정규표현식 기본과 실무 패턴
- requests로 API 데이터 가져오기
- pandas로 표 형태 데이터 처리하기
- 데이터 클리닝 실무 패턴
\`\`\`

파일을 읽고 쓰는 방법을 배웠기 때문에, 이제는 파일 안의 데이터를 더 체계적으로 가공하고 분석하는 단계로 넘어갈 수 있습니다.
`;export{e as default};