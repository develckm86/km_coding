var e=`<!-- 원본: python_data_analysis_basic_chapter_12_book.md / 세부 장: 12-10 -->

# 12.10 문자열 조건 필터링

문자열 메서드는 필터링과 자주 함께 사용됩니다.

---

### 12.10.1 특정 도메인 고객 찾기

\`\`\`python
customers["email_clean"] = customers["email"].str.strip().str.lower()

example_customers = customers[
    customers["email_clean"].str.endswith("example.com", na=False)
]

example_customers
\`\`\`

\`example.com\` 도메인을 사용하는 고객만 추출합니다.

---

### 12.10.2 서울 고객 찾기

주소에 서울이 포함된 고객을 찾습니다.

\`\`\`python
seoul_customers = customers[
    customers["address"].str.contains("서울", na=False)
]

seoul_customers
\`\`\`

주소 표기가 \`"서울특별시"\` 또는 \`"서울시"\`처럼 다를 수 있으므로, 포함 여부로 찾는 것이 유용합니다.

---

### 12.10.3 휴대폰 번호가 있는 고객 찾기

먼저 전화번호를 숫자만 남긴 형태로 정리합니다.

\`\`\`python
customers["phone_digits"] = (
    customers["phone"]
    .str.replace(r"[^0-9]", "", regex=True)
    .replace("", pd.NA)
)
\`\`\`

휴대폰 번호 형식인 고객만 선택합니다.

\`\`\`python
mobile_customers = customers[
    customers["phone_digits"].str.match(r"^010\\d{8}$", na=False)
]

mobile_customers
\`\`\`

---

### 12.10.4 특정 상품 코드 찾기

상품 코드가 \`BOOK\`으로 시작하는 상품을 찾습니다.

\`\`\`python
book_products = products[
    products["product_code"].str.startswith("BOOK", na=False)
]

book_products
\`\`\`

또는 코드 분리 후 대분류 코드로 필터링할 수 있습니다.

\`\`\`python
products["main_code"] = products["product_code"].str.split("-", expand=True)[0]

products[products["main_code"] == "BOOK"]
\`\`\`

문자열 조건 필터링은 데이터 선택과 필터링에서 배운 불리언 인덱싱과 함께 사용됩니다.

---
`;export{e as default};