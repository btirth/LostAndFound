package com.lostandfound.LostAndFound.Item.service;

import com.lostandfound.LostAndFound.Item.entities.Item;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public interface IItemService {

    void create(Item item);
    Optional<Item> get(String id);
    List<Item> getList(boolean isFoundItem);
    void update(Item item);
    void delete(String id);


}
