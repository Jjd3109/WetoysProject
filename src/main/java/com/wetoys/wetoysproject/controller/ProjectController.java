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
            return ResponseEntity.ok(projectService.findItem(id));
        }else{
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

    }

    @GetMapping("/api/v1/project")
    public ResponseEntity<?> projectList(@RequestParam("page") int page, @RequestParam("size") int size){

        //ProjectPageRequest projectPageRequest = new ProjectPageRequest(Integer.parseInt(page), Integer.parseInt(size));
        ProjectPageRequest projectPageRequest = new ProjectPageRequest(page, size);
        return ResponseEntity.ok(projectService.findPageProject(projectPageRequest));
    }

    @PostMapping("/api/v1/project")
    public ResponseEntity<?> saveProject(@RequestBody ProjectRequest projectRequest) {

        if(projectService.saveItem(projectRequest)) {
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }


}
