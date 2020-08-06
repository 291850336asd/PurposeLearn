package com.meng.coding.reference;

import java.lang.ref.PhantomReference;
import java.lang.ref.Reference;
import java.lang.ref.ReferenceQueue;
import java.util.LinkedList;
import java.util.List;

/**
 * 虚引用
 * 用于对外内存的管理
 */
public class PhantomReferenceT {

    private static final ReferenceQueue<M> QUEUE = new ReferenceQueue<>();
    private static final List<Object> LIST = new LinkedList<>();
    public static void main(String[] args) {
        PhantomReference<M> phantomReference = new PhantomReference<>(new M(), QUEUE);
        new Thread(()->{
            while (true){
                LIST.add(new byte[1024 * 1024]);
                try{
                    Thread.sleep(1000);
                }catch (InterruptedException e) {
                    e.printStackTrace();
                    Thread.currentThread().interrupt();
                }
                System.out.println(phantomReference.get());
                System.out.println(LIST.size());
            }
        }).start();

        new Thread(() -> {
            while (true){
                Reference<? extends M> pool = QUEUE.poll();
                if(pool != null){
                    System.out.println("---------虚引用对象被JVM回收了------------" + pool);
                }
            }
        }).start();
    }

}
