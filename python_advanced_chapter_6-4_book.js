var e=`<!-- 원본: python_advanced_chapter_6_book.md / 세부 장: 6-4 -->

# 6.4 \`contextlib\`

클래스로 컨텍스트 매니저를 직접 만들 수도 있지만, 매번 \`__enter__\`와 \`__exit__\`를 작성하는 것은 번거로울 수 있습니다.

파이썬 표준 라이브러리에는 컨텍스트 매니저를 더 쉽게 만들고 사용할 수 있도록 도와주는 \`contextlib\` 모듈이 있습니다.

\`\`\`python
import contextlib
\`\`\`

\`contextlib\`에서 자주 사용하는 도구는 다음과 같습니다.

- \`contextmanager\`
- \`suppress\`
- \`closing\`
- \`ExitStack\`

하나씩 살펴보겠습니다.

---

## 6.4.1 \`contextlib.contextmanager\`

\`contextlib.contextmanager\`는 함수 하나로 컨텍스트 매니저를 만들 수 있게 해주는 데코레이터입니다.

5장에서 데코레이터를 배웠기 때문에 이제 이 문법을 더 자연스럽게 이해할 수 있습니다.

\`\`\`python
from contextlib import contextmanager

@contextmanager
def my_context():
    print("시작합니다")
    yield
    print("끝났습니다")
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
with my_context():
    print("작업 중입니다")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
시작합니다
작업 중입니다
끝났습니다
\`\`\`

\`yield\` 앞의 코드는 \`with\` 블록에 들어가기 전에 실행됩니다. \`yield\` 뒤의 코드는 \`with\` 블록이 끝난 뒤 실행됩니다.

\`\`\`python
@contextmanager
def my_context():
    # __enter__ 역할
    print("시작합니다")

    yield

    # __exit__ 역할
    print("끝났습니다")
\`\`\`

이 구조를 이해하면 \`contextmanager\`를 쉽게 사용할 수 있습니다.

---

## 6.4.2 \`yield\`가 값을 전달하는 경우

\`with ... as 변수\` 형태로 값을 전달하고 싶다면 \`yield\` 뒤에 값을 적으면 됩니다.

\`\`\`python
from contextlib import contextmanager

@contextmanager
def open_message():
    print("메시지를 준비합니다")
    message = "안녕하세요"
    yield message
    print("메시지 사용을 마쳤습니다")
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
with open_message() as msg:
    print(msg)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
메시지를 준비합니다
안녕하세요
메시지 사용을 마쳤습니다
\`\`\`

\`yield message\`에서 전달한 \`message\` 값이 \`as msg\`의 \`msg\` 변수에 들어갑니다.

---

## 6.4.3 \`contextmanager\`에서 예외가 발생하는 경우

다음 코드를 보겠습니다.

\`\`\`python
from contextlib import contextmanager

@contextmanager
def managed_work():
    print("준비")
    yield
    print("정리")

with managed_work():
    print("작업")
    raise ValueError("오류 발생")
\`\`\`

이 코드는 문제가 있습니다. \`yield\` 뒤의 \`print("정리")\`가 실행되지 않을 수 있습니다.

왜냐하면 \`with\` 블록 안에서 예외가 발생하면 \`yield\` 지점에서 예외가 다시 발생하기 때문입니다. 따라서 안전한 정리 코드는 \`try-finally\`로 감싸는 것이 좋습니다.

\`\`\`python
from contextlib import contextmanager

@contextmanager
def managed_work():
    print("준비")
    try:
        yield
    finally:
        print("정리")
\`\`\`

이제 예외가 발생해도 정리 코드가 실행됩니다.

\`\`\`python
with managed_work():
    print("작업")
    raise ValueError("오류 발생")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
준비
작업
정리
Traceback ...
ValueError: 오류 발생
\`\`\`

정리 코드는 실행되지만, 예외는 밖으로 전달됩니다. 이것이 일반적으로 가장 안전한 방식입니다.

---

## 6.4.4 함수 기반 파일 컨텍스트 매니저

클래스로 만들었던 파일 컨텍스트 매니저를 함수 기반으로 바꿔보겠습니다.

\`\`\`python
from contextlib import contextmanager

@contextmanager
def managed_file(filename, mode, encoding="utf-8"):
    file = open(filename, mode, encoding=encoding)
    try:
        yield file
    finally:
        file.close()
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
with managed_file("memo.txt", "w") as file:
    file.write("함수 기반 컨텍스트 매니저입니다.")
\`\`\`

이 예제는 \`open()\`과 거의 같은 역할을 합니다. 실제 코드에서는 굳이 \`open()\`을 다시 감쌀 필요는 없지만, 컨텍스트 매니저의 구조를 이해하는 데 도움이 됩니다.

---

## 6.4.5 실행 시간 측정 컨텍스트 매니저를 함수로 만들기

앞에서 클래스로 만들었던 \`Timer\`를 \`contextmanager\`로 다시 만들어보겠습니다.

\`\`\`python
from contextlib import contextmanager
import time

@contextmanager
def timer():
    start = time.time()
    try:
        yield
    finally:
        end = time.time()
        print(f"실행 시간: {end - start:.4f}초")
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
with timer():
    total = sum(range(1_000_000))
\`\`\`

클래스 방식보다 코드가 짧습니다. 단순히 시작과 끝에 동작을 추가하는 정도라면 \`contextmanager\`를 사용하는 방식이 간결합니다.

하지만 상태를 많이 가지거나 여러 메서드가 필요한 경우에는 클래스 기반 컨텍스트 매니저가 더 적절할 수 있습니다.

---

## 6.4.6 \`contextlib.suppress\`

\`contextlib.suppress\`는 특정 예외를 무시하고 싶을 때 사용합니다.

예를 들어 파일을 삭제하려고 하는데 파일이 없을 수도 있다고 가정해봅시다.

\`\`\`python
from pathlib import Path

path = Path("temp.txt")

try:
    path.unlink()
except FileNotFoundError:
    pass
\`\`\`

이 코드는 파일이 없으면 \`FileNotFoundError\`를 무시합니다. \`suppress\`를 사용하면 다음처럼 쓸 수 있습니다.

\`\`\`python
from contextlib import suppress
from pathlib import Path

path = Path("temp.txt")

with suppress(FileNotFoundError):
    path.unlink()
\`\`\`

코드가 짧고 의도가 분명합니다.

하지만 \`suppress\`는 조심해서 사용해야 합니다. 예외를 무시한다는 것은 문제가 발생해도 알리지 않겠다는 뜻입니다. 따라서 정말 무시해도 되는 예외에만 사용해야 합니다.

적절한 사용 예시는 다음과 같습니다.

- 없어도 되는 임시 파일 삭제
- 이미 삭제된 파일 다시 삭제 시도
- 선택 기능이 실패해도 전체 프로그램에는 영향이 없는 경우

부적절한 사용 예시는 다음과 같습니다.

\`\`\`python
with suppress(Exception):
    important_work()
\`\`\`

이렇게 모든 예외를 무시하면 중요한 오류까지 사라집니다. 실무에서는 피해야 합니다.

---

## 6.4.7 \`contextlib.closing\`

어떤 객체는 \`close()\` 메서드는 가지고 있지만 컨텍스트 매니저를 지원하지 않을 수 있습니다. 이런 객체를 \`with\` 문에서 사용하고 싶을 때 \`closing\`을 사용할 수 있습니다.

먼저 간단한 예제 클래스를 만들어보겠습니다.

\`\`\`python
class LegacyConnection:
    def open(self):
        print("연결을 엽니다")

    def close(self):
        print("연결을 닫습니다")

    def send(self, message):
        print(f"전송: {message}")
\`\`\`

이 클래스는 \`close()\` 메서드는 있지만 \`__enter__\`, \`__exit__\`는 없습니다. 따라서 바로 \`with\` 문에서 사용할 수 없습니다.

\`\`\`python
from contextlib import closing

conn = LegacyConnection()
conn.open()

with closing(conn) as connection:
    connection.send("hello")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
연결을 엽니다
전송: hello
연결을 닫습니다
\`\`\`

\`closing\`은 \`with\` 블록이 끝날 때 객체의 \`close()\` 메서드를 호출합니다.

다만 요즘 많이 사용하는 객체들은 이미 컨텍스트 매니저를 지원하는 경우가 많습니다. \`closing\`은 오래된 코드나 직접 만든 객체를 다룰 때 유용합니다.

---

## 6.4.8 \`contextlib.ExitStack\`

\`ExitStack\`은 여러 컨텍스트 매니저를 동적으로 관리할 때 사용합니다.

보통 파일 여러 개를 동시에 열 때는 다음처럼 작성할 수 있습니다.

\`\`\`python
with open("a.txt", "r", encoding="utf-8") as file_a, \\
     open("b.txt", "r", encoding="utf-8") as file_b:
    content_a = file_a.read()
    content_b = file_b.read()
\`\`\`

파일 개수가 고정되어 있다면 이렇게 작성해도 됩니다. 하지만 파일 목록이 실행 중에 결정된다면 어떻게 해야 할까요?

\`\`\`python
filenames = ["a.txt", "b.txt", "c.txt"]
\`\`\`

이런 경우 \`ExitStack\`을 사용할 수 있습니다.

\`\`\`python
from contextlib import ExitStack

filenames = ["a.txt", "b.txt", "c.txt"]

with ExitStack() as stack:
    files = [
        stack.enter_context(open(filename, "r", encoding="utf-8"))
        for filename in filenames
    ]

    for file in files:
        print(file.read())
\`\`\`

\`stack.enter_context()\`는 컨텍스트 매니저를 등록합니다. \`with ExitStack()\` 블록이 끝나면 등록된 모든 컨텍스트 매니저의 정리 동작이 자동으로 실행됩니다.

즉, 위 예제에서는 열린 파일들이 모두 안전하게 닫힙니다.

---

## 6.4.9 \`ExitStack\`이 필요한 상황

\`ExitStack\`은 처음에는 어렵게 느껴질 수 있습니다. 하지만 실무에서는 다음 상황에서 유용합니다.

- 열어야 할 파일 개수가 실행 중에 결정될 때
- 여러 리소스를 순서대로 열고, 반대 순서로 닫아야 할 때
- 일부 리소스를 열다가 중간에 실패해도 이미 연 리소스는 정리해야 할 때
- 컨텍스트 매니저와 일반 정리 함수를 함께 관리해야 할 때

예를 들어 여러 파일을 병합하는 프로그램을 생각해봅시다.

\`\`\`python
from contextlib import ExitStack
from pathlib import Path

input_files = [Path("part1.txt"), Path("part2.txt"), Path("part3.txt")]
output_file = Path("merged.txt")

with ExitStack() as stack:
    readers = [
        stack.enter_context(path.open("r", encoding="utf-8"))
        for path in input_files
    ]
    writer = stack.enter_context(output_file.open("w", encoding="utf-8"))

    for reader in readers:
        writer.write(reader.read())
        writer.write("\\n")
\`\`\`

이 코드에서는 입력 파일 여러 개와 출력 파일 하나를 함께 관리합니다. 블록이 끝나면 모든 파일이 자동으로 닫힙니다.

---
`;export{e as default};