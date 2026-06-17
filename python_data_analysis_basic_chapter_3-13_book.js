var e=`<!-- 원본: python_data_analysis_basic_chapter_3_book.md / 세부 장: 3-13 -->

# 3.13 종합 예제: 점수 데이터 분석

지금까지 배운 내용을 사용해 간단한 점수 데이터를 분석해 보자.

다음 배열은 5명의 학생이 세 과목에서 받은 점수다.

\`\`\`python
scores = np.array([
    [80, 90, 75],
    [70, 85, 95],
    [100, 90, 80],
    [60, 70, 65],
    [95, 100, 90]
])
\`\`\`

각 행은 학생, 각 열은 과목이라고 가정하자.

| 학생 | 국어 | 영어 | 수학 |
|---|---:|---:|---:|
| 1번 | 80 | 90 | 75 |
| 2번 | 70 | 85 | 95 |
| 3번 | 100 | 90 | 80 |
| 4번 | 60 | 70 | 65 |
| 5번 | 95 | 100 | 90 |

---

## 3.13.1 데이터 구조 확인

\`\`\`python
print(scores.shape)
print(scores.ndim)
print(scores.dtype)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
(5, 3)
2
int64
\`\`\`

5행 3열의 2차원 정수 배열이다.

---

## 3.13.2 학생별 총점과 평균

학생별 총점은 행별 합계이므로 \`axis=1\`을 사용한다.

\`\`\`python
student_totals = scores.sum(axis=1)
student_means = scores.mean(axis=1)

print(student_totals)
print(student_means)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[245 250 270 195 285]
[81.66666667 83.33333333 90.         65.         95.        ]
\`\`\`

---

## 3.13.3 과목별 평균

과목별 평균은 열별 평균이므로 \`axis=0\`을 사용한다.

\`\`\`python
subject_means = scores.mean(axis=0)

print(subject_means)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[81. 87. 81.]
\`\`\`

국어 평균은 81점, 영어 평균은 87점, 수학 평균은 81점이다.

---

## 3.13.4 평균 80점 이상 학생 찾기

학생별 평균이 80점 이상인 학생만 찾을 수 있다.

\`\`\`python
passed = student_means >= 80

print(passed)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[ True  True  True False  True]
\`\`\`

이 조건을 사용해 해당 학생들의 점수만 선택할 수 있다.

\`\`\`python
passed_scores = scores[passed]

print(passed_scores)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
[[ 80  90  75]
 [ 70  85  95]
 [100  90  80]
 [ 95 100  90]]
\`\`\`

4번 학생은 평균이 80점 미만이므로 제외되었다.

---

## 3.13.5 등급 만들기

학생 평균을 기준으로 간단한 등급을 만들어 보자.

\`\`\`python
grades = np.where(student_means >= 90, "A", "B")

print(grades)
\`\`\`

실행 결과는 다음과 같다.

\`\`\`text
['B' 'B' 'A' 'B' 'A']
\`\`\`

현재 코드는 90점 이상이면 A, 아니면 B로만 분류한다. 더 세밀한 분류는 조건문을 여러 번 사용하거나, 나중에 pandas에서 더 편리하게 처리할 수 있다.

---
`;export{e as default};