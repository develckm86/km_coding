var e=`# 11장. 통계적 비교 실습

## 11.5 실습 데이터 준비

이번 장에서는 10장에서 만든 고객별 Feature Table을 사용합니다.

파일이 없으면 수업용 샘플 고객 Feature Table을 생성합니다.

---

### 11.5.1 고객 Feature Table 불러오기

\`\`\`python
feature_path = DATA_PROCESSED / "chapter_10_customer_feature_table.csv"

if feature_path.exists():
    customer_features = pd.read_csv(feature_path)
else:
    customer_features = pd.DataFrame({
        "customer_id": range(1, 21),
        "customer_name": [
            "김민수", "이지영", "박철수", "최영희", "정수진",
            "강현우", "오도윤", "한서연", "윤하준", "문유나",
            "임서준", "권하은", "장도현", "백지우", "송민재",
            "홍서아", "유지호", "안시우", "전하린", "오지민"
        ],
        "region": [
            "서울", "부산", "서울", "대전", "부산",
            "서울", "대전", "서울", "대전", "서울",
            "부산", "서울", "대전", "부산", "서울",
            "서울", "부산", "대전", "서울", "부산"
        ],
        "customer_grade": [
            "VIP", "일반", "일반", "일반", "VIP",
            "일반", "일반", "VIP", "일반", "VIP",
            "일반", "일반", "VIP", "일반", "VIP",
            "일반", "일반", "VIP", "일반", "VIP"
        ],
        "total_purchase": [
            890000, 210000, 130000, 70000, 520000,
            95000, 110000, 760000, 60000, 690000,
            85000, 140000, 610000, 90000, 550000,
            120000, 100000, 480000, 160000, 530000
        ],
        "order_count": [
            4, 3, 2, 1, 4,
            2, 2, 5, 1, 4,
            1, 2, 4, 1, 3,
            2, 1, 3, 2, 4
        ],
        "avg_order_amount": [
            222500, 70000, 65000, 70000, 130000,
            47500, 55000, 152000, 60000, 172500,
            85000, 70000, 152500, 90000, 183333,
            60000, 100000, 160000, 80000, 132500
        ],
        "median_order_amount": [
            220000, 65000, 65000, 70000, 125000,
            47500, 55000, 150000, 60000, 170000,
            85000, 70000, 150000, 90000, 180000,
            60000, 100000, 160000, 80000, 130000
        ],
        "days_since_last_order": [
            5, 20, 35, 60, 8,
            45, 40, 3, 70, 4,
            55, 33, 9, 65, 7,
            38, 58, 11, 30, 6
        ],
        "category_count": [
            3, 2, 2, 1, 3,
            2, 1, 3, 1, 3,
            1, 2, 3, 1, 2,
            2, 1, 3, 2, 3
        ],
        "main_category": [
            "전자기기", "도서", "생활용품", "도서", "전자기기",
            "생활용품", "도서", "전자기기", "생활용품", "전자기기",
            "도서", "생활용품", "전자기기", "도서", "전자기기",
            "생활용품", "도서", "전자기기", "생활용품", "전자기기"
        ],
        "coupon_usage_rate": [
            25, 0, 50, 0, 25,
            50, 0, 40, 0, 25,
            0, 50, 25, 0, 33.3,
            50, 0, 33.3, 50, 25
        ],
        "is_coupon_user": [
            True, False, True, False, True,
            True, False, True, False, True,
            False, True, True, False, True,
            True, False, True, True, True
        ],
        "is_repeat_customer": [
            True, True, True, False, True,
            True, True, True, False, True,
            False, True, True, False, True,
            True, False, True, True, True
        ],
        "value_segment": [
            "High Value", "Middle Value", "Middle Value", "Low Value", "High Value",
            "Low Value", "Middle Value", "High Value", "Low Value", "High Value",
            "Low Value", "Middle Value", "High Value", "Low Value", "High Value",
            "Middle Value", "Low Value", "High Value", "Middle Value", "High Value"
        ]
    })

customer_features.head()
\`\`\`

---

### 11.5.2 데이터 구조 확인

\`\`\`python
customer_features.shape
\`\`\`

\`\`\`python
customer_features.info()
\`\`\`

\`\`\`python
customer_features.head()
\`\`\`

이번 장에서 주로 사용할 컬럼은 다음과 같습니다.

\`\`\`text
customer_grade
total_purchase
order_count
avg_order_amount
days_since_last_order
main_category
coupon_usage_rate
is_coupon_user
is_repeat_customer
value_segment
\`\`\`

---

### 11.5.3 자료형 정리

CSV에서 불러오면 boolean 컬럼이 문자열로 들어올 수 있습니다.

\`\`\`python
for col in ["is_coupon_user", "is_repeat_customer"]:
    if col in customer_features.columns:
        if customer_features[col].dtype == "object":
            customer_features[col] = customer_features[col].map({
                "True": True,
                "False": False,
                True: True,
                False: False
            })
\`\`\`

---
`;export{e as default};