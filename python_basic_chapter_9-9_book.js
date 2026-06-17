var e=`<!-- 원본: python_basic_chapter_9_book.md / 세부 장: 9-9 -->

# 9.9 외부 라이브러리 활용 실습

### 9.9.1 실습 목표

이번 실습의 목표는 복잡한 라이브러리 기능을 깊게 사용하는 것이 아닙니다.

목표는 다음과 같습니다.

\`\`\`text
- 가상환경 만들기
- 외부 라이브러리 설치하기
- import 확인하기
- requirements.txt 만들기
- 설치 목록으로 환경 재현 흐름 이해하기
\`\`\`

---

### 9.9.2 실습 1: 프로젝트 폴더 만들기

먼저 실습용 폴더를 만듭니다.

\`\`\`text
chapter9_practice/
\`\`\`

폴더 안에 \`main.py\` 파일을 만듭니다.

\`\`\`text
chapter9_practice/
  main.py
\`\`\`

---

### 9.9.3 실습 2: 가상환경 만들기

프로젝트 폴더에서 다음 명령을 실행합니다.

\`\`\`bash
python -m venv .venv
\`\`\`

가상환경을 활성화합니다.

Windows PowerShell:

\`\`\`powershell
.venv\\Scripts\\Activate.ps1
\`\`\`

macOS 또는 Linux:

\`\`\`bash
source .venv/bin/activate
\`\`\`

터미널 앞에 \`(.venv)\` 표시가 보이는지 확인합니다.

---

### 9.9.4 실습 3: \`requests\` 설치하기

다음 명령으로 \`requests\`를 설치합니다.

\`\`\`bash
python -m pip install requests
\`\`\`

설치가 끝난 뒤 목록을 확인합니다.

\`\`\`bash
python -m pip list
\`\`\`

목록에 \`requests\`가 보이면 설치된 것입니다.

---

### 9.9.5 실습 4: import 확인하기

\`main.py\`에 다음 코드를 작성합니다.

\`\`\`python
import requests

print("외부 라이브러리 import 성공")
print("라이브러리 이름:", requests.__name__)
\`\`\`

실행합니다.

\`\`\`bash
python main.py
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
외부 라이브러리 import 성공
라이브러리 이름: requests
\`\`\`

---

### 9.9.6 실습 5: \`requirements.txt\` 만들기

현재 설치 목록을 저장합니다.

\`\`\`bash
python -m pip freeze > requirements.txt
\`\`\`

생성된 \`requirements.txt\` 파일을 열어 봅니다.

파일 안에는 \`requests\`와 관련 패키지들이 기록되어 있을 수 있습니다.

\`\`\`text
requests==2.34.2
urllib3==2.5.0
...
\`\`\`

버전은 환경에 따라 달라질 수 있습니다.

---

### 9.9.7 실습 6: 설치 명령 정리하기

최종적으로 이번 실습에서 사용한 명령을 정리하면 다음과 같습니다.

\`\`\`bash
python -m venv .venv
\`\`\`

\`\`\`bash
python -m pip install requests
\`\`\`

\`\`\`bash
python -m pip list
\`\`\`

\`\`\`bash
python -m pip freeze > requirements.txt
\`\`\`

\`\`\`bash
python main.py
\`\`\`

가상환경 활성화 명령은 운영체제에 따라 다릅니다.

Windows PowerShell:

\`\`\`powershell
.venv\\Scripts\\Activate.ps1
\`\`\`

macOS 또는 Linux:

\`\`\`bash
source .venv/bin/activate
\`\`\`

---

## 9장 핵심 정리

외부 라이브러리는 파이썬에 기본으로 포함되어 있지는 않지만, 필요한 경우 설치해서 사용할 수 있는 코드 묶음입니다. 실무에서는 모든 기능을 직접 만들기보다 검증된 라이브러리를 활용하는 경우가 많습니다.

표준 라이브러리는 파이썬 설치 시 함께 제공되는 라이브러리이고, 외부 라이브러리는 별도로 설치해야 하는 라이브러리입니다.

\`pip\`는 외부 라이브러리를 설치하고 관리하는 도구입니다. 기초 수업에서는 다음 형태의 명령을 권장합니다.

\`\`\`bash
python -m pip install 패키지이름
\`\`\`

가상환경은 프로젝트마다 독립된 파이썬 실행 환경을 만드는 기능입니다. 프로젝트마다 가상환경을 나누면 라이브러리 버전 충돌을 줄일 수 있습니다.

\`requirements.txt\`는 프로젝트에 필요한 라이브러리 목록을 기록하는 파일입니다. 현재 설치 목록은 다음 명령으로 저장할 수 있습니다.

\`\`\`bash
python -m pip freeze > requirements.txt
\`\`\`

다른 환경에서 같은 라이브러리를 설치하려면 다음 명령을 사용합니다.

\`\`\`bash
python -m pip install -r requirements.txt
\`\`\`

외부 라이브러리를 사용할 때는 공식 문서, 패키지 이름, 버전, 가상환경, 보안 문제를 함께 확인해야 합니다.

대표적인 외부 라이브러리에는 API 요청에 사용하는 \`requests\`, 표 형태 데이터 처리에 사용하는 \`pandas\`, 엑셀 파일 처리에 사용하는 \`openpyxl\`, HTML 문서 분석에 사용하는 \`beautifulsoup4\`, 테스트에 사용하는 \`pytest\`가 있습니다.

---

## 연습문제

### 문제 1

다음 중 외부 라이브러리에 대한 설명으로 가장 적절한 것은 무엇인가요?

A. 파이썬 문법 자체를 의미한다.  
B. 파이썬을 설치하면 무조건 함께 설치되는 운영체제다.  
C. 필요한 기능을 별도로 설치해서 사용할 수 있는 코드 묶음이다.  
D. 파이썬 파일을 삭제하는 명령어다.

---

### 문제 2

표준 라이브러리와 외부 라이브러리의 차이를 간단히 설명해 보세요.

---

### 문제 3

다음 중 라이브러리를 설치하는 터미널 명령으로 가장 적절한 것은 무엇인가요?

A. \`import requests\`  
B. \`python -m pip install requests\`  
C. \`requests.install()\`  
D. \`print install requests\`

---

### 문제 4

다음 코드에서 발생할 수 있는 에러 이름으로 가장 적절한 것은 무엇인가요?

\`\`\`python
import not_installed_library
\`\`\`

A. \`SyntaxError\`  
B. \`ModuleNotFoundError\`  
C. \`ZeroDivisionError\`  
D. \`IndexError\`

---

### 문제 5

가상환경을 사용하는 이유를 두 가지 적어 보세요.

---

### 문제 6

프로젝트 폴더에서 \`.venv\`라는 이름의 가상환경을 만드는 명령을 작성해 보세요.

---

### 문제 7

현재 설치된 패키지 목록을 확인하는 명령을 작성해 보세요.

---

### 문제 8

현재 설치된 패키지 목록을 \`requirements.txt\` 파일로 저장하는 명령을 작성해 보세요.

---

### 문제 9

\`requirements.txt\`에 적힌 패키지를 한 번에 설치하는 명령을 작성해 보세요.

---

### 문제 10

다음 중 패키지 설치 이름과 import 이름이 다른 대표적인 예로 알맞은 것은 무엇인가요?

A. 설치: \`beautifulsoup4\`, import: \`from bs4 import BeautifulSoup\`  
B. 설치: \`requests\`, import: \`import requests\`  
C. 설치: \`pandas\`, import: \`import pandas as pd\`  
D. 설치: \`openpyxl\`, import: \`import openpyxl\`

---

### 문제 11

다음 라이브러리의 주 용도를 연결해 보세요.

\`\`\`text
1. requests
2. pandas
3. openpyxl
4. pytest
\`\`\`

\`\`\`text
A. 테스트 자동화
B. 표 형태 데이터 처리
C. API 요청
D. 엑셀 파일 읽기와 쓰기
\`\`\`

---

### 문제 12

외부 라이브러리를 설치하기 전에 확인하면 좋은 항목을 세 가지 적어 보세요.

---

## 정답 및 해설

### 문제 1 정답

정답: **C**

외부 라이브러리는 파이썬에 기본으로 포함되어 있지 않지만, 필요한 기능을 별도로 설치해서 사용할 수 있는 코드 묶음입니다.

---

### 문제 2 정답

예시 답안:

\`\`\`text
표준 라이브러리는 파이썬을 설치하면 함께 제공되는 라이브러리이고,
외부 라이브러리는 필요할 때 pip 등을 사용해 별도로 설치해야 하는 라이브러리이다.
\`\`\`

해설:

\`datetime\`, \`json\`, \`os\` 같은 모듈은 표준 라이브러리입니다. \`requests\`, \`pandas\`, \`openpyxl\` 같은 라이브러리는 보통 별도로 설치해서 사용합니다.

---

### 문제 3 정답

정답: **B**

\`\`\`bash
python -m pip install requests
\`\`\`

해설:

\`import requests\`는 파이썬 코드 안에서 라이브러리를 가져와 사용하는 문장입니다. 설치 명령은 터미널에서 실행해야 합니다.

---

### 문제 4 정답

정답: **B**

설치되지 않았거나 찾을 수 없는 모듈을 import하려고 하면 보통 \`ModuleNotFoundError\`가 발생합니다.

---

### 문제 5 정답

예시 답안:

\`\`\`text
1. 프로젝트마다 필요한 라이브러리 버전을 분리하기 위해서
2. 다른 프로젝트와 라이브러리 충돌을 줄이기 위해서
\`\`\`

추가로 다음과 같은 답도 가능합니다.

\`\`\`text
- 시스템 Python 환경을 지저분하게 만들지 않기 위해서
- 협업 시 같은 실행 환경을 재현하기 위해서
- 프로젝트별 패키지 목록을 관리하기 위해서
\`\`\`

---

### 문제 6 정답

\`\`\`bash
python -m venv .venv
\`\`\`

해설:

\`venv\`는 파이썬 표준 라이브러리에 포함된 가상환경 도구입니다. \`.venv\`는 가상환경 폴더 이름입니다.

---

### 문제 7 정답

\`\`\`bash
python -m pip list
\`\`\`

해설:

현재 환경에 설치된 패키지 목록을 확인할 때 사용합니다.

---

### 문제 8 정답

\`\`\`bash
python -m pip freeze > requirements.txt
\`\`\`

해설:

현재 설치된 패키지와 버전 목록을 \`requirements.txt\` 파일에 저장합니다.

---

### 문제 9 정답

\`\`\`bash
python -m pip install -r requirements.txt
\`\`\`

해설:

\`-r\` 옵션은 파일을 읽어서 그 안에 적힌 패키지를 설치하라는 뜻입니다.

---

### 문제 10 정답

정답: **A**

\`\`\`bash
python -m pip install beautifulsoup4
\`\`\`

\`\`\`python
from bs4 import BeautifulSoup
\`\`\`

해설:

\`beautifulsoup4\`는 설치 이름과 import 이름이 다른 대표적인 예입니다. 다른 선택지도 올바른 설치와 import 예시이지만, 질문은 “설치 이름과 import 이름이 다른 예”를 묻고 있습니다.

---

### 문제 11 정답

\`\`\`text
1 - C
2 - B
3 - D
4 - A
\`\`\`

해설:

\`requests\`는 API 요청과 HTTP 통신에 사용합니다. \`pandas\`는 표 형태 데이터 처리에 사용합니다. \`openpyxl\`은 엑셀 파일 읽기와 쓰기에 사용합니다. \`pytest\`는 테스트 자동화에 사용합니다.

---

### 문제 12 정답

예시 답안:

\`\`\`text
1. 공식 문서가 있는지 확인한다.
2. 패키지 이름이 정확한지 확인한다.
3. 최근에도 관리되고 있는지 확인한다.
\`\`\`

추가로 다음과 같은 답도 가능합니다.

\`\`\`text
- 내가 사용하는 Python 버전과 호환되는지 확인한다.
- 사용자가 많은지 확인한다.
- 설치 명령이 공식 문서와 일치하는지 확인한다.
- 보안상 위험한 패키지는 아닌지 주의한다.
- 내가 하려는 작업에 적합한지 확인한다.
\`\`\`

---

## 다음 장 예고

다음 장에서는 **파일 다루기**를 배웁니다.

외부 라이브러리를 설치하고 관리하는 방법을 배웠으므로, 이제 실제 파일을 코드로 다루는 방법을 배울 수 있습니다. 텍스트 파일, CSV 파일, 엑셀 파일을 읽고 쓰는 방법을 배우고, 파일과 폴더를 자동으로 정리하는 방법도 살펴봅니다.

다음 장에서 다룰 내용은 다음과 같습니다.

\`\`\`text
- 텍스트 파일 읽고 쓰기
- CSV 파일 다루기
- openpyxl로 엑셀 파일 다루기
- os와 pathlib로 파일 경로 다루기
- 파일명 변경, 이동, 복사 자동화
- 파일 처리 중 발생하는 예외 처리
\`\`\`

9장에서 배운 외부 라이브러리 관리 방법은 10장부터 계속 사용됩니다. 특히 \`openpyxl\`을 설치하고 엑셀 파일을 처리하는 흐름에서 가상환경과 pip 사용법이 다시 등장합니다.
`;export{e as default};