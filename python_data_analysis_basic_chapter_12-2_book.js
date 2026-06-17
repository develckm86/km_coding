var e=`<!-- 원본: python_data_analysis_basic_chapter_12_book.md / 세부 장: 12-2 -->

# 12.2 예제 데이터 준비

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
`;export{e as default};