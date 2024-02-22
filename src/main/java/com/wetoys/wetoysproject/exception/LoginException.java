package com.wetoys.wetoysproject.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
public enum LoginException {


    DUPLICATION_ERROR(101, "중복된 이름입니다.");

    private int code;
    private String message;

    LoginException(int code, String message){
        this.code = code;
        this.message = message;
    }


}
