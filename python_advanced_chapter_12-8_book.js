var e=`<!-- 원본: python_advanced_chapter_12_book.md / 세부 장: 12-8 -->

# 12.8 테스트 구조 설계

## 프로젝트 안에서 테스트 위치

실무 프로젝트에서는 보통 \`src\`와 \`tests\`를 분리한다.

\`\`\`text
project/
  src/
    my_app/
      __init__.py
      pricing.py
      validators.py
      api_client.py
  tests/
    conftest.py
    test_pricing.py
    test_validators.py
    test_api_client.py
\`\`\`

코드 파일과 테스트 파일의 이름을 대응시키면 찾기 쉽다.

\`\`\`text
src/my_app/pricing.py        -> tests/test_pricing.py
src/my_app/validators.py     -> tests/test_validators.py
src/my_app/api_client.py     -> tests/test_api_client.py
\`\`\`

## 테스트 단위 나누기

테스트는 보통 다음 단위로 나눌 수 있다.

| 테스트 종류 | 설명 | 예시 |
|---|---|---|
| 단위 테스트 | 함수나 클래스 하나를 테스트 | 가격 계산 함수 테스트 |
| 통합 테스트 | 여러 구성 요소가 함께 동작하는지 테스트 | 파일 읽기 후 데이터 변환 |
| 외부 연동 테스트 | API, DB 등 외부 시스템과 연결 테스트 | 실제 테스트 서버 API 호출 |

고급 파이썬 과정에서는 단위 테스트와 작은 통합 테스트에 집중하는 것이 좋다. 실제 외부 시스템을 사용하는 테스트는 느리고 관리가 어렵기 때문에 별도로 분리하는 것이 좋다.

## 빠른 테스트와 느린 테스트 분리

빠른 테스트는 자주 실행할 수 있어야 한다. 느린 테스트는 별도 표시를 해두고 필요할 때만 실행할 수 있다.

pytest marker를 사용할 수 있다.

\`\`\`python
import pytest


@pytest.mark.slow
def test_large_file_processing():
    ...
\`\`\`

특정 marker를 제외하고 실행할 수 있다.

\`\`\`bash
pytest -m "not slow"
\`\`\`

실무에서는 빠른 단위 테스트를 자주 실행하고, 느린 통합 테스트는 배포 전이나 CI에서 실행하는 식으로 나눌 수 있다.

## 테스트 데이터 관리

테스트 데이터는 작고 명확해야 한다. 너무 큰 테스트 파일은 테스트를 느리게 만들고 실패 원인을 찾기 어렵게 한다.

좋은 테스트 데이터의 조건은 다음과 같다.

- 크기가 작다.
- 의도가 분명하다.
- 테스트 코드에서 바로 이해할 수 있다.
- 경계값과 예외 상황을 포함한다.
- 실제 개인정보나 민감 정보를 포함하지 않는다.

작은 데이터는 테스트 코드 안에 직접 둘 수 있다.

\`\`\`python
orders = [
    {"id": 1, "price": 10000, "quantity": 2},
    {"id": 2, "price": 15000, "quantity": 1},
]
\`\`\`

파일 형식 자체를 테스트해야 한다면 \`tests/fixtures\` 폴더를 사용할 수 있다.

\`\`\`text
tests/
  fixtures/
    sample_orders.csv
    invalid_orders.csv
\`\`\`

## 테스트가 설계를 바꾸는 방식

테스트를 작성하다 보면 코드의 설계 문제가 드러난다.

예를 들어 테스트하기 어렵다면 다음 질문을 해볼 수 있다.

- 함수가 너무 많은 일을 하고 있지 않은가?
- 외부 의존성을 직접 만들고 있지 않은가?
- 결과를 반환하지 않고 출력만 하고 있지 않은가?
- 현재 시간이나 환경 변수에 직접 의존하고 있지 않은가?
- 파일 경로가 코드 안에 고정되어 있지 않은가?

테스트하기 어려운 코드를 억지로 테스트하려 하기보다, 테스트하기 쉬운 구조로 코드를 개선하는 것이 좋다.

---
`;export{e as default};