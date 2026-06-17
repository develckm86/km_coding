var e=`<!-- 원본: python_advanced_chapter_19_book.md / 세부 장: 19-4 -->

# 19.4 데이터 품질 확인

데이터 품질은 분석 결과의 신뢰도를 결정한다. 잘못된 데이터로 분석하면 결과도 잘못된다. 따라서 데이터분석 전에는 품질 확인이 반드시 필요하다.

## 19.4.1 누락값 확인

누락값은 데이터가 비어 있는 상태를 말한다.

CSV에서는 누락값이 다음과 같이 나타날 수 있다.

\`\`\`text
- 빈 문자열 ""
- 공백 "   "
- NULL
- None
- N/A
- -
\`\`\`

문자열 기준으로 빈 값을 확인하는 함수는 다음과 같이 만들 수 있다.

\`\`\`python
def is_blank(value: str | None) -> bool:
    if value is None:
        return True
    return value.strip() == ""

print(is_blank(""))
print(is_blank("   "))
print(is_blank("홍길동"))
\`\`\`

필수 컬럼에 빈 값이 있는지 검사할 수도 있다.

\`\`\`python
def find_blank_required_fields(
    row: dict[str, str],
    required_fields: list[str],
) -> list[str]:
    blank_fields = []

    for field in required_fields:
        if is_blank(row.get(field)):
            blank_fields.append(field)

    return blank_fields
\`\`\`

---

## 19.4.2 중복값 확인

중복 데이터는 분석 결과를 왜곡할 수 있다. 예를 들어 주문 데이터가 중복되면 매출이 실제보다 크게 계산된다.

중복 주문 ID를 찾는 함수는 다음과 같이 만들 수 있다.

\`\`\`python
def find_duplicate_values(values: list[str]) -> set[str]:
    seen = set()
    duplicates = set()

    for value in values:
        if value in seen:
            duplicates.add(value)
        else:
            seen.add(value)

    return duplicates

order_ids = ["1001", "1002", "1001", "1003"]
print(find_duplicate_values(order_ids))
\`\`\`

중복을 확인할 때는 기준이 중요하다.

\`\`\`text
- 주문 ID가 같으면 중복인가?
- 고객 ID와 주문일이 같으면 중복인가?
- 모든 컬럼이 같을 때만 중복인가?
\`\`\`

분석 목적에 따라 중복 기준을 정해야 한다.

---

## 19.4.3 잘못된 타입 확인

CSV에서 읽은 값은 기본적으로 문자열이다. 따라서 숫자처럼 보이는 값도 처음에는 문자열이다.

\`\`\`python
row = {"amount": "10000"}

print(type(row["amount"]))
\`\`\`

분석하려면 숫자 데이터는 숫자로 변환해야 한다.

하지만 모든 값이 변환 가능한 것은 아니다.

\`\`\`python
def can_parse_int(value: str) -> bool:
    try:
        int(value.replace(",", "").strip())
        return True
    except ValueError:
        return False

print(can_parse_int("10000"))
print(can_parse_int("10,000"))
print(can_parse_int("금액없음"))
\`\`\`

이런 검증 함수는 데이터분석 전에 매우 유용하다.

---

## 19.4.4 날짜 형식 확인

날짜는 데이터분석에서 매우 중요하다. 월별 매출, 주간 사용자 수, 기간별 변화량 같은 분석은 모두 날짜를 기준으로 한다.

날짜 형식을 검사하는 함수는 다음과 같이 만들 수 있다.

\`\`\`python
from datetime import datetime


def is_valid_date(value: str, date_format: str = "%Y-%m-%d") -> bool:
    try:
        datetime.strptime(value.strip(), date_format)
        return True
    except ValueError:
        return False

print(is_valid_date("2026-01-05"))
print(is_valid_date("2026/01/05"))
\`\`\`

여러 날짜 형식을 허용하려면 다음과 같이 작성할 수 있다.

\`\`\`python
def parse_date_flexible(value: str) -> str | None:
    formats = ["%Y-%m-%d", "%Y/%m/%d", "%Y.%m.%d"]

    for date_format in formats:
        try:
            parsed = datetime.strptime(value.strip(), date_format)
            return parsed.strftime("%Y-%m-%d")
        except ValueError:
            pass

    return None

print(parse_date_flexible("2026/01/05"))
print(parse_date_flexible("2026.01.05"))
print(parse_date_flexible("잘못된 날짜"))
\`\`\`

---

## 19.4.5 범위 확인

데이터가 타입상으로는 맞아도 값의 범위가 이상할 수 있다.

예를 들어 다음 값들은 숫자지만 이상할 수 있다.

\`\`\`text
- 나이: -3
- 할인율: 1.5
- 주문 금액: -10000
- 평점: 7점, 단 5점 만점일 때
\`\`\`

범위를 검사하는 함수는 다음과 같이 만들 수 있다.

\`\`\`python
def is_in_range(value: int | float, min_value: int | float, max_value: int | float) -> bool:
    return min_value <= value <= max_value

print(is_in_range(20, 0, 120))
print(is_in_range(-3, 0, 120))
\`\`\`

분석 전에 값의 범위를 확인하면 비정상 데이터를 빠르게 찾을 수 있다.

---

## 19.4.6 인코딩 문제 확인

한글 데이터에서는 인코딩 문제가 자주 발생한다. 특히 CSV 파일을 엑셀에서 저장하거나 외부 시스템에서 내려받으면 인코딩이 다를 수 있다.

대표적인 인코딩은 다음과 같다.

\`\`\`text
- utf-8
- utf-8-sig
- cp949
\`\`\`

파일을 읽을 때 오류가 발생하면 다른 인코딩을 시도해야 할 수 있다.

\`\`\`python
from pathlib import Path


def read_text_with_candidates(path: Path, encodings: list[str]) -> str:
    last_error = None

    for encoding in encodings:
        try:
            return path.read_text(encoding=encoding)
        except UnicodeDecodeError as error:
            last_error = error

    raise UnicodeDecodeError(
        last_error.encoding,
        last_error.object,
        last_error.start,
        last_error.end,
        "지원하는 인코딩으로 읽을 수 없습니다.",
    )
\`\`\`

실무에서는 인코딩을 추측하기보다, 가능하면 데이터 제공처에서 인코딩 정보를 확인하는 것이 좋다.

---
`;export{e as default};