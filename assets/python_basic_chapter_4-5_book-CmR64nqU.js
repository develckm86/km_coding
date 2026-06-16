var e=`<!-- 원본: python_basic_chapter_4_book.md / 세부 장: 4-5 -->

# 4.5 딕셔너리

## 딕셔너리란 무엇인가

딕셔너리는 key와 value를 쌍으로 저장하는 자료구조이다. 리스트와 튜플은 인덱스로 값을 찾지만, 딕셔너리는 key로 값을 찾는다.

딕셔너리의 특징은 다음과 같다.

- key-value 구조로 데이터를 저장한다.
- key를 사용해 value를 찾는다.
- key는 중복될 수 없다.
- 값을 추가, 수정, 삭제할 수 있다.
- 여러 속성을 가진 하나의 대상을 표현하기 좋다.

딕셔너리는 중괄호 \`{}\`를 사용해 만든다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com",
    "grade": "VIP"
}
\`\`\`

위 딕셔너리에서 \`"name"\`, \`"email"\`, \`"grade"\`는 key이고, \`"김민수"\`, \`"minsu@example.com"\`, \`"VIP"\`는 value이다.

## 딕셔너리 선언법

빈 딕셔너리는 다음처럼 만든다.

\`\`\`python
user = {}
\`\`\`

값이 있는 딕셔너리는 key와 value를 콜론 \`:\`으로 연결해 작성한다.

\`\`\`python
product = {
    "name": "키보드",
    "price": 30000,
    "stock": 10
}
\`\`\`

key는 보통 문자열을 많이 사용한다. value에는 문자열, 숫자, 불리언, 리스트, 다른 딕셔너리 등 다양한 값을 넣을 수 있다.

\`\`\`python
user = {
    "name": "이지영",
    "age": 28,
    "is_active": True,
    "skills": ["Python", "Excel", "SQL"]
}
\`\`\`

딕셔너리 안에 딕셔너리를 넣을 수도 있다.

\`\`\`python
company = {
    "name": "ABC Company",
    "address": {
        "city": "서울",
        "district": "강남구"
    }
}
\`\`\`

이런 구조는 API 응답 데이터나 설정 파일에서 자주 볼 수 있다.

## 딕셔너리 값 조회

딕셔너리에서 값을 가져올 때는 key를 사용한다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com",
    "grade": "VIP"
}

print(customer["name"])
print(customer["email"])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
김민수
minsu@example.com
\`\`\`

존재하지 않는 key로 값을 조회하면 \`KeyError\`가 발생한다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com"
}

print(customer["grade"])
\`\`\`

\`grade\`라는 key가 없으므로 에러가 발생한다.

없는 key를 안전하게 조회하려면 \`get()\`을 사용할 수 있다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com"
}

print(customer.get("grade"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
None
\`\`\`

\`get()\`은 key가 없을 때 에러를 발생시키지 않고 \`None\`을 반환한다.

기본값을 지정할 수도 있다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com"
}

print(customer.get("grade", "BASIC"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
BASIC
\`\`\`

실무에서는 외부 데이터나 API 응답을 다룰 때 key가 없을 수 있다. 이럴 때 \`get()\`을 사용하면 프로그램이 갑자기 멈추는 일을 줄일 수 있다.

## 딕셔너리 값 추가와 수정

딕셔너리에 새 key를 추가할 때는 대괄호에 key를 지정하고 값을 대입한다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com"
}

customer["grade"] = "VIP"

print(customer)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{'name': '김민수', 'email': 'minsu@example.com', 'grade': 'VIP'}
\`\`\`

이미 존재하는 key에 값을 대입하면 값이 수정된다.

\`\`\`python
customer = {
    "name": "김민수",
    "grade": "BASIC"
}

customer["grade"] = "VIP"

print(customer)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{'name': '김민수', 'grade': 'VIP'}
\`\`\`

여러 값을 한 번에 추가하거나 수정할 때는 \`update()\`를 사용할 수 있다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com"
}

customer.update({
    "grade": "VIP",
    "point": 1200
})

print(customer)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{'name': '김민수', 'email': 'minsu@example.com', 'grade': 'VIP', 'point': 1200}
\`\`\`

## 딕셔너리 값 삭제

딕셔너리에서 값을 삭제할 때는 \`pop()\`, \`del\`, \`clear()\`를 사용할 수 있다.

\`pop()\`은 key를 기준으로 값을 삭제하고, 삭제한 값을 반환한다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com",
    "grade": "VIP"
}

removed_value = customer.pop("grade")

print(removed_value)
print(customer)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
VIP
{'name': '김민수', 'email': 'minsu@example.com'}
\`\`\`

\`del\`도 key를 기준으로 값을 삭제한다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com"
}

del customer["email"]

print(customer)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{'name': '김민수'}
\`\`\`

\`clear()\`는 모든 값을 삭제한다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com"
}

customer.clear()

print(customer)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{}
\`\`\`

## 딕셔너리 주요 함수

\`keys()\`는 딕셔너리의 key 목록을 가져온다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com",
    "grade": "VIP"
}

print(customer.keys())
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
dict_keys(['name', 'email', 'grade'])
\`\`\`

\`values()\`는 value 목록을 가져온다.

\`\`\`python
print(customer.values())
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
dict_values(['김민수', 'minsu@example.com', 'VIP'])
\`\`\`

\`items()\`는 key와 value를 함께 가져온다.

\`\`\`python
print(customer.items())
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
dict_items([('name', '김민수'), ('email', 'minsu@example.com'), ('grade', 'VIP')])
\`\`\`

\`items()\`는 반복문에서 특히 자주 사용한다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com",
    "grade": "VIP"
}

for key, value in customer.items():
    print(key, value)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
name 김민수
email minsu@example.com
grade VIP
\`\`\`

## 딕셔너리 반복문

딕셔너리를 반복하면 기본적으로 key가 하나씩 나온다.

\`\`\`python
customer = {
    "name": "김민수",
    "email": "minsu@example.com",
    "grade": "VIP"
}

for key in customer:
    print(key)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
name
email
grade
\`\`\`

key를 사용해 value를 함께 출력할 수 있다.

\`\`\`python
for key in customer:
    print(key, customer[key])
\`\`\`

하지만 key와 value를 함께 사용할 때는 \`items()\`가 더 읽기 쉽다.

\`\`\`python
for key, value in customer.items():
    print(key, value)
\`\`\`

value만 반복하고 싶다면 \`values()\`를 사용할 수 있다.

\`\`\`python
for value in customer.values():
    print(value)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
김민수
minsu@example.com
VIP
\`\`\`

## 리스트 안의 딕셔너리

실무 데이터는 하나의 딕셔너리만으로 끝나지 않는 경우가 많다. 여러 고객, 여러 상품, 여러 주문을 다뤄야 한다. 이때는 리스트 안에 딕셔너리를 넣는 구조를 자주 사용한다.

\`\`\`python
customers = [
    {"name": "김민수", "grade": "VIP", "point": 1200},
    {"name": "이지영", "grade": "BASIC", "point": 300},
    {"name": "박철수", "grade": "VIP", "point": 2000}
]
\`\`\`

VIP 고객만 출력해 보자.

\`\`\`python
for customer in customers:
    if customer["grade"] == "VIP":
        print(customer["name"])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
김민수
박철수
\`\`\`

이번에는 포인트가 1,000점 이상인 고객만 새 리스트에 모아 보자.

\`\`\`python
customers = [
    {"name": "김민수", "grade": "VIP", "point": 1200},
    {"name": "이지영", "grade": "BASIC", "point": 300},
    {"name": "박철수", "grade": "VIP", "point": 2000}
]

result = []

for customer in customers:
    if customer["point"] >= 1000:
        result.append(customer)

print(result)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[{'name': '김민수', 'grade': 'VIP', 'point': 1200}, {'name': '박철수', 'grade': 'VIP', 'point': 2000}]
\`\`\`

리스트 안의 딕셔너리 구조는 CSV, 엑셀, JSON, API 응답 데이터를 다룰 때 매우 자주 사용된다.

## 딕셔너리 실무 예제

상품 정보를 딕셔너리로 표현해 보자.

\`\`\`python
product = {
    "name": "키보드",
    "price": 30000,
    "stock": 10
}
\`\`\`

재고가 있는지 확인해 보자.

\`\`\`python
if product["stock"] > 0:
    print("구매 가능합니다.")
else:
    print("품절입니다.")
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
구매 가능합니다.
\`\`\`

할인 가격을 추가할 수도 있다.

\`\`\`python
product["discount_price"] = product["price"] * 0.9
print(product)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
{'name': '키보드', 'price': 30000, 'stock': 10, 'discount_price': 27000.0}
\`\`\`

딕셔너리는 여러 속성을 가진 데이터를 표현할 때 가장 많이 사용하는 자료구조이다.

---
`;export{e as default};