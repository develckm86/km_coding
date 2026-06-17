var e=`<!-- 원본: python_advanced_chapter_5_book.md / 세부 장: 5-8 -->

# 5.8 데코레이터와 데이터 처리 코드

이 고급 파이썬 과정 이후에는 데이터분석 기초와 고급 과정으로 이어집니다. 데이터분석 코드에서도 데코레이터 개념은 직접 또는 간접적으로 도움이 됩니다.

---

### 5.8.1 실행 시간 측정

데이터 전처리 함수는 데이터가 커질수록 시간이 오래 걸릴 수 있습니다.

\`\`\`python
@measure_time
def clean_data(rows):
    cleaned = []
    for row in rows:
        if row:
            cleaned.append(row.strip())
    return cleaned
\`\`\`

실행 시간을 측정하면 어떤 단계가 느린지 찾을 수 있습니다.

---

### 5.8.2 실패한 작업 기록

파일 처리나 API 수집에서는 일부 데이터만 실패할 수 있습니다.

\`\`\`python
@log_call
def process_file(filename):
    ...
\`\`\`

실행 로그를 자동으로 남기면 어떤 파일이 처리되었고 어떤 파일에서 문제가 발생했는지 추적하기 쉽습니다.

---

### 5.8.3 API 재시도

API 요청은 네트워크 문제로 실패할 수 있습니다.

\`\`\`python
@retry(max_attempts=3, delay=1)
def fetch_page(page):
    ...
\`\`\`

재시도 데코레이터를 사용하면 API 수집 함수의 본문은 데이터 요청에 집중하고, 실패 처리 로직은 바깥으로 분리할 수 있습니다.

---

### 5.8.4 검증과 전처리 분리

데이터 처리 함수마다 입력값 검증 로직이 반복된다면 일부 검증은 데코레이터로 분리할 수 있습니다.

\`\`\`python
@require_non_empty
def normalize_text(text):
    return text.strip().lower()
\`\`\`

하지만 데이터 검증 규칙은 상황마다 다르기 때문에 무조건 데코레이터로 빼기보다, 공통 규칙일 때만 사용하는 것이 좋습니다.

---
`;export{e as default};