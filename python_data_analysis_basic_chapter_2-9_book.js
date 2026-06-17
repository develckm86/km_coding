var e=`<!-- 원본: python_data_analysis_basic_chapter_2_book.md / 세부 장: 2-9 -->

# 2.9 환경 문제 해결 가이드

환경 설정 과정에서는 여러 문제가 발생할 수 있다.  
이 절에서는 초보자가 자주 만나는 문제와 확인 방법을 정리한다.

---

## 2.9.1 \`python\` 명령이 실행되지 않는 경우

터미널에서 다음 명령을 실행했는데 에러가 날 수 있다.

\`\`\`bash
python --version
\`\`\`

이 경우 다음을 확인한다.

- 파이썬이 설치되어 있는가?
- 설치할 때 PATH 설정이 되었는가?
- Windows에서는 \`py --version\` 명령이 동작하는가?
- macOS/Linux에서는 \`python3 --version\` 명령을 사용해야 하는가?

대체 명령 예시는 다음과 같다.

\`\`\`bash
python3 --version
\`\`\`

또는 Windows에서는 다음을 사용할 수 있다.

\`\`\`powershell
py --version
\`\`\`

---

## 2.9.2 \`pip\` 설치가 안 되는 경우

\`pip install\`이 실패하면 먼저 다음을 확인한다.

\`\`\`bash
python -m pip --version
\`\`\`

\`pip\`가 정상적으로 동작한다면 다음처럼 다시 설치 명령을 실행한다.

\`\`\`bash
python -m pip install pandas
\`\`\`

\`pip install pandas\`보다 \`python -m pip install pandas\` 형태가 현재 파이썬 환경을 명확히 지정하기 때문에 문제를 줄일 수 있다.

---

## 2.9.3 Jupyter에서 패키지를 찾지 못하는 경우

터미널에서는 \`pandas\`가 설치되어 있는데 Jupyter Notebook에서는 다음과 같은 에러가 날 수 있다.

\`\`\`text
ModuleNotFoundError: No module named 'pandas'
\`\`\`

이 경우 대개 Notebook이 다른 파이썬 환경을 사용하고 있는 것이다.

확인할 내용은 다음과 같다.

1. 가상환경에 \`pandas\`를 설치했는가?
2. \`ipykernel\`을 설치했는가?
3. 가상환경을 Jupyter 커널로 등록했는가?
4. Notebook에서 올바른 커널을 선택했는가?

커널 등록 명령은 다음과 같다.

\`\`\`bash
python -m ipykernel install --user --name python-data-analysis-basic --display-name "Python Data Analysis Basic"
\`\`\`

Notebook 화면에서 커널을 \`"Python Data Analysis Basic"\`으로 선택한다.

---

## 2.9.4 파일 경로 에러가 나는 경우

다음과 같은 에러가 발생할 수 있다.

\`\`\`text
FileNotFoundError: [Errno 2] No such file or directory
\`\`\`

이는 보통 파일 경로가 잘못되었을 때 발생한다.

다음 코드를 실행해서 현재 작업 폴더를 확인한다.

\`\`\`python
from pathlib import Path

Path.cwd()
\`\`\`

현재 폴더를 기준으로 파일 경로를 다시 확인한다.

\`\`\`python
Path("data/raw/orders_sample.csv").exists()
\`\`\`

결과가 \`False\`라면 해당 위치에 파일이 없다는 뜻이다.

---

## 2.9.5 노트북 실행 결과가 이상한 경우

Notebook에서 결과가 이상하게 나오면 다음을 시도해 본다.

1. Kernel을 재시작한다.
2. 모든 셀을 위에서 아래로 다시 실행한다.
3. 셀 실행 순서를 확인한다.
4. 같은 이름의 변수를 여러 번 바꾸지 않았는지 확인한다.
5. 불필요한 임시 셀을 정리한다.

Notebook은 편리하지만, 실행 순서 때문에 혼란이 생기기 쉽다.  
최종 분석 결과를 확인할 때는 항상 처음부터 다시 실행해 보는 습관이 중요하다.

---

# 핵심 정리

이 장에서는 데이터 분석을 위한 기본 환경을 준비했다.

첫째, 데이터 분석에서는 Jupyter Notebook, JupyterLab, VS Code, Google Colab 같은 도구를 사용할 수 있다. Notebook은 분석 과정을 셀 단위로 실행하고 설명과 결과를 함께 남기기에 좋다.

둘째, 프로젝트마다 독립된 라이브러리 환경을 만들기 위해 가상환경을 사용한다. 가상환경을 사용하면 라이브러리 충돌을 줄이고, 같은 환경을 다시 만들기 쉬워진다.

셋째, 데이터 분석 기초 과정에서는 \`numpy\`, \`pandas\`, \`matplotlib\`, \`seaborn\`, \`openpyxl\`, \`jupyter\`, \`ipykernel\` 같은 라이브러리를 사용한다.

넷째, Notebook에서는 코드 셀과 마크다운 셀을 구분해서 사용한다. 코드 셀은 실행을 위한 공간이고, 마크다운 셀은 분석 설명을 작성하는 공간이다.

다섯째, 분석 프로젝트에서는 원본 데이터, 처리된 데이터, 노트북, 결과 파일, 재사용 코드를 폴더별로 구분해서 관리하는 것이 좋다.

---

# 연습문제

## 문제 1. 개념 확인

다음 중 Jupyter Notebook의 특징으로 가장 적절한 것은?

A. 파이썬 코드를 반드시 하나의 파일 전체로만 실행한다.  
B. 코드와 설명, 실행 결과를 셀 단위로 함께 관리할 수 있다.  
C. 인터넷이 없으면 무조건 사용할 수 없다.  
D. 데이터 분석에는 사용할 수 없다.

---

## 문제 2. 개념 확인

가상환경을 사용하는 가장 중요한 이유로 적절한 것은?

A. 파이썬 코드를 더 빠르게 실행하기 위해서  
B. 프로젝트별로 라이브러리와 버전을 독립적으로 관리하기 위해서  
C. 컴퓨터 화면을 더 예쁘게 만들기 위해서  
D. 인터넷 없이 모든 패키지를 자동 설치하기 위해서

---

## 문제 3. 명령어 확인

다음 명령의 의미를 설명하시오.

\`\`\`bash
python -m venv .venv
\`\`\`

---

## 문제 4. 명령어 확인

다음 명령의 의미를 설명하시오.

\`\`\`bash
python -m pip install pandas
\`\`\`

---

## 문제 5. 폴더 구조 이해

다음 폴더 중 원본 데이터를 저장하기에 가장 적절한 위치는?

A. \`data/raw/\`  
B. \`data/processed/\`  
C. \`outputs/charts/\`  
D. \`src/\`

---

## 문제 6. 폴더 구조 이해

다음 폴더 중 그래프 이미지 결과를 저장하기에 가장 적절한 위치는?

A. \`notebooks/\`  
B. \`data/raw/\`  
C. \`outputs/charts/\`  
D. \`.venv/\`

---

## 문제 7. Notebook 실행 순서

다음 두 셀이 있다고 하자.

\`\`\`python
total = price * quantity
\`\`\`

\`\`\`python
price = 10000
quantity = 3
\`\`\`

첫 번째 셀을 먼저 실행하면 어떤 문제가 생길 수 있는지 설명하시오.

---

## 문제 8. 환경 점검 코드

다음 코드가 하는 일을 설명하시오.

\`\`\`python
import pandas as pd

print(pd.__version__)
\`\`\`

---

## 문제 9. 경로 확인

다음 코드의 실행 결과가 \`False\`라면 어떤 의미인가?

\`\`\`python
from pathlib import Path

Path("data/raw/orders_sample.csv").exists()
\`\`\`

---

## 문제 10. 실습

다음 구조를 가진 데이터 분석 프로젝트 폴더를 직접 만들어 보시오.

\`\`\`text
my_analysis_project/
  data/
    raw/
    processed/
  notebooks/
  outputs/
    charts/
    reports/
  src/
  README.md
\`\`\`

---

# 정답 및 해설

## 문제 1 정답

정답: **B**

Jupyter Notebook은 코드, 설명, 실행 결과를 셀 단위로 함께 관리할 수 있다.  
이 특징 때문에 데이터 분석 과정 기록과 탐색적 분석에 자주 사용된다.

---

## 문제 2 정답

정답: **B**

가상환경은 프로젝트별로 독립된 파이썬 환경을 만들기 위해 사용한다.  
이를 통해 라이브러리 충돌을 줄이고, 프로젝트 실행 환경을 재현하기 쉬워진다.

---

## 문제 3 정답

\`\`\`bash
python -m venv .venv
\`\`\`

이 명령은 현재 폴더에 \`.venv\`라는 이름의 가상환경을 만든다.  
이 가상환경 안에 프로젝트 전용 파이썬 실행 환경과 라이브러리 설치 공간이 만들어진다.

---

## 문제 4 정답

\`\`\`bash
python -m pip install pandas
\`\`\`

이 명령은 현재 사용 중인 파이썬 환경에 \`pandas\` 라이브러리를 설치한다.  
가상환경이 활성화되어 있다면 해당 가상환경 안에 설치된다.

---

## 문제 5 정답

정답: **A**

원본 데이터는 \`data/raw/\`에 저장하는 것이 좋다.  
전처리하거나 수정한 데이터는 \`data/processed/\`에 따로 저장한다.

---

## 문제 6 정답

정답: **C**

그래프 이미지 결과는 \`outputs/charts/\` 폴더에 저장하는 것이 좋다.  
분석 보고서는 \`outputs/reports/\`에 저장할 수 있다.

---

## 문제 7 정답

첫 번째 셀은 \`price\`와 \`quantity\`를 사용한다.  
하지만 두 변수가 아직 정의되지 않았다면 \`NameError\`가 발생할 수 있다.

Notebook에서는 셀을 자유롭게 실행할 수 있기 때문에, 실행 순서가 코드 흐름과 맞지 않으면 이런 문제가 생길 수 있다.

---

## 문제 8 정답

\`\`\`python
import pandas as pd

print(pd.__version__)
\`\`\`

이 코드는 \`pandas\` 라이브러리를 \`pd\`라는 별칭으로 불러오고, 설치된 pandas의 버전을 출력한다.  
환경 점검이나 버전 확인에 사용할 수 있다.

---

## 문제 9 정답

\`\`\`python
Path("data/raw/orders_sample.csv").exists()
\`\`\`

이 코드의 결과가 \`False\`라면 현재 작업 폴더를 기준으로 \`data/raw/orders_sample.csv\` 파일을 찾을 수 없다는 뜻이다.

가능한 원인은 다음과 같다.

- 파일이 실제로 없다.
- 파일 이름이 다르다.
- 폴더 위치가 다르다.
- 현재 작업 폴더가 예상과 다르다.

---

## 문제 10 정답 예시

macOS 또는 Linux에서는 다음 명령을 사용할 수 있다.

\`\`\`bash
mkdir my_analysis_project
cd my_analysis_project
mkdir -p data/raw data/processed notebooks outputs/charts outputs/reports src
touch README.md
\`\`\`

Windows PowerShell에서는 다음과 같이 만들 수 있다.

\`\`\`powershell
mkdir my_analysis_project
cd my_analysis_project
mkdir data
mkdir data\\raw
mkdir data\\processed
mkdir notebooks
mkdir outputs
mkdir outputs\\charts
mkdir outputs\\reports
mkdir src
New-Item README.md -ItemType File
\`\`\`

완성 후 폴더 구조가 문제에서 제시한 형태와 같으면 된다.

---

# 다음 장 예고

다음 장에서는 **NumPy 기초**를 배운다.

NumPy는 파이썬에서 수치 데이터를 효율적으로 다루기 위한 핵심 라이브러리다.  
데이터 분석에서 pandas를 본격적으로 사용하기 전에 NumPy 배열의 개념을 이해하면, 이후 DataFrame의 계산 방식과 벡터화 연산을 더 쉽게 받아들일 수 있다.

다음 장에서 다룰 내용은 다음과 같다.

- NumPy란 무엇인가
- 리스트와 NumPy 배열의 차이
- 배열 만들기
- 배열의 모양과 자료형 확인하기
- 배열 인덱싱과 슬라이싱
- 배열 연산과 브로드캐스팅
- 기본 통계 함수
- 조건 기반 선택
`;export{e as default};