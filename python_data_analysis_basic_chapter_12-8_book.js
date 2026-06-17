var e=`<!-- 원본: python_data_analysis_basic_chapter_12_book.md / 세부 장: 12-8 -->

# 12.8 문자열 추출

문자열 안에서 특정 부분만 추출해야 할 때가 있습니다.

예를 들어 상품 코드가 다음과 같은 구조라고 해봅시다.

\`\`\`text
ELEC-KEY-001
BOOK-PYT-101
LIFE-CUP-201
\`\`\`

이 코드에는 여러 정보가 들어 있습니다.

\`\`\`text
대분류 코드 - 상품 약어 - 번호
\`\`\`

이 중 대분류 코드만 추출하거나, 마지막 번호만 추출할 수 있습니다.

---

### 12.8.1 인덱싱과 슬라이싱으로 추출하기

문자열 길이와 위치가 일정하다면 \`str[]\`을 사용할 수 있습니다.

\`\`\`python
products["category_code"] = products["product_code"].str[:4]

products[["product_code", "category_code"]]
\`\`\`

이 코드는 앞의 4글자를 추출합니다.

\`\`\`text
ELEC
BOOK
LIFE
\`\`\`

특정 위치의 문자만 가져올 수도 있습니다.

\`\`\`python
products["product_code"].str[0]
\`\`\`

문자열 위치가 일정한 코드 데이터에서는 슬라이싱이 간단하고 빠릅니다.

---

### 12.8.2 \`split()\`으로 추출하기

상품 코드가 하이픈으로 구분되어 있으므로 \`split()\`을 사용할 수도 있습니다.

\`\`\`python
code_parts = products["product_code"].str.split("-", expand=True)

code_parts
\`\`\`

컬럼명을 붙여보겠습니다.

\`\`\`python
products[["code_main", "code_item", "code_number"]] = products["product_code"].str.split("-", expand=True)

products[["product_code", "code_main", "code_item", "code_number"]]
\`\`\`

이 방식은 구분자가 명확할 때 이해하기 쉽습니다.

---

### 12.8.3 정규표현식으로 추출하기: \`str.extract()\`

정규표현식을 사용하면 더 유연하게 문자열 일부를 추출할 수 있습니다.

상품 코드에서 마지막 숫자만 추출해봅시다.

\`\`\`python
products["code_number_regex"] = products["product_code"].str.extract(r"(\\d+)$")

products[["product_code", "code_number_regex"]]
\`\`\`

여기서 \`(\\d+)$\`의 의미는 다음과 같습니다.

| 패턴 | 의미 |
|---|---|
| \`\\d\` | 숫자 |
| \`+\` | 하나 이상 |
| \`$\` | 문자열의 끝 |
| \`()\` | 추출할 그룹 |

즉, 문자열 끝에 있는 숫자 묶음을 추출합니다.

---

### 12.8.4 여러 그룹 추출하기

상품 코드 전체를 정규표현식으로 나누어 추출할 수도 있습니다.

\`\`\`python
extracted = products["product_code"].str.extract(r"([A-Z]+)-([A-Z]+)-(\\d+)")

extracted
\`\`\`

결과는 세 개의 컬럼을 가진 DataFrame입니다.

컬럼명을 지정해보겠습니다.

\`\`\`python
products[["main_code", "item_code", "number_code"]] = products["product_code"].str.extract(
    r"([A-Z]+)-([A-Z]+)-(\\d+)"
)

products[["product_code", "main_code", "item_code", "number_code"]]
\`\`\`

정규표현식 추출은 코드, 전화번호, 이메일, 날짜, 로그 메시지 등에서 매우 유용합니다.

---
`;export{e as default};