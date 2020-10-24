package com.meng.coding.reference;

import java.lang.ref.WeakReference;

public class WeakReferenceT {

    public static void main(String[] args) {
        WeakReference<M> m = new WeakReference<>(new M());
        System.out.println(m.get());
        System.gc();
        System.out.println(m.get());

        System.out.println("-------");
        ThreadLocal<M>   tl = new ThreadLocal<>();
        tl.set(new M());
        tl.remove();


    }

}
