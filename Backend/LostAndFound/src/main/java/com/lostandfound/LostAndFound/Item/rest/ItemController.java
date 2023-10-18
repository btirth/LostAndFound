package com.lostandfound.LostAndFound.Item.rest;

import com.lostandfound.LostAndFound.Item.entities.Item;
import com.lostandfound.LostAndFound.Item.service.IItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "item")
public class ItemController {


    //<editor-fold desc="Private members">
    @Autowired
    private IItemService iItemService;
    //</editor-fold>

    //<editor-fold desc="Constructor">

    //</editor-fold>

    //<editor-fold desc="Get requests">

    /**
     * Retrieves an item based on the provided ID.
     * @param id of the item to be retrieved
     * @return an Optional containing the item, or an empty Optional if the item does not exist
     */
    @GetMapping(path = "{id}")
    public Optional<Item> get(@PathVariable("id") String id) {
        return this.iItemService.get(id);
    }

    /**
     * Retrieves a list of items based on whether they are found items or not.
     * @param isFoundItem true if looking for found items, false if looking for lost items
     * @return a list of items based on the specified condition
     */
    @GetMapping("get-list")
    public List<Item> getList(@RequestParam(required = true) boolean isFoundItem) {
        return this.iItemService.getList(isFoundItem);
    }
    //</editor-fold>

    //<editor-fold desc="Put requests">

    /**
     * Updates an existing item.
     * @param item that should be updated
     */
    @PutMapping
    public void update(@RequestBody Item item) {
        this.iItemService.update(item);
    }
    //</editor-fold>

    //<editor-fold desc="Post requests">

    /**
     * Inserts a new item into the system.
     * @param item that should be inserted
     */
    @PostMapping
    public void insertNewItem(@RequestBody Item item) {
        // Create item
        this.iItemService.create(item);
    }
    //</editor-fold>

    //<editor-fold desc="Get requests">

    /**
     * Deletes an item by its ID.
     * @param id of the item to be deleted
     */
    @DeleteMapping(path = "{id}")
    public void deleteById(@PathVariable("id") String id) {
        this.iItemService.delete(id);
    }
    //</editor-fold>
}
