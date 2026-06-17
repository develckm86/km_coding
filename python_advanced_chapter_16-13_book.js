var e=`<!-- 원본: python_advanced_chapter_16_book.md / 세부 장: 16-13 -->

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
`;export{e as default};