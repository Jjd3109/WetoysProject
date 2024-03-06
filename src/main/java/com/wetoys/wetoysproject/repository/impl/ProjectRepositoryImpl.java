package com.wetoys.wetoysproject.repository.impl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.wetoys.wetoysproject.entity.ProjectEntity;
import com.wetoys.wetoysproject.repository.custom.ProjectRepositoryCustom;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.wetoys.wetoysproject.entity.QProjectEntity.projectEntity;

@RequiredArgsConstructor
public class ProjectRepositoryImpl implements ProjectRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    //menuObject에 따라 다르게 pageable 하기
    public List<ProjectEntity> findAllDistinct(Pageable pageable) {
        return jpaQueryFactory.selectFrom(projectEntity)
                .fetch();
    }


}
