var e=`# 1장. 고급 분석 프로젝트 시작하기

## 1.1 이번 장에서 만들 결과물

이번 장의 최종 결과물은 다음과 같습니다.

\`\`\`text
1. 고급 데이터 분석 프로젝트 폴더 구조
2. 기본 분석 노트북 구조
3. 원본 데이터와 처리 데이터 관리 규칙
4. 결과물 저장 폴더
5. README 초안
6. 공통 분석 설정 코드
7. 샘플 데이터 로딩 코드
8. 1장 실습 정리 Markdown 문서
\`\`\`

이번 장이 끝나면 다음과 같은 프로젝트 구조를 갖게 됩니다.

\`\`\`text
advanced_data_analysis_project/
  data/
    raw/
    processed/
  notebooks/
  outputs/
    tables/
    charts/
    reports/
  src/
  README.md
\`\`\`

이 구조는 이후 장에서도 계속 사용합니다.

예를 들어 3장에서 만드는 데이터 품질 리포트는 \`outputs/reports/\`에 저장할 수 있고, 6장에서 만드는 groupby 요약표는 \`outputs/tables/\`에 저장할 수 있습니다. 17장에서 만드는 시각화 결과는 \`outputs/charts/\`에 저장할 수 있습니다.

즉, 이번 장에서 만든 프로젝트 구조는 단순한 폴더 정리가 아니라, 이후 전체 고급 분석 과정의 기반입니다.

---
`;export{e as default};