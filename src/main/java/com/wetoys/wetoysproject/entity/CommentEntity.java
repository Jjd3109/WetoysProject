package com.wetoys.wetoysproject.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "Comment")
@ToString
@Getter
public class CommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100000)
    private String content; //내용

    @ManyToOne(fetch =  FetchType.LAZY)
    private ProjectEntity projectEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    private MemberEntity memberEntity;

    public static CommentEntity commentSave(String content, ProjectEntity projectEntity, MemberEntity memberEntity){
        CommentEntity commentEntity = new CommentEntity();
        commentEntity.content = content;
        commentEntity.projectEntity = projectEntity;
        commentEntity.memberEntity = memberEntity;

        return commentEntity;
    }

}
