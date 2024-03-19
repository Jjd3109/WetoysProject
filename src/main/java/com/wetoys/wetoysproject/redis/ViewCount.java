package com.wetoys.wetoysproject.redis;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash(value = "viewCount", timeToLive = 14440) //redis에 저장되는시간
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ViewCount {

    @Id
    private String id; //email

    private Long projectId; //게시물 번호




}
