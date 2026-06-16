var e=`<!-- 원본: python_basic_chapter_9_book.md / 세부 장: 9-7 -->

# 9.7 외부 라이브러리 사용 흐름

### 9.7.1 라이브러리 사용의 기본 순서

외부 라이브러리를 사용하는 흐름은 보통 다음과 같습니다.

\`\`\`text
1. 해결하려는 문제를 정한다.
2. 필요한 라이브러리를 찾는다.
3. 공식 문서를 확인한다.
4. 가상환경을 만든다.
5. 라이브러리를 설치한다.
6. import해서 사용한다.
7. 간단한 예제로 동작을 확인한다.
8. requirements.txt에 기록한다.
\`\`\`

이 흐름을 습관으로 만들면 새로운 라이브러리를 배울 때도 덜 혼란스럽습니다.

---

### 9.7.2 예제 프로젝트 준비하기

간단한 예제 프로젝트를 만들어 보겠습니다.

프로젝트 폴더를 다음처럼 구성합니다.

\`\`\`text
library_practice/
  main.py
\`\`\`

먼저 프로젝트 폴더로 이동합니다.

\`\`\`bash
cd library_practice
\`\`\`

가상환경을 만듭니다.

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

그다음 \`requests\`를 설치합니다.

\`\`\`bash
python -m pip install requests
\`\`\`

설치 목록을 저장합니다.

\`\`\`bash
python -m pip freeze > requirements.txt
\`\`\`

이제 폴더 구조는 다음처럼 됩니다.

\`\`\`text
library_practice/
  .venv/
  main.py
  requirements.txt
\`\`\`

---

### 9.7.3 설치 확인 코드 작성하기

\`main.py\`에 다음 코드를 작성합니다.

\`\`\`python
import requests

print("requests 라이브러리를 정상적으로 불러왔습니다.")
print("라이브러리 이름:", requests.__name__)
\`\`\`

실행합니다.

\`\`\`bash
python main.py
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
requests 라이브러리를 정상적으로 불러왔습니다.
라이브러리 이름: requests
\`\`\`

이 예제는 실제 API 요청을 보내지는 않습니다. 하지만 설치와 import가 정상적으로 되는지 확인할 수 있습니다.

외부 라이브러리를 처음 설치했을 때는 이렇게 작은 코드로 먼저 확인하는 습관이 좋습니다.

---

### 9.7.4 설치 목록 확인하기

설치된 패키지를 확인해 봅니다.

\`\`\`bash
python -m pip list
\`\`\`

\`requests\`가 목록에 보이면 설치된 것입니다.

또한 \`requirements.txt\` 파일을 열어 보면 설치된 패키지와 버전이 기록되어 있습니다.

\`\`\`text
requests==2.34.2
...
\`\`\`

버전 번호는 실행 시점과 환경에 따라 다를 수 있습니다. 여기서 중요한 것은 파일에 필요한 패키지 목록이 기록되었다는 점입니다.

---

### 9.7.5 다른 환경에서 재현하기

다른 사람이 이 프로젝트를 받았다고 가정해 봅시다.

그 사람은 \`.venv\` 폴더를 받지 않습니다. 대신 다음 파일을 받습니다.

\`\`\`text
main.py
requirements.txt
\`\`\`

그리고 자신의 컴퓨터에서 가상환경을 새로 만들고, 필요한 라이브러리를 설치합니다.

\`\`\`bash
python -m venv .venv
\`\`\`

가상환경을 활성화한 다음 다음 명령을 실행합니다.

\`\`\`bash
python -m pip install -r requirements.txt
\`\`\`

이렇게 하면 프로젝트 실행에 필요한 라이브러리가 설치됩니다.

이 흐름이 실무에서 매우 중요합니다. “내 컴퓨터에서는 되는데 다른 사람 컴퓨터에서는 안 되는 문제”를 줄이는 기본 방법이기 때문입니다.

---
`;export{e as default};