var e=`<!-- 원본: python_data_analysis_basic_chapter_17_book.md / 세부 장: 17-2 -->

# 17.2 파이썬 시각화 도구

파이썬 데이터 분석에서 자주 사용하는 시각화 도구는 다음과 같습니다.

\`\`\`text
matplotlib
pandas plot
seaborn
\`\`\`

---

### 17.2.1 matplotlib

matplotlib은 파이썬의 대표적인 시각화 라이브러리입니다.

가장 기본적인 시각화 도구이며, 많은 다른 시각화 라이브러리가 matplotlib을 기반으로 동작합니다.

보통 다음처럼 사용합니다.

\`\`\`python
import matplotlib.pyplot as plt
\`\`\`

matplotlib은 세밀한 설정이 가능하다는 장점이 있습니다.  
그래프 제목, 축 이름, 범례, 크기, 눈금, 저장 등 다양한 요소를 직접 조정할 수 있습니다.

기초 과정에서는 matplotlib의 모든 기능을 외울 필요는 없습니다.  
다음 정도를 익히면 충분합니다.

\`\`\`python
plt.plot()
plt.bar()
plt.hist()
plt.scatter()
plt.boxplot()
plt.title()
plt.xlabel()
plt.ylabel()
plt.legend()
plt.show()
\`\`\`

---

### 17.2.2 pandas plot

pandas는 DataFrame과 Series에서 바로 그래프를 그릴 수 있는 \`plot()\` 기능을 제공합니다.

\`\`\`python
df.plot()
df["column"].plot(kind="hist")
\`\`\`

pandas plot은 내부적으로 matplotlib을 사용합니다.  
따라서 간단한 그래프를 빠르게 그릴 때 편리합니다.

예를 들어 월별 매출 데이터가 DataFrame에 있을 때 다음처럼 바로 그래프를 그릴 수 있습니다.

\`\`\`python
monthly_sales.plot(x="month", y="sales", kind="line")
\`\`\`

pandas plot은 데이터프레임과 바로 연결되어 있어서 기초 분석에 매우 유용합니다.

---

### 17.2.3 seaborn

seaborn은 통계적 시각화에 편리한 라이브러리입니다.

보통 다음처럼 사용합니다.

\`\`\`python
import seaborn as sns
\`\`\`

seaborn은 pandas DataFrame과 잘 어울립니다.  
컬럼명을 직접 지정해 그래프를 그릴 수 있습니다.

\`\`\`python
sns.barplot(data=df, x="category", y="sales")
sns.scatterplot(data=df, x="visit_count", y="total_price")
\`\`\`

기초 과정에서는 seaborn의 모든 그래프를 깊게 다루지 않습니다.  
다만 다음 그래프를 간단히 사용해봅니다.

\`\`\`python
sns.barplot()
sns.histplot()
sns.boxplot()
sns.scatterplot()
sns.heatmap()
\`\`\`

seaborn은 그래프를 편하게 그릴 수 있지만, 그래프의 의미를 이해하지 못하면 잘못 해석할 수 있습니다.  
따라서 이 장에서는 그래프를 그리는 법뿐 아니라 어떤 그래프를 언제 써야 하는지도 함께 다룹니다.

---
`;export{e as default};