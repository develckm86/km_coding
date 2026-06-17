var e=`# 3장. 데이터 품질 진단 리포트 만들기

## 3.17 실습 결과 확인하기

생성된 파일을 확인합니다.

---

### 3.17.1 저장된 표 목록 확인

\`\`\`python
for path in OUTPUT_TABLES.glob("chapter_03_*"):
    print(path)
\`\`\`

확인해야 할 파일은 다음과 같습니다.

\`\`\`text
chapter_03_missing_summary.csv
chapter_03_duplicate_summary.csv
chapter_03_key_matching_summary.csv
chapter_03_invalid_dates.csv
chapter_03_outlier_candidates.csv
chapter_03_quality_issue_list.csv
\`\`\`

---

### 3.17.2 저장된 보고서 확인

\`\`\`python
report_path = OUTPUT_REPORTS / "chapter_03_data_quality_report.md"

print(report_path.read_text(encoding="utf-8"))
\`\`\`

---

### 3.17.3 품질 이슈 목록 다시 불러오기

\`\`\`python
pd.read_csv(OUTPUT_TABLES / "chapter_03_quality_issue_list.csv")
\`\`\`

---
`;export{e as default};