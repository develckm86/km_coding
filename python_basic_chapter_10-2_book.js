var e=`<!-- 원본: python_basic_chapter_10_book.md / 세부 장: 10-2 -->

# 10.2 CSV 파일 다루기

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
`;export{e as default};