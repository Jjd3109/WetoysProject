package com.wetoys.wetoysproject.controller;


import com.wetoys.wetoysproject.token.JwtToken;
import com.wetoys.wetoysproject.dto.request.MemberRequestDto;
import com.wetoys.wetoysproject.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@ResponseBody
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
}
