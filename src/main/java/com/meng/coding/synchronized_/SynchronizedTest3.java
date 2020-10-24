package com.meng.coding.synchronized_;

import org.openjdk.jol.info.ClassLayout;

/**
 * （1）java代码级别 Synchronized（o）
 * （2）字节码 monitorenter  monitorexit
 * （3）jvm(hotspot)
 * synchronized (lock) 会改变对象头markword
 *
 * new对象-偏向锁-轻量级锁（无所，自旋锁，自适应自旋）-重量级锁
 * synchronized优化的过程和markword息息相关
 *
 *
 * lock cpmxchg 汇编指令
 */
public class SynchronizedTest3 {


    public static class Lock{}

    public static void main(String[] args) {

        Object o = new Object();
        System.out.println( ClassLayout.parseInstance(o).toPrintable());
        synchronized (o){
            System.out.println( ClassLayout.parseInstance(o).toPrintable());
        }
    }
}
