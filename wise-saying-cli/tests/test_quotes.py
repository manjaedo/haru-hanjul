"""quotes.json, quote.py, notify.py 테스트. 외부 네트워크에는 접속하지 않는다."""
import io
import json
import os
import subprocess
import sys
import unittest
import urllib.error
from pathlib import Path
from unittest import mock

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

import notify  # noqa: E402
import quote  # noqa: E402


def run_quote(*args):
    return subprocess.run(
        [sys.executable, str(ROOT / "quote.py"), *args],
        capture_output=True, text=True, encoding="utf-8", check=True,
    ).stdout


class QuotesDataTest(unittest.TestCase):
    def setUp(self):
        self.quotes = quote.load_quotes()

    def test_has_1000_quotes(self):
        self.assertEqual(len(self.quotes), 1000)

    def test_every_quote_has_fields(self):
        for i, q in enumerate(self.quotes):
            for field in ("text", "text_en", "author"):
                self.assertTrue(q.get(field, "").strip(), f"{i}번 항목의 {field}가 비어 있음")

    def test_english_originals_are_unique(self):
        texts = [q["text_en"].lower() for q in self.quotes]
        self.assertEqual(len(texts), len(set(texts)))


class QuoteCliTest(unittest.TestCase):
    def test_random_prints_one_quote(self):
        lines = run_quote().splitlines()
        self.assertEqual(len(lines), 1)
        self.assertIn(lines[0], {quote.format_quote(q) for q in quote.load_quotes()})

    def test_list_prints_all_quotes(self):
        lines = run_quote("--list").splitlines()
        self.assertEqual(len(lines), 1000)
        self.assertTrue(lines[0].strip().startswith("1. "))
        self.assertTrue(lines[-1].startswith("1000. "))


class FakeResponse:
    status = 200

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        return False


class NotifyTest(unittest.TestCase):
    def run_notify(self, env, urlopen):
        sent = []

        def fake_urlopen(req, timeout):
            sent.append((req.full_url, json.loads(req.data.decode("utf-8"))))
            return urlopen(req)

        with mock.patch.dict(os.environ, env, clear=True), \
                mock.patch("urllib.request.urlopen", fake_urlopen), \
                mock.patch("sys.stdout", io.StringIO()), \
                mock.patch("sys.stderr", io.StringIO()):
            notify.main()
        return sent

    def test_no_channels_exits_with_error(self):
        with self.assertRaises(SystemExit) as cm:
            self.run_notify({}, lambda req: FakeResponse())
        self.assertIn("NTFY_TOPIC", str(cm.exception.code))

    def test_sends_to_both_channels(self):
        env = {"NTFY_TOPIC": "test-topic", "TELEGRAM_BOT_TOKEN": "123:abc", "TELEGRAM_CHAT_ID": "42"}
        sent = self.run_notify(env, lambda req: FakeResponse())

        self.assertEqual(len(sent), 2)
        (ntfy_url, ntfy_body), (tg_url, tg_body) = sent
        self.assertEqual(ntfy_url, "https://ntfy.sh")
        self.assertEqual(ntfy_body["topic"], "test-topic")
        self.assertEqual(ntfy_body["title"], notify.TITLE)
        self.assertEqual(tg_url, "https://api.telegram.org/bot123:abc/sendMessage")
        self.assertEqual(tg_body["chat_id"], "42")
        self.assertIn(notify.TITLE, tg_body["text"])

    def test_telegram_needs_both_token_and_chat_id(self):
        sent = self.run_notify({"NTFY_TOPIC": "t", "TELEGRAM_BOT_TOKEN": "123:abc"}, lambda req: FakeResponse())
        self.assertEqual([url for url, _ in sent], ["https://ntfy.sh"])

    def test_one_channel_failing_still_sends_the_other(self):
        def urlopen(req):
            if "telegram" in req.full_url:
                raise urllib.error.HTTPError(req.full_url, 400, "Bad Request", {}, io.BytesIO(b'{"ok":false}'))
            return FakeResponse()

        env = {"NTFY_TOPIC": "t", "TELEGRAM_BOT_TOKEN": "123:abc", "TELEGRAM_CHAT_ID": "42"}
        with self.assertRaises(SystemExit) as cm:
            self.run_notify(env, urlopen)
        self.assertEqual(cm.exception.code, 1)


if __name__ == "__main__":
    unittest.main()
