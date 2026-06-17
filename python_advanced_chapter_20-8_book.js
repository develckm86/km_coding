var e=`<!-- 원본: python_advanced_chapter_20_book.md / 세부 장: 20-8 -->

# 20.8 종합 실습 과제

이번 장의 과제는 단순 문제 풀이가 아니라 작은 프로그램을 완성하는 형태다. 모든 과제를 한 번에 완성하지 않아도 된다. 먼저 핵심 기능을 만들고, 그다음 예외 처리, 로깅, 테스트를 추가하는 방식으로 진행한다.

## 과제 1. CSV 데이터 검증 도구 완성하기

다음 조건을 만족하는 CSV 검증 도구를 작성하라.

\`\`\`text
입력:
- 주문 데이터 CSV 파일

필수 컬럼:
- order_id
- customer_id
- order_date
- amount

검증 규칙:
- 필수 컬럼이 모두 있어야 한다.
- 필수 컬럼 값은 비어 있으면 안 된다.
- amount는 숫자로 변환 가능해야 한다.

출력:
- 정상 행 CSV
- 실패 행 CSV
- 실패 행에는 errors 컬럼 추가
\`\`\`

추가 조건은 다음과 같다.

\`\`\`text
- 검증 함수는 파일 입출력과 분리한다.
- 처리 결과를 로그로 남긴다.
- validate_row 함수는 pytest로 테스트한다.
\`\`\`

## 과제 2. JSON Lines 저장 함수 만들기

다음 데이터를 JSON Lines 파일로 저장하는 함수를 작성하라.

\`\`\`python
items = [
    {"id": "P001", "name": "Keyboard", "price": 30000},
    {"id": "P002", "name": "Mouse", "price": 15000},
    {"id": "P003", "name": "Monitor", "price": 200000},
]
\`\`\`

요구사항은 다음과 같다.

\`\`\`text
- ensure_ascii=False를 사용한다.
- 한 줄에 하나의 JSON 객체를 저장한다.
- 저장한 건수를 반환한다.
- 출력 폴더가 없으면 생성한다.
\`\`\`

## 과제 3. 로그 파일에서 ERROR 추출하기

다음 형식의 로그에서 \`ERROR\` 행만 추출하라.

\`\`\`text
2026-01-01 10:00:01 INFO user_id=U001 action=login
2026-01-01 10:00:03 ERROR user_id=U002 code=E500 message="server error"
2026-01-01 10:00:08 ERROR user_id=U003 code=E404 message="not found"
\`\`\`

출력 CSV 컬럼은 다음과 같다.

\`\`\`text
timestamp,user_id,code,message
\`\`\`

추가 조건은 다음과 같다.

\`\`\`text
- 정규표현식을 사용한다.
- 큰 파일을 고려해서 한 줄씩 처리한다.
- 파싱 실패 행은 로그로 남긴다.
\`\`\`

## 과제 4. SQLite에 상품 데이터 저장하기

JSON Lines 파일에서 상품 데이터를 읽어 SQLite DB에 저장하라.

테이블 구조는 다음과 같다.

\`\`\`sql
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    collected_at TEXT NOT NULL
);
\`\`\`

요구사항은 다음과 같다.

\`\`\`text
- id가 중복되면 저장하지 않는다.
- 잘못된 데이터는 건너뛰고 로그로 남긴다.
- 저장 건수와 건너뛴 건수를 반환한다.
- DB 데이터를 분석용 CSV로 내보낸다.
\`\`\`

## 과제 5. 하나의 CLI로 묶기

다음 명령을 지원하는 CLI 프로그램을 작성하라.

\`\`\`bash
python -m data_tools.cli validate-csv data/raw/orders.csv
python -m data_tools.cli parse-log data/raw/app.log
python -m data_tools.cli import-db data/raw/products.jsonl
python -m data_tools.cli export-db data/processed/products.db
\`\`\`

요구사항은 다음과 같다.

\`\`\`text
- argparse subparser를 사용한다.
- --config 옵션을 제공한다.
- 로그 파일을 생성한다.
- 사용자에게 처리 결과를 출력한다.
\`\`\`

---
`;export{e as default};