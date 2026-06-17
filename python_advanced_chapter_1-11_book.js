var e=`<!-- 원본: python_advanced_chapter_1_book.md / 세부 장: 1-11 -->

# 1.11 예제로 보는 고급 파이썬의 방향

다음은 기초 문법으로 작성한 간단한 데이터 처리 코드다.

\`\`\`python
rows = [
    {"name": "Kim", "amount": "10000"},
    {"name": "Lee", "amount": ""},
    {"name": "Park", "amount": "30000"},
]

result = []

for row in rows:
    if row["amount"] != "":
        row["amount"] = int(row["amount"])
        result.append(row)

print(result)
\`\`\`

이 코드는 빈 금액을 제외하고 금액을 정수로 바꾼다. 기초 과정 수준에서는 충분히 좋은 예제다.

하지만 고급 과정에서는 다음과 같이 생각해볼 수 있다.

\`\`\`text
원본 데이터를 직접 수정해도 괜찮을까?
amount가 "10,000"처럼 들어오면 어떻게 할까?
amount가 "abc"이면 어떻게 할까?
처리 실패한 행을 따로 기록해야 하지 않을까?
이 로직을 함수로 분리할 수 있을까?
테스트를 작성할 수 있을까?
\`\`\`

조금 더 구조화하면 다음과 같이 작성할 수 있다.

\`\`\`python
def parse_amount(value: str) -> int | None:
    if not value:
        return None

    cleaned = value.replace(",", "")

    try:
        return int(cleaned)
    except ValueError:
        return None


def clean_sales_rows(rows: list[dict]) -> list[dict]:
    cleaned_rows = []

    for row in rows:
        amount = parse_amount(row.get("amount", ""))

        if amount is None:
            continue

        cleaned_rows.append({
            "name": row.get("name", ""),
            "amount": amount,
        })

    return cleaned_rows
\`\`\`

이 코드는 더 안전하고 테스트하기 쉽다.

\`\`\`python
rows = [
    {"name": "Kim", "amount": "10,000"},
    {"name": "Lee", "amount": ""},
    {"name": "Park", "amount": "30000"},
]

print(clean_sales_rows(rows))
\`\`\`

고급 과정에서는 이런 식으로 코드를 바라본다. 실행되는 코드에서 멈추지 않고, 더 안정적인 구조로 개선한다.

---
`;export{e as default};