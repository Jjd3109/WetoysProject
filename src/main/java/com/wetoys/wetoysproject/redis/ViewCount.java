package com.wetoys.wetoysproject.redis;


import org.springframework.data.annotation.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash(value = "viewCount", timeToLive = 14440) //redis에 저장되는시간
@ToString
public class ViewCount {

    @Id
    private String email;

    private Long id;


    public ViewCount(String email, Long id){
        this.email = email;
        this.id = id;
    }

}
