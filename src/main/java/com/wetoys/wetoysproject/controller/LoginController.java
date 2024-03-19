package com.wetoys.wetoysproject.controller;


import com.wetoys.wetoysproject.configuration.SecurityUtil;
import com.wetoys.wetoysproject.dto.response.MemberInfoResponse;
import com.wetoys.wetoysproject.token.JwtToken;
import com.wetoys.wetoysproject.dto.request.MemberRequestDto;
import com.wetoys.wetoysproject.service.LoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@RestController
@RequiredArgsConstructor
@Slf4j
public class LoginController {

    public final LoginService loginService;

    @GetMapping("/api/v1/member")
    public ResponseEntity<?> member(){
        /*
         * 1. 로그인된 아이디 가져오기
         * 2. email를 토대로 사진과 함께 fecth join 해서 가져오기
         *
         */

        Optional<MemberInfoResponse> value = loginService.findMember(SecurityUtil.getCurrentMemberName());
        log.info("value.get() 값 = {}", value.get());

        return ResponseEntity.ok(value.get());

    }


    @PostMapping("/api/v1/join")
    public ResponseEntity<?> hello(@RequestBody MemberRequestDto memberRequestDto){
        String message = loginService.memberJoin(memberRequestDto);

        if(message.equals("true")){
            return ResponseEntity.ok("true");
        }else{
            return ResponseEntity.badRequest().body(message);

        }
    }

    @PostMapping("/api/v1/login")
    public ResponseEntity<?> login(@RequestBody MemberRequestDto memberRequestDto){
        String memberId = memberRequestDto.email();
        String password = memberRequestDto.password();
        JwtToken tokenInfo = loginService.findMember(memberId, password);

        System.out.println("tokenInfo 값 : " + tokenInfo);

        return ResponseEntity.ok(tokenInfo);
    }

    @PostMapping("/api/v1/update/member")
    public ResponseEntity<?> update(@RequestPart(value = "username", required = false) String username,
                                    @RequestPart(value = "about", required = false) String about,
                                    @RequestPart(value = "info", required = false) String info,
                                    @RequestPart(value = "previewUrl", required = false) MultipartFile previewUrl) throws IOException {

        return ResponseEntity.ok(loginService.updateMember(username, about, info, previewUrl));
    }


}
