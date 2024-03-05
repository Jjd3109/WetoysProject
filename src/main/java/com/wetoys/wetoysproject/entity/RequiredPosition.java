package com.wetoys.wetoysproject.entity;

public enum RequiredPosition {
    백엔드("백엔드"),
    프론트엔드("프론트엔드"),
    디자인("디자인"),
    기획("기획"),
    기타("기타");

    private final String value;

    RequiredPosition(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}