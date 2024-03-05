package com.wetoys.wetoysproject.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;

import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "project")
@Getter
@Builder
@Setter
public class ProjectEntity extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String state; //상태코드 EX : 100 모집중
    private String title; //제목
    private String projectCode; //프로젝트 코드

    @Column(length = 10000)
    private String shortContent; //요약

    @Column(length = 100000)
    private String content; //내용

    @ElementCollection
    @Enumerated(EnumType.STRING)
    @BatchSize(size = 5)
    private List<RequiredPosition> requiredPositions;

    private Integer viewCount; //조회수 조회수는 Integer로 두는 게 더 낫다.

    @ManyToOne(fetch =  FetchType.LAZY)
    private MemberEntity memberEntity;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "projectEntity", cascade = CascadeType.REMOVE)
    @BatchSize(size = 100)
    private List<LikeProjectEntity> likeProjectEntities;

    public static ProjectEntity ItemSave(String state, String title, String shortContent, String content, List<RequiredPosition> requiredPositions, MemberEntity memberEntity){
        ProjectEntity projectEntity = new ProjectEntity();
        projectEntity.state = state;
        projectEntity.title = title;
        projectEntity.shortContent = shortContent;
        projectEntity.content = content;
        projectEntity.requiredPositions = requiredPositions;
        projectEntity.memberEntity = memberEntity;
        projectEntity.viewCount = 0;

        return projectEntity;
    }

    public static ProjectEntity updateItem(Long id, String state, String title, String shortContent, String content, List<RequiredPosition> requiredPositions) {
        ProjectEntity projectEntity = new ProjectEntity();
        projectEntity.id = id;
        projectEntity.state = state;
        projectEntity.title = title;
        projectEntity.shortContent = shortContent;
        projectEntity.content = content;
        projectEntity.requiredPositions = requiredPositions;

        return projectEntity;
    }


}
