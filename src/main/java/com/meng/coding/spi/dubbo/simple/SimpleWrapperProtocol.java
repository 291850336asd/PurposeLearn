package com.meng.coding.spi.dubbo.simple;

public class SimpleWrapperProtocol implements IProtocol{

    private IProtocol protocol;

    public SimpleWrapperProtocol(IProtocol protocol) {
        this.protocol = protocol;
    }

    @Override
    public String sayHello(String name) {
        System.out.println("before");
        String result = null;
        System.out.println(result = protocol.sayHello(name));
        System.out.println("after");
        return result;
    }
}
