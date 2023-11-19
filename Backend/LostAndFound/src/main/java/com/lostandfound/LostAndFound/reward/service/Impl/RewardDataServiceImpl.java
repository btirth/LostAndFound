package com.lostandfound.LostAndFound.reward.service.Impl;

import com.lostandfound.LostAndFound.core.exception.LostAndFoundException;
import com.lostandfound.LostAndFound.reward.entities.RewardData;
import com.lostandfound.LostAndFound.reward.repo.RewardDataRepository;
import com.lostandfound.LostAndFound.reward.service.RewardDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RewardDataServiceImpl implements RewardDataService {

  @Autowired private RewardDataRepository rewardDataRepository;

  /**
   * Create a new reward data
   *
   * @param rewardData data of the reward (contains the details of the reward)
   * @return the created reward data
   * @throws LostAndFoundException if the reward data does not exist
   */
  @Override
  public RewardData create(RewardData rewardData) {
    try {
      return this.rewardDataRepository.save(rewardData);
    } catch (Exception e) {
      throw new LostAndFoundException("Error while creating reward data");
    }
  }
}
