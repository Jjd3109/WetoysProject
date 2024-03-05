package com.wetoys.wetoysproject.repository;

import com.wetoys.wetoysproject.entity.ProjectEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;

public interface ProjectRepository extends JpaRepository<ProjectEntity, Long> {

    @Query("SELECT p FROM ProjectEntity p JOIN FETCH p.memberEntity m JOIN FETCH p.memberEntity.roles WHERE p.id = :id")
    List<ProjectEntity> findId(@Param("id") Long id);

    @Modifying
    @Query("update ProjectEntity p set p.viewCount = p.viewCount + 1 where p.id = :id")
    void saveViewCount(@Param("id") Long id);


}
