var e=`<!-- 원본: python_data_analysis_basic_chapter_4_book.md / 세부 장: 4-5 -->

# 4.5 pandas 기본 출력 설정

## 4.5.1 출력 설정이 필요한 이유

데이터가 작을 때는 DataFrame을 출력해도 문제가 없다. 하지만 행이 수천 개, 열이 수십 개가 되면 전체 데이터를 한 번에 출력하기 어렵다.

pandas는 기본적으로 너무 큰 DataFrame을 전부 보여 주지 않고 중간을 생략한다.

예를 들어 행이 많은 DataFrame을 출력하면 다음처럼 보일 수 있다.

\`\`\`text
      name  score
0      ...    ...
1      ...    ...
...    ...    ...
999    ...    ...
\`\`\`

이때 출력 설정을 조정하면 한 번에 보여 줄 행 개수, 열 개수, 소수점 표시 방식 등을 바꿀 수 있다.

출력 설정은 분석 결과 자체를 바꾸는 것이 아니라 **화면에 보이는 방식만 바꾸는 것**이다.

---

## 4.5.2 표시할 최대 행 개수 설정

표시할 최대 행 개수는 \`pd.set_option()\`으로 설정할 수 있다.

\`\`\`python
import pandas as pd

pd.set_option("display.max_rows", 20)
\`\`\`

위 코드는 DataFrame을 출력할 때 최대 20개 행까지 표시하도록 설정한다.

현재 설정값을 확인하려면 다음처럼 작성한다.

\`\`\`python
print(pd.get_option("display.max_rows"))
\`\`\`

설정을 기본값으로 되돌리려면 다음처럼 작성한다.

\`\`\`python
pd.reset_option("display.max_rows")
\`\`\`

---

## 4.5.3 표시할 최대 열 개수 설정

표시할 최대 열 개수는 \`display.max_columns\`로 설정한다.

\`\`\`python
pd.set_option("display.max_columns", 30)
\`\`\`

열이 많은 데이터를 분석할 때 유용하다. 예를 들어 설문 데이터처럼 컬럼이 매우 많은 경우 기본 설정에서는 일부 열이 생략될 수 있다.

기본값으로 되돌리려면 다음처럼 작성한다.

\`\`\`python
pd.reset_option("display.max_columns")
\`\`\`

---

## 4.5.4 소수점 표시 설정

분석 결과에 소수점이 너무 길게 표시되면 읽기 어렵다. 이때 소수점 표시 방식을 설정할 수 있다.

\`\`\`python
pd.set_option("display.float_format", "{:.2f}".format)
\`\`\`

위 설정은 실수를 소수점 둘째 자리까지 표시한다.

예를 들어 다음 DataFrame을 보자.

\`\`\`python
import pandas as pd

scores = pd.DataFrame({
    "name": ["김민수", "이지영", "박철수"],
    "average": [87.12345, 92.56789, 78.33333],
})

print(scores)
\`\`\`

소수점 표시 설정을 적용하면 평균 점수가 더 읽기 쉽게 표시된다.

설정을 해제하려면 다음처럼 작성한다.

\`\`\`python
pd.reset_option("display.float_format")
\`\`\`

주의할 점은 이 설정이 실제 값을 반올림해서 바꾸는 것이 아니라, 화면에 보이는 방식만 바꾼다는 것이다.

---

## 4.5.5 출력 설정을 사용할 때 주의할 점

출력 설정은 편리하지만 남용하면 안 된다.

특히 다음 점을 기억해야 한다.

첫째, 출력 설정은 실제 데이터 값을 바꾸지 않는다.  
둘째, Notebook 전체에 영향을 줄 수 있다.  
셋째, 분석 결과를 공유할 때는 설정 때문에 출력이 다르게 보일 수 있다.  
넷째, 필요할 때만 설정하고 기본값으로 되돌리는 습관이 좋다.

초보 단계에서는 다음 정도만 알아도 충분하다.

\`\`\`python
pd.set_option("display.max_rows", 20)
pd.set_option("display.max_columns", 20)
pd.set_option("display.float_format", "{:.2f}".format)
\`\`\`

그리고 필요하면 다음처럼 기본값으로 되돌린다.

\`\`\`python
pd.reset_option("display.max_rows")
pd.reset_option("display.max_columns")
pd.reset_option("display.float_format")
\`\`\`

---
`;export{e as default};