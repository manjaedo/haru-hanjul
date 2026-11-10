package com.bubu.dailyquote;

import android.content.Context;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/** 앱에 내장된 quotes.json에서 명언을 읽어 온다. */
public final class QuoteRepository {

    private static final String TAG = "DailyQuote";
    private static List<Quote> cache;

    public static final class Quote {
        public final String text;
        public final String author;
        public final String source;
        public final String note;

        Quote(String text, String author, String source, String note) {
            this.text = text;
            this.author = author;
            this.source = source;
            this.note = note;
        }

        /** 알림 본문: “명언” + — 이름, 《출처》 */
        public String body() {
            StringBuilder sb = new StringBuilder();
            sb.append('\u201C').append(text).append('\u201D').append('\n').append('\n');
            sb.append("\u2014 ").append(author);
            if (source != null && !source.isEmpty()) {
                sb.append(", \u300A").append(source).append("\u300B");
            }
            if (note != null && !note.isEmpty()) {
                sb.append('\n').append('\n').append(note);
            }
            return sb.toString();
        }
    }

    private QuoteRepository() {
    }

    public static synchronized List<Quote> all(Context context) {
        if (cache != null) {
            return cache;
        }
        List<Quote> list = new ArrayList<>();
        try {
            InputStream in = context.getResources().openRawResource(R.raw.quotes);
            ByteArrayOutputStream buffer = new ByteArrayOutputStream();
            byte[] chunk = new byte[8192];
            int read;
            while ((read = in.read(chunk)) > 0) {
                buffer.write(chunk, 0, read);
            }
            in.close();

            JSONArray array = new JSONArray(new String(buffer.toByteArray(), "UTF-8"));
            for (int i = 0; i < array.length(); i++) {
                JSONObject item = array.getJSONObject(i);
                String source = item.isNull("source") ? null : item.optString("source", null);
                String note = item.isNull("note") ? null : item.optString("note", null);
                list.add(new Quote(item.getString("text"), item.getString("author"), source, note));
            }
        } catch (Exception e) {
            Log.e(TAG, "명언을 읽지 못했습니다", e);
        }

        if (list.isEmpty()) {
            list.add(new Quote("명언을 불러오지 못했습니다.", "앱", null, null));
        }
        cache = list;
        return list;
    }

    /**
     * 날짜 + 시간대(slot)로 명언을 고른다.
     * 하루 4개씩 서로 다른 명언이 나오고, 전체를 다 쓰면 처음부터 다시 돈다.
     */
    public static Quote forSlot(Context context, int slot) {
        return at(context, System.currentTimeMillis(), slot);
    }

    /** 특정 시각(밀리초)에 해당하는 명언. */
    public static Quote at(Context context, long millis, int slot) {
        List<Quote> quotes = all(context);
        long day = millis / 86400000L;
        int index = (int) ((day * AlarmScheduler.SLOT_HOURS.length + slot) % quotes.size());
        if (index < 0) {
            index += quotes.size();
        }
        return quotes.get(index);
    }

    /** 바로 다음에 나갈 명언. */
    public static Quote nextQuote(Context context) {
        int slot = AlarmScheduler.nextSlot();
        return at(context, AlarmScheduler.nextTriggerMillis(slot), slot);
    }
}
