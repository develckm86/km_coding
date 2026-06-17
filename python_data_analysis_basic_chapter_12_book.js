var e=`# 12장. 문자열 데이터 처리

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

## 12.1 문자열 컬럼 다루기

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

## 12.2 예제 데이터 준비

이번 장에서는 고객 데이터와 상품 데이터를 사용합니다.

먼저 고객 데이터를 만들어보겠습니다.

\`\`\`python
import pandas as pd

customers = pd.DataFrame({
    "customer_id": [1, 2, 3, 4, 5, 6],
    "name": [" 김민수", "이지영 ", " 박철수 ", "최영희", "정수진", None],
    "email": [
        "MINU@example.com",
        "jiyoung@EXAMPLE.com ",
        "chulsoo@example.com",
        "younghee@test.co.kr",
        "sujin@example.com",
        None
    ],
    "phone": [
        "010-1234-5678",
        "010 2222 3333",
        "010.4444.5555",
        "01012345678",
        "02-123-4567",
        ""
    ],
    "address": [
        "서울특별시 강남구",
        "부산광역시 해운대구",
        "서울시 마포구",
        "대전광역시 서구",
        "경기도 성남시",
        "서울특별시 종로구"
    ]
})

customers
\`\`\`

이 데이터에는 다음 문제가 섞여 있습니다.

- 이름 앞뒤 공백
- 이메일 대소문자 혼합
- 이메일 뒤 공백
- 전화번호 구분자 형식 불일치
- 전화번호 빈 문자열
- 지역 표기 방식 불일치

다음으로 상품 데이터를 만들어보겠습니다.

\`\`\`python
products = pd.DataFrame({
    "product_code": ["ELEC-KEY-001", "ELEC-MOU-002", "BOOK-PYT-101", "LIFE-CUP-201", "BOOK-SQL-102"],
    "product_name": ["무선 키보드", " 게이밍 마우스 ", "파이썬 입문서", "머그컵", "SQL 기초"],
    "price_text": ["30,000원", "45,000원", "25,000원", "12,000원", "28,000원"],
    "tag": ["전자기기|키보드", "전자기기|마우스", "도서|프로그래밍", "생활용품|컵", "도서|데이터"]
})

products
\`\`\`

이 상품 데이터에서는 다음 작업을 해볼 수 있습니다.

- 상품명 공백 제거
- 가격 문자열에서 숫자만 추출
- 상품 코드에서 카테고리 코드 추출
- 태그를 대분류와 소분류로 분리

---

## 12.3 공백 처리

문자열 데이터에서 가장 먼저 확인해야 할 문제 중 하나가 공백입니다.  
앞뒤 공백은 눈에 잘 보이지 않지만 데이터 분석 결과에 영향을 줄 수 있습니다.

예를 들어 \`"김민수"\`와 \`" 김민수"\`는 서로 다른 값입니다.

\`\`\`python
"김민수" == " 김민수"
\`\`\`

결과는 \`False\`입니다.

---

### 12.3.1 앞뒤 공백 제거: \`str.strip()\`

앞뒤 공백을 제거하려면 \`str.strip()\`을 사용합니다.

\`\`\`python
customers["name_clean"] = customers["name"].str.strip()

customers[["name", "name_clean"]]
\`\`\`

\`strip()\`은 문자열 앞과 뒤의 공백을 제거합니다.

\`\`\`text
" 김민수"   → "김민수"
"이지영 "   → "이지영"
" 박철수 " → "박철수"
\`\`\`

실무에서는 이름, 이메일, 상품명, 코드값을 정리할 때 \`strip()\`을 자주 사용합니다.

---

### 12.3.2 왼쪽 공백과 오른쪽 공백만 제거하기

왼쪽 공백만 제거하려면 \`lstrip()\`을 사용합니다.

\`\`\`python
customers["name"].str.lstrip()
\`\`\`

오른쪽 공백만 제거하려면 \`rstrip()\`을 사용합니다.

\`\`\`python
customers["name"].str.rstrip()
\`\`\`

대부분의 데이터 클리닝에서는 앞뒤 공백을 모두 제거하는 \`strip()\`을 가장 많이 사용합니다.

---

### 12.3.3 연속 공백 처리

문자열 안쪽에 연속 공백이 있을 수도 있습니다.

\`\`\`python
names = pd.Series(["김  민수", "이   지영", "박 철수"])

names
\`\`\`

이런 경우 \`replace()\`와 정규표현식을 사용할 수 있습니다.

\`\`\`python
names.str.replace(r"\\s+", " ", regex=True)
\`\`\`

여기서 \`\\s+\`는 하나 이상의 공백 문자를 의미합니다.  
\`regex=True\`는 패턴을 정규표현식으로 해석하겠다는 의미입니다.

결과는 다음과 같습니다.

\`\`\`text
"김 민수"
"이 지영"
"박 철수"
\`\`\`

정규표현식은 12.9절에서 조금 더 다룹니다.

---

### 12.3.4 빈 문자열 처리

공백을 제거한 뒤 빈 문자열이 되는 값이 있을 수 있습니다.

\`\`\`python
phones = pd.Series(["010-1234-5678", "", "   ", None])

phones_clean = phones.str.strip()

phones_clean
\`\`\`

\`"   "\`는 \`strip()\` 후 \`""\`가 됩니다.  
하지만 빈 문자열은 결측치가 아닙니다.

빈 문자열을 결측치로 바꾸려면 다음처럼 처리합니다.

\`\`\`python
phones_clean = phones_clean.replace("", pd.NA)

phones_clean
\`\`\`

실무에서는 다음 순서가 자주 사용됩니다.

\`\`\`python
df["col"] = df["col"].str.strip()
df["col"] = df["col"].replace("", pd.NA)
\`\`\`

---

## 12.4 대소문자 처리

영문 데이터에서는 대소문자 차이가 자주 문제가 됩니다.

예를 들어 이메일 주소는 대소문자가 섞여 들어올 수 있습니다.

\`\`\`python
customers["email"]
\`\`\`

분석이나 중복 확인을 위해서는 보통 소문자로 통일하는 것이 좋습니다.

---

### 12.4.1 소문자 변환: \`str.lower()\`

\`\`\`python
customers["email_clean"] = customers["email"].str.strip().str.lower()

customers[["email", "email_clean"]]
\`\`\`

위 코드에서는 두 작업을 이어서 수행했습니다.

1. \`str.strip()\`으로 앞뒤 공백 제거
2. \`str.lower()\`로 소문자 변환

메서드를 이어서 사용하는 방식을 메서드 체이닝이라고 합니다.

\`\`\`python
customers["email"].str.strip().str.lower()
\`\`\`

이메일, 사용자 ID, 코드값은 소문자로 통일하면 비교와 중복 확인이 쉬워집니다.

---

### 12.4.2 대문자 변환: \`str.upper()\`

상품 코드처럼 대문자로 통일하는 것이 좋은 데이터도 있습니다.

\`\`\`python
products["product_code_upper"] = products["product_code"].str.upper()

products[["product_code", "product_code_upper"]]
\`\`\`

상품 코드, 지역 코드, 부서 코드처럼 코드 체계가 있는 값은 대문자로 통일하는 경우가 많습니다.

---

### 12.4.3 단어 첫 글자 처리

문자열의 첫 글자나 단어별 첫 글자를 정리할 때는 다음 메서드를 사용할 수 있습니다.

\`\`\`python
names = pd.Series(["kim minsu", "lee jiyoung", "park chulsoo"])

names.str.capitalize()
\`\`\`

\`capitalize()\`는 문자열 전체에서 첫 글자만 대문자로 바꿉니다.

\`\`\`python
names.str.title()
\`\`\`

\`title()\`은 각 단어의 첫 글자를 대문자로 바꿉니다.

영문 이름, 상품명, 제목 데이터를 정리할 때 사용할 수 있습니다.  
다만 한국어 데이터에서는 대소문자 개념이 없으므로 자주 사용하지 않습니다.

---

## 12.5 문자열 포함 여부 확인

특정 문자열이 포함되어 있는지 확인할 때는 \`str.contains()\`를 사용합니다.

예를 들어 이메일 주소가 \`example.com\` 도메인인지 확인해봅시다.

\`\`\`python
customers["email_clean"] = customers["email"].str.strip().str.lower()

customers["email_clean"].str.contains("example.com", na=False)
\`\`\`

결과는 \`True\`와 \`False\`로 이루어진 Series입니다.

\`\`\`text
True
True
True
False
True
False
\`\`\`

이 결과를 필터링에 사용할 수 있습니다.

\`\`\`python
example_customers = customers[
    customers["email_clean"].str.contains("example.com", na=False)
]

example_customers
\`\`\`

---

### 12.5.1 \`na=False\`가 필요한 이유

문자열 컬럼에 결측치가 있으면 \`contains()\` 결과에도 결측치가 포함될 수 있습니다.

\`\`\`python
customers["email_clean"].str.contains("example.com")
\`\`\`

이 결과를 그대로 필터링에 사용하면 오류가 발생하거나 의도와 다르게 동작할 수 있습니다.

따라서 결측치는 \`False\`로 처리하는 것이 안전합니다.

\`\`\`python
customers["email_clean"].str.contains("example.com", na=False)
\`\`\`

실무에서는 \`str.contains()\`를 사용할 때 \`na=False\`를 함께 쓰는 습관이 좋습니다.

---

### 12.5.2 대소문자 구분하지 않고 찾기

기본적으로 \`str.contains()\`는 대소문자를 구분합니다.  
대소문자를 구분하지 않으려면 \`case=False\`를 사용할 수 있습니다.

\`\`\`python
customers["email"].str.contains("example.com", case=False, na=False)
\`\`\`

또는 먼저 소문자로 통일한 뒤 검색할 수도 있습니다.

\`\`\`python
customers["email_clean"] = customers["email"].str.strip().str.lower()
customers["email_clean"].str.contains("example.com", na=False)
\`\`\`

데이터 클리닝에서는 보통 먼저 표준화한 컬럼을 만든 뒤 검색하는 방식이 안정적입니다.

---

### 12.5.3 시작과 끝 확인

문자열이 특정 값으로 시작하는지 확인하려면 \`str.startswith()\`를 사용합니다.

\`\`\`python
customers["phone"].str.startswith("010", na=False)
\`\`\`

문자열이 특정 값으로 끝나는지 확인하려면 \`str.endswith()\`를 사용합니다.

\`\`\`python
customers["email_clean"].str.endswith(".com", na=False)
\`\`\`

실무 예시는 다음과 같습니다.

- 휴대폰 번호가 \`010\`으로 시작하는지 확인
- 파일명이 \`.csv\`로 끝나는지 확인
- 상품 코드가 특정 접두어로 시작하는지 확인
- 이메일이 특정 도메인으로 끝나는지 확인

---

## 12.6 문자열 치환

문자열에서 특정 문자를 제거하거나 다른 값으로 바꿀 때는 \`str.replace()\`를 사용합니다.

---

### 12.6.1 단순 문자열 치환

전화번호에서 하이픈을 제거해봅시다.

\`\`\`python
customers["phone_no_hyphen"] = customers["phone"].str.replace("-", "", regex=False)

customers[["phone", "phone_no_hyphen"]]
\`\`\`

\`regex=False\`는 \`"-"\`를 정규표현식이 아니라 일반 문자열로 처리하겠다는 의미입니다.  
단순한 문자열 치환에서는 \`regex=False\`를 명시하는 것이 좋습니다.

---

### 12.6.2 여러 구분자 제거하기

전화번호에는 하이픈뿐 아니라 공백, 점도 들어 있습니다.

\`\`\`text
010-1234-5678
010 2222 3333
010.4444.5555
01012345678
\`\`\`

이런 여러 구분자를 한 번에 제거하려면 정규표현식을 사용할 수 있습니다.

\`\`\`python
customers["phone_digits"] = (
    customers["phone"]
    .str.replace(r"[-.\\s]", "", regex=True)
)

customers[["phone", "phone_digits"]]
\`\`\`

여기서 \`[-.\\s]\`는 하이픈, 점, 공백 중 하나를 의미합니다.

주의할 점은 점 \`.\`이 정규표현식에서 특별한 의미를 가지므로, 문자 그대로 사용하려면 조심해야 한다는 점입니다.  
위 코드처럼 문자 클래스 \`[]\` 안에서는 점을 비교적 간단하게 사용할 수 있습니다.

---

### 12.6.3 금액 문자열에서 숫자만 남기기

상품 가격 데이터는 다음처럼 문자열로 들어오는 경우가 많습니다.

\`\`\`python
products["price_text"]
\`\`\`

\`\`\`text
30,000원
45,000원
25,000원
\`\`\`

분석을 하려면 숫자로 변환해야 합니다.  
먼저 쉼표와 원 표시를 제거합니다.

\`\`\`python
products["price_number"] = (
    products["price_text"]
    .str.replace(",", "", regex=False)
    .str.replace("원", "", regex=False)
    .astype(int)
)

products[["price_text", "price_number"]]
\`\`\`

또는 숫자가 아닌 문자를 모두 제거할 수도 있습니다.

\`\`\`python
products["price_number_2"] = (
    products["price_text"]
    .str.replace(r"[^0-9]", "", regex=True)
    .astype(int)
)
\`\`\`

여기서 \`[^0-9]\`는 숫자가 아닌 문자를 의미합니다.  
즉, 숫자가 아닌 모든 문자를 빈 문자열로 바꿉니다.

---

### 12.6.4 값 전체를 바꾸는 \`replace()\`와의 차이

pandas에는 \`Series.replace()\`도 있습니다.  
이것은 문자열 일부가 아니라 값 전체를 바꿀 때 주로 사용합니다.

\`\`\`python
regions = pd.Series(["서울시", "서울특별시", "부산광역시"])

regions.replace({
    "서울시": "서울",
    "서울특별시": "서울",
    "부산광역시": "부산"
})
\`\`\`

반면 \`str.replace()\`는 문자열 내부 일부를 바꿀 때 사용합니다.

\`\`\`python
regions.str.replace("특별시", "", regex=False)
\`\`\`

정리하면 다음과 같습니다.

| 목적 | 사용 메서드 |
|---|---|
| 값 전체를 특정 값으로 바꾸기 | \`replace()\` |
| 문자열 내부 일부를 바꾸기 | \`str.replace()\` |

---

## 12.7 문자열 분리

문자열 안에 여러 정보가 구분자로 묶여 있는 경우가 많습니다.

예를 들어 이메일은 \`@\`를 기준으로 아이디와 도메인으로 나눌 수 있습니다.

\`\`\`text
minsu@example.com
\`\`\`

상품 태그도 \`|\`를 기준으로 대분류와 소분류로 나눌 수 있습니다.

\`\`\`text
전자기기|키보드
\`\`\`

이럴 때는 \`str.split()\`을 사용합니다.

---

### 12.7.1 기본 분리

이메일을 \`@\` 기준으로 나누어보겠습니다.

\`\`\`python
customers["email_clean"] = customers["email"].str.strip().str.lower()

customers["email_clean"].str.split("@")
\`\`\`

결과는 각 행마다 리스트 형태로 나옵니다.

\`\`\`text
["minu", "example.com"]
["jiyoung", "example.com"]
...
\`\`\`

---

### 12.7.2 분리 결과를 여러 컬럼으로 만들기

분리 결과를 여러 컬럼으로 만들려면 \`expand=True\`를 사용합니다.

\`\`\`python
email_parts = customers["email_clean"].str.split("@", expand=True)

email_parts
\`\`\`

결과는 DataFrame으로 반환됩니다.

이제 컬럼명을 지정할 수 있습니다.

\`\`\`python
customers[["email_id", "email_domain"]] = customers["email_clean"].str.split("@", expand=True)

customers[["email_clean", "email_id", "email_domain"]]
\`\`\`

이메일 도메인 분석에서 자주 사용하는 패턴입니다.

---

### 12.7.3 분리 개수 제한하기

문자열에 구분자가 여러 번 등장할 수 있습니다.  
이때 \`n\`을 사용해 몇 번만 나눌지 지정할 수 있습니다.

\`\`\`python
codes = pd.Series(["A-B-C", "D-E-F", "G-H-I"])

codes.str.split("-", n=1, expand=True)
\`\`\`

\`n=1\`은 첫 번째 구분자에서만 나누겠다는 의미입니다.

결과는 다음과 같습니다.

\`\`\`text
A | B-C
D | E-F
G | H-I
\`\`\`

---

### 12.7.4 오른쪽부터 분리하기

오른쪽부터 분리하려면 \`str.rsplit()\`을 사용합니다.

\`\`\`python
file_names = pd.Series(["sales_2026_01.csv", "sales_2026_02.csv"])

file_names.str.rsplit("_", n=1, expand=True)
\`\`\`

파일명처럼 뒤쪽 정보가 중요할 때 유용합니다.

---

### 12.7.5 상품 태그 분리하기

상품 데이터의 \`tag\` 컬럼을 분리해봅시다.

\`\`\`python
products[["main_category", "sub_category"]] = products["tag"].str.split("|", expand=True)

products[["tag", "main_category", "sub_category"]]
\`\`\`

이제 대분류와 소분류를 따로 분석할 수 있습니다.

예를 들어 대분류별 상품 수를 계산할 수 있습니다.

\`\`\`python
products["main_category"].value_counts()
\`\`\`

---

## 12.8 문자열 추출

문자열 안에서 특정 부분만 추출해야 할 때가 있습니다.

예를 들어 상품 코드가 다음과 같은 구조라고 해봅시다.

\`\`\`text
ELEC-KEY-001
BOOK-PYT-101
LIFE-CUP-201
\`\`\`

이 코드에는 여러 정보가 들어 있습니다.

\`\`\`text
대분류 코드 - 상품 약어 - 번호
\`\`\`

이 중 대분류 코드만 추출하거나, 마지막 번호만 추출할 수 있습니다.

---

### 12.8.1 인덱싱과 슬라이싱으로 추출하기

문자열 길이와 위치가 일정하다면 \`str[]\`을 사용할 수 있습니다.

\`\`\`python
products["category_code"] = products["product_code"].str[:4]

products[["product_code", "category_code"]]
\`\`\`

이 코드는 앞의 4글자를 추출합니다.

\`\`\`text
ELEC
BOOK
LIFE
\`\`\`

특정 위치의 문자만 가져올 수도 있습니다.

\`\`\`python
products["product_code"].str[0]
\`\`\`

문자열 위치가 일정한 코드 데이터에서는 슬라이싱이 간단하고 빠릅니다.

---

### 12.8.2 \`split()\`으로 추출하기

상품 코드가 하이픈으로 구분되어 있으므로 \`split()\`을 사용할 수도 있습니다.

\`\`\`python
code_parts = products["product_code"].str.split("-", expand=True)

code_parts
\`\`\`

컬럼명을 붙여보겠습니다.

\`\`\`python
products[["code_main", "code_item", "code_number"]] = products["product_code"].str.split("-", expand=True)

products[["product_code", "code_main", "code_item", "code_number"]]
\`\`\`

이 방식은 구분자가 명확할 때 이해하기 쉽습니다.

---

### 12.8.3 정규표현식으로 추출하기: \`str.extract()\`

정규표현식을 사용하면 더 유연하게 문자열 일부를 추출할 수 있습니다.

상품 코드에서 마지막 숫자만 추출해봅시다.

\`\`\`python
products["code_number_regex"] = products["product_code"].str.extract(r"(\\d+)$")

products[["product_code", "code_number_regex"]]
\`\`\`

여기서 \`(\\d+)$\`의 의미는 다음과 같습니다.

| 패턴 | 의미 |
|---|---|
| \`\\d\` | 숫자 |
| \`+\` | 하나 이상 |
| \`$\` | 문자열의 끝 |
| \`()\` | 추출할 그룹 |

즉, 문자열 끝에 있는 숫자 묶음을 추출합니다.

---

### 12.8.4 여러 그룹 추출하기

상품 코드 전체를 정규표현식으로 나누어 추출할 수도 있습니다.

\`\`\`python
extracted = products["product_code"].str.extract(r"([A-Z]+)-([A-Z]+)-(\\d+)")

extracted
\`\`\`

결과는 세 개의 컬럼을 가진 DataFrame입니다.

컬럼명을 지정해보겠습니다.

\`\`\`python
products[["main_code", "item_code", "number_code"]] = products["product_code"].str.extract(
    r"([A-Z]+)-([A-Z]+)-(\\d+)"
)

products[["product_code", "main_code", "item_code", "number_code"]]
\`\`\`

정규표현식 추출은 코드, 전화번호, 이메일, 날짜, 로그 메시지 등에서 매우 유용합니다.

---

## 12.9 정규표현식 기초 활용

정규표현식은 문자열 패턴을 표현하는 문법입니다.  
데이터 분석 기초 과정에서는 모든 정규표현식을 깊게 외울 필요는 없습니다.  
다만 자주 사용하는 패턴을 이해하고 활용할 수 있으면 문자열 데이터 처리가 훨씬 쉬워집니다.

---

### 12.9.1 자주 쓰는 패턴

| 패턴 | 의미 | 예시 |
|---|---|---|
| \`\\d\` | 숫자 한 글자 | \`0\`, \`1\`, \`9\` |
| \`\\d+\` | 숫자 하나 이상 | \`123\`, \`2026\` |
| \`[A-Z]\` | 대문자 한 글자 | \`A\`, \`B\` |
| \`[A-Z]+\` | 대문자 하나 이상 | \`ELEC\` |
| \`[가-힣]+\` | 한글 하나 이상 | \`서울\`, \`김민수\` |
| \`\\s\` | 공백 문자 | 스페이스, 탭 |
| \`\\s+\` | 공백 하나 이상 | 여러 공백 |
| \`.\` | 임의의 한 문자 | 주의 필요 |
| \`^\` | 문자열 시작 | \`^010\` |
| \`$\` | 문자열 끝 | \`com$\` |
| \`()\` | 추출 그룹 | \`(\\d+)\` |
| \`|\` | 또는 | \`서울|부산\` |

정규표현식은 강력하지만 처음에는 어렵게 느껴질 수 있습니다.  
처음에는 자주 쓰는 패턴만 익히고, 필요할 때 검색하면서 확장하는 방식이 좋습니다.

---

### 12.9.2 숫자만 추출하기

상품 가격에서 숫자만 추출해봅시다.

\`\`\`python
products["price_number"] = (
    products["price_text"]
    .str.replace(r"[^0-9]", "", regex=True)
    .astype(int)
)

products[["price_text", "price_number"]]
\`\`\`

\`[^0-9]\`는 숫자가 아닌 문자를 의미합니다.  
따라서 숫자가 아닌 문자를 모두 제거하면 숫자 문자열만 남습니다.

---

### 12.9.3 이메일 형식 검사

간단한 이메일 형식을 검사해보겠습니다.

\`\`\`python
email_pattern = r"^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$"

customers["is_valid_email"] = customers["email_clean"].str.match(email_pattern, na=False)

customers[["email_clean", "is_valid_email"]]
\`\`\`

이 패턴은 기초적인 이메일 형식 확인용입니다.  
실제 이메일 검증은 훨씬 복잡할 수 있습니다.

여기서는 다음 정도만 이해하면 됩니다.

\`\`\`text
문자들이 있고, @가 있고, 도메인이 있고, 점 뒤에 확장자가 있다.
\`\`\`

---

### 12.9.4 전화번호 숫자 추출

전화번호에서 숫자가 아닌 문자를 제거해보겠습니다.

\`\`\`python
customers["phone_digits"] = (
    customers["phone"]
    .str.replace(r"[^0-9]", "", regex=True)
    .replace("", pd.NA)
)

customers[["phone", "phone_digits"]]
\`\`\`

이제 전화번호가 숫자로만 이루어진 형태로 정리됩니다.

\`\`\`text
010-1234-5678 → 01012345678
010 2222 3333 → 01022223333
010.4444.5555 → 01044445555
\`\`\`

---

### 12.9.5 전화번호 형식 검사

휴대폰 번호가 010으로 시작하고 전체 길이가 11자리인지 확인할 수 있습니다.

\`\`\`python
customers["is_mobile"] = customers["phone_digits"].str.match(r"^010\\d{8}$", na=False)

customers[["phone_digits", "is_mobile"]]
\`\`\`

여기서 \`^010\\d{8}$\`의 의미는 다음과 같습니다.

| 패턴 | 의미 |
|---|---|
| \`^010\` | 010으로 시작 |
| \`\\d{8}\` | 숫자 8개 |
| \`$\` | 문자열 끝 |

즉, 전체가 010으로 시작하는 11자리 숫자인지 확인합니다.

---

### 12.9.6 여러 값 중 하나 찾기

주소에서 서울 또는 부산이 포함된 고객을 찾고 싶다면 다음처럼 작성할 수 있습니다.

\`\`\`python
customers["address"].str.contains("서울|부산", na=False)
\`\`\`

정규표현식에서 \`|\`는 “또는”을 의미합니다.

해당 고객만 선택할 수도 있습니다.

\`\`\`python
customers[customers["address"].str.contains("서울|부산", na=False)]
\`\`\`

---

## 12.10 문자열 조건 필터링

문자열 메서드는 필터링과 자주 함께 사용됩니다.

---

### 12.10.1 특정 도메인 고객 찾기

\`\`\`python
customers["email_clean"] = customers["email"].str.strip().str.lower()

example_customers = customers[
    customers["email_clean"].str.endswith("example.com", na=False)
]

example_customers
\`\`\`

\`example.com\` 도메인을 사용하는 고객만 추출합니다.

---

### 12.10.2 서울 고객 찾기

주소에 서울이 포함된 고객을 찾습니다.

\`\`\`python
seoul_customers = customers[
    customers["address"].str.contains("서울", na=False)
]

seoul_customers
\`\`\`

주소 표기가 \`"서울특별시"\` 또는 \`"서울시"\`처럼 다를 수 있으므로, 포함 여부로 찾는 것이 유용합니다.

---

### 12.10.3 휴대폰 번호가 있는 고객 찾기

먼저 전화번호를 숫자만 남긴 형태로 정리합니다.

\`\`\`python
customers["phone_digits"] = (
    customers["phone"]
    .str.replace(r"[^0-9]", "", regex=True)
    .replace("", pd.NA)
)
\`\`\`

휴대폰 번호 형식인 고객만 선택합니다.

\`\`\`python
mobile_customers = customers[
    customers["phone_digits"].str.match(r"^010\\d{8}$", na=False)
]

mobile_customers
\`\`\`

---

### 12.10.4 특정 상품 코드 찾기

상품 코드가 \`BOOK\`으로 시작하는 상품을 찾습니다.

\`\`\`python
book_products = products[
    products["product_code"].str.startswith("BOOK", na=False)
]

book_products
\`\`\`

또는 코드 분리 후 대분류 코드로 필터링할 수 있습니다.

\`\`\`python
products["main_code"] = products["product_code"].str.split("-", expand=True)[0]

products[products["main_code"] == "BOOK"]
\`\`\`

문자열 조건 필터링은 데이터 선택과 필터링에서 배운 불리언 인덱싱과 함께 사용됩니다.

---

## 12.11 문자열 표준화

문자열 표준화는 같은 의미의 값을 같은 형태로 맞추는 작업입니다.

예를 들어 지역명이 다음처럼 섞여 있을 수 있습니다.

\`\`\`text
서울
서울시
서울특별시
부산
부산시
부산광역시
\`\`\`

이 값들을 그대로 두면 지역별 집계가 나뉘어 버립니다.

\`\`\`python
regions = pd.Series(["서울", "서울시", "서울특별시", "부산", "부산시", "부산광역시", "대전광역시"])

regions.value_counts()
\`\`\`

분석을 위해 표준화해보겠습니다.

---

### 12.11.1 값 전체 매핑

값 전체를 기준으로 바꾸려면 딕셔너리를 사용한 \`replace()\`가 좋습니다.

\`\`\`python
region_map = {
    "서울시": "서울",
    "서울특별시": "서울",
    "부산시": "부산",
    "부산광역시": "부산",
    "대전광역시": "대전"
}

regions_clean = regions.replace(region_map)

regions_clean
\`\`\`

이 방식은 명확하고 안전합니다.  
값의 종류가 많지 않고 표준화 규칙이 분명할 때 적합합니다.

---

### 12.11.2 문자열 일부 제거

값 안에 공통 접미사가 붙어 있다면 \`str.replace()\`를 사용할 수 있습니다.

\`\`\`python
regions_clean = (
    regions
    .str.replace("특별시", "", regex=False)
    .str.replace("광역시", "", regex=False)
    .str.replace("시", "", regex=False)
)

regions_clean
\`\`\`

다만 이 방식은 주의해야 합니다.  
모든 \`"시"\`를 제거하면 의도하지 않은 값까지 바뀔 수 있습니다.

예를 들어 \`"시흥시"\`는 \`"흥"\`이 될 수 있습니다.  
따라서 지역명 표준화에서는 전체 매핑 방식이 더 안전한 경우가 많습니다.

---

### 12.11.3 코드값 표준화

코드값은 보통 앞뒤 공백 제거와 대소문자 통일이 기본입니다.

\`\`\`python
codes = pd.Series([" elec ", "ELEC", "Book", " book ", "LIFE"])

codes_clean = codes.str.strip().str.upper()

codes_clean
\`\`\`

이후 표준 코드 목록에 포함되는지 확인할 수 있습니다.

\`\`\`python
valid_codes = ["ELEC", "BOOK", "LIFE"]

codes_clean.isin(valid_codes)
\`\`\`

코드값 표준화는 데이터 품질 점검에서 중요합니다.

---

## 12.12 실무 예제 1: 이메일 도메인 추출

고객 이메일에서 도메인을 추출해보겠습니다.

\`\`\`python
customers["email_clean"] = customers["email"].str.strip().str.lower()

customers[["email_id", "email_domain"]] = customers["email_clean"].str.split("@", expand=True)

customers[["email_clean", "email_id", "email_domain"]]
\`\`\`

도메인별 고객 수를 계산할 수 있습니다.

\`\`\`python
customers["email_domain"].value_counts(dropna=False)
\`\`\`

\`dropna=False\`를 사용하면 결측치도 함께 집계합니다.

특정 도메인만 필터링할 수도 있습니다.

\`\`\`python
example_customers = customers[customers["email_domain"] == "example.com"]

example_customers
\`\`\`

이메일 도메인 분석은 다음과 같은 상황에서 사용할 수 있습니다.

- 회사 이메일 사용자와 개인 이메일 사용자 구분
- 특정 도메인 사용 고객 찾기
- 이메일 형식 오류 확인
- 마케팅 발송 대상 정리

---

## 12.13 실무 예제 2: 전화번호 형식 통일

전화번호는 형식이 다양하게 들어오는 대표적인 문자열 데이터입니다.

\`\`\`python
customers[["customer_id", "phone"]]
\`\`\`

먼저 숫자가 아닌 문자를 제거합니다.

\`\`\`python
customers["phone_digits"] = (
    customers["phone"]
    .str.replace(r"[^0-9]", "", regex=True)
    .replace("", pd.NA)
)

customers[["phone", "phone_digits"]]
\`\`\`

이제 휴대폰 번호인지 확인합니다.

\`\`\`python
customers["is_mobile"] = customers["phone_digits"].str.match(r"^010\\d{8}$", na=False)

customers[["phone_digits", "is_mobile"]]
\`\`\`

11자리 휴대폰 번호를 다시 하이픈 형식으로 바꿀 수도 있습니다.

\`\`\`python
customers["phone_formatted"] = customers["phone_digits"].str.replace(
    r"^(010)(\\d{4})(\\d{4})$",
    r"\\1-\\2-\\3",
    regex=True
)

customers[["phone_digits", "phone_formatted"]]
\`\`\`

여기서 \`\\1\`, \`\\2\`, \`\\3\`은 정규표현식에서 추출한 그룹을 의미합니다.

\`\`\`text
01012345678 → 010-1234-5678
\`\`\`

단, 일반 전화번호나 길이가 다른 번호는 이 패턴에 맞지 않을 수 있습니다.  
따라서 전화번호 형식 통일은 데이터의 종류를 확인하면서 처리해야 합니다.

---

## 12.14 실무 예제 3: 상품 코드에서 정보 추출

상품 코드에는 여러 정보가 포함될 수 있습니다.

\`\`\`python
products["product_code"]
\`\`\`

예를 들어 \`ELEC-KEY-001\`은 다음처럼 해석할 수 있습니다.

\`\`\`text
ELEC: 대분류
KEY: 상품 약어
001: 상품 번호
\`\`\`

\`split()\`으로 분리해보겠습니다.

\`\`\`python
products[["main_code", "item_code", "item_number"]] = products["product_code"].str.split("-", expand=True)

products[["product_code", "main_code", "item_code", "item_number"]]
\`\`\`

대분류 코드에 의미를 부여할 수 있습니다.

\`\`\`python
category_name_map = {
    "ELEC": "전자기기",
    "BOOK": "도서",
    "LIFE": "생활용품"
}

products["main_category_name"] = products["main_code"].replace(category_name_map)

products[["product_code", "main_code", "main_category_name"]]
\`\`\`

이제 상품 대분류별 개수를 확인할 수 있습니다.

\`\`\`python
products["main_category_name"].value_counts()
\`\`\`

상품 코드가 일정한 규칙을 가지고 있다면, 문자열 처리를 통해 분석에 필요한 컬럼을 만들 수 있습니다.

---

## 12.15 실무 예제 4: 가격 문자열을 숫자로 변환

가격 데이터가 문자열로 들어오면 바로 계산할 수 없습니다.

\`\`\`python
products[["product_name", "price_text"]]
\`\`\`

예를 들어 \`"30,000원"\`은 숫자가 아니라 문자열입니다.

\`\`\`python
products["price_text"].dtype
\`\`\`

계산하려면 숫자만 남긴 뒤 정수로 변환해야 합니다.

\`\`\`python
products["price"] = (
    products["price_text"]
    .str.replace(r"[^0-9]", "", regex=True)
    .astype(int)
)

products[["price_text", "price"]]
\`\`\`

이제 평균 가격을 계산할 수 있습니다.

\`\`\`python
products["price"].mean()
\`\`\`

가격대 컬럼도 만들 수 있습니다.

\`\`\`python
products["price_level"] = "저가"
products.loc[products["price"] >= 30000, "price_level"] = "중가"
products.loc[products["price"] >= 50000, "price_level"] = "고가"

products[["product_name", "price", "price_level"]]
\`\`\`

문자열 데이터 처리와 파생 변수 생성은 자주 함께 사용됩니다.

---

## 12.16 실무 미니 프로젝트: 고객 연락처 데이터 정리하기

이번 장에서 배운 내용을 활용해 고객 연락처 데이터를 정리해보겠습니다.

목표는 다음과 같습니다.

\`\`\`text
1. 고객 데이터를 준비한다.
2. 이름의 앞뒤 공백을 제거한다.
3. 이메일을 소문자로 통일한다.
4. 이메일에서 아이디와 도메인을 분리한다.
5. 전화번호에서 숫자만 남긴다.
6. 휴대폰 번호 여부를 검사한다.
7. 주소에서 지역명을 표준화한다.
8. 마케팅 연락 가능 고객을 추출한다.
\`\`\`

---

### 12.16.1 데이터 준비

\`\`\`python
import pandas as pd

customers = pd.DataFrame({
    "customer_id": [1, 2, 3, 4, 5, 6, 7],
    "name": [" 김민수", "이지영 ", " 박철수 ", "최영희", "정수진", None, "오도윤"],
    "email": [
        "MINU@example.com",
        "jiyoung@EXAMPLE.com ",
        "chulsoo@example.com",
        "younghee@test.co.kr",
        "sujin@example.com",
        None,
        "doyoon@test.co.kr"
    ],
    "phone": [
        "010-1234-5678",
        "010 2222 3333",
        "010.4444.5555",
        "01012345678",
        "02-123-4567",
        "",
        "010-7777-8888"
    ],
    "address": [
        "서울특별시 강남구",
        "부산광역시 해운대구",
        "서울시 마포구",
        "대전광역시 서구",
        "경기도 성남시",
        "서울특별시 종로구",
        "부산시 수영구"
    ],
    "agree_marketing": ["Y", "Y", "N", "Y", "Y", "N", "Y"]
})

customers
\`\`\`

---

### 12.16.2 이름 정리

이름의 앞뒤 공백을 제거하고, 결측치는 그대로 둡니다.

\`\`\`python
customers["name_clean"] = customers["name"].str.strip()

customers[["name", "name_clean"]]
\`\`\`

이름이 없는 고객을 확인할 수도 있습니다.

\`\`\`python
customers[customers["name_clean"].isna()]
\`\`\`

---

### 12.16.3 이메일 정리

이메일은 앞뒤 공백을 제거하고 소문자로 통일합니다.

\`\`\`python
customers["email_clean"] = customers["email"].str.strip().str.lower()

customers[["email", "email_clean"]]
\`\`\`

이메일 형식을 간단히 검사합니다.

\`\`\`python
email_pattern = r"^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$"

customers["is_valid_email"] = customers["email_clean"].str.match(email_pattern, na=False)

customers[["email_clean", "is_valid_email"]]
\`\`\`

---

### 12.16.4 이메일 아이디와 도메인 분리

\`\`\`python
customers[["email_id", "email_domain"]] = customers["email_clean"].str.split("@", expand=True)

customers[["email_clean", "email_id", "email_domain"]]
\`\`\`

도메인별 고객 수를 확인합니다.

\`\`\`python
customers["email_domain"].value_counts(dropna=False)
\`\`\`

---

### 12.16.5 전화번호 정리

전화번호에서 숫자만 남깁니다.

\`\`\`python
customers["phone_digits"] = (
    customers["phone"]
    .str.replace(r"[^0-9]", "", regex=True)
    .replace("", pd.NA)
)

customers[["phone", "phone_digits"]]
\`\`\`

휴대폰 번호 여부를 검사합니다.

\`\`\`python
customers["is_mobile"] = customers["phone_digits"].str.match(r"^010\\d{8}$", na=False)

customers[["phone_digits", "is_mobile"]]
\`\`\`

휴대폰 번호를 하이픈 형식으로 변환합니다.

\`\`\`python
customers["phone_formatted"] = customers["phone_digits"].str.replace(
    r"^(010)(\\d{4})(\\d{4})$",
    r"\\1-\\2-\\3",
    regex=True
)

customers[["phone_digits", "phone_formatted"]]
\`\`\`

---

### 12.16.6 지역명 표준화

주소에서 지역을 추출해보겠습니다.

단순한 방식으로 주소가 어떤 지역명을 포함하는지 확인합니다.

\`\`\`python
customers["region"] = "기타"

customers.loc[customers["address"].str.contains("서울", na=False), "region"] = "서울"
customers.loc[customers["address"].str.contains("부산", na=False), "region"] = "부산"
customers.loc[customers["address"].str.contains("대전", na=False), "region"] = "대전"
customers.loc[customers["address"].str.contains("경기", na=False), "region"] = "경기"

customers[["address", "region"]]
\`\`\`

주소 표준화는 실제로는 매우 복잡한 작업입니다.  
기초 과정에서는 특정 키워드 포함 여부로 지역을 간단히 추출하는 수준으로 충분합니다.

---

### 12.16.7 마케팅 연락 가능 고객 추출

마케팅 연락 가능 고객의 기준을 다음처럼 정해보겠습니다.

\`\`\`text
- 마케팅 수신 동의가 Y
- 유효한 이메일이 있음
- 휴대폰 번호가 유효함
\`\`\`

코드로 작성합니다.

\`\`\`python
marketing_targets = customers[
    (customers["agree_marketing"] == "Y") &
    (customers["is_valid_email"]) &
    (customers["is_mobile"])
].copy()

marketing_targets
\`\`\`

보고용 컬럼만 선택합니다.

\`\`\`python
target_columns = [
    "customer_id",
    "name_clean",
    "email_clean",
    "email_domain",
    "phone_formatted",
    "region"
]

marketing_report = marketing_targets[target_columns].reset_index(drop=True)

marketing_report
\`\`\`

---

### 12.16.8 처리 기준 문서화

문자열 데이터 정리 후에는 처리 기준을 남기는 것이 좋습니다.

\`\`\`text
문자열 데이터 처리 기준
- name은 앞뒤 공백을 제거했다.
- email은 앞뒤 공백을 제거하고 소문자로 통일했다.
- email은 @ 기준으로 아이디와 도메인을 분리했다.
- phone은 숫자가 아닌 문자를 제거했다.
- phone_digits가 010으로 시작하는 11자리 숫자인 경우 휴대폰 번호로 판단했다.
- address에 포함된 지역 키워드를 기준으로 region을 생성했다.
- 마케팅 대상자는 수신 동의, 유효 이메일, 유효 휴대폰 번호를 모두 만족하는 고객으로 정의했다.
\`\`\`

문자열 정리는 분석 결과뿐 아니라 실제 업무 처리에도 영향을 줍니다.  
특히 마케팅 발송, 고객 관리, 상품 코드 정리처럼 실무 실행으로 이어지는 경우에는 처리 기준을 더 명확히 남겨야 합니다.

---

## 12.17 문자열 처리 시 자주 하는 실수

문자열 처리는 간단해 보이지만 자주 하는 실수가 있습니다.

---

### 12.17.1 \`.str\`을 빼먹는 실수

pandas Series에 문자열 메서드를 직접 적용하려고 하면 오류가 납니다.

잘못된 예:

\`\`\`python
customers["name"].strip()
\`\`\`

올바른 예:

\`\`\`python
customers["name"].str.strip()
\`\`\`

일반 문자열 하나에는 \`.strip()\`을 사용하지만, pandas 컬럼 전체에는 \`.str.strip()\`을 사용해야 합니다.

---

### 12.17.2 공백을 제거하지 않고 비교하는 실수

다음 두 값은 같아 보이지만 실제로는 다릅니다.

\`\`\`python
"김민수" == " 김민수"
\`\`\`

결과는 \`False\`입니다.

이름, 이메일, 코드값을 비교하기 전에는 앞뒤 공백을 제거하는 것이 좋습니다.

\`\`\`python
df["name"] = df["name"].str.strip()
\`\`\`

---

### 12.17.3 대소문자를 통일하지 않는 실수

이메일이나 코드값에서 대소문자를 통일하지 않으면 중복 확인이나 그룹화 결과가 나뉠 수 있습니다.

\`\`\`python
emails = pd.Series(["USER@example.com", "user@example.com"])

emails.value_counts()
\`\`\`

같은 이메일처럼 보이지만 서로 다른 값으로 집계될 수 있습니다.

\`\`\`python
emails.str.lower().value_counts()
\`\`\`

---

### 12.17.4 \`str.contains()\`에서 결측치를 처리하지 않는 실수

결측치가 있는 컬럼에서 \`contains()\`를 사용할 때는 \`na=False\`를 지정하는 것이 안전합니다.

\`\`\`python
df[df["email"].str.contains("example.com", na=False)]
\`\`\`

\`na=False\`를 넣지 않으면 결측치 때문에 필터링 과정에서 문제가 생길 수 있습니다.

---

### 12.17.5 \`str.replace()\`의 정규표현식 여부를 혼동하는 실수

단순 문자열을 바꾸는 경우에는 \`regex=False\`를 명시하는 것이 좋습니다.

\`\`\`python
df["phone"].str.replace("-", "", regex=False)
\`\`\`

정규표현식을 사용할 때는 \`regex=True\`를 사용합니다.

\`\`\`python
df["phone"].str.replace(r"[^0-9]", "", regex=True)
\`\`\`

정규표현식을 쓰는지 아닌지를 명확히 해야 의도하지 않은 치환을 줄일 수 있습니다.

---

### 12.17.6 숫자처럼 보이는 문자열을 숫자로 변환하지 않는 실수

\`"30,000원"\`은 숫자처럼 보이지만 문자열입니다.  
이 상태로는 평균이나 합계를 제대로 계산할 수 없습니다.

\`\`\`python
products["price"] = (
    products["price_text"]
    .str.replace(r"[^0-9]", "", regex=True)
    .astype(int)
)
\`\`\`

분석 전에 문자열 숫자를 실제 숫자형으로 변환해야 합니다.

---

### 12.17.7 원본 컬럼을 바로 덮어쓰는 실수

문자열 정리 과정에서 처음부터 원본 컬럼을 덮어쓰면 문제가 생겼을 때 되돌리기 어렵습니다.

초보 단계에서는 새 컬럼을 만들어 비교하는 방식이 좋습니다.

\`\`\`python
df["email_clean"] = df["email"].str.strip().str.lower()
\`\`\`

처리 결과를 확인한 뒤 필요하면 원본 컬럼을 대체해도 됩니다.

---

## 12.18 핵심 정리

이번 장에서는 pandas에서 문자열 데이터를 처리하는 방법을 배웠습니다.

pandas Series의 문자열 값을 다룰 때는 \`.str\` 접근자를 사용합니다.

\`\`\`python
df["name"].str.strip()
df["email"].str.lower()
df["phone"].str.replace("-", "", regex=False)
\`\`\`

공백 제거에는 \`strip()\`, \`lstrip()\`, \`rstrip()\`을 사용할 수 있습니다.

\`\`\`python
df["name"] = df["name"].str.strip()
\`\`\`

대소문자 통일에는 \`lower()\`와 \`upper()\`를 사용할 수 있습니다.

\`\`\`python
df["email"] = df["email"].str.lower()
df["code"] = df["code"].str.upper()
\`\`\`

특정 문자열 포함 여부는 \`contains()\`로 확인합니다.  
결측치가 있을 수 있으면 \`na=False\`를 함께 사용하는 것이 좋습니다.

\`\`\`python
df["email"].str.contains("example.com", na=False)
\`\`\`

문자열 일부를 바꿀 때는 \`str.replace()\`를 사용합니다.

\`\`\`python
df["phone"].str.replace("-", "", regex=False)
df["phone"].str.replace(r"[^0-9]", "", regex=True)
\`\`\`

문자열을 구분자로 나눌 때는 \`split()\`을 사용합니다.

\`\`\`python
df[["email_id", "email_domain"]] = df["email"].str.split("@", expand=True)
\`\`\`

문자열에서 특정 패턴을 추출할 때는 \`extract()\`를 사용할 수 있습니다.

\`\`\`python
df["number"] = df["code"].str.extract(r"(\\d+)$")
\`\`\`

문자열 데이터 처리는 결측치 처리, 중복값 처리, 파생 변수 생성과 자주 연결됩니다.  
특히 이메일, 전화번호, 상품 코드, 주소, 금액 문자열처럼 실무에서 자주 등장하는 데이터는 분석 전에 반드시 표준화하는 습관이 필요합니다.

---

## 12.19 연습문제

### 문제 1. 개념 확인

pandas Series의 문자열 값 전체에 문자열 메서드를 적용할 때 사용하는 접근자는 무엇인가요?

A. \`.text\`  
B. \`.string\`  
C. \`.str\`  
D. \`.char\`

---

### 문제 2. 코드 작성

다음 DataFrame에서 \`name\` 컬럼의 앞뒤 공백을 제거한 \`name_clean\` 컬럼을 만드세요.

\`\`\`python
df = pd.DataFrame({
    "name": [" 김민수", "이지영 ", " 박철수 "]
})
\`\`\`

---

### 문제 3. 코드 작성

다음 이메일 데이터를 소문자로 통일하고 앞뒤 공백을 제거하세요.

\`\`\`python
df = pd.DataFrame({
    "email": ["USER@example.com ", "ADMIN@TEST.COM", " guest@example.com"]
})
\`\`\`

---

### 문제 4. 코드 작성

다음 전화번호에서 하이픈을 제거하세요.  
단순 문자열 치환으로 처리하세요.

\`\`\`python
df = pd.DataFrame({
    "phone": ["010-1234-5678", "010-2222-3333"]
})
\`\`\`

---

### 문제 5. 코드 작성

다음 전화번호에서 숫자가 아닌 문자를 모두 제거하세요.

\`\`\`python
df = pd.DataFrame({
    "phone": ["010-1234-5678", "010 2222 3333", "010.4444.5555"]
})
\`\`\`

---

### 문제 6. 코드 작성

다음 이메일에서 아이디와 도메인을 분리하여 \`email_id\`, \`email_domain\` 컬럼을 만드세요.

\`\`\`python
df = pd.DataFrame({
    "email": ["minsu@example.com", "jiyoung@test.co.kr"]
})
\`\`\`

---

### 문제 7. 코드 작성

다음 상품 코드에서 앞의 대분류 코드만 추출하세요.

\`\`\`python
df = pd.DataFrame({
    "product_code": ["ELEC-KEY-001", "BOOK-PYT-101", "LIFE-CUP-201"]
})
\`\`\`

결과는 \`ELEC\`, \`BOOK\`, \`LIFE\`가 되어야 합니다.

---

### 문제 8. 코드 작성

다음 가격 문자열에서 숫자만 남기고 정수형으로 변환하세요.

\`\`\`python
df = pd.DataFrame({
    "price_text": ["30,000원", "45,000원", "12,000원"]
})
\`\`\`

---

### 문제 9. 개념 확인

\`str.contains("서울", na=False)\`에서 \`na=False\`의 의미를 설명하세요.

---

### 문제 10. 실무형 문제

다음 고객 데이터에서 연락처 데이터를 정리하세요.

처리 기준은 다음과 같습니다.

\`\`\`text
- name은 앞뒤 공백을 제거한다.
- email은 앞뒤 공백을 제거하고 소문자로 변환한다.
- email에서 도메인을 추출한다.
- phone은 숫자가 아닌 문자를 제거한다.
- phone이 010으로 시작하는 11자리 숫자인지 확인하는 is_mobile 컬럼을 만든다.
\`\`\`

\`\`\`python
customers = pd.DataFrame({
    "name": [" 김민수", "이지영 ", "박철수"],
    "email": ["MINU@example.com ", "JIYOUNG@test.com", "chulsoo@example.com"],
    "phone": ["010-1234-5678", "010 2222 3333", "02-123-4567"]
})
\`\`\`

---

## 12.20 정답 및 해설

### 문제 1 정답

정답: C

pandas Series의 문자열 값 전체에 문자열 메서드를 적용할 때는 \`.str\` 접근자를 사용합니다.

\`\`\`python
df["name"].str.strip()
\`\`\`

---

### 문제 2 정답

\`\`\`python
df["name_clean"] = df["name"].str.strip()
\`\`\`

\`strip()\`은 문자열 앞뒤의 공백을 제거합니다.

---

### 문제 3 정답

\`\`\`python
df["email_clean"] = df["email"].str.strip().str.lower()
\`\`\`

먼저 \`strip()\`으로 앞뒤 공백을 제거하고, \`lower()\`로 소문자로 변환합니다.

---

### 문제 4 정답

\`\`\`python
df["phone_clean"] = df["phone"].str.replace("-", "", regex=False)
\`\`\`

하이픈을 일반 문자열로 치환하므로 \`regex=False\`를 지정합니다.

---

### 문제 5 정답

\`\`\`python
df["phone_digits"] = df["phone"].str.replace(r"[^0-9]", "", regex=True)
\`\`\`

\`[^0-9]\`는 숫자가 아닌 문자를 의미합니다.  
이 문자를 빈 문자열로 바꾸면 숫자만 남습니다.

---

### 문제 6 정답

\`\`\`python
df[["email_id", "email_domain"]] = df["email"].str.split("@", expand=True)
\`\`\`

\`expand=True\`를 사용하면 분리된 결과가 여러 컬럼으로 반환됩니다.

---

### 문제 7 정답

방법 1: \`split()\` 사용

\`\`\`python
df["main_code"] = df["product_code"].str.split("-", expand=True)[0]
\`\`\`

방법 2: 슬라이싱 사용

\`\`\`python
df["main_code"] = df["product_code"].str[:4]
\`\`\`

상품 코드의 앞 4글자가 항상 대분류 코드라면 슬라이싱도 가능합니다.  
하이픈 기준 구조를 더 명확히 사용하려면 \`split()\`이 좋습니다.

---

### 문제 8 정답

\`\`\`python
df["price"] = (
    df["price_text"]
    .str.replace(r"[^0-9]", "", regex=True)
    .astype(int)
)
\`\`\`

숫자가 아닌 문자를 제거한 뒤 정수형으로 변환합니다.

---

### 문제 9 정답

\`na=False\`는 결측치에 대해 \`False\`로 처리하겠다는 의미입니다.

문자열 컬럼에 결측치가 있을 때 \`str.contains()\` 결과에도 결측치가 생길 수 있습니다.  
이 결과를 필터링에 사용하면 문제가 생길 수 있으므로, 결측치는 조건을 만족하지 않는 것으로 보고 \`False\` 처리하는 것이 안전합니다.

---

### 문제 10 정답

\`\`\`python
customers["name_clean"] = customers["name"].str.strip()

customers["email_clean"] = customers["email"].str.strip().str.lower()

customers[["email_id", "email_domain"]] = customers["email_clean"].str.split("@", expand=True)

customers["phone_digits"] = customers["phone"].str.replace(r"[^0-9]", "", regex=True)

customers["is_mobile"] = customers["phone_digits"].str.match(r"^010\\d{8}$", na=False)

customers
\`\`\`

처리 과정은 다음과 같습니다.

1. 이름의 앞뒤 공백을 제거합니다.
2. 이메일의 앞뒤 공백을 제거하고 소문자로 변환합니다.
3. 이메일을 \`@\` 기준으로 나누어 아이디와 도메인을 만듭니다.
4. 전화번호에서 숫자가 아닌 문자를 제거합니다.
5. \`010\`으로 시작하는 11자리 숫자인지 검사합니다.

---

## 12.21 다음 장 예고

이번 장에서는 pandas의 \`.str\` 접근자를 사용해 문자열 데이터를 정리하는 방법을 배웠습니다.

다음 장에서는 **날짜와 시간 데이터 처리**를 배웁니다.

날짜 데이터는 분석에서 매우 중요합니다.  
매출을 월별로 집계하거나, 고객 가입 후 구매까지 걸린 기간을 계산하거나, 최근 30일 데이터를 필터링하려면 날짜 데이터를 제대로 다룰 수 있어야 합니다.

다음 장에서는 다음 내용을 배웁니다.

- 문자열 날짜를 날짜형으로 변환하기
- 연도, 월, 일, 요일 추출하기
- 특정 기간 데이터 필터링하기
- 두 날짜의 차이 계산하기
- 월별, 요일별 집계하기
- 날짜 데이터 처리 시 자주 하는 실수

문자열 데이터 처리가 텍스트를 정리하는 과정이라면, 날짜 데이터 처리는 시간의 흐름을 분석 가능한 형태로 바꾸는 과정입니다.

---

## 참고 문서

- pandas 공식 문서: Working with text data
- pandas 공식 문서: How to manipulate textual data
- pandas 공식 문서: \`Series.str.contains\`
- pandas 공식 문서: \`Series.str.replace\`
- pandas 공식 문서: \`Series.str.split\`
- pandas 공식 문서: \`Series.str.extract\`
- Python 공식 문서: \`re\` 정규표현식
`;export{e as default};