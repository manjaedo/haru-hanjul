#!/usr/bin/env python3
"""quotes.json에서 명언을 읽어 무작위로 하나 출력하거나(--list) 전체 목록을 출력한다."""
import argparse
import json
import random
from pathlib import Path

QUOTES_FILE = Path(__file__).resolve().parent / "quotes.json"


def load_quotes():
    with open(QUOTES_FILE, encoding="utf-8") as f:
        return json.load(f)


def format_quote(quote):
    return f"\"{quote['text']}\" — {quote['author']}"


def main():
    parser = argparse.ArgumentParser(description="무작위 명언 출력기")
    parser.add_argument("--list", action="store_true", help="전체 명언 목록 출력")
    args = parser.parse_args()

    quotes = load_quotes()
    if args.list:
        for i, quote in enumerate(quotes, 1):
            print(f"{i:4}. {format_quote(quote)}")
    else:
        print(format_quote(random.choice(quotes)))


if __name__ == "__main__":
    main()
