var e=`<!-- 원본: python_data_analysis_basic_chapter_17_book.md / 세부 장: 17-20 -->

# 17.20 실무 예제 6: 상관관계 히트맵

여러 수치형 변수의 상관관계를 히트맵으로 확인해보겠습니다.

\`\`\`python
corr_matrix = orders[[
    "quantity",
    "total_price",
    "visit_count",
    "satisfaction"
]].corr()

corr_matrix
\`\`\`

히트맵을 그립니다.

\`\`\`python
sns.heatmap(
    corr_matrix,
    annot=True
)

plt.title("수치형 변수 상관관계")
plt.show()
\`\`\`

해석 예시는 다음과 같습니다.

\`\`\`text
상관계수가 양수인 변수들은 함께 증가하는 경향이 있을 수 있다.
상관계수가 음수인 변수들은 한쪽이 증가할 때 다른 쪽이 감소하는 경향이 있을 수 있다.
상관계수가 0에 가까우면 직선적인 관계가 약할 수 있다.
다만 상관관계는 인과관계를 의미하지 않는다.
\`\`\`

---
`;export{e as default};