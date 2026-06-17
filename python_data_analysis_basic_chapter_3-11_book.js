var e=`<!-- 원본: python_data_analysis_basic_chapter_3_book.md / 세부 장: 3-11 -->

# 3.11 결측값과 특수한 숫자 기초

실제 데이터에는 완전한 값만 있는 것이 아니다. 값이 비어 있거나, 계산할 수 없는 결과가 들어 있는 경우도 있다. NumPy에서는 이런 상황에서 자주 보게 되는 값이 있다.

- \`np.nan\`
- \`np.inf\`
- \`-np.inf\`

기초 단계에서는 깊게 들어가지 않고, 이런 값들이 무엇인지와 어떻게 확인하는지만 살펴보자.

---

## 3.11.1 \`np.nan\`

\`np.nan\`은 Not a Number의 줄임말이다. 숫자가 아니라는 뜻이지만, 데이터 분석에서는 주로 “값이 없음” 또는 “계산할 수 없는 값”을 표현할 때 자주 보인다.

\`\`\`python
values = np.array([10, 20, np.nan, 40])

print(values)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[10. 20. nan 40.]
\`\`\`

\`np.nan\`이 들어가면 배열이 실수형으로 바뀌는 경우가 많다. 결측값을 표현하려면 일반적으로 실수형 배열이 필요하기 때문이다.

---

## 3.11.2 \`np.isnan()\`

배열 안에 \`np.nan\`이 있는지 확인할 때는 \`np.isnan()\`을 사용한다.

\`\`\`python
values = np.array([10, 20, np.nan, 40])

print(np.isnan(values))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[False False  True False]
\`\`\`

\`np.nan\`인 위치만 \`True\`로 표시되었다.

\`np.nan\`이 아닌 값만 선택하려면 다음처럼 쓸 수 있다.

\`\`\`python
valid_values = values[~np.isnan(values)]

print(valid_values)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[10. 20. 40.]
\`\`\`

여기서 \`~\`는 조건을 반대로 뒤집는 역할을 한다.

---

## 3.11.3 \`np.inf\`

\`np.inf\`는 무한대를 의미한다.

\`\`\`python
values = np.array([1, 2, np.inf])

print(values)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[ 1.  2. inf]
\`\`\`

무한대 값은 0으로 나누거나, 계산 결과가 너무 커질 때 나타날 수 있다.

무한대인지 확인할 때는 \`np.isinf()\`를 사용한다.

\`\`\`python
values = np.array([1, 2, np.inf, -np.inf])

print(np.isinf(values))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[False False  True  True]
\`\`\`

데이터 분석에서는 \`np.nan\`과 \`np.inf\`가 있으면 평균이나 합계 결과가 예상과 달라질 수 있다. 따라서 분석 전에 이런 값이 있는지 확인하는 습관이 필요하다.

---
`;export{e as default};