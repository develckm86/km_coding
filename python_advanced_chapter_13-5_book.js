var e=`<!-- 원본: python_advanced_chapter_13_book.md / 세부 장: 13-5 -->

# 13.5 압축 파일 처리

## 압축 파일을 코드로 다루는 이유

실무 데이터는 압축된 상태로 전달되는 경우가 많다.

- 로그 파일이 \`.gz\`로 압축되어 있다.
- 여러 CSV 파일이 \`.zip\` 하나로 묶여 있다.
- API에서 압축된 응답을 제공한다.
- 오래된 데이터를 보관하기 위해 압축한다.
- 대용량 파일 전송 시간을 줄이기 위해 압축한다.

압축 파일을 매번 수동으로 풀고 처리하면 자동화가 어렵다. 파이썬은 표준 라이브러리로 gzip과 zip 파일을 다룰 수 있다.

## gzip 파일 읽기

gzip은 보통 단일 파일을 압축하는 데 사용된다. 예를 들어 \`server.log.gz\`는 \`server.log\`를 gzip으로 압축한 파일일 수 있다.

텍스트 gzip 파일은 다음처럼 읽을 수 있다.

\`\`\`python
import gzip

with gzip.open("server.log.gz", "rt", encoding="utf-8") as file:
    for line in file:
        if "ERROR" in line:
            print(line.strip())
\`\`\`

\`rt\`는 gzip 파일을 텍스트 읽기 모드로 열겠다는 뜻이다. 바이너리로 읽고 싶으면 \`rb\`를 사용한다.

\`\`\`python
with gzip.open("data.bin.gz", "rb") as file:
    data = file.read()
\`\`\`

## gzip 파일 쓰기

텍스트 데이터를 gzip으로 압축해 저장할 수도 있다.

\`\`\`python
import gzip

lines = [
    "첫 번째 줄\\n",
    "두 번째 줄\\n",
    "세 번째 줄\\n",
]

with gzip.open("result.txt.gz", "wt", encoding="utf-8") as file:
    file.writelines(lines)
\`\`\`

압축 파일로 저장하면 디스크 공간을 절약할 수 있다. 특히 로그 파일이나 JSON Lines처럼 텍스트가 반복되는 데이터는 압축률이 좋은 편이다.

## CSV를 gzip으로 바로 저장하기

\`gzip.open()\`은 파일 객체처럼 동작한다. 따라서 \`csv\` 모듈과 함께 사용할 수 있다.

\`\`\`python
import csv
import gzip

rows = [
    {"name": "Alice", "score": 90},
    {"name": "Bob", "score": 85},
]

with gzip.open("scores.csv.gz", "wt", encoding="utf-8", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=["name", "score"])
    writer.writeheader()
    writer.writerows(rows)
\`\`\`

읽을 때도 비슷하다.

\`\`\`python
with gzip.open("scores.csv.gz", "rt", encoding="utf-8", newline="") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row)
\`\`\`

## zip 파일 다루기

zip은 여러 파일과 폴더를 하나의 압축 파일로 묶는 형식이다. 파이썬에서는 \`zipfile\` 모듈을 사용한다.

\`\`\`python
from zipfile import ZipFile

with ZipFile("data.zip", "r") as archive:
    print(archive.namelist())
\`\`\`

\`namelist()\`는 zip 파일 안에 들어 있는 파일 이름 목록을 반환한다.

## zip 파일에서 특정 파일 읽기

압축을 풀지 않고 zip 내부 파일을 읽을 수 있다.

\`\`\`python
from zipfile import ZipFile

with ZipFile("data.zip", "r") as archive:
    with archive.open("customers.csv", "r") as file:
        content = file.read()
        print(content[:100])
\`\`\`

\`archive.open()\`은 기본적으로 바이너리 파일 객체를 반환한다. 텍스트로 읽고 싶다면 \`io.TextIOWrapper\`로 감싸면 된다.

\`\`\`python
import csv
import io
from zipfile import ZipFile

with ZipFile("data.zip", "r") as archive:
    with archive.open("customers.csv", "r") as raw_file:
        text_file = io.TextIOWrapper(raw_file, encoding="utf-8", newline="")
        reader = csv.DictReader(text_file)

        for row in reader:
            print(row)
\`\`\`

이 방식은 압축 파일을 디스크에 풀지 않고 바로 처리할 때 유용하다.

## zip 파일 만들기

\`\`\`python
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

files = [
    Path("result/customers.csv"),
    Path("result/summary.json"),
]

with ZipFile("result.zip", "w", compression=ZIP_DEFLATED) as archive:
    for path in files:
        archive.write(path, arcname=path.name)
\`\`\`

\`arcname\`은 zip 파일 안에서 보일 이름이다. 전체 경로를 그대로 넣지 않고 파일명만 넣고 싶을 때 사용한다.

## 안전한 압축 해제

zip 파일을 해제할 때는 주의해야 한다. 악의적으로 만들어진 zip 파일은 \`../\` 같은 경로를 포함해 의도하지 않은 위치에 파일을 풀려고 할 수 있다. 이것을 경로 순회 문제라고 한다.

신뢰할 수 없는 zip 파일은 무조건 \`extractall()\`로 풀기보다, 내부 파일 경로를 검사한 뒤 해제하는 것이 안전하다.

\`\`\`python
from pathlib import Path
from zipfile import ZipFile


def safe_extract(zip_path: Path, target_dir: Path) -> None:
    target_dir = target_dir.resolve()

    with ZipFile(zip_path, "r") as archive:
        for member in archive.namelist():
            member_path = (target_dir / member).resolve()

            if not str(member_path).startswith(str(target_dir)):
                raise ValueError(f"위험한 경로가 포함되어 있습니다: {member}")

        archive.extractall(target_dir)
\`\`\`

수업 수준에서는 이 코드를 완벽하게 이해하지 못해도 된다. 중요한 것은 **외부에서 받은 압축 파일을 무조건 신뢰하면 안 된다**는 점이다.

## gzip과 zip 비교

| 구분 | gzip | zip |
|---|---|---|
| 주 용도 | 단일 파일 압축 | 여러 파일 묶기와 압축 |
| 확장자 | \`.gz\` | \`.zip\` |
| 파이썬 모듈 | \`gzip\` | \`zipfile\` |
| 내부 파일 목록 | 보통 없음 | 있음 |
| 실무 예 | 로그 파일 압축 | 여러 CSV 파일 전달 |

---
`;export{e as default};