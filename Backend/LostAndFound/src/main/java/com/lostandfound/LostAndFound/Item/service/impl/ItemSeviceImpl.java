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
        item.setPostedAt(LocalDate.now());
        this.itemRepository.insert(item);
    }

    @Override
    public Optional<Item> get(String id) {
        return this.itemRepository.findById(id);
    }

    @Override
    public List<Item> getList(boolean isFoundItem, int postedAt) {
        return this.itemRepository.getList(isFoundItem, postedAt);
    }

    @Override
    public List<Item> getListByUser(String createdBy, boolean isFoundItem, int postedAt) {
        return this.itemRepository.findByCreatedByAndIsFoundItem(createdBy, isFoundItem, postedAt);
    }

    @Override
    public List<Item> getListByKeyword(String keyword, boolean isFoundItem, int postedAt) {
        return this.itemRepository.findByKeyword(keyword, isFoundItem, postedAt);
    }


    @Override
    public List<Item> getListByFilter(Double longitude, Double latitude, Double distance, boolean isFoundItem, String keyword, String date, int postedAt) {
        List<Item> filteredData = new java.util.ArrayList<Item>();
        List<Item> fetchedData = new java.util.ArrayList<Item>();
        LocalDate localDate = null;
        // convert date to localdate

        if (date != null && !date.isEmpty()) {
            localDate = LocalDate.parse(date);
        }

        if (longitude == null || latitude == null || distance == null) {
            if (keyword == null || keyword.isEmpty()) {
                fetchedData = this.itemRepository.getList(isFoundItem, postedAt);
            } else {
                fetchedData = this.itemRepository.findByKeyword(keyword, isFoundItem, postedAt);
            }
            if (localDate != null){
                for (Item item : fetchedData) {
                    if (item.getPostedAt().equals(localDate)) {
                        filteredData.add(item);
                    }
                }
                return filteredData;
            }
        }
        fetchedData = this.itemRepository.findByLocationWithinAndPostedAt(longitude, latitude, distance, isFoundItem, postedAt);
        if (keyword == null || keyword.isEmpty()) {
            if (localDate != null){
                for (Item item : fetchedData) {
                    if (item.getPostedAt().equals(localDate)) {
                        filteredData.add(item);
                    }
                }
                return filteredData;
            }
            return fetchedData;
        }

        for (Item item : fetchedData) {
            if ((item.getTitle().contains(keyword) || item.getDescription().contains(keyword))) {
                if (localDate != null){
                    if (item.getPostedAt().equals(localDate)) {
                        filteredData.add(item);
                    }
                    continue;
                }
                filteredData.add(item);
            }
        }
        return filteredData;
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
