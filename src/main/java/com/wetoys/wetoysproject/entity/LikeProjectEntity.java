package com.wetoys.wetoysproject.entity;


import jakarta.persistence.*;
import lombok.*;


@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Getter
public class LikeProjectEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //아이디

    @ManyToOne(fetch = FetchType.LAZY)
    private ProjectEntity projectEntity; //프로젝트와 연동

    @ManyToOne(fetch = FetchType.LAZY)
    private MemberEntity memberEntity; //아이디와 연동


}


