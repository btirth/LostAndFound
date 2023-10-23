package com.lostandfound.LostAndFound.Item.service;

import com.lostandfound.LostAndFound.Item.entities.Item;
import org.springframework.data.geo.Distance;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface IItemService {

    /**
     * Creates a new item.
     * @param item which needs to be created
     */
    void create(Item item);

    /**
     * Retrieves an item based on the provided ID.
     * @param id  of the item to be retrieved
     * @return an Optional containing the item, or an empty Optional if the item does not exist
     */
    Optional<Item> get(String id);

    /**
     * Retrieves a list of items based on whether they are found items or not.
     * @param isFoundItem true if looking for found items, false if looking for lost items
     * @return a list of items based on the specified condition
     */
    List<Item> getList(boolean isFoundItem, double longitude, double latitude,  double distance);

    /**
     * Retrieves a list of items based on the user who posted them.
     * @param createdBy of the user who posted the items
     * @param isFoundItem true if looking for found items, false if looking for lost items posted by the user
     * @return a list of items based on the specified condition
     */
    List<Item> getList(String createdBy, boolean isFoundItem, int postedAt);

    /**
     * Retrieves a list of items based on the user who posted them.
     * @param keyword given by the user to search for
     * @param postedAt 1 for oldest first, -1 for newest first
     * @return a list of items based on the specified condition
     */
    List<Item> getList(String keyword, int postedAt);

    /**
     * Updates an existing item.
     * @param item needs to be updated
     */
    void update(Item item);

    /**
     * This method will use to delete the item using its id.
     * @param id of the item that needs to be deleted
     */
    void delete(String id);

    boolean isItemExist(String id);


}
