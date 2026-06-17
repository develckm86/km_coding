var e=`# 4장. 분석용 데이터마트 만들기

## 4.24 실습 결과 확인하기

생성된 결과물을 확인합니다.

---

### 4.24.1 저장된 처리 데이터 확인

\`\`\`python
for path in DATA_PROCESSED.glob("chapter_04_*"):
    print(path)
\`\`\`

확인해야 할 파일은 다음과 같습니다.

\`\`\`text
chapter_04_orders_mart.csv
chapter_04_excluded_orders.csv
chapter_04_customers_clean.csv
chapter_04_products_clean.csv
\`\`\`

---

### 4.24.2 저장된 결과표 확인

\`\`\`python
for path in OUTPUT_TABLES.glob("chapter_04_*"):
    print(path)
\`\`\`

확인해야 할 파일은 다음과 같습니다.

\`\`\`text
chapter_04_preprocessing_summary.csv
chapter_04_mart_quality_check.csv
\`\`\`

---

### 4.24.3 저장된 보고서 확인

\`\`\`python
report_path = OUTPUT_REPORTS / "chapter_04_preprocessing_log.md"

print(report_path.read_text(encoding="utf-8"))
\`\`\`

---
`;export{e as default};