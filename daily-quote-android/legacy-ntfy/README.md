# (백업) ntfy 방식 — Mac에서 보내던 이전 구현

지금은 폰 앱(`app/`)이 대신하므로 **사용하지 않습니다.** 기록용 백업입니다.

- `send.py` : 명언 1개를 골라 ntfy로 전송
- `install.py` : macOS LaunchAgent 등록/해제 (`--status`, `--uninstall`)
- `config.json` : 서버·주제·시각 설정 (topic은 플레이스홀더로 비워 둠)

## 되살리려면

1. `config.json` 의 `YOUR-TOPIC-HERE` 를 실제 ntfy 주제로 바꿉니다.
2. 명언 데이터를 복사합니다.
   ```bash
   cp app/res/raw/quotes.json ./quotes.json
   ```
3. `python3 install.py` 로 등록하고, 폰 ntfy 앱에서 같은 주제를 구독합니다.

> 주의: ntfy.sh 는 공개 서버입니다. 주제 이름을 아는 사람은 읽고 보낼 수 있으므로
> 주제는 비밀번호처럼 다루세요. 이 저장소에는 실제 주제를 넣지 않았습니다.
