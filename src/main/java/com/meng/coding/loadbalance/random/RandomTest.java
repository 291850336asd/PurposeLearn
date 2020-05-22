package com.meng.coding.loadbalance.random;

import com.meng.coding.loadbalance.ServerIps;

import java.util.Random;

public class RandomTest {

    public static void main(String[] args) {
        Random random = new Random();
        int ran = random.nextInt(ServerIps.LIST.size());
        System.out.println(ServerIps.LIST.get(ran));
    }
}
