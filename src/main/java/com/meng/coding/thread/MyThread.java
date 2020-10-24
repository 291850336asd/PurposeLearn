package com.meng.coding.thread;

public class MyThread extends Thread {
    @Override
    public void run() {
        try {
            for (int i = 0; i < 20000000; i++) {
                if (this.isInterrupted()) {//测试线程是否有中断标记 同效于Thread.isInterrupted()
                    System.out.println("for end");
                    throw new InterruptedException();//此处可以用return；
                }
                int k = 0;
                k ++;
            }
            System.out.println("for之后代码标识线程未停止");
        } catch (InterruptedException e) {
            System.out.println("InterruptedException :" + e.getMessage());
            e.printStackTrace();
            Thread.currentThread().interrupt();
        }
    }
}