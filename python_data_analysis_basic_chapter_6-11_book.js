var e=`<!-- 원본: python_data_analysis_basic_chapter_6_book.md / 세부 장: 6-11 -->

# 6.11 미니 실습

다음 고객 데이터를 사용해 기본 탐색을 연습해보자.

\`\`\`python
customers = pd.DataFrame({
    "customer_id": [1, 2, 3, 4, 5, 6],
    "name": ["김민수", "이지영", "박철수", "최유진", "정하늘", "오세훈"],
    "age": [28, 34, 45, 29, 38, 41],
    "region": ["서울", "부산", "서울", "대구", "부산", "제주"],
    "grade": ["VIP", "일반", "VIP", "일반", "일반", "VIP"],
    "join_date": ["2025-01-10", "2025-02-15", "2025-03-20", "2025-04-01", "2025-05-12", "2025-06-30"]
})
\`\`\`

다음 작업을 수행해보자.

\`\`\`text
1. 앞에서 3행을 확인한다.
2. 뒤에서 2행을 확인한다.
3. 데이터의 행과 열 개수를 확인한다.
4. 컬럼명을 확인한다.
5. 컬럼별 자료형을 확인한다.
6. 나이 컬럼의 요약 통계를 확인한다.
7. 지역별 고객 수를 확인한다.
8. 등급별 고객 비율을 확인한다.
\`\`\`

예시 코드:

\`\`\`python
customers.head(3)
customers.tail(2)
customers.shape
customers.columns
customers.dtypes
customers["age"].describe()
customers["region"].value_counts()
customers["grade"].value_counts(normalize=True) * 100
\`\`\`

---

# 6장 핵심 정리

- 데이터를 불러온 뒤에는 바로 분석하지 말고 먼저 구조를 확인해야 한다.
- \`head()\`는 앞부분, \`tail()\`은 뒷부분, \`sample()\`은 임의의 일부를 보여준다.
- \`shape\`는 DataFrame의 행 개수와 열 개수를 알려준다.
- \`columns\`는 컬럼명을 확인할 때 사용한다.
- \`dtypes\`는 각 컬럼의 자료형을 확인할 때 사용한다.
- \`info()\`는 행 개수, 컬럼, 결측치가 아닌 값 개수, 자료형, 메모리 정보를 요약해서 보여준다.
- \`describe()\`는 수치형 데이터의 기본 통계량을 보여준다.
- \`unique()\`는 고유값 목록을 보여준다.
- \`nunique()\`는 고유값 개수를 보여준다.
- \`value_counts()\`는 각 값의 등장 횟수를 보여준다.
- 데이터 탐색 결과는 코드로만 확인하지 말고 문장으로 정리하는 습관이 중요하다.

---

# 연습문제

## 문제 1

DataFrame의 앞부분 5행을 확인하는 메서드를 쓰시오.

---

## 문제 2

DataFrame의 행 개수와 열 개수를 확인할 때 사용하는 속성을 쓰시오.

---

## 문제 3

다음 코드의 실행 결과가 의미하는 것을 설명하시오.

\`\`\`python
df.shape
\`\`\`

실행 결과:

\`\`\`text
(1200, 15)
\`\`\`

---

## 문제 4

DataFrame의 컬럼명을 확인하는 코드를 작성하시오.

DataFrame 이름은 \`sales\`라고 가정한다.

---

## 문제 5

DataFrame의 각 컬럼 자료형을 확인하는 코드를 작성하시오.

DataFrame 이름은 \`sales\`라고 가정한다.

---

## 문제 6

\`info()\`를 사용했을 때 확인할 수 있는 내용으로 적절한 것을 모두 고르시오.

\`\`\`text
A. 컬럼 이름
B. 컬럼별 자료형
C. 비어 있지 않은 값의 개수
D. 모든 행의 전체 값
\`\`\`

---

## 문제 7

다음 중 \`describe()\`의 기본 결과에 포함되는 값이 아닌 것은?

\`\`\`text
A. 평균
B. 최솟값
C. 표준편차
D. 파일 경로
\`\`\`

---

## 문제 8

\`region\` 컬럼에 어떤 값들이 있는지 고유값 목록을 확인하는 코드를 작성하시오.

DataFrame 이름은 \`customers\`라고 가정한다.

---

## 문제 9

\`grade\` 컬럼의 값별 등장 횟수를 확인하는 코드를 작성하시오.

DataFrame 이름은 \`customers\`라고 가정한다.

---

## 문제 10

다음 코드에서 \`normalize=True\`의 의미를 설명하시오.

\`\`\`python
customers["grade"].value_counts(normalize=True)
\`\`\`

---

## 문제 11

다음 주문 데이터에서 총 주문 금액 컬럼 \`total_amount\`를 추가하고, 수치형 컬럼의 요약 통계를 확인하는 코드를 작성하시오.

\`\`\`python
orders = pd.DataFrame({
    "quantity": [1, 3, 2],
    "price": [10000, 20000, 15000]
})
\`\`\`

---

## 문제 12

데이터를 불러온 직후 기본 탐색 순서로 적절한 것을 5개 이상 쓰시오.

---

# 정답 및 해설

## 문제 1 정답

\`\`\`python
df.head()
\`\`\`

해설:

\`head()\`는 DataFrame의 앞부분을 확인하는 메서드다. 기본값은 앞에서 5행이다.

---

## 문제 2 정답

\`\`\`python
df.shape
\`\`\`

해설:

\`shape\`는 \`(행 개수, 열 개수)\` 형태의 튜플을 반환한다.

---

## 문제 3 정답

1200행 15열짜리 DataFrame이라는 의미다.

해설:

\`shape\`의 첫 번째 값은 행 개수, 두 번째 값은 열 개수다.

---

## 문제 4 정답

\`\`\`python
sales.columns
\`\`\`

해설:

\`columns\`는 DataFrame의 컬럼명을 확인하는 속성이다.

---

## 문제 5 정답

\`\`\`python
sales.dtypes
\`\`\`

해설:

\`dtypes\`는 각 컬럼의 자료형을 보여준다.

---

## 문제 6 정답

\`\`\`text
A, B, C
\`\`\`

해설:

\`info()\`는 컬럼명, 컬럼별 자료형, 비어 있지 않은 값의 개수 등을 보여준다. 모든 행의 전체 값을 출력하는 도구는 아니다.

---

## 문제 7 정답

\`\`\`text
D. 파일 경로
\`\`\`

해설:

\`describe()\`는 count, mean, std, min, 25%, 50%, 75%, max 같은 통계량을 보여준다. 파일 경로는 보여주지 않는다.

---

## 문제 8 정답

\`\`\`python
customers["region"].unique()
\`\`\`

해설:

\`unique()\`는 해당 컬럼에 들어 있는 고유값 목록을 반환한다.

---

## 문제 9 정답

\`\`\`python
customers["grade"].value_counts()
\`\`\`

해설:

\`value_counts()\`는 각 값이 몇 번 등장했는지 세어준다.

---

## 문제 10 정답

\`normalize=True\`는 등장 횟수 대신 각 값의 비율을 반환하라는 의미다.

해설:

예를 들어 VIP가 전체의 절반이라면 결과가 \`0.5\`로 나타난다. 퍼센트로 보고 싶으면 100을 곱하면 된다.

---

## 문제 11 정답

\`\`\`python
import pandas as pd

orders = pd.DataFrame({
    "quantity": [1, 3, 2],
    "price": [10000, 20000, 15000]
})

orders["total_amount"] = orders["quantity"] * orders["price"]
orders.describe()
\`\`\`

해설:

수량과 가격을 곱해 총 주문 금액을 만든 뒤 \`describe()\`로 수치형 컬럼의 요약 통계를 확인한다.

---

## 문제 12 정답 예시

\`\`\`text
1. head()로 앞부분 확인
2. tail()로 뒷부분 확인
3. shape로 행과 열 개수 확인
4. columns로 컬럼명 확인
5. dtypes로 자료형 확인
6. info()로 전체 요약 정보 확인
7. describe()로 수치형 요약 통계 확인
8. value_counts()로 범주형 값 빈도 확인
\`\`\`

해설:

기본 탐색의 목적은 데이터가 예상한 구조로 들어왔는지, 분석 전에 수정해야 할 문제가 있는지 확인하는 것이다.

---

# 6장 마무리

이번 장에서는 데이터를 불러온 뒤 가장 먼저 확인해야 하는 기본 탐색 방법을 배웠다. 데이터 분석은 계산식이나 그래프를 만드는 일에서 시작하지 않는다. 먼저 데이터가 어떤 구조를 가지고 있는지, 컬럼은 무엇인지, 자료형은 적절한지, 값의 범위는 어떤지, 범주형 값은 어떻게 구성되어 있는지를 확인해야 한다.

기본 탐색은 단순한 준비 작업이 아니라 분석의 방향을 정하는 중요한 과정이다. 데이터의 크기와 자료형을 보면 어떤 전처리가 필요한지 알 수 있고, 요약 통계와 값의 빈도를 보면 어떤 질문을 던질 수 있는지 보이기 시작한다.

다음 장에서는 기본 탐색을 마친 데이터에서 필요한 행과 열을 선택하고, 조건에 맞는 데이터만 필터링하는 방법을 배운다. 분석에 필요한 데이터를 정확히 골라내는 능력은 pandas 활용의 핵심이다.

---

# 참고 문서

- pandas API Reference: \`DataFrame.head\`  
  https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.head.html
- pandas API Reference: \`DataFrame.tail\`  
  https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.tail.html
- pandas API Reference: \`DataFrame.info\`  
  https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.info.html
- pandas API Reference: \`DataFrame.describe\`  
  https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.describe.html
- pandas API Reference: \`Series.value_counts\`  
  https://pandas.pydata.org/docs/reference/api/pandas.Series.value_counts.html
- pandas API Reference: \`DataFrame.nunique\`  
  https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.nunique.html
`;export{e as default};