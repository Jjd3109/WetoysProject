package com.wetoys.wetoysproject.dto.request;

import com.wetoys.wetoysproject.entity.RequiredPosition;
import lombok.Data;

import java.util.List;


public record MemberRequestDto (
         String email,
         String password,
         String username,
         String about,

         List<RequiredPosition> requiredPosition,
         String previewUrl
){

}
