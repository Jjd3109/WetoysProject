package com.wetoys.wetoysproject.dto;

import com.wetoys.wetoysproject.entity.ItemEntity;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ItemResponeDto {
    private Long id;
    private String state;
    private String title;
    private String content;


    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;


    public ItemResponeDto(ItemEntity itemEntity){
        id = itemEntity.getId();
        state = itemEntity.getState();
        title = itemEntity.getTitle();
        content = itemEntity.getContent();
        createdDate = itemEntity.getCreatedDate();
        modifiedDate = itemEntity.getModifiedDate();
    }
}
