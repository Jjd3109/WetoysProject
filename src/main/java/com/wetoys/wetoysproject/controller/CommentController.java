package com.wetoys.wetoysproject.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class CommentController {



    @PostMapping("/api/v1/comments")
    public ResponseEntity<?> saveComment(){


        return ResponseEntity.ok("성공");
    }
}
