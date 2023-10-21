package com.lostandfound.LostAndFound.user.rest;

import com.lostandfound.LostAndFound.user.repo.UserRepository;
import com.lostandfound.LostAndFound.user.entities.User;
import com.lostandfound.LostAndFound.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController()
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("get-list")
    public List<User> getAllUsers() {
    return  userService.findAll();
    }


    // Get user by email
    @GetMapping
    public Optional<User> getUserByEmail(@RequestParam(required = true) String email) {
        return userService.findByEmail(email);
    }

    @PostMapping
    public String addUser(@RequestBody User user) {
        return userService.insert(user);
    }

    @DeleteMapping
    public String deleteUser(@RequestParam(required = true) String email) {
        return userService.delete(email);
    }

}
