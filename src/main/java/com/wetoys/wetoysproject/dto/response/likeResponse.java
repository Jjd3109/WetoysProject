package com.wetoys.wetoysproject.dto.response;

import com.wetoys.wetoysproject.entity.LikeProjectEntity;

public record likeResponse(
        String title

){
   public likeResponse(LikeProjectEntity likeProjectEntity){
       this(
               likeProjectEntity.getProjectEntity().getTitle()

       );
   }

}
