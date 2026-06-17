var e=`<!-- 원본: python_data_analysis_basic_chapter_20_book.md / 세부 장: 20-11 -->

# 20.11 6단계: 기본 분석 지표 확인

이제 분석용 데이터로 기본 지표를 계산합니다.

---

### 20.11.1 전체 요약 지표

\`\`\`python
summary = {
    "분석 대상 주문 수": len(orders_analysis),
    "고유 고객 수": orders_analysis["customer_id"].nunique(),
    "총매출": orders_analysis["net_amount"].sum(),
    "평균 주문 금액": orders_analysis["net_amount"].mean(),
    "중앙 주문 금액": orders_analysis["net_amount"].median(),
    "최대 주문 금액": orders_analysis["net_amount"].max()
}

summary
\`\`\`

이 지표는 보고서의 데이터 개요나 주요 결과에 사용할 수 있습니다.

---

### 20.11.2 주문 금액 기술통계

\`\`\`python
orders_analysis["net_amount"].describe()
\`\`\`

평균과 중앙값을 비교합니다.

\`\`\`python
orders_analysis["net_amount"].mean()
orders_analysis["net_amount"].median()
\`\`\`

평균이 중앙값보다 크다면 고가 주문이 평균을 끌어올릴 수 있습니다.

---

### 20.11.3 범주형 분포 확인

카테고리 분포를 확인합니다.

\`\`\`python
orders_analysis["category"].value_counts()
\`\`\`

고객 등급 분포를 확인합니다.

\`\`\`python
orders_analysis["grade"].value_counts()
\`\`\`

지역 분포를 확인합니다.

\`\`\`python
orders_analysis["region_clean"].value_counts()
\`\`\`

---
`;export{e as default};