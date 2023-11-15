package com.lostandfound.LostAndFound.user;

import com.lostandfound.LostAndFound.core.exception.LostAndFoundNotFoundException;
import com.lostandfound.LostAndFound.core.exception.LostAndFoundValidationException;
import com.lostandfound.LostAndFound.user.entities.User;
import com.lostandfound.LostAndFound.user.repo.UserRepository;
import com.lostandfound.LostAndFound.user.service.impl.UserServiceImpl;
import java.util.Date;
import java.util.Optional;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
  User user;
  @Mock private UserRepository userRepository;
  @InjectMocks private UserServiceImpl userService;

  @BeforeEach
  public void setUp() {
    user = new User("test@email.com", "testuser", "https://google.com", new Date(), new Date());
  }

  @Test
  void testFindUserByEmail() {
    // arrange
    Mockito.when(userRepository.findByEmail("test@email.com"))
        .thenReturn(Optional.ofNullable(user));

    // act
    User foundUser = userService.findByEmail("test@email.com");

    // assert
    Assertions.assertEquals(user, foundUser);
    Assertions.assertThrows(
        LostAndFoundNotFoundException.class,
        () -> {
          userService.findByEmail("gmail@gmail.com");
        },
        "User not found");
  }

  @Test
  void testInsertUser() {
    // arrange
    User userNotExists = user.copy();
    userNotExists.setEmail("copy@email.com");
    Mockito.when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);
    Mockito.when(userRepository.existsByEmail(userNotExists.getEmail())).thenReturn(false);
    Mockito.when(userRepository.insert(userNotExists)).thenReturn(userNotExists);

    // act
    User insertedUser = userService.insert(userNotExists);

    // assert
    Assertions.assertThrows(
        LostAndFoundValidationException.class,
        () -> {
          userService.insert(user);
        },
        "User already exists with email id: " + user.getEmail());
    Assertions.assertEquals(userNotExists, insertedUser);
  }

  @Test
  void testUpdateUser() {
    // arrange
    User userNotExists = user.copy();
    userNotExists.setEmail("copy@email.com");
    Mockito.when(userRepository.existsByEmail(userNotExists.getEmail())).thenReturn(false);
    Mockito.when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);
    Mockito.when(userRepository.save(user)).thenReturn(user);

    // act
    User updatedUser = userService.update(user);

    // assert
    Assertions.assertThrows(
        LostAndFoundNotFoundException.class,
        () -> {
          userService.update(userNotExists);
        },
        "User does not exist.");
    Assertions.assertEquals(user.getEmail(), updatedUser.getEmail());
    Assertions.assertEquals(user.getName(), updatedUser.getName());
    Assertions.assertEquals(user.getCreatedDate(), updatedUser.getCreatedDate());
    Assertions.assertEquals(user.getUpdatedDate(), updatedUser.getUpdatedDate());
    Assertions.assertEquals(user.getProfilePicUrl(), updatedUser.getProfilePicUrl());
  }

  @Test
  void testDeleteUser() {
    // arrange
    String notExistsUserEmail = "copy@email.com";
    User notExistsUser = user.copy();
    notExistsUser.setEmail(notExistsUserEmail);
    Mockito.when(userRepository.existsByEmail(notExistsUser.getEmail())).thenReturn(false);
    Mockito.when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);

    // act
    userService.delete(user.getEmail());

    // assert
    Assertions.assertThrows(
        LostAndFoundNotFoundException.class,
        () -> {
          userService.delete(notExistsUserEmail);
        },
        "User does not exist.");
    Mockito.verify(userRepository, Mockito.never()).deleteByEmail(notExistsUser.getEmail());
    Mockito.verify(userRepository, Mockito.times(1)).deleteByEmail(user.getEmail());
  }
}
