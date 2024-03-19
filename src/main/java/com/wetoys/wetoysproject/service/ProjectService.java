package com.wetoys.wetoysproject.service;

import com.wetoys.wetoysproject.configuration.SecurityUtil;
import com.wetoys.wetoysproject.dto.request.ProjectPageRequest;
import com.wetoys.wetoysproject.dto.request.ProjectRequest;
import com.wetoys.wetoysproject.dto.response.ProjectResponeDto;
import com.wetoys.wetoysproject.dto.response.likeResponse;
import com.wetoys.wetoysproject.entity.LikeProjectEntity;
import com.wetoys.wetoysproject.entity.ProjectEntity;
import com.wetoys.wetoysproject.entity.MemberEntity;
import com.wetoys.wetoysproject.entity.RequiredPosition;
import com.wetoys.wetoysproject.redis.ViewCount;
import com.wetoys.wetoysproject.repository.LikeRepository;
import com.wetoys.wetoysproject.repository.ProjectRepository;
import com.wetoys.wetoysproject.repository.MemberRepository;
import com.wetoys.wetoysproject.repository.ViewCountRepository;
import com.wetoys.wetoysproject.repository.impl.ProjectRepositoryImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.*;


@Service
@RequiredArgsConstructor
@Slf4j
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final MemberRepository memberRepository;
    private final LikeRepository likeRepository;
    private final SecurityUtil securityUtil;
    private final ProjectRepositoryImpl projectRepositoryImpl;
    private final ViewCountRepository viewCountRepository;
//    private final ViewCountRepositoryImpl viewCountRepositoryImpl;

    /*
     * 프로젝트 생성
     */
    public boolean saveItem(ProjectRequest projectRequest){
        //spriong security에 저장된 email 값을 토대로 값을 가져옴.
        Optional<MemberEntity> memberEntity = memberRepository.findByEmail(SecurityUtil.getCurrentMemberName());

        //아이템 저장 엔티티 생성
        ProjectEntity projectEntity = ProjectEntity.ItemSave(projectRequest.state(), projectRequest.title(), projectRequest.shortContent(), projectRequest.content(), projectRequest.requiredPosition(), memberEntity.get());

        try{
            //성공할 시
            projectRepository.save(projectEntity);
            return true;
        } catch (NullPointerException e){

            return false;
        }
    }

    /*
     * 프로젝트 수정
     */
    @Transactional(readOnly = false)
    public boolean updateItem(ProjectRequest projectRequest){
        //아이템 저장 엔티티 생성
        List<ProjectEntity> projectEntity = projectRepository.findId(projectRequest.id());


        projectEntity.get(0).setState(projectRequest.state());
        projectEntity.get(0).setTitle(projectRequest.title());
        projectEntity.get(0).setShortContent(projectRequest.shortContent());
        projectEntity.get(0).setRequiredPositions(projectRequest.requiredPosition());
        projectEntity.get(0).setContent(projectRequest.content());

        return true;

    }
    /*
     * 프로젝트 전부 조회
     */
    public List<ProjectResponeDto> findAll(){
        return projectRepository.findAll().stream().map(o -> new ProjectResponeDto(o)).toList();
    }


    /*
     * 프로젝트 페이징 내림차순 10건 조회
     */
    public List<ProjectResponeDto> findPageProject(ProjectPageRequest projectPageRequest, String menuObject){

        Pageable pageable = PageRequest.of(projectPageRequest.page(), projectPageRequest.size(), Sort.by("id").descending());

        log.info(String.valueOf(pageable.getSort()));


        return projectRepositoryImpl.findAllDistinct(pageable, menuObject).stream().map(o -> new ProjectResponeDto(o)).toList();
        //return projectRepositoryImpl.findAllDistinct(pageable, menuObject);
    }



    /*
     * 프로젝트 페이징 조회순 많은 순서대로 10건 조회
     */
    public List<ProjectResponeDto> findViewPageProject(ProjectPageRequest projectPageRequest){

        Pageable pageable = PageRequest.of(projectPageRequest.page(), projectPageRequest.size(), Sort.by("viewCount").descending());

        return projectRepository.findAll(pageable).stream().map(o -> new ProjectResponeDto(o)).toList();
    }


    /*
     * 프로젝트 단일 조회
     */
    public List<ProjectResponeDto> findItem(Long id){

        log.info("projectRepository.findId(id) 값 = {}", projectRepository.findId(id).get(0));

        return projectRepository.findId(id).stream().map(o -> new ProjectResponeDto(o)).toList();

    }

    /*
     * 프로젝트 조회수 증가
     */

    //Todo: 조회수 증가시 Redis를 활용한 중복 체크
    @Transactional(readOnly = false)
    public boolean viewCount(Long id){


        /*
         * Redis key : value 값으로 저장
         * null 값인 아이디 반환이면
         * 1. id, itemId 값으로 조회
         * 2-1. id, itemId 값이 있으면 넘기기
         * 2-2. id, itemId 값이 없으면 redis에 값 저장
         * 3. viewCount +1 증가
         * 4
         */

        try{
            String name = securityUtil.getCurrentMember().getEmail();

            ViewCount viewCount = new ViewCount(name, id);

            Optional<ViewCount> existingViewCount = viewCountRepository.findById(name);

            //isPresent() 값이 있다면 True 없다면 False
            if(!existingViewCount.isPresent()){
                projectRepository.saveViewCount(id);
                viewCountRepository.save(viewCount);

            }
        }catch (NullPointerException n){
            return true;
        }

        return true;

    }


    /*
     * 프로젝트 좋아요 증가
     */
    @Transactional(readOnly = false)
    public boolean likeUp(String id){


        try{
            //프로젝트 정보
            ProjectEntity projectEntity = ProjectEntity.builder().
                                        id(Long.valueOf(id)).
                                        build();
            log.info("securityUtil.getCurrentMember() 값 = {}", securityUtil.getCurrentMember().getUsername());
            LikeProjectEntity likeProjectEntity = LikeProjectEntity.builder().projectEntity(projectEntity).memberEntity(securityUtil.getCurrentMember()).build();

            likeRepository.save(likeProjectEntity);

            return true;

        }catch (NullPointerException n){
            return false;
        }

    }

    /*
     * 프로젝트 좋아요 삭제
     */
    @Transactional(readOnly = false)
    public boolean LikeCancel(String id){

        try{
            //회원 정보
            Optional<MemberEntity> memberEntity = memberRepository.findByEmail(SecurityUtil.getCurrentMemberName());


            //프로젝트 정보
            ProjectEntity projectEntity = ProjectEntity.builder().
                    id(Long.valueOf(id)).
                    build();

            likeRepository.deleteByMemberEntityAndProjectEntity(memberEntity.get(), projectEntity);

            return true;
        } catch (NullPointerException n){

            return false;
        }

    }

    /*
     * 프로젝트 좋아요 있는지 없는지 체크
     */
    public List<likeResponse> findLike(String projectId){
        /*
         * 이름을 토대로 멤버 이름 조회
         */
        Optional<MemberEntity> memberEntity = Optional.ofNullable(memberRepository.findByEmail(SecurityUtil.getCurrentMemberName()).orElseThrow(() -> new NoSuchElementException("값이 없습니다.")));

        try{
            List<likeResponse> likeResponses = likeRepository.findByMemberIdAndProjectId(memberEntity.get().getId(), Long.valueOf(projectId)).stream().map(o -> new likeResponse(o)).toList();
            return likeResponses;
        }catch (IndexOutOfBoundsException i){
            log.info("좋아요가 없습니당");
            return null;
        }catch (NoSuchElementException n){
            log.info("회원이 없습니다.");
            return null;
        }

    }


}
