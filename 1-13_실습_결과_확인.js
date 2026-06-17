var e=`# 1장. 고급 분석 프로젝트 시작하기

## 1.13 실습 결과 확인

실습이 끝난 뒤에는 결과물이 제대로 생성되었는지 확인해야 합니다.

---

### 1.13.1 생성 파일 목록 확인

\`\`\`python
for path in PROJECT_DIR.rglob("*"):
    print(path)
\`\`\`

확인해야 할 주요 파일은 다음과 같습니다.

\`\`\`text
README.md
data/raw/orders_sample.csv
data/raw/customers_sample.csv
data/raw/products_sample.csv
outputs/tables/chapter_01_category_summary.csv
outputs/charts/chapter_01_category_sales.png
outputs/reports/chapter_01_project_setup_report.md
\`\`\`

---

### 1.13.2 결과표 다시 불러오기

\`\`\`python
saved_category_summary = pd.read_csv(
    OUTPUT_TABLES / "chapter_01_category_summary.csv"
)

saved_category_summary
\`\`\`

저장된 결과표를 다시 불러와 확인합니다.

---

### 1.13.3 보고서 파일 확인

\`\`\`python
report_path = OUTPUT_REPORTS / "chapter_01_project_setup_report.md"

print(report_path.read_text(encoding="utf-8"))
\`\`\`

보고서 내용이 제대로 저장되었는지 확인합니다.

---
`;export{e as default};