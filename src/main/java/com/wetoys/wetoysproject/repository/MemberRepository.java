package com.wetoys.wetoysproject.repository;

import com.wetoys.wetoysproject.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {


}
