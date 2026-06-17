var e=`<!-- 원본: python_data_analysis_basic_chapter_13_book.md / 세부 장: 13-16 -->

# 13.16 연습문제

### 문제 1. 개념 확인

문자열로 들어온 날짜를 pandas 날짜형 데이터로 변환할 때 사용하는 함수는 무엇인가요?

A. \`pd.to_string()\`  
B. \`pd.to_datetime()\`  
C. \`pd.to_dateframe()\`  
D. \`pd.to_number()\`

---

### 문제 2. 코드 작성

다음 DataFrame에서 \`order_date\` 컬럼을 날짜형으로 변환한 \`order_date_dt\` 컬럼을 만드세요.

\`\`\`python
df = pd.DataFrame({
    "order_date": ["2026-01-01", "2026-01-05", "2026-01-10"]
})
\`\`\`

---

### 문제 3. 코드 작성

다음 데이터에서 잘못된 날짜는 \`NaT\`로 처리되도록 날짜형 변환을 하세요.

\`\`\`python
df = pd.DataFrame({
    "date": ["2026-01-01", "잘못된 날짜", "2026-01-03"]
})
\`\`\`

---

### 문제 4. 코드 작성

다음 데이터에서 날짜 컬럼으로부터 연도, 월, 일을 추출하세요.

\`\`\`python
df = pd.DataFrame({
    "date": ["2026-02-14", "2026-03-01"]
})

df["date"] = pd.to_datetime(df["date"])
\`\`\`

---

### 문제 5. 코드 작성

다음 주문 데이터에서 2026년 2월 주문만 선택하세요.

\`\`\`python
orders = pd.DataFrame({
    "order_date": ["2026-01-10", "2026-02-01", "2026-02-15", "2026-03-01"],
    "amount": [10000, 20000, 30000, 40000]
})

orders["order_date"] = pd.to_datetime(orders["order_date"])
\`\`\`

---

### 문제 6. 코드 작성

다음 데이터에서 주문일과 배송일의 차이를 일수로 계산한 \`delivery_days\` 컬럼을 만드세요.

\`\`\`python
orders = pd.DataFrame({
    "order_date": ["2026-01-01", "2026-01-05"],
    "ship_date": ["2026-01-03", "2026-01-10"]
})

orders["order_date"] = pd.to_datetime(orders["order_date"])
orders["ship_date"] = pd.to_datetime(orders["ship_date"])
\`\`\`

---

### 문제 7. 코드 작성

다음 데이터에서 월별 매출 합계를 계산하세요.

\`\`\`python
orders = pd.DataFrame({
    "order_date": ["2026-01-01", "2026-01-15", "2026-02-01", "2026-02-10"],
    "sales": [10000, 20000, 30000, 40000]
})

orders["order_date"] = pd.to_datetime(orders["order_date"])
\`\`\`

---

### 문제 8. 코드 작성

다음 데이터에서 요일 이름을 추출한 \`weekday\` 컬럼을 만드세요.

\`\`\`python
df = pd.DataFrame({
    "date": ["2026-01-01", "2026-01-02"]
})

df["date"] = pd.to_datetime(df["date"])
\`\`\`

---

### 문제 9. 개념 확인

여러 연도의 데이터가 있을 때 월별 매출을 분석할 때 단순히 \`dt.month\`만 사용하면 어떤 문제가 생길 수 있나요?

---

### 문제 10. 실무형 문제

다음 주문 데이터에서 날짜 분석 리포트를 만드세요.

처리 기준은 다음과 같습니다.

\`\`\`text
- order_date는 날짜형으로 변환한다.
- 변환할 수 없는 날짜는 NaT로 처리한다.
- 날짜가 유효한 주문만 사용한다.
- year_month 컬럼을 만든다.
- 월별 매출 합계를 계산한다.
- 기준일을 2026-03-31로 두고 최근 30일 주문을 추출한다.
\`\`\`

\`\`\`python
orders = pd.DataFrame({
    "order_id": [1, 2, 3, 4, 5],
    "order_date": ["2026-01-01", "2026-02-15", "2026-03-05", "잘못된 날짜", "2026-03-25"],
    "sales": [10000, 20000, 30000, 40000, 50000]
})
\`\`\`

---
`;export{e as default};