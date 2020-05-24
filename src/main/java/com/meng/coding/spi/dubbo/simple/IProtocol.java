package com.meng.coding.spi.dubbo.simple;

import org.apache.dubbo.common.extension.SPI;

@SPI
public interface IProtocol {

    public String sayHello(String name);
}
