var e=`<!-- 원본: python_advanced_chapter_16_book.md / 세부 장: 16-7 -->

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
`;export{e as default};