var e=`# 14장. RFM 고객 분석 실습

## 14.11 세그먼트별 전략 제안

RFM 분석은 고객을 나누는 것에서 끝나지 않습니다.  
각 세그먼트에 맞는 실행 전략을 제안해야 합니다.

---

### 14.11.1 세그먼트별 전략표 만들기

\`\`\`python
rfm_segment_strategy = pd.DataFrame([
    {
        "rfm_segment": "Champions",
        "description": "최근에도 자주 구매하고 구매 금액도 높은 핵심 고객",
        "strategy": "VIP 혜택, 신상품 우선 안내, 멤버십 강화",
        "message_example": "항상 이용해주셔서 감사합니다. VIP 전용 혜택을 준비했습니다."
    },
    {
        "rfm_segment": "Loyal Customers",
        "description": "구매 빈도가 높은 충성 고객",
        "strategy": "정기 구매 유도, 추천 상품 제안, 등급 상향 혜택",
        "message_example": "자주 구매하신 상품과 어울리는 추천 상품을 확인해보세요."
    },
    {
        "rfm_segment": "Big Spenders",
        "description": "구매 금액은 높지만 구매 빈도는 상대적으로 낮은 고객",
        "strategy": "고가 상품 추천, 프리미엄 패키지 제안, 재방문 유도",
        "message_example": "고객님을 위한 프리미엄 상품을 추천드립니다."
    },
    {
        "rfm_segment": "Potential Loyalists",
        "description": "최근 구매했고 반복 구매 가능성이 있는 고객",
        "strategy": "두 번째 구매 유도 쿠폰, 관심 카테고리 추천",
        "message_example": "최근 구매하신 상품과 잘 어울리는 상품을 준비했습니다."
    },
    {
        "rfm_segment": "New Customers",
        "description": "최근 첫 구매 고객",
        "strategy": "온보딩 메시지, 재구매 쿠폰, 베스트셀러 안내",
        "message_example": "첫 구매 감사합니다. 다음 구매에 사용할 수 있는 혜택을 드립니다."
    },
    {
        "rfm_segment": "Need Attention",
        "description": "중간 수준의 최근성과 구매 빈도를 가진 고객",
        "strategy": "관심 카테고리 기반 추천, 제한 기간 쿠폰",
        "message_example": "고객님이 관심 가질 만한 상품을 추천드립니다."
    },
    {
        "rfm_segment": "At Risk",
        "description": "과거에는 자주 구매했지만 최근 구매가 없는 고객",
        "strategy": "복귀 쿠폰, 이탈 방지 캠페인, 선호 상품 리마인드",
        "message_example": "오랜만에 찾아주시면 특별 혜택을 드립니다."
    },
    {
        "rfm_segment": "Hibernating",
        "description": "오래 구매하지 않았고 구매 빈도도 낮은 고객",
        "strategy": "저비용 재활성화 캠페인, 대량 메시지보다 효율 검토",
        "message_example": "다시 만나고 싶은 고객님께 특별한 혜택을 준비했습니다."
    },
    {
        "rfm_segment": "Others",
        "description": "명확한 패턴이 약한 고객",
        "strategy": "추가 데이터 확인 후 세분화",
        "message_example": "고객님께 맞는 추천 상품을 확인해보세요."
    }
])

rfm_segment_strategy
\`\`\`

---

### 14.11.2 저장하기

\`\`\`python
rfm_segment_strategy.to_csv(
    OUTPUT_TABLES / "chapter_14_rfm_segment_strategy.csv",
    index=False
)
\`\`\`

---

### 14.11.3 전략 해석 예시

\`\`\`text
RFM 세그먼트별 전략은 고객의 최근성, 빈도, 구매 금액에 따라 달라져야 한다.
최근성이 높은 고객에게는 재구매를 유도하고, 이탈 위험 고객에게는 복귀 캠페인을 제안할 수 있다.
구매 금액이 높은 고객은 프리미엄 혜택이나 VIP 프로그램과 연결할 수 있다.
\`\`\`

---
`;export{e as default};