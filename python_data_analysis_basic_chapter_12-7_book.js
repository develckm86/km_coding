var e=`<!-- 원본: python_data_analysis_basic_chapter_12_book.md / 세부 장: 12-7 -->

# 12.7 문자열 분리

문자열 안에 여러 정보가 구분자로 묶여 있는 경우가 많습니다.

예를 들어 이메일은 \`@\`를 기준으로 아이디와 도메인으로 나눌 수 있습니다.

\`\`\`text
minsu@example.com
\`\`\`

상품 태그도 \`|\`를 기준으로 대분류와 소분류로 나눌 수 있습니다.

\`\`\`text
전자기기|키보드
\`\`\`

이럴 때는 \`str.split()\`을 사용합니다.

---

### 12.7.1 기본 분리

이메일을 \`@\` 기준으로 나누어보겠습니다.

\`\`\`python
customers["email_clean"] = customers["email"].str.strip().str.lower()

customers["email_clean"].str.split("@")
\`\`\`

결과는 각 행마다 리스트 형태로 나옵니다.

\`\`\`text
["minu", "example.com"]
["jiyoung", "example.com"]
...
\`\`\`

---

### 12.7.2 분리 결과를 여러 컬럼으로 만들기

분리 결과를 여러 컬럼으로 만들려면 \`expand=True\`를 사용합니다.

\`\`\`python
email_parts = customers["email_clean"].str.split("@", expand=True)

email_parts
\`\`\`

결과는 DataFrame으로 반환됩니다.

이제 컬럼명을 지정할 수 있습니다.

\`\`\`python
customers[["email_id", "email_domain"]] = customers["email_clean"].str.split("@", expand=True)

customers[["email_clean", "email_id", "email_domain"]]
\`\`\`

이메일 도메인 분석에서 자주 사용하는 패턴입니다.

---

### 12.7.3 분리 개수 제한하기

문자열에 구분자가 여러 번 등장할 수 있습니다.  
이때 \`n\`을 사용해 몇 번만 나눌지 지정할 수 있습니다.

\`\`\`python
codes = pd.Series(["A-B-C", "D-E-F", "G-H-I"])

codes.str.split("-", n=1, expand=True)
\`\`\`

\`n=1\`은 첫 번째 구분자에서만 나누겠다는 의미입니다.

결과는 다음과 같습니다.

\`\`\`text
A | B-C
D | E-F
G | H-I
\`\`\`

---

### 12.7.4 오른쪽부터 분리하기

오른쪽부터 분리하려면 \`str.rsplit()\`을 사용합니다.

\`\`\`python
file_names = pd.Series(["sales_2026_01.csv", "sales_2026_02.csv"])

file_names.str.rsplit("_", n=1, expand=True)
\`\`\`

파일명처럼 뒤쪽 정보가 중요할 때 유용합니다.

---

### 12.7.5 상품 태그 분리하기

상품 데이터의 \`tag\` 컬럼을 분리해봅시다.

\`\`\`python
products[["main_category", "sub_category"]] = products["tag"].str.split("|", expand=True)

products[["tag", "main_category", "sub_category"]]
\`\`\`

이제 대분류와 소분류를 따로 분석할 수 있습니다.

예를 들어 대분류별 상품 수를 계산할 수 있습니다.

\`\`\`python
products["main_category"].value_counts()
\`\`\`

---
`;export{e as default};