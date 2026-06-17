var e=`<!-- 원본: python_advanced_chapter_16_book.md / 세부 장: 16-8 -->

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
`;export{e as default};