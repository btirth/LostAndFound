package com.lostandfound.LostAndFound.user.service;

import com.lostandfound.LostAndFound.user.entities.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {
    Optional<User> findByEmail(String email);

    List<User> findAll();

    String insert(User user);

    String delete(String email);
    String update(User user);
}
