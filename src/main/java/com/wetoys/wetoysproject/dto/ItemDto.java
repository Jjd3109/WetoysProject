package com.wetoys.wetoysproject.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.wetoys.wetoysproject.entity.ItemEntity;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ItemDto {

    private Long id;
    private String state;
    private String title;
    private String content;


    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;




}
