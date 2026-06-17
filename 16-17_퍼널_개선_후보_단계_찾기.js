var e=`# 16장. 퍼널 분석 실습

## 16.17 퍼널 개선 후보 단계 찾기

퍼널 분석의 목적은 개선 후보를 찾는 것입니다.

---

### 16.17.1 가장 이탈률이 높은 단계

\`\`\`python
highest_dropoff_step = (
    funnel_dropoff_report
    .sort_values("dropoff_rate", ascending=False)
    .head(1)
)

highest_dropoff_step
\`\`\`

---

### 16.17.2 개선 후보 단계 목록 만들기

이탈률이 40% 이상인 단계를 개선 후보로 설정해봅니다.

\`\`\`python
funnel_issue_candidates = funnel_dropoff_report[
    funnel_dropoff_report["dropoff_rate"] >= 40
].copy()

funnel_issue_candidates["issue_reason"] = "이탈률 40% 이상"
funnel_issue_candidates["recommended_check"] = ""

funnel_issue_candidates.loc[
    funnel_issue_candidates["event_name"] == "product_view",
    "recommended_check"
] = "랜딩 페이지와 상품 목록 탐색 동선 점검"

funnel_issue_candidates.loc[
    funnel_issue_candidates["event_name"] == "add_to_cart",
    "recommended_check"
] = "상품 상세 페이지, 가격, 배송비, 리뷰 정보 점검"

funnel_issue_candidates.loc[
    funnel_issue_candidates["event_name"] == "checkout_start",
    "recommended_check"
] = "장바구니 UI, 쿠폰 적용, 배송비 표시 점검"

funnel_issue_candidates.loc[
    funnel_issue_candidates["event_name"] == "purchase",
    "recommended_check"
] = "결제 수단, 로그인, 오류 메시지, 결제 페이지 속도 점검"

funnel_issue_candidates
\`\`\`

저장합니다.

\`\`\`python
funnel_issue_candidates.to_csv(
    OUTPUT_TABLES / "chapter_16_funnel_issue_candidates.csv",
    index=False
)
\`\`\`

---

### 16.17.3 개선 가설 예시

\`\`\`text
상품 조회 → 장바구니 단계 이탈률이 높다면:
- 상품 상세 페이지 정보가 부족할 수 있다.
- 배송비가 늦게 노출되어 사용자가 이탈할 수 있다.
- 가격 경쟁력이 낮을 수 있다.
- 리뷰나 신뢰 정보가 부족할 수 있다.

장바구니 → 결제 시작 단계 이탈률이 높다면:
- 쿠폰 적용이 어렵거나 혜택이 명확하지 않을 수 있다.
- 장바구니에서 최종 결제 금액이 예상보다 높게 보일 수 있다.
- 배송비나 배송 일정 정보가 불명확할 수 있다.

결제 시작 → 구매 완료 단계 이탈률이 높다면:
- 결제 수단이 부족할 수 있다.
- 결제 페이지 오류가 있을 수 있다.
- 로그인 또는 회원가입 절차가 복잡할 수 있다.
- 모바일 결제 UX가 불편할 수 있다.
\`\`\`

---
`;export{e as default};