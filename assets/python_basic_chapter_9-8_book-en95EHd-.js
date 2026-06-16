var e=`<!-- 원본: python_basic_chapter_9_book.md / 세부 장: 9-8 -->

# 9.8 자주 발생하는 문제와 해결 방향

### 9.8.1 \`ModuleNotFoundError\`

가장 자주 만나는 에러 중 하나는 \`ModuleNotFoundError\`입니다.

\`\`\`text
ModuleNotFoundError: No module named 'requests'
\`\`\`

이 에러는 파이썬이 해당 모듈을 찾지 못했다는 뜻입니다.

확인할 내용은 다음과 같습니다.

\`\`\`text
- 라이브러리를 설치했는가?
- 현재 가상환경이 활성화되어 있는가?
- 설치한 환경과 실행한 환경이 같은가?
- 패키지 이름과 import 이름을 혼동하지 않았는가?
\`\`\`

예를 들어 \`beautifulsoup4\`는 설치 이름과 import 이름이 다릅니다.

\`\`\`bash
python -m pip install beautifulsoup4
\`\`\`

\`\`\`python
from bs4 import BeautifulSoup
\`\`\`

설치 이름을 그대로 import하려고 하면 에러가 발생할 수 있습니다.

---

### 9.8.2 설치했는데 import가 안 되는 경우

분명히 설치했는데 import가 안 되는 경우가 있습니다. 이때는 설치한 Python과 실행하는 Python이 다를 가능성이 있습니다.

다음 명령으로 설치된 패키지를 확인합니다.

\`\`\`bash
python -m pip list
\`\`\`

그리고 파이썬 실행 파일 경로를 확인합니다.

\`\`\`python
import sys

print(sys.executable)
\`\`\`

VS Code를 사용한다면 선택된 Python 인터프리터가 가상환경의 Python인지 확인해야 합니다.

자주 발생하는 상황은 다음과 같습니다.

\`\`\`text
터미널에서는 가상환경에 설치했는데,
VS Code는 다른 Python으로 코드를 실행하고 있음
\`\`\`

이 경우 VS Code에서 Python 인터프리터를 올바르게 선택해야 합니다.

---

### 9.8.3 권한 오류

라이브러리 설치 중 권한 오류가 발생할 수 있습니다.

이때 무조건 관리자 권한으로 설치하기보다, 먼저 가상환경을 사용하는 것이 좋습니다. 가상환경 안에서는 프로젝트 폴더 안에 라이브러리를 설치하므로 시스템 전체 권한 문제가 줄어듭니다.

권한 오류가 날 때 확인할 내용은 다음과 같습니다.

\`\`\`text
- 가상환경을 사용하고 있는가?
- 가상환경이 활성화되어 있는가?
- 회사 또는 학교 PC의 보안 정책이 있는가?
- 네트워크 제한이 있는가?
\`\`\`

특히 회사 PC에서는 보안 정책 때문에 패키지 설치가 제한될 수 있습니다. 이 경우 내부 정책을 따라야 합니다.

---

### 9.8.4 패키지 이름 오타

패키지 이름을 잘못 입력해 설치가 실패하거나 엉뚱한 패키지를 설치할 수 있습니다.

예를 들어 다음은 흔한 혼동입니다.

| 의도한 라이브러리 | 설치 명령 | import |
|---|---|---|
| Requests | \`python -m pip install requests\` | \`import requests\` |
| Beautiful Soup | \`python -m pip install beautifulsoup4\` | \`from bs4 import BeautifulSoup\` |
| OpenPyXL | \`python -m pip install openpyxl\` | \`import openpyxl\` |
| pytest | \`python -m pip install pytest\` | 보통 터미널에서 \`pytest\` 실행 |

설치하기 전에는 문서에서 정확한 이름을 확인하는 습관을 들이는 것이 좋습니다.

---

### 9.8.5 버전 충돌

버전 충돌은 여러 패키지가 서로 다른 버전을 요구할 때 발생할 수 있습니다.

예를 들어 어떤 패키지는 A 라이브러리의 1.x 버전이 필요하고, 다른 패키지는 A 라이브러리의 2.x 버전이 필요할 수 있습니다.

이런 충돌을 줄이기 위한 기본 방법은 다음과 같습니다.

\`\`\`text
- 프로젝트마다 가상환경을 분리한다.
- 불필요한 라이브러리를 많이 설치하지 않는다.
- requirements.txt를 관리한다.
- 새 라이브러리를 설치한 뒤 테스트한다.
\`\`\`

기초 단계에서 모든 충돌을 해결하는 방법을 외울 필요는 없습니다. 중요한 것은 “프로젝트마다 가상환경을 분리한다”는 습관입니다.

---
`;export{e as default};