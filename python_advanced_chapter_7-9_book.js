var e=`<!-- 원본: python_advanced_chapter_7_book.md / 세부 장: 7-9 -->

# 7.9 실무 활용 예제: 데이터 처리 파이프라인 설계

이제 지금까지 배운 내용을 하나의 예제로 연결해보겠습니다.

목표는 다음과 같습니다.

\`\`\`text
1. 데이터를 읽는다.
2. 데이터를 검증한다.
3. 데이터를 정리한다.
4. 데이터를 저장한다.
\`\`\`

이런 흐름은 데이터분석 전처리, API 수집, 파일 자동화, 로그 분석 등에서 자주 등장합니다.

---

## 7.9.1 데이터 구조 정하기

먼저 데이터는 간단히 \`list[dict]\` 형태로 다루겠습니다.

\`\`\`python
sales_data = [
    {"name": "키보드", "price": "30000", "quantity": "2"},
    {"name": "마우스", "price": "15000", "quantity": "3"},
]
\`\`\`

실무에서는 CSV나 API에서 읽은 데이터가 처음에는 문자열 형태인 경우가 많습니다. 그래서 정리 단계에서 숫자로 바꾸는 작업이 필요할 수 있습니다.

---

## 7.9.2 Protocol로 역할 정의하기

먼저 각 역할을 \`Protocol\`로 정의합니다.

\`\`\`python
from typing import Protocol


class Reader(Protocol):
    def read(self, source: str) -> list[dict]:
        ...


class Validator(Protocol):
    def validate(self, data: list[dict]) -> None:
        ...


class Cleaner(Protocol):
    def clean(self, data: list[dict]) -> list[dict]:
        ...


class Saver(Protocol):
    def save(self, data: list[dict], output: str) -> None:
        ...
\`\`\`

이 코드는 구체적인 구현이 아닙니다. 각 객체가 어떤 메서드를 가져야 하는지 표현합니다.

---

## 7.9.3 Reader 구현하기

예제를 단순하게 하기 위해 실제 파일을 읽는 대신 샘플 데이터를 반환하는 리더를 만들겠습니다.

\`\`\`python
class SampleReader:
    def read(self, source: str) -> list[dict]:
        print(f"{source}에서 데이터를 읽습니다.")
        return [
            {"name": "키보드", "price": "30000", "quantity": "2"},
            {"name": "마우스", "price": "15000", "quantity": "3"},
        ]
\`\`\`

나중에는 이 클래스를 \`CsvReader\`, \`JsonReader\`, \`ApiReader\` 등으로 바꿀 수 있습니다.

---

## 7.9.4 Validator 구현하기

검증 클래스는 필수 컬럼이 있는지 확인합니다.

\`\`\`python
class SalesValidator:
    required_columns = {"name", "price", "quantity"}

    def validate(self, data: list[dict]) -> None:
        if not data:
            raise ValueError("데이터가 비어 있습니다.")

        for index, row in enumerate(data, start=1):
            missing_columns = self.required_columns - row.keys()
            if missing_columns:
                raise ValueError(
                    f"{index}번째 행에 필수 컬럼이 없습니다: {missing_columns}"
                )
\`\`\`

검증 로직은 데이터 처리에서 매우 중요합니다. 잘못된 데이터를 뒤 단계로 넘기면 오류를 찾기 어려워집니다.

---

## 7.9.5 Cleaner 구현하기

정리 클래스는 문자열 숫자를 정수로 바꾸고, 총액을 계산합니다.

\`\`\`python
class SalesCleaner:
    def clean(self, data: list[dict]) -> list[dict]:
        cleaned_data = []

        for row in data:
            price = int(row["price"])
            quantity = int(row["quantity"])

            cleaned_row = {
                "name": row["name"].strip(),
                "price": price,
                "quantity": quantity,
                "total": price * quantity,
            }
            cleaned_data.append(cleaned_row)

        return cleaned_data
\`\`\`

이 클래스는 검증이 완료된 데이터를 받는다고 가정합니다.

---

## 7.9.6 Saver 구현하기

저장 클래스는 결과를 출력하는 방식으로 단순화하겠습니다.

\`\`\`python
class ConsoleSaver:
    def save(self, data: list[dict], output: str) -> None:
        print(f"{output}에 저장할 데이터:")
        for row in data:
            print(row)
\`\`\`

나중에는 \`CsvSaver\`, \`JsonSaver\`, \`DatabaseSaver\`로 바꿀 수 있습니다.

---

## 7.9.7 Pipeline 구현하기

이제 전체 흐름을 조합하는 파이프라인 클래스를 만듭니다.

\`\`\`python
class DataPipeline:
    def __init__(
        self,
        reader: Reader,
        validator: Validator,
        cleaner: Cleaner,
        saver: Saver,
    ) -> None:
        self.reader = reader
        self.validator = validator
        self.cleaner = cleaner
        self.saver = saver

    def run(self, source: str, output: str) -> None:
        data = self.reader.read(source)
        self.validator.validate(data)
        cleaned_data = self.cleaner.clean(data)
        self.saver.save(cleaned_data, output)
\`\`\`

\`DataPipeline\`은 각 단계의 구체적인 구현을 모릅니다. 읽기, 검증, 정리, 저장이라는 역할만 알고 있습니다.

---

## 7.9.8 실행하기

\`\`\`python
pipeline = DataPipeline(
    reader=SampleReader(),
    validator=SalesValidator(),
    cleaner=SalesCleaner(),
    saver=ConsoleSaver(),
)

pipeline.run("sales.csv", "result.csv")
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
sales.csv에서 데이터를 읽습니다.
result.csv에 저장할 데이터:
{'name': '키보드', 'price': 30000, 'quantity': 2, 'total': 60000}
{'name': '마우스', 'price': 15000, 'quantity': 3, 'total': 45000}
\`\`\`

이 구조의 장점은 각 단계를 쉽게 교체할 수 있다는 점입니다.

예를 들어 API에서 데이터를 읽고 싶다면 \`ApiReader\`를 만들어 넣으면 됩니다. 저장을 파일로 하고 싶다면 \`CsvSaver\`를 만들어 넣으면 됩니다. 파이프라인의 핵심 흐름은 그대로 유지됩니다.

---
`;export{e as default};