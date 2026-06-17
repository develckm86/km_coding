var e=`<!-- 원본: python_advanced_chapter_6_book.md / 세부 장: 6-5 -->

# 6.5 실무 활용

컨텍스트 매니저는 실무 코드에서 다음과 같은 상황에 자주 사용됩니다.

- 파일 처리
- 임시 파일과 임시 폴더 사용
- 실행 시간 측정
- 데이터베이스 연결 관리
- 네트워크 연결 관리
- 로그 범위 관리
- 여러 리소스의 일괄 정리

이번 절에서는 실무에 가까운 예제를 살펴보겠습니다.

---

## 6.5.1 임시 폴더 사용하기

작업 중간에 임시 파일을 만들어야 하는 경우가 있습니다. 예를 들어 다운로드한 파일을 잠시 저장하거나, 압축을 푼 결과를 임시 폴더에 저장한 뒤 최종 결과만 남기고 싶을 수 있습니다.

이럴 때는 \`tempfile.TemporaryDirectory\`를 사용할 수 있습니다.

\`\`\`python
from tempfile import TemporaryDirectory
from pathlib import Path

with TemporaryDirectory() as temp_dir:
    temp_path = Path(temp_dir)
    file_path = temp_path / "sample.txt"

    file_path.write_text("임시 파일입니다", encoding="utf-8")

    print(file_path.read_text(encoding="utf-8"))

print("with 블록이 끝나면 임시 폴더는 삭제됩니다")
\`\`\`

\`TemporaryDirectory()\`는 컨텍스트 매니저입니다. \`with\` 블록이 끝나면 임시 폴더와 그 안의 파일이 자동으로 삭제됩니다.

이 방식은 테스트 코드에서도 자주 사용합니다. 테스트 중 임시 파일을 만들고, 테스트가 끝나면 자동으로 정리할 수 있기 때문입니다.

---

## 6.5.2 임시 파일 사용하기

임시 파일 하나만 필요한 경우에는 \`tempfile.NamedTemporaryFile\`을 사용할 수 있습니다.

\`\`\`python
from tempfile import NamedTemporaryFile

with NamedTemporaryFile("w+", encoding="utf-8", delete=True) as file:
    file.write("임시 파일 내용")
    file.seek(0)
    print(file.read())
\`\`\`

\`delete=True\`이면 파일이 닫힐 때 임시 파일이 삭제됩니다.

임시 파일과 임시 폴더는 다음과 같은 작업에서 유용합니다.

- 중간 결과 저장
- 테스트 데이터 생성
- 다운로드 파일 임시 저장
- 압축 해제 후 처리
- 실패해도 흔적을 남기고 싶지 않은 작업

---

## 6.5.3 작업 구간 로그 남기기

컨텍스트 매니저를 사용하면 특정 작업의 시작과 끝을 자동으로 기록할 수 있습니다.

\`\`\`python
from contextlib import contextmanager
import logging

logging.basicConfig(level=logging.INFO)

@contextmanager
def log_section(name):
    logging.info("%s 시작", name)
    try:
        yield
    finally:
        logging.info("%s 종료", name)
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
with log_section("데이터 로딩"):
    # load_data()
    print("데이터를 읽는 중입니다")

with log_section("데이터 저장"):
    # save_data()
    print("데이터를 저장하는 중입니다")
\`\`\`

실행 결과는 다음과 비슷합니다.

\`\`\`text
INFO:root:데이터 로딩 시작
데이터를 읽는 중입니다
INFO:root:데이터 로딩 종료
INFO:root:데이터 저장 시작
데이터를 저장하는 중입니다
INFO:root:데이터 저장 종료
\`\`\`

이 패턴은 자동화 프로그램에서 특히 유용합니다. 어느 작업이 시작되고 끝났는지 로그로 남기면 문제를 추적하기 쉬워집니다.

---

## 6.5.4 실행 시간과 로그를 함께 남기기

이번에는 실행 시간 측정과 로그를 결합해보겠습니다.

\`\`\`python
from contextlib import contextmanager
import logging
import time

logging.basicConfig(level=logging.INFO)

@contextmanager
def measure_section(name):
    start = time.time()
    logging.info("%s 시작", name)

    try:
        yield
    finally:
        end = time.time()
        logging.info("%s 종료: %.4f초", name, end - start)
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
with measure_section("큰 데이터 처리"):
    total = sum(range(5_000_000))
\`\`\`

이 코드는 작업의 시작과 종료, 그리고 걸린 시간을 함께 기록합니다.

이런 컨텍스트 매니저는 데이터 수집, 파일 처리, 전처리, 보고서 생성 같은 작업에서 매우 유용합니다.

---

## 6.5.5 데이터베이스 연결 관리 구조

데이터베이스는 뒤 장에서 따로 다루지만, 리소스 관리 관점에서 간단히 살펴보겠습니다.

데이터베이스 연결은 열고 나면 반드시 닫아야 하는 리소스입니다. 파이썬의 \`sqlite3\` 연결 객체는 컨텍스트 매니저로 사용할 수 있습니다. 다만 연결을 자동으로 닫는 방식은 객체와 사용 방식에 따라 다를 수 있으므로, 실무에서는 문서를 확인하고 명시적으로 닫는 습관이 필요합니다.

가장 안전한 구조는 다음처럼 컨텍스트 매니저로 감싸는 것입니다.

\`\`\`python
from contextlib import contextmanager
import sqlite3

@contextmanager
def connect_db(path):
    conn = sqlite3.connect(path)
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()
\`\`\`

사용 예시는 다음과 같습니다.

\`\`\`python
with connect_db("app.db") as conn:
    conn.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER, name TEXT)")
    conn.execute("INSERT INTO users VALUES (?, ?)", (1, "Alice"))
\`\`\`

이 컨텍스트 매니저는 다음 역할을 합니다.

\`\`\`text
1. DB 연결 열기
2. 작업 실행
3. 성공하면 commit
4. 실패하면 rollback
5. 연결 닫기
\`\`\`

이 구조는 실무에서 매우 중요합니다. 파일과 마찬가지로 데이터베이스 연결도 시작과 끝을 분명히 관리해야 합니다.

---

## 6.5.6 여러 파일을 안전하게 처리하기

여러 파일을 읽고 하나의 결과 파일로 저장하는 작업은 자동화에서 자주 등장합니다.

다음 예제는 여러 텍스트 파일을 읽어 하나의 파일로 합칩니다.

\`\`\`python
from contextlib import ExitStack
from pathlib import Path

input_paths = [Path("data1.txt"), Path("data2.txt"), Path("data3.txt")]
output_path = Path("merged.txt")

with ExitStack() as stack:
    readers = [
        stack.enter_context(path.open("r", encoding="utf-8"))
        for path in input_paths
    ]
    writer = stack.enter_context(output_path.open("w", encoding="utf-8"))

    for reader in readers:
        writer.write(reader.read())
        writer.write("\\n")
\`\`\`

이 코드는 파일 개수가 늘어나도 구조가 크게 변하지 않습니다.

실무에서는 파일 목록이 다음처럼 동적으로 만들어지는 경우가 많습니다.

\`\`\`python
input_paths = list(Path("logs").glob("*.log"))
\`\`\`

파일 개수가 실행 전에는 정해져 있지 않으므로 \`ExitStack\`이 유용합니다.

---

## 6.5.7 컨텍스트 매니저를 사용할 때의 기준

모든 코드를 컨텍스트 매니저로 만들 필요는 없습니다. 컨텍스트 매니저는 다음 조건에 해당할 때 특히 적합합니다.

첫째, 작업의 시작과 끝이 분명할 때입니다.

\`\`\`text
열기 → 사용 → 닫기
생성 → 사용 → 삭제
시작 기록 → 작업 → 종료 기록
\`\`\`

둘째, 예외가 발생해도 반드시 정리해야 하는 작업일 때입니다.

\`\`\`text
파일 닫기
DB 연결 닫기
임시 파일 삭제
잠금 해제
\`\`\`

셋째, 같은 준비와 정리 코드가 여러 곳에서 반복될 때입니다.

\`\`\`python
start = time.time()
try:
    ...
finally:
    print(time.time() - start)
\`\`\`

이런 코드가 반복된다면 컨텍스트 매니저로 분리할 수 있습니다.

---

## 6.5.8 클래스 방식과 함수 방식 선택하기

컨텍스트 매니저를 만드는 방법은 크게 두 가지입니다.

첫 번째는 클래스 방식입니다.

\`\`\`python
class MyContext:
    def __enter__(self):
        ...

    def __exit__(self, exc_type, exc_value, traceback):
        ...
\`\`\`

두 번째는 \`contextlib.contextmanager\`를 사용하는 함수 방식입니다.

\`\`\`python
from contextlib import contextmanager

@contextmanager
def my_context():
    ...
    yield
    ...
\`\`\`

간단한 준비와 정리만 필요하다면 함수 방식이 좋습니다.

\`\`\`python
@contextmanager
def timer():
    start = time.time()
    try:
        yield
    finally:
        print(time.time() - start)
\`\`\`

상태가 많거나 여러 메서드가 필요하다면 클래스 방식이 좋습니다.

\`\`\`python
class Timer:
    def __init__(self):
        self.elapsed = 0

    def __enter__(self):
        self.start = time.time()
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.elapsed = time.time() - self.start
\`\`\`

클래스 방식에서는 \`with\` 블록이 끝난 뒤 객체의 상태를 확인할 수 있습니다.

\`\`\`python
with Timer() as timer:
    total = sum(range(1_000_000))

print(timer.elapsed)
\`\`\`

따라서 선택 기준은 다음과 같이 정리할 수 있습니다.

\`\`\`text
간단한 준비와 정리 → 함수 기반 contextmanager
상태 보관과 여러 기능 필요 → 클래스 기반 컨텍스트 매니저
\`\`\`

---
`;export{e as default};