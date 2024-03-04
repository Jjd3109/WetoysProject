package com.wetoys.wetoysproject.dto.response;

import com.wetoys.wetoysproject.configuration.CommonConfig;
import com.wetoys.wetoysproject.entity.MemberEntity;
import com.wetoys.wetoysproject.entity.ProjectEntity;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;

public record ProjectResponeDto(
        Long id,
        String state,
        String projectCode,
        String title,
        String content,

        Integer viewCount,
        String shortContent,
        Long memberId,
        String email,
        String position,
        String createdDate,
        String modifiedDate
){

    public ProjectResponeDto(ProjectEntity projectEntity){

        this(
                projectEntity.getId(),
                projectEntity.getState(),
                projectEntity.getProjectCode(),
                projectEntity.getTitle(),
                projectEntity.getContent(),
                projectEntity.getViewCount(),
                projectEntity.getShortContent(),
                projectEntity.getMemberEntity().getId(),
                projectEntity.getMemberEntity().getEmail(),
                projectEntity.getMemberEntity().getPosition(),
                CommonConfig.betweenDate(projectEntity.getCreatedDate()),
                CommonConfig.betweenDate(projectEntity.getModifiedDate())

        );
    }
}
