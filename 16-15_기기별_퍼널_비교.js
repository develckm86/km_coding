var e=`# 16장. 퍼널 분석 실습

## 16.15 기기별 퍼널 비교

이번에는 모바일과 데스크톱의 퍼널을 비교합니다.

---

### 16.15.1 기기별 퍼널 계산

\`\`\`python
segment_funnel_by_device = make_segment_funnel(
    user_flags=user_funnel_flags,
    segment_col="device",
    funnel_steps=funnel_steps,
    step_name_map=funnel_step_names
)

segment_funnel_by_device.head()
\`\`\`

저장합니다.

\`\`\`python
segment_funnel_by_device.to_csv(
    OUTPUT_TABLES / "chapter_16_segment_funnel_by_device.csv",
    index=False
)
\`\`\`

---

### 16.15.2 기기별 구매 전환율 추출

\`\`\`python
device_purchase_conversion = segment_funnel_by_device[
    segment_funnel_by_device["event_name"] == "purchase"
].copy()

device_purchase_conversion
\`\`\`

---

### 16.15.3 기기별 구매 전환율 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(
    device_purchase_conversion["segment_value"],
    device_purchase_conversion["overall_conversion_rate"]
)

plt.title("기기별 구매 전환율")
plt.xlabel("기기")
plt.ylabel("구매 전환율(%)")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_16_device_funnel_chart.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 16.15.4 해석 예시

\`\`\`text
모바일과 데스크톱의 전환율 차이는 사용자 경험 차이를 보여줄 수 있다.
모바일에서 장바구니 이후 이탈이 높다면 결제 UI, 로딩 속도, 배송비 표시, 로그인 절차를 점검할 필요가 있다.
데스크톱 전환율이 높다면 고관여 상품 구매가 데스크톱에서 더 잘 일어나는지 확인할 수 있다.
\`\`\`

---
`;export{e as default};