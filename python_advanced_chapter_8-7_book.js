var e=`<!-- 원본: python_advanced_chapter_8_book.md / 세부 장: 8-7 -->

# 8.7 속성 접근 제어

파이썬 객체에서 속성에 접근할 때도 데이터 모델이 관여합니다.

\`\`\`python
obj.name
obj.name = "홍길동"
\`\`\`

이런 속성 접근은 내부적으로 여러 규칙을 따릅니다. 대부분의 경우 우리는 \`@property\` 정도만 사용하면 충분합니다. 하지만 고급 파이썬에서는 \`__getattr__\`, \`__getattribute__\`, \`__setattr__\`의 개념도 이해해두면 도움이 됩니다.

---

## 8.7.1 기본 속성 접근

일반적인 객체는 속성을 인스턴스 딕셔너리에 저장합니다.

\`\`\`python
class Customer:
    def __init__(self, name: str) -> None:
        self.name = name


customer = Customer("홍길동")

print(customer.name)
print(customer.__dict__)
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
홍길동
{'name': '홍길동'}
\`\`\`

\`customer.name\`이라고 쓰면 파이썬은 객체의 속성 저장 공간에서 \`name\`을 찾습니다.

---

## 8.7.2 \`__getattr__\`

\`__getattr__\`은 일반적인 속성 조회가 실패했을 때 호출됩니다.

\`\`\`python
class Config:
    def __init__(self, values: dict[str, str]) -> None:
        self._values = values

    def __getattr__(self, name: str) -> str:
        if name in self._values:
            return self._values[name]
        raise AttributeError(f"설정값을 찾을 수 없습니다: {name}")


config = Config({"host": "localhost", "port": "8000"})

print(config.host)
print(config.port)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
localhost
8000
\`\`\`

\`host\`와 \`port\`는 실제 인스턴스 속성이 아닙니다. 일반적인 속성 조회에서 찾지 못하면 \`__getattr__\`이 호출되고, 내부 딕셔너리에서 값을 찾아 반환합니다.

없는 속성에 접근하면 어떻게 될까요?

\`\`\`python
print(config.username)
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
AttributeError: 설정값을 찾을 수 없습니다: username
\`\`\`

\`__getattr__\`을 사용할 때는 없는 속성에 대해 반드시 \`AttributeError\`를 발생시키는 것이 좋습니다. 그래야 파이썬의 속성 조회 규칙과 다른 도구들이 정상적으로 동작합니다.

---

## 8.7.3 \`__getattribute__\`

\`__getattribute__\`는 모든 속성 조회 때 호출됩니다.

\`\`\`python
class DebugObject:
    def __init__(self, name: str) -> None:
        self.name = name

    def __getattribute__(self, name: str):
        print(f"속성 조회: {name}")
        return object.__getattribute__(self, name)


obj = DebugObject("테스트")
print(obj.name)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
속성 조회: name
테스트
\`\`\`

\`__getattribute__\`는 강력하지만 위험합니다. 모든 속성 접근에 개입하기 때문에 잘못 작성하면 무한 재귀가 발생할 수 있습니다.

예를 들어 다음 코드는 문제가 있습니다.

\`\`\`python
class Bad:
    def __getattribute__(self, name: str):
        return self.__dict__[name]
\`\`\`

\`self.__dict__\`에 접근하는 순간 다시 \`__getattribute__\`가 호출됩니다. 그래서 무한 재귀에 빠질 수 있습니다.

안전하게 작성하려면 보통 다음처럼 부모 클래스의 구현을 사용해야 합니다.

\`\`\`python
class Safe:
    def __getattribute__(self, name: str):
        return object.__getattribute__(self, name)
\`\`\`

실무에서는 대부분 \`__getattribute__\`보다 \`@property\`나 \`__getattr__\`이 더 안전하고 충분합니다.

---

## 8.7.4 \`__setattr__\`

\`__setattr__\`은 속성에 값을 할당할 때 호출됩니다.

\`\`\`python
class LoggedSetAttr:
    def __setattr__(self, name: str, value: object) -> None:
        print(f"속성 설정: {name} = {value!r}")
        object.__setattr__(self, name, value)


obj = LoggedSetAttr()
obj.name = "홍길동"
obj.age = 30
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
속성 설정: name = '홍길동'
속성 설정: age = 30
\`\`\`

\`__setattr__\`도 모든 속성 설정에 개입하므로 주의해야 합니다. 내부에서 \`self.name = value\`처럼 다시 속성을 설정하면 재귀가 발생할 수 있습니다.

\`\`\`python
object.__setattr__(self, name, value)
\`\`\`

처럼 부모 구현을 사용해야 안전합니다.

---

## 8.7.5 속성 접근 제어 실무 예제

다음은 읽기 전용 설정 객체입니다.

\`\`\`python
class ReadOnlyConfig:
    def __init__(self, values: dict[str, str]) -> None:
        object.__setattr__(self, "_values", dict(values))

    def __getattr__(self, name: str) -> str:
        values = object.__getattribute__(self, "_values")
        if name in values:
            return values[name]
        raise AttributeError(f"설정값을 찾을 수 없습니다: {name}")

    def __setattr__(self, name: str, value: object) -> None:
        raise AttributeError("설정값은 수정할 수 없습니다.")


config = ReadOnlyConfig({"host": "localhost", "port": "8000"})

print(config.host)

config.host = "127.0.0.1"
\`\`\`

마지막 줄에서는 오류가 발생합니다.

\`\`\`text
AttributeError: 설정값은 수정할 수 없습니다.
\`\`\`

이런 방식은 강력하지만, 모든 경우에 필요한 것은 아닙니다. 단순한 값 검증은 \`@property\`의 setter로 처리하는 것이 더 읽기 쉽습니다.

---

## 8.7.6 \`@property\`와 속성 특수 메서드 비교

속성 제어에는 여러 방법이 있습니다.

| 방법 | 특징 | 추천 상황 |
|---|---|---|
| \`@property\` | 특정 속성 하나를 제어 | 값 검증, 계산된 속성 |
| \`__getattr__\` | 없는 속성을 동적으로 처리 | 설정 객체, API 응답 래핑 |
| \`__getattribute__\` | 모든 속성 조회를 가로챔 | 프레임워크, 디버깅 도구, 고급 라이브러리 |
| \`__setattr__\` | 모든 속성 설정을 가로챔 | 읽기 전용 객체, 속성 설정 로그 |

실무 기준은 다음과 같습니다.

\`\`\`text
대부분은 @property로 충분하다.
동적 속성이 필요하면 __getattr__을 고려한다.
__getattribute__와 __setattr__은 꼭 필요할 때만 사용한다.
\`\`\`

---
`;export{e as default};