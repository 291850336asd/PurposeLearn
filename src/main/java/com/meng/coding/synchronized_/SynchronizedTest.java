package com.meng.coding.synchronized_;

import org.openjdk.jol.info.ClassLayout;

/**
 * （1）java代码级别 Synchronized（o）
 * （2）字节码 monitorenter  monitorexit
 * （3）jvm(hotspot)
 *
 */
public class SynchronizedTest {


    public static class Lock{}

    public static void main(String[] args) {

        System.out.println( ClassLayout.parseInstance(new Lock()).toPrintable());
    }
}
