var e=`# 2장. 분석 환경 준비

데이터 분석을 시작하려면 먼저 코드를 실행하고, 데이터를 저장하고, 결과를 확인할 수 있는 환경이 필요하다.  
파이썬 문법을 배우는 단계에서는 터미널과 \`.py\` 파일만으로도 충분한 경우가 많다. 하지만 데이터 분석에서는 데이터를 표로 확인하고, 중간 결과를 바로 살펴보고, 그래프를 그리며, 분석 과정을 문서처럼 정리해야 하는 경우가 많다.

그래서 데이터 분석 수업에서는 일반 파이썬 파일뿐 아니라 **Jupyter Notebook**, **JupyterLab**, **VS Code**, **Google Colab** 같은 도구를 함께 사용한다.  
이 장에서는 데이터 분석을 위한 기본 환경을 준비하고, 앞으로의 분석 수업에서 사용할 폴더 구조와 작업 방식을 익힌다.

---

## 이 장에서 배울 내용

이 장을 마치면 다음 내용을 할 수 있어야 한다.

- 데이터 분석에서 사용하는 개발 환경의 종류를 설명할 수 있다.
- Jupyter Notebook, VS Code, Google Colab의 차이를 이해할 수 있다.
- 데이터 분석용 가상환경을 만들 수 있다.
- 필요한 분석 라이브러리를 설치할 수 있다.
- Jupyter Notebook의 코드 셀과 마크다운 셀을 구분할 수 있다.
- 분석 프로젝트 폴더 구조를 만들 수 있다.
- 실습 데이터를 어디에 저장하고 어떻게 관리해야 하는지 이해할 수 있다.

---

# 2.1 분석 환경의 종류

데이터 분석을 할 때 사용할 수 있는 도구는 여러 가지가 있다.  
어떤 도구가 무조건 가장 좋다고 말하기는 어렵다. 분석의 목적, 작업 방식, 협업 방식, 컴퓨터 환경에 따라 적절한 도구가 달라진다.

초보 단계에서는 다음 네 가지를 구분해서 이해하면 충분하다.

- Jupyter Notebook
- JupyterLab
- VS Code
- Google Colab

---

## 2.1.1 Jupyter Notebook

**Jupyter Notebook**은 데이터 분석에서 가장 많이 쓰이는 실행 환경 중 하나다.  
노트북은 코드를 한 번에 모두 실행하는 방식이 아니라, 작은 단위의 **셀**로 나누어 실행한다.

예를 들어 다음과 같은 작업을 한 파일 안에서 함께 할 수 있다.

- 코드 작성
- 코드 실행
- 실행 결과 확인
- 표 출력
- 그래프 출력
- 분석 설명 작성
- 결론 정리

데이터 분석은 한 번에 완성되는 경우가 드물다.  
보통 데이터를 조금 확인하고, 다시 정리하고, 그래프를 그려 보고, 의심되는 부분을 다시 확인하는 식으로 진행된다. Jupyter Notebook은 이런 탐색 과정에 잘 맞는다.

---

## 2.1.2 Jupyter Notebook의 장점

Jupyter Notebook은 특히 다음과 같은 경우에 편리하다.

1. 데이터를 조금씩 확인하면서 분석하고 싶을 때
2. 코드와 설명을 함께 남기고 싶을 때
3. 그래프와 표를 바로 확인하고 싶을 때
4. 분석 과정을 보고서처럼 정리하고 싶을 때
5. 실험적인 코드를 빠르게 실행해 보고 싶을 때

예를 들어 매출 데이터를 분석한다고 하자.  
분석가는 먼저 데이터를 불러오고, 상위 몇 줄을 확인하고, 컬럼명을 확인하고, 결측치를 확인하고, 그룹별 매출을 계산한다. 이런 작업은 단계별로 결과를 보면서 진행하는 것이 좋다.

Notebook에서는 다음처럼 분석 흐름을 문서처럼 남길 수 있다.

\`\`\`markdown
## 월별 매출 분석

먼저 주문 데이터를 불러온 뒤, 주문일을 기준으로 월별 매출을 집계한다.
\`\`\`

그 아래 코드 셀에 실제 분석 코드를 작성한다.

\`\`\`python
import pandas as pd

orders = pd.read_csv("data/raw/orders.csv")
orders.head()
\`\`\`

이처럼 Notebook은 코드와 해설, 결과가 함께 남기 때문에 학습과 분석에 모두 유용하다.

---

## 2.1.3 Jupyter Notebook의 주의점

Jupyter Notebook은 편리하지만 주의할 점도 있다.

가장 중요한 것은 **실행 순서**다.

Notebook은 셀을 위에서 아래로 실행할 수도 있지만, 사용자가 중간 셀만 따로 실행할 수도 있다.  
이 때문에 화면에 보이는 순서와 실제 실행 순서가 달라질 수 있다.

예를 들어 다음과 같은 셀이 있다고 하자.

\`\`\`python
total = price * quantity
\`\`\`

이 셀을 실행하기 전에 \`price\`와 \`quantity\`가 정의되어 있어야 한다.  
그런데 위쪽 셀을 실행하지 않고 이 셀만 실행하면 에러가 발생한다.

따라서 Notebook으로 분석할 때는 다음 습관이 중요하다.

- 위에서 아래로 실행해도 동작하도록 작성하기
- 중간에 셀을 삭제하거나 순서를 바꾸면 전체 다시 실행해 보기
- 변수를 어디서 만들었는지 명확히 관리하기
- 최종 제출 전에는 Kernel을 재시작하고 전체 실행해 보기

---

## 2.1.4 JupyterLab

**JupyterLab**은 Jupyter Notebook보다 확장된 작업 환경이다.  
Notebook을 실행할 수 있을 뿐 아니라, 파일 탐색기, 터미널, 텍스트 편집기 등을 한 화면에서 함께 사용할 수 있다.

Jupyter Notebook이 “노트북 파일 하나를 중심으로 작업하는 도구”라면, JupyterLab은 “분석 프로젝트 전체를 관리하기 좋은 작업 공간”에 가깝다.

기초 수업에서는 Jupyter Notebook만으로도 충분하다.  
하지만 파일이 많아지고, 여러 노트북과 데이터 파일을 함께 관리해야 한다면 JupyterLab이 더 편할 수 있다.

---

## 2.1.5 VS Code

**VS Code**는 파이썬 개발과 데이터 분석을 모두 할 수 있는 코드 편집기다.  
VS Code에서는 \`.py\` 파일도 작성할 수 있고, Jupyter Notebook 파일인 \`.ipynb\`도 열어 실행할 수 있다.

VS Code는 다음과 같은 상황에서 유용하다.

- 여러 파이썬 파일을 나누어 관리할 때
- 함수나 클래스를 별도 파일로 분리할 때
- 데이터 분석 코드를 재사용 가능한 프로그램으로 만들 때
- 프로젝트 폴더 전체를 관리할 때
- Git과 함께 버전 관리를 할 때

데이터 분석 기초 과정에서는 Notebook 중심으로 학습하되, 나중에 분석 코드가 길어지면 VS Code를 함께 사용하는 것이 좋다.

---

## 2.1.6 Google Colab

**Google Colab**은 웹 브라우저에서 사용할 수 있는 노트북 환경이다.  
내 컴퓨터에 파이썬이나 라이브러리를 설치하지 않아도 구글 계정과 브라우저만 있으면 파이썬 코드를 실행할 수 있다.

Colab은 다음과 같은 경우에 편리하다.

- 설치 없이 빠르게 실습하고 싶을 때
- 여러 컴퓨터에서 같은 노트북을 열고 싶을 때
- 수업 중 환경 차이 문제를 줄이고 싶을 때
- 간단한 분석 실습을 공유하고 싶을 때

하지만 Colab에도 주의할 점이 있다.

- 인터넷 연결이 필요하다.
- 파일 경로가 내 컴퓨터와 다르다.
- 세션이 끊기면 메모리에 있던 변수나 임시 파일이 사라질 수 있다.
- 로컬 파일을 사용하려면 업로드 과정이 필요하다.

따라서 장기적인 실무 작업에는 로컬 환경도 함께 익히는 것이 좋다.

---

## 2.1.7 \`.py\` 파일과 노트북의 차이

파이썬 코드는 보통 두 가지 형태로 많이 작성한다.

하나는 \`.py\` 파일이고, 다른 하나는 \`.ipynb\` 파일이다.

| 구분 | \`.py\` 파일 | \`.ipynb\` 노트북 |
|---|---|---|
| 주요 목적 | 프로그램 작성 | 분석 과정 기록 |
| 실행 방식 | 파일 전체 또는 함수 단위 실행 | 셀 단위 실행 |
| 설명 작성 | 주석 중심 | 마크다운 문서 작성 가능 |
| 결과 확인 | 터미널 출력 중심 | 표와 그래프를 바로 확인 |
| 적합한 작업 | 자동화, 모듈, 배포 코드 | 탐색, 분석, 실험, 보고 |

데이터 분석을 처음 배울 때는 노트북이 편하다.  
하지만 실무에서는 분석 코드 중 반복 사용되는 부분을 \`.py\` 파일로 분리하는 경우가 많다.

예를 들어 다음과 같이 역할을 나눌 수 있다.

\`\`\`text
notebooks/
  sales_analysis.ipynb

src/
  load_data.py
  clean_data.py
  plot_utils.py
\`\`\`

노트북에서는 분석 흐름을 진행하고, \`src\` 폴더에는 재사용할 함수를 저장한다.  
이런 구조는 데이터 분석 고급 과정에서 더 중요해진다.

---

# 2.2 가상환경 준비

분석 환경을 만들 때 가장 먼저 이해해야 할 개념은 **가상환경**이다.

가상환경은 프로젝트마다 독립된 파이썬 실행 환경을 만드는 기능이다.  
쉽게 말해, 프로젝트마다 필요한 라이브러리를 따로 설치해서 서로 영향을 주지 않게 하는 공간이다.

---

## 2.2.1 가상환경이 필요한 이유

파이썬을 사용하다 보면 여러 라이브러리를 설치하게 된다.

예를 들어 데이터 분석 프로젝트에서는 다음 라이브러리가 필요할 수 있다.

- \`numpy\`
- \`pandas\`
- \`matplotlib\`
- \`seaborn\`
- \`openpyxl\`
- \`jupyter\`

다른 프로젝트에서는 웹 개발을 위해 다음 라이브러리가 필요할 수 있다.

- \`fastapi\`
- \`uvicorn\`
- \`sqlalchemy\`

만약 모든 라이브러리를 컴퓨터 전체 파이썬 환경에 한꺼번에 설치하면 다음 문제가 생길 수 있다.

1. 프로젝트마다 필요한 라이브러리 버전이 다를 수 있다.
2. 한 프로젝트를 위해 업데이트한 라이브러리가 다른 프로젝트를 망가뜨릴 수 있다.
3. 어떤 프로젝트에 어떤 라이브러리가 필요한지 알기 어려워진다.
4. 다른 사람의 컴퓨터에서 같은 환경을 재현하기 어렵다.

가상환경을 사용하면 프로젝트별로 독립된 환경을 만들 수 있다.

\`\`\`text
project_a/
  .venv/  ← project_a 전용 환경

project_b/
  .venv/  ← project_b 전용 환경
\`\`\`

각 프로젝트는 자기만의 \`.venv\` 폴더를 가지고, 그 안에 필요한 라이브러리를 설치한다.

---

## 2.2.2 분석 프로젝트 폴더 만들기

먼저 데이터 분석용 프로젝트 폴더를 만든다.

예를 들어 다음 이름의 폴더를 사용할 수 있다.

\`\`\`text
python_data_analysis_basic/
\`\`\`

터미널에서는 다음과 같이 만들 수 있다.

\`\`\`bash
mkdir python_data_analysis_basic
cd python_data_analysis_basic
\`\`\`

Windows PowerShell, macOS Terminal, Linux Terminal 모두 기본 개념은 같다.  
다만 운영체제에 따라 일부 명령어 표현이 다를 수 있다.

---

## 2.2.3 가상환경 만들기

파이썬의 기본 도구인 \`venv\`를 사용하면 가상환경을 만들 수 있다.

\`\`\`bash
python -m venv .venv
\`\`\`

환경에 따라 \`python\` 대신 \`python3\`를 사용해야 할 수도 있다.

\`\`\`bash
python3 -m venv .venv
\`\`\`

여기서 \`.venv\`는 가상환경 폴더 이름이다.  
관례적으로 프로젝트 안에 \`.venv\`라는 이름을 많이 사용한다.

명령을 실행하면 프로젝트 폴더 안에 다음과 같은 폴더가 생긴다.

\`\`\`text
python_data_analysis_basic/
  .venv/
\`\`\`

이 폴더에는 프로젝트 전용 파이썬 실행 파일과 라이브러리 설치 공간이 들어 있다.

---

## 2.2.4 가상환경 활성화

가상환경을 만들었다고 해서 바로 사용하는 것은 아니다.  
먼저 가상환경을 **활성화**해야 한다.

Windows PowerShell에서는 보통 다음 명령을 사용한다.

\`\`\`powershell
.venv\\Scripts\\Activate.ps1
\`\`\`

Windows 명령 프롬프트에서는 다음 명령을 사용할 수 있다.

\`\`\`cmd
.venv\\Scripts\\activate.bat
\`\`\`

macOS 또는 Linux에서는 다음 명령을 사용한다.

\`\`\`bash
source .venv/bin/activate
\`\`\`

활성화가 되면 터미널 앞쪽에 \`(.venv)\`처럼 표시되는 경우가 많다.

\`\`\`text
(.venv) python_data_analysis_basic $
\`\`\`

이 표시가 보이면 현재 터미널에서 이 프로젝트의 가상환경을 사용하고 있다는 뜻이다.

---

## 2.2.5 가상환경 비활성화

가상환경 사용을 마칠 때는 다음 명령으로 비활성화할 수 있다.

\`\`\`bash
deactivate
\`\`\`

비활성화하면 터미널 앞의 \`(.venv)\` 표시가 사라진다.

---

## 2.2.6 pip 준비하기

\`pip\`는 파이썬 패키지를 설치하는 도구다.  
가상환경을 활성화한 뒤에는 해당 가상환경 안에 라이브러리를 설치해야 한다.

먼저 \`pip\` 버전을 확인한다.

\`\`\`bash
python -m pip --version
\`\`\`

필요하면 \`pip\`를 최신 상태로 업데이트한다.

\`\`\`bash
python -m pip install --upgrade pip
\`\`\`

\`pip install\` 명령을 사용할 때는 다음처럼 \`python -m pip\` 형태를 사용하는 습관도 좋다.

\`\`\`bash
python -m pip install pandas
\`\`\`

이 방식은 현재 사용 중인 파이썬 환경의 \`pip\`를 명확하게 실행한다는 장점이 있다.

---

# 2.3 필수 라이브러리 설치

데이터 분석 기초 과정에서는 여러 라이브러리를 사용한다.  
이 장에서는 라이브러리를 깊게 배우는 것이 아니라, 앞으로 사용할 도구를 설치하고 확인하는 것이 목표다.

---

## 2.3.1 설치할 라이브러리

기초 과정에서 사용할 주요 라이브러리는 다음과 같다.

| 라이브러리 | 역할 |
|---|---|
| \`numpy\` | 배열 기반 수치 계산 |
| \`pandas\` | 표 형태 데이터 처리 |
| \`matplotlib\` | 기본 그래프 작성 |
| \`seaborn\` | 통계 기반 시각화 |
| \`openpyxl\` | Excel 파일 읽기와 쓰기 |
| \`jupyter\` | Jupyter Notebook 실행 |
| \`ipykernel\` | 가상환경을 Jupyter 커널로 연결 |

각 라이브러리의 자세한 사용법은 뒤의 장에서 차례대로 배운다.

---

## 2.3.2 한 번에 설치하기

가상환경이 활성화된 상태에서 다음 명령을 실행한다.

\`\`\`bash
python -m pip install numpy pandas matplotlib seaborn openpyxl jupyter ipykernel
\`\`\`

설치에는 시간이 조금 걸릴 수 있다.  
설치 중 에러가 발생하면 먼저 다음을 확인한다.

- 가상환경이 활성화되어 있는가?
- 인터넷 연결이 되어 있는가?
- 파이썬 버전이 너무 낮지 않은가?
- 명령어를 정확히 입력했는가?

---

## 2.3.3 설치 확인하기

설치가 끝나면 파이썬을 실행해서 라이브러리를 불러와 본다.

\`\`\`bash
python
\`\`\`

파이썬 대화형 실행 화면이 열리면 다음을 입력한다.

\`\`\`python
import numpy as np
import pandas as pd
import matplotlib
import seaborn as sns
import openpyxl

print("설치 확인 완료")
\`\`\`

에러 없이 \`"설치 확인 완료"\`가 출력되면 기본 설치가 된 것이다.

대화형 실행 화면에서 나가려면 다음을 입력한다.

\`\`\`python
exit()
\`\`\`

또는 단축키를 사용할 수 있다.

- Windows: \`Ctrl + Z\` 후 Enter
- macOS/Linux: \`Ctrl + D\`

---

## 2.3.4 라이브러리 버전 확인하기

분석 환경에서는 라이브러리 버전도 중요하다.  
버전에 따라 함수 동작이나 지원 기능이 조금씩 다를 수 있기 때문이다.

다음 명령으로 설치된 패키지 목록을 확인할 수 있다.

\`\`\`bash
python -m pip list
\`\`\`

특정 라이브러리의 버전을 확인하려면 파이썬 코드에서도 확인할 수 있다.

\`\`\`python
import numpy as np
import pandas as pd

print(np.__version__)
print(pd.__version__)
\`\`\`

수업 중에는 강사가 제시한 버전과 완전히 같지 않아도 대부분의 기초 실습은 문제없이 진행된다.  
다만 에러가 발생했을 때는 버전 차이가 원인인지 확인해야 할 수 있다.

---

## 2.3.5 \`requirements.txt\` 만들기

프로젝트에서 사용하는 라이브러리 목록을 저장해 두면 나중에 같은 환경을 다시 만들기 쉽다.

현재 설치된 라이브러리 목록은 다음 명령으로 파일에 저장할 수 있다.

\`\`\`bash
python -m pip freeze > requirements.txt
\`\`\`

그러면 프로젝트 폴더 안에 \`requirements.txt\` 파일이 생긴다.

\`\`\`text
python_data_analysis_basic/
  .venv/
  requirements.txt
\`\`\`

다른 컴퓨터에서 같은 라이브러리를 설치하려면 다음 명령을 사용할 수 있다.

\`\`\`bash
python -m pip install -r requirements.txt
\`\`\`

데이터 분석 프로젝트를 관리할 때 \`requirements.txt\`는 “이 프로젝트를 실행하기 위해 필요한 도구 목록”이라고 볼 수 있다.

---

## 2.3.6 Jupyter 커널 등록하기

가상환경에서 Jupyter Notebook을 사용할 때는 현재 가상환경을 Jupyter 커널로 등록해 두는 것이 좋다.

\`\`\`bash
python -m ipykernel install --user --name python-data-analysis-basic --display-name "Python Data Analysis Basic"
\`\`\`

여기서 중요한 부분은 다음과 같다.

\`\`\`text
--name python-data-analysis-basic
\`\`\`

Jupyter 내부에서 사용할 커널 이름이다.

\`\`\`text
--display-name "Python Data Analysis Basic"
\`\`\`

Notebook 화면에서 보이는 이름이다.

이렇게 등록하면 Jupyter Notebook에서 커널을 선택할 때 \`"Python Data Analysis Basic"\`을 고를 수 있다.

커널은 Notebook이 어떤 파이썬 환경에서 코드를 실행할지 결정하는 실행 엔진이라고 생각하면 된다.

---

# 2.4 Jupyter Notebook 사용법

이제 Jupyter Notebook을 실행하고 기본 사용법을 익혀 보자.

---

## 2.4.1 Jupyter Notebook 실행하기

가상환경이 활성화된 상태에서 다음 명령을 실행한다.

\`\`\`bash
jupyter notebook
\`\`\`

또는 JupyterLab을 사용하려면 다음 명령을 실행한다.

\`\`\`bash
jupyter lab
\`\`\`

명령을 실행하면 웹 브라우저가 열리고 Jupyter 화면이 나타난다.  
Jupyter는 웹 브라우저에서 보이지만, 일반 웹사이트처럼 인터넷 서버에서 실행되는 것이 아니라 내 컴퓨터에서 실행되는 로컬 서버를 브라우저로 보는 방식이다.

---

## 2.4.2 새 노트북 만들기

Jupyter 화면에서 새 노트북을 만들 때는 Python 커널을 선택한다.

앞에서 커널을 등록했다면 다음과 같은 이름이 보일 수 있다.

\`\`\`text
Python Data Analysis Basic
\`\`\`

이 커널을 선택하면 이 프로젝트의 가상환경에서 노트북 코드가 실행된다.

새 노트북 파일의 확장자는 \`.ipynb\`다.

예를 들어 첫 노트북 이름을 다음처럼 정할 수 있다.

\`\`\`text
01_environment_check.ipynb
\`\`\`

---

## 2.4.3 코드 셀

Notebook의 가장 기본 셀은 **코드 셀**이다.  
코드 셀에는 파이썬 코드를 작성하고 실행한다.

\`\`\`python
print("데이터 분석 환경 준비")
\`\`\`

셀을 실행하면 아래에 결과가 표시된다.

\`\`\`text
데이터 분석 환경 준비
\`\`\`

코드 셀은 보통 다음 작업에 사용한다.

- 파이썬 코드 실행
- 데이터 불러오기
- 계산하기
- 표 출력하기
- 그래프 그리기
- 함수 실행하기

---

## 2.4.4 마크다운 셀

**마크다운 셀**은 설명을 작성하는 셀이다.  
파이썬 코드가 아니라 문서 내용을 작성한다.

예를 들어 다음과 같이 작성할 수 있다.

\`\`\`markdown
# 매출 데이터 분석

이 노트북에서는 월별 매출 변화를 확인한다.
\`\`\`

마크다운 셀은 분석 보고서처럼 내용을 정리할 때 유용하다.

데이터 분석 노트북에는 코드만 있어서는 안 된다.  
왜 이 코드를 실행했는지, 결과가 무엇을 의미하는지, 다음에 무엇을 확인할 것인지 설명이 있어야 한다.

좋은 분석 노트북은 다음 구조를 가진다.

\`\`\`text
문제 설명
↓
데이터 불러오기
↓
데이터 확인
↓
전처리
↓
분석
↓
시각화
↓
해석
\`\`\`

이 흐름에서 각 단계의 설명은 마크다운 셀로 작성한다.

---

## 2.4.5 셀 실행 순서

Notebook을 사용할 때 가장 주의해야 할 부분은 셀 실행 순서다.

아래와 같은 코드 셀이 있다고 하자.

\`\`\`python
price = 10000
\`\`\`

\`\`\`python
quantity = 3
\`\`\`

\`\`\`python
total = price * quantity
total
\`\`\`

위에서 아래로 순서대로 실행하면 문제가 없다.  
하지만 세 번째 셀만 먼저 실행하면 \`price\` 또는 \`quantity\`가 정의되어 있지 않기 때문에 에러가 날 수 있다.

따라서 Notebook 작업 중에는 다음 습관이 중요하다.

- 셀 번호를 확인하기
- 위에서 아래로 실행해도 동작하도록 정리하기
- 중간에 만든 임시 변수를 남발하지 않기
- 최종 확인 시 Kernel을 재시작하고 전체 실행하기

---

## 2.4.6 Kernel

Jupyter에서 **Kernel**은 코드를 실제로 실행하는 파이썬 실행 환경이다.

Notebook 화면은 문서처럼 보이지만, 뒤에서는 Kernel이 코드를 실행하고 변수 상태를 기억한다.

예를 들어 다음 셀을 실행하면 Kernel 안에 \`name\`이라는 변수가 저장된다.

\`\`\`python
name = "Python"
\`\`\`

그 다음 셀에서 이 변수를 사용할 수 있다.

\`\`\`python
print(name)
\`\`\`

하지만 Kernel을 재시작하면 메모리에 있던 변수는 사라진다.  
그래서 다시 위에서부터 필요한 셀을 실행해야 한다.

Kernel 관련 기능 중 자주 쓰는 것은 다음과 같다.

| 기능 | 의미 |
|---|---|
| Restart Kernel | 변수 상태를 모두 초기화 |
| Restart & Run All | 초기화 후 모든 셀을 위에서 아래로 실행 |
| Interrupt Kernel | 오래 걸리는 실행 중단 |
| Shutdown Kernel | 실행 중인 커널 종료 |

분석 결과를 제출하기 전에는 \`Restart & Run All\`을 실행해 보는 습관이 좋다.  
이 과정을 통과해야 “처음부터 다시 실행해도 같은 결과가 나오는 노트북”이라고 볼 수 있다.

---

## 2.4.7 Notebook 파일 이름 짓기

Notebook 파일 이름도 분석 과정에서 중요하다.  
파일 이름이 정리되어 있지 않으면 나중에 어떤 파일이 최종 분석인지 알기 어렵다.

좋은 예시는 다음과 같다.

\`\`\`text
01_environment_check.ipynb
02_load_data.ipynb
03_basic_eda.ipynb
04_sales_summary.ipynb
\`\`\`

좋지 않은 예시는 다음과 같다.

\`\`\`text
test.ipynb
final.ipynb
final_real.ipynb
final_real_last.ipynb
new_test2.ipynb
\`\`\`

파일 이름에는 다음 정보를 담는 것이 좋다.

- 순서
- 분석 주제
- 작업 목적

---

## 2.4.8 Notebook 정리 습관

Notebook은 실험하기 쉽기 때문에 금방 지저분해질 수 있다.  
분석 수업에서는 다음 규칙을 지키는 것이 좋다.

1. 불필요한 셀은 삭제한다.
2. 실행 결과가 너무 긴 셀은 정리한다.
3. 코드 위에는 간단한 설명을 둔다.
4. 변수 이름은 의미 있게 작성한다.
5. 중간 결과만 확인하는 코드는 나중에 정리한다.
6. 최종 노트북은 위에서 아래로 실행 가능해야 한다.

Notebook은 단순한 코드 실행 공간이 아니라 분석 과정을 보여주는 문서다.  
나중에 내가 다시 봐도 이해할 수 있고, 다른 사람이 봐도 분석 흐름을 따라갈 수 있어야 한다.

---

# 2.5 분석 프로젝트 폴더 구조

데이터 분석에서는 파일이 많아진다.

처음에는 CSV 파일 하나와 노트북 하나로 시작하더라도, 실습이 진행되면 다음 파일들이 생긴다.

- 원본 데이터
- 정리된 데이터
- 분석 노트북
- 그래프 이미지
- 결과 보고서
- 재사용 함수
- 환경 설정 파일

이 파일들을 한 폴더에 모두 섞어 두면 관리가 어려워진다.  
따라서 처음부터 폴더 구조를 정해 두는 것이 좋다.

---

## 2.5.1 기본 폴더 구조

이 수업에서는 다음 구조를 기본으로 사용한다.

\`\`\`text
data_analysis_project/
  data/
    raw/
    processed/
  notebooks/
  outputs/
    charts/
    reports/
  src/
  README.md
  requirements.txt
\`\`\`

각 폴더의 역할은 다음과 같다.

| 폴더 또는 파일 | 역할 |
|---|---|
| \`data/raw/\` | 원본 데이터 저장 |
| \`data/processed/\` | 정리된 데이터 저장 |
| \`notebooks/\` | Jupyter Notebook 저장 |
| \`outputs/charts/\` | 그래프 이미지 저장 |
| \`outputs/reports/\` | 분석 보고서 저장 |
| \`src/\` | 재사용할 파이썬 코드 저장 |
| \`README.md\` | 프로젝트 설명 |
| \`requirements.txt\` | 필요한 라이브러리 목록 |

---

## 2.5.2 원본 데이터와 처리 데이터 분리

데이터 분석에서 중요한 원칙 중 하나는 **원본 데이터를 함부로 수정하지 않는 것**이다.

원본 데이터는 \`data/raw/\`에 저장하고, 분석 과정에서 정리한 데이터는 \`data/processed/\`에 저장한다.

\`\`\`text
data/
  raw/
    orders_2026.csv
  processed/
    orders_cleaned.csv
\`\`\`

이렇게 분리하면 다음 장점이 있다.

- 원본 데이터가 보존된다.
- 전처리 과정을 다시 실행할 수 있다.
- 실수로 데이터를 잘못 수정해도 원본에서 다시 시작할 수 있다.
- 다른 사람이 분석 과정을 검토하기 쉽다.

분석 수업에서는 항상 “원본은 보존하고, 결과는 별도 파일로 저장한다”는 습관을 들이는 것이 좋다.

---

## 2.5.3 notebooks 폴더

\`notebooks/\` 폴더에는 분석 노트북을 저장한다.

예시는 다음과 같다.

\`\`\`text
notebooks/
  01_environment_check.ipynb
  02_load_sales_data.ipynb
  03_basic_exploration.ipynb
\`\`\`

노트북 파일 이름은 순서와 목적이 드러나게 작성한다.  
파일 이름만 봐도 어떤 작업을 하는 노트북인지 알 수 있어야 한다.

---

## 2.5.4 outputs 폴더

\`outputs/\` 폴더에는 분석 결과를 저장한다.

예를 들어 그래프는 \`outputs/charts/\`에 저장하고, 보고서는 \`outputs/reports/\`에 저장한다.

\`\`\`text
outputs/
  charts/
    monthly_sales.png
    category_sales.png
  reports/
    sales_summary.xlsx
    analysis_report.md
\`\`\`

분석 결과를 코드 실행 결과로만 남기면 나중에 다시 찾기 어렵다.  
중요한 표, 그래프, 보고서는 파일로 저장하는 것이 좋다.

---

## 2.5.5 src 폴더

\`src/\` 폴더에는 재사용할 파이썬 코드를 저장한다.

기초 과정 초반에는 노트북 안에 모든 코드를 작성해도 괜찮다.  
하지만 같은 코드를 여러 노트북에서 반복해서 사용한다면 함수로 분리하는 것이 좋다.

예를 들어 다음과 같은 파일을 만들 수 있다.

\`\`\`text
src/
  data_loader.py
  cleaning.py
  visualization.py
\`\`\`

분석 고급 과정에서는 노트북과 \`.py\` 파일을 함께 사용하는 구조가 더 중요해진다.

---

## 2.5.6 README.md

\`README.md\`는 프로젝트 설명 파일이다.  
이 파일에는 프로젝트의 목적과 실행 방법을 적는다.

예를 들어 다음과 같이 작성할 수 있다.

\`\`\`markdown
# 매출 데이터 분석 프로젝트

## 목적
월별 매출 추이와 카테고리별 매출 비중을 분석한다.

## 폴더 구조
- data/raw: 원본 데이터
- data/processed: 전처리된 데이터
- notebooks: 분석 노트북
- outputs: 결과 파일

## 실행 방법
1. 가상환경을 활성화한다.
2. 필요한 라이브러리를 설치한다.
3. notebooks 폴더의 노트북을 순서대로 실행한다.
\`\`\`

좋은 분석 프로젝트는 코드만 있는 것이 아니라, 어떤 목적의 프로젝트인지 설명하는 문서도 함께 있어야 한다.

---

# 2.6 실습 데이터 준비

데이터 분석 수업에서는 실습 데이터가 필요하다.  
실습 데이터는 너무 복잡하지 않으면서도 실제 데이터와 비슷한 구조를 가지는 것이 좋다.

---

## 2.6.1 실습 데이터의 조건

기초 수업에 적합한 데이터는 다음 조건을 만족하면 좋다.

1. 행과 열이 있는 표 형태 데이터
2. 숫자형 컬럼이 포함된 데이터
3. 문자열 컬럼이 포함된 데이터
4. 날짜 컬럼이 포함된 데이터
5. 결측치나 중복값을 일부 포함한 데이터
6. 그룹화와 시각화가 가능한 데이터

예를 들어 쇼핑몰 주문 데이터는 기초 분석 실습에 적합하다.

\`\`\`text
order_id, order_date, customer_id, category, product, quantity, price, region
\`\`\`

이런 데이터는 다음 분석 연습에 사용할 수 있다.

- 월별 매출 계산
- 카테고리별 매출 집계
- 지역별 주문 수 확인
- 상품별 판매량 확인
- 결측치 처리
- 중복 주문 확인

---

## 2.6.2 실습용 CSV 파일 만들기

아래 내용을 텍스트 편집기에 복사해서 \`orders_sample.csv\`라는 이름으로 저장할 수 있다.

\`\`\`csv
order_id,order_date,customer_id,category,product,quantity,price,region
1001,2026-01-03,C001,문구,노트,3,2500,서울
1002,2026-01-05,C002,전자기기,마우스,1,15000,부산
1003,2026-01-07,C003,문구,펜,10,1000,서울
1004,2026-01-10,C001,생활용품,텀블러,2,12000,인천
1005,2026-01-12,C004,전자기기,키보드,1,35000,대구
1006,2026-01-15,C005,문구,파일철,5,1800,서울
1007,2026-01-18,C002,생활용품,머그컵,2,8000,부산
1008,2026-01-20,C006,전자기기,USB,3,9000,광주
\`\`\`

파일은 다음 위치에 저장한다.

\`\`\`text
data/raw/orders_sample.csv
\`\`\`

그러면 전체 구조는 다음과 같다.

\`\`\`text
data_analysis_project/
  data/
    raw/
      orders_sample.csv
\`\`\`

---

## 2.6.3 파이썬 코드로 실습 데이터 만들기

직접 파일을 만들기 어렵다면 파이썬 코드로 CSV 파일을 생성할 수도 있다.

아래 코드는 아직 pandas를 깊게 배우기 전이므로 표준 라이브러리 \`csv\`를 사용한다.

\`\`\`python
import csv
from pathlib import Path

data_dir = Path("data/raw")
data_dir.mkdir(parents=True, exist_ok=True)

rows = [
    ["order_id", "order_date", "customer_id", "category", "product", "quantity", "price", "region"],
    [1001, "2026-01-03", "C001", "문구", "노트", 3, 2500, "서울"],
    [1002, "2026-01-05", "C002", "전자기기", "마우스", 1, 15000, "부산"],
    [1003, "2026-01-07", "C003", "문구", "펜", 10, 1000, "서울"],
    [1004, "2026-01-10", "C001", "생활용품", "텀블러", 2, 12000, "인천"],
    [1005, "2026-01-12", "C004", "전자기기", "키보드", 1, 35000, "대구"],
    [1006, "2026-01-15", "C005", "문구", "파일철", 5, 1800, "서울"],
    [1007, "2026-01-18", "C002", "생활용품", "머그컵", 2, 8000, "부산"],
    [1008, "2026-01-20", "C006", "전자기기", "USB", 3, 9000, "광주"],
]

with open(data_dir / "orders_sample.csv", "w", encoding="utf-8-sig", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(rows)
\`\`\`

여기서 \`encoding="utf-8-sig"\`를 사용하면 Excel에서 한글 CSV를 열 때 글자가 깨지는 문제를 줄일 수 있다.

---

## 2.6.4 데이터 파일 관리 주의점

실습 데이터와 분석 결과를 관리할 때는 다음을 지키는 것이 좋다.

- 원본 데이터는 \`data/raw/\`에 저장한다.
- 원본 데이터는 직접 수정하지 않는다.
- 정리된 데이터는 \`data/processed/\`에 저장한다.
- 파일 이름에 의미를 담는다.
- 날짜가 중요한 파일은 날짜를 파일명에 포함한다.
- 분석 결과 파일은 \`outputs/\`에 저장한다.

좋은 파일명 예시는 다음과 같다.

\`\`\`text
orders_2026_01_raw.csv
orders_2026_01_cleaned.csv
monthly_sales_summary.csv
category_sales_chart.png
\`\`\`

좋지 않은 파일명 예시는 다음과 같다.

\`\`\`text
data.csv
new.csv
final.csv
final2.csv
real_final.csv
\`\`\`

파일 이름만 보고도 어떤 데이터인지 알 수 있게 만드는 습관이 중요하다.

---

# 2.7 환경 점검 실습

이제 지금까지 준비한 환경이 제대로 동작하는지 확인해 보자.

---

## 2.7.1 Python 버전 확인

터미널에서 다음 명령을 실행한다.

\`\`\`bash
python --version
\`\`\`

또는 환경에 따라 다음 명령을 사용할 수 있다.

\`\`\`bash
python3 --version
\`\`\`

버전이 출력되면 파이썬이 정상적으로 설치되어 있는 것이다.

---

## 2.7.2 pip 버전 확인

\`\`\`bash
python -m pip --version
\`\`\`

이 명령은 현재 파이썬 환경에서 사용하는 pip 정보를 보여 준다.

---

## 2.7.3 가상환경 확인

가상환경이 활성화되어 있는지 확인한다.

터미널 앞에 \`(.venv)\`가 보이면 활성화된 상태일 가능성이 높다.

\`\`\`text
(.venv) data_analysis_project $
\`\`\`

파이썬 실행 위치를 확인할 수도 있다.

Windows에서는 다음 명령을 사용할 수 있다.

\`\`\`powershell
where python
\`\`\`

macOS 또는 Linux에서는 다음 명령을 사용할 수 있다.

\`\`\`bash
which python
\`\`\`

경로 안에 \`.venv\`가 포함되어 있으면 가상환경의 파이썬을 사용하고 있는 것이다.

---

## 2.7.4 라이브러리 import 확인

새 노트북 또는 파이썬 파일에서 다음 코드를 실행한다.

\`\`\`python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

print("NumPy:", np.__version__)
print("pandas:", pd.__version__)
print("환경 준비 완료")
\`\`\`

에러 없이 버전 정보와 메시지가 출력되면 데이터 분석 기본 환경이 준비된 것이다.

---

## 2.7.5 Jupyter에서 데이터 읽기 확인

앞에서 만든 \`orders_sample.csv\` 파일을 pandas로 읽어 본다.

아직 pandas를 자세히 배우지는 않았지만, 환경 확인을 위해 간단히 실행해 보자.

\`\`\`python
import pandas as pd

orders = pd.read_csv("data/raw/orders_sample.csv")
orders.head()
\`\`\`

표 형태로 데이터가 보이면 정상이다.

만약 파일을 찾을 수 없다는 에러가 발생하면 다음을 확인한다.

- 현재 노트북이 프로젝트 루트 폴더에서 실행되고 있는가?
- \`data/raw/orders_sample.csv\` 경로가 실제로 존재하는가?
- 파일 이름에 오타가 없는가?
- 확장자가 \`.csv\`인지 확인했는가?

---

## 2.7.6 첫 그래프 확인

그래프 출력도 확인해 보자.

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt

orders = pd.read_csv("data/raw/orders_sample.csv")
orders["amount"] = orders["quantity"] * orders["price"]

category_sales = orders.groupby("category")["amount"].sum()

category_sales.plot(kind="bar")
plt.title("Category Sales")
plt.xlabel("Category")
plt.ylabel("Sales")
plt.show()
\`\`\`

그래프가 출력되면 분석 환경이 정상적으로 작동하고 있는 것이다.

한글이 그래프에서 깨져 보일 수 있다.  
한글 폰트 설정은 운영체제마다 다르기 때문에 시각화 장에서 별도로 다룬다.  
지금은 그래프가 출력되는지 확인하는 것이 목표다.

---

# 2.8 실습: 분석 프로젝트 폴더 만들기

이 장의 마지막 실습으로 데이터 분석 프로젝트 기본 폴더를 직접 만들어 보자.

---

## 2.8.1 폴더 구조 만들기

터미널에서 다음 명령을 실행한다.

macOS 또는 Linux에서는 다음과 같이 작성할 수 있다.

\`\`\`bash
mkdir -p data/raw data/processed notebooks outputs/charts outputs/reports src
touch README.md
\`\`\`

Windows PowerShell에서는 다음처럼 작성할 수 있다.

\`\`\`powershell
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

완성된 구조는 다음과 같아야 한다.

\`\`\`text
data_analysis_project/
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

## 2.8.2 README.md 작성하기

\`README.md\` 파일에 다음 내용을 작성한다.

\`\`\`markdown
# 데이터 분석 기초 실습 프로젝트

## 프로젝트 목적
파이썬 데이터 분석 기초 수업에서 사용할 실습 프로젝트입니다.

## 폴더 구조
- data/raw: 원본 데이터
- data/processed: 전처리된 데이터
- notebooks: 분석 노트북
- outputs/charts: 그래프 이미지
- outputs/reports: 분석 보고서
- src: 재사용 파이썬 코드

## 사용 라이브러리
- numpy
- pandas
- matplotlib
- seaborn
- openpyxl

## 실행 방법
1. 가상환경을 활성화합니다.
2. 필요한 라이브러리를 설치합니다.
3. notebooks 폴더의 노트북을 실행합니다.
\`\`\`

처음에는 간단한 README로 충분하다.  
분석이 진행되면서 데이터 설명, 실행 순서, 결과 파일 설명을 추가하면 된다.

---

## 2.8.3 환경 점검 노트북 만들기

\`notebooks/\` 폴더 안에 다음 이름의 노트북을 만든다.

\`\`\`text
01_environment_check.ipynb
\`\`\`

첫 번째 마크다운 셀에는 다음 내용을 작성한다.

\`\`\`markdown
# 환경 점검 노트북

이 노트북은 데이터 분석 기초 수업을 위한 파이썬 환경이 제대로 준비되었는지 확인한다.
\`\`\`

다음 코드 셀에는 아래 코드를 입력한다.

\`\`\`python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

print("NumPy:", np.__version__)
print("pandas:", pd.__version__)
print("환경 점검 완료")
\`\`\`

이 코드가 에러 없이 실행되면 기본 환경 준비가 완료된 것이다.

---

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