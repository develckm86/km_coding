var e=`# 5장. 데이터 재구조화 실습

## 5.3 이번 장에서 사용할 주요 함수

이번 장에서 사용할 주요 pandas 함수는 다음과 같습니다.

| 함수 | 역할 |
|---|---|
| \`pivot()\` | 중복이 없는 데이터를 행·열 구조로 변환 |
| \`pivot_table()\` | 중복이 있을 때 집계와 함께 피벗 |
| \`melt()\` | wide format을 long format으로 변환 |
| \`stack()\` | 컬럼 레벨을 행 인덱스로 이동 |
| \`unstack()\` | 인덱스 레벨을 컬럼으로 이동 |
| \`explode()\` | 리스트형 값을 여러 행으로 펼침 |

---

### 5.3.1 \`pivot()\`

\`pivot()\`은 행과 열을 지정해 데이터를 넓은 형태로 바꿉니다.

\`\`\`python
df.pivot(
    index="행 기준",
    columns="열 기준",
    values="값"
)
\`\`\`

단, 같은 index와 columns 조합에 값이 여러 개 있으면 오류가 발생합니다.

---

### 5.3.2 \`pivot_table()\`

\`pivot_table()\`은 중복 조합이 있을 때 집계 함수를 사용해 피벗 테이블을 만듭니다.

\`\`\`python
pd.pivot_table(
    data=df,
    index="행 기준",
    columns="열 기준",
    values="값",
    aggfunc="sum",
    fill_value=0
)
\`\`\`

실무에서는 \`pivot()\`보다 \`pivot_table()\`을 더 자주 사용합니다.  
중복 데이터가 있는 경우가 많기 때문입니다.

---

### 5.3.3 \`melt()\`

\`melt()\`는 wide format을 long format으로 바꿉니다.

\`\`\`python
pd.melt(
    df,
    id_vars=["유지할 컬럼"],
    value_vars=["펼칠 컬럼들"],
    var_name="변수명 컬럼",
    value_name="값 컬럼"
)
\`\`\`

예를 들어 월별 매출 컬럼을 \`month\`, \`sales\` 컬럼으로 바꿀 수 있습니다.

---

### 5.3.4 \`stack()\`과 \`unstack()\`

\`stack()\`과 \`unstack()\`은 인덱스를 기준으로 데이터를 재구조화합니다.

\`\`\`python
df.stack()
df.unstack()
\`\`\`

MultiIndex를 다룰 때 자주 사용합니다.

기초 과정에서는 깊게 다루지 않았지만, 고급 과정에서는 groupby 결과를 변환할 때 유용합니다.

---

### 5.3.5 \`explode()\`

\`explode()\`는 리스트가 들어 있는 셀을 여러 행으로 펼칩니다.

예:

\`\`\`text
product_id | tags
P001       | ["전자기기", "노트북", "고가"]
\`\`\`

explode 후:

\`\`\`text
product_id | tags
P001       | 전자기기
P001       | 노트북
P001       | 고가
\`\`\`

태그 데이터, 복수 카테고리 데이터, 여러 값이 들어 있는 컬럼을 분석할 때 유용합니다.

---
`;export{e as default};