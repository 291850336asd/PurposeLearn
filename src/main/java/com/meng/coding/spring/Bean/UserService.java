package com.meng.coding.spring.Bean;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class UserService {

    @Autowired
    IndexService indexService;

    public UserService(){
        System.out.println("user Service init");
    }


    @PostConstruct
    public void aa(){
        System.out.println("post construct " + this.getClass().getName());
    }
}
