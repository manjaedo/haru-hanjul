# 오늘의 명언 (Android 앱)

Mac·서버·계정 없이 **폰 단독**으로 매일 09:00 · 13:00 · 17:00 · 21:00 에
한국어 명언을 알림으로 띄우는 앱입니다.

- 패키지: `com.bubu.dailyquote`
- 크기: 약 56KB (v2.0)
- 권한: 알림 표시, 정확한 알람, 부팅 시 재예약, 배터리 최적화 예외 요청
- **인터넷 권한 없음** (INTERNET 퍼미션을 선언하지 않음)
- 명언 **1000개** 내장 → 4개/일 기준 **250일** 주기로 순환
- minSdk 23 (Android 6.0) / targetSdk 34

## 구조

```
app/AndroidManifest.xml
app/res/raw/quotes.json        명언 데이터 (text / author / source)
app/res/drawable/              아이콘 (알림용 PNG + 런처용 벡터)
app/src/com/bubu/dailyquote/
  MainActivity.java            화면 · 상태 진단 · 테스트 알림
  AlarmScheduler.java          4개 시각 알람 예약 (AlarmManager, 정시)
  AlarmReceiver.java           알람 수신 → 알림 표시 → 다음 날 재예약
  BootReceiver.java            재부팅/시간변경/업데이트 후 재예약
  NotificationHelper.java      채널 생성 및 알림 표시
  QuoteRepository.java         quotes.json 로딩 및 순환 선택
build.sh                       Gradle 없이 빌드 (aapt2 + javac + d8 + apksigner)
dist/daily-quote.apk           빌드 결과물
dist/index.html                폰에서 내려받기 위한 안내 페이지
```

## 빌드

```bash
cd ~/quote-app
./build.sh
```

필요한 것: `~/android-sdk` 의 build-tools 34.0.0, platforms/android-34, JDK 17
(`~/android-sdk/jdk/Contents/Home`), 그리고 시스템 `keytool`/`zip`.

## 데이터 구성 (1000개)

| 구분 | 개수 |
| --- | --- |
| 사자성어 (한자 + 뜻풀이) | 342 |
| 한국 속담 | 245 |
| 고전 명구 (논어·노자·맹자·장자·손자·중용·대학 등) | 193 |
| 한국 시·시조 | 72 |
| 서양 명언 | 69 |
| 한국 인물·기타 | 79 |

- 사자성어와 뜻이 있는 속담은 `note` 필드로 뜻풀이가 함께 표시됩니다.
- 속담 목록은 한국어 위키인용집 「가나다순 한국 속담」에서 가져왔습니다 (CC BY-SA 4.0).
- 서양 명언 중 일부는 널리 인용되는 말이라 원저자가 다를 수 있습니다.

## 명언 바꾸기

`app/res/raw/quotes.json` 을 고치고 `./build.sh` 를 다시 실행한 뒤 APK를 재설치합니다.
(같은 서명 키 `keys/quote.jks` 를 쓰므로 덮어쓰기 설치가 됩니다)

## 보내는 시각 바꾸기

`AlarmScheduler.java` 의 `SLOT_HOURS` 배열을 고치고 다시 빌드합니다.

```java
public static final int[] SLOT_HOURS = {9, 13, 17, 21};
```

## 폰에 설치

1. Mac에서 `dist` 폴더를 HTTP로 서빙
   ```bash
   cd ~/quote-app/dist && python3 -m http.server 8123 --bind 0.0.0.0
   ```
2. 폰(같은 Wi-Fi)에서 `http://<Mac IP>:8123/` 접속 → APK 다운로드
3. "출처를 알 수 없는 앱" 허용 후 설치
4. 앱 실행 → **테스트 알림 지금 받기** 로 확인
5. 상태 카드의 경고(알림 권한 / 정확한 알람 / 배터리 최적화)를 모두 해결

## 동작 방식

- 앱을 **한 번 실행하면** 4개 시각이 예약되고, 이후에는 앱을 열지 않아도 됩니다.
- 알람이 울릴 때마다 알림을 띄우고 **다음 날 같은 시각**을 스스로 다시 예약합니다.
- 재부팅하거나 시간대를 바꾸면 `BootReceiver` 가 4개를 다시 예약합니다.
- 앱을 "강제 종료"하면 OS가 알람을 지우므로, 그 경우 앱을 한 번 열어 주세요.

## 저장소 구조

```
app/                  앱 소스 (Java, 리소스, 내장 명언 1000개)
build.sh              Gradle 없이 빌드 (aapt2 + javac + d8 + apksigner)
dist/daily-quote.apk  빌드된 APK (v2.0)
dist/index.html       폰에서 내려받기 위한 안내 페이지
data/                 명언 데이터를 만들 때 쓴 중간 파일
legacy-ntfy/          (백업) Mac에서 ntfy로 보내던 이전 구현
NOTICE.md             데이터 출처·라이선스
keys/                 서명 키 — **git에 포함되지 않음**
```

## 서명 키 (중요)

앱 업데이트는 **같은 키로 서명해야** 덮어쓰기 설치가 됩니다. 키를 잃으면
기존 앱을 지우고 다시 설치해야 합니다.

- 키 파일: `keys/quote.jks` (저장소에 없음, `.gitignore` 처리)
- 비밀번호: `keys/keystore.properties` (저장소에 없음) 또는 `KEYSTORE_PASS` 환경변수
- 처음 빌드할 때는 다음처럼 만듭니다.

  ```bash
  printf 'KEYSTORE_PASS=원하는비밀번호\n' > keys/keystore.properties
  chmod 600 keys/keystore.properties
  ./build.sh
  ```

**백업 권장**: `keys/quote.jks` 와 비밀번호를 비밀번호 관리자나 암호화된 저장소에
따로 보관하세요. GitHub에 올리면 누구나 같은 서명의 가짜 업데이트를 만들 수 있습니다.

## 보안 메모

- 앱은 `INTERNET` 권한을 선언하지 않습니다. 네트워크로 나가는 코드가 없습니다.
- `SCHEDULE_EXACT_ALARM` / `USE_EXACT_ALARM` 은 정시 알림을 위해 사용합니다.
  (Play 스토어 정책상 알람 앱이 아니면 제한되지만, 직접 설치(sideload)용이라 문제 없습니다)
- `allowBackup="true"` 라 adb 백업으로 앱 데이터를 꺼낼 수 있으나, 저장하는 개인정보는 없습니다.
- `legacy-ntfy` 의 ntfy.sh 는 공개 서버입니다. 주제 이름을 아는 사람은 읽고 보낼 수 있습니다.
