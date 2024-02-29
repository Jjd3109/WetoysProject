package com.wetoys.wetoysproject.dto.request;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;



public record ProjectPageRequest(
        int page,
        int size
) {

}
