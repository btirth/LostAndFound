package com.lostandfound.LostAndFound.reward;

import static org.mockito.Mockito.when;

import com.lostandfound.LostAndFound.core.exception.LostAndFoundException;
import com.lostandfound.LostAndFound.reward.entities.RewardData;
import com.lostandfound.LostAndFound.reward.repo.RewardDataRepository;
import com.lostandfound.LostAndFound.reward.service.Impl.RewardDataServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class RewardDataServiceTest {
  RewardData rewardData;

  @Mock private RewardDataRepository rewardDataRepository;
  @InjectMocks private RewardDataServiceImpl rewardDataService;

  @BeforeEach
  public void setUp() {
    rewardData = new RewardData("123", "Reward test", "Reward description test");
  }

  @Test
  void testCreateRewardData() {
    // arrange
    when(rewardDataRepository.save(rewardData)).thenReturn(rewardData);

    // act
    RewardData createdRewardData = rewardDataService.create(rewardData);

    // assert
    Assertions.assertEquals(rewardData, createdRewardData);
  }

  @Test
  void testCreateRewardDataException() {
    // arrange
    when(rewardDataRepository.save(rewardData)).thenThrow(new LostAndFoundException(""));

    // act
    // assert
    Assertions.assertThrows(
        LostAndFoundException.class, () -> rewardDataService.create(rewardData));
    // check message
    Assertions.assertEquals(
        "Error while creating reward data",
        Assertions.assertThrows(
                LostAndFoundException.class, () -> rewardDataService.create(rewardData))
            .getMessage());
  }

  @Test
  void testFindRewardDataById() {
    // arrange
    when(rewardDataRepository.findById("123")).thenReturn(Optional.ofNullable(rewardData));

    // act
    RewardData foundRewardData = rewardDataService.findById("123");

    // assert
    Assertions.assertEquals(rewardData.getId(), foundRewardData.getId());
    Assertions.assertEquals(rewardData.getTitle(), foundRewardData.getTitle());
    Assertions.assertEquals(rewardData.getDescription(), foundRewardData.getDescription());
  }
}
