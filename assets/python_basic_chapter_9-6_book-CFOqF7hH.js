var e=`<!-- 원본: python_basic_chapter_9_book.md / 세부 장: 9-6 -->

# 9.6 대표 외부 라이브러리 소개

### 9.6.1 \`requests\`

\`requests\`는 HTTP 요청을 보내는 데 사용하는 대표적인 라이브러리입니다.

API에서 데이터를 가져오거나, 웹 서버에 요청을 보낼 때 자주 사용합니다.

설치 명령은 다음과 같습니다.

\`\`\`bash
python -m pip install requests
\`\`\`

기본 사용 예시는 다음과 같습니다.

\`\`\`python
import requests

response = requests.get("https://example.com")

print(response.status_code)
print(response.text[:100])
\`\`\`

위 코드에서 \`requests.get()\`은 지정한 주소로 GET 요청을 보냅니다. 결과는 \`response\` 객체에 들어갑니다.

자주 사용하는 속성과 메서드는 다음과 같습니다.

| 사용법 | 의미 |
|---|---|
| \`response.status_code\` | 응답 상태 코드 |
| \`response.text\` | 응답 본문을 문자열로 확인 |
| \`response.json()\` | JSON 응답을 파이썬 데이터로 변환 |
| \`response.headers\` | 응답 헤더 확인 |

예를 들어 JSON API를 호출한다면 다음처럼 사용할 수 있습니다.

\`\`\`python
import requests

url = "https://api.example.com/users"
response = requests.get(url)

data = response.json()
print(data)
\`\`\`

다만 실제 API 주소는 서비스마다 다릅니다. API를 사용할 때는 해당 서비스의 문서를 확인해야 합니다.

\`requests\`는 11장에서 API 데이터 가져오기를 배울 때 다시 자세히 사용합니다.

---

### 9.6.2 \`pandas\`

\`pandas\`는 표 형태 데이터를 다루는 데 사용하는 대표적인 라이브러리입니다.

엑셀, CSV, 데이터베이스에서 가져온 데이터를 정리하고 분석할 때 많이 사용합니다.

설치 명령은 다음과 같습니다.

\`\`\`bash
python -m pip install pandas
\`\`\`

기본 사용 예시는 다음과 같습니다.

\`\`\`python
import pandas as pd

data = {
    "name": ["키보드", "마우스", "모니터"],
    "price": [30000, 15000, 200000],
}

df = pd.DataFrame(data)
print(df)
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
  name   price
0  키보드   30000
1  마우스   15000
2  모니터  200000
\`\`\`

\`pandas\`에서 가장 중요한 개념은 \`DataFrame\`입니다. \`DataFrame\`은 행과 열로 이루어진 표 형태 데이터입니다. 엑셀 시트와 비슷하다고 생각하면 이해하기 쉽습니다.

CSV 파일을 읽는 예시는 다음과 같습니다.

\`\`\`python
import pandas as pd

df = pd.read_csv("sales.csv")
print(df.head())
\`\`\`

엑셀 파일을 읽는 예시는 다음과 같습니다.

\`\`\`python
import pandas as pd

df = pd.read_excel("sales.xlsx")
print(df.head())
\`\`\`

\`pandas\`는 11장에서 데이터 처리 기초를 배울 때 본격적으로 다룹니다.

---

### 9.6.3 \`openpyxl\`

\`openpyxl\`은 엑셀 파일을 읽고 쓰는 데 사용하는 라이브러리입니다.

\`pandas\`도 엑셀 파일을 읽을 수 있지만, \`openpyxl\`은 셀 단위로 값을 읽고 쓰거나 엑셀 파일의 시트, 셀, 서식 등을 다룰 때 유용합니다.

설치 명령은 다음과 같습니다.

\`\`\`bash
python -m pip install openpyxl
\`\`\`

기본 사용 예시는 다음과 같습니다.

\`\`\`python
from openpyxl import Workbook

workbook = Workbook()
sheet = workbook.active

sheet["A1"] = "상품명"
sheet["B1"] = "가격"
sheet["A2"] = "키보드"
sheet["B2"] = 30000

workbook.save("products.xlsx")
\`\`\`

위 코드는 새 엑셀 파일을 만들고, 셀에 값을 입력한 뒤 \`products.xlsx\`로 저장합니다.

기존 엑셀 파일을 읽을 때는 다음처럼 사용할 수 있습니다.

\`\`\`python
from openpyxl import load_workbook

workbook = load_workbook("products.xlsx")
sheet = workbook.active

print(sheet["A1"].value)
print(sheet["B2"].value)
\`\`\`

\`openpyxl\`은 10장에서 엑셀 파일 다루기를 배울 때 다시 사용합니다.

---

### 9.6.4 \`beautifulsoup4\`

\`beautifulsoup4\`는 HTML이나 XML 문서를 분석해서 원하는 정보를 찾을 때 사용하는 라이브러리입니다.

웹 페이지에서 제목, 링크, 특정 태그의 텍스트를 추출할 때 자주 사용합니다.

설치 명령은 다음과 같습니다.

\`\`\`bash
python -m pip install beautifulsoup4
\`\`\`

설치 이름은 \`beautifulsoup4\`이지만, 코드에서는 보통 \`bs4\`에서 \`BeautifulSoup\`을 가져옵니다.

\`\`\`python
from bs4 import BeautifulSoup

html = """
<html>
  <body>
    <h1>공지사항</h1>
    <a href="https://example.com">자세히 보기</a>
  </body>
</html>
"""

soup = BeautifulSoup(html, "html.parser")

print(soup.find("h1").text)
print(soup.find("a")["href"])
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
공지사항
https://example.com
\`\`\`

웹 크롤링을 할 때는 단순히 기술적으로 가능하다고 해서 아무 사이트나 수집하면 안 됩니다. 사이트의 이용 약관, robots.txt, 저작권, 개인정보, 서버 부하 등을 고려해야 합니다.

이 수업에서는 \`beautifulsoup4\`를 대표 라이브러리로 소개만 하고, 본격적인 크롤링은 별도 수업에서 다루는 것이 좋습니다.

---

### 9.6.5 \`pytest\`

\`pytest\`는 파이썬 코드를 테스트하는 데 사용하는 라이브러리입니다.

함수가 의도대로 동작하는지 자동으로 확인할 수 있습니다.

설치 명령은 다음과 같습니다.

\`\`\`bash
python -m pip install pytest
\`\`\`

예를 들어 다음과 같은 함수가 있다고 해봅시다.

\`\`\`python
# calculator.py

def add(a, b):
    return a + b
\`\`\`

이 함수를 테스트하는 파일을 만들 수 있습니다.

\`\`\`python
# test_calculator.py

from calculator import add


def test_add():
    assert add(2, 3) == 5
\`\`\`

터미널에서 다음 명령을 실행합니다.

\`\`\`bash
pytest
\`\`\`

테스트가 통과하면 성공 메시지가 출력됩니다. 테스트가 실패하면 어떤 값이 예상과 달랐는지 알려줍니다.

\`pytest\`는 13장에서 테스트와 코드 검증을 배울 때 자세히 다룹니다.

---

### 9.6.6 대표 라이브러리 용도 정리

이 장에서 소개한 라이브러리를 정리하면 다음과 같습니다.

| 라이브러리 | 주 용도 | 나중에 자세히 다룰 장 |
|---|---|---|
| \`requests\` | API 요청, HTTP 통신 | 11장 |
| \`pandas\` | 표 형태 데이터 처리 | 11장 |
| \`openpyxl\` | 엑셀 파일 읽기와 쓰기 | 10장 |
| \`beautifulsoup4\` | HTML 문서 분석 | 별도 크롤링 수업 또는 심화 |
| \`pytest\` | 테스트 자동화 | 13장 |

지금 단계에서 모든 라이브러리의 사용법을 완전히 외울 필요는 없습니다. 중요한 것은 어떤 문제에 어떤 도구가 자주 쓰이는지 감을 잡는 것입니다.

---
`;export{e as default};