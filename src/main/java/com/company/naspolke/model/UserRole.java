package com.company.naspolke.model;

public enum UserRole {
    AMIN(1),
    MODERATOR(2),
    USER(3);

    private final int id;

    UserRole(int id) {
        this.id = id;
    }
}
