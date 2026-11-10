package com.bubu.dailyquote;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import java.util.Calendar;

/** 09:00 / 13:00 / 17:00 / 21:00 네 번의 알람을 예약한다. */
public final class AlarmScheduler {

    public static final int[] SLOT_HOURS = {9, 13, 17, 21};
    public static final int SLOT_MINUTE = 0;

    private static final String ACTION = "com.bubu.dailyquote.ALARM";
    private static final String EXTRA_SLOT = "slot";

    private AlarmScheduler() {
    }

    public static void scheduleAll(Context context) {
        for (int slot = 0; slot < SLOT_HOURS.length; slot++) {
            scheduleSlot(context, slot);
        }
    }

    public static void scheduleSlot(Context context, int slot) {
        AlarmManager manager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if (manager == null) {
            return;
        }
        long triggerAt = nextTriggerMillis(slot);

        if (canUseExactAlarm(manager)) {
            manager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerAt, pendingIntent(context, slot));
        } else {
            manager.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerAt, pendingIntent(context, slot));
        }
    }

    public static void cancelAll(Context context) {
        AlarmManager manager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if (manager == null) {
            return;
        }
        for (int slot = 0; slot < SLOT_HOURS.length; slot++) {
            manager.cancel(pendingIntent(context, slot));
        }
    }

    public static boolean canUseExactAlarm(AlarmManager manager) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            return manager.canScheduleExactAlarms();
        }
        return true;
    }

    /** slot(0~3)의 다음 발송 시각. 오늘 시각이 지났으면 내일로 넘어간다. */
    public static long nextTriggerMillis(int slot) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, SLOT_HOURS[slot]);
        calendar.set(Calendar.MINUTE, SLOT_MINUTE);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        if (calendar.getTimeInMillis() <= System.currentTimeMillis()) {
            calendar.add(Calendar.DAY_OF_YEAR, 1);
        }
        return calendar.getTimeInMillis();
    }

    /** 가장 가까운 다음 알람의 slot. */
    public static int nextSlot() {
        int best = 0;
        long bestAt = Long.MAX_VALUE;
        for (int slot = 0; slot < SLOT_HOURS.length; slot++) {
            long at = nextTriggerMillis(slot);
            if (at < bestAt) {
                bestAt = at;
                best = slot;
            }
        }
        return best;
    }

    static PendingIntent pendingIntent(Context context, int slot) {
        Intent intent = new Intent(context, AlarmReceiver.class);
        intent.setAction(ACTION);
        intent.putExtra(EXTRA_SLOT, slot);

        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            flags |= PendingIntent.FLAG_IMMUTABLE;
        }
        return PendingIntent.getBroadcast(context, slot, intent, flags);
    }

    static int slotOf(Intent intent) {
        return intent.getIntExtra(EXTRA_SLOT, 0);
    }
}
