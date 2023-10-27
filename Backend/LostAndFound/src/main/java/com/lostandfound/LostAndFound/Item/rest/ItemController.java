package com.lostandfound.LostAndFound.Item.rest;

import com.lostandfound.LostAndFound.Item.entities.Item;
import com.lostandfound.LostAndFound.Item.service.IItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/item")
public class ItemController {

    // <editor-fold desc="Private members">
    @Autowired
    private IItemService iItemService;
    // </editor-fold>

    // <editor-fold desc="Constructor">

    // </editor-fold>

    // <editor-fold desc="Get requests">

    /**
     * Retrieves an item based on the provided ID.
     *
     * @param id of the item to be retrieved
     * @return an Optional containing the item, or an empty Optional if the item
     *         does not exist
     */
    @GetMapping(path = "/{id}")
    public Object get(@PathVariable("id") String id) {
        try {
            if (this.iItemService.isItemExist(id)) {
                return this.iItemService.get(id);
            } else {
                return "item could not be found";
            }
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    /**
     * Retrieves a list of all found or lost items.
     * 
     * @param isFoundItem true if looking for found items, false if looking for lost
     *                    items
     * @param postedAt    1 for oldest first, -1 for newest first
     * @return a list of all found or lost items
     */
    @GetMapping("/get-list")
    public Object getList(@RequestParam(required = true) boolean isFoundItem,
            @RequestParam(defaultValue = "-1") int postedAt) {
        try {
            return this.iItemService.getList(isFoundItem, postedAt);
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    /**
     * Retrieves a list of items based on whether they are found items or not.
     *
     * @param longitude   where the user want to see any item has been reported
     * @param latitude    where the user want to see any item has been reported
     * @param distance    in meter to check the area by taking the longitude and
     *                    latitude as center point
     * @param isFoundItem to check only the lost or found item should get
     * @param keyword     to search the item
     * @param postedAt    1 for oldest first, -1 for newest first
     * @return a list of items based on the specified condition
     */
    @GetMapping("/get-list-by-filter")
    public Object getListByFilter(
            @RequestParam(required = false) Double longitude,
            @RequestParam(required = false) Double latitude,
            @RequestParam(required = false) Double distance,
            @RequestParam(required = true) boolean isFoundItem,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String date,
            @RequestParam(defaultValue = "-1") int postedAt) {
        try {
            return this.iItemService.getListByFilter(longitude, latitude, distance, isFoundItem, keyword, date,
                    postedAt);
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    /**
     * Retrieves a list of items based on the user who posted them.
     *
     * @param createdBy   of the user who posted the items
     * @param isFoundItem true if looking for found items, false if looking for lost
     *                    items posted by the user
     * @param postedAt    1 for oldest first, -1 for newest first
     * @return a list of items based on the specified condition
     */
    @GetMapping("/get-list-by-user")
    public Object getListByUser(@RequestParam(required = true) String createdBy,
            @RequestParam(required = true) boolean isFoundItem, @RequestParam(defaultValue = "-1") int postedAt) {
        try {
            return this.iItemService.getListByUser(createdBy, isFoundItem, postedAt);
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    /**
     * Retrieves a list of items based on the user who posted them.
     *
     * @param keyword of the user who posted the items
     * @return a list of items based on the specified condition
     */
    @GetMapping("/get-list-by-keyword")
    public Object getListByKeyword(@RequestParam(defaultValue = "false") Boolean isFoundItem,
            @RequestParam(required = false) String keyword, @RequestParam(defaultValue = "-1") int postedAt) {
        try {
            return this.iItemService.getListByKeyword(keyword, isFoundItem, postedAt);
        } catch (Exception e) {
            return e.getMessage();
        }
    }
    // </editor-fold>

    // <editor-fold desc="Put requests">

    /**
     * Updates an existing item.
     * 
     * @param item that should be updated
     */
    @PutMapping
    public String update(@RequestBody Item item) {
        try {
            if (this.iItemService.isItemExist(item.getId())) {
                this.iItemService.update(item);
                return "Item updated successfully";
            } else {
                return "item could not be found";
            }
        } catch (Exception e) {
            return e.getMessage();
        }
    }
    // </editor-fold>

    // <editor-fold desc="Post requests">

    /**
     * Inserts a new item into the system.
     *
     * @param item that should be inserted
     */
    @PostMapping
    public String insertNewItem(@RequestBody Item item) {
        // Create item
        try {
            this.iItemService.create(item);
            return "Item Inserted Successfully";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
    // </editor-fold>

    // <editor-fold desc="Delete requests">

    /**
     * Deletes an item by its ID.
     *
     * @param id of the item to be deleted
     */
    @DeleteMapping(path = "/{id}")
    public String deleteById(@PathVariable("id") String id) {
        try {
            if (this.iItemService.isItemExist(id)) {
                this.iItemService.delete(id);
                return "Item deleted successfully";
            } else {
                return "item could not be found";
            }
        } catch (Exception e) {
            return e.getMessage();
        }
    }
    // </editor-fold>
}
