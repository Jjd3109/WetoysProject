package com.wetoys.wetoysproject.service;

import com.wetoys.wetoysproject.configuration.FileUpload;
import com.wetoys.wetoysproject.configuration.JwtTokenProvider;
import com.wetoys.wetoysproject.configuration.SecurityUtil;
import com.wetoys.wetoysproject.entity.MemberFileEntity;
import com.wetoys.wetoysproject.repository.MemberFileRepository;
import com.wetoys.wetoysproject.token.JwtToken;
import com.wetoys.wetoysproject.dto.request.MemberRequestDto;
import com.wetoys.wetoysproject.entity.MemberEntity;
import com.wetoys.wetoysproject.exception.LoginException;
import com.wetoys.wetoysproject.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoginService {

    private final MemberRepository memberRepository;
    private final MemberFileRepository memberFileRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

    /*
     * 예외 처리
     */
    LoginException duplicationError = LoginException.DUPLICATION_ERROR;

    public String memberJoin(MemberRequestDto memberRequestDto){
        List<String> roles = new ArrayList<>();
        roles.add("USER");
        //변환 작업
        MemberEntity memberEntity = MemberEntity.createMember(memberRequestDto.email(), memberRequestDto.password(), roles);


        try{
            //아이디생성
            MemberEntity memberValue = memberRepository.save(memberEntity);


            //사진 빈값으로 생성
            MemberFileEntity memberFileEntity = MemberFileEntity.builder().
                    memberEntity(memberValue).
                    build();

            memberFileRepository.save(memberFileEntity);

            return "true";
        }catch (DataIntegrityViolationException e){
            //아이디 중복일 경우
            return duplicationError.getMessage();
        }

    }


    public JwtToken findMember(String memberId, String password){


        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(memberId, password);

        log.info("authenticationToken 값 = {}", authenticationToken);
        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        log.info("authentication 값 = {}", authentication);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        JwtToken tokenInfo = jwtTokenProvider.generateToken(authentication);

        return tokenInfo;
    }


    @Transactional
    public boolean updateMember(String username, String about, String info, MultipartFile previewUrl) throws IOException {

        //1. Member 업데이트
        //1-1 아이디 값을 가져와서 memberEntity에 넣어주기
        MemberEntity member = memberRepository.findByEmail(SecurityUtil.getCurrentMemberName()).get();

        //1-2 updateMember(변경감지)
        member.updateMember(username, about, info);

        //1-3 fileUpload
        FileUpload fileUpload = new FileUpload();
        List<String> fileValue = fileUpload.fileUpload(previewUrl);

        //1-4. MemberFile 업데이트(변경감지)
        MemberFileEntity memberFileEntity = memberFileRepository.findByMemberEntity(member);
        memberFileEntity.updateMemberFile(fileValue.get(0), fileValue.get(1), fileValue.get(2));

        return true;
    }
}
