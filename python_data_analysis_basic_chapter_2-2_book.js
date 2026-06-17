var e=`<!-- 원본: python_data_analysis_basic_chapter_2_book.md / 세부 장: 2-2 -->

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
`;export{e as default};