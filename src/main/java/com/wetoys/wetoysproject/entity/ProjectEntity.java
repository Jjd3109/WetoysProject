package com.wetoys.wetoysproject.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "project")
@ToString
@Getter
public class ProjectEntity extends BaseTimeEntity {

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

    public static ProjectEntity ItemSave(String state, String title, String content, MemberEntity memberEntity){
        ProjectEntity projectEntity = new ProjectEntity();
        projectEntity.state = state;
        projectEntity.title = title;
        projectEntity.content = content;
        projectEntity.memberEntity = memberEntity;

        return projectEntity;
    }

}
