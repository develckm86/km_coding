var e=`<!-- 원본: python_data_analysis_basic_chapter_5_book.md / 세부 장: 5-3 -->

# 5.3 JSON 파일 불러오기

## 5.3.1 JSON이란?

**JSON**은 JavaScript Object Notation의 약자다. 데이터를 key-value 구조로 표현하는 텍스트 기반 형식이다. 웹 API에서 데이터를 주고받을 때 많이 사용된다.

예를 들어 고객 한 명의 정보를 JSON으로 표현하면 다음과 같다.

\`\`\`json
{
  "customer_id": 1,
  "name": "김민수",
  "grade": "VIP",
  "region": "서울"
}
\`\`\`

여러 고객을 표현할 때는 보통 객체를 리스트 안에 담는다.

\`\`\`json
[
  {
    "customer_id": 1,
    "name": "김민수",
    "grade": "VIP",
    "region": "서울"
  },
  {
    "customer_id": 2,
    "name": "이지영",
    "grade": "BASIC",
    "region": "부산"
  }
]
\`\`\`

파이썬의 리스트와 딕셔너리를 배웠다면 JSON 구조는 비교적 쉽게 이해할 수 있다.

\`\`\`python
customers = [
    {"customer_id": 1, "name": "김민수", "grade": "VIP", "region": "서울"},
    {"customer_id": 2, "name": "이지영", "grade": "BASIC", "region": "부산"},
]
\`\`\`

위 파이썬 데이터와 JSON 데이터는 매우 비슷하게 생겼다. 실제로 JSON은 API 응답, 설정 파일, 로그 데이터, 웹 서비스 데이터 저장 등에 많이 사용된다.

---

## 5.3.2 JSON 실습 파일 만들기

다음 코드를 실행해 JSON 파일을 만들어 보자.

\`\`\`python
import pandas as pd

customers = pd.DataFrame({
    "customer_id": [1, 2, 3],
    "name": ["김민수", "이지영", "박철수"],
    "grade": ["VIP", "BASIC", "GOLD"],
    "region": ["서울", "부산", "대구"],
})

customers.to_json(
    "customers.json",
    orient="records",
    force_ascii=False,
    indent=2
)
\`\`\`

\`orient="records"\`는 각 행을 하나의 JSON 객체로 만들고, 전체를 리스트로 저장한다는 의미다.

저장된 파일은 다음과 비슷하다.

\`\`\`json
[
  {
    "customer_id": 1,
    "name": "김민수",
    "grade": "VIP",
    "region": "서울"
  },
  {
    "customer_id": 2,
    "name": "이지영",
    "grade": "BASIC",
    "region": "부산"
  },
  {
    "customer_id": 3,
    "name": "박철수",
    "grade": "GOLD",
    "region": "대구"
  }
]
\`\`\`

\`force_ascii=False\`는 한글을 유니코드 이스케이프 형태가 아니라 실제 한글로 저장하기 위해 사용한다. 이 옵션을 사용하지 않으면 한글이 \`\\uae40\\ubbfc\\uc218\` 같은 형태로 저장될 수 있다. 그것도 잘못된 것은 아니지만, 사람이 파일을 직접 읽을 때는 불편하다.

---

## 5.3.3 \`read_json()\` 기본 사용법

JSON 파일을 DataFrame으로 불러올 때는 \`pd.read_json()\`을 사용한다.

\`\`\`python
import pandas as pd

customers = pd.read_json("customers.json")
print(customers)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
   customer_id name  grade region
0            1  김민수    VIP     서울
1            2  이지영  BASIC     부산
2            3  박철수   GOLD     대구
\`\`\`

JSON 파일이 표 형태에 가까운 구조라면 pandas로 쉽게 불러올 수 있다. 하지만 모든 JSON이 바로 DataFrame으로 깔끔하게 바뀌는 것은 아니다.

예를 들어 다음처럼 중첩 구조가 있는 JSON을 생각해 보자.

\`\`\`json
{
  "customer_id": 1,
  "name": "김민수",
  "address": {
    "city": "서울",
    "district": "강남구"
  }
}
\`\`\`

\`address\` 안에 다시 \`city\`, \`district\`가 들어 있다. 이런 구조를 중첩 JSON이라고 한다. pandas로 읽을 수는 있지만, 바로 깔끔한 표가 되지 않을 수 있다.

중첩 JSON을 다루는 방법은 고급 과정이나 API 데이터 처리 과정에서 더 자세히 다룬다. 기초 과정에서는 우선 다음 형태의 JSON을 편하게 읽고 쓰는 것을 목표로 한다.

\`\`\`json
[
  {"컬럼1": "값", "컬럼2": "값"},
  {"컬럼1": "값", "컬럼2": "값"}
]
\`\`\`

---

## 5.3.4 JSON 구조와 DataFrame의 관계

DataFrame은 행과 열이 있는 표다. JSON은 key-value 구조다. 따라서 pandas가 JSON을 DataFrame으로 바꿀 때는 key를 컬럼명으로 사용하고, 각 객체를 하나의 행으로 변환한다.

다음 JSON을 보자.

\`\`\`json
[
  {"name": "김민수", "grade": "VIP"},
  {"name": "이지영", "grade": "BASIC"}
]
\`\`\`

이 JSON은 다음 DataFrame으로 바뀔 수 있다.

| name | grade |
|---|---|
| 김민수 | VIP |
| 이지영 | BASIC |

그런데 각 객체가 서로 다른 key를 가지고 있다면 어떻게 될까?

\`\`\`json
[
  {"name": "김민수", "grade": "VIP"},
  {"name": "이지영", "region": "부산"}
]
\`\`\`

이 경우 DataFrame은 다음처럼 만들어질 수 있다.

| name | grade | region |
|---|---|---|
| 김민수 | VIP | NaN |
| 이지영 | NaN | 부산 |

없는 값은 결측치로 처리된다. 결측치 처리는 10장에서 자세히 배운다.

---
`;export{e as default};