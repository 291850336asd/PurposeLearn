package com.meng.coding.volatile_;

/**
 * https://blog.csdn.net/lpf463061655/article/details/105719924/
 */
public class CacheLinePaddingAfter {

    // 定义7个long类型变量，进行缓存行填充
    private static class Padding{
        public volatile long p1, p2, p3, p4, p5, p6, p7;
    }

    private static class Entity extends Padding{
        // 使用@sun.misc.Contended注解，必须添加此参数：-XX:-RestrictContended
        // @sun.misc.Contended
        public volatile long x = 0L;
    }

    public static Entity[] arr = new Entity[2];

    static {
        arr[0] = new Entity();
        arr[1] = new Entity();
    }

    public static void main(String[] args) throws InterruptedException {

        Thread threadA = new Thread(() -> {
            for (int i = 0; i < 1000_0000; i++) {
                arr[0].x = i;
            }
        }, "ThreadA");

        Thread threadB = new Thread(() -> {
            for (int i = 0; i < 1000_0000; i++) {
                arr[1].x = i;
            }
        }, "ThreadB");

        final long start = System.nanoTime();
        threadA.start();
        threadB.start();
        threadA.join();
        threadB.join();
        final long end = System.nanoTime();
        System.out.println("耗时：" + (end - start)/100_0000);

    }
}