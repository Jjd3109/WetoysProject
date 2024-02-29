package com.wetoys.wetoysproject.service;

import com.wetoys.wetoysproject.configuration.SecurityUtil;
import com.wetoys.wetoysproject.dto.request.ProjectPageRequest;
import com.wetoys.wetoysproject.dto.request.ProjectRequest;
import com.wetoys.wetoysproject.dto.response.ProjectResponeDto;
import com.wetoys.wetoysproject.entity.ProjectEntity;
import com.wetoys.wetoysproject.entity.MemberEntity;
import com.wetoys.wetoysproject.repository.ProjectRepository;
import com.wetoys.wetoysproject.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final MemberRepository memberRepository;

    /*
     * 프로젝트 생성
     */
    public boolean saveItem(ProjectRequest projectRequest){
        //spriong security에 저장된 email 값을 토대로 값을 가져옴.
        Optional<MemberEntity> memberEntity = memberRepository.findByEmail(SecurityUtil.getCurrentMemberName());

        //아이템 저장 엔티티 생성
        ProjectEntity projectEntity = ProjectEntity.ItemSave(projectRequest.state(), projectRequest.title(), projectRequest.shortContent(), projectRequest.content(), memberEntity.get());

        try{
            //성공할 시
            projectRepository.save(projectEntity);
            return true;
        } catch (NullPointerException e){

            return false;
        }
    }

    /*
     * 프로젝트 전부 조회
     */
    public List<ProjectResponeDto> findAll(){
        log.info("projectRepository.findAll() 값 = {}", projectRepository.findAll());

        return projectRepository.findAll().stream().map(o -> new ProjectResponeDto(o)).toList();
    }


    /*
     * 프로젝트 페이징 조회
     */
    public List<ProjectResponeDto> findPageProject(ProjectPageRequest projectPageRequest){


        Pageable pageable = PageRequest.of(projectPageRequest.page(), projectPageRequest.size());
        log.info("pageable 값 = {}", pageable);

        log.info("projectRepository.findAll() 값 = {}", projectRepository.findAll(pageable));

        //List<ProjectEntity> projectEntities = projectRepository.findAll(pageable);


        //System.out.println(projectEntities);

        return projectRepository.findAll(pageable).stream().map(o -> new ProjectResponeDto(o)).toList();
    }

    /*
     * 프로젝트 단일 조회
     */
    public List<ProjectResponeDto> findItem(Long id){
        return projectRepository.findId(id).stream().map(o -> new ProjectResponeDto(o)).toList();
    }
}
