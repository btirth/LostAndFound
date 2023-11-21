package com.lostandfound.LostAndFound.Item.entities;

import java.util.*;
import lombok.*;
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
@NoArgsConstructor
@Builder
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
  private Boolean returned;

  @Builder.Default private Map<String, String> claimRequested = new HashMap<String, String>();
  @Builder.Default private Map<String, String> claimRequestAccepted = new HashMap<String, String>();
  @Builder.Default private Map<String, String> claimRejected = new HashMap<String, String>();

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
    this.returned = item.returned;
  }
}
