var e=`# 17장 성능 최적화 기초

## 이 장에서 배울 내용

앞 장에서는 동시성 프로그래밍을 배웠다. 스레드, 프로세스, 비동기 프로그래밍은 오래 걸리는 작업을 더 효율적으로 처리하는 방법이다. 하지만 코드를 빠르게 만드는 방법이 항상 동시성인 것은 아니다.

성능이 느린 이유는 다양하다.

- 같은 계산을 너무 많이 반복할 수 있다.
- 리스트에서 매번 값을 검색하느라 시간이 오래 걸릴 수 있다.
- 큰 파일을 한 번에 메모리에 올리고 있을 수 있다.
- 불필요한 복사가 많이 발생할 수 있다.
- 네트워크나 파일 입출력을 기다리고 있을 수 있다.
- 실제 병목은 예상과 다른 곳에 있을 수 있다.

성능 최적화에서 가장 중요한 원칙은 **먼저 측정하고, 그다음 개선하는 것**이다. 초보자가 흔히 하는 실수는 코드를 읽어보고 “여기가 느릴 것 같다”고 짐작한 뒤 바로 고치는 것이다. 하지만 실제로 측정해보면 병목은 다른 곳에 있는 경우가 많다.

이 장에서는 파이썬 코드를 빠르고 효율적으로 만들기 위한 기초를 배운다. 목표는 모든 코드를 극한까지 최적화하는 것이 아니다. 데이터분석 과정으로 넘어가기 전에, 파일 전처리, API 수집, 데이터 변환 코드에서 자주 발생하는 성능 문제를 발견하고 개선할 수 있는 기본 감각을 만드는 것이다.

이 장에서는 다음 내용을 다룬다.

- 성능 최적화가 필요한 이유
- 먼저 측정하고 최적화해야 하는 이유
- \`time\`과 \`timeit\`을 이용한 시간 측정
- \`cProfile\`을 이용한 프로파일링
- 자료구조 선택이 성능에 미치는 영향
- 알고리즘 복잡도 기초
- 캐싱으로 반복 계산 줄이기
- 리스트와 제너레이터의 메모리 차이
- \`tracemalloc\`을 이용한 메모리 사용 추적
- 대용량 데이터 처리에서 피해야 할 패턴

---

# 17.1 성능 최적화가 필요한 이유

## 빠른 코드보다 중요한 것

성능 최적화라고 하면 흔히 “코드를 빠르게 만드는 것”만 떠올린다. 물론 실행 시간이 중요한 경우도 많다. 하지만 실무에서는 빠른 코드보다 먼저 중요한 것이 있다.

좋은 코드는 다음 조건을 먼저 만족해야 한다.

- 정확하게 동작해야 한다.
- 읽기 쉬워야 한다.
- 수정하기 쉬워야 한다.
- 실패했을 때 원인을 찾을 수 있어야 한다.
- 테스트할 수 있어야 한다.

정확하지 않은 코드를 빠르게 만드는 것은 의미가 없다. 또한 너무 복잡하게 최적화된 코드는 나중에 유지보수하기 어렵다. 따라서 성능 최적화는 항상 균형이 필요하다.

성능 최적화의 기본 순서는 다음과 같다.

\`\`\`text
1. 먼저 올바르게 동작하는 코드를 작성한다.
2. 테스트로 동작을 확인한다.
3. 실행 시간을 측정한다.
4. 병목 지점을 찾는다.
5. 병목 지점만 개선한다.
6. 다시 테스트한다.
7. 다시 측정한다.
\`\`\`

이 순서에서 중요한 부분은 “측정”이다. 측정하지 않은 최적화는 추측에 가깝다.

## 언제 성능 최적화가 필요할까?

모든 코드에 성능 최적화가 필요한 것은 아니다. 다음과 같은 상황에서는 성능을 점검해볼 필요가 있다.

- 실행 시간이 너무 오래 걸린다.
- 데이터가 많아지면 프로그램이 멈추거나 느려진다.
- 메모리 사용량이 급격히 증가한다.
- 같은 작업을 매일 반복 실행해야 한다.
- API 수집, 파일 처리, 데이터 전처리 작업이 오래 걸린다.
- 데이터분석 전에 원천 데이터를 정리하는 시간이 너무 길다.

예를 들어 작은 CSV 파일 하나를 처리하는 코드는 1초 안에 끝날 수 있다. 하지만 같은 코드가 1,000개의 CSV 파일을 처리해야 한다면 이야기가 달라진다. 데이터가 작을 때는 문제가 없어 보이던 코드가, 데이터가 커지면 병목이 된다.

## 데이터가 작을 때와 클 때의 차이

다음 코드는 리스트에서 특정 값을 찾는 간단한 코드다.

\`\`\`python
numbers = [1, 2, 3, 4, 5]

if 5 in numbers:
    print("찾았습니다")
\`\`\`

데이터가 5개라면 아무 문제가 없다. 그런데 데이터가 1,000만 개라면 어떨까? 리스트에서 \`in\`으로 값을 찾을 때는 앞에서부터 차례대로 확인한다. 찾는 값이 뒤쪽에 있거나 없으면 많은 값을 검사해야 한다.

반면 집합은 포함 여부 확인이 훨씬 빠른 자료구조다.

\`\`\`python
numbers = {1, 2, 3, 4, 5}

if 5 in numbers:
    print("찾았습니다")
\`\`\`

데이터가 작을 때는 두 코드의 차이가 거의 느껴지지 않는다. 하지만 데이터가 커질수록 자료구조 선택의 차이가 커진다.

## 성능 최적화의 흔한 오해

성능 최적화에는 몇 가지 흔한 오해가 있다.

첫 번째 오해는 “짧은 코드가 항상 빠르다”는 것이다. 파이썬에서는 짧은 코드가 읽기 좋고 빠른 경우도 있지만, 항상 그런 것은 아니다. 한 줄로 복잡하게 작성한 코드가 오히려 이해하기 어렵고 느릴 수도 있다.

두 번째 오해는 “반복문은 무조건 느리다”는 것이다. 반복문이 느린 것이 아니라, 반복문 안에서 비효율적인 작업을 반복하는 것이 문제인 경우가 많다.

세 번째 오해는 “최적화는 나중에 한 번에 하면 된다”는 것이다. 물론 처음부터 과도하게 최적화할 필요는 없다. 하지만 데이터가 커질 가능성이 있는 코드라면, 적어도 비효율적인 구조를 만들지 않는 습관은 필요하다.

## 최적화의 기준

최적화의 기준은 상황에 따라 다르다.

예를 들어 다음 두 상황을 비교해보자.

\`\`\`text
상황 1: 한 달에 한 번 실행하는 보고서 생성 프로그램이 2분 걸린다.
상황 2: 매일 10,000번 호출되는 API 처리 함수가 요청마다 2초 걸린다.
\`\`\`

상황 1에서는 2분이 큰 문제가 아닐 수 있다. 하지만 상황 2에서는 매우 큰 문제가 된다. 호출 횟수가 많기 때문이다.

성능을 평가할 때는 다음 질문을 함께 해야 한다.

- 이 코드는 얼마나 자주 실행되는가?
- 처리해야 하는 데이터는 얼마나 큰가?
- 실행 시간이 실제 업무에 영향을 주는가?
- 메모리 사용량이 시스템에 부담을 주는가?
- 코드를 복잡하게 만들 만큼 개선 효과가 큰가?

## 실무 예시: 느린 데이터 검증 코드

다음 상황을 생각해보자.

고객 ID 목록이 있고, 각 주문 데이터가 유효한 고객의 주문인지 확인해야 한다.

\`\`\`python
valid_customer_ids = ["C001", "C002", "C003", "C004"]
orders = [
    {"order_id": "O001", "customer_id": "C001"},
    {"order_id": "O002", "customer_id": "C999"},
    {"order_id": "O003", "customer_id": "C003"},
]

invalid_orders = []

for order in orders:
    if order["customer_id"] not in valid_customer_ids:
        invalid_orders.append(order)

print(invalid_orders)
\`\`\`

데이터가 작을 때는 문제가 없다. 하지만 \`valid_customer_ids\`가 100만 개이고 \`orders\`도 100만 개라면, 리스트에서 매번 고객 ID를 찾는 작업이 매우 느려질 수 있다.

이럴 때는 유효한 고객 ID를 집합으로 바꾸는 것이 좋다.

\`\`\`python
valid_customer_ids = {"C001", "C002", "C003", "C004"}

invalid_orders = []

for order in orders:
    if order["customer_id"] not in valid_customer_ids:
        invalid_orders.append(order)

print(invalid_orders)
\`\`\`

코드 구조는 거의 같지만, 자료구조 선택만 바꿔도 성능이 크게 달라질 수 있다.

## 핵심 정리

성능 최적화는 코드를 무조건 복잡하게 만드는 과정이 아니다. 느린 부분을 측정하고, 실제 병목을 찾아, 필요한 부분만 개선하는 과정이다. 특히 데이터 처리 코드에서는 자료구조 선택, 반복문 구조, 파일 읽기 방식, 불필요한 복사 여부가 성능에 큰 영향을 준다.

---

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

# 17.3 프로파일링

## 시간 측정과 프로파일링의 차이

시간 측정은 “전체 실행 시간이 얼마나 걸렸는지”를 알려준다. 하지만 전체 시간이 길다고 해서 어디가 느린지는 알 수 없다.

예를 들어 다음 질문에 답하려면 시간 측정만으로는 부족하다.

- 어떤 함수가 가장 오래 걸렸는가?
- 어떤 함수가 가장 많이 호출되었는가?
- 전체 시간 중 특정 함수가 차지하는 비중은 얼마인가?
- 반복적으로 호출되는 병목 함수는 무엇인가?

이럴 때 사용하는 것이 프로파일링이다.

프로파일링은 프로그램 실행 중 각 함수가 얼마나 자주 호출되었고, 얼마나 오래 실행되었는지 통계로 확인하는 과정이다.

## \`cProfile\` 기본 사용

파이썬 표준 라이브러리에는 \`cProfile\`이 포함되어 있다. \`cProfile\`은 함수 호출 단위로 실행 시간을 분석할 수 있는 도구다.

다음 예제를 보자.

\`\`\`python
import cProfile


def slow_function() -> int:
    total = 0
    for number in range(5_000_000):
        total += number
    return total


def fast_function() -> int:
    return sum(range(1000))


def main() -> None:
    slow_function()
    fast_function()


cProfile.run("main()")
\`\`\`

실행하면 함수 호출 횟수와 시간 정보가 출력된다.

출력에는 다음과 같은 항목이 포함된다.

\`\`\`text
ncalls  tottime  percall  cumtime  percall  filename:lineno(function)
\`\`\`

각 항목의 의미는 다음과 같다.

| 항목 | 의미 |
|---|---|
| \`ncalls\` | 함수 호출 횟수 |
| \`tottime\` | 해당 함수 자체에서 소비한 시간 |
| \`percall\` | 호출 1회당 평균 시간 |
| \`cumtime\` | 하위 함수 호출 시간을 포함한 누적 시간 |
| \`filename:lineno(function)\` | 파일명, 줄 번호, 함수명 |

## \`tottime\`과 \`cumtime\`

프로파일링 결과에서 특히 중요한 값은 \`tottime\`과 \`cumtime\`이다.

\`tottime\`은 해당 함수 자체에서 소비한 시간이다. 그 함수가 다른 함수를 호출했다면, 다른 함수에서 소비한 시간은 제외된다.

\`cumtime\`은 해당 함수와 그 함수가 호출한 하위 함수들의 시간을 합친 누적 시간이다.

예를 들어 \`main()\` 함수가 \`slow_function()\`을 호출한다면, \`main()\`의 \`cumtime\`에는 \`slow_function()\`의 시간이 포함된다. 반면 \`main()\`의 \`tottime\`은 작게 나올 수 있다.

프로파일링 결과를 볼 때는 다음과 같이 해석한다.

- \`tottime\`이 큰 함수는 함수 내부 작업 자체가 느릴 가능성이 있다.
- \`cumtime\`이 큰 함수는 내부에서 호출하는 다른 함수까지 포함해 전체 흐름이 오래 걸린다.
- \`ncalls\`가 매우 큰 함수는 한 번은 빠르더라도 반복 호출 때문에 병목이 될 수 있다.

## 명령행에서 \`cProfile\` 사용하기

스크립트 전체를 프로파일링할 때는 명령행에서 실행할 수도 있다.

\`\`\`bash
python -m cProfile my_script.py
\`\`\`

정렬 기준을 지정하면 더 보기 쉽다.

\`\`\`bash
python -m cProfile -s cumtime my_script.py
\`\`\`

\`cumtime\` 기준으로 정렬하면 전체 실행 시간에 영향을 많이 준 함수가 위쪽에 나타난다.

## 결과를 파일로 저장하기

프로파일링 결과가 길다면 파일로 저장한 뒤 분석하는 것이 좋다.

\`\`\`bash
python -m cProfile -o profile_result.prof my_script.py
\`\`\`

이렇게 저장한 결과는 \`pstats\`로 읽을 수 있다.

\`\`\`python
import pstats

stats = pstats.Stats("profile_result.prof")
stats.sort_stats("cumtime")
stats.print_stats(20)
\`\`\`

위 코드는 누적 시간 기준으로 정렬한 뒤 상위 20개 항목만 출력한다.

## 실무 예시: 느린 전처리 코드 찾기

다음 코드는 주문 데이터 목록을 정리하는 간단한 예제다.

\`\`\`python
import cProfile
import random


def normalize_name(name: str) -> str:
    return name.strip().title()


def is_valid_amount(amount: str) -> bool:
    return amount.replace(",", "").isdigit()


def clean_order(order: dict) -> dict:
    return {
        "order_id": order["order_id"],
        "customer_name": normalize_name(order["customer_name"]),
        "amount": int(order["amount"].replace(",", "")),
    }


def clean_orders(orders: list[dict]) -> list[dict]:
    cleaned = []

    for order in orders:
        if is_valid_amount(order["amount"]):
            cleaned.append(clean_order(order))

    return cleaned


def make_orders(size: int) -> list[dict]:
    orders = []

    for index in range(size):
        amount = f"{random.randint(1000, 100000):,}"
        orders.append(
            {
                "order_id": f"O{index:06d}",
                "customer_name": "  hong gildong  ",
                "amount": amount,
            }
        )

    return orders


def main() -> None:
    orders = make_orders(100_000)
    clean_orders(orders)


cProfile.run("main()", sort="cumtime")
\`\`\`

이 코드를 프로파일링하면 데이터 생성이 느린지, 데이터 정리가 느린지, 특정 문자열 처리 함수가 많이 호출되는지 확인할 수 있다.

프로파일링의 목적은 “감으로 고치는 것”이 아니라 “어디를 봐야 하는지 찾는 것”이다.

## 프로파일링 결과를 해석할 때 주의할 점

프로파일링 결과는 숫자로 나오지만, 숫자를 그대로 받아들이기보다 문맥과 함께 해석해야 한다.

예를 들어 어떤 함수의 호출 횟수가 많다고 해서 반드시 나쁜 것은 아니다. 매우 작고 단순한 함수가 많이 호출되는 것은 자연스러운 일일 수 있다. 반대로 호출 횟수는 적지만 한 번 호출될 때 오래 걸리는 함수가 실제 병목일 수도 있다.

프로파일링 결과를 볼 때는 다음 질문을 한다.

- 이 함수는 왜 이렇게 많이 호출되는가?
- 호출 횟수를 줄일 수 있는가?
- 같은 계산을 반복하고 있지는 않은가?
- 자료구조를 바꾸면 조회 비용을 줄일 수 있는가?
- 한 번에 처리하지 말고 스트리밍 방식으로 처리할 수 있는가?
- 이 최적화가 코드 복잡도를 높일 만큼 가치가 있는가?

## 핵심 정리

프로파일링은 프로그램의 병목을 찾기 위한 도구다. \`cProfile\`은 함수 호출 횟수와 실행 시간을 보여주며, \`pstats\`를 사용하면 결과를 정렬하고 필요한 부분만 확인할 수 있다. 성능 최적화는 프로파일링 결과를 바탕으로 실제 병목을 좁혀가는 과정이다.

---

# 17.4 자료구조 선택과 성능

## 자료구조가 성능에 미치는 영향

파이썬 기초 과정에서 리스트, 튜플, 딕셔너리, 집합을 배웠다. 그때는 주로 사용법과 특징을 배웠다면, 고급 과정에서는 성능 관점에서 자료구조를 다시 살펴볼 필요가 있다.

같은 데이터를 저장하더라도 어떤 자료구조를 선택하느냐에 따라 속도가 크게 달라질 수 있다.

대표적인 기준은 다음과 같다.

| 작업 | 적합한 자료구조 |
|---|---|
| 순서대로 여러 값을 저장 | 리스트 |
| 변경되지 않는 여러 값 저장 | 튜플 |
| key로 값을 빠르게 찾기 | 딕셔너리 |
| 포함 여부를 빠르게 확인 | 집합 |
| 중복 제거 | 집합 |
| 순서대로 하나씩 처리 | 리스트, 튜플, 제너레이터 |

## 리스트 검색의 비용

리스트에서 특정 값이 있는지 확인할 때는 앞에서부터 차례대로 검사한다.

\`\`\`python
numbers = [10, 20, 30, 40, 50]

print(40 in numbers)
\`\`\`

데이터가 작으면 문제가 없다. 하지만 리스트가 매우 크고, 이 검색을 반복한다면 성능 문제가 생길 수 있다.

다음 예제는 리스트와 집합의 포함 여부 확인 속도를 비교한다.

\`\`\`python
import timeit

numbers_list = list(range(1_000_000))
numbers_set = set(numbers_list)


def search_in_list() -> bool:
    return 999_999 in numbers_list


def search_in_set() -> bool:
    return 999_999 in numbers_set


list_time = timeit.timeit(search_in_list, number=100)
set_time = timeit.timeit(search_in_set, number=100)

print("list:", list_time)
print("set:", set_time)
\`\`\`

많은 경우 집합이 훨씬 빠르게 나온다. 집합은 내부적으로 해시 기반 구조를 사용하기 때문에 포함 여부 확인에 강하다.

## 딕셔너리 조회

딕셔너리는 key로 value를 빠르게 찾을 수 있는 자료구조다.

\`\`\`python
prices = {
    "keyboard": 30000,
    "mouse": 15000,
    "monitor": 200000,
}

print(prices["mouse"])
\`\`\`

리스트 안에 딕셔너리를 여러 개 넣고 매번 검색하는 구조는 데이터가 커질수록 느려질 수 있다.

\`\`\`python
products = [
    {"code": "P001", "name": "keyboard", "price": 30000},
    {"code": "P002", "name": "mouse", "price": 15000},
    {"code": "P003", "name": "monitor", "price": 200000},
]


def find_product(code: str) -> dict | None:
    for product in products:
        if product["code"] == code:
            return product
    return None
\`\`\`

이 함수는 매번 리스트를 처음부터 끝까지 검사한다. 상품이 많고 조회가 자주 발생한다면 딕셔너리로 인덱스를 만들어두는 것이 좋다.

\`\`\`python
product_map = {
    product["code"]: product
    for product in products
}

print(product_map.get("P002"))
\`\`\`

이렇게 하면 상품 코드를 기준으로 빠르게 조회할 수 있다.

## 실무 예시: 조인 전 인덱스 만들기

데이터분석 전처리에서 자주 하는 작업 중 하나는 두 데이터의 값을 연결하는 것이다.

예를 들어 주문 데이터에는 고객 ID만 있고, 고객 데이터에는 고객 이름이 있다고 하자.

\`\`\`python
customers = [
    {"customer_id": "C001", "name": "김민수"},
    {"customer_id": "C002", "name": "이지영"},
]

orders = [
    {"order_id": "O001", "customer_id": "C001", "amount": 30000},
    {"order_id": "O002", "customer_id": "C002", "amount": 15000},
]
\`\`\`

나쁜 방식은 주문마다 고객 리스트를 반복 검색하는 것이다.

\`\`\`python
def find_customer_name(customer_id: str) -> str | None:
    for customer in customers:
        if customer["customer_id"] == customer_id:
            return customer["name"]
    return None


for order in orders:
    order["customer_name"] = find_customer_name(order["customer_id"])
\`\`\`

고객 데이터와 주문 데이터가 모두 많으면 매우 느려질 수 있다.

더 좋은 방식은 고객 ID를 key로 하는 딕셔너리를 먼저 만드는 것이다.

\`\`\`python
customer_map = {
    customer["customer_id"]: customer
    for customer in customers
}

for order in orders:
    customer = customer_map.get(order["customer_id"])
    order["customer_name"] = customer["name"] if customer else None
\`\`\`

이 방식은 데이터분석에서 말하는 조인과 비슷한 생각이다. pandas를 배우기 전에도, key를 기준으로 빠르게 찾기 위해 딕셔너리를 만드는 습관은 매우 중요하다.

## 리스트에 반복해서 추가하기

리스트에 값을 추가할 때는 보통 \`append()\`를 사용한다.

\`\`\`python
result = []

for number in range(1000):
    result.append(number * 2)
\`\`\`

이 방식은 일반적으로 괜찮다. 하지만 문자열을 반복해서 더하는 방식은 주의해야 한다.

\`\`\`python
text = ""

for word in ["Python", "is", "good"]:
    text += word + " "
\`\`\`

문자열은 불변 객체다. 문자열을 더할 때마다 새 문자열이 만들어질 수 있다. 많은 문자열을 합쳐야 할 때는 리스트에 모은 뒤 \`join()\`을 사용하는 것이 좋다.

\`\`\`python
words = ["Python", "is", "good"]
text = " ".join(words)

print(text)
\`\`\`

## 정렬의 비용

정렬은 편리하지만 비용이 있는 작업이다. 데이터가 많고 반복적으로 정렬하면 성능 문제가 생길 수 있다.

\`\`\`python
orders = [
    {"order_id": "O001", "amount": 30000},
    {"order_id": "O002", "amount": 15000},
    {"order_id": "O003", "amount": 50000},
]

orders.sort(key=lambda order: order["amount"])
\`\`\`

정렬은 필요할 때만 수행해야 한다. 반복문 안에서 매번 정렬하는 구조는 피하는 것이 좋다.

나쁜 예시는 다음과 같다.

\`\`\`python
result = []

for order in orders:
    result.append(order)
    result.sort(key=lambda item: item["amount"])
\`\`\`

이 코드는 값을 하나 추가할 때마다 전체 리스트를 정렬한다. 대부분의 경우 마지막에 한 번만 정렬하면 충분하다.

\`\`\`python
result = []

for order in orders:
    result.append(order)

result.sort(key=lambda item: item["amount"])
\`\`\`

## 핵심 정리

자료구조 선택은 성능 최적화에서 매우 중요하다. 리스트는 순서가 있는 데이터 처리에 좋지만, 포함 여부 확인이나 key 기반 조회에는 집합과 딕셔너리가 더 적합하다. 데이터가 작을 때는 차이가 작지만, 데이터가 커지고 반복 횟수가 많아지면 자료구조 선택이 전체 성능을 좌우할 수 있다.

---

# 17.5 알고리즘 복잡도 기초

## 알고리즘 복잡도란?

알고리즘 복잡도는 데이터 크기가 커질 때 실행 시간이나 메모리 사용량이 어떻게 증가하는지 설명하는 개념이다. 고급 알고리즘 수업처럼 깊게 들어갈 필요는 없지만, 데이터 처리 코드를 작성하려면 기본적인 감각은 필요하다.

예를 들어 데이터가 10개일 때는 빠른 코드가, 데이터가 100만 개일 때도 빠를까? 이 질문에 답하려면 데이터 크기에 따른 증가 양상을 봐야 한다.

복잡도는 보통 Big-O 표기법으로 표현한다.

대표적인 예는 다음과 같다.

| 표기 | 의미 | 예시 |
|---|---|---|
| O(1) | 데이터 크기와 거의 무관 | 딕셔너리 key 조회 |
| O(n) | 데이터 크기에 비례 | 리스트 전체 순회 |
| O(n log n) | 정렬에서 자주 등장 | 일반적인 정렬 |
| O(n²) | 데이터가 커지면 급격히 느려짐 | 중첩 반복 비교 |

여기서 중요한 것은 정확한 수학식보다 “데이터가 커질 때 얼마나 빨리 느려지는가”를 이해하는 것이다.

## O(1): 거의 일정한 시간

딕셔너리에서 key로 값을 찾는 작업은 보통 데이터 크기가 커져도 빠르게 동작한다.

\`\`\`python
prices = {
    "keyboard": 30000,
    "mouse": 15000,
    "monitor": 200000,
}

print(prices["mouse"])
\`\`\`

데이터가 3개든 30만 개든, key를 기준으로 값을 찾는 작업은 대체로 빠르다. 이런 작업을 O(1)에 가깝다고 표현한다.

## O(n): 데이터 크기에 비례

리스트 전체를 한 번 순회하는 작업은 데이터 개수에 비례해서 시간이 늘어난다.

\`\`\`python
numbers = [1, 2, 3, 4, 5]

total = 0
for number in numbers:
    total += number
\`\`\`

데이터가 10개면 10번, 100만 개면 100만 번 반복한다. 이런 작업은 O(n)이다.

O(n)은 나쁜 것이 아니다. 데이터를 한 번씩 확인해야 하는 작업이라면 자연스럽고 필요한 비용이다.

## O(n²): 중첩 반복의 위험

문제가 되는 경우는 중첩 반복이 큰 데이터에 적용될 때다.

\`\`\`python
names = ["민수", "지영", "철수", "영희"]

for name1 in names:
    for name2 in names:
        print(name1, name2)
\`\`\`

데이터가 4개이면 16번 실행된다. 데이터가 1,000개이면 1,000,000번 실행된다. 데이터가 100,000개이면 현실적으로 처리하기 어려울 수 있다.

중첩 반복이 항상 나쁜 것은 아니다. 데이터가 작거나 모든 조합을 반드시 확인해야 한다면 필요할 수 있다. 하지만 큰 데이터에서 중첩 반복이 보인다면 다른 방식으로 바꿀 수 있는지 먼저 생각해야 한다.

## 실무 예시: 중첩 반복 제거하기

다음 코드는 주문 데이터와 고객 데이터를 연결한다.

\`\`\`python
customers = [
    {"customer_id": "C001", "name": "김민수"},
    {"customer_id": "C002", "name": "이지영"},
]

orders = [
    {"order_id": "O001", "customer_id": "C001"},
    {"order_id": "O002", "customer_id": "C002"},
]

for order in orders:
    for customer in customers:
        if order["customer_id"] == customer["customer_id"]:
            order["customer_name"] = customer["name"]
\`\`\`

주문이 n개, 고객이 m개라면 최대 n × m번 비교할 수 있다. 데이터가 커지면 느려진다.

딕셔너리를 사용하면 구조를 개선할 수 있다.

\`\`\`python
customer_map = {
    customer["customer_id"]: customer["name"]
    for customer in customers
}

for order in orders:
    order["customer_name"] = customer_map.get(order["customer_id"])
\`\`\`

이제 고객 목록을 한 번 딕셔너리로 만들고, 주문을 한 번 순회하면서 빠르게 조회한다. 중첩 반복을 피한 것이다.

## O(n log n): 정렬

정렬은 보통 O(n log n) 수준의 비용이 든다. 리스트가 작을 때는 부담이 크지 않지만, 큰 데이터를 반복해서 정렬하면 느려질 수 있다.

\`\`\`python
orders.sort(key=lambda order: order["amount"])
\`\`\`

정렬이 필요하다면 하되, 반복문 안에서 불필요하게 여러 번 정렬하지 않는 것이 중요하다.

## 복잡도보다 중요한 실제 측정

복잡도는 코드의 증가 양상을 이해하는 데 도움이 된다. 하지만 실제 성능은 파이썬 구현, 데이터 구조, 입력 데이터의 형태, 외부 환경에 따라 달라질 수 있다.

따라서 복잡도는 방향을 잡는 도구이고, 최종 판단은 측정으로 해야 한다.

예를 들어 O(n) 코드가 O(n log n) 코드보다 항상 빠른 것은 아니다. 데이터가 작으면 차이가 거의 없을 수 있고, 내부 구현이 최적화된 함수가 더 빠를 수도 있다.

## 핵심 정리

알고리즘 복잡도는 데이터가 커질 때 코드가 얼마나 빨리 느려지는지 이해하는 도구다. 데이터 처리 코드에서는 O(n²) 중첩 반복을 피하고, 리스트 검색을 반복하는 대신 딕셔너리나 집합을 활용하는 것만으로도 큰 성능 개선을 얻을 수 있다.

---

# 17.6 캐싱

## 캐싱이란?

캐싱은 이미 계산한 결과를 저장해두고, 같은 요청이 다시 들어오면 다시 계산하지 않고 저장된 값을 사용하는 방식이다.

예를 들어 어떤 함수가 같은 입력에 대해 항상 같은 출력을 반환한다면, 그 결과를 저장해두면 반복 계산을 줄일 수 있다.

캐싱이 효과적인 경우는 다음과 같다.

- 같은 계산이 반복된다.
- 계산 비용이 크다.
- 함수 결과가 입력값에 의해서만 결정된다.
- 저장된 결과를 재사용해도 문제가 없다.

반대로 다음 경우에는 캐싱을 조심해야 한다.

- 결과가 시간에 따라 달라진다.
- 외부 파일, API, DB 상태에 따라 결과가 달라진다.
- 입력값 종류가 너무 많아 캐시가 계속 커진다.
- 메모리 사용량이 중요한 상황이다.

## 직접 캐시 만들기

가장 단순한 캐시는 딕셔너리로 만들 수 있다.

\`\`\`python
cache = {}


def calculate_square(number: int) -> int:
    if number in cache:
        return cache[number]

    result = number * number
    cache[number] = result
    return result


print(calculate_square(10))
print(calculate_square(10))
\`\`\`

첫 번째 호출에서는 계산하고, 두 번째 호출에서는 저장된 값을 반환한다.

이 예제는 계산이 너무 단순해서 캐싱 효과가 거의 없다. 실제로는 더 비싼 계산이나 반복 호출되는 함수에서 캐싱이 유용하다.

## 재귀 함수와 캐싱

캐싱의 효과를 보기 쉬운 예는 피보나치 수열이다.

다음 코드는 매우 비효율적인 재귀 함수다.

\`\`\`python
def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
\`\`\`

이 함수는 같은 값을 반복해서 계산한다.

예를 들어 \`fibonacci(5)\`를 계산하는 과정에서 \`fibonacci(3)\`, \`fibonacci(2)\` 같은 값이 여러 번 호출된다.

직접 캐시를 적용하면 다음과 같다.

\`\`\`python
cache = {}


def fibonacci(n: int) -> int:
    if n in cache:
        return cache[n]

    if n <= 1:
        result = n
    else:
        result = fibonacci(n - 1) + fibonacci(n - 2)

    cache[n] = result
    return result


print(fibonacci(40))
\`\`\`

캐시를 사용하면 같은 값을 반복 계산하지 않기 때문에 훨씬 빠르게 실행된다.

## \`functools.lru_cache\`

파이썬은 캐싱을 쉽게 적용할 수 있는 \`functools.lru_cache\`를 제공한다.

\`\`\`python
from functools import lru_cache


@lru_cache(maxsize=128)
def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)


print(fibonacci(40))
print(fibonacci.cache_info())
\`\`\`

\`@lru_cache\`는 함수 호출 결과를 저장해두었다가 같은 인자가 들어오면 저장된 결과를 반환한다. \`maxsize\`는 캐시에 저장할 최대 항목 수를 의미한다.

\`cache_info()\`를 호출하면 캐시 사용 정보를 확인할 수 있다.

\`\`\`text
CacheInfo(hits=38, misses=41, maxsize=128, currsize=41)
\`\`\`

각 항목의 의미는 다음과 같다.

| 항목 | 의미 |
|---|---|
| \`hits\` | 캐시에 저장된 값을 사용한 횟수 |
| \`misses\` | 캐시에 없어 새로 계산한 횟수 |
| \`maxsize\` | 캐시에 저장할 최대 항목 수 |
| \`currsize\` | 현재 캐시에 저장된 항목 수 |

## \`functools.cache\`

파이썬에는 크기 제한이 없는 간단한 캐시인 \`functools.cache\`도 있다.

\`\`\`python
from functools import cache


@cache
def normalize_code(code: str) -> str:
    return code.strip().upper()
\`\`\`

\`cache\`는 \`lru_cache(maxsize=None)\`와 비슷하게 동작한다. 크기 제한이 없기 때문에 입력값 종류가 계속 늘어나는 함수에는 주의해서 사용해야 한다.

## 캐싱이 적합한 함수

캐싱은 순수 함수에 특히 잘 맞는다.

순수 함수란 같은 입력에 대해 항상 같은 출력을 반환하고, 외부 상태를 변경하지 않는 함수를 말한다.

\`\`\`python
def calculate_discount(price: int, rate: float) -> int:
    return int(price * rate)
\`\`\`

이런 함수는 캐싱하기 쉽다. 반면 다음 함수는 캐싱에 적합하지 않다.

\`\`\`python
from datetime import datetime


def get_current_time_message() -> str:
    return f"현재 시각은 {datetime.now()}입니다."
\`\`\`

이 함수는 호출할 때마다 결과가 달라진다. 캐싱하면 잘못된 결과를 반환할 수 있다.

## 실무 예시: 코드 변환 결과 캐싱

데이터 전처리에서 같은 코드 값을 반복해서 변환하는 경우가 있다.

\`\`\`python
from functools import lru_cache


@lru_cache(maxsize=1000)
def normalize_category(category: str) -> str:
    category = category.strip().lower()

    mapping = {
        "pc": "컴퓨터",
        "computer": "컴퓨터",
        "notebook": "노트북",
        "laptop": "노트북",
        "phone": "휴대폰",
        "mobile": "휴대폰",
    }

    return mapping.get(category, "기타")
\`\`\`

같은 카테고리 문자열이 반복해서 등장한다면, 캐시가 변환 비용을 줄일 수 있다. 물론 이 정도 변환은 매우 가벼운 작업이므로 실제 효과는 데이터 크기와 호출 횟수에 따라 달라진다. 반드시 측정해야 한다.

## 캐싱 사용 시 주의점

캐싱은 편리하지만 다음 점을 주의해야 한다.

- 캐시는 메모리를 사용한다.
- 입력값이 너무 다양하면 캐시 효과가 작다.
- 외부 상태에 따라 결과가 달라지는 함수에는 부적합하다.
- 리스트나 딕셔너리처럼 해시할 수 없는 인자는 \`lru_cache\`에 바로 사용할 수 없다.
- 오래 실행되는 프로그램에서는 캐시가 계속 커질 수 있다.

다음 코드는 에러가 발생한다.

\`\`\`python
from functools import lru_cache


@lru_cache(maxsize=128)
def process_items(items: list[int]) -> int:
    return sum(items)
\`\`\`

리스트는 변경 가능한 객체이므로 해시할 수 없다. 캐시 key로 사용할 수 없기 때문이다. 이런 경우 튜플로 바꾸는 방식을 고려할 수 있다.

\`\`\`python
from functools import lru_cache


@lru_cache(maxsize=128)
def process_items(items: tuple[int, ...]) -> int:
    return sum(items)


print(process_items((1, 2, 3)))
\`\`\`

## 핵심 정리

캐싱은 반복 계산을 줄이는 강력한 방법이다. 하지만 모든 함수에 적용할 수 있는 것은 아니다. 같은 입력에 대해 같은 결과를 반환하는 함수에 적합하며, 메모리 사용량과 캐시 크기를 함께 고려해야 한다. \`functools.lru_cache\`는 재귀 함수, 반복 계산 함수, 데이터 변환 함수에서 유용하게 사용할 수 있다.

---

# 17.7 메모리 최적화

## 시간만큼 중요한 메모리

성능 최적화라고 하면 실행 시간만 생각하기 쉽다. 하지만 데이터 처리에서는 메모리도 중요하다.

메모리를 너무 많이 사용하면 다음과 같은 문제가 생길 수 있다.

- 프로그램이 느려진다.
- 운영체제가 디스크를 임시 메모리처럼 사용해 전체 성능이 떨어진다.
- 메모리 부족으로 프로그램이 종료된다.
- 서버나 노트북 환경에서 다른 작업까지 느려진다.

데이터분석으로 넘어가면 CSV, JSON, 로그 파일, API 응답처럼 크기가 큰 데이터를 다루게 된다. 이때 모든 데이터를 한 번에 메모리에 올리는 습관은 문제가 될 수 있다.

## 리스트와 제너레이터 비교

리스트는 모든 값을 메모리에 저장한다.

\`\`\`python
numbers = [number * 2 for number in range(1_000_000)]
\`\`\`

위 코드는 100만 개의 값을 한 번에 리스트로 만든다. 이후 여러 번 사용해야 한다면 리스트가 필요할 수 있다. 하지만 값을 한 번씩만 처리한다면 제너레이터가 더 적합할 수 있다.

\`\`\`python
numbers = (number * 2 for number in range(1_000_000))
\`\`\`

제너레이터 표현식은 값을 한 번에 모두 만들지 않는다. 필요할 때 하나씩 생성한다.

\`\`\`python
total = sum(number * 2 for number in range(1_000_000))
\`\`\`

위 코드는 중간 리스트를 만들지 않고 합계를 계산한다. 메모리를 절약할 수 있다.

## 중간 리스트 줄이기

다음 코드는 여러 단계에서 중간 리스트를 만든다.

\`\`\`python
numbers = list(range(1_000_000))
even_numbers = [number for number in numbers if number % 2 == 0]
doubled_numbers = [number * 2 for number in even_numbers]
total = sum(doubled_numbers)

print(total)
\`\`\`

이 코드는 \`numbers\`, \`even_numbers\`, \`doubled_numbers\`라는 큰 리스트를 만든다. 꼭 중간 결과를 저장해야 한다면 괜찮지만, 최종 합계만 필요하다면 제너레이터 표현식으로 줄일 수 있다.

\`\`\`python
total = sum(
    number * 2
    for number in range(1_000_000)
    if number % 2 == 0
)

print(total)
\`\`\`

이 코드는 값을 하나씩 생성하고 바로 합산한다. 중간 리스트를 만들지 않는다.

## 파일을 한 번에 읽지 않기

큰 파일을 처리할 때 다음 방식은 위험할 수 있다.

\`\`\`python
with open("large_log.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()

for line in lines:
    if "ERROR" in line:
        print(line.strip())
\`\`\`

\`readlines()\`는 파일 전체를 리스트로 읽는다. 파일이 매우 크면 메모리를 많이 사용한다.

한 줄씩 처리하면 더 안전하다.

\`\`\`python
with open("large_log.txt", "r", encoding="utf-8") as file:
    for line in file:
        if "ERROR" in line:
            print(line.strip())
\`\`\`

파일 객체는 반복 가능하다. 따라서 큰 파일은 한 줄씩 읽는 방식이 좋다.

## 불필요한 복사 줄이기

리스트를 복사하면 새 리스트가 만들어지고 메모리를 더 사용한다.

\`\`\`python
numbers = list(range(1_000_000))
copy_numbers = numbers[:]
\`\`\`

복사가 필요한 상황도 있지만, 단순히 읽기만 한다면 복사하지 않는 것이 좋다.

함수에서 원본을 변경하지 않기 위해 복사하는 경우도 있다.

\`\`\`python
def sort_numbers(numbers: list[int]) -> list[int]:
    copied = numbers[:]
    copied.sort()
    return copied
\`\`\`

이 코드는 원본을 보호한다는 장점이 있다. 하지만 매우 큰 리스트를 다룬다면 복사 비용을 고려해야 한다. 원본을 바꿔도 되는지, 새 리스트가 필요한지 명확히 판단해야 한다.

## \`tracemalloc\`으로 메모리 추적하기

파이썬 표준 라이브러리의 \`tracemalloc\` 모듈을 사용하면 메모리 할당을 추적할 수 있다.

\`\`\`python
import tracemalloc

tracemalloc.start()

numbers = [number for number in range(1_000_000)]

current, peak = tracemalloc.get_traced_memory()

print(f"현재 메모리 사용량: {current / 1024 / 1024:.2f} MB")
print(f"최대 메모리 사용량: {peak / 1024 / 1024:.2f} MB")

tracemalloc.stop()
\`\`\`

\`current\`는 현재 추적 중인 메모리 사용량이고, \`peak\`는 추적을 시작한 이후의 최대 메모리 사용량이다.

메모리 사용량은 실행 환경과 파이썬 버전에 따라 달라질 수 있다. 중요한 것은 절대값보다 코드 변경 전후의 비교다.

## 스냅샷 비교

\`tracemalloc\`은 스냅샷을 찍어서 어디에서 메모리가 많이 할당되었는지 확인할 수 있다.

\`\`\`python
import tracemalloc

tracemalloc.start()

snapshot1 = tracemalloc.take_snapshot()

numbers = [number for number in range(1_000_000)]
texts = [str(number) for number in numbers]

snapshot2 = tracemalloc.take_snapshot()

stats = snapshot2.compare_to(snapshot1, "lineno")

for stat in stats[:5]:
    print(stat)

tracemalloc.stop()
\`\`\`

이 결과를 보면 어떤 줄에서 메모리 할당이 많이 발생했는지 확인할 수 있다.

## 실무 예시: 큰 로그 파일에서 에러만 추출하기

나쁜 방식은 파일 전체를 읽고, 다시 리스트로 필터링하는 것이다.

\`\`\`python
with open("app.log", "r", encoding="utf-8") as file:
    lines = file.readlines()

error_lines = [line for line in lines if "ERROR" in line]

with open("errors.log", "w", encoding="utf-8") as output:
    output.writelines(error_lines)
\`\`\`

이 방식은 원본 파일 전체와 에러 라인 리스트를 모두 메모리에 올린다.

더 좋은 방식은 한 줄씩 읽고, 필요한 줄만 바로 저장하는 것이다.

\`\`\`python
with open("app.log", "r", encoding="utf-8") as input_file, open(
    "errors.log",
    "w",
    encoding="utf-8",
) as output_file:
    for line in input_file:
        if "ERROR" in line:
            output_file.write(line)
\`\`\`

이 방식은 큰 파일에서도 메모리를 적게 사용한다. 데이터분석 전처리에서 매우 자주 쓰는 패턴이다.

## 핵심 정리

메모리 최적화의 핵심은 한 번에 너무 많은 데이터를 만들지 않는 것이다. 큰 리스트를 만들기 전에 제너레이터로 처리할 수 있는지 생각하고, 큰 파일은 한 줄씩 읽으며, 불필요한 복사를 줄여야 한다. 메모리 문제가 의심될 때는 \`tracemalloc\`으로 실제 할당 위치를 확인할 수 있다.

---

# 17.8 실무 최적화 패턴

## 패턴 1: 반복문 안에서 하지 말아야 할 일 줄이기

반복문은 데이터 처리의 기본이다. 반복문 자체가 문제라기보다, 반복문 안에서 무거운 일을 반복하는 것이 문제다.

나쁜 예시는 다음과 같다.

\`\`\`python
orders = [
    {"order_id": "O001", "amount": "30,000"},
    {"order_id": "O002", "amount": "15,000"},
]

for order in orders:
    import re
    amount = int(re.sub(r"[^0-9]", "", order["amount"]))
    order["amount"] = amount
\`\`\`

\`import re\`는 반복문 밖으로 빼는 것이 좋다.

\`\`\`python
import re

orders = [
    {"order_id": "O001", "amount": "30,000"},
    {"order_id": "O002", "amount": "15,000"},
]

for order in orders:
    amount = int(re.sub(r"[^0-9]", "", order["amount"]))
    order["amount"] = amount
\`\`\`

정규표현식을 반복해서 사용한다면 컴파일해둘 수도 있다.

\`\`\`python
import re

number_pattern = re.compile(r"[^0-9]")

for order in orders:
    amount = int(number_pattern.sub("", order["amount"]))
    order["amount"] = amount
\`\`\`

## 패턴 2: 같은 변환을 반복하지 않기

다음 코드는 같은 문자열 변환을 여러 번 반복한다.

\`\`\`python
for row in rows:
    if row["status"].strip().lower() == "paid":
        paid_count += 1
    if row["status"].strip().lower() == "cancelled":
        cancelled_count += 1
\`\`\`

상태값을 한 번만 정리해서 사용하는 것이 좋다.

\`\`\`python
for row in rows:
    status = row["status"].strip().lower()

    if status == "paid":
        paid_count += 1
    if status == "cancelled":
        cancelled_count += 1
\`\`\`

작은 차이처럼 보이지만, 데이터가 많고 반복이 많으면 이런 중복 변환이 누적된다. 또한 코드도 더 읽기 쉬워진다.

## 패턴 3: 딕셔너리로 분기 줄이기

조건문이 길어지는 경우 딕셔너리를 사용하면 코드가 단순해질 수 있다.

\`\`\`python
def get_discount_rate(grade: str) -> float:
    if grade == "VIP":
        return 0.2
    if grade == "GOLD":
        return 0.1
    if grade == "SILVER":
        return 0.05
    return 0.0
\`\`\`

딕셔너리를 사용하면 다음처럼 쓸 수 있다.

\`\`\`python
DISCOUNT_RATES = {
    "VIP": 0.2,
    "GOLD": 0.1,
    "SILVER": 0.05,
}


def get_discount_rate(grade: str) -> float:
    return DISCOUNT_RATES.get(grade, 0.0)
\`\`\`

이 방식은 성능뿐 아니라 유지보수성도 좋아진다. 등급이 추가되면 딕셔너리만 수정하면 된다.

## 패턴 4: 중간 결과를 파일로 저장하기

데이터 수집과 전처리가 오래 걸리는 경우, 모든 과정을 매번 처음부터 다시 실행하면 비효율적이다.

예를 들어 API에서 데이터를 수집하고, 정리하고, 분석용 CSV를 만든다고 하자.

\`\`\`text
API 수집 → 원본 JSON 저장 → 정제 → 분석용 CSV 저장
\`\`\`

이때 원본 JSON을 저장해두면 정제 로직을 수정할 때 API를 다시 호출하지 않아도 된다. 중간 결과 저장은 성능뿐 아니라 재현성과 디버깅에도 도움이 된다.

실무에서는 다음과 같이 단계를 나누는 것이 좋다.

\`\`\`text
1. 원본 데이터 수집
2. 원본 데이터 저장
3. 원본 데이터 검증
4. 정제 데이터 생성
5. 분석용 데이터 저장
\`\`\`

## 패턴 5: 너무 이른 최적화 피하기

성능 최적화가 중요하다고 해서 처음부터 모든 코드를 복잡하게 작성하면 안 된다.

예를 들어 데이터가 100개뿐인 상황에서 복잡한 캐시, 병렬 처리, 특수 자료구조를 도입하면 오히려 유지보수가 어려워진다.

다음 기준을 기억하자.

\`\`\`text
먼저 단순하게 작성한다.
테스트로 정확성을 확인한다.
측정한다.
느린 부분만 개선한다.
\`\`\`

이 원칙을 지키면 불필요한 최적화를 피할 수 있다.

## 패턴 6: 내장 함수와 표준 라이브러리 활용

파이썬의 내장 함수와 표준 라이브러리는 많은 경우 충분히 빠르고 안정적이다.

예를 들어 직접 합계를 구하는 대신 \`sum()\`을 사용할 수 있다.

\`\`\`python
total = sum(numbers)
\`\`\`

정렬은 직접 구현하지 않고 \`sorted()\`나 \`list.sort()\`를 사용한다.

\`\`\`python
sorted_orders = sorted(orders, key=lambda order: order["amount"])
\`\`\`

반복 카운트가 필요하다면 직접 딕셔너리를 만들 수도 있지만, 표준 라이브러리의 \`collections.Counter\`를 사용할 수도 있다.

\`\`\`python
from collections import Counter

categories = ["A", "B", "A", "C", "B", "A"]
counts = Counter(categories)

print(counts)
\`\`\`

기초 과정에서는 \`collections\`를 깊게 다루지 않았지만, 고급 과정에서는 표준 라이브러리를 적극적으로 활용하는 습관이 중요하다.

## 패턴 7: 데이터분석 전 단계에서의 최적화

이후 데이터분석 기초 과정에서는 pandas를 사용하게 된다. pandas는 표 형태 데이터를 처리하는 강력한 도구지만, 그 전에 원천 데이터가 너무 지저분하거나 너무 크면 분석이 어려워진다.

고급 파이썬 단계에서 할 수 있는 최적화는 다음과 같다.

- 큰 로그 파일을 한 줄씩 읽어 필요한 데이터만 추출한다.
- API 응답을 JSON Lines로 저장한다.
- 중복 데이터를 미리 제거한다.
- 잘못된 행을 별도 파일로 분리한다.
- 분석에 필요한 컬럼만 선택해 CSV로 저장한다.
- 날짜와 숫자 형식을 미리 정리한다.
- 반복 조회가 많은 값은 딕셔너리나 집합으로 준비한다.

이런 작업을 잘 해두면 pandas로 분석할 때 코드가 훨씬 단순해진다.

## 핵심 정리

실무 최적화는 작은 기술을 많이 아는 것보다, 비효율적인 구조를 알아차리는 능력이 중요하다. 반복문 안의 불필요한 작업을 줄이고, 적절한 자료구조를 선택하고, 큰 데이터는 스트리밍으로 처리하고, 중간 결과를 저장하는 것만으로도 많은 성능 문제를 해결할 수 있다.

---

# 17.9 종합 예제: CSV 검증 코드 최적화하기

## 문제 상황

다음과 같은 CSV 데이터가 있다고 하자.

\`\`\`csv
order_id,customer_id,amount,status
O001,C001,"30,000",paid
O002,C999,"15,000",paid
O003,C002,"abc",cancelled
\`\`\`

우리는 주문 데이터를 검증해야 한다.

검증 조건은 다음과 같다.

- 고객 ID가 유효한 고객 목록에 있어야 한다.
- 금액은 숫자로 변환 가능해야 한다.
- 상태값은 \`paid\`, \`cancelled\`, \`pending\` 중 하나여야 한다.

## 비효율적인 코드

먼저 단순하지만 비효율적인 코드를 보자.

\`\`\`python
import csv

valid_customer_ids = ["C001", "C002", "C003", "C004"]
valid_statuses = ["paid", "cancelled", "pending"]

invalid_rows = []

with open("orders.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.DictReader(file)
    rows = list(reader)

for row in rows:
    errors = []

    if row["customer_id"] not in valid_customer_ids:
        errors.append("invalid customer_id")

    amount_text = row["amount"].replace(",", "")
    if not amount_text.isdigit():
        errors.append("invalid amount")

    if row["status"].strip().lower() not in valid_statuses:
        errors.append("invalid status")

    if errors:
        row["errors"] = "; ".join(errors)
        invalid_rows.append(row)

print(invalid_rows)
\`\`\`

이 코드는 데이터가 작을 때는 괜찮다. 하지만 데이터가 커지면 다음 문제가 있다.

- CSV 전체를 \`list(reader)\`로 메모리에 올린다.
- 유효 고객 ID를 리스트에서 반복 검색한다.
- 유효 상태값도 리스트에서 반복 검색한다.
- 잘못된 행을 출력만 하고 파일로 남기지 않는다.

## 개선 방향

개선 방향은 다음과 같다.

- 유효 고객 ID와 상태값을 집합으로 바꾼다.
- CSV를 한 줄씩 읽는다.
- 잘못된 행은 바로 파일에 기록한다.
- 금액 변환 함수를 분리한다.
- 처리 건수와 오류 건수를 집계한다.

## 개선된 코드

\`\`\`python
import csv
from pathlib import Path

VALID_CUSTOMER_IDS = {"C001", "C002", "C003", "C004"}
VALID_STATUSES = {"paid", "cancelled", "pending"}


def parse_amount(value: str) -> int | None:
    cleaned = value.replace(",", "").strip()

    if not cleaned.isdigit():
        return None

    return int(cleaned)


def validate_row(row: dict[str, str]) -> list[str]:
    errors = []

    if row["customer_id"] not in VALID_CUSTOMER_IDS:
        errors.append("invalid customer_id")

    if parse_amount(row["amount"]) is None:
        errors.append("invalid amount")

    status = row["status"].strip().lower()
    if status not in VALID_STATUSES:
        errors.append("invalid status")

    return errors


def validate_csv(input_path: str, output_path: str) -> None:
    total_count = 0
    invalid_count = 0

    with open(input_path, "r", encoding="utf-8", newline="") as input_file, open(
        output_path,
        "w",
        encoding="utf-8",
        newline="",
    ) as output_file:
        reader = csv.DictReader(input_file)

        fieldnames = list(reader.fieldnames or []) + ["errors"]
        writer = csv.DictWriter(output_file, fieldnames=fieldnames)
        writer.writeheader()

        for row in reader:
            total_count += 1
            errors = validate_row(row)

            if errors:
                invalid_count += 1
                row["errors"] = "; ".join(errors)
                writer.writerow(row)

    print(f"전체 행 수: {total_count}")
    print(f"오류 행 수: {invalid_count}")


validate_csv("orders.csv", "invalid_orders.csv")
\`\`\`

이 코드는 다음 면에서 개선되었다.

- 고객 ID와 상태값 포함 여부 확인이 빠르다.
- CSV 전체를 메모리에 올리지 않는다.
- 잘못된 행을 별도 파일에 저장한다.
- 검증 로직이 함수로 분리되어 테스트하기 쉽다.
- 전체 건수와 오류 건수를 확인할 수 있다.

## 더 개선할 수 있는 부분

실무에서는 다음 내용을 추가할 수 있다.

- 로그 남기기
- 파일 경로를 명령행 인수로 받기
- 유효 고객 목록을 DB나 파일에서 읽기
- 필수 컬럼 누락 검사
- 큰 파일 처리 시간 측정
- 오류 유형별 개수 집계
- 테스트 코드 작성

이 종합 예제는 고급 파이썬 과정과 데이터분석 과정 사이를 연결한다. pandas로 분석하기 전에, 원천 CSV를 안전하고 효율적으로 검증하고 정리하는 흐름을 보여준다.

---

# 17장 핵심 정리

성능 최적화는 빠른 코드를 감으로 작성하는 일이 아니다. 정확하게 동작하는 코드를 먼저 만들고, 실행 시간을 측정하고, 프로파일링으로 병목을 찾은 뒤, 필요한 부분만 개선하는 과정이다.

이 장에서 배운 핵심은 다음과 같다.

- 성능 최적화는 정확성과 가독성을 해치지 않는 범위에서 해야 한다.
- 최적화 전에는 반드시 측정해야 한다.
- \`time.perf_counter()\`는 간단한 실행 시간 측정에 유용하다.
- \`timeit\`은 작은 코드 조각을 반복 측정할 때 유용하다.
- \`cProfile\`은 함수별 호출 횟수와 실행 시간을 확인하는 데 사용한다.
- 리스트 검색을 반복하는 코드에서는 집합이나 딕셔너리를 고려한다.
- 중첩 반복은 데이터가 커질수록 급격히 느려질 수 있다.
- 캐싱은 반복 계산을 줄일 수 있지만 메모리 사용량과 함수 특성을 고려해야 한다.
- 큰 데이터는 한 번에 메모리에 올리지 말고 한 줄씩 또는 청크 단위로 처리한다.
- 제너레이터는 중간 리스트 생성을 줄여 메모리를 절약할 수 있다.
- \`tracemalloc\`은 메모리 할당 위치를 추적하는 데 사용할 수 있다.
- 실무 최적화는 측정, 자료구조 선택, 반복문 개선, 스트리밍 처리, 중간 결과 저장의 조합이다.

---

# 연습문제

## 문제 1

성능 최적화를 시작하기 전에 가장 먼저 해야 할 일은 무엇인가?

1. 코드를 최대한 짧게 줄인다.
2. 실행 시간을 측정하고 병목을 찾는다.
3. 모든 반복문을 리스트 컴프리헨션으로 바꾼다.
4. 모든 함수에 캐시를 적용한다.

## 문제 2

다음 중 \`timeit\`을 사용하는 주된 목적은 무엇인가?

1. 큰 파일을 압축하기 위해
2. 작은 코드 조각의 실행 시간을 반복 측정하기 위해
3. 메모리 누수를 자동으로 수정하기 위해
4. 데이터베이스 연결을 관리하기 위해

## 문제 3

다음 코드에서 포함 여부 확인이 자주 발생하고, \`valid_ids\`의 크기가 매우 크다면 어떤 자료구조로 바꾸는 것이 적절한가?

\`\`\`python
valid_ids = ["A001", "A002", "A003"]

if user_id in valid_ids:
    print("valid")
\`\`\`

## 문제 4

다음 코드의 성능 문제가 무엇인지 설명하라.

\`\`\`python
for order in orders:
    for customer in customers:
        if order["customer_id"] == customer["customer_id"]:
            order["customer_name"] = customer["name"]
\`\`\`

## 문제 5

다음 중 \`cProfile\`로 확인하기 좋은 정보가 아닌 것은 무엇인가?

1. 함수 호출 횟수
2. 함수별 실행 시간
3. 누적 실행 시간
4. 코드의 문법 오류 자동 수정

## 문제 6

다음 코드에서 중간 리스트를 만들지 않도록 제너레이터 표현식으로 바꾸어라.

\`\`\`python
numbers = [number * 2 for number in range(1000)]
total = sum(numbers)
\`\`\`

## 문제 7

다음 함수에 \`functools.lru_cache\`를 적용하라.

\`\`\`python
def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
\`\`\`

## 문제 8

\`lru_cache\`를 적용하기에 적합하지 않은 함수의 특징을 두 가지 쓰라.

## 문제 9

다음 파일 처리 코드의 문제점을 설명하고, 한 줄씩 읽는 방식으로 바꾸어라.

\`\`\`python
with open("log.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()

for line in lines:
    if "ERROR" in line:
        print(line)
\`\`\`

## 문제 10

다음 코드에서 반복문 안에서 불필요하게 반복되는 작업을 줄여라.

\`\`\`python
for row in rows:
    if row["status"].strip().lower() == "paid":
        paid_count += 1
    if row["status"].strip().lower() == "cancelled":
        cancelled_count += 1
\`\`\`

## 문제 11

다음 코드에서 정렬 위치의 문제점을 설명하라.

\`\`\`python
result = []

for item in items:
    result.append(item)
    result.sort(key=lambda row: row["amount"])
\`\`\`

## 문제 12

\`tracemalloc\`은 어떤 상황에서 유용한가?

## 문제 13

다음 두 코드 중 메모리 사용량이 더 적을 가능성이 큰 코드는 어느 것인가? 이유도 설명하라.

\`\`\`python
# 코드 A
values = [number * 2 for number in range(1_000_000)]
total = sum(values)

# 코드 B
total = sum(number * 2 for number in range(1_000_000))
\`\`\`

## 문제 14

성능 최적화에서 “너무 이른 최적화”가 문제가 되는 이유를 설명하라.

## 문제 15

다음 요구사항을 만족하는 검증 함수를 작성하라.

- 입력은 주문 딕셔너리다.
- \`amount\` 값에서 쉼표를 제거한 뒤 정수로 변환할 수 있어야 한다.
- 변환 가능하면 정수 금액을 반환한다.
- 변환 불가능하면 \`None\`을 반환한다.

예시 입력:

\`\`\`python
{"amount": "30,000"}
{"amount": "abc"}
\`\`\`

---

# 정답 및 해설

## 문제 1 정답

정답은 2번이다. 성능 최적화는 먼저 측정하고 병목을 찾은 뒤 진행해야 한다. 감으로 코드를 고치면 실제 병목이 아닌 곳을 수정할 수 있다.

## 문제 2 정답

정답은 2번이다. \`timeit\`은 작은 코드 조각의 실행 시간을 반복 측정할 때 유용하다.

## 문제 3 정답

집합을 사용하는 것이 적절하다.

\`\`\`python
valid_ids = {"A001", "A002", "A003"}

if user_id in valid_ids:
    print("valid")
\`\`\`

집합은 포함 여부 확인에 강한 자료구조다. 데이터가 크고 조회가 반복될 때 리스트보다 유리할 수 있다.

## 문제 4 정답

주문마다 고객 목록 전체를 반복 검색하고 있다. 주문 수가 n개, 고객 수가 m개라면 최대 n × m번 비교할 수 있다. 데이터가 커지면 매우 느려질 수 있다.

개선 방법은 고객 ID를 key로 하는 딕셔너리를 먼저 만드는 것이다.

\`\`\`python
customer_map = {
    customer["customer_id"]: customer["name"]
    for customer in customers
}

for order in orders:
    order["customer_name"] = customer_map.get(order["customer_id"])
\`\`\`

## 문제 5 정답

정답은 4번이다. \`cProfile\`은 함수 호출 횟수와 실행 시간을 분석하는 도구이지, 문법 오류를 자동으로 수정하는 도구가 아니다.

## 문제 6 정답

\`\`\`python
total = sum(number * 2 for number in range(1000))
\`\`\`

중간 리스트를 만들지 않고 값을 하나씩 생성해 합산한다.

## 문제 7 정답

\`\`\`python
from functools import lru_cache


@lru_cache(maxsize=128)
def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
\`\`\`

같은 \`n\`에 대한 결과를 캐시에 저장하므로 반복 계산을 줄일 수 있다.

## 문제 8 정답

예시는 다음과 같다.

- 같은 입력이어도 호출 시점마다 결과가 달라지는 함수
- 파일, API, DB 등 외부 상태에 따라 결과가 달라지는 함수
- 입력값 종류가 너무 많아 캐시가 계속 커지는 함수
- 리스트나 딕셔너리처럼 해시할 수 없는 값을 인자로 받는 함수

## 문제 9 정답

문제점은 \`readlines()\`가 파일 전체를 리스트로 읽는다는 점이다. 파일이 크면 메모리를 많이 사용할 수 있다.

개선 코드는 다음과 같다.

\`\`\`python
with open("log.txt", "r", encoding="utf-8") as file:
    for line in file:
        if "ERROR" in line:
            print(line)
\`\`\`

## 문제 10 정답

\`\`\`python
for row in rows:
    status = row["status"].strip().lower()

    if status == "paid":
        paid_count += 1
    if status == "cancelled":
        cancelled_count += 1
\`\`\`

\`strip().lower()\` 변환을 한 번만 수행한다.

## 문제 11 정답

반복문 안에서 값을 하나 추가할 때마다 전체 리스트를 정렬하고 있다. 데이터가 많으면 매우 비효율적이다. 대부분의 경우 모든 값을 추가한 뒤 마지막에 한 번만 정렬하면 된다.

\`\`\`python
result = []

for item in items:
    result.append(item)

result.sort(key=lambda row: row["amount"])
\`\`\`

## 문제 12 정답

\`tracemalloc\`은 파이썬 코드에서 메모리 할당이 어디에서 많이 발생하는지 추적할 때 유용하다. 큰 리스트를 만들거나, 중간 결과를 많이 생성하거나, 메모리 사용량이 계속 증가하는 상황을 분석할 수 있다.

## 문제 13 정답

코드 B가 메모리 사용량이 더 적을 가능성이 크다.

코드 A는 100만 개의 값을 리스트로 만든 뒤 합계를 계산한다. 코드 B는 제너레이터 표현식을 사용해 값을 하나씩 생성하고 바로 합산하므로 중간 리스트를 만들지 않는다.

## 문제 14 정답

너무 이른 최적화는 실제 병목이 아닌 곳을 복잡하게 만들 수 있다. 코드가 어려워지고 테스트와 유지보수가 힘들어질 수 있으며, 실제 성능 개선 효과는 작을 수 있다. 먼저 올바르게 동작하는 코드를 만들고, 측정한 뒤 필요한 부분만 최적화하는 것이 좋다.

## 문제 15 정답

\`\`\`python
def parse_amount(order: dict[str, str]) -> int | None:
    amount_text = order.get("amount", "")
    cleaned = amount_text.replace(",", "").strip()

    if not cleaned.isdigit():
        return None

    return int(cleaned)
\`\`\`

사용 예시는 다음과 같다.

\`\`\`python
print(parse_amount({"amount": "30,000"}))
print(parse_amount({"amount": "abc"}))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
30000
None
\`\`\`

---

# 참고 문서

- Python 공식 문서: \`timeit\` — Measure execution time of small code snippets  
  https://docs.python.org/3/library/timeit.html
- Python 공식 문서: The Python Profilers  
  https://docs.python.org/3/library/profile.html
- Python 공식 문서: \`functools\` — Higher-order functions and operations on callable objects  
  https://docs.python.org/3/library/functools.html
- Python 공식 문서: \`tracemalloc\` — Trace memory allocations  
  https://docs.python.org/3/library/tracemalloc.html
- Python 공식 문서: \`time\` — Time access and conversions  
  https://docs.python.org/3/library/time.html
- Python 공식 문서: \`collections\` — Container datatypes  
  https://docs.python.org/3/library/collections.html
`;export{e as default};