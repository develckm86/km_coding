var e=`<!-- 원본: python_advanced_chapter_15_book.md / 세부 장: 15-8 -->

# 15.8 안전한 쿼리 작성

## 문자열 포매팅으로 SQL을 만들면 위험하다

사용자 입력값을 SQL 문자열에 직접 넣으면 위험하다.

다음 코드는 좋지 않은 예다.

\`\`\`python
email = input("이메일: ")

sql = f"SELECT * FROM customers WHERE email = '{email}'"
cursor.execute(sql)
\`\`\`

겉으로 보기에는 편해 보인다. 하지만 사용자가 예상하지 못한 값을 입력하면 SQL 구조 자체가 바뀔 수 있다. 이것이 SQL Injection의 기본 원리다.

## SQL Injection이란?

SQL Injection은 사용자가 입력한 값이 SQL 명령의 일부로 해석되어 의도하지 않은 동작을 일으키는 공격 방식이다.

예를 들어 로그인 코드가 다음처럼 작성되어 있다고 가정하자.

\`\`\`python
email = input("이메일: ")
password = input("비밀번호: ")

sql = f"""
SELECT *
FROM users
WHERE email = '{email}'
  AND password = '{password}'
"""

cursor.execute(sql)
\`\`\`

사용자가 정상적인 이메일과 비밀번호를 입력한다면 큰 문제가 없어 보인다. 그러나 입력값이 SQL 구조를 깨뜨리도록 만들어지면 인증 조건이 우회될 수도 있다.

이 장에서 실제 공격 코드를 자세히 다루지는 않는다. 중요한 것은 “사용자 입력값을 SQL 문자열에 직접 붙이지 않는다”는 원칙이다.

## 파라미터 바인딩 사용하기

안전한 방식은 \`?\` 자리 표시자를 사용하고, 실제 값은 별도로 전달하는 것이다.

\`\`\`python
email = input("이메일: ")

cursor.execute("""
SELECT id, name, email
FROM customers
WHERE email = ?
""", (email,))
\`\`\`

이렇게 작성하면 입력값은 SQL 명령이 아니라 값으로 처리된다.

## 여러 파라미터 전달하기

\`\`\`python
grade = "VIP"
min_amount = 30000

cursor.execute("""
SELECT c.name, c.email, o.amount
FROM customers AS c
JOIN orders AS o ON c.id = o.customer_id
WHERE c.grade = ?
  AND o.amount >= ?
""", (grade, min_amount))
\`\`\`

\`?\`의 개수와 전달하는 값의 개수가 맞아야 한다.

## named parameter 사용하기

\`sqlite3\`에서는 이름 있는 파라미터도 사용할 수 있다.

\`\`\`python
cursor.execute("""
SELECT id, name, email
FROM customers
WHERE grade = :grade
""", {"grade": "VIP"})
\`\`\`

파라미터가 많아지면 이름 있는 방식이 더 읽기 쉬울 수 있다.

## 테이블명과 컬럼명은 파라미터로 바인딩할 수 없다

다음과 같은 코드는 기대대로 동작하지 않는다.

\`\`\`python
table_name = "customers"

cursor.execute("SELECT * FROM ?", (table_name,))
\`\`\`

파라미터 바인딩은 값에 사용한다. 테이블명이나 컬럼명 같은 SQL 구조에는 사용할 수 없다.

테이블명을 동적으로 바꿔야 한다면 허용된 이름인지 직접 검사해야 한다.

\`\`\`python
allowed_tables = {"customers", "orders"}
table_name = "customers"

if table_name not in allowed_tables:
    raise ValueError("허용되지 않은 테이블명입니다.")

sql = f"SELECT * FROM {table_name}"
cursor.execute(sql)
\`\`\`

이처럼 SQL 구조를 동적으로 만들 때는 반드시 허용 목록을 사용해야 한다.

---
`;export{e as default};