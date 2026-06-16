var e=`<!-- 원본: python_basic_chapter_10_book.md / 세부 장: 10-5 -->

# 10.5 파일 처리 예외 처리

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
`;export{e as default};