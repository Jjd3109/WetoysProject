package com.wetoys.wetoysproject.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class MemberFileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName; //저장된 이름

    private String fileOriginName; //원본이름

    private String filePATH; // 파일경우

    @ManyToOne(fetch = FetchType.LAZY)
    private MemberEntity memberEntity;

    /*
     * 변경 감지로
     */
    public MemberFileEntity updateMemberFile(String fileName, String fileOriginName, String filePATH){
        this.fileName = fileName;
        this.fileOriginName = fileOriginName;
        this.filePATH = filePATH;
        return this;
    }

}
