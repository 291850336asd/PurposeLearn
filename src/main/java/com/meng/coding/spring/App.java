package com.meng.coding.spring;

import com.meng.coding.spring.Bean.IndexService;
import com.meng.coding.spring.Bean.TestService;
import com.meng.coding.spring.Bean.TestService2;
import com.meng.coding.spring.config.Config;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App {

    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext();
        context.register(Config.class);
        context.refresh();
        context.getBean(TestService.class);
//        System.out.println("--------");
//        context.getBean(TestService.class);
        context.getBean(TestService.class);
        context.getBean(TestService.class);
        context.getBean(TestService.class);
//        TestService2 te = context.getBean(TestService2.class);
    }
}
