#!/usr/bin/env python3
"""quotes.json에서 명언 하나를 골라 설정된 채널(ntfy, 텔레그램)로 휴대폰 알림을 보낸다."""
import json
import os
import random
import sys
import urllib.error
import urllib.request
from pathlib import Path

QUOTES_FILE = Path(__file__).resolve().parent / "quotes.json"
NTFY_SERVER = os.environ.get("NTFY_SERVER", "https://ntfy.sh")
TITLE = "명언 한 줄"


def post_json(url, payload):
    req = urllib.request.Request(
        url,
        data=json.dumps(payload, ensure_ascii=False).encode("utf-8"),
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.status


def send_ntfy(topic, quote):
    return post_json(NTFY_SERVER, {
        "topic": topic,
        "title": TITLE,
        "message": f"{quote['text']}\n— {quote['author']}",
        "tags": ["sunny"],
    })


def send_telegram(token, chat_id, quote):
    return post_json(f"https://api.telegram.org/bot{token}/sendMessage", {
        "chat_id": chat_id,
        "text": f"☀️ {TITLE}\n\n{quote['text']}\n— {quote['author']}\n\n{quote['text_en']}",
    })


def main():
    with open(QUOTES_FILE, encoding="utf-8") as f:
        quote = random.choice(json.load(f))
    print(quote["text"], "—", quote["author"])

    channels = []
    if os.environ.get("NTFY_TOPIC"):
        channels.append(("ntfy", lambda: send_ntfy(os.environ["NTFY_TOPIC"], quote)))
    if os.environ.get("TELEGRAM_BOT_TOKEN") and os.environ.get("TELEGRAM_CHAT_ID"):
        channels.append(("telegram", lambda: send_telegram(
            os.environ["TELEGRAM_BOT_TOKEN"], os.environ["TELEGRAM_CHAT_ID"], quote)))
    if not channels:
        sys.exit("설정된 알림 채널이 없습니다. NTFY_TOPIC 또는 TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID를 설정하세요.")

    failed = False
    for name, send in channels:
        try:
            print(name, send())
        except Exception as e:  # 한 채널이 실패해도 나머지는 보낸다
            detail = e.read().decode("utf-8", "replace") if isinstance(e, urllib.error.HTTPError) else ""
            print(name, "실패:", e, detail, file=sys.stderr)
            failed = True
    if failed:
        sys.exit(1)


if __name__ == "__main__":
    main()
