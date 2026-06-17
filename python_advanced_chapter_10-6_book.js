var e=`<!-- 원본: python_advanced_chapter_10_book.md / 세부 장: 10-6 -->

# 10.6 의존성 관리

의존성은 프로젝트가 동작하기 위해 필요한 외부 라이브러리입니다.

예를 들어 다음 코드를 실행하려면 \`requests\`가 설치되어 있어야 합니다.

\`\`\`python
import requests

response = requests.get("https://example.com")
\`\`\`

\`requests\`는 이 프로젝트의 의존성입니다.

실무에서는 의존성을 제대로 관리하지 않으면 다음 문제가 생깁니다.

\`\`\`text
내 컴퓨터에서는 되는데 다른 사람 컴퓨터에서는 안 된다.
어제는 되던 코드가 오늘은 안 된다.
라이브러리 버전이 달라서 함수 사용법이 다르다.
서버에 배포했더니 필요한 패키지가 빠져 있다.
\`\`\`

---

## 10.6.1 \`requirements.txt\`

가장 단순한 의존성 관리 방법은 \`requirements.txt\` 파일을 사용하는 것입니다.

\`\`\`text
requests==2.32.3
pandas==2.2.3
pytest==8.3.4
\`\`\`

다른 환경에서는 다음 명령으로 같은 패키지를 설치할 수 있습니다.

\`\`\`bash
pip install -r requirements.txt
\`\`\`

현재 환경에 설치된 패키지 목록을 파일로 저장할 수도 있습니다.

\`\`\`bash
pip freeze > requirements.txt
\`\`\`

하지만 \`pip freeze\`는 현재 환경의 모든 패키지를 적기 때문에 불필요한 패키지까지 들어갈 수 있습니다. 그래서 프로젝트에 정말 필요한 패키지만 직접 정리하는 방식도 많이 사용합니다.

---

## 10.6.2 버전 고정

버전 고정은 특정 버전의 라이브러리를 사용하겠다고 명시하는 것입니다.

\`\`\`text
requests==2.32.3
\`\`\`

이렇게 하면 항상 같은 버전이 설치됩니다.

범위를 지정할 수도 있습니다.

\`\`\`text
requests>=2.32,<3.0
\`\`\`

이 의미는 다음과 같습니다.

\`\`\`text
2.32 이상
3.0 미만
\`\`\`

버전 범위를 넓게 잡으면 업데이트를 쉽게 받을 수 있지만, 예상하지 못한 변경으로 코드가 깨질 수 있습니다. 버전을 완전히 고정하면 재현성은 좋아지지만, 보안 업데이트나 버그 수정 반영이 늦어질 수 있습니다.

의존성 관리는 항상 균형이 필요합니다.

---

## 10.6.3 개발용 의존성과 실행용 의존성

실행용 의존성은 프로그램이 실제로 동작하기 위해 필요한 라이브러리입니다.

\`\`\`text
requests
pandas
openpyxl
\`\`\`

개발용 의존성은 개발, 테스트, 검사에 필요한 라이브러리입니다.

\`\`\`text
pytest
mypy
ruff
black
\`\`\`

작은 프로젝트에서는 하나의 \`requirements.txt\`에 모두 적어도 됩니다. 하지만 프로젝트가 커지면 구분하는 것이 좋습니다.

예를 들어 다음처럼 파일을 나눌 수 있습니다.

\`\`\`text
requirements.txt
requirements-dev.txt
\`\`\`

\`requirements.txt\`:

\`\`\`text
requests==2.32.3
pandas==2.2.3
\`\`\`

\`requirements-dev.txt\`:

\`\`\`text
-r requirements.txt
pytest==8.3.4
mypy==1.13.0
\`\`\`

이제 개발 환경에서는 다음 명령을 사용합니다.

\`\`\`bash
pip install -r requirements-dev.txt
\`\`\`

운영 환경에서는 실행에 필요한 것만 설치할 수 있습니다.

\`\`\`bash
pip install -r requirements.txt
\`\`\`

---

## 10.6.4 재현 가능한 환경 만들기

재현 가능한 환경이란 다른 컴퓨터에서도 같은 코드가 같은 방식으로 실행될 수 있는 환경을 말합니다.

이를 위해 필요한 것은 다음과 같습니다.

\`\`\`text
1. 파이썬 버전을 명시한다.
2. 외부 라이브러리 목록을 관리한다.
3. 중요한 라이브러리 버전을 고정한다.
4. 실행 방법을 README에 적는다.
5. 설정값과 환경 변수를 문서화한다.
\`\`\`

예를 들어 README에는 다음처럼 적을 수 있습니다.

\`\`\`markdown
## 실행 방법

\`\`\`bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m sales_app.main --input data/sales.csv --output data/result.json
\`\`\`
\`\`\`

윈도우 환경이면 가상환경 활성화 명령이 다를 수 있으므로 따로 안내하는 것이 좋습니다.

\`\`\`powershell
.venv\\Scripts\\activate
\`\`\`

재현 가능한 환경은 데이터분석에서도 중요합니다. 분석 결과는 코드뿐 아니라 라이브러리 버전, 데이터 파일, 실행 설정에 영향을 받기 때문입니다.

---
`;export{e as default};