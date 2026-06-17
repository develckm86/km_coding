var e=`<!-- 원본: python_data_analysis_basic_chapter_2_book.md / 세부 장: 2-8 -->

# 2.8 실습: 분석 프로젝트 폴더 만들기

이 장의 마지막 실습으로 데이터 분석 프로젝트 기본 폴더를 직접 만들어 보자.

---

## 2.8.1 폴더 구조 만들기

터미널에서 다음 명령을 실행한다.

macOS 또는 Linux에서는 다음과 같이 작성할 수 있다.

\`\`\`bash
mkdir -p data/raw data/processed notebooks outputs/charts outputs/reports src
touch README.md
\`\`\`

Windows PowerShell에서는 다음처럼 작성할 수 있다.

\`\`\`powershell
mkdir data
mkdir data\\raw
mkdir data\\processed
mkdir notebooks
mkdir outputs
mkdir outputs\\charts
mkdir outputs\\reports
mkdir src
New-Item README.md -ItemType File
\`\`\`

완성된 구조는 다음과 같아야 한다.

\`\`\`text
data_analysis_project/
  data/
    raw/
    processed/
  notebooks/
  outputs/
    charts/
    reports/
  src/
  README.md
\`\`\`

---

## 2.8.2 README.md 작성하기

\`README.md\` 파일에 다음 내용을 작성한다.

\`\`\`markdown
# 데이터 분석 기초 실습 프로젝트

## 프로젝트 목적
파이썬 데이터 분석 기초 수업에서 사용할 실습 프로젝트입니다.

## 폴더 구조
- data/raw: 원본 데이터
- data/processed: 전처리된 데이터
- notebooks: 분석 노트북
- outputs/charts: 그래프 이미지
- outputs/reports: 분석 보고서
- src: 재사용 파이썬 코드

## 사용 라이브러리
- numpy
- pandas
- matplotlib
- seaborn
- openpyxl

## 실행 방법
1. 가상환경을 활성화합니다.
2. 필요한 라이브러리를 설치합니다.
3. notebooks 폴더의 노트북을 실행합니다.
\`\`\`

처음에는 간단한 README로 충분하다.  
분석이 진행되면서 데이터 설명, 실행 순서, 결과 파일 설명을 추가하면 된다.

---

## 2.8.3 환경 점검 노트북 만들기

\`notebooks/\` 폴더 안에 다음 이름의 노트북을 만든다.

\`\`\`text
01_environment_check.ipynb
\`\`\`

첫 번째 마크다운 셀에는 다음 내용을 작성한다.

\`\`\`markdown
# 환경 점검 노트북

이 노트북은 데이터 분석 기초 수업을 위한 파이썬 환경이 제대로 준비되었는지 확인한다.
\`\`\`

다음 코드 셀에는 아래 코드를 입력한다.

\`\`\`python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

print("NumPy:", np.__version__)
print("pandas:", pd.__version__)
print("환경 점검 완료")
\`\`\`

이 코드가 에러 없이 실행되면 기본 환경 준비가 완료된 것이다.

---
`;export{e as default};