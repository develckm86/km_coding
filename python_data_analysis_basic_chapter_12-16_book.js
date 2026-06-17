var e=`<!-- 원본: python_data_analysis_basic_chapter_12_book.md / 세부 장: 12-16 -->

# 12.16 실무 미니 프로젝트: 고객 연락처 데이터 정리하기

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
`;export{e as default};