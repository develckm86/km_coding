var e=`<!-- 원본: python_basic_chapter_10_book.md / 세부 장: 10-3 -->

# 10.3 엑셀 파일 다루기

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
`;export{e as default};