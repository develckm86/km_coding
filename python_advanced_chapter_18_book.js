var e=`# 18장. 실무 자동화와 CLI 프로그램

고급 파이썬을 배우는 중요한 이유 중 하나는 **반복되는 작업을 사람이 직접 하지 않아도 되게 만드는 것**이다.  
기초 과정에서는 파일을 읽고 쓰고, API에서 데이터를 가져오고, 예외를 처리하고, 로그를 남기는 방법을 배웠다. 고급 과정에서는 이 기능들을 하나로 묶어 **실제로 실행 가능한 도구**로 만드는 방법을 배운다.

이번 장에서는 터미널에서 실행하는 프로그램, 즉 **CLI 프로그램**을 만든다.  
CLI 프로그램은 화려한 화면을 가진 프로그램은 아니지만, 실무 자동화에서는 매우 강력하다. 파일 정리, 데이터 검증, API 수집, 로그 분석, 보고서 생성 같은 작업을 명령 한 줄로 실행할 수 있기 때문이다.

\`\`\`bash
python collect_api.py --date 2026-06-16 --output data/result.jsonl
python validate_csv.py customers.csv --required name email phone
python organize_files.py ./downloads --output ./sorted --dry-run
\`\`\`

위와 같은 명령을 만들 수 있다면, 파이썬 코드는 단순한 연습 코드가 아니라 실제 업무 도구가 된다.

---

## 18.1 CLI 프로그램이란?

### 18.1.1 CLI의 의미

CLI는 **Command Line Interface**의 약자이다.  
우리말로는 명령행 인터페이스라고 부른다.

CLI 프로그램은 마우스로 버튼을 누르는 방식이 아니라, 터미널이나 명령 프롬프트에서 명령어를 입력해 실행하는 프로그램이다.

예를 들어 다음과 같은 명령은 모두 CLI 사용 예이다.

\`\`\`bash
python app.py
python app.py --help
python app.py --input data.csv --output result.csv
\`\`\`

여기서 \`python app.py\`는 프로그램을 실행하는 명령이고, \`--input\`, \`--output\`은 프로그램에 전달하는 옵션이다.

CLI 프로그램은 처음에는 낯설게 느껴질 수 있다. 하지만 자동화 관점에서는 GUI보다 훨씬 실용적이다. 사람이 매번 버튼을 누르지 않아도 되고, 운영체제의 스케줄러나 다른 프로그램에서 쉽게 실행할 수 있기 때문이다.

---

### 18.1.2 CLI와 GUI의 차이

GUI는 Graphical User Interface의 약자이다.  
우리가 평소 사용하는 대부분의 프로그램은 GUI를 가진다. 버튼, 메뉴, 입력창, 체크박스 같은 요소를 마우스로 조작한다.

CLI는 화면 요소 대신 명령어를 사용한다.

| 구분 | GUI | CLI |
|---|---|---|
| 조작 방식 | 버튼, 메뉴, 입력창 | 명령어와 옵션 |
| 사용 편의성 | 처음 사용하기 쉬움 | 처음에는 낯설 수 있음 |
| 자동화 | 상대적으로 어려움 | 매우 쉬움 |
| 반복 실행 | 사람이 직접 조작하는 경우가 많음 | 스크립트로 반복 실행 가능 |
| 실무 자동화 | 보조적 | 핵심 도구로 자주 사용 |

GUI는 사람이 직접 사용하는 프로그램에 적합하다.  
CLI는 사람이 만든 규칙대로 반복 실행되는 자동화 작업에 적합하다.

예를 들어 매일 오전 9시에 API 데이터를 수집해야 한다고 해보자. GUI 프로그램이라면 누군가가 프로그램을 열고 버튼을 눌러야 할 수 있다. 반면 CLI 프로그램이라면 다음과 같은 명령을 스케줄러에 등록하면 된다.

\`\`\`bash
python collect_sales.py --date today --output data/sales.json
\`\`\`

실무 자동화에서는 이 차이가 매우 크다.

---

### 18.1.3 CLI 프로그램이 필요한 상황

CLI 프로그램은 다음과 같은 상황에서 유용하다.

- 반복해서 실행해야 하는 작업
- 파일 경로나 날짜 같은 값을 바꿔가며 실행해야 하는 작업
- 서버나 스케줄러에서 자동으로 실행해야 하는 작업
- 실행 결과를 로그로 남겨야 하는 작업
- 여러 사람이 같은 방식으로 실행해야 하는 작업
- 데이터분석 전에 원천 데이터를 정리해야 하는 작업

예를 들어 다음과 같은 업무는 CLI 프로그램으로 만들기 좋다.

\`\`\`text
1. 특정 폴더의 CSV 파일을 검사한다.
2. 필수 컬럼이 없으면 오류 목록에 기록한다.
3. 문제가 없는 파일만 다른 폴더로 복사한다.
4. 처리 결과를 로그 파일에 남긴다.
\`\`\`

이 작업을 CLI로 만들면 다음처럼 실행할 수 있다.

\`\`\`bash
python validate_files.py --input ./raw --output ./valid --log logs/validate.log
\`\`\`

이렇게 만들어두면 매번 코드를 수정하지 않아도 된다.  
입력 폴더, 출력 폴더, 로그 파일 경로만 옵션으로 바꿔 실행하면 된다.

---

### 18.1.4 좋은 CLI 프로그램의 조건

좋은 CLI 프로그램은 단순히 실행만 되는 프로그램이 아니다.  
실무에서 사용하기 좋은 CLI 프로그램은 다음 조건을 만족해야 한다.

첫째, **실행 방법이 명확해야 한다.**  
사용자가 어떤 값을 넣어야 하는지 알 수 있어야 한다.

\`\`\`bash
python app.py --help
\`\`\`

위 명령을 실행했을 때 사용법이 잘 나와야 한다.

둘째, **입력과 출력이 분명해야 한다.**  
어떤 파일을 읽고, 어떤 파일을 만들고, 어떤 결과를 출력하는지 명확해야 한다.

셋째, **실패했을 때 이유를 알 수 있어야 한다.**  
파일이 없거나, 인수가 잘못되었거나, 처리 중 오류가 발생했을 때 적절한 메시지와 로그를 남겨야 한다.

넷째, **테스트하기 쉬워야 한다.**  
CLI 전체를 한 덩어리로 만들면 테스트하기 어렵다. 인수 파싱, 실제 처리 로직, 로그 설정, 결과 저장을 함수로 나누어야 한다.

다섯째, **기본값과 옵션의 균형이 좋아야 한다.**  
자주 쓰는 값은 기본값으로 제공하고, 바꿔야 하는 값은 옵션으로 받는 것이 좋다.

---

## 18.2 \`argparse\` 심화

파이썬에서 CLI 프로그램을 만들 때 가장 기본적으로 사용하는 표준 라이브러리가 \`argparse\`이다.  
\`argparse\`는 명령행 인수와 옵션을 분석하고, 도움말 메시지를 자동으로 만들어준다.

간단한 예제를 보자.

\`\`\`python
import argparse

parser = argparse.ArgumentParser(description="인사말을 출력하는 프로그램")
parser.add_argument("name", help="이름")
parser.add_argument("--greeting", default="안녕하세요", help="인사말")

args = parser.parse_args()

print(f"{args.greeting}, {args.name}님!")
\`\`\`

이 파일을 \`hello.py\`로 저장하고 다음처럼 실행할 수 있다.

\`\`\`bash
python hello.py 민수
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
안녕하세요, 민수님!
\`\`\`

옵션을 추가하면 다른 인사말도 사용할 수 있다.

\`\`\`bash
python hello.py 민수 --greeting 반갑습니다
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
반갑습니다, 민수님!
\`\`\`

---

### 18.2.1 위치 인자와 선택 옵션

\`argparse\`에서 가장 먼저 구분해야 할 것은 **위치 인자**와 **선택 옵션**이다.

위치 인자는 명령어에서 위치가 중요한 값이다.

\`\`\`bash
python copy_file.py source.txt target.txt
\`\`\`

여기서 \`source.txt\`와 \`target.txt\`는 위치 인자이다. 첫 번째 값은 원본 파일, 두 번째 값은 대상 파일이라는 식으로 위치에 의미가 있다.

선택 옵션은 보통 \`-\` 또는 \`--\`로 시작한다.

\`\`\`bash
python copy_file.py source.txt target.txt --overwrite
\`\`\`

여기서 \`--overwrite\`는 선택 옵션이다. 이 옵션이 있으면 기존 파일을 덮어쓰고, 없으면 덮어쓰지 않는 식으로 동작을 바꿀 수 있다.

코드로 작성하면 다음과 같다.

\`\`\`python
import argparse

parser = argparse.ArgumentParser(description="파일 복사 프로그램")
parser.add_argument("source", help="원본 파일 경로")
parser.add_argument("target", help="대상 파일 경로")
parser.add_argument("--overwrite", action="store_true", help="기존 파일 덮어쓰기")

args = parser.parse_args()

print(args.source)
print(args.target)
print(args.overwrite)
\`\`\`

\`action="store_true"\`는 옵션이 있으면 \`True\`, 없으면 \`False\`가 되게 만든다.

---

### 18.2.2 타입 지정하기

명령행 인수는 기본적으로 문자열이다.  
따라서 숫자가 필요하다면 타입을 지정해야 한다.

\`\`\`python
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--count", type=int, default=1)
parser.add_argument("--rate", type=float, default=0.1)

args = parser.parse_args()

print(args.count)
print(args.rate)
\`\`\`

실행 예시는 다음과 같다.

\`\`\`bash
python app.py --count 3 --rate 0.2
\`\`\`

\`type=int\`를 지정하면 문자열 \`"3"\`이 정수 \`3\`으로 변환된다.  
만약 사용자가 숫자로 변환할 수 없는 값을 입력하면 \`argparse\`가 오류 메시지를 출력하고 프로그램을 종료한다.

\`\`\`bash
python app.py --count hello
\`\`\`

이런 경우에는 사용자가 잘못된 값을 넣었다는 메시지가 표시된다.

---

### 18.2.3 기본값 지정하기

옵션은 매번 입력하지 않도록 기본값을 지정할 수 있다.

\`\`\`python
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--output", default="result.txt")
parser.add_argument("--encoding", default="utf-8")

args = parser.parse_args()

print(args.output)
print(args.encoding)
\`\`\`

이 프로그램을 아무 옵션 없이 실행하면 기본값이 사용된다.

\`\`\`bash
python app.py
\`\`\`

결과는 다음과 같다.

\`\`\`text
result.txt
utf-8
\`\`\`

옵션을 지정하면 기본값 대신 사용자가 입력한 값이 사용된다.

\`\`\`bash
python app.py --output report.txt --encoding cp949
\`\`\`

기본값을 잘 정하면 사용자는 자주 쓰는 옵션을 매번 입력하지 않아도 된다.

---

### 18.2.4 선택 가능한 값 제한하기

특정 옵션에 허용되는 값을 제한할 수도 있다.

\`\`\`python
import argparse

parser = argparse.ArgumentParser()
parser.add_argument(
    "--format",
    choices=["csv", "json", "txt"],
    default="csv",
    help="결과 저장 형식",
)

args = parser.parse_args()

print(args.format)
\`\`\`

이제 사용자는 \`csv\`, \`json\`, \`txt\` 중 하나만 입력할 수 있다.

\`\`\`bash
python app.py --format json
\`\`\`

허용되지 않은 값을 입력하면 오류가 발생한다.

\`\`\`bash
python app.py --format xlsx
\`\`\`

\`choices\`는 잘못된 옵션값을 초기에 막아주는 좋은 방법이다. 실무에서는 잘못된 입력값 때문에 프로그램이 중간에 실패하는 일이 많기 때문에, 가능한 한 초기에 검증하는 것이 좋다.

---

### 18.2.5 여러 값을 받기

옵션 하나에 여러 값을 받을 수도 있다.

\`\`\`python
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--columns", nargs="+", help="검사할 컬럼 목록")

args = parser.parse_args()

print(args.columns)
\`\`\`

실행 예시는 다음과 같다.

\`\`\`bash
python validate.py --columns name email phone
\`\`\`

결과는 다음과 같다.

\`\`\`python
["name", "email", "phone"]
\`\`\`

\`nargs="+"\`는 하나 이상의 값을 받겠다는 의미이다.  
필수 컬럼 목록, 처리할 파일 목록, 제외할 확장자 목록처럼 여러 값을 받아야 하는 경우에 유용하다.

---

### 18.2.6 플래그 옵션 만들기

플래그 옵션은 값 없이 존재 여부만으로 의미를 가지는 옵션이다.

대표적인 예가 \`--dry-run\`이다.  
\`dry run\`은 실제로 파일을 변경하지 않고, 어떤 작업이 일어날지만 미리 보여주는 실행 방식이다.

\`\`\`python
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--dry-run", action="store_true", help="실제 변경 없이 실행 계획만 출력")

args = parser.parse_args()

if args.dry_run:
    print("미리보기 모드입니다.")
else:
    print("실제 작업을 실행합니다.")
\`\`\`

실행 예시는 다음과 같다.

\`\`\`bash
python organize.py --dry-run
\`\`\`

실무 자동화에서는 \`--dry-run\`이 매우 중요하다.  
파일 이동, 삭제, 덮어쓰기처럼 되돌리기 어려운 작업은 반드시 미리보기 모드를 제공하는 것이 좋다.

---

### 18.2.7 하위 명령어 만들기

하나의 CLI 프로그램이 여러 기능을 가질 때는 하위 명령어를 사용할 수 있다.

예를 들어 다음과 같은 프로그램을 생각해보자.

\`\`\`bash
python data_tool.py validate data.csv
python data_tool.py convert input.csv output.json
python data_tool.py summary data.csv
\`\`\`

여기서 \`validate\`, \`convert\`, \`summary\`가 하위 명령어이다.

\`argparse\`에서는 \`subparsers\`를 사용해 하위 명령어를 만들 수 있다.

\`\`\`python
import argparse

def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="데이터 처리 도구")
    subparsers = parser.add_subparsers(dest="command", required=True)

    validate_parser = subparsers.add_parser("validate", help="CSV 파일 검증")
    validate_parser.add_argument("input_file")

    convert_parser = subparsers.add_parser("convert", help="파일 형식 변환")
    convert_parser.add_argument("input_file")
    convert_parser.add_argument("output_file")

    summary_parser = subparsers.add_parser("summary", help="데이터 요약")
    summary_parser.add_argument("input_file")

    return parser

parser = build_parser()
args = parser.parse_args()

if args.command == "validate":
    print(f"검증 대상: {args.input_file}")
elif args.command == "convert":
    print(f"변환: {args.input_file} -> {args.output_file}")
elif args.command == "summary":
    print(f"요약 대상: {args.input_file}")
\`\`\`

하위 명령어는 기능이 늘어나는 CLI 프로그램을 정리하는 데 유용하다.

---

## 18.3 실행 구조 만들기

CLI 프로그램은 처음에는 한 파일에 모든 코드를 작성해도 동작한다.  
하지만 실무에서는 다음과 같은 구조로 나누는 것이 좋다.

\`\`\`text
1. 명령행 인수를 해석한다.
2. 설정과 로그를 준비한다.
3. 실제 작업을 실행한다.
4. 결과를 저장한다.
5. 성공 또는 실패 코드를 반환한다.
\`\`\`

이 흐름을 코드 구조로 만들면 프로그램이 훨씬 관리하기 쉬워진다.

---

### 18.3.1 \`main()\` 함수 만들기

파이썬 CLI 프로그램은 보통 \`main()\` 함수를 진입점으로 사용한다.

\`\`\`python
def main() -> int:
    print("프로그램 실행")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
\`\`\`

\`main()\`은 프로그램의 전체 흐름을 담당한다.  
마지막에 정수 값을 반환하면 운영체제에 실행 결과를 알려줄 수 있다.

일반적으로 \`0\`은 성공을 의미하고, \`0\`이 아닌 값은 실패를 의미한다.

\`\`\`text
0: 성공
1: 일반적인 실패
2: 잘못된 인수
\`\`\`

\`raise SystemExit(main())\`는 \`main()\`의 반환값을 프로그램 종료 코드로 사용한다.

---

### 18.3.2 인수 파싱 함수 분리하기

인수 파싱 코드는 \`main()\` 안에 직접 넣을 수도 있지만, 함수로 분리하면 테스트하기 쉽다.

\`\`\`python
from __future__ import annotations

import argparse

def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="파일 정리 프로그램")
    parser.add_argument("input_dir", help="정리할 폴더")
    parser.add_argument("--output", default="organized", help="결과 폴더")
    parser.add_argument("--dry-run", action="store_true", help="실제 이동 없이 미리보기")
    return parser.parse_args(argv)
\`\`\`

여기서 \`argv\`를 받게 만든 이유가 중요하다.  
\`parser.parse_args()\`를 그대로 호출하면 실제 터미널에서 전달된 값만 읽는다. 하지만 \`parse_args(["data", "--dry-run"])\`처럼 리스트를 직접 넣을 수 있게 만들면 테스트가 쉬워진다.

\`\`\`python
args = parse_args(["downloads", "--output", "result", "--dry-run"])

print(args.input_dir)  # downloads
print(args.output)     # result
print(args.dry_run)    # True
\`\`\`

실무에서는 테스트 가능한 구조가 중요하다.  
CLI 프로그램이라고 해서 테스트를 포기하면 안 된다.

---

### 18.3.3 실제 처리 로직 분리하기

CLI 프로그램에서 가장 피해야 할 구조는 모든 로직을 \`main()\` 안에 몰아넣는 것이다.

나쁜 예시는 다음과 같다.

\`\`\`python
def main() -> int:
    args = parse_args()
    # 파일 찾기
    # 파일 이동
    # 로그 남기기
    # 결과 저장
    # 예외 처리
    # 출력
    return 0
\`\`\`

이렇게 작성하면 나중에 기능을 수정하기 어렵고 테스트도 어렵다.

좋은 구조는 다음처럼 역할을 나누는 것이다.

\`\`\`python
def run(input_dir: Path, output_dir: Path, dry_run: bool) -> int:
    files = find_files(input_dir)
    moved_count = organize_files(files, output_dir, dry_run=dry_run)
    return moved_count

def main() -> int:
    args = parse_args()

    input_dir = Path(args.input_dir)
    output_dir = Path(args.output)

    moved_count = run(input_dir, output_dir, dry_run=args.dry_run)

    print(f"처리한 파일 수: {moved_count}")
    return 0
\`\`\`

\`main()\`은 전체 흐름만 담당하고, 실제 작업은 다른 함수가 담당한다.  
이런 구조가 되면 \`run()\`이나 \`organize_files()\`를 따로 테스트할 수 있다.

---

### 18.3.4 \`Path\`로 경로 처리하기

파일과 폴더를 다루는 CLI 프로그램에서는 경로 처리가 매우 중요하다.  
문자열로 경로를 조합하면 운영체제마다 다른 구분자 때문에 실수할 수 있다.

\`pathlib.Path\`를 사용하면 경로를 객체처럼 다룰 수 있다.

\`\`\`python
from pathlib import Path

base_dir = Path("data")
input_file = base_dir / "input.csv"

print(input_file.name)
print(input_file.suffix)
print(input_file.parent)
\`\`\`

\`/\` 연산자로 경로를 자연스럽게 연결할 수 있다.

\`\`\`python
output_dir = Path("result")
output_file = output_dir / "summary.csv"
\`\`\`

경로를 다룰 때는 가능하면 문자열보다 \`Path\`를 사용하는 것이 좋다.

---

### 18.3.5 종료 코드 설계하기

CLI 프로그램은 실행 결과를 종료 코드로 알려줄 수 있다.

\`\`\`python
def main() -> int:
    try:
        run()
    except FileNotFoundError:
        print("파일을 찾을 수 없습니다.")
        return 1
    except ValueError:
        print("입력값이 올바르지 않습니다.")
        return 2

    return 0
\`\`\`

종료 코드는 사람이 직접 볼 수도 있지만, 자동화 시스템에서 더 중요하다.  
예를 들어 스케줄러나 배치 시스템은 종료 코드가 \`0\`인지 아닌지를 보고 성공 여부를 판단할 수 있다.

---

## 18.4 설정과 로그 연결

CLI 프로그램은 옵션으로 모든 값을 받을 수도 있지만, 옵션이 너무 많아지면 실행 명령이 길어진다.

\`\`\`bash
python app.py --input ./data --output ./result --log logs/app.log --level INFO --encoding utf-8 --format csv
\`\`\`

이런 경우에는 자주 바뀌지 않는 값은 설정 파일로 분리하고, 실행할 때 바꿔야 하는 값만 옵션으로 받는 것이 좋다.

---

### 18.4.1 설정값의 우선순위

실무에서는 설정값의 우선순위를 정해두는 것이 좋다.

일반적인 우선순위는 다음과 같다.

\`\`\`text
1. 명령행 옵션
2. 환경 변수
3. 설정 파일
4. 코드의 기본값
\`\`\`

예를 들어 출력 폴더를 결정할 때 다음 순서로 값을 찾을 수 있다.

\`\`\`text
--output 옵션이 있으면 그 값을 사용한다.
없으면 환경 변수 OUTPUT_DIR을 확인한다.
없으면 config.ini의 값을 사용한다.
없으면 기본값 result를 사용한다.
\`\`\`

이렇게 하면 프로그램을 유연하게 사용할 수 있다.

---

### 18.4.2 INI 설정 파일 사용하기

간단한 설정 파일은 \`configparser\`로 읽을 수 있다.

예를 들어 \`config.ini\` 파일을 다음처럼 작성한다.

\`\`\`ini
[paths]
input_dir = data/input
output_dir = data/output

[logging]
level = INFO
file = logs/app.log

[app]
encoding = utf-8
dry_run = false
\`\`\`

파이썬에서 읽는 코드는 다음과 같다.

\`\`\`python
import configparser
from pathlib import Path

def load_config(path: Path) -> configparser.ConfigParser:
    config = configparser.ConfigParser()
    config.read(path, encoding="utf-8")
    return config

config = load_config(Path("config.ini"))

input_dir = config["paths"]["input_dir"]
output_dir = config["paths"]["output_dir"]
log_level = config["logging"].get("level", "INFO")
\`\`\`

\`configparser\`는 문자열 기반 설정을 읽는다.  
불리언이나 정수 같은 값은 필요한 경우 변환해서 사용한다.

\`\`\`python
dry_run = config["app"].getboolean("dry_run", fallback=False)
\`\`\`

---

### 18.4.3 명령행 옵션과 설정 파일 함께 사용하기

설정 파일과 CLI 옵션을 함께 사용하면 유연한 프로그램을 만들 수 있다.

\`\`\`python
from __future__ import annotations

import argparse
import configparser
from pathlib import Path

def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--config", default="config.ini")
    parser.add_argument("--input")
    parser.add_argument("--output")
    parser.add_argument("--dry-run", action="store_true")
    return parser.parse_args(argv)

def load_config(path: Path) -> configparser.ConfigParser:
    config = configparser.ConfigParser()
    config.read(path, encoding="utf-8")
    return config

def get_value(args_value: str | None, config_value: str | None, default: str) -> str:
    if args_value is not None:
        return args_value
    if config_value is not None:
        return config_value
    return default

args = parse_args()
config = load_config(Path(args.config))

input_dir = get_value(
    args.input,
    config.get("paths", "input_dir", fallback=None),
    "data/input",
)

output_dir = get_value(
    args.output,
    config.get("paths", "output_dir", fallback=None),
    "data/output",
)
\`\`\`

이 구조에서는 명령행 옵션이 설정 파일보다 우선한다.  
즉, 평소에는 설정 파일을 사용하고, 특별한 경우에는 옵션으로 덮어쓸 수 있다.

---

### 18.4.4 로그 설정하기

자동화 프로그램은 로그가 매우 중요하다.  
화면에 출력된 메시지는 지나가면 사라지지만, 로그 파일은 나중에 확인할 수 있다.

간단한 로그 설정은 다음과 같다.

\`\`\`python
import logging
from pathlib import Path

def setup_logging(log_file: Path, level: str = "INFO") -> None:
    log_file.parent.mkdir(parents=True, exist_ok=True)

    logging.basicConfig(
        level=getattr(logging, level.upper(), logging.INFO),
        format="%(asctime)s [%(levelname)s] %(name)s - %(message)s",
        handlers=[
            logging.FileHandler(log_file, encoding="utf-8"),
            logging.StreamHandler(),
        ],
    )
\`\`\`

이 코드는 로그를 파일과 화면에 동시에 남긴다.

사용 예시는 다음과 같다.

\`\`\`python
logger = logging.getLogger(__name__)

logger.info("프로그램을 시작합니다.")
logger.warning("일부 파일을 건너뛰었습니다.")
logger.error("처리 중 오류가 발생했습니다.")
\`\`\`

로그를 남길 때는 \`print()\`를 완전히 대체하는 것이 아니라, 목적에 맞게 구분하는 것이 좋다.

- 사용자가 바로 봐야 하는 간단한 결과: \`print()\`
- 실행 기록, 오류 원인, 처리 내역: \`logging\`

---

### 18.4.5 로그 레벨을 CLI 옵션으로 받기

로그 레벨을 옵션으로 받으면 실행 상황에 따라 출력 정보를 조절할 수 있다.

\`\`\`python
parser.add_argument(
    "--log-level",
    choices=["DEBUG", "INFO", "WARNING", "ERROR"],
    default="INFO",
)
\`\`\`

실행 예시는 다음과 같다.

\`\`\`bash
python app.py --log-level DEBUG
\`\`\`

개발 중에는 \`DEBUG\`로 자세히 보고, 운영 중에는 \`INFO\`나 \`WARNING\`으로 줄이는 방식이 일반적이다.

---

## 18.5 작업 결과 저장

CLI 프로그램은 실행 결과를 화면에만 출력해서는 부족한 경우가 많다.  
실무 자동화에서는 결과를 파일로 남겨야 한다.

예를 들어 파일 검증 프로그램이라면 다음과 같은 결과를 남길 수 있다.

- 정상 파일 목록
- 실패 파일 목록
- 오류 메시지
- 처리 요약
- 실행 로그

---

### 18.5.1 텍스트 결과 저장

가장 단순한 결과는 텍스트 파일로 저장할 수 있다.

\`\`\`python
from pathlib import Path

def save_text(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")
\`\`\`

사용 예시는 다음과 같다.

\`\`\`python
summary = """처리 결과
성공: 10개
실패: 2개
"""

save_text(Path("result/summary.txt"), summary)
\`\`\`

텍스트 결과는 사람이 읽기 좋다.  
간단한 보고서나 실행 요약을 저장할 때 적합하다.

---

### 18.5.2 CSV 결과 저장

표 형태 결과는 CSV로 저장하는 것이 좋다.

\`\`\`python
import csv
from pathlib import Path

def save_csv(path: Path, rows: list[dict[str, str]]) -> None:
    if not rows:
        return

    path.parent.mkdir(parents=True, exist_ok=True)

    fieldnames = list(rows[0].keys())

    with path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
\`\`\`

사용 예시는 다음과 같다.

\`\`\`python
failed_rows = [
    {"file": "customers.csv", "error": "email 컬럼이 없습니다."},
    {"file": "orders.csv", "error": "amount 컬럼이 없습니다."},
]

save_csv(Path("result/failed.csv"), failed_rows)
\`\`\`

CSV는 엑셀이나 pandas에서 다시 열기 쉽기 때문에 데이터 처리 결과 저장에 자주 사용된다.

---

### 18.5.3 JSON 결과 저장

구조가 복잡한 결과는 JSON으로 저장할 수 있다.

\`\`\`python
import json
from pathlib import Path
from typing import Any

def save_json(path: Path, data: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(data, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
\`\`\`

사용 예시는 다음과 같다.

\`\`\`python
result = {
    "success_count": 10,
    "failed_count": 2,
    "failed_files": [
        {"file": "customers.csv", "error": "email 컬럼 없음"},
        {"file": "orders.csv", "error": "amount 컬럼 없음"},
    ],
}

save_json(Path("result/result.json"), result)
\`\`\`

JSON은 다른 프로그램과 데이터를 주고받기 좋다.  
API 수집 결과나 설정 구조를 저장할 때도 많이 사용된다.

---

### 18.5.4 실패 목록 저장하기

자동화 프로그램에서 모든 작업이 항상 성공하는 것은 아니다.  
실무에서는 일부만 실패하고 나머지는 성공하는 경우가 많다.

예를 들어 100개의 파일을 처리하는데 3개 파일만 실패할 수 있다.  
이때 프로그램 전체를 중단할지, 실패 파일만 기록하고 계속할지 결정해야 한다.

대량 처리 작업에서는 보통 실패 목록을 따로 저장하고 계속 진행한다.

\`\`\`python
def process_files(files: list[Path]) -> list[dict[str, str]]:
    failed: list[dict[str, str]] = []

    for file in files:
        try:
            process_file(file)
        except Exception as error:
            failed.append({
                "file": str(file),
                "error": str(error),
            })

    return failed
\`\`\`

이후 실패 목록을 CSV나 JSON으로 저장하면 된다.

\`\`\`python
failed = process_files(files)
save_csv(Path("result/failed.csv"), failed)
\`\`\`

실패 목록은 나중에 원인을 분석하고 재처리할 때 매우 중요하다.

---

## 18.6 실무 활용

이번 절에서는 앞에서 배운 내용을 하나로 묶어 실제 CLI 프로그램 구조를 만든다.

예제로 만들 프로그램은 **파일 확장자별 정리 도구**이다.

이 프로그램의 요구사항은 다음과 같다.

\`\`\`text
1. 입력 폴더를 받는다.
2. 출력 폴더를 받는다.
3. 입력 폴더 안의 파일을 확장자별 폴더로 이동한다.
4. --dry-run 옵션이 있으면 실제 이동하지 않고 계획만 출력한다.
5. 실행 로그를 파일과 화면에 남긴다.
6. 처리 결과 요약을 JSON 파일로 저장한다.
\`\`\`

실행 예시는 다음과 같다.

\`\`\`bash
python organize_files.py ./downloads --output ./organized --dry-run
python organize_files.py ./downloads --output ./organized --log-file logs/organize.log
\`\`\`

---

### 18.6.1 파일 확장자별 정리 CLI 전체 코드

아래 코드는 하나의 파일로 실행 가능한 예제이다.  
파일명을 \`organize_files.py\`로 저장한다.

\`\`\`python
from __future__ import annotations

import argparse
import json
import logging
import shutil
from pathlib import Path
from typing import Any

logger = logging.getLogger(__name__)


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="파일을 확장자별 폴더로 정리하는 CLI 프로그램"
    )

    parser.add_argument(
        "input_dir",
        help="정리할 파일이 들어 있는 폴더",
    )

    parser.add_argument(
        "--output",
        default="organized",
        help="정리된 파일을 저장할 폴더",
    )

    parser.add_argument(
        "--log-file",
        default="logs/organize_files.log",
        help="로그 파일 경로",
    )

    parser.add_argument(
        "--result-file",
        default="result/summary.json",
        help="처리 결과 요약 JSON 파일 경로",
    )

    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="실제 파일 이동 없이 작업 계획만 출력",
    )

    parser.add_argument(
        "--log-level",
        choices=["DEBUG", "INFO", "WARNING", "ERROR"],
        default="INFO",
        help="로그 출력 수준",
    )

    return parser.parse_args(argv)


def setup_logging(log_file: Path, level: str) -> None:
    log_file.parent.mkdir(parents=True, exist_ok=True)

    logging.basicConfig(
        level=getattr(logging, level.upper(), logging.INFO),
        format="%(asctime)s [%(levelname)s] %(name)s - %(message)s",
        handlers=[
            logging.FileHandler(log_file, encoding="utf-8"),
            logging.StreamHandler(),
        ],
    )


def find_files(input_dir: Path) -> list[Path]:
    if not input_dir.exists():
        raise FileNotFoundError(f"입력 폴더를 찾을 수 없습니다: {input_dir}")

    if not input_dir.is_dir():
        raise NotADirectoryError(f"입력 경로가 폴더가 아닙니다: {input_dir}")

    return [path for path in input_dir.iterdir() if path.is_file()]


def get_extension_folder(file: Path) -> str:
    suffix = file.suffix.lower().lstrip(".")

    if not suffix:
        return "no_extension"

    return suffix


def build_target_path(file: Path, output_dir: Path) -> Path:
    extension_folder = get_extension_folder(file)
    target_dir = output_dir / extension_folder
    return target_dir / file.name


def move_file(file: Path, target_path: Path, dry_run: bool) -> None:
    if dry_run:
        logger.info("[DRY-RUN] %s -> %s", file, target_path)
        return

    target_path.parent.mkdir(parents=True, exist_ok=True)

    if target_path.exists():
        raise FileExistsError(f"대상 파일이 이미 존재합니다: {target_path}")

    shutil.move(str(file), str(target_path))
    logger.info("파일 이동 완료: %s -> %s", file, target_path)


def organize_files(input_dir: Path, output_dir: Path, dry_run: bool) -> dict[str, Any]:
    files = find_files(input_dir)

    summary: dict[str, Any] = {
        "input_dir": str(input_dir),
        "output_dir": str(output_dir),
        "dry_run": dry_run,
        "total_files": len(files),
        "success_count": 0,
        "failed_count": 0,
        "failed_files": [],
    }

    for file in files:
        target_path = build_target_path(file, output_dir)

        try:
            move_file(file, target_path, dry_run=dry_run)
            summary["success_count"] += 1
        except Exception as error:
            logger.exception("파일 처리 실패: %s", file)
            summary["failed_count"] += 1
            summary["failed_files"].append(
                {
                    "file": str(file),
                    "error": str(error),
                }
            )

    return summary


def save_json(path: Path, data: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(data, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)

    input_dir = Path(args.input_dir)
    output_dir = Path(args.output)
    log_file = Path(args.log_file)
    result_file = Path(args.result_file)

    setup_logging(log_file, args.log_level)

    logger.info("프로그램 시작")
    logger.info("입력 폴더: %s", input_dir)
    logger.info("출력 폴더: %s", output_dir)

    try:
        summary = organize_files(
            input_dir=input_dir,
            output_dir=output_dir,
            dry_run=args.dry_run,
        )

        save_json(result_file, summary)

        logger.info("프로그램 종료")
        logger.info("전체 파일 수: %s", summary["total_files"])
        logger.info("성공: %s", summary["success_count"])
        logger.info("실패: %s", summary["failed_count"])

        print("처리가 완료되었습니다.")
        print(f"전체 파일 수: {summary['total_files']}")
        print(f"성공: {summary['success_count']}")
        print(f"실패: {summary['failed_count']}")
        print(f"결과 파일: {result_file}")

        return 0

    except Exception as error:
        logger.exception("프로그램 실행 실패")
        print(f"실행 실패: {error}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
\`\`\`

이 예제는 꽤 길지만, 실무 CLI 프로그램의 기본 구조를 대부분 포함한다.

- \`parse_args()\`는 명령행 인수를 처리한다.
- \`setup_logging()\`은 로그를 설정한다.
- \`find_files()\`는 입력 폴더의 파일 목록을 가져온다.
- \`organize_files()\`는 실제 업무 로직을 담당한다.
- \`save_json()\`은 결과를 저장한다.
- \`main()\`은 전체 실행 흐름을 관리한다.

---

### 18.6.2 실행해보기

먼저 예제 폴더를 만든다.

\`\`\`bash
mkdir downloads
\`\`\`

폴더 안에 몇 개의 파일을 넣는다.

\`\`\`text
downloads/
  report.xlsx
  memo.txt
  image.png
  data.csv
\`\`\`

미리보기 모드로 실행한다.

\`\`\`bash
python organize_files.py downloads --output organized --dry-run
\`\`\`

\`--dry-run\`을 사용했기 때문에 실제 파일 이동은 일어나지 않는다.  
대신 어떤 파일이 어디로 이동될지 로그로 확인할 수 있다.

실제 이동하려면 \`--dry-run\`을 제거한다.

\`\`\`bash
python organize_files.py downloads --output organized
\`\`\`

실행 후 결과 폴더는 다음과 비슷해진다.

\`\`\`text
organized/
  xlsx/
    report.xlsx
  txt/
    memo.txt
  png/
    image.png
  csv/
    data.csv
\`\`\`

---

### 18.6.3 결과 JSON 확인하기

기본 설정으로 실행하면 \`result/summary.json\` 파일이 생성된다.

예시는 다음과 같다.

\`\`\`json
{
  "input_dir": "downloads",
  "output_dir": "organized",
  "dry_run": false,
  "total_files": 4,
  "success_count": 4,
  "failed_count": 0,
  "failed_files": []
}
\`\`\`

이 결과 파일은 나중에 다른 프로그램에서 읽을 수도 있고, 자동화 실행 결과를 확인하는 용도로 사용할 수도 있다.

---

### 18.6.4 실무형 CLI 구조로 확장하기

프로그램이 커지면 한 파일에 모두 담는 것보다 다음처럼 구조를 나누는 것이 좋다.

\`\`\`text
file_organizer/
  app.py
  config.py
  cli.py
  logging_config.py
  services/
    organizer.py
  utils/
    file_utils.py
  tests/
    test_organizer.py
\`\`\`

각 파일의 역할은 다음과 같다.

| 파일 | 역할 |
|---|---|
| \`app.py\` | 프로그램 실행 진입점 |
| \`cli.py\` | 명령행 인수 처리 |
| \`config.py\` | 설정값 관리 |
| \`logging_config.py\` | 로그 설정 |
| \`services/organizer.py\` | 파일 정리 핵심 로직 |
| \`utils/file_utils.py\` | 파일 관련 보조 함수 |
| \`tests/\` | 테스트 코드 |

이 구조는 처음에는 복잡해 보일 수 있다.  
하지만 기능이 늘어날수록 역할을 분리한 구조가 훨씬 유지보수하기 쉽다.

---

## 18.7 종합 실습: CSV 검증 CLI 만들기

이번에는 데이터분석 과정으로 이어지는 예제를 살펴보자.  
데이터분석을 하기 전에는 원천 데이터가 올바른지 확인해야 한다. CSV 파일에 필수 컬럼이 없거나 빈 값이 많으면 분석 결과도 신뢰하기 어렵다.

이번 실습의 목표는 다음과 같다.

\`\`\`text
1. CSV 파일 경로를 입력받는다.
2. 필수 컬럼 목록을 옵션으로 받는다.
3. 필수 컬럼이 없으면 실패 처리한다.
4. 각 행에서 필수값이 비어 있는지 검사한다.
5. 문제가 있는 행을 CSV로 저장한다.
6. 전체 결과를 화면과 로그에 출력한다.
\`\`\`

실행 예시는 다음과 같다.

\`\`\`bash
python validate_csv.py customers.csv --required name email phone --failed-output result/failed_rows.csv
\`\`\`

---

### 18.7.1 CSV 검증 CLI 예제 코드

\`\`\`python
from __future__ import annotations

import argparse
import csv
import logging
from pathlib import Path

logger = logging.getLogger(__name__)


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="CSV 필수 컬럼과 빈 값을 검사하는 도구")

    parser.add_argument("input_file", help="검사할 CSV 파일 경로")

    parser.add_argument(
        "--required",
        nargs="+",
        required=True,
        help="필수 컬럼 목록",
    )

    parser.add_argument(
        "--failed-output",
        default="result/failed_rows.csv",
        help="문제 행 저장 파일",
    )

    parser.add_argument(
        "--encoding",
        default="utf-8",
        help="CSV 파일 인코딩",
    )

    return parser.parse_args(argv)


def read_csv(path: Path, encoding: str) -> list[dict[str, str]]:
    with path.open("r", encoding=encoding, newline="") as file:
        reader = csv.DictReader(file)
        return list(reader)


def check_required_columns(rows: list[dict[str, str]], required: list[str]) -> None:
    if not rows:
        raise ValueError("CSV 파일에 데이터가 없습니다.")

    columns = set(rows[0].keys())
    missing = [column for column in required if column not in columns]

    if missing:
        raise ValueError(f"필수 컬럼이 없습니다: {missing}")


def find_failed_rows(
    rows: list[dict[str, str]],
    required: list[str],
) -> list[dict[str, str]]:
    failed_rows: list[dict[str, str]] = []

    for index, row in enumerate(rows, start=2):
        missing_values = [
            column
            for column in required
            if not row.get(column, "").strip()
        ]

        if missing_values:
            failed_row = dict(row)
            failed_row["row_number"] = str(index)
            failed_row["error"] = f"빈 값 컬럼: {', '.join(missing_values)}"
            failed_rows.append(failed_row)

    return failed_rows


def save_failed_rows(path: Path, rows: list[dict[str, str]]) -> None:
    if not rows:
        return

    path.parent.mkdir(parents=True, exist_ok=True)

    fieldnames = list(rows[0].keys())

    with path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)

    input_file = Path(args.input_file)
    failed_output = Path(args.failed_output)

    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",
    )

    try:
        rows = read_csv(input_file, encoding=args.encoding)
        check_required_columns(rows, args.required)
        failed_rows = find_failed_rows(rows, args.required)
        save_failed_rows(failed_output, failed_rows)

        print(f"전체 행 수: {len(rows)}")
        print(f"문제 행 수: {len(failed_rows)}")

        if failed_rows:
            print(f"문제 행 저장 위치: {failed_output}")

        logger.info("CSV 검증 완료")
        return 0

    except Exception as error:
        logger.exception("CSV 검증 실패")
        print(f"검증 실패: {error}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
\`\`\`

---

### 18.7.2 데이터분석 과정과의 연결

데이터분석에서는 \`pandas\`를 사용해 데이터를 분석하는 일이 많다.  
하지만 분석 전에 데이터가 어떤 상태인지 확인하지 않으면, 분석 결과가 잘못될 수 있다.

예를 들어 다음과 같은 문제는 분석 전에 발견하는 것이 좋다.

- 필수 컬럼이 없음
- 이메일이 비어 있음
- 전화번호 형식이 다름
- 날짜 형식이 섞여 있음
- 금액 컬럼에 문자가 들어 있음
- 중복 행이 있음

CLI 검증 도구를 만들어두면 분석 전에 원천 데이터를 자동으로 검사할 수 있다.

\`\`\`bash
python validate_csv.py customers.csv --required name email phone
\`\`\`

이런 도구는 데이터분석 기초 과정으로 넘어가기 전에 매우 좋은 준비가 된다.

---

## 18.8 CLI 프로그램 설계 체크리스트

실무 CLI 프로그램을 만들 때는 다음 항목을 확인하자.

### 실행 관련

- 프로그램 실행 명령이 명확한가?
- \`--help\` 메시지가 충분한가?
- 필수 인수와 선택 옵션이 잘 구분되어 있는가?
- 잘못된 인수가 들어왔을 때 적절한 메시지가 나오는가?
- 종료 코드가 성공과 실패를 구분하는가?

### 입력 관련

- 입력 파일 또는 폴더가 존재하는지 확인하는가?
- 파일인지 폴더인지 검사하는가?
- 인코딩을 지정할 수 있는가?
- 필요한 컬럼이나 필드를 검증하는가?
- 잘못된 입력값을 초기에 막는가?

### 처리 관련

- 실제 작업 로직이 함수로 분리되어 있는가?
- \`main()\`이 너무 많은 일을 하지 않는가?
- 일부 데이터 실패 시 전체 중단 여부가 명확한가?
- \`--dry-run\`이 필요한 작업인가?
- 테스트 가능한 구조인가?

### 출력 관련

- 결과를 화면에 적절히 출력하는가?
- 결과 파일을 저장하는가?
- 실패 목록을 따로 저장하는가?
- 로그 파일이 남는가?
- 자동화 시스템이 결과를 확인할 수 있는가?

### 유지보수 관련

- 설정값이 코드 안에 흩어져 있지 않은가?
- 경로 처리는 \`Path\`로 통일되어 있는가?
- 로그 레벨을 조정할 수 있는가?
- 함수 이름이 역할을 잘 드러내는가?
- 테스트를 추가하기 쉬운가?

---

## 18.9 실무 패턴 정리

### 패턴 1: \`main()\` 중심 구조

\`\`\`python
def main() -> int:
    args = parse_args()
    setup_logging()
    run(args)
    return 0
\`\`\`

CLI 프로그램에서는 \`main()\`이 전체 흐름을 관리하고, 세부 작업은 함수나 클래스로 분리하는 것이 좋다.

---

### 패턴 2: 인수 파싱 분리

\`\`\`python
def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    ...
\`\`\`

\`argv\`를 받을 수 있게 만들면 테스트가 쉬워진다.

---

### 패턴 3: 경로는 \`Path\`로 변환

\`\`\`python
input_dir = Path(args.input_dir)
output_dir = Path(args.output)
\`\`\`

문자열 경로는 초기에 \`Path\`로 바꾸고, 이후에는 \`Path\` 객체로 처리하는 것이 좋다.

---

### 패턴 4: 설정값 우선순위 정하기

\`\`\`text
명령행 옵션 > 환경 변수 > 설정 파일 > 기본값
\`\`\`

우선순위를 정해두면 코드가 복잡해지는 것을 줄일 수 있다.

---

### 패턴 5: \`--dry-run\` 제공하기

파일 이동, 삭제, 덮어쓰기처럼 위험한 작업에는 \`--dry-run\`을 제공하는 것이 좋다.

\`\`\`bash
python organize.py ./downloads --dry-run
\`\`\`

---

### 패턴 6: 실패 목록 저장하기

대량 처리 작업에서는 실패한 항목을 따로 저장하는 것이 중요하다.

\`\`\`text
failed.csv
failed.json
logs/app.log
\`\`\`

실패 목록은 재처리와 원인 분석에 사용된다.

---

## 핵심 정리

이번 장에서는 실무 자동화 프로그램을 CLI 형태로 만드는 방법을 배웠다.

CLI 프로그램은 터미널에서 명령어와 옵션으로 실행하는 프로그램이다.  
처음에는 낯설 수 있지만, 반복 작업을 자동화하거나 스케줄러에서 실행할 때 매우 유용하다.

\`argparse\`를 사용하면 위치 인자, 선택 옵션, 기본값, 타입 변환, 허용값 제한, 플래그 옵션, 하위 명령어를 쉽게 만들 수 있다.

실무 CLI 프로그램은 보통 다음 구조를 가진다.

\`\`\`text
인수 파싱
설정 읽기
로그 설정
작업 실행
결과 저장
종료 코드 반환
\`\`\`

좋은 CLI 프로그램은 실행 방법이 명확하고, 실패했을 때 원인을 알 수 있으며, 결과를 파일과 로그로 남긴다.  
또한 \`main()\`에 모든 코드를 넣지 않고, 인수 파싱 함수, 실행 함수, 저장 함수, 검증 함수로 나누어 테스트하기 쉬운 구조로 만든다.

이번 장에서 만든 파일 정리 도구와 CSV 검증 도구는 데이터분석 전 단계의 자동화와도 연결된다.  
데이터분석 기초 과정으로 넘어가기 전에, 데이터를 수집하고 검증하고 저장하는 CLI 도구를 만들 수 있으면 분석 작업을 훨씬 안정적으로 시작할 수 있다.

---

## 연습문제

### 문제 1

CLI 프로그램과 GUI 프로그램의 차이를 설명하시오.

---

### 문제 2

다음 명령에서 위치 인자와 선택 옵션을 구분하시오.

\`\`\`bash
python validate_csv.py customers.csv --required name email --encoding utf-8
\`\`\`

---

### 문제 3

다음 조건을 만족하는 \`argparse\` 코드를 작성하시오.

\`\`\`text
1. 입력 파일을 위치 인자로 받는다.
2. 출력 파일은 --output 옵션으로 받는다.
3. --output의 기본값은 result.txt이다.
\`\`\`

---

### 문제 4

\`--dry-run\` 옵션을 만들 때 사용할 수 있는 \`argparse\` 설정을 작성하시오.

---

### 문제 5

다음 코드에서 \`main()\`이 반환하는 \`0\`과 \`1\`은 각각 어떤 의미로 사용하는가?

\`\`\`python
def main() -> int:
    try:
        run()
        return 0
    except Exception:
        return 1
\`\`\`

---

### 문제 6

설정값의 우선순위를 다음 네 가지 요소를 사용해 일반적인 순서로 작성하시오.

\`\`\`text
환경 변수
코드 기본값
명령행 옵션
설정 파일
\`\`\`

---

### 문제 7

\`Path("data") / "input.csv"\` 코드의 의미를 설명하시오.

---

### 문제 8

자동화 프로그램에서 로그 파일이 중요한 이유를 두 가지 이상 설명하시오.

---

### 문제 9

파일 이동이나 삭제 기능이 있는 CLI 프로그램에서 \`--dry-run\` 옵션이 필요한 이유를 설명하시오.

---

### 문제 10

다음 요구사항을 만족하는 CLI 프로그램의 실행 명령 예시를 작성하시오.

\`\`\`text
프로그램 이름: collect_api.py
필수 옵션: --date
선택 옵션: --output
출력 파일 기본값: result.json
예시 날짜: 2026-06-16
\`\`\`

---

### 문제 11

다음 코드의 문제점을 설명하시오.

\`\`\`python
def main():
    args = parse_args()
    # 인수 처리
    # 파일 읽기
    # 데이터 검증
    # 결과 저장
    # 로그 출력
    # 예외 처리
    # 화면 출력
\`\`\`

---

### 문제 12

CSV 검증 CLI에서 실패한 행을 별도 CSV로 저장하는 이유를 설명하시오.

---

## 정답 및 해설

### 문제 1 정답

CLI 프로그램은 터미널에서 명령어와 옵션으로 실행하는 프로그램이고, GUI 프로그램은 버튼, 메뉴, 입력창 같은 화면 요소를 사용해 조작하는 프로그램이다.

CLI는 처음에는 낯설 수 있지만 자동화에 강하다.  
GUI는 사람이 직접 사용하기 쉽지만 반복 실행이나 스케줄러 연동에는 상대적으로 불리하다.

---

### 문제 2 정답

명령은 다음과 같다.

\`\`\`bash
python validate_csv.py customers.csv --required name email --encoding utf-8
\`\`\`

위치 인자는 다음이다.

\`\`\`text
customers.csv
\`\`\`

선택 옵션은 다음이다.

\`\`\`text
--required name email
--encoding utf-8
\`\`\`

\`--required\`는 여러 값을 받는 옵션이고, \`--encoding\`은 인코딩 값을 받는 옵션이다.

---

### 문제 3 정답

예시 코드는 다음과 같다.

\`\`\`python
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("input_file")
parser.add_argument("--output", default="result.txt")

args = parser.parse_args()
\`\`\`

\`input_file\`은 위치 인자이고, \`--output\`은 선택 옵션이다.

---

### 문제 4 정답

예시는 다음과 같다.

\`\`\`python
parser.add_argument("--dry-run", action="store_true")
\`\`\`

\`action="store_true"\`를 사용하면 옵션이 있을 때 \`True\`, 없을 때 \`False\`가 된다.

---

### 문제 5 정답

일반적으로 \`0\`은 성공을 의미하고, \`1\`은 실패를 의미한다.

\`\`\`python
return 0
\`\`\`

은 프로그램이 정상적으로 끝났다는 뜻이다.

\`\`\`python
return 1
\`\`\`

은 프로그램 실행 중 오류가 발생했다는 뜻으로 사용할 수 있다.

---

### 문제 6 정답

일반적인 우선순위는 다음과 같다.

\`\`\`text
1. 명령행 옵션
2. 환경 변수
3. 설정 파일
4. 코드 기본값
\`\`\`

실행할 때 직접 입력한 명령행 옵션이 가장 우선순위가 높다.  
코드 기본값은 아무 설정도 없을 때 마지막으로 사용된다.

---

### 문제 7 정답

\`\`\`python
Path("data") / "input.csv"
\`\`\`

은 \`data\` 폴더 안의 \`input.csv\` 파일 경로를 만든다는 의미이다.

문자열을 직접 이어 붙이는 대신 \`Path\` 객체와 \`/\` 연산자를 사용하면 운영체제별 경로 차이를 더 안전하게 처리할 수 있다.

---

### 문제 8 정답

예시 답안은 다음과 같다.

\`\`\`text
1. 프로그램이 언제 실행되었는지 확인할 수 있다.
2. 어떤 파일이 성공하고 실패했는지 기록할 수 있다.
3. 오류가 발생했을 때 원인을 추적할 수 있다.
4. 자동화 작업은 사람이 항상 보고 있지 않으므로 실행 기록이 필요하다.
\`\`\`

로그는 자동화 프로그램의 실행 이력이다.  
나중에 문제가 생겼을 때 로그가 없으면 원인을 찾기 어렵다.

---

### 문제 9 정답

\`--dry-run\`은 실제 작업을 수행하지 않고 어떤 작업이 일어날지만 미리 보여주는 옵션이다.

파일 이동, 삭제, 덮어쓰기처럼 되돌리기 어려운 작업은 실행 전에 미리 확인할 수 있어야 한다.  
따라서 \`--dry-run\`을 제공하면 실수로 파일을 잘못 옮기거나 삭제하는 위험을 줄일 수 있다.

---

### 문제 10 정답

예시 명령은 다음과 같다.

\`\`\`bash
python collect_api.py --date 2026-06-16
\`\`\`

출력 파일 기본값이 \`result.json\`이라면 \`--output\`을 생략할 수 있다.

출력 파일을 직접 지정하려면 다음처럼 작성할 수 있다.

\`\`\`bash
python collect_api.py --date 2026-06-16 --output data/result.json
\`\`\`

---

### 문제 11 정답

이 코드는 \`main()\` 함수가 너무 많은 일을 하고 있다.

\`main()\` 안에 인수 처리, 파일 읽기, 데이터 검증, 결과 저장, 로그 출력, 예외 처리, 화면 출력이 모두 들어가면 코드가 길어지고 테스트하기 어렵다.

좋은 구조는 다음처럼 역할을 나누는 것이다.

\`\`\`text
parse_args()
setup_logging()
read_file()
validate_data()
save_result()
run()
main()
\`\`\`

\`main()\`은 전체 흐름만 관리하고, 실제 작업은 별도 함수로 분리하는 것이 좋다.

---

### 문제 12 정답

CSV 검증에서 실패한 행을 별도 파일로 저장하면 다음 작업이 쉬워진다.

\`\`\`text
1. 어떤 행이 실패했는지 확인할 수 있다.
2. 실패 원인을 분석할 수 있다.
3. 실패한 행만 수정하거나 재처리할 수 있다.
4. 전체 데이터 중 일부만 실패해도 나머지 처리를 계속할 수 있다.
\`\`\`

데이터분석 전에는 원천 데이터의 품질이 중요하다.  
실패 행을 별도로 저장하면 데이터 품질 문제를 추적하고 개선하기 쉽다.

---

## 참고 문서

- Python 공식 문서: \`argparse\` — Parser for command-line options, arguments and subcommands  
  <https://docs.python.org/3/library/argparse.html>

- Python 공식 문서: \`logging\` — Logging facility for Python  
  <https://docs.python.org/3/library/logging.html>

- Python 공식 문서: \`logging.handlers\` — Logging handlers  
  <https://docs.python.org/3/library/logging.handlers.html>

- Python 공식 문서: \`configparser\` — Configuration file parser  
  <https://docs.python.org/3/library/configparser.html>

- Python 공식 문서: \`pathlib\` — Object-oriented filesystem paths  
  <https://docs.python.org/3/library/pathlib.html>
`;export{e as default};