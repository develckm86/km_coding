var e=`<!-- 원본: python_data_analysis_basic_chapter_2_book.md / 세부 장: 2-3 -->

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
`;export{e as default};