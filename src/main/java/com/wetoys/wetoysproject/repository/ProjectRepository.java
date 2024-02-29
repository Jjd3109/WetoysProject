package com.wetoys.wetoysproject.repository;

import com.wetoys.wetoysproject.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<ProjectEntity, Long> {

    @Query("select i from ProjectEntity i join fetch i.memberEntity where i.id = :id")
    List<ProjectEntity> findId(@Param("id") Long id);

}
