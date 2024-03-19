package com.wetoys.wetoysproject.dto.response;

import com.wetoys.wetoysproject.entity.MemberEntity;

public record MemberInfoResponse (

        String email,
        String about,
        String username,
        String info,
        String fileName,
        String fileOriginName,
        String filePath



){

    public MemberInfoResponse(MemberEntity memberEntity){
        this(
                memberEntity.getEmail(),
                memberEntity.getAbout(),
                memberEntity.getUsername(),
                memberEntity.getInfo(),
                memberEntity.getMemberFileEntities().get(0).getFileName(),
                memberEntity.getMemberFileEntities().get(0).getFileOriginName(),
                memberEntity.getMemberFileEntities().get(0).getFilePATH()
        );
    }

}
