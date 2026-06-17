var e=`# 17장. 고급 시각화 리포트 만들기

## 17.11 A/B 테스트 전환율 그래프

A/B 테스트 결과는 전환율 그래프로 간단히 전달할 수 있습니다.

분석 질문:

\`\`\`text
실험군의 전환율은 대조군보다 높은가?
\`\`\`

---

### 17.11.1 A/B 테스트 전환율 데이터 정리

A/B 테스트 결과 데이터의 형태가 다를 수 있으므로 전환율 컬럼을 맞춥니다.

\`\`\`python
if "conversion_rate" not in ab_conversion.columns:
    if "converted_users" in ab_conversion.columns and "users" in ab_conversion.columns:
        ab_conversion["conversion_rate"] = (
            ab_conversion["converted_users"] / ab_conversion["users"] * 100
        ).round(2)
    elif "conversions" in ab_conversion.columns and "users" in ab_conversion.columns:
        ab_conversion["conversion_rate"] = (
            ab_conversion["conversions"] / ab_conversion["users"] * 100
        ).round(2)

ab_conversion
\`\`\`

---

### 17.11.2 전환율 그래프

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(
    ab_conversion["experiment_group"],
    ab_conversion["conversion_rate"]
)

plt.title("A/B 테스트 그룹별 전환율")
plt.xlabel("실험 그룹")
plt.ylabel("전환율(%)")

plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_17_ab_conversion_rate.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 17.11.3 해석 문장 예시

\`\`\`text
A/B 테스트 전환율 그래프는 실험군과 대조군의 전환율 차이를 직관적으로 보여준다.
전환율 차이가 보이더라도 통계적 유의성과 사용자당 매출, 가드레일 지표를 함께 확인해야 최종 의사결정을 할 수 있다.
\`\`\`

---
`;export{e as default};