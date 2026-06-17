var e=`<!-- 원본: python_basic_chapter_7_book.md / 세부 장: 7-9 -->

# 7.9 상속

### 7.9.1 상속이란 무엇인가

상속은 기존 클래스의 속성과 메서드를 물려받아 새로운 클래스를 만드는 문법입니다.

예를 들어 일반 회원과 VIP 회원을 생각해봅시다.

일반 회원과 VIP 회원은 모두 이름과 이메일을 가집니다. 하지만 할인율은 다를 수 있습니다.

공통되는 부분은 부모 클래스에 두고, 달라지는 부분은 자식 클래스에서 정의할 수 있습니다.

---

### 7.9.2 상속 기본 문법

\`\`\`python
class Member:
    def __init__(self, name, email):
        self.name = name
        self.email = email

    def get_discount_rate(self):
        return 0


class VipMember(Member):
    def get_discount_rate(self):
        return 0.1
\`\`\`

\`VipMember(Member)\`는 \`VipMember\`가 \`Member\`를 상속한다는 뜻입니다.

\`\`\`python
member = Member("김민수", "minsu@example.com")
vip_member = VipMember("이지영", "jiyoung@example.com")

print(member.name)
print(vip_member.name)
print(member.get_discount_rate())
print(vip_member.get_discount_rate())
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
김민수
이지영
0
0.1
\`\`\`

\`VipMember\` 클래스에는 \`__init__\`을 따로 만들지 않았지만 부모 클래스인 \`Member\`의 \`__init__\`을 사용할 수 있습니다.

---

### 7.9.3 \`super()\` 사용하기

자식 클래스에서 생성자를 새로 정의하면서 부모 클래스의 생성자도 사용하고 싶을 때 \`super()\`를 사용합니다.

\`\`\`python
class Member:
    def __init__(self, name, email):
        self.name = name
        self.email = email


class VipMember(Member):
    def __init__(self, name, email, vip_point):
        super().__init__(name, email)
        self.vip_point = vip_point


vip_member = VipMember("이지영", "jiyoung@example.com", 1000)

print(vip_member.name)
print(vip_member.email)
print(vip_member.vip_point)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
이지영
jiyoung@example.com
1000
\`\`\`

\`super().__init__(name, email)\`은 부모 클래스의 생성자를 호출합니다. 그래서 부모가 처리하던 \`name\`, \`email\` 초기화를 다시 작성하지 않아도 됩니다.

---

### 7.9.4 상속을 사용할 때 주의할 점

상속은 공통 기능을 재사용할 수 있게 해주지만, 무조건 좋은 것은 아닙니다.

상속을 사용할 때는 다음 질문을 해보는 것이 좋습니다.

\`\`\`text
자식 클래스는 정말 부모 클래스의 한 종류인가?
\`\`\`

예를 들어 \`VipMember\`는 \`Member\`의 한 종류라고 볼 수 있습니다. 그래서 상속이 자연스럽습니다.

하지만 \`Order\`가 \`Customer\`를 상속하는 것은 어색합니다. 주문은 고객의 한 종류가 아니기 때문입니다. 이 경우 주문 객체가 고객 객체를 포함하는 방식이 더 자연스럽습니다.

\`\`\`python
class Order:
    def __init__(self, customer):
        self.customer = customer
\`\`\`

상속은 “is-a 관계”일 때 어울립니다.

\`\`\`text
VIP 회원은 회원이다.
할인 상품은 상품이다.
CSV 파일 처리기는 파일 처리기이다.
\`\`\`

반면 포함 관계는 “has-a 관계”일 때 어울립니다.

\`\`\`text
주문은 고객을 가진다.
주문은 상품 목록을 가진다.
보고서 생성기는 저장 도구를 가진다.
\`\`\`

---
`;export{e as default};