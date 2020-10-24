package com.meng.coding.spring.beanfactorypostprocess;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.SmartInstantiationAwareBeanPostProcessor;
import org.springframework.beans.factory.support.MergedBeanDefinitionPostProcessor;
import org.springframework.beans.factory.support.RootBeanDefinition;
import org.springframework.lang.Nullable;

//3
public class CustomMergedBeanDefinitionPostProcessor implements MergedBeanDefinitionPostProcessor{

    @Override
    public void postProcessMergedBeanDefinition(RootBeanDefinition beanDefinition, Class<?> beanType, String beanName) {

    }
}
