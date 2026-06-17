var e=`<!-- 원본: python_advanced_chapter_16_book.md / 세부 장: 16-14 -->

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
`;export{e as default};