package com.lostandfound.LostAndFound.reward;

import static org.mockito.Mockito.when;

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
}
