var e=`<!-- 원본: python_advanced_chapter_17_book.md / 세부 장: 17-7 -->

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
`;export{e as default};