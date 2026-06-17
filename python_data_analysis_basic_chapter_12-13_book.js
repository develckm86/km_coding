var e=`<!-- 원본: python_data_analysis_basic_chapter_12_book.md / 세부 장: 12-13 -->

# 12.13 실무 예제 2: 전화번호 형식 통일

전화번호는 형식이 다양하게 들어오는 대표적인 문자열 데이터입니다.

\`\`\`python
customers[["customer_id", "phone"]]
\`\`\`

먼저 숫자가 아닌 문자를 제거합니다.

\`\`\`python
customers["phone_digits"] = (
    customers["phone"]
    .str.replace(r"[^0-9]", "", regex=True)
    .replace("", pd.NA)
)

customers[["phone", "phone_digits"]]
\`\`\`

이제 휴대폰 번호인지 확인합니다.

\`\`\`python
customers["is_mobile"] = customers["phone_digits"].str.match(r"^010\\d{8}$", na=False)

customers[["phone_digits", "is_mobile"]]
\`\`\`

11자리 휴대폰 번호를 다시 하이픈 형식으로 바꿀 수도 있습니다.

\`\`\`python
customers["phone_formatted"] = customers["phone_digits"].str.replace(
    r"^(010)(\\d{4})(\\d{4})$",
    r"\\1-\\2-\\3",
    regex=True
)

customers[["phone_digits", "phone_formatted"]]
\`\`\`

여기서 \`\\1\`, \`\\2\`, \`\\3\`은 정규표현식에서 추출한 그룹을 의미합니다.

\`\`\`text
01012345678 → 010-1234-5678
\`\`\`

단, 일반 전화번호나 길이가 다른 번호는 이 패턴에 맞지 않을 수 있습니다.  
따라서 전화번호 형식 통일은 데이터의 종류를 확인하면서 처리해야 합니다.

---
`;export{e as default};