var e=`<!-- 원본: python_advanced_chapter_16_book.md / 세부 장: 16-5 -->

# 16.5 공유 데이터와 Lock

## 경쟁 상태란 무엇인가

경쟁 상태는 여러 실행 흐름이 같은 데이터를 동시에 읽고 쓰면서 결과가 실행 순서에 따라 달라지는 문제다.

예를 들어 두 스레드가 동시에 \`counter += 1\`을 실행한다고 생각해보자.

\`counter += 1\`은 겉으로는 한 줄이지만 내부적으로는 다음 과정으로 볼 수 있다.

\`\`\`text
1. counter 값을 읽는다.
2. 1을 더한다.
3. 다시 counter에 저장한다.
\`\`\`

두 스레드가 같은 시점에 값을 읽으면 둘 다 같은 값을 기준으로 1을 더할 수 있다. 그러면 증가가 한 번 사라진 것처럼 보인다.

## Lock이 필요한 이유

\`Lock\`은 한 번에 하나의 스레드만 특정 코드 구역에 들어가도록 제한하는 도구다.

은행 창구를 생각해보자. 같은 계좌 잔액을 여러 직원이 동시에 수정하면 문제가 생길 수 있다. 그래서 계좌 정보를 수정하는 동안에는 한 직원만 처리하도록 막아야 한다.

파이썬에서는 \`threading.Lock\`을 사용할 수 있다.

\`\`\`python
import threading

counter = 0
lock = threading.Lock()


def increase() -> None:
    global counter
    for _ in range(100_000):
        with lock:
            counter += 1


threads = [threading.Thread(target=increase) for _ in range(2)]

for thread in threads:
    thread.start()

for thread in threads:
    thread.join()

print(counter)
\`\`\`

\`with lock:\` 블록 안에는 한 번에 하나의 스레드만 들어갈 수 있다. 따라서 공유 데이터 수정이 더 안전해진다.

## 임계 구역

여러 스레드가 동시에 실행하면 안 되는 코드 구역을 임계 구역이라고 한다.

예를 들어 다음 작업은 임계 구역이 될 수 있다.

- 공유 리스트에 결과 추가
- 공유 딕셔너리 값 수정
- 카운터 증가
- 파일 하나에 여러 스레드가 동시에 쓰기
- 같은 DB 연결 객체를 여러 스레드에서 함께 사용

임계 구역이 너무 넓으면 스레드를 사용하는 효과가 줄어든다. 반대로 임계 구역을 보호하지 않으면 데이터가 깨질 수 있다.

## 공유 데이터를 줄이는 설계

스레드 코드에서 가장 좋은 전략은 가능한 한 공유 데이터를 줄이는 것이다.

나쁜 구조는 다음과 같다.

\`\`\`python
results = []


def worker(item):
    # 여러 스레드가 같은 리스트를 수정
    results.append(process(item))
\`\`\`

더 나은 구조는 각 작업이 결과를 반환하고, 메인 흐름에서 결과를 모으는 것이다. 이 방식은 \`concurrent.futures\`를 사용하면 더 쉽게 작성할 수 있다.

\`\`\`python
def worker(item):
    return process(item)
\`\`\`

동시성 코드에서는 “공유해서 고치기”보다 “각자 처리하고 나중에 합치기”가 안전하다.

## 데드락

Lock을 잘못 사용하면 데드락이 발생할 수 있다. 데드락은 서로가 서로의 작업이 끝나기를 기다리면서 아무도 진행하지 못하는 상태다.

예를 들어 다음 상황을 생각해보자.

\`\`\`text
스레드 A: lock1을 가진 상태에서 lock2를 기다림
스레드 B: lock2를 가진 상태에서 lock1을 기다림
\`\`\`

두 스레드는 서로 기다리기만 하고 끝나지 않는다.

데드락을 피하려면 다음 원칙을 지키는 것이 좋다.

- Lock을 필요한 최소 구역에만 사용한다.
- 여러 Lock을 사용할 때는 항상 같은 순서로 획득한다.
- 가능한 한 공유 상태를 줄인다.
- 복잡한 스레드 직접 제어보다 \`concurrent.futures\` 같은 고수준 도구를 사용한다.

---
`;export{e as default};