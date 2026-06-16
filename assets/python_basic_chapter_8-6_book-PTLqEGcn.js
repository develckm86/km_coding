var e=`<!-- 원본: python_basic_chapter_8_book.md / 세부 장: 8-6 -->

# 8.6 프로그램 실행 인수 다루기

지금까지는 코드 안에 값을 직접 넣거나 \`input()\`으로 실행 중에 값을 입력받았습니다. 하지만 실무 자동화 프로그램에서는 프로그램을 실행할 때 파일 경로, 날짜, 옵션 등을 함께 전달하는 방식이 자주 사용됩니다.

예를 들어 다음과 같은 명령을 생각해봅시다.

\`\`\`bash
python report.py sales.xlsx
\`\`\`

이 명령은 \`report.py\`를 실행하면서 \`sales.xlsx\`라는 값을 함께 전달합니다. 이렇게 프로그램 실행 시 전달하는 값을 **명령행 인수**라고 합니다.

---

### 8.6.1 명령행 인수란 무엇인가

명령행 인수는 터미널에서 프로그램을 실행할 때 함께 넘겨주는 값입니다.

예를 들어 파일 이름을 코드에 직접 쓰면 다음과 같습니다.

\`\`\`python
filename = "sales.xlsx"
\`\`\`

이 방식은 간단하지만, 다른 파일을 처리할 때마다 코드를 수정해야 합니다.

명령행 인수를 사용하면 실행할 때 파일명을 바꿀 수 있습니다.

\`\`\`bash
python report.py sales_2026_06.xlsx
python report.py sales_2026_07.xlsx
python report.py sales_2026_08.xlsx
\`\`\`

이 방식은 자동화 프로그램에 적합합니다.

명령행 인수는 다음과 같은 상황에서 유용합니다.

- 처리할 파일 경로를 실행 시 전달하기
- 보고서 기준 날짜를 전달하기
- 저장할 결과 파일명을 전달하기
- 옵션에 따라 다른 기능 실행하기
- 배치 작업이나 스케줄러에서 프로그램 실행하기

---

### 8.6.2 \`sys.argv\` 사용하기

명령행 인수는 \`sys.argv\`로 확인할 수 있습니다.

다음 코드를 \`args_example.py\`라는 파일로 저장했다고 해봅시다.

\`\`\`python
# args_example.py

import sys

print(sys.argv)
\`\`\`

터미널에서 다음처럼 실행합니다.

\`\`\`bash
python args_example.py hello python
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
['args_example.py', 'hello', 'python']
\`\`\`

\`sys.argv\`는 리스트입니다.

첫 번째 값인 \`sys.argv[0]\`에는 실행한 파일 이름이 들어갑니다.

그 뒤의 값부터 사용자가 전달한 인수입니다.

\`\`\`python
import sys

print("실행 파일:", sys.argv[0])
print("첫 번째 인수:", sys.argv[1])
print("두 번째 인수:", sys.argv[2])
\`\`\`

다음처럼 실행하면,

\`\`\`bash
python args_example.py hello python
\`\`\`

결과는 다음과 같습니다.

\`\`\`text
실행 파일: args_example.py
첫 번째 인수: hello
두 번째 인수: python
\`\`\`

---

### 8.6.3 명령행 인수는 문자열이다

\`input()\`의 결과가 문자열인 것처럼, 명령행 인수도 문자열입니다.

다음 코드를 보겠습니다.

\`\`\`python
# add.py

import sys

number1 = sys.argv[1]
number2 = sys.argv[2]

print(number1 + number2)
\`\`\`

터미널에서 다음처럼 실행합니다.

\`\`\`bash
python add.py 10 20
\`\`\`

결과는 다음과 같습니다.

\`\`\`text
1020
\`\`\`

숫자 덧셈이 아니라 문자열 연결이 일어났습니다. \`sys.argv[1]\`과 \`sys.argv[2]\`는 문자열이기 때문입니다.

숫자로 계산하려면 변환해야 합니다.

\`\`\`python
# add.py

import sys

number1 = int(sys.argv[1])
number2 = int(sys.argv[2])

print(number1 + number2)
\`\`\`

이제 실행 결과는 다음과 같습니다.

\`\`\`text
30
\`\`\`

명령행 인수를 사용할 때는 항상 자료형 변환을 생각해야 합니다.

---

### 8.6.4 인수 개수 확인하기

\`sys.argv\`를 사용할 때 인수가 부족하면 에러가 발생합니다.

\`\`\`python
import sys

filename = sys.argv[1]
print(filename)
\`\`\`

이 코드를 인수 없이 실행하면 \`sys.argv[1]\`이 없기 때문에 에러가 발생합니다.

\`\`\`bash
python program.py
\`\`\`

그래서 인수 개수를 먼저 확인하는 것이 좋습니다.

\`\`\`python
# read_filename.py

import sys

if len(sys.argv) < 2:
    print("사용법: python read_filename.py <파일명>")
    sys.exit()

filename = sys.argv[1]
print("처리할 파일:", filename)
\`\`\`

실행 예시는 다음과 같습니다.

\`\`\`bash
python read_filename.py sales.xlsx
\`\`\`

결과는 다음과 같습니다.

\`\`\`text
처리할 파일: sales.xlsx
\`\`\`

인수가 없으면 다음과 같이 안내 메시지를 보여줄 수 있습니다.

\`\`\`text
사용법: python read_filename.py <파일명>
\`\`\`

---

### 8.6.5 \`argparse\`가 필요한 이유

\`sys.argv\`는 간단하지만, 인수가 많아지면 관리하기 어렵습니다.

예를 들어 다음과 같은 명령을 만들고 싶다고 해봅시다.

\`\`\`bash
python report.py --input sales.xlsx --output result.xlsx --date 2026-06-15
\`\`\`

이런 옵션을 직접 \`sys.argv\`로 처리하려면 코드가 복잡해집니다. 이때 \`argparse\`를 사용하면 명령행 인수를 더 체계적으로 처리할 수 있습니다.

\`argparse\`는 파이썬 표준 라이브러리입니다. 별도로 설치하지 않아도 사용할 수 있습니다.

---

### 8.6.6 \`argparse\` 기본 사용법

다음은 \`argparse\`의 기본 예시입니다.

\`\`\`python
# greet.py

import argparse

parser = argparse.ArgumentParser(description="인사말을 출력하는 프로그램")
parser.add_argument("name", help="인사할 사람의 이름")

args = parser.parse_args()

print(f"{args.name}님, 안녕하세요.")
\`\`\`

터미널에서 다음처럼 실행합니다.

\`\`\`bash
python greet.py 민수
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
민수님, 안녕하세요.
\`\`\`

\`parser.add_argument("name")\`은 필수 인수 하나를 받겠다는 뜻입니다.

사용자가 값을 주지 않으면 \`argparse\`가 자동으로 오류 메시지를 보여줍니다.

도움말도 자동으로 만들 수 있습니다.

\`\`\`bash
python greet.py --help
\`\`\`

도움말에는 프로그램 설명과 인수 설명이 표시됩니다.

---

### 8.6.7 선택 옵션 만들기

이번에는 \`--input\`, \`--output\` 같은 선택 옵션을 만들어봅시다.

\`\`\`python
# report.py

import argparse

parser = argparse.ArgumentParser(description="보고서 생성 프로그램")
parser.add_argument("--input", required=True, help="입력 파일 경로")
parser.add_argument("--output", required=True, help="출력 파일 경로")

args = parser.parse_args()

print("입력 파일:", args.input)
print("출력 파일:", args.output)
\`\`\`

터미널에서 다음처럼 실행합니다.

\`\`\`bash
python report.py --input sales.xlsx --output result.xlsx
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
입력 파일: sales.xlsx
출력 파일: result.xlsx
\`\`\`

\`required=True\`는 반드시 입력해야 하는 옵션이라는 뜻입니다.

옵션이 누락되면 \`argparse\`가 자동으로 오류를 알려줍니다.

---

### 8.6.8 기본값과 자료형 지정하기

\`argparse\`에서는 기본값과 자료형도 지정할 수 있습니다.

\`\`\`python
# discount.py

import argparse

parser = argparse.ArgumentParser(description="할인 금액 계산 프로그램")
parser.add_argument("price", type=int, help="상품 가격")
parser.add_argument("--rate", type=float, default=0.1, help="할인율")

args = parser.parse_args()

discount = args.price * args.rate
final_price = args.price - discount

print("상품 가격:", args.price)
print("할인율:", args.rate)
print("할인 금액:", discount)
print("최종 금액:", final_price)
\`\`\`

터미널에서 다음처럼 실행할 수 있습니다.

\`\`\`bash
python discount.py 30000
\`\`\`

\`--rate\`를 생략하면 기본값 \`0.1\`이 사용됩니다.

\`\`\`text
상품 가격: 30000
할인율: 0.1
할인 금액: 3000.0
최종 금액: 27000.0
\`\`\`

할인율을 직접 지정할 수도 있습니다.

\`\`\`bash
python discount.py 30000 --rate 0.2
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
상품 가격: 30000
할인율: 0.2
할인 금액: 6000.0
최종 금액: 24000.0
\`\`\`

---

### 8.6.9 명령행 프로그램의 기본 구조

명령행 인수를 사용하는 프로그램도 \`main()\` 함수와 함께 작성하면 구조가 깔끔해집니다.

\`\`\`python
# report.py

import argparse


def parse_args():
    parser = argparse.ArgumentParser(description="보고서 생성 프로그램")
    parser.add_argument("--input", required=True, help="입력 파일 경로")
    parser.add_argument("--output", required=True, help="출력 파일 경로")
    return parser.parse_args()


def main():
    args = parse_args()

    print("입력 파일:", args.input)
    print("출력 파일:", args.output)
    print("보고서를 생성합니다.")


if __name__ == "__main__":
    main()
\`\`\`

이 구조는 다음과 같이 역할을 나눕니다.

\`\`\`text
parse_args()  명령행 인수 처리
main()        프로그램 실행 흐름
\`\`\`

나중에 파일 읽기, 데이터 처리, 보고서 저장 기능을 추가하더라도 구조가 유지됩니다.

---

### 8.6.10 \`input()\`과 명령행 인수의 차이

\`input()\`과 명령행 인수는 모두 사용자에게 값을 받는 방법입니다. 하지만 사용되는 상황이 다릅니다.

| 방식 | 특징 | 적합한 상황 |
|---|---|---|
| \`input()\` | 실행 중 사용자에게 직접 입력받음 | 학습용 프로그램, 간단한 대화형 프로그램 |
| 명령행 인수 | 실행할 때 값을 함께 전달 | 자동화 프로그램, 배치 작업, 반복 실행 |

예를 들어 \`input()\` 방식은 다음과 같습니다.

\`\`\`python
filename = input("파일명을 입력하세요: ")
print(filename)
\`\`\`

명령행 인수 방식은 다음과 같습니다.

\`\`\`bash
python report.py sales.xlsx
\`\`\`

자동화 프로그램에서는 명령행 인수가 더 적합한 경우가 많습니다. 사람의 입력 없이 정해진 시간에 프로그램을 실행하거나, 여러 파일을 순서대로 처리하기 쉽기 때문입니다.

---

## 8장 핵심 정리

이 장에서는 모듈과 패키지를 중심으로 파이썬 코드를 여러 파일로 나누어 관리하는 방법을 배웠습니다.

핵심 내용을 정리하면 다음과 같습니다.

첫째, 모듈은 하나의 \`.py\` 파일입니다. 모듈에는 변수, 함수, 클래스를 작성할 수 있고, 다른 파일에서 import해서 사용할 수 있습니다.

둘째, \`import\`는 다른 모듈의 코드를 가져와 사용할 때 사용하는 문법입니다. 모듈 전체를 가져올 수도 있고, 특정 함수나 클래스만 가져올 수도 있습니다.

셋째, 표준 라이브러리는 파이썬이 기본으로 제공하는 모듈 모음입니다. \`datetime\`, \`math\`, \`random\`, \`json\`, \`os\`, \`pathlib\`, \`sys\`, \`argparse\` 등이 대표적입니다.

넷째, 직접 만든 모듈을 사용하면 코드를 기능별로 나눌 수 있습니다. 계산 함수, 출력 함수, 설정값, 클래스 등을 별도 파일로 분리할 수 있습니다.

다섯째, \`if __name__ == "__main__"\`은 파일이 직접 실행될 때만 특정 코드를 실행하기 위해 사용하는 구조입니다.

여섯째, 패키지는 여러 모듈을 모아 놓은 폴더입니다. \`models\`, \`services\`, \`utils\`처럼 역할별로 폴더를 나누면 프로젝트 구조가 명확해집니다.

일곱째, 내장 함수는 import 없이 바로 사용할 수 있는 함수입니다. \`type()\`, \`len()\`, \`sum()\`, \`enumerate()\`, \`zip()\`, \`sorted()\`, \`any()\`, \`all()\` 등은 실무에서도 자주 사용됩니다.

여덟째, 명령행 인수는 프로그램 실행 시 값을 전달하는 방법입니다. 간단한 경우 \`sys.argv\`를 사용할 수 있고, 옵션이 많아지면 \`argparse\`를 사용하는 것이 좋습니다.

모듈과 패키지는 단순한 문법이 아니라 코드를 관리하는 방법입니다. 프로그램이 커질수록 “어떤 코드를 어디에 둘 것인가”가 중요해집니다.

---

## 8장 연습문제

### 문제 1. 모듈의 의미

다음 중 모듈에 대한 설명으로 가장 적절한 것을 고르세요.

A. 파이썬에서만 사용하는 숫자 자료형  
B. 하나의 파이썬 코드 파일  
C. 반복문 안에서만 사용하는 변수  
D. 화면에 값을 출력하는 함수  

---

### 문제 2. import 문 이해하기

다음 코드를 실행하면 어떤 결과가 출력될까요?

\`\`\`python
import math

print(math.sqrt(9))
\`\`\`

---

### 문제 3. 특정 함수만 가져오기

다음 코드를 \`from ... import ...\` 방식으로 바꾸세요.

\`\`\`python
import math

result = math.sqrt(25)
print(result)
\`\`\`

---

### 문제 4. 모듈 분리하기

다음 함수가 있습니다.

\`\`\`python
def format_price(price):
    return f"{price:,.0f}원"
\`\`\`

이 함수를 \`formatter.py\` 파일에 넣었다고 가정합니다. \`main.py\`에서 이 함수를 가져와 \`30000\`을 \`30,000원\`으로 출력하는 코드를 작성하세요.

---

### 문제 5. \`if __name__ == "__main__"\`

다음 코드에서 \`if __name__ == "__main__"\`가 하는 역할을 설명하세요.

\`\`\`python
def main():
    print("프로그램을 실행합니다.")


if __name__ == "__main__":
    main()
\`\`\`

---

### 문제 6. 패키지 import

다음과 같은 폴더 구조가 있습니다.

\`\`\`text
project/
  main.py
  utils/
    __init__.py
    price_utils.py
\`\`\`

\`price_utils.py\` 안에는 다음 함수가 있습니다.

\`\`\`python
def format_price(price):
    return f"{price:,.0f}원"
\`\`\`

\`main.py\`에서 \`format_price\` 함수를 가져오는 코드를 작성하세요.

---

### 문제 7. 내장 함수 사용하기

다음 리스트에서 가격의 개수, 합계, 최솟값, 최댓값을 출력하는 코드를 작성하세요.

\`\`\`python
prices = [30000, 15000, 200000, 50000]
\`\`\`

---

### 문제 8. \`enumerate()\` 사용하기

다음 리스트를 번호와 함께 출력하는 코드를 작성하세요. 번호는 1부터 시작해야 합니다.

\`\`\`python
names = ["민수", "지영", "철수"]
\`\`\`

예상 출력은 다음과 같습니다.

\`\`\`text
1 민수
2 지영
3 철수
\`\`\`

---

### 문제 9. \`zip()\` 사용하기

다음 두 리스트를 사용해 상품명과 가격을 함께 출력하는 코드를 작성하세요.

\`\`\`python
names = ["키보드", "마우스", "모니터"]
prices = [30000, 15000, 200000]
\`\`\`

예상 출력은 다음과 같습니다.

\`\`\`text
키보드 30000
마우스 15000
모니터 200000
\`\`\`

---

### 문제 10. \`sys.argv\` 이해하기

다음 코드를 \`args.py\`로 저장하고,

\`\`\`python
import sys

print(sys.argv)
\`\`\`

터미널에서 다음처럼 실행했다고 가정합니다.

\`\`\`bash
python args.py apple banana
\`\`\`

출력되는 리스트의 내용을 예상해보세요.

---

### 문제 11. 명령행 인수 숫자 변환

다음 프로그램은 두 숫자를 명령행 인수로 받아 더하는 프로그램입니다. 빈칸을 채우세요.

\`\`\`python
import sys

number1 = ________(sys.argv[1])
number2 = ________(sys.argv[2])

print(number1 + number2)
\`\`\`

예를 들어 다음처럼 실행하면,

\`\`\`bash
python add.py 10 20
\`\`\`

출력 결과는 다음과 같아야 합니다.

\`\`\`text
30
\`\`\`

---

### 문제 12. \`argparse\` 기본 구조

다음 조건을 만족하는 \`argparse\` 코드를 작성하세요.

- 프로그램은 \`name\`이라는 필수 인수를 받는다.
- 실행하면 \`{name}님, 안녕하세요.\`를 출력한다.

예를 들어 다음처럼 실행하면,

\`\`\`bash
python greet.py 민수
\`\`\`

다음 결과가 출력되어야 합니다.

\`\`\`text
민수님, 안녕하세요.
\`\`\`

---

## 8장 정답 및 해설

### 문제 1 정답

정답: B

모듈은 하나의 파이썬 코드 파일입니다. 예를 들어 \`calculator.py\`, \`formatter.py\`, \`main.py\`는 각각 모듈이 될 수 있습니다.

---

### 문제 2 정답

\`\`\`text
3.0
\`\`\`

해설:

\`math.sqrt(9)\`는 9의 제곱근을 구합니다. 결과는 실수 \`3.0\`입니다.

---

### 문제 3 정답

\`\`\`python
from math import sqrt

result = sqrt(25)
print(result)
\`\`\`

해설:

\`from math import sqrt\`를 사용하면 \`math.sqrt()\`가 아니라 \`sqrt()\`라고 바로 사용할 수 있습니다.

---

### 문제 4 정답

\`\`\`python
from formatter import format_price

print(format_price(30000))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
30,000원
\`\`\`

해설:

\`formatter.py\` 파일에 있는 \`format_price\` 함수를 가져오기 위해 \`from formatter import format_price\`를 사용합니다.

---

### 문제 5 정답

\`if __name__ == "__main__"\`는 이 파일이 직접 실행될 때만 \`main()\` 함수를 실행하라는 의미입니다.

이 구조를 사용하면 다른 파일에서 이 모듈을 import할 때는 \`main()\`이 자동으로 실행되지 않습니다. 그래서 테스트 코드나 실행 코드를 안전하게 분리할 수 있습니다.

---

### 문제 6 정답

\`\`\`python
from utils.price_utils import format_price

print(format_price(30000))
\`\`\`

해설:

\`utils\` 폴더 안의 \`price_utils.py\` 모듈에서 \`format_price\` 함수를 가져옵니다. 패키지 안의 모듈을 가져올 때는 점을 사용합니다.

---

### 문제 7 정답

\`\`\`python
prices = [30000, 15000, 200000, 50000]

print("개수:", len(prices))
print("합계:", sum(prices))
print("최솟값:", min(prices))
print("최댓값:", max(prices))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
개수: 4
합계: 295000
최솟값: 15000
최댓값: 200000
\`\`\`

해설:

\`len()\`은 개수, \`sum()\`은 합계, \`min()\`은 최솟값, \`max()\`는 최댓값을 구합니다.

---

### 문제 8 정답

\`\`\`python
names = ["민수", "지영", "철수"]

for index, name in enumerate(names, start=1):
    print(index, name)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
1 민수
2 지영
3 철수
\`\`\`

해설:

\`enumerate(names, start=1)\`을 사용하면 인덱스를 1부터 시작할 수 있습니다.

---

### 문제 9 정답

\`\`\`python
names = ["키보드", "마우스", "모니터"]
prices = [30000, 15000, 200000]

for name, price in zip(names, prices):
    print(name, price)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
키보드 30000
마우스 15000
모니터 200000
\`\`\`

해설:

\`zip()\`은 여러 리스트에서 같은 위치에 있는 값을 하나씩 묶어줍니다.

---

### 문제 10 정답

\`\`\`text
['args.py', 'apple', 'banana']
\`\`\`

해설:

\`sys.argv\`는 리스트입니다. 첫 번째 값은 실행 파일 이름이고, 그 뒤에는 사용자가 전달한 인수가 순서대로 들어갑니다.

---

### 문제 11 정답

\`\`\`python
import sys

number1 = int(sys.argv[1])
number2 = int(sys.argv[2])

print(number1 + number2)
\`\`\`

해설:

명령행 인수는 문자열로 들어옵니다. 숫자 계산을 하려면 \`int()\`로 변환해야 합니다.

---

### 문제 12 정답

\`\`\`python
import argparse

parser = argparse.ArgumentParser(description="인사말 출력 프로그램")
parser.add_argument("name", help="인사할 사람의 이름")

args = parser.parse_args()

print(f"{args.name}님, 안녕하세요.")
\`\`\`

해설:

\`parser.add_argument("name")\`은 \`name\`이라는 필수 인수를 받겠다는 뜻입니다. \`parse_args()\`가 명령행 인수를 분석하고, 결과는 \`args.name\`으로 사용할 수 있습니다.
`;export{e as default};