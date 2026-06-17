var e=`<!-- 원본: python_advanced_chapter_7_book.md / 세부 장: 7-3 -->

# 7.3 다중 상속과 MRO

파이썬은 다중 상속을 지원합니다. 즉, 하나의 클래스가 여러 부모 클래스를 가질 수 있습니다.

\`\`\`python
class A:
    pass


class B:
    pass


class C(A, B):
    pass
\`\`\`

\`C\`는 \`A\`와 \`B\`를 모두 상속합니다.

다중 상속은 강력하지만, 잘못 사용하면 코드 흐름이 복잡해집니다. 특히 같은 이름의 메서드가 여러 부모 클래스에 있을 때 어떤 메서드가 호출되는지 이해해야 합니다. 이때 필요한 개념이 MRO입니다.

---

## 7.3.1 MRO란 무엇인가

MRO는 Method Resolution Order의 약자입니다. 한국어로는 메서드 탐색 순서라고 할 수 있습니다.

어떤 객체에서 메서드를 호출하면 파이썬은 다음 순서로 메서드를 찾습니다.

\`\`\`text
1. 객체의 클래스에서 찾는다.
2. 없으면 부모 클래스에서 찾는다.
3. 부모가 여러 개라면 정해진 순서대로 찾는다.
4. 최종적으로 object까지 올라간다.
\`\`\`

MRO는 이 탐색 순서를 나타냅니다.

\`\`\`python
class A:
    def hello(self) -> None:
        print("A")


class B(A):
    def hello(self) -> None:
        print("B")


class C(A):
    def hello(self) -> None:
        print("C")


class D(B, C):
    pass


print(D.__mro__)
\`\`\`

출력은 다음과 같습니다.

\`\`\`text
(<class '__main__.D'>, <class '__main__.B'>, <class '__main__.C'>, <class '__main__.A'>, <class 'object'>)
\`\`\`

따라서 \`D\` 객체에서 \`hello()\`를 호출하면 \`B\`의 메서드가 먼저 발견됩니다.

\`\`\`python
d = D()
d.hello()
\`\`\`

출력은 다음과 같습니다.

\`\`\`text
B
\`\`\`

---

## 7.3.2 다이아몬드 상속 문제

다중 상속에서 자주 언급되는 구조가 다이아몬드 상속입니다.

\`\`\`text
    A
   / \\
  B   C
   \\ /
    D
\`\`\`

코드로 표현하면 다음과 같습니다.

\`\`\`python
class A:
    def process(self) -> None:
        print("A")


class B(A):
    def process(self) -> None:
        print("B")
        super().process()


class C(A):
    def process(self) -> None:
        print("C")
        super().process()


class D(B, C):
    def process(self) -> None:
        print("D")
        super().process()
\`\`\`

사용해보겠습니다.

\`\`\`python
d = D()
d.process()
\`\`\`

출력은 다음과 같습니다.

\`\`\`text
D
B
C
A
\`\`\`

\`A\`가 \`B\`와 \`C\`의 부모이지만 두 번 호출되지 않습니다. 파이썬의 MRO는 이런 다이아몬드 구조에서도 같은 클래스를 중복해서 탐색하지 않도록 순서를 계산합니다.

이것이 다중 상속에서 MRO가 중요한 이유입니다.

---

## 7.3.3 다중 상속을 사용할 때 주의할 점

다중 상속은 편리하지만 다음 문제를 만들 수 있습니다.

- 메서드 호출 순서를 이해하기 어려워진다.
- 같은 이름의 메서드가 여러 부모 클래스에 있을 수 있다.
- \`super()\` 호출 체인이 끊어지기 쉽다.
- 부모 클래스 간 책임이 섞일 수 있다.
- 디버깅이 어려워질 수 있다.

따라서 다중 상속은 다음처럼 제한적으로 사용하는 것이 좋습니다.

\`\`\`text
하나의 주요 부모 클래스 + 여러 개의 작은 기능 믹스인
\`\`\`

예를 들어 다음 구조는 비교적 이해하기 쉽습니다.

\`\`\`python
class BaseRepository:
    pass


class LoggingMixin:
    pass


class ValidationMixin:
    pass


class UserRepository(LoggingMixin, ValidationMixin, BaseRepository):
    pass
\`\`\`

\`BaseRepository\`는 핵심 부모 클래스이고, \`LoggingMixin\`과 \`ValidationMixin\`은 작은 기능을 추가하는 보조 클래스입니다.

반대로 여러 부모 클래스가 모두 큰 책임을 가지고 있다면 다중 상속은 피하는 것이 좋습니다.

---

## 7.3.4 MRO 확인하기

MRO는 직접 확인할 수 있습니다.

\`\`\`python
print(UserRepository.__mro__)
\`\`\`

또는 \`mro()\` 메서드를 사용할 수도 있습니다.

\`\`\`python
print(UserRepository.mro())
\`\`\`

고급 객체지향 코드를 읽을 때 다중 상속이 보이면 먼저 MRO를 확인하는 습관을 들이면 좋습니다.

---
`;export{e as default};