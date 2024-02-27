package com.wetoys.wetoysproject.dto.response;

import com.wetoys.wetoysproject.entity.ItemEntity;
import lombok.Data;

import java.time.LocalDateTime;

public record ItemResponeDto (
        Long id,
        String state,
        String title,
        String content,
        LocalDateTime createdDate,
        LocalDateTime modifiedDate
){

    public ItemResponeDto(ItemEntity itemEntity){

        this(
                itemEntity.getId(),
                itemEntity.getState(),
                itemEntity.getTitle(),
                itemEntity.getContent(),
                itemEntity.getCreatedDate(),
                itemEntity.getModifiedDate()
        );
    }
}
