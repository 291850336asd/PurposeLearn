package com.meng.coding.spi.dubbo;

import org.apache.dubbo.common.extension.SPI;

@SPI
public interface IProtocol {

    public String sayHello(String name);
}
