package com.wetoys.wetoysproject.oauth2;

import com.wetoys.wetoysproject.configuration.JwtTokenProvider;
import com.wetoys.wetoysproject.entity.MemberEntity;
import com.wetoys.wetoysproject.repository.MemberRepository;
import com.wetoys.wetoysproject.token.JwtToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.apache.bcel.classfile.StackMap;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.lang.reflect.Member;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository; // 사용자 정보를 저장하고 관리하는 리포지토리
    private final JwtTokenProvider jwtTokenProvider;
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);

        try {
            return processOAuth2User(userRequest, oauth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // OAuth2 로그인 과정 중 예외 발생 시 처리
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oauth2User) {
        Map<String, Object> attributes = oauth2User.getAttributes();
        Map<String, Object> emailMap = (HashMap<String, Object>) attributes.get("kakao_account");


        String email = (String) emailMap.get("email");


        MemberEntity user = memberRepository.findByEmail(email)
                .orElseGet(() -> {
                    // 사용자가 없으면 새로운 사용자로 등록
                    MemberEntity newUser = MemberEntity.builder()
                            .email(email)
                            .build();

                    return memberRepository.save(newUser);

                });

        // 토큰을 사용자 정보와 함께 리턴
        return new CustomOAuth2User(emailMap, user);
    }
}


