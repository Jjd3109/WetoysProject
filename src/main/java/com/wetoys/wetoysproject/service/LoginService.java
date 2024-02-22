package com.wetoys.wetoysproject.service;

import com.wetoys.wetoysproject.dto.MemberDto;
import com.wetoys.wetoysproject.entity.MemberEntity;
import com.wetoys.wetoysproject.exception.LoginException;
import com.wetoys.wetoysproject.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.sql.SQLIntegrityConstraintViolationException;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final MemberRepository memberRepository;
    LoginException duplicationError = LoginException.DUPLICATION_ERROR;

    public String memberJoin(MemberDto memberDto){

        //변환 작업
        MemberEntity memberEntity = MemberEntity.createMember(memberDto.getEmail(), memberDto.getPassword());

        //아이디 중복 경우
        try{
            memberRepository.save(memberEntity);

            return "true";
        }catch (DataIntegrityViolationException e){

            return duplicationError.getMessage();
        }

    }
}
