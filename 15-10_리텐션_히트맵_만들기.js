var e=`# 15장. 코호트와 리텐션 분석 실습

## 15.10 리텐션 히트맵 만들기

리텐션 테이블은 히트맵으로 보면 패턴을 더 쉽게 파악할 수 있습니다.

---

### 15.10.1 matplotlib로 히트맵 만들기

\`\`\`python
plt.figure(figsize=(10, 5))

plt.imshow(cohort_retention_table.values, aspect="auto")

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
    OUTPUT_CHARTS / "chapter_15_cohort_retention_heatmap.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 15.10.2 히트맵 해석

\`\`\`text
히트맵에서 행은 코호트 월이고, 열은 첫 구매 후 경과 월이다.
색이 진한 구간은 리텐션이 높은 구간이다.
대각선 방향으로 시간이 지날수록 리텐션이 낮아지는 패턴을 볼 수 있다.
특정 코호트의 리텐션이 다른 코호트보다 높다면 그 월에 유입된 고객의 품질이나 마케팅 효과가 좋았을 가능성이 있다.
\`\`\`

---
`;export{e as default};