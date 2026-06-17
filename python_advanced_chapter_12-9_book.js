var e=`<!-- 원본: python_advanced_chapter_12_book.md / 세부 장: 12-9 -->

# 12.9 종합 예제: CSV 검증 도구 테스트하기

이번에는 데이터분석 과정으로 이어질 수 있는 예제를 만들어 보자. CSV 파일에서 읽은 행 데이터가 다음 조건을 만족하는지 검증하는 코드를 작성한다.

- \`name\`, \`email\`, \`age\` 필드가 있어야 한다.
- \`name\`과 \`email\`은 비어 있으면 안 된다.
- \`age\`는 정수로 변환 가능해야 한다.
- \`age\`는 0 이상이어야 한다.

## 검증 코드

\`\`\`python
# src/my_app/validators.py

class RowValidationError(ValueError):
    pass


REQUIRED_FIELDS = ["name", "email", "age"]


def validate_customer_row(row: dict[str, str]) -> None:
    for field in REQUIRED_FIELDS:
        if field not in row:
            raise RowValidationError(f"필수 필드가 없습니다: {field}")

    if not row["name"].strip():
        raise RowValidationError("이름이 비어 있습니다")

    if not row["email"].strip():
        raise RowValidationError("이메일이 비어 있습니다")

    try:
        age = int(row["age"])
    except ValueError as error:
        raise RowValidationError("나이는 정수여야 합니다") from error

    if age < 0:
        raise RowValidationError("나이는 0 이상이어야 합니다")
\`\`\`

## 테스트 코드

\`\`\`python
# tests/test_validators.py

import pytest

from my_app.validators import RowValidationError, validate_customer_row


def test_validate_customer_row_success():
    row = {
        "name": "민수",
        "email": "minsu@example.com",
        "age": "25",
    }

    validate_customer_row(row)


@pytest.mark.parametrize(
    "row, message",
    [
        ({"email": "a@example.com", "age": "20"}, "name"),
        ({"name": "민수", "age": "20"}, "email"),
        ({"name": "민수", "email": "a@example.com"}, "age"),
        ({"name": "", "email": "a@example.com", "age": "20"}, "이름"),
        ({"name": "민수", "email": "", "age": "20"}, "이메일"),
        ({"name": "민수", "email": "a@example.com", "age": "abc"}, "정수"),
        ({"name": "민수", "email": "a@example.com", "age": "-1"}, "0 이상"),
    ],
)
def test_validate_customer_row_invalid(row, message):
    with pytest.raises(RowValidationError, match=message):
        validate_customer_row(row)
\`\`\`

이 테스트는 정상 케이스 하나와 여러 실패 케이스를 확인한다. parametrization을 사용했기 때문에 코드 중복이 줄어들고, 어떤 입력이 어떤 예외를 발생시키는지 명확하게 볼 수 있다.

## 파일 검증 함수로 확장하기

이제 여러 행을 검증하고 실패한 행만 모으는 함수를 생각해보자.

\`\`\`python
# src/my_app/validators.py


def collect_invalid_rows(rows: list[dict[str, str]]) -> list[dict[str, str]]:
    invalid_rows = []

    for index, row in enumerate(rows, start=1):
        try:
            validate_customer_row(row)
        except RowValidationError as error:
            invalid_rows.append({
                "row_number": str(index),
                "error": str(error),
                **row,
            })

    return invalid_rows
\`\`\`

테스트는 다음과 같다.

\`\`\`python

def test_collect_invalid_rows():
    rows = [
        {"name": "민수", "email": "minsu@example.com", "age": "25"},
        {"name": "", "email": "empty@example.com", "age": "20"},
        {"name": "지영", "email": "jiyoung@example.com", "age": "abc"},
    ]

    result = collect_invalid_rows(rows)

    assert len(result) == 2
    assert result[0]["row_number"] == "2"
    assert "이름" in result[0]["error"]
    assert result[1]["row_number"] == "3"
    assert "정수" in result[1]["error"]
\`\`\`

이 예제는 데이터분석 과정 전에 반드시 필요한 데이터 품질 검증 로직이다. 데이터분석 자체는 나중에 pandas로 진행하더라도, 데이터를 분석 가능한 상태로 만들기 위해서는 이런 검증 코드가 필요하다.

---
`;export{e as default};