package com.lostandfound.LostAndFound.reward.repo;

import com.lostandfound.LostAndFound.reward.entities.RewardData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RewardDataRepository extends MongoRepository<RewardData, String> {}
