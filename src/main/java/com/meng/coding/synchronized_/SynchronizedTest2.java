package com.meng.coding.synchronized_;

import org.openjdk.jol.info.ClassLayout;

/**
 * （1）java代码级别 Synchronized（o）
 * （2）字节码 monitorenter  monitorexit
 * （3）jvm(hotspot)
 * synchronized (lock) 会改变对象头markword
 */
public class SynchronizedTest2 {


    public static class Lock{}

    public static void main(String[] args) {

        Lock lock = new Lock();
        synchronized (lock){
            System.out.println( ClassLayout.parseInstance(lock).toPrintable());
        }
    }
}
/**
 * com.meng.example.SynchronizedTest$Lock object internals:
 *  OFFSET  SIZE   TYPE DESCRIPTION                               VALUE
 *       0     4        (object header)                           01 00 00 00 (00000001 00000000 00000000 00000000) (1)
 *       4     4        (object header)                           00 00 00 00 (00000000 00000000 00000000 00000000) (0)
 *       8     4        (object header)                           43 c1 00 f8 (01000011 11000001 00000000 11111000) (-134168253)
 *      12     4        (loss due to the next object alignment)
 * Instance size: 16 bytes
 * Space losses: 0 bytes internal + 4 bytes external = 4 bytes total
 *
 *
 * com.meng.example.SynchronizedTest2$Lock object internals:
 *  OFFSET  SIZE   TYPE DESCRIPTION                               VALUE
 *       0     4        (object header)                           38 f1 a8 02 (00111000 11110001 10101000 00000010) (44626232)
 *       4     4        (object header)                           00 00 00 00 (00000000 00000000 00000000 00000000) (0)
 *       8     4        (object header)                           43 c1 00 f8 (01000011 11000001 00000000 11111000) (-134168253)
 *      12     4        (loss due to the next object alignment)
 * Instance size: 16 bytes
 * Space losses: 0 bytes internal + 4 bytes external = 4 bytes total
 *
 *
 *
 */