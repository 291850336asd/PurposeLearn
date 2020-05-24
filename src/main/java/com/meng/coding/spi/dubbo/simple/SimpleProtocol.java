package com.meng.coding.spi.dubbo.simple;

public class SimpleProtocol implements IProtocol {
    @Override
    public String sayHello(String name) {
        return "hello dubbo " + name;
    }
}
