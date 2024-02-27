package com.wetoys.wetoysproject.repository;

import com.wetoys.wetoysproject.token.RefreshToken;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
}