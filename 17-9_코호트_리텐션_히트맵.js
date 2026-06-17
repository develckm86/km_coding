var e=`# 17장. 고급 시각화 리포트 만들기

## 17.9 코호트 리텐션 히트맵

코호트 리텐션 히트맵은 고객 유지 흐름을 보여줍니다.

분석 질문:

\`\`\`text
첫 구매 고객은 시간이 지나도 계속 구매하는가?
\`\`\`

---

### 17.9.1 코호트 리텐션 히트맵

\`\`\`python
plt.figure(figsize=(10, 5))

plt.imshow(
    cohort_retention_table.values,
    aspect="auto"
)

plt.title("첫 구매 월 기준 코호트 리텐션")
plt.xlabel("경과 월")
plt.ylabel("첫 구매 월")

plt.xticks(
    ticks=range(len(cohort_retention_table.columns)),
    labels=cohort_retention_table.columns
)

plt.yticks(
    ticks=range(len(cohort_retention_table.index)),
    labels=cohort_retention_table.index.astype(str)
)

plt.colorbar(label="리텐션(%)")

for i in range(cohort_retention_table.shape[0]):
    for j in range(cohort_retention_table.shape[1]):
        value = cohort_retention_table.iloc[i, j]
        if pd.notna(value):
            plt.text(j, i, f"{value:.1f}", ha="center", va="center")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_17_cohort_retention_heatmap.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 17.9.2 해석 문장 예시

\`\`\`text
코호트 리텐션 히트맵은 첫 구매 월별 고객이 이후 몇 개월 동안 다시 구매하는지 보여준다.
1개월 후 리텐션이 낮다면 첫 구매 이후 두 번째 구매를 유도하는 온보딩 캠페인을 검토할 수 있다.
\`\`\`

---
`;export{e as default};