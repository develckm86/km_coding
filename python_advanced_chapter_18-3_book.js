var e=`<!-- 원본: python_advanced_chapter_18_book.md / 세부 장: 18-3 -->

# 18.3 실행 구조 만들기

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
`;export{e as default};