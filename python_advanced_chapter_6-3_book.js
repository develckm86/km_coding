var e=`<!-- 원본: python_advanced_chapter_6_book.md / 세부 장: 6-3 -->

# 6.3 컨텍스트 매니저 직접 만들기

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
`;export{e as default};