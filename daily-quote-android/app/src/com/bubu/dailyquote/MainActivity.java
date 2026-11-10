package com.bubu.dailyquote;

import android.Manifest;
import android.app.Activity;
import android.app.AlarmManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.PowerManager;
import android.provider.Settings;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class MainActivity extends Activity {

    private static final int REQ_NOTIFICATIONS = 10;

    private static final int COLOR_BG = 0xFFF5F5F7;
    private static final int COLOR_TEXT = 0xFF1A1A1A;
    private static final int COLOR_SUB = 0xFF6B6B6B;
    private static final int COLOR_ACCENT = 0xFF3F51B5;
    private static final int COLOR_OK = 0xFF2E7D32;
    private static final int COLOR_WARN = 0xFFC62828;

    private LinearLayout statusBox;
    private TextView nextTime;
    private TextView quoteText;
    private TextView quoteAuthor;
    private TextView quoteNote;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        NotificationHelper.ensureChannel(this);
        AlarmScheduler.scheduleAll(this);
        setContentView(buildUi());
    }

    @Override
    protected void onResume() {
        super.onResume();
        AlarmScheduler.scheduleAll(this);
        refresh();
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        refresh();
    }

    // ---------------------------------------------------------------- UI

    private View buildUi() {
        ScrollView scroll = new ScrollView(this);
        scroll.setBackgroundColor(COLOR_BG);

        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setPadding(dp(20), dp(24), dp(20), dp(32));
        scroll.addView(root);

        TextView title = new TextView(this);
        title.setText("오늘의 명언");
        title.setTextSize(24);
        title.setTypeface(Typeface.DEFAULT_BOLD);
        title.setTextColor(COLOR_TEXT);
        root.addView(title);

        TextView subtitle = new TextView(this);
        subtitle.setText("매일 09:00 · 13:00 · 17:00 · 21:00");
        subtitle.setTextSize(13);
        subtitle.setTextColor(COLOR_SUB);
        subtitle.setPadding(0, dp(4), 0, dp(20));
        root.addView(subtitle);

        // 다음 알림 카드
        LinearLayout preview = card();
        TextView label = new TextView(this);
        label.setText("다음 알림");
        label.setTextSize(12);
        label.setTextColor(COLOR_SUB);
        preview.addView(label);

        nextTime = new TextView(this);
        nextTime.setTextSize(15);
        nextTime.setTypeface(Typeface.DEFAULT_BOLD);
        nextTime.setTextColor(COLOR_ACCENT);
        nextTime.setPadding(0, dp(2), 0, dp(16));
        preview.addView(nextTime);

        quoteText = new TextView(this);
        quoteText.setTextSize(19);
        quoteText.setTextColor(COLOR_TEXT);
        quoteText.setLineSpacing(dp(4), 1.0f);
        preview.addView(quoteText);

        quoteAuthor = new TextView(this);
        quoteAuthor.setTextSize(14);
        quoteAuthor.setTextColor(COLOR_SUB);
        quoteAuthor.setGravity(Gravity.END);
        quoteAuthor.setPadding(0, dp(10), 0, 0);
        preview.addView(quoteAuthor);

        quoteNote = new TextView(this);
        quoteNote.setTextSize(13);
        quoteNote.setTextColor(COLOR_SUB);
        quoteNote.setLineSpacing(dp(3), 1.0f);
        quoteNote.setPadding(0, dp(12), 0, 0);
        preview.addView(quoteNote);
        root.addView(preview);

        // 상태 카드
        LinearLayout statusCard = card();
        TextView statusTitle = new TextView(this);
        statusTitle.setText("알림 설정 상태");
        statusTitle.setTextSize(13);
        statusTitle.setTypeface(Typeface.DEFAULT_BOLD);
        statusTitle.setTextColor(COLOR_TEXT);
        statusTitle.setPadding(0, 0, 0, dp(10));
        statusCard.addView(statusTitle);

        statusBox = new LinearLayout(this);
        statusBox.setOrientation(LinearLayout.VERTICAL);
        statusCard.addView(statusBox);
        root.addView(statusCard);

        root.addView(filledButton("테스트 알림 지금 받기", new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sendTest();
            }
        }));

        root.addView(outlineButton("알람 다시 예약하기", new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                AlarmScheduler.scheduleAll(MainActivity.this);
                refresh();
                Toast.makeText(MainActivity.this, "4회 알람을 다시 예약했습니다.", Toast.LENGTH_SHORT).show();
            }
        }));

        TextView footer = new TextView(this);
        footer.setText("이 앱은 인터넷을 사용하지 않습니다.\n"
                + "명언 " + QuoteRepository.all(this).size() + "개가 앱 안에 들어 있고, 하루 4개씩 새로 나옵니다.\n\n"
                + "삼성폰은 설정 → 배터리 → 백그라운드 사용 제한에서\n이 앱을 '제한 없음'으로 두면 가장 정확합니다.");
        footer.setTextSize(12);
        footer.setTextColor(0xFF9A9A9A);
        footer.setLineSpacing(dp(3), 1.0f);
        footer.setPadding(0, dp(20), 0, 0);
        root.addView(footer);

        return scroll;
    }

    private void refresh() {
        int slot = AlarmScheduler.nextSlot();
        long at = AlarmScheduler.nextTriggerMillis(slot);
        QuoteRepository.Quote quote = QuoteRepository.at(this, at, slot);

        nextTime.setText(new SimpleDateFormat("M월 d일 (E) HH:mm", Locale.KOREAN).format(new Date(at)));
        quoteText.setText("\u201C" + quote.text + "\u201D");
        quoteAuthor.setText("\u2014 " + quote.author
                + (quote.source == null ? "" : ", \u300A" + quote.source + "\u300B"));

        if (quote.note == null || quote.note.isEmpty()) {
            quoteNote.setVisibility(View.GONE);
        } else {
            quoteNote.setVisibility(View.VISIBLE);
            quoteNote.setText(quote.note);
        }

        statusBox.removeAllViews();

        // 1) 알림 권한
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU && !NotificationHelper.canNotify(this)) {
            statusBox.addView(warningRow("알림 권한이 꺼져 있습니다", "권한 허용", new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, REQ_NOTIFICATIONS);
                }
            }));
        } else {
            statusBox.addView(okRow("알림 표시: 정상"));
        }

        // 2) 정확한 알람 권한 (안드로이드 12+)
        AlarmManager alarmManager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S
                && alarmManager != null && !alarmManager.canScheduleExactAlarms()) {
            statusBox.addView(warningRow("정확한 시각 알람이 꺼져 있습니다 (수 분 늦을 수 있음)",
                    "설정 열기", new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                                startActivity(new Intent(
                                        Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM,
                                        Uri.parse("package:" + getPackageName())));
                            }
                        }
                    }));
        } else {
            statusBox.addView(okRow("정시 알람: 정상"));
        }

        // 3) 배터리 최적화
        PowerManager powerManager = (PowerManager) getSystemService(Context.POWER_SERVICE);
        boolean ignoring = powerManager != null
                && powerManager.isIgnoringBatteryOptimizations(getPackageName());
        if (ignoring) {
            statusBox.addView(okRow("배터리 최적화: 예외"));
        } else {
            statusBox.addView(warningRow("배터리 최적화 예외를 권장합니다", "예외 설정", new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    try {
                        startActivity(new Intent(
                                Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS,
                                Uri.parse("package:" + getPackageName())));
                    } catch (Exception e) {
                        startActivity(new Intent(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS));
                    }
                }
            }));
        }
    }

    private void sendTest() {
        if (!NotificationHelper.canNotify(this)) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, REQ_NOTIFICATIONS);
            }
            return;
        }
        int slot = AlarmScheduler.nextSlot();
        QuoteRepository.Quote quote = QuoteRepository.forSlot(this, slot);
        NotificationHelper.show(this, quote, slot);
        Toast.makeText(this, "알림을 보냈습니다. (상단 알림창 확인)", Toast.LENGTH_SHORT).show();
    }

    // ------------------------------------------------------------- helpers

    private LinearLayout card() {
        LinearLayout card = new LinearLayout(this);
        card.setOrientation(LinearLayout.VERTICAL);
        card.setPadding(dp(18), dp(18), dp(18), dp(18));

        GradientDrawable background = new GradientDrawable();
        background.setColor(Color.WHITE);
        background.setCornerRadius(dp(16));
        background.setStroke(dp(1), 0xFFE6E6EA);
        card.setBackground(background);
        card.setElevation(dp(2));

        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        params.bottomMargin = dp(14);
        card.setLayoutParams(params);
        return card;
    }

    private TextView okRow(String text) {
        TextView row = new TextView(this);
        row.setText("\u2713  " + text);
        row.setTextSize(13);
        row.setTextColor(COLOR_OK);
        row.setPadding(0, dp(4), 0, dp(4));
        return row;
    }

    private View warningRow(String text, String actionLabel, View.OnClickListener listener) {
        LinearLayout row = new LinearLayout(this);
        row.setOrientation(LinearLayout.HORIZONTAL);
        row.setGravity(Gravity.CENTER_VERTICAL);
        row.setPadding(0, dp(2), 0, dp(2));

        TextView label = new TextView(this);
        label.setText("\u26A0  " + text);
        label.setTextSize(13);
        label.setTextColor(COLOR_WARN);
        row.addView(label, new LinearLayout.LayoutParams(0,
                ViewGroup.LayoutParams.WRAP_CONTENT, 1f));

        Button button = new Button(this);
        button.setText(actionLabel);
        button.setTextSize(12);
        button.setAllCaps(false);
        button.setBackgroundTintList(android.content.res.ColorStateList.valueOf(COLOR_WARN));
        button.setTextColor(Color.WHITE);
        button.setMinWidth(0);
        button.setMinimumWidth(0);
        button.setPadding(dp(12), 0, dp(12), 0);
        button.setOnClickListener(listener);
        row.addView(button);
        return row;
    }

    private Button filledButton(String label, View.OnClickListener listener) {
        Button button = new Button(this);
        button.setText(label);
        button.setAllCaps(false);
        button.setTextSize(15);
        button.setTextColor(Color.WHITE);
        button.setBackgroundTintList(android.content.res.ColorStateList.valueOf(COLOR_ACCENT));
        button.setOnClickListener(listener);

        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, dp(52));
        params.bottomMargin = dp(10);
        button.setLayoutParams(params);
        return button;
    }

    private Button outlineButton(String label, View.OnClickListener listener) {
        Button button = new Button(this);
        button.setText(label);
        button.setAllCaps(false);
        button.setTextSize(14);
        button.setTextColor(COLOR_ACCENT);
        button.setBackgroundTintList(android.content.res.ColorStateList.valueOf(0x224C5CD6));
        button.setOnClickListener(listener);

        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, dp(48));
        params.bottomMargin = dp(4);
        button.setLayoutParams(params);
        return button;
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }
}
