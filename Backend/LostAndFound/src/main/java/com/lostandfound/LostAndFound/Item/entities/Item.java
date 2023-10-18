package com.lostandfound.LostAndFound.Item.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;


@Document(collection="item")
public class Item {
    @Id
    /**
     * Key of the item that can be uniquely identified
     */
    private String id;

    private String title;
    private String description;
    private String createdBy;
    private String claimedBy;
    private boolean isSensitive;
    private LocalDate postedAt;
    private byte[] image;

    private boolean isFoundItem;



    public Item() {

    }

    /**
     *
     * @return the id from the object
     */
    public String getId() {
        return id;
    }

    /**
     * Set the id to the object of item
     * @param id
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Get the title from the object of the item
     * @return title of the item
     */
    public String getTitle() {
        return title;
    }

    /**
     * set the title to the object of the Item
     * @param title string that describe the item in brief
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * set the description to the object of the Item
     * @return Description
     */
    public String getDescription() {
        return description;
    }

    /**
     * set the description to the object of the Item
     * @param description that describe the item in detail
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * set the title to the object of the Item
     * @param createdBy
     */
    public String getCreatedBy() {
        return createdBy;
    }

    /**
     * set the createdBy to the object of the Item
     * @param createdBy that represented it is created by which user
     */
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    /**
     * Gets the mailId of the person who claimed the item.
     * @return the email of the person who claimed the item
     */
    public String getClaimedBy() {
        return claimedBy;
    }

    /**
     * set the claimedBy to the object of the Item
     * @param claimedBy that it has been claimed by user mail id
     */
    public void setClaimedBy(String claimedBy) {
        this.claimedBy = claimedBy;
    }

    /**
     * Checks if the item is sensitive.
     * @return true if the item is sensitive; false otherwise
     */
    public boolean isSensitive() {
        return isSensitive;
    }

    /**
     * set the description to the object of the Item
     * @param sensitive that describe the item in detail
     */
    public void setSensitive(boolean sensitive) {
        isSensitive = sensitive;
    }

    /**
     * Gets the date when the item was posted.
     * @return the date when the item was posted
     */
    public LocalDate getPostedAt() {
        return postedAt;
    }

    /**
     * Sets the date when the item was posted.
     * @param postedAt the date when the item was posted
     */
    public void setPostedAt(LocalDate postedAt) {
        this.postedAt = postedAt;
    }

    /**
     * Gets the image associated with the item.
     * @return the image as a byte array
     */
    public byte[] getImage() {
        return image;
    }

    /**
     * Sets the image associated with the item.
     * @param image the image as a byte array
     */
    public void setImage(byte[] image) {
        this.image = image;
    }

    /**
     * Checks if the item is found.
     * @return true if the item is found; false otherwise
     */
    public boolean isFoundItem() {
        return isFoundItem;
    }

    /**
     * Sets whether the item is found or not.
     * @param foundItem true if the item is found; false otherwise
     */
    public void setFoundItem(boolean foundItem) {
        isFoundItem = foundItem;
    }
}
