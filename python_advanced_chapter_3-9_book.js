var e=`<!-- 원본: python_advanced_chapter_3_book.md / 세부 장: 3-9 -->

# 3.9 연습문제

### 문제 1. 함수 객체 이해하기

다음 코드의 실행 결과를 예상해보세요.

\`\`\`python
def greet(name):
    return f"Hello, {name}"

hello = greet

print(hello("Python"))
\`\`\`

---

### 문제 2. 함수를 딕셔너리에 저장하기

다음 조건을 만족하는 코드를 작성하세요.

1. \`add(a, b)\` 함수는 두 수의 합을 반환한다.
2. \`subtract(a, b)\` 함수는 두 수의 차를 반환한다.
3. \`operations\` 딕셔너리에 \`"add"\`, \`"subtract"\`를 key로 하여 두 함수를 저장한다.
4. \`operations["add"](10, 3)\`을 실행하면 \`13\`이 나오게 한다.

---

### 문제 3. \`*args\` 사용하기

개수가 정해지지 않은 숫자를 받아 그중 가장 큰 값을 반환하는 함수 \`find_max(*numbers)\`를 작성하세요.

단, 전달된 숫자가 없으면 \`None\`을 반환하세요.

---

### 문제 4. \`**kwargs\` 사용하기

키워드 인자로 전달된 사용자 정보를 다음 형식으로 출력하는 함수 \`print_profile(**kwargs)\`를 작성하세요.

\`\`\`text
name: 민수
age: 25
email: minsu@example.com
\`\`\`

호출 예시는 다음과 같습니다.

\`\`\`python
print_profile(name="민수", age=25, email="minsu@example.com")
\`\`\`

---

### 문제 5. 언패킹 사용하기

다음 리스트를 \`calculate_total(price, quantity, discount_rate)\` 함수에 언패킹해서 전달하세요.

\`\`\`python
values = [10000, 3, 0.1]
\`\`\`

함수는 할인 적용 후 총액을 반환해야 합니다.

---

### 문제 6. 딕셔너리 언패킹 사용하기

다음 딕셔너리를 \`create_user(name, age, email)\` 함수에 언패킹해서 전달하세요.

\`\`\`python
user_data = {
    "name": "지영",
    "age": 28,
    "email": "jiyoung@example.com",
}
\`\`\`

---

### 문제 7. \`map()\` 사용하기

숫자 리스트 \`[1, 2, 3, 4, 5]\`의 각 값을 제곱한 새 리스트를 \`map()\`을 사용해 만드세요.

---

### 문제 8. \`filter()\` 사용하기

다음 상품 목록에서 가격이 30000원 이상인 상품만 필터링하세요.

\`\`\`python
products = [
    {"name": "키보드", "price": 30000},
    {"name": "마우스", "price": 15000},
    {"name": "모니터", "price": 200000},
]
\`\`\`

---

### 문제 9. \`sorted()\`와 \`key\` 사용하기

문제 8의 상품 목록을 가격이 낮은 순서로 정렬하세요.

---

### 문제 10. 클로저 만들기

할인율을 기억하는 함수 \`make_discount_calculator(discount_rate)\`를 작성하세요.

사용 예시는 다음과 같습니다.

\`\`\`python
vip_discount = make_discount_calculator(0.2)
print(vip_discount(10000))
\`\`\`

실행 결과는 다음과 같아야 합니다.

\`\`\`text
8000.0
\`\`\`

---

### 문제 11. 입력과 출력이 명확한 함수로 개선하기

다음 함수는 결과를 출력만 하고 반환하지 않습니다. 결과를 반환하도록 개선하세요.

\`\`\`python
def show_total(price, quantity):
    total = price * quantity
    print(total)
\`\`\`

---

### 문제 12. 데이터 정리 함수 만들기

다음 사용자 데이터에서 이름의 앞뒤 공백을 제거하고, 이메일을 소문자로 변환하는 함수 \`clean_user(user)\`를 작성하세요.

\`\`\`python
user = {
    "name": "  Kim  ",
    "email": "KIM@EXAMPLE.COM",
}
\`\`\`

반환 결과는 다음과 같아야 합니다.

\`\`\`python
{
    "name": "Kim",
    "email": "kim@example.com",
}
\`\`\`

---
`;export{e as default};