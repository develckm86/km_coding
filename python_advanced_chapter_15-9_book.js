var e=`<!-- 원본: python_advanced_chapter_15_book.md / 세부 장: 15-9 -->

# 15.9 트랜잭션

## 트랜잭션이란 무엇인가

트랜잭션은 여러 데이터베이스 작업을 하나의 단위로 묶는 개념이다. 하나의 트랜잭션 안에 있는 작업들은 모두 성공하거나, 하나라도 실패하면 모두 취소되어야 한다.

예를 들어 주문 처리를 생각해보자.

\`\`\`text
1. 주문 생성
2. 결제 기록 저장
3. 재고 차감
\`\`\`

이 세 작업은 함께 성공해야 한다. 주문은 생성되었는데 결제 기록 저장이 실패하거나, 재고 차감만 실패하면 데이터가 이상해진다.

트랜잭션은 이런 상황에서 데이터의 일관성을 지켜준다.

## \`commit\`

데이터 변경 작업을 실제로 저장하려면 \`commit()\`이 필요하다.

\`\`\`python
connection = sqlite3.connect("shop.db")
cursor = connection.cursor()

cursor.execute("""
INSERT INTO customers (name, email, grade)
VALUES (?, ?, ?)
""", ("정다은", "daeun@example.com", "BASIC"))

connection.commit()
connection.close()
\`\`\`

\`commit()\`을 하지 않으면 변경 내용이 데이터베이스 파일에 저장되지 않을 수 있다.

## \`rollback\`

작업 중 에러가 발생했을 때 변경 내용을 되돌리려면 \`rollback()\`을 사용한다.

\`\`\`python
import sqlite3

connection = sqlite3.connect("shop.db")

try:
    cursor = connection.cursor()

    cursor.execute("""
    INSERT INTO customers (name, email, grade)
    VALUES (?, ?, ?)
    """, ("오하늘", "haneul@example.com", "BASIC"))

    cursor.execute("""
    INSERT INTO orders (customer_id, amount, status)
    VALUES (?, ?, ?)
    """, (9999, 25000, "paid"))

    connection.commit()

except sqlite3.Error as error:
    connection.rollback()
    print("데이터베이스 작업 실패:", error)

finally:
    connection.close()
\`\`\`

이 코드는 중간에 실패하면 앞에서 실행한 변경도 취소한다.

## 트랜잭션을 사용할 때의 사고방식

트랜잭션을 사용할 때는 다음 질문을 생각해보면 좋다.

\`\`\`text
이 작업들은 따로 성공해도 되는가?
아니면 모두 함께 성공해야 하는가?
\`\`\`

모두 함께 성공해야 한다면 하나의 트랜잭션으로 묶어야 한다.

## 데이터분석 전처리에서 트랜잭션이 필요한 경우

분석용 데이터를 수집할 때도 트랜잭션이 필요할 수 있다.

예를 들어 API에서 1000건의 데이터를 가져와 데이터베이스에 저장한다고 하자. 중간에 700건까지 저장하고 701번째에서 실패하면 어떻게 해야 할까?

상황에 따라 선택이 다르다.

첫 번째 방식은 전체를 실패로 보고 모두 취소하는 것이다.

\`\`\`text
1000건 중 하나라도 실패하면 전체 저장 취소
\`\`\`

두 번째 방식은 성공한 행은 저장하고 실패한 행만 따로 기록하는 것이다.

\`\`\`text
성공한 행 저장
실패한 행은 errors 테이블 또는 로그 파일에 기록
\`\`\`

어떤 방식이 맞는지는 업무 요구사항에 따라 다르다. 중요한 것은 의도적으로 선택해야 한다는 점이다.

---
`;export{e as default};