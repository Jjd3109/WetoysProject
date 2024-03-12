package com.wetoys.wetoysproject.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "Member")
@Getter
public class MemberEntity extends BaseTimeEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;

    private String username; // 자기 이름
    private String info; // 회사 직함 및 일하고 있는 분야
    private String about; //자기 소개

    @ElementCollection
    @Enumerated(EnumType.STRING)
    @BatchSize(size = 5)
    private List<RequiredPosition> requiredPositions; //일하고 있는 분야


    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "memberEntity", cascade = CascadeType.REMOVE)
    private List<MemberFileEntity> memberFileEntities;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "memberEntity", cascade = CascadeType.REMOVE)
    @BatchSize(size = 10)
    private List<ProjectEntity> projectEntity;


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "memberEntity", cascade = CascadeType.REMOVE)
    @BatchSize(size = 10)
    private List<LikeProjectEntity> likeProjectEntitiy;

    public static MemberEntity createMember(String email, String password, List<String> roles){
        MemberEntity memberEntity = new MemberEntity();
        memberEntity.email = email;
        memberEntity.password = password;
        memberEntity.roles = roles;
        return memberEntity;
    }



    /*
     * 변경 감지를 통한 멤버업데이트
     */
    public MemberEntity updateMember(String username, String about, String info){
       this.username = username;
       this.about = about;
       this.info = info;

       return this;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
