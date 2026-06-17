var e=`<!-- 원본: python_basic_chapter_9_book.md / 세부 장: 9-4 -->

# 9.4 \`requirements.txt\`

### 9.4.1 \`requirements.txt\`란?

\`requirements.txt\`는 프로젝트에 필요한 외부 라이브러리 목록을 적어 두는 파일입니다.

예를 들어 프로젝트에서 다음 라이브러리를 사용한다고 해봅시다.

\`\`\`text
requests
pandas
openpyxl
\`\`\`

그러면 \`requirements.txt\`에 다음처럼 적을 수 있습니다.

\`\`\`text
requests
pandas
openpyxl
\`\`\`

또는 버전을 함께 적을 수도 있습니다.

\`\`\`text
requests==2.34.2
pandas==2.3.3
openpyxl==3.1.4
\`\`\`

이 파일이 있으면 다른 사람이 같은 프로젝트를 실행할 때 필요한 라이브러리를 한 번에 설치할 수 있습니다.

\`\`\`bash
python -m pip install -r requirements.txt
\`\`\`

여기서 \`-r\`은 파일을 읽어서 그 안에 적힌 패키지들을 설치하라는 뜻입니다.

---

### 9.4.2 현재 설치 목록 저장하기

현재 가상환경에 설치된 패키지 목록을 파일로 저장하려면 다음 명령을 사용합니다.

\`\`\`bash
python -m pip freeze > requirements.txt
\`\`\`

이 명령은 현재 설치된 패키지와 버전을 \`requirements.txt\` 파일에 저장합니다.

예를 들어 파일 내용은 다음과 비슷할 수 있습니다.

\`\`\`text
certifi==2026.1.1
charset-normalizer==3.4.0
idna==3.10
requests==2.34.2
urllib3==2.5.0
\`\`\`

여기서 내가 직접 설치한 것은 \`requests\` 하나뿐일 수 있습니다. 하지만 \`requests\`가 내부적으로 필요로 하는 다른 패키지도 함께 기록될 수 있습니다.

이것을 **의존성**이라고 합니다.

---

### 9.4.3 \`pip freeze\` 결과를 이해하기

\`pip freeze\`를 실행하면 생각보다 많은 패키지가 보일 수 있습니다. 이것은 이상한 일이 아닙니다.

외부 라이브러리 하나가 다른 라이브러리에 의존하는 경우가 많기 때문입니다.

예를 들어 \`requests\`를 설치하면 \`urllib3\`, \`certifi\`, \`charset-normalizer\`, \`idna\` 같은 패키지가 함께 설치될 수 있습니다. \`requests\`가 HTTP 요청을 처리하기 위해 이런 패키지들의 도움을 받기 때문입니다.

기초 단계에서는 모든 의존 패키지를 외울 필요가 없습니다. 중요한 것은 다음입니다.

\`\`\`text
내가 설치한 라이브러리 외에도 함께 설치되는 패키지가 있을 수 있다.
requirements.txt에는 그런 패키지들도 기록될 수 있다.
\`\`\`

---

### 9.4.4 설치 목록으로 환경 재현하기

새로운 컴퓨터나 새로운 가상환경에서 같은 프로젝트를 실행하려면 먼저 가상환경을 만들고, \`requirements.txt\`로 필요한 패키지를 설치합니다.

\`\`\`bash
python -m venv .venv
\`\`\`

가상환경을 활성화한 뒤 다음 명령을 실행합니다.

\`\`\`bash
python -m pip install -r requirements.txt
\`\`\`

이렇게 하면 \`requirements.txt\`에 적힌 패키지들이 설치됩니다.

실무에서 프로젝트를 전달할 때는 보통 다음 파일들이 함께 필요합니다.

\`\`\`text
main.py
requirements.txt
README.md
\`\`\`

\`README.md\`에는 실행 방법을 적고, \`requirements.txt\`에는 필요한 라이브러리를 적습니다. 그러면 다른 사람이 프로젝트를 실행하기 쉬워집니다.

---

### 9.4.5 버전 고정의 장단점

\`requirements.txt\`에는 버전을 고정할 수도 있고, 고정하지 않을 수도 있습니다.

버전을 고정한 예시는 다음과 같습니다.

\`\`\`text
requests==2.34.2
pandas==2.3.3
\`\`\`

버전을 고정하지 않은 예시는 다음과 같습니다.

\`\`\`text
requests
pandas
\`\`\`

버전을 고정하면 같은 버전이 설치되므로 실행 환경을 재현하기 쉽습니다. 하지만 시간이 지나면 오래된 버전을 계속 쓰게 될 수 있습니다.

버전을 고정하지 않으면 설치 시점의 최신 버전이 설치될 수 있습니다. 하지만 최신 버전에서 기존 코드와 호환되지 않는 변경이 있으면 문제가 생길 수 있습니다.

실무에서는 프로젝트 성격에 따라 다르게 관리합니다.

\`\`\`text
학습용 프로젝트: 버전을 엄격하게 고정하지 않아도 됨
실무 운영 프로젝트: 버전 고정과 테스트가 중요함
협업 프로젝트: requirements.txt를 함께 관리하는 것이 좋음
\`\`\`

---
`;export{e as default};