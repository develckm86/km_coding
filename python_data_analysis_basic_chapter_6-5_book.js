var e=`<!-- 원본: python_data_analysis_basic_chapter_6_book.md / 세부 장: 6-5 -->

# 6.5 요약 정보 확인

\`head()\`, \`shape\`, \`columns\`, \`dtypes\`를 각각 확인할 수도 있지만, 데이터 전체 요약을 한 번에 보고 싶을 때는 \`info()\`를 사용한다.

---

## 6.5.1 \`info()\`로 DataFrame 요약 확인하기

\`\`\`python
orders.info()
\`\`\`

\`info()\`는 대략 다음 정보를 보여준다.

\`\`\`text
- DataFrame의 행 개수
- 컬럼 개수
- 각 컬럼 이름
- 각 컬럼의 결측치가 아닌 값 개수
- 각 컬럼의 자료형
- 메모리 사용량
\`\`\`

출력 예시는 다음과 비슷하다.

\`\`\`text
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 8 entries, 0 to 7
Data columns (total 8 columns):
 #   Column      Non-Null Count  Dtype 
---  ------      --------------  ----- 
 0   order_id    8 non-null      int64 
 1   customer    8 non-null      object
 2   region      8 non-null      object
 3   category    8 non-null      object
 4   quantity    8 non-null      int64 
 5   price       8 non-null      int64 
 6   order_date  8 non-null      object
 7   payment     8 non-null      object
dtypes: int64(3), object(5)
memory usage: ...
\`\`\`

\`info()\`는 데이터 분석을 시작하기 전에 거의 항상 실행하는 기본 점검 도구다.

---

## 6.5.2 Non-Null Count 이해하기

\`Non-Null Count\`는 비어 있지 않은 값의 개수를 의미한다.

예를 들어 전체 행이 8개인데 어떤 컬럼의 \`Non-Null Count\`가 6이라면, 그 컬럼에는 결측치가 2개 있다는 뜻이다.

\`\`\`text
전체 행 개수: 8
비어 있지 않은 값: 6
결측치: 2
\`\`\`

결측치 처리는 10장에서 자세히 다루지만, 이 장에서는 \`info()\`를 통해 결측치가 있는지 감지하는 데 집중한다.

---

## 6.5.3 \`info()\`를 볼 때 확인할 것

\`\`\`text
- 전체 행 개수가 예상과 맞는가?
- 컬럼 개수가 예상과 맞는가?
- 각 컬럼의 Non-Null Count가 전체 행 개수와 같은가?
- 숫자 컬럼이 숫자형으로 들어왔는가?
- 날짜 컬럼이 아직 문자열인지 확인했는가?
- 문자열 컬럼이 object로 들어왔는가?
\`\`\`

\`info()\`는 단순히 출력하고 끝내는 도구가 아니라, 데이터 상태를 읽는 도구다.

---
`;export{e as default};