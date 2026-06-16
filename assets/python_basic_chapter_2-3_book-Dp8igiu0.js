var e=`<!-- 원본: python_basic_chapter_2_book.md / 세부 장: 2-3 -->

# 2.3 문자열 다루기

## 문자열 다루기의 의미

2.2에서는 문자열이 어떤 데이터인지 살펴보았다. 이제는 문자열을 실제로 가공하는 방법을 배운다.

실무에서는 문자열을 그대로 저장하는 일보다 문자열을 정리하고 변환하는 일이 더 많다. 예를 들어 사용자가 입력한 이름 앞뒤의 공백을 제거해야 할 수 있고, 이메일 주소를 소문자로 통일해야 할 수 있다. 전화번호에서 하이픈을 제거하거나, 파일 이름이 특정 확장자로 끝나는지 확인해야 할 수도 있다.

문자열을 다룰 때는 문자열 메서드를 많이 사용한다. 메서드는 특정 데이터가 가지고 있는 기능이다. 예를 들어 문자열은 \`strip()\`, \`replace()\`, \`split()\` 같은 기능을 가지고 있다.

\`\`\`python
name = "  홍길동  "
clean_name = name.strip()

print(clean_name)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
홍길동
\`\`\`

## 문자열 길이 확인하기

문자열의 길이는 \`len()\` 함수로 확인한다.

\`\`\`python
text = "Python"
print(len(text))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
6
\`\`\`

한글도 문자 단위로 길이를 계산한다.

\`\`\`python
text = "파이썬"
print(len(text))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
3
\`\`\`

문자열 길이는 입력값이 비어 있는지 확인하거나, 비밀번호 길이 규칙을 검사하거나, 상품 코드 길이를 확인할 때 사용할 수 있다.

\`\`\`python
password = "abc12345"
password_length = len(password)

print(password_length)
\`\`\`

## 문자열 인덱싱

인덱싱은 문자열에서 특정 위치의 문자를 가져오는 방법이다. 파이썬의 인덱스는 0부터 시작한다.

\`\`\`python
text = "Python"

print(text[0])
print(text[1])
print(text[2])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
P
y
t
\`\`\`

마지막 문자는 음수 인덱스로 접근할 수 있다.

\`\`\`python
text = "Python"

print(text[-1])
print(text[-2])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
n
o
\`\`\`

존재하지 않는 위치에 접근하면 오류가 발생한다.

\`\`\`python
text = "Python"
print(text[10])
\`\`\`

실행하면 다음과 같은 오류가 발생한다.

\`\`\`text
IndexError: string index out of range
\`\`\`

인덱싱은 상품 코드의 첫 글자를 확인하거나, 파일명에서 특정 위치의 문자를 추출할 때 사용할 수 있다.

## 문자열 슬라이싱

슬라이싱은 문자열의 일부를 잘라내는 방법이다.

\`\`\`python
text = "Python"

print(text[0:3])
print(text[2:5])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
Pyt
tho
\`\`\`

슬라이싱의 기본 구조는 다음과 같다.

\`\`\`python
문자열[시작:끝]
\`\`\`

여기서 끝 위치의 문자는 포함되지 않는다. \`text[0:3]\`은 0번, 1번, 2번 문자를 가져온다.

시작 위치를 생략하면 처음부터 가져온다.

\`\`\`python
text = "Python"
print(text[:3])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
Pyt
\`\`\`

끝 위치를 생략하면 마지막까지 가져온다.

\`\`\`python
text = "Python"
print(text[3:])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
hon
\`\`\`

간격을 지정할 수도 있다.

\`\`\`python
text = "Python"
print(text[::2])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
Pto
\`\`\`

문자열을 뒤집을 때는 다음과 같이 쓸 수 있다.

\`\`\`python
text = "Python"
print(text[::-1])
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
nohtyP
\`\`\`

## 문자열 포매팅

문자열 포매팅은 문자열 안에 변수 값을 넣어 새로운 문장을 만드는 방법이다. 파이썬에서는 f-string을 많이 사용한다.

\`\`\`python
name = "홍길동"
age = 25

message = f"{name}님의 나이는 {age}살입니다."
print(message)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
홍길동님의 나이는 25살입니다.
\`\`\`

f-string은 문자열 앞에 \`f\`를 붙이고, 중괄호 \`{}\` 안에 변수나 표현식을 넣는다.

\`\`\`python
price = 10000
quantity = 3

message = f"총 금액은 {price * quantity}원입니다."
print(message)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
총 금액은 30000원입니다.
\`\`\`

숫자에 쉼표를 넣어 출력할 수도 있다.

\`\`\`python
amount = 1234567
print(f"금액: {amount:,}원")
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
금액: 1,234,567원
\`\`\`

소수점 자리수를 지정할 수도 있다.

\`\`\`python
rate = 0.12345
print(f"비율: {rate:.2f}")
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
비율: 0.12
\`\`\`

f-string은 실무에서 안내 메시지, 로그 메시지, 파일명, 보고서 문장 등을 만들 때 자주 사용한다.

## 공백 처리 함수

사용자가 입력한 값이나 외부 파일에서 가져온 문자열에는 앞뒤 공백이 섞여 있는 경우가 많다. 이런 공백을 제거할 때 \`strip()\`을 사용한다.

\`\`\`python
name = "  홍길동  "
print(name.strip())
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
홍길동
\`\`\`

왼쪽 공백만 제거할 때는 \`lstrip()\`을 사용한다.

\`\`\`python
text = "  Python"
print(text.lstrip())
\`\`\`

오른쪽 공백만 제거할 때는 \`rstrip()\`을 사용한다.

\`\`\`python
text = "Python  "
print(text.rstrip())
\`\`\`

공백 처리는 데이터 정리에서 매우 자주 사용된다. 예를 들어 엑셀에서 가져온 이름에 보이지 않는 공백이 들어 있으면 같은 이름도 다른 값으로 처리될 수 있다.

\`\`\`python
name1 = "홍길동"
name2 = " 홍길동 "

print(name1 == name2)
print(name1 == name2.strip())
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
False
True
\`\`\`

## 대소문자 처리 함수

영문 문자열은 대소문자 때문에 비교가 어려워지는 경우가 있다. 이메일 주소나 상품 코드를 처리할 때는 대소문자를 통일하는 것이 좋다.

\`\`\`python
email = "USER@EXAMPLE.COM"
print(email.lower())
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
user@example.com
\`\`\`

자주 사용하는 대소문자 관련 메서드는 다음과 같다.

| 메서드 | 의미 |
|---|---|
| \`lower()\` | 모두 소문자로 변환 |
| \`upper()\` | 모두 대문자로 변환 |
| \`capitalize()\` | 첫 글자는 대문자, 나머지는 소문자로 변환 |
| \`title()\` | 각 단어의 첫 글자를 대문자로 변환 |

예시는 다음과 같다.

\`\`\`python
text = "python programming"

print(text.upper())
print(text.capitalize())
print(text.title())
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
PYTHON PROGRAMMING
Python programming
Python Programming
\`\`\`

## 문자열 찾기 함수

문자열 안에 특정 문자나 단어가 있는지 확인할 때는 \`in\`, \`find()\`, \`index()\`, \`count()\`를 사용할 수 있다.

\`\`\`python
email = "user@example.com"

print("@" in email)
print(email.find("@"))
print(email.count("."))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
True
4
1
\`\`\`

\`in\`은 포함 여부를 \`True\` 또는 \`False\`로 알려준다.

\`\`\`python
text = "Python is easy"
print("Python" in text)
print("Java" in text)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
True
False
\`\`\`

\`find()\`는 찾는 문자열이 처음 나타나는 위치를 반환한다. 찾지 못하면 \`-1\`을 반환한다.

\`\`\`python
text = "Python is easy"

print(text.find("is"))
print(text.find("Java"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
7
-1
\`\`\`

\`index()\`도 위치를 찾지만, 찾지 못하면 오류가 발생한다.

\`\`\`python
text = "Python is easy"
print(text.index("is"))
\`\`\`

찾는 값이 확실히 있을 때는 \`index()\`를 사용할 수 있지만, 없을 가능성이 있다면 \`find()\`가 더 안전하다.

\`count()\`는 특정 문자열이 몇 번 등장하는지 알려준다.

\`\`\`python
text = "apple banana apple"
print(text.count("apple"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
2
\`\`\`

## 문자열 변경 함수

문자열 안의 일부 문자를 다른 문자로 바꿀 때는 \`replace()\`를 사용한다.

\`\`\`python
phone = "010-1234-5678"
clean_phone = phone.replace("-", "")

print(clean_phone)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
01012345678
\`\`\`

금액 문자열에서 쉼표를 제거할 수도 있다.

\`\`\`python
amount = "1,234,567"
clean_amount = amount.replace(",", "")

print(clean_amount)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
1234567
\`\`\`

문자열은 불변 데이터이므로 \`replace()\`가 기존 문자열을 직접 바꾸는 것은 아니다. 새 문자열을 반환한다. 따라서 결과를 사용하려면 변수에 다시 저장해야 한다.

\`\`\`python
text = "python"
text.replace("p", "P")

print(text)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
python
\`\`\`

아래처럼 다시 저장해야 변경 결과를 사용할 수 있다.

\`\`\`python
text = "python"
text = text.replace("p", "P")

print(text)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
Python
\`\`\`

## 문자열 나누기

문자열을 특정 기준으로 나눌 때는 \`split()\`을 사용한다.

\`\`\`python
email = "user@example.com"
parts = email.split("@")

print(parts)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['user', 'example.com']
\`\`\`

아직 리스트를 배우기 전이지만, 대괄호 \`[]\`로 표시된 값은 여러 값을 묶은 데이터라고 이해하면 된다. 리스트는 4장에서 자세히 배운다.

쉼표로 구분된 문자열을 나눌 수도 있다.

\`\`\`python
line = "홍길동,25,서울"
parts = line.split(",")

print(parts)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['홍길동', '25', '서울']
\`\`\`

\`split()\`에 아무 기준을 넣지 않으면 공백을 기준으로 나눈다.

\`\`\`python
text = "Python is easy"
print(text.split())
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['Python', 'is', 'easy']
\`\`\`

## 문자열 합치기

여러 문자열을 하나로 합칠 때는 \`join()\`을 사용한다.

\`\`\`python
date_parts = ["2026", "06", "15"]
date_text = "-".join(date_parts)

print(date_text)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
2026-06-15
\`\`\`

\`join()\`은 문자열 사이에 어떤 구분자를 넣어 합칠지 정하는 방식으로 사용한다.

\`\`\`python
words = ["Python", "is", "easy"]
sentence = " ".join(words)

print(sentence)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
Python is easy
\`\`\`

\`+\`로 문자열을 합칠 수도 있지만, 여러 문자열을 구분자로 연결할 때는 \`join()\`이 더 적합하다.

## 시작과 끝 확인 함수

문자열이 특정 문자열로 시작하는지 확인할 때는 \`startswith()\`를 사용한다.

\`\`\`python
code = "A-001"
print(code.startswith("A"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
True
\`\`\`

문자열이 특정 문자열로 끝나는지 확인할 때는 \`endswith()\`를 사용한다.

\`\`\`python
filename = "report.xlsx"
print(filename.endswith(".xlsx"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
True
\`\`\`

파일 처리에서는 확장자 확인이 자주 필요하다.

\`\`\`python
filename = "image.png"
print(filename.endswith(".png"))
print(filename.endswith(".xlsx"))
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
True
False
\`\`\`

## 문자열 판별 함수

문자열의 구성을 확인할 때는 \`isdigit()\`, \`isalpha()\`, \`isalnum()\`, \`isspace()\` 같은 메서드를 사용할 수 있다.

| 메서드 | 의미 |
|---|---|
| \`isdigit()\` | 숫자로만 구성되어 있는지 확인 |
| \`isalpha()\` | 문자로만 구성되어 있는지 확인 |
| \`isalnum()\` | 문자와 숫자로만 구성되어 있는지 확인 |
| \`isspace()\` | 공백 문자로만 구성되어 있는지 확인 |

예시는 다음과 같다.

\`\`\`python
print("12345".isdigit())
print("abc".isalpha())
print("abc123".isalnum())
print("   ".isspace())
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
True
True
True
True
\`\`\`

주의할 점도 있다.

\`\`\`python
print("-123".isdigit())
print("12.3".isdigit())
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
False
False
\`\`\`

\`isdigit()\`은 음수 기호나 소수점을 숫자로 보지 않는다. 따라서 음수나 실수 형태의 문자열을 검사할 때는 다른 방법이 필요하다. 예외 처리 장에서 이런 값을 안전하게 변환하는 방법을 다시 다룬다.

## 문자열 메서드 사용 시 주의할 점

문자열 메서드의 대부분은 원본 문자열을 직접 바꾸지 않고 새 문자열을 반환한다. 따라서 결과를 사용하려면 변수에 저장해야 한다.

\`\`\`python
name = "  홍길동  "
name.strip()

print(name)
\`\`\`

실행 결과는 앞뒤 공백이 그대로 남아 있다.

\`\`\`text
  홍길동  
\`\`\`

다음처럼 작성해야 정리된 값을 사용할 수 있다.

\`\`\`python
name = "  홍길동  "
name = name.strip()

print(name)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
홍길동
\`\`\`

이 점은 문자열이 불변 데이터라는 특징과 연결된다.

## 문자열 다루기 실무 예시

전화번호를 정리하는 상황을 생각해 보자.

\`\`\`python
phone = " 010-1234-5678 "
clean_phone = phone.strip().replace("-", "")

print(clean_phone)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
01012345678
\`\`\`

위 코드에서는 먼저 \`strip()\`으로 앞뒤 공백을 제거하고, 이어서 \`replace()\`로 하이픈을 제거했다. 이런 방식으로 여러 문자열 메서드를 연결해서 사용할 수 있다.

이메일 주소를 정리하는 예시도 보자.

\`\`\`python
email = " USER@EXAMPLE.COM "
clean_email = email.strip().lower()

print(clean_email)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
user@example.com
\`\`\`

실무 데이터는 사람이 입력하거나 여러 시스템을 거쳐 들어오기 때문에 형식이 일정하지 않은 경우가 많다. 문자열 메서드는 이런 데이터를 정리하는 첫 번째 도구이다.

## 2.3 핵심 정리

- \`len()\`으로 문자열 길이를 확인할 수 있다.
- 문자열 인덱스는 0부터 시작한다.
- 슬라이싱으로 문자열 일부를 추출할 수 있다.
- f-string으로 문자열 안에 변수 값을 넣을 수 있다.
- \`strip()\`은 앞뒤 공백을 제거한다.
- \`lower()\`와 \`upper()\`는 대소문자를 변환한다.
- \`find()\`, \`index()\`, \`count()\`, \`in\`으로 문자열을 찾을 수 있다.
- \`replace()\`는 문자열 일부를 바꾼 새 문자열을 만든다.
- \`split()\`은 문자열을 나누고, \`join()\`은 문자열을 합친다.
- \`startswith()\`와 \`endswith()\`는 시작과 끝을 확인한다.
- 문자열 메서드는 대부분 원본을 바꾸지 않고 새 문자열을 반환한다.

---
`;export{e as default};