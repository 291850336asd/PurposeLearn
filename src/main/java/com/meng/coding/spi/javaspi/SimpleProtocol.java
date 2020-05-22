package com.meng.coding.spi.javaspi;

public class SimpleProtocol implements IProtocol{
    @Override
    public String sayHello(String name) {
        return "hello " + name;
    }
}
