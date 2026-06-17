var e=`<!-- 원본: python_data_analysis_basic_chapter_17_book.md / 세부 장: 17-4 -->

# 17.4 matplotlib 기초

matplotlib은 파이썬 시각화의 기본 도구입니다.

일반적으로 다음과 같이 불러옵니다.

\`\`\`python
import matplotlib.pyplot as plt
\`\`\`

\`plt\`는 matplotlib의 pyplot 모듈을 줄여 부르는 관례적인 이름입니다.

---

### 17.4.1 가장 간단한 선 그래프

\`\`\`python
plt.plot(monthly_sales["year_month"], monthly_sales["total_sales"])
plt.show()
\`\`\`

\`plt.plot()\`은 선 그래프를 그립니다.  
첫 번째 값은 x축, 두 번째 값은 y축에 해당합니다.

---

### 17.4.2 제목과 축 이름 추가

그래프에는 제목과 축 이름을 붙이는 것이 좋습니다.

\`\`\`python
plt.plot(monthly_sales["year_month"], monthly_sales["total_sales"])

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")

plt.show()
\`\`\`

제목과 축 이름이 없으면 그래프를 보는 사람이 무엇을 의미하는지 이해하기 어렵습니다.

---

### 17.4.3 그래프 크기 조정

그래프 크기는 \`plt.figure(figsize=(가로, 세로))\`로 조정할 수 있습니다.

\`\`\`python
plt.figure(figsize=(8, 4))

plt.plot(monthly_sales["year_month"], monthly_sales["total_sales"])

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")

plt.show()
\`\`\`

그래프가 너무 작으면 글자가 겹치고 해석하기 어렵습니다.  
보고서나 발표 자료에서는 적절한 크기로 조정하는 것이 좋습니다.

---

### 17.4.4 범례 추가

여러 선을 함께 그릴 때는 범례가 필요합니다.

\`\`\`python
plt.figure(figsize=(8, 4))

plt.plot(monthly_sales["year_month"], monthly_sales["total_sales"], label="매출")
plt.plot(monthly_sales["year_month"], monthly_sales["order_count"], label="주문 수")

plt.title("월별 매출과 주문 수")
plt.xlabel("월")
plt.ylabel("값")
plt.legend()

plt.show()
\`\`\`

다만 서로 단위가 크게 다른 값을 같은 y축에 그리면 해석이 어려울 수 있습니다.  
예를 들어 매출은 수십만 원이고 주문 수는 몇 건이면 같은 축에서 비교하기 어렵습니다.

기초 과정에서는 여러 값을 한 그래프에 넣기보다, 필요하면 그래프를 따로 그리는 것이 좋습니다.

---

### 17.4.5 그래프 저장하기

그래프를 파일로 저장하려면 \`plt.savefig()\`를 사용합니다.

\`\`\`python
plt.figure(figsize=(8, 4))

plt.plot(monthly_sales["year_month"], monthly_sales["total_sales"])

plt.title("월별 매출 추이")
plt.xlabel("월")
plt.ylabel("매출")

plt.savefig("monthly_sales.png", bbox_inches="tight")
plt.show()
\`\`\`

\`bbox_inches="tight"\`는 그래프의 여백을 적절히 조정해 저장할 때 유용합니다.

실무에서는 분석 결과 그래프를 이미지 파일로 저장해 보고서나 문서에 넣는 경우가 많습니다.

---
`;export{e as default};