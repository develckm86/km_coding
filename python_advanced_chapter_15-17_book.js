var e=`<!-- 원본: python_advanced_chapter_15_book.md / 세부 장: 15-17 -->

# 15.17 데이터베이스 사용 시 주의할 점

## 1. SQL 문자열에 값을 직접 붙이지 않는다

값은 반드시 파라미터 바인딩으로 전달한다.

좋지 않은 예:

\`\`\`python
sql = f"SELECT * FROM customers WHERE email = '{email}'"
\`\`\`

좋은 예:

\`\`\`python
cursor.execute(
    "SELECT * FROM customers WHERE email = ?",
    (email,),
)
\`\`\`

## 2. \`UPDATE\`, \`DELETE\` 전에는 먼저 \`SELECT\` 한다

수정과 삭제는 되돌리기 어려울 수 있다. 실행 전에는 대상 데이터를 먼저 확인한다.

\`\`\`sql
SELECT *
FROM orders
WHERE status = 'canceled';
\`\`\`

확인 후 수정한다.

\`\`\`sql
UPDATE orders
SET status = 'archived'
WHERE status = 'canceled';
\`\`\`

## 3. 트랜잭션 단위를 의식한다

여러 작업이 함께 성공해야 한다면 하나의 트랜잭션으로 묶는다. 중간에 실패하면 \`rollback()\`으로 되돌린다.

## 4. 데이터 타입을 믿지 않는다

CSV나 API에서 온 데이터는 숫자처럼 보여도 문자열일 수 있다. 저장 전 검증과 변환이 필요하다.

\`\`\`python
amount = int(row["amount"])
\`\`\`

변환할 수 없는 값이 있을 수 있으므로 예외 처리도 고려해야 한다.

## 5. 민감 정보 저장에 주의한다

개인정보, 비밀번호, API 키, 토큰 같은 값은 데이터베이스에 함부로 저장하면 안 된다. 저장해야 한다면 암호화, 접근 권한, 보관 기간 같은 정책을 고려해야 한다.

이 수업에서는 보안 시스템을 깊게 다루지 않지만, 데이터베이스가 “중요한 데이터가 쌓이는 장소”라는 점은 반드시 기억해야 한다.

## 6. 분석용 데이터와 운영 데이터를 구분한다

운영 데이터베이스에 직접 무거운 분석 쿼리를 실행하면 서비스에 영향을 줄 수 있다. 실제 회사에서는 분석용 복제 DB, 데이터 웨어하우스, 추출 파일 등을 따로 사용하는 경우가 많다.

이 수업에서는 SQLite 파일로 연습하지만, 실무에서는 데이터가 어디에 있고 어떤 용도로 사용해도 되는지 확인해야 한다.

---
`;export{e as default};