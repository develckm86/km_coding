var e=`<!-- 원본: python_basic_chapter_7_book.md / 세부 장: 7-14 -->

# 7.14 객체지향 설계 기초

### 7.14.1 좋은 클래스란 무엇인가

좋은 클래스는 역할이 분명합니다.

예를 들어 \`Customer\` 클래스는 고객 정보를 관리해야 합니다. 그런데 고객 클래스가 파일을 저장하고, API 요청을 보내고, 엑셀 보고서까지 만든다면 역할이 너무 많습니다.

좋은 클래스는 다음 기준을 만족하는 것이 좋습니다.

- 하나의 클래스는 하나의 주요 책임을 가진다.
- 클래스 이름만 봐도 역할을 어느 정도 알 수 있다.
- 메서드 이름이 동작을 분명히 설명한다.
- 내부 데이터가 함부로 망가지지 않도록 관리한다.
- 다른 클래스와 지나치게 강하게 얽히지 않는다.

---

### 7.14.2 너무 많은 일을 하는 클래스 피하기

다음과 같은 클래스는 좋지 않은 구조일 수 있습니다.

\`\`\`python
class OrderManager:
    def read_excel(self):
        pass

    def clean_data(self):
        pass

    def calculate_total_price(self):
        pass

    def send_email(self):
        pass

    def save_log(self):
        pass
\`\`\`

\`OrderManager\`가 주문 계산, 엑셀 읽기, 이메일 발송, 로그 저장까지 모두 담당하고 있습니다. 이런 클래스는 나중에 수정하기 어려워질 수 있습니다.

역할별로 나누면 구조가 더 명확해집니다.

\`\`\`text
OrderReader      -> 주문 데이터 읽기
OrderCalculator  -> 주문 금액 계산
EmailSender      -> 이메일 발송
LogWriter        -> 로그 기록
\`\`\`

처음부터 완벽하게 나눌 필요는 없습니다. 하지만 클래스가 너무 많은 일을 하고 있다면 분리할 수 있는지 생각해보는 것이 좋습니다.

---

### 7.14.3 데이터 클래스와 기능 클래스 구분하기

객체지향 설계를 할 때는 데이터를 담는 클래스와 기능을 수행하는 클래스를 구분하면 좋습니다.

데이터 클래스는 주로 값을 담습니다.

\`\`\`python
from dataclasses import dataclass


@dataclass
class ProductData:
    name: str
    price: int
    stock: int
\`\`\`

기능 클래스는 어떤 작업을 수행합니다.

\`\`\`python
class ProductService:
    def calculate_total_stock_value(self, products):
        total = 0

        for product in products:
            total += product.price * product.stock

        return total
\`\`\`

이렇게 나누면 데이터 구조와 처리 로직을 따로 관리할 수 있습니다.

---

### 7.14.4 실무 예제: 보고서 생성 구조

보고서 생성 프로그램을 만든다고 가정해봅시다. 한 클래스가 모든 일을 담당하는 대신 역할을 나눌 수 있습니다.

\`\`\`text
SalesDataReader
- 매출 데이터를 읽는다.

SalesAnalyzer
- 매출 합계, 평균, 상품별 매출을 계산한다.

ReportGenerator
- 분석 결과를 보고서 내용으로 만든다.

ReportSaver
- 보고서를 파일로 저장한다.
\`\`\`

코드로 단순화하면 다음과 같습니다.

\`\`\`python
class SalesAnalyzer:
    def calculate_total_sales(self, sales):
        return sum(sales)


class ReportGenerator:
    def create_summary(self, total_sales):
        return f"총 매출은 {total_sales}원입니다."


class ReportSaver:
    def save(self, filename, content):
        with open(filename, "w", encoding="utf-8") as file:
            file.write(content)


sales = [10000, 20000, 30000]

analyzer = SalesAnalyzer()
generator = ReportGenerator()
saver = ReportSaver()

total_sales = analyzer.calculate_total_sales(sales)
summary = generator.create_summary(total_sales)
saver.save("sales_report.txt", summary)
\`\`\`

이 구조는 처음에는 코드가 길어 보일 수 있습니다. 하지만 기능이 많아질수록 역할이 분명한 구조가 유지보수에 유리합니다.

---

### 7.14.5 객체지향 설계에서 자주 하는 실수

초보자가 객체지향을 배울 때 자주 하는 실수는 다음과 같습니다.

첫째, 모든 것을 클래스로 만들려고 합니다. 간단한 계산이나 짧은 변환 로직은 함수로 충분할 수 있습니다.

둘째, 하나의 클래스에 너무 많은 기능을 넣습니다. 이름은 하나인데 역할이 여러 개라면 나누는 것이 좋습니다.

셋째, 상속을 너무 많이 사용합니다. 관계가 명확한 “is-a”가 아니라면 구성 관계를 먼저 고려하는 편이 안전합니다.

넷째, 객체의 내부 값을 외부에서 직접 바꾸도록 둡니다. 값 검증이 필요한 데이터는 메서드나 프로퍼티를 통해 관리하는 것이 좋습니다.

---
`;export{e as default};