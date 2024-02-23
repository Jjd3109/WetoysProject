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

    private String state;
    private String title;

    @Column(length = 100000)
    private String content;

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
