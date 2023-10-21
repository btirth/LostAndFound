package com.lostandfound.LostAndFound.user.service.impl;

import com.lostandfound.LostAndFound.user.entities.User;
import com.lostandfound.LostAndFound.user.repo.UserRepository;
import com.lostandfound.LostAndFound.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<User> findByEmail(String email) {
        // check if user exists
        if(!this.userRepository.existsByEmail(email)) {
            throw new RuntimeException("User does not exist");
        }
        return this.userRepository.findByEmail(email);
    }

    @Override
    public List<User> findAll() {
        return this.userRepository.findAll();
    }

    @Override
    public String insert(User user) {
        try {
            if(this.userRepository.existsByEmail(user.getEmail())) {
                return "User already exists";
            }
            this.userRepository.insert(user);
            return "User added successfully";

        } catch (Exception e) {
            return "Error adding user";
        }
    }

    @Override
    public String delete(String email) {
        try {
            if(!this.userRepository.existsByEmail(email)) {
                return "User does not exist";
            }
            this.userRepository.deleteByEmail(email);
            return "User deleted successfully";

        } catch (Exception e) {
            System.out.println(e);
            return "Error deleting user";
        }
    }

}
