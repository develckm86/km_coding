var e=`<!-- 원본: python_advanced_chapter_13_book.md / 세부 장: 13-6 -->

# 13.6 경로와 파일 시스템 심화

## 문자열 경로보다 \`Path\` 객체를 사용하자

기초 과정에서는 파일 경로를 문자열로 다뤘다.

\`\`\`python
path = "data/input.csv"
\`\`\`

작은 예제에서는 괜찮지만, 경로를 많이 조합하고 검사해야 하는 실무 코드에서는 \`pathlib.Path\`가 더 편리하다.

\`\`\`python
from pathlib import Path

path = Path("data") / "input.csv"

print(path.name)
print(path.suffix)
print(path.parent)
\`\`\`

\`Path\` 객체는 운영체제별 경로 구분자를 어느 정도 자연스럽게 처리해 준다.

## 경로 정보 확인하기

\`\`\`python
from pathlib import Path

path = Path("data/input.csv")

print(path.name)      # input.csv
print(path.stem)      # input
print(path.suffix)    # .csv
print(path.parent)    # data
\`\`\`

파일명, 확장자, 부모 폴더를 분리할 때 문자열 메서드보다 안전하고 읽기 쉽다.

## 파일과 폴더 존재 여부 확인

\`\`\`python
from pathlib import Path

path = Path("data/input.csv")

if path.exists():
    print("파일 또는 폴더가 존재합니다.")

if path.is_file():
    print("파일입니다.")

if path.is_dir():
    print("폴더입니다.")
\`\`\`

존재 여부를 확인하는 코드는 파일 처리 예외를 줄이는 데 도움이 된다. 하지만 확인 직후 다른 프로그램이 파일을 삭제할 수도 있으므로, 중요한 파일 작업은 여전히 예외 처리가 필요하다.

## 폴더 만들기

\`\`\`python
from pathlib import Path

output_dir = Path("result")
output_dir.mkdir(parents=True, exist_ok=True)
\`\`\`

\`parents=True\`는 중간 폴더가 없으면 함께 만든다는 뜻이다. \`exist_ok=True\`는 이미 폴더가 있어도 에러를 내지 않겠다는 뜻이다.

## 파일 검색하기

특정 폴더의 CSV 파일을 찾을 수 있다.

\`\`\`python
from pathlib import Path

for path in Path("data").glob("*.csv"):
    print(path)
\`\`\`

하위 폴더까지 재귀적으로 찾고 싶으면 \`rglob()\`을 사용한다.

\`\`\`python
for path in Path("data").rglob("*.csv"):
    print(path)
\`\`\`

이 기능은 여러 원천 데이터 파일을 일괄 처리할 때 매우 유용하다.

## 파일 복사와 이동

파일 복사와 이동에는 \`shutil\`을 사용할 수 있다.

\`\`\`python
import shutil
from pathlib import Path

source = Path("data/input.csv")
target = Path("backup/input.csv")

target.parent.mkdir(parents=True, exist_ok=True)
shutil.copy2(source, target)
\`\`\`

\`copy2()\`는 가능한 경우 파일의 메타데이터도 함께 복사한다. 단, 모든 메타데이터가 완벽히 복사되는 것은 아니므로 중요한 권한 정보가 필요한 시스템에서는 별도 확인이 필요하다.

파일 이동은 다음처럼 한다.

\`\`\`python
shutil.move("data/input.csv", "archive/input.csv")
\`\`\`

## 임시 파일과 임시 폴더

중간 결과를 잠시 저장해야 할 때는 직접 임시 파일 이름을 만들기보다 \`tempfile\`을 사용하는 것이 안전하다.

\`\`\`python
import tempfile
from pathlib import Path

with tempfile.TemporaryDirectory() as temp_dir:
    temp_path = Path(temp_dir)
    work_file = temp_path / "work.txt"

    work_file.write_text("임시 데이터", encoding="utf-8")
    print(work_file.read_text(encoding="utf-8"))

# with 블록이 끝나면 임시 폴더는 정리된다.
\`\`\`

임시 폴더는 테스트와 중간 처리 작업에 유용하다. 작업이 끝나면 자동으로 정리되므로 불필요한 파일이 남는 문제를 줄일 수 있다.

## 안전한 파일명 만들기

사용자 입력값이나 외부 데이터 값을 파일명으로 사용할 때는 조심해야 한다. 파일명에 사용할 수 없는 문자가 포함될 수 있고, 경로 조작 문제가 생길 수도 있다.

간단한 파일명 정리 함수는 다음처럼 만들 수 있다.

\`\`\`python
import re


def make_safe_filename(name: str, default: str = "untitled") -> str:
    name = name.strip()
    name = re.sub(r"[^\\w\\-.가-힣 ]", "_", name)
    name = name.strip(" .")

    if not name:
        return default

    return name

print(make_safe_filename("2026/06/매출:보고서?.csv"))
\`\`\`

파일명 규칙은 운영체제마다 다를 수 있다. 중요한 시스템에서는 더 엄격한 규칙을 정해야 한다.

## 원자적 저장 패턴

결과 파일을 저장하는 도중 프로그램이 중단되면 파일이 깨질 수 있다. 특히 기존 파일을 덮어쓰는 경우 위험하다.

안전한 방법 중 하나는 임시 파일에 먼저 쓰고, 저장이 완료되면 최종 파일명으로 교체하는 것이다.

\`\`\`python
from pathlib import Path
import tempfile


def atomic_write_text(path: Path, content: str, encoding: str = "utf-8") -> None:
    path.parent.mkdir(parents=True, exist_ok=True)

    with tempfile.NamedTemporaryFile(
        "w",
        encoding=encoding,
        delete=False,
        dir=path.parent,
        prefix=path.name,
        suffix=".tmp",
    ) as temp_file:
        temp_path = Path(temp_file.name)
        temp_file.write(content)

    temp_path.replace(path)

atomic_write_text(Path("result/summary.txt"), "처리 완료")
\`\`\`

이 패턴은 설정 파일, 결과 요약 파일, 중요한 중간 결과 파일을 저장할 때 유용하다.

## 폴더 순회하며 파일 처리하기

여러 하위 폴더에 흩어진 파일을 처리하는 예제다.

\`\`\`python
from pathlib import Path

input_dir = Path("raw_data")
output_dir = Path("processed")
output_dir.mkdir(parents=True, exist_ok=True)

for path in input_dir.rglob("*.txt"):
    relative_path = path.relative_to(input_dir)
    target_path = output_dir / relative_path
    target_path.parent.mkdir(parents=True, exist_ok=True)

    text = path.read_text(encoding="utf-8")
    cleaned_text = text.strip()
    target_path.write_text(cleaned_text, encoding="utf-8")
\`\`\`

\`relative_to()\`를 사용하면 원본 폴더 구조를 유지하면서 결과 폴더에 저장할 수 있다.

---
`;export{e as default};