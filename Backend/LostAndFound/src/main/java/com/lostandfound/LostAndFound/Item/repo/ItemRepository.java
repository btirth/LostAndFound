package com.lostandfound.LostAndFound.Item.repo;


import com.lostandfound.LostAndFound.Item.entities.Item;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository
        extends MongoRepository<Item, String> {

    public Optional<Item> findById(String id);
    public void deleteById(String id);
    @Query("{'isFoundItem': ?0}")
    public List<Item> filterItems(boolean isFoundItem);
}
