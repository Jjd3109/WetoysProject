package com.wetoys.wetoysproject.oauth2;

import com.wetoys.wetoysproject.entity.MemberEntity;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import java.util.Collections;
import java.util.Map;

public class CustomOAuth2User extends DefaultOAuth2User {

    private final MemberEntity user;

    public CustomOAuth2User(Map<String, Object> attributes, MemberEntity user) {
        super(Collections.emptyList(), attributes, "email");
        this.user = user;
    }

    public MemberEntity getUser() {
        return user;
    }
}
