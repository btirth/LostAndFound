package com.lostandfound.LostAndFound.test;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping("/public")
    public String publicApi() {
        return "Public API";
    }

    @GetMapping("/private")
    public String privateApi() {
        return "Private API";
    }

}
