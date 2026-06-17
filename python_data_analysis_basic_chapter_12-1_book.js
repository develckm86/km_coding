var e=`<!-- 원본: python_data_analysis_basic_chapter_12_book.md / 세부 장: 12-1 -->

## 12.0 들어가며

실무 데이터에서 문자열은 매우 자주 등장합니다.  
고객 이름, 이메일, 전화번호, 주소, 상품명, 상품 코드, 카테고리, 리뷰 문장, 로그 메시지처럼 사람이 읽는 대부분의 정보는 문자열입니다.

문제는 문자열 데이터가 생각보다 지저분하다는 점입니다.

예를 들어 고객 이름에는 앞뒤 공백이 섞여 있을 수 있습니다.

\`\`\`text
"홍길동"
" 홍길동"
"홍길동 "
\`\`\`

이 세 값은 사람 눈에는 모두 같은 이름처럼 보이지만, 컴퓨터는 서로 다른 문자열로 볼 수 있습니다.

이메일 주소도 마찬가지입니다.

\`\`\`text
USER@EXAMPLE.COM
user@example.com
user@example.com 
\`\`\`

대소문자와 공백이 섞이면 같은 이메일도 서로 다른 값처럼 처리될 수 있습니다.

전화번호도 다양한 형식으로 들어옵니다.

\`\`\`text
010-1234-5678
01012345678
010 1234 5678
010.1234.5678
\`\`\`

분석을 하려면 이런 문자열을 일정한 기준으로 정리해야 합니다.

이번 장에서는 pandas에서 문자열 컬럼을 다루는 방법을 배웁니다.  
파이썬 기본 문법에서 문자열 메서드를 배웠다면, 이번 장에서는 그 개념을 pandas의 Series와 DataFrame에 적용한다고 생각하면 됩니다.

핵심은 \`.str\` 접근자입니다.

pandas에서는 문자열 컬럼 전체에 문자열 메서드를 적용할 때 \`.str\`을 사용합니다.

\`\`\`python
df["name"].str.strip()
df["email"].str.lower()
df["phone"].str.replace("-", "")
\`\`\`

문자열 데이터 처리는 데이터 클리닝에서 매우 중요한 단계입니다.  
결측치, 중복값, 이상값을 처리한 뒤 문자열까지 정리하면 분석 가능한 데이터의 품질이 크게 좋아집니다.

---

# 12.1 문자열 컬럼 다루기

pandas에서 문자열 컬럼은 보통 Series 형태로 다룹니다.  
DataFrame의 한 컬럼을 선택하면 Series가 됩니다.

\`\`\`python
import pandas as pd

customers = pd.DataFrame({
    "name": [" 김민수", "이지영 ", "박철수"],
    "email": ["MINU@example.com", "jiyoung@EXAMPLE.com ", "chulsoo@example.com"],
    "phone": ["010-1234-5678", "010 2222 3333", "010.4444.5555"]
})

customers
\`\`\`

\`customers["name"]\`은 하나의 Series입니다.

\`\`\`python
customers["name"]
\`\`\`

이 Series 안에는 여러 개의 문자열이 들어 있습니다.  
일반 파이썬 문자열 하나에 메서드를 적용할 때는 다음처럼 작성합니다.

\`\`\`python
name = " 김민수 "
name.strip()
\`\`\`

하지만 pandas 컬럼 전체에 적용할 때는 \`.str\`을 사용합니다.

\`\`\`python
customers["name"].str.strip()
\`\`\`

이 코드는 \`name\` 컬럼의 모든 값에 \`strip()\`을 한 번에 적용합니다.

---

### 12.1.1 \`.str\` 접근자란?

\`.str\` 접근자는 pandas Series 안의 문자열 값들에 문자열 메서드를 적용할 수 있게 해주는 도구입니다.

예를 들어 다음 코드는 이름 컬럼의 앞뒤 공백을 제거합니다.

\`\`\`python
customers["name"].str.strip()
\`\`\`

이 코드는 내부적으로 각 행에 대해 다음과 비슷한 작업을 수행한다고 이해하면 됩니다.

\`\`\`python
for name in customers["name"]:
    name.strip()
\`\`\`

하지만 pandas에서는 반복문을 직접 작성하지 않고 \`.str\`을 사용해 컬럼 단위로 처리합니다.

주요 문자열 작업은 다음과 같습니다.

| 작업 | pandas 코드 |
|---|---|
| 앞뒤 공백 제거 | \`df["col"].str.strip()\` |
| 소문자 변환 | \`df["col"].str.lower()\` |
| 대문자 변환 | \`df["col"].str.upper()\` |
| 문자열 포함 여부 | \`df["col"].str.contains("문자")\` |
| 문자열 치환 | \`df["col"].str.replace("기존", "새값")\` |
| 문자열 분리 | \`df["col"].str.split("-")\` |
| 문자열 추출 | \`df["col"].str.extract("패턴")\` |

---

### 12.1.2 문자열 컬럼과 결측치

문자열 컬럼에는 결측치가 섞여 있을 수 있습니다.

\`\`\`python
df = pd.DataFrame({
    "name": ["민수", None, "철수"],
    "email": ["minsu@example.com", None, "chulsoo@example.com"]
})

df
\`\`\`

이때 \`.str\` 메서드를 적용하면 결측치는 대체로 결측치로 유지됩니다.

\`\`\`python
df["name"].str.strip()
\`\`\`

다만 문자열 조건 필터링에서는 결측치 때문에 오류가 나거나 의도와 다른 결과가 나올 수 있습니다.

예를 들어 특정 문자열 포함 여부를 확인할 때:

\`\`\`python
df["email"].str.contains("@")
\`\`\`

결과에 결측치가 포함될 수 있습니다.  
이 상태로 필터링하면 문제가 생길 수 있으므로 \`na=False\`를 자주 사용합니다.

\`\`\`python
df[df["email"].str.contains("@", na=False)]
\`\`\`

\`na=False\`는 결측치에 대해서는 \`False\`로 처리하겠다는 의미입니다.

---

### 12.1.3 문자열 컬럼의 자료형 확인

문자열 컬럼의 자료형을 확인해봅시다.

\`\`\`python
customers.dtypes
\`\`\`

문자열 컬럼이 \`object\`로 보일 수 있습니다.  
pandas에서는 문자열이 \`object\` 타입으로 표시되는 경우가 많습니다.

필요하면 문자열 타입으로 변환할 수 있습니다.

\`\`\`python
customers["name"] = customers["name"].astype("string")
\`\`\`

다만 기초 과정에서는 \`object\`와 \`string\`의 차이를 깊게 다루지 않습니다.  
중요한 것은 문자열 컬럼을 처리할 때 \`.str\`을 사용한다는 점입니다.

---
`;export{e as default};