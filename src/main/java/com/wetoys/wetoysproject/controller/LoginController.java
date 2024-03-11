package com.wetoys.wetoysproject.controller;


import com.wetoys.wetoysproject.token.JwtToken;
import com.wetoys.wetoysproject.dto.request.MemberRequestDto;
import com.wetoys.wetoysproject.service.LoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@ResponseBody
@Slf4j
public class LoginController {

    public final LoginService loginService;


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
    public ResponseEntity<?> update(@RequestBody MemberRequestDto memberRequestDto){

        log.info("memberRequestDto.about() 값 = {}", memberRequestDto.about());
        log.info("memberRequestDto.username() 값 = {}", memberRequestDto.username());
        log.info("memberRequestDto.requiredPosition() 값 = {}", memberRequestDto.requiredPosition());
        log.info("previewUrl 값 = {}", memberRequestDto.previewUrl());

        return ResponseEntity.ok("");
    }


}
