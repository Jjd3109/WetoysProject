package com.wetoys.wetoysproject.configuration;

import lombok.extern.slf4j.Slf4j;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Slf4j
public class CommonConfig {

    public static String changeDate(LocalDateTime date){

        // 변환 format
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일");

        String changeDate = date.format(formatter);

        return changeDate;
    }

    public static String betweenDate(LocalDateTime date){

        long seconds = ChronoUnit.SECONDS.between(date, LocalDateTime.now());
        long minutes = ChronoUnit.MINUTES.between(date, LocalDateTime.now());
        long days = ChronoUnit.DAYS.between(date, LocalDateTime.now());
        long hours = ChronoUnit.HOURS.between(date, LocalDateTime.now());

        /*
         * 시간이 24시가 넘어가면 days 로 반환
         * 1. 몇 초전
         * 2. 몇 분전
         * 3. 몇 시간전
         * 4. 며칠 전
         */
        if(seconds < 60){
            return String.valueOf(seconds) + "초";
        }
        if(minutes < 60){
            return String.valueOf(minutes) + "분";
        }
        if(hours < 24){
            return String.valueOf(hours) + "시간";
        }
        return String.valueOf(days) + "일";
    }
}
