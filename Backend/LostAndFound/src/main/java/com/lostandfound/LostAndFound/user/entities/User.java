package com.lostandfound.LostAndFound.user.entities;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@Document(collection = "users")
public class User {
  @Id private String email;
  private String name;
  private String profilePicUrl;
  @CreatedDate private Date createdDate;
  @LastModifiedDate private Date updatedDate;

  public User copy() {
    return new User(this.email, this.name, this.profilePicUrl, this.createdDate, this.updatedDate);
  }
}
