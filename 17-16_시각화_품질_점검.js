var e=`# 17장. 고급 시각화 리포트 만들기

## 17.16 시각화 품질 점검

그래프를 만든 뒤에는 품질을 점검해야 합니다.

---

### 17.16.1 점검 기준

시각화 품질 점검 항목은 다음과 같습니다.

\`\`\`text
그래프 파일이 저장되었는가?
제목이 있는가?
x축과 y축 라벨이 있는가?
단위가 명확한가?
그래프가 해석 질문에 답하는가?
해석 문장이 작성되었는가?
\`\`\`

---

### 17.16.2 파일 존재 여부 점검

\`\`\`python
visual_quality_records = []

for _, row in visual_report_index.iterrows():
    chart_path = OUTPUT_CHARTS / row["chart_file"]

    visual_quality_records.append({
        "chart_file": row["chart_file"],
        "file_exists": chart_path.exists(),
        "analysis_area": row["analysis_area"],
        "main_message": row["main_message"],
        "status": "PASS" if chart_path.exists() else "FAIL"
    })

visual_quality_check = pd.DataFrame(visual_quality_records)

visual_quality_check
\`\`\`

저장합니다.

\`\`\`python
visual_quality_check.to_csv(
    OUTPUT_TABLES / "chapter_17_visual_quality_check.csv",
    index=False
)
\`\`\`

---

### 17.16.3 해석 예시

\`\`\`text
시각화 결과물은 파일로 저장되어야 보고서와 자동화에 활용할 수 있다.
그래프 파일 존재 여부를 점검하면 누락된 결과물을 빠르게 찾을 수 있다.
실무에서는 그래프 제목, 축 라벨, 단위, 해석 문장까지 함께 검토하는 체크리스트를 사용하는 것이 좋다.
\`\`\`

---
`;export{e as default};