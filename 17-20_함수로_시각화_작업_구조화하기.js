var e=`# 17장. 고급 시각화 리포트 만들기

## 17.20 함수로 시각화 작업 구조화하기

반복되는 그래프 저장 작업은 함수로 만들면 편리합니다.

---

### 17.20.1 그래프 저장 함수

\`\`\`python
def save_current_figure(file_name: str) -> None:
    plt.tight_layout()
    plt.savefig(
        OUTPUT_CHARTS / file_name,
        bbox_inches="tight"
    )
    plt.show()
\`\`\`

사용 예:

\`\`\`python
plt.figure(figsize=(8, 4))
plt.bar(category_sales["category"], category_sales["total_sales"])
plt.title("카테고리별 매출")
plt.xlabel("카테고리")
plt.ylabel("매출")
save_current_figure("category_sales.png")
\`\`\`

---

### 17.20.2 막대 그래프 함수

\`\`\`python
def make_bar_chart(
    df: pd.DataFrame,
    x_col: str,
    y_col: str,
    title: str,
    x_label: str,
    y_label: str,
    file_name: str,
    rotation: int = 0
) -> None:
    plt.figure(figsize=(8, 4))

    plt.bar(df[x_col], df[y_col])

    plt.title(title)
    plt.xlabel(x_label)
    plt.ylabel(y_label)

    plt.xticks(rotation=rotation)
    plt.tight_layout()

    plt.savefig(
        OUTPUT_CHARTS / file_name,
        bbox_inches="tight"
    )

    plt.show()
\`\`\`

---

### 17.20.3 선 그래프 함수

\`\`\`python
def make_line_chart(
    df: pd.DataFrame,
    x_col: str,
    y_col: str,
    title: str,
    x_label: str,
    y_label: str,
    file_name: str,
    rotation: int = 0
) -> None:
    plt.figure(figsize=(10, 4))

    plt.plot(df[x_col], df[y_col], marker="o")

    plt.title(title)
    plt.xlabel(x_label)
    plt.ylabel(y_label)

    plt.xticks(rotation=rotation)
    plt.tight_layout()

    plt.savefig(
        OUTPUT_CHARTS / file_name,
        bbox_inches="tight"
    )

    plt.show()
\`\`\`

---

### 17.20.4 함수화의 장점

\`\`\`text
그래프 형식을 통일할 수 있다.
파일 저장 실수를 줄일 수 있다.
자동 리포트 생성에 활용할 수 있다.
같은 그래프를 다른 데이터에 반복 적용하기 쉽다.
\`\`\`

---
`;export{e as default};