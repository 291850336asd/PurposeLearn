package com.meng.coding.spring.Bean;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class UserService implements ApplicationContextAware{

    private ApplicationContext context;

    @Autowired
    IndexService indexService;

    public UserService(){
        System.out.println("userService init");
    }


    @PostConstruct
    public void init(){
        System.out.println(this.getClass().getName() + "  post construct");
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.context = applicationContext;
        System.out.println("userService context");
    }
}
