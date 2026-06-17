var e=`<!-- 원본: python_advanced_chapter_16_book.md / 세부 장: 16-9 -->

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
`;export{e as default};