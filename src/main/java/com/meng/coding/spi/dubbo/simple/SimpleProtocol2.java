package com.meng.coding.spi.dubbo.simple;

public class SimpleProtocol2 implements IProtocol {
    @Override
    public String sayHello(String name) {
        return "hello2 dubbo " + name;
    }
}
