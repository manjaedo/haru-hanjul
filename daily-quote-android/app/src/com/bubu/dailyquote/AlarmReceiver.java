package com.bubu.dailyquote;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/** 예약된 시각에 명언을 띄우고, 다음 날 같은 시각을 다시 예약한다. */
public class AlarmReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        int slot = AlarmScheduler.slotOf(intent);
        QuoteRepository.Quote quote = QuoteRepository.forSlot(context, slot);
        NotificationHelper.show(context, quote, slot);
        AlarmScheduler.scheduleSlot(context, slot);
    }
}
