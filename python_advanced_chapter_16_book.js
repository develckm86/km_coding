var e=`# 16장 동시성 프로그래밍

## 이 장에서 배울 내용

지금까지 우리는 파일, API, 데이터베이스, 예외 처리, 로깅, 테스트처럼 실무 파이썬 코드에 필요한 중요한 요소들을 배웠다. 이제 남은 질문은 이것이다.

“코드를 어떻게 더 빠르게 실행할 수 있을까?”

모든 프로그램이 반드시 빨라야 하는 것은 아니다. 대부분의 업무 자동화 프로그램은 정확하게 동작하고, 실패했을 때 원인을 찾을 수 있고, 다시 실행할 수 있는 것이 더 중요하다. 하지만 어떤 작업은 시간이 오래 걸린다.

예를 들어 다음과 같은 상황을 생각해보자.

- API를 1,000번 호출해야 한다.
- 이미지 파일 5,000개를 다운로드해야 한다.
- 여러 CSV 파일을 압축 해제하고 정리해야 한다.
- 큰 로그 파일을 여러 개 읽어야 한다.
- 계산이 오래 걸리는 함수를 많은 데이터에 적용해야 한다.

이런 작업을 하나씩 순서대로 처리하면 단순하고 이해하기 쉽지만, 전체 시간이 너무 오래 걸릴 수 있다. 특히 네트워크 요청이나 파일 입출력처럼 “기다리는 시간”이 많은 작업은 동시에 여러 개를 진행하면 전체 시간을 줄일 수 있다.

이 장에서는 파이썬의 동시성 프로그래밍을 배운다. 동시성은 여러 작업을 겹쳐서 처리하는 방식이다. 파이썬에서는 대표적으로 다음 방식을 사용한다.

- 스레드
- 프로세스
- 비동기 프로그래밍
- \`concurrent.futures\`
- \`asyncio\`

이 장의 목표는 복잡한 병렬 시스템을 설계하는 것이 아니다. 데이터분석 과정으로 넘어가기 전에, 파일 처리, API 수집, 데이터 전처리 작업에서 “언제 스레드를 쓰고, 언제 프로세스를 쓰고, 언제 비동기를 고려해야 하는지” 판단할 수 있는 기초를 만드는 것이다.

이 장에서는 다음 내용을 다룬다.

- 동시성이 필요한 이유
- CPU 중심 작업과 I/O 중심 작업의 차이
- GIL의 개념과 주의점
- \`threading\` 기초
- 스레드에서 공유 데이터가 위험한 이유
- \`Lock\`을 이용한 동기화
- \`concurrent.futures.ThreadPoolExecutor\`
- \`multiprocessing\` 기초
- \`ProcessPoolExecutor\`
- 프로세스 방식의 장단점
- \`async\`, \`await\`, 이벤트 루프
- \`asyncio\` 기초
- 스레드, 프로세스, asyncio 선택 기준
- 여러 API 요청, 여러 파일 처리, 대량 작업 최적화 패턴

---

# 16.1 동시성이 필요한 이유

## 순차 실행의 한계

가장 단순한 프로그램은 위에서 아래로 한 줄씩 실행된다. 이것을 순차 실행이라고 한다.

예를 들어 여러 개의 작업을 순서대로 처리하는 코드는 다음과 같다.

\`\`\`python
import time


def download_file(name: str) -> None:
    print(f"{name} 다운로드 시작")
    time.sleep(1)
    print(f"{name} 다운로드 완료")


download_file("file1")
download_file("file2")
download_file("file3")
\`\`\`

실행 흐름은 다음과 같다.

\`\`\`text
file1 다운로드 시작
file1 다운로드 완료
file2 다운로드 시작
file2 다운로드 완료
file3 다운로드 시작
file3 다운로드 완료
\`\`\`

각 작업이 1초씩 걸린다면 전체 시간은 약 3초가 된다. 작업이 3개뿐이면 문제가 크지 않지만, 1,000개라면 이야기가 달라진다.

\`\`\`text
1개 작업  : 약 1초
10개 작업 : 약 10초
100개 작업: 약 100초
1,000개 작업: 약 1,000초
\`\`\`

작업 수가 늘어날수록 전체 시간이 선형적으로 증가한다.

## 기다리는 시간이 많은 작업

어떤 작업은 실제로 CPU가 계속 계산하는 시간이 아니라, 외부 응답을 기다리는 시간이 대부분이다.

예를 들어 다음 작업들은 기다리는 시간이 많다.

- 웹 API 응답 기다리기
- 파일 다운로드 기다리기
- 데이터베이스 응답 기다리기
- 디스크에서 파일 읽기
- 네트워크로 파일 전송하기

이런 작업을 I/O 중심 작업이라고 한다. I/O는 Input/Output의 약자다. 파일, 네트워크, 데이터베이스처럼 프로그램 바깥과 데이터를 주고받는 작업을 의미한다.

I/O 중심 작업에서는 한 작업이 응답을 기다리는 동안 다른 작업을 시작할 수 있다. 이것이 동시성이 유용한 대표적인 상황이다.

## 동시에 처리한다는 뜻

동시성은 여러 작업을 반드시 같은 순간에 물리적으로 실행한다는 뜻만은 아니다. 중요한 것은 작업들이 서로 기다리는 시간을 겹치게 만들어 전체 시간을 줄이는 것이다.

예를 들어 식당에서 주문을 처리한다고 생각해보자.

순차 처리 방식은 다음과 같다.

\`\`\`text
1. 첫 번째 손님의 음식을 주문받는다.
2. 음식이 완성될 때까지 기다린다.
3. 첫 번째 손님에게 음식을 준다.
4. 두 번째 손님의 주문을 받는다.
5. 음식이 완성될 때까지 기다린다.
\`\`\`

이 방식은 너무 비효율적이다.

실제 식당은 보통 다음처럼 처리한다.

\`\`\`text
1. 첫 번째 손님의 주문을 받는다.
2. 주방에 전달한다.
3. 음식이 만들어지는 동안 두 번째 손님의 주문을 받는다.
4. 세 번째 손님의 주문을 받는다.
5. 완성된 음식부터 전달한다.
\`\`\`

음식을 만드는 시간이 기다림이라면, 그 기다림 동안 다른 일을 처리할 수 있다. 이것이 동시성의 핵심 아이디어다.

## 병렬성과 동시성은 다르다

동시성과 병렬성은 자주 혼동된다.

동시성은 여러 작업을 겹쳐서 처리하는 구조다. 작업들이 동시에 진행되는 것처럼 보인다.

병렬성은 실제로 여러 작업이 같은 순간에 여러 CPU 코어에서 실행되는 구조다.

\`\`\`text
동시성: 여러 작업을 번갈아 처리하거나 기다리는 시간을 겹친다.
병렬성: 여러 작업을 실제로 동시에 실행한다.
\`\`\`

비유하면 다음과 같다.

\`\`\`text
동시성: 한 사람이 커피를 내리면서 토스트가 구워지는 동안 다른 일을 한다.
병렬성: 두 사람이 각각 커피와 토스트를 동시에 만든다.
\`\`\`

파이썬에서 스레드는 동시성에 자주 사용되고, 프로세스는 병렬성에 자주 사용된다. \`asyncio\`는 한 스레드 안에서 많은 I/O 작업을 효율적으로 다루는 동시성 방식이다.

## 데이터 처리에서 동시성이 필요한 상황

데이터분석 전 단계에서는 다음과 같은 작업에서 동시성이 유용하다.

첫째, 여러 API 요청을 처리할 때다.

\`\`\`text
고객 ID 1,000개에 대해 각각 API를 호출해 상세 정보를 가져온다.
\`\`\`

이 작업을 하나씩 처리하면 느리다. API 응답을 기다리는 동안 다른 API 요청을 보낼 수 있다.

둘째, 여러 파일을 처리할 때다.

\`\`\`text
여러 폴더에 있는 로그 파일을 읽고 필요한 줄만 추출한다.
\`\`\`

파일 읽기는 디스크 I/O가 포함된다. 파일 수가 많다면 작업을 나누어 처리할 수 있다.

셋째, 다운로드 작업이다.

\`\`\`text
이미지 URL 목록을 읽고 이미지를 모두 다운로드한다.
\`\`\`

각 다운로드는 네트워크 응답을 기다린다. 이런 작업은 스레드나 비동기 방식과 잘 맞는다.

넷째, 계산이 많은 작업이다.

\`\`\`text
큰 숫자 목록에 대해 복잡한 계산을 반복한다.
\`\`\`

이런 작업은 CPU 중심 작업이다. 이 경우에는 스레드보다 프로세스를 고려하는 것이 일반적이다.

---

# 16.2 CPU 중심 작업과 I/O 중심 작업

## 작업의 성격을 먼저 구분해야 한다

동시성 도구를 선택하기 전에 가장 먼저 해야 할 일은 작업의 성격을 구분하는 것이다.

작업은 크게 두 가지로 나눌 수 있다.

\`\`\`text
CPU 중심 작업: 계산 자체가 오래 걸리는 작업
I/O 중심 작업: 외부 응답이나 파일 입출력을 기다리는 작업
\`\`\`

이 구분이 중요한 이유는 도구 선택이 달라지기 때문이다.

## CPU 중심 작업

CPU 중심 작업은 컴퓨터의 계산 능력을 많이 사용하는 작업이다. 다음과 같은 작업이 여기에 해당한다.

- 큰 숫자의 소수 판별
- 이미지 픽셀 단위 계산
- 복잡한 수학 계산 반복
- 대량 문자열 변환
- 암호화, 해시 계산
- 순수 파이썬 반복문으로 많은 계산 수행

예를 들어 다음 코드는 CPU 중심 작업이다.

\`\`\`python
def count_numbers(limit: int) -> int:
    total = 0
    for number in range(limit):
        total += number * number
    return total


result = count_numbers(10_000_000)
print(result)
\`\`\`

이 코드는 외부 응답을 기다리지 않는다. CPU가 계속 계산한다. 이런 작업을 여러 개 동시에 빠르게 처리하려면 실제로 여러 CPU 코어를 사용하는 방식이 필요하다.

파이썬에서는 일반적으로 \`multiprocessing\`이나 \`ProcessPoolExecutor\`를 고려한다.

## I/O 중심 작업

I/O 중심 작업은 외부와 데이터를 주고받느라 기다리는 시간이 많은 작업이다.

대표적인 예는 다음과 같다.

- API 요청
- 웹 페이지 다운로드
- 파일 다운로드
- 데이터베이스 조회
- 파일 읽기와 쓰기
- 네트워크 소켓 통신

예를 들어 다음 코드는 I/O 중심 작업을 흉내 낸다.

\`\`\`python
import time


def request_data(user_id: int) -> dict:
    time.sleep(1)  # API 응답을 기다린다고 가정
    return {"user_id": user_id, "status": "ok"}
\`\`\`

\`time.sleep(1)\` 동안 CPU가 계산하는 것은 거의 없다. 그저 기다린다. 이처럼 기다리는 시간이 많은 작업은 스레드나 비동기 방식으로 처리하면 전체 시간을 줄일 수 있다.

## 같은 “느린 작업”이라도 이유가 다르다

초보자는 작업이 느리면 모두 같은 문제라고 생각하기 쉽다. 하지만 느린 이유에 따라 해결 방법이 달라진다.

\`\`\`text
계산이 많아서 느리다        → CPU 중심 작업
응답을 기다리느라 느리다    → I/O 중심 작업
파일을 너무 많이 읽어서 느리다 → I/O 중심 작업에 가까움
반복문 구조가 비효율적이다   → 알고리즘 또는 자료구조 문제
\`\`\`

동시성은 만능 해결책이 아니다. 잘못 사용하면 코드가 더 복잡해지고, 오류가 더 찾기 어려워진다.

## 판단 질문

동시성 도구를 선택하기 전에 다음 질문을 해보자.

\`\`\`text
1. 작업 대부분이 계산인가, 기다림인가?
2. 외부 API나 파일 응답을 기다리는 시간이 긴가?
3. 여러 작업이 서로 독립적인가?
4. 작업 결과를 합칠 때 순서가 중요한가?
5. 실패한 작업을 따로 기록해야 하는가?
6. 데이터 공유가 필요한가?
\`\`\`

작업이 서로 독립적이고 기다리는 시간이 많다면 스레드나 \`asyncio\`가 잘 맞는다. 계산이 많고 여러 CPU 코어를 사용하고 싶다면 프로세스가 더 적합할 수 있다.

## 선택 기준 요약

| 작업 유형 | 예시 | 적합한 도구 |
|---|---|---|
| I/O 중심 | API 요청, 다운로드, 파일 읽기 | 스레드, \`ThreadPoolExecutor\`, \`asyncio\` |
| CPU 중심 | 대량 계산, 복잡한 변환 | 프로세스, \`ProcessPoolExecutor\` |
| 많은 네트워크 연결 | 수많은 API 요청, 소켓 통신 | \`asyncio\` |
| 간단한 병렬 실행 | 여러 독립 작업 실행 | \`concurrent.futures\` |
| 데이터 공유가 많음 | 공유 상태 변경 | 신중하게 설계, 가능하면 공유 줄이기 |

---

# 16.3 GIL 개념

## GIL이란 무엇인가

CPython에는 GIL이라는 개념이 있다. CPython은 우리가 일반적으로 설치해서 사용하는 대표적인 파이썬 구현체다. GIL은 Global Interpreter Lock의 약자다.

아주 단순하게 말하면, 일반적인 CPython 환경에서 GIL은 한 시점에 하나의 스레드만 파이썬 바이트코드를 실행하도록 제한하는 장치다.

이 설명을 처음 들으면 “그럼 스레드는 쓸모없는 것 아닌가?”라고 생각할 수 있다. 그렇지는 않다.

스레드는 I/O 중심 작업에서는 여전히 유용하다. 파일 응답이나 네트워크 응답을 기다리는 동안 다른 스레드가 실행될 수 있기 때문이다.

## GIL을 이해해야 하는 이유

GIL을 이해해야 하는 이유는 스레드가 항상 CPU 계산을 빠르게 해주지는 않기 때문이다.

예를 들어 순수 파이썬 코드로 많은 계산을 수행하는 작업이 있다고 하자. 이 작업을 스레드 여러 개로 나누어도 기대만큼 빨라지지 않을 수 있다.

\`\`\`text
CPU 계산이 많은 작업 + 일반 CPython 스레드
→ 여러 CPU 코어를 충분히 활용하지 못할 수 있음
\`\`\`

반면 API 요청이나 파일 다운로드 같은 작업은 다음과 같이 볼 수 있다.

\`\`\`text
I/O 대기가 많은 작업 + 스레드
→ 기다리는 동안 다른 작업을 진행할 수 있어 효과적일 수 있음
\`\`\`

## GIL과 스레드의 관계

스레드를 사용할 때 다음 기준을 기억하면 좋다.

\`\`\`text
스레드는 I/O 중심 작업에 적합하다.
스레드는 순수 파이썬 CPU 중심 작업을 빠르게 하는 만능 도구가 아니다.
\`\`\`

예를 들어 다음 작업에는 스레드가 도움이 될 수 있다.

- 여러 API 요청 보내기
- 여러 파일 다운로드
- 여러 데이터베이스 요청 처리
- 여러 파일의 존재 여부 확인

반대로 다음 작업에는 스레드보다 프로세스를 고려한다.

- 순수 파이썬으로 큰 계산 반복
- CPU를 많이 쓰는 데이터 변환
- 독립적인 계산 작업을 여러 코어로 나누어 실행

## 최신 파이썬과 자유 스레딩 빌드에 대한 주의

최근 파이썬에는 GIL을 선택적으로 제거한 자유 스레딩 빌드가 등장했다. 하지만 교육과 실무의 기본 설명에서는 대부분의 사용자가 접하는 일반 CPython 환경을 기준으로 이해하는 것이 안전하다.

따라서 이 장에서는 다음 기준으로 설명한다.

\`\`\`text
일반적인 CPython 환경에서는 GIL을 고려한다.
I/O 중심 작업에는 스레드가 유용하다.
CPU 중심 작업에는 프로세스 방식을 우선 고려한다.
최신 자유 스레딩 빌드는 별도 환경과 라이브러리 호환성을 함께 검토해야 한다.
\`\`\`

이렇게 이해하면 대부분의 실무 코드에서 올바른 선택을 할 수 있다.

## GIL은 동시성 학습의 끝이 아니다

GIL은 중요한 개념이지만, 동시성 프로그래밍의 전부는 아니다. 실무에서는 다음 요소도 함께 고려해야 한다.

- 작업이 독립적인가
- 결과 순서가 중요한가
- 실패를 어떻게 처리할 것인가
- 동시 실행 개수를 어떻게 제한할 것인가
- 외부 API의 요청 제한을 지킬 것인가
- 로그를 어떻게 남길 것인가
- 테스트가 가능한 구조인가

동시성 코드는 단순히 “빠르게” 만드는 코드가 아니다. 여러 작업이 동시에 진행되어도 안전하고, 실패해도 복구 가능하며, 실행 상황을 추적할 수 있어야 한다.

---

# 16.4 스레드 기초

## 스레드란 무엇인가

스레드는 하나의 프로세스 안에서 실행되는 작업 흐름이다. 하나의 파이썬 프로그램 안에서 여러 스레드를 만들면 여러 작업을 동시에 진행하는 것처럼 처리할 수 있다.

비유하면 프로세스는 하나의 회사이고, 스레드는 그 회사 안에서 일하는 직원이라고 볼 수 있다.

\`\`\`text
프로세스: 실행 중인 프로그램
스레드: 프로세스 안에서 실행되는 작업 흐름
\`\`\`

하나의 프로그램 안에서 여러 스레드가 같은 메모리를 공유한다. 이 점은 장점이기도 하고 위험 요소이기도 하다.

## 스레드 만들기

파이썬에서는 \`threading\` 모듈로 스레드를 만들 수 있다.

\`\`\`python
import threading
import time


def worker(name: str) -> None:
    print(f"{name} 시작")
    time.sleep(1)
    print(f"{name} 종료")


thread1 = threading.Thread(target=worker, args=("작업1",))
thread2 = threading.Thread(target=worker, args=("작업2",))

thread1.start()
thread2.start()

thread1.join()
thread2.join()

print("모든 작업 완료")
\`\`\`

\`Thread\` 객체를 만들 때 \`target\`에는 실행할 함수를 전달한다. \`args\`에는 함수에 전달할 인자를 튜플 형태로 전달한다.

\`start()\`는 스레드를 시작한다. \`join()\`은 해당 스레드가 끝날 때까지 기다린다.

## \`start()\`와 \`join()\`

스레드에서 가장 먼저 익숙해져야 할 메서드는 \`start()\`와 \`join()\`이다.

\`\`\`text
start(): 스레드 실행 시작
join(): 스레드가 끝날 때까지 기다림
\`\`\`

\`join()\`이 없으면 메인 코드가 스레드 종료를 기다리지 않고 다음 줄로 넘어갈 수 있다. 프로그램 구조에 따라 문제가 생길 수 있으므로, 대부분의 경우 작업 스레드가 끝나야 다음 단계로 넘어가는지 명확히 정해야 한다.

## 여러 스레드 만들기

작업이 여러 개라면 반복문으로 스레드를 만들 수 있다.

\`\`\`python
import threading
import time


def download(index: int) -> None:
    print(f"파일 {index} 다운로드 시작")
    time.sleep(1)
    print(f"파일 {index} 다운로드 완료")


threads = []

for index in range(5):
    thread = threading.Thread(target=download, args=(index,))
    threads.append(thread)
    thread.start()

for thread in threads:
    thread.join()

print("전체 다운로드 완료")
\`\`\`

이 코드는 5개의 다운로드 작업을 동시에 진행하는 것처럼 실행한다. 실제 다운로드 대신 \`time.sleep(1)\`을 사용했지만, API 요청이나 파일 다운로드 작업과 비슷한 구조로 생각할 수 있다.

## 스레드에 적합한 예시

스레드는 다음 작업에 적합하다.

\`\`\`text
- 여러 URL에 요청 보내기
- 여러 파일 다운로드하기
- 파일 처리 중 외부 응답을 기다리는 작업
- 데이터베이스 조회를 여러 번 수행하는 작업
- 대기 시간이 많은 자동화 작업
\`\`\`

스레드는 “기다리는 동안 다른 일을 한다”는 상황에서 특히 유용하다.

## 스레드 사용 시 주의점

스레드는 같은 메모리를 공유한다. 그래서 여러 스레드가 같은 변수를 동시에 수정하면 문제가 생길 수 있다.

다음 코드를 보자.

\`\`\`python
import threading

counter = 0


def increase() -> None:
    global counter
    for _ in range(100_000):
        counter += 1


threads = [threading.Thread(target=increase) for _ in range(2)]

for thread in threads:
    thread.start()

for thread in threads:
    thread.join()

print(counter)
\`\`\`

예상으로는 \`200000\`이 출력되어야 할 것 같지만, 상황에 따라 예상과 다른 결과가 나올 수 있다. 여러 스레드가 같은 값을 동시에 읽고 수정하기 때문이다.

이런 문제를 경쟁 상태라고 한다.

---

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

# 16.6 \`ThreadPoolExecutor\`

## 직접 스레드를 만들 때의 불편함

\`threading.Thread\`로 스레드를 직접 만들 수 있지만, 작업이 많아지면 코드가 복잡해진다.

예를 들어 다음을 직접 관리해야 한다.

- 스레드 생성
- 스레드 시작
- 스레드 종료 대기
- 결과 저장
- 예외 처리
- 동시 실행 개수 제한

이럴 때는 \`concurrent.futures\` 모듈의 \`ThreadPoolExecutor\`를 사용하는 것이 더 편하다.

## ThreadPoolExecutor 기본 구조

\`ThreadPoolExecutor\`는 스레드 풀을 만들어 작업을 실행한다. 스레드 풀은 미리 정해진 개수의 작업자를 두고, 여러 작업을 나누어 처리하는 구조다.

\`\`\`python
from concurrent.futures import ThreadPoolExecutor
import time


def fetch(user_id: int) -> dict:
    time.sleep(1)
    return {"user_id": user_id, "status": "ok"}


user_ids = [1, 2, 3, 4, 5]

with ThreadPoolExecutor(max_workers=3) as executor:
    results = list(executor.map(fetch, user_ids))

print(results)
\`\`\`

\`max_workers=3\`은 동시에 최대 3개의 작업을 실행하겠다는 뜻이다.

\`executor.map()\`은 여러 입력값에 함수를 적용하고 결과를 반환한다.

## \`map()\` 방식

\`map()\` 방식은 입력 순서와 결과 순서를 맞춰야 할 때 편하다.

\`\`\`python
from concurrent.futures import ThreadPoolExecutor
import time


def square(number: int) -> int:
    time.sleep(0.5)
    return number * number


numbers = [1, 2, 3, 4, 5]

with ThreadPoolExecutor(max_workers=3) as executor:
    results = list(executor.map(square, numbers))

print(results)
\`\`\`

결과는 입력 순서와 같은 순서로 정리된다.

\`\`\`text
[1, 4, 9, 16, 25]
\`\`\`

작업 완료 순서는 달라도 결과 순서는 입력 순서와 맞춰진다.

## \`submit()\`과 \`as_completed()\` 방식

작업이 끝나는 순서대로 처리하고 싶다면 \`submit()\`과 \`as_completed()\`를 사용한다.

\`\`\`python
from concurrent.futures import ThreadPoolExecutor, as_completed
import time


def fetch(user_id: int) -> dict:
    time.sleep(1)
    return {"user_id": user_id, "status": "ok"}


user_ids = [1, 2, 3, 4, 5]

with ThreadPoolExecutor(max_workers=3) as executor:
    futures = [executor.submit(fetch, user_id) for user_id in user_ids]

    for future in as_completed(futures):
        result = future.result()
        print(result)
\`\`\`

\`submit()\`은 작업을 제출하고 \`Future\` 객체를 반환한다. \`Future\`는 아직 완료되지 않았을 수도 있는 작업의 결과를 나타낸다.

\`as_completed()\`는 작업이 완료되는 순서대로 \`Future\`를 꺼내준다.

## 예외 처리

동시성 코드에서는 각 작업이 실패할 수 있다. \`future.result()\`를 호출할 때 작업 내부에서 발생한 예외가 다시 발생한다.

\`\`\`python
from concurrent.futures import ThreadPoolExecutor, as_completed


def parse_number(value: str) -> int:
    return int(value)


values = ["10", "20", "abc", "30"]

with ThreadPoolExecutor(max_workers=2) as executor:
    future_to_value = {
        executor.submit(parse_number, value): value
        for value in values
    }

    for future in as_completed(future_to_value):
        value = future_to_value[future]
        try:
            result = future.result()
        except ValueError:
            print(f"변환 실패: {value}")
        else:
            print(f"변환 성공: {result}")
\`\`\`

동시성 코드에서는 실패한 작업을 무시하면 안 된다. 어떤 입력값이 실패했는지 함께 기록해야 한다.

## API 요청 예제 구조

실제 API 요청에서는 \`requests\`를 함께 사용할 수 있다.

\`\`\`python
from concurrent.futures import ThreadPoolExecutor, as_completed
import requests


def fetch_json(url: str) -> dict:
    response = requests.get(url, timeout=5)
    response.raise_for_status()
    return response.json()


urls = [
    "https://api.example.com/items/1",
    "https://api.example.com/items/2",
    "https://api.example.com/items/3",
]

with ThreadPoolExecutor(max_workers=5) as executor:
    future_to_url = {
        executor.submit(fetch_json, url): url
        for url in urls
    }

    for future in as_completed(future_to_url):
        url = future_to_url[future]
        try:
            data = future.result()
        except requests.RequestException as error:
            print(f"요청 실패: {url} - {error}")
        else:
            print(f"요청 성공: {url}")
\`\`\`

이 구조는 실무에서 자주 사용된다.

## 동시 실행 개수 제한

\`max_workers\`를 크게 하면 무조건 빨라질 것 같지만 그렇지 않다.

동시 요청이 너무 많으면 다음 문제가 생길 수 있다.

- API 서버에 부담을 준다.
- 요청 제한에 걸린다.
- 네트워크 오류가 증가한다.
- 로컬 컴퓨터 자원을 과도하게 사용한다.
- 실패 재시도가 한꺼번에 몰린다.

따라서 동시 실행 개수는 작업의 성격에 맞게 조절해야 한다.

\`\`\`python
with ThreadPoolExecutor(max_workers=5) as executor:
    ...
\`\`\`

처음에는 작은 값으로 시작하고, 로그와 실패율을 확인하면서 조정하는 것이 좋다.

---

# 16.7 프로세스 기초

## 프로세스란 무엇인가

프로세스는 실행 중인 프로그램의 단위다. 파이썬 프로그램을 실행하면 하나의 프로세스가 만들어진다. \`multiprocessing\`을 사용하면 여러 프로세스를 만들어 작업을 나누어 실행할 수 있다.

스레드와 프로세스의 가장 큰 차이는 메모리 공유 방식이다.

\`\`\`text
스레드: 같은 프로세스 안에서 메모리를 공유한다.
프로세스: 각자 독립적인 메모리 공간을 가진다.
\`\`\`

독립적인 메모리 공간을 가지기 때문에 프로세스는 스레드보다 안전한 면이 있다. 하지만 데이터를 주고받는 비용이 더 크다.

## 프로세스가 필요한 상황

프로세스는 CPU 중심 작업에 적합하다.

예를 들어 다음 작업은 프로세스로 나누어 처리할 수 있다.

- 큰 숫자 계산
- 독립적인 데이터 변환
- 이미지 처리
- 복잡한 알고리즘 반복
- 여러 파일에 대해 무거운 계산 수행

일반적인 CPython 환경에서 순수 파이썬 CPU 작업은 스레드로 병렬 성능을 얻기 어렵다. 이때 프로세스를 사용하면 여러 CPU 코어를 활용할 수 있다.

## \`multiprocessing.Process\`

가장 기본적인 방식은 \`multiprocessing.Process\`를 사용하는 것이다.

\`\`\`python
from multiprocessing import Process
import os


def worker(name: str) -> None:
    print(f"{name} 실행 중, PID={os.getpid()}")


if __name__ == "__main__":
    process1 = Process(target=worker, args=("작업1",))
    process2 = Process(target=worker, args=("작업2",))

    process1.start()
    process2.start()

    process1.join()
    process2.join()

    print("모든 프로세스 완료")
\`\`\`

프로세스를 사용할 때는 \`if __name__ == "__main__":\` 구문을 사용하는 것이 중요하다. 특히 Windows 환경에서는 이 구문 없이 프로세스를 만들면 문제가 발생할 수 있다.

## 프로세스는 데이터를 쉽게 공유하지 않는다

스레드는 같은 메모리를 공유하지만, 프로세스는 기본적으로 각자 독립된 메모리를 사용한다.

다음 코드를 보자.

\`\`\`python
from multiprocessing import Process

counter = 0


def increase() -> None:
    global counter
    counter += 1
    print("자식 프로세스 counter:", counter)


if __name__ == "__main__":
    process = Process(target=increase)
    process.start()
    process.join()

    print("메인 프로세스 counter:", counter)
\`\`\`

자식 프로세스에서 \`counter\`를 변경해도 메인 프로세스의 \`counter\`가 바뀌지 않는다. 각 프로세스가 독립적인 메모리를 사용하기 때문이다.

이 점은 안전하지만, 결과를 모으려면 별도의 방법이 필요하다.

## 프로세스 방식의 비용

프로세스는 스레드보다 무겁다.

- 프로세스 생성 비용이 더 크다.
- 메모리를 더 많이 사용한다.
- 데이터를 주고받으려면 직렬화가 필요할 수 있다.
- 함수와 인자가 직렬화 가능해야 한다.

따라서 아주 작은 작업을 수천 개의 프로세스로 나누면 오히려 느려질 수 있다. 프로세스는 작업 하나하나가 충분히 무겁고 독립적일 때 효과적이다.

---

# 16.8 \`ProcessPoolExecutor\`

## 프로세스 풀 사용하기

스레드와 마찬가지로 프로세스도 직접 만들기보다 풀을 사용하는 것이 편하다. \`concurrent.futures.ProcessPoolExecutor\`를 사용하면 여러 프로세스에 작업을 나누어 실행할 수 있다.

\`\`\`python
from concurrent.futures import ProcessPoolExecutor


def calculate(number: int) -> int:
    total = 0
    for i in range(number):
        total += i * i
    return total


if __name__ == "__main__":
    numbers = [5_000_000, 5_000_000, 5_000_000, 5_000_000]

    with ProcessPoolExecutor() as executor:
        results = list(executor.map(calculate, numbers))

    print(results)
\`\`\`

\`ProcessPoolExecutor\`는 여러 프로세스를 사용해 함수를 실행한다. CPU 중심 작업을 여러 코어로 나누어 처리할 때 유용하다.

## \`if __name__ == "__main__"\`가 필요한 이유

프로세스 기반 코드는 반드시 실행 진입점을 분리하는 습관을 들여야 한다.

\`\`\`python
if __name__ == "__main__":
    main()
\`\`\`

이 구조는 특히 Windows와 macOS 일부 환경에서 중요하다. 새 프로세스를 만들 때 모듈이 다시 import될 수 있기 때문이다. 실행 진입점이 분리되어 있지 않으면 프로세스가 반복해서 생성되는 문제가 생길 수 있다.

## 함수는 최상위에 정의하는 것이 좋다

프로세스 풀에 전달하는 함수는 보통 모듈의 최상위에 정의하는 것이 좋다.

좋은 예는 다음과 같다.

\`\`\`python
def calculate(number: int) -> int:
    return number * number


if __name__ == "__main__":
    ...
\`\`\`

피해야 할 예는 다음과 같다.

\`\`\`python
def main() -> None:
    def calculate(number: int) -> int:
        return number * number

    ...
\`\`\`

프로세스 간에 작업을 전달하려면 함수와 인자를 직렬화할 수 있어야 한다. 중첩 함수나 람다 함수는 문제가 될 수 있다.

## 작업 단위가 너무 작으면 느릴 수 있다

프로세스는 생성과 데이터 전달 비용이 있다. 따라서 작은 작업을 너무 많이 나누면 오히려 느려질 수 있다.

예를 들어 다음과 같은 작업은 프로세스 풀의 이점이 크지 않을 수 있다.

\`\`\`python
def add_one(number: int) -> int:
    return number + 1
\`\`\`

반면 다음처럼 계산량이 큰 작업은 프로세스 풀의 이점이 생길 수 있다.

\`\`\`python
def heavy_calculation(number: int) -> int:
    total = 0
    for i in range(number):
        total += i * i
    return total
\`\`\`

## 결과 순서와 완료 순서

\`executor.map()\`은 입력 순서대로 결과를 반환한다.

\`\`\`python
with ProcessPoolExecutor() as executor:
    results = list(executor.map(calculate, numbers))
\`\`\`

완료된 작업부터 처리하고 싶다면 \`submit()\`과 \`as_completed()\`를 사용할 수 있다.

\`\`\`python
from concurrent.futures import ProcessPoolExecutor, as_completed


def calculate(number: int) -> int:
    total = 0
    for i in range(number):
        total += i * i
    return total


if __name__ == "__main__":
    numbers = [5_000_000, 3_000_000, 7_000_000]

    with ProcessPoolExecutor() as executor:
        future_to_number = {
            executor.submit(calculate, number): number
            for number in numbers
        }

        for future in as_completed(future_to_number):
            number = future_to_number[future]
            try:
                result = future.result()
            except Exception as error:
                print(f"계산 실패: {number} - {error}")
            else:
                print(f"계산 완료: {number} -> {result}")
\`\`\`

## 프로세스 방식에서 피해야 할 것

프로세스 기반 동시성에서는 다음을 주의해야 한다.

- 너무 큰 데이터를 매번 프로세스에 전달하지 않는다.
- 전역 상태에 의존하지 않는다.
- 파일 핸들, DB 연결 객체를 그대로 넘기지 않는다.
- 중첩 함수나 람다를 작업 함수로 넘기지 않는다.
- 작은 작업을 너무 잘게 나누지 않는다.
- 실행 진입점을 반드시 분리한다.

## 데이터 처리 예시

여러 파일에 대해 독립적인 무거운 계산을 수행하는 상황을 생각해보자.

\`\`\`python
from concurrent.futures import ProcessPoolExecutor
from pathlib import Path


def count_lines(path_text: str) -> tuple[str, int]:
    path = Path(path_text)
    count = 0

    with path.open("r", encoding="utf-8") as file:
        for _ in file:
            count += 1

    return path.name, count


if __name__ == "__main__":
    paths = [str(path) for path in Path("logs").glob("*.log")]

    with ProcessPoolExecutor() as executor:
        results = list(executor.map(count_lines, paths))

    for filename, count in results:
        print(filename, count)
\`\`\`

이 예시는 파일별로 줄 수를 세는 구조다. 실제로는 각 파일에 대해 더 복잡한 계산이나 파싱을 수행할 수 있다.

---

# 16.9 비동기 프로그래밍 기초

## 비동기 프로그래밍이란?

비동기 프로그래밍은 기다리는 작업을 효율적으로 다루기 위한 방식이다. 한 작업이 외부 응답을 기다리는 동안 프로그램이 멈춰 있지 않고 다른 작업을 진행할 수 있도록 만든다.

비동기는 특히 다음 상황에서 유용하다.

- 많은 네트워크 요청
- 많은 소켓 연결
- 많은 API 호출
- 대기 시간이 긴 I/O 작업

파이썬에서는 \`asyncio\`를 사용해 비동기 코드를 작성할 수 있다.

## 동기 코드와 비동기 코드

동기 코드는 한 작업이 끝나야 다음 작업으로 넘어간다.

\`\`\`python
import time


def task(name: str) -> str:
    print(f"{name} 시작")
    time.sleep(1)
    print(f"{name} 종료")
    return name


task("작업1")
task("작업2")
task("작업3")
\`\`\`

비동기 코드는 기다리는 동안 다른 작업을 실행할 수 있다.

\`\`\`python
import asyncio


async def task(name: str) -> str:
    print(f"{name} 시작")
    await asyncio.sleep(1)
    print(f"{name} 종료")
    return name


async def main() -> None:
    results = await asyncio.gather(
        task("작업1"),
        task("작업2"),
        task("작업3"),
    )
    print(results)


asyncio.run(main())
\`\`\`

여기서 \`asyncio.sleep(1)\`은 실제로 기다리는 동안 이벤트 루프가 다른 작업을 실행할 수 있게 양보한다.

## \`async\`와 \`await\`

비동기 함수는 \`async def\`로 정의한다.

\`\`\`python
async def fetch_data():
    ...
\`\`\`

비동기 함수 안에서 기다려야 하는 작업 앞에는 \`await\`를 붙인다.

\`\`\`python
await asyncio.sleep(1)
\`\`\`

\`await\`는 “여기서 기다리되, 기다리는 동안 이벤트 루프가 다른 작업을 처리할 수 있게 하라”는 의미로 이해하면 된다.

## 이벤트 루프

이벤트 루프는 비동기 작업을 관리하는 실행 흐름이다. 어떤 작업이 기다리는 상태가 되면 다른 작업을 실행하고, 기다리던 작업이 다시 진행 가능해지면 이어서 실행한다.

\`\`\`text
작업 A 실행 → API 응답 기다림 → 작업 B 실행 → 작업 C 실행 → 작업 A 응답 도착 → 작업 A 재개
\`\`\`

비동기 프로그래밍은 스레드를 많이 만드는 방식이 아니라, 하나의 이벤트 루프가 여러 작업의 대기 시간을 효율적으로 관리하는 방식이다.

## 코루틴

\`async def\`로 만든 함수는 호출한다고 바로 실행되지 않는다. 코루틴 객체를 만든다.

\`\`\`python
async def say_hello() -> str:
    return "hello"


coro = say_hello()
print(coro)
\`\`\`

코루틴은 \`await\`하거나 \`asyncio.run()\`으로 실행해야 실제로 동작한다.

\`\`\`python
import asyncio


async def say_hello() -> str:
    return "hello"


async def main() -> None:
    result = await say_hello()
    print(result)


asyncio.run(main())
\`\`\`

## \`asyncio.gather()\`

여러 비동기 작업을 동시에 실행하고 결과를 모을 때 \`asyncio.gather()\`를 사용할 수 있다.

\`\`\`python
import asyncio


async def fetch(user_id: int) -> dict:
    await asyncio.sleep(1)
    return {"user_id": user_id, "status": "ok"}


async def main() -> None:
    tasks = [fetch(user_id) for user_id in [1, 2, 3, 4, 5]]
    results = await asyncio.gather(*tasks)
    print(results)


asyncio.run(main())
\`\`\`

\`gather()\`는 여러 코루틴을 함께 실행하고, 모든 결과를 모아 반환한다.

## \`asyncio.create_task()\`

\`create_task()\`는 코루틴을 작업으로 등록해서 이벤트 루프가 실행할 수 있게 한다.

\`\`\`python
import asyncio


async def work(name: str, delay: float) -> str:
    await asyncio.sleep(delay)
    return f"{name} 완료"


async def main() -> None:
    task1 = asyncio.create_task(work("작업1", 2))
    task2 = asyncio.create_task(work("작업2", 1))

    result1 = await task1
    result2 = await task2

    print(result1)
    print(result2)


asyncio.run(main())
\`\`\`

\`create_task()\`를 사용하면 작업을 먼저 등록해두고 나중에 결과를 기다릴 수 있다.

## 비동기 코드에서 주의할 점

비동기 함수 안에서 동기적으로 오래 걸리는 작업을 실행하면 이벤트 루프가 막힌다.

피해야 할 예는 다음과 같다.

\`\`\`python
import asyncio
import time


async def bad_task() -> None:
    time.sleep(3)  # 이벤트 루프를 막음
\`\`\`

비동기 코드에서는 가능한 비동기 대기 함수를 사용해야 한다.

\`\`\`python
import asyncio


async def good_task() -> None:
    await asyncio.sleep(3)
\`\`\`

실제 HTTP 요청도 \`requests\`는 동기 라이브러리이므로 \`asyncio\` 코드 안에서 그대로 사용하면 이벤트 루프를 막을 수 있다. 비동기 HTTP 요청에는 \`aiohttp\`나 \`httpx\`의 비동기 기능 같은 별도 라이브러리를 고려한다.

이 장에서는 표준 라이브러리 중심으로 개념을 익히고, 실제 고성능 비동기 HTTP 수집은 별도 심화 주제로 넘긴다.

---

# 16.10 스레드, 프로세스, asyncio 비교

## 세 방식의 핵심 차이

동시성 도구를 선택할 때는 다음 차이를 이해해야 한다.

| 방식 | 주 용도 | 장점 | 주의점 |
|---|---|---|---|
| 스레드 | I/O 중심 작업 | 기존 동기 코드와 결합 쉬움 | 공유 데이터 경쟁 상태 |
| 프로세스 | CPU 중심 작업 | 여러 CPU 코어 활용 | 데이터 전달 비용, 메모리 사용 증가 |
| asyncio | 많은 I/O 작업 | 많은 연결을 적은 자원으로 관리 | 비동기 방식으로 코드를 작성해야 함 |

## 스레드를 선택하는 경우

다음 조건이면 스레드를 고려한다.

\`\`\`text
- 기존 코드가 동기 함수로 되어 있다.
- API 요청이나 파일 다운로드처럼 기다리는 시간이 많다.
- 작업 개수가 많지만 아주 많지는 않다.
- \`requests\` 같은 동기 라이브러리를 그대로 사용하고 싶다.
- 코드 구조를 크게 바꾸고 싶지 않다.
\`\`\`

예를 들어 여러 URL을 \`requests.get()\`으로 호출하는 작업은 \`ThreadPoolExecutor\`와 잘 맞는다.

## 프로세스를 선택하는 경우

다음 조건이면 프로세스를 고려한다.

\`\`\`text
- 계산 자체가 오래 걸린다.
- 작업들이 서로 독립적이다.
- 여러 CPU 코어를 활용하고 싶다.
- 작업 단위가 충분히 크다.
- 입력과 출력이 직렬화 가능한 데이터다.
\`\`\`

예를 들어 여러 파일에 대해 복잡한 파싱과 계산을 수행한다면 \`ProcessPoolExecutor\`를 고려할 수 있다.

## asyncio를 선택하는 경우

다음 조건이면 \`asyncio\`를 고려한다.

\`\`\`text
- 동시에 처리해야 할 네트워크 작업이 매우 많다.
- 비동기 라이브러리를 사용할 수 있다.
- 연결을 많이 유지해야 한다.
- 스레드를 많이 만드는 방식보다 이벤트 루프 방식이 적합하다.
- 비동기 코드 구조를 받아들일 수 있다.
\`\`\`

예를 들어 수천 개의 네트워크 요청을 효율적으로 관리해야 한다면 \`asyncio\`가 좋은 선택지가 될 수 있다.

## 무조건 동시성을 쓰면 안 된다

동시성은 코드 복잡도를 높인다.

다음 상황에서는 동시성을 쓰지 않는 것이 더 나을 수 있다.

- 작업 수가 적다.
- 실행 시간이 이미 충분히 짧다.
- 작업 순서가 매우 중요하다.
- 공유 데이터가 많다.
- 실패 처리 로직이 복잡하다.
- 외부 API 요청 제한이 엄격하다.
- 코드 유지보수가 더 중요하다.

성능 최적화의 기본 원칙은 “먼저 측정하고, 병목을 찾은 뒤, 필요한 곳에만 적용한다”이다.

## 선택 흐름

다음 흐름으로 판단해보자.

\`\`\`text
1. 작업이 느린가?
   아니오 → 동시성 불필요
   예 → 2번

2. 느린 이유가 기다림인가?
   예 → 스레드 또는 asyncio 고려
   아니오 → 3번

3. 느린 이유가 계산인가?
   예 → 프로세스 고려
   아니오 → 알고리즘과 자료구조 먼저 점검

4. 작업이 서로 독립적인가?
   예 → 동시성 적용 가능성 높음
   아니오 → 구조 재설계 필요

5. 실패와 로그를 관리할 수 있는가?
   예 → 적용
   아니오 → 먼저 예외 처리와 로깅 구조 설계
\`\`\`

---

# 16.11 실무 패턴 1: 여러 API 요청 처리

## 문제 상황

사용자 ID 목록이 있고, 각 사용자에 대해 API를 호출해 상세 정보를 가져와야 한다고 가정하자.

\`\`\`python
user_ids = [1, 2, 3, 4, 5]
\`\`\`

순차 실행은 단순하지만 느릴 수 있다.

\`\`\`python
results = []

for user_id in user_ids:
    data = fetch_user(user_id)
    results.append(data)
\`\`\`

각 요청이 1초씩 걸리고 사용자가 1,000명이라면 전체 시간이 길어진다.

## ThreadPoolExecutor로 처리하기

\`\`\`python
from concurrent.futures import ThreadPoolExecutor, as_completed
import requests


BASE_URL = "https://api.example.com/users"


def fetch_user(user_id: int) -> dict:
    url = f"{BASE_URL}/{user_id}"
    response = requests.get(url, timeout=5)
    response.raise_for_status()
    return response.json()


def collect_users(user_ids: list[int]) -> tuple[list[dict], list[dict]]:
    results = []
    failures = []

    with ThreadPoolExecutor(max_workers=5) as executor:
        future_to_user_id = {
            executor.submit(fetch_user, user_id): user_id
            for user_id in user_ids
        }

        for future in as_completed(future_to_user_id):
            user_id = future_to_user_id[future]
            try:
                data = future.result()
            except requests.RequestException as error:
                failures.append({
                    "user_id": user_id,
                    "error": str(error),
                })
            else:
                results.append(data)

    return results, failures
\`\`\`

이 구조는 다음 장점이 있다.

- 요청을 여러 개 동시에 보낸다.
- 성공한 결과와 실패한 결과를 분리한다.
- 실패한 사용자 ID를 기록할 수 있다.
- 동시 요청 개수를 \`max_workers\`로 제한한다.

## 실패 목록 저장하기

실무에서는 실패한 요청을 화면에 출력하는 것만으로는 부족하다. 실패 목록을 파일로 저장하면 재처리할 수 있다.

\`\`\`python
import json
from pathlib import Path


def save_failures(failures: list[dict], path: str) -> None:
    output_path = Path(path)
    with output_path.open("w", encoding="utf-8") as file:
        json.dump(failures, file, ensure_ascii=False, indent=2)
\`\`\`

동시성 코드에서 중요한 것은 성공 속도뿐만 아니라 실패 관리다.

## 요청 제한 지키기

외부 API는 보통 요청 제한이 있다. 동시에 너무 많은 요청을 보내면 차단되거나 오류가 증가할 수 있다.

따라서 다음을 지켜야 한다.

- \`max_workers\`를 적절히 제한한다.
- API 문서의 Rate Limit을 확인한다.
- 실패 시 무한 재시도하지 않는다.
- 재시도 간격을 둔다.
- 로그를 남긴다.

동시성은 상대 서버를 공격하듯 요청을 보내기 위한 도구가 아니다. 외부 시스템의 규칙을 지키면서 효율적으로 처리하기 위한 도구다.

---

# 16.12 실무 패턴 2: 여러 파일 처리

## 문제 상황

폴더 안에 많은 텍스트 파일이 있고, 각 파일에서 특정 단어가 등장한 횟수를 세어야 한다고 하자.

\`\`\`text
data/
  log_001.txt
  log_002.txt
  log_003.txt
  ...
\`\`\`

파일 수가 많다면 순차 처리 시간이 길어질 수 있다.

## 파일 처리 함수 만들기

먼저 파일 하나를 처리하는 함수를 만든다.

\`\`\`python
from pathlib import Path


def count_keyword(path: Path, keyword: str) -> dict:
    count = 0

    with path.open("r", encoding="utf-8") as file:
        for line in file:
            if keyword in line:
                count += 1

    return {
        "filename": path.name,
        "keyword": keyword,
        "count": count,
    }
\`\`\`

이 함수는 입력과 출력이 명확하다. 동시성에 적용하기 좋다.

## 스레드로 파일 처리하기

파일 읽기는 I/O가 포함되므로 스레드가 도움이 될 수 있다.

\`\`\`python
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path


def process_files(folder: str, keyword: str) -> list[dict]:
    paths = list(Path(folder).glob("*.txt"))
    results = []

    with ThreadPoolExecutor(max_workers=4) as executor:
        future_to_path = {
            executor.submit(count_keyword, path, keyword): path
            for path in paths
        }

        for future in as_completed(future_to_path):
            path = future_to_path[future]
            try:
                result = future.result()
            except UnicodeDecodeError as error:
                results.append({
                    "filename": path.name,
                    "error": f"인코딩 오류: {error}",
                })
            except OSError as error:
                results.append({
                    "filename": path.name,
                    "error": f"파일 오류: {error}",
                })
            else:
                results.append(result)

    return results
\`\`\`

파일마다 실패할 수 있으므로 예외 처리를 포함했다.

## 결과 CSV 저장하기

\`\`\`python
import csv
from pathlib import Path


def save_results_csv(results: list[dict], output_path: str) -> None:
    fieldnames = ["filename", "keyword", "count", "error"]

    with Path(output_path).open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()

        for row in results:
            writer.writerow({
                "filename": row.get("filename", ""),
                "keyword": row.get("keyword", ""),
                "count": row.get("count", ""),
                "error": row.get("error", ""),
            })
\`\`\`

동시 처리 결과를 저장할 때는 정상 결과와 오류 결과가 함께 들어올 수 있다. 그래서 \`get()\`을 사용해 없는 key를 안전하게 처리했다.

## 작업 단위 분리의 중요성

동시성 코드는 작업 단위가 분명해야 한다.

\`\`\`text
1. 파일 하나를 처리하는 함수
2. 여러 파일을 동시에 실행하는 함수
3. 결과를 저장하는 함수
\`\`\`

이렇게 나누면 테스트하기 쉽고, 동시성 방식을 바꾸기도 쉽다. 예를 들어 \`ThreadPoolExecutor\`를 \`ProcessPoolExecutor\`로 바꾸어 실험할 수도 있다.

---

# 16.13 실무 패턴 3: 대량 계산 작업 분산

## 문제 상황

여러 숫자에 대해 계산량이 큰 함수를 실행해야 한다고 하자.

\`\`\`python
numbers = [10_000_000, 12_000_000, 8_000_000, 15_000_000]
\`\`\`

각 작업은 서로 독립적이고 CPU 계산이 많다. 이런 경우 프로세스 풀이 적합할 수 있다.

## 계산 함수 만들기

\`\`\`python
def heavy_sum(limit: int) -> int:
    total = 0
    for number in range(limit):
        total += number * number
    return total
\`\`\`

이 함수는 외부 상태에 의존하지 않는다. 입력값만 받고 결과를 반환한다. 이런 함수는 프로세스 풀에 넘기기 좋다.

## ProcessPoolExecutor 적용하기

\`\`\`python
from concurrent.futures import ProcessPoolExecutor


def heavy_sum(limit: int) -> int:
    total = 0
    for number in range(limit):
        total += number * number
    return total


def main() -> None:
    numbers = [10_000_000, 12_000_000, 8_000_000, 15_000_000]

    with ProcessPoolExecutor() as executor:
        results = list(executor.map(heavy_sum, numbers))

    print(results)


if __name__ == "__main__":
    main()
\`\`\`

프로세스 기반 코드는 반드시 \`main()\`과 실행 진입점을 분리하는 습관을 갖는 것이 좋다.

## 프로세스 풀에서 로그 남기기

프로세스별 로그를 한 파일에 동시에 쓰는 것은 주의가 필요하다. 처음에는 각 작업이 결과를 반환하고, 메인 프로세스에서 로그를 남기는 구조가 더 단순하다.

\`\`\`python
from concurrent.futures import ProcessPoolExecutor, as_completed


def heavy_sum(limit: int) -> int:
    total = 0
    for number in range(limit):
        total += number * number
    return total


def main() -> None:
    numbers = [10_000_000, 12_000_000, 8_000_000, 15_000_000]

    with ProcessPoolExecutor() as executor:
        future_to_number = {
            executor.submit(heavy_sum, number): number
            for number in numbers
        }

        for future in as_completed(future_to_number):
            number = future_to_number[future]
            try:
                result = future.result()
            except Exception as error:
                print(f"실패: {number} - {error}")
            else:
                print(f"완료: {number} -> {result}")


if __name__ == "__main__":
    main()
\`\`\`

## 데이터분석 전처리와 연결

데이터분석 전 단계에서 CPU 중심 작업은 다음과 같은 형태로 나타날 수 있다.

- 큰 텍스트를 복잡한 규칙으로 파싱하기
- 여러 파일에 대해 정규표현식 처리하기
- 이미지나 음성 데이터의 전처리
- 계산량이 큰 피처 생성
- 독립적인 데이터 묶음별 변환

다만 pandas, NumPy 같은 라이브러리는 내부적으로 C 코드나 벡터화 연산을 사용하므로 순수 파이썬 반복문보다 훨씬 빠른 경우가 많다. 데이터분석 과정에서는 먼저 벡터화와 라이브러리 기능을 고려하고, 그래도 필요한 경우 병렬 처리를 검토한다.

---

# 16.14 실무 패턴 4: asyncio로 여러 대기 작업 처리하기

## 문제 상황

여러 작업이 모두 “기다림” 위주라고 가정하자. 여기서는 실제 네트워크 대신 \`asyncio.sleep()\`으로 대기 시간을 표현한다.

\`\`\`python
import asyncio


async def fetch_item(item_id: int) -> dict:
    await asyncio.sleep(1)
    return {"item_id": item_id, "status": "ok"}
\`\`\`

## 여러 작업 동시에 실행하기

\`\`\`python
import asyncio


async def fetch_item(item_id: int) -> dict:
    await asyncio.sleep(1)
    return {"item_id": item_id, "status": "ok"}


async def main() -> None:
    item_ids = [1, 2, 3, 4, 5]
    tasks = [fetch_item(item_id) for item_id in item_ids]

    results = await asyncio.gather(*tasks)
    print(results)


asyncio.run(main())
\`\`\`

이 구조는 여러 대기 작업을 한꺼번에 관리한다.

## 동시 실행 개수 제한하기

비동기 코드에서도 무제한으로 작업을 실행하면 안 된다. \`asyncio.Semaphore\`를 사용하면 동시에 실행되는 작업 수를 제한할 수 있다.

\`\`\`python
import asyncio


async def fetch_item(item_id: int, semaphore: asyncio.Semaphore) -> dict:
    async with semaphore:
        await asyncio.sleep(1)
        return {"item_id": item_id, "status": "ok"}


async def main() -> None:
    item_ids = list(range(1, 21))
    semaphore = asyncio.Semaphore(5)

    tasks = [fetch_item(item_id, semaphore) for item_id in item_ids]
    results = await asyncio.gather(*tasks)

    print(len(results))


asyncio.run(main())
\`\`\`

위 코드는 동시에 최대 5개의 작업만 실행되도록 제한한다.

## 비동기 예외 처리

\`asyncio.gather()\`는 작업 중 하나가 예외를 발생시키면 전체 흐름에 영향을 줄 수 있다. 작업별로 예외를 처리하려면 함수 내부에서 결과 구조를 통일하는 방식도 좋다.

\`\`\`python
import asyncio


async def fetch_item(item_id: int) -> dict:
    try:
        await asyncio.sleep(1)
        if item_id == 3:
            raise ValueError("잘못된 item_id")
        return {"item_id": item_id, "status": "ok", "error": None}
    except Exception as error:
        return {"item_id": item_id, "status": "failed", "error": str(error)}


async def main() -> None:
    item_ids = [1, 2, 3, 4, 5]
    results = await asyncio.gather(*(fetch_item(item_id) for item_id in item_ids))

    for result in results:
        print(result)


asyncio.run(main())
\`\`\`

실무에서는 성공과 실패를 같은 형식의 결과로 만들어 후속 처리를 단순하게 만들 수 있다.

## asyncio와 일반 함수의 조합

비동기 코드를 작성할 때 가장 흔한 실수는 오래 걸리는 일반 함수를 비동기 함수 안에서 그대로 실행하는 것이다.

\`\`\`python
async def main() -> None:
    result = slow_sync_function()  # 이벤트 루프를 막을 수 있음
\`\`\`

이런 경우에는 다음 중 하나를 고려한다.

- 해당 작업을 비동기 라이브러리로 바꾼다.
- 스레드 풀이나 프로세스 풀로 넘긴다.
- 굳이 asyncio를 쓰지 않고 \`ThreadPoolExecutor\`를 사용한다.

초보 단계에서는 \`asyncio\`와 동기 라이브러리를 무리하게 섞기보다, 스레드 방식과 비동기 방식을 구분해서 사용하는 편이 안전하다.

---

# 16.15 동시성 코드 작성 원칙

## 원칙 1: 먼저 순차 코드로 정확하게 만든다

처음부터 동시성 코드를 작성하면 문제를 찾기 어렵다. 먼저 순차 코드로 정확하게 동작하도록 만든 뒤, 병목이 확인되면 동시성을 적용하는 것이 좋다.

\`\`\`text
1. 순차 코드 작성
2. 테스트 작성
3. 로그 추가
4. 실행 시간 측정
5. 병목 확인
6. 동시성 적용
7. 다시 테스트
\`\`\`

동시성은 마지막에 적용하는 최적화에 가깝다.

## 원칙 2: 작업 단위를 독립적으로 만든다

동시성에 적합한 함수는 입력과 출력이 명확하다.

좋은 작업 함수는 다음과 같다.

\`\`\`python
def process_row(row: dict) -> dict:
    ...
    return result
\`\`\`

좋지 않은 작업 함수는 다음과 같다.

\`\`\`python
results = []


def process_row(row: dict) -> None:
    results.append(result)
\`\`\`

후자는 공유 리스트를 직접 수정한다. 가능하면 작업 함수가 결과를 반환하고, 메인 흐름에서 결과를 모으는 구조가 좋다.

## 원칙 3: 동시 실행 개수를 제한한다

동시성 코드는 항상 제한이 필요하다.

- 스레드 수 제한
- 프로세스 수 제한
- 비동기 작업 수 제한
- API 요청 수 제한
- 파일 동시 열기 개수 제한

무제한 동시성은 대부분 위험하다.

\`\`\`python
with ThreadPoolExecutor(max_workers=5) as executor:
    ...
\`\`\`

\`\`\`python
semaphore = asyncio.Semaphore(10)
\`\`\`

## 원칙 4: 실패를 기록한다

동시성 작업에서는 일부 작업이 실패해도 전체 프로그램이 계속 진행될 수 있다. 따라서 실패를 반드시 기록해야 한다.

기록할 정보는 다음과 같다.

\`\`\`text
- 어떤 입력값이 실패했는가
- 어떤 예외가 발생했는가
- 언제 실패했는가
- 재시도 대상인가
- 결과 파일에서 제외되었는가
\`\`\`

실패 목록은 CSV나 JSON으로 저장하면 재처리에 유용하다.

## 원칙 5: 공유 상태를 줄인다

공유 상태는 버그의 주요 원인이다.

가능하면 다음 구조를 사용한다.

\`\`\`text
각 작업이 독립적으로 처리한다.
각 작업은 결과를 반환한다.
메인 흐름에서 결과를 모은다.
공유 데이터 수정은 최소화한다.
\`\`\`

## 원칙 6: 측정한다

동시성을 적용했는데 실제로 빨라졌는지 확인해야 한다.

\`\`\`python
from time import perf_counter

start = perf_counter()

# 실행할 코드

end = perf_counter()
print(f"실행 시간: {end - start:.2f}초")
\`\`\`

작업에 따라 동시성 적용 후 더 느려질 수도 있다. 특히 작업 단위가 너무 작거나 데이터 전달 비용이 큰 경우 그렇다.

## 원칙 7: 테스트 가능한 구조를 유지한다

동시성 자체를 테스트하기는 어렵다. 따라서 핵심 로직은 순수 함수로 분리하고, 동시 실행을 담당하는 코드는 얇게 유지하는 것이 좋다.

\`\`\`text
process_item()     → 단일 작업 처리, 테스트 쉬움
run_concurrent()   → 여러 작업 실행, 얇게 유지
save_results()     → 결과 저장, 테스트 가능
\`\`\`

이 구조는 유지보수에 유리하다.

---

# 16.16 종합 예제: URL 상태 검사 도구

## 목표

URL 목록을 받아 각 URL의 상태 코드를 확인하고 결과를 CSV로 저장하는 도구를 만들어보자.

이 예제는 다음 내용을 포함한다.

- \`ThreadPoolExecutor\`
- 동시 요청 개수 제한
- 요청 실패 처리
- 결과 구조 통일
- CSV 저장
- 실행 시간 측정

## 입력 데이터

\`\`\`python
urls = [
    "https://example.com",
    "https://www.python.org",
    "https://invalid.example.invalid",
]
\`\`\`

## 단일 URL 처리 함수

\`\`\`python
import requests


def check_url(url: str) -> dict:
    try:
        response = requests.get(url, timeout=5)
        return {
            "url": url,
            "ok": response.ok,
            "status_code": response.status_code,
            "error": "",
        }
    except requests.RequestException as error:
        return {
            "url": url,
            "ok": False,
            "status_code": "",
            "error": str(error),
        }
\`\`\`

이 함수는 성공하든 실패하든 항상 딕셔너리를 반환한다. 이렇게 결과 구조를 통일하면 후속 처리가 쉬워진다.

## 여러 URL 동시에 처리하기

\`\`\`python
from concurrent.futures import ThreadPoolExecutor, as_completed


def check_urls(urls: list[str], max_workers: int = 5) -> list[dict]:
    results = []

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_url = {
            executor.submit(check_url, url): url
            for url in urls
        }

        for future in as_completed(future_to_url):
            result = future.result()
            results.append(result)

    return results
\`\`\`

\`check_url()\` 함수 안에서 예외를 처리했기 때문에 \`future.result()\`에서 예외가 다시 발생할 가능성이 줄어든다. 다만 예기치 못한 예외를 대비하려면 \`future.result()\` 주변에도 예외 처리를 추가할 수 있다.

## CSV 저장 함수

\`\`\`python
import csv
from pathlib import Path


def save_csv(results: list[dict], output_path: str) -> None:
    fieldnames = ["url", "ok", "status_code", "error"]

    with Path(output_path).open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(results)
\`\`\`

## 전체 코드

\`\`\`python
import csv
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from time import perf_counter

import requests


def check_url(url: str) -> dict:
    try:
        response = requests.get(url, timeout=5)
        return {
            "url": url,
            "ok": response.ok,
            "status_code": response.status_code,
            "error": "",
        }
    except requests.RequestException as error:
        return {
            "url": url,
            "ok": False,
            "status_code": "",
            "error": str(error),
        }


def check_urls(urls: list[str], max_workers: int = 5) -> list[dict]:
    results = []

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_url = {
            executor.submit(check_url, url): url
            for url in urls
        }

        for future in as_completed(future_to_url):
            url = future_to_url[future]
            try:
                result = future.result()
            except Exception as error:
                results.append({
                    "url": url,
                    "ok": False,
                    "status_code": "",
                    "error": f"unexpected error: {error}",
                })
            else:
                results.append(result)

    return results


def save_csv(results: list[dict], output_path: str) -> None:
    fieldnames = ["url", "ok", "status_code", "error"]

    with Path(output_path).open("w", encoding="utf-8", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(results)


def main() -> None:
    urls = [
        "https://example.com",
        "https://www.python.org",
        "https://invalid.example.invalid",
    ]

    start = perf_counter()
    results = check_urls(urls, max_workers=5)
    save_csv(results, "url_status.csv")
    end = perf_counter()

    print(f"처리 개수: {len(results)}")
    print(f"실행 시간: {end - start:.2f}초")
    print("결과 파일: url_status.csv")


if __name__ == "__main__":
    main()
\`\`\`

## 이 예제에서 배울 점

이 코드는 단순하지만 실무 구조를 갖추고 있다.

- 단일 작업 함수가 있다.
- 여러 작업 실행 함수가 있다.
- 결과 저장 함수가 있다.
- 실행 진입점이 있다.
- 실패 결과를 기록한다.
- 동시 실행 개수를 제한한다.
- 실행 시간을 측정한다.

이 구조는 API 수집, 파일 검증, URL 점검, 데이터 다운로드 도구로 확장할 수 있다.

---

# 16.17 이 장의 핵심 정리

동시성 프로그래밍은 여러 작업을 겹쳐서 처리해 전체 실행 시간을 줄이는 방법이다. 하지만 동시성은 코드 복잡도를 높이므로 필요한 상황에서만 사용해야 한다.

작업은 먼저 CPU 중심 작업과 I/O 중심 작업으로 구분해야 한다. API 요청, 파일 다운로드, 데이터베이스 조회처럼 기다리는 시간이 많은 작업은 I/O 중심 작업이다. 순수 파이썬 계산이 오래 걸리는 작업은 CPU 중심 작업이다.

스레드는 I/O 중심 작업에 적합하다. 여러 API 요청이나 파일 다운로드처럼 외부 응답을 기다리는 작업에서 유용하다. 하지만 스레드는 같은 메모리를 공유하므로 공유 데이터를 수정할 때 경쟁 상태가 발생할 수 있다. 필요한 경우 \`Lock\`을 사용하지만, 가장 좋은 방법은 공유 상태를 줄이는 것이다.

프로세스는 CPU 중심 작업에 적합하다. 각 프로세스는 독립적인 메모리를 가지므로 여러 CPU 코어를 활용할 수 있다. 다만 프로세스 생성과 데이터 전달 비용이 있으므로 작업 단위가 충분히 커야 한다.

\`asyncio\`는 많은 I/O 작업을 효율적으로 다루는 방식이다. \`async\`, \`await\`, 이벤트 루프를 사용해 대기 시간이 많은 작업을 관리한다. 하지만 비동기 코드에서는 동기적으로 오래 걸리는 함수를 그대로 실행하면 이벤트 루프가 막힐 수 있다.

실무에서는 직접 \`threading.Thread\`나 \`multiprocessing.Process\`를 많이 만들기보다 \`concurrent.futures\`의 \`ThreadPoolExecutor\`와 \`ProcessPoolExecutor\`를 사용하는 것이 더 단순하고 안전한 경우가 많다.

동시성 코드를 작성할 때는 다음 원칙을 기억해야 한다.

- 먼저 순차 코드로 정확하게 만든다.
- 작업 단위를 독립적으로 설계한다.
- 동시 실행 개수를 제한한다.
- 실패한 작업을 기록한다.
- 공유 상태를 줄인다.
- 실행 시간을 측정한다.
- 테스트 가능한 구조를 유지한다.

---

# 연습문제

## 문제 1

동시성과 병렬성의 차이를 설명하라.

## 문제 2

다음 작업 중 I/O 중심 작업에 해당하는 것을 모두 고르라.

\`\`\`text
A. API 응답 기다리기
B. 큰 숫자의 소수 판별
C. 파일 다운로드
D. 데이터베이스 조회
E. 순수 파이썬 반복문으로 수학 계산 반복
\`\`\`

## 문제 3

일반적인 CPython 환경에서 스레드가 CPU 중심 작업을 빠르게 하는 데 한계가 있을 수 있는 이유를 설명하라.

## 문제 4

다음 코드에서 \`join()\`의 역할을 설명하라.

\`\`\`python
thread.start()
thread.join()
\`\`\`

## 문제 5

여러 스레드가 같은 리스트나 딕셔너리를 동시에 수정할 때 생길 수 있는 문제를 설명하라.

## 문제 6

\`ThreadPoolExecutor\`에서 \`max_workers\` 값을 너무 크게 설정하면 어떤 문제가 생길 수 있는가?

## 문제 7

다음 중 CPU 중심 작업에 더 적합한 도구를 고르라.

\`\`\`text
A. ThreadPoolExecutor
B. ProcessPoolExecutor
C. asyncio.sleep
D. print
\`\`\`

## 문제 8

\`ProcessPoolExecutor\`를 사용하는 코드에서 \`if __name__ == "__main__":\` 구문이 중요한 이유를 설명하라.

## 문제 9

다음 코드는 어떤 문제가 있는가?

\`\`\`python
import asyncio
import time


async def work():
    time.sleep(3)
\`\`\`

## 문제 10

여러 API 요청을 동시에 처리하는 프로그램에서 실패한 요청을 반드시 기록해야 하는 이유를 설명하라.

## 문제 11

다음 함수는 동시성에 적용하기 좋은 구조인가? 이유를 설명하라.

\`\`\`python
def process_item(item: dict) -> dict:
    return {
        "id": item["id"],
        "price": int(item["price"]),
    }
\`\`\`

## 문제 12

다음 함수는 동시성 코드에서 어떤 점을 주의해야 하는가?

\`\`\`python
results = []


def process_item(item):
    results.append(item)
\`\`\`

## 문제 13

다음 상황에서 스레드, 프로세스, asyncio 중 어떤 방식을 우선 고려할지 고르라.

\`\`\`text
1. URL 500개에 HTTP 요청을 보내 상태 코드를 확인한다.
2. 큰 숫자 20개에 대해 오래 걸리는 계산을 수행한다.
3. 동시에 수천 개의 네트워크 연결을 관리해야 한다.
4. 파일 10개를 읽어 간단한 문자열 검색을 수행한다.
\`\`\`

## 문제 14

\`as_completed()\`를 사용하는 이유를 설명하라.

## 문제 15

동시성 코드를 작성하기 전에 먼저 순차 코드로 정확하게 만들어야 하는 이유를 설명하라.

---

# 정답 및 해설

## 문제 1 정답

동시성은 여러 작업을 겹쳐서 처리하는 구조다. 작업들이 기다리는 시간을 활용해 동시에 진행되는 것처럼 처리할 수 있다. 병렬성은 여러 작업이 실제로 여러 CPU 코어에서 같은 순간에 실행되는 구조다.

\`\`\`text
동시성: 작업을 겹쳐서 진행
병렬성: 작업을 실제로 동시에 실행
\`\`\`

## 문제 2 정답

정답은 A, C, D다.

\`\`\`text
A. API 응답 기다리기 → I/O 중심
C. 파일 다운로드 → I/O 중심
D. 데이터베이스 조회 → I/O 중심
\`\`\`

B와 E는 계산 자체가 많은 CPU 중심 작업이다.

## 문제 3 정답

일반적인 CPython 환경에는 GIL이 있다. GIL은 한 시점에 하나의 스레드만 파이썬 바이트코드를 실행하도록 제한한다. 따라서 순수 파이썬 CPU 계산을 여러 스레드로 나누어도 여러 CPU 코어를 충분히 활용하지 못할 수 있다.

단, 스레드는 API 요청이나 파일 다운로드처럼 I/O 대기가 많은 작업에서는 여전히 유용하다.

## 문제 4 정답

\`start()\`는 스레드를 시작한다. \`join()\`은 해당 스레드가 끝날 때까지 현재 실행 흐름이 기다리게 한다.

\`\`\`python
thread.start()  # 스레드 시작
thread.join()   # 스레드 종료까지 대기
\`\`\`

## 문제 5 정답

여러 스레드가 같은 데이터를 동시에 수정하면 경쟁 상태가 발생할 수 있다. 실행 순서에 따라 결과가 달라질 수 있고, 일부 수정이 사라지거나 데이터가 예상과 다르게 변할 수 있다.

공유 데이터를 수정해야 한다면 \`Lock\`을 사용하거나, 더 좋은 방법으로 공유 상태를 줄이고 각 작업이 결과를 반환하게 설계하는 것이 좋다.

## 문제 6 정답

\`max_workers\`를 너무 크게 설정하면 다음 문제가 생길 수 있다.

- API 서버에 과도한 요청을 보낼 수 있다.
- 요청 제한에 걸릴 수 있다.
- 네트워크 오류가 증가할 수 있다.
- 로컬 컴퓨터의 메모리와 CPU 사용량이 증가할 수 있다.
- 디버깅과 실패 처리가 어려워질 수 있다.

동시 실행 개수는 작업 성격과 외부 시스템의 제한에 맞게 조절해야 한다.

## 문제 7 정답

정답은 B, \`ProcessPoolExecutor\`다.

CPU 중심 작업은 계산 자체가 오래 걸리는 작업이다. 일반적인 CPython 환경에서는 프로세스를 사용하면 여러 CPU 코어를 활용할 수 있다.

## 문제 8 정답

프로세스 기반 코드는 새 프로세스를 만들 때 모듈이 다시 import될 수 있다. \`if __name__ == "__main__":\` 구문이 없으면 의도치 않게 프로세스 생성 코드가 반복 실행될 수 있다. 특히 Windows 환경에서 중요하다.

## 문제 9 정답

비동기 함수 안에서 \`time.sleep(3)\`을 사용하면 이벤트 루프가 막힌다. 비동기 코드에서는 \`await asyncio.sleep(3)\`을 사용해야 다른 작업이 실행될 수 있다.

수정 예시는 다음과 같다.

\`\`\`python
import asyncio


async def work():
    await asyncio.sleep(3)
\`\`\`

## 문제 10 정답

동시성 작업에서는 일부 요청만 실패할 수 있다. 실패한 요청을 기록하지 않으면 어떤 데이터가 누락되었는지 알 수 없고, 재처리도 어렵다. 따라서 실패한 입력값, 예외 메시지, 실패 시각, 재시도 여부 등을 기록해야 한다.

## 문제 11 정답

동시성에 적용하기 좋은 구조다. 이 함수는 외부 공유 상태를 수정하지 않고, 입력값을 받아 새 딕셔너리를 반환한다. 입력과 출력이 명확하기 때문에 테스트하기 쉽고, 스레드나 프로세스에서 실행하기도 좋다.

## 문제 12 정답

이 함수는 전역 리스트 \`results\`를 직접 수정한다. 여러 스레드가 동시에 \`append()\`를 호출하면 공유 상태를 다루게 된다. 단순한 \`append()\`는 상황에 따라 안전해 보일 수 있지만, 더 복잡한 상태 변경으로 확장되면 경쟁 상태가 발생하기 쉽다.

더 좋은 구조는 함수가 결과를 반환하고 메인 흐름에서 결과를 모으는 것이다.

\`\`\`python
def process_item(item):
    return item
\`\`\`

## 문제 13 정답

권장 선택은 다음과 같다.

\`\`\`text
1. URL 500개 상태 코드 확인 → 스레드 또는 asyncio
2. 큰 숫자 20개 계산 → 프로세스
3. 수천 개 네트워크 연결 관리 → asyncio
4. 파일 10개 간단한 검색 → 스레드 또는 순차 처리
\`\`\`

4번은 파일 수가 적고 작업이 가볍다면 순차 처리로도 충분할 수 있다.

## 문제 14 정답

\`as_completed()\`는 여러 작업 중 완료된 작업부터 순서대로 처리할 수 있게 해준다. 작업마다 실행 시간이 다를 때, 먼저 끝난 작업의 결과를 바로 처리하거나 실패를 바로 기록할 수 있다.

## 문제 15 정답

동시성 코드는 실행 순서가 고정되어 있지 않아 디버깅이 어렵다. 순차 코드가 정확하지 않은 상태에서 동시성을 적용하면 오류 원인을 찾기 힘들다. 따라서 먼저 순차 코드로 기능을 검증하고, 테스트와 로그를 준비한 뒤 동시성을 적용하는 것이 좋다.

---

# 참고 자료

이 장은 다음 공식 문서의 개념 흐름을 기준으로 작성했다.

- Python 공식 문서: \`threading\`
- Python 공식 문서: \`multiprocessing\`
- Python 공식 문서: \`concurrent.futures\`
- Python 공식 문서: \`asyncio\`
- Python 공식 문서: Global Interpreter Lock 용어 설명

`;export{e as default};