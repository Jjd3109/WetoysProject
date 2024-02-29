package com.wetoys.wetoysproject.dto.response;

import com.wetoys.wetoysproject.entity.MemberEntity;
import com.wetoys.wetoysproject.entity.ProjectEntity;

import java.time.LocalDateTime;

public record ProjectResponeDto(
        Long id,
        String state,
        String projectCode,
        String title,
        String content,
        String shortContent,
        String email,

        String position,

        LocalDateTime createdDate,
        LocalDateTime modifiedDate
){

    public ProjectResponeDto(ProjectEntity projectEntity){

        this(
                projectEntity.getId(),
                projectEntity.getState(),
                projectEntity.getProjectCode(),
                projectEntity.getTitle(),
                projectEntity.getContent(),
                projectEntity.getShortContent(),
                projectEntity.getMemberEntity().getEmail(),
                projectEntity.getMemberEntity().getPosition(),
                projectEntity.getCreatedDate(),
                projectEntity.getModifiedDate()
        );
    }
}
