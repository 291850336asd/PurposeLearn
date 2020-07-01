package com.meng.coding.spring;

import com.meng.coding.spring.Bean.IndexService;
import com.meng.coding.spring.config.Config;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App {

    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext();
        context.register(Config.class);
        context.refresh();
        context.getBean(IndexService.class);
    }
}
