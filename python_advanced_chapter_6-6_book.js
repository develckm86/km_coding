var e=`<!-- 원본: python_advanced_chapter_6_book.md / 세부 장: 6-6 -->

# 6.6 컨텍스트 매니저와 데이터 처리 코드

이 고급 파이썬 과정은 이후 데이터분석 기초와 고급 과정으로 이어집니다. 데이터분석 자체는 다음 과정에서 다루지만, 분석 전 단계의 코드에서는 컨텍스트 매니저가 자주 필요합니다.

예를 들어 데이터분석 전에 다음 작업을 수행할 수 있습니다.

\`\`\`text
1. 원천 데이터 파일 열기
2. 로그 파일 열기
3. 임시 폴더에 중간 결과 저장
4. API 응답을 JSON 파일로 저장
5. DB 연결을 열어 수집 데이터를 저장
6. 작업이 끝나면 모든 리소스 정리
\`\`\`

이런 작업을 안정적으로 처리하려면 \`with\` 문과 컨텍스트 매니저를 잘 이해해야 합니다.

좋은 데이터 처리 코드는 단순히 결과만 맞는 코드가 아닙니다. 실패하더라도 파일을 닫고, 임시 파일을 정리하고, 로그를 남기고, 다음 실행에 영향을 주지 않는 코드가 좋은 코드입니다.

컨텍스트 매니저는 이런 안정성을 만들어주는 핵심 도구입니다.

---

## 6장 핵심 정리

리소스는 프로그램이 사용하는 외부 자원입니다. 파일, 네트워크 연결, 데이터베이스 연결, 임시 파일과 임시 폴더가 대표적인 예입니다.

리소스는 사용한 뒤 정리해야 합니다. 파일은 닫아야 하고, 데이터베이스 연결도 닫아야 하며, 임시 파일은 삭제해야 합니다.

\`try-finally\`를 사용하면 예외가 발생해도 정리 코드를 실행할 수 있습니다. 하지만 같은 패턴을 반복해서 작성하면 코드가 길어집니다.

\`with\` 문은 리소스의 준비와 정리를 자동으로 처리합니다. \`with\` 블록에 들어갈 때는 \`__enter__()\`가 실행되고, 블록을 벗어날 때는 \`__exit__()\`가 실행됩니다.

컨텍스트 매니저는 \`__enter__\`와 \`__exit__\` 메서드를 가진 객체입니다. 파일 객체는 컨텍스트 매니저이기 때문에 \`with open(...) as file:\` 형태로 사용할 수 있습니다.

\`__exit__\` 메서드는 예외 정보를 받을 수 있습니다. \`__exit__\`가 \`True\`를 반환하면 예외가 억제됩니다. 하지만 예외를 무시하는 코드는 신중하게 사용해야 합니다.

\`contextlib.contextmanager\`를 사용하면 함수 기반 컨텍스트 매니저를 만들 수 있습니다. \`yield\` 앞은 준비 코드, \`yield\` 뒤는 정리 코드 역할을 합니다. 예외 상황에서도 정리 코드가 실행되게 하려면 \`try-finally\`를 함께 사용하는 것이 좋습니다.

\`contextlib.suppress\`는 특정 예외를 무시할 때 사용합니다. \`contextlib.closing\`은 \`close()\` 메서드는 있지만 컨텍스트 매니저가 아닌 객체를 \`with\` 문에서 사용할 수 있게 합니다. \`ExitStack\`은 여러 컨텍스트 매니저를 동적으로 관리할 때 유용합니다.

컨텍스트 매니저는 파일 처리, 임시 폴더, 로그 기록, 실행 시간 측정, 데이터베이스 연결, 대용량 데이터 처리 전 준비 작업에서 자주 사용됩니다.

---

# 연습문제

## 문제 1. 개념 확인

다음 중 리소스라고 보기 어려운 것은 무엇인가요?

1. 파일
2. 데이터베이스 연결
3. 네트워크 연결
4. 단순한 정수 값 \`10\`

---

## 문제 2. 개념 확인

\`with\` 문을 사용하는 가장 중요한 이유로 적절한 것은 무엇인가요?

1. 반복문을 더 빠르게 실행하기 위해서
2. 리소스를 안전하게 준비하고 정리하기 위해서
3. 모든 예외를 무조건 없애기 위해서
4. 변수 이름을 자동으로 만들어주기 위해서

---

## 문제 3. 코드 실행 결과 예측

다음 코드의 실행 결과를 예측해보세요.

\`\`\`python
class SimpleContext:
    def __enter__(self):
        print("enter")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print("exit")

with SimpleContext():
    print("body")
\`\`\`

---

## 문제 4. 코드 실행 결과 예측

다음 코드에서 \`finish\`는 출력될까요?

\`\`\`python
class MyContext:
    def __enter__(self):
        print("start")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print("cleanup")

with MyContext():
    print("work")
    raise ValueError("error")

print("finish")
\`\`\`

---

## 문제 5. 빈칸 채우기

다음 클래스가 컨텍스트 매니저로 동작하도록 빈칸을 채워보세요.

\`\`\`python
class MyContext:
    def ________(self):
        print("시작")
        return self

    def ________(self, exc_type, exc_value, traceback):
        print("종료")
\`\`\`

---

## 문제 6. 코드 작성

\`with\` 문을 사용해 \`hello.txt\` 파일을 만들고, 그 안에 \`Hello Context Manager\`라는 문자열을 저장하는 코드를 작성해보세요.

조건은 다음과 같습니다.

- 인코딩은 \`utf-8\`을 사용합니다.
- 파일은 쓰기 모드로 엽니다.
- 파일을 직접 \`close()\`하지 않습니다.

---

## 문제 7. 코드 작성

다음 조건을 만족하는 컨텍스트 매니저 클래스를 작성해보세요.

클래스 이름은 \`PrintSection\`입니다.

- \`with\` 블록에 들어갈 때 \`작업 시작\`을 출력합니다.
- \`with\` 블록이 끝날 때 \`작업 종료\`를 출력합니다.
- \`with PrintSection():\` 형태로 사용할 수 있어야 합니다.

---

## 문제 8. 코드 작성

\`contextlib.contextmanager\`를 사용해 실행 시간을 측정하는 \`timer()\` 컨텍스트 매니저를 작성해보세요.

조건은 다음과 같습니다.

- \`time.time()\`을 사용합니다.
- \`with timer():\` 형태로 사용할 수 있어야 합니다.
- \`with\` 블록이 끝나면 실행 시간을 출력합니다.
- 예외가 발생해도 실행 시간이 출력되어야 합니다.

---

## 문제 9. 코드 이해

다음 코드에서 \`suppress\`가 하는 역할을 설명해보세요.

\`\`\`python
from contextlib import suppress
from pathlib import Path

path = Path("temp.txt")

with suppress(FileNotFoundError):
    path.unlink()
\`\`\`

---

## 문제 10. 코드 작성

여러 파일 이름이 들어 있는 리스트가 있습니다.

\`\`\`python
filenames = ["a.txt", "b.txt", "c.txt"]
\`\`\`

\`ExitStack\`을 사용해 여러 파일을 한 번에 열고, 각 파일의 내용을 출력하는 코드의 구조를 작성해보세요.

실제 파일이 존재한다고 가정해도 됩니다.

---

# 정답 및 해설

## 문제 1 정답

정답은 4번입니다.

단순한 정수 값 \`10\`은 파일이나 네트워크 연결처럼 열고 닫아야 하는 외부 리소스가 아닙니다. 리소스 관리는 주로 파일, 네트워크 연결, 데이터베이스 연결, 임시 파일처럼 사용 후 정리가 필요한 대상을 다룰 때 중요합니다.

---

## 문제 2 정답

정답은 2번입니다.

\`with\` 문은 리소스를 안전하게 준비하고 정리하기 위한 문법입니다. 예외가 발생해도 정리 코드가 실행되도록 도와줍니다.

---

## 문제 3 정답

실행 결과는 다음과 같습니다.

\`\`\`text
enter
body
exit
\`\`\`

\`with\` 블록에 들어갈 때 \`__enter__()\`가 실행되어 \`enter\`가 출력됩니다. 그다음 블록 안의 코드가 실행되어 \`body\`가 출력됩니다. 마지막으로 블록을 벗어날 때 \`__exit__()\`가 실행되어 \`exit\`가 출력됩니다.

---

## 문제 4 정답

\`finish\`는 출력되지 않습니다.

실행 결과는 다음과 비슷합니다.

\`\`\`text
start
work
cleanup
Traceback ...
ValueError: error
\`\`\`

\`ValueError\`가 발생했지만 \`__exit__()\`는 실행됩니다. 그래서 \`cleanup\`은 출력됩니다. 하지만 \`__exit__()\`가 \`True\`를 반환하지 않았기 때문에 예외는 밖으로 전달됩니다. 따라서 그 아래의 \`print("finish")\`는 실행되지 않습니다.

---

## 문제 5 정답

빈칸에는 각각 \`__enter__\`와 \`__exit__\`가 들어갑니다.

\`\`\`python
class MyContext:
    def __enter__(self):
        print("시작")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print("종료")
\`\`\`

컨텍스트 매니저 클래스는 \`__enter__\`와 \`__exit__\` 메서드를 가져야 합니다.

---

## 문제 6 정답

예시 답안은 다음과 같습니다.

\`\`\`python
with open("hello.txt", "w", encoding="utf-8") as file:
    file.write("Hello Context Manager")
\`\`\`

\`with\` 문을 사용했기 때문에 파일을 직접 \`close()\`하지 않아도 됩니다. \`with\` 블록이 끝나면 파일이 자동으로 닫힙니다.

---

## 문제 7 정답

예시 답안은 다음과 같습니다.

\`\`\`python
class PrintSection:
    def __enter__(self):
        print("작업 시작")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print("작업 종료")
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
with PrintSection():
    print("작업 중")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
작업 시작
작업 중
작업 종료
\`\`\`

---

## 문제 8 정답

예시 답안은 다음과 같습니다.

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

\`try-finally\`를 사용했기 때문에 \`with\` 블록 안에서 예외가 발생해도 실행 시간 출력 코드는 실행됩니다.

---

## 문제 9 정답

\`contextlib.suppress(FileNotFoundError)\`는 \`with\` 블록 안에서 발생한 \`FileNotFoundError\`를 무시합니다.

\`\`\`python
with suppress(FileNotFoundError):
    path.unlink()
\`\`\`

위 코드는 \`temp.txt\` 파일을 삭제하려고 합니다. 파일이 존재하면 삭제됩니다. 파일이 없으면 \`FileNotFoundError\`가 발생하지만, \`suppress\`가 그 예외를 무시하기 때문에 프로그램은 중단되지 않습니다.

다만 중요한 예외를 무조건 무시하면 문제 원인을 찾기 어려우므로, 정말 무시해도 되는 예외에만 사용해야 합니다.

---

## 문제 10 정답

예시 답안은 다음과 같습니다.

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

\`ExitStack\`은 여러 컨텍스트 매니저를 동적으로 등록하고, \`with\` 블록이 끝날 때 모두 정리합니다. 위 코드에서는 열린 파일들이 모두 자동으로 닫힙니다.

---

# 6장을 마치며

이번 장에서는 \`with\` 문과 컨텍스트 매니저를 배웠습니다. \`with\` 문은 파일 처리에서 자주 보이지만, 사실은 훨씬 넓은 용도로 사용할 수 있는 고급 파이썬 문법입니다.

컨텍스트 매니저를 이해하면 “작업 전 준비”와 “작업 후 정리”를 명확하게 분리할 수 있습니다. 또한 예외가 발생해도 리소스가 안전하게 정리되는 코드를 만들 수 있습니다.

데이터를 다루는 프로그램은 파일, API, DB, 로그, 임시 폴더 같은 리소스를 자주 사용합니다. 따라서 컨텍스트 매니저는 이후 데이터분석 기초와 고급 과정으로 넘어가기 전에 반드시 익혀야 할 중요한 개념입니다.

다음 장에서는 객체지향 프로그래밍을 더 깊게 다룹니다. 기초 과정에서 배운 클래스, 객체, 상속 개념을 바탕으로 다중 상속, MRO, 믹스인, 추상 클래스, 조합, 설계 원칙까지 확장해보겠습니다.
`;export{e as default};