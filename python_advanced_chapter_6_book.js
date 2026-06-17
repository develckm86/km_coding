var e=`# 6장. 컨텍스트 매니저와 리소스 관리

기초 과정에서 우리는 파일을 다룰 때 다음과 같은 코드를 사용했습니다.

\`\`\`python
with open("memo.txt", "r", encoding="utf-8") as file:
    content = file.read()
\`\`\`

처음에는 이 코드를 “파일을 안전하게 열고 닫는 문법” 정도로 이해해도 충분했습니다. 하지만 고급 파이썬에서는 \`with\` 문이 단순히 파일 처리 전용 문법이 아니라는 점을 이해해야 합니다.

\`with\` 문은 **작업을 시작할 때 필요한 준비를 하고, 작업이 끝났을 때 필요한 정리를 자동으로 실행하는 문법**입니다. 파일을 여는 일, 데이터베이스 연결을 여는 일, 네트워크 연결을 여는 일, 임시 폴더를 만드는 일, 실행 시간을 측정하는 일처럼 “시작과 끝이 분명한 작업”에 특히 잘 어울립니다.

이번 장에서는 \`with\` 문이 내부적으로 어떻게 동작하는지 살펴보고, 직접 컨텍스트 매니저를 만들어봅니다. 그리고 표준 라이브러리인 \`contextlib\`를 사용해 더 간단하고 실무적인 방식으로 리소스를 관리하는 방법을 배웁니다.

이번 장의 목표는 다음과 같습니다.

- 리소스 관리가 무엇인지 설명할 수 있다.
- \`with\` 문이 필요한 이유를 이해한다.
- 컨텍스트 매니저가 무엇인지 설명할 수 있다.
- \`__enter__\`와 \`__exit__\` 메서드의 역할을 이해한다.
- 직접 컨텍스트 매니저 클래스를 만들 수 있다.
- \`contextlib.contextmanager\`를 사용해 함수 기반 컨텍스트 매니저를 만들 수 있다.
- \`contextlib.suppress\`, \`closing\`, \`ExitStack\`의 기본 사용법을 이해한다.
- 파일, 임시 폴더, 로그, 실행 시간 측정 같은 실무 상황에 컨텍스트 매니저를 적용할 수 있다.

---

## 6.1 리소스 관리란?

프로그램은 실행되는 동안 여러 외부 자원을 사용합니다. 여기서 말하는 자원을 보통 **리소스**라고 합니다.

대표적인 리소스에는 다음과 같은 것들이 있습니다.

- 파일
- 폴더
- 네트워크 연결
- 데이터베이스 연결
- 임시 파일
- 임시 폴더
- 잠금 객체
- 외부 장비나 시스템과의 연결

리소스는 단순한 변수와 다릅니다. 변수는 사용하지 않게 되면 파이썬이 알아서 정리할 수 있지만, 파일이나 네트워크 연결 같은 리소스는 명시적으로 닫거나 정리해야 하는 경우가 많습니다.

파일을 예로 들어보겠습니다.

\`\`\`python
file = open("memo.txt", "w", encoding="utf-8")
file.write("안녕하세요")
file.close()
\`\`\`

이 코드는 파일을 열고, 내용을 쓰고, 파일을 닫습니다.

겉으로 보기에는 문제가 없어 보입니다. 하지만 \`file.write()\`를 실행하는 도중 에러가 발생하면 어떻게 될까요?

\`\`\`python
file = open("memo.txt", "w", encoding="utf-8")
file.write("안녕하세요")
raise ValueError("중간에 문제가 발생했습니다.")
file.close()
\`\`\`

위 코드에서는 \`raise ValueError(...)\`가 실행되는 순간 프로그램 흐름이 중단됩니다. 그러면 그 아래에 있는 \`file.close()\`는 실행되지 않습니다.

파일이 제대로 닫히지 않으면 다음과 같은 문제가 생길 수 있습니다.

- 파일 내용이 완전히 저장되지 않을 수 있다.
- 운영체제의 파일 핸들이 계속 사용 중으로 남을 수 있다.
- 다른 프로그램이 해당 파일을 사용하지 못할 수 있다.
- 많은 파일을 반복해서 열 경우 프로그램이 불안정해질 수 있다.

리소스 관리는 이런 문제를 막기 위해 필요합니다.

---

## 6.1.1 리소스는 시작과 끝이 있다

리소스 관리에서 중요한 관점은 **시작과 끝**입니다.

파일 처리를 예로 들면 다음과 같습니다.

\`\`\`text
파일 열기  →  파일 사용하기  →  파일 닫기
\`\`\`

데이터베이스 연결도 비슷합니다.

\`\`\`text
DB 연결 열기  →  쿼리 실행하기  →  DB 연결 닫기
\`\`\`

임시 폴더를 사용하는 작업도 마찬가지입니다.

\`\`\`text
임시 폴더 만들기  →  임시 파일 저장하기  →  임시 폴더 삭제하기
\`\`\`

이처럼 많은 작업은 “준비 → 사용 → 정리”라는 구조를 가집니다. 컨텍스트 매니저는 바로 이 구조를 코드로 표현하기 위한 도구입니다.

---

## 6.1.2 직접 닫는 코드의 문제

다음 코드를 살펴보겠습니다.

\`\`\`python
file = open("result.txt", "w", encoding="utf-8")

file.write("첫 번째 줄\\n")
file.write("두 번째 줄\\n")

file.close()
\`\`\`

이 코드는 정상 상황에서는 잘 동작합니다. 하지만 중간에 예외가 발생하면 파일을 닫지 못할 수 있습니다.

이 문제를 해결하기 위해 \`try-finally\`를 사용할 수 있습니다.

\`\`\`python
file = open("result.txt", "w", encoding="utf-8")

try:
    file.write("첫 번째 줄\\n")
    file.write("두 번째 줄\\n")
finally:
    file.close()
\`\`\`

\`finally\` 블록은 예외가 발생하든 발생하지 않든 실행됩니다. 따라서 파일을 닫는 코드를 \`finally\`에 넣으면 더 안전합니다.

하지만 이런 코드를 파일을 다룰 때마다 반복해서 작성하면 코드가 길어지고 지저분해집니다.

\`\`\`python
file = open("result.txt", "w", encoding="utf-8")
try:
    ...
finally:
    file.close()
\`\`\`

파이썬은 이런 패턴을 더 간결하게 작성할 수 있도록 \`with\` 문을 제공합니다.

---

## 6.2 \`with\` 문

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

## 6.3 컨텍스트 매니저 직접 만들기

이제 직접 컨텍스트 매니저를 만들어보겠습니다.

가장 기본적인 컨텍스트 매니저는 \`__enter__\`와 \`__exit__\` 메서드를 가진 클래스입니다.

\`\`\`python
class MyContext:
    def __enter__(self):
        print("시작합니다")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print("끝났습니다")
\`\`\`

이 클래스는 \`with\` 문에서 사용할 수 있습니다.

\`\`\`python
with MyContext() as context:
    print("작업 중입니다")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
시작합니다
작업 중입니다
끝났습니다
\`\`\`

\`with\` 블록에 들어가기 전에 \`__enter__()\`가 실행되고, 블록이 끝나면 \`__exit__()\`가 실행됩니다.

---

## 6.3.1 \`__enter__\` 메서드

\`__enter__\` 메서드는 \`with\` 블록에 들어갈 때 실행됩니다.

\`\`\`python
def __enter__(self):
    print("리소스를 준비합니다")
    return self
\`\`\`

\`__enter__\`가 반환하는 값은 \`as\` 뒤의 변수에 들어갑니다.

\`\`\`python
with MyContext() as context:
    print(context)
\`\`\`

위 코드에서 \`context\`에는 \`__enter__()\`가 반환한 값이 저장됩니다.

꼭 \`self\`를 반환해야 하는 것은 아닙니다. 다른 객체를 반환해도 됩니다.

\`\`\`python
class MessageContext:
    def __enter__(self):
        return "안녕하세요"

    def __exit__(self, exc_type, exc_value, traceback):
        pass

with MessageContext() as message:
    print(message)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
안녕하세요
\`\`\`

이 구조는 파일 처리에서도 사용됩니다. 파일을 열면 \`__enter__()\`가 파일 객체를 반환하고, 그 객체가 \`as file\`의 \`file\` 변수에 들어갑니다.

---

## 6.3.2 \`__exit__\` 메서드

\`__exit__\` 메서드는 \`with\` 블록이 끝날 때 실행됩니다.

\`\`\`python
def __exit__(self, exc_type, exc_value, traceback):
    print("리소스를 정리합니다")
\`\`\`

\`__exit__\` 메서드는 세 개의 인자를 받습니다.

\`\`\`python
exc_type
exc_value
traceback
\`\`\`

이 세 값은 \`with\` 블록 안에서 예외가 발생했을 때 예외 정보를 전달합니다.

예외가 발생하지 않았다면 세 값은 모두 \`None\`입니다.

\`\`\`python
class CheckException:
    def __enter__(self):
        print("시작")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print("종료")
        print("exc_type:", exc_type)
        print("exc_value:", exc_value)
        print("traceback:", traceback)

with CheckException():
    print("정상 작업")
\`\`\`

실행 결과는 대략 다음과 같습니다.

\`\`\`text
시작
정상 작업
종료
exc_type: None
exc_value: None
traceback: None
\`\`\`

이번에는 예외를 발생시켜보겠습니다.

\`\`\`python
with CheckException():
    print("작업 중")
    raise ValueError("잘못된 값입니다")
\`\`\`

실행 결과에는 예외 정보가 출력됩니다.

\`\`\`text
시작
작업 중
종료
exc_type: <class 'ValueError'>
exc_value: 잘못된 값입니다
traceback: <traceback object ...>
\`\`\`

그리고 \`__exit__\`가 끝난 뒤에는 예외가 다시 밖으로 전달됩니다. 그래서 프로그램은 \`ValueError\`를 표시하며 중단됩니다.

---

## 6.3.3 \`__exit__\`에서 예외를 처리할 수 있다

\`__exit__\` 메서드는 예외를 확인할 수 있을 뿐 아니라, 예외를 처리할 수도 있습니다.

중요한 규칙이 있습니다.

\`__exit__\` 메서드가 \`True\`를 반환하면 예외가 밖으로 전달되지 않습니다.

\`\`\`python
class SuppressValueError:
    def __enter__(self):
        print("시작")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print("종료")

        if exc_type is ValueError:
            print("ValueError를 처리했습니다")
            return True

        return False
\`\`\`

사용해보겠습니다.

\`\`\`python
with SuppressValueError():
    print("작업 중")
    raise ValueError("값이 잘못되었습니다")

print("프로그램 계속 실행")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
시작
작업 중
종료
ValueError를 처리했습니다
프로그램 계속 실행
\`\`\`

\`ValueError\`가 발생했지만 \`__exit__\`가 \`True\`를 반환했기 때문에 예외가 밖으로 전달되지 않았습니다.

하지만 예외를 조용히 없애는 코드는 주의해야 합니다. 실무에서는 예외를 숨기면 문제 원인을 찾기 어려워집니다. 따라서 예외를 억제할 때는 “정말 무시해도 되는 예외인지”를 분명히 판단해야 합니다.

---

## 6.3.4 파일을 여는 컨텍스트 매니저 만들기

이미 \`open()\`은 컨텍스트 매니저를 지원합니다. 하지만 학습을 위해 직접 비슷한 구조를 만들어보겠습니다.

\`\`\`python
class ManagedFile:
    def __init__(self, filename, mode, encoding="utf-8"):
        self.filename = filename
        self.mode = mode
        self.encoding = encoding
        self.file = None

    def __enter__(self):
        print("파일을 엽니다")
        self.file = open(self.filename, self.mode, encoding=self.encoding)
        return self.file

    def __exit__(self, exc_type, exc_value, traceback):
        print("파일을 닫습니다")
        if self.file:
            self.file.close()
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
with ManagedFile("sample.txt", "w") as file:
    file.write("컨텍스트 매니저 예제입니다.")
\`\`\`

실행 흐름은 다음과 같습니다.

\`\`\`text
1. ManagedFile 객체 생성
2. __enter__ 실행
3. 파일 열기
4. 파일 객체를 as file에 전달
5. with 블록 실행
6. __exit__ 실행
7. 파일 닫기
\`\`\`

이 예제는 \`with\` 문의 핵심 구조를 이해하는 데 좋습니다.

---

## 6.3.5 실행 시간을 측정하는 컨텍스트 매니저

이번에는 파일이 아니라 실행 시간을 측정하는 컨텍스트 매니저를 만들어보겠습니다.

\`\`\`python
import time

class Timer:
    def __enter__(self):
        self.start = time.time()
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.end = time.time()
        self.elapsed = self.end - self.start
        print(f"실행 시간: {self.elapsed:.4f}초")
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
with Timer():
    total = 0
    for number in range(1_000_000):
        total += number
\`\`\`

실행 결과는 환경에 따라 다르지만 다음과 비슷합니다.

\`\`\`text
실행 시간: 0.0523초
\`\`\`

이 컨텍스트 매니저는 \`with\` 블록 안의 코드가 얼마나 오래 걸렸는지 측정합니다.

\`Timer\`는 실무에서도 유용합니다. 데이터 처리, 파일 읽기, API 호출, 반복문 성능을 확인할 때 사용할 수 있습니다.

---

## 6.3.6 예외가 발생해도 정리되는지 확인하기

컨텍스트 매니저의 중요한 장점은 예외가 발생해도 \`__exit__\`가 실행된다는 점입니다.

\`\`\`python
class Resource:
    def __enter__(self):
        print("리소스를 엽니다")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        print("리소스를 정리합니다")

with Resource():
    print("작업을 시작합니다")
    raise RuntimeError("작업 중 오류")
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
리소스를 엽니다
작업을 시작합니다
리소스를 정리합니다
Traceback ...
RuntimeError: 작업 중 오류
\`\`\`

오류가 발생했지만 \`리소스를 정리합니다\`가 출력되었습니다. 이것이 컨텍스트 매니저의 핵심입니다.

---

## 6.4 \`contextlib\`

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

## 6.5 실무 활용

컨텍스트 매니저는 실무 코드에서 다음과 같은 상황에 자주 사용됩니다.

- 파일 처리
- 임시 파일과 임시 폴더 사용
- 실행 시간 측정
- 데이터베이스 연결 관리
- 네트워크 연결 관리
- 로그 범위 관리
- 여러 리소스의 일괄 정리

이번 절에서는 실무에 가까운 예제를 살펴보겠습니다.

---

## 6.5.1 임시 폴더 사용하기

작업 중간에 임시 파일을 만들어야 하는 경우가 있습니다. 예를 들어 다운로드한 파일을 잠시 저장하거나, 압축을 푼 결과를 임시 폴더에 저장한 뒤 최종 결과만 남기고 싶을 수 있습니다.

이럴 때는 \`tempfile.TemporaryDirectory\`를 사용할 수 있습니다.

\`\`\`python
from tempfile import TemporaryDirectory
from pathlib import Path

with TemporaryDirectory() as temp_dir:
    temp_path = Path(temp_dir)
    file_path = temp_path / "sample.txt"

    file_path.write_text("임시 파일입니다", encoding="utf-8")

    print(file_path.read_text(encoding="utf-8"))

print("with 블록이 끝나면 임시 폴더는 삭제됩니다")
\`\`\`

\`TemporaryDirectory()\`는 컨텍스트 매니저입니다. \`with\` 블록이 끝나면 임시 폴더와 그 안의 파일이 자동으로 삭제됩니다.

이 방식은 테스트 코드에서도 자주 사용합니다. 테스트 중 임시 파일을 만들고, 테스트가 끝나면 자동으로 정리할 수 있기 때문입니다.

---

## 6.5.2 임시 파일 사용하기

임시 파일 하나만 필요한 경우에는 \`tempfile.NamedTemporaryFile\`을 사용할 수 있습니다.

\`\`\`python
from tempfile import NamedTemporaryFile

with NamedTemporaryFile("w+", encoding="utf-8", delete=True) as file:
    file.write("임시 파일 내용")
    file.seek(0)
    print(file.read())
\`\`\`

\`delete=True\`이면 파일이 닫힐 때 임시 파일이 삭제됩니다.

임시 파일과 임시 폴더는 다음과 같은 작업에서 유용합니다.

- 중간 결과 저장
- 테스트 데이터 생성
- 다운로드 파일 임시 저장
- 압축 해제 후 처리
- 실패해도 흔적을 남기고 싶지 않은 작업

---

## 6.5.3 작업 구간 로그 남기기

컨텍스트 매니저를 사용하면 특정 작업의 시작과 끝을 자동으로 기록할 수 있습니다.

\`\`\`python
from contextlib import contextmanager
import logging

logging.basicConfig(level=logging.INFO)

@contextmanager
def log_section(name):
    logging.info("%s 시작", name)
    try:
        yield
    finally:
        logging.info("%s 종료", name)
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
with log_section("데이터 로딩"):
    # load_data()
    print("데이터를 읽는 중입니다")

with log_section("데이터 저장"):
    # save_data()
    print("데이터를 저장하는 중입니다")
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
INFO:root:데이터 로딩 시작
데이터를 읽는 중입니다
INFO:root:데이터 로딩 종료
INFO:root:데이터 저장 시작
데이터를 저장하는 중입니다
INFO:root:데이터 저장 종료
\`\`\`

이 패턴은 자동화 프로그램에서 특히 유용합니다. 어느 작업이 시작되고 끝났는지 로그로 남기면 문제를 추적하기 쉬워집니다.

---

## 6.5.4 실행 시간과 로그를 함께 남기기

이번에는 실행 시간 측정과 로그를 결합해보겠습니다.

\`\`\`python
from contextlib import contextmanager
import logging
import time

logging.basicConfig(level=logging.INFO)

@contextmanager
def measure_section(name):
    start = time.time()
    logging.info("%s 시작", name)

    try:
        yield
    finally:
        end = time.time()
        logging.info("%s 종료: %.4f초", name, end - start)
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
with measure_section("큰 데이터 처리"):
    total = sum(range(5_000_000))
\`\`\`

이 코드는 작업의 시작과 종료, 그리고 걸린 시간을 함께 기록합니다.

이런 컨텍스트 매니저는 데이터 수집, 파일 처리, 전처리, 보고서 생성 같은 작업에서 매우 유용합니다.

---

## 6.5.5 데이터베이스 연결 관리 구조

데이터베이스는 뒤 장에서 따로 다루지만, 리소스 관리 관점에서 간단히 살펴보겠습니다.

데이터베이스 연결은 열고 나면 반드시 닫아야 하는 리소스입니다. 파이썬의 \`sqlite3\` 연결 객체는 컨텍스트 매니저로 사용할 수 있습니다. 다만 연결을 자동으로 닫는 방식은 객체와 사용 방식에 따라 다를 수 있으므로, 실무에서는 문서를 확인하고 명시적으로 닫는 습관이 필요합니다.

가장 안전한 구조는 다음처럼 컨텍스트 매니저로 감싸는 것입니다.

\`\`\`python
from contextlib import contextmanager
import sqlite3

@contextmanager
def connect_db(path):
    conn = sqlite3.connect(path)
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
with connect_db("app.db") as conn:
    conn.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER, name TEXT)")
    conn.execute("INSERT INTO users VALUES (?, ?)", (1, "Alice"))
\`\`\`

이 컨텍스트 매니저는 다음 역할을 합니다.

\`\`\`text
1. DB 연결 열기
2. 작업 실행
3. 성공하면 commit
4. 실패하면 rollback
5. 연결 닫기
\`\`\`

이 구조는 실무에서 매우 중요합니다. 파일과 마찬가지로 데이터베이스 연결도 시작과 끝을 분명히 관리해야 합니다.

---

## 6.5.6 여러 파일을 안전하게 처리하기

여러 파일을 읽고 하나의 결과 파일로 저장하는 작업은 자동화에서 자주 등장합니다.

다음 예제는 여러 텍스트 파일을 읽어 하나의 파일로 합칩니다.

\`\`\`python
from contextlib import ExitStack
from pathlib import Path

input_paths = [Path("data1.txt"), Path("data2.txt"), Path("data3.txt")]
output_path = Path("merged.txt")

with ExitStack() as stack:
    readers = [
        stack.enter_context(path.open("r", encoding="utf-8"))
        for path in input_paths
    ]
    writer = stack.enter_context(output_path.open("w", encoding="utf-8"))

    for reader in readers:
        writer.write(reader.read())
        writer.write("\\n")
\`\`\`

이 코드는 파일 개수가 늘어나도 구조가 크게 변하지 않습니다.

실무에서는 파일 목록이 다음처럼 동적으로 만들어지는 경우가 많습니다.

\`\`\`python
input_paths = list(Path("logs").glob("*.log"))
\`\`\`

파일 개수가 실행 전에는 정해져 있지 않으므로 \`ExitStack\`이 유용합니다.

---

## 6.5.7 컨텍스트 매니저를 사용할 때의 기준

모든 코드를 컨텍스트 매니저로 만들 필요는 없습니다. 컨텍스트 매니저는 다음 조건에 해당할 때 특히 적합합니다.

첫째, 작업의 시작과 끝이 분명할 때입니다.

\`\`\`text
열기 → 사용 → 닫기
생성 → 사용 → 삭제
시작 기록 → 작업 → 종료 기록
\`\`\`

둘째, 예외가 발생해도 반드시 정리해야 하는 작업일 때입니다.

\`\`\`text
파일 닫기
DB 연결 닫기
임시 파일 삭제
잠금 해제
\`\`\`

셋째, 같은 준비와 정리 코드가 여러 곳에서 반복될 때입니다.

\`\`\`python
start = time.time()
try:
    ...
finally:
    print(time.time() - start)
\`\`\`

이런 코드가 반복된다면 컨텍스트 매니저로 분리할 수 있습니다.

---

## 6.5.8 클래스 방식과 함수 방식 선택하기

컨텍스트 매니저를 만드는 방법은 크게 두 가지입니다.

첫 번째는 클래스 방식입니다.

\`\`\`python
class MyContext:
    def __enter__(self):
        ...

    def __exit__(self, exc_type, exc_value, traceback):
        ...
\`\`\`

두 번째는 \`contextlib.contextmanager\`를 사용하는 함수 방식입니다.

\`\`\`python
from contextlib import contextmanager

@contextmanager
def my_context():
    ...
    yield
    ...
\`\`\`

간단한 준비와 정리만 필요하다면 함수 방식이 좋습니다.

\`\`\`python
@contextmanager
def timer():
    start = time.time()
    try:
        yield
    finally:
        print(time.time() - start)
\`\`\`

상태가 많거나 여러 메서드가 필요하다면 클래스 방식이 좋습니다.

\`\`\`python
class Timer:
    def __init__(self):
        self.elapsed = 0

    def __enter__(self):
        self.start = time.time()
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.elapsed = time.time() - self.start
\`\`\`

클래스 방식에서는 \`with\` 블록이 끝난 뒤 객체의 상태를 확인할 수 있습니다.

\`\`\`python
with Timer() as timer:
    total = sum(range(1_000_000))

print(timer.elapsed)
\`\`\`

따라서 선택 기준은 다음과 같이 정리할 수 있습니다.

\`\`\`text
간단한 준비와 정리 → 함수 기반 contextmanager
상태 보관과 여러 기능 필요 → 클래스 기반 컨텍스트 매니저
\`\`\`

---

## 6.6 컨텍스트 매니저와 데이터 처리 코드

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