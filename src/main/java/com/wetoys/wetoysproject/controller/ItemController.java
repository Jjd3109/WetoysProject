package com.wetoys.wetoysproject.controller;

import com.wetoys.wetoysproject.dto.ItemDto;
import com.wetoys.wetoysproject.entity.ItemEntity;
import com.wetoys.wetoysproject.service.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ItemController {

    private final ItemService itemService;


    @GetMapping("/api/v1/items/{id}")
    public ResponseEntity<?> Items(@PathVariable("id") Long id){
        return ResponseEntity.ok(itemService.findItem(id));
    }

    @PostMapping("/api/v1/items")
    @ResponseBody
    public ResponseEntity<?> CreateItem(@RequestBody ItemDto itemDto){
        log.info("itemDto",itemDto);
        String result = itemService.ItemSave(itemDto);

        return ResponseEntity.ok("");
    }

}
