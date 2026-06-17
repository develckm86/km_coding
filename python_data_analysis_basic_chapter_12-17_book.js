var e=`<!-- 원본: python_data_analysis_basic_chapter_12_book.md / 세부 장: 12-17 -->

# 12.17 문자열 처리 시 자주 하는 실수

문자열 처리는 간단해 보이지만 자주 하는 실수가 있습니다.

---

### 12.17.1 \`.str\`을 빼먹는 실수

pandas Series에 문자열 메서드를 직접 적용하려고 하면 오류가 납니다.

잘못된 예:

\`\`\`python
customers["name"].strip()
\`\`\`

올바른 예:

\`\`\`python
customers["name"].str.strip()
\`\`\`

일반 문자열 하나에는 \`.strip()\`을 사용하지만, pandas 컬럼 전체에는 \`.str.strip()\`을 사용해야 합니다.

---

### 12.17.2 공백을 제거하지 않고 비교하는 실수

다음 두 값은 같아 보이지만 실제로는 다릅니다.

\`\`\`python
"김민수" == " 김민수"
\`\`\`

결과는 \`False\`입니다.

이름, 이메일, 코드값을 비교하기 전에는 앞뒤 공백을 제거하는 것이 좋습니다.

\`\`\`python
df["name"] = df["name"].str.strip()
\`\`\`

---

### 12.17.3 대소문자를 통일하지 않는 실수

이메일이나 코드값에서 대소문자를 통일하지 않으면 중복 확인이나 그룹화 결과가 나뉠 수 있습니다.

\`\`\`python
emails = pd.Series(["USER@example.com", "user@example.com"])

emails.value_counts()
\`\`\`

같은 이메일처럼 보이지만 서로 다른 값으로 집계될 수 있습니다.

\`\`\`python
emails.str.lower().value_counts()
\`\`\`

---

### 12.17.4 \`str.contains()\`에서 결측치를 처리하지 않는 실수

결측치가 있는 컬럼에서 \`contains()\`를 사용할 때는 \`na=False\`를 지정하는 것이 안전합니다.

\`\`\`python
df[df["email"].str.contains("example.com", na=False)]
\`\`\`

\`na=False\`를 넣지 않으면 결측치 때문에 필터링 과정에서 문제가 생길 수 있습니다.

---

### 12.17.5 \`str.replace()\`의 정규표현식 여부를 혼동하는 실수

단순 문자열을 바꾸는 경우에는 \`regex=False\`를 명시하는 것이 좋습니다.

\`\`\`python
df["phone"].str.replace("-", "", regex=False)
\`\`\`

정규표현식을 사용할 때는 \`regex=True\`를 사용합니다.

\`\`\`python
df["phone"].str.replace(r"[^0-9]", "", regex=True)
\`\`\`

정규표현식을 쓰는지 아닌지를 명확히 해야 의도하지 않은 치환을 줄일 수 있습니다.

---

### 12.17.6 숫자처럼 보이는 문자열을 숫자로 변환하지 않는 실수

\`"30,000원"\`은 숫자처럼 보이지만 문자열입니다.  
이 상태로는 평균이나 합계를 제대로 계산할 수 없습니다.

\`\`\`python
products["price"] = (
    products["price_text"]
    .str.replace(r"[^0-9]", "", regex=True)
    .astype(int)
)
\`\`\`

분석 전에 문자열 숫자를 실제 숫자형으로 변환해야 합니다.

---

### 12.17.7 원본 컬럼을 바로 덮어쓰는 실수

문자열 정리 과정에서 처음부터 원본 컬럼을 덮어쓰면 문제가 생겼을 때 되돌리기 어렵습니다.

초보 단계에서는 새 컬럼을 만들어 비교하는 방식이 좋습니다.

\`\`\`python
df["email_clean"] = df["email"].str.strip().str.lower()
\`\`\`

처리 결과를 확인한 뒤 필요하면 원본 컬럼을 대체해도 됩니다.

---
`;export{e as default};