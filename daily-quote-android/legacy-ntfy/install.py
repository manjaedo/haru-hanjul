#!/usr/bin/env python3
"""config.json의 시각을 읽어 macOS LaunchAgent를 만들고 등록한다.

사용법:
    python3 install.py             # 설치/갱신 + 등록
    python3 install.py --uninstall # 등록 해제 + 삭제
    python3 install.py --status    # 등록 상태 확인
"""

import json
import os
import plistlib
import subprocess
import sys

BASE = os.path.dirname(os.path.abspath(__file__))
CONFIG_PATH = os.path.join(BASE, "config.json")
LABEL = "com.bookubooku.dailyquote"
PLIST_PATH = os.path.expanduser(f"~/Library/LaunchAgents/{LABEL}.plist")
DOMAIN = f"gui/{os.getuid()}"


def run(*command: str) -> subprocess.CompletedProcess:
    return subprocess.run(command, capture_output=True, text=True)


def load_times() -> list[tuple[int, int]]:
    with open(CONFIG_PATH, encoding="utf-8") as f:
        config = json.load(f)
    times = []
    for value in config["times"]:
        hour, minute = value.split(":")
        times.append((int(hour), int(minute)))
    if not times:
        raise SystemExit("config.json의 times가 비어 있습니다.")
    return times


def build_plist(times: list[tuple[int, int]]) -> dict:
    os.makedirs(os.path.join(BASE, "logs"), exist_ok=True)
    return {
        "Label": LABEL,
        "ProgramArguments": ["/usr/bin/python3", os.path.join(BASE, "send.py")],
        "WorkingDirectory": BASE,
        "StartCalendarInterval": [{"Hour": h, "Minute": m} for h, m in times],
        "RunAtLoad": False,
        "ProcessType": "Background",
        "StandardOutPath": os.path.join(BASE, "logs", "launchd.out.log"),
        "StandardErrorPath": os.path.join(BASE, "logs", "launchd.err.log"),
        "EnvironmentVariables": {"PATH": "/usr/bin:/bin:/usr/sbin:/sbin"},
    }


def install() -> int:
    times = load_times()
    os.makedirs(os.path.dirname(PLIST_PATH), exist_ok=True)
    with open(PLIST_PATH, "wb") as f:
        plistlib.dump(build_plist(times), f)

    run("launchctl", "bootout", f"{DOMAIN}/{LABEL}")
    result = run("launchctl", "bootstrap", DOMAIN, PLIST_PATH)
    if result.returncode != 0:
        print(result.stderr.strip() or result.stdout.strip())
        return 1

    schedule = ", ".join(f"{h:02d}:{m:02d}" for h, m in times)
    print(f"등록 완료: {LABEL}")
    print(f"  시각: {schedule} (매일)")
    print(f"  plist: {PLIST_PATH}")
    print(f"  로그: {BASE}/logs/send.log")
    return 0


def uninstall() -> int:
    run("launchctl", "bootout", f"{DOMAIN}/{LABEL}")
    if os.path.exists(PLIST_PATH):
        os.remove(PLIST_PATH)
    print("등록을 해제하고 plist를 삭제했습니다.")
    return 0


def status() -> int:
    result = run("launchctl", "print", f"{DOMAIN}/{LABEL}")
    if result.returncode != 0:
        print("등록되어 있지 않습니다.")
        return 1
    for line in result.stdout.splitlines():
        if any(key in line for key in ("state =", "last exit", "runs =", "program =", "path =")):
            print(line.strip())
    with open(CONFIG_PATH, encoding="utf-8") as f:
        config = json.load(f)
    print("시각:", ", ".join(config["times"]))
    return 0


if __name__ == "__main__":
    args = sys.argv[1:]
    if "--uninstall" in args:
        sys.exit(uninstall())
    if "--status" in args:
        sys.exit(status())
    sys.exit(install())
