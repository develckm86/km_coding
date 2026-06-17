var e=`<!-- 원본: python_advanced_chapter_7_book.md / 세부 장: 7-4 -->

# 7.4 믹스인

믹스인은 특정 기능을 여러 클래스에 섞어 넣기 위한 작은 클래스입니다.

믹스인은 보통 단독으로 객체를 만들기보다, 다른 클래스와 함께 상속되어 기능을 추가하는 용도로 사용합니다.

예를 들어 여러 클래스에 “딕셔너리로 변환하는 기능”을 추가하고 싶다고 해보겠습니다.

\`\`\`python
class ToDictMixin:
    def to_dict(self) -> dict:
        return self.__dict__.copy()
\`\`\`

이 믹스인을 다른 클래스에 섞어 넣을 수 있습니다.

\`\`\`python
class Customer(ToDictMixin):
    def __init__(self, name: str, email: str) -> None:
        self.name = name
        self.email = email


customer = Customer("홍길동", "hong@example.com")
print(customer.to_dict())
\`\`\`

출력은 다음과 같습니다.

\`\`\`text
{'name': '홍길동', 'email': 'hong@example.com'}
\`\`\`

---

## 7.4.1 믹스인의 특징

믹스인은 일반적인 부모 클래스와 목적이 조금 다릅니다.

일반적인 상속은 “A는 B의 한 종류다”라는 관계를 표현합니다.

\`\`\`text
AdminUser는 User의 한 종류다.
CsvExporter는 Exporter의 한 종류다.
\`\`\`

믹스인은 “이 기능을 추가한다”에 가깝습니다.

\`\`\`text
ToDictMixin은 딕셔너리 변환 기능을 추가한다.
LoggingMixin은 로그 기록 기능을 추가한다.
ValidationMixin은 검증 기능을 추가한다.
\`\`\`

그래서 믹스인 이름에는 보통 \`Mixin\`을 붙입니다.

\`\`\`python
class JsonSerializableMixin:
    pass

class LoggingMixin:
    pass

class ValidationMixin:
    pass
\`\`\`

이름만 보고도 “이 클래스는 단독 부모라기보다 기능 조합용이구나”라고 알 수 있습니다.

---

## 7.4.2 로깅 믹스인 만들기

간단한 로깅 믹스인을 만들어보겠습니다.

\`\`\`python
class LoggingMixin:
    def log(self, message: str) -> None:
        class_name = self.__class__.__name__
        print(f"[{class_name}] {message}")
\`\`\`

이제 여러 클래스에서 사용할 수 있습니다.

\`\`\`python
class FileImporter(LoggingMixin):
    def import_file(self, path: str) -> None:
        self.log(f"파일을 가져옵니다: {path}")
        print("파일 처리 중...")


class ApiClient(LoggingMixin):
    def request(self, url: str) -> None:
        self.log(f"API 요청을 보냅니다: {url}")
        print("요청 처리 중...")
\`\`\`

사용해보겠습니다.

\`\`\`python
importer = FileImporter()
importer.import_file("orders.csv")

client = ApiClient()
client.request("https://example.com/api")
\`\`\`

믹스인을 사용하면 여러 클래스에 공통 기능을 반복해서 작성하지 않아도 됩니다.

---

## 7.4.3 직렬화 믹스인 만들기

객체를 JSON으로 저장하고 싶을 때가 있습니다. 다음은 간단한 JSON 변환 믹스인입니다.

\`\`\`python
import json


class JsonMixin:
    def to_dict(self) -> dict:
        return self.__dict__.copy()

    def to_json(self) -> str:
        return json.dumps(self.to_dict(), ensure_ascii=False)
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
class Product(JsonMixin):
    def __init__(self, name: str, price: int) -> None:
        self.name = name
        self.price = price


product = Product("키보드", 30000)
print(product.to_json())
\`\`\`

출력은 다음과 같습니다.

\`\`\`text
{"name": "키보드", "price": 30000}
\`\`\`

이 예제는 단순하지만 실무에서 자주 등장하는 구조입니다. 데이터 객체에 공통 변환 기능을 붙이고 싶을 때 믹스인을 사용할 수 있습니다.

---

## 7.4.4 믹스인을 사용할 때 주의할 점

믹스인은 편리하지만 남용하면 상속 구조가 복잡해집니다.

다음처럼 믹스인이 너무 많으면 코드를 이해하기 어렵습니다.

\`\`\`python
class ReportService(
    LoggingMixin,
    ValidationMixin,
    JsonMixin,
    CacheMixin,
    RetryMixin,
    PermissionMixin,
    BaseService,
):
    pass
\`\`\`

이런 클래스는 어떤 메서드가 어디에서 오는지 파악하기 어렵습니다.

믹스인을 사용할 때는 다음 원칙을 지키는 것이 좋습니다.

\`\`\`text
믹스인은 작고 독립적인 기능만 가져야 한다.
믹스인은 상태를 많이 가지지 않는 것이 좋다.
믹스인은 이름에 Mixin을 붙여 의도를 드러낸다.
믹스인 간 의존성을 줄인다.
MRO를 이해하지 못한 상태에서 복잡한 믹스인을 만들지 않는다.
\`\`\`

---
`;export{e as default};