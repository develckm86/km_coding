var e=`# 1장. 고급 분석 프로젝트 시작하기

## 1.10 기본 데이터 로딩 함수 만들기

실무 프로젝트에서는 같은 데이터를 여러 번 불러오게 됩니다.  
이때 매번 \`pd.read_csv()\`를 직접 쓰기보다 함수를 만들어두면 편리합니다.

---

### 1.10.1 단순 로딩 함수

\`\`\`python
def load_csv(file_path: Path) -> pd.DataFrame:
    return pd.read_csv(file_path)
\`\`\`

사용 예:

\`\`\`python
orders = load_csv(DATA_RAW / "orders_sample.csv")

orders.head()
\`\`\`

---

### 1.10.2 데이터별 로딩 함수

데이터별로 함수를 나눌 수도 있습니다.

\`\`\`python
def load_orders(data_dir: Path) -> pd.DataFrame:
    return pd.read_csv(data_dir / "orders_sample.csv")

def load_customers(data_dir: Path) -> pd.DataFrame:
    return pd.read_csv(data_dir / "customers_sample.csv")

def load_products(data_dir: Path) -> pd.DataFrame:
    return pd.read_csv(data_dir / "products_sample.csv")
\`\`\`

사용 예:

\`\`\`python
orders = load_orders(DATA_RAW)
customers = load_customers(DATA_RAW)
products = load_products(DATA_RAW)
\`\`\`

이런 함수는 이후 자동화 과정에서 유용합니다.

---

### 1.10.3 로딩 후 기본 확인 함수

데이터를 불러온 뒤 기본 정보를 확인하는 함수도 만들 수 있습니다.

\`\`\`python
def check_dataframe(df: pd.DataFrame, name: str = "DataFrame") -> None:
    print(f"[{name}]")
    print("shape:", df.shape)
    print("columns:", list(df.columns))
    print()
    print(df.info())
\`\`\`

사용 예:

\`\`\`python
check_dataframe(orders, "orders")
\`\`\`

이 함수는 다음 정보를 보여줍니다.

\`\`\`text
데이터 이름
행과 열 개수
컬럼 목록
자료형과 결측치 정보
\`\`\`

고급 과정에서는 이런 작은 유틸리티 함수를 직접 만들어 사용합니다.

---
`;export{e as default};