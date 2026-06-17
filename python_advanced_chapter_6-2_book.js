var e=`<!-- 원본: python_advanced_chapter_6_book.md / 세부 장: 6-2 -->

# 6.2 \`with\` 문

\`with\` 문은 리소스의 시작과 끝을 안전하게 관리하는 문법입니다.

파일을 다룰 때 가장 많이 사용합니다.

\`\`\`python
with open("result.txt", "w", encoding="utf-8") as file:
    file.write("첫 번째 줄\\n")
    file.write("두 번째 줄\\n")
\`\`\`

위 코드에서는 파일을 직접 닫는 \`file.close()\`가 없습니다. 하지만 \`with\` 블록이 끝나면 파일은 자동으로 닫힙니다.

\`with\` 문은 다음 구조를 가집니다.

\`\`\`python
with 컨텍스트_매니저 as 변수:
    실행할 코드
\`\`\`

파일 처리에서는 \`open()\`이 컨텍스트 매니저 역할을 합니다.

\`\`\`python
with open("result.txt", "w", encoding="utf-8") as file:
    file.write("hello")
\`\`\`

여기서 \`file\`은 \`with\` 블록 안에서 사용할 파일 객체입니다.

---

## 6.2.1 \`with\` 문이 해결하는 문제

\`with\` 문을 사용하면 다음과 같은 장점이 있습니다.

첫째, 리소스를 자동으로 정리합니다.

\`\`\`python
with open("memo.txt", "r", encoding="utf-8") as file:
    content = file.read()
\`\`\`

파일을 열고 사용한 뒤 자동으로 닫습니다.

둘째, 예외가 발생해도 정리 코드가 실행됩니다.

\`\`\`python
with open("memo.txt", "w", encoding="utf-8") as file:
    file.write("시작\\n")
    raise ValueError("문제가 발생했습니다")
\`\`\`

위 코드에서는 \`ValueError\`가 발생하지만, 파일은 그래도 닫힙니다.

셋째, 코드가 짧고 읽기 쉬워집니다.

\`\`\`python
file = open("memo.txt", "w", encoding="utf-8")
try:
    file.write("hello")
finally:
    file.close()
\`\`\`

위 코드를 다음처럼 줄일 수 있습니다.

\`\`\`python
with open("memo.txt", "w", encoding="utf-8") as file:
    file.write("hello")
\`\`\`

두 코드의 목적은 같습니다. 하지만 \`with\` 문을 사용한 코드가 훨씬 의도가 분명합니다.

---

## 6.2.2 \`with\` 문은 파일 전용 문법이 아니다

초보자는 \`with\` 문을 파일 처리 문법으로만 생각하기 쉽습니다. 하지만 \`with\` 문은 파일 전용이 아닙니다.

\`with\` 문은 컨텍스트 매니저를 사용하는 일반 문법입니다. 컨텍스트 매니저로 만들어진 객체라면 파일이 아니어도 \`with\` 문에서 사용할 수 있습니다.

예를 들어 실행 시간을 측정하는 컨텍스트 매니저를 만들면 다음처럼 사용할 수 있습니다.

\`\`\`python
with timer():
    slow_work()
\`\`\`

임시 폴더를 만드는 컨텍스트 매니저는 다음처럼 사용할 수 있습니다.

\`\`\`python
with temporary_folder() as folder:
    make_temp_files(folder)
\`\`\`

데이터베이스 연결을 관리하는 컨텍스트 매니저는 다음처럼 사용할 수 있습니다.

\`\`\`python
with connect_database() as conn:
    conn.execute("SELECT * FROM users")
\`\`\`

핵심은 \`with\` 문이 “시작과 끝이 있는 작업”을 안전하게 표현한다는 점입니다.

---

## 6.2.3 \`with\` 문이 내부적으로 하는 일

다음 코드를 보겠습니다.

\`\`\`python
with open("memo.txt", "r", encoding="utf-8") as file:
    content = file.read()
\`\`\`

이 코드는 내부적으로 대략 다음과 같은 흐름으로 동작합니다.

\`\`\`python
manager = open("memo.txt", "r", encoding="utf-8")
file = manager.__enter__()

try:
    content = file.read()
finally:
    manager.__exit__(None, None, None)
\`\`\`

정확한 내부 동작은 예외 처리까지 포함해 조금 더 복잡하지만, 핵심은 다음 두 메서드입니다.

\`\`\`python
__enter__()
__exit__()
\`\`\`

컨텍스트 매니저는 이 두 메서드를 가진 객체입니다.

- \`__enter__()\`는 \`with\` 블록에 들어갈 때 실행됩니다.
- \`__exit__()\`는 \`with\` 블록에서 나올 때 실행됩니다.

파일 객체는 이미 이 두 메서드를 가지고 있습니다. 그래서 \`open()\`으로 연 파일 객체를 \`with\` 문에서 사용할 수 있습니다.

---
`;export{e as default};