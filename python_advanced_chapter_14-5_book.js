var e=`<!-- 원본: python_advanced_chapter_14_book.md / 세부 장: 14-5 -->

# 14.5 페이지네이션

## 한 번에 모든 데이터를 주지 않는 이유

API에서 목록 데이터를 요청하면 서버가 모든 데이터를 한 번에 보내지 않는 경우가 많다. 주문 데이터가 100만 건이라면 한 번의 응답으로 모두 보내는 것은 서버에도 클라이언트에도 부담이 크다.

그래서 API는 데이터를 여러 페이지로 나누어 제공한다. 이것을 페이지네이션이라고 한다.

페이지네이션 방식은 서비스마다 다르지만, 대표적으로 다음 방식이 있다.

- 페이지 번호 방식
- offset/limit 방식
- cursor 방식
- next URL 방식

## 페이지 번호 방식

가장 이해하기 쉬운 방식은 페이지 번호 방식이다.

\`\`\`text
GET /orders?page=1&limit=100
GET /orders?page=2&limit=100
GET /orders?page=3&limit=100
\`\`\`

응답은 다음과 같을 수 있다.

\`\`\`json
{
  "items": [
    {"id": 1, "amount": 10000},
    {"id": 2, "amount": 15000}
  ],
  "page": 1,
  "total_pages": 5
}
\`\`\`

이 경우 \`page\`를 1부터 \`total_pages\`까지 증가시키며 반복하면 된다.

\`\`\`python
def fetch_all_pages(client: APIClient) -> list[dict]:
    all_items = []
    page = 1

    while True:
        data = client.get("/orders", params={"page": page, "limit": 100})
        items = data["items"]
        all_items.extend(items)

        if page >= data["total_pages"]:
            break

        page += 1

    return all_items
\`\`\`

단순하지만 데이터가 많아지면 \`all_items\` 리스트가 커진다. 분석 전 단계에서는 결과를 바로 파일로 저장하거나 제너레이터로 처리하는 방식이 더 적합할 수 있다.

## 제너레이터로 페이지 처리하기

모든 데이터를 리스트에 모으지 않고 하나씩 넘겨주는 방식으로 만들 수 있다.

\`\`\`python
def iter_orders(client: APIClient):
    page = 1

    while True:
        data = client.get("/orders", params={"page": page, "limit": 100})
        items = data["items"]

        for item in items:
            yield item

        if page >= data["total_pages"]:
            break

        page += 1
\`\`\`

사용 코드는 다음과 같다.

\`\`\`python
for order in iter_orders(client):
    print(order)
\`\`\`

이 방식은 데이터가 많을 때 유리하다. 전체 데이터를 한 번에 리스트로 만들지 않고, 필요한 만큼 하나씩 처리할 수 있기 때문이다.

## offset/limit 방식

offset/limit 방식은 몇 번째 데이터부터 몇 개를 가져올지 지정한다.

\`\`\`text
GET /orders?offset=0&limit=100
GET /orders?offset=100&limit=100
GET /orders?offset=200&limit=100
\`\`\`

예시는 다음과 같다.

\`\`\`python
def iter_orders_by_offset(client: APIClient):
    offset = 0
    limit = 100

    while True:
        data = client.get("/orders", params={"offset": offset, "limit": limit})
        items = data["items"]

        if not items:
            break

        for item in items:
            yield item

        offset += limit
\`\`\`

응답에 전체 개수가 없더라도, 어느 순간 \`items\`가 빈 리스트가 되면 반복을 종료할 수 있다.

## cursor 방식

cursor 방식은 서버가 다음 요청에 사용할 커서를 알려주는 방식이다.

응답 예시는 다음과 같다.

\`\`\`json
{
  "items": [
    {"id": 101, "amount": 30000},
    {"id": 102, "amount": 45000}
  ],
  "next_cursor": "eyJpZCI6MTAyfQ=="
}
\`\`\`

다음 요청은 커서를 포함해 보낸다.

\`\`\`text
GET /orders?cursor=eyJpZCI6MTAyfQ==&limit=100
\`\`\`

파이썬으로 작성하면 다음과 같다.

\`\`\`python
def iter_orders_by_cursor(client: APIClient):
    cursor = None

    while True:
        params = {"limit": 100}

        if cursor:
            params["cursor"] = cursor

        data = client.get("/orders", params=params)
        items = data["items"]

        for item in items:
            yield item

        cursor = data.get("next_cursor")

        if not cursor:
            break
\`\`\`

cursor 방식은 데이터가 계속 추가되는 서비스에서 자주 사용된다. 페이지 번호 방식보다 안정적으로 다음 위치를 추적할 수 있기 때문이다.

## next URL 방식

일부 API는 다음 페이지 URL을 응답에 직접 포함한다.

\`\`\`json
{
  "results": [
    {"id": 1},
    {"id": 2}
  ],
  "next": "https://api.example.com/orders?page=2"
}
\`\`\`

이 경우 다음처럼 처리할 수 있다.

\`\`\`python
def iter_by_next_url(session: requests.Session, first_url: str):
    url = first_url

    while url:
        response = session.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()

        for item in data["results"]:
            yield item

        url = data.get("next")
\`\`\`

다만 next URL을 그대로 사용할지, base URL과 path를 재구성할지는 API 설계와 보안 정책에 따라 달라진다.

## 페이지네이션에서 주의할 점

페이지네이션 코드는 다음 사항을 고려해야 한다.

- 종료 조건이 명확해야 한다.
- 빈 페이지를 만났을 때 멈춰야 한다.
- 같은 페이지를 무한 반복하지 않도록 해야 한다.
- 요청 횟수가 많아지므로 Rate Limit을 고려해야 한다.
- 중간 실패 시 어디까지 수집했는지 기록할 필요가 있다.
- 데이터가 수집 중에도 변경될 수 있음을 고려해야 한다.

특히 무한 루프는 자주 발생하는 실수다.

\`\`\`python
# 위험한 예: page 증가가 빠져 있다.
while True:
    data = client.get("/orders", params={"page": page})
    ...
\`\`\`

반복 조건과 증가 조건을 명확히 작성해야 한다.

---
`;export{e as default};