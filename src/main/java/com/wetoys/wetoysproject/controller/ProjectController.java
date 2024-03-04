package com.wetoys.wetoysproject.controller;

import com.wetoys.wetoysproject.dto.request.ProjectPageRequest;
import com.wetoys.wetoysproject.dto.request.ProjectRequest;
import com.wetoys.wetoysproject.service.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;

@RestController
@RequiredArgsConstructor
@Slf4j
@ResponseBody
public class ProjectController {

    private final ProjectService projectService;
    @GetMapping("/api/v1/project/{id}")
    public ResponseEntity<?> project(@PathVariable("id") Long id){
        /*
         * 1. 조회수 증가
         * 2. 조회수 증가한 것을 조회후 반환
         */
        if(projectService.viewCount(id)){
            log.info("projectService.findItem(id) 값 = {}", projectService.findItem(id));

            return ResponseEntity.ok(projectService.findItem(id));
        }else{
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

    }

    /*
     * 프로젝트 최신건 10회 조회
     */
    @GetMapping("/api/v1/project")
    public ResponseEntity<?> projectList(@RequestParam("page") int page, @RequestParam("size") int size){

        //ProjectPageRequest projectPageRequest = new ProjectPageRequest(Integer.parseInt(page), Integer.parseInt(size));
        ProjectPageRequest projectPageRequest = new ProjectPageRequest(page, size);
        return ResponseEntity.ok(projectService.findPageProject(projectPageRequest));
    }

    /*
     * 프로젝트 조회순서대로
     */
    @GetMapping("/api/v1/viewProject")
    public ResponseEntity<?> viewProject(@RequestParam("page") int page, @RequestParam("size") int size){
        ProjectPageRequest projectPageRequest = new ProjectPageRequest(page, size);

        return ResponseEntity.ok(projectService.findViewPageProject(projectPageRequest));
    }

    @PostMapping("/api/v1/project")
    public ResponseEntity<?> saveProject(@RequestBody ProjectRequest projectRequest) {

        if(projectService.saveItem(projectRequest)) {
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    /*
     * 좋아요 개수 확인
     */
    @GetMapping("/api/v1/project/like")
    public ResponseEntity<?> findProject(@RequestParam("id") String id, @RequestParam("memberId") String memberId){
        return ResponseEntity.ok(projectService.findLike(id, memberId));
    }

    /*
     * 좋아요
     */
    @PostMapping("/api/v1/project/like")
    public ResponseEntity<?> likeProject(@RequestParam("id") String id){
        return ResponseEntity.ok(projectService.likeUp(id));
    }


    /*
     * 좋아요취소
     */
    @PostMapping("/api/v1/project/likeCancel")
    public ResponseEntity<?> likeFailProject(@RequestParam("id") String id, @RequestParam("memberId") String memberId){
        log.info("memberId 값 = {}", memberId);

        return ResponseEntity.ok(projectService.LikeCancel(id, memberId));
    }



}
