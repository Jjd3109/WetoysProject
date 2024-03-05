package com.wetoys.wetoysproject.configuration;

import com.wetoys.wetoysproject.entity.MemberEntity;
import com.wetoys.wetoysproject.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Component
@Slf4j
@RequiredArgsConstructor
public class SecurityUtil {

    private final MemberRepository memberRepository;

    public static String getCurrentMemberName() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("No authentication information.");
        }
        return authentication.getName();
    }

    public static Collection
            <? extends GrantedAuthority> getCurrentMemberRoles() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("No authentication information.");
        }
        return authentication.getAuthorities();
    }


    public MemberEntity getCurrentMember() { // 반환형을 Long으로 수정

        Optional<MemberEntity> memberEntity = memberRepository.findByEmail(SecurityUtil.getCurrentMemberName());

        return memberEntity.get();
    }


}
