package com.wetoys.wetoysproject.repository;

import com.wetoys.wetoysproject.entity.ItemEntity;
import org.hibernate.annotations.Fetch;
import org.springframework.beans.factory.ListableBeanFactoryExtensionsKt;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemRepository extends JpaRepository<ItemEntity, Long> {

    @Query("select i from ItemEntity i join fetch i.memberEntity where i.id = :id")
    List<ItemEntity> findId(@Param("id") Long id);

}
