var e=`# 16장. 퍼널 분석 실습

## 16.14 유입 채널별 퍼널 비교

이번에는 유입 채널별 퍼널을 비교합니다.

---

### 16.14.1 채널별 퍼널 계산

\`\`\`python
segment_funnel_by_channel = make_segment_funnel(
    user_flags=user_funnel_flags,
    segment_col="channel",
    funnel_steps=funnel_steps,
    step_name_map=funnel_step_names
)

segment_funnel_by_channel.head()
\`\`\`

저장합니다.

\`\`\`python
segment_funnel_by_channel.to_csv(
    OUTPUT_TABLES / "chapter_16_segment_funnel_by_channel.csv",
    index=False
)
\`\`\`

---

### 16.14.2 채널별 최종 구매 전환율 추출

\`\`\`python
channel_purchase_conversion = segment_funnel_by_channel[
    segment_funnel_by_channel["event_name"] == "purchase"
].copy()

channel_purchase_conversion = channel_purchase_conversion.sort_values(
    "overall_conversion_rate",
    ascending=False
)

channel_purchase_conversion
\`\`\`

---

### 16.14.3 채널별 구매 전환율 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(
    channel_purchase_conversion["segment_value"],
    channel_purchase_conversion["overall_conversion_rate"]
)

plt.title("유입 채널별 구매 전환율")
plt.xlabel("유입 채널")
plt.ylabel("구매 전환율(%)")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_16_channel_funnel_chart.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 16.14.4 해석 예시

\`\`\`text
유입 채널별 구매 전환율은 채널 품질을 비교하는 데 유용하다.
검색광고는 방문 수가 많지만 구매 전환율이 낮을 수 있고, 이메일은 방문 수는 적어도 전환율이 높을 수 있다.
채널별 예산 배분은 방문 수뿐 아니라 퍼널 전환율과 사용자당 매출을 함께 고려해야 한다.
\`\`\`

---
`;export{e as default};