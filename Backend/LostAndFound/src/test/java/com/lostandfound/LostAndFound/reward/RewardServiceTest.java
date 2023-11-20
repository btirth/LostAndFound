package com.lostandfound.LostAndFound.reward;

import com.lostandfound.LostAndFound.reward.entities.Reward;
import com.lostandfound.LostAndFound.reward.service.Impl.RewardServiceImpl;
import java.sql.Date;
import java.time.LocalDate;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class RewardServiceTest {
  @Test
  public void testCreate() {
    Reward reward = new Reward();
    reward.setId("1");
    reward.setRewardId("123");
    reward.setIssuedAt(Date.valueOf(LocalDate.now()));
    reward.setExpiryDate(Date.valueOf(LocalDate.now().plusDays(30)));
    reward.setWinnerId("user1");
    reward.setLostItemUserId("lostuser1");

    Reward expectedReward = new RewardServiceImpl().create(reward);

    Assertions.assertNull(expectedReward);
  }
}
