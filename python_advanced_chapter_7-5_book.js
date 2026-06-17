var e=`<!-- 원본: python_advanced_chapter_7_book.md / 세부 장: 7-5 -->

# 7.5 추상 클래스

추상 클래스는 직접 객체를 만들기 위한 클래스라기보다, 자식 클래스가 반드시 구현해야 할 공통 규칙을 정의하는 클래스입니다.

예를 들어 여러 데이터 저장 방식이 있다고 해보겠습니다.

- CSV 파일에 저장
- JSON 파일에 저장
- 데이터베이스에 저장

저장 방식은 다르지만 모두 \`save()\`라는 동작을 가져야 한다고 정할 수 있습니다.

이때 추상 클래스를 사용할 수 있습니다.

\`\`\`python
from abc import ABC, abstractmethod


class DataSaver(ABC):
    @abstractmethod
    def save(self, data: list[dict]) -> None:
        pass
\`\`\`

\`DataSaver\`는 \`save()\` 메서드를 반드시 구현해야 한다는 규칙을 만듭니다.

\`\`\`python
class CsvSaver(DataSaver):
    def save(self, data: list[dict]) -> None:
        print("CSV 파일로 저장합니다.")


class JsonSaver(DataSaver):
    def save(self, data: list[dict]) -> None:
        print("JSON 파일로 저장합니다.")
\`\`\`

이제 \`CsvSaver\`와 \`JsonSaver\`는 \`DataSaver\`의 규칙을 따릅니다.

---

## 7.5.1 추상 메서드를 구현하지 않으면 어떻게 될까

다음 클래스를 보겠습니다.

\`\`\`python
class BrokenSaver(DataSaver):
    pass
\`\`\`

\`BrokenSaver\`는 \`save()\` 메서드를 구현하지 않았습니다. 이 클래스로 객체를 만들면 에러가 발생합니다.

\`\`\`python
saver = BrokenSaver()
\`\`\`

실행하면 다음과 비슷한 에러가 발생합니다.

\`\`\`text
TypeError: Can't instantiate abstract class BrokenSaver with abstract method save
\`\`\`

추상 클래스는 이렇게 자식 클래스가 반드시 구현해야 할 메서드를 강제합니다.

---

## 7.5.2 추상 클래스가 필요한 이유

추상 클래스가 없으면 다음과 같은 실수가 생길 수 있습니다.

\`\`\`python
class CsvSaver:
    def save(self, data: list[dict]) -> None:
        print("CSV 저장")


class JsonSaver:
    def write(self, data: list[dict]) -> None:
        print("JSON 저장")
\`\`\`

\`CsvSaver\`는 \`save()\`를 가지고 있지만, \`JsonSaver\`는 \`write()\`를 가지고 있습니다. 그러면 두 클래스를 같은 방식으로 다루기 어렵습니다.

\`\`\`python
def save_data(saver, data: list[dict]) -> None:
    saver.save(data)
\`\`\`

\`JsonSaver\`를 넘기면 에러가 납니다.

추상 클래스를 사용하면 모든 저장 클래스가 같은 메서드 이름을 가지도록 강제할 수 있습니다.

\`\`\`python
def save_data(saver: DataSaver, data: list[dict]) -> None:
    saver.save(data)
\`\`\`

이 함수는 구체적인 저장 방식에 관심이 없습니다. \`DataSaver\` 규칙을 따르는 객체라면 모두 사용할 수 있습니다.

---

## 7.5.3 추상 클래스와 공통 코드

추상 클래스는 추상 메서드만 가질 필요는 없습니다. 공통 코드도 가질 수 있습니다.

\`\`\`python
from abc import ABC, abstractmethod


class ReportExporter(ABC):
    def export(self, data: list[dict], path: str) -> None:
        self.validate(data)
        self.write(data, path)
        print("내보내기가 완료되었습니다.")

    def validate(self, data: list[dict]) -> None:
        if not data:
            raise ValueError("내보낼 데이터가 없습니다.")

    @abstractmethod
    def write(self, data: list[dict], path: str) -> None:
        pass
\`\`\`

\`export()\`와 \`validate()\`는 공통 기능입니다. \`write()\`만 자식 클래스가 구현합니다.

\`\`\`python
class CsvReportExporter(ReportExporter):
    def write(self, data: list[dict], path: str) -> None:
        print(f"{path}에 CSV 형식으로 저장합니다.")


class JsonReportExporter(ReportExporter):
    def write(self, data: list[dict], path: str) -> None:
        print(f"{path}에 JSON 형식으로 저장합니다.")
\`\`\`

사용해보겠습니다.

\`\`\`python
data = [{"name": "홍길동", "amount": 30000}]

exporter = CsvReportExporter()
exporter.export(data, "report.csv")
\`\`\`

이 구조에서는 공통 처리 흐름은 부모 클래스가 담당하고, 구체적인 저장 방식은 자식 클래스가 담당합니다.

---

## 7.5.4 추상 클래스 사용 시 주의점

추상 클래스는 공통 규칙을 명확하게 만들 때 유용합니다. 하지만 너무 일찍 추상 클래스를 만들면 오히려 코드가 복잡해질 수 있습니다.

처음부터 “혹시 나중에 필요할 수도 있으니까”라는 이유로 추상 클래스를 만들 필요는 없습니다. 먼저 구체적인 클래스 몇 개를 만들고, 반복되는 구조가 보일 때 추상화를 고려하는 것이 좋습니다.

추상 클래스는 다음과 같은 상황에서 적합합니다.

\`\`\`text
여러 클래스가 같은 메서드 이름과 사용 방식을 가져야 한다.
공통 처리 흐름은 같고 세부 구현만 다르다.
새 구현을 추가해도 기존 코드를 크게 바꾸고 싶지 않다.
팀 작업에서 구현 규칙을 명확히 강제하고 싶다.
\`\`\`

---
`;export{e as default};