var e=`<!-- 원본: python_basic_chapter_8_book.md / 세부 장: 8-4 -->

# 8.4 패키지 구조 기초

모듈이 많아지면 파일이 너무 많아집니다. 이때 관련 모듈을 폴더 단위로 묶을 수 있습니다. 이렇게 묶은 구조를 패키지라고 합니다.

---

### 8.4.1 패키지란 무엇인가

패키지는 여러 모듈을 모아 놓은 폴더입니다.

예를 들어 다음 구조를 보겠습니다.

\`\`\`text
project/
  main.py
  utils/
    date_utils.py
    price_utils.py
\`\`\`

여기서 \`utils\` 폴더는 관련 기능을 모아둔 폴더입니다. \`date_utils.py\`와 \`price_utils.py\`는 각각 모듈입니다.

패키지를 사용하면 많은 모듈을 역할별로 정리할 수 있습니다.

예를 들어 쇼핑몰 주문 처리 프로그램은 다음처럼 나눌 수 있습니다.

\`\`\`text
project/
  main.py
  models/
    customer.py
    product.py
    order.py
  services/
    order_service.py
    payment_service.py
  utils/
    date_utils.py
    price_utils.py
\`\`\`

폴더 이름만 봐도 대략적인 역할을 알 수 있습니다.

\`\`\`text
models    데이터 구조를 표현하는 클래스
services  주요 기능과 비즈니스 로직
utils     여러 곳에서 쓰는 보조 함수
\`\`\`

---

### 8.4.2 모듈과 패키지의 차이

모듈과 패키지의 차이를 간단히 정리하면 다음과 같습니다.

| 구분 | 의미 | 예시 |
|---|---|---|
| 모듈 | 하나의 \`.py\` 파일 | \`calculator.py\` |
| 패키지 | 여러 모듈을 담은 폴더 | \`utils/\`, \`models/\` |

모듈은 파일이고, 패키지는 폴더입니다.

물론 패키지 안에는 여러 모듈이 들어갈 수 있고, 패키지 안에 또 다른 패키지를 넣을 수도 있습니다.

\`\`\`text
project/
  app/
    models/
      user.py
      order.py
    services/
      user_service.py
      order_service.py
\`\`\`

처음부터 너무 복잡한 구조로 시작할 필요는 없습니다. 작은 프로젝트에서는 파일 몇 개만으로 충분합니다. 하지만 코드가 많아지면 패키지 구조가 필요해집니다.

---

### 8.4.3 \`__init__.py\`의 개념

패키지 폴더 안에는 \`__init__.py\`라는 파일을 둘 수 있습니다.

\`\`\`text
project/
  main.py
  utils/
    __init__.py
    date_utils.py
    price_utils.py
\`\`\`

\`__init__.py\`는 해당 폴더를 패키지로 사용할 때 관련된 초기 설정을 작성할 수 있는 파일입니다.

기초 단계에서는 \`__init__.py\`를 비워 두어도 괜찮습니다.

\`\`\`python
# utils/__init__.py
\`\`\`

비어 있는 파일이어도 패키지 구조를 명확하게 보여주는 역할을 합니다.

패키지 안의 모듈을 가져올 때는 점을 사용합니다.

\`\`\`python
from utils.price_utils import format_price

print(format_price(30000))
\`\`\`

여기서 \`utils.price_utils\`는 \`utils\` 패키지 안의 \`price_utils\` 모듈을 의미합니다.

---

### 8.4.4 패키지 안의 모듈 import하기

다음과 같은 구조를 생각해봅시다.

\`\`\`text
project/
  main.py
  utils/
    __init__.py
    price_utils.py
\`\`\`

\`price_utils.py\`에는 다음 코드가 있습니다.

\`\`\`python
# utils/price_utils.py

def format_price(price):
    return f"{price:,.0f}원"
\`\`\`

\`main.py\`에서는 다음처럼 가져와 사용할 수 있습니다.

\`\`\`python
# main.py

from utils.price_utils import format_price

print(format_price(30000))
\`\`\`

실행 결과는 다음과 같습니다.

\`\`\`text
30,000원
\`\`\`

모듈 전체를 가져오는 방식도 가능합니다.

\`\`\`python
# main.py

import utils.price_utils

print(utils.price_utils.format_price(30000))
\`\`\`

하지만 이름이 길어질 수 있습니다. 그래서 필요한 함수만 가져오거나 별칭을 사용할 수 있습니다.

\`\`\`python
import utils.price_utils as price_utils

print(price_utils.format_price(30000))
\`\`\`

---

### 8.4.5 기능별 폴더 나누기

실무 프로젝트에서는 파일을 역할별 폴더로 나누는 경우가 많습니다.

예를 들어 다음과 같은 구조를 사용할 수 있습니다.

\`\`\`text
project/
  main.py
  config.py
  models/
    __init__.py
    customer.py
    product.py
    order.py
  services/
    __init__.py
    order_service.py
    report_service.py
  utils/
    __init__.py
    date_utils.py
    file_utils.py
    price_utils.py
\`\`\`

각 폴더의 역할은 다음과 같이 생각할 수 있습니다.

| 폴더 | 역할 |
|---|---|
| \`models\` | 데이터를 표현하는 클래스 |
| \`services\` | 주요 업무 로직 |
| \`utils\` | 여러 곳에서 쓰는 보조 함수 |
| \`config.py\` | 설정값 |
| \`main.py\` | 프로그램 시작 지점 |

예를 들어 \`models/product.py\`에는 상품 클래스가 들어갈 수 있습니다.

\`\`\`python
# models/product.py

class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price
\`\`\`

\`services/order_service.py\`에는 주문 관련 기능이 들어갈 수 있습니다.

\`\`\`python
# services/order_service.py

def calculate_order_total(products):
    total = 0
    for product in products:
        total += product.price
    return total
\`\`\`

\`main.py\`에서는 이들을 가져와 사용합니다.

\`\`\`python
# main.py

from models.product import Product
from services.order_service import calculate_order_total

products = [
    Product("키보드", 30000),
    Product("마우스", 15000),
]

total = calculate_order_total(products)
print(total)
\`\`\`

파일을 이렇게 나누면 프로그램의 구조가 눈에 잘 들어옵니다.

---

### 8.4.6 상대 import와 절대 import 맛보기

패키지 구조에서는 import 방식이 조금 복잡해질 수 있습니다.

크게 보면 두 가지 방식이 있습니다.

첫째, 절대 import입니다.

\`\`\`python
from utils.price_utils import format_price
\`\`\`

프로젝트의 기준 위치에서 전체 경로를 적는 방식입니다.

둘째, 상대 import입니다.

\`\`\`python
from .price_utils import format_price
\`\`\`

현재 패키지를 기준으로 상대적인 위치를 적는 방식입니다.

기초 단계에서는 우선 절대 import 방식에 익숙해지는 것이 좋습니다. 상대 import는 패키지를 더 깊게 다룰 때 필요합니다.

실무에서 import 문제가 생기는 경우는 대부분 실행 위치와 폴더 구조가 맞지 않아서 발생합니다. 따라서 처음에는 단순한 구조로 시작하고, 프로젝트 루트에서 실행하는 습관을 들이는 것이 좋습니다.

\`\`\`text
project/
  main.py
  utils/
    price_utils.py
\`\`\`

터미널에서는 \`project\` 폴더에서 다음처럼 실행합니다.

\`\`\`bash
python main.py
\`\`\`

---

### 8.4.7 프로젝트 구조를 설계하는 기준

처음부터 완벽한 폴더 구조를 만들려고 하면 오히려 어렵습니다. 프로젝트 구조는 프로그램이 커지는 과정에서 조금씩 정리해도 됩니다.

다만 다음 기준을 기억하면 도움이 됩니다.

첫째, 같은 역할의 코드를 같은 곳에 둡니다.

둘째, 파일 이름만 보고 역할을 알 수 있게 합니다.

셋째, \`main.py\`에는 실행 흐름만 두고 세부 기능은 모듈로 분리합니다.

넷째, 여러 곳에서 쓰는 함수는 \`utils\` 같은 보조 모듈로 분리합니다.

다섯째, 데이터 구조를 표현하는 클래스는 \`models\` 같은 폴더에 둡니다.

여섯째, 실제 업무 규칙을 처리하는 코드는 \`services\` 같은 폴더에 둘 수 있습니다.

작은 프로그램에서는 다음 정도로 충분합니다.

\`\`\`text
project/
  main.py
  calculator.py
  formatter.py
\`\`\`

조금 커지면 다음처럼 나눌 수 있습니다.

\`\`\`text
project/
  main.py
  config.py
  utils/
    date_utils.py
    price_utils.py
  services/
    order_service.py
\`\`\`

더 커지면 객체와 테스트까지 분리할 수 있습니다.

\`\`\`text
project/
  main.py
  config.py
  models/
    customer.py
    product.py
    order.py
  services/
    order_service.py
    report_service.py
  utils/
    date_utils.py
    file_utils.py
  tests/
    test_order_service.py
\`\`\`

구조는 목적에 맞게 단순하게 시작하고, 필요할 때 나누는 것이 좋습니다.

---
`;export{e as default};