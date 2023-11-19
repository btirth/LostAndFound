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
  void testFindUserByEmailSuccess() {
    // arrange
    Mockito.when(userRepository.findByEmail("test@email.com"))
        .thenReturn(Optional.ofNullable(user));

    // act
    User foundUser = userService.findByEmail("test@email.com");

    // assert
    Assertions.assertEquals(user, foundUser);
  }

  @Test
  void testFindUserByEmailFailure() {
    // arrange
    Mockito.when(userRepository.findByEmail("test@email.com")).thenReturn(Optional.empty());

    // act + assert
    Assertions.assertThrows(
        LostAndFoundNotFoundException.class,
        () -> {
          userService.findByEmail("test@email.com");
        },
        "User not found");
  }

  @Test
  void testInsertUserSuccess() {
    // arrange
    Mockito.when(userRepository.existsByEmail(user.getEmail())).thenReturn(false);
    Mockito.when(userRepository.insert(user)).thenReturn(user);

    // act
    User insertedUser = userService.insert(user);

    // assert
    Assertions.assertEquals(user, insertedUser);
  }

  @Test
  void testInsertUserAlreadyExists() {
    // arrange
    Mockito.when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);

    // act + assert
    Assertions.assertThrows(
        LostAndFoundValidationException.class,
        () -> {
          userService.insert(user);
        },
        "User already exists with email id: " + user.getEmail());
  }

  @Test
  void testUpdateUserUpdateName() {
    // arrange
    Mockito.when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);
    Mockito.when(userRepository.save(user)).thenReturn(user);
    user.setName("newName");

    // act
    User updatedUser = userService.update(user);

    // assert
    Assertions.assertEquals(user.getName(), updatedUser.getName());
  }

  @Test
  void testUpdateUserNotExists() {
    // arrange
    Mockito.when(userRepository.existsByEmail(user.getEmail())).thenReturn(false);
    // act + assert
    Assertions.assertThrows(
        LostAndFoundNotFoundException.class,
        () -> {
          userService.update(user);
        },
        "User does not exist.");
  }

  @Test
  void testUpdateUserUpdateEmail() {
    // arrange
    Mockito.when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);
    Mockito.when(userRepository.save(user)).thenReturn(user);
    user.setEmail("newemail@gmail.com");

    // act + assert
    Assertions.assertThrows(
        Exception.class,
        () -> {
          userService.update(user);
        });
  }

  @Test
  void testUpdateUserUpdateCreatedDate() {
    // arrange
    Mockito.when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);
    Mockito.when(userRepository.save(user)).thenReturn(user);
    user.setCreatedDate(new Date());

    // act
    User updatedUser = userService.update(user);

    // assert
    Assertions.assertEquals(user.getCreatedDate(), updatedUser.getCreatedDate());
  }

  @Test
  void testUpdateUserUpdateUpdatedDate() {
    // arrange
    Mockito.when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);
    Mockito.when(userRepository.save(user)).thenReturn(user);
    user.setUpdatedDate(new Date());

    // act
    User updatedUser = userService.update(user);

    // assert
    Assertions.assertEquals(user.getUpdatedDate(), updatedUser.getUpdatedDate());
  }

  @Test
  void testUpdateUserUpdateProfilePicUrl() {
    // arrange
    Mockito.when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);
    Mockito.when(userRepository.save(user)).thenReturn(user);
    user.setProfilePicUrl("new-pic.com");

    // act
    User updatedUser = userService.update(user);

    // assert
    Assertions.assertEquals(user.getProfilePicUrl(), updatedUser.getProfilePicUrl());
  }

  @Test
  void testDeleteUserSuccess() {
    // arrange
    Mockito.when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);

    // act
    userService.delete(user.getEmail());

    // assert
    Mockito.verify(userRepository, Mockito.times(1)).deleteByEmail(user.getEmail());
  }

  @Test
  void testDeleteUserNotExists() {
    // arrange
    Mockito.when(userRepository.existsByEmail(user.getEmail())).thenReturn(false);

    // act + assert
    Assertions.assertThrows(
        LostAndFoundNotFoundException.class,
        () -> {
          userService.delete(user.getEmail());
        },
        "User does not exist.");
    Mockito.verify(userRepository, Mockito.never()).deleteByEmail(user.getEmail());
  }
}
