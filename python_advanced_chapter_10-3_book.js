var e=`<!-- 원본: python_advanced_chapter_10_book.md / 세부 장: 10-3 -->

# 10.3 패키지 구성

모듈은 하나의 \`.py\` 파일입니다. 패키지는 여러 모듈을 계층적으로 묶는 구조입니다.

다음 구조에서 \`sales_app\`은 패키지입니다.

\`\`\`text
sales_app/
  __init__.py
  main.py
  models.py
  services.py
\`\`\`

그리고 \`services\` 폴더도 패키지가 될 수 있습니다.

\`\`\`text
sales_app/
  __init__.py
  services/
    __init__.py
    processor.py
    validator.py
\`\`\`

패키지를 사용하면 코드의 이름 공간을 나누고, 기능을 계층적으로 관리할 수 있습니다.

---

## 10.3.1 \`__init__.py\`의 역할

기초 과정에서는 \`__init__.py\`를 “패키지임을 알려주는 파일” 정도로 배웠습니다. 고급 과정에서는 조금 더 구체적으로 이해해 봅시다.

일반 패키지는 보통 폴더 안에 \`__init__.py\` 파일을 둡니다.

\`\`\`text
sales_app/
  __init__.py
  models.py
  services.py
\`\`\`

\`__init__.py\`는 패키지를 import할 때 실행됩니다.

\`\`\`python
import sales_app
\`\`\`

이때 \`sales_app/__init__.py\`의 코드가 실행됩니다.

따라서 \`__init__.py\`에는 무거운 작업을 넣지 않는 것이 좋습니다.

\`\`\`text
좋은 사용 예:
- 버전 정보 정의
- 자주 사용하는 클래스나 함수 노출
- 패키지 공개 API 정리

피해야 할 사용 예:
- 파일 읽기
- API 요청
- 데이터베이스 연결
- 시간이 오래 걸리는 초기화
\`\`\`

---

## 10.3.2 공개 API 설계

패키지를 만들 때는 외부에서 어떤 이름을 사용하게 할지 정할 수 있습니다.

예를 들어 내부 파일 구조는 다음과 같습니다.

\`\`\`text
sales_app/
  __init__.py
  models.py
  services.py
\`\`\`

\`models.py\`에는 \`SaleRecord\`가 있고, \`services.py\`에는 \`calculate_total_sales()\`가 있다고 가정합니다.

\`\`\`python
# models.py
from dataclasses import dataclass


@dataclass
class SaleRecord:
    product: str
    price: int
    quantity: int
\`\`\`

\`\`\`python
# services.py
from .models import SaleRecord


def calculate_total_sales(records: list[SaleRecord]) -> int:
    return sum(record.price * record.quantity for record in records)
\`\`\`

이제 \`__init__.py\`에서 외부에 공개할 이름을 정리할 수 있습니다.

\`\`\`python
# __init__.py
from .models import SaleRecord
from .services import calculate_total_sales

__all__ = ["SaleRecord", "calculate_total_sales"]
\`\`\`

사용자는 다음처럼 간단하게 사용할 수 있습니다.

\`\`\`python
from sales_app import SaleRecord, calculate_total_sales
\`\`\`

이 구조의 장점은 내부 파일 구조가 바뀌어도 외부 사용법을 어느 정도 유지할 수 있다는 점입니다.

---

## 10.3.3 내부 모듈과 외부 사용 모듈 구분

패키지 안에는 외부 사용자가 직접 사용하기를 기대하는 모듈과 내부 구현용 모듈이 함께 있을 수 있습니다.

\`\`\`text
sales_app/
  __init__.py
  models.py
  services.py
  _internal.py
\`\`\`

관례적으로 이름 앞에 \`_\`를 붙이면 내부용이라는 의미를 나타냅니다.

\`\`\`python
# _internal.py

def normalize_product_name(name: str) -> str:
    return name.strip().lower()
\`\`\`

파이썬이 \`_internal.py\` 사용을 강제로 막는 것은 아닙니다. 하지만 이름을 통해 “이 모듈은 외부에서 직접 사용하지 않는 것이 좋다”는 의도를 전달할 수 있습니다.

이런 구분은 실무 프로젝트에서 중요합니다.

\`\`\`text
공개 API: 외부 코드가 사용해도 되는 안정적인 기능
내부 구현: 패키지 내부에서만 사용할 것을 기대하는 기능
\`\`\`

외부 사용자가 내부 구현에 의존하면 나중에 구조를 바꾸기 어려워집니다.

---

## 10.3.4 하위 패키지 구성

프로젝트가 커지면 패키지 안에 하위 패키지를 둘 수 있습니다.

\`\`\`text
sales_app/
  __init__.py
  models/
    __init__.py
    sales.py
    customer.py
  services/
    __init__.py
    sales_service.py
    report_service.py
  utils/
    __init__.py
    date_utils.py
    file_utils.py
\`\`\`

이 구조는 기능이 많을 때 유용합니다. 하지만 처음부터 과하게 나누면 오히려 복잡합니다.

작은 프로젝트에서는 다음 구조로 충분할 수 있습니다.

\`\`\`text
sales_app/
  __init__.py
  models.py
  services.py
  utils.py
\`\`\`

그리고 기능이 늘어나면 폴더로 분리합니다.

\`\`\`text
sales_app/
  models/
  services/
  utils/
\`\`\`

좋은 구조는 처음부터 완벽하게 만들어지는 것이 아니라, 기능이 늘어나면서 자연스럽게 정리됩니다.

---

## 10.3.5 \`__all__\`의 의미

\`__all__\`은 \`from package import *\`를 사용할 때 어떤 이름을 가져올지 정하는 목록입니다.

\`\`\`python
# sales_app/__init__.py
from .models import SaleRecord
from .services import calculate_total_sales

__all__ = ["SaleRecord", "calculate_total_sales"]
\`\`\`

이제 다음 코드를 실행하면 \`__all__\`에 있는 이름만 가져옵니다.

\`\`\`python
from sales_app import *
\`\`\`

하지만 실무에서는 \`import *\`를 자주 사용하지 않는 것이 좋습니다. 어떤 이름이 들어오는지 명확하지 않기 때문입니다.

\`\`\`python
# 권장하지 않는 방식
from sales_app import *
\`\`\`

명확한 import가 더 좋습니다.

\`\`\`python
from sales_app import SaleRecord, calculate_total_sales
\`\`\`

그럼에도 \`__all__\`은 패키지가 외부에 제공하려는 공개 이름을 문서화하는 효과가 있습니다.

---
`;export{e as default};