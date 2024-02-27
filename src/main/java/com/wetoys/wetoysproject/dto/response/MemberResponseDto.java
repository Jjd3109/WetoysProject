package com.wetoys.wetoysproject.dto.response;

import com.wetoys.wetoysproject.entity.MemberEntity;
import lombok.Data;

public record MemberResponseDto(
        Long id,
        String email
){
    public MemberResponseDto(MemberEntity memberEntity){
       this(
               memberEntity.getId(),
               memberEntity.getEmail()
       );
    }
}
