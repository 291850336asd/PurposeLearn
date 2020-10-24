package com.meng.coding.spring.Bean;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class IndexService {

    @Autowired
    UserService userService;

    public IndexService(){
        System.out.println("indexService init");
    }


    @PostConstruct
    public void aa(){
        System.out.println(this.getClass().getName() + "  post construct ");
    }
}
