var e=`<!-- 원본: python_advanced_chapter_18_book.md / 세부 장: 18-9 -->

# 18.9 실무 패턴 정리

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