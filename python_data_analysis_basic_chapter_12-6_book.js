var e=`<!-- 원본: python_data_analysis_basic_chapter_12_book.md / 세부 장: 12-6 -->

# 12.6 문자열 치환

문자열에서 특정 문자를 제거하거나 다른 값으로 바꿀 때는 \`str.replace()\`를 사용합니다.

---

### 12.6.1 단순 문자열 치환

전화번호에서 하이픈을 제거해봅시다.

\`\`\`python
customers["phone_no_hyphen"] = customers["phone"].str.replace("-", "", regex=False)

customers[["phone", "phone_no_hyphen"]]
\`\`\`

\`regex=False\`는 \`"-"\`를 정규표현식이 아니라 일반 문자열로 처리하겠다는 의미입니다.  
단순한 문자열 치환에서는 \`regex=False\`를 명시하는 것이 좋습니다.

---

### 12.6.2 여러 구분자 제거하기

전화번호에는 하이픈뿐 아니라 공백, 점도 들어 있습니다.

\`\`\`text
010-1234-5678
010 2222 3333
010.4444.5555
01012345678
\`\`\`

이런 여러 구분자를 한 번에 제거하려면 정규표현식을 사용할 수 있습니다.

\`\`\`python
customers["phone_digits"] = (
    customers["phone"]
    .str.replace(r"[-.\\s]", "", regex=True)
)

customers[["phone", "phone_digits"]]
\`\`\`

여기서 \`[-.\\s]\`는 하이픈, 점, 공백 중 하나를 의미합니다.

주의할 점은 점 \`.\`이 정규표현식에서 특별한 의미를 가지므로, 문자 그대로 사용하려면 조심해야 한다는 점입니다.  
위 코드처럼 문자 클래스 \`[]\` 안에서는 점을 비교적 간단하게 사용할 수 있습니다.

---

### 12.6.3 금액 문자열에서 숫자만 남기기

상품 가격 데이터는 다음처럼 문자열로 들어오는 경우가 많습니다.

\`\`\`python
products["price_text"]
\`\`\`

\`\`\`text
30,000원
45,000원
25,000원
\`\`\`

분석을 하려면 숫자로 변환해야 합니다.  
먼저 쉼표와 원 표시를 제거합니다.

\`\`\`python
products["price_number"] = (
    products["price_text"]
    .str.replace(",", "", regex=False)
    .str.replace("원", "", regex=False)
    .astype(int)
)

products[["price_text", "price_number"]]
\`\`\`

또는 숫자가 아닌 문자를 모두 제거할 수도 있습니다.

\`\`\`python
products["price_number_2"] = (
    products["price_text"]
    .str.replace(r"[^0-9]", "", regex=True)
    .astype(int)
)
\`\`\`

여기서 \`[^0-9]\`는 숫자가 아닌 문자를 의미합니다.  
즉, 숫자가 아닌 모든 문자를 빈 문자열로 바꿉니다.

---

### 12.6.4 값 전체를 바꾸는 \`replace()\`와의 차이

pandas에는 \`Series.replace()\`도 있습니다.  
이것은 문자열 일부가 아니라 값 전체를 바꿀 때 주로 사용합니다.

\`\`\`python
regions = pd.Series(["서울시", "서울특별시", "부산광역시"])

regions.replace({
    "서울시": "서울",
    "서울특별시": "서울",
    "부산광역시": "부산"
})
\`\`\`

반면 \`str.replace()\`는 문자열 내부 일부를 바꿀 때 사용합니다.

\`\`\`python
regions.str.replace("특별시", "", regex=False)
\`\`\`

정리하면 다음과 같습니다.

| 목적 | 사용 메서드 |
|---|---|
| 값 전체를 특정 값으로 바꾸기 | \`replace()\` |
| 문자열 내부 일부를 바꾸기 | \`str.replace()\` |

---
`;export{e as default};