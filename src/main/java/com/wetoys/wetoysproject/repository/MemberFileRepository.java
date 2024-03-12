package com.wetoys.wetoysproject.repository;

import com.wetoys.wetoysproject.entity.MemberEntity;
import com.wetoys.wetoysproject.entity.MemberFileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberFileRepository extends JpaRepository<MemberFileEntity, Long> {

    MemberFileEntity findByMemberEntity(MemberEntity memberEntity);

}
