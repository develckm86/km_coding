var e=`<!-- 원본: python_advanced_chapter_2_book.md / 세부 장: 2-3 -->

# 2.3 가변 객체와 불변 객체 심화

### 2.3.1 가변 객체와 불변 객체

파이썬 객체는 크게 **가변 객체**와 **불변 객체**로 나눌 수 있다.

가변 객체는 만들어진 뒤 내부 값을 바꿀 수 있는 객체다.

\`\`\`text
list
set
dict
\`\`\`

불변 객체는 만들어진 뒤 내부 값을 바꿀 수 없는 객체다.

\`\`\`text
int
float
str
tuple
bool
None
\`\`\`

리스트는 가변 객체다.

\`\`\`python
numbers = [1, 2, 3]
numbers.append(4)

print(numbers)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[1, 2, 3, 4]
\`\`\`

문자열은 불변 객체다.

\`\`\`python
text = "python"
# text[0] = "P"  # TypeError 발생
\`\`\`

문자열 일부를 직접 바꿀 수 없다. 바꾸고 싶다면 새 문자열을 만들어야 한다.

\`\`\`python
text = "Python" + text[1:]
print(text)
\`\`\`

---

### 2.3.2 가변 객체에서 주의할 점

가변 객체는 여러 이름이 같은 객체를 참조할 때 특히 주의해야 한다.

\`\`\`python
a = [1, 2, 3]
b = a

b.append(4)

print(a)
print(b)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[1, 2, 3, 4]
[1, 2, 3, 4]
\`\`\`

\`a\`와 \`b\`는 같은 리스트 객체를 가리킨다. 따라서 \`b.append(4)\`는 \`b\`만 바꾸는 것이 아니라, 두 이름이 함께 가리키는 리스트 객체 자체를 바꾼다.

반면 숫자는 불변 객체다.

\`\`\`python
x = 10
y = x

y = y + 1

print(x)
print(y)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
10
11
\`\`\`

\`y = y + 1\`은 정수 객체 10을 11로 고친 것이 아니다. 정수 객체 11이 새로 만들어지고, \`y\`가 그 객체를 가리키게 된 것이다.

---

### 2.3.3 함수 인자로 가변 객체를 넘길 때

함수에 리스트를 전달할 때도 같은 문제가 생길 수 있다.

\`\`\`python
def add_item(items, item):
    items.append(item)

cart = ["keyboard", "mouse"]
add_item(cart, "monitor")

print(cart)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['keyboard', 'mouse', 'monitor']
\`\`\`

함수 안에서 \`items.append(item)\`을 실행했는데 함수 밖의 \`cart\`도 바뀌었다. \`items\`와 \`cart\`가 같은 리스트 객체를 가리키기 때문이다.

이것이 항상 나쁜 것은 아니다. 함수가 외부 리스트를 변경하는 것이 의도라면 괜찮다. 하지만 의도하지 않은 변경이라면 문제가 된다.

외부 리스트를 바꾸지 않고 새 리스트를 반환하고 싶다면 다음처럼 작성할 수 있다.

\`\`\`python
def add_item_safely(items, item):
    new_items = items.copy()
    new_items.append(item)
    return new_items

cart = ["keyboard", "mouse"]
new_cart = add_item_safely(cart, "monitor")

print(cart)
print(new_cart)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['keyboard', 'mouse']
['keyboard', 'mouse', 'monitor']
\`\`\`

실무에서는 함수가 전달받은 데이터를 직접 바꾸는지, 새 데이터를 반환하는지 명확히 설계해야 한다.

---

### 2.3.4 기본값 인자와 가변 객체 함정

파이썬 함수에서 가장 자주 만나는 실수 중 하나는 가변 객체를 기본값 인자로 사용하는 것이다.

\`\`\`python
def add_task(task, tasks=[]):
    tasks.append(task)
    return tasks

print(add_task("메일 보내기"))
print(add_task("보고서 작성"))
print(add_task("회의 준비"))
\`\`\`

많은 사람은 각각 새 리스트가 만들어질 것이라고 예상한다. 하지만 실행 결과는 다음과 같다.

\`\`\`text
['메일 보내기']
['메일 보내기', '보고서 작성']
['메일 보내기', '보고서 작성', '회의 준비']
\`\`\`

기본값 인자는 함수가 호출될 때마다 새로 만들어지는 것이 아니라, 함수가 정의될 때 한 번 만들어진다. 그래서 \`tasks=[]\` 리스트가 계속 재사용된다.

안전한 방식은 \`None\`을 기본값으로 사용하고, 함수 안에서 새 리스트를 만드는 것이다.

\`\`\`python
def add_task(task, tasks=None):
    if tasks is None:
        tasks = []
    tasks.append(task)
    return tasks
\`\`\`

이 패턴은 실무에서 매우 중요하다. 기본값 인자에 리스트, 딕셔너리, 집합 같은 가변 객체를 직접 넣는 것은 피하는 것이 좋다.

---

### 2.3.5 얕은 복사와 깊은 복사

리스트를 복사할 때 \`copy()\`를 사용할 수 있다.

\`\`\`python
a = [1, 2, 3]
b = a.copy()

b.append(4)

print(a)
print(b)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[1, 2, 3]
[1, 2, 3, 4]
\`\`\`

겉으로 보기에는 복사가 잘 된 것 같다. 그러나 중첩 리스트에서는 주의해야 한다.

\`\`\`python
a = [[1, 2], [3, 4]]
b = a.copy()

b[0].append(99)

print(a)
print(b)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[[1, 2, 99], [3, 4]]
[[1, 2, 99], [3, 4]]
\`\`\`

\`copy()\`는 바깥 리스트만 새로 만든다. 안쪽 리스트는 여전히 같은 객체를 참조한다. 이런 복사를 **얕은 복사**라고 한다.

중첩된 내부 객체까지 모두 새로 복사하려면 \`copy\` 모듈의 \`deepcopy()\`를 사용할 수 있다.

\`\`\`python
import copy

a = [[1, 2], [3, 4]]
b = copy.deepcopy(a)

b[0].append(99)

print(a)
print(b)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[[1, 2], [3, 4]]
[[1, 2, 99], [3, 4]]
\`\`\`

실무에서 중첩 딕셔너리, JSON 응답, 설정값 객체를 복사할 때 이 차이가 중요하다.

---
`;export{e as default};