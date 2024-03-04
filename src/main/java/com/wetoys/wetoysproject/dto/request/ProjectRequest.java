package com.wetoys.wetoysproject.dto.request;


import java.util.List;

public record ProjectRequest(
        String state,
        String title,

        String shortContent,
        List<String> checkbox,
        String content

) {

}
