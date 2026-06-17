var e=`# 11장. 통계적 비교 실습

## 11.9 분포 시각화: 박스플롯

평균과 중앙값만으로는 분포를 알기 어렵습니다.

집단별 분포를 비교할 때는 박스플롯이 유용합니다.

---

### 11.9.1 고객 등급별 구매액 박스플롯

\`\`\`python
grade_values = [
    customer_features.loc[
        customer_features["customer_grade"] == grade,
        "total_purchase"
    ].dropna()
    for grade in customer_features["customer_grade"].dropna().unique()
]

grade_labels = customer_features["customer_grade"].dropna().unique()

plt.figure(figsize=(8, 4))

plt.boxplot(grade_values, labels=grade_labels)

plt.title("고객 등급별 총구매액 분포")
plt.xlabel("고객 등급")
plt.ylabel("총구매액")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_11_grade_boxplot.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 11.9.2 해석 예시

\`\`\`text
박스플롯을 보면 VIP 고객과 일반 고객의 총구매액 분포가 어떻게 다른지 확인할 수 있다.
중앙값의 차이뿐 아니라 분포의 퍼짐, 이상값 후보도 함께 볼 수 있다.
표본 수가 적은 경우 박스플롯 해석에 주의해야 한다.
\`\`\`

---
`;export{e as default};