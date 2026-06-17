var e=`# 10장. 고객별 Feature Table 만들기

## 10.6 Feature 정의서 만들기

Feature Table을 만들기 전에 변수 정의서를 작성합니다.

변수 정의서는 각 변수가 무엇을 의미하고 어떻게 계산되는지 설명하는 문서입니다.

---

### 10.6.1 Feature 정의서 구성

Feature 정의서에는 다음 컬럼을 포함합니다.

\`\`\`text
feature_name
description
formula
source_columns
aggregation_unit
data_type
caution
\`\`\`

각 컬럼의 의미는 다음과 같습니다.

| 컬럼 | 의미 |
|---|---|
| \`feature_name\` | 변수명 |
| \`description\` | 변수 설명 |
| \`formula\` | 계산식 |
| \`source_columns\` | 원본 컬럼 |
| \`aggregation_unit\` | 집계 단위 |
| \`data_type\` | 자료형 |
| \`caution\` | 주의사항 |

---

### 10.6.2 Feature 정의서 생성

\`\`\`python
feature_definition = pd.DataFrame([
    {
        "feature_name": "total_purchase",
        "description": "고객별 총구매액",
        "formula": "sum(net_amount)",
        "source_columns": "net_amount",
        "aggregation_unit": "customer_id",
        "data_type": "numeric",
        "caution": "매출 분석 가능 주문만 포함"
    },
    {
        "feature_name": "order_count",
        "description": "고객별 주문 횟수",
        "formula": "count(order_id)",
        "source_columns": "order_id",
        "aggregation_unit": "customer_id",
        "data_type": "integer",
        "caution": "order_id 중복 제거 후 계산"
    },
    {
        "feature_name": "avg_order_amount",
        "description": "고객별 평균 주문 금액",
        "formula": "mean(net_amount)",
        "source_columns": "net_amount",
        "aggregation_unit": "customer_id",
        "data_type": "numeric",
        "caution": "고가 주문이 평균을 끌어올릴 수 있음"
    },
    {
        "feature_name": "first_order_date",
        "description": "고객의 첫 구매일",
        "formula": "min(order_date)",
        "source_columns": "order_date",
        "aggregation_unit": "customer_id",
        "data_type": "date",
        "caution": "날짜 오류 주문은 제외"
    },
    {
        "feature_name": "last_order_date",
        "description": "고객의 마지막 구매일",
        "formula": "max(order_date)",
        "source_columns": "order_date",
        "aggregation_unit": "customer_id",
        "data_type": "date",
        "caution": "Recency 계산 기준"
    },
    {
        "feature_name": "days_since_last_order",
        "description": "기준일 기준 마지막 구매 후 경과일",
        "formula": "base_date - last_order_date",
        "source_columns": "last_order_date",
        "aggregation_unit": "customer_id",
        "data_type": "integer",
        "caution": "기준일이 바뀌면 값도 바뀜"
    },
    {
        "feature_name": "signup_to_first_order_days",
        "description": "가입 후 첫 구매까지 걸린 일수",
        "formula": "first_order_date - signup_date",
        "source_columns": "signup_date, first_order_date",
        "aggregation_unit": "customer_id",
        "data_type": "integer",
        "caution": "가입일 결측 또는 오류가 있으면 계산 불가"
    },
    {
        "feature_name": "category_count",
        "description": "고객이 구매한 고유 카테고리 수",
        "formula": "nunique(category)",
        "source_columns": "category",
        "aggregation_unit": "customer_id",
        "data_type": "integer",
        "caution": "상품 카테고리 결측이 있으면 영향"
    },
    {
        "feature_name": "main_category",
        "description": "고객의 구매액 기준 1위 카테고리",
        "formula": "category with max sum(net_amount)",
        "source_columns": "category, net_amount",
        "aggregation_unit": "customer_id",
        "data_type": "category",
        "caution": "동점일 경우 정렬 기준에 따라 달라질 수 있음"
    },
    {
        "feature_name": "coupon_usage_rate",
        "description": "고객별 쿠폰 사용 주문 비율",
        "formula": "coupon_order_count / order_count",
        "source_columns": "used_coupon, order_id",
        "aggregation_unit": "customer_id",
        "data_type": "numeric",
        "caution": "쿠폰 사용 여부 정의가 필요"
    },
    {
        "feature_name": "is_repeat_customer",
        "description": "재구매 고객 여부",
        "formula": "order_count >= 2",
        "source_columns": "order_count",
        "aggregation_unit": "customer_id",
        "data_type": "boolean",
        "caution": "분석 기간이 짧으면 낮게 계산될 수 있음"
    },
    {
        "feature_name": "value_segment",
        "description": "총구매액 기준 고객 가치 세그먼트",
        "formula": "quantile-based segment",
        "source_columns": "total_purchase",
        "aggregation_unit": "customer_id",
        "data_type": "category",
        "caution": "기준은 분석 목적에 따라 조정 가능"
    }
])

feature_definition
\`\`\`

저장합니다.

\`\`\`python
feature_definition.to_csv(
    OUTPUT_TABLES / "chapter_10_customer_feature_definition.csv",
    index=False
)
\`\`\`

---
`;export{e as default};