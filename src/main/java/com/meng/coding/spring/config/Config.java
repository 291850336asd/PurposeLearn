package com.meng.coding.spring.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

//@ComponentScan("com.meng.coding.spring")
@Configuration
public class Config {

    @Bean
    public A getA(){
        return new A();
    }

    @Bean
    public B getB(){
        getA();
        return new B();
    }
}
