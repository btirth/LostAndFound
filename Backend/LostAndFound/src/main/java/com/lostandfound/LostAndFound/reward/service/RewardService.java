package com.lostandfound.LostAndFound.reward.service;

import com.lostandfound.LostAndFound.reward.entities.Reward;

public interface RewardService {
  /**
   * Create a new reward
   *
   * @param reward the object of the reward
   * @return the created reward
   */
  Reward create(Reward reward);
}
