var e=`# 16장. 퍼널 분석 실습

## 16.10 퍼널 그래프 작성

퍼널 분석 결과를 그래프로 표현합니다.

---

### 16.10.1 단계별 사용자 수 그래프

\`\`\`python
plt.figure(figsize=(10, 4))

plt.bar(
    funnel_conversion_report["step_name"],
    funnel_conversion_report["users"]
)

plt.title("퍼널 단계별 사용자 수")
plt.xlabel("퍼널 단계")
plt.ylabel("사용자 수")

plt.xticks(rotation=30)
plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_16_funnel_chart.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 16.10.2 단계별 이탈률 그래프

\`\`\`python
plt.figure(figsize=(10, 4))

plt.bar(
    funnel_dropoff_report["step_name"],
    funnel_dropoff_report["dropoff_rate"]
)

plt.title("퍼널 단계별 이탈률")
plt.xlabel("퍼널 단계")
plt.ylabel("이탈률(%)")

plt.xticks(rotation=30)
plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_16_dropoff_chart.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 16.10.3 그래프 해석 예시

\`\`\`text
퍼널 단계별 사용자 수 그래프는 고객이 어느 단계에서 줄어드는지 보여준다.
이탈률 그래프는 이전 단계 대비 가장 큰 이탈이 발생한 구간을 보여준다.
사용자 수가 가장 많이 줄어드는 단계와 이탈률이 가장 높은 단계가 다를 수 있으므로 둘 다 확인해야 한다.
\`\`\`

---
`;export{e as default};