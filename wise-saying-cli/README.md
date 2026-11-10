# wise_saying

명언 1000개(한국어 번역 + 영어 원문) 가운데 하나를 골라 휴대폰으로 보내 주는 작은 프로젝트입니다.

- **터미널에서 보기**: `quote.py`로 무작위 명언 하나 또는 전체 목록을 출력합니다.
- **휴대폰 알림**: GitHub Actions가 3시간마다 [ntfy](https://ntfy.sh)와 텔레그램 봇으로 명언을 보냅니다. 밤 12시부터 아침 6시 사이에는 보내지 않습니다.

외부 패키지 없이 Python 표준 라이브러리만 사용합니다.

## 파일 구성

| 파일 | 설명 |
|---|---|
| `quotes.json` | 명언 데이터 1000개. 항목마다 `text`(한국어), `text_en`(영어 원문), `author`(저자)가 있습니다. |
| `quote.py` | 터미널에서 명언을 출력합니다. |
| `notify.py` | 명언 하나를 골라 ntfy와 텔레그램으로 보냅니다. |
| `.github/workflows/daily-quote.yml` | `notify.py`를 정해진 시간에 실행하는 GitHub Actions 워크플로입니다. |
| `tests/test_quotes.py` | 데이터, `quote.py`, `notify.py` 테스트입니다. |

## 설치

### 요구 사항

- Python 3.8 이상 (3.9에서 테스트했습니다)
- Git
- (알림을 쓰려면) GitHub 계정, ntfy 앱 또는 텔레그램

### 설치 방법

```bash
git clone https://github.com/manjaedo/wise_saying.git
cd wise_saying
```

설치할 패키지는 없습니다. 클론하면 바로 실행할 수 있습니다.

## 실행 예시

### 무작위 명언 하나 보기

```bash
python3 quote.py
```

```text
"우리가 선택한 생각은 삶이라는 캔버스를 칠하는 도구다." — Louise Hay
```

실행할 때마다 다른 명언이 나옵니다.

### 전체 목록 보기

```bash
python3 quote.py --list
```

```text
   1. "천재는 1퍼센트의 영감과 99퍼센트의 노력으로 이루어진다." — Thomas Edison
   2. "그저 지켜보는 것만으로도 많은 것을 알 수 있다." — Yogi Berra
   3. "스스로 분열된 집은 바로 설 수 없다." — Abraham Lincoln
  ...
1000. "기회를 놓치지 않도록 조심하라. 그렇지 않으면 언젠가는 완전히 늦어 버릴지도 모른다." — Franz Liszt
```

목록이 길어서 한 화면씩 보려면 `python3 quote.py --list | less`를 쓰세요.

### 알림 직접 보내기

`notify.py`는 환경 변수가 설정된 채널로만 보냅니다. 하나만 설정해도 됩니다.

```bash
# ntfy로 보내기
NTFY_TOPIC=내-채널-이름 python3 notify.py

# 텔레그램으로 보내기
TELEGRAM_BOT_TOKEN=봇-토큰 TELEGRAM_CHAT_ID=내-chat-id python3 notify.py
```

```text
이기려는 의지 없이 전쟁에 뛰어드는 것은 치명적이다. — General Douglas MacArthur
ntfy 200
telegram 200
```

설정된 채널이 하나도 없으면 안내 메시지를 출력하고 종료 코드 1로 끝납니다. 한 채널이 실패해도 나머지 채널로는 보내고, 마지막에 종료 코드 1을 돌려줍니다.

| 환경 변수 | 설명 |
|---|---|
| `NTFY_TOPIC` | ntfy 채널 이름. 이름을 아는 사람은 누구나 볼 수 있으니 짐작하기 어렵게 정하세요. |
| `NTFY_SERVER` | ntfy 서버 주소 (선택, 기본값 `https://ntfy.sh`) |
| `TELEGRAM_BOT_TOKEN` | @BotFather에게 받은 봇 토큰 |
| `TELEGRAM_CHAT_ID` | 메시지를 받을 chat ID (숫자) |

## 휴대폰 알림 설정 (GitHub Actions)

### 1. 알림 받을 앱 준비

**ntfy**
1. 휴대폰에 ntfy 앱을 설치합니다.
2. **+** 버튼을 눌러 채널 이름을 입력하고 구독합니다.

**텔레그램**
1. **@BotFather**에게 `/newbot`을 보내 봇을 만들고 토큰을 받습니다.
2. 만든 봇과 대화를 열고 `/start`를 보냅니다. 먼저 말을 걸어야 봇이 메시지를 보낼 수 있습니다.
3. **@userinfobot**에게 메시지를 보내 내 `Id`(숫자)를 확인합니다.

### 2. 저장소 Secret 등록

[GitHub CLI](https://cli.github.com/)로 등록하는 방법입니다. 저장소의 **Settings → Secrets and variables → Actions**에서 등록해도 됩니다.

```bash
gh secret set NTFY_TOPIC -R manjaedo/wise_saying
gh secret set TELEGRAM_BOT_TOKEN -R manjaedo/wise_saying
gh secret set TELEGRAM_CHAT_ID -R manjaedo/wise_saying
```

명령마다 값을 붙여 넣으라는 입력창이 뜹니다. 받지 않을 채널의 Secret은 등록하지 않거나 지우면 됩니다.

### 3. 발송 시간

`.github/workflows/daily-quote.yml`의 `cron`은 **UTC 기준**이라 한국 시간에서 9시간을 빼서 적어야 합니다.

| 한국 시간 (KST) | 06시 | 09시 | 12시 | 15시 | 18시 | 21시 |
|---|---|---|---|---|---|---|
| UTC | 21시 (전날) | 00시 | 03시 | 06시 | 09시 | 12시 |

```yaml
- cron: "0 0,3,6,9,12,21 * * *"
```

### 4. 바로 보내 보기

저장소의 **Actions → Daily quote → Run workflow**를 누르거나 아래 명령을 실행합니다.

```bash
gh workflow run daily-quote.yml -R manjaedo/wise_saying
```

### 알아 둘 점

- GitHub 예약 실행은 정해진 시간보다 몇 분에서 수십 분 늦게 돌아갈 수 있습니다.
- 저장소에 60일 동안 커밋이 없으면 GitHub가 예약 실행을 자동으로 멈춥니다. 멈추면 Actions 탭에서 다시 켜세요.

## 테스트

```bash
python3 -m unittest discover -s tests -v
```

```text
test_no_channels_exits_with_error (test_quotes.NotifyTest) ... ok
test_one_channel_failing_still_sends_the_other (test_quotes.NotifyTest) ... ok
test_sends_to_both_channels (test_quotes.NotifyTest) ... ok
test_telegram_needs_both_token_and_chat_id (test_quotes.NotifyTest) ... ok
test_list_prints_all_quotes (test_quotes.QuoteCliTest) ... ok
test_random_prints_one_quote (test_quotes.QuoteCliTest) ... ok
test_english_originals_are_unique (test_quotes.QuotesDataTest) ... ok
test_every_quote_has_fields (test_quotes.QuotesDataTest) ... ok
test_has_1000_quotes (test_quotes.QuotesDataTest) ... ok

----------------------------------------------------------------------
Ran 9 tests in 0.140s

OK
```

테스트가 확인하는 내용은 아래와 같습니다. 네트워크 요청은 가짜 응답으로 바꿔 치기 때문에 실제로 알림이 가지 않습니다.

- `quotes.json`에 명언이 1000개 있고, 모든 항목에 `text`, `text_en`, `author`가 있으며, 영어 원문이 겹치지 않는지
- `quote.py`가 인수 없이는 한 줄, `--list`로는 1000줄을 출력하는지
- `notify.py`가 설정된 채널로만 보내는지, 채널이 없거나 한 채널이 실패하면 오류로 끝나는지

특정 테스트만 돌리려면 클래스나 메서드 이름을 붙입니다.

```bash
python3 -m unittest tests.test_quotes.NotifyTest -v
```

## 데이터 출처

명언 원문과 저자는 공개 데이터셋 [JamesFT/Database-Quotes-JSON](https://github.com/JamesFT/Database-Quotes-JSON)에서 가져왔고, 한국어 번역은 Claude가 했습니다.

- 여러 사람이 모은 데이터라 저자 표기가 틀린 명언이 섞여 있을 수 있습니다.
- 번역은 한 줄씩 사람이 검토하지 않았습니다. 어색한 문장은 `text_en`의 원문과 비교해 보세요.
