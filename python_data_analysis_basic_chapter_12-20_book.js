var e=`<!-- 원본: python_data_analysis_basic_chapter_12_book.md / 세부 장: 12-20 -->

# 12.20 정답 및 해설

### 문제 1 정답

정답: C

pandas Series의 문자열 값 전체에 문자열 메서드를 적용할 때는 \`.str\` 접근자를 사용합니다.

\`\`\`python
df["name"].str.strip()
\`\`\`

---

### 문제 2 정답

\`\`\`python
df["name_clean"] = df["name"].str.strip()
\`\`\`

\`strip()\`은 문자열 앞뒤의 공백을 제거합니다.

---

### 문제 3 정답

\`\`\`python
df["email_clean"] = df["email"].str.strip().str.lower()
\`\`\`

먼저 \`strip()\`으로 앞뒤 공백을 제거하고, \`lower()\`로 소문자로 변환합니다.

---

### 문제 4 정답

\`\`\`python
df["phone_clean"] = df["phone"].str.replace("-", "", regex=False)
\`\`\`

하이픈을 일반 문자열로 치환하므로 \`regex=False\`를 지정합니다.

---

### 문제 5 정답

\`\`\`python
df["phone_digits"] = df["phone"].str.replace(r"[^0-9]", "", regex=True)
\`\`\`

\`[^0-9]\`는 숫자가 아닌 문자를 의미합니다.  
이 문자를 빈 문자열로 바꾸면 숫자만 남습니다.

---

### 문제 6 정답

\`\`\`python
df[["email_id", "email_domain"]] = df["email"].str.split("@", expand=True)
\`\`\`

\`expand=True\`를 사용하면 분리된 결과가 여러 컬럼으로 반환됩니다.

---

### 문제 7 정답

방법 1: \`split()\` 사용

\`\`\`python
df["main_code"] = df["product_code"].str.split("-", expand=True)[0]
\`\`\`

방법 2: 슬라이싱 사용

\`\`\`python
df["main_code"] = df["product_code"].str[:4]
\`\`\`

상품 코드의 앞 4글자가 항상 대분류 코드라면 슬라이싱도 가능합니다.  
하이픈 기준 구조를 더 명확히 사용하려면 \`split()\`이 좋습니다.

---

### 문제 8 정답

\`\`\`python
df["price"] = (
    df["price_text"]
    .str.replace(r"[^0-9]", "", regex=True)
    .astype(int)
)
\`\`\`

숫자가 아닌 문자를 제거한 뒤 정수형으로 변환합니다.

---

### 문제 9 정답

\`na=False\`는 결측치에 대해 \`False\`로 처리하겠다는 의미입니다.

문자열 컬럼에 결측치가 있을 때 \`str.contains()\` 결과에도 결측치가 생길 수 있습니다.  
이 결과를 필터링에 사용하면 문제가 생길 수 있으므로, 결측치는 조건을 만족하지 않는 것으로 보고 \`False\` 처리하는 것이 안전합니다.

---

### 문제 10 정답

\`\`\`python
customers["name_clean"] = customers["name"].str.strip()

customers["email_clean"] = customers["email"].str.strip().str.lower()

customers[["email_id", "email_domain"]] = customers["email_clean"].str.split("@", expand=True)

customers["phone_digits"] = customers["phone"].str.replace(r"[^0-9]", "", regex=True)

customers["is_mobile"] = customers["phone_digits"].str.match(r"^010\\d{8}$", na=False)

customers
\`\`\`

처리 과정은 다음과 같습니다.

1. 이름의 앞뒤 공백을 제거합니다.
2. 이메일의 앞뒤 공백을 제거하고 소문자로 변환합니다.
3. 이메일을 \`@\` 기준으로 나누어 아이디와 도메인을 만듭니다.
4. 전화번호에서 숫자가 아닌 문자를 제거합니다.
5. \`010\`으로 시작하는 11자리 숫자인지 검사합니다.

---
`;export{e as default};