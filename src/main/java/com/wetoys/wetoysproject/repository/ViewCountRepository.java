package com.wetoys.wetoysproject.repository;

import com.wetoys.wetoysproject.entity.ProjectEntity;
import com.wetoys.wetoysproject.redis.ViewCount;
import com.wetoys.wetoysproject.token.RefreshToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ViewCountRepository extends CrudRepository<ViewCount, String> {

    Optional<ViewCount> findById(@Param("viewCount") String viewCount);

}