package com.lostandfound.LostAndFound.reward;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
public class RewardDataServiceTest {

  @Test
  void testCreateRewardData() {
    RewardData rewardData = new RewardData("123", "test title", "test description"); //id, title, description

    RewardDataService rewardDataService = new RewardDataServiceImpl();
    RewardData createdRewardData = rewardDataService.create(rewardData);

    Assertions.assertEquals(rewardData, createdRewardData);
  }
}
