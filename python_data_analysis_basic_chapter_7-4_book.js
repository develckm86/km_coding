var e=`<!-- 원본: python_data_analysis_basic_chapter_7_book.md / 세부 장: 7-4 -->

# 7.4 문자열 조건 필터링

## 문자열 컬럼에서 조건 찾기

실무 데이터에는 문자열 컬럼이 많습니다.

- 고객명
- 지역
- 상품명
- 이메일
- 주소
- 상품 코드
- 주문 상태

문자열 데이터에서는 단순히 값이 같은지 비교하는 것뿐 아니라, 특정 단어가 포함되어 있는지, 특정 문자로 시작하는지, 특정 확장자로 끝나는지 확인해야 할 때가 많습니다.

pandas에서는 문자열 컬럼에 \`.str\`을 붙여 문자열 관련 기능을 사용할 수 있습니다.

---

## 특정 문자열 포함 여부: \`str.contains()\`

상품명에 \`마\`가 포함된 주문을 찾아보겠습니다.

\`\`\`python
orders[orders["product"].str.contains("마", na=False)]
\`\`\`

\`str.contains()\`는 문자열 안에 특정 값이 포함되어 있는지 확인합니다.

\`na=False\`는 결측치가 있을 때 그 값을 \`False\`로 처리하라는 의미입니다. 문자열 컬럼에 결측치가 있을 수 있다면 \`na=False\`를 넣는 것이 안전합니다.

---

## 특정 문자열로 시작하는지 확인하기: \`str.startswith()\`

고객명이 \`김\`으로 시작하는 행을 선택해 보겠습니다.

\`\`\`python
orders[orders["customer_name"].str.startswith("김", na=False)]
\`\`\`

이 코드는 고객명이 김으로 시작하는 행만 선택합니다.

---

## 특정 문자열로 끝나는지 확인하기: \`str.endswith()\`

상품명이 \`터\`로 끝나는 행을 선택해 보겠습니다.

\`\`\`python
orders[orders["product"].str.endswith("터", na=False)]
\`\`\`

파일명 데이터가 있다면 확장자를 확인할 때도 \`str.endswith()\`를 자주 사용합니다.

\`\`\`python
files = pd.DataFrame({
    "filename": ["sales.csv", "report.xlsx", "image.png", "memo.txt"]
})

files[files["filename"].str.endswith(".csv", na=False)]
\`\`\`

---

## 대소문자를 무시하고 검색하기

영문 데이터에서는 대소문자 문제가 자주 발생합니다.

\`\`\`python
emails = pd.DataFrame({
    "email": ["USER@EXAMPLE.COM", "admin@test.com", "manager@Example.com"]
})
\`\`\`

\`example\`이 포함된 이메일을 찾고 싶다면 다음처럼 작성할 수 있습니다.

\`\`\`python
emails[emails["email"].str.contains("example", case=False, na=False)]
\`\`\`

\`case=False\`는 대소문자를 구분하지 않겠다는 의미입니다.

---

## 문자열 조건 필터링 실무 예제

전자제품 중 상품명에 \`터\`가 들어가는 주문을 선택해 보겠습니다.

\`\`\`python
condition = (orders["category"] == "전자제품") & (orders["product"].str.contains("터", na=False))

orders[condition]
\`\`\`

이처럼 문자열 조건도 다른 조건과 함께 사용할 수 있습니다.

---
`;export{e as default};