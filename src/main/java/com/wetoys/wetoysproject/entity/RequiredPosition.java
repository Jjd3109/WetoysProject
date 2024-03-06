package com.wetoys.wetoysproject.entity;

public enum RequiredPosition {
    Backend("Backend"),
    Frontend("Frontend"),
    Design("Design"),
    PM("PM"),
    Other("Other");

    private final String value;

    RequiredPosition(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}