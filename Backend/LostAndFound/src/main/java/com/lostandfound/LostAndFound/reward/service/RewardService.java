package com.lostandfound.LostAndFound.reward.service;

import com.lostandfound.LostAndFound.reward.entities.Reward;
import java.util.List;

public interface RewardService {
  /**
   * Create a new reward
   *
   * @param reward the object of the reward
   * @return the created reward
   */
  Reward create(Reward reward);

  /**
   * Get a reward by winner id
   *
   * @param winnerId id of the winner
   * @return the reward list
   */
  List<Reward> findAllByWinnerId(String winnerId);

  void giveReward(String winnerId, String lostItemId);
}
