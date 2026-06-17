var e=`<!-- 원본: python_data_analysis_basic_chapter_12_book.md / 세부 장: 12-12 -->

# 12.12 실무 예제 1: 이메일 도메인 추출

고객 이메일에서 도메인을 추출해보겠습니다.

\`\`\`python
customers["email_clean"] = customers["email"].str.strip().str.lower()

customers[["email_id", "email_domain"]] = customers["email_clean"].str.split("@", expand=True)

customers[["email_clean", "email_id", "email_domain"]]
\`\`\`

도메인별 고객 수를 계산할 수 있습니다.

\`\`\`python
customers["email_domain"].value_counts(dropna=False)
\`\`\`

\`dropna=False\`를 사용하면 결측치도 함께 집계합니다.

특정 도메인만 필터링할 수도 있습니다.

\`\`\`python
example_customers = customers[customers["email_domain"] == "example.com"]

example_customers
\`\`\`

이메일 도메인 분석은 다음과 같은 상황에서 사용할 수 있습니다.

- 회사 이메일 사용자와 개인 이메일 사용자 구분
- 특정 도메인 사용 고객 찾기
- 이메일 형식 오류 확인
- 마케팅 발송 대상 정리

---
`;export{e as default};