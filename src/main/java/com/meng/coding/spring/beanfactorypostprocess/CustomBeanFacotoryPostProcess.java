package com.meng.coding.spring.beanfactorypostprocess;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.stereotype.Component;

@Component
public class CustomBeanFacotoryPostProcess implements BeanFactoryPostProcessor {
    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory configurableListableBeanFactory) throws BeansException {
        System.out.println("CustomBeanFacotoryPostProcess postProcessBeanFactory");
        System.out.println("CustomBeanFacotoryPostProcess postProcessBeanFactory  " + configurableListableBeanFactory.getBeanDefinition("userService"));
        System.out.println("CustomBeanFacotoryPostProcess postProcessBeanFactory  " + configurableListableBeanFactory.getBean("userService"));
    }
}
