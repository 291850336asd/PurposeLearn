package com.meng.coding.spring.Bean;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
@Scope("prototype")
public class TestService {

    @Autowired
    TestService2 testService2;

    public TestService(){
        System.out.println("TestService init");
    }
}
