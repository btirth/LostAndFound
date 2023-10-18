package com.lostandfound.LostAndFound.Item.service.impl;

import com.lostandfound.LostAndFound.Item.entities.Item;
import com.lostandfound.LostAndFound.Item.repo.ItemRepository;
import com.lostandfound.LostAndFound.Item.service.IItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        this.itemRepository.insert(item);
    }

    @Override
    public Optional<Item> get(String id) {
        return this.itemRepository.findById(id);
    }

    @Override
    public List<Item> getList(boolean isFoundItem) {
        return this.itemRepository.filterItems(isFoundItem);
    }

    @Override
    @Transactional
    public void update(Item item) {
        Item storedItem = this.itemRepository.findById(item.getId())
                .orElseThrow(() -> new IllegalStateException("student with id does not exists"));
        storedItem.setTitle(item.getTitle());
        storedItem.setClaimedBy(item.getClaimedBy());
        storedItem.setDescription(item.getDescription());
        storedItem.setClaimedBy(item.getClaimedBy());
        storedItem.setFoundItem(item.isFoundItem());
        storedItem.setSensitive(item.isSensitive());

        this.itemRepository.save(storedItem);

    }

    @Override
    public void delete(String id) {
        this.itemRepository.deleteById(id);
    }

    // </editor-fold>
}
