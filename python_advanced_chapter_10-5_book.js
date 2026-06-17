var e=`<!-- 원본: python_advanced_chapter_10_book.md / 세부 장: 10-5 -->

# 10.5 \`pyproject.toml\` 기초

\`pyproject.toml\`은 파이썬 프로젝트의 메타데이터와 도구 설정을 담을 수 있는 파일입니다.

기초 과정에서는 \`requirements.txt\`만 사용해도 충분했습니다. 하지만 프로젝트가 커지고 패키징, 테스트, 포맷팅, 타입 검사, 빌드 도구 설정이 필요해지면 \`pyproject.toml\`을 자주 만나게 됩니다.

파일 이름에서 알 수 있듯이 형식은 TOML입니다.

\`\`\`toml
[project]
name = "sales-tool"
version = "0.1.0"
description = "A small sales data processing tool"
requires-python = ">=3.11"
dependencies = [
    "requests>=2.32",
]
\`\`\`

처음부터 모든 설정을 알 필요는 없습니다. 이 장에서는 \`pyproject.toml\`이 어떤 역할을 하는 파일인지 이해하는 것이 목표입니다.

---

## 10.5.1 프로젝트 메타데이터

\`[project]\` 영역에는 프로젝트의 기본 정보를 적을 수 있습니다.

\`\`\`toml
[project]
name = "sales-tool"
version = "0.1.0"
description = "Sales data processing tool"
readme = "README.md"
requires-python = ">=3.11"
\`\`\`

각 항목은 다음 의미를 가집니다.

\`\`\`text
name              프로젝트 또는 패키지 이름
version           버전
description       짧은 설명
readme            README 파일
requires-python   필요한 파이썬 버전
\`\`\`

실무 내부 도구라도 버전과 설명을 적어두면 관리하기 쉽습니다.

---

## 10.5.2 의존성 정보

프로젝트가 사용하는 외부 라이브러리는 \`dependencies\`에 적을 수 있습니다.

\`\`\`toml
[project]
name = "sales-tool"
version = "0.1.0"
dependencies = [
    "requests>=2.32",
    "pydantic>=2.0",
]
\`\`\`

테스트나 개발 도구처럼 실행에는 필요 없지만 개발 중에 필요한 의존성은 별도 그룹으로 관리할 수 있습니다. 도구마다 표현 방식은 조금씩 다를 수 있습니다.

예를 들어 선택 의존성으로 다음처럼 표현할 수 있습니다.

\`\`\`toml
[project.optional-dependencies]
dev = [
    "pytest>=8.0",
    "mypy>=1.0",
]
\`\`\`

이런 방식은 “실행에 필요한 라이브러리”와 “개발에 필요한 라이브러리”를 구분하는 데 도움이 됩니다.

---

## 10.5.3 도구 설정 위치

\`pyproject.toml\`은 여러 도구의 설정을 담는 장소로도 사용됩니다.

예를 들어 pytest 설정을 넣을 수 있습니다.

\`\`\`toml
[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = ["test_*.py"]
\`\`\`

mypy 설정도 넣을 수 있습니다.

\`\`\`toml
[tool.mypy]
python_version = "3.11"
strict = true
\`\`\`

이처럼 \`pyproject.toml\`은 프로젝트 설정의 중심 파일 역할을 할 수 있습니다.

단, 모든 도구가 반드시 \`pyproject.toml\`만 사용하는 것은 아닙니다. 어떤 도구는 별도 설정 파일을 사용할 수도 있습니다. 중요한 것은 프로젝트에서 어떤 기준을 쓸지 정하고 일관되게 관리하는 것입니다.

---

## 10.5.4 \`pyproject.toml\`과 \`requirements.txt\`의 차이

두 파일은 비슷해 보이지만 목적이 다릅니다.

\`\`\`text
requirements.txt   특정 환경에 설치할 패키지 목록
pyproject.toml     프로젝트 메타데이터와 도구 설정, 의존성 선언
\`\`\`

\`requirements.txt\`는 보통 다음처럼 설치 목록을 적습니다.

\`\`\`text
requests==2.32.3
pandas==2.2.3
pytest==8.3.4
\`\`\`

\`pyproject.toml\`은 프로젝트 정보를 더 구조적으로 표현합니다.

\`\`\`toml
[project]
name = "sales-tool"
version = "0.1.0"
dependencies = [
    "requests>=2.32",
]
\`\`\`

초보 실무 프로젝트에서는 \`requirements.txt\`만으로도 충분할 수 있습니다. 하지만 배포 가능한 패키지를 만들거나 여러 도구 설정을 통합하려면 \`pyproject.toml\`을 이해해야 합니다.

---
`;export{e as default};