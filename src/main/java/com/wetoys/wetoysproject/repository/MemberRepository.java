package com.wetoys.wetoysproject.repository;

import com.wetoys.wetoysproject.entity.MemberEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {


    List<MemberEntity> findByEmailAndAndPassword(String email, String password);

    @Query("SELECT m FROM MemberEntity m LEFT JOIN FETCH m.memberFileEntities mf WHERE m.email = :email")
    Optional<MemberEntity> findByEmail(@Param("email") String email);




}
