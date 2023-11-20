package com.lostandfound.LostAndFound.reward;

import static org.mockito.Mockito.when;

import com.lostandfound.LostAndFound.reward.entities.Reward;
import com.lostandfound.LostAndFound.reward.repo.RewardRepository;
import com.lostandfound.LostAndFound.reward.service.Impl.RewardServiceImpl;
import java.sql.Date;
import java.time.LocalDate;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class RewardServiceTest {
  Reward reward;

  @Mock private RewardRepository rewardRepository;
  @InjectMocks private RewardServiceImpl rewardService;

  @BeforeEach
  public void setUp() {
    reward = new Reward();
    reward.setId("1");
    reward.setRewardId("123");
    reward.setIssuedAt(Date.valueOf(LocalDate.now()));
    reward.setExpiryDate(Date.valueOf(LocalDate.now().plusDays(30)));
    reward.setWinnerId("user1");
    reward.setLostItemUserId("lostuser1");
  }

  @Test
  public void testCreate() {
    when(rewardRepository.save(reward)).thenReturn(reward);

    Reward expectedReward = rewardService.create(reward);

    Assertions.assertEquals(expectedReward, reward);
  }
}
