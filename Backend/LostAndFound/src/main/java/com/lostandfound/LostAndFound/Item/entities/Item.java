package com.lostandfound.LostAndFound.Item.entities;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.time.LocalDate;


@Document(collection="item")
public class Item {
    @Id
    //    @SequenceGenerator(
    //            name = "item_sequence",
    //            sequenceName = "item_sequence",
    //            allocationSize = 1
    //    )
    //    @GeneratedValue(
    //            strategy = GenerationType.SEQUENCE,
    //            generator = "item_sequence"
    //    )
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String title;
    private String description;
    private String createdBy;
    private String claimedBy;
    private boolean isSensitive;
    private LocalDate postedAt;
    private byte[] image;

    private boolean isFoundItem;



    public Item(){

    }
    public Item(String id, String title, String description, String createdBy, String claimedBy, boolean isSensitive, LocalDate postedAt, byte[] image) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdBy = createdBy;
        this.claimedBy = claimedBy;
        this.isSensitive = isSensitive;
        this.postedAt = postedAt;
        this.image = image;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getClaimedBy() {
        return claimedBy;
    }

    public void setClaimedBy(String claimedBy) {
        this.claimedBy = claimedBy;
    }

    public boolean isSensitive() {
        return isSensitive;
    }

    public void setSensitive(boolean sensitive) {
        isSensitive = sensitive;
    }

    public LocalDate getPostedAt() {
        return postedAt;
    }

    public void setPostedAt(LocalDate postedAt) {
        this.postedAt = postedAt;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public boolean isFoundItem() {
        return isFoundItem;
    }

    public void setFoundItem(boolean foundItem) {
        isFoundItem = foundItem;
    }
}
