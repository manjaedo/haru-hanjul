#!/bin/bash
# Gradle 없이 aapt2 + javac + d8 + apksigner 로 APK를 만든다.
set -euo pipefail

cd "$(dirname "$0")"

SDK="$HOME/android-sdk"
BT="$SDK/build-tools/34.0.0"
PLATFORM="$SDK/platforms/android-34/android.jar"
JDK="$SDK/jdk/Contents/Home"
export JAVA_HOME="$JDK"
export PATH="$JDK/bin:$PATH"

OUT=build
DIST=dist
APK_NAME="daily-quote.apk"

rm -rf "$OUT"
mkdir -p "$OUT/gen" "$OUT/classes" "$OUT/dex" "$OUT/res" "$DIST"

echo "1/6 리소스 컴파일"
"$BT/aapt2" compile --dir app/res -o "$OUT/res/resources.zip"

echo "2/6 리소스 링크"
"$BT/aapt2" link \
  -o "$OUT/base.apk" \
  -I "$PLATFORM" \
  --manifest app/AndroidManifest.xml \
  -R "$OUT/res/resources.zip" \
  --java "$OUT/gen" \
  --min-sdk-version 23 \
  --target-sdk-version 34 \
  --version-code 2 \
  --version-name "2.0" \
  --auto-add-overlay

echo "3/6 자바 컴파일"
find app/src "$OUT/gen" -name '*.java' > "$OUT/sources.txt"
javac --release 11 -nowarn -encoding UTF-8 \
  -classpath "$PLATFORM" \
  -d "$OUT/classes" \
  @"$OUT/sources.txt"

echo "4/6 dex 변환"
mkdir -p "$OUT/dex"
find "$OUT/classes" -name '*.class' > "$OUT/classes.txt"
"$BT/d8" --lib "$PLATFORM" --min-api 23 --output "$OUT/dex" @"$OUT/classes.txt"

(cd "$OUT/dex" && zip -q -X ../base.apk classes.dex)

echo "5/6 정렬"
"$BT/zipalign" -f 4 "$OUT/base.apk" "$OUT/aligned.apk"

echo "6/6 서명"
# 서명 키 비밀번호는 저장소에 넣지 않는다. keys/keystore.properties (git 제외) 또는 환경변수에서 읽는다.
if [ -f keys/keystore.properties ]; then
  # shellcheck disable=SC1091
  . keys/keystore.properties
fi
if [ -z "${KEYSTORE_PASS:-}" ]; then
  echo "오류: KEYSTORE_PASS 가 없습니다. keys/keystore.properties 를 만들거나 환경변수로 지정하세요." >&2
  echo "  예) KEYSTORE_PASS=**** ./build.sh" >&2
  exit 1
fi
if [ ! -f keys/quote.jks ]; then
  mkdir -p keys
  keytool -genkeypair -v \
    -keystore keys/quote.jks \
    -alias quote \
    -keyalg RSA -keysize 2048 -validity 10000 \
    -storepass "$KEYSTORE_PASS" -keypass "$KEYSTORE_PASS" \
    -dname "CN=Daily Quote, O=Bubu, C=KR" > /dev/null 2>&1
fi
rm -f "$DIST/$APK_NAME"
"$BT/apksigner" sign \
  --ks keys/quote.jks \
  --ks-pass "pass:$KEYSTORE_PASS" \
  --key-pass "pass:$KEYSTORE_PASS" \
  --out "$DIST/$APK_NAME" \
  "$OUT/aligned.apk"

"$BT/apksigner" verify --print-certs "$DIST/$APK_NAME" | head -3
echo
echo "완성: $DIST/$APK_NAME ($(du -h "$DIST/$APK_NAME" | cut -f1))"
