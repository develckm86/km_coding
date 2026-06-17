var e=`# 3장. 데이터 품질 진단 리포트 만들기

## 3.1 이번 장에서 만들 결과물

이번 장에서는 다음 결과물을 만듭니다.

\`\`\`text
advanced_data_analysis_project/
  outputs/
    tables/
      chapter_03_missing_summary.csv
      chapter_03_duplicate_summary.csv
      chapter_03_key_matching_summary.csv
      chapter_03_invalid_dates.csv
      chapter_03_outlier_candidates.csv
      chapter_03_quality_issue_list.csv
    reports/
      chapter_03_data_quality_report.md
\`\`\`

각 결과물의 역할은 다음과 같습니다.

| 결과물 | 설명 |
|---|---|
| \`chapter_03_missing_summary.csv\` | 컬럼별 결측치 개수와 비율 |
| \`chapter_03_duplicate_summary.csv\` | 주요 key의 중복 여부 |
| \`chapter_03_key_matching_summary.csv\` | 주문 데이터와 기준표 간 key 매칭 결과 |
| \`chapter_03_invalid_dates.csv\` | 날짜 변환에 실패한 행 |
| \`chapter_03_outlier_candidates.csv\` | 이상값 후보 목록 |
| \`chapter_03_quality_issue_list.csv\` | 처리해야 할 품질 이슈 목록 |
| \`chapter_03_data_quality_report.md\` | 데이터 품질 진단 결과 보고서 |

이 장에서 만드는 리포트는 이후 4장 **분석용 데이터마트 만들기**의 기준이 됩니다.

즉, 3장에서 문제를 찾고, 4장에서 그 문제를 처리해 분석용 데이터를 만듭니다.

---
`;export{e as default};