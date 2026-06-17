var e=`<!-- 원본: python_data_analysis_basic_chapter_12_book.md / 세부 장: 12-4 -->

# 12.4 대소문자 처리

영문 데이터에서는 대소문자 차이가 자주 문제가 됩니다.

예를 들어 이메일 주소는 대소문자가 섞여 들어올 수 있습니다.

\`\`\`python
customers["email"]
\`\`\`

분석이나 중복 확인을 위해서는 보통 소문자로 통일하는 것이 좋습니다.

---

### 12.4.1 소문자 변환: \`str.lower()\`

\`\`\`python
customers["email_clean"] = customers["email"].str.strip().str.lower()

customers[["email", "email_clean"]]
\`\`\`

위 코드에서는 두 작업을 이어서 수행했습니다.

1. \`str.strip()\`으로 앞뒤 공백 제거
2. \`str.lower()\`로 소문자 변환

메서드를 이어서 사용하는 방식을 메서드 체이닝이라고 합니다.

\`\`\`python
customers["email"].str.strip().str.lower()
\`\`\`

이메일, 사용자 ID, 코드값은 소문자로 통일하면 비교와 중복 확인이 쉬워집니다.

---

### 12.4.2 대문자 변환: \`str.upper()\`

상품 코드처럼 대문자로 통일하는 것이 좋은 데이터도 있습니다.

\`\`\`python
products["product_code_upper"] = products["product_code"].str.upper()

products[["product_code", "product_code_upper"]]
\`\`\`

상품 코드, 지역 코드, 부서 코드처럼 코드 체계가 있는 값은 대문자로 통일하는 경우가 많습니다.

---

### 12.4.3 단어 첫 글자 처리

문자열의 첫 글자나 단어별 첫 글자를 정리할 때는 다음 메서드를 사용할 수 있습니다.

\`\`\`python
names = pd.Series(["kim minsu", "lee jiyoung", "park chulsoo"])

names.str.capitalize()
\`\`\`

\`capitalize()\`는 문자열 전체에서 첫 글자만 대문자로 바꿉니다.

\`\`\`python
names.str.title()
\`\`\`

\`title()\`은 각 단어의 첫 글자를 대문자로 바꿉니다.

영문 이름, 상품명, 제목 데이터를 정리할 때 사용할 수 있습니다.  
다만 한국어 데이터에서는 대소문자 개념이 없으므로 자주 사용하지 않습니다.

---
`;export{e as default};