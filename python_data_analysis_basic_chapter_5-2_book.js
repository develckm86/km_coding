var e=`<!-- 원본: python_data_analysis_basic_chapter_5_book.md / 세부 장: 5-2 -->

# 5.2 Excel 파일 불러오기

## 5.2.1 Excel 파일과 pandas

Excel 파일은 실무에서 가장 자주 만나는 데이터 형식 중 하나다. 많은 부서에서 고객 명단, 매출 내역, 재고 현황, 설문 결과를 Excel 파일로 관리한다.

pandas에서는 \`pd.read_excel()\`을 사용해 Excel 파일을 DataFrame으로 불러올 수 있다.

CSV와 Excel의 가장 큰 차이는 다음과 같다.

| 구분 | CSV | Excel |
|---|---|---|
| 파일 형식 | 텍스트 파일 | 스프레드시트 파일 |
| 확장자 | \`.csv\` | \`.xlsx\`, \`.xls\` |
| 시트 | 없음 | 여러 시트 가능 |
| 서식 | 거의 없음 | 글꼴, 색상, 셀 병합 등 가능 |
| 데이터 처리 | 단순하고 빠름 | 구조가 복잡할 수 있음 |

분석에 가장 적합한 형태는 보통 깔끔한 표 구조다. Excel 파일은 사람이 보기 좋게 꾸며져 있는 경우가 많지만, 데이터 분석에는 오히려 불편할 수 있다. 셀 병합, 여러 줄 제목, 중간 합계 행, 빈 행이 많은 Excel 파일은 분석 전에 정리가 필요하다.

---

## 5.2.2 Excel 읽기 준비

Excel 파일을 읽으려면 보통 \`openpyxl\` 라이브러리가 필요하다. 2장에서 분석 환경을 준비할 때 설치했다면 바로 사용할 수 있다.

설치되어 있지 않다면 터미널에서 다음 명령어로 설치한다.

\`\`\`bash
pip install openpyxl
\`\`\`

이 장에서 사용할 Excel 파일을 만들어 보자.

\`\`\`python
import pandas as pd

customers = pd.DataFrame({
    "customer_id": [1, 2, 3, 4, 5],
    "name": ["김민수", "이지영", "박철수", "최유진", "정다은"],
    "grade": ["VIP", "BASIC", "GOLD", "VIP", "BASIC"],
    "region": ["서울", "부산", "대구", "서울", "광주"],
})

customers.to_excel("customers.xlsx", index=False)
\`\`\`

위 코드를 실행하면 현재 작업 폴더에 \`customers.xlsx\` 파일이 생성된다.

---

## 5.2.3 \`read_excel()\` 기본 사용법

Excel 파일을 불러올 때는 \`pd.read_excel()\`을 사용한다.

\`\`\`python
import pandas as pd

customers = pd.read_excel("customers.xlsx")
print(customers)
\`\`\`

실행 결과는 다음과 비슷하다.

\`\`\`text
   customer_id name  grade region
0            1  김민수    VIP     서울
1            2  이지영  BASIC     부산
2            3  박철수   GOLD     대구
3            4  최유진    VIP     서울
4            5  정다은  BASIC     광주
\`\`\`

\`read_excel()\`도 \`read_csv()\`와 마찬가지로 DataFrame을 반환한다. 따라서 불러온 뒤에는 DataFrame의 모든 기능을 사용할 수 있다.

\`\`\`python
print(customers.head())
print(customers.info())
\`\`\`

---

## 5.2.4 시트 선택하기

Excel 파일은 여러 개의 시트를 가질 수 있다. 예를 들어 하나의 파일 안에 고객 정보 시트와 주문 정보 시트가 함께 있을 수 있다.

다음 코드는 여러 시트가 있는 Excel 파일을 만든다.

\`\`\`python
import pandas as pd

customers = pd.DataFrame({
    "customer_id": [1, 2, 3],
    "name": ["김민수", "이지영", "박철수"],
    "grade": ["VIP", "BASIC", "GOLD"],
})

orders = pd.DataFrame({
    "order_id": [1001, 1002, 1003],
    "customer_id": [1, 2, 1],
    "product": ["노트북", "마우스", "키보드"],
    "amount": [1200000, 50000, 45000],
})

with pd.ExcelWriter("shop_data.xlsx") as writer:
    customers.to_excel(writer, sheet_name="customers", index=False)
    orders.to_excel(writer, sheet_name="orders", index=False)
\`\`\`

특정 시트를 읽으려면 \`sheet_name\` 옵션을 사용한다.

\`\`\`python
customers = pd.read_excel("shop_data.xlsx", sheet_name="customers")
orders = pd.read_excel("shop_data.xlsx", sheet_name="orders")

print(customers)
print(orders)
\`\`\`

시트 이름 대신 시트 번호를 사용할 수도 있다. 첫 번째 시트는 0번이다.

\`\`\`python
first_sheet = pd.read_excel("shop_data.xlsx", sheet_name=0)
\`\`\`

여러 시트를 한 번에 읽을 수도 있다.

\`\`\`python
sheets = pd.read_excel("shop_data.xlsx", sheet_name=None)
\`\`\`

이 경우 \`sheets\`는 DataFrame 하나가 아니라 딕셔너리다. key는 시트 이름이고, value는 해당 시트의 DataFrame이다.

\`\`\`python
print(sheets.keys())
print(sheets["customers"])
\`\`\`

기초 과정에서는 우선 \`sheet_name\`으로 필요한 시트를 정확히 선택하는 정도를 익히면 충분하다.

---

## 5.2.5 Excel 파일에서 필요한 행과 열만 읽기

Excel 파일도 CSV 파일처럼 필요한 컬럼만 읽을 수 있다.

\`\`\`python
customers = pd.read_excel(
    "customers.xlsx",
    usecols=["customer_id", "name", "grade"]
)
\`\`\`

앞부분 몇 행만 읽고 싶다면 \`nrows\`를 사용할 수 있다.

\`\`\`python
sample = pd.read_excel("customers.xlsx", nrows=3)
\`\`\`

앞의 불필요한 행을 건너뛰고 싶다면 \`skiprows\`를 사용할 수 있다.

\`\`\`python
customers = pd.read_excel("customers_with_title.xlsx", skiprows=2)
\`\`\`

실무 Excel 파일에는 다음과 같은 형태가 많다.

\`\`\`text
2026년 1월 고객 명단
작성자: 영업관리팀

customer_id | name | grade | region
1           | 김민수 | VIP   | 서울
2           | 이지영 | BASIC | 부산
\`\`\`

이런 파일을 바로 읽으면 제목과 작성자 줄 때문에 컬럼이 잘못 인식될 수 있다. 실제 데이터가 몇 번째 줄부터 시작하는지 확인하고 \`skiprows\`를 적절히 사용해야 한다.

---

## 5.2.6 Excel 파일을 읽을 때 주의할 점

Excel 파일은 사람이 보기 좋게 만든 문서일 때가 많다. 하지만 데이터 분석에는 다음과 같은 구조가 불편하다.

- 셀 병합이 많다.
- 제목 행이 여러 줄이다.
- 중간에 빈 행이 많다.
- 중간 합계 행이 포함되어 있다.
- 하나의 시트에 여러 표가 있다.
- 숫자와 문자가 섞여 있다.
- 날짜가 문자열로 저장되어 있다.

분석에 좋은 Excel 데이터는 다음과 같은 형태다.

\`\`\`text
첫 번째 행: 컬럼명
두 번째 행부터: 실제 데이터
하나의 열: 하나의 의미
하나의 행: 하나의 관측값 또는 기록
셀 병합 없음
중간 합계 행 없음
빈 행 최소화
\`\`\`

Excel 파일을 불러온 뒤에는 먼저 \`head()\`, \`info()\`, \`columns\`, \`shape\`를 확인해야 한다.

\`\`\`python
customers = pd.read_excel("customers.xlsx")

print(customers.head())
print(customers.shape)
print(customers.columns)
print(customers.info())
\`\`\`

파일을 불러오는 것 자체보다, **제대로 불러왔는지 확인하는 습관**이 더 중요하다.

---
`;export{e as default};