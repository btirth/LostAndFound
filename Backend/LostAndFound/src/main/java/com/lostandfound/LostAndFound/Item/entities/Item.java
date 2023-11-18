package com.lostandfound.LostAndFound.Item.entities;

import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@Document(collection = "item")
public class Item {
  @Id private String id;
  private String title;
  private String description;
  private String createdBy;
  private String claimedBy;
  private Boolean sensitive;
  @CreatedDate private Date postedAt;
  @LastModifiedDate private Date updatedDate;
  private List<String> image;
  private Boolean foundItem;
  private String category;

  @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
  private GeoJsonPoint location;
  public Item(Item item) {
    this.id = item.id;
    this.title = item.title;
    this.description = item.description;
    this.createdBy = item.createdBy;
    this.claimedBy = item.claimedBy;
    this.sensitive = item.sensitive;
    this.postedAt = item.postedAt;
    this.updatedDate = item.updatedDate;
    this.image = item.image;
    this.foundItem = item.foundItem;
    this.category = item.category;
    this.location = item.location;
  }
}