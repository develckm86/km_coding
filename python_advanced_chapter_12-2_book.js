var e=`<!-- 원본: python_advanced_chapter_12_book.md / 세부 장: 12-2 -->

# 12.2 pytest 심화

## pytest가 테스트를 찾는 방식

\`pytest\`는 기본적으로 일정한 규칙에 따라 테스트 파일과 테스트 함수를 찾는다.

일반적으로 테스트 파일은 다음과 같은 이름을 사용한다.

\`\`\`text
test_*.py
*_test.py
\`\`\`

테스트 함수는 다음처럼 \`test_\`로 시작한다.

\`\`\`python

def test_add():
    assert add(1, 2) == 3
\`\`\`

테스트 클래스도 만들 수 있다. 테스트 클래스 이름은 보통 \`Test\`로 시작한다.

\`\`\`python
class TestPriceCalculator:
    def test_total_price(self):
        assert calculate_total_price(10000, 2) == 20000
\`\`\`

테스트 클래스는 관련 테스트를 묶을 때 유용하다. 다만 초보 단계에서는 함수 단위 테스트만으로도 충분하다. 고급 과정에서는 테스트가 많아질 때 구조적으로 묶는 방법을 익히는 것이 좋다.

## pytest 실행

터미널에서 다음 명령으로 테스트를 실행한다.

\`\`\`bash
pytest
\`\`\`

특정 파일만 실행할 수도 있다.

\`\`\`bash
pytest tests/test_price.py
\`\`\`

특정 테스트 함수만 실행할 수도 있다.

\`\`\`bash
pytest tests/test_price.py::test_calculate_total_price
\`\`\`

출력을 자세히 보고 싶다면 \`-v\` 옵션을 사용한다.

\`\`\`bash
pytest -v
\`\`\`

테스트 중 \`print()\` 출력까지 보고 싶다면 \`-s\` 옵션을 사용한다.

\`\`\`bash
pytest -s
\`\`\`

실무에서는 실패한 테스트만 다시 실행하거나, 키워드로 테스트를 골라 실행하는 경우도 많다.

\`\`\`bash
pytest -k price
\`\`\`

위 명령은 이름에 \`price\`가 들어간 테스트만 실행한다.

## pytest의 assert

\`pytest\`에서는 일반 \`assert\` 문을 그대로 사용한다.

\`\`\`python

def test_numbers():
    assert 1 + 2 == 3
\`\`\`

\`pytest\`의 장점은 실패했을 때 비교 내용을 자세히 보여준다는 점이다.

\`\`\`python

def test_list():
    assert [1, 2, 3] == [1, 2, 4]
\`\`\`

이 테스트가 실패하면 어느 위치의 값이 다른지 보여준다. 그래서 별도의 복잡한 assertion 메서드를 사용하지 않아도 읽기 쉬운 테스트를 작성할 수 있다.

## 예외 테스트

잘못된 입력에 대해 예외가 발생해야 한다면 \`pytest.raises()\`를 사용한다.

\`\`\`python
import pytest


def divide(a: int, b: int) -> float:
    if b == 0:
        raise ValueError("0으로 나눌 수 없습니다.")
    return a / b


def test_divide_by_zero_raises_value_error():
    with pytest.raises(ValueError):
        divide(10, 0)
\`\`\`

예외 메시지까지 확인할 수도 있다.

\`\`\`python

def test_divide_by_zero_error_message():
    with pytest.raises(ValueError, match="0으로 나눌 수 없습니다"):
        divide(10, 0)
\`\`\`

예외 테스트는 데이터 검증 함수, 설정값 검사 함수, 파일 처리 함수에서 자주 사용된다.

## 임시 디렉터리와 파일 테스트

파일을 다루는 코드를 테스트할 때 실제 프로젝트 폴더를 건드리면 위험하다. \`pytest\`는 임시 경로를 제공하는 \`tmp_path\` fixture를 제공한다.

\`\`\`python
from pathlib import Path


def save_text(path: Path, text: str) -> None:
    path.write_text(text, encoding="utf-8")


def test_save_text(tmp_path):
    file_path = tmp_path / "sample.txt"

    save_text(file_path, "hello")

    assert file_path.read_text(encoding="utf-8") == "hello"
\`\`\`

\`tmp_path\`는 테스트 실행 중에만 사용할 임시 폴더를 제공한다. 테스트가 끝난 뒤에는 pytest가 정리하므로 안전하다.

## 출력 테스트

화면 출력이 필요한 함수를 테스트할 때는 \`capsys\` fixture를 사용할 수 있다.

\`\`\`python

def greet(name: str) -> None:
    print(f"안녕하세요, {name}님")


def test_greet_output(capsys):
    greet("민수")

    captured = capsys.readouterr()

    assert captured.out == "안녕하세요, 민수님\\n"
\`\`\`

하지만 실무에서는 가능하면 출력 자체를 테스트하기보다, 출력할 문자열을 반환하는 함수와 실제 출력 함수를 분리하는 편이 좋다.

\`\`\`python

def make_greeting(name: str) -> str:
    return f"안녕하세요, {name}님"


def print_greeting(name: str) -> None:
    print(make_greeting(name))
\`\`\`

이렇게 하면 핵심 로직은 \`make_greeting()\`에서 쉽게 테스트할 수 있다.

---
`;export{e as default};