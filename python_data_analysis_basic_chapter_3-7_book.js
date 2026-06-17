var e=`<!-- 원본: python_data_analysis_basic_chapter_3_book.md / 세부 장: 3-7 -->

# 3.7 배열 연산

NumPy 배열의 강력한 점은 배열 전체에 계산을 한 번에 적용할 수 있다는 것이다. 이런 방식은 데이터 분석에서 매우 중요하다.

---

## 3.7.1 배열과 숫자 연산

배열에 숫자를 더하면 배열의 모든 값에 그 숫자가 더해진다.

\`\`\`python
numbers = np.array([10, 20, 30])

print(numbers + 5)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[15 25 35]
\`\`\`

빼기, 곱하기, 나누기도 가능하다.

\`\`\`python
numbers = np.array([10, 20, 30])

print(numbers - 5)
print(numbers * 2)
print(numbers / 10)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[ 5 15 25]
[20 40 60]
[1. 2. 3.]
\`\`\`

이처럼 배열 전체에 한 번에 적용되는 계산은 데이터 분석에서 매우 유용하다.

---

## 3.7.2 배열끼리 연산

크기가 같은 배열끼리는 같은 위치의 값끼리 계산된다.

\`\`\`python
prices = np.array([10000, 20000, 30000])
quantities = np.array([2, 3, 1])

totals = prices * quantities

print(totals)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[20000 60000 30000]
\`\`\`

각 상품의 가격과 수량을 곱해 주문 금액을 구한 것이다.

\`\`\`text
10000 × 2 = 20000
20000 × 3 = 60000
30000 × 1 = 30000
\`\`\`

---

## 3.7.3 벡터화 연산

NumPy 배열에서 반복문을 직접 쓰지 않고 배열 전체에 계산을 적용하는 방식을 보통 **벡터화 연산**이라고 한다.

다음 코드는 리스트를 사용해 할인 가격을 계산한다.

\`\`\`python
prices = [10000, 20000, 30000]

sale_prices = []
for price in prices:
    sale_prices.append(price * 0.9)

print(sale_prices)
\`\`\`

NumPy를 사용하면 다음처럼 작성할 수 있다.

\`\`\`python
prices = np.array([10000, 20000, 30000])
sale_prices = prices * 0.9

print(sale_prices)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[ 9000. 18000. 27000.]
\`\`\`

데이터 분석에서는 이런 식으로 컬럼 전체에 같은 계산을 적용하는 일이 많다. NumPy의 벡터화 연산을 이해하면 pandas의 컬럼 연산도 더 쉽게 이해할 수 있다.

---

## 3.7.4 수학 함수 적용하기

NumPy에는 배열 전체에 적용할 수 있는 수학 함수가 많다.

\`\`\`python
numbers = np.array([1, 4, 9, 16])

print(np.sqrt(numbers))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[1. 2. 3. 4.]
\`\`\`

\`np.sqrt()\`는 제곱근을 구하는 함수다. 배열을 넣으면 배열의 각 값에 제곱근 계산이 적용된다.

반올림도 할 수 있다.

\`\`\`python
values = np.array([1.234, 2.345, 3.456])

print(np.round(values, 2))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[1.23 2.35 3.46]
\`\`\`

---

## 3.7.5 배열 연산 실무 예제

다음은 상품 가격과 수량으로 주문 금액을 계산하는 예제다.

\`\`\`python
prices = np.array([15000, 23000, 9900, 12000])
quantities = np.array([2, 1, 5, 3])

totals = prices * quantities

print(totals)
print("총 주문 금액:", totals.sum())
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[30000 23000 49500 36000]
총 주문 금액: 138500
\`\`\`

가격 배열과 수량 배열을 곱해 각 상품별 금액을 구하고, 그 결과를 다시 합산해 전체 주문 금액을 구했다.

---
`;export{e as default};