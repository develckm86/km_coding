var e=`# 14장. RFM 고객 분석 실습

## 14.7 RFM 분포 확인

점수화하기 전에 RFM 지표의 분포를 확인합니다.

---

### 14.7.1 Recency 분포

\`\`\`python
plt.figure(figsize=(8, 4))

plt.hist(rfm_raw_table["recency"], bins=10)

plt.title("Recency 분포")
plt.xlabel("최근 구매 후 경과일")
plt.ylabel("고객 수")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_14_recency_distribution.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 14.7.2 Frequency 분포

\`\`\`python
plt.figure(figsize=(8, 4))

plt.hist(rfm_raw_table["frequency"], bins=10)

plt.title("Frequency 분포")
plt.xlabel("구매 횟수")
plt.ylabel("고객 수")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_14_frequency_distribution.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 14.7.3 Monetary 분포

\`\`\`python
plt.figure(figsize=(8, 4))

plt.hist(rfm_raw_table["monetary"], bins=10)

plt.title("Monetary 분포")
plt.xlabel("총구매액")
plt.ylabel("고객 수")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_14_monetary_distribution.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 14.7.4 분포 해석 예시

\`\`\`text
Recency 분포를 보면 최근 구매 고객과 오래전 구매 고객의 비중을 확인할 수 있다.
Frequency 분포는 1회 구매 고객과 반복 구매 고객이 얼마나 있는지 보여준다.
Monetary 분포는 일부 고액 구매 고객이 전체 매출에 큰 영향을 주는지 확인하는 데 유용하다.
RFM 점수화 전에 분포를 확인하면 분위수 기준이 적절한지 판단하는 데 도움이 된다.
\`\`\`

---
`;export{e as default};