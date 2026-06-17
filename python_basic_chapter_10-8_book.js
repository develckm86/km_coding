var e=`<!-- 원본: python_basic_chapter_10_book.md / 세부 장: 10-8 -->

# 10.8 정답 및 해설

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
`;export{e as default};