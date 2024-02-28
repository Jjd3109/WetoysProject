package com.wetoys.wetoysproject.repository;

import com.wetoys.wetoysproject.token.RefreshToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken,String> {

    Optional<RefreshToken> findById(@Param("refreshToken") String refreshToken);
}