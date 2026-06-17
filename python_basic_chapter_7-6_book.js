var e=`<!-- 원본: python_basic_chapter_7_book.md / 세부 장: 7-6 -->

# 7.6 클래스 메서드와 정적 메서드

### 7.6.1 메서드의 종류

클래스 안에 들어가는 메서드는 크게 세 가지로 나눌 수 있습니다.

- 인스턴스 메서드
- 클래스 메서드
- 정적 메서드

지금까지 배운 대부분의 메서드는 인스턴스 메서드입니다. 인스턴스 메서드는 \`self\`를 통해 객체의 속성에 접근합니다.

클래스 메서드는 \`cls\`를 통해 클래스 자체에 접근합니다.

정적 메서드는 \`self\`나 \`cls\`를 사용하지 않습니다. 클래스 안에 함께 두면 의미가 분명해지는 일반 함수라고 생각할 수 있습니다.

---

### 7.6.2 클래스 메서드

클래스 메서드는 \`@classmethod\`를 붙여 만듭니다. 첫 번째 매개변수로 \`cls\`를 받습니다.

\`\`\`python
class Customer:
    count = 0

    def __init__(self, name, email):
        self.name = name
        self.email = email
        Customer.count += 1

    @classmethod
    def get_count(cls):
        return cls.count


customer1 = Customer("김민수", "minsu@example.com")
customer2 = Customer("이지영", "jiyoung@example.com")

print(Customer.get_count())
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
2
\`\`\`

\`get_count()\`는 특정 고객 한 명의 데이터가 아니라 \`Customer\` 클래스 전체의 \`count\` 값을 사용합니다. 이런 경우 클래스 메서드가 어울립니다.

---

### 7.6.3 클래스 메서드로 객체 만들기

클래스 메서드는 다른 형식의 데이터로부터 객체를 만들 때도 자주 사용됩니다.

예를 들어 고객 정보를 문자열로 받는다고 가정해봅시다.

\`\`\`python
text = "김민수,minsu@example.com"
\`\`\`

이 문자열을 이용해 \`Customer\` 객체를 만들 수 있습니다.

\`\`\`python
class Customer:
    def __init__(self, name, email):
        self.name = name
        self.email = email

    @classmethod
    def from_text(cls, text):
        name, email = text.split(",")
        return cls(name, email)


customer = Customer.from_text("김민수,minsu@example.com")

print(customer.name)
print(customer.email)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
김민수
minsu@example.com
\`\`\`

\`from_text()\`는 문자열을 분석해서 객체를 생성합니다. 이런 메서드를 “대체 생성자”처럼 사용할 수 있습니다.

---

### 7.6.4 정적 메서드

정적 메서드는 \`@staticmethod\`를 붙여 만듭니다.

\`\`\`python
class Customer:
    def __init__(self, name, email):
        self.name = name
        self.email = email

    @staticmethod
    def is_valid_email(email):
        return "@" in email


print(Customer.is_valid_email("minsu@example.com"))
print(Customer.is_valid_email("wrong-email"))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
False
\`\`\`

\`is_valid_email()\`은 특정 고객 객체의 상태를 사용하지 않습니다. 클래스 전체의 상태도 사용하지 않습니다. 단지 이메일 문자열이 유효한지 검사합니다.

그렇다면 왜 클래스 안에 넣었을까요? 고객과 관련된 기능이기 때문입니다. 이런 경우 정적 메서드로 클래스 안에 함께 둘 수 있습니다.

---

### 7.6.5 메서드 종류 비교

| 메서드 종류 | 첫 번째 매개변수 | 주로 사용하는 상황 |
|---|---|---|
| 인스턴스 메서드 | \`self\` | 객체의 속성을 읽거나 변경할 때 |
| 클래스 메서드 | \`cls\` | 클래스 변수에 접근하거나 객체 생성 방식을 제공할 때 |
| 정적 메서드 | 없음 | 객체나 클래스 상태와 무관하지만 클래스와 관련 있는 기능일 때 |

처음 객체지향을 배울 때는 인스턴스 메서드를 가장 많이 사용합니다. 클래스 메서드와 정적 메서드는 필요할 때 조금씩 익숙해지면 됩니다.

---
`;export{e as default};