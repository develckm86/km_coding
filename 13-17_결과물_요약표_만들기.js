var e=`# 13장. 회귀분석 실습

## 13.17 결과물 요약표 만들기

이번 장에서 생성한 결과물을 정리합니다.

\`\`\`python
regression_output_summary = pd.DataFrame([
    {
        "output_name": "regression_feature_dataset",
        "file_name": "chapter_13_regression_feature_dataset.csv",
        "description": "회귀분석에 사용한 고객 Feature 데이터"
    },
    {
        "output_name": "correlation_summary",
        "file_name": "chapter_13_correlation_summary.csv",
        "description": "total_purchase와 주요 수치형 변수의 상관관계"
    },
    {
        "output_name": "simple_regression_result",
        "file_name": "chapter_13_simple_regression_result.csv",
        "description": "visit_count 단순 회귀 결과"
    },
    {
        "output_name": "multiple_regression_result",
        "file_name": "chapter_13_multiple_regression_result.csv",
        "description": "여러 수치형 변수를 포함한 다중 회귀 결과"
    },
    {
        "output_name": "categorical_regression_result",
        "file_name": "chapter_13_categorical_regression_result.csv",
        "description": "범주형 변수를 포함한 회귀 결과"
    },
    {
        "output_name": "model_comparison_summary",
        "file_name": "chapter_13_model_comparison_summary.csv",
        "description": "단순 회귀, 다중 회귀, 범주형 모델 비교"
    },
    {
        "output_name": "residual_diagnostics",
        "file_name": "chapter_13_residual_diagnostics.csv",
        "description": "잔차 기본 통계와 평균 절대 오차"
    },
    {
        "output_name": "prediction_sample",
        "file_name": "chapter_13_prediction_sample.csv",
        "description": "실제값, 예측값, 잔차 비교 샘플"
    },
    {
        "output_name": "regression_analysis_report",
        "file_name": "chapter_13_regression_analysis_report.md",
        "description": "회귀분석 실습 보고서"
    }
])

regression_output_summary
\`\`\`

저장합니다.

\`\`\`python
regression_output_summary.to_csv(
    OUTPUT_TABLES / "chapter_13_regression_output_summary.csv",
    index=False
)
\`\`\`

---
`;export{e as default};