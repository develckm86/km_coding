var e=`<!-- 원본: python_advanced_chapter_18_book.md / 세부 장: 18-4 -->

# 18.4 설정과 로그 연결

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
`;export{e as default};