var e=`<!-- 원본: python_advanced_chapter_16_book.md / 세부 장: 16-4 -->

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
`;export{e as default};