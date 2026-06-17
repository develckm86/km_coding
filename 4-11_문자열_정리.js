var e=`# 4장. 분석용 데이터마트 만들기

## 4.11 문자열 정리

문자열 데이터는 공백과 표기 불일치 문제가 자주 발생합니다.

---

### 4.11.1 고객명 공백 제거

\`\`\`python
customers["customer_name"] = customers["customer_name"].str.strip()
\`\`\`

확인합니다.

\`\`\`python
customers[["customer_id", "customer_name"]]
\`\`\`

---

### 4.11.2 지역명 표준화

지역명이 다음처럼 섞여 있습니다.

\`\`\`text
서울특별시
서울시
서울
부산광역시
부산시
대전광역시
\`\`\`

이를 서울, 부산, 대전으로 통일합니다.

\`\`\`python
region_map = {
    "서울특별시": "서울",
    "서울시": "서울",
    "서울": "서울",
    "부산광역시": "부산",
    "부산시": "부산",
    "부산": "부산",
    "대전광역시": "대전",
    "대전": "대전"
}

customers["region_clean"] = customers["region"].replace(region_map)
\`\`\`

확인합니다.

\`\`\`python
customers[["region", "region_clean"]].drop_duplicates()
\`\`\`

지역별 고객 수를 확인합니다.

\`\`\`python
customers["region_clean"].value_counts()
\`\`\`

---
`;export{e as default};