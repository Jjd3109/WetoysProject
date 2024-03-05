package com.wetoys.wetoysproject.dto.request;


import com.wetoys.wetoysproject.entity.RequiredPosition;

import java.util.ArrayList;
import java.util.List;

public record ProjectRequest(

        Long id,
        String state,
        String title,

        String shortContent,
        List<RequiredPosition> requiredPosition,
        String content

)  {
}
