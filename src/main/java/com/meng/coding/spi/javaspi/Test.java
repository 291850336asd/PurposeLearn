package com.meng.coding.spi.javaspi;

import java.util.Iterator;
import java.util.ServiceLoader;

public class Test {

    public static void main(String[] args) {
        ServiceLoader<IProtocol> serverLoader = ServiceLoader.load(IProtocol.class);
        Iterator<IProtocol> iterator = serverLoader.iterator();
        System.out.println(iterator.next().sayHello("haha"));
        System.out.println(iterator.next().sayHello("haha"));
    }
}
