var e=`# 2장. 분석 문제 정의와 KPI 설계

## 2.13 실습 결과 확인하기

생성한 결과물을 확인합니다.

---

### 2.13.1 저장된 파일 목록 확인

\`\`\`python
for path in OUTPUT_TABLES.glob("chapter_02_*"):
    print(path)
\`\`\`

\`\`\`python
for path in OUTPUT_REPORTS.glob("chapter_02_*"):
    print(path)
\`\`\`

확인해야 할 파일은 다음과 같습니다.

\`\`\`text
outputs/tables/chapter_02_analysis_questions.csv
outputs/tables/chapter_02_kpi_definition.csv
outputs/tables/chapter_02_data_requirements.csv
outputs/reports/chapter_02_problem_definition_report.md
\`\`\`

---

### 2.13.2 KPI 정의서 다시 불러오기

\`\`\`python
pd.read_csv(OUTPUT_TABLES / "chapter_02_kpi_definition.csv")
\`\`\`

---

### 2.13.3 보고서 내용 확인하기

\`\`\`python
report_path = OUTPUT_REPORTS / "chapter_02_problem_definition_report.md"

print(report_path.read_text(encoding="utf-8"))
\`\`\`

---
`;export{e as default};