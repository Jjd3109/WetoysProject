package com.wetoys.wetoysproject.repository.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.wetoys.wetoysproject.configuration.CommonConfig;


import com.wetoys.wetoysproject.dto.response.QProjectResponeDto;
import com.wetoys.wetoysproject.entity.ProjectEntity;
import com.wetoys.wetoysproject.entity.QProjectEntity;
import com.wetoys.wetoysproject.entity.RequiredPosition;
import com.wetoys.wetoysproject.repository.custom.ProjectRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static com.wetoys.wetoysproject.entity.QProjectEntity.projectEntity;


@RequiredArgsConstructor
public class ProjectRepositoryImpl implements ProjectRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    /*
     * Dto로 바로 반환받는
     */
//    public List<ProjectResponeDto> findAllDistinct(Pageable pageable, String menuObject) {
//        QProjectResponeDto qProjectResponeDto = new QProjectResponeDto(
//                projectEntity.id,
//                projectEntity.state,
//                projectEntity.projectCode,
//                projectEntity.title,
//                projectEntity.content,
//                projectEntity.viewCount,
//                projectEntity.shortContent,
//                projectEntity.likeProjectEntities,
//                projectEntity.requiredPositions,
//                projectEntity.memberEntity.id,
//                projectEntity.memberEntity.email,
//                projectEntity.memberEntity.position,
//                projectEntity.createdDate,
//                projectEntity.modifiedDate
//        );
//
//        return jpaQueryFactory
//                .select(qProjectResponeDto)
//                .from(projectEntity)
//                .where(projectEntity.requiredPositions.contains(RequiredPosition.valueOf(menuObject)))
//                .offset(pageable.getOffset())
//                .limit(pageable.getPageSize())
//                .fetch();
//    }

    /*
     * 기본적인 구조
     */
    public List<ProjectEntity> findAllDistinct(Pageable pageable, String menuObject) {

        JPAQuery<ProjectEntity> query = jpaQueryFactory.selectFrom(projectEntity)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(projectEntity.id.desc());

        if (menuObject != null) {
            query.where(MenuObjectEq(menuObject));
        }

        return query.fetch();

    }

    /*
     * MenuObject가 있는지
     */
    private BooleanExpression MenuObjectEq(String menuObject){
        return projectEntity.requiredPositions.contains(RequiredPosition.valueOf(menuObject));
    }





}
