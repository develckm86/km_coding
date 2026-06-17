var e=`# 19장. 대용량 데이터 처리 실습

## 19.9 Parquet으로 저장하고 읽기

CSV 대신 Parquet을 사용하면 분석 효율이 좋아질 수 있습니다.

---

### 19.9.1 Parquet 저장

\`\`\`python
parquet_path = DATA_PROCESSED / "chapter_19_large_orders.parquet"

start = now()

orders_optimized.to_parquet(
    parquet_path,
    index=False
)

parquet_write_elapsed = now() - start
\`\`\`

만약 \`to_parquet()\`에서 오류가 발생한다면 \`pyarrow\` 또는 \`fastparquet\` 설치가 필요할 수 있습니다.

\`\`\`python
# pip install pyarrow
\`\`\`

---

### 19.9.2 Parquet 파일 크기 확인

\`\`\`python
csv_size_mb = large_csv_path.stat().st_size / 1024 ** 2
parquet_size_mb = parquet_path.stat().st_size / 1024 ** 2

csv_size_mb, parquet_size_mb
\`\`\`

---

### 19.9.3 Parquet 읽기

\`\`\`python
start = now()

orders_from_parquet = pd.read_parquet(parquet_path)

parquet_read_elapsed = now() - start

parquet_read_elapsed
\`\`\`

---

### 19.9.4 CSV와 Parquet 비교표

\`\`\`python
parquet_comparison_summary = pd.DataFrame([
    {
        "format": "csv",
        "file_size_mb": round(csv_size_mb, 2),
        "read_elapsed_seconds": round(read_full_elapsed, 3),
        "write_elapsed_seconds": np.nan
    },
    {
        "format": "parquet",
        "file_size_mb": round(parquet_size_mb, 2),
        "read_elapsed_seconds": round(parquet_read_elapsed, 3),
        "write_elapsed_seconds": round(parquet_write_elapsed, 3)
    }
])

parquet_comparison_summary
\`\`\`

저장합니다.

\`\`\`python
parquet_comparison_summary.to_csv(
    OUTPUT_TABLES / "chapter_19_parquet_comparison_summary.csv",
    index=False
)
\`\`\`

---

### 19.9.5 해석 예시

\`\`\`text
Parquet은 CSV보다 파일 크기가 작고 읽기 속도가 빠를 수 있다.
자료형 정보도 보존되므로 반복 분석용 중간 저장 형식으로 적합하다.
대용량 데이터 분석에서는 원본 CSV를 Parquet으로 변환해 두고 이후 분석에 사용하는 방식이 유용하다.
\`\`\`

---
`;export{e as default};