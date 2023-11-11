package com.lostandfound.LostAndFound;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class LostAndFoundApplication {
  public static void main(String[] args) {
    SpringApplication.run(LostAndFoundApplication.class, args);
  }
}
