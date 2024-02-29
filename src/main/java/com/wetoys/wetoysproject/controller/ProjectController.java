package com.wetoys.wetoysproject.controller;

import com.wetoys.wetoysproject.dto.ProjectDto;
import com.wetoys.wetoysproject.service.ProjectService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@ResponseBody
public class ProjectController {

    private final ProjectService projectService;
    @GetMapping("/api/v1/project/{id}")
    public ResponseEntity<?> project(@PathVariable("id") Long id){
        return ResponseEntity.ok(projectService.findItem(id));
    }

    @GetMapping("/api/v1/project")
    public ResponseEntity<?> projectList(){
        return ResponseEntity.ok(projectService.findAll());
    }

    @PostMapping("/api/v1/project")
    public ResponseEntity<?> saveProject(@RequestBody ProjectDto projectDto) {

        if(projectService.saveItem(projectDto)) {
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

}
