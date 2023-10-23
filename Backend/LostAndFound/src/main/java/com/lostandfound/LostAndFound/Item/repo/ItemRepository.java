package com.lostandfound.LostAndFound.Item.repo;


import com.lostandfound.LostAndFound.Item.entities.Item;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository
        extends MongoRepository<Item, String> {

    /**
     * Method that returh the item by its ID
     *
     * @param id
     * @return Optional<Item></Item>
     */
    public Optional<Item> findById(String id);

    /**
     * Delete the item by its ID
     *
     * @param id
     */
    public void deleteById(String id);

    /**
     * pass the boolean flag to get the list of items that has been reported as found or lost
     *
     * @param isFoundItem
     * @return return the list of item
     */
    @Query("{'isFoundItem': ?0}")
    public List<Item> filterItems(boolean isFoundItem);

    /**
     * @param isFoundItem to check only the lost or found item should get
     * @param longitude   where the user want to see any item has been reported
     * @param latitude    where the user want to see any item has been reported
     * @param distance    in meter to check the area by taking the longitude and latitude as center point
     * @return the list of the item
     */
    @Query("{ 'isFoundItem': ?0, 'location' : { $near : { $geometry : { type: 'Point', coordinates: [?1, ?2] }, $maxDistance: ?3 } } }")
    public List<Item> findByIsFoundItemAndLocationWithin(boolean isFoundItem, double longitude, double latitude, double distance);

    /**
     * Retrieves a list of items based on the user who posted them.
     *
     * @param createdBy   of the user who posted the items
     * @param isFoundItem true if looking for found items, false if looking for lost items posted by the user
     * @return a list of items based on the specified condition
     */
    @Aggregation(pipeline = {"{ $match: { 'createdBy': ?0, 'isFoundItem': ?1 }}",
            "{ $sort: { 'postedAt': ?2 } }"}
    )
    public List<Item> findByCreatedByAndIsFoundItem(String createdBy, boolean isFoundItem, int postedAt);

    /**
     * Method for searching the item by keyword
     *
     * @param keyword
     * @return list of item
     */
    @Aggregation(pipeline = {"{$search: {text: {query: ?0, path: ['title', 'description']}}}",
            "{$match: { 'isFoundItem': true }}",
            "{$sort: { 'postedAt': ?1 } }"})
    public List<Item> findByKeyword(String keyword, int postedAt);

    /***
     *
     * @param id
     * @return true if any item with given id is exists
     */
    public boolean existsById(String id);
}
