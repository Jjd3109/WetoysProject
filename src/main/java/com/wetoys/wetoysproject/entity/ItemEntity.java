package com.wetoys.wetoysproject.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "Item")
@ToString
@Getter
public class ItemEntity extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String state; //상태코드 EX : 100 모집중
    private String title; //제목
    private String projectCode; //프로젝트 코드 proje

    @Column(length = 100000)
    private String content; //내용

    @ManyToOne(fetch =  FetchType.LAZY)
    private MemberEntity memberEntity;

    public static ItemEntity ItemSave(String state, String title, String content, MemberEntity memberEntity){
        ItemEntity itemEntity = new ItemEntity();
        itemEntity.state = state;
        itemEntity.title = title;
        itemEntity.content = content;
        itemEntity.memberEntity = memberEntity;

        return itemEntity;
    }

}
