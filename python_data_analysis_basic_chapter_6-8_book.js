var e=`<!-- 원본: python_data_analysis_basic_chapter_6_book.md / 세부 장: 6-8 -->

# 6.8 기본 탐색 체크리스트

데이터를 불러온 뒤에는 일정한 순서로 확인하는 습관을 들이는 것이 좋다. 매번 즉흥적으로 확인하면 중요한 문제를 놓치기 쉽다.

다음은 데이터 분석 초반에 사용할 수 있는 기본 체크리스트다.

\`\`\`python
# 1. 앞부분 확인
orders.head()

# 2. 뒷부분 확인
orders.tail()

# 3. 데이터 크기 확인
orders.shape

# 4. 컬럼명 확인
orders.columns

# 5. 자료형 확인
orders.dtypes

# 6. 전체 요약 정보 확인
orders.info()

# 7. 수치형 요약 통계 확인
orders.describe()

# 8. 범주형 값 빈도 확인
orders["region"].value_counts()
\`\`\`

이 순서는 절대적인 규칙은 아니지만, 초보자가 데이터 탐색을 빠뜨리지 않도록 도와준다.

---

## 6.8.1 실무용 기본 탐색 함수 만들기

자주 반복하는 확인 작업은 함수로 만들 수 있다.

\`\`\`python
def inspect_dataframe(df):
    print("[앞부분]")
    print(df.head())
    print()

    print("[크기]")
    print(df.shape)
    print()

    print("[컬럼]")
    print(df.columns)
    print()

    print("[자료형]")
    print(df.dtypes)
    print()

    print("[요약 정보]")
    df.info()
\`\`\`

사용 방법은 다음과 같다.

\`\`\`python
inspect_dataframe(orders)
\`\`\`

기초 과정에서는 이런 함수를 꼭 완벽하게 만들 필요는 없다. 중요한 것은 데이터 확인 작업을 일정한 절차로 반복하는 습관이다.

---
`;export{e as default};