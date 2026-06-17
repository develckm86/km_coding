var e=`<!-- 원본: python_data_analysis_basic_chapter_20_book.md / 세부 장: 20-19 -->

# 20.19 14단계: 분석 결과 저장

분석 결과를 파일로 저장하는 방법을 정리합니다.

---

### 20.19.1 정리된 데이터 저장

\`\`\`python
orders_analysis.to_csv("orders_analysis.csv", index=False)
\`\`\`

Excel 파일로 저장할 수도 있습니다.

\`\`\`python
orders_analysis.to_excel("orders_analysis.xlsx", index=False)
\`\`\`

---

### 20.19.2 요약표 저장

여러 요약표를 하나의 Excel 파일에 시트별로 저장할 수 있습니다.

\`\`\`python
with pd.ExcelWriter("summary_reports.xlsx") as writer:
    category_report.to_excel(writer, sheet_name="category", index=False)
    monthly_report.to_excel(writer, sheet_name="monthly", index=False)
    grade_report.to_excel(writer, sheet_name="grade", index=False)
    region_report.to_excel(writer, sheet_name="region", index=False)
    product_report.to_excel(writer, sheet_name="product", index=False)
\`\`\`

---

### 20.19.3 그래프 저장

그래프를 이미지 파일로 저장할 수 있습니다.

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(category_report["category"], category_report["total_sales"])

plt.title("카테고리별 총매출")
plt.xlabel("카테고리")
plt.ylabel("매출")

plt.savefig("category_sales.png", bbox_inches="tight")
plt.show()
\`\`\`

실무에서는 결과 파일을 \`outputs/\` 폴더 아래에 저장하는 것이 좋습니다.

---
`;export{e as default};