var e=`<!-- 원본: python_data_analysis_basic_chapter_18_book.md / 세부 장: 18-4 -->

# 18.4 데이터 구조 확인

EDA의 첫 단계는 데이터 구조 확인입니다.

---

### 18.4.1 첫 행 확인

\`\`\`python
orders.head()
\`\`\`

\`head()\`는 데이터의 앞부분을 보여줍니다.

처음 데이터를 받으면 \`head()\`를 통해 다음을 확인합니다.

\`\`\`text
데이터가 제대로 불러와졌는가?
컬럼명이 예상과 맞는가?
값들이 어떤 형태로 들어 있는가?
숫자, 문자열, 날짜가 대략 어떻게 보이는가?
\`\`\`

---

### 18.4.2 행과 열 개수 확인

\`\`\`python
orders.shape
\`\`\`

예상 결과는 다음과 같습니다.

\`\`\`text
(15, 11)
\`\`\`

15행, 11열이라는 뜻입니다.

데이터 크기는 분석 신뢰도와 처리 방식에 영향을 줍니다.  
예제 데이터처럼 행 수가 적으면 패턴을 일반화하기 어렵습니다.

---

### 18.4.3 컬럼 확인

\`\`\`python
orders.columns
\`\`\`

컬럼 목록을 확인합니다.

\`\`\`text
order_id
customer_id
customer_name
region
grade
category
order_date
quantity
total_price
visit_count
satisfaction
\`\`\`

컬럼명을 보면 이 데이터로 어떤 분석을 할 수 있을지 감을 잡을 수 있습니다.

\`\`\`text
지역별 분석 가능
등급별 분석 가능
카테고리별 분석 가능
월별 분석 가능
주문 금액 분석 가능
방문 횟수와 주문 금액 관계 분석 가능
만족도 분석 가능
\`\`\`

---

### 18.4.4 자료형 확인

\`\`\`python
orders.info()
\`\`\`

\`order_date\`가 문자열로 들어와 있을 가능성이 큽니다.  
날짜 분석을 하려면 날짜형으로 변환해야 합니다.

\`\`\`python
orders["order_date"] = pd.to_datetime(orders["order_date"])
\`\`\`

변환 후 다시 자료형을 확인합니다.

\`\`\`python
orders.info()
\`\`\`

이제 \`order_date\`가 날짜형으로 변환되었습니다.

---

### 18.4.5 기본 통계 확인

\`\`\`python
orders.describe()
\`\`\`

수치형 컬럼의 기본 통계를 확인합니다.

EDA에서 \`describe()\`는 매우 중요한 출발점입니다.  
다음 값을 빠르게 확인할 수 있습니다.

\`\`\`text
평균
표준편차
최솟값
사분위수
최댓값
\`\`\`

특히 \`total_price\`, \`quantity\`, \`visit_count\`, \`satisfaction\`의 범위를 확인합니다.

---
`;export{e as default};