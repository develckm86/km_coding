var e=`<!-- 원본: python_data_analysis_basic_chapter_17_book.md / 세부 장: 17-23 -->

# 17.23 핵심 정리

이번 장에서는 데이터 시각화의 기초를 배웠습니다.

시각화는 데이터를 더 잘 이해하고 전달하기 위한 도구입니다.  
통계값이 데이터를 숫자로 요약한다면, 그래프는 데이터의 흐름, 비교, 분포, 관계를 시각적으로 보여줍니다.

파이썬 데이터 분석에서 자주 사용하는 시각화 도구는 다음과 같습니다.

\`\`\`python
import matplotlib.pyplot as plt
import seaborn as sns
\`\`\`

pandas에서도 \`plot()\`을 사용해 간단한 그래프를 빠르게 그릴 수 있습니다.

\`\`\`python
df.plot()
df["column"].plot(kind="hist")
\`\`\`

그래프 선택 기준은 다음과 같습니다.

| 목적 | 그래프 |
|---|---|
| 시간 흐름 확인 | 선 그래프 |
| 범주별 크기 비교 | 막대 그래프 |
| 수치형 분포 확인 | 히스토그램 |
| 그룹별 분포 비교 | 박스플롯 |
| 두 수치형 변수 관계 확인 | 산점도 |
| 여러 변수 상관관계 확인 | 히트맵 |

matplotlib에서는 다음과 같은 기본 함수를 사용합니다.

\`\`\`python
plt.plot()
plt.bar()
plt.hist()
plt.scatter()
plt.title()
plt.xlabel()
plt.ylabel()
plt.show()
\`\`\`

seaborn에서는 DataFrame과 컬럼명을 직접 사용해 그래프를 그릴 수 있습니다.

\`\`\`python
sns.barplot(data=df, x="category", y="sales")
sns.histplot(data=df, x="sales")
sns.boxplot(data=df, x="grade", y="sales")
sns.scatterplot(data=df, x="visit_count", y="sales")
sns.heatmap(corr_matrix, annot=True)
\`\`\`

좋은 그래프에는 제목, 축 이름, 단위, 적절한 정렬, 명확한 해석이 필요합니다.  
그래프를 만들 때는 “무엇을 보여주려는가?”를 먼저 생각해야 합니다.

그래프는 분석 결과를 전달하는 도구이지만, 원인을 증명하는 도구는 아닙니다.  
그래프에서 보이는 패턴은 추가 분석 질문으로 이어져야 합니다.

---
`;export{e as default};