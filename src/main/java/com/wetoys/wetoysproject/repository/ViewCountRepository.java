package com.wetoys.wetoysproject.repository;

import com.wetoys.wetoysproject.redis.ViewCount;
import org.springframework.data.repository.CrudRepository;
import java.util.Optional;

public interface ViewCountRepository extends CrudRepository<ViewCount, String> {


}