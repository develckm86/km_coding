var e=`# 13장. 회귀분석 실습

## 13.5 실습 데이터 준비

이번 장에서는 10장에서 만든 고객별 Feature Table을 사용합니다.

파일이 없으면 수업용 샘플 데이터를 생성합니다.

---

### 13.5.1 고객 Feature Table 불러오기

\`\`\`python
feature_path = DATA_PROCESSED / "chapter_10_customer_feature_table.csv"

if feature_path.exists():
    customer_features = pd.read_csv(feature_path)
else:
    rng = np.random.default_rng(42)

    n = 80

    customer_features = pd.DataFrame({
        "customer_id": range(1, n + 1),
        "customer_grade": rng.choice(["일반", "VIP"], size=n, p=[0.65, 0.35]),
        "region": rng.choice(["서울", "부산", "대전"], size=n, p=[0.5, 0.3, 0.2]),
        "visit_count": rng.poisson(8, size=n) + 1,
        "order_count": rng.poisson(3, size=n) + 1,
        "coupon_usage_rate": rng.uniform(0, 80, size=n).round(1),
        "days_since_last_order": rng.integers(1, 90, size=n),
        "category_count": rng.integers(1, 5, size=n),
        "main_category": rng.choice(["전자기기", "도서", "생활용품"], size=n, p=[0.4, 0.35, 0.25])
    })

    grade_effect = np.where(customer_features["customer_grade"] == "VIP", 180000, 0)
    category_effect = np.where(customer_features["main_category"] == "전자기기", 90000, 0)

    noise = rng.normal(0, 60000, size=n)

    customer_features["total_purchase"] = (
        50000
        + customer_features["visit_count"] * 12000
        + customer_features["order_count"] * 55000
        - customer_features["days_since_last_order"] * 1200
        + customer_features["category_count"] * 25000
        + grade_effect
        + category_effect
        + noise
    )

    customer_features["total_purchase"] = customer_features["total_purchase"].clip(lower=10000).round(0)

    customer_features["avg_order_amount"] = (
        customer_features["total_purchase"] / customer_features["order_count"]
    ).round(0)

customer_features.head()
\`\`\`

---

### 13.5.2 회귀분석용 컬럼 확인

이번 장에서 사용할 주요 컬럼은 다음과 같습니다.

\`\`\`text
total_purchase
visit_count
order_count
coupon_usage_rate
days_since_last_order
category_count
customer_grade
main_category
region
\`\`\`

데이터에 일부 컬럼이 없을 수 있으므로 필요한 컬럼을 보완합니다.

\`\`\`python
rng = np.random.default_rng(42)

if "visit_count" not in customer_features.columns:
    customer_features["visit_count"] = rng.poisson(8, size=len(customer_features)) + 1

if "coupon_usage_rate" not in customer_features.columns:
    customer_features["coupon_usage_rate"] = rng.uniform(0, 80, size=len(customer_features)).round(1)

if "days_since_last_order" not in customer_features.columns:
    customer_features["days_since_last_order"] = rng.integers(1, 90, size=len(customer_features))

if "category_count" not in customer_features.columns:
    customer_features["category_count"] = rng.integers(1, 5, size=len(customer_features))

if "main_category" not in customer_features.columns:
    customer_features["main_category"] = rng.choice(["전자기기", "도서", "생활용품"], size=len(customer_features))

if "region" not in customer_features.columns:
    customer_features["region"] = rng.choice(["서울", "부산", "대전"], size=len(customer_features))

if "customer_grade" not in customer_features.columns:
    if "grade" in customer_features.columns:
        customer_features["customer_grade"] = customer_features["grade"]
    else:
        customer_features["customer_grade"] = rng.choice(["일반", "VIP"], size=len(customer_features))
\`\`\`

---

### 13.5.3 회귀분석용 데이터셋 만들기

회귀분석에 필요한 컬럼만 선택합니다.

\`\`\`python
regression_columns = [
    "customer_id",
    "total_purchase",
    "avg_order_amount",
    "visit_count",
    "order_count",
    "coupon_usage_rate",
    "days_since_last_order",
    "category_count",
    "customer_grade",
    "main_category",
    "region"
]

regression_columns_existing = [
    col for col in regression_columns
    if col in customer_features.columns
]

regression_df = customer_features[regression_columns_existing].copy()

regression_df.head()
\`\`\`

---

### 13.5.4 결측치 처리

회귀분석에 사용할 주요 변수에 결측치가 있으면 제거합니다.

\`\`\`python
required_columns = [
    "total_purchase",
    "visit_count",
    "order_count",
    "coupon_usage_rate",
    "days_since_last_order",
    "category_count",
    "customer_grade",
    "main_category"
]

required_columns_existing = [
    col for col in required_columns
    if col in regression_df.columns
]

regression_df = regression_df.dropna(subset=required_columns_existing).copy()
\`\`\`

---

### 13.5.5 자료형 확인

\`\`\`python
regression_df.info()
\`\`\`

수치형 컬럼은 숫자형이어야 합니다.

\`\`\`python
numeric_cols = [
    "total_purchase",
    "avg_order_amount",
    "visit_count",
    "order_count",
    "coupon_usage_rate",
    "days_since_last_order",
    "category_count"
]

for col in numeric_cols:
    if col in regression_df.columns:
        regression_df[col] = pd.to_numeric(regression_df[col], errors="coerce")
\`\`\`

다시 결측치를 제거합니다.

\`\`\`python
regression_df = regression_df.dropna(subset=[
    col for col in numeric_cols
    if col in regression_df.columns
]).copy()
\`\`\`

---

### 13.5.6 저장하기

\`\`\`python
regression_df.to_csv(
    DATA_PROCESSED / "chapter_13_regression_feature_dataset.csv",
    index=False
)
\`\`\`

---
`;export{e as default};