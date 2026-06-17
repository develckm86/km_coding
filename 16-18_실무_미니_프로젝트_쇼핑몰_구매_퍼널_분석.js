var e=`# 16장. 퍼널 분석 실습

## 16.18 실무 미니 프로젝트: 쇼핑몰 구매 퍼널 분석

이번 장에서 배운 내용을 하나의 실무 흐름으로 정리합니다.

---

### 16.18.1 프로젝트 목표

\`\`\`text
이벤트 로그 데이터를 사용해 쇼핑몰 구매 퍼널을 분석한다.
방문, 상품 조회, 장바구니, 결제 시작, 구매 완료 단계별 사용자 수와 전환율을 계산하고,
이탈이 큰 단계를 찾아 개선 가설을 작성한다.
\`\`\`

---

### 16.18.2 Step 1. 이벤트 로그 정리

\`\`\`python
event_log_clean = event_log_raw[
    event_log_raw["event_name"].isin(funnel_steps)
].copy()

event_log_clean["event_time"] = pd.to_datetime(
    event_log_clean["event_time"],
    errors="coerce"
)

event_log_clean = event_log_clean.dropna(
    subset=["user_id", "event_time", "event_name"]
)

event_log_clean = event_log_clean.drop_duplicates()

event_log_clean["step_order"] = event_log_clean["event_name"].map(step_order_map)
\`\`\`

---

### 16.18.3 Step 2. 단계별 사용자 수 계산

\`\`\`python
funnel_step_summary = (
    event_log_clean
    .groupby(["step_order", "event_name"])
    .agg(users=("user_id", "nunique"))
    .reset_index()
    .sort_values("step_order")
)
\`\`\`

---

### 16.18.4 Step 3. 전환율과 이탈률 계산

\`\`\`python
funnel_step_summary["previous_step_users"] = funnel_step_summary["users"].shift(1)

funnel_step_summary["step_conversion_rate"] = np.where(
    funnel_step_summary["step_order"] == 1,
    100,
    funnel_step_summary["users"] /
    funnel_step_summary["previous_step_users"] * 100
)

funnel_step_summary["dropoff_users"] = (
    funnel_step_summary["previous_step_users"] -
    funnel_step_summary["users"]
)

funnel_step_summary["dropoff_rate"] = np.where(
    funnel_step_summary["step_order"] == 1,
    0,
    funnel_step_summary["dropoff_users"] /
    funnel_step_summary["previous_step_users"] * 100
)
\`\`\`

---

### 16.18.5 Step 4. 세그먼트별 퍼널 비교

\`\`\`python
user_funnel_flags = (
    event_log_clean
    .assign(reached=1)
    .pivot_table(
        index="user_id",
        columns="event_name",
        values="reached",
        aggfunc="max",
        fill_value=0
    )
    .reset_index()
)

segment_funnel_by_channel = make_segment_funnel(
    user_flags=user_funnel_flags.merge(user_attributes, on="user_id", how="left"),
    segment_col="channel",
    funnel_steps=funnel_steps,
    step_name_map=funnel_step_names
)
\`\`\`

---

### 16.18.6 Step 5. 개선 가설 작성

\`\`\`text
가장 이탈률이 높은 단계가 상품 조회 → 장바구니라면:
- 상품 상세 정보 개선
- 배송비와 총 결제 금액 조기 노출
- 리뷰와 신뢰 정보 강화
- 장바구니 버튼 위치와 문구 개선
- 관련 상품 추천 테스트

가장 이탈률이 높은 단계가 결제 시작 → 구매 완료라면:
- 결제 페이지 오류 로그 확인
- 간편 결제 수단 추가
- 모바일 결제 UX 개선
- 회원가입 없는 구매 지원 검토
\`\`\`

---
`;export{e as default};