var e=`<!-- 원본: python_data_analysis_basic_chapter_8_book.md / 세부 장: 8-11 -->

# 8.11 정답 및 해설

### 문제 1 정답

정답: B

\`sort_values()\`는 특정 컬럼의 값을 기준으로 행을 정렬합니다.

---

### 문제 2 정답

정답: B

\`ascending=False\`는 내림차순 정렬을 의미합니다.  
따라서 \`sales\` 값이 큰 행부터 정렬됩니다.

---

### 문제 3 정답

\`\`\`python
products.sort_values(by="price", ascending=False)
\`\`\`

\`price\`가 높은 순서대로 정렬해야 하므로 \`ascending=False\`를 사용합니다.

---

### 문제 4 정답

방법 1:

\`\`\`python
products.sort_values(by="price").head(1)
\`\`\`

방법 2:

\`\`\`python
products.nsmallest(1, "price")
\`\`\`

가격이 가장 낮은 상품을 찾는 것이므로 오름차순 정렬 후 첫 번째 행을 가져오거나, \`nsmallest()\`를 사용할 수 있습니다.

---

### 문제 5 정답

정답: 모니터

\`price\` 값이 가장 큰 상품은 모니터입니다.

\`\`\`text
모니터: 200000
키보드: 30000
마우스: 15000
\`\`\`

---

### 문제 6 정답

\`\`\`python
orders["rank"] = orders["total_price"].rank(
    ascending=False,
    method="dense"
).astype(int)

orders
\`\`\`

\`ascending=False\`는 큰 값이 높은 순위가 되도록 합니다.  
\`method="dense"\`는 동점자에게 같은 순위를 주고, 다음 순위를 바로 이어서 부여합니다.

예상 순위는 다음과 같습니다.

| order_id | total_price | rank |
|---:|---:|---:|
| 1 | 10000 | 3 |
| 2 | 30000 | 1 |
| 3 | 30000 | 1 |
| 4 | 20000 | 2 |

---

### 문제 7 정답

\`sort_index()\`는 기존 인덱스 값을 기준으로 행 순서를 정렬합니다.  
\`reset_index()\`는 현재 행 순서를 유지하면서 인덱스를 0부터 다시 부여합니다.

예를 들어 정렬된 데이터에서 원래 인덱스 순서로 되돌리고 싶으면 \`sort_index()\`를 사용합니다.  
정렬된 순서는 유지하고 왼쪽 번호만 다시 정리하고 싶으면 \`reset_index(drop=True)\`를 사용합니다.

---

### 문제 8 정답

\`\`\`python
df.sort_values(
    by=["category", "sales"],
    ascending=[True, False]
)
\`\`\`

\`category\`는 오름차순, \`sales\`는 내림차순이어야 하므로 \`ascending\`에 \`[True, False]\`를 전달합니다.

---

### 문제 9 정답

\`\`\`python
df.nlargest(2, "score")
\`\`\`

\`score\`가 가장 큰 2개 행을 추출합니다.  
결과에는 점수가 95인 지영, 90인 영희가 포함됩니다.

---

### 문제 10 정답

\`\`\`python
customers["purchase_rank"] = customers["total_purchase"].rank(
    ascending=False,
    method="dense"
).astype(int)

customers_sorted = customers.sort_values(by="purchase_rank").reset_index(drop=True)

customers_sorted
\`\`\`

예상 결과는 다음과 같습니다.

| customer | total_purchase | purchase_rank |
|---|---:|---:|
| A | 500000 | 1 |
| C | 500000 | 1 |
| B | 300000 | 2 |
| E | 300000 | 2 |
| D | 100000 | 3 |

\`method="dense"\`를 사용했기 때문에 동점자는 같은 순위를 받고, 다음 순위는 바로 다음 번호가 됩니다.

---
`;export{e as default};