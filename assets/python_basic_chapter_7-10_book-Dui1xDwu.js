var e=`<!-- 원본: python_basic_chapter_7_book.md / 세부 장: 7-10 -->

# 7.10 메서드 오버라이딩

### 7.10.1 오버라이딩이란 무엇인가

오버라이딩은 부모 클래스에 있는 메서드를 자식 클래스에서 다시 정의하는 것입니다.

\`\`\`python
class Member:
    def get_discount_rate(self):
        return 0


class VipMember(Member):
    def get_discount_rate(self):
        return 0.1
\`\`\`

\`Member\`에도 \`get_discount_rate()\`가 있고, \`VipMember\`에도 같은 이름의 메서드가 있습니다. 이때 \`VipMember\` 객체에서 \`get_discount_rate()\`를 호출하면 자식 클래스의 메서드가 실행됩니다.

\`\`\`python
member = Member()
vip_member = VipMember()

print(member.get_discount_rate())
print(vip_member.get_discount_rate())
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
0
0.1
\`\`\`

---

### 7.10.2 부모 기능 확장하기

오버라이딩할 때 부모 메서드의 기능을 그대로 사용하면서 일부 기능만 추가할 수도 있습니다.

\`\`\`python
class Report:
    def create(self):
        print("보고서 데이터를 생성합니다.")


class ExcelReport(Report):
    def create(self):
        super().create()
        print("엑셀 파일로 저장합니다.")


report = ExcelReport()
report.create()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
보고서 데이터를 생성합니다.
엑셀 파일로 저장합니다.
\`\`\`

\`super().create()\`를 호출하면 부모 클래스의 \`create()\` 메서드가 먼저 실행됩니다. 그다음 자식 클래스의 추가 코드가 실행됩니다.

---

### 7.10.3 다형성의 기초

다형성은 같은 이름의 메서드를 호출하더라도 객체의 종류에 따라 다르게 동작하는 성질입니다.

\`\`\`python
class CreditCardPayment:
    def pay(self, amount):
        print(f"신용카드로 {amount}원을 결제합니다.")


class BankTransferPayment:
    def pay(self, amount):
        print(f"계좌이체로 {amount}원을 결제합니다.")


payments = [CreditCardPayment(), BankTransferPayment()]

for payment in payments:
    payment.pay(50000)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
신용카드로 50000원을 결제합니다.
계좌이체로 50000원을 결제합니다.
\`\`\`

두 객체는 모두 \`pay()\`라는 메서드를 가지고 있지만 실행 결과는 다릅니다. 사용하는 쪽에서는 결제 방식이 무엇인지 자세히 몰라도 \`pay()\`만 호출하면 됩니다.

---
`;export{e as default};