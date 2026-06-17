var e=`# 1장. 고급 분석 프로젝트 시작하기

## 1.11 결과물 저장 규칙 만들기

분석 프로젝트에서는 결과물이 많이 생깁니다.

\`\`\`text
요약표
그래프
보고서
전처리 데이터
분석용 데이터셋
\`\`\`

결과물을 체계적으로 저장하려면 규칙이 필요합니다.

---

### 1.11.1 표 저장 규칙

분석 결과 표는 \`outputs/tables/\`에 저장합니다.

예:

\`\`\`python
category_summary = pd.DataFrame({
    "category": ["전자기기", "도서", "생활용품"],
    "total_sales": [520000, 80000, 50000]
})

category_summary.to_csv(
    OUTPUT_TABLES / "category_summary.csv",
    index=False
)
\`\`\`

---

### 1.11.2 그래프 저장 규칙

그래프는 \`outputs/charts/\`에 저장합니다.

\`\`\`python
plt.figure(figsize=(8, 4))

plt.bar(category_summary["category"], category_summary["total_sales"])

plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")

plt.savefig(OUTPUT_CHARTS / "category_sales.png", bbox_inches="tight")
plt.show()
\`\`\`

그래프 저장 파일명은 그래프 내용을 알 수 있게 작성합니다.

좋은 예:

\`\`\`text
monthly_sales_trend.png
category_sales_bar.png
rfm_segment_count.png
cohort_retention_heatmap.png
\`\`\`

---

### 1.11.3 보고서 저장 규칙

보고서는 \`outputs/reports/\`에 저장합니다.

\`\`\`python
report_text = '''# 1장 실습 보고서

## 프로젝트 구조

고급 데이터 분석 프로젝트 폴더 구조를 생성했다.

## 생성한 폴더

- data/raw
- data/processed
- notebooks
- outputs/tables
- outputs/charts
- outputs/reports
- src

## 정리

원본 데이터와 결과물을 분리해서 관리할 수 있는 프로젝트 구조를 준비했다.
'''

(OUTPUT_REPORTS / "chapter_01_project_setup_report.md").write_text(
    report_text,
    encoding="utf-8"
)
\`\`\`

보고서는 코드 결과를 사람이 읽을 수 있는 형태로 정리한 문서입니다.

---
`;export{e as default};