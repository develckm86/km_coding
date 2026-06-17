var e=`<!-- 원본: python_advanced_chapter_10_book.md / 세부 장: 10-7 -->

# 10.7 실무 프로젝트 예시 구조

이제 지금까지 배운 내용을 바탕으로 고급 파이썬 수업과 데이터분석 과정 사이에 적합한 프로젝트 구조를 설계해 봅시다.

여기서는 \`sales_tool\`이라는 데이터 처리 도구를 예로 들겠습니다.

---

## 10.7.1 기본 구조

\`\`\`text
sales-tool/
  README.md
  pyproject.toml
  requirements.txt
  requirements-dev.txt
  .gitignore
  data/
    input/
    output/
  logs/
  src/
    sales_tool/
      __init__.py
      main.py
      config.py
      logging_config.py
      models.py
      readers.py
      validators.py
      transformers.py
      writers.py
      services.py
      utils/
        __init__.py
        path_utils.py
        date_utils.py
  tests/
    test_validators.py
    test_transformers.py
\`\`\`

각 요소의 역할은 다음과 같습니다.

\`\`\`text
README.md             프로젝트 설명과 실행 방법
pyproject.toml         프로젝트 메타데이터와 도구 설정
requirements.txt       실행용 의존성
requirements-dev.txt   개발용 의존성
.gitignore             Git에 올리지 않을 파일 목록
data/                  예제 데이터 또는 로컬 데이터
logs/                  로그 파일
src/                   실제 패키지 코드
tests/                 테스트 코드
\`\`\`

여기서 \`src/\` 폴더 안에 실제 패키지를 넣는 구조를 **src layout**이라고 부릅니다.

---

## 10.7.2 src layout

\`src layout\`은 실제 import 가능한 패키지를 프로젝트 루트가 아니라 \`src/\` 아래에 두는 방식입니다.

\`\`\`text
sales-tool/
  src/
    sales_tool/
      __init__.py
      main.py
\`\`\`

반대로 프로젝트 루트에 바로 패키지를 두는 방식도 있습니다.

\`\`\`text
sales-tool/
  sales_tool/
    __init__.py
    main.py
\`\`\`

이런 방식은 \`flat layout\`이라고 부를 수 있습니다.

\`src layout\`은 처음에는 한 단계 더 깊어 보여서 복잡하게 느껴질 수 있습니다. 하지만 실무 패키지에서는 장점이 있습니다.

\`\`\`text
- 프로젝트 루트에 있는 파일이 우연히 import되는 문제를 줄인다.
- 설치된 패키지를 기준으로 테스트하는 습관을 만들 수 있다.
- 패키지 코드와 설정 파일, 테스트 파일, 데이터 파일이 명확히 분리된다.
\`\`\`

학습 초반에는 \`flat layout\`도 괜찮습니다. 하지만 고급 과정 이후 데이터 수집 도구나 분석 전처리 패키지를 만들 계획이라면 \`src layout\`에 익숙해지는 것이 좋습니다.

---

## 10.7.3 \`src layout\`에서 실행하기

\`src layout\`을 사용할 때는 패키지를 설치 가능한 상태로 만들어 실행하는 것이 일반적입니다.

개발 중에는 editable 설치를 사용할 수 있습니다.

\`\`\`bash
pip install -e .
\`\`\`

이 명령은 현재 프로젝트를 개발 모드로 설치합니다. 그러면 \`src/sales_tool\` 안의 코드를 수정해도 다시 설치하지 않고 변경 사항을 반영할 수 있습니다.

그다음 모듈 형태로 실행할 수 있습니다.

\`\`\`bash
python -m sales_tool.main
\`\`\`

\`main.py\`에는 다음처럼 실행 진입점을 둡니다.

\`\`\`python
# src/sales_tool/main.py
from sales_tool.config import load_settings
from sales_tool.services import run_pipeline


def main() -> None:
    settings = load_settings()
    run_pipeline(settings)


if __name__ == "__main__":
    main()
\`\`\`

---

## 10.7.4 패키지 내부 코드 예시

\`models.py\`에는 데이터 구조를 둡니다.

\`\`\`python
# src/sales_tool/models.py
from dataclasses import dataclass


@dataclass(frozen=True)
class SalesRow:
    product: str
    price: int
    quantity: int


@dataclass(frozen=True)
class SalesResult:
    product: str
    price: int
    quantity: int
    total: int
\`\`\`

\`readers.py\`에는 파일 읽기 코드를 둡니다.

\`\`\`python
# src/sales_tool/readers.py
import csv
from pathlib import Path


def read_sales_csv(path: Path) -> list[dict[str, str]]:
    with open(path, "r", encoding="utf-8") as f:
        return list(csv.DictReader(f))
\`\`\`

\`validators.py\`에는 검증 코드를 둡니다.

\`\`\`python
# src/sales_tool/validators.py

REQUIRED_COLUMNS = {"product", "price", "quantity"}


def validate_columns(row: dict[str, str]) -> None:
    missing = REQUIRED_COLUMNS - row.keys()
    if missing:
        raise ValueError(f"필수 컬럼이 없습니다: {missing}")


def validate_number(value: str, field_name: str) -> None:
    if not value.strip().isdigit():
        raise ValueError(f"{field_name} 값은 숫자여야 합니다: {value}")
\`\`\`

\`transformers.py\`에는 변환 코드를 둡니다.

\`\`\`python
# src/sales_tool/transformers.py
from sales_tool.models import SalesResult
from sales_tool.validators import validate_columns, validate_number


def transform_row(row: dict[str, str]) -> SalesResult:
    validate_columns(row)
    validate_number(row["price"], "price")
    validate_number(row["quantity"], "quantity")

    price = int(row["price"])
    quantity = int(row["quantity"])

    return SalesResult(
        product=row["product"].strip(),
        price=price,
        quantity=quantity,
        total=price * quantity,
    )
\`\`\`

\`writers.py\`에는 저장 코드를 둡니다.

\`\`\`python
# src/sales_tool/writers.py
import csv
from dataclasses import asdict
from pathlib import Path
from sales_tool.models import SalesResult


def write_sales_csv(rows: list[SalesResult], path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)

    with open(path, "w", encoding="utf-8", newline="") as f:
        fieldnames = ["product", "price", "quantity", "total"]
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()

        for row in rows:
            writer.writerow(asdict(row))
\`\`\`

\`services.py\`에는 전체 처리 흐름을 둡니다.

\`\`\`python
# src/sales_tool/services.py
from sales_tool.config import Settings
from sales_tool.readers import read_sales_csv
from sales_tool.transformers import transform_row
from sales_tool.writers import write_sales_csv


def run_pipeline(settings: Settings) -> None:
    raw_rows = read_sales_csv(settings.input_file)
    results = [transform_row(row) for row in raw_rows]
    write_sales_csv(results, settings.output_file)
\`\`\`

이 구조의 장점은 각 파일의 책임이 분명하다는 것입니다.

\`\`\`text
models.py        데이터 구조
readers.py       입력
validators.py    검증
transformers.py  변환
writers.py       출력
services.py      흐름 조합
main.py          실행 진입점
\`\`\`

---

## 10.7.5 테스트 구조

테스트 코드는 \`tests/\` 폴더에 둡니다.

\`\`\`text
tests/
  test_validators.py
  test_transformers.py
\`\`\`

예를 들어 변환 함수를 테스트할 수 있습니다.

\`\`\`python
# tests/test_transformers.py
from sales_tool.transformers import transform_row


def test_transform_row() -> None:
    row = {
        "product": "키보드",
        "price": "30000",
        "quantity": "2",
    }

    result = transform_row(row)

    assert result.product == "키보드"
    assert result.price == 30000
    assert result.quantity == 2
    assert result.total == 60000
\`\`\`

잘못된 값이 들어왔을 때 예외가 발생하는지도 확인할 수 있습니다.

\`\`\`python
import pytest
from sales_tool.transformers import transform_row


def test_transform_row_with_invalid_price() -> None:
    row = {
        "product": "키보드",
        "price": "삼만원",
        "quantity": "2",
    }

    with pytest.raises(ValueError):
        transform_row(row)
\`\`\`

패키지 구조가 잘 잡혀 있으면 테스트가 훨씬 쉬워집니다. 반대로 모든 코드가 \`main.py\`에 섞여 있으면 일부 함수만 따로 테스트하기 어렵습니다.

---

## 10.7.6 README 작성

실무 프로젝트에는 README가 필요합니다. README는 미래의 나와 동료를 위한 사용 설명서입니다.

간단한 README 구조는 다음과 같습니다.

\`\`\`markdown
# sales-tool

CSV 매출 데이터를 검증하고 총액을 계산해 새 CSV 파일로 저장하는 도구입니다.

## 설치

\`\`\`bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
\`\`\`

## 실행

\`\`\`bash
python -m sales_tool.main
\`\`\`

## 환경 변수

| 이름 | 설명 | 기본값 |
|---|---|---|
| INPUT_FILE | 입력 CSV 경로 | data/input/sales.csv |
| OUTPUT_FILE | 출력 CSV 경로 | data/output/result.csv |
| LOG_FILE | 로그 파일 경로 | logs/app.log |

## 테스트

\`\`\`bash
pytest
\`\`\`
\`\`\`
\`\`\`

README를 작성하면 프로젝트를 다시 열었을 때 빠르게 실행 방법을 기억할 수 있습니다.

---

## 10.8 프로젝트 구조 설계 원칙

지금까지 다양한 구조를 살펴보았습니다. 마지막으로 실무에서 사용할 수 있는 기준을 정리해 봅시다.

---

## 10.8.1 작게 시작하고 필요할 때 나누기

처음부터 다음과 같은 구조를 만들 필요는 없습니다.

\`\`\`text
models/
services/
repositories/
controllers/
interfaces/
infrastructure/
\`\`\`

프로젝트가 작다면 다음 정도로 충분합니다.

\`\`\`text
main.py
config.py
utils.py
\`\`\`

기능이 늘어나면 나눕니다.

\`\`\`text
main.py
config.py
readers.py
writers.py
transformers.py
validators.py
\`\`\`

더 커지면 폴더로 나눕니다.

\`\`\`text
readers/
writers/
services/
models/
\`\`\`

구조는 코드를 돕기 위해 존재해야 합니다. 구조 자체가 목적이 되면 안 됩니다.

---

## 10.8.2 역할이 섞이면 분리하기

하나의 파일이나 함수가 너무 많은 일을 하면 분리할 신호입니다.

다음 함수는 너무 많은 일을 합니다.

\`\`\`python
def process_sales() -> None:
    # 설정 읽기
    # CSV 읽기
    # 데이터 검증
    # 총액 계산
    # 결과 저장
    # 로그 출력
    pass
\`\`\`

역할별로 나누면 더 좋습니다.

\`\`\`python
def load_settings() -> Settings:
    ...


def read_sales_csv(path: Path) -> list[dict[str, str]]:
    ...


def transform_row(row: dict[str, str]) -> SalesResult:
    ...


def write_sales_csv(rows: list[SalesResult], path: Path) -> None:
    ...


def run_pipeline(settings: Settings) -> None:
    ...
\`\`\`

이렇게 나누면 각 함수가 짧아지고, 테스트도 쉬워집니다.

---

## 10.8.3 import 방향을 단순하게 유지하기

좋은 프로젝트는 import 방향이 비교적 단순합니다.

예를 들어 다음 방향은 자연스럽습니다.

\`\`\`text
main.py -> services.py -> readers.py
                  └----> transformers.py -> validators.py
                  └----> writers.py
\`\`\`

하지만 모든 파일이 서로를 import하면 구조가 복잡해집니다.

\`\`\`text
A -> B -> C -> A
\`\`\`

이런 구조는 순환 import를 만들기 쉽습니다.

가능하면 낮은 수준의 유틸리티 모듈은 높은 수준의 서비스 모듈을 import하지 않게 합니다.

\`\`\`text
utils.py        다른 모듈을 거의 모름
models.py       데이터 구조만 정의
validators.py   models 정도만 의존
services.py     여러 기능을 조합
main.py         실행 흐름 시작
\`\`\`

---

## 10.8.4 데이터분석으로 이어지는 구조

데이터분석 프로젝트에서는 노트북과 \`.py\` 파일을 함께 사용하는 경우가 많습니다.

예를 들어 다음 구조가 가능합니다.

\`\`\`text
analysis-project/
  README.md
  requirements.txt
  data/
    raw/
    processed/
  notebooks/
    01_exploration.ipynb
    02_analysis.ipynb
  src/
    analysis_tools/
      __init__.py
      readers.py
      cleaners.py
      validators.py
      features.py
  tests/
\`\`\`

노트북에는 탐색과 시각화 코드를 두고, 반복적으로 사용하는 함수는 \`src/analysis_tools\`로 옮깁니다.

\`\`\`text
노트북에 남기기 좋은 코드:
- 데이터 확인
- 그래프 출력
- 분석 아이디어 실험
- 중간 결과 관찰

.py 파일로 옮기기 좋은 코드:
- 반복 사용되는 전처리 함수
- 데이터 검증 함수
- 파일 읽기 함수
- API 수집 함수
- 테스트가 필요한 로직
\`\`\`

이 습관을 만들면 데이터분석 기초와 고급 과정에서 코드를 훨씬 안정적으로 관리할 수 있습니다.

---

# 10장 핵심 정리

이번 장에서는 파이썬 코드를 실무 프로젝트 형태로 구성하는 방법을 배웠습니다.

핵심 내용은 다음과 같습니다.

\`\`\`text
1. 코드가 길어지면 역할별로 파일을 나누어야 한다.
2. 모듈은 하나의 .py 파일이고, 패키지는 모듈을 폴더 단위로 묶은 구조다.
3. import는 모듈을 찾고, 실행하고, 이름에 연결하는 과정이다.
4. 모듈은 처음 import될 때 최상위 코드가 실행된다.
5. 이미 import된 모듈은 sys.modules 캐시에서 재사용된다.
6. 실행 코드와 기능 코드는 분리하는 것이 좋다.
7. 절대 import는 전체 패키지 경로를 기준으로 하고, 상대 import는 현재 모듈 위치를 기준으로 한다.
8. 순환 import는 보통 설계가 서로 강하게 얽혀 있다는 신호다.
9. __init__.py는 패키지 초기화와 공개 API 정리에 사용할 수 있다.
10. 설정값과 민감 정보는 코드에서 분리해야 한다.
11. pyproject.toml은 프로젝트 메타데이터와 도구 설정을 담을 수 있다.
12. requirements.txt는 환경에 설치할 의존성 목록을 관리하는 데 사용한다.
13. src layout은 패키지 코드와 프로젝트 루트 파일을 명확히 분리하는 구조다.
14. 데이터분석으로 넘어가기 전, 반복 사용되는 코드는 .py 파일과 패키지로 정리하는 습관이 필요하다.
\`\`\`

---

# 10장 연습문제

## 문제 1. 단일 파일의 한계

다음 중 코드가 커졌을 때 하나의 파일에 모든 코드를 넣는 방식의 문제로 적절하지 않은 것은 무엇인가요?

A. 원하는 함수를 찾기 어려워질 수 있다.  
B. 테스트하기 어려워질 수 있다.  
C. 기능별 재사용이 어려워질 수 있다.  
D. 파이썬 코드가 절대 실행되지 않는다.

---

## 문제 2. 모듈과 패키지

다음 설명 중 올바른 것을 고르세요.

A. 모듈은 반드시 폴더여야 한다.  
B. 패키지는 여러 모듈을 계층적으로 묶는 구조로 사용할 수 있다.  
C. 패키지 안에는 하위 패키지를 둘 수 없다.  
D. \`__init__.py\`에는 반드시 데이터베이스 연결 코드가 있어야 한다.

---

## 문제 3. import 시 실행되는 코드

다음 파일이 있습니다.

\`\`\`python
# hello.py
print("hello module")

message = "안녕하세요"
\`\`\`

다른 파일에서 다음 코드를 실행하면 어떤 일이 일어날까요?

\`\`\`python
import hello
print(hello.message)
\`\`\`

실행 결과를 예상해 보세요.

---

## 문제 4. \`if __name__ == "__main__"\`

다음 코드에서 \`if __name__ == "__main__":\`를 사용하는 이유를 설명해 보세요.

\`\`\`python
def main() -> None:
    print("프로그램을 실행합니다.")


if __name__ == "__main__":
    main()
\`\`\`

---

## 문제 5. 절대 import와 상대 import

다음 구조가 있습니다.

\`\`\`text
sales_app/
  __init__.py
  services/
    __init__.py
    processor.py
  utils/
    __init__.py
    date_utils.py
\`\`\`

\`processor.py\`에서 \`date_utils.py\`의 \`get_today_string()\` 함수를 절대 import하는 코드를 작성해 보세요.

---

## 문제 6. 순환 import

다음 구조는 어떤 문제가 생길 수 있나요?

\`\`\`python
# a.py
from b import B

class A:
    pass
\`\`\`

\`\`\`python
# b.py
from a import A

class B:
    pass
\`\`\`

문제의 이름과 해결 방향을 간단히 설명해 보세요.

---

## 문제 7. 설정 관리

다음 코드의 문제점을 설명해 보세요.

\`\`\`python
API_KEY = "secret-key-123"
API_URL = "https://api.example.com"
\`\`\`

그리고 더 나은 방식을 간단히 작성해 보세요.

---

## 문제 8. \`requirements.txt\`

\`requirements.txt\` 파일의 역할을 설명해 보세요.

---

## 문제 9. 프로젝트 구조 설계

다음 기능을 가진 작은 도구를 만들려고 합니다.

\`\`\`text
1. CSV 파일을 읽는다.
2. 각 행의 값을 검증한다.
3. 금액을 계산한다.
4. 결과를 새 CSV로 저장한다.
5. 테스트 코드를 작성한다.
\`\`\`

적절한 파일 구조를 설계해 보세요.

---

## 문제 10. 데이터분석 프로젝트에서 \`.py\` 파일로 분리하면 좋은 코드

다음 중 주피터 노트북에만 두기보다 \`.py\` 파일로 분리하기 좋은 코드를 모두 고르세요.

A. 반복적으로 사용하는 결측치 처리 함수  
B. 한 번만 확인해 보는 그래프 출력 코드  
C. 여러 노트북에서 사용하는 파일 읽기 함수  
D. 데이터 검증 함수  
E. 분석 아이디어를 빠르게 실험하는 임시 코드

---

# 정답 및 해설

## 문제 1 정답

정답: **D**

하나의 파일에 모든 코드를 넣는다고 해서 파이썬 코드가 절대 실행되지 않는 것은 아닙니다. 다만 코드가 커질수록 찾기 어렵고, 테스트하기 어렵고, 재사용하기 어려운 구조가 됩니다.

---

## 문제 2 정답

정답: **B**

모듈은 보통 하나의 \`.py\` 파일입니다. 패키지는 여러 모듈을 폴더 단위로 묶어 계층적으로 관리하는 구조입니다. 패키지 안에는 하위 패키지를 둘 수 있습니다. \`__init__.py\`에는 무거운 실행 코드를 넣지 않는 것이 좋습니다.

---

## 문제 3 정답

예상 실행 결과는 다음과 같습니다.

\`\`\`text
hello module
안녕하세요
\`\`\`

\`import hello\`를 실행할 때 \`hello.py\`의 최상위 코드가 실행됩니다. 그래서 먼저 \`hello module\`이 출력되고, 이후 \`hello.message\` 값이 출력됩니다.

---

## 문제 4 정답

\`if __name__ == "__main__":\`는 해당 파일이 직접 실행될 때만 \`main()\`을 호출하기 위해 사용합니다. 다른 파일에서 import할 때는 함수와 클래스만 사용할 수 있고, 프로그램 실행 코드는 자동으로 실행되지 않게 할 수 있습니다.

---

## 문제 5 정답

\`\`\`python
from sales_app.utils.date_utils import get_today_string
\`\`\`

절대 import는 최상위 패키지 이름인 \`sales_app\`부터 전체 경로를 적습니다.

---

## 문제 6 정답

문제의 이름은 **순환 import**입니다.

\`a.py\`가 \`b.py\`를 import하고, \`b.py\`가 다시 \`a.py\`를 import하기 때문에 한쪽 모듈이 완전히 초기화되기 전에 다른 쪽에서 접근하려고 할 수 있습니다.

해결 방향은 다음과 같습니다.

\`\`\`text
- 공통 코드를 별도 모듈로 분리한다.
- 두 모듈이 서로 알아야 하는 구조인지 설계를 다시 본다.
- 타입 힌트만 필요하다면 문자열 타입 힌트나 TYPE_CHECKING을 사용한다.
- 꼭 필요한 경우 함수 내부 import로 지연시킨다.
\`\`\`

---

## 문제 7 정답

문제점은 민감 정보인 \`API_KEY\`를 코드에 직접 작성했다는 점입니다. 이 값이 Git 저장소에 올라가면 외부에 노출될 수 있습니다.

더 나은 방식은 환경 변수에서 읽는 것입니다.

\`\`\`python
import os

API_KEY = os.environ["API_KEY"]
API_URL = os.environ.get("API_URL", "https://api.example.com")
\`\`\`

---

## 문제 8 정답

\`requirements.txt\`는 프로젝트 실행에 필요한 외부 라이브러리 목록을 기록하는 파일입니다. 다른 환경에서 다음 명령으로 필요한 패키지를 설치할 수 있습니다.

\`\`\`bash
pip install -r requirements.txt
\`\`\`

이를 통해 여러 개발자나 실행 환경에서 비슷한 라이브러리 환경을 구성할 수 있습니다.

---

## 문제 9 정답 예시

예시는 다음과 같습니다.

\`\`\`text
csv_tool/
  main.py
  readers.py
  validators.py
  transformers.py
  writers.py
  tests/
    test_validators.py
    test_transformers.py
\`\`\`

조금 더 구조화하면 다음처럼 만들 수 있습니다.

\`\`\`text
csv-tool/
  README.md
  requirements.txt
  src/
    csv_tool/
      __init__.py
      main.py
      readers.py
      validators.py
      transformers.py
      writers.py
  tests/
    test_validators.py
    test_transformers.py
\`\`\`

중요한 것은 CSV 읽기, 검증, 변환, 저장, 테스트의 역할을 분리하는 것입니다.

---

## 문제 10 정답

정답: **A, C, D**

반복적으로 사용하는 결측치 처리 함수, 여러 노트북에서 사용하는 파일 읽기 함수, 데이터 검증 함수는 \`.py\` 파일로 분리하는 것이 좋습니다. 반면 한 번만 확인하는 그래프 코드나 분석 아이디어를 빠르게 실험하는 임시 코드는 노트북에 남겨도 괜찮습니다.

---

# 10장 마무리

이 장은 고급 파이썬 과정에서 매우 중요한 전환점입니다.

앞선 장들에서는 함수, 객체, 타입 힌트처럼 코드 내부의 표현력을 높이는 방법을 배웠습니다. 이번 장에서는 그 코드를 **프로젝트 단위로 배치하고 관리하는 방법**을 배웠습니다.

데이터분석 과정으로 넘어가면 많은 학습자가 노트북 하나에 모든 코드를 넣는 방식으로 시작합니다. 처음에는 괜찮지만, 데이터가 커지고 분석이 반복되면 다음 문제가 생깁니다.

\`\`\`text
같은 전처리 코드를 여러 번 복사한다.
어느 노트북의 함수가 최신인지 알기 어렵다.
데이터 검증 로직을 재사용하기 어렵다.
API 수집 코드와 분석 코드가 섞인다.
테스트하기 어렵다.
\`\`\`

이번 장에서 배운 모듈, 패키지, 프로젝트 구조는 이런 문제를 줄여 줍니다. 분석 코드는 노트북에서 실험하되, 반복되는 로직은 \`.py\` 파일로 옮기고, 검증 가능한 함수와 패키지로 관리하는 것이 좋습니다.

다음 장에서는 프로젝트가 실패 상황에 더 강해지도록 **예외 처리와 로깅 심화**를 다룹니다. 프로젝트 구조가 뼈대라면, 예외 처리와 로깅은 코드가 실제 환경에서 안정적으로 동작하도록 도와주는 안전장치입니다.

---

# 참고 문서

- [Python 공식 문서: The import system](https://docs.python.org/3/reference/import.html)
- [Python 공식 튜토리얼: Modules](https://docs.python.org/3/tutorial/modules.html)
- [Python Packaging User Guide: src layout vs flat layout](https://packaging.python.org/en/latest/discussions/src-layout-vs-flat-layout/)
- [Python Packaging User Guide: Writing your pyproject.toml](https://packaging.python.org/en/latest/guides/writing-pyproject-toml/)
`;export{e as default};