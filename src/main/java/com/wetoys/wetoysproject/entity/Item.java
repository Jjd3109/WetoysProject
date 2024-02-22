package com.wetoys.wetoysproject.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "Item")
public class Item extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String state;
    private String title;

    @Column(length = 100000)
    private String content;

    @ManyToOne(fetch =  FetchType.LAZY)
    @JoinColumn(name = "id")
    private MemberEntity memberEntity;

}
