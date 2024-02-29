package com.wetoys.wetoysproject.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProjectDto {

    private Long id;
    private String state;
    private String title;
    private String content;


    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;




}
