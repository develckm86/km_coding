var e=`<!-- 원본: python_basic_chapter_7_book.md / 세부 장: 7-2 -->

# 7.2 클래스와 객체 기본 문법

### 7.2.1 클래스 정의

클래스를 정의할 때는 \`class\` 키워드를 사용합니다.

\`\`\`python
class Customer:
    pass
\`\`\`

\`pass\`는 “아직 아무 내용도 작성하지 않겠다”라는 뜻입니다. 문법상 코드 블록이 필요하지만 아직 구현할 내용이 없을 때 사용합니다.

클래스 이름은 보통 대문자로 시작하고, 여러 단어를 붙일 때는 각 단어의 첫 글자를 대문자로 씁니다.

\`\`\`python
class Product:
    pass


class OrderItem:
    pass


class ReportGenerator:
    pass
\`\`\`

이런 표기법을 보통 \`PascalCase\`라고 부릅니다.

---

### 7.2.2 객체 생성

클래스를 정의했다면 클래스를 호출해서 객체를 만들 수 있습니다.

\`\`\`python
class Customer:
    pass


customer = Customer()

print(customer)
\`\`\`

실행하면 다음과 비슷한 결과가 나옵니다.

\`\`\`text
<__main__.Customer object at 0x...>
\`\`\`

출력 내용이 조금 낯설 수 있지만, 중요한 것은 \`Customer\` 클래스로 객체가 하나 만들어졌다는 점입니다.

객체를 다른 말로 **인스턴스**라고도 합니다. 엄밀히 말하면 \`customer\`는 \`Customer\` 클래스의 인스턴스입니다.

---

### 7.2.3 속성 만들기

객체에는 속성을 저장할 수 있습니다. 속성은 객체가 가지고 있는 데이터입니다.

\`\`\`python
class Customer:
    pass


customer = Customer()
customer.name = "김민수"
customer.email = "minsu@example.com"

print(customer.name)
print(customer.email)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
김민수
minsu@example.com
\`\`\`

파이썬에서는 위처럼 객체를 만든 뒤 속성을 추가할 수 있습니다. 하지만 실무에서는 객체마다 필요한 속성을 일정하게 만들기 위해 생성자 \`__init__\`을 사용하는 것이 일반적입니다. 생성자는 다음 절에서 자세히 배웁니다.

---

### 7.2.4 메서드 만들기

클래스 안에 정의된 함수를 메서드라고 부릅니다.

\`\`\`python
class Customer:
    def say_hello(self):
        print("안녕하세요.")


customer = Customer()
customer.say_hello()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
안녕하세요.
\`\`\`

여기서 \`say_hello()\`는 함수처럼 보이지만 클래스 안에 있으므로 메서드입니다.

---

### 7.2.5 \`self\`의 의미

클래스 안의 메서드는 첫 번째 매개변수로 보통 \`self\`를 받습니다.

\`\`\`python
class Customer:
    def say_name(self):
        print(self.name)
\`\`\`

\`self\`는 현재 메서드를 호출한 객체 자신을 가리킵니다.

\`\`\`python
class Customer:
    def say_name(self):
        print(self.name)


customer1 = Customer()
customer1.name = "김민수"

customer2 = Customer()
customer2.name = "이지영"

customer1.say_name()
customer2.say_name()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
김민수
이지영
\`\`\`

\`customer1.say_name()\`을 호출하면 \`self\`는 \`customer1\`을 가리킵니다. \`customer2.say_name()\`을 호출하면 \`self\`는 \`customer2\`를 가리킵니다.

즉, \`self.name\`은 항상 “현재 객체의 name 속성”을 의미합니다.

---

### 7.2.6 클래스 기본 예제

고객 클래스를 조금 더 구체적으로 만들어봅시다.

\`\`\`python
class Customer:
    def introduce(self):
        print(f"저는 {self.name}입니다. 이메일은 {self.email}입니다.")


customer = Customer()
customer.name = "김민수"
customer.email = "minsu@example.com"

customer.introduce()
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
저는 김민수입니다. 이메일은 minsu@example.com입니다.
\`\`\`

이 예제에서 고객 객체는 \`name\`, \`email\`이라는 속성을 가지고 있고, \`introduce()\`라는 메서드를 가지고 있습니다.


---
`;export{e as default};