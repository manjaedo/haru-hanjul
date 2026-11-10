package com.bubu.dailyquote;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/** 재부팅·시간 변경·앱 업데이트 후 알람을 다시 건다. */
public class BootReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        AlarmScheduler.scheduleAll(context);
    }
}
