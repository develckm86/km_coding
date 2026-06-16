var e=`<!-- 원본: python_basic_chapter_10_book.md / 세부 장: 10-4 -->

# 10.4 파일과 폴더 자동화

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
`;export{e as default};