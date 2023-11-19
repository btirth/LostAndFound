package com.lostandfound.LostAndFound.reward.service;

import com.lostandfound.LostAndFound.reward.entities.RewardData;

public interface RewardDataService {
  /**
   * Create a new reward data
   *
   * @param rewardData data of the reward (contains the details of the reward)
   * @return the created reward data
   */
  RewardData create(RewardData rewardData);
}
