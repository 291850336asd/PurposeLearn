package com.meng.coding.spring.beanfactorypostprocess;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.InstantiationAwareBeanPostProcessor;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

//1
@Component
public class CustomInstantiationAwareBeanPostProcessor implements InstantiationAwareBeanPostProcessor {
    @Nullable
    @Override
    public Object postProcessBeforeInstantiation(Class<?> beanClass, String beanName) throws BeansException {
        System.out.println(beanName + "  postProcessBeforeInstantiation CustomInstantiationAwareBeanPostProcessor");
        return null;
    }

    @Override
    public boolean postProcessAfterInstantiation(Object bean, String beanName) throws BeansException {
        System.out.println(beanName + "  postProcessAfterInstantiation CustomInstantiationAwareBeanPostProcessor");
        return true;
    }

    @Nullable
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println(beanName + "  postProcessBeforeInitialization CustomInstantiationAwareBeanPostProcessor");
        return null;
    }

    @Nullable
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println(beanName + "  postProcessAfterInitialization CustomInstantiationAwareBeanPostProcessor");
        return null;
    }
}
