package com.lostandfound.LostAndFound.Item.service.impl;

import com.lostandfound.LostAndFound.Item.entities.Item;
import com.lostandfound.LostAndFound.Item.repo.ItemRepository;
import com.lostandfound.LostAndFound.Item.service.IItemService;
import com.mongodb.client.MongoDatabase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ItemSeviceImpl implements IItemService {

    // <editor-fold desc="Private members">
    @Autowired
    private ItemRepository itemRepository;
    // </editor-fold>

    // <editor-fold desc="Constructor">

    // </editor-fold>

    // <editor-fold desc="Public methods">
    @Override
    public void create(Item item) {
        item.setPostedAt(LocalDate.now()); this.itemRepository.insert(item);
    }

    @Override
    public Optional<Item> get(String id) {
        return this.itemRepository.findById(id);
    }

    @Override
    public List<Item> getList(boolean isFoundItem, double longitude, double latitude,  double distance) {
//        return this.itemRepository.findByLocationWithin(longitude, latitude, distance);
        return this.itemRepository.findByIsFoundItemAndLocationWithin(isFoundItem, longitude, latitude, distance);
    }

    @Override
    public List<Item> getList(String createdBy, boolean isFoundItem, int postedAt) {
        return this.itemRepository.findByCreatedByAndIsFoundItem(createdBy, isFoundItem, postedAt);
    }

    @Override
    public List<Item> getList(String keyword, int postedAt) {
        return this.itemRepository.findByKeyword(keyword, postedAt);
    }

    @Override
    @Transactional
    public void update(Item item) {
        Item storedItem = this.itemRepository.findById(item.getId())
                .orElseThrow(() -> new IllegalStateException("Item with id does not exists"));
        storedItem.setTitle(item.getTitle());
        storedItem.setClaimedBy(item.getClaimedBy());
        storedItem.setDescription(item.getDescription());
        storedItem.setClaimedBy(item.getClaimedBy());
        storedItem.setFoundItem(item.isFoundItem());
        storedItem.setLocation(item.getLocation());
        storedItem.setLastUpdated(LocalDate.now());

        this.itemRepository.save(storedItem);

    }

    @Override
    public void delete(String id) {
        this.itemRepository.deleteById(id);
    }

    @Override
    public boolean isItemExist(String id) {
        return this.itemRepository.existsById(id);
    }

    // </editor-fold>
}
