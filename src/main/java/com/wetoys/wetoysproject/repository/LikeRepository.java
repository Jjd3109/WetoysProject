package com.wetoys.wetoysproject.repository;

import com.wetoys.wetoysproject.entity.LikeProjectEntity;
import com.wetoys.wetoysproject.entity.MemberEntity;
import com.wetoys.wetoysproject.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LikeRepository extends JpaRepository<LikeProjectEntity, Long> {

    void deleteByMemberEntityAndProjectEntity(MemberEntity memberEntity, ProjectEntity projectEntity);

    @Query("SELECT l FROM LikeProjectEntity l JOIN FETCH l.memberEntity m JOIN FETCH l.projectEntity p WHERE m.id = :memberId AND p.id = :projectId")
    List<LikeProjectEntity> findByMemberIdAndProjectId(@Param("memberId") Long memberId, @Param("projectId") Long projectId);

}
