package com.wetoys.wetoysproject.oauth2;

import com.wetoys.wetoysproject.entity.MemberEntity;
import com.wetoys.wetoysproject.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.aspectj.apache.bcel.classfile.StackMap;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository; // 사용자 정보를 저장하고 관리하는 리포지토리

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
        System.out.println("attributes 값 : " + attributes);

        Map<String, Object> emailMap = (HashMap<String, Object>)attributes.get("kakao_account");

        String email = (String) emailMap.get("email");

        System.out.println("email 값 " + email);

        // 이메일로 사용자 조회
        MemberEntity user = memberRepository.findByEmail(email)
                .orElseGet(() -> {
                    // 사용자가 없으면 새로운 사용자로 등록
//                    User newUser = new User();
//                    newUser.setEmail(email);
//                    // 필요한 경우 다른 사용자 정보도 설정할 수 있습니다.
//                    return userRepository.save(newUser);
                    return null;
                });

        return new CustomOAuth2User(oauth2User.getAttributes(), user);
    }
}