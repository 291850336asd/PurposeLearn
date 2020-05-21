package com.meng.coding.loadbalance.hash;

import java.util.SortedMap;
import java.util.TreeMap;

/**
 * 哈希环 虚拟节点
 */
public class Test {

    public static void main(String[] args) {
        TreeMap t = new TreeMap();
        t.put("1", 1);
        t.put("2", 2);
        t.put("3", 3);
        t.put("4", 4);
        t.put("5", 5);
        System.out.println(t.firstKey());
        SortedMap so = t.tailMap("4");
        System.out.println(so.firstKey());
    }

}
