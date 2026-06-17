var e=`<!-- 원본: python_data_analysis_basic_chapter_3_book.md / 세부 장: 3-4 -->

# 3.4 배열의 데이터 타입

데이터 분석에서는 데이터 타입이 매우 중요하다. 숫자로 계산해야 할 값이 문자열로 되어 있으면 계산할 수 없고, 실수로 처리해야 할 값이 정수로 변환되면 정보가 손실될 수 있다.

NumPy 배열에서도 데이터 타입은 중요한 개념이다.

---

## 3.4.1 정수 배열

정수 배열은 소수점이 없는 숫자들로 구성된 배열이다.

\`\`\`python
counts = np.array([10, 20, 30])

print(counts)
print(counts.dtype)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
[10 20 30]
int64
\`\`\`

정수 배열은 다음과 같은 데이터에 적합하다.

- 주문 수량
- 방문자 수
- 고객 수
- 판매 건수
- 페이지 번호

---

## 3.4.2 실수 배열

실수 배열은 소수점이 있는 숫자들로 구성된 배열이다.

\`\`\`python
rates = np.array([0.1, 0.2, 0.15])

print(rates)
print(rates.dtype)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
[0.1  0.2  0.15]
float64
\`\`\`

실수 배열은 다음과 같은 데이터에 적합하다.

- 할인율
- 평균값
- 비율
- 온도
- 좌표
- 표준편차

---

## 3.4.3 배열 생성 시 타입 지정하기

배열을 만들 때 \`dtype\`을 지정할 수 있다.

\`\`\`python
numbers = np.array([1, 2, 3], dtype=float)

print(numbers)
print(numbers.dtype)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[1. 2. 3.]
float64
\`\`\`

정수처럼 보이는 값도 실수 타입으로 저장되었다.

정수 타입으로 지정할 수도 있다.

\`\`\`python
numbers = np.array([1.2, 2.8, 3.5], dtype=int)

print(numbers)
print(numbers.dtype)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[1 2 3]
int64
\`\`\`

소수점 아래 값이 사라진다. 따라서 실수를 정수로 변환할 때는 주의해야 한다.

---

## 3.4.4 \`astype()\`으로 타입 변환하기

이미 만들어진 배열의 타입을 바꿀 때는 \`astype()\`을 사용한다.

\`\`\`python
prices = np.array([1000, 2000, 3000])
prices_float = prices.astype(float)

print(prices_float)
print(prices_float.dtype)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[1000. 2000. 3000.]
float64
\`\`\`

문자열 숫자를 숫자 타입으로 바꿀 수도 있다.

\`\`\`python
values = np.array(["10", "20", "30"])
numbers = values.astype(int)

print(numbers)
print(numbers.dtype)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[10 20 30]
int64
\`\`\`

단, 숫자로 바꿀 수 없는 문자가 섞여 있으면 에러가 발생한다.

\`\`\`python
values = np.array(["10", "20", "없음"])

# numbers = values.astype(int)
\`\`\`

\`"없음"\`은 정수로 바꿀 수 없기 때문에 변환할 수 없다. 이런 문제는 실제 데이터 분석에서 매우 자주 만난다.

---
`;export{e as default};