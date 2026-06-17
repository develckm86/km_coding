var e=`<!-- 원본: python_advanced_chapter_15_book.md / 세부 장: 15-13 -->

# 15.13 분석용 데이터 내보내기

## 데이터베이스에서 CSV로 저장하기

데이터분석 과정에서는 DB에서 조회한 데이터를 CSV로 저장한 뒤 pandas로 불러오는 흐름을 자주 사용한다.

\`\`\`text
SQLite 조회
    ↓
CSV 저장
    ↓
pandas로 분석
\`\`\`

다음 코드는 주문과 고객 정보를 연결한 결과를 CSV 파일로 저장한다.

\`\`\`python
import csv
import sqlite3
from pathlib import Path

DB_PATH = Path("shop.db")
OUTPUT_PATH = Path("orders_for_analysis.csv")


def export_orders_to_csv() -> None:
    with sqlite3.connect(DB_PATH) as connection:
        connection.row_factory = sqlite3.Row
        cursor = connection.cursor()

        cursor.execute("""
        SELECT
            o.id AS order_id,
            c.name AS customer_name,
            c.grade AS customer_grade,
            o.amount,
            o.status,
            o.ordered_at
        FROM orders AS o
        JOIN customers AS c ON o.customer_id = c.id
        ORDER BY o.ordered_at
        """)

        rows = cursor.fetchall()

    fieldnames = [
        "order_id",
        "customer_name",
        "customer_grade",
        "amount",
        "status",
        "ordered_at",
    ]

    with OUTPUT_PATH.open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows([dict(row) for row in rows])

    print(f"CSV 저장 완료: {OUTPUT_PATH}")


if __name__ == "__main__":
    export_orders_to_csv()
\`\`\`

## CSV로 내보낼 때 생각할 점

분석용 CSV를 만들 때는 다음을 확인해야 한다.

- 컬럼 이름이 명확한가?
- 날짜 형식이 일관적인가?
- 숫자 컬럼이 문자열로 저장되지 않았는가?
- 불필요한 컬럼이 너무 많지 않은가?
- 개인정보나 민감 정보가 포함되어 있지 않은가?
- 분석 기준에 맞는 행만 포함되어 있는가?

예를 들어 분석에 필요한 데이터가 결제 완료 주문뿐이라면 SQL에서 미리 필터링할 수 있다.

\`\`\`sql
SELECT
    o.id AS order_id,
    c.name AS customer_name,
    c.grade AS customer_grade,
    o.amount,
    o.ordered_at
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.id
WHERE o.status = 'paid'
ORDER BY o.ordered_at;
\`\`\`

데이터분석에서는 “무조건 전체 데이터를 가져온 뒤 pandas에서 처리”하는 방식만 있는 것이 아니다. 데이터베이스에서 미리 필요한 범위를 줄이고, pandas에서는 분석에 집중하는 방식도 중요하다.

---
`;export{e as default};