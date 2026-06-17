var e=`<!-- 원본: python_advanced_chapter_17_book.md / 세부 장: 17-3 -->

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
`;export{e as default};