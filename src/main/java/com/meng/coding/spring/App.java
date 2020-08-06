package com.meng.coding.spring;

import com.meng.coding.spring.Bean.IndexService;
import com.meng.coding.spring.config.Config;
import org.springframework.cglib.core.DebuggingClassWriter;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.io.IOException;

public class App {
    
    public static void main(String[] args) throws IOException {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext();
        context.register(Config.class);
        System.setProperty(DebuggingClassWriter.DEBUG_LOCATION_PROPERTY, "D:\\class");
        context.refresh();
        Config config = context.getBean(Config.class);
        System.out.println(config.getA());
        System.out.println(config.getB());
        config.getClass();
        System.out.println(config.getA());
        System.in.read();

    }
}
