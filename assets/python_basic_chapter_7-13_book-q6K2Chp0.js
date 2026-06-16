var e=`<!-- 원본: python_basic_chapter_7_book.md / 세부 장: 7-13 -->

# 7.13 데이터 클래스 \`dataclass\`

### 7.13.1 \`dataclass\`가 필요한 이유

클래스를 만들다 보면 데이터를 담기 위해 반복적으로 작성하는 코드가 많습니다.

\`\`\`python
class Customer:
    def __init__(self, name, email, grade):
        self.name = name
        self.email = email
        self.grade = grade

    def __repr__(self):
        return f"Customer(name={self.name!r}, email={self.email!r}, grade={self.grade!r})"
\`\`\`

이런 클래스는 데이터 저장이 주 목적입니다. 파이썬에서는 \`dataclass\`를 사용해 이런 코드를 간단하게 만들 수 있습니다.

---

### 7.13.2 \`@dataclass\` 기본 문법

\`dataclass\`는 \`dataclasses\` 모듈에서 가져옵니다.

\`\`\`python
from dataclasses import dataclass


@dataclass
class Customer:
    name: str
    email: str
    grade: str


customer = Customer("김민수", "minsu@example.com", "VIP")

print(customer)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
Customer(name='김민수', email='minsu@example.com', grade='VIP')
\`\`\`

\`@dataclass\`를 사용하면 \`__init__\`, \`__repr__\` 같은 기본 메서드가 자동으로 만들어집니다.

아직 타입 힌트를 자세히 배우지 않았더라도, 여기서는 \`name: str\`이 “name은 문자열로 사용할 예정”이라는 표시라고 이해하면 됩니다. 타입 힌트는 뒤의 장에서 더 자세히 다룹니다.

---

### 7.13.3 기본값 설정

데이터 클래스에서도 기본값을 설정할 수 있습니다.

\`\`\`python
from dataclasses import dataclass


@dataclass
class Customer:
    name: str
    email: str
    grade: str = "일반"


customer = Customer("김민수", "minsu@example.com")

print(customer.grade)
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
일반
\`\`\`

객체를 만들 때 \`grade\`를 전달하지 않았기 때문에 기본값 \`"일반"\`이 사용되었습니다.

---

### 7.13.4 데이터 클래스에 메서드 넣기

데이터 클래스에도 일반 클래스처럼 메서드를 넣을 수 있습니다.

\`\`\`python
from dataclasses import dataclass


@dataclass
class Product:
    name: str
    price: int
    stock: int

    def is_available(self):
        return self.stock > 0


product = Product("키보드", 30000, 10)

print(product.is_available())
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
True
\`\`\`

데이터 클래스라고 해서 데이터만 저장해야 하는 것은 아닙니다. 다만 복잡한 상태 변경과 검증이 많아지면 일반 클래스로 작성하는 편이 더 명확할 수 있습니다.

---

### 7.13.5 데이터 클래스와 일반 클래스의 구분

\`dataclass\`는 데이터를 담는 목적의 클래스에 잘 어울립니다.

예를 들어 다음과 같은 클래스는 데이터 클래스에 적합합니다.

\`\`\`text
고객 정보
상품 정보
API 응답 데이터
좌표 데이터
설정 데이터
\`\`\`

반면 복잡한 검증, 상태 변경, 외부 파일 처리, API 요청처럼 기능이 많은 클래스는 일반 클래스로 작성하는 것이 더 나을 수 있습니다.

---
`;export{e as default};