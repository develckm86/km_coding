var e=`<!-- 원본: python_advanced_chapter_17_book.md / 세부 장: 17-8 -->

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
`;export{e as default};