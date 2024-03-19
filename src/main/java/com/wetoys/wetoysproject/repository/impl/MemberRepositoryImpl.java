package com.wetoys.wetoysproject.repository.impl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.wetoys.wetoysproject.entity.MemberEntity;
import com.wetoys.wetoysproject.repository.custom.MemberRepositoryCustom;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;


//    public MemberEntity findbyEmail

}
