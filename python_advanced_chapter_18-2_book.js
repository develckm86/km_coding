var e=`<!-- 원본: python_advanced_chapter_18_book.md / 세부 장: 18-2 -->

# 18.2 \`argparse\` 심화

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
`;export{e as default};