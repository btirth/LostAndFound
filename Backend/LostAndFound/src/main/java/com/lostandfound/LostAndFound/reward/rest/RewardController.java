package com.lostandfound.LostAndFound.reward.rest;

import com.lostandfound.LostAndFound.reward.entities.Reward;
import com.lostandfound.LostAndFound.reward.service.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reward")
public class RewardController {
    @Autowired private RewardService rewardService;

    @PostMapping("/create")
    public Reward create(@RequestBody Reward reward) {
        return this.rewardService.create(reward);
    }

}
