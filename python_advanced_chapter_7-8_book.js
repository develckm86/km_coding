var e=`<!-- 원본: python_advanced_chapter_7_book.md / 세부 장: 7-8 -->

# 7.8 객체지향 설계 원칙 기초

객체지향 설계 원칙은 매우 많습니다. 이번 장에서는 기초 수준에서 가장 중요한 관점만 다룹니다.

- 단일 책임 원칙
- 개방 폐쇄 원칙
- 의존성 줄이기
- 변경에 강한 구조 만들기

이 원칙들은 외우기 위한 것이 아니라, 코드를 점검하는 기준으로 사용하면 좋습니다.

---

## 7.8.1 단일 책임 원칙

단일 책임 원칙은 하나의 클래스가 하나의 책임만 가져야 한다는 원칙입니다.

여기서 책임은 “변경되는 이유”라고 이해하면 좋습니다. 하나의 클래스가 여러 이유로 변경된다면 책임이 너무 많은 것입니다.

나쁜 예를 보겠습니다.

\`\`\`python
class SalesReportManager:
    def read_sales_file(self, path: str) -> list[dict]:
        print("매출 파일을 읽습니다.")
        return []

    def calculate_total(self, data: list[dict]) -> int:
        print("총 매출을 계산합니다.")
        return 0

    def save_report(self, path: str, total: int) -> None:
        print("보고서를 저장합니다.")

    def send_email(self, email: str) -> None:
        print("이메일을 보냅니다.")
\`\`\`

이 클래스는 다음 이유로 변경될 수 있습니다.

- 파일 형식이 바뀔 때
- 매출 계산 방식이 바뀔 때
- 보고서 저장 방식이 바뀔 때
- 이메일 전송 방식이 바뀔 때

변경 이유가 너무 많습니다.

역할을 나눠보겠습니다.

\`\`\`python
class SalesReader:
    def read(self, path: str) -> list[dict]:
        print("매출 파일을 읽습니다.")
        return []


class SalesCalculator:
    def calculate_total(self, data: list[dict]) -> int:
        print("총 매출을 계산합니다.")
        return 0


class ReportSaver:
    def save(self, path: str, total: int) -> None:
        print("보고서를 저장합니다.")


class EmailSender:
    def send(self, email: str, message: str) -> None:
        print("이메일을 보냅니다.")
\`\`\`

각 클래스의 책임이 분명해졌습니다.

---

## 7.8.2 개방 폐쇄 원칙

개방 폐쇄 원칙은 **확장에는 열려 있고, 수정에는 닫혀 있어야 한다**는 원칙입니다.

말이 어렵지만 예제로 보면 쉽습니다.

다음 함수는 저장 형식에 따라 조건문을 사용합니다.

\`\`\`python
def save_data(data: list[dict], save_type: str) -> None:
    if save_type == "csv":
        print("CSV로 저장")
    elif save_type == "json":
        print("JSON으로 저장")
    elif save_type == "db":
        print("DB에 저장")
\`\`\`

처음에는 괜찮아 보입니다. 하지만 저장 방식이 추가될 때마다 이 함수를 수정해야 합니다.

\`\`\`python
elif save_type == "excel":
    print("엑셀로 저장")
\`\`\`

기존 코드를 계속 수정해야 하므로 변경 위험이 커집니다.

객체지향적으로 바꿔보겠습니다.

\`\`\`python
from abc import ABC, abstractmethod


class Saver(ABC):
    @abstractmethod
    def save(self, data: list[dict]) -> None:
        pass


class CsvSaver(Saver):
    def save(self, data: list[dict]) -> None:
        print("CSV로 저장")


class JsonSaver(Saver):
    def save(self, data: list[dict]) -> None:
        print("JSON으로 저장")


class DatabaseSaver(Saver):
    def save(self, data: list[dict]) -> None:
        print("DB에 저장")
\`\`\`

이제 저장 함수는 단순해집니다.

\`\`\`python
def save_data(data: list[dict], saver: Saver) -> None:
    saver.save(data)
\`\`\`

엑셀 저장 방식이 추가되어도 기존 \`save_data()\` 함수는 수정하지 않아도 됩니다.

\`\`\`python
class ExcelSaver(Saver):
    def save(self, data: list[dict]) -> None:
        print("엑셀로 저장")
\`\`\`

새 클래스를 추가해서 확장할 수 있습니다. 이것이 개방 폐쇄 원칙의 기본 아이디어입니다.

---

## 7.8.3 의존성 줄이기

클래스가 구체적인 구현에 직접 의존하면 변경에 약해집니다.

나쁜 예를 보겠습니다.

\`\`\`python
class ReportService:
    def __init__(self) -> None:
        self.saver = CsvSaver()

    def create_report(self, data: list[dict]) -> None:
        self.saver.save(data)
\`\`\`

이 클래스는 \`CsvSaver\`에 직접 의존합니다. JSON 저장으로 바꾸려면 \`ReportService\` 내부 코드를 수정해야 합니다.

의존성을 낮추려면 외부에서 전달받도록 바꿀 수 있습니다.

\`\`\`python
class ReportService:
    def __init__(self, saver: Saver) -> None:
        self.saver = saver

    def create_report(self, data: list[dict]) -> None:
        self.saver.save(data)
\`\`\`

사용할 때 저장 방식을 선택합니다.

\`\`\`python
service = ReportService(CsvSaver())
service.create_report([])

json_service = ReportService(JsonSaver())
json_service.create_report([])
\`\`\`

이 구조는 테스트할 때도 좋습니다.

\`\`\`python
class FakeSaver(Saver):
    def __init__(self) -> None:
        self.saved = False

    def save(self, data: list[dict]) -> None:
        self.saved = True


fake_saver = FakeSaver()
service = ReportService(fake_saver)
service.create_report([])

assert fake_saver.saved is True
\`\`\`

실제 파일 저장 없이도 \`ReportService\`가 저장 기능을 호출했는지 확인할 수 있습니다.

---

## 7.8.4 변경에 강한 구조 만들기

객체지향 설계의 핵심은 변경에 강한 구조를 만드는 것입니다.

변경에 강한 코드는 다음 특징을 가집니다.

- 변경되는 부분과 변경되지 않는 부분이 분리되어 있다.
- 구체적인 구현보다 공통 인터페이스에 의존한다.
- 하나의 클래스가 너무 많은 책임을 가지지 않는다.
- 외부 시스템과 연결되는 코드는 분리되어 있다.
- 테스트할 수 있는 단위로 나뉘어 있다.

다음 구조를 생각해보겠습니다.

\`\`\`python
class DataReader(Protocol):
    def read(self, source: str) -> list[dict]:
        ...


class DataCleaner(Protocol):
    def clean(self, data: list[dict]) -> list[dict]:
        ...


class DataSaver(Protocol):
    def save(self, data: list[dict], output: str) -> None:
        ...
\`\`\`

그리고 전체 흐름을 담당하는 파이프라인을 만듭니다.

\`\`\`python
class DataPipeline:
    def __init__(
        self,
        reader: DataReader,
        cleaner: DataCleaner,
        saver: DataSaver,
    ) -> None:
        self.reader = reader
        self.cleaner = cleaner
        self.saver = saver

    def run(self, source: str, output: str) -> None:
        data = self.reader.read(source)
        cleaned_data = self.cleaner.clean(data)
        self.saver.save(cleaned_data, output)
\`\`\`

이 구조에서는 파일 읽기 방식, 정리 방식, 저장 방식이 각각 독립적으로 바뀔 수 있습니다.

\`\`\`text
CSV Reader → Excel Reader로 변경
Simple Cleaner → Advanced Cleaner로 변경
JSON Saver → Database Saver로 변경
\`\`\`

변경이 생겨도 \`DataPipeline\` 자체는 크게 바뀌지 않습니다.

---
`;export{e as default};