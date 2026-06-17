var e=`# 2장. 분석 문제 정의와 KPI 설계

## 2.20 다음 장 예고

다음 장에서는 **데이터 품질 진단 리포트 만들기**를 실습합니다.

이번 장에서 다음 질문을 정의했습니다.

\`\`\`text
월별 매출은 어떻게 변했는가?
VIP 고객은 일반 고객보다 중요한가?
전자기기 카테고리는 매출에 얼마나 기여하는가?
쿠폰 사용 주문은 미사용 주문과 다른가?
\`\`\`

이 질문에 답하려면 데이터가 신뢰할 수 있어야 합니다.

다음 장에서는 다음 내용을 실습합니다.

\`\`\`text
컬럼별 결측치 비율 계산
주문 ID 중복 확인
고객 ID와 상품 ID key 검증
상품 마스터에 없는 product_id 찾기
고객 마스터에 없는 customer_id 찾기
날짜 변환 실패 행 찾기
주문 금액 이상값 후보 탐색
데이터 품질 리포트 작성
\`\`\`

다음 장의 최종 결과물은 다음과 같습니다.

\`\`\`text
데이터 품질 진단 리포트
결측치 요약표
중복값 요약표
key 매칭 실패 목록
이상값 후보 목록
날짜 오류 목록
처리 우선순위
\`\`\`

데이터 품질 진단은 분석 결과의 신뢰도를 결정하는 핵심 단계입니다.

---

## 참고 문서

- pandas 공식 문서: Getting started tutorials
- pandas 공식 문서: Group by: split-apply-combine
- pandas 공식 문서: Working with missing data
- pandas 공식 문서: Merge, join, concatenate and compare
- Python 공식 문서: pathlib
`;export{e as default};