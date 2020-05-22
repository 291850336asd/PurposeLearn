package com.meng.coding.spi.dubbo;

public class SimpleProtocol implements IProtocol {
    @Override
    public String sayHello(String name) {
        return "hello " + name;
    }
}
