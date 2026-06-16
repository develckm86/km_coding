var e=`<!-- 원본: python_basic_chapter_8_book.md / 세부 장: 8-1 -->

# 8.1 모듈 사용하기

### 8.1.1 모듈이란 무엇인가

모듈은 파이썬 코드가 들어 있는 하나의 파일입니다.

예를 들어 다음과 같은 파일이 있다고 해봅시다.

\`\`\`text
calculator.py
\`\`\`

이 파일 안에 파이썬 코드가 들어 있다면, \`calculator.py\`는 하나의 모듈입니다.

모듈에는 변수, 함수, 클래스 등을 작성할 수 있습니다.

\`\`\`python
# calculator.py

def add(a, b):
    return a + b


def subtract(a, b):
    return a - b
\`\`\`

이렇게 작성한 코드는 다른 파이썬 파일에서 가져와 사용할 수 있습니다. 즉, 모듈은 **재사용 가능한 코드 파일**이라고 생각하면 됩니다.

처음 코드를 배울 때는 하나의 파일에 모든 코드를 작성해도 괜찮습니다. 하지만 프로그램이 커지면 파일을 나누어야 합니다.

예를 들어 주문 처리 프로그램을 만든다고 해봅시다.

\`\`\`text
주문 데이터 읽기
주문 금액 계산
할인 금액 계산
보고서 생성
결과 저장
\`\`\`

이 모든 코드를 하나의 파일에 넣으면 파일이 길어집니다. 그래서 기능별로 파일을 나누는 것이 좋습니다.

\`\`\`text
main.py
order.py
discount.py
report.py
\`\`\`

이때 각각의 \`.py\` 파일이 모듈입니다.

---

### 8.1.2 모듈을 사용하는 이유

모듈을 사용하는 가장 큰 이유는 코드를 정리하고 재사용하기 위해서입니다.

프로그램이 작을 때는 모든 코드를 한 파일에 작성해도 문제가 없어 보입니다.

\`\`\`python
# main.py

def calculate_total_price(price, quantity):
    return price * quantity


def calculate_discount(total_price):
    if total_price >= 100000:
        return total_price * 0.1
    return 0


def print_order_summary(price, quantity):
    total_price = calculate_total_price(price, quantity)
    discount = calculate_discount(total_price)
    final_price = total_price - discount

    print("총 금액:", total_price)
    print("할인 금액:", discount)
    print("최종 금액:", final_price)


print_order_summary(30000, 4)
\`\`\`

하지만 함수가 수십 개로 늘어나면 파일이 복잡해집니다. 이때 계산 관련 함수는 \`calculator.py\`, 출력 관련 함수는 \`printer.py\`처럼 나눌 수 있습니다.

모듈을 사용하면 다음과 같은 장점이 있습니다.

첫째, 코드가 짧아지고 읽기 쉬워집니다.

둘째, 기능별로 파일을 나눌 수 있습니다.

셋째, 같은 코드를 여러 파일에서 재사용할 수 있습니다.

넷째, 수정해야 할 위치를 찾기 쉬워집니다.

다섯째, 협업할 때 각자 맡은 파일을 나누어 작업하기 좋습니다.

모듈은 코드 정리의 첫 단계입니다.

---

### 8.1.3 \`import\` 기본 문법

다른 모듈의 코드를 사용하려면 \`import\`를 사용합니다.

파이썬에는 기본으로 제공되는 모듈이 많습니다. 이런 모듈을 **표준 라이브러리**라고 합니다.

예를 들어 \`math\` 모듈은 수학 계산에 필요한 기능을 제공합니다.

\`\`\`python
import math

print(math.sqrt(16))
print(math.pi)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
4.0
3.141592653589793
\`\`\`

\`import math\`는 \`math\`라는 모듈을 사용하겠다는 뜻입니다.

모듈 안의 기능을 사용할 때는 다음 형식으로 작성합니다.

\`\`\`python
모듈명.기능명
\`\`\`

예를 들어 \`math.sqrt()\`는 \`math\` 모듈 안에 있는 \`sqrt()\` 함수를 사용하는 코드입니다.

\`\`\`python
import math

result = math.sqrt(25)
print(result)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
5.0
\`\`\`

---

### 8.1.4 \`from ... import ...\`

모듈 전체를 가져오는 대신, 모듈 안의 특정 기능만 가져올 수도 있습니다.

\`\`\`python
from math import sqrt

print(sqrt(16))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
4.0
\`\`\`

이 방식은 \`math.sqrt()\`라고 쓰지 않고 바로 \`sqrt()\`라고 사용할 수 있다는 장점이 있습니다.

하지만 이름이 어디에서 왔는지 잘 보이지 않을 수 있습니다. 초보 단계에서는 모듈명을 함께 쓰는 방식이 더 읽기 쉬울 때가 많습니다.

\`\`\`python
import math

print(math.sqrt(16))
\`\`\`

위 코드처럼 작성하면 \`sqrt()\`가 \`math\` 모듈에서 온 함수라는 사실이 분명합니다.

두 방식은 모두 자주 사용됩니다.

\`\`\`python
import math
from math import sqrt
\`\`\`

중요한 것은 어떤 방식이든 코드를 읽는 사람이 이해하기 쉽게 사용하는 것입니다.

---

### 8.1.5 별칭 사용하기

모듈 이름이 길거나, 관례적으로 줄여 쓰는 이름이 있는 경우에는 별칭을 사용할 수 있습니다.

별칭은 \`as\`를 사용합니다.

\`\`\`python
import math as m

print(m.sqrt(16))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
4.0
\`\`\`

실무에서 자주 볼 수 있는 별칭은 다음과 같습니다.

\`\`\`python
import pandas as pd
import numpy as np
\`\`\`

이 장에서는 아직 외부 라이브러리를 본격적으로 다루지 않지만, 이후 데이터 처리 수업에서 \`pandas\`를 사용할 때 \`pd\`라는 별칭을 자주 보게 됩니다.

별칭은 편리하지만 너무 낯선 이름으로 줄이면 코드가 읽기 어려워집니다.

\`\`\`python
import math as x
\`\`\`

위와 같이 쓰면 \`x.sqrt()\`가 무엇인지 바로 알기 어렵습니다. 별칭은 널리 쓰이는 관례가 있거나, 의미가 분명할 때 사용하는 것이 좋습니다.

---

### 8.1.6 \`import *\`는 조심해서 사용하기

파이썬에서는 다음과 같은 문법도 사용할 수 있습니다.

\`\`\`python
from math import *

print(sqrt(16))
print(pi)
\`\`\`

이 코드는 \`math\` 모듈 안의 많은 이름을 현재 파일로 가져옵니다. 그래서 \`math.sqrt()\`가 아니라 \`sqrt()\`처럼 바로 사용할 수 있습니다.

하지만 이 방식은 초보 단계와 실무 코드에서는 권장하지 않는 경우가 많습니다.

이유는 다음과 같습니다.

- 어떤 이름이 어느 모듈에서 왔는지 알기 어렵다.
- 기존에 있던 변수명이나 함수명과 충돌할 수 있다.
- 코드가 길어졌을 때 추적이 어려워진다.

예를 들어 현재 파일에 \`sqrt\`라는 함수를 직접 만들었는데, 나중에 \`from math import *\`를 사용하면 이름이 헷갈릴 수 있습니다.

따라서 처음에는 다음 방식 중 하나를 사용하는 것이 좋습니다.

\`\`\`python
import math
\`\`\`

또는 필요한 것만 명확하게 가져옵니다.

\`\`\`python
from math import sqrt
\`\`\`

---

### 8.1.7 모듈을 import하면 어떤 일이 일어날까

모듈을 import하면 파이썬은 해당 모듈 파일을 찾아 실행하고, 그 안에 있는 변수, 함수, 클래스를 사용할 수 있게 준비합니다.

예를 들어 \`greeting.py\` 파일이 있다고 해봅시다.

\`\`\`python
# greeting.py

message = "안녕하세요"


def say_hello(name):
    return f"{name}님, 안녕하세요."
\`\`\`

다른 파일에서 이 모듈을 가져올 수 있습니다.

\`\`\`python
# main.py

import greeting

print(greeting.message)
print(greeting.say_hello("민수"))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
안녕하세요
민수님, 안녕하세요.
\`\`\`

중요한 점은 \`import greeting\`을 하면 \`greeting.py\` 파일 안의 코드가 읽힌다는 것입니다.

그래서 모듈 파일에는 import될 때 실행되면 곤란한 코드를 함부로 작성하지 않는 것이 좋습니다. 이 문제는 뒤에서 \`if __name__ == "__main__"\`을 배울 때 다시 살펴봅니다.

---

### 8.1.8 표준 라이브러리란 무엇인가

파이썬에는 설치하지 않아도 바로 사용할 수 있는 모듈들이 많이 있습니다. 이를 **표준 라이브러리**라고 합니다.

표준 라이브러리는 파이썬과 함께 제공되는 기본 도구입니다.

예를 들어 다음과 같은 모듈이 표준 라이브러리에 포함됩니다.

| 모듈 | 용도 |
|---|---|
| \`math\` | 수학 계산 |
| \`random\` | 무작위 값 생성 |
| \`datetime\` | 날짜와 시간 처리 |
| \`os\` | 운영체제 관련 기능 |
| \`pathlib\` | 파일 경로 처리 |
| \`json\` | JSON 데이터 처리 |
| \`csv\` | CSV 파일 처리 |
| \`sys\` | 파이썬 실행 환경 관련 기능 |
| \`argparse\` | 명령행 인수 처리 |

표준 라이브러리를 잘 활용하면 많은 기능을 직접 만들지 않아도 됩니다.

예를 들어 현재 날짜를 구하는 기능을 직접 만들기는 어렵습니다. 하지만 \`datetime\` 모듈을 사용하면 쉽게 처리할 수 있습니다.

\`\`\`python
from datetime import datetime

now = datetime.now()
print(now)
\`\`\`

표준 라이브러리는 파이썬을 실무에서 강력하게 만들어주는 중요한 도구입니다.

---
`;export{e as default};