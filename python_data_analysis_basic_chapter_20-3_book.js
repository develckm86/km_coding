var e=`<!-- 원본: python_data_analysis_basic_chapter_20_book.md / 세부 장: 20-3 -->

# 20.3 프로젝트 폴더 구조

실제 프로젝트에서는 데이터와 결과물을 폴더별로 나누어 관리하는 것이 좋습니다.

예를 들어 다음과 같은 구조를 사용할 수 있습니다.

\`\`\`text
shopping_mall_analysis/
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

각 폴더의 역할은 다음과 같습니다.

| 폴더 | 역할 |
|---|---|
| \`data/raw/\` | 원본 데이터 저장 |
| \`data/processed/\` | 정리된 데이터 저장 |
| \`notebooks/\` | 분석 노트북 저장 |
| \`outputs/tables/\` | 분석 결과 표 저장 |
| \`outputs/charts/\` | 그래프 이미지 저장 |
| \`outputs/reports/\` | 보고서 저장 |

이번 교재에서는 파일을 직접 불러오는 대신 예제 데이터를 코드로 생성합니다.  
하지만 실제 프로젝트에서는 CSV나 Excel 파일을 \`data/raw/\`에 저장하고 불러오는 방식으로 진행합니다.

---
`;export{e as default};