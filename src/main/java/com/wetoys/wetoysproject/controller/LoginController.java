package com.wetoys.wetoysproject.controller;


import com.wetoys.wetoysproject.dto.MemberDto;
import com.wetoys.wetoysproject.entity.MemberEntity;
import com.wetoys.wetoysproject.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitter;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class LoginController {

    public final LoginService loginService;

    @ResponseBody
    @PostMapping("/api/v1/join")
    public ResponseEntity<?> hello(@RequestBody MemberDto memberDto){
        String message = loginService.memberJoin(memberDto);

        if(message.equals("true")){
            return ResponseEntity.ok("true");
        }else{
            return ResponseEntity.badRequest().body(message);

        }
    }
}
