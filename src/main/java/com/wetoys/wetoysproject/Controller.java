package com.wetoys.wetoysproject;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class Controller {
    @GetMapping("/api/test")
    public ResponseEntity<HashMap<String, String> > hello(){
        String response = "테스트입니다.";

        HashMap<String, String> test = new HashMap<>();

        test.put("이름", "종두");

        return ResponseEntity.ok(test);
    }
}
