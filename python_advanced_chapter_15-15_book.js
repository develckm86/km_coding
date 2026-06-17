var e=`<!-- 원본: python_advanced_chapter_15_book.md / 세부 장: 15-15 -->

# 15.15 데이터베이스 코드 구조화

## 한 파일에 모든 코드를 쓰면 생기는 문제

처음에는 다음 코드처럼 한 파일에 모든 내용을 작성할 수 있다.

\`\`\`python
import sqlite3

connection = sqlite3.connect("shop.db")
cursor = connection.cursor()
cursor.execute("SELECT * FROM orders")
rows = cursor.fetchall()
print(rows)
connection.close()
\`\`\`

학습용으로는 괜찮다. 하지만 실무 코드에서는 다음 문제가 생긴다.

- 연결 코드가 반복된다.
- SQL이 여러 곳에 흩어진다.
- 예외 처리가 빠지기 쉽다.
- 테스트하기 어렵다.
- DB 파일 경로를 바꾸기 어렵다.
- 함수의 역할이 불분명해진다.

그래서 데이터베이스 관련 코드는 역할별로 분리하는 것이 좋다.

## 연결 함수 만들기

\`\`\`python
import sqlite3
from pathlib import Path

DB_PATH = Path("shop.db")


def connect_db() -> sqlite3.Connection:
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection
\`\`\`

이제 DB 연결이 필요할 때마다 \`connect_db()\`를 사용할 수 있다.

## Repository 클래스 만들기

Repository는 데이터베이스에 접근하는 코드를 모아두는 객체다.

\`\`\`python
import sqlite3
from pathlib import Path

DB_PATH = Path("shop.db")


class OrderRepository:
    def __init__(self, db_path: Path) -> None:
        self.db_path = db_path

    def get_paid_orders(self, min_amount: int = 0) -> list[dict]:
        with sqlite3.connect(self.db_path) as connection:
            connection.row_factory = sqlite3.Row
            cursor = connection.cursor()
            cursor.execute("""
            SELECT id, customer_id, amount, status, ordered_at
            FROM orders
            WHERE status = ?
              AND amount >= ?
            ORDER BY ordered_at
            """, ("paid", min_amount))
            return [dict(row) for row in cursor.fetchall()]

    def save_orders(self, orders: list[dict]) -> None:
        rows = [
            (
                order["id"],
                order["customer_id"],
                order["amount"],
                order["status"],
                order["ordered_at"],
            )
            for order in orders
        ]

        with sqlite3.connect(self.db_path) as connection:
            cursor = connection.cursor()
            cursor.executemany("""
            INSERT OR IGNORE INTO orders (id, customer_id, amount, status, ordered_at)
            VALUES (?, ?, ?, ?, ?)
            """, rows)
\`\`\`

사용 코드는 다음처럼 단순해진다.

\`\`\`python
repository = OrderRepository(Path("shop.db"))
orders = repository.get_paid_orders(min_amount=30000)

for order in orders:
    print(order)
\`\`\`

## 왜 구조화가 중요한가

데이터분석 전처리 코드는 처음에는 작게 시작하지만, 시간이 지나면 점점 커진다.

처음에는 CSV 하나를 읽는다. 그다음 API 데이터를 저장한다. 그다음 DB에서 조회한다. 그다음 실패한 데이터를 따로 기록한다. 그다음 날짜 기준으로 다시 수집한다. 이런 식으로 요구사항이 늘어난다.

처음부터 완벽한 구조를 만들 필요는 없다. 하지만 최소한 다음 정도는 분리하는 것이 좋다.

\`\`\`text
데이터 수집 코드
데이터 검증 코드
데이터 저장 코드
데이터 조회 코드
분석용 내보내기 코드
\`\`\`

이 구조가 있으면 이후 데이터분석 수업에서 pandas 분석 코드와 수집·저장 코드를 분리하기 쉬워진다.

---
`;export{e as default};