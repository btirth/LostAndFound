package com.lostandfound.LostAndFound.reward.service.Impl;

import com.lostandfound.LostAndFound.reward.entities.Reward;
import com.lostandfound.LostAndFound.reward.repo.RewardRepository;
import com.lostandfound.LostAndFound.reward.service.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RewardServiceImpl implements RewardService {

  @Autowired private RewardRepository rewardRepository;

  /**
   * Create a new reward
   *
   * @param reward the object of the reward
   * @return the created reward
   */
  @Override
  public Reward create(Reward reward) {
    return this.rewardRepository.save(reward);
  }
}
