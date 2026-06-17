var e=`# 1장. 고급 분석 프로젝트 시작하기

## 1.6 README 작성하기

프로젝트에는 README가 필요합니다.

README는 프로젝트를 처음 보는 사람이 이 프로젝트가 무엇인지 이해할 수 있게 해주는 문서입니다.

---

### 1.6.1 README에 들어갈 내용

기본 README에는 다음 내용이 들어갈 수 있습니다.

\`\`\`text
프로젝트 제목
분석 목적
사용 데이터
폴더 구조
실행 방법
결과물 설명
주의사항
\`\`\`

---

### 1.6.2 README 초안 만들기

다음 코드는 README 파일을 생성합니다.

\`\`\`python
readme_text = '''# 고급 데이터 분석 프로젝트

## 1. 프로젝트 개요

이 프로젝트는 파이썬 데이터 분석 고급 활용 수업에서 사용하는 실습 프로젝트입니다.
쇼핑몰 주문 데이터를 바탕으로 매출, 고객, 상품, 리텐션, 퍼널, 실험 분석을 수행합니다.

## 2. 분석 목적

- 매출 구조 분석
- 고객 등급별 구매 패턴 분석
- 카테고리별 매출 기여도 분석
- 고객 리텐션과 RFM 분석
- A/B 테스트와 퍼널 분석
- 반복 리포트 자동화

## 3. 폴더 구조

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

## 4. 데이터 관리 규칙

- 원본 데이터는 data/raw/에 저장한다.
- 원본 데이터는 직접 수정하지 않는다.
- 전처리된 데이터는 data/processed/에 저장한다.
- 분석 결과 표는 outputs/tables/에 저장한다.
- 그래프는 outputs/charts/에 저장한다.
- 보고서는 outputs/reports/에 저장한다.

## 5. 사용 도구

- Python
- pandas
- NumPy
- matplotlib
- seaborn
- DuckDB
- Polars
- statsmodels
- scikit-learn

## 6. 결과물

- 분석용 데이터마트
- 데이터 품질 리포트
- 고객 Feature Table
- RFM 세그먼트 리포트
- 코호트 리텐션 분석
- 퍼널 분석 리포트
- 자동 생성 월간 리포트
'''
\`\`\`

파일로 저장합니다.

\`\`\`python
(project_dir / "README.md").write_text(readme_text, encoding="utf-8")
\`\`\`

---

### 1.6.3 README를 작성하는 이유

README를 작성하면 다음 장점이 있습니다.

\`\`\`text
프로젝트 목적이 명확해진다.
폴더 구조를 빠르게 이해할 수 있다.
다른 사람이 프로젝트를 실행하기 쉽다.
분석 결과물의 위치를 알 수 있다.
프로젝트가 포트폴리오처럼 정리된다.
\`\`\`

데이터 분석 프로젝트도 하나의 결과물입니다.  
README는 그 결과물을 설명하는 첫 페이지입니다.

---
`;export{e as default};