package com.meng.coding.thread;

public class MyThreadDemo {
    public static void main(String[] args){

        try {
            MyThread myThread = new MyThread();
            myThread.start();
            Thread.sleep(10);
            myThread.interrupt();//设置想成中断标记
            /*Thread.currentThread().interrupt();
            System.out.println(Thread.interrupted());
            System.out.println(Thread.interrupted());
            System.out.println(Thread.interrupted());*/
        } catch (InterruptedException e) {
            System.out.println("main error :" + e.getMessage());
            e.printStackTrace();
        }
        System.out.println("main end");
    }

}
