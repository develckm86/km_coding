var e=`<!-- 원본: python_advanced_chapter_9_book.md / 세부 장: 9-5 -->

# 9.5 Protocol

\`Protocol\`은 “이런 메서드나 속성을 가진 객체라면 사용할 수 있다”는 구조적 타입을 표현합니다.

파이썬에는 덕 타이핑이라는 사고방식이 있습니다.

\`\`\`text
오리처럼 걷고 오리처럼 꽥꽥거리면 오리로 취급한다.
\`\`\`

파이썬식으로 바꾸면 다음과 같습니다.

\`\`\`text
어떤 객체가 필요한 메서드를 가지고 있으면 그 객체로 사용할 수 있다.
\`\`\`

예를 들어 어떤 객체가 \`save()\` 메서드를 가지고 있으면 저장 가능한 객체로 볼 수 있습니다. 그 객체가 어떤 클래스를 상속했는지는 중요하지 않을 수 있습니다.

---

## 9.5.1 Protocol 기본 문법

다음은 저장 가능한 객체를 표현하는 \`Protocol\`입니다.

\`\`\`python
from typing import Protocol

class Saver(Protocol):
    def save(self, data: str) -> None:
        ...
\`\`\`

이제 \`save()\` 메서드를 가진 객체는 \`Saver\`처럼 사용할 수 있습니다.

\`\`\`python
class FileSaver:
    def save(self, data: str) -> None:
        print(f"파일에 저장: {data}")


class DatabaseSaver:
    def save(self, data: str) -> None:
        print(f"DB에 저장: {data}")
\`\`\`

함수는 \`Saver\` 타입을 받을 수 있습니다.

\`\`\`python
def save_report(saver: Saver, content: str) -> None:
    saver.save(content)
\`\`\`

사용할 때는 다음처럼 전달합니다.

\`\`\`python
save_report(FileSaver(), "보고서 내용")
save_report(DatabaseSaver(), "보고서 내용")
\`\`\`

\`FileSaver\`와 \`DatabaseSaver\`가 \`Saver\`를 명시적으로 상속하지 않아도, 필요한 메서드 구조를 가지고 있으면 타입 검사 도구가 호환 가능하다고 판단할 수 있습니다.

---

## 9.5.2 Protocol과 ABC의 차이

추상 클래스는 명시적인 상속 관계를 사용합니다.

\`\`\`python
from abc import ABC, abstractmethod

class SaverBase(ABC):
    @abstractmethod
    def save(self, data: str) -> None:
        pass


class FileSaver(SaverBase):
    def save(self, data: str) -> None:
        print(data)
\`\`\`

이 방식은 “반드시 이 부모 클래스를 상속해야 한다”는 명시적인 구조입니다.

반면 \`Protocol\`은 “필요한 메서드만 가지고 있으면 된다”는 구조입니다.

\`\`\`python
from typing import Protocol

class Saver(Protocol):
    def save(self, data: str) -> None:
        ...
\`\`\`

비교하면 다음과 같습니다.

| 구분 | ABC | Protocol |
|---|---|---|
| 관계 방식 | 명시적 상속 | 구조적 호환 |
| 목적 | 공통 부모와 구현 강제 | 필요한 형태를 표현 |
| 런타임 영향 | 실제 상속 구조 있음 | 주로 타입 검사 용도 |
| 적합한 경우 | 프레임워크 내부 구조, 강한 계약 | 느슨한 결합, 덕 타이핑 |

실무에서는 둘 다 사용할 수 있습니다. 중요한 것은 어떤 방식이 코드 구조를 더 단순하게 만드는지 판단하는 것입니다.

---

## 9.5.3 Protocol로 데이터 처리기 표현하기

데이터분석 전 단계에서는 데이터를 변환하는 객체를 자주 만듭니다.

\`\`\`python
from typing import Protocol

class Transformer(Protocol):
    def transform(self, row: dict[str, object]) -> dict[str, object]:
        ...
\`\`\`

이제 다양한 변환기를 만들 수 있습니다.

\`\`\`python
class StripNameTransformer:
    def transform(self, row: dict[str, object]) -> dict[str, object]:
        new_row = row.copy()
        name = new_row.get("name")
        if isinstance(name, str):
            new_row["name"] = name.strip()
        return new_row


class AddSourceTransformer:
    def transform(self, row: dict[str, object]) -> dict[str, object]:
        new_row = row.copy()
        new_row["source"] = "api"
        return new_row
\`\`\`

파이프라인 함수는 \`Transformer\` 목록을 받을 수 있습니다.

\`\`\`python
from collections.abc import Iterable


def apply_transformers(
    row: dict[str, object],
    transformers: Iterable[Transformer],
) -> dict[str, object]:
    result = row
    for transformer in transformers:
        result = transformer.transform(result)
    return result
\`\`\`

이 구조의 장점은 변환기 클래스들이 같은 부모를 상속하지 않아도 된다는 것입니다. \`transform()\` 메서드만 가지고 있으면 됩니다.

---

## 9.5.4 속성을 가진 Protocol

\`Protocol\`은 메서드뿐 아니라 속성도 표현할 수 있습니다.

\`\`\`python
from typing import Protocol

class HasName(Protocol):
    name: str


def print_name(obj: HasName) -> None:
    print(obj.name)
\`\`\`

다음 클래스는 \`name\` 속성을 가지고 있으므로 \`HasName\`처럼 사용할 수 있습니다.

\`\`\`python
class User:
    def __init__(self, name: str) -> None:
        self.name = name


class Product:
    def __init__(self, name: str, price: int) -> None:
        self.name = name
        self.price = price


print_name(User("홍길동"))
print_name(Product("키보드", 30000))
\`\`\`

이런 표현은 “이 객체가 어떤 클래스인지”보다 “이 객체가 어떤 속성을 제공하는지”가 더 중요할 때 유용합니다.

---

## 9.5.5 runtime_checkable

기본적으로 \`Protocol\`은 정적 타입 검사 도구를 위한 기능입니다. \`isinstance()\`로 검사하려면 \`@runtime_checkable\`을 붙여야 합니다.

\`\`\`python
from typing import Protocol, runtime_checkable

@runtime_checkable
class Saver(Protocol):
    def save(self, data: str) -> None:
        ...


class FileSaver:
    def save(self, data: str) -> None:
        print(data)


saver = FileSaver()
print(isinstance(saver, Saver))
\`\`\`

주의할 점이 있습니다. 런타임에서 \`Protocol\` 검사는 주로 필요한 속성이나 메서드가 존재하는지만 확인합니다. 메서드의 매개변수 타입과 반환 타입까지 정교하게 검사하는 용도는 아닙니다.

따라서 \`@runtime_checkable\`은 필요한 경우에만 제한적으로 사용하고, 대부분의 타입 안정성은 정적 타입 검사 도구에 맡기는 것이 좋습니다.

---

## 9.5.6 Protocol 사용 기준

\`Protocol\`은 다음 상황에 적합합니다.

\`\`\`text
특정 부모 클래스를 강제하고 싶지 않다.
필요한 메서드나 속성만 표현하고 싶다.
객체 간 결합도를 낮추고 싶다.
테스트용 가짜 객체를 쉽게 넣고 싶다.
플러그인 구조를 만들고 싶다.
데이터 처리 파이프라인의 각 단계를 교체 가능하게 만들고 싶다.
\`\`\`

예를 들어 API 클라이언트를 사용하는 서비스가 있다고 합시다.

\`\`\`python
from typing import Protocol

class UserClient(Protocol):
    def get_user(self, user_id: int) -> dict[str, object]:
        ...


class UserService:
    def __init__(self, client: UserClient) -> None:
        self.client = client

    def get_user_name(self, user_id: int) -> str:
        user = self.client.get_user(user_id)
        name = user.get("name")
        return name if isinstance(name, str) else ""
\`\`\`

실제 운영 환경에서는 진짜 API 클라이언트를 넣을 수 있고, 테스트에서는 가짜 클라이언트를 넣을 수 있습니다.

\`\`\`python
class FakeUserClient:
    def get_user(self, user_id: int) -> dict[str, object]:
        return {"id": user_id, "name": "테스트 사용자"}
\`\`\`

이렇게 하면 테스트하기 쉬운 구조를 만들 수 있습니다.

---
`;export{e as default};