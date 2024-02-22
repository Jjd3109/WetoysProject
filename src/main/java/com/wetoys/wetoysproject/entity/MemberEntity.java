package com.wetoys.wetoysproject.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "Member")
public class MemberEntity extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "MemberEntity" ,cascade = CascadeType.REMOVE)
    private List<Item> item;


    public static MemberEntity createMember(String email, String password){
        MemberEntity memberEntity = new MemberEntity();
        memberEntity.email = email;
        memberEntity.password = password;

        return memberEntity;
    }

}
