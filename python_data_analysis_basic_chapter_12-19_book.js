var e=`<!-- 원본: python_data_analysis_basic_chapter_12_book.md / 세부 장: 12-19 -->

# 12.19 연습문제

### 문제 1. 개념 확인

pandas Series의 문자열 값 전체에 문자열 메서드를 적용할 때 사용하는 접근자는 무엇인가요?

A. \`.text\`  
B. \`.string\`  
C. \`.str\`  
D. \`.char\`

---

### 문제 2. 코드 작성

다음 DataFrame에서 \`name\` 컬럼의 앞뒤 공백을 제거한 \`name_clean\` 컬럼을 만드세요.

\`\`\`python
df = pd.DataFrame({
    "name": [" 김민수", "이지영 ", " 박철수 "]
})
\`\`\`

---

### 문제 3. 코드 작성

다음 이메일 데이터를 소문자로 통일하고 앞뒤 공백을 제거하세요.

\`\`\`python
df = pd.DataFrame({
    "email": ["USER@example.com ", "ADMIN@TEST.COM", " guest@example.com"]
})
\`\`\`

---

### 문제 4. 코드 작성

다음 전화번호에서 하이픈을 제거하세요.  
단순 문자열 치환으로 처리하세요.

\`\`\`python
df = pd.DataFrame({
    "phone": ["010-1234-5678", "010-2222-3333"]
})
\`\`\`

---

### 문제 5. 코드 작성

다음 전화번호에서 숫자가 아닌 문자를 모두 제거하세요.

\`\`\`python
df = pd.DataFrame({
    "phone": ["010-1234-5678", "010 2222 3333", "010.4444.5555"]
})
\`\`\`

---

### 문제 6. 코드 작성

다음 이메일에서 아이디와 도메인을 분리하여 \`email_id\`, \`email_domain\` 컬럼을 만드세요.

\`\`\`python
df = pd.DataFrame({
    "email": ["minsu@example.com", "jiyoung@test.co.kr"]
})
\`\`\`

---

### 문제 7. 코드 작성

다음 상품 코드에서 앞의 대분류 코드만 추출하세요.

\`\`\`python
df = pd.DataFrame({
    "product_code": ["ELEC-KEY-001", "BOOK-PYT-101", "LIFE-CUP-201"]
})
\`\`\`

결과는 \`ELEC\`, \`BOOK\`, \`LIFE\`가 되어야 합니다.

---

### 문제 8. 코드 작성

다음 가격 문자열에서 숫자만 남기고 정수형으로 변환하세요.

\`\`\`python
df = pd.DataFrame({
    "price_text": ["30,000원", "45,000원", "12,000원"]
})
\`\`\`

---

### 문제 9. 개념 확인

\`str.contains("서울", na=False)\`에서 \`na=False\`의 의미를 설명하세요.

---

### 문제 10. 실무형 문제

다음 고객 데이터에서 연락처 데이터를 정리하세요.

처리 기준은 다음과 같습니다.

\`\`\`text
- name은 앞뒤 공백을 제거한다.
- email은 앞뒤 공백을 제거하고 소문자로 변환한다.
- email에서 도메인을 추출한다.
- phone은 숫자가 아닌 문자를 제거한다.
- phone이 010으로 시작하는 11자리 숫자인지 확인하는 is_mobile 컬럼을 만든다.
\`\`\`

\`\`\`python
customers = pd.DataFrame({
    "name": [" 김민수", "이지영 ", "박철수"],
    "email": ["MINU@example.com ", "JIYOUNG@test.com", "chulsoo@example.com"],
    "phone": ["010-1234-5678", "010 2222 3333", "02-123-4567"]
})
\`\`\`

---
`;export{e as default};