package com.wetoys.wetoysproject.repository;

import com.wetoys.wetoysproject.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<ItemEntity, Long> {


}
