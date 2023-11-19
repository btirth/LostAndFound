package com.lostandfound.LostAndFound.Item.service.impl;

import com.lostandfound.LostAndFound.Item.entities.Item;
import com.lostandfound.LostAndFound.Item.repo.ItemRepository;
import com.lostandfound.LostAndFound.Item.service.IItemService;
import com.lostandfound.LostAndFound.core.utils.SearchFilter;
import com.lostandfound.LostAndFound.core.exception.LostAndFoundException;
import com.lostandfound.LostAndFound.core.exception.LostAndFoundNotFoundException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Service
public class ItemSeviceImpl implements IItemService {

  @Autowired private ItemRepository itemRepository;

  @Autowired private MongoTemplate mongoTemplate;

  @Override
  public Item create(Item item) {
    try {
      return this.itemRepository.save(item);
    } catch (Exception e) {
      throw new LostAndFoundException("Error while posting new item.");
    }
  }

  @Override
  public Item getItem(String id) {
    Optional<Item> item = this.itemRepository.findById(id);
    if (!item.isPresent()) {
      throw new LostAndFoundNotFoundException("Item not found.");
    }

    return item.get();
  }

  @Override
  public Item update(Item item) {
    if (!this.itemRepository.existsById(item.getId())) {
      throw new LostAndFoundNotFoundException("Item with id does not exists");
    }

    try {
      return this.itemRepository.save(item);
    } catch (Exception e) {
      throw new LostAndFoundException("Error while updating item.");
    }
  }

  @Override
  public void delete(String id) {
    try {
      this.itemRepository.deleteById(id);
    } catch (Exception e) {
      throw new LostAndFoundException("Error while deleting item.");
    }
  }

  @Override
  public Page<Item> filterItems(SearchFilter searchFilter) {
    try {
      Pageable pageable = PageRequest.of(searchFilter.getPage(), searchFilter.getSize());
      Query query = searchFilter.buildQuery(searchFilter);
      Long count = this.mongoTemplate.count(query, Item.class);
      List<Item> items = this.mongoTemplate.find(query.with(pageable), Item.class);
      return new PageImpl<>(items, pageable, count);
    } catch (Exception e) {
      throw new LostAndFoundException("Something went wrong.");
    }
  }
}
