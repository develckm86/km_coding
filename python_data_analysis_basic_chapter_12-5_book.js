var e=`<!-- 원본: python_data_analysis_basic_chapter_12_book.md / 세부 장: 12-5 -->

# 12.5 문자열 포함 여부 확인

특정 문자열이 포함되어 있는지 확인할 때는 \`str.contains()\`를 사용합니다.

예를 들어 이메일 주소가 \`example.com\` 도메인인지 확인해봅시다.

\`\`\`python
customers["email_clean"] = customers["email"].str.strip().str.lower()

customers["email_clean"].str.contains("example.com", na=False)
\`\`\`

결과는 \`True\`와 \`False\`로 이루어진 Series입니다.

\`\`\`text
True
True
True
False
True
False
\`\`\`

이 결과를 필터링에 사용할 수 있습니다.

\`\`\`python
example_customers = customers[
    customers["email_clean"].str.contains("example.com", na=False)
]

example_customers
\`\`\`

---

### 12.5.1 \`na=False\`가 필요한 이유

문자열 컬럼에 결측치가 있으면 \`contains()\` 결과에도 결측치가 포함될 수 있습니다.

\`\`\`python
customers["email_clean"].str.contains("example.com")
\`\`\`

이 결과를 그대로 필터링에 사용하면 오류가 발생하거나 의도와 다르게 동작할 수 있습니다.

따라서 결측치는 \`False\`로 처리하는 것이 안전합니다.

\`\`\`python
customers["email_clean"].str.contains("example.com", na=False)
\`\`\`

실무에서는 \`str.contains()\`를 사용할 때 \`na=False\`를 함께 쓰는 습관이 좋습니다.

---

### 12.5.2 대소문자 구분하지 않고 찾기

기본적으로 \`str.contains()\`는 대소문자를 구분합니다.  
대소문자를 구분하지 않으려면 \`case=False\`를 사용할 수 있습니다.

\`\`\`python
customers["email"].str.contains("example.com", case=False, na=False)
\`\`\`

또는 먼저 소문자로 통일한 뒤 검색할 수도 있습니다.

\`\`\`python
customers["email_clean"] = customers["email"].str.strip().str.lower()
customers["email_clean"].str.contains("example.com", na=False)
\`\`\`

데이터 클리닝에서는 보통 먼저 표준화한 컬럼을 만든 뒤 검색하는 방식이 안정적입니다.

---

### 12.5.3 시작과 끝 확인

문자열이 특정 값으로 시작하는지 확인하려면 \`str.startswith()\`를 사용합니다.

\`\`\`python
customers["phone"].str.startswith("010", na=False)
\`\`\`

문자열이 특정 값으로 끝나는지 확인하려면 \`str.endswith()\`를 사용합니다.

\`\`\`python
customers["email_clean"].str.endswith(".com", na=False)
\`\`\`

실무 예시는 다음과 같습니다.

- 휴대폰 번호가 \`010\`으로 시작하는지 확인
- 파일명이 \`.csv\`로 끝나는지 확인
- 상품 코드가 특정 접두어로 시작하는지 확인
- 이메일이 특정 도메인으로 끝나는지 확인

---
`;export{e as default};