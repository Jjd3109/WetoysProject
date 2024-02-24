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

    private String content; //내용

    @ManyToOne(fetch =  FetchType.LAZY)
    private ItemEntity itemEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    private MemberEntity memberEntity;

    public static CommentEntity commentSave(String content, ItemEntity itemEntity, MemberEntity memberEntity){
        CommentEntity commentEntity = new CommentEntity();
        commentEntity.content = content;
        commentEntity.itemEntity = itemEntity;
        commentEntity.memberEntity = memberEntity;

        return commentEntity;
    }

}
