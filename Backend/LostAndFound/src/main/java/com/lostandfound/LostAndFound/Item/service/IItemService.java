package com.lostandfound.LostAndFound.Item.service;

import com.lostandfound.LostAndFound.Item.entities.Item;

import java.time.LocalDate;
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
     * Retrieves a list of all items.
     * @param isFoundItem true if looking for found items, false if looking for lost items
     * @param postedAt 1 for oldest first, -1 for newest first
     * @return a list of all items
     */
    List<Item> getList(boolean isFoundItem, int postedAt);


    /**
     * Retrieves a list of items based on the user who posted them.
     * @param createdBy of the user who posted the items
     * @param isFoundItem true if looking for found items, false if looking for lost items posted by the user
     * @return a list of items based on the specified condition
     */
    List<Item> getListByUser(String createdBy, boolean isFoundItem, int postedAt);

    /**
     * Retrieves a list of items based on the user who posted them.
     * @param keyword given by the user to search for
     * @param isFoundItem true if looking for found items, false if looking for lost items posted by the user
     * @param postedAt 1 for oldest first, -1 for newest first
     * @return a list of items based on the specified condition
     */
    List<Item> getListByKeyword(String keyword,boolean isFoundItem, int postedAt);

    /**
     * Retrieves a list of items based on the filter like isFoundItem, longitude, latitude, distance, keyword, postedAt
     * @param longitude   where the user want to see any item has been reported
     * @param latitude    where the user want to see any item has been reported
     * @param distance    in meter to check the area by taking the longitude and latitude as center point
     * @param isFoundItem to check only the lost or found item should get
     * @param keyword to search the item
     * @param date to filter the item by date
     * @param postedAt 1 for oldest first, -1 for newest first
     * @return list of items
     */
    List<Item> getListByFilter(Double longitude, Double latitude, Double distance, boolean isFoundItem, String keyword, String date, int postedAt);


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
