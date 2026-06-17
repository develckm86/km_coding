var e=`<!-- 원본: python_data_analysis_basic_chapter_19_book.md / 세부 장: 19-13 -->

# 19.13 그래프 파일 저장과 결과물 관리

분석 결과를 보고서에 넣으려면 그래프를 이미지로 저장해야 할 때가 있습니다.

---

### 19.13.1 그래프 저장하기

matplotlib에서는 \`savefig()\`를 사용합니다.

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(category_report["category"], category_report["total_sales"])

plt.title("카테고리별 총매출")
plt.xlabel("카테고리")
plt.ylabel("매출")

plt.savefig("category_sales.png", bbox_inches="tight")
plt.show()
\`\`\`

\`bbox_inches="tight"\`를 사용하면 제목이나 축 이름이 잘리지 않게 저장하는 데 도움이 됩니다.

---

### 19.13.2 결과 폴더 구조

분석 프로젝트에서는 결과물을 폴더로 정리하는 것이 좋습니다.

\`\`\`text
project/
  data/
    raw/
    processed/
  notebooks/
  outputs/
    tables/
    charts/
    reports/
  README.md
\`\`\`

예를 들어 그래프는 \`outputs/charts/\`에 저장하고, 요약표는 \`outputs/tables/\`에 저장할 수 있습니다.

---

### 19.13.3 표 저장하기

분석 결과 표는 CSV나 Excel로 저장할 수 있습니다.

\`\`\`python
category_report.to_csv("category_report.csv", index=False)
monthly_report.to_csv("monthly_report.csv", index=False)
\`\`\`

Excel로 저장하려면 다음처럼 작성할 수 있습니다.

\`\`\`python
with pd.ExcelWriter("analysis_report.xlsx") as writer:
    category_report.to_excel(writer, sheet_name="category", index=False)
    monthly_report.to_excel(writer, sheet_name="monthly", index=False)
\`\`\`

보고서용 결과 파일을 따로 저장하면 이후 문서 작성이나 공유가 쉬워집니다.

---
`;export{e as default};