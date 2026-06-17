var e=`# 16장. 퍼널 분석 실습

## 16.23 16장 실습 과제

이번 장의 과제는 이벤트 로그 데이터를 사용해 구매 퍼널 분석 보고서를 만드는 것입니다.

---

### 과제 1. 이벤트 로그 품질 점검

이벤트 로그에서 다음 항목을 확인하세요.

\`\`\`text
event_time 결측
user_id 결측
정의되지 않은 event_name
완전 중복 행
\`\`\`

제출물:

\`\`\`text
event_log_quality_check.csv
\`\`\`

---

### 과제 2. 이벤트 로그 정리

다음 기준으로 이벤트 로그를 정리하세요.

\`\`\`text
정의된 퍼널 단계 이벤트만 유지
event_time 날짜형 변환
결측 제거
완전 중복 제거
step_order 추가
step_name 추가
\`\`\`

제출물:

\`\`\`text
event_log_clean.csv
\`\`\`

---

### 과제 3. 전체 퍼널 단계별 사용자 수 계산

다음 컬럼을 가진 표를 만드세요.

\`\`\`text
step_order
event_name
step_name
users
events
overall_conversion_rate
\`\`\`

제출물:

\`\`\`text
funnel_step_summary.csv
\`\`\`

---

### 과제 4. 단계별 전환율과 이탈률 계산

다음 컬럼을 포함하세요.

\`\`\`text
previous_step_users
step_conversion_rate
dropoff_users
dropoff_rate
\`\`\`

제출물:

\`\`\`text
funnel_conversion_report.csv
funnel_dropoff_report.csv
\`\`\`

---

### 과제 5. 퍼널 그래프 작성

다음 그래프를 작성하세요.

\`\`\`text
퍼널 단계별 사용자 수 그래프
단계별 이탈률 그래프
\`\`\`

제출물:

\`\`\`text
funnel_chart.png
dropoff_chart.png
\`\`\`

---

### 과제 6. 사용자별 퍼널 단계 도달 여부 만들기

사용자별로 각 단계에 도달했는지 0 또는 1로 표시한 테이블을 만드세요.

제출물:

\`\`\`text
user_funnel_flags.csv
\`\`\`

---

### 과제 7. 세그먼트별 퍼널 분석

다음 세그먼트별 퍼널을 계산하세요.

\`\`\`text
customer_type
channel
device
\`\`\`

제출물:

\`\`\`text
segment_funnel_by_customer_type.csv
segment_funnel_by_channel.csv
segment_funnel_by_device.csv
\`\`\`

---

### 과제 8. 전환까지 걸린 시간 분석

방문부터 구매 완료까지 걸린 시간을 계산하세요.

필수 컬럼:

\`\`\`text
user_id
first_visit_time
first_purchase_time
minutes_to_purchase
\`\`\`

제출물:

\`\`\`text
time_to_conversion_summary.csv
time_to_purchase_distribution.png
\`\`\`

---

### 과제 9. 개선 후보 단계 작성

이탈률이 높은 단계를 찾고 개선 가설을 작성하세요.

제출물:

\`\`\`text
funnel_issue_candidates.csv
\`\`\`

---

### 과제 10. Markdown 보고서 작성

다음 구조로 보고서를 작성하세요.

\`\`\`markdown
# 퍼널 분석 보고서

## 1. 분석 목적

## 2. 사용 데이터

## 3. 퍼널 단계 정의

## 4. 이벤트 로그 품질 점검

## 5. 전체 퍼널 분석

## 6. 단계별 전환율과 이탈률

## 7. 신규/기존 고객 퍼널 비교

## 8. 유입 채널별 퍼널 비교

## 9. 기기별 퍼널 비교

## 10. 전환까지 걸린 시간

## 11. 개선 후보 단계와 가설

## 12. 주요 인사이트

## 13. 주의사항

## 14. 다음 단계
\`\`\`

제출물:

\`\`\`text
funnel_analysis_report.md
\`\`\`

---
`;export{e as default};