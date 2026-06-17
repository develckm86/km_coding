var e=`<!-- 원본: python_advanced_chapter_17_book.md / 세부 장: 17-2 -->

# 17.2 시간 측정

## 왜 시간을 측정해야 할까?

성능을 개선하려면 먼저 현재 상태를 알아야 한다. “느린 것 같다”는 느낌만으로는 부족하다. 얼마나 느린지, 어떤 코드가 느린지, 개선 후 얼마나 빨라졌는지 확인해야 한다.

가장 단순한 시간 측정 방법은 실행 전후의 시간을 비교하는 것이다.

\`\`\`python
import time

start = time.time()

# 측정할 코드
result = sum(range(1_000_000))

end = time.time()

print("실행 시간:", end - start)
\`\`\`

\`time.time()\`은 현재 시각을 초 단위로 반환한다. 시작 시간과 끝 시간을 빼면 실행에 걸린 시간을 대략 확인할 수 있다.

## \`time.perf_counter()\`

실행 시간을 측정할 때는 \`time.time()\`보다 \`time.perf_counter()\`를 사용하는 편이 좋다. \`perf_counter()\`는 짧은 시간 간격을 측정하는 데 적합한 고해상도 타이머다.

\`\`\`python
import time

start = time.perf_counter()

result = sum(range(1_000_000))

end = time.perf_counter()

print(f"실행 시간: {end - start:.6f}초")
\`\`\`

실행 결과는 환경마다 다르다.

\`\`\`text
실행 시간: 0.018532초
\`\`\`

중요한 것은 절대적인 숫자보다 비교다. 같은 환경에서 코드 A와 코드 B를 비교하면 어떤 방식이 더 빠른지 판단할 수 있다.

## 반복 측정이 필요한 이유

프로그램 실행 시간은 매번 조금씩 달라질 수 있다. 컴퓨터에서 다른 프로그램이 실행 중일 수도 있고, 운영체제 스케줄링의 영향을 받을 수도 있다. 따라서 한 번만 측정하고 결론을 내리면 위험하다.

다음과 같이 여러 번 반복해서 평균 시간을 보는 것이 좋다.

\`\`\`python
import time


def measure() -> float:
    start = time.perf_counter()
    sum(range(1_000_000))
    end = time.perf_counter()
    return end - start


results = []

for _ in range(5):
    results.append(measure())

print(results)
print("평균:", sum(results) / len(results))
\`\`\`

이 방식은 간단한 측정에는 충분하다. 하지만 작은 코드 조각을 더 정확하게 비교하려면 \`timeit\`을 사용하는 것이 좋다.

## \`timeit\`으로 작은 코드 측정하기

\`timeit\` 모듈은 작은 코드 조각의 실행 시간을 측정할 때 사용한다. 직접 시간을 재는 것보다 측정 과정에서 발생할 수 있는 여러 함정을 줄여준다.

\`\`\`python
import timeit

elapsed = timeit.timeit(
    "sum(range(1000))",
    number=10000,
)

print(elapsed)
\`\`\`

위 코드는 \`sum(range(1000))\`을 10,000번 실행하는 데 걸린 시간을 측정한다.

\`timeit\`은 문자열로 코드를 전달할 수도 있고, 함수처럼 호출 가능한 객체를 전달할 수도 있다.

\`\`\`python
import timeit


def total_with_loop() -> int:
    total = 0
    for number in range(1000):
        total += number
    return total


elapsed = timeit.timeit(total_with_loop, number=10000)

print(elapsed)
\`\`\`

함수를 전달하는 방식은 코드가 길어질 때 더 읽기 좋다.

## 두 코드 비교하기

다음 예제에서는 반복문으로 합계를 구하는 방식과 \`sum()\`을 사용하는 방식을 비교한다.

\`\`\`python
import timeit


def total_with_loop() -> int:
    total = 0
    for number in range(1000):
        total += number
    return total


def total_with_sum() -> int:
    return sum(range(1000))


loop_time = timeit.timeit(total_with_loop, number=10000)
sum_time = timeit.timeit(total_with_sum, number=10000)

print("반복문:", loop_time)
print("sum():", sum_time)
\`\`\`

보통 이런 경우에는 내장 함수 \`sum()\`이 더 빠르다. 파이썬 내장 함수 중 일부는 내부적으로 최적화되어 있기 때문이다. 하지만 항상 내장 함수가 더 빠르다고 단정해서는 안 된다. 실제 코드와 데이터로 측정해야 한다.

## 측정할 때 주의할 점

시간 측정에서 주의할 점은 다음과 같다.

- 너무 작은 작업은 측정 오차가 클 수 있다.
- 한 번만 측정하지 않는다.
- 입력 데이터 크기를 바꿔가며 측정한다.
- 출력문이 포함되면 측정 결과가 왜곡될 수 있다.
- 파일, 네트워크, DB 작업은 외부 환경의 영향을 많이 받는다.
- 측정 코드 자체가 프로그램 동작을 바꾸지 않게 주의한다.

예를 들어 다음 코드는 성능 비교에 적합하지 않다.

\`\`\`python
for i in range(1000):
    print(i)
\`\`\`

\`print()\`는 화면 출력이라는 I/O 작업이다. 출력 자체가 느리기 때문에, 반복문의 순수한 성능을 측정하기 어렵다.

## 실무 예시: 리스트 생성 방식 비교

숫자 목록을 만드는 두 가지 방식을 비교해보자.

\`\`\`python
import timeit


def make_list_with_loop() -> list[int]:
    numbers = []
    for number in range(1000):
        numbers.append(number * 2)
    return numbers


def make_list_with_comprehension() -> list[int]:
    return [number * 2 for number in range(1000)]


loop_time = timeit.timeit(make_list_with_loop, number=10000)
comp_time = timeit.timeit(make_list_with_comprehension, number=10000)

print("반복문:", loop_time)
print("리스트 컴프리헨션:", comp_time)
\`\`\`

리스트 컴프리헨션은 많은 경우 일반 반복문보다 간결하고 빠르다. 하지만 조건이 복잡하거나 여러 단계 처리가 필요한 경우에는 일반 반복문이 더 읽기 좋다. 성능과 가독성을 함께 고려해야 한다.

## 핵심 정리

성능 개선의 첫 단계는 시간 측정이다. \`time.perf_counter()\`는 간단한 코드의 실행 시간을 직접 측정할 때 유용하고, \`timeit\`은 작은 코드 조각을 반복 측정할 때 유용하다. 측정 결과는 한 번의 숫자가 아니라 여러 번의 비교와 데이터 크기 변화 속에서 해석해야 한다.

---
`;export{e as default};