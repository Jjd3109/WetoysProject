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

    public static Long betweenDate(LocalDateTime date){

        long days = ChronoUnit.DAYS.between(date, LocalDateTime.now());
        long hours = ChronoUnit.HOURS.between(date, LocalDateTime.now());

        log.info("days 값 = {}", days);
        log.info("LocalDateTime.now() 값 = {}", LocalDateTime.now());
        log.info("hours 값 = {}", hours);
        return days;
    }
}
