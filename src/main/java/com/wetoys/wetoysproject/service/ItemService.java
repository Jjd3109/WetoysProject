package com.wetoys.wetoysproject.service;

import com.wetoys.wetoysproject.dto.ItemDto;
import com.wetoys.wetoysproject.dto.MemberDto;
import com.wetoys.wetoysproject.entity.ItemEntity;
import com.wetoys.wetoysproject.entity.MemberEntity;
import com.wetoys.wetoysproject.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ItemService {

    private final ItemRepository itemRepository;
    
    /*
     * 프로젝트 생성
     */
    public String ItemSave(ItemDto itemDto){
        MemberEntity memberEntity = MemberEntity.builder()
                .id(1L)
                .build();

        ItemEntity itemEntity = ItemEntity.ItemSave(itemDto.getState(), itemDto.getTitle(), itemDto.getContent(), memberEntity);

        itemRepository.save(itemEntity);

        return "성공";
    }

    /*
     * 아이템 조회
     */
    public List<ItemDto> findItem(Long id){

        return itemRepository.findId(id).stream().map(o -> new ItemDto(o)).toList();
    }
}
