package com.lostandfound.LostAndFound.reward.service.Impl;

import com.lostandfound.LostAndFound.reward.entities.Reward;
import com.lostandfound.LostAndFound.reward.entities.RewardData;
import com.lostandfound.LostAndFound.reward.repo.RewardRepository;
import com.lostandfound.LostAndFound.reward.service.RewardDataService;
import com.lostandfound.LostAndFound.reward.service.RewardService;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RewardServiceImpl implements RewardService {

  @Autowired private RewardRepository rewardRepository;

  @Autowired private RewardDataService rewardDataService;

  /**
   * Create a new reward
   *
   * @param reward the object of the reward
   * @return the created reward
   */
  @Override
  public Reward create(Reward reward) {
    // get all the rewards id from the database
    List<String> allRewardIds = rewardDataService.getAllIds();

    // get random id for the reward
    String rewardId;
    Random rand = new Random();
    int randomIndex = rand.nextInt(allRewardIds.size());
    rewardId = allRewardIds.get(randomIndex);

    RewardData rewardData = rewardDataService.findById(rewardId);

    Calendar cal = Calendar.getInstance();
    cal.add(Calendar.DATE, 30);
    Date expiryDate = new Date(cal.getTime().getTime());

    reward.setRewardData(rewardData);
    reward.setExpiryDate(expiryDate);

    return this.rewardRepository.save(reward);
  }

  /**
   * Get a reward by winner id
   *
   * @param winnerId id of the winner
   * @return the reward list
   */
  @Override
  public List<Reward> findAllByWinnerId(String winnerId) {
    return this.rewardRepository.findAllByWinnerId(winnerId);
  }

  /**
   * Give reward to the winner
   *
   * @param winnerId email/id of the winner
   * @param lostItemUserId id of the lost item user
   * @param lostItemId id of the lost item
   * @param itemId id of the found item
   * @param itemTitle title of the found item
   */
  @Override
  public void giveReward(
      String winnerId, String lostItemUserId, String lostItemId, String itemId, String itemTitle) {
    Reward reward = new Reward();

    reward.setWinnerId(winnerId);
    reward.setLostItemUserId(lostItemUserId);
    reward.setLostItemId(lostItemId);
    reward.setItemId(itemId);
    reward.setItemTitle(itemTitle);

    this.create(reward);
  }
}
