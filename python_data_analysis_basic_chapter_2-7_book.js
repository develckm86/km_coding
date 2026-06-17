var e=`<!-- 원본: python_data_analysis_basic_chapter_2_book.md / 세부 장: 2-7 -->

# 2.7 환경 점검 실습

이제 지금까지 준비한 환경이 제대로 동작하는지 확인해 보자.

---

## 2.7.1 Python 버전 확인

터미널에서 다음 명령을 실행한다.

\`\`\`bash
python --version
\`\`\`

또는 환경에 따라 다음 명령을 사용할 수 있다.

\`\`\`bash
python3 --version
\`\`\`

버전이 출력되면 파이썬이 정상적으로 설치되어 있는 것이다.

---

## 2.7.2 pip 버전 확인

\`\`\`bash
python -m pip --version
\`\`\`

이 명령은 현재 파이썬 환경에서 사용하는 pip 정보를 보여 준다.

---

## 2.7.3 가상환경 확인

가상환경이 활성화되어 있는지 확인한다.

터미널 앞에 \`(.venv)\`가 보이면 활성화된 상태일 가능성이 높다.

\`\`\`text
(.venv) data_analysis_project $
\`\`\`

파이썬 실행 위치를 확인할 수도 있다.

Windows에서는 다음 명령을 사용할 수 있다.

\`\`\`powershell
where python
\`\`\`

macOS 또는 Linux에서는 다음 명령을 사용할 수 있다.

\`\`\`bash
which python
\`\`\`

경로 안에 \`.venv\`가 포함되어 있으면 가상환경의 파이썬을 사용하고 있는 것이다.

---

## 2.7.4 라이브러리 import 확인

새 노트북 또는 파이썬 파일에서 다음 코드를 실행한다.

\`\`\`python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

print("NumPy:", np.__version__)
print("pandas:", pd.__version__)
print("환경 준비 완료")
\`\`\`

에러 없이 버전 정보와 메시지가 출력되면 데이터 분석 기본 환경이 준비된 것이다.

---

## 2.7.5 Jupyter에서 데이터 읽기 확인

앞에서 만든 \`orders_sample.csv\` 파일을 pandas로 읽어 본다.

아직 pandas를 자세히 배우지는 않았지만, 환경 확인을 위해 간단히 실행해 보자.

\`\`\`python
import pandas as pd

orders = pd.read_csv("data/raw/orders_sample.csv")
orders.head()
\`\`\`

표 형태로 데이터가 보이면 정상이다.

만약 파일을 찾을 수 없다는 에러가 발생하면 다음을 확인한다.

- 현재 노트북이 프로젝트 루트 폴더에서 실행되고 있는가?
- \`data/raw/orders_sample.csv\` 경로가 실제로 존재하는가?
- 파일 이름에 오타가 없는가?
- 확장자가 \`.csv\`인지 확인했는가?

---

## 2.7.6 첫 그래프 확인

그래프 출력도 확인해 보자.

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt

orders = pd.read_csv("data/raw/orders_sample.csv")
orders["amount"] = orders["quantity"] * orders["price"]

category_sales = orders.groupby("category")["amount"].sum()

category_sales.plot(kind="bar")
plt.title("Category Sales")
plt.xlabel("Category")
plt.ylabel("Sales")
plt.show()
\`\`\`

그래프가 출력되면 분석 환경이 정상적으로 작동하고 있는 것이다.

한글이 그래프에서 깨져 보일 수 있다.  
한글 폰트 설정은 운영체제마다 다르기 때문에 시각화 장에서 별도로 다룬다.  
지금은 그래프가 출력되는지 확인하는 것이 목표다.

---
`;export{e as default};