var e=`<!-- 원본: python_advanced_chapter_15_book.md / 세부 장: 15-7 -->

# 15.7 파이썬에서 SQLite 사용하기

## \`sqlite3\` 모듈 가져오기

파이썬에서 SQLite를 사용하려면 \`sqlite3\` 모듈을 import한다.

\`\`\`python
import sqlite3
\`\`\`

\`sqlite3\`는 파이썬 표준 라이브러리에 포함되어 있으므로 별도로 설치하지 않아도 된다.

## 데이터베이스 연결하기

다음 코드는 \`shop.db\`라는 SQLite 데이터베이스 파일에 연결한다.

\`\`\`python
import sqlite3

connection = sqlite3.connect("shop.db")
\`\`\`

파일이 이미 있으면 그 파일에 연결하고, 파일이 없으면 새로 만든다.

## 커서 만들기

데이터베이스에 SQL을 실행하려면 커서를 사용한다.

\`\`\`python
cursor = connection.cursor()
\`\`\`

커서는 데이터베이스에 명령을 보내고, 조회 결과를 가져오는 역할을 한다.

## 테이블 만들기

\`\`\`python
import sqlite3

connection = sqlite3.connect("shop.db")
cursor = connection.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    grade TEXT
)
""")

connection.commit()
connection.close()
\`\`\`

여기서 \`CREATE TABLE IF NOT EXISTS\`는 같은 이름의 테이블이 없을 때만 테이블을 만든다. 이미 테이블이 있으면 에러를 내지 않고 넘어간다.

## 데이터 추가하기

\`\`\`python
import sqlite3

connection = sqlite3.connect("shop.db")
cursor = connection.cursor()

cursor.execute("""
INSERT INTO customers (name, email, grade)
VALUES (?, ?, ?)
""", ("김민수", "minsu@example.com", "VIP"))

connection.commit()
connection.close()
\`\`\`

여기서 중요한 것은 SQL 문자열 안에 직접 값을 넣지 않고 \`?\`를 사용했다는 점이다.

\`\`\`python
VALUES (?, ?, ?)
\`\`\`

그리고 실제 값은 두 번째 인자로 전달했다.

\`\`\`python
("김민수", "minsu@example.com", "VIP")
\`\`\`

이 방식을 파라미터 바인딩이라고 한다. 뒤에서 더 자세히 다룬다.

## 여러 데이터 추가하기

여러 행을 추가할 때는 \`executemany()\`를 사용할 수 있다.

\`\`\`python
import sqlite3

connection = sqlite3.connect("shop.db")
cursor = connection.cursor()

customers = [
    ("이지영", "jiyoung@example.com", "GOLD"),
    ("박철수", "chulsoo@example.com", "BASIC"),
    ("최영희", "younghee@example.com", "VIP"),
]

cursor.executemany("""
INSERT INTO customers (name, email, grade)
VALUES (?, ?, ?)
""", customers)

connection.commit()
connection.close()
\`\`\`

반복문으로 \`execute()\`를 여러 번 호출할 수도 있지만, 여러 데이터를 한 번에 넣을 때는 \`executemany()\`가 더 깔끔하다.

## 데이터 조회하기

\`\`\`python
import sqlite3

connection = sqlite3.connect("shop.db")
cursor = connection.cursor()

cursor.execute("SELECT id, name, email, grade FROM customers")
rows = cursor.fetchall()

for row in rows:
    print(row)

connection.close()
\`\`\`

\`fetchall()\`은 조회 결과를 모두 가져온다. 결과는 보통 튜플의 리스트 형태로 반환된다.

\`\`\`text
(1, '김민수', 'minsu@example.com', 'VIP')
(2, '이지영', 'jiyoung@example.com', 'GOLD')
\`\`\`

## 한 행만 가져오기

결과가 하나만 필요할 때는 \`fetchone()\`을 사용한다.

\`\`\`python
cursor.execute("""
SELECT id, name, email, grade
FROM customers
WHERE email = ?
""", ("minsu@example.com",))

row = cursor.fetchone()
print(row)
\`\`\`

주의할 점은 값이 하나인 튜플을 만들 때 쉼표가 필요하다는 것이다.

\`\`\`python
("minsu@example.com",)
\`\`\`

쉼표가 없으면 튜플이 아니라 문자열로 처리된다.

## 조회 결과를 딕셔너리처럼 다루기

기본적으로 \`sqlite3\`의 조회 결과는 튜플이다. 컬럼 이름으로 접근하고 싶다면 \`row_factory\`를 사용할 수 있다.

\`\`\`python
import sqlite3

connection = sqlite3.connect("shop.db")
connection.row_factory = sqlite3.Row
cursor = connection.cursor()

cursor.execute("SELECT id, name, email, grade FROM customers")
rows = cursor.fetchall()

for row in rows:
    print(row["name"], row["email"])

connection.close()
\`\`\`

이 방식은 분석 전처리 코드에서 가독성을 높이는 데 도움이 된다.

## \`with\` 문으로 연결 관리하기

SQLite 연결 객체는 컨텍스트 매니저로 사용할 수 있다. \`with\` 문을 사용하면 작업이 정상적으로 끝났을 때 커밋하고, 예외가 발생하면 롤백하는 흐름을 만들 수 있다.

\`\`\`python
import sqlite3

with sqlite3.connect("shop.db") as connection:
    cursor = connection.cursor()
    cursor.execute("""
    INSERT INTO customers (name, email, grade)
    VALUES (?, ?, ?)
    """, ("한서준", "seojun@example.com", "BASIC"))
\`\`\`

다만 \`with sqlite3.connect(...) as connection:\`을 사용해도 연결이 완전히 자동으로 닫히는 것까지 대신해주는 방식으로 이해하면 곤란하다. 실무에서는 명시적으로 \`close()\`를 호출하거나, 연결을 관리하는 함수를 따로 만드는 방식도 많이 사용한다.

간단한 학습 코드에서는 다음처럼 \`try-finally\`를 사용해도 좋다.

\`\`\`python
import sqlite3

connection = sqlite3.connect("shop.db")
try:
    cursor = connection.cursor()
    cursor.execute("SELECT COUNT(*) FROM customers")
    count = cursor.fetchone()[0]
    print(count)
finally:
    connection.close()
\`\`\`

---
`;export{e as default};