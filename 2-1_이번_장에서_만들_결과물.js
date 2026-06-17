var e=`# 2장. 분석 문제 정의와 KPI 설계

## 2.1 이번 장에서 만들 결과물

이번 장에서는 다음 결과물을 만듭니다.

\`\`\`text
advanced_data_analysis_project/
  outputs/
    tables/
      chapter_02_kpi_definition.csv
      chapter_02_analysis_questions.csv
      chapter_02_data_requirements.csv
    reports/
      chapter_02_problem_definition_report.md
\`\`\`

각 결과물의 역할은 다음과 같습니다.

| 결과물 | 설명 |
|---|---|
| \`chapter_02_analysis_questions.csv\` | 비즈니스 질문을 분석 질문으로 정리한 표 |
| \`chapter_02_kpi_definition.csv\` | KPI 이름, 계산식, 기준 데이터, 해석 기준을 정리한 지표 정의서 |
| \`chapter_02_data_requirements.csv\` | 분석에 필요한 데이터와 컬럼을 정리한 표 |
| \`chapter_02_problem_definition_report.md\` | 분석 목적, 범위, 지표, 한계를 정리한 보고서 |

이번 장의 실습은 코드보다 문서화와 설계가 중심입니다.  
하지만 결과물을 재사용하기 위해 pandas DataFrame으로 표를 만들고 CSV와 Markdown으로 저장합니다.

---
`;export{e as default};