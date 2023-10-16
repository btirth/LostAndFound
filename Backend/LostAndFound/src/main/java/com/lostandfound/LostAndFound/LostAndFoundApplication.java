package com.lostandfound.LostAndFound;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class LostAndFoundApplication {
	public static void main(String[] args) {
		SpringApplication.run(LostAndFoundApplication.class, args);
	}
}