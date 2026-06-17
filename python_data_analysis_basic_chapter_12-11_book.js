var e=`<!-- 원본: python_data_analysis_basic_chapter_12_book.md / 세부 장: 12-11 -->

# 12.11 문자열 표준화

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
`;export{e as default};