package com.lostandfound.LostAndFound.reward.repo;

import com.lostandfound.LostAndFound.reward.entities.Reward;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RewardRepository extends MongoRepository<Reward, String> {}
