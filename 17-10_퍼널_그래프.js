var e=`# 17장. 고급 시각화 리포트 만들기

## 17.10 퍼널 그래프

퍼널 그래프는 고객 여정에서 이탈이 발생하는 단계를 보여줍니다.

분석 질문:

\`\`\`text
구매 과정에서 가장 이탈이 큰 단계는 어디인가?
\`\`\`

---

### 17.10.1 퍼널 단계별 사용자 수 그래프

\`\`\`python
plt.figure(figsize=(10, 4))

plt.bar(
    funnel_report["step_name"],
    funnel_report["users"]
)

plt.title("구매 퍼널 단계별 사용자 수")
plt.xlabel("퍼널 단계")
plt.ylabel("사용자 수")

plt.xticks(rotation=30)
plt.tight_layout()

plt.savefig(
    OUTPUT_CHARTS / "chapter_17_funnel_chart.png",
    bbox_inches="tight"
)

plt.show()
\`\`\`

---

### 17.10.2 해석 문장 예시

\`\`\`text
퍼널 그래프는 고객이 구매 완료까지 가는 과정에서 어느 단계에서 많이 줄어드는지 보여준다.
상품 조회에서 장바구니로 넘어가는 비율이 낮다면 상품 상세 정보, 가격, 배송비, 리뷰, 장바구니 버튼 위치를 점검할 필요가 있다.
\`\`\`

---
`;export{e as default};