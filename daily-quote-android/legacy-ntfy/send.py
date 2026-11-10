#!/usr/bin/env python3
"""한국어 명언을 ntfy로 폰에 보내는 스크립트.

사용법:
    python3 send.py            # 다음 명언을 전송 (스케줄러가 호출)
    python3 send.py --test     # 테스트 알림 1건 전송
    python3 send.py --preview  # 실제 전송 없이 내용만 확인
    python3 send.py --reset    # 다음 순서를 첫 번째 명언으로 되돌림
"""

import json
import os
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime

BASE = os.path.dirname(os.path.abspath(__file__))
CONFIG_PATH = os.path.join(BASE, "config.json")
QUOTES_PATH = os.path.join(BASE, "quotes.json")
STATE_PATH = os.path.join(BASE, "state.json")
LOG_PATH = os.path.join(BASE, "logs", "send.log")


def now() -> str:
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def log(message: str) -> None:
    os.makedirs(os.path.dirname(LOG_PATH), exist_ok=True)
    line = f"[{now()}] {message}"
    print(line)
    with open(LOG_PATH, "a", encoding="utf-8") as f:
        f.write(line + "\n")


def read_json(path: str, default):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return default


def write_json(path: str, data) -> None:
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")
    os.replace(tmp, path)


def format_quote(quote: dict) -> str:
    body = f"“{quote['text']}”\n\n— {quote['author']}"
    if quote.get("source"):
        body += f", 《{quote['source']}》"
    if quote.get("note"):
        body += f"\n\n{quote['note']}"
    return body


def pick(quotes: list, state: dict) -> tuple[dict, int]:
    index = state.get("index", 0) % len(quotes)
    quote = quotes[index]
    return quote, (index + 1) % len(quotes)


def send(config: dict, message: str, title: str) -> None:
    url = config["server"].rstrip("/") + "/"
    payload = {
        "topic": config["topic"],
        "title": title,
        "message": message,
        "tags": ["books"],
        "priority": 3,
    }
    data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    request = urllib.request.Request(
        url, data=data, headers={"Content-Type": "application/json; charset=utf-8"}
    )

    last_error = None
    for attempt in range(1, 4):
        try:
            with urllib.request.urlopen(request, timeout=20) as response:
                if response.status == 200:
                    return
                last_error = f"HTTP {response.status}"
        except urllib.error.HTTPError as error:
            body = error.read().decode("utf-8", "replace")[:300]
            last_error = f"HTTP {error.code} {body}"
        except Exception as error:  # 네트워크 오류 등
            last_error = f"{type(error).__name__}: {error}"
        if attempt < 3:
            time.sleep(5 * attempt)
    raise RuntimeError(f"전송 실패 - {last_error}")


def main() -> int:
    args = set(sys.argv[1:])
    config = read_json(CONFIG_PATH, None)
    quotes = read_json(QUOTES_PATH, None)
    if not config or not quotes:
        log("config.json 또는 quotes.json을 읽을 수 없습니다.")
        return 1

    if "--reset" in args:
        write_json(STATE_PATH, {"index": 0, "sent": 0})
        log("다음 순서를 첫 번째 명언으로 되돌렸습니다.")
        return 0

    state = read_json(STATE_PATH, {"index": 0, "sent": 0})
    quote, next_index = pick(quotes, state)
    message = format_quote(quote)
    title = config.get("title", "오늘의 명언")

    if "--preview" in args or "--test" in args:
        print(f"[{config['topic']}] {title}\n\n{message}")
        if "--preview" in args:
            print("\n(미리보기: 전송하지 않았습니다)")
            return 0

    try:
        send(config, message, title)
    except Exception as error:
        log(f"{error} (다음 실행에서 다시 시도합니다: {quote['author']} - {quote['text'][:20]}...)")
        return 1

    write_json(STATE_PATH, {"index": next_index, "sent": state.get("sent", 0) + 1})
    log(f"전송 완료 ({next_index}/{len(quotes)}): {quote['author']} - {quote['text'][:24]}...")
    return 0


if __name__ == "__main__":
    sys.exit(main())
