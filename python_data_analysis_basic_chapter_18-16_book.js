var e=`<!-- 원본: python_data_analysis_basic_chapter_18_book.md / 세부 장: 18-16 -->

# 18.16 핵심 정리

이번 장에서는 탐색적 데이터 분석, EDA의 개념과 기본 흐름을 배웠습니다.

EDA는 데이터를 본격적으로 분석하거나 보고하기 전에 데이터를 이해하기 위한 과정입니다.

EDA의 목적은 정답을 바로 내리는 것이 아니라, 데이터를 관찰하고 패턴을 발견하며 추가 분석 질문을 만드는 것입니다.

EDA의 기본 흐름은 다음과 같습니다.

\`\`\`text
1. 데이터 구조 확인
2. 데이터 품질 확인
3. 단일 변수 분석
4. 두 변수 관계 분석
5. 그룹별 비교
6. 시간 흐름 분석
7. 패턴과 이상한 점 정리
8. 추가 분석 질문 도출
\`\`\`

데이터 구조 확인에는 다음 메서드를 사용합니다.

\`\`\`python
df.head()
df.shape
df.info()
df.describe()
\`\`\`

데이터 품질 확인에는 다음 메서드를 사용합니다.

\`\`\`python
df.isna().sum()
df.duplicated().sum()
df.value_counts()
\`\`\`

수치형 변수는 평균, 중앙값, 표준편차, 분포를 확인합니다.

\`\`\`python
df["col"].describe()
df["col"].mean()
df["col"].median()
\`\`\`

범주형 변수는 빈도와 비율을 확인합니다.

\`\`\`python
df["category"].value_counts()
df["category"].value_counts(normalize=True)
\`\`\`

변수 간 관계는 그룹화, 상관계수, 산점도, 박스플롯, 교차표로 확인합니다.

\`\`\`python
df.groupby("group")["value"].mean()
df[["x", "y"]].corr()
sns.scatterplot(data=df, x="x", y="y")
sns.boxplot(data=df, x="group", y="value")
pd.crosstab(df["a"], df["b"])
\`\`\`

EDA 결과는 반드시 문장으로 정리해야 합니다.

\`\`\`text
무엇을 발견했는가?
어떤 점이 이상한가?
무엇을 추가로 확인해야 하는가?
이 분석의 한계는 무엇인가?
\`\`\`

EDA는 데이터 분석의 중심 과정입니다.  
지금까지 배운 전처리, 집계, 통계, 시각화는 모두 EDA 안에서 연결되어 사용됩니다.

---
`;export{e as default};