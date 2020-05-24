package com.meng.coding.spi.javaspi;

import java.util.Iterator;
import java.util.ServiceLoader;

/**
 * javaspi 不能单独获取某个指定实现类
 * 没有ioc aop功能
 */
public class Test {

    public static void main(String[] args) {
        ServiceLoader<IProtocol> serverLoader = ServiceLoader.load(IProtocol.class);
        Iterator<IProtocol> iterator = serverLoader.iterator();
        System.out.println(iterator.next().sayHello("haha"));
        System.out.println(iterator.next().sayHello("haha"));
    }
}
