var e=`<!-- 원본: python_data_analysis_basic_chapter_12_book.md / 세부 장: 12-3 -->

# 12.3 공백 처리

문자열 데이터에서 가장 먼저 확인해야 할 문제 중 하나가 공백입니다.  
앞뒤 공백은 눈에 잘 보이지 않지만 데이터 분석 결과에 영향을 줄 수 있습니다.

예를 들어 \`"김민수"\`와 \`" 김민수"\`는 서로 다른 값입니다.

\`\`\`python
"김민수" == " 김민수"
\`\`\`

결과는 \`False\`입니다.

---

### 12.3.1 앞뒤 공백 제거: \`str.strip()\`

앞뒤 공백을 제거하려면 \`str.strip()\`을 사용합니다.

\`\`\`python
customers["name_clean"] = customers["name"].str.strip()

customers[["name", "name_clean"]]
\`\`\`

\`strip()\`은 문자열 앞과 뒤의 공백을 제거합니다.

\`\`\`text
" 김민수"   → "김민수"
"이지영 "   → "이지영"
" 박철수 " → "박철수"
\`\`\`

실무에서는 이름, 이메일, 상품명, 코드값을 정리할 때 \`strip()\`을 자주 사용합니다.

---

### 12.3.2 왼쪽 공백과 오른쪽 공백만 제거하기

왼쪽 공백만 제거하려면 \`lstrip()\`을 사용합니다.

\`\`\`python
customers["name"].str.lstrip()
\`\`\`

오른쪽 공백만 제거하려면 \`rstrip()\`을 사용합니다.

\`\`\`python
customers["name"].str.rstrip()
\`\`\`

대부분의 데이터 클리닝에서는 앞뒤 공백을 모두 제거하는 \`strip()\`을 가장 많이 사용합니다.

---

### 12.3.3 연속 공백 처리

문자열 안쪽에 연속 공백이 있을 수도 있습니다.

\`\`\`python
names = pd.Series(["김  민수", "이   지영", "박 철수"])

names
\`\`\`

이런 경우 \`replace()\`와 정규표현식을 사용할 수 있습니다.

\`\`\`python
names.str.replace(r"\\s+", " ", regex=True)
\`\`\`

여기서 \`\\s+\`는 하나 이상의 공백 문자를 의미합니다.  
\`regex=True\`는 패턴을 정규표현식으로 해석하겠다는 의미입니다.

결과는 다음과 같습니다.

\`\`\`text
"김 민수"
"이 지영"
"박 철수"
\`\`\`

정규표현식은 12.9절에서 조금 더 다룹니다.

---

### 12.3.4 빈 문자열 처리

공백을 제거한 뒤 빈 문자열이 되는 값이 있을 수 있습니다.

\`\`\`python
phones = pd.Series(["010-1234-5678", "", "   ", None])

phones_clean = phones.str.strip()

phones_clean
\`\`\`

\`"   "\`는 \`strip()\` 후 \`""\`가 됩니다.  
하지만 빈 문자열은 결측치가 아닙니다.

빈 문자열을 결측치로 바꾸려면 다음처럼 처리합니다.

\`\`\`python
phones_clean = phones_clean.replace("", pd.NA)

phones_clean
\`\`\`

실무에서는 다음 순서가 자주 사용됩니다.

\`\`\`python
df["col"] = df["col"].str.strip()
df["col"] = df["col"].replace("", pd.NA)
\`\`\`

---
`;export{e as default};