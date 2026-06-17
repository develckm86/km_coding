var e=`<!-- 원본: python_advanced_chapter_10_book.md / 세부 장: 10-2 -->

# 10.2 import 구조 심화

기초 과정에서는 \`import\`를 “다른 파일이나 라이브러리를 가져오는 문법” 정도로 배웠습니다.

\`\`\`python
import math
\`\`\`

고급 과정에서는 조금 더 깊게 이해해야 합니다. \`import\`는 단순히 파일을 복사해 오는 동작이 아닙니다.

파이썬에서 \`import\`는 크게 다음 과정을 거칩니다.

\`\`\`text
1. 모듈을 찾는다.
2. 모듈 객체를 만든다.
3. 모듈 코드를 실행한다.
4. 실행 결과로 만들어진 모듈 객체를 이름에 연결한다.
5. 이미 import된 모듈은 캐시에서 재사용한다.
\`\`\`

이 과정을 이해하면 다음 문제를 설명할 수 있습니다.

\`\`\`text
왜 import할 때 print가 실행될까?
왜 같은 모듈을 여러 번 import해도 한 번만 실행될까?
왜 순환 import가 발생할까?
왜 실행 위치에 따라 ModuleNotFoundError가 발생할까?
\`\`\`

---

## 10.2.1 import는 이름을 바인딩한다

다음 코드를 봅시다.

\`\`\`python
import math

print(math.sqrt(16))
\`\`\`

\`import math\`를 실행하면 파이썬은 \`math\`라는 모듈을 찾고, 그 결과를 현재 파일의 이름공간에 \`math\`라는 이름으로 연결합니다. 그래서 \`math.sqrt()\`처럼 사용할 수 있습니다.

다음처럼 특정 이름만 가져올 수도 있습니다.

\`\`\`python
from math import sqrt

print(sqrt(16))
\`\`\`

이 경우 현재 파일에는 \`math\`라는 이름이 생기지 않고, \`sqrt\`라는 이름만 생깁니다.

\`\`\`python
from math import sqrt

print(sqrt(16))
print(math.pi)  # NameError
\`\`\`

\`from ... import ...\` 문법은 편리하지만, 어떤 모듈에서 온 이름인지 덜 명확해질 수 있습니다. 실무에서는 코드의 명확성을 기준으로 선택합니다.

---

## 10.2.2 import 시 모듈의 최상위 코드가 실행된다

다음 파일을 만들어 봅시다.

\`\`\`python
# message.py
print("message.py가 실행되었습니다.")

text = "안녕하세요"
\`\`\`

그리고 다른 파일에서 import합니다.

\`\`\`python
# main.py
import message

print(message.text)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
message.py가 실행되었습니다.
안녕하세요
\`\`\`

왜 \`message.py\` 안의 \`print()\`가 실행되었을까요? 파이썬은 모듈을 처음 import할 때 그 파일의 최상위 코드를 실행하기 때문입니다.

그래서 모듈 파일의 최상위에는 보통 다음 정도만 두는 것이 좋습니다.

\`\`\`text
- import 문
- 상수
- 함수 정의
- 클래스 정의
\`\`\`

반대로 다음 코드는 가급적 \`main()\` 함수나 별도 함수 안에 두는 것이 좋습니다.

\`\`\`text
- 실제 파일 읽기
- API 요청
- 데이터베이스 연결
- 긴 계산 작업
- 사용자 입력 받기
\`\`\`

---

## 10.2.3 \`sys.modules\`와 import 캐시

같은 모듈을 여러 번 import하면 매번 파일이 다시 실행될까요?

다음 예제를 봅시다.

\`\`\`python
# counter_module.py
print("counter_module imported")

value = 10
\`\`\`

\`\`\`python
# main.py
import counter_module
import counter_module
import counter_module

print(counter_module.value)
\`\`\`

실행 결과는 보통 다음과 같습니다.

\`\`\`text
counter_module imported
10
\`\`\`

\`import counter_module\`을 세 번 작성했지만 출력은 한 번만 일어납니다. 파이썬은 이미 import한 모듈을 \`sys.modules\`라는 캐시에 저장합니다. 같은 모듈을 다시 import하면 파일을 다시 실행하지 않고 캐시된 모듈 객체를 사용합니다.

직접 확인해볼 수도 있습니다.

\`\`\`python
import sys
import math

print("math" in sys.modules)
print(sys.modules["math"])
\`\`\`

이 특성은 중요합니다. 모듈 최상위 코드에 부수 효과가 있으면 첫 import 시점에만 실행됩니다. 이 때문에 import 시 실행되는 코드와 프로그램 실행 코드를 구분해야 합니다.

---

## 10.2.4 절대 import

절대 import는 프로젝트의 최상위 패키지 이름부터 전체 경로를 적는 방식입니다.

예를 들어 다음 구조가 있다고 가정합니다.

\`\`\`text
project/
  sales_app/
    __init__.py
    main.py
    services/
      __init__.py
      processor.py
    utils/
      __init__.py
      date_utils.py
\`\`\`

\`processor.py\`에서 \`date_utils.py\`를 import하려면 다음처럼 작성할 수 있습니다.

\`\`\`python
from sales_app.utils.date_utils import get_today_string
\`\`\`

이 방식은 어디에서 import하는지 명확합니다. 파일 위치가 바뀌어도 패키지 기준 경로가 유지되면 import 문을 이해하기 쉽습니다.

실무 프로젝트에서는 절대 import를 기본으로 사용하는 경우가 많습니다.

---

## 10.2.5 상대 import

상대 import는 현재 모듈의 위치를 기준으로 import하는 방식입니다.

\`\`\`python
from ..utils.date_utils import get_today_string
\`\`\`

여기서 \`..\`는 한 단계 위 패키지를 의미합니다.

예를 들어 다음 파일에서 사용할 수 있습니다.

\`\`\`text
sales_app/
  services/
    processor.py
  utils/
    date_utils.py
\`\`\`

\`processor.py\`에서 \`utils.date_utils\`를 상대 import하려면 다음처럼 쓸 수 있습니다.

\`\`\`python
from ..utils.date_utils import get_today_string
\`\`\`

상대 import는 패키지 내부 구조를 기준으로 작성하기 때문에 패키지 안에서는 간결할 수 있습니다. 하지만 파일을 직접 실행할 때 문제가 생기기 쉽습니다.

예를 들어 다음처럼 실행하면 상대 import가 실패할 수 있습니다.

\`\`\`bash
python sales_app/services/processor.py
\`\`\`

상대 import는 “이 파일이 어떤 패키지 안에 있는지”를 알아야 동작합니다. 따라서 패키지 내부 모듈은 직접 실행하기보다, 프로젝트 루트에서 모듈 형태로 실행하는 것이 좋습니다.

\`\`\`bash
python -m sales_app.services.processor
\`\`\`

하지만 실무에서는 보통 내부 모듈을 직접 실행하지 않고 \`main.py\`나 CLI 진입점에서 실행 흐름을 시작합니다.

---

## 10.2.6 import 경로와 실행 위치

\`ModuleNotFoundError\`는 초보자뿐 아니라 실무에서도 자주 만나는 에러입니다.

\`\`\`text
ModuleNotFoundError: No module named 'sales_app'
\`\`\`

이 에러는 파이썬이 해당 모듈을 검색 경로에서 찾지 못했다는 뜻입니다.

파이썬은 import할 때 여러 위치를 검색합니다. 그중 중요한 것은 다음과 같습니다.

\`\`\`text
- 현재 실행 중인 스크립트의 위치 또는 현재 작업 디렉터리
- PYTHONPATH 환경 변수에 등록된 경로
- 표준 라이브러리 경로
- site-packages에 설치된 외부 패키지 경로
\`\`\`

현재 작업 디렉터리가 달라지면 같은 코드도 다르게 동작할 수 있습니다.

예를 들어 다음 구조를 생각해 봅시다.

\`\`\`text
project/
  sales_app/
    __init__.py
    main.py
    utils.py
\`\`\`

프로젝트 루트에서 실행하면 정상 동작할 수 있습니다.

\`\`\`bash
cd project
python -m sales_app.main
\`\`\`

하지만 \`sales_app\` 폴더 안으로 들어가서 실행하면 import 기준이 달라져 문제가 생길 수 있습니다.

\`\`\`bash
cd project/sales_app
python main.py
\`\`\`

그래서 실무에서는 다음 원칙을 정해두는 것이 좋습니다.

\`\`\`text
프로젝트 루트에서 실행한다.
패키지 내부 파일을 직접 실행하지 않는다.
실행 진입점을 명확히 둔다.
\`\`\`

---

## 10.2.7 순환 import 문제

순환 import는 두 모듈이 서로를 import할 때 발생합니다.

\`\`\`text
user.py  -> order.py를 import
order.py -> user.py를 import
\`\`\`

예를 들어 다음 코드를 봅시다.

\`\`\`python
# user.py
from order import Order


class User:
    def __init__(self, name: str) -> None:
        self.name = name
        self.orders: list[Order] = []
\`\`\`

\`\`\`python
# order.py
from user import User


class Order:
    def __init__(self, user: User, amount: int) -> None:
        self.user = user
        self.amount = amount
\`\`\`

두 파일은 서로를 필요로 합니다. 이 경우 import 시점에 한쪽 모듈이 아직 완전히 초기화되지 않은 상태에서 다른 모듈이 접근하면서 에러가 발생할 수 있습니다.

대표적인 해결 방법은 다음과 같습니다.

\`\`\`text
1. 공통 타입을 별도 모듈로 분리한다.
2. 두 클래스가 반드시 서로를 알아야 하는지 설계를 다시 본다.
3. 타입 힌트만 필요하다면 지연 평가 방식을 사용한다.
4. 함수 내부에서 필요한 시점에 import한다.
\`\`\`

타입 힌트만 필요한 경우에는 다음처럼 문자열 타입 힌트를 사용할 수 있습니다.

\`\`\`python
# order.py

class Order:
    def __init__(self, user: "User", amount: int) -> None:
        self.user = user
        self.amount = amount
\`\`\`

또는 다음처럼 \`TYPE_CHECKING\`을 사용할 수 있습니다.

\`\`\`python
# order.py
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from user import User


class Order:
    def __init__(self, user: "User", amount: int) -> None:
        self.user = user
        self.amount = amount
\`\`\`

\`TYPE_CHECKING\`은 타입 검사 도구가 코드를 분석할 때는 \`True\`처럼 취급되지만, 실제 실행 중에는 \`False\`입니다. 따라서 런타임 순환 import를 피하면서 타입 힌트를 유지할 수 있습니다.

하지만 순환 import가 자주 발생한다면 단순한 import 문제가 아니라 설계 문제일 가능성이 높습니다. 두 모듈이 서로 너무 강하게 의존하고 있다는 신호일 수 있습니다.

---

## 10.2.8 import 시 코드가 실행되는 문제

다음 파일을 봅시다.

\`\`\`python
# report.py
from pathlib import Path

DATA_PATH = Path("sales.csv")

print("보고서를 생성합니다.")
text = DATA_PATH.read_text(encoding="utf-8")
print(text)
\`\`\`

다른 파일에서 \`report.py\`의 상수만 사용하고 싶어서 import했습니다.

\`\`\`python
from report import DATA_PATH

print(DATA_PATH)
\`\`\`

하지만 import하는 순간 \`report.py\`의 최상위 코드가 실행되어 파일을 읽고 출력합니다. 이런 코드는 재사용하기 어렵습니다.

다음처럼 바꾸는 것이 좋습니다.

\`\`\`python
# report.py
from pathlib import Path

DATA_PATH = Path("sales.csv")


def read_report(path: Path = DATA_PATH) -> str:
    return path.read_text(encoding="utf-8")


def main() -> None:
    print("보고서를 생성합니다.")
    print(read_report())


if __name__ == "__main__":
    main()
\`\`\`

이제 import할 때는 함수와 상수만 정의되고, 실제 실행은 직접 파일을 실행할 때만 일어납니다.

---
`;export{e as default};