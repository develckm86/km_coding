var e=`<!-- 원본: python_advanced_chapter_15_book.md / 세부 장: 15-16 -->

# 15.16 실무 예제: CSV 데이터를 SQLite에 저장하고 조회하기

## 목표

이번 실무 예제에서는 다음 작업을 수행한다.

\`\`\`text
1. CSV 파일을 읽는다.
2. 주문 데이터를 검증한다.
3. SQLite 데이터베이스에 저장한다.
4. 결제 완료 주문만 조회한다.
5. 분석용 CSV 파일로 내보낸다.
\`\`\`

## 입력 CSV 예시

\`orders.csv\` 파일을 다음과 같이 만든다.

\`\`\`csv
id,customer_id,amount,status,ordered_at
201,1,30000,paid,2026-06-13
202,2,18000,paid,2026-06-13
203,1,25000,canceled,2026-06-14
204,3,50000,paid,2026-06-15
\`\`\`

## 전체 코드

\`\`\`python
import csv
import sqlite3
from pathlib import Path

DB_PATH = Path("shop.db")
INPUT_CSV = Path("orders.csv")
OUTPUT_CSV = Path("paid_orders.csv")


class OrderDatabase:
    def __init__(self, db_path: Path) -> None:
        self.db_path = db_path

    def create_table(self) -> None:
        with sqlite3.connect(self.db_path) as connection:
            cursor = connection.cursor()
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY,
                customer_id INTEGER NOT NULL,
                amount INTEGER NOT NULL,
                status TEXT NOT NULL,
                ordered_at TEXT NOT NULL
            )
            """)

    def save_orders(self, orders: list[dict]) -> None:
        rows = [
            (
                int(order["id"]),
                int(order["customer_id"]),
                int(order["amount"]),
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

    def get_paid_orders(self) -> list[dict]:
        with sqlite3.connect(self.db_path) as connection:
            connection.row_factory = sqlite3.Row
            cursor = connection.cursor()
            cursor.execute("""
            SELECT id, customer_id, amount, status, ordered_at
            FROM orders
            WHERE status = ?
            ORDER BY ordered_at
            """, ("paid",))
            return [dict(row) for row in cursor.fetchall()]


def read_orders_from_csv(path: Path) -> list[dict]:
    with path.open("r", encoding="utf-8", newline="") as file:
        reader = csv.DictReader(file)
        return list(reader)


def is_valid_order(order: dict) -> bool:
    required_keys = {"id", "customer_id", "amount", "status", "ordered_at"}

    if not required_keys.issubset(order):
        return False

    if not order["id"].isdigit():
        return False

    if not order["customer_id"].isdigit():
        return False

    if not order["amount"].isdigit():
        return False

    if order["status"] not in {"paid", "canceled", "pending"}:
        return False

    if not order["ordered_at"]:
        return False

    return True


def write_orders_to_csv(path: Path, orders: list[dict]) -> None:
    fieldnames = ["id", "customer_id", "amount", "status", "ordered_at"]

    with path.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(orders)


def main() -> None:
    database = OrderDatabase(DB_PATH)
    database.create_table()

    orders = read_orders_from_csv(INPUT_CSV)
    valid_orders = [order for order in orders if is_valid_order(order)]

    database.save_orders(valid_orders)

    paid_orders = database.get_paid_orders()
    write_orders_to_csv(OUTPUT_CSV, paid_orders)

    print(f"입력 데이터 수: {len(orders)}")
    print(f"저장 데이터 수: {len(valid_orders)}")
    print(f"결제 완료 주문 수: {len(paid_orders)}")
    print(f"저장 파일: {OUTPUT_CSV}")


if __name__ == "__main__":
    main()
\`\`\`

## 코드의 흐름

이 코드는 다음 순서로 동작한다.

\`\`\`text
OrderDatabase 생성
      ↓
orders 테이블 생성
      ↓
CSV 파일 읽기
      ↓
주문 데이터 검증
      ↓
SQLite에 저장
      ↓
결제 완료 주문 조회
      ↓
CSV 파일로 내보내기
\`\`\`

## 이 예제가 중요한 이유

이 예제는 데이터분석 전 단계의 기본 구조를 보여준다.

분석은 보통 \`pandas.read_csv()\`로 시작하는 것처럼 보이지만, 그 전에 원천 데이터가 어떻게 수집되고 정리되고 저장되는지도 중요하다.

실무에서는 다음과 같은 질문을 먼저 해야 한다.

\`\`\`text
이 데이터는 어디에서 왔는가?
중복 저장되지는 않았는가?
필수 컬럼이 모두 있는가?
숫자 컬럼은 숫자로 변환 가능한가?
분석에 필요한 상태의 데이터만 추출했는가?
\`\`\`

이런 준비가 되어야 이후 분석 결과도 신뢰할 수 있다.

---
`;export{e as default};