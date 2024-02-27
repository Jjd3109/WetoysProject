package com.wetoys.wetoysproject.repository;

import com.wetoys.wetoysproject.entity.MemberEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {


    List<MemberEntity> findByEmailAndAndPassword(String email, String password);

    Optional<MemberEntity> findByEmail(String email);


}
