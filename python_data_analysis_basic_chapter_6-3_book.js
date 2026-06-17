var e=`<!-- 원본: python_data_analysis_basic_chapter_6_book.md / 세부 장: 6-3 -->

# 6.3 컬럼 확인

DataFrame에서 컬럼은 분석할 변수에 해당한다. 고객 데이터라면 이름, 지역, 나이, 가입일 같은 컬럼이 있을 수 있고, 주문 데이터라면 주문번호, 상품명, 수량, 가격, 주문일 같은 컬럼이 있을 수 있다.

데이터 분석에서는 컬럼명을 정확히 아는 것이 중요하다. 컬럼명을 잘못 입력하면 에러가 발생하거나 엉뚱한 데이터를 선택할 수 있다.

---

## 6.3.1 \`columns\`로 컬럼명 확인하기

DataFrame의 컬럼명은 \`columns\`로 확인한다.

\`\`\`python
orders.columns
\`\`\`

출력 결과는 다음과 비슷하다.

\`\`\`text
Index(['order_id', 'customer', 'region', 'category', 'quantity', 'price', 'order_date', 'payment'], dtype='object')
\`\`\`

컬럼명만 리스트로 보고 싶다면 다음처럼 변환할 수 있다.

\`\`\`python
list(orders.columns)
\`\`\`

---

## 6.3.2 컬럼명 확인 시 볼 것

컬럼명을 확인할 때는 다음을 살펴본다.

\`\`\`text
- 예상한 컬럼이 모두 있는가?
- 컬럼명이 너무 길거나 불명확하지 않은가?
- 컬럼명에 공백이 들어가 있지 않은가?
- 한글 컬럼명과 영어 컬럼명이 섞여 있지 않은가?
- 대소문자 표기가 일관적인가?
- 같은 의미의 컬럼명이 여러 방식으로 쓰이지 않았는가?
\`\`\`

예를 들어 다음과 같은 컬럼명은 이후 분석에서 불편할 수 있다.

\`\`\`text
주문 번호
Order Date
 product price 
고객명
\`\`\`

공백, 대소문자, 언어가 섞이면 코드를 작성할 때 실수하기 쉽다. 컬럼명 정리는 9장에서 본격적으로 다룬다.

---

## 6.3.3 특정 컬럼이 있는지 확인하기

특정 컬럼이 존재하는지 확인하려면 \`in\`을 사용한다.

\`\`\`python
"price" in orders.columns
\`\`\`

결과는 \`True\` 또는 \`False\`다.

여러 컬럼이 모두 있는지 확인할 때는 다음처럼 작성할 수 있다.

\`\`\`python
required_columns = ["order_id", "customer", "quantity", "price"]

for column in required_columns:
    print(column, column in orders.columns)
\`\`\`

실무에서는 분석에 반드시 필요한 컬럼이 누락되어 있는지 먼저 확인해야 한다.

---

## 6.3.4 인덱스 확인하기

컬럼과 함께 인덱스도 확인할 수 있다.

\`\`\`python
orders.index
\`\`\`

기본 DataFrame은 보통 0부터 시작하는 정수 인덱스를 가진다.

\`\`\`text
RangeIndex(start=0, stop=8, step=1)
\`\`\`

인덱스는 각 행을 식별하는 이름 또는 번호다. 데이터 분석 기초 단계에서는 기본 인덱스를 그대로 사용하는 경우가 많다. 나중에 날짜를 인덱스로 쓰거나, 특정 ID를 인덱스로 설정하는 경우도 있다.

---
`;export{e as default};