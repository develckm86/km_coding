var e=`<!-- 원본: python_advanced_chapter_15_book.md / 세부 장: 15-18 -->

# 15.18 데이터분석 과정과의 연결

이 장에서 배운 데이터베이스 기초는 이후 데이터분석 과정과 직접 연결된다.

## SQL과 pandas의 관계

SQL과 pandas는 서로 경쟁하는 도구라기보다, 함께 사용하는 도구에 가깝다.

SQL은 데이터베이스에서 필요한 데이터를 조회하는 데 강하다.

\`\`\`sql
SELECT customer_id, SUM(amount) AS total_amount
FROM orders
WHERE status = 'paid'
GROUP BY customer_id;
\`\`\`

pandas는 가져온 데이터를 더 세밀하게 정리하고 분석하는 데 강하다.

\`\`\`python
summary = df.groupby("customer_id")["amount"].sum()
\`\`\`

데이터가 데이터베이스에 있다면 SQL로 필요한 데이터만 가져오고, pandas에서는 분석과 시각화에 집중하는 흐름이 좋다.

## 데이터분석 기초 과정에서 이어질 내용

이후 데이터분석 기초 과정에서는 다음 내용을 다루게 된다.

- CSV 파일을 pandas로 읽기
- SQLite에서 조회한 데이터를 DataFrame으로 만들기
- 결측치 처리
- 중복 제거
- 조건 필터링
- 그룹화와 집계
- 시각화 기초

이 장에서는 pandas를 깊게 사용하지 않는다. 대신 데이터베이스에서 분석 가능한 형태로 데이터를 준비하는 방법을 배웠다.

## 데이터분석 전에 스스로 확인할 질문

분석을 시작하기 전에 다음 질문을 던져보자.

\`\`\`text
데이터는 어디에 저장되어 있는가?
필요한 테이블은 무엇인가?
필요한 컬럼은 무엇인가?
분석 대상 기간은 언제부터 언제까지인가?
제외해야 할 상태값은 없는가?
중복 데이터는 어떻게 처리할 것인가?
숫자와 날짜 형식은 올바른가?
결과를 어떤 형태로 저장할 것인가?
\`\`\`

이 질문에 답할 수 있으면 데이터분석 준비가 훨씬 탄탄해진다.

---

# 15장 핵심 정리

- 데이터베이스는 데이터를 구조화해서 저장하고 필요한 데이터만 조회할 수 있게 해준다.
- 파일은 단순 저장에는 좋지만, 데이터가 커지고 관계가 생기면 관리가 어려워진다.
- SQLite는 파일 기반 데이터베이스이며 파이썬 표준 라이브러리 \`sqlite3\`로 사용할 수 있다.
- 테이블은 행과 열로 이루어져 있으며, 스키마는 테이블 구조를 정의한다.
- 기본 키는 각 행을 구분하는 고유한 값이다.
- SQL은 데이터베이스에 명령을 내리는 언어다.
- \`SELECT\`는 데이터를 조회할 때 사용한다.
- \`WHERE\`는 조건에 맞는 데이터만 조회할 때 사용한다.
- \`ORDER BY\`는 정렬, \`LIMIT\`은 개수 제한에 사용한다.
- \`INSERT\`는 추가, \`UPDATE\`는 수정, \`DELETE\`는 삭제에 사용한다.
- \`UPDATE\`와 \`DELETE\`를 사용할 때는 \`WHERE\` 조건을 반드시 주의해야 한다.
- 파이썬에서 SQLite를 사용할 때는 \`connect()\`, \`cursor()\`, \`execute()\`, \`fetchone()\`, \`fetchall()\`, \`commit()\`, \`close()\` 흐름을 이해해야 한다.
- 사용자 입력값은 SQL 문자열에 직접 붙이지 말고 파라미터 바인딩으로 전달해야 한다.
- 트랜잭션은 여러 데이터베이스 작업을 하나의 단위로 묶어 모두 성공하거나 모두 취소되게 하는 개념이다.
- API나 CSV 데이터를 SQLite에 저장하면 중복 관리, 조건 조회, 분석용 데이터 추출이 쉬워진다.
- 데이터분석 과정에서는 SQL로 필요한 데이터를 가져오고 pandas로 분석하는 흐름을 자주 사용한다.

---

# 연습문제

## 문제 1. 개념 확인

다음 중 데이터베이스를 사용하는 이유로 가장 적절하지 않은 것은 무엇인가?

A. 조건에 맞는 데이터를 조회하기 위해  
B. 여러 테이블의 데이터를 연결하기 위해  
C. 중복 데이터를 더 많이 만들기 위해  
D. 데이터를 구조화해서 저장하기 위해  

## 문제 2. 용어 확인

다음 설명에 해당하는 용어를 쓰시오.

\`\`\`text
테이블에서 각 행을 고유하게 구분하는 값이다.
보통 id 컬럼으로 사용한다.
\`\`\`

## 문제 3. SQL 작성

\`orders\` 테이블에서 \`status\`가 \`paid\`인 주문만 조회하는 SQL을 작성하시오.

## 문제 4. SQL 작성

\`orders\` 테이블에서 주문 금액이 큰 순서대로 상위 5개만 조회하는 SQL을 작성하시오.

## 문제 5. 위험한 SQL 찾기

다음 SQL의 문제점을 설명하시오.

\`\`\`sql
UPDATE customers
SET grade = 'VIP';
\`\`\`

## 문제 6. 파이썬 코드 빈칸 채우기

다음 코드의 빈칸을 채우시오.

\`\`\`python
import sqlite3

connection = sqlite3.connect("shop.db")
cursor = connection.cursor()

cursor.execute("SELECT name, email FROM customers")
rows = cursor.__________()

for row in rows:
    print(row)

connection.close()
\`\`\`

## 문제 7. 파라미터 바인딩

다음 코드는 문자열 포매팅으로 SQL을 만들고 있다. 안전한 파라미터 바인딩 방식으로 고치시오.

\`\`\`python
email = "minsu@example.com"
sql = f"SELECT * FROM customers WHERE email = '{email}'"
cursor.execute(sql)
\`\`\`

## 문제 8. 튜플 주의점

다음 코드가 잘못된 이유를 설명하시오.

\`\`\`python
email = "minsu@example.com"

cursor.execute("""
SELECT *
FROM customers
WHERE email = ?
""", (email))
\`\`\`

## 문제 9. 트랜잭션

다음 중 \`rollback()\`이 필요한 상황으로 가장 적절한 것은 무엇인가?

A. 조회 결과가 0건인 경우  
B. 여러 데이터 변경 작업 중 하나가 실패한 경우  
C. \`SELECT\` 결과를 출력한 경우  
D. 데이터베이스 연결을 처음 만든 경우  

## 문제 10. 코드 작성

\`orders\` 테이블에 주문 데이터를 저장하는 함수를 작성하시오. 함수 이름은 \`save_order\`로 하고, \`order_id\`, \`customer_id\`, \`amount\`, \`status\`, \`ordered_at\`을 매개변수로 받는다. 값은 파라미터 바인딩으로 전달해야 한다.

---

# 정답 및 해설

## 문제 1 정답

정답: C

데이터베이스는 중복을 더 많이 만들기 위한 도구가 아니다. 오히려 데이터를 구조화하고 중복을 줄이며, 필요한 데이터를 안정적으로 조회하기 위해 사용한다.

## 문제 2 정답

정답: 기본 키 또는 Primary Key

기본 키는 테이블의 각 행을 고유하게 구분하는 값이다.

## 문제 3 정답

\`\`\`sql
SELECT *
FROM orders
WHERE status = 'paid';
\`\`\`

필요한 컬럼이 정해져 있다면 \`*\` 대신 컬럼명을 명시하는 것이 좋다.

## 문제 4 정답

\`\`\`sql
SELECT *
FROM orders
ORDER BY amount DESC
LIMIT 5;
\`\`\`

\`DESC\`는 내림차순이다. \`LIMIT 5\`는 결과를 5개로 제한한다.

## 문제 5 정답

\`WHERE\` 조건이 없기 때문에 모든 고객의 등급이 \`VIP\`로 바뀐다. 실무에서는 \`UPDATE\`를 실행하기 전에 \`SELECT\`로 수정 대상을 먼저 확인해야 한다.

## 문제 6 정답

\`\`\`python
rows = cursor.fetchall()
\`\`\`

\`fetchall()\`은 조회 결과 전체를 가져온다.

## 문제 7 정답

\`\`\`python
email = "minsu@example.com"

cursor.execute(
    "SELECT * FROM customers WHERE email = ?",
    (email,),
)
\`\`\`

사용자 입력값이나 외부 데이터는 SQL 문자열에 직접 붙이지 말고 파라미터로 전달해야 한다.

## 문제 8 정답

\`\`\`python
(email)
\`\`\`

위 코드는 튜플이 아니라 문자열이다. 값이 하나인 튜플을 만들려면 쉼표가 필요하다.

\`\`\`python
(email,)
\`\`\`

따라서 다음처럼 작성해야 한다.

\`\`\`python
cursor.execute("""
SELECT *
FROM customers
WHERE email = ?
""", (email,))
\`\`\`

## 문제 9 정답

정답: B

여러 데이터 변경 작업 중 하나가 실패하면 앞에서 실행한 변경 작업도 취소해야 할 수 있다. 이때 \`rollback()\`을 사용한다.

## 문제 10 정답 예시

\`\`\`python
import sqlite3
from pathlib import Path

DB_PATH = Path("shop.db")


def save_order(
    order_id: int,
    customer_id: int,
    amount: int,
    status: str,
    ordered_at: str,
) -> None:
    with sqlite3.connect(DB_PATH) as connection:
        cursor = connection.cursor()
        cursor.execute("""
        INSERT INTO orders (id, customer_id, amount, status, ordered_at)
        VALUES (?, ?, ?, ?, ?)
        """, (order_id, customer_id, amount, status, ordered_at))
\`\`\`

\`with sqlite3.connect(...)\`를 사용하면 블록이 정상적으로 끝났을 때 변경 내용이 커밋된다. 다만 더 복잡한 프로그램에서는 연결 닫기와 예외 처리 정책을 명확히 설계하는 것이 좋다.

---

# 실습 과제

## 과제 1. 고객 테이블 만들기

\`customers\` 테이블을 생성하는 파이썬 코드를 작성하시오.

조건:

- 데이터베이스 파일 이름은 \`practice.db\`
- 테이블 이름은 \`customers\`
- 컬럼은 \`id\`, \`name\`, \`email\`, \`grade\`
- \`id\`는 기본 키
- \`name\`과 \`email\`은 필수값
- \`email\`은 중복 불가

## 과제 2. 고객 데이터 저장하기

아래 고객 데이터를 \`customers\` 테이블에 저장하시오.

\`\`\`python
customers = [
    (1, "김민수", "minsu@example.com", "VIP"),
    (2, "이지영", "jiyoung@example.com", "GOLD"),
    (3, "박철수", "chulsoo@example.com", "BASIC"),
]
\`\`\`

조건:

- \`executemany()\`를 사용할 것
- 파라미터 바인딩을 사용할 것
- 저장 후 \`commit()\`을 실행할 것

## 과제 3. VIP 고객 조회하기

\`customers\` 테이블에서 등급이 \`VIP\`인 고객의 이름과 이메일만 조회하시오.

## 과제 4. 주문 테이블 만들기

\`orders\` 테이블을 생성하시오.

컬럼:

- \`id\`
- \`customer_id\`
- \`amount\`
- \`status\`
- \`ordered_at\`

## 과제 5. 분석용 CSV 만들기

\`orders\` 테이블에서 \`status\`가 \`paid\`인 주문만 조회하여 \`paid_orders.csv\`로 저장하는 코드를 작성하시오.

---

# 참고 자료

- Python 공식 문서: \`sqlite3\` — DB-API 2.0 interface for SQLite databases  
  https://docs.python.org/3/library/sqlite3.html
- SQLite 공식 문서: SQL As Understood By SQLite  
  https://sqlite.org/lang.html
- SQLite 공식 문서: INSERT  
  https://sqlite.org/lang_insert.html
`;export{e as default};