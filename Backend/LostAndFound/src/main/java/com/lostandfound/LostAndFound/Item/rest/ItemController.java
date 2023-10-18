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


    private final IItemService _iItemService;

    @Autowired
    public ItemController(IItemService iItemService)
    {
        this._iItemService = iItemService;
    }

    @GetMapping(path = "{id}")
    public Optional<Item> get(@PathVariable("id") String id) {
        return this._iItemService.get(id);
    }
    @GetMapping("get-list")
    public List<Item> getList(@RequestParam(required = true) boolean isFoundItem) {
        return this._iItemService.getList(isFoundItem);
    }

    @PutMapping
    public void update(@RequestBody Item item) {
        this._iItemService.update(item);
    }

    @PostMapping
    public void insertNewItem(@RequestBody Item item) {
        try {
            // Create item
            this._iItemService.create(item);
        }
        catch(Exception e)
        {
            throw e;
        }
    }

    @DeleteMapping(path = "{id}")
    public void deleteById(@PathVariable("id") String id) {
        this._iItemService.delete(id);
    }
}
