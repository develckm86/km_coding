var e=`<!-- 원본: python_advanced_chapter_18_book.md / 세부 장: 18-6 -->

# 18.6 실무 활용

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
`;export{e as default};