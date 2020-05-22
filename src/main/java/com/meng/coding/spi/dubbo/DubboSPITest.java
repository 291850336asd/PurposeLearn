package com.meng.coding.spi.dubbo;

import org.apache.dubbo.common.extension.ExtensionLoader;

public class DubboSPITest {

    public static void main(String[] args) {
        ExtensionLoader<IProtocol> extensionLoader =
                ExtensionLoader.getExtensionLoader(IProtocol.class);
        IProtocol optimusPrime = extensionLoader.getExtension("SimpleProtocol");
        System.out.println(optimusPrime.sayHello("haha"));
        IProtocol bumblebee = extensionLoader.getExtension("SimpleProtocol2");
        System.out.println(bumblebee.sayHello("haha"));
    }
}
