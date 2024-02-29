package com.wetoys.wetoysproject.dto.response;

import com.wetoys.wetoysproject.entity.ProjectEntity;

import java.time.LocalDateTime;

public record ProjectResponeDto(
        Long id,
        String state,
        String title,
        String content,
        LocalDateTime createdDate,
        LocalDateTime modifiedDate
){

    public ProjectResponeDto(ProjectEntity projectEntity){

        this(
                projectEntity.getId(),
                projectEntity.getState(),
                projectEntity.getTitle(),
                projectEntity.getContent(),
                projectEntity.getCreatedDate(),
                projectEntity.getModifiedDate()
        );
    }
}
